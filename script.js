/**
 * CHARMI KANSARA - PERSONAL PORTFOLIO JAVASCRIPT
 * B.Tech CSE Student | Aspiring AI/ML Engineer @ Indus University
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. TYPING ANIMATION FOR HERO TITLE
       ========================================================================== */
    const typingElement = document.getElementById('typing-text');
    const titles = [
        "B.Tech CSE Student",
        "Aspiring AI/ML Engineer",
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
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    /* ==========================================================================
       2. SCROLL PROGRESS BAR & NAVBAR BEHAVIOR & BACK TO TOP
       ========================================================================== */
    const progressBar = document.getElementById('scroll-progress-bar');
    const navbar = document.getElementById('mainNavbar');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Update Scroll Progress Bar
        if (progressBar && docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        }

        // Sticky Navbar shrink effect
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        // Back to Top Button visibility
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
       3. ACTIVE NAVBAR LINK BASED ON SCROLL (SCROLLSPY)
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

    // Auto-close mobile hamburger navbar when a link is clicked
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
       4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: unobserve once revealed for better performance
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       5. SKILLS FILTERING CATEGORIES
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
       6. INTERACTIVE PROJECT DETAIL MODALS
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
            description: "A comprehensive scholarship discovery platform concept designed to help students filter and identify relevant financial aid and scholarship opportunities based on education level, category, family income, state of residence, and academic percentage.",
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
    const projectDetailModal = new bootstrap.Modal(document.getElementById('projectDetailModal'));

    modalTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];

            if (data && projectModalBody && projectModalLabel) {
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
       7. CONTACT FORM HANDLER WITH VALIDATION & FEEDBACK
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

            // Prepare mailto link as fallback for immediate email sending
            const mailtoUrl = `mailto:kansaracharmi5@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            showToast("Message Prepared!", `Thank you ${name}! Your email client will open to send the message to kansaracharmi5@gmail.com.`, "success");

            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 1000);

            contactForm.reset();
            contactForm.classList.remove('was-validated');
        });
    }

    /* ==========================================================================
       8. COPY EMAIL TO CLIPBOARD
       ========================================================================== */
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const emailText = "kansaracharmi5@gmail.com";
            navigator.clipboard.writeText(emailText).then(() => {
                showToast("Copied!", "Email address copied to clipboard: " + emailText, "success");
            }).catch(err => {
                showToast("Copy Failed", "Please manually copy: " + emailText, "danger");
            });
        });
    }

    /* ==========================================================================
       9. THEME TOGGLE (LIGHT / DARK MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Load saved theme from localStorage
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
            if (theme === 'dark') {
                themeIcon.className = 'fa-solid fa-moon';
            } else {
                themeIcon.className = 'fa-solid fa-sun text-warning';
            }
        }
    }

    /* ==========================================================================
       10. RESUME PRINT / PDF DOWNLOAD SIMULATION
       ========================================================================== */
    const triggerPrintResume = document.getElementById('triggerPrintResume');
    if (triggerPrintResume) {
        triggerPrintResume.addEventListener('click', () => {
            window.print();
        });
    }

    /* ==========================================================================
       11. HELPER TOAST NOTIFICATION SYSTEM
       ========================================================================== */
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

    /* Set current year dynamically in footer */
    const copyrightYear = document.getElementById('copyrightYear');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});
