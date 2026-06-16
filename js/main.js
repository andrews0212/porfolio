/* ── Scroll-triggered fade-up animations ──────────────────── */
(function () {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => observer.observe(el));
})();

/* ── Dock hover magnification ────────────────────────────── */
(function () {
  const dock = document.querySelector('.dock');
  if (!dock) return;

  const items = dock.querySelectorAll('.dock__item');

  dock.addEventListener('mousemove', (e) => {
    const dockRect = dock.getBoundingClientRect();
    const mouseX = e.clientX - dockRect.left;

    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2 - dockRect.left;
      const distance = Math.abs(mouseX - itemCenterX);
      const maxDistance = 90;
      const scale = distance < maxDistance
        ? 1 + (1 - distance / maxDistance) * 0.35
        : 1;
      item.style.transform = `scale(${scale})`;
      item.style.transition = 'transform 0.15s ease';
    });
  });

  dock.addEventListener('mouseleave', () => {
    items.forEach((item) => {
      item.style.transform = 'scale(1)';
    });
  });
})();

/* ── Hero bg parallax (subtle) ───────────────────────────── */
(function () {
  const heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }, { passive: true });
})();

/* ── Smooth anchor scrolling ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
