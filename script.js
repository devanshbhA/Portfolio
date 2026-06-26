/* ================================================
   Portfolio — JavaScript
   vibe coded with intention
   ================================================ */

(function () {
    'use strict';

    // ==========================================
    // DOM
    // ==========================================
    const tabs = document.querySelectorAll('.tab');
    const pages = document.querySelectorAll('.page');
    const urlInput = document.getElementById('urlInput');
    const loadingBar = document.getElementById('loadingBar');
    const statusText = document.getElementById('statusText');
    const browserContent = document.getElementById('browserContent');
    const btnRefresh = document.getElementById('btnRefresh');
    const wallpaperBg = document.getElementById('wallpaperBg');
    const wallpaperPanel = document.getElementById('wallpaperPanel');
    const settingsPanel = document.getElementById('settingsPanel');
    const btnSettings = document.getElementById('btnSettings');

    const urlMap = {
        home: 'devansh.dev/home',
        about: 'devansh.dev/about',
        experience: 'devansh.dev/experience',
        projects: 'devansh.dev/projects',
        skills: 'devansh.dev/skills',
        contact: 'devansh.dev/contact'
    };

    let navHistory = ['home'];
    let historyIndex = 0;

    // ==========================================
    // Tab Navigation
    // ==========================================
    function navigateTo(tabName) {
        tabs.forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector('.tab[data-tab="' + tabName + '"]');
        if (activeTab) activeTab.classList.add('active');

        loadingBar.classList.remove('loading');
        void loadingBar.offsetWidth;
        loadingBar.classList.add('loading');

        if (urlInput) {
            urlInput.value = urlMap[tabName] || 'devansh.dev/' + tabName;
        }

        statusText.textContent = 'Loading...';
        setTimeout(function () { statusText.textContent = 'Ready'; }, 500);

        pages.forEach(function (p) { p.classList.remove('active'); });
        var targetPage = document.querySelector('.page[data-page="' + tabName + '"]');
        if (targetPage) {
            targetPage.classList.add('active');
            browserContent.scrollTop = 0;
        }

        if (tabName === 'skills') animateSkillBars();
        if (tabName === 'home') animateCounters();

        if (navHistory[historyIndex] !== tabName) {
            navHistory = navHistory.slice(0, historyIndex + 1);
            navHistory.push(tabName);
            historyIndex = navHistory.length - 1;
        }
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            navigateTo(tab.dataset.tab);
        });
    });

    document.querySelectorAll('[data-navigate]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            navigateTo(btn.dataset.navigate);
        });
    });

    document.getElementById('btnBack').addEventListener('click', function () {
        if (historyIndex > 0) { historyIndex--; navigateTo(navHistory[historyIndex]); }
    });

    document.getElementById('btnForward').addEventListener('click', function () {
        if (historyIndex < navHistory.length - 1) { historyIndex++; navigateTo(navHistory[historyIndex]); }
    });

    btnRefresh.addEventListener('click', function () {
        navigateTo(navHistory[historyIndex]);
    });

    // ==========================================
    // Typing Effect
    // ==========================================
    var typingTexts = [
        'Web Developer',
        'Founder of Orbnet',
        'CS Student @ GIT Jaipur',
        'UI/UX Enthusiast',
        'Content Creator',
        'Prompt Engineer'
    ];

    var textIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingElement = document.querySelector('.typing-text');

    function typeText() {
        var currentText = typingTexts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        var speed = isDeleting ? 30 : 55;

        if (!isDeleting && charIndex === currentText.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            speed = 350;
        }

        setTimeout(typeText, speed);
    }

    typeText();

    // ==========================================
    // Counter Animation
    // ==========================================
    function animateCounters() {
        var counters = document.querySelectorAll('.stat-number');
        counters.forEach(function (counter) {
            var target = parseInt(counter.dataset.count);
            var duration = 1200;
            var startTime = performance.now();

            function update(now) {
                var elapsed = now - startTime;
                var progress = Math.min(elapsed / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.round(target * eased);
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target + '+';
                }
            }
            requestAnimationFrame(update);
        });
    }

    setTimeout(animateCounters, 1200);

    // ==========================================
    // Skill Bars
    // ==========================================
    function animateSkillBars() {
        setTimeout(function () {
            document.querySelectorAll('.skill-fill').forEach(function (fill) {
                fill.style.width = fill.dataset.width + '%';
            });
        }, 200);
    }

    // ==========================================
    // Particle System (subtle, light theme)
    // ==========================================
    var canvas = document.getElementById('particles');
    var ctx = canvas.getContext('2d');
    var particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.2 + 0.05;
        this.hue = Math.random() * 60 + 240;
    }

    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    };

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + this.hue + ', 50%, 50%, ' + this.opacity + ')';
        ctx.fill();
    };

    var count = Math.min(40, Math.floor(window.innerWidth / 30));
    for (var i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    var opacity = (1 - dist / 100) * 0.06;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(108, 92, 231, ' + opacity + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (p) { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ==========================================
    // Wallpaper Changer
    // ==========================================
    document.getElementById('btnWallpaper').addEventListener('click', function () {
        wallpaperPanel.classList.toggle('open');
    });

    document.getElementById('wallpaperClose').addEventListener('click', function () {
        wallpaperPanel.classList.remove('open');
    });

    document.querySelectorAll('.wallpaper-option').forEach(function (opt) {
        opt.addEventListener('click', function () {
            document.querySelectorAll('.wallpaper-option').forEach(function (o) { o.classList.remove('active'); });
            opt.classList.add('active');

            var wp = opt.dataset.wallpaper;
            // Remove all wallpaper classes
            wallpaperBg.className = 'wallpaper-bg';

            if (wp === 'clean') {
                // Default — no class needed
            } else {
                wallpaperBg.classList.add('wp-' + wp);
            }

            statusText.textContent = 'Wallpaper changed';
            setTimeout(function () { statusText.textContent = 'Ready'; }, 1500);
        });
    });

    // Close panels when clicking outside
    document.addEventListener('click', function (e) {
        if (wallpaperPanel && !wallpaperPanel.contains(e.target) && e.target !== document.getElementById('btnWallpaper') && !document.getElementById('btnWallpaper').contains(e.target)) {
            wallpaperPanel.classList.remove('open');
        }
        if (settingsPanel && btnSettings && !settingsPanel.contains(e.target) && e.target !== btnSettings && !btnSettings.contains(e.target)) {
            settingsPanel.classList.remove('open');
        }
    });

    // ==========================================
    // Settings Menu
    // ==========================================
    if (btnSettings && settingsPanel) {
        btnSettings.addEventListener('click', function(e) {
            e.stopPropagation();
            settingsPanel.classList.toggle('open');
            if (wallpaperPanel) wallpaperPanel.classList.remove('open');
        });

        document.getElementById('setTheme').addEventListener('click', function() {
            statusText.textContent = 'Theme mode toggle coming soon!';
            setTimeout(() => { statusText.textContent = 'Ready'; }, 2000);
            settingsPanel.classList.remove('open');
        });

        document.getElementById('setPrint').addEventListener('click', function() {
            window.print();
            settingsPanel.classList.remove('open');
        });

        document.getElementById('setAbout').addEventListener('click', function() {
            alert('DevFox Browser v1.0\nBuilt for Devansh Bhardwaj\nVibe Coded with Intention');
            settingsPanel.classList.remove('open');
        });
    }

    // ==========================================
    // Intelligent Search
    // ==========================================
    if (urlInput) {
        urlInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.toLowerCase().trim();
                if (!query) return;

                statusText.textContent = 'Searching for: ' + query;
                this.blur();
                
                setTimeout(() => {
                    // Intelligent routing logic
                    if (query.includes('home') || query.includes('hello')) navigateTo('home');
                    else if (query.includes('about') || query.includes('who') || query.includes('bio')) navigateTo('about');
                    else if (query.includes('exp') || query.includes('work') || query.includes('orbnet') || query.includes('palarsoft') || query.includes('intern')) navigateTo('experience');
                    else if (query.includes('proj') || query.includes('blog') || query.includes('algorithm') || query.includes('youtube')) navigateTo('projects');
                    else if (query.includes('skill') || query.includes('react') || query.includes('html') || query.includes('css') || query.includes('c++') || query.includes('javascript') || query.includes('mongo') || query.includes('boot')) navigateTo('skills');
                    else if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('hire') || query.includes('touch')) navigateTo('contact');
                    else {
                        statusText.textContent = 'No exact matches found for "' + query + '"';
                        setTimeout(() => { statusText.textContent = 'Ready'; }, 2500);
                    }
                }, 400);
            }
        });

        urlInput.addEventListener('focus', function() {
            this.select();
        });
    }

    // ==========================================
    // 3D Tilt
    // ==========================================
    var browserWindow = document.getElementById('browserWindow');
    var isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (!isMobile) {
        document.addEventListener('mousemove', function (e) {
            var rect = browserWindow.getBoundingClientRect();
            var cx = rect.left + rect.width / 2;
            var cy = rect.top + rect.height / 2;
            var dx = (e.clientX - cx) / rect.width;
            var dy = (e.clientY - cy) / rect.height;
            browserWindow.style.transform = 'perspective(1500px) rotateX(' + (dy * -1) + 'deg) rotateY(' + (dx * 1) + 'deg)';
        });
        document.addEventListener('mouseleave', function () {
            browserWindow.style.transform = 'perspective(1500px) rotateX(0) rotateY(0)';
        });
    }

    // ==========================================
    // Status bar hover on links
    // ==========================================
    document.querySelectorAll('.bookmark-item, .contact-method, .project-link').forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            var href = el.getAttribute('href');
            if (href) statusText.textContent = href;
        });
        el.addEventListener('mouseleave', function () {
            statusText.textContent = 'Ready';
        });
    });

    // ==========================================
    // URL bar focus effect
    // ==========================================
    document.getElementById('urlBar').addEventListener('click', function () {
        var urlBar = document.getElementById('urlBar');
        urlBar.style.borderColor = 'rgba(108,92,231,0.4)';
        urlBar.style.boxShadow = '0 0 0 3px rgba(108,92,231,0.08)';
        setTimeout(function () {
            urlBar.style.borderColor = '';
            urlBar.style.boxShadow = '';
        }, 1200);
    });

    // ==========================================
    // Traffic light buttons
    // ==========================================
    document.getElementById('btnClose').addEventListener('click', function () {
        browserWindow.style.transition = 'all 0.4s ease';
        browserWindow.style.transform = 'scale(0.9)';
        browserWindow.style.opacity = '0';
        setTimeout(function () {
            browserWindow.style.transform = '';
            browserWindow.style.opacity = '';
        }, 1500);
    });

    document.getElementById('btnMinimize').addEventListener('click', function () {
        browserWindow.style.transition = 'all 0.3s ease';
        browserWindow.style.transform = 'scale(0.96) translateY(15px)';
        setTimeout(function () { browserWindow.style.transform = ''; }, 700);
    });

    document.getElementById('btnMaximize').addEventListener('click', function () {
        browserWindow.classList.toggle('maximized');
        if (browserWindow.classList.contains('maximized')) {
            browserWindow.style.maxWidth = '100%';
            browserWindow.style.maxHeight = '100%';
            browserWindow.style.borderRadius = '0';
        } else {
            browserWindow.style.maxWidth = '';
            browserWindow.style.maxHeight = '';
            browserWindow.style.borderRadius = '';
        }
    });

    // ==========================================
    // New tab easter egg
    // ==========================================
    document.getElementById('tabNew').addEventListener('click', function () {
        var messages = [
            'this is vibe coded — and it works',
            'hire devansh, you won\'t regret it',
            'built with vanilla html, css & js',
            'prompt engineering is a real skill',
            'meta, here I come'
        ];
        statusText.textContent = messages[Math.floor(Math.random() * messages.length)];
        setTimeout(function () { statusText.textContent = 'Ready'; }, 2500);
    });

    // ==========================================
    // Keyboard shortcuts (1-6)
    // ==========================================
    document.addEventListener('keydown', function (e) {
        if (e.key >= '1' && e.key <= '6' && !e.ctrlKey && !e.metaKey) {
            var tabNames = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
            var idx = parseInt(e.key) - 1;
            if (tabNames[idx]) navigateTo(tabNames[idx]);
        }
    });

    // ==========================================
    // Initial load
    // ==========================================
    setTimeout(function () {
        loadingBar.classList.add('loading');
        statusText.textContent = 'Loading...';
        setTimeout(function () { statusText.textContent = 'Ready'; }, 600);
    }, 400);

})();
