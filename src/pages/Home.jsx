import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import SocialDock from "../components/SocialDock";

import hospitalERPImage from "../assets/images/Hospital ERP.png";
import courseFlowImage from "../assets/images/CourseFlow.png";
import sanaulImage from "../assets/images/Sanaul.png";
import petBuddyImage from "../assets/images/Pet Buddy.png";
import ecommerceImage from "../assets/images/e-commerce.png";
import companylandingpage from "../assets/images/companylandingpage.png";


// Add liveUrl and/or githubUrl for each project. The live site is used first;
// projects without either URL remain unlinked.
const projects = [
    { name: "Hospital ERP (API Project)", category: "Full-Stack Application", description: "A clinic management platform for patients, appointments, consultations, prescriptions, records, billing, and reports.", stack: "Laravel · React · MySQL · Sanctum", image: hospitalERPImage, liveUrl: "", githubUrl: "", featured: true }, // Demo GitHub URL: replace with your repository.
    { name: "Learning Management System", category: "Education Platform", description: "A Laravel learning platform for organizing courses, students, instructors, and educational content.", stack: "Laravel · MySQL · JavaScript · Bootstrap", image: courseFlowImage, liveUrl: "", githubUrl: "", featured: true },
    { name: "Pet Buddy", category: "Service & E-commerce Platform", description: "A pet care platform concept for discovering services, managing appointments, and shopping for pet products.", stack: "Laravel · MySQL · JavaScript · Bootstrap", image: petBuddyImage, liveUrl: "", githubUrl: "", featured: true },
    { name: "Sanaul Portfolio", category: "Personal Portfolio", description: "A React portfolio presenting development services, selected work, and a direct way to get in touch.", stack: "React · HTML · CSS · GSAP", image: sanaulImage, liveUrl: "", githubUrl: "" },
    { name: "E-commerce", category: "E-commerce Platform", description: "A storefront concept focused on product discovery, clear product details, and a simple path to purchase.", stack: "Laravel · MySQL · JavaScript · Bootstrap", image: ecommerceImage, liveUrl: "", githubUrl: "" },
    { name: "Company Landing Page", category: "Landing Page", description: "A storefront concept focused on product discovery, clear product details, and a simple path to purchase.", stack: "React · JavaScript · Bootstrap", image: companylandingpage, liveUrl: "https://responsive-company-landing-page.vercel.app/", githubUrl: "" },
];

// Set `issuer` separately for every certificate to show its company or platform.
const certifications = [
    { title: "Responsive Web Design", issuer: "Coderstrust", year: "2019", focus: "Web Design", icon: "fa-solid fa-display" },
    { title: "PHP with Laravel Framework", issuer: "BITM", year: "2023", focus: "Application Development", icon: "fa-brands fa-laravel" },
    { title: "Claude 101", issuer: "Anthropic", year: "2026", focus: "AI Tools", icon: "fa-solid fa-wand-magic-sparkles" },
    // { title: "API Design Foundations", year: "2024", focus: "Backend Development", icon: "fa-solid fa-diagram-project", demo: true },
    // { title: "Cloud Development Essentials", year: "2025", focus: "Cloud & Deployment", icon: "fa-solid fa-cloud", demo: true },
];

export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
        let cancelled = false;

        import("../assets/js/script.js").then(({ initPortfolioScripts }) => {
            if (!cancelled) initPortfolioScripts();
        });

        return () => {
            cancelled = true;
            if (window.__cfGalleryCleanup) window.__cfGalleryCleanup();
            if (window.__cfCertificationsCleanup) window.__cfCertificationsCleanup();
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
                        <a href="#gallery" className="nav-link"> Gallery </a>
                        <a href="#about" className="nav-link"> About me </a>
                        <a href="#skills" className="nav-link"> Skills </a>
                        <a href="#certifications" className="nav-link"> Certs </a>
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
                    <a href="#home" className="mobile-nav-link"><span>01</span> HOME</a>
                    <a href="#services" className="mobile-nav-link"><span>02</span> Services</a>
                    <a href="#projects" className="mobile-nav-link"><span>03</span> Projects</a>
                    <a href="#gallery" className="mobile-nav-link"><span>04</span> Gallery</a>
                    <a href="#about" className="mobile-nav-link"><span>05</span> About me</a>
                    <a href="#skills" className="mobile-nav-link"><span>06</span> Skills</a>
                    <a href="#certifications" className="mobile-nav-link"><span>07</span> Certifications</a>
                    <a href="#contact" className="mobile-nav-link"><span>08</span> Contact me</a>
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
                {/* <!-- 1. HOME SECTION --> */}
                <div className="cf-stage" id="cfStage">
                    <div className="position-relative overflow-hidden hero-section" id="home">
                        <div className="overlay">
                            <div className="grid">
                                <div className="grid-lines"></div>
                            </div>
                        </div>
                        <div className="hero-layout row h-100 align-items-center">
                            <div className="col-lg-7 hero-copy">
                                <p className="hero-kicker"><span></span> Full-Stack Developer <b>·</b> Dhaka, Bangladesh</p>
                                <h2 className="hero-heading" id="homeTitle">I build web products<br /><em>that work beautifully.</em></h2>
                                <p className="hero-description">I&apos;m S.M. Sanaul Haque. I build reliable web applications and polished WordPress experiences—from backend architecture and APIs to responsive interfaces.</p>
                                <div className="hero-actions">
                                    <a className="cf-button cf-button--dark" href="#projects">Explore my work <i className="fa-solid fa-arrow-right-long"></i></a>
                                    <NavLink className="hero-contact-link" to="/contact">Let&apos;s talk <i className="fa-solid fa-arrow-up-right-from-square"></i></NavLink>
                                </div>
                                <div className="hero-stack" aria-label="Core technologies">
                                    <span>Laravel</span><span>React</span><span>WordPress</span><span>MySQL</span>
                                </div>
                            </div>
                            <div className="col-lg-5 hero-visual" aria-label="Developer code preview">
                                <div className="hero-code-window">
                                    <div className="hero-code-window__bar">
                                        <span className="hero-window-dots"><i></i><i></i><i></i></span>
                                        <span>developer.js</span>
                                        <i className="fa-solid fa-code" aria-hidden="true"></i>
                                    </div>
                                    <div className="hero-code-window__body" aria-label="Code preview">
                                        <p><span>01</span><b>const</b> developer = {'{'}</p>
                                        <p><span>02</span>&nbsp;&nbsp;name: <em>&quot;Sanaul Haque&quot;</em>,</p>
                                        <p><span>03</span>&nbsp;&nbsp;role: <em>&quot;Full-Stack Developer&quot;</em>,</p>
                                        <p><span>04</span>&nbsp;&nbsp;builds: [</p>
                                        <p><span>05</span>&nbsp;&nbsp;&nbsp;&nbsp;<em>&quot;Web applications&quot;</em>,</p>
                                        <p><span>06</span>&nbsp;&nbsp;&nbsp;&nbsp;<em>&quot;REST APIs&quot;</em>,</p>
                                        <p><span>07</span>&nbsp;&nbsp;&nbsp;&nbsp;<em>&quot;WordPress sites&quot;</em></p>
                                        <p><span>08</span>&nbsp;&nbsp;]</p>
                                        <p><span>09</span>{'}'};</p>
                                        <p className="hero-code-window__comment"><span>10</span>// Thoughtful code. Useful outcomes.</p>
                                    </div>
                                    <div className="hero-code-window__footer"><span><i></i> Available for projects</span><span>PHP · React · CMS</span></div>
                                </div>
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



                {/* <!-- 4. PROJECTS SECTION --> */}
                <section className="cf-projects" id="projects" aria-labelledby="projectsTitle">
                    <div className="cf-projects__inner">
                        <div className="cf-projects__heading">
                            <div>
                                <p className="cf-eyebrow">Selected Work</p>
                                <h2 id="projectsTitle">Projects built<br />to <em>solve real needs.</em></h2>
                            </div>
                            <p>A selection of applications, platforms, and interface work. Each project has its own goals, constraints, and solution.</p>
                        </div>
                        <div className="cf-projects__featured">
                            {projects.filter(project => project.featured).map((project, index) => {
                                const projectUrl = project.liveUrl || project.githubUrl;
                                const image = (
                                    <div className="cf-project-card__image">
                                        <img src={project.image} alt={`${project.name} preview`} loading="lazy" />
                                        <span>0{index + 1}</span>
                                    </div>
                                );
                                return (
                                    <article className="cf-project-card cf-project-card--featured" key={project.name}>
                                        {projectUrl ? <a className="cf-project-card__link cf-project-card__image-link" href={projectUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} project`}>{image}</a> : image}
                                        <div className="cf-project-card__body">
                                            <p className="cf-project-card__category">{project.category}</p>
                                            <h3>{projectUrl ? <a className="cf-project-card__link" href={projectUrl} target="_blank" rel="noopener noreferrer">{project.name}</a> : project.name}</h3>
                                            <p className="cf-project-card__description">{project.description}</p>
                                            <p className="cf-project-card__stack">{project.stack}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                        <div className="cf-projects__more-heading">
                            <h3>More projects</h3>
                            <span>Experiments and additional work</span>
                        </div>
                        <div className="cf-projects__more">
                            {projects.filter(project => !project.featured).map((project, index) => {
                                const projectUrl = project.liveUrl || project.githubUrl;
                                const image = <img src={project.image} alt={`${project.name} preview`} loading="lazy" />;
                                return (
                                    <article className="cf-project-card cf-project-card--compact" key={`${project.name}-${index}`}>
                                        {projectUrl ? <a className="cf-project-card__link cf-project-card__image-link" href={projectUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} project`}>{image}</a> : image}
                                        <div>
                                            <p className="cf-project-card__category">{project.category}</p>
                                            <h3>{projectUrl ? <a className="cf-project-card__link" href={projectUrl} target="_blank" rel="noopener noreferrer">{project.name}</a> : project.name}</h3>
                                            <p className="cf-project-card__description">{project.description}</p>
                                            <p className="cf-project-card__stack">{project.stack}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                        <div className="cf-projects__cta">
                            <span>Have a project in mind?</span>
                            <NavLink className="cf-button cf-button--dark" to="/contact">Let&apos;s talk <i className="fa-solid fa-arrow-right-long"></i></NavLink>
                        </div>
                    </div>
                </section>

                {/* <!-- 3. VISUAL PROJECT GALLERY --> */}
                <section className="cf-gallery" id="gallery" aria-labelledby="galleryTitle">
                    <div className="cf-gallery__heading">
                        <p className="cf-eyebrow">Visual Gallery</p>
                        <h2 id="galleryTitle">A closer look at<br /><em>what I build.</em></h2>
                    </div>
                    <div className="cf-gallery__artwork">
                        <img src={hospitalERPImage} alt="Hospital ERP dashboard" loading="lazy" />
                        <img src={courseFlowImage} alt="Learning platform dashboard" loading="lazy" />
                        <img src={sanaulImage} alt="Sanaul portfolio website" loading="lazy" />
                        <img src={petBuddyImage} alt="Pet Buddy platform" loading="lazy" />
                        <img src={ecommerceImage} alt="E-commerce interface concept" loading="lazy" />
                    </div>
                    <p className="cf-gallery__caption">Selected screens from applications, platforms, and interface explorations</p>
                </section>



                {/* <!-- 5. ABOUT SECTION --> */}
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

                {/* <!-- 4. DEVELOPER TOOLKIT --> */}
                <section className="cf-toolkit" id="skills" aria-labelledby="toolkitTitle">
                    <div className="cf-toolkit__heading">
                        <div>
                            <p className="cf-eyebrow">Developer Toolkit</p>
                            <h2 id="toolkitTitle">The tools behind<br /><em>the work.</em></h2>
                        </div>
                        <p className="cf-toolkit__intro">I bring design, frontend, and backend together to build web experiences that are useful, maintainable, and ready to grow.</p>
                    </div>
                    <div className="cf-toolkit__grid">
                        <article className="cf-toolkit__card">
                            <span className="cf-toolkit__number">01</span>
                            <i className="fa-solid fa-code" aria-hidden="true"></i>
                            <h3>Frontend</h3>
                            <p>Responsive interfaces with clear layouts, thoughtful details, and accessible interactions.</p>
                            <div className="cf-toolkit__tags"><span>React</span><span>JavaScript</span><span>HTML &amp; CSS</span><span>Bootstrap</span></div>
                        </article>
                        <article className="cf-toolkit__card">
                            <span className="cf-toolkit__number">02</span>
                            <i className="fa-solid fa-gears" aria-hidden="true"></i>
                            <h3>Backend</h3>
                            <p>Reliable application logic, secure APIs, and data models that support real workflows.</p>
                            <div className="cf-toolkit__tags"><span>PHP</span><span>Laravel</span><span>REST APIs</span><span>Sanctum</span></div>
                        </article>
                        <article className="cf-toolkit__card">
                            <span className="cf-toolkit__number">03</span>
                            <i className="fa-solid fa-database" aria-hidden="true"></i>
                            <h3>Data &amp; CMS</h3>
                            <p>Structured data and flexible content tools that are practical to manage and extend.</p>
                            <div className="cf-toolkit__tags"><span>MySQL</span><span>WordPress</span><span>WooCommerce</span><span>ACF</span></div>
                        </article>
                        <article className="cf-toolkit__card">
                            <span className="cf-toolkit__number">04</span>
                            <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
                            <h3>Design &amp; Delivery</h3>
                            <p>From early ideas to polished screens, with attention to performance and the final details.</p>
                            <div className="cf-toolkit__tags"><span>Figma</span><span>Git</span><span>GSAP</span><span>Performance</span></div>
                        </article>
                    </div>
                </section>

                {/* <!-- CERTIFICATIONS --> */}
                <section className="cf-certifications" id="certifications" aria-labelledby="certificationsTitle">
                    <div className="cf-certifications__inner">
                        <div className="cf-certifications__heading">
                            <div>
                                <p className="cf-eyebrow">Learning &amp; Credentials</p>
                                <h2 id="certificationsTitle">Skills built<br />through <em>learning.</em></h2>
                            </div>
                            <p>Certifications and focused learning that support the work I do across design, development, and modern tools.</p>
                        </div>
                        <div className="cf-certifications__grid">
                            {certifications.map((certification, index) => (
                                <article className="cf-cert-card" key={certification.title}>
                                    <div className="cf-cert-card__topline">
                                        <span className="cf-cert-card__icon"><i className={certification.icon} aria-hidden="true"></i></span>
                                        <span className="cf-cert-card__year">{certification.year}</span>
                                    </div>
                                    <p className="cf-cert-card__focus">{certification.focus}</p>
                                    <h3>{certification.title}</h3>
                                    <p className="cf-cert-card__issuer"><span>Issued by</span><strong>{certification.issuer}</strong></p>
                                    <span className="cf-cert-card__index">{certification.demo ? `Demo credential 0${index + 1}` : `Credential 0${index + 1}`}</span>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* <!-- 6. HOW I WORK --> */}
                <section className="cf-process" aria-labelledby="processTitle">
                    <div className="cf-process__heading">
                        <p className="cf-eyebrow">A Clear Process</p>
                        <h2 id="processTitle">From first idea<br />to <em>finished product.</em></h2>
                        <p>Good development starts with understanding the people and problems behind a project.</p>
                    </div>
                    <div className="cf-process__steps">
                        <article><span>01 / Discover</span><h3>Understand the goal</h3><p>We clarify the audience, requirements, and what success should look like before choosing a solution.</p></article>
                        <article><span>02 / Shape</span><h3>Plan the experience</h3><p>I map the key screens, data, and application structure so the design and engineering work together.</p></article>
                        <article><span>03 / Build</span><h3>Develop in the open</h3><p>Focused iterations turn the plan into a responsive interface, dependable features, and connected systems.</p></article>
                        <article><span>04 / Refine</span><h3>Polish and deliver</h3><p>We review the details, improve performance, and prepare the finished work for its next step.</p></article>
                    </div>
                </section>

                {/* <!-- 7. CONTACT SECTION --> */}
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
                        {/* <a href="mailto:saimhaque55@gmail.com">saimhaque55@gmail.com</a> */}
                        {/* <a href="tel:+8801700000000">+880 1700 000 000</a> */}
                        <span>Dhaka, Bangladesh</span>
                    </div>
                </section>
            </main>
            <SocialDock />
        </>
    )
}
