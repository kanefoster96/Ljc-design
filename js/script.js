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
