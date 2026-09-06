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
