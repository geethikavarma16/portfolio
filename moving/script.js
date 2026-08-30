/**
 * GEETHIKA SAI MUDUNURI (VARMA) — PORTFOLIO JAVASCRIPT
 * Interactive functionality: ScrollSpy, Modals, Clipboard Copy, FAQ, and Animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('sidebar');
  
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close when clicking nav links on mobile
    const navLinks = sidebar.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove('open');
        }
      });
    });
  }

  // 2. Email Copy-to-Clipboard with Toast Feedback
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toastNotice');
  const emailToCopy = 'geethikamudunuri2007@gmail.com';

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailToCopy);
        showToast('Email copied to clipboard!');
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = emailToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Email copied to clipboard!');
      }
    });
  }

  function showToast(msg) {
    toast.innerHTML = `<span>✓</span> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 2.5 Motional Scroll Controller for Hero Section (HeyNesh Stage)
  const heroTrack = document.getElementById('home');
  const heroWatermark = document.getElementById('heroWatermark');
  const heroPortraitWrap = document.getElementById('heroPortraitWrap');
  const heroHeadline = document.getElementById('heroHeadlineOverlay');
  const heroCardL1 = document.getElementById('heroCardL1');
  const heroCardL2 = document.getElementById('heroCardL2');
  const heroCardR1 = document.getElementById('heroCardR1');
  const heroCardR2 = document.getElementById('heroCardR2');
  const heroBottomRow = document.getElementById('heroBottomRow');
  const heroTopNav = document.getElementById('heroTopNav');
  const heroScrollPrompt = document.getElementById('heroScrollPrompt');

  function mapRange(value, inMin, inMax, outMin, outMax) {
    if (value <= inMin) return outMin;
    if (value >= inMax) return outMax;
    return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
  }

  function handleHeroScrollMotion() {
    if (!heroTrack) return;
    const rect = heroTrack.getBoundingClientRect();
    const trackScrollable = heroTrack.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, -rect.top);
    const p = Math.min(1, Math.max(0, scrolled / (trackScrollable || 1)));

    // 1. Scroll Prompt
    if (heroScrollPrompt) {
      heroScrollPrompt.style.opacity = p > 0.05 ? '0' : '1';
    }

    // 2. Watermark subtle scaling/movement
    if (heroWatermark) {
      const wmScale = mapRange(p, 0, 1, 1, 0.94);
      const wmY = mapRange(p, 0, 1, 0, -20);
      heroWatermark.style.transform = `translate(-50%, calc(-50% + ${wmY}px)) scale(${wmScale})`;
    }

    // 3. Portrait: enters from p=0.04 to 0.35
    if (heroPortraitWrap) {
      const portOpacity = mapRange(p, 0.03, 0.32, 0, 1);
      const portY = mapRange(p, 0.03, 0.32, 80, 0);
      const portScale = mapRange(p, 0.03, 0.32, 0.9, 1);
      heroPortraitWrap.style.opacity = portOpacity;
      heroPortraitWrap.style.transform = `translateY(${portY}px) scale(${portScale})`;
    }

    // 4. Headline: enters from p=0.15 to 0.45
    if (heroHeadline) {
      const headOpacity = mapRange(p, 0.14, 0.42, 0, 1);
      const headY = mapRange(p, 0.14, 0.42, 40, 0);
      heroHeadline.style.opacity = headOpacity;
      heroHeadline.style.transform = `translateX(-50%) translateY(${headY}px)`;
    }

    // 5. Left Cards (9.00 CGPA & Internships): enter from p=0.30 to 0.65
    if (heroCardL1) {
      const l1Opacity = mapRange(p, 0.28, 0.55, 0, 1);
      const l1Y = mapRange(p, 0.28, 0.55, 45, 0);
      heroCardL1.style.opacity = l1Opacity;
      heroCardL1.style.transform = `translateY(${l1Y}px)`;
    }
    if (heroCardL2) {
      const l2Opacity = mapRange(p, 0.38, 0.68, 0, 1);
      const l2Y = mapRange(p, 0.38, 0.68, 45, 0);
      heroCardL2.style.opacity = l2Opacity;
      heroCardL2.style.transform = `translateY(${l2Y}px)`;
    }

    // 6. Right Cards (Traits & Quote): enter from p=0.35 to 0.75
    if (heroCardR1) {
      const r1Opacity = mapRange(p, 0.34, 0.62, 0, 1);
      const r1Y = mapRange(p, 0.34, 0.62, 45, 0);
      heroCardR1.style.opacity = r1Opacity;
      heroCardR1.style.transform = `translateY(${r1Y}px)`;
    }
    if (heroCardR2) {
      const r2Opacity = mapRange(p, 0.44, 0.74, 0, 1);
      const r2Y = mapRange(p, 0.44, 0.74, 45, 0);
      heroCardR2.style.opacity = r2Opacity;
      heroCardR2.style.transform = `translateY(${r2Y}px)`;
    }

    // 7. Top Nav & Bottom Actions: enter from p=0.50 to 0.85
    if (heroTopNav) {
      const navOpacity = mapRange(p, 0.48, 0.80, 0, 1);
      const navY = mapRange(p, 0.48, 0.80, -20, 0);
      heroTopNav.style.opacity = navOpacity;
      heroTopNav.style.transform = `translateY(${navY}px)`;
    }
    if (heroBottomRow) {
      const botOpacity = mapRange(p, 0.52, 0.84, 0, 1);
      const botY = mapRange(p, 0.52, 0.84, 30, 0);
      heroBottomRow.style.opacity = botOpacity;
      heroBottomRow.style.transform = `translateY(${botY}px)`;
    }

    // 8. Left Menu Bar (Sidebar): Reveals after scrolling down past the name screen
    if (sidebar) {
      if (p > 0.10 || window.scrollY > 80) {
        sidebar.classList.add('revealed');
        document.body.classList.add('has-sidebar');
      } else {
        sidebar.classList.remove('revealed');
        document.body.classList.remove('has-sidebar');
      }
    }
  }

  window.addEventListener('scroll', handleHeroScrollMotion, { passive: true });
  // Initial call
  handleHeroScrollMotion();

  // 2.7 Global Motional Scroll Controller (Continuous real-time glide from bottom on scroll)
  const motionElements = document.querySelectorAll(`
    .section-header,
    .timeline-card,
    .project-card,
    .comp-card,
    .skill-cat-card,
    .exp-card,
    .achievement-spotlight,
    .cert-card,
    .faq-item,
    .contact-form-card,
    .site-footer
  `);

  // Assign stagger index to sibling elements in grids/lists
  const containerSelectors = [
    '.timeline-grid',
    '.projects-grid',
    '.competencies-grid',
    '.skills-categories',
    '.experience-list',
    '.certs-grid',
    '.faq-list'
  ];

  containerSelectors.forEach(selector => {
    const containers = document.querySelectorAll(selector);
    containers.forEach(container => {
      const children = Array.from(container.children);
      children.forEach((child, index) => {
        child.dataset.stagger = (index % 4).toString();
      });
    });
  });

  let appScrollTicking = false;

  function handleAppScrollMotion() {
    const windowH = window.innerHeight;

    motionElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const stagger = parseInt(el.dataset.stagger || '0', 10);
      const staggerPx = stagger * 45;

      // Start entering when the top is near bottom of viewport (+ stagger offset)
      // Fully settle when the top reaches upper-middle of viewport
      const startY = windowH + staggerPx;
      const endY = windowH * 0.35;

      const rawProgress = (startY - rect.top) / (startY - endY);
      const p = Math.min(1, Math.max(0, rawProgress));

      if (p >= 0.98) {
        // Fully into view: clear inline style to let CSS hover effects work smoothly
        el.style.opacity = '1';
        el.style.transform = '';
        el.classList.add('is-visible');
      } else if (p <= 0.02) {
        // Below view: hidden & shifted down
        el.style.opacity = '0';
        el.style.transform = 'translateY(85px) scale(0.93)';
        el.classList.remove('is-visible');
      } else {
        // Active scroll interpolation: smooth upward glide tied to user scrolling
        const easeP = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const currentY = mapRange(easeP, 0, 1, 85, 0);
        const currentScale = mapRange(easeP, 0, 1, 0.93, 1);
        const currentOpacity = mapRange(p, 0.05, 0.7, 0, 1);

        el.style.opacity = currentOpacity.toFixed(3);
        el.style.transform = `translateY(${currentY.toFixed(1)}px) scale(${currentScale.toFixed(3)})`;
        el.classList.add('is-visible');
      }
    });

    appScrollTicking = false;
  }

  function onAppScroll() {
    if (!appScrollTicking) {
      requestAnimationFrame(handleAppScrollMotion);
      appScrollTicking = true;
    }
  }

  window.addEventListener('scroll', onAppScroll, { passive: true });
  window.addEventListener('resize', onAppScroll, { passive: true });
  
  // Initial frame
  handleAppScrollMotion();
  setTimeout(handleAppScrollMotion, 100);

  // 3. ScrollSpy Navigation
  const sections = document.querySelectorAll('main section');
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

  function updateScrollSpy() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy);
  updateScrollSpy();

  // 4. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 5. Contact Form Submission Feedback
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      contactForm.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
          <h4 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">
            Thank you, ${name}!
          </h4>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem;">
            Your message has been received. Geethika will get back to you promptly at your provided email address.
          </p>
          <button class="cta-button-neon" onclick="location.reload()" style="max-width: 200px; margin: 0 auto;">
            Send Another
          </button>
        </div>
      `;
      showToast('Message sent successfully!');
    });
  }

  // 6. Modal Handling (Projects & Journey)
  const modal = document.getElementById('infoModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  if (modalClose && modal) {
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Book a Call Button -> Scrolls to contact & opens form
  const bookCallBtn = document.getElementById('openContactModalBtn');
  if (bookCallBtn) {
    bookCallBtn.addEventListener('click', () => {
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('formName');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 600);
        }
      }
    });
  }

  // Projects Dataset
  const projectsData = [
    {
      title: 'BrandCraft AI (1st Place Winner – RTIH)',
      time: 'RTIH Rajahmundry • 1st Place',
      tags: ['Generative AI', 'NLP Sentiment', 'Branding Automation', 'RTIH Winner', 'Python'],
      image: 'assets/project-brandcraft.png',
      description: 'Won 1st place as a team (Geethika & Pardhu) for developing BrandCraft AI, an AI-powered platform designed to help entrepreneurs build and promote their businesses without agency costs.',
      details: [
        'Generates business names, logos, brand visuals, social media content, advertisements, and customer communication from a simple business idea.',
        'Analyses social media feeds and customer reviews to provide deep insights into customer sentiment and identify areas for brand improvement.',
        'Directly solves a major real-world barrier where professional branding and design services typically cost ₹1 Lakh or more.',
        'Recognized and awarded 1st Place by RTIH – Ratan Tata Innovation Hub, Rajahmundry, for practical problem-solving and accessible AI innovation.'
      ]
    },
    {
      title: 'Material Recycling Platform (Ongoing)',
      time: 'May 2026 – Present',
      tags: ['Full Stack', 'Python', 'Django', 'Database Architecture', 'Circular Economy'],
      image: 'assets/project-recycling.png',
      description: 'A cutting-edge web platform engineered as a reverse commercial engine for material recycling and circular supply chain tracking.',
      details: [
        'Developing a scalable, high-concurrency web application tailored for reverse supply chains.',
        'Establishing clean modular folder architectures, standard naming conventions, and scalable codebase patterns.',
        'Engineered relational database schemas for tracking recyclable materials, batch validations, and vendor exchanges.',
        'Built with Python, Django, REST APIs, and responsive glassmorphic frontend interfaces.'
      ]
    },
    {
      title: 'Phishing Detection System',
      time: 'Dec 2025 – Apr 2026',
      tags: ['Cybersecurity', 'Machine Learning', 'NLP', 'Threat Analysis', 'Python'],
      image: 'assets/project-phishing.png',
      description: 'An intelligent real-time security scanner capable of analyzing multi-modal threat vectors across Emails, SMS messages, suspicious URLs, and QR codes.',
      details: [
        'Multi-vector threat defense pipeline scanning Email headers/bodies, SMS payloads, URLs, and QR code targets.',
        'Integrated Machine Learning classifiers with rule-based heuristic patterns to detect zero-day phishing signatures.',
        'Extracted semantic lexical features, domain entropy, and deceptive anchor tags to accurately flag malicious content.',
        'Empowered automated security triage and reduced false-positive rates in real-time intrusion audits.'
      ]
    },
    {
      title: 'AI-Based Career Path Recommendation System',
      time: 'Jun 2025 – Oct 2025',
      tags: ['Natural Language Processing', 'Generative AI', 'Feature Engineering', 'Scikit-Learn'],
      image: 'assets/project-career-nlp.png',
      description: 'An AI-powered advisory system using advanced Natural Language Processing to extract resume entities, analyze skill gaps, and suggest optimal career trajectories.',
      details: [
        'Constructed custom NLP pipelines for text parsing, tokenization, entity recognition, and resume feature extraction.',
        'Designed vector similarity matching algorithms to map applicant credentials with real-time job market requirements.',
        'Generated automated personalized skill-gap roadmaps, recommending specific certifications and technical stacks to bridge gaps.'
      ]
    },
    {
      title: 'Smart Traffic Management System',
      time: 'Jun 2025 – Nov 2025',
      tags: ['Computer Vision', 'Vehicle Density Detection', 'IoT & Algorithms', 'Python'],
      image: 'assets/project-traffic.png',
      description: 'An automated computer vision surveillance engine calculating live traffic density and dynamically optimizing green signal cycles.',
      details: [
        'Developed real-time video stream processing modules to count vehicles and evaluate congestion density per lane.',
        'Replaced rigid static timer logic with an adaptive dynamic algorithm that scales green-light duration according to live traffic queue lengths.',
        'Significantly decreased intersection idle times and minimized fuel emissions in simulated urban junction corridors.'
      ]
    }
  ];

  // Journey Dataset
  const journeyData = {
    '2022': {
      year: '2022',
      title: 'Secondary School (Class X) — Sri Balaji Convent',
      grade: 'Percentage: 85.00%',
      desc: 'Completed secondary schooling with academic distinction (85%). Developed deep analytical problem-solving interests and first began exploring algorithmic thinking.'
    },
    '2024': {
      year: '2024',
      title: 'Senior Secondary (XII Science) & B.Tech IT Inception',
      grade: 'Aditya Junior College: 85.00% | BVCITS: 9.00/10 CGPA',
      desc: 'Completed XII Science at Aditya Junior College with 85.00% and enrolled in B.Tech Information Technology at Bonam Venkata Chalamayya Institute of Technology and Science (BVCITS), maintaining an exceptional 9.00 CGPA.'
    },
    '2025': {
      year: '2025',
      title: 'Global IEEE YESIST Finalist & Machine Learning Systems',
      grade: 'Presented in UKM Malaysia',
      desc: 'Selected as a global finalist in IEEE YESIST 2025 and traveled to Universiti Kebangsaan Malaysia to present an "AI-powered hydroponic microgrid agriculture system". Engineered the NLP Career Advisory platform and the Smart Traffic Management CV system.'
    },
    '2026': {
      year: '2026',
      title: 'ServiceNow Intern @ SmartBridge, 1st Place RTIH Winner & Tech Lead',
      grade: 'ServiceNow (SmartBridge) • 1st Place RTIH • TalentShine • ExcelR • GfG',
      desc: 'Currently undergoing ServiceNow Developer Internship at SmartBridge, building enterprise cloud workflows and ITSM automations. Won 1st place as a team (Geethika & Pardhu) at RTIH (Ratan Tata Innovation Hub), Rajahmundry, for BrandCraft AI. Completed Data Analytics internship at TalentShine and Cyber Security internship at ExcelR Solutions. Active Campus Body Member at GeeksforGeeks.'
    }
  };

  // Expose Modal Triggers Globally
  window.openProjectModal = function(idx) {
    const p = projectsData[idx];
    if (!p || !modalBody || !modal) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span style="background: var(--accent-yellow); color: #000; font-weight: 800; font-size: 0.75rem; padding: 0.3rem 0.65rem; border-radius: 4px; text-transform: uppercase;">
          ${p.time}
        </span>
        <h3 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 900; color: #fff; margin-top: 0.75rem; line-height: 1.2;">
          ${p.title}
        </h3>
      </div>
      
      <div style="border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
        <img src="${p.image}" alt="${p.title}" style="width: 100%; height: auto; max-height: 320px; object-fit: cover;" />
      </div>

      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
        ${p.tags.map(t => `<span style="background: rgba(255,255,255,0.1); font-size: 0.75rem; font-weight: 600; color: var(--accent-yellow); padding: 0.3rem 0.7rem; border-radius: 9999px;">${t}</span>`).join('')}
      </div>

      <p style="font-size: 1rem; color: #ddd; line-height: 1.6; margin-bottom: 1.5rem;">
        ${p.description}
      </p>

      <h4 style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">
        Key Architectural Implementations:
      </h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem;">
        ${p.details.map(d => `<li style="font-size: 0.9rem; color: #bbb; display: flex; gap: 0.6rem;"><span style="color: var(--accent-yellow); font-weight: 900;">▸</span> ${d}</li>`).join('')}
      </ul>

      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="cta-button-neon" onclick="document.getElementById('modalCloseBtn').click(); document.getElementById('openContactModalBtn').click();" style="width: auto; padding: 0.75rem 1.5rem;">
          Inquire About This Project
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.showJourneyModal = function(yearKey) {
    const j = journeyData[yearKey];
    if (!j || !modalBody || !modal) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span style="font-family: var(--font-display); font-size: 3rem; font-weight: 900; color: var(--accent-yellow); line-height: 1;">
          '${j.year.slice(2)}
        </span>
        <h3 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 900; color: #fff; margin-top: 0.5rem; line-height: 1.2;">
          ${j.title}
        </h3>
        <p style="color: var(--accent-yellow); font-weight: 700; font-size: 0.9rem; margin-top: 0.35rem;">
          ${j.grade}
        </p>
      </div>

      <p style="font-size: 1.05rem; color: #ccc; line-height: 1.7; margin-bottom: 2rem;">
        ${j.desc}
      </p>

      <div style="display: flex; justify-content: flex-end;">
        <button class="cta-button-neon" onclick="document.getElementById('modalCloseBtn').click()" style="width: auto; padding: 0.75rem 1.5rem;">
          Close
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

});
