/**
 * SIRAJ VENTURES — CORE JAVASCRIPT
 * Handles Mega Navigation, Mobile Drawer, Setup Cost Estimator,
 * FAQ Search & Filtering, Timeline Accordions, and Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- 1. FLOATING NAVBAR SMART SCROLL (HIDE ON SCROLL DOWN, REVEAL ON SCROLL UP) & SCROLLSPY ----------
  const navbar = document.querySelector('.floating-navbar');
  const navLinks = document.querySelectorAll('.floating-nav-link');
  const sections = document.querySelectorAll('section[id]');
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (navbar) {
      // Smart Scroll Hide/Reveal
      if (currentScrollY <= 20) {
        // At the very top: always visible
        navbar.classList.remove('navbar--hidden');
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down past threshold: hide
        navbar.classList.add('navbar--hidden');
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up: reveal
        navbar.classList.remove('navbar--hidden');
      }

      // Elevation styling on scroll
      if (currentScrollY > 30) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    }

    lastScrollY = currentScrollY;

    // ScrollSpy to update active link
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (currentScrollY >= top && currentScrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}` || (currentId === 'hero' && (href === 'index.html#' || href === '#hero' || href === 'index.html'))) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---------- 2. MOBILE DRAWER NAVIGATION ----------
  const hamburgerBtns = document.querySelectorAll('.hamburger-btn, .floating-hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');

  function openDrawer() {
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  hamburgerBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Close drawer when any internal navigation link inside drawer is clicked
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-drawer-actions a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Mobile Submenu Accordions
  const mobileAccordionTriggers = document.querySelectorAll('.mobile-accordion-trigger');
  mobileAccordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = trigger.closest('.mobile-nav-item');
      const submenu = parent ? parent.querySelector('.mobile-submenu') : null;
      if (submenu) {
        const isOpen = submenu.classList.contains('open');
        // Close other submenus
        document.querySelectorAll('.mobile-submenu').forEach(sm => sm.classList.remove('open'));
        if (!isOpen) {
          submenu.classList.add('open');
        }
      }
    });
  });

  // ---------- 3. ANALYTIX-STYLE PROCESS TIMELINE ACCORDION ----------
  const timelineButtons = document.querySelectorAll('.timeline-accordion-btn');
  timelineButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.timeline-step-item');
      const panel = parent ? parent.querySelector('.timeline-accordion-panel') : null;
      const isActive = btn.classList.contains('active');

      // Close sibling panels
      timelineButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-expanded', 'false');
      });
      document.querySelectorAll('.timeline-accordion-panel').forEach(p => {
        p.classList.remove('open');
      });

      if (!isActive && panel) {
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        panel.classList.add('open');
      }
    });
  });

  // ---------- 4. FAQ SEARCH & FILTER ACCORDION ----------
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Option to allow only one open at a time
        faqItems.forEach(i => {
          i.classList.remove('open');
          const b = i.querySelector('.faq-question-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // FAQ Live Search
  const faqSearchInput = document.getElementById('faqSearchInput');
  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const questionText = item.querySelector('.faq-question-btn')?.textContent.toLowerCase() || '';
        const answerText = item.querySelector('.faq-answer-panel')?.textContent.toLowerCase() || '';
        if (questionText.includes(query) || answerText.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // ---------- 5. INTERACTIVE BUSINESS SETUP COST & TIMELINE ESTIMATOR ----------
  const entityInputs = document.querySelectorAll('input[name="estimatorEntity"]');
  const nationalityInputs = document.querySelectorAll('input[name="estimatorNationality"]');
  const visaSlider = document.getElementById('estimatorVisas');
  const visaCountDisplay = document.getElementById('visaCountDisplay');
  const officeInputs = document.querySelectorAll('input[name="estimatorOffice"]');

  const misaFeeEl = document.getElementById('estMisaFee');
  const crFeeEl = document.getElementById('estCrFee');
  const visaFeeEl = document.getElementById('estVisaFee');
  const officeFeeEl = document.getElementById('estOfficeFee');
  const totalRangeEl = document.getElementById('estTotalRange');
  const timelineEl = document.getElementById('estTimeline');

  function calculateEstimate() {
    if (!totalRangeEl) return;

    let entity = 'llc';
    entityInputs.forEach(input => { if (input.checked) entity = input.value; });

    let nationality = 'foreign';
    nationalityInputs.forEach(input => { if (input.checked) nationality = input.value; });

    let visas = visaSlider ? parseInt(visaSlider.value, 10) : 2;
    if (visaCountDisplay) visaCountDisplay.textContent = visas;

    let office = 'virtual';
    officeInputs.forEach(input => { if (input.checked) office = input.value; });

    // Base MISA and Government Fees Calculation
    let misaFee = 12000; // Standard foreign LLC
    let crFee = 1200;    // Ministry of Commerce Commercial Registration
    let chamberFee = 2000;
    let timeline = '2 – 3 Weeks';

    if (entity === 'entrepreneur') {
      misaFee = 2000; // Subsidized MISA Startup License
      timeline = '2 – 3 Weeks';
    } else if (entity === 'branch') {
      misaFee = 12000;
      timeline = '3 – 4 Weeks';
    } else if (entity === 'rhq') {
      misaFee = 15000;
      timeline = '4 – 6 Weeks';
    }

    // GCC exemption
    if (nationality === 'gcc') {
      misaFee = 0; // GCC nationals register directly via MC without MISA license
      timeline = '5 – 10 Days';
    }

    // Visa processing & quota indicative allowance
    const visaCost = visas * 2000;

    // Office lease indicative
    let officeCost = 6000; // Flex/Virtual shared address
    if (office === 'physical') {
      officeCost = 28000; // Dedicated commercial office estimate
    }

    const minTotal = misaFee + crFee + chamberFee + visaCost + officeCost;
    const maxTotal = Math.round(minTotal * 1.25);

    // Update UI elements
    if (misaFeeEl) misaFeeEl.textContent = misaFee === 0 ? 'Exempt (GCC Direct)' : `SAR ${misaFee.toLocaleString()}`;
    if (crFeeEl) crFeeEl.textContent = `SAR ${(crFee + chamberFee).toLocaleString()}`;
    if (visaFeeEl) visaFeeEl.textContent = `SAR ${visaCost.toLocaleString()}`;
    if (officeFeeEl) officeFeeEl.textContent = `SAR ${officeCost.toLocaleString()}`;
    if (timelineEl) timelineEl.textContent = timeline;

    if (totalRangeEl) {
      totalRangeEl.textContent = `SAR ${minTotal.toLocaleString()} – ${maxTotal.toLocaleString()}`;
    }
  }

  // Attach event listeners to all estimator controls
  entityInputs.forEach(el => el.addEventListener('change', calculateEstimate));
  nationalityInputs.forEach(el => el.addEventListener('change', calculateEstimate));
  if (visaSlider) visaSlider.addEventListener('input', calculateEstimate);
  officeInputs.forEach(el => el.addEventListener('change', calculateEstimate));

  // Initialize initial calculation
  calculateEstimate();

  // ---------- 6. STATS COUNTER ANIMATION ----------
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1600;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              el.textContent = target + suffix;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(count) + suffix;
            }
          }, stepTime);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // ---------- 7. CONSULTATION FORM VALIDATION & SUBMISSION ----------
  const forms = document.querySelectorAll('.ajax-consultation-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const alertBox = form.querySelector('.form-alert');
      const originalText = submitBtn ? submitBtn.textContent : 'Submit';

      const name = form.querySelector('[name="fullName"]')?.value.trim();
      const email = form.querySelector('[name="email"]')?.value.trim();
      const phone = form.querySelector('[name="phone"]')?.value.trim();
      const service = form.querySelector('[name="serviceInterest"]')?.value || 'General Consultation';
      const message = form.querySelector('[name="message"]')?.value.trim() || '';

      if (!name || !email || !phone) {
        if (alertBox) {
          alertBox.className = 'form-alert error';
          alertBox.textContent = 'Please fill in all required fields (Name, Email, and Phone Number).';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Securing Advisory Connection...';
      }

      // Simulate realistic advisory dispatch
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }

        if (alertBox) {
          alertBox.className = 'form-alert success';
          alertBox.innerHTML = `
            <strong>Enquiry Received Successfully!</strong><br>
            Thank you, ${name}. Your business setup inquiry for <em>${service}</em> has been logged. 
            Our Riyadh advisory team will review your requirements and reach out within 2 business hours.
            <div style="margin-top:10px;">
              <a href="https://wa.me/966508912842?text=Hello%20Siraj%20Ventures,%20I%20just%20submitted%20an%20enquiry%20for%20${encodeURIComponent(service)}.%20My%20name%20is%20${encodeURIComponent(name)}." 
                 target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm" style="display:inline-flex;">
                 Chat Instantly on WhatsApp
              </a>
            </div>
          `;
        }

        form.reset();
      }, 700);
    });
  });

  // ---------- 8. WATCH FAHAD VIDEO LIGHTBOX MODAL ----------
  const videoCards = document.querySelectorAll('.watch-fahad-card');
  const videoModal = document.getElementById('videoModalBackdrop');
  const videoCloseBtn = document.getElementById('videoModalCloseBtn');
  const videoIframe = document.getElementById('videoModalIframe');
  let lastActiveElement = null;

  function openVideoModal(videoId, videoTitle) {
    if (!videoModal || !videoIframe) return;
    lastActiveElement = document.activeElement;

    // Use high-performance privacy-enhanced YouTube embed with playlist context
    videoIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&list=PLbnSM0kOYuPg`;
    if (videoTitle) {
      videoIframe.title = videoTitle;
    }

    videoModal.style.display = 'flex';
    requestAnimationFrame(() => {
      videoModal.classList.add('is-open');
    });

    document.body.style.overflow = 'hidden';
    if (videoCloseBtn) {
      videoCloseBtn.focus();
    }
  }

  function closeVideoModal() {
    if (!videoModal || !videoIframe) return;

    videoModal.classList.remove('is-open');
    videoIframe.src = '';

    setTimeout(() => {
      videoModal.style.display = 'none';
      document.body.style.overflow = '';
      if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
      }
    }, 300);
  }

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.getAttribute('data-video-id');
      const videoTitle = card.getAttribute('data-video-title');
      if (videoId) {
        openVideoModal(videoId, videoTitle);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const videoId = card.getAttribute('data-video-id');
        const videoTitle = card.getAttribute('data-video-title');
        if (videoId) {
          openVideoModal(videoId, videoTitle);
        }
      }
    });
  });

  if (videoCloseBtn) {
    videoCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeVideoModal();
    });
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('is-open')) {
      closeVideoModal();
    }
  });

  // ---------- 9. WATCH FAHAD CAROUSEL NAVIGATION (PREV / NEXT ARROWS) ----------
  const fahadCarousel = document.getElementById('watchFahadCarousel');
  const fahadPrevBtn = document.getElementById('watchFahadPrevBtn');
  const fahadNextBtn = document.getElementById('watchFahadNextBtn');

  if (fahadCarousel && (fahadPrevBtn || fahadNextBtn)) {
    const getScrollOffset = () => {
      const card = fahadCarousel.querySelector('.watch-fahad-card');
      if (!card) return 360;
      return card.offsetWidth + 28;
    };

    if (fahadNextBtn) {
      fahadNextBtn.addEventListener('click', () => {
        fahadCarousel.scrollBy({ left: getScrollOffset(), behavior: 'smooth' });
      });
    }

    if (fahadPrevBtn) {
      fahadPrevBtn.addEventListener('click', () => {
        fahadCarousel.scrollBy({ left: -getScrollOffset(), behavior: 'smooth' });
      });
    }
  }

  // ---------- 10. STICKY-SCROLL PROCESS SECTION (- FROM CONSULTATION TO LAUNCH) ----------
  const steps = document.querySelectorAll('.step-item');
  const images = document.querySelectorAll('.sticky-image-panel');

  if (steps.length > 0 && images.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.stepIndex;
          
          // Update Step Active Class
          steps.forEach(s => s.classList.remove('is-active'));
          entry.target.classList.add('is-active');

          // Update Sticky Image
          images.forEach((img, i) => {
            img.classList.toggle('is-visible', i === parseInt(index));
          });
        }
      });
    }, {
      rootMargin: '-35% 0px -45% 0px',
      threshold: 0.2
    });

    steps.forEach((step, i) => {
      step.dataset.stepIndex = i;
      observer.observe(step);

      // Interactive Click Support
      step.addEventListener('click', () => {
        step.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  // ---------- 11. FOREST GREEN CONSULTATION SECTION INTERACTIVITY ----------
  const togglePills = document.querySelectorAll('.forest-toggle-pill');
  togglePills.forEach(pill => {
    pill.addEventListener('click', function() {
      const container = this.closest('.forest-form-col') || document;
      container.querySelectorAll('.forest-toggle-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const hiddenInput = container.querySelector('input[name="buildingType"]');
      if (hiddenInput) {
        hiddenInput.value = this.getAttribute('data-type') || this.textContent.trim();
      }
    });
  });

  const forestForms = document.querySelectorAll('.forest-inquiry-form');
  forestForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const buildingType = form.querySelector('input[name="buildingType"]')?.value || 'Company Formation';
      const name = form.querySelector('input[name="fullName"]')?.value || '';
      const email = form.querySelector('input[name="email"]')?.value || '';
      const phone = form.querySelector('input[name="phone"]')?.value || '';
      const country = form.querySelector('input[name="country"]')?.value || '';
      const company = form.querySelector('input[name="company"]')?.value || '';
      const ambition = form.querySelector('textarea[name="ambition"]')?.value || '';

      const msg = `*New Strategic Setup Inquiry — Siraj Ventures*\n\n` +
        `*Building:* ${buildingType}\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Phone:* ${phone}\n` +
        `*Country:* ${country}\n` +
        (company ? `*Company:* ${company}\n` : '') +
        (ambition ? `*Ambition:* ${ambition}\n` : '');

      const waUrl = `https://wa.me/966508912842?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
    });

    const emailLink = form.querySelector('.forest-email-link');
    if (emailLink) {
      emailLink.addEventListener('click', function(e) {
        const buildingType = form.querySelector('input[name="buildingType"]')?.value || 'Company Formation';
        const name = form.querySelector('input[name="fullName"]')?.value || '';
        const company = form.querySelector('input[name="company"]')?.value || '';
        const ambition = form.querySelector('textarea[name="ambition"]')?.value || '';
        
        const subject = encodeURIComponent(`Consultation Inquiry: ${buildingType} - ${name || company || 'New Partner'}`);
        const body = encodeURIComponent(`Hello Siraj Ventures Advisory Team,\n\nI am inquiring about ${buildingType}.\n\nName: ${name}\nCompany: ${company}\nDetails / Ambition: ${ambition}\n\nPlease advise on next steps.`);
        
        this.href = `mailto:info@sirajventures.com?subject=${subject}&body=${body}`;
      });
    }
  });

});

