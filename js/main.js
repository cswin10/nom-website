/* Newton Old Market — interactions
   Reveal on scroll, animated counters, LEAFI bars, nav state, mobile menu. */

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

  /* ---------- animated counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var start = null;

    function fmt(n) {
      return n.toLocaleString('en-GB');
    }

    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.innerHTML = prefix + fmt(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }

    if (prefersReduced) {
      el.innerHTML = prefix + fmt(target) + suffix;
    } else {
      requestAnimationFrame(step);
    }
  }

  var counters = document.querySelectorAll('.stat-num[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- LEAFI bars ---------- */
  var viz = document.querySelector('.leafi-viz');
  if (viz) {
    function fillBars() {
      viz.querySelectorAll('.bar').forEach(function (bar, i) {
        var val = parseInt(bar.getAttribute('data-val'), 10);
        var fill = bar.querySelector('.bar-fill');
        setTimeout(function () {
          fill.style.height = val + '%';
        }, prefersReduced ? 0 : i * 180);
      });
    }
    if ('IntersectionObserver' in window) {
      var bio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              fillBars();
              bio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      bio.observe(viz);
    } else {
      fillBars();
    }
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
