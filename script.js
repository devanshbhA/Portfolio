/**
 * DEVANSH BHARDWAJ — PORTFOLIO
 * Conversation-style portfolio: every answer below is hand-written, matched
 * to the visitor's question by a small keyword scorer (see INTENT MATCHING).
 */

(function () {
    'use strict';

    // ===================================================================
    // WRITTEN ANSWERS
    // ===================================================================
    const KNOWLEDGE_BASE = {
        name: "Devansh Bhardwaj",
        email: "devanshbhardwaj375@gmail.com",
        linkedin: "https://www.linkedin.com/in/devansh-bhardwaj-b82632324/",
        orbnetUrl: "https://orbnet.in",
        libraryUrl: "https://www.vidhyasthalilibrary.online/",

        about: `I'm a second-year B.Tech CSE student at Global Institute of Technology (GIT), Jaipur, affiliated to Rajasthan Technical University (RTU), Kota. In my first year I started **Orbnet**, an internship discovery platform for students, and signed Avichal Techno Labs as our first paying client. I also spent three months as a paid frontend developer intern at **Palarsoft Internet Pvt. Ltd.** (associated with Vimalsoft Technologies), building client websites and working on AI video pipelines.

Right now most of my spare time goes into data structures and algorithms in C++.`,

        orbnet: `**Orbnet** — founder and lead developer, May 2026 to now.

- An internship discovery platform for students that also helps early-stage startups find talent.
- Avichal Techno Labs signed on as our first paying partner.
- I run it end to end: building the platform, deploying it, onboarding users and running the Google Ads campaigns.
- Live at [orbnet.in](https://orbnet.in)

Why I started it: in first year I watched classmates who wanted real experience struggle to find internships that taught them anything. Orbnet connects them with startups that need the help.`,

        palarsoft: `**Palarsoft Internet Pvt. Ltd.** — frontend developer intern, April to June 2026. Paid, remote, associated with Vimalsoft Technologies.

- Built responsive multi-page client blog websites from scratch with HTML, CSS, JavaScript and Bootstrap.
- Integrated HeyGen AI avatar videos into client landing pages and marketing material.
- Maintained production code and fixed UI issues from client feedback.

The certificate is issued and verified under the Ministry of Corporate Affairs (MCA), Government of India. It's in the Certificate tab if you want to see it.`,

        library: `**Vidhyasthali Library** — [vidhyasthalilibrary.online](https://www.vidhyasthalilibrary.online/)

A free digital library I built for students in Barmer, Rajasthan.

- 12+ classic Hindi and English books you can open instantly. No paywall, no sign-up.
- Mobile-first reading layout that loads quickly.
- Plain HTML, CSS and JavaScript, with care for typography and SEO.`,

        skills: `What I work with:

- **Frontend:** HTML, CSS (grid, flexbox, animation), JavaScript (ES6+), Bootstrap 5
- **Problem solving:** C and C++, data structures and algorithms
- **Media:** HeyGen, DaVinci Resolve 19, Canva, prompt engineering
- **Tools:** Git and GitHub, VS Code, MongoDB basics, Google Ads

Right now I'm working through DSA in C++ alongside my B.Tech coursework.`,

        creative: `**Algorithm Soft** is a YouTube channel where I make educational programming videos.

- **HeyGen:** AI avatar presenters for the videos. I also used HeyGen for client landing pages and campaigns during my internship.
- **DaVinci Resolve 19:** multi-track editing, colour grading and audio sync.
- **Canva:** channel branding and thumbnails.
- **Prompt engineering:** structuring multi-step LLM workflows for content and developer tools.`,

        hackathon: `**Lead hackathon organiser** at GIT Jaipur.

- Ran college hackathons and their technical tracks.
- Set up participant registration, wrote problem statements and submission guidelines.
- Coordinated student teams, mentors and judging.

I enjoy getting builders in one room and turning problem statements into working solutions.`,

        certificate: `**Internship certificate — Palarsoft Internet Pvt. Ltd.**

Frontend developer intern, three-month paid programme. The certificate is recognised under the Ministry of Corporate Affairs (MCA), Government of India.

You can view the full-resolution copy and download it from the Certificate tab.`,

        projects: `Things I've shipped:

1. **Vidhyasthali Library** — free reading portal for students in Barmer. [vidhyasthalilibrary.online](https://www.vidhyasthalilibrary.online/)
2. **Orbnet** — my startup: internship discovery, with Avichal Techno Labs as first partner. [orbnet.in](https://orbnet.in)
3. **Client blog platform** — multi-page blog built during my Palarsoft internship.
4. **Algorithm Soft** — a YouTube channel with educational programming videos, made with HeyGen and edited in DaVinci Resolve 19.

Screenshots and links are in the Projects tab.`,

        contact: `Email is the quickest way to reach me.

- Email: [devanshbhardwaj375@gmail.com](mailto:devanshbhardwaj375@gmail.com)
- LinkedIn: [devansh-bhardwaj](https://www.linkedin.com/in/devansh-bhardwaj-b82632324/)
- Startup: [orbnet.in](https://orbnet.in)
- Based in Jaipur, Rajasthan, India

I'm open to frontend roles, internships and collaborations.`,

        resume: `The short version:

- **Education:** B.Tech CSE, second year — Global Institute of Technology (GIT), Jaipur, affiliated to RTU Kota
- **Experience:** paid frontend developer intern, Palarsoft Internet Pvt. Ltd. (MCA-recognised certificate)
- **Startup:** founder and developer, Orbnet ([orbnet.in](https://orbnet.in))
- **Live project:** Vidhyasthali Library ([vidhyasthalilibrary.online](https://www.vidhyasthalilibrary.online/))
- **Stack:** HTML, CSS, JavaScript, Bootstrap, C++, HeyGen, DaVinci Resolve`,

        greeting: `Hey, I'm Devansh — B.Tech CSE student at GIT Jaipur, frontend developer and founder of Orbnet.

Ask me about my startup, my internship at Palarsoft, my YouTube channel, or how DSA in C++ is going.`,

        overview: `I'm a second-year B.Tech CSE student at GIT Jaipur (affiliated to RTU Kota). I founded Orbnet ([orbnet.in](https://orbnet.in)), did a paid frontend internship at Palarsoft, and built Vidhyasthali Library ([vidhyasthalilibrary.online](https://www.vidhyasthalilibrary.online/)) for students in Barmer.

Some things you could ask about:

- how Orbnet got its first paying partner
- what I shipped at Palarsoft
- where I'm at with C++ and DSA
- how to get in touch`
    };

    // ===================================================================
    // DOM ELEMENTS
    // ===================================================================
    const chatViewport = document.getElementById('chatViewport');
    const chatMessagesStream = document.getElementById('chatMessagesStream');
    const welcomeHero = document.getElementById('welcomeHero');
    const aiPromptInput = document.getElementById('aiPromptInput');
    const dockSendBtn = document.getElementById('dockSendBtn');
    const chatBottomAnchor = document.getElementById('chatBottomAnchor');

    // Sidebar & Canvas Controls
    const aiSidebar = document.getElementById('aiSidebar');
    const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const newChatBtn = document.getElementById('newChatBtn');
    const artifactsCanvas = document.getElementById('artifactsCanvas');
    const artifactsToggleBtn = document.getElementById('artifactsToggleBtn');
    const mobileArtifactsBtn = document.getElementById('mobileArtifactsBtn');
    const canvasCloseBtn = document.getElementById('canvasCloseBtn');
    const canvasExpandBtn = document.getElementById('canvasExpandBtn');
    const dockAttachBtn = document.getElementById('dockAttachBtn');

    // Models & Themes
    const modelSelectorWrapper = document.getElementById('modelSelectorWrapper');
    const modelSelectorBtn = document.getElementById('modelSelectorBtn');
    const currentModelName = document.getElementById('currentModelName');
    const modelDropdownMenu = document.getElementById('modelDropdownMenu');
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    const themePicker = document.getElementById('themePicker');

    // Modals & Toasts
    const imageModalOverlay = document.getElementById('imageModalOverlay');
    const imageModalClose = document.getElementById('imageModalClose');
    const modalEnlargedImg = document.getElementById('modalEnlargedImg');
    const aiToast = document.getElementById('aiToast');
    const toastMessage = document.getElementById('toastMessage');

    // Canvas Tabs
    const canvasTabs = document.querySelectorAll('.canvas-tab');
    const canvasPanes = document.querySelectorAll('.canvas-pane');

    // Storage can throw in private mode or with site data blocked; never let it break the page
    const store = {
        get(key) {
            try { return window.localStorage.getItem(key); } catch (e) { return null; }
        },
        set(key, value) {
            try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
        }
    };

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DESKTOP_MIN = 900;
    const CANVAS_DOCK_MIN = 1200;

    // State Variables
    let currentModel = "Recruiter";
    let isStreaming = false;
    let streamTimer = null;
    let audioMuted = store.get('devansh_audio_muted') === '1';
    let activeAvatar = store.get('devansh_avatar_mode') || 'bridge';

    // ===================================================================
    // WEB AUDIO SOUND SYNTHESIS (Gentle modern AI interaction chimes)
    // ===================================================================
    let audioCtx = null;
    function playAudioChime(type) {
        if (audioMuted) return;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            const now = audioCtx.currentTime;

            if (type === 'send') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (type === 'receive') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, now); // D5
                osc.frequency.setValueAtTime(880, now + 0.08); // A5
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
                osc.start(now);
                osc.stop(now + 0.22);
            } else if (type === 'click') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(320, now);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
            }
        } catch (e) {
            // AudioContext not allowed or not supported; ignore gracefully
        }
    }

    // ===================================================================
    // TOAST NOTIFICATION UTILITY
    // ===================================================================
    let toastTimeout;
    function showToast(msg) {
        if (!aiToast || !toastMessage) return;
        toastMessage.textContent = msg;
        aiToast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            aiToast.classList.remove('show');
        }, 2800);
    }

    // ===================================================================
    // AVATAR IDENTITIES MANAGEMENT
    // ===================================================================
    const AVATAR_SOURCES = {
        bridge: 'devansh-bridge-hd.jpg',
        cutout: 'avatar_badges.jpg',
        '3d': 'avatar.png'
    };

    function currentAvatarSrc() {
        return AVATAR_SOURCES[activeAvatar] || AVATAR_SOURCES.bridge;
    }

    // Fallback chain for broken avatar images; stops after one retry so it can't loop
    window.handleAvatarError = function (img) {
        if (img.dataset.fallback) {
            img.onerror = null;
            img.style.visibility = 'hidden';
            return;
        }
        img.dataset.fallback = '1';
        img.src = 'avatar_final.jpg';
    };

    function applyAvatar(mode, animate) {
        activeAvatar = AVATAR_SOURCES[mode] ? mode : 'bridge';
        store.set('devansh_avatar_mode', activeAvatar);
        const targetSrc = currentAvatarSrc();

        document.querySelectorAll('.avatar-pill').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.avatar === activeAvatar);
        });

        document.querySelectorAll('#sidebarAvatarImg, #heroAvatarImg, .agent-thumb-avatar').forEach(img => {
            delete img.dataset.fallback;
            img.style.visibility = '';
            img.src = targetSrc;
        });

        // 3D card flip on the hero avatar
        const box = document.getElementById('heroAvatarBox');
        if (box && animate && !reduceMotion) {
            box.classList.remove('flip');
            void box.offsetWidth;
            box.classList.add('flip');
        }
    }

    document.querySelectorAll('.avatar-pill').forEach(btn => {
        btn.addEventListener('click', function () {
            applyAvatar(this.dataset.avatar, true);
            playAudioChime('click');
            showToast(`Photo: ${this.textContent.trim()}`);
        });
    });

    // ===================================================================
    // THEMES & MODEL MANAGEMENT
    // ===================================================================
    const THEME_NAMES = {
        'ink': 'Ink'
    };

    function setTheme(theme, silent) {
        const activeTheme = THEME_NAMES[theme] ? theme : 'ink';
        document.documentElement.setAttribute('data-theme', activeTheme);
        store.set('portfolio-agent-theme', activeTheme);
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === activeTheme);
        });
        if (!silent) showToast(`Theme: ${THEME_NAMES[activeTheme] || activeTheme}`);
    }

    setTheme(store.get('portfolio-agent-theme') || 'ink', true);

    if (themePicker) {
        themePicker.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                setTheme(this.dataset.theme);
                playAudioChime('click');
            });
        });
    }

    // Model Selector Dropdown
    function setModelMenu(open) {
        if (!modelSelectorWrapper) return;
        modelSelectorWrapper.classList.toggle('open', open);
        if (modelSelectorBtn) modelSelectorBtn.setAttribute('aria-expanded', String(open));
    }

    if (modelSelectorBtn) {
        modelSelectorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            setModelMenu(!modelSelectorWrapper.classList.contains('open'));
            playAudioChime('click');
        });
    }

    function selectModel(item) {
        document.querySelectorAll('.dropdown-item').forEach(i => {
            i.classList.remove('active');
            i.setAttribute('aria-selected', 'false');
        });
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
        currentModel = item.dataset.model;
        currentModelName.textContent = currentModel;
        setModelMenu(false);
        playAudioChime('click');
        showToast(`Answers now written for a ${currentModel.toLowerCase()}`);
    }

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.setAttribute('role', 'option');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-selected', String(item.classList.contains('active')));
        item.addEventListener('click', () => selectModel(item));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectModel(item);
                modelSelectorBtn.focus();
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('#modelSelectorWrapper')) setModelMenu(false);
    });

    // Audio Sound FX toggle
    function syncAudioButton() {
        if (!audioToggleBtn) return;
        audioToggleBtn.classList.toggle('muted', audioMuted);
        audioToggleBtn.setAttribute('aria-pressed', String(!audioMuted));
    }

    if (audioToggleBtn) {
        syncAudioButton();
        audioToggleBtn.addEventListener('click', function () {
            audioMuted = !audioMuted;
            store.set('devansh_audio_muted', audioMuted ? '1' : '0');
            syncAudioButton();
            showToast(audioMuted ? 'Sound off' : 'Sound on');
        });
    }

    // Clipboard with a fallback for http:// and file:// where the async API is unavailable
    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise((resolve, reject) => {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy') ? resolve() : reject(new Error('copy failed'));
            } catch (err) {
                reject(err);
            } finally {
                ta.remove();
            }
        });
    }

    // ===================================================================
    // SIDE PANEL (projects, certificate, skills, contact)
    // ===================================================================
    function openCanvas(tabName = 'projects') {
        if (artifactsCanvas) {
            artifactsCanvas.classList.remove('closed');
            artifactsCanvas.removeAttribute('inert');
            if (artifactsToggleBtn) artifactsToggleBtn.classList.add('active');
            switchCanvasTab(tabName);
            // Canvas overlays the chat below the docking breakpoint, so the sidebar drawer gives way
            if (window.innerWidth < CANVAS_DOCK_MIN) closeSidebarDrawer();
            syncScrim();
        }
    }

    function closeCanvas() {
        if (artifactsCanvas) {
            artifactsCanvas.classList.add('closed');
            artifactsCanvas.setAttribute('inert', '');
            if (artifactsToggleBtn) artifactsToggleBtn.classList.remove('active');
            syncScrim();
        }
    }

    function toggleCanvas() {
        if (artifactsCanvas.classList.contains('closed')) {
            openCanvas();
        } else {
            closeCanvas();
        }
    }

    function switchCanvasTab(tabName) {
        canvasTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.canvasTab === tabName);
        });
        canvasPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === `pane${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
        });
    }

    canvasTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            switchCanvasTab(this.dataset.canvasTab);
            playAudioChime('click');
        });
    });

    if (artifactsToggleBtn) artifactsToggleBtn.addEventListener('click', toggleCanvas);
    if (mobileArtifactsBtn) mobileArtifactsBtn.addEventListener('click', toggleCanvas);
    if (canvasCloseBtn) canvasCloseBtn.addEventListener('click', closeCanvas);
    if (dockAttachBtn) dockAttachBtn.addEventListener('click', () => openCanvas('projects'));

    if (canvasExpandBtn) {
        canvasExpandBtn.addEventListener('click', () => {
            artifactsCanvas.classList.toggle('expanded');
        });
    }

    // Image modal (certificate zoom)
    let modalReturnFocus = null;

    function openImageModal(src) {
        modalReturnFocus = document.activeElement;
        modalEnlargedImg.src = src || 'palarsoft-certificate.jpg';
        imageModalOverlay.classList.add('open');
        if (imageModalClose) imageModalClose.focus();
    }

    function closeImageModal() {
        imageModalOverlay.classList.remove('open');
        if (modalReturnFocus && modalReturnFocus.focus) modalReturnFocus.focus();
    }

    const certImageFrame = document.getElementById('certImageFrame');
    if (certImageFrame) {
        certImageFrame.setAttribute('role', 'button');
        certImageFrame.setAttribute('tabindex', '0');
        certImageFrame.setAttribute('aria-label', 'Enlarge certificate');
        certImageFrame.addEventListener('click', () => openImageModal());
        certImageFrame.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openImageModal();
            }
        });
    }

    if (imageModalClose) imageModalClose.addEventListener('click', closeImageModal);

    if (imageModalOverlay) {
        imageModalOverlay.addEventListener('click', (e) => {
            if (e.target === imageModalOverlay) closeImageModal();
        });
    }

    // Copy email to clipboard
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            copyText(KNOWLEDGE_BASE.email).then(() => {
                copyEmailBtn.textContent = 'Copied!';
                showToast('Email copied to clipboard!');
                setTimeout(() => { copyEmailBtn.textContent = 'Copy'; }, 2000);
            }).catch(() => showToast('Copy failed — email: ' + KNOWLEDGE_BASE.email));
        });
    }

    // "Ask about this" buttons on the project cards
    document.querySelectorAll('.ask-about-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const prompt = this.dataset.ask;
            if (prompt) {
                // Below the docking breakpoint the canvas covers the chat, so close it to show the answer
                if (window.innerWidth < CANVAS_DOCK_MIN) closeCanvas();
                handleUserSubmit(prompt);
            }
        });
    });

    // ===================================================================
    // SIDEBAR DRAWER & RESPONSIVE BEHAVIOR
    // ===================================================================
    const appLayout = document.getElementById('appLayout');
    const drawerScrim = document.getElementById('drawerScrim');
    const sidebarExpandBtn = document.getElementById('sidebarExpandBtn');

    function isDesktop() {
        return window.innerWidth >= DESKTOP_MIN;
    }

    function syncScrim() {
        if (!drawerScrim) return;
        const drawerOpen = !isDesktop() && aiSidebar.classList.contains('open');
        const canvasOverlay = window.innerWidth < CANVAS_DOCK_MIN && artifactsCanvas && !artifactsCanvas.classList.contains('closed');
        drawerScrim.classList.toggle('visible', drawerOpen || canvasOverlay);
    }

    function closeSidebarDrawer() {
        aiSidebar.classList.remove('open');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
        syncScrim();
    }

    if (sidebarCollapseBtn) {
        sidebarCollapseBtn.addEventListener('click', () => {
            if (isDesktop()) {
                appLayout.classList.add('sidebar-collapsed');
                store.set('devansh_sidebar_collapsed', '1');
            } else {
                closeSidebarDrawer();
            }
        });
    }

    if (sidebarExpandBtn) {
        sidebarExpandBtn.addEventListener('click', () => {
            appLayout.classList.remove('sidebar-collapsed');
            store.set('devansh_sidebar_collapsed', '0');
        });
    }

    if (store.get('devansh_sidebar_collapsed') === '1') appLayout.classList.add('sidebar-collapsed');

    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.addEventListener('click', () => {
            const open = !aiSidebar.classList.contains('open');
            aiSidebar.classList.toggle('open', open);
            mobileMenuBtn.setAttribute('aria-expanded', String(open));
            if (open && window.innerWidth < CANVAS_DOCK_MIN) closeCanvas();
            syncScrim();
        });
    }

    if (drawerScrim) {
        drawerScrim.addEventListener('click', () => {
            closeSidebarDrawer();
            if (window.innerWidth < CANVAS_DOCK_MIN) closeCanvas();
        });
    }

    // Canvas starts open only where there's room to dock it beside the chat
    if (window.innerWidth < CANVAS_DOCK_MIN) closeCanvas();

    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        if (lastWidth >= CANVAS_DOCK_MIN && w < CANVAS_DOCK_MIN) closeCanvas();
        if (w >= DESKTOP_MIN) aiSidebar.classList.remove('open');
        lastWidth = w;
        syncScrim();
    });

    // New Chat Button
    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            resetConversation();
            playAudioChime('click');
            showToast('Cleared');
        });
    }

    function stopStreaming() {
        if (streamTimer) clearTimeout(streamTimer);
        streamTimer = null;
        isStreaming = false;
        if (dockSendBtn) dockSendBtn.disabled = false;
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }

    function resetConversation() {
        stopStreaming();
        chatMessagesStream.innerHTML = '';
        welcomeHero.classList.remove('hidden');
        document.body.classList.remove('is-chatting');
        chatViewport.scrollTop = 0;
        document.querySelectorAll('.history-item').forEach(i => {
            i.classList.toggle('active', i.dataset.topic === 'welcome');
        });
        if (aiPromptInput) {
            aiPromptInput.value = '';
            aiPromptInput.style.height = 'auto';
            if (finePointer) aiPromptInput.focus();
        }
    }

    // Open the canvas alongside an answer only where it can dock without covering the chat
    function suggestCanvas(tab) {
        if (window.innerWidth >= CANVAS_DOCK_MIN) openCanvas(tab);
    }

    // Quick Memory Navigation in Sidebar
    const TOPIC_PROMPTS = {
        about: ["Tell me about yourself, your background, and your college journey."],
        orbnet: ["Tell me about Orbnet. What is it and how did you build it?", 'projects'],
        palarsoft: ["What did you do during your paid frontend internship at Palarsoft?"],
        library: ["Show me the Vidhyasthali Library live production project.", 'projects'],
        skills: ["What are your core technical skills and programming languages?", 'skills'],
        creative: ["Tell me about your YouTube channel, Algorithm Soft."],
        hackathon: ["Tell me about your experience as a Lead Hackathon Organizer."],
        certificate: ["Show me your verified internship certificate.", 'certificate'],
        contact: ["How can I contact or hire Devansh?", 'contact']
    };

    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', function () {
            const topic = this.dataset.topic;
            if (isStreaming && topic !== 'welcome') {
                showToast('One moment — still answering…');
                return;
            }

            document.querySelectorAll('.history-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            playAudioChime('click');

            if (!isDesktop()) closeSidebarDrawer();

            if (topic === 'welcome') {
                resetConversation();
                return;
            }
            const entry = TOPIC_PROMPTS[topic];
            if (!entry) return;
            handleUserSubmit(entry[0]);
            if (entry[1]) suggestCanvas(entry[1]);
        });
    });

    // ===================================================================
    // PROMPT CHIPS & QUICK ACTIONS
    // ===================================================================
    document.querySelectorAll('.prompt-card').forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.addEventListener('click', function () {
            const prompt = this.dataset.prompt;
            if (prompt) handleUserSubmit(prompt);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    const heroAnnounce = document.querySelector('.hero-announce');
    if (heroAnnounce) {
        heroAnnounce.addEventListener('click', () => {
            handleUserSubmit(heroAnnounce.dataset.prompt);
            suggestCanvas('projects');
        });
    }

    const heroProjectsBtn = document.getElementById('heroProjectsBtn');
    if (heroProjectsBtn) {
        heroProjectsBtn.addEventListener('click', () => {
            playAudioChime('click');
            openCanvas('projects');
        });
    }

    const QUICK_TAG_PROMPTS = {
        Overview: ["Give me a comprehensive overview of your portfolio."],
        Projects: ["Show me all your major live projects.", 'projects'],
        Experience: ["What is your professional work experience?"],
        Skills: ["What technical skills and tools do you specialize in?", 'skills'],
        Certificate: ["Show me your verified MCA certificate.", 'certificate'],
        Contact: ["How can I hire or contact you?", 'contact']
    };

    document.querySelectorAll('.quick-tag').forEach(tag => {
        tag.addEventListener('click', function () {
            if (isStreaming) return;
            document.querySelectorAll('.quick-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            playAudioChime('click');
            const entry = QUICK_TAG_PROMPTS[this.dataset.query];
            if (!entry) return;
            handleUserSubmit(entry[0]);
            if (entry[1]) suggestCanvas(entry[1]);
        });
    });

    // ===================================================================
    // INTENT MATCHING & RESPONSES
    // Each intent scores the question by whole-word matches. Specific names
    // ("heygen", "palarsoft") weigh 3, topic words 2, loose words 1, and the
    // highest total wins — so "experience as a hackathon organiser" lands on
    // the hackathon answer instead of whichever generic word matched first.
    // ===================================================================
    const INTENTS = [
        { id: 'certificate', terms: [[3, 'certificates?', 'mca', 'credentials?'], [2, 'verif(y|ied|ication)', 'proof']] },
        { id: 'library', terms: [[3, 'vidhyasthali', 'library', 'barmer'], [1, 'books?', 'reading']] },
        { id: 'creative', terms: [[3, 'heygen', 'davinci', 'canva', 'algorithm soft', 'youtube', 'yt', 'channel'], [2, 'videos?', 'media', 'creative', 'editing', 'prompt engineering'], [1, 'design']] },
        { id: 'hackathon', terms: [[3, 'hackathons?'], [2, 'organi[sz](er|ing|e|ed)', 'leadership', 'events?'], [1, 'lead']] },
        { id: 'orbnet', terms: [[3, 'orbnet', 'avichal'], [2, 'startups?', 'founder', 'found(ed|ing)?', 'entrepreneur\\w*']] },
        { id: 'palarsoft', terms: [[3, 'palarsoft', 'vimalsoft'], [2, 'internships?', 'intern', 'experience', 'jobs?', 'career', 'employment'], [1, 'professional', 'company']] },
        { id: 'contact', terms: [[3, 'contact', 'hire', 'hiring', 'email', 'linkedin', 'get in touch'], [2, 'reach', 'collaborat\\w*', 'message', 'available']] },
        { id: 'resume', terms: [[3, 'resume', 'cv']] },
        { id: 'skills', terms: [[3, 'skills?', 'stack', 'c\\+\\+', 'dsa', 'javascript', 'html', 'css', 'bootstrap', 'mongo(db)?', 'data structures'], [2, 'tech(nical|nologies|nology)?', 'languages?', 'algorithms?', 'coding', 'programming', 'tools']] },
        { id: 'projects', terms: [[3, 'projects?', 'shipped', 'showcase'], [1, 'built', 'build', 'work', 'made', 'apps?', 'live']] },
        { id: 'about', terms: [[3, 'about (yourself|you)', 'who are you', 'bio', 'yourself'], [2, 'background', 'college', 'education', 'degree', 'university', 'git jaipur', 'rtu', 'kota', 'story', 'journey'], [1, 'studying', 'student']] },
        { id: 'overview', terms: [[3, 'overview', 'summary', 'portfolio', 'everything']] }
    ];

    // Compile once: each term becomes a whole-word, case-insensitive regex
    INTENTS.forEach(intent => {
        intent.matchers = [];
        intent.terms.forEach(([weight, ...words]) => {
            words.forEach(w => intent.matchers.push({ weight, re: new RegExp(`(^|[^a-z0-9+])${w}(?![a-z0-9])`, 'i') }));
        });
    });

    function detectIntent(query) {
        const q = query.toLowerCase().replace(/[’']/g, '').trim();
        let best = null;
        let bestScore = 0;
        INTENTS.forEach(intent => {
            const score = intent.matchers.reduce((sum, m) => sum + (m.re.test(q) ? m.weight : 0), 0);
            if (score > bestScore) {
                best = intent.id;
                bestScore = score;
            }
        });
        if (!best && /^(hi|hii+|hello|hey|heya|namaste|yo|sup|greetings|hola)\b/.test(q)) return 'greeting';
        return best;
    }

    const PERSPECTIVE_NOTES = {
        Engineer: "> From the engineering side: semantic HTML, CSS that stays maintainable as a site grows, plain JavaScript where a framework isn't needed, and getting time and space complexity right in C++.",
        Founder: "> From the founder side: ship early, listen to users, and land real partners — Avichal Techno Labs was the first. The rest follows from that.",
        Creator: "> From the creator side: on Algorithm Soft I pair HeyGen avatar workflows with careful multi-track editing in DaVinci Resolve 19 so each video feels made, not generated."
    };

    const CHIPS = {
        about: { label: "About me", query: "Tell me about yourself and your background." },
        orbnet: { label: "Orbnet", query: "Tell me about Orbnet." },
        palarsoft: { label: "Palarsoft internship", query: "What did you do at Palarsoft?" },
        library: { label: "Vidhyasthali Library", query: "Show me the Vidhyasthali Library project." },
        creative: { label: "Algorithm Soft (YouTube)", query: "Tell me about your YouTube channel, Algorithm Soft." },
        skills: { label: "Skills", query: "What are your core technical skills?" },
        projects: { label: "All projects", query: "Show me all your projects." },
        contact: { label: "Contact", query: "How can I contact you?" },
        certificateTab: { label: "View certificate", action: () => openCanvas('certificate') },
        certificateFull: { label: "Open full size", action: () => openImageModal() },
        skillsTab: { label: "Skills breakdown", action: () => openCanvas('skills') },
        contactTab: { label: "Contact card", action: () => openCanvas('contact') },
        visitOrbnet: { label: "Visit orbnet.in", url: "https://orbnet.in" },
        visitLibrary: { label: "Visit the library", url: "https://www.vidhyasthalilibrary.online/" },
        email: { label: "Send an email", url: "mailto:devanshbhardwaj375@gmail.com" },
        linkedin: { label: "LinkedIn", url: "https://www.linkedin.com/in/devansh-bhardwaj-b82632324/" }
    };

    const RESPONSES = {
        greeting: { chips: ['about', 'orbnet', 'palarsoft', 'projects'] },
        orbnet: { chips: ['visitOrbnet', 'library', 'palarsoft'], canvasTab: 'projects' },
        palarsoft: { chips: ['certificateTab', 'orbnet', 'skills'], canvasTab: 'certificate' },
        certificate: { chips: ['certificateFull', 'palarsoft'], canvasTab: 'certificate' },
        library: { chips: ['visitLibrary', 'orbnet', 'creative'], canvasTab: 'projects' },
        projects: { chips: ['visitLibrary', 'visitOrbnet', 'skillsTab'], canvasTab: 'projects' },
        skills: { chips: ['skillsTab', 'projects', 'palarsoft'], canvasTab: 'skills' },
        creative: { chips: ['projects', 'skillsTab'] },
        hackathon: { chips: ['orbnet', 'contactTab'] },
        about: { chips: ['orbnet', 'palarsoft', 'library'] },
        contact: { chips: ['email', 'linkedin', 'contactTab'], canvasTab: 'contact' },
        resume: { chips: ['certificateTab', 'email'] },
        overview: { chips: ['about', 'projects', 'certificateTab', 'contact'] }
    };

    function generateAgentResponse(query) {
        const intent = detectIntent(query);
        const key = intent && KNOWLEDGE_BASE[intent] ? intent : 'overview';
        const spec = RESPONSES[key];

        let text = KNOWLEDGE_BASE[key];
        if (!intent) {
            text = "I haven't written an answer for that one yet, so here's the short version.\n\n" + text;
        }
        const note = PERSPECTIVE_NOTES[currentModel];
        if (note && key !== 'contact' && key !== 'greeting') text += '\n\n' + note;

        return {
            text,
            chips: spec.chips.map(id => CHIPS[id]),
            canvasTab: spec.canvasTab
        };
    }

    // ===================================================================
    // MESSAGE RENDERING & STREAMING TYPING SIMULATION
    // ===================================================================
    function handleUserSubmit(text) {
        if (!text || !text.trim()) return;
        if (isStreaming) {
            showToast('One moment — still answering…');
            return;
        }

        const cleanText = text.trim();
        welcomeHero.classList.add('hidden');
        document.body.classList.add('is-chatting');
        setModelMenu(false);

        playAudioChime('send');
        appendUserMessage(cleanText);
        scrollToBottom(true);

        if (aiPromptInput) {
            aiPromptInput.value = '';
            aiPromptInput.style.height = 'auto';
        }

        const responseData = generateAgentResponse(cleanText);

        // Lock input for the whole round-trip, including the short "thinking" pause
        isStreaming = true;
        if (dockSendBtn) dockSendBtn.disabled = true;
        streamTimer = setTimeout(() => streamAgentResponse(responseData), 250);
    }

    function appendUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message user-message';
        msgDiv.innerHTML = `<div class="user-bubble">${escapeHtml(text)}</div>`;
        chatMessagesStream.appendChild(msgDiv);
    }

    // Only one message reads aloud at a time; remember which button to reset
    let speakingBtn = null;

    function setSpeakLabel(btn, label) {
        if (btn) btn.querySelector('span').textContent = label;
    }

    function streamAgentResponse(data) {
        playAudioChime('receive');

        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message agent-message';
        msgDiv.innerHTML = `
            <div class="agent-avatar-col">
                <div class="agent-bubble-avatar">
                    <img src="${currentAvatarSrc()}" alt="Devansh" class="agent-thumb-avatar" onerror="this.style.display='none';this.parentElement.textContent='DB';">
                </div>
            </div>
            <div class="agent-content-col">
                <div class="agent-meta-header">
                    <span class="agent-name-tag">Devansh</span>
                </div>
                <div class="agent-bubble-body">
                    <span class="stream-text"></span><span class="ai-typing-cursor"></span>
                </div>
                <div class="message-actions-bar" hidden>
                    <button class="msg-action-btn copy-msg-btn" title="Copy text">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copy</span>
                    </button>
                    <button class="msg-action-btn speak-msg-btn" title="Read aloud">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                        <span>Speak</span>
                    </button>
                </div>
            </div>
        `;

        chatMessagesStream.appendChild(msgDiv);
        scrollToBottom(true);

        const streamTextSpan = msgDiv.querySelector('.stream-text');
        const cursorSpan = msgDiv.querySelector('.ai-typing-cursor');
        const actionsBar = msgDiv.querySelector('.message-actions-bar');
        const rawText = data.text;

        // Token streaming simulation: a few characters per tick, faster for long answers
        let charIndex = 0;
        const step = rawText.length > 900 ? 5 : 3;
        const speed = reduceMotion ? 0 : 12;

        function finish() {
            streamTimer = null;
            cursorSpan.remove();
            streamTextSpan.innerHTML = formatMarkdown(rawText);
            isStreaming = false;
            if (dockSendBtn) dockSendBtn.disabled = false;
            actionsBar.hidden = false;

            if (data.chips && data.chips.length > 0) {
                const chipsContainer = document.createElement('div');
                chipsContainer.className = 'embedded-action-chips';

                data.chips.forEach(chip => {
                    const chipBtn = document.createElement('button');
                    chipBtn.className = 'action-chip-btn';
                    chipBtn.innerHTML = `<span>${escapeHtml(chip.label)}</span> <span aria-hidden="true">→</span>`;

                    chipBtn.addEventListener('click', () => {
                        if (chip.url) {
                            if (chip.url.startsWith('mailto:')) {
                                window.location.href = chip.url;
                            } else {
                                window.open(chip.url, '_blank', 'noopener');
                            }
                        } else if (chip.action) {
                            chip.action();
                        } else if (chip.query) {
                            handleUserSubmit(chip.query);
                        }
                    });

                    chipsContainer.appendChild(chipBtn);
                });

                msgDiv.querySelector('.agent-content-col').appendChild(chipsContainer);
            }

            if (data.canvasTab) suggestCanvas(data.canvasTab);
            scrollToBottom();

            const copyBtn = msgDiv.querySelector('.copy-msg-btn');
            copyBtn.addEventListener('click', () => {
                copyText(rawText).then(() => {
                    copyBtn.querySelector('span').textContent = 'Copied!';
                    showToast('Message copied to clipboard');
                    setTimeout(() => { copyBtn.querySelector('span').textContent = 'Copy'; }, 2000);
                }).catch(() => showToast('Copy is not available in this browser'));
            });

            const speakBtn = msgDiv.querySelector('.speak-msg-btn');
            if (!('speechSynthesis' in window)) {
                speakBtn.remove();
                return;
            }
            speakBtn.addEventListener('click', () => {
                const wasThis = speakingBtn === speakBtn;
                window.speechSynthesis.cancel();
                setSpeakLabel(speakingBtn, 'Speak');
                speakingBtn = null;
                if (wasThis) return;

                const cleanSpeech = rawText
                    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                    .replace(/[*_#`>]/g, '');
                const utterance = new SpeechSynthesisUtterance(cleanSpeech);
                utterance.rate = 1.05;
                utterance.onend = utterance.onerror = () => {
                    if (speakingBtn === speakBtn) {
                        setSpeakLabel(speakBtn, 'Speak');
                        speakingBtn = null;
                    }
                };
                speakingBtn = speakBtn;
                setSpeakLabel(speakBtn, 'Stop');
                window.speechSynthesis.speak(utterance);
            });
        }

        function typeNext() {
            if (charIndex >= rawText.length || speed === 0) {
                finish();
                return;
            }
            charIndex = Math.min(rawText.length, charIndex + step);
            streamTextSpan.innerHTML = formatMarkdown(rawText.substring(0, charIndex));
            scrollToBottom();
            streamTimer = setTimeout(typeNext, speed);
        }

        typeNext();
    }

    // Follow new content only while the reader is already near the bottom
    function scrollToBottom(force) {
        if (!chatViewport) return;
        const distance = chatViewport.scrollHeight - chatViewport.scrollTop - chatViewport.clientHeight;
        if (force || distance < 160) {
            chatViewport.scrollTo({ top: chatViewport.scrollHeight, behavior: 'auto' });
        }
    }

    // Small block-level Markdown renderer: paragraphs, lists, blockquotes + inline styles
    function formatInline(str) {
        return escapeHtml(str)
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\[([^\]]+)\]\(((?:https?:|mailto:)[^)\s]+)\)/g, (m, label, url) => {
                const external = url.startsWith('http');
                return `<a href="${url}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
            });
    }

    function formatMarkdown(str) {
        if (!str) return '';
        const lines = str.split('\n');
        const out = [];
        let listType = null;
        let para = [];

        const flushPara = () => {
            if (para.length) out.push(`<p>${para.join('<br>')}</p>`);
            para = [];
        };
        const closeList = () => {
            if (listType) out.push(`</${listType}>`);
            listType = null;
        };

        lines.forEach(line => {
            const bullet = line.match(/^\s*[-*]\s+(.*)$/);
            const numbered = line.match(/^\s*\d+\.\s+(.*)$/);
            const quote = line.match(/^>\s?(.*)$/);

            if (bullet || numbered) {
                flushPara();
                const type = bullet ? 'ul' : 'ol';
                if (listType !== type) {
                    closeList();
                    out.push(`<${type}>`);
                    listType = type;
                }
                out.push(`<li>${formatInline((bullet || numbered)[1])}</li>`);
            } else if (quote) {
                flushPara();
                closeList();
                out.push(`<blockquote>${formatInline(quote[1])}</blockquote>`);
            } else if (!line.trim()) {
                flushPara();
                closeList();
            } else {
                closeList();
                para.push(formatInline(line));
            }
        });
        flushPara();
        closeList();
        return out.join('');
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // ===================================================================
    // INPUT DOCK INTERACTIONS & KEYBOARD BINDINGS
    // ===================================================================
    if (aiPromptInput) {
        // Auto-expand textarea
        aiPromptInput.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 140) + 'px';
        });

        // Enter key to send (ignored mid-composition for IME keyboards)
        aiPromptInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
                e.preventDefault();
                handleUserSubmit(this.value);
            }
        });
    }

    if (dockSendBtn) {
        dockSendBtn.addEventListener('click', () => {
            if (aiPromptInput) handleUserSubmit(aiPromptInput.value);
        });
    }

    // Voice input via the Web Speech API where the browser supports it
    const dockVoiceBtn = document.getElementById('dockVoiceBtn');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;

    if (dockVoiceBtn) {
        dockVoiceBtn.addEventListener('click', () => {
            if (!SpeechRecognition) {
                showToast('Voice input isn’t supported in this browser — try Chrome or Edge');
                return;
            }
            if (recognition) {
                recognition.stop();
                return;
            }

            recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            dockVoiceBtn.classList.add('listening');
            showToast('Listening…');

            recognition.onresult = (event) => {
                const speechText = event.results[0][0].transcript;
                if (aiPromptInput) aiPromptInput.value = speechText;
                handleUserSubmit(speechText);
            };
            recognition.onerror = (event) => {
                showToast(event.error === 'not-allowed' ? 'Microphone permission was denied' : 'Voice input cancelled');
            };
            recognition.onend = () => {
                dockVoiceBtn.classList.remove('listening');
                recognition = null;
            };

            try {
                recognition.start();
            } catch (err) {
                dockVoiceBtn.classList.remove('listening');
                recognition = null;
            }
        });
    }

    // Sidebar profile badge jumps to the contact card
    const sidebarProfileTrigger = document.getElementById('sidebarProfileTrigger');
    if (sidebarProfileTrigger) {
        sidebarProfileTrigger.addEventListener('click', () => {
            if (!isDesktop()) closeSidebarDrawer();
            openCanvas('contact');
        });
    }

    // Global Keybindings
    document.addEventListener('keydown', (e) => {
        // Cmd + K or Ctrl + K for new conversation
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            resetConversation();
            showToast('Cleared');
        }

        // Escape closes the topmost layer: modal → focus menu → drawer → overlay canvas
        if (e.key === 'Escape') {
            if (imageModalOverlay && imageModalOverlay.classList.contains('open')) {
                closeImageModal();
            } else if (modelSelectorWrapper && modelSelectorWrapper.classList.contains('open')) {
                setModelMenu(false);
                modelSelectorBtn.focus();
            } else if (!isDesktop() && aiSidebar.classList.contains('open')) {
                closeSidebarDrawer();
            } else if (artifactsCanvas && !artifactsCanvas.classList.contains('closed') && window.innerWidth < CANVAS_DOCK_MIN) {
                closeCanvas();
            }
        }
    });

    // ===================================================================
    // 3D TILT & SPOTLIGHT (cards and hero avatar follow the pointer)
    // ===================================================================
    function attachTilt(el, maxDeg) {
        let frame = 0;
        el.classList.add('tilt-3d');
        el.addEventListener('pointermove', (e) => {
            const rect = el.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                el.style.setProperty('--ry', ((px - 0.5) * maxDeg * 2).toFixed(2) + 'deg');
                el.style.setProperty('--rx', ((0.5 - py) * maxDeg * 2).toFixed(2) + 'deg');
                el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
                el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
            });
        });
        el.addEventListener('pointerleave', () => {
            cancelAnimationFrame(frame);
            el.style.setProperty('--rx', '0deg');
            el.style.setProperty('--ry', '0deg');
        });
    }

    if (finePointer && !reduceMotion) {
        document.querySelectorAll('.prompt-card').forEach(el => attachTilt(el, 6));
        document.querySelectorAll('.artifact-card').forEach(el => attachTilt(el, 3));

        // Hero avatar leans toward the pointer anywhere on the stage
        const portal = document.getElementById('heroAvatarPortal');
        if (portal) {
            let raf = 0;
            window.addEventListener('pointermove', (e) => {
                if (welcomeHero.classList.contains('hidden')) return;
                cancelAnimationFrame(raf);
                raf = requestAnimationFrame(() => {
                    const rect = portal.getBoundingClientRect();
                    const dx = (e.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
                    const dy = (e.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
                    portal.style.setProperty('--ry', (dx * 36).toFixed(2) + 'deg');
                    portal.style.setProperty('--rx', (-dy * 36).toFixed(2) + 'deg');
                });
            }, { passive: true });
        }
    }

    // ===================================================================
    // INITIALIZATION & WELCOME SEQUENCE
    // ===================================================================
    applyAvatar(activeAvatar, false);

    // Focus the input on desktop only; on phones it would pop the keyboard over the hero
    if (finePointer) {
        setTimeout(() => {
            if (aiPromptInput) aiPromptInput.focus({ preventScroll: true });
        }, 600);
    }

})();
