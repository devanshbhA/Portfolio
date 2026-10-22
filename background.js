/**
 * LIFTOFF FIELD — 3D WEBGL PARTICLE BACKDROP
 * A volumetric cloud of capsule "dashes" drifting toward the camera. Around a
 * focus point that trails the cursor, particles are pushed out into a ring,
 * turn to face outward and pick up a chromatic palette; far from the ring they
 * fade to quiet grey dust. One draw call, no dependencies.
 */

(function () {
    'use strict';

    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    // ===================================================================
    // SHADERS
    // ===================================================================
    const VERT = `
        attribute vec3 aDisk;   // x, y: unit-disk position · z: depth seed [0,1)
        attribute vec4 aSeed;   // per-particle random values

        uniform float uTime;
        uniform vec2  uRes;       // viewport in CSS px
        uniform float uDpr;
        uniform float uSpread;    // cylinder radius in world units
        uniform vec2  uFocus;     // ring centre in CSS px (y down)
        uniform float uRadius;    // ring radius in CSS px
        uniform vec2  uTilt;      // camera yaw / pitch (radians)
        uniform float uIntensity;
        uniform float uDark;      // 1 on dark themes, 0 on light
        uniform float uMaxPoint;

        varying vec4  vColor;
        varying float vAngle;
        varying float vR;
        varying float vH;
        varying float vPx;

        const float CAM_Z = 3.0;
        const float Z_NEAR = 1.15;
        const float Z_FAR = -2.4;

        vec3 palette(float t) {
            vec3 blue   = vec3(0.26, 0.52, 0.96);
            vec3 violet = vec3(0.58, 0.38, 0.97);
            vec3 rose   = vec3(0.93, 0.29, 0.43);
            vec3 amber  = vec3(0.98, 0.74, 0.08);
            vec3 coral  = vec3(0.96, 0.40, 0.18);
            vec3 c = blue;
            c = mix(c, violet, smoothstep(0.00, 0.22, t));
            c = mix(c, rose,   smoothstep(0.22, 0.45, t));
            c = mix(c, amber,  smoothstep(0.45, 0.63, t));
            c = mix(c, coral,  smoothstep(0.63, 0.82, t));
            c = mix(c, blue,   smoothstep(0.82, 1.00, t));
            return c;
        }

        void main() {
            // --- 3D position: slow vortex around the view axis + drift toward camera
            float r0 = length(aDisk.xy);
            float swirl = uTime * (0.012 + 0.035 / (1.0 + r0 * 2.5)) * (0.7 + aSeed.x * 0.6);
            float a0 = atan(aDisk.y, aDisk.x) + swirl;
            vec3 p = vec3(cos(a0), sin(a0), 0.0) * r0 * uSpread;

            float depthRange = Z_NEAR - Z_FAR;
            float zt = fract(aDisk.z + uTime * (0.010 + aSeed.y * 0.016));
            p.z = Z_FAR + zt * depthRange;

            // camera tilt (yaw then pitch)
            float cy = cos(uTilt.x), sy = sin(uTilt.x);
            p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
            float cp = cos(uTilt.y), sp = sin(uTilt.y);
            p = vec3(p.x, cp * p.y - sp * p.z, sp * p.y + cp * p.z);

            float depth = CAM_Z - p.z;
            if (depth < 0.4) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 0.0; return; }
            float persp = CAM_Z / depth;

            float halfH = uRes.y * 0.5;
            vec2 screen = vec2(uRes.x * 0.5 + p.x * persp * halfH,
                               uRes.y * 0.5 - p.y * persp * halfH);

            // --- ring: push particles out of the focus disc and twist them slightly
            vec2 d = screen - uFocus;
            float r = length(d) + 0.0001;
            vec2 dir = d / r;
            float R = uRadius * (0.92 + 0.16 * aSeed.z);
            float rr = r + R * exp(-r / R);
            float prox = exp(-max(rr - R, 0.0) / (R * 1.15));
            float twist = 0.22 * prox * sin(uTime * 0.35 + aSeed.w * 6.2831);
            float ct = cos(twist), st = sin(twist);
            dir = vec2(ct * dir.x - st * dir.y, st * dir.x + ct * dir.y);
            screen = uFocus + dir * rr;

            // --- appearance
            float sizeScale = pow(persp, 0.8);
            float isDot = step(0.9, aSeed.w);
            float lenPx = mix(2.4, mix(9.0, 18.0, aSeed.x), prox * (1.0 - isDot)) * sizeScale;
            float widPx = mix(2.1, 2.9, aSeed.y) * min(sizeScale, 1.4);
            lenPx = max(lenPx, widPx);

            float fogFar = smoothstep(Z_FAR, Z_FAR + 0.9, p.z);
            float fogNear = 1.0 - smoothstep(Z_NEAR - 0.45, Z_NEAR, p.z);
            float edge = smoothstep(0.0, 1.0, (1.0 - zt) * 8.0) * smoothstep(0.0, 1.0, zt * 8.0);

            float hueT = fract(atan(-dir.y, dir.x) / 6.2831853 + 1.0 + uTime * 0.008);
            vec3 dust = mix(vec3(0.32, 0.33, 0.36), vec3(0.62, 0.62, 0.66), uDark);
            float colorMix = smoothstep(0.08, 0.55, prox);
            vec3 col = mix(dust, palette(hueT), colorMix);

            float alpha = mix(mix(0.28, 0.38, uDark), 0.95, colorMix);
            alpha *= fogFar * fogNear * edge * uIntensity * mix(0.75, 1.0, aSeed.z);

            // --- point sprite sizing in device pixels
            float lenD = lenPx * uDpr;
            float widD = widPx * uDpr;
            float size = min(lenD + 2.0, uMaxPoint);
            vR = 0.5 * min(widD, size - 2.0) / size;
            vH = max(0.5 * (min(lenD, size - 2.0) - widD), 0.0) / size;
            vPx = 1.0 / size;
            vAngle = atan(dir.y, dir.x);
            vColor = vec4(col, alpha);

            gl_PointSize = size;
            gl_Position = vec4(screen.x / uRes.x * 2.0 - 1.0, 1.0 - screen.y / uRes.y * 2.0, 0.0, 1.0);
        }
    `;

    const FRAG = `
        precision mediump float;
        varying vec4  vColor;
        varying float vAngle;
        varying float vR;
        varying float vH;
        varying float vPx;

        void main() {
            vec2 p = gl_PointCoord - 0.5;
            float c = cos(vAngle), s = sin(vAngle);
            vec2 q = vec2(c * p.x + s * p.y, -s * p.x + c * p.y);
            float dist = length(vec2(max(abs(q.x) - vH, 0.0), q.y)) - vR;
            float a = 1.0 - smoothstep(-vPx, vPx, dist);
            if (a <= 0.003) discard;
            gl_FragColor = vec4(vColor.rgb, 1.0) * vColor.a * a;
        }
    `;

    // ===================================================================
    // WEBGL SETUP
    // ===================================================================
    let gl = null;
    let program = null;
    let uniforms = {};
    let particleCount = 0;
    let maxPointSize = 64;

    function compile(type, src) {
        const sh = gl.createShader(type);
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
            console.warn('[liftoff-field] shader error:', gl.getShaderInfoLog(sh));
            gl.deleteShader(sh);
            return null;
        }
        return sh;
    }

    function buildParticles() {
        const isSmall = Math.min(window.innerWidth, window.innerHeight) < 700;
        particleCount = isSmall || coarsePointer ? 4000 : 8500;

        const disk = new Float32Array(particleCount * 3);
        const seed = new Float32Array(particleCount * 4);
        for (let i = 0; i < particleCount; i++) {
            const rad = Math.sqrt(Math.random());
            const ang = Math.random() * Math.PI * 2;
            disk[i * 3] = Math.cos(ang) * rad;
            disk[i * 3 + 1] = Math.sin(ang) * rad;
            disk[i * 3 + 2] = Math.random();
            for (let k = 0; k < 4; k++) seed[i * 4 + k] = Math.random();
        }

        bindAttribute('aDisk', disk, 3);
        bindAttribute('aSeed', seed, 4);
    }

    function bindAttribute(name, data, size) {
        const loc = gl.getAttribLocation(program, name);
        if (loc < 0) return;
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    }

    function initGL() {
        gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, depth: false });
        if (!gl) return false;

        const vs = compile(gl.VERTEX_SHADER, VERT);
        const fs = compile(gl.FRAGMENT_SHADER, FRAG);
        if (!vs || !fs) return false;

        program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.warn('[liftoff-field] link error:', gl.getProgramInfoLog(program));
            return false;
        }
        gl.useProgram(program);

        ['uTime', 'uRes', 'uDpr', 'uSpread', 'uFocus', 'uRadius', 'uTilt', 'uIntensity', 'uDark', 'uMaxPoint']
            .forEach(n => { uniforms[n] = gl.getUniformLocation(program, n); });

        const range = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);
        maxPointSize = range && range[1] ? Math.min(range[1], 128) : 64;

        buildParticles();

        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0, 0, 0, 0);
        return true;
    }

    if (!initGL()) {
        canvas.remove();
        document.documentElement.classList.add('no-webgl');
        return;
    }
    document.documentElement.classList.add('has-field');

    // ===================================================================
    // VIEWPORT, POINTER & STATE
    // ===================================================================
    let width = 0;
    let height = 0;
    let dpr = 1;

    const state = {
        focusX: 0, focusY: 0,
        targetX: 0, targetY: 0,
        radius: 150, radiusBase: 150, radiusVel: 0,
        tiltX: 0, tiltY: 0,
        tiltTargetX: 0, tiltTargetY: 0,
        intensity: 0, intensityTarget: 1,
        pointerActive: false,
        lastPointerTime: 0
    };

    // Resting position of the ring: centre of the main stage, slightly above middle
    function homePoint() {
        const stage = document.getElementById('mainStage');
        if (stage) {
            const rect = stage.getBoundingClientRect();
            if (rect.width > 0) return { x: rect.left + rect.width * 0.5, y: rect.top + rect.height * 0.4 };
        }
        return { x: width * 0.5, y: height * 0.42 };
    }

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        gl.viewport(0, 0, canvas.width, canvas.height);

        state.radiusBase = Math.max(90, Math.min(220, Math.min(width, height) * 0.17));
        if (!state.focusX) {
            const home = homePoint();
            state.focusX = state.targetX = home.x;
            state.focusY = state.targetY = home.y;
            state.radius = state.radiusBase;
        }
        if (reduceMotion.matches) render(0);
    }

    function onPointerMove(x, y) {
        state.targetX = x;
        state.targetY = y;
        state.pointerActive = true;
        state.lastPointerTime = performance.now();
        state.tiltTargetX = ((x / width) - 0.5) * 0.22;
        state.tiltTargetY = ((y / height) - 0.5) * 0.16;
    }

    window.addEventListener('pointermove', (e) => onPointerMove(e.clientX, e.clientY), { passive: true });
    document.addEventListener('pointerleave', () => { state.pointerActive = false; });
    window.addEventListener('blur', () => { state.pointerActive = false; });

    // Click / tap sends a shockwave through the ring
    window.addEventListener('pointerdown', (e) => {
        onPointerMove(e.clientX, e.clientY);
        state.radiusVel += state.radiusBase * 0.055;
    }, { passive: true });

    window.addEventListener('resize', resize);
    resize();

    // ===================================================================
    // RENDER LOOP
    // ===================================================================
    function render(time) {
        const t = time * 0.001;
        const isDark = !document.documentElement.matches('[data-theme="light"]');

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(uniforms.uTime, t);
        gl.uniform2f(uniforms.uRes, width, height);
        gl.uniform1f(uniforms.uDpr, dpr);
        gl.uniform1f(uniforms.uSpread, Math.hypot(width / height, 1) * 1.9);
        gl.uniform2f(uniforms.uFocus, state.focusX, state.focusY);
        gl.uniform1f(uniforms.uRadius, state.radius);
        gl.uniform2f(uniforms.uTilt, state.tiltX, state.tiltY);
        gl.uniform1f(uniforms.uIntensity, reduceMotion.matches ? 0.85 : state.intensity);
        gl.uniform1f(uniforms.uDark, isDark ? 1 : 0);
        gl.uniform1f(uniforms.uMaxPoint, maxPointSize);
        gl.drawArrays(gl.POINTS, 0, particleCount);
    }

    let lastTime = -1;
    let rafId = 0;

    function frame(now) {
        // Frames elapsed at 60fps, measured between rAF timestamps only (they can lag
        // performance.now()); clamped so a negative or huge dt can't make the easing diverge.
        if (lastTime < 0) lastTime = now;
        const dt = Math.max(0, Math.min((now - lastTime) / 16.667, 3));
        lastTime = now;

        // Idle: the ring drifts lazily around its home position
        if (!state.pointerActive || now - state.lastPointerTime > 6000) {
            const home = homePoint();
            const s = now * 0.00018;
            state.targetX = home.x + Math.sin(s * 1.3) * width * 0.06;
            state.targetY = home.y + Math.cos(s) * height * 0.05;
            state.tiltTargetX = Math.sin(s * 0.9) * 0.06;
            state.tiltTargetY = Math.cos(s * 0.7) * 0.04;
        }

        const follow = 1 - Math.pow(1 - 0.055, dt);
        state.focusX += (state.targetX - state.focusX) * follow;
        state.focusY += (state.targetY - state.focusY) * follow;
        state.tiltX += (state.tiltTargetX - state.tiltX) * follow * 0.6;
        state.tiltY += (state.tiltTargetY - state.tiltY) * follow * 0.6;

        // Damped spring for the click shockwave
        const k = 0.045, damping = 0.86;
        state.radiusVel += (state.radiusBase - state.radius) * k * dt;
        state.radiusVel *= Math.pow(damping, dt);
        state.radius += state.radiusVel * dt;

        // Dim the field while a conversation is on screen so text stays readable
        state.intensityTarget = document.body.classList.contains('is-chatting') ? 0.3 : 1;
        state.intensity += (state.intensityTarget - state.intensity) * (1 - Math.pow(1 - 0.04, dt));

        render(now);
        rafId = requestAnimationFrame(frame);
    }

    function start() {
        cancelAnimationFrame(rafId);
        if (reduceMotion.matches) {
            render(0);
            return;
        }
        lastTime = -1;
        rafId = requestAnimationFrame(frame);
    }

    if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', start);

    // Recover gracefully if the GPU drops the context
    canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        cancelAnimationFrame(rafId);
    });
    canvas.addEventListener('webglcontextrestored', () => {
        uniforms = {};
        if (initGL()) {
            resize();
            start();
        }
    });

    start();
})();
