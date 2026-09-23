/**
 * AL-NASR POULTRY EQUIPMENT (النصر لصناعة معدات مجازر الدواجن)
 * Production JavaScript - Main Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initStickyNavbar();
  initMobileMenu();
  initActiveNavLink();
  initScrollReveal();
  initBackToTop();
  initImageFallbacks();
  initGalleryFiltering();
  initLightbox();
  initVideoModal();
  initProductProjectModal();
  initContactForm();
});

/* ==========================================================================
   1. Loading Screen (Preloader)
   ========================================================================== */
function initLoadingScreen() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const hidePreloader = () => {
    preloader.classList.add('loaded');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 650);
  };

  window.addEventListener('load', hidePreloader);
  // Fallback safety: hide after 1.8 seconds max
  setTimeout(hidePreloader, 1800);
}

/* ==========================================================================
   2. Sticky Navbar & Header Blur
   ========================================================================== */
function initStickyNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navWrapper = document.querySelector('.nav-links-wrapper');
  if (!toggleBtn || !navWrapper) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navWrapper.classList.toggle('open');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      if (navWrapper.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  });

  // Close when clicking outside or on a link
  document.addEventListener('click', (e) => {
    if (navWrapper.classList.contains('open') && !navWrapper.contains(e.target) && !toggleBtn.contains(e.target)) {
      navWrapper.classList.remove('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  });

  navWrapper.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navWrapper.classList.remove('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

/* ==========================================================================
   4. Active Navigation Link Highlighting
   ========================================================================== */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   5. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    reveals.forEach(el => el.classList.add('active'));
  }
}

/* ==========================================================================
   6. Back To Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   7. Image Fallback System (Prevents Broken Images)
   ========================================================================== */
function initImageFallbacks() {
  const images = document.querySelectorAll('img');
  
  // High-tech SVG placeholder template
  const createFallbackSVG = (title) => {
    const safeTitle = encodeURIComponent(title || 'معدات مجازر النصر');
    return `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%2317171A"/%3E%3Ccircle cx="400" cy="280" r="70" fill="%23230438" stroke="%23FFC300" stroke-width="3" stroke-dasharray="8 4"/%3E%3Cpolygon points="400,240 435,260 435,300 400,320 365,300 365,260" fill="%236A0DAD" stroke="%23D90429" stroke-width="2"/%3E%3Ctext x="400" y="400" font-family="sans-serif" font-size="24" font-weight="bold" fill="%23FFFFFF" text-anchor="middle"%3E${safeTitle}%3C/text%3E%3Ctext x="400" y="435" font-family="sans-serif" font-size="16" fill="%23BDBDBD" text-anchor="middle"%3E%D8%A7%D9%84%D9%86%D8%B5%D8%B1 %D9%84%D8%B5%D9%86%D8%A7%D8%B9%D8%A9 %D9%85%D8%B9%D8%AF%D8%A7%D8%AA %D9%85%D8%AC%D8%A7%D8%B2%D8%B1 %D8%A7%D9%84%D8%AF%D9%88%D8%A7%D8%AC%D9%86%3C/text%3E%3C/svg%3E`;
  };

  images.forEach(img => {
    img.addEventListener('error', function() {
      const altText = this.getAttribute('alt') || 'معدات النصر';
      this.onerror = null; // Prevent loop
      this.src = createFallbackSVG(altText);
    });
  });
}

/* ==========================================================================
   8. Gallery Filtering
   ========================================================================== */
function initGalleryFiltering() {
  const filterBtns = document.querySelectorAll('.gallery-filter-tabs .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   9. Lightbox for Photo Gallery
   ========================================================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

  if (!lightbox || !galleryItems.length) return;

  let currentIndex = 0;
  const itemsArray = Array.from(galleryItems);

  const openLightbox = (index) => {
    currentIndex = index;
    const currentItem = itemsArray[currentIndex];
    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('.gallery-item-title')?.textContent || img.getAttribute('alt') || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = title;
    if (lightboxCaption) lightboxCaption.textContent = title;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % itemsArray.length;
    openLightbox(currentIndex);
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + itemsArray.length) % itemsArray.length;
    openLightbox(currentIndex);
  };

  itemsArray.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    // RTL navigation: ArrowRight -> Previous, ArrowLeft -> Next
    if (e.key === 'ArrowRight') showPrev();
    if (e.key === 'ArrowLeft') showNext();
  });
}

/* ==========================================================================
   10. Video Modal
   ========================================================================== */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const videoContainer = document.getElementById('videoContainer');
  const closeBtn = document.getElementById('closeVideoModal');
  const triggerCards = document.querySelectorAll('[data-video-src]');

  if (!modal || !triggerCards.length) return;

  const openVideo = (src, title) => {
    if (!videoContainer) return;
    videoContainer.innerHTML = '';

    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      // YouTube embed
      const iframe = document.createElement('iframe');
      iframe.src = src.includes('?') ? `${src}&autoplay=1` : `${src}?autoplay=1`;
      iframe.width = '100%';
      iframe.height = '420';
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', 'true');
      videoContainer.appendChild(iframe);
    } else {
      // Native MP4 / WEBM video
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.style.width = '100%';
      video.style.maxHeight = '70vh';
      video.style.borderRadius = '8px';
      videoContainer.appendChild(video);
    }

    const titleElem = document.getElementById('videoModalTitle');
    if (titleElem) titleElem.textContent = title || 'مشاهدة الفيديو';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    modal.classList.remove('active');
    if (videoContainer) videoContainer.innerHTML = '';
    document.body.style.overflow = '';
  };

  triggerCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-video-src');
      const title = card.getAttribute('data-video-title') || card.querySelector('.video-title')?.textContent;
      openVideo(src, title);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeVideo);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideo();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeVideo();
  });
}

/* ==========================================================================
   11. Product & Project Info Modal with WhatsApp Order
   ========================================================================== */
function initProductProjectModal() {
  const modal = document.getElementById('itemDetailModal');
  if (!modal) return;

  const closeBtn = document.getElementById('closeDetailModal');
  const modalImg = document.getElementById('detailModalImg');
  const modalTitle = document.getElementById('detailModalTitle');
  const modalDesc = document.getElementById('detailModalDesc');
  const modalTag = document.getElementById('detailModalTag');
  const whatsappCta = document.getElementById('detailModalWhatsapp');

  const openModal = (data) => {
    if (modalImg) modalImg.src = data.img;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalTag) modalTag.textContent = data.tag || 'النصر لمعدات المجازر';

    if (whatsappCta) {
      const text = encodeURIComponent(`السلام عليكم، أود الاستفسار وطلب معلومات بخصوص: ${data.title}`);
      whatsappCta.href = `https://wa.me/201000544931?text=${text}`;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-open-detail]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card') || btn.closest('.project-card') || btn.closest('.service-card');
      if (!card) return;

      const img = card.querySelector('img')?.src || 'assets/images/hero.jpg';
      const title = card.querySelector('.product-name, .project-title, .service-title')?.textContent || 'الخدمة / المنتج';
      const desc = card.querySelector('.product-summary, .project-desc, .service-desc')?.textContent || '';
      const tag = card.querySelector('.product-badge-overlay, .project-type-tag')?.textContent || 'النصر لمعدات المجازر';

      openModal({ img, title, desc, tag });
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* ==========================================================================
   12. Contact Form Interactive Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const email = form.querySelector('[name="email"]')?.value || '';
    const service = form.querySelector('[name="service"]')?.value || '';
    const message = form.querySelector('[name="message"]')?.value || '';

    // Generate WhatsApp direct text
    const waText = encodeURIComponent(
      `السلام عليكم، أنا ${name}\nرقم الهاتف: ${phone}\nالبريد: ${email}\nالخدمة المطلوبة: ${service}\nالرسالة: ${message}`
    );
    const waUrl = `https://wa.me/201000544931?text=${waText}`;

    // Show responsive user modal/feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> تم تجهيز الطلب! جاري التحويل للواتساب...';
      submitBtn.style.background = '#25D366';
      submitBtn.style.color = '#FFFFFF';
    }

    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> إرسال الطلب';
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }
    }, 1000);
  });
}
