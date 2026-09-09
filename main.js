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

/* ---- Cellular automaton backdrop (Game of Life) ----
   Subtle, slow, and fully disabled for prefers-reduced-motion users. */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var canvas = document.getElementById('ca-bg');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  var CELL = 26;        // CSS px per cell
  var TICK_MS = 220;    // ms per generation
  var DENSITY = 0.10;   // initial live-cell probability
  var ALPHA = 0.06;     // cell opacity — keep it whisper-quiet

  var cols = 0, rows = 0, grid, scratch;
  var accent = '#7c3aed';
  var timer = null;
  var stillCount = 0;

  function readAccent() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    if (v) accent = v;
  }

  function at(x, y) { return ((y + rows) % rows) * cols + ((x + cols) % cols); }

  function seed() {
    for (var i = 0; i < grid.length; i++) grid[i] = Math.random() < DENSITY ? 1 : 0;
    stillCount = 0;
  }

  function sizeCanvas() {
    var w = window.innerWidth, h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    cols = Math.max(8, Math.floor(w / CELL));
    rows = Math.max(8, Math.floor(h / CELL));
    grid = new Uint8Array(cols * rows);
    scratch = new Uint8Array(cols * rows);
    seed();
  }

  function step() {
    var changed = 0, alive = 0, x, y, dx, dy;
    for (y = 0; y < rows; y++) {
      for (x = 0; x < cols; x++) {
        var n = 0;
        for (dy = -1; dy <= 1; dy++) {
          for (dx = -1; dx <= 1; dx++) {
            if (dx !== 0 || dy !== 0) n += grid[at(x + dx, y + dy)];
          }
        }
        var i = y * cols + x;
        var v = grid[i] ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
        scratch[i] = v;
        if (v !== grid[i]) changed++;
        alive += v;
      }
    }
    var tmp = grid; grid = scratch; scratch = tmp;
    stillCount = changed === 0 ? stillCount + 1 : 0;
    if (alive === 0 || stillCount > 24) seed(); // reseed dead or frozen boards
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = accent;
    ctx.globalAlpha = ALPHA;
    var cw = canvas.width / cols, ch = canvas.height / rows;
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        if (grid[y * cols + x]) ctx.fillRect(x * cw + 0.5, y * ch + 0.5, cw - 1, ch - 1);
      }
    }
    ctx.globalAlpha = 1;
  }

  function tick() { step(); draw(); }
  function start() {
    if (timer) return;
    readAccent();
    timer = setInterval(tick, TICK_MS);
    tick();
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { stop(); sizeCanvas(); start(); }, 250);
  });

  // Follow light/dark theme switches and OS theme changes.
  var toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.addEventListener('click', function () { setTimeout(readAccent, 60); });
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  if (darkQuery.addEventListener) darkQuery.addEventListener('change', readAccent);

  sizeCanvas();
  start();
})();
