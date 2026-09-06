const toggle = document.getElementById('menu-toggle');
const drawer = document.getElementById('nav-drawer');

function closeMenu() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

function openMenu() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  toggle.classList.add('open');
  toggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
}

toggle.addEventListener('click', () => {
  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

drawer.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Reveal sections as they scroll into view
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Animate the hero rating count up when it scrolls into view
const countEl = document.querySelector('.hero-rating-count');
if (countEl) {
  const target = parseInt(countEl.dataset.target, 10) || 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCount = () => {
    if (prefersReducedMotion) {
      countEl.textContent = target;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      countEl.textContent = Math.round(easeOutCubic(progress) * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount();
            countIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    countIo.observe(countEl);
  } else {
    countEl.textContent = target;
  }
}

// Reviews carousel arrows
const reviewsTrack = document.querySelector('.reviews-track');
if (reviewsTrack) {
  const scrollByCard = (direction) => {
    const card = reviewsTrack.querySelector('.review-card');
    const distance = card ? card.getBoundingClientRect().width + 20 : reviewsTrack.clientWidth * 0.8;
    reviewsTrack.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };
  document.querySelector('.carousel-prev')?.addEventListener('click', () => scrollByCard(-1));
  document.querySelector('.carousel-next')?.addEventListener('click', () => scrollByCard(1));
}

// Social card lead form: entering the handle reveals the email row
const socialForm = document.getElementById('social-lead-form');
if (socialForm) {
  const handleInput = document.getElementById('social-lead-input');
  const hiddenHandle = document.getElementById('social-handle-hidden');
  const emailRow = document.getElementById('social-lead-email-row');
  const emailInput = document.getElementById('social-lead-email');
  const emailButton = emailRow.querySelector('button');
  let awaitingEmail = false;

  const revealEmail = () => {
    const handle = handleInput.value.trim();
    if (!handle || awaitingEmail) return;
    hiddenHandle.value = handle.startsWith('@') ? handle : `@${handle}`;
    emailInput.disabled = false;
    emailButton.disabled = false;
    emailRow.classList.add('is-visible');
    awaitingEmail = true;
    emailInput.focus();
  };

  handleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      revealEmail();
    }
  });

  socialForm.addEventListener('submit', (e) => {
    if (!awaitingEmail) {
      e.preventDefault();
      revealEmail();
    }
    // second submit (awaitingEmail true): let it send via mailto
  });
}
