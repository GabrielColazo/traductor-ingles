// ── Navbar: efecto al hacer scroll ──────────────────────
const navbar = document.getElementById('mainNavbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Animación de cards al aparecer en pantalla ───────────
const animatedEls = document.querySelectorAll('.service-card, .testimonial-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatedEls.forEach(el => observer.observe(el));

// ── Cerrar menú hamburguesa al hacer click afuera ────────
const navMenu = document.getElementById('navMenu');
const navbarToggler = document.querySelector('.navbar-toggler');

document.addEventListener('click', (e) => {
  const isOpen = navMenu.classList.contains('show');
  const clickedInsideNav = navMenu.contains(e.target);
  const clickedToggler = navbarToggler.contains(e.target);

  if (isOpen && !clickedInsideNav && !clickedToggler) {
    const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
    if (bsCollapse) bsCollapse.hide();
  }
});

// ── Cursor personalizado ──────────────────────────────────
const cursor    = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('custom-cursor-dot');

// Solo en desktop
if (window.matchMedia('(hover: hover)').matches) {

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Punto central sigue exacto
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  // Círculo exterior con lag suave
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;

    cursor.style.left = cursorX + 'px';
    cursor.style.top  = cursorY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // ── Efecto hover en links y botones ────────────────
  const hoverEls = document.querySelectorAll('a, button, .service-card, .testimonial-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });

}