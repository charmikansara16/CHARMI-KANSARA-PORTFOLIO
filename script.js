/**
 * CHARMI KANSARA - PERSONAL PORTFOLIO JAVASCRIPT
 * B.Tech CSE Student | Aspiring AI/ML Engineer @ Indus University
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CONSTELLATION PARTICLES BACKGROUND CANVAS
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const particles = [];
        const particleCount = Math.min(Math.floor(width / 20), 65);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(236, 72, 153, ';
                this.alpha = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha + ')';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const lineAlpha = (1 - dist / 110) * 0.18;
                        ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateParticles);
        }

        animateParticles();

        window.addEventListener('resize', () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        });
    }

    /* ==========================================================================
       2. TYPING ANIMATION FOR HERO TITLE
       ========================================================================== */
    const typingElement = document.getElementById('typing-text');
    const titles = [
        "Aspiring AI/ML Engineer",
        "B.Tech CSE Student",
        "AI & Technology Enthusiast",
        "Data-Driven Developer"
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingElement) return;

        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    /* ==========================================================================
       3. SCROLL PROGRESS BAR & NAVBAR BEHAVIOR & BACK TO TOP
       ========================================================================== */
    const progressBar = document.getElementById('scroll-progress-bar');
    const navbar = document.getElementById('mainNavbar');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (progressBar && docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        }

        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollTop > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       4. ACTIVE NAVBAR LINK BASED ON SCROLL (SCROLLSPY)
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function highlightNavOnScroll() {
        const scrollY = window.scrollY + 200;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    const navbarCollapse = document.getElementById('navbarContent');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    /* ==========================================================================
       5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       6. SKILLS FILTERING CATEGORIES
       ========================================================================== */
    const filterBtns = document.querySelectorAll('#skills-filter .btn-filter');
    const skillItems = document.querySelectorAll('.skill-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==========================================================================
       7. INTERACTIVE PROJECT DETAIL MODALS
       ========================================================================== */
    const projectData = {
        '1': {
            title: "Smart Shopping Assistant",
            subtitle: "Multimodal Voice, Text & Image Product Discovery",
            badge: "AI/ML Concept",
            description: "A multimodal shopping assistant concept designed to understand user requirements through voice queries, natural language text inputs, and uploaded product images. It assists users in discovering relevant products tailored to their individual preferences.",
            features: [
                "Voice Input Recognition & Natural Language Query Understanding",
                "Product Image Feature Extraction & Similarity Matching",
                "Personalized AI Recommendation Engine",
                "Conversational Commerce Interface Concept"
            ],
            techStack: ["Artificial Intelligence", "Machine Learning", "Voice Input Processing", "Multimodal Analysis", "Product Recommendation Engine"],
            status: "Academic Concept & Architecture Design"
        },
        '2': {
            title: "Gen AI Platform for Automated Content Transformation",
            subtitle: "Generative AI Document & Advisory Processing Engine",
            badge: "Generative AI Platform",
            description: "A Generative AI platform concept engineered to transform uploaded content such as research documents, reports, advisories, and unstructured text into communication-ready content formats tailored for diverse target audiences.",
            features: [
                "Document Parsing & Multi-Format Ingestion (PDF, DOCX, Reports)",
                "Retrieval-Augmented Generation (RAG) Architecture",
                "Automated Summary, Presentation & Advisory Formatting",
                "FastAPI Backend with Docker Containerization Concept"
            ],
            techStack: ["Generative AI", "LLM APIs", "OCR", "Speech-to-Text", "RAG Architecture", "Vector Databases", "FastAPI", "Docker"],
            status: "Academic Concept & Pipeline Design"
        },
        '3': {
            title: "Scholarship Discovery Platform",
            subtitle: "Smart Eligibility Matching & Opportunity Portal",
            badge: "EdTech Solution",
            description: "A scholarship discovery platform concept designed to help students filter and identify relevant financial aid and scholarship opportunities based on education level, category, family income, state of residence, and academic percentage.",
            features: [
                "Multi-criteria Filter Engine (Income, State, Percentage, Category)",
                "Automated Eligibility Verification Logic",
                "Required Document Checklist & Deadline Reminders",
                "Direct Official Scholarship Portal Links"
            ],
            techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Data Filtering Algorithms"],
            status: "Functional Concept & Web Prototype"
        }
    };

    const modalTriggers = document.querySelectorAll('.project-modal-trigger');
    const projectModalBody = document.getElementById('projectModalBody');
    const projectModalLabel = document.getElementById('projectModalLabel');
    const projectDetailModalElement = document.getElementById('projectDetailModal');
    let projectDetailModal = null;
    if (projectDetailModalElement) {
        projectDetailModal = new bootstrap.Modal(projectDetailModalElement);
    }

    modalTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];

            if (data && projectModalBody && projectModalLabel && projectDetailModal) {
                projectModalLabel.textContent = data.title;
                
                projectModalBody.innerHTML = `
                    <div class="mb-3">
                        <span class="badge bg-primary-subtle text-primary border border-primary-subtle mb-2">${data.badge}</span>
                        <h4 class="h5 text-cyan fw-bold mb-2">${data.subtitle}</h4>
                        <p class="text-secondary small leading-relaxed">${data.description}</p>
                    </div>

                    <div class="mb-3 p-3 rounded-3 bg-dark-subtle border border-dark-subtle">
                        <h5 class="h6 fw-bold text-uppercase text-gradient mb-2"><i class="fa-solid fa-list-check me-2"></i>Key Features & Innovations</h5>
                        <ul class="text-secondary small ps-3 mb-0">
                            ${data.features.map(f => `<li class="mb-1">${f}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="mb-3">
                        <h5 class="h6 fw-bold text-uppercase text-gradient mb-2"><i class="fa-solid fa-code me-2"></i>Technologies & Concepts</h5>
                        <div class="d-flex flex-wrap gap-1">
                            ${data.techStack.map(t => `<span class="tag-pill">${t}</span>`).join('')}
                        </div>
                    </div>

                    <div class="p-3 rounded-3 bg-secondary-subtle border border-secondary-subtle">
                        <span class="text-muted text-xs d-block">Project Status</span>
                        <span class="fw-semibold text-body small"><i class="fa-solid fa-info-circle me-1 text-cyan"></i> ${data.status}</span>
                    </div>
                `;

                projectDetailModal.show();
            }
        });
    });

    /* ==========================================================================
       8. CONTACT FORM & EMAIL COPYING
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                showToast("Form Validation", "Please fill out all required fields properly.", "warning");
                return;
            }

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;

            const mailtoUrl = `mailto:kansaracharmi5@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            showToast("Message Prepared!", `Thank you ${name}! Opening your email client to send to kansaracharmi5@gmail.com.`, "success");

            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 1000);

            contactForm.reset();
            contactForm.classList.remove('was-validated');
        });
    }

    function handleCopyEmail() {
        const emailText = "kansaracharmi5@gmail.com";
        navigator.clipboard.writeText(emailText).then(() => {
            showToast("Copied!", "Email address copied to clipboard: " + emailText, "success");
        }).catch(() => {
            showToast("Copy Failed", "Please manually copy: " + emailText, "danger");
        });
    }

    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) copyEmailBtn.addEventListener('click', handleCopyEmail);

    const heroCopyEmailBtn = document.getElementById('heroCopyEmailBtn');
    if (heroCopyEmailBtn) heroCopyEmailBtn.addEventListener('click', handleCopyEmail);

    /* ==========================================================================
       9. THEME TOGGLE (LIGHT / DARK MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('charmi_portfolio_theme') || 'dark';
    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('charmi_portfolio_theme', newTheme);
        });
    }

    function setTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun text-warning';
        }
    }

    /* ==========================================================================
       10. RESUME PRINT / PDF DOWNLOAD
       ========================================================================== */
    const triggerPrintResume = document.getElementById('triggerPrintResume');
    if (triggerPrintResume) {
        triggerPrintResume.addEventListener('click', () => {
            window.print();
        });
    }

    function showToast(title, message, type = "success") {
        const toastEl = document.getElementById('liveToast');
        const toastTitle = document.getElementById('toastTitle');
        const toastBody = document.getElementById('toastBody');

        if (toastEl && toastTitle && toastBody) {
            toastTitle.textContent = title;
            toastBody.textContent = message;

            const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
            toast.show();
        }
    }

    const copyrightYear = document.getElementById('copyrightYear');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});
