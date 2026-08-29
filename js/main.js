/* Newton Old Market — interactions
   Reveal on scroll, local-share meter, nav state, mobile menu. */

(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- nav: solid on scroll ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');

  function closeMenu() {
    burger.classList.remove('open');
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- reveal on scroll (staggered per section) ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  // stagger siblings that enter together
  var bySection = new Map();
  revealEls.forEach(function (el) {
    var section = el.closest('section, footer') || document.body;
    if (!bySection.has(section)) bySection.set(section, []);
    bySection.get(section).push(el);
  });
  bySection.forEach(function (els) {
    els.forEach(function (el, i) {
      el.style.setProperty('--d', Math.min(i * 0.08, 0.5) + 's');
    });
  });

  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- local-share meter ---------- */
  var meter = document.querySelector('.meter');
  if (meter) {
    if (prefersReduced || !('IntersectionObserver' in window)) {
      meter.classList.add('go');
    } else {
      var mio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('go');
              mio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      mio.observe(meter);
    }
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
