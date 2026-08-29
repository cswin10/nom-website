/* Newton Old Market — interactions
   Reveal on scroll, nav state, mobile menu. */

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

  /* ---------- hero video: only shown once it can actually play ---------- */
  var heroVideo = document.getElementById('heroVideo');
  if (heroVideo && !prefersReduced) {
    // phones get the lighter encode so the hero is not 5MB on mobile data
    if (window.matchMedia('(max-width: 880px)').matches) {
      Array.prototype.forEach.call(heroVideo.querySelectorAll('source'), function (src) {
        if (src.dataset.mobile) src.src = src.dataset.mobile;
      });
    }
    heroVideo.preload = 'auto';
    heroVideo.addEventListener('canplay', function () {
      heroVideo.classList.add('ready');
      var playing = heroVideo.play();
      if (playing && playing.catch) playing.catch(function () {});
    });
    heroVideo.load();
  }

  /* ---------- cookie consent + the map it gates ---------- */
  var KEY = 'nom-cookie-choice';
  var bar = document.getElementById('cookieBar');
  var mapBox = document.getElementById('visitMap');

  function readChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function writeChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function loadMap() {
    if (!mapBox || mapBox.querySelector('iframe')) return;
    var frame = document.createElement('iframe');
    frame.src = mapBox.getAttribute('data-map-src');
    frame.title = 'Map of Newton Old Market, Market Street, Newton Abbot';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    frame.setAttribute('allowfullscreen', '');
    mapBox.innerHTML = '';
    mapBox.appendChild(frame);
  }

  // while the bar is up, keep its height clear so it never sits on content
  function padForBar() {
    if (!bar || bar.hidden) { document.body.style.paddingBottom = ''; return; }
    document.body.style.paddingBottom = bar.offsetHeight + 'px';
  }

  var choice = readChoice();
  if (choice === 'accepted') {
    loadMap();
  } else if (!choice && bar) {
    bar.hidden = false;
    padForBar();
    window.addEventListener('resize', padForBar);
  }

  function settle(value) {
    writeChoice(value);
    if (bar) bar.hidden = true;
    document.body.style.paddingBottom = '';
    if (value === 'accepted') loadMap();
  }

  var accept = document.getElementById('cookieAccept');
  var decline = document.getElementById('cookieDecline');
  if (accept) accept.addEventListener('click', function () { settle('accepted'); });
  if (decline) decline.addEventListener('click', function () { settle('declined'); });

  // loading the map by hand is itself consent for the map
  var loadBtn = document.getElementById('loadMap');
  if (loadBtn) loadBtn.addEventListener('click', function () { settle('accepted'); });

  var reset = document.getElementById('resetCookieChoice');
  if (reset) {
    reset.addEventListener('click', function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      reset.textContent = 'Choice cleared, the banner will return';
      reset.disabled = true;
    });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
