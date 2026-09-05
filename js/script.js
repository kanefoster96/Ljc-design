// Header background on scroll
const header = document.getElementById('site-header');
const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu toggle
function closeMenu() {
  nav.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
