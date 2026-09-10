import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";

import runnerGif from "../assets/images/output-onlinegiftools (1).gif";
import laravelImage from "../assets/images/hero-laravel-dashboard.jpg";
import wordpressImage from "../assets/images/hero-wordpress-store.jpg";
import webDesignImage from "../assets/images/hero-web-design.jpg";
import codeArchitectureImage from "../assets/images/hero-code-architecture.jpg";

import hospitalERPImage from "../assets/images/Hospital ERP.png";
import courseFlowImage from "../assets/images/CourseFlow.png";
import sanaulImage from "../assets/images/Sanaul.png";
import petBuddyImage from "../assets/images/Pet Buddy.png";
import ecommerceImage from "../assets/images/e-commerce.png";

import Group from "../assets/images/Group.png";

export default function Home() {
    const shouldShowPreloader = useRef(!window.__portfolioHomeVisited).current;
    window.__portfolioHomeVisited = true;

    useEffect(() => {
        window.scrollTo(0, 0);
        let cancelled = false;

        import("../assets/js/script.js").then(({ initPortfolioScripts }) => {
            if (!cancelled) initPortfolioScripts();
        });

        return () => {
            cancelled = true;
            if (window.ScrollTrigger) {
                window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
            if (window.__cfLenis) {
                window.__cfLenis.destroy();
                window.__cfLenis = null;
            }
        };
    }, []);

    return (
        <>
            <header className="main-header">
                <div className="header-inner">
                    <div className="logo">
                        <a href="#home" className="logo-link text-decoration-none text-dark">
                            <h1 style={{ fontFamily: "'Kelly Slab', serif", margin: 0 }}>Sanaul</h1>
                        </a>
                    </div>
                    <nav className="nav desktop-nav" aria-label="Main Navigation">
                        <a href="#home" className="nav-link"> HOME </a>
                        <a href="#services" className="nav-link"> Services </a>
                        <a href="#projects" className="nav-link"> Projects </a>
                        <a href="#about" className="nav-link"> About me </a>
                        <a href="#contact" className="nav-link"> Contact me </a>
                    </nav>
                    <div className="header-actions">
                        <NavLink to="/contact" className="header-btn d-none d-lg-inline-flex"> Get in Touch <i
                            className="fa-solid fa-arrow-right-long"></i></NavLink>
                        <button className="mobile-nav-toggle" id="mobileNavToggle" aria-label="Toggle Navigation Menu"
                            aria-expanded="false" aria-controls="mobileNavDrawer">
                            <span className="hamburger-bar"></span>
                            <span className="hamburger-bar"></span>
                            <span className="hamburger-bar"></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* <!-- Mobile Navigation Drawer & Backdrop --> */}
            <div className="mobile-nav-backdrop" id="mobileNavBackdrop"></div>
            <div className="mobile-nav-drawer" id="mobileNavDrawer" aria-hidden="true">
                <div className="mobile-nav-header">
                    <div className="logo">
                        <h2 style={{ fontFamily: "'Kelly Slab', serif", margin: 0, fontSize: '1.8rem' }}>Sanaul</h2>
                    </div>
                    <button className="mobile-nav-close" id="mobileNavClose" aria-label="Close Navigation Menu">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <nav className="mobile-nav-links" aria-label="Mobile Navigation">
                    <a href="#home" className="mobile-nav-link">
                        <span>01</span> HOME
                    </a>
                    <a href="#services" className="mobile-nav-link">
                        <span>02</span> Services
                    </a>
                    <a href="#projects" className="mobile-nav-link">
                        <span>03</span> Projects
                    </a>
                    <a href="#about" className="mobile-nav-link">
                        <span>04</span> About me
                    </a>
                    <a href="#contact" className="mobile-nav-link">
                        <span>05</span> Contact me
                    </a>
                </nav>
                <div className="mobile-nav-footer">
                    <NavLink to="/contact" className="cf-button cf-button--dark w-100 justify-content-center mobile-cta">
                        Get in Touch <i className="fa-solid fa-arrow-right-long"></i>
                    </NavLink>
                    <div className="mobile-nav-socials mt-3">
                        <a href="mailto:saimhaque55@gmail.com"><i className="fa-solid fa-envelope"></i> saimhaque55@gmail.com</a>
                        <span className="location"><i className="fa-solid fa-location-dot"></i> Dhaka, Bangladesh</span>
                    </div>
                </div>
            </div>

            <main>
                {shouldShowPreloader && (
                    <div className="preloader" id="preloader" role="status" aria-label="Loading">
                        <div className="name-container" aria-label="Sanaul">
                            {"SANAUL".split("").map((letter, index) => (
                                <span className="letter" key={`${letter}-${index}`}>{letter}</span>
                            ))}
                        </div>
                        {/* <div className="subtitle">Creative Developer</div> */}
                        <div className="glow-line" />
                        <div className="loading-dots" aria-hidden="true">
                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                        </div>
                    </div>
                )}

                {/* <!-- 1. HOME SECTION --> */}
                <div className="cf-stage" id="cfStage">
                    <div className="position-relative overflow-hidden hero-section" id="home">
                        <div>
                            <img src={runnerGif} className="runnerLeft" alt="" />
                            <img src={runnerGif} className="runnerRight" alt="" />
                        </div>
                        <div>
                            <img src={laravelImage} className="cf-side sideLeft" data-side="left"
                                data-rot="45" alt="Laravel SaaS &amp; Admin Dashboard" />
                            <img src={wordpressImage} className="cf-side sideLeft2" data-side="left"
                                data-rot="45" alt="Custom WordPress &amp; WooCommerce Store" />
                            <img src={webDesignImage} className="cf-side sideRight" data-side="right"
                                data-rot="-45" alt="Modern Web Design &amp; Figma UI/UX" />
                            <img src={codeArchitectureImage} className="cf-side sideRight2" data-side="right"
                                data-rot="-45" alt="Backend Code &amp; API Architecture" />
                        </div>
                        <div className="overlay">
                            <div className="grid">
                                <div className="grid-lines"></div>
                            </div>
                        </div>
                        <div className="row h-100">
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-6 h-100">
                                <div className="border-0 shadow-sm overflow-hidden">
                                    <div className="p-0">
                                        <div className="orbit-stage" id="orbitStage">
                                            <div className="orbit-center">
                                                <img src={Group} className="cf-side sideRight2" data-side="right"
                                                    data-rot="-45" alt="Backend Code &amp; API Architecture" />
                                            </div>
                                            {/* <!-- OUTER RING (BACKEND & CORE STACK) --> */}
                                            <div className="orbit" data-radius="260" data-icon-size="40" data-duration="20">
                                                <i className="fa-brands fa-laravel" style={{ color: '#FF2D20' }}></i>
                                                <i className="fa-brands fa-wordpress" style={{ color: '#21759B' }}></i>
                                                <i className="fa-brands fa-php" style={{ color: '#777BB4' }}></i>
                                                <i className="fa-brands fa-js" style={{ color: '#F7DF1E' }}></i>
                                                <i className="fa-brands fa-github" style={{ color: '#181717' }}></i>
                                                <i className="fa-brands fa-claude" style={{ color: '#181717' }}></i>
                                            </div>
                                            {/* <!-- INNER RING (FRONTEND & DESIGN) --> */}
                                            <div className="orbit" data-radius="200" data-icon-size="30" data-duration="20"
                                                data-speed="2" data-reverse>
                                                <i className="fa-brands fa-react" style={{ color: '#E34F26' }}></i>
                                                <i className="fa-brands fa-html5" style={{ color: '#E34F26' }}></i>
                                                <i className="fa-brands fa-css3-alt" style={{ color: '#1572B6' }}></i>
                                                <i className="fa-brands fa-bootstrap" style={{ color: '#7952B3' }}></i>
                                                <i className="fa-brands fa-figma" style={{ color: '#F24E1E' }}></i>
                                                <i className="fa-brands fa-chatgpt" style={{ color: '#181717' }}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-column justify-content-center align-items-center h-100 pb-5">
                                    <p className="hero-title mb-0" style={{ fontSize: '8rem' }}><span className="line-shadow-text fst-italic">Sanaul</span></p>
                                    <div className="word-rotate display-6 fw-bold text-center">
                                        <span>Full-Stack Web Developer.</span>
                                        <span>Laravel &amp; Backend Engineer.</span>
                                        <span>WordPress &amp; Designer.</span>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-3">

                            </div>
                        </div>
                    </div>

                    {/* <!-- 2. SERVICES SECTION --> */}
                    <section className="cf-panel cf-services" id="services" aria-label="Services">
                        <div className="cf-services__head">
                            <div>
                                <p className="cf-eyebrow">My Services</p>
                                <h2 className="cf-services__title">Web Design, WordPress &amp; Laravel Development</h2>
                            </div>
                            <p className="cf-counter mb-0"><b id="cfIndex">1</b> / <span id="cfTotal">6</span></p>
                        </div>

                        <div className="cf-track-viewport">
                            <div className="cf-track" id="cfTrack">

                                {/* <!-- Card 1: Web Design --> */}
                                <article className="cf-card">
                                    <div className="cf-card__icon"><i className="fa-solid fa-palette"></i></div>
                                    <h3 className="cf-card__title">Web Design</h3>
                                    <p className="cf-card__copy">Clean, modern, and responsive user interfaces tailored for high
                                        conversion, brand distinction, and seamless cross-device usability.</p>
                                    <ul className="cf-card__tags">
                                        <li>Design</li>
                                        <li>Figma to Html</li>
                                        <li>Responsive</li>
                                        <li>Frontend</li>
                                    </ul>
                                </article>

                                {/* <!-- Card 2: Laravel Developer --> */}
                                <article className="cf-card">
                                    <div className="cf-card__icon"><i className="fa-brands fa-laravel"></i></div>
                                    <h3 className="cf-card__title">Laravel Development</h3>
                                    <p className="cf-card__copy">Scalable, enterprise-ready web applications built on Laravel MVC
                                        architecture with clean Eloquent relations, queues, and robust testing.</p>
                                    <ul className="cf-card__tags">
                                        <li>Laravel</li>
                                        <li>PHP</li>
                                        <li>MVC</li>
                                        <li>MySQL</li>
                                    </ul>
                                </article>

                                {/* <!-- Card 3: Backend Developer --> */}
                                <article className="cf-card">
                                    <div className="cf-card__icon"><i className="fa-solid fa-server"></i></div>
                                    <h3 className="cf-card__title">Backend &amp; REST APIs</h3>
                                    <p className="cf-card__copy">High-performance API endpoints, database schema optimization,
                                        secure authentication (Sanctum/JWT), and third-party integrations.</p>
                                    <ul className="cf-card__tags">
                                        <li>REST APIs</li>
                                        <li>Database Design</li>
                                        <li>Auth / Security</li>
                                        <li>Sanctum</li>
                                    </ul>
                                </article>

                                {/* <!-- Card 4: Full-Stack Solutions --> */}
                                <article className="cf-card">
                                    <div className="cf-card__icon"><i className="fa-solid fa-layer-group"></i></div>
                                    <h3 className="cf-card__title">Full-Stack Web Apps</h3>
                                    <p className="cf-card__copy">End-to-end custom software solutions combining reactive frontends
                                        with powerful backend APIs, payments, and deployment pipelines.</p>
                                    <ul className="cf-card__tags">
                                        <li>Full-Stack</li>
                                        <li>Laravel / React</li>
                                        <li>Sanctum / Axios</li>
                                        <li>Stripe / SSLCommerz</li>
                                    </ul>
                                </article>

                                {/* <!-- Card 5: WordPress Design --> */}
                                <article className="cf-card">
                                    <div className="cf-card__icon"><i className="fa-brands fa-wordpress"></i></div>
                                    <h3 className="cf-card__title">WordPress Design &amp; Build</h3>
                                    <p className="cf-card__copy">Custom theme development, WooCommerce setups, Elementor/ACF
                                        configurations, and secure CMS architecture that is easy to manage.</p>
                                    <ul className="cf-card__tags">
                                        <li>WordPress</li>
                                        <li>WooCommerce</li>
                                        <li>Elementor</li>
                                    </ul>
                                </article>


                                {/* <!-- Card 6: Speed & Performance --> */}
                                <article className="cf-card">
                                    <div className="cf-card__icon"><i className="fa-solid fa-gauge-high"></i></div>
                                    <h3 className="cf-card__title">Speed &amp; Optimization</h3>
                                    <p className="cf-card__copy">Core Web Vitals tuning, database query caching, asset minification,
                                        and technical SEO structure for lightning-fast page loading.</p>
                                    <ul className="cf-card__tags">
                                        <li>Core Web Vitals</li>
                                        <li>Speed Audit</li>
                                        <li>Caching</li>
                                        <li>Technical SEO</li>
                                    </ul>
                                </article>

                            </div>
                        </div>

                        <div className="cf-progress"><span id="cfProgressBar"></span></div>
                    </section>

                </div>

                {/* <!-- 3. PROJECTS SECTION --> */}
                <section className="cf-images" id="projects" aria-label="Projects">
                    <div className="sliding-images">
                        <img src={hospitalERPImage} className="slideImage lefts" data-project="hospital-erp"
                            data-side="left" data-rot="45" alt="Hospital ERP project" />
                        <img src={courseFlowImage} className="slideImage lefts2"
                            data-project="lms" data-side="left" data-rot="45" alt="Dashboard interface concept" />
                        <img src={sanaulImage} className="slideImage center" data-project="sanaul-portfolio"
                            data-side="left" data-rot="0" alt="Sanaul portfolio project" />
                        <img src={petBuddyImage} className="slideImage Rights" data-project="pet-buddy"
                            data-side="right" data-rot="135" alt="Pet Buddy project" />
                        <img src={ecommerceImage} className="slideImage Rights"
                            data-project="E-Commerce" data-side="right" data-rot="135" alt="E-commerce interface concept" />
                    </div>
                    <div className="projects-content">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p className="hero-title mb-0" style={{ fontSize: '4rem' }}><span className="line-shadow-text fst-italic">Projects</span></p>
                            <div className="word-rotate display-7 fw-bold text-center">
                                <span>Built to solve real problems.</span>
                                <span>Designed for useful experiences.</span>
                            </div>
                        </div>
                    </div>
                    <div className="project-spotlight" aria-live="polite">
                        <div className="project-spotlight__topline">
                            <p className="cf-eyebrow">Selected project</p>
                            <span><b id="projectIndex">01</b> / <span id="projectTotal">05</span></span>
                        </div>
                        <h2 id="projectTitle">Hospital ERP</h2>
                        <p id="projectDescription">A practical hospital management platform that brings patients, appointments, billing, and daily operations into one clear workflow.</p>
                        <div className="project-spotlight__meta">
                            <span><b>Role</b><strong id="projectRole">Full-Stack Developer</strong></span>
                            <span><b>Stack</b><strong id="projectStack">Laravel · PHP · MySQL</strong></span>
                        </div>
                        <a className="project-spotlight__link" href="contact-me.html">Discuss a similar project <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                    </div>
                </section>

                {/* <!-- 4. ABOUT SECTION --> */}
                <section className="cf-about" id="about" aria-labelledby="aboutTitle">
                    <div className="cf-about__grid">
                        <div className="cf-about__intro">
                            <p className="cf-eyebrow">About Me</p>
                            <h2 id="aboutTitle">Crafting code and interfaces that solve real problems.</h2>
                        </div>
                        <div className="cf-about__copy">
                            <p>I am S.M Sanaul Haque, a passionate web developer with deep expertise in modern web design,
                                custom
                                WordPress solutions, and high-performance Laravel backend architecture.</p>
                            <p>Whether building an application from scratch, developing custom REST APIs, or optimizing website
                                speed, I focus on clean code, dependable performance, and seamless user experiences.</p>
                            <div className="cf-about__actions">
                                <NavLink className="cf-button cf-button--dark" to="/contact">Get in Touch <i
                                    className="fa-solid fa-arrow-right-long"></i></NavLink>
                                {/* <a className="cf-button cf-button--line" href="tel:+8801700000000"><i className="fa-solid fa-phone"></i>
                                    Call Me</a> */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="cf-about__stats" aria-label="Professional highlights">
                        <div><strong>05+</strong><span>Years Experience</span></div>
                        <div><strong>50+</strong><span>Projects Delivered</span></div>
                        <div><strong>100%</strong><span>Client Satisfaction</span></div>
                    </div> */}
                </section>

                {/* <!-- 5. CONTACT SECTION --> */}
                <section className="cf-contact" id="contact" aria-labelledby="contactTitle">
                    <div className="cf-contact__topline">
                        <p className="cf-eyebrow">Start a conversation</p>
                        <span>Available for freelance &amp; full-time contracts</span>
                    </div>
                    <div className="cf-contact__body">
                        <h2 id="contactTitle">Have a project in mind?<br /><em>Let&apos;s build it together.</em></h2>
                        <a className="cf-contact__arrow" href="mailto:saimhaque55@gmail.com" aria-label="Email Sanaul">
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                    <div className="cf-contact__details">
                        <a href="mailto:saimhaque55@gmail.com">saimhaque55@gmail.com</a>
                        {/* <a href="tel:+8801700000000">+880 1700 000 000</a> */}
                        <span>Dhaka, Bangladesh</span>
                    </div>
                </section>
            </main>
        </>
    )
}
