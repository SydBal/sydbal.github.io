/* Small progressive enhancements. The site works fully without JS. */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ---- Theme toggle: auto -> light -> dark -> auto ---- */
  var toggle = document.getElementById('theme-toggle');
  var ORDER = ['auto', 'light', 'dark'];
  function current() { return root.getAttribute('data-theme') || 'auto'; }
  function apply(theme) {
    if (theme === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    try { localStorage.setItem('db-theme', theme); } catch (e) { /* private mode */ }
    toggle.setAttribute('aria-label', 'Color theme: ' + theme + '. Activate to change.');
  }
  try {
    var saved = localStorage.getItem('db-theme');
    if (saved && ORDER.indexOf(saved) !== -1 && saved !== 'auto') {
      root.setAttribute('data-theme', saved);
    }
  } catch (e) { /* ignore */ }
  if (toggle) {
    apply(current() === 'auto' ? 'auto' : current());
    toggle.addEventListener('click', function () {
      var next = ORDER[(ORDER.indexOf(current()) + 1) % ORDER.length];
      apply(next);
    });
  }

  /* ---- Mobile nav ---- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Reveal on scroll (skipped entirely for reduced-motion users) ---- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var els = document.querySelectorAll('.timeline-item, .card, .facts > div');
    els.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Active nav link highlighting ---- */
  var sections = document.querySelectorAll('.section[id], .hero[id]');
  var links = document.querySelectorAll('.nav-links a');
  if ('IntersectionObserver' in window && sections.length) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
