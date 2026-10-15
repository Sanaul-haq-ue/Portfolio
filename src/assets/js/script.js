/**
 * Sanaul Portfolio - Main Interactive & Animation Scripts
 * Includes: Orbit Animation, Line Shadow Text, Word Rotate,
 * Lenis Smooth Scroll, Hero Services Pin Timeline, and Sliding Images Fan-Out
 */

export function initPortfolioScripts() {

/* ═══════════ MODULE 1: ORBITING TECH ICONS ═══════════ */
(function () {
    "use strict";

    var STAGE = document.getElementById("orbitStage");
    if (!STAGE) return;

    var EDGE_PADDING = 8;
    var MIN_ICON_SIZE = 20;
    var DEFAULTS = { radius: 260, iconSize: 40, duration: 20, speed: 1 };
    var rings = [];

    function num(value, fallback) {
        var n = parseFloat(value);
        return isNaN(n) ? fallback : n;
    }

    function flag(value) {
        return value !== undefined && value !== "false";
    }

    function initOrbit(orbitEl) {
        var oldPaths = orbitEl.querySelectorAll("svg.orbit-path");
        Array.prototype.forEach.call(oldPaths, function (p) { p.remove(); });

        var cfg = {
            radius: num(orbitEl.dataset.radius, DEFAULTS.radius),
            iconSize: num(orbitEl.dataset.iconSize, DEFAULTS.iconSize),
            duration: num(orbitEl.dataset.duration, DEFAULTS.duration),
            speed: num(orbitEl.dataset.speed, DEFAULTS.speed) || 1,
            reverse: flag(orbitEl.dataset.reverse),
            path: orbitEl.dataset.path !== "false"
        };

        var icons = Array.prototype.slice.call(orbitEl.children);
        if (!icons.length) return;

        var step = 360 / icons.length;

        icons.forEach(function (icon, i) {
            icon.classList.add("orbit-item");
            icon.classList.toggle("orbit-item--reverse", cfg.reverse);
            icon.setAttribute("aria-hidden", "true");
            icon.style.setProperty("--angle", step * i);
            icon.style.setProperty("--radius", cfg.radius);
            icon.style.setProperty("--icon-size", cfg.iconSize + "px");
            icon.style.setProperty("--duration", cfg.duration / cfg.speed);
        });

        if (cfg.path) {
            var ns = "http://www.w3.org/2000/svg";
            var svg = document.createElementNS(ns, "svg");
            svg.setAttribute("class", "orbit-path");
            var circle = document.createElementNS(ns, "circle");
            circle.setAttribute("cx", "50%");
            circle.setAttribute("cy", "50%");
            circle.setAttribute("r", cfg.radius);
            svg.appendChild(circle);
            orbitEl.appendChild(svg);
            cfg.pathEl = circle;
        }

        cfg.icons = icons;
        rings.push(cfg);
    }

    function init() {
        rings = [];
        var orbits = STAGE.querySelectorAll(".orbit");
        Array.prototype.forEach.call(orbits, initOrbit);
        fit();
    }

    function fit() {
        var box = Math.min(STAGE.clientWidth, STAGE.clientHeight);
        if (!box || !rings.length) return;

        var widest = rings.reduce(function (max, r) {
            return Math.max(max, r.radius + r.iconSize / 2);
        }, 0);

        var scale = Math.min(1, (box / 2 - EDGE_PADDING) / widest);

        rings.forEach(function (r) {
            var radius = (r.radius * scale).toFixed(2);
            var size = Math.max(MIN_ICON_SIZE, r.iconSize * scale).toFixed(2) + "px";

            r.icons.forEach(function (icon) {
                icon.style.setProperty("--radius", radius);
                icon.style.setProperty("--icon-size", size);
            });

            if (r.pathEl) r.pathEl.setAttribute("r", radius);
        });
    }

    init();

    if (window.ResizeObserver) {
        new ResizeObserver(fit).observe(STAGE);
    } else {
        window.addEventListener("resize", fit);
    }

    window.orbitingCircles = { refresh: init };
})();

/* ═══════════ MODULE 3: LINE SHADOW TEXT ═══════════ */
(function () {
    "use strict";

    var SELECTOR = ".line-shadow-text";

    function init() {
        var nodes = document.querySelectorAll(SELECTOR);

        Array.prototype.forEach.call(nodes, function (el) {
            var text = el.textContent.trim();
            if (!text) return;

            el.setAttribute("data-text", text);

            var color = el.getAttribute("data-shadow-color");
            if (color) el.style.setProperty("--shadow-color", color);

            var duration = el.getAttribute("data-duration");
            if (duration) el.style.setProperty("--shadow-duration", duration);
        });
    }

    init();

    window.lineShadowText = { refresh: init };
})();

/* ═══════════ MODULE 4: WORD ROTATE ═══════════ */
(function () {
    "use strict";

    var SELECTOR = ".word-rotate";

    var DEFAULTS = {
        duration: 2500,
        transition: 250,
        distance: "50px"
    };

    function num(value, fallback) {
        var n = parseFloat(value);
        return isNaN(n) ? fallback : n;
    }

    function initOne(el) {
        if (el._wordRotateTimer) clearInterval(el._wordRotateTimer);
        var previous = el.querySelector(".word-rotate__word");
        if (previous) previous.remove();

        var words = Array.prototype.map.call(el.children, function (child) {
            return child.textContent.trim();
        }).filter(Boolean);

        if (!words.length) return;

        var hold = num(el.dataset.duration, DEFAULTS.duration);
        var swap = num(el.dataset.transition, DEFAULTS.transition);

        el.style.setProperty("--wr-swap", swap + "ms");
        el.style.setProperty("--wr-travel", el.dataset.distance || DEFAULTS.distance);

        var display = document.createElement("span");
        display.className = "word-rotate__word";
        display.textContent = words[0];
        el.insertBefore(display, el.firstChild);

        if (words.length < 2) return;

        var index = 0;

        el._wordRotateTimer = setInterval(function () {
            index = (index + 1) % words.length;
            display.classList.add("is-out");

            setTimeout(function () {
                display.textContent = words[index];
                display.classList.remove("is-out");
            }, swap);
        }, hold);
    }

    function init() {
        var nodes = document.querySelectorAll(SELECTOR);
        Array.prototype.forEach.call(nodes, initOne);
    }

    init();

    window.wordRotate = { refresh: init };
})();

/* ═══════════ MODULE 5: GLOBAL LENIS SMOOTH SCROLL ═══════════ */
(function () {
    if (!window.Lenis) return;
    const lenis = new Lenis({
        lerp: 0.12,
        wheelMultiplier: 1.0,
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 1.5,
        infinite: false
    });
    window.__cfLenis = lenis;

    if (window.ScrollTrigger) {
        lenis.on('scroll', ScrollTrigger.update);
    }
    if (window.gsap) {
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }

    // Smooth anchor navigation
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', event => {
                const hash = link.getAttribute('href');
                if (!hash || hash === '#') return;
                const target = document.querySelector(hash);
                if (!target) return;

                event.preventDefault();
                lenis.scrollTo(target, { duration: 1.1, offset: 0 });
                history.pushState(null, '', hash);
            });
        });
    });
})();

/* ═══════════ MODULE 6: HERO & SERVICES TIMELINE (cfStage) ═══════════ */
(function () {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const CFG = {
        intro: { delay: 0.05, dur: 0.75, stagger: 0.06, ease: 'power3.out' },
        exit: { scale: 0.18, spin: 12, ease: 'power2.in' },
        px: { hero: 260, panel: 260, hold: 60 },
        overlap: 0.75,
        cardsSpeed: 0.7,
        scrub: 0.1
    };

    const stage = document.getElementById('cfStage');
    const services = document.getElementById('services') || document.getElementById('cfServices');
    const track = document.getElementById('cfTrack');
    if (!stage || !services || !track) return;

    const vport = stage.querySelector('.cf-track-viewport');
    const cards = gsap.utils.toArray('.cf-card', track);
    const heroRow = stage.querySelector('.hero-section .row');
    const idxEl = document.getElementById('cfIndex');
    const totEl = document.getElementById('cfTotal');
    const barEl = document.getElementById('cfProgressBar');
    if (totEl) totEl.textContent = cards.length;

    const sides = gsap.utils.toArray('.cf-side', stage).map(node => {
        let wrap = node, img = node;
        if (node.tagName === 'IMG') {
            wrap = document.createElement('div');
            wrap.className = 'cf-side ' + [...node.classList].filter(c => c !== 'cf-side').join(' ');
            wrap.dataset.side = node.dataset.side || 'left';
            wrap.dataset.rot = node.dataset.rot || '0';
            node.parentNode.insertBefore(wrap, node);
            wrap.appendChild(node);
            node.className = 'cf-side__img';
        } else {
            img = node.querySelector('img');
        }
        return {
            wrap, img,
            dir: wrap.dataset.side === 'right' ? 1 : -1,
            rot: parseFloat(wrap.dataset.rot) || 0,
            out: 0
        };
    });

    const lenis = window.__cfLenis || null;

    let inner = 0, maxScroll = 0, cardLefts = [];
    function measure() {
        const stageW = stage.clientWidth;

        sides.forEach(s => {
            const w = s.wrap.offsetWidth;
            const h = s.wrap.offsetHeight || w * 1.33;
            const l = s.wrap.offsetLeft;
            const bleed = Math.max(w, h) * 0.75 + 40;
            s.out = s.dir > 0 ? (stageW - l + bleed) : -(l + w + bleed);
        });

        const vs = getComputedStyle(vport);
        inner = vport.clientWidth - parseFloat(vs.paddingLeft) - parseFloat(vs.paddingRight);

        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        let acc = 0; cardLefts = [];
        cards.forEach((c, i) => {
            if (i) acc += gap;
            cardLefts.push(acc);
            acc += c.offsetWidth;
        });
        maxScroll = Math.max(0, acc - inner);
    }

    function base() {
        measure();
        sides.forEach(s => {
            gsap.set(s.wrap, {
                x: 0, y: 0, scale: 1, rotation: 0, autoAlpha: 1,
                transformOrigin: '50% 50%', force3D: true
            });
            gsap.set(s.img, {
                rotation: s.rot, x: s.out, autoAlpha: 0,
                transformOrigin: '50% 50%', force3D: true
            });
        });
        gsap.set(services, { yPercent: 100 });
        gsap.set(track, { x: 0 });
        if (barEl) gsap.set(barEl, { scaleX: 0, transformOrigin: 'left center' });
    }

    let master = null, lastActive = -1;

    function build() {
        if (master) {
            if (master.scrollTrigger) master.scrollTrigger.kill(true);
            master.kill(); master = null;
        }
        measure();
        lastActive = -1;

        const dHero = CFG.px.hero;
        const dPanel = CFG.px.panel;
        const dCards = Math.round(maxScroll * CFG.cardsSpeed);
        const tPanel = Math.round(dHero * CFG.overlap);
        const tCards = tPanel + dPanel + CFG.px.hold;
        const total = tCards + dCards;

        master = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
                trigger: stage,
                start: 'top top',
                end: '+=' + total,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                scrub: CFG.scrub,
                invalidateOnRefresh: true,
                onRefresh: measure,
                onUpdate: self => {
                    const raw = (self.progress * total - tCards) / dCards;
                    const p = raw < 0 ? 0 : raw > 1 ? 1 : raw;
                    if (barEl) gsap.set(barEl, { scaleX: p });

                    const currentX = -p * maxScroll;
                    let best = Infinity, active = 0;
                    for (let i = 0; i < cardLefts.length; i++) {
                        const d = Math.abs(cardLefts[i] + currentX);
                        if (d < best) { best = d; active = i; }
                    }
                    if (active !== lastActive) {
                        lastActive = active;
                        cards.forEach((c, i) => c.classList.toggle('is-active', i === active));
                        if (idxEl) idxEl.textContent = active + 1;
                    }
                }
            }
        });

        sides.forEach((s, i) => {
            master.fromTo(s.wrap,
                { x: 0, scale: 1, rotation: 0, autoAlpha: 1 },
                {
                    x: () => s.out * 0.85,
                    scale: CFG.exit.scale,
                    rotation: s.dir * CFG.exit.spin,
                    autoAlpha: 0,
                    duration: dHero,
                    ease: CFG.exit.ease
                },
                i * (dHero * 0.05));
        });

        if (heroRow) {
            master.fromTo(heroRow,
                { y: 0, autoAlpha: 1 },
                { y: -50, autoAlpha: 0, duration: dHero * 0.8, ease: 'power2.in' }, 0);
        }

        master.fromTo(services,
            { yPercent: 100 },
            { yPercent: 0, duration: dPanel, ease: 'power2.out' }, tPanel);

        master.fromTo(track,
            { x: 0 },
            { x: () => -maxScroll, duration: dCards, ease: 'none' }, tCards);
    }

    function reveal() {
        const st = master && master.scrollTrigger;
        if (st && st.progress > 0.02) {
            sides.forEach(s => gsap.set(s.img, { x: 0, autoAlpha: 1 }));
            return;
        }
        gsap.to(sides.map(s => s.img), {
            x: 0, autoAlpha: 1,
            duration: CFG.intro.dur,
            ease: CFG.intro.ease,
            stagger: CFG.intro.stagger,
            delay: CFG.intro.delay,
            force3D: true
        });
    }

    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
        sides.forEach(s => gsap.set(s.img, { rotation: s.rot, x: 0, autoAlpha: 1 }));
        gsap.set(services, { clearProps: 'transform' });
        return;
    }

    base();
    build();

    const imgs = sides.map(s => s.img).filter(i => i);
    let pending = imgs.filter(i => !i.complete).length;
    if (pending) {
        imgs.forEach(i => {
            if (i.complete) return;
            const done = () => {
                i.removeEventListener('load', done);
                i.removeEventListener('error', done);
                if (--pending === 0) { base(); ScrollTrigger.refresh(); }
            };
            i.addEventListener('load', done);
            i.addEventListener('error', done);
        });
    }

    let fired = false;
    function go() {
        if (fired) return;
        fired = true;
        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            requestAnimationFrame(reveal);
        });
    }

    if (document.readyState === 'complete') {
        requestAnimationFrame(go);
    } else {
        window.addEventListener('load', go, { once: true });
    }

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    let lastW = window.innerWidth, rt;
    window.addEventListener('resize', () => {
        if (window.innerWidth === lastW) return;
        lastW = window.innerWidth;
        clearTimeout(rt);
        rt = setTimeout(() => { build(); ScrollTrigger.refresh(); }, 200);
    });

    window.cfHero = {
        refresh() { build(); ScrollTrigger.refresh(); },
        replay() { base(); reveal(); },
        get timeline() { return master; }
    };
})();

/* MODULE 7: SCROLL-REVEALED PROJECT GALLERY */
(function () {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.cf-gallery');
    if (!section) return;

    const images = gsap.utils.toArray('.cf-gallery__artwork img', section);
    if (images.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    section.classList.add('is-animating');
    const centreIndex = Math.floor(images.length / 2);
    let timeline;

    function buildGallery() {
        if (timeline) {
            if (timeline.scrollTrigger) timeline.scrollTrigger.kill(true);
            timeline.kill();
        }

        const cardWidth = images[0].getBoundingClientRect().width;
        const spread = Math.max(0, Math.min(window.innerWidth * 0.32, window.innerWidth / 2 - cardWidth * 0.52));

        gsap.set(images, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 0.76,
            autoAlpha: 0.55,
            transformOrigin: '50% 50%',
            force3D: true
        });
        images.forEach((image, index) => {
            gsap.set(image, { zIndex: index === centreIndex ? 10 : index < centreIndex ? index + 1 : images.length - index });
        });

        timeline = gsap.timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => '+=' + Math.max(window.innerHeight * 1.15, 760),
                pin: true,
                pinSpacing: true,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        images.forEach((image, index) => {
            const distance = index - centreIndex;
            const isCentre = distance === 0;
            timeline.to(image, {
                x: isCentre ? 0 : (spread / centreIndex) * distance,
                y: isCentre ? 0 : Math.abs(distance) * 15,
                rotation: isCentre ? 0 : distance * 7,
                scale: isCentre ? 1.03 : 0.92,
                autoAlpha: 1,
                duration: 0.8
            }, isCentre ? 0 : 0.12 + Math.abs(distance) * 0.08);
        });
    }

    buildGallery();
    let resizeTimer;
    const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            buildGallery();
            ScrollTrigger.refresh();
        }, 180);
    };
    window.addEventListener('resize', onResize);
    window.__cfGalleryCleanup = () => {
        window.removeEventListener('resize', onResize);
        clearTimeout(resizeTimer);
        if (timeline) timeline.kill();
        section.classList.remove('is-animating');
        window.__cfGalleryCleanup = null;
    };
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
})();
/* MODULE 8: CERTIFICATION CARD ENTRANCE */
(function () {
    if (!window.gsap || !window.ScrollTrigger) return;

    const section = document.querySelector('.cf-certifications');
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = gsap.utils.toArray('.cf-cert-card', section);
    if (!cards.length) return;

    const entrances = [
        { x: -180, y: 20, rotation: -12 },
        { x: 0, y: -150, rotation: 0 },
        { x: 180, y: 20, rotation: 360 },
        { x: -130, y: 150, rotation: -10 },
        { x: 130, y: 150, rotation: -360 }
    ];

    section.classList.add('is-scroll-revealing');
    cards.forEach((card, index) => {
        const entrance = entrances[index % entrances.length];
        gsap.set(card, {
            autoAlpha: 0,
            x: entrance.x,
            y: entrance.y,
            rotation: entrance.rotation,
            scale: 0.72,
            transformOrigin: '50% 50%'
        });
    });

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top 86%',
            end: 'center center',
            scrub: 0.45,
            invalidateOnRefresh: true
        }
    });

    cards.forEach((card, index) => {
        timeline.to(card, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power2.out'
        }, index * 0.44);
    });

    window.__cfCertificationsCleanup = () => {
        timeline.kill();
        section.classList.remove('is-scroll-revealing');
        window.__cfCertificationsCleanup = null;
    };
})();
/* ═══════════════════════════════════════════════════════
   MODULE 9: MOBILE NAVIGATION DRAWER
   ═══════════════════════════════════════════════════════ */
(function () {
    'use strict';

    var toggle   = document.getElementById('mobileNavToggle');
    var drawer   = document.getElementById('mobileNavDrawer');
    var backdrop = document.getElementById('mobileNavBackdrop');
    var closeBtn = document.getElementById('mobileNavClose');

    if (!toggle || !drawer || !backdrop) return;

    var isOpen = false;

    function openDrawer() {
        isOpen = true;
        toggle.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
        drawer.classList.add('is-open');
        backdrop.classList.add('is-open');
        document.body.classList.add('nav-open');
    }

    function closeDrawer() {
        isOpen = false;
        toggle.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        drawer.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        document.body.classList.remove('nav-open');
    }

    toggle.addEventListener('click', function () {
        if (isOpen) { closeDrawer(); } else { openDrawer(); }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeDrawer);
    }

    backdrop.addEventListener('click', closeDrawer);

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) closeDrawer();
    });

    /* Smooth scroll + auto-close on nav link click */
    var mobileLinks = drawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = link.getAttribute('href');
            if (!href || href === '#') { closeDrawer(); return; }

            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                closeDrawer();
                setTimeout(function () {
                    var lenis = window.__cfLenis;
                    if (lenis) {
                        lenis.scrollTo(target, { duration: 1.1, offset: 0 });
                    } else {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                    try { history.pushState(null, '', href); } catch (err) {}
                }, 50);
            } else {
                closeDrawer();
            }
        });
    });

    /* Active link highlight based on scroll */
    var sectionIds = ['home', 'services', 'projects', 'gallery', 'about', 'skills', 'certifications', 'contact'];
    function updateActiveLink() {
        var scrollY = window.scrollY || window.pageYOffset;
        var active = '';
        sectionIds.forEach(function (id) {
            var el = document.getElementById(id);
            if (!el) return;
            var top = el.getBoundingClientRect().top + scrollY - 120;
            if (scrollY >= top) active = id;
        });
        mobileLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + active);
        });
    }
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

})();

}
