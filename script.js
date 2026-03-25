// ============================================
// Portfolio Website - Main JavaScript
// ============================================

// ============================================
// 1. TIMELINE ANIMATIONS
// ============================================

// Animate timeline items on scroll
function animateTimelineOnScroll() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

// Timeline item expand/collapse functionality
function initTimelineExpand() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    const content = item.querySelector('.timeline-content');
    const description = content.querySelector('.description');
    
    item.addEventListener('click', function(e) {
      // Don't toggle if clicking a link
      if (e.target.tagName === 'A') return;
      
      item.classList.toggle('expanded');
      description.style.display = item.classList.contains('expanded') ? 'block' : '-webkit-box';
    });
  });
}

// ============================================
// 2. SCROLL ANIMATIONS FOR SECTIONS
// ============================================

function initScrollAnimations() {
  const sections = document.querySelectorAll('section.card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });
}

// ============================================
// 3. SKILL FILTERING (Removed - Not needed)
// ============================================

// Feature removed per user request


// ============================================
// 4. DARK/LIGHT MODE TOGGLE (Removed - Not needed)
// ============================================

// Feature removed per user request


// ============================================
// 5. LAZY LOADING FOR IMAGES
// ============================================

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }
}

// ============================================
// 6. FORM VALIDATION
// ============================================

function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!validateForm(form)) {
        e.preventDefault();
      }
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    const value = input.value.trim();
    
    if (!value) {
      showError(input, 'This field is required');
      isValid = false;
    } else if (input.type === 'email' && !isValidEmail(value)) {
      showError(input, 'Please enter a valid email');
      isValid = false;
    } else {
      clearError(input);
    }
  });

  return isValid;
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showError(input, message) {
  clearError(input);
  const error = document.createElement('span');
  error.className = 'error-message';
  error.textContent = message;
  input.parentElement.appendChild(error);
  input.classList.add('error');
}

function clearError(input) {
  input.classList.remove('error');
  const error = input.parentElement.querySelector('.error-message');
  if (error) error.remove();
}

// ============================================
// 7. SCROLL TO TOP BUTTON
// ============================================

function initScrollToTop() {
  // Create scroll-to-top button
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scroll-to-top';
  scrollBtn.className = 'scroll-to-top-btn';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  document.body.appendChild(scrollBtn);

  // Show/hide button based on scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  // Scroll to top on click
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// 8. SMOOTH PAGE LOAD ANIMATION
// ============================================

function initPageLoadAnimation() {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
  });
}

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const headerNav = document.querySelector('.header-nav');

  if (!menuToggle || !headerNav) return;

  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    headerNav.classList.remove('is-open');
  };

  const openMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
    headerNav.classList.add('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  });

  headerNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}

// ============================================
// 9. INITIALIZE ALL FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio website initialized');
  
  initPageLoadAnimation();
  animateTimelineOnScroll();
  initTimelineExpand();
  initScrollAnimations();
  // initSkillFiltering(); // Removed
  // initThemeToggle(); // Removed
  initLazyLoading();
  initFormValidation();
  initScrollToTop();
  initMobileMenu();
});

// ============================================
// 10. UTILITY FUNCTIONS
// ============================================

// Smooth scroll for anchor links (backup for browsers without native support)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Debounce function for resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
