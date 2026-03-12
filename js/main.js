/* ============================================================
   PARAMOUNT DIGITAL SERVICES — main.js
   Cursor · Counters · Scroll Reveal · Mobile Menu
   ============================================================ */

/* ── CUSTOM CURSOR ───────────────────────────────────────── */
(function () {
  var cursor = document.getElementById('cursor');
  var ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Ring follows with lag
  function animateRing () {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover scale
  function addHover (el) {
    el.addEventListener('mouseenter', function () { cursor.classList.add('hover'); });
    el.addEventListener('mouseleave', function () { cursor.classList.remove('hover'); });
  }
  document.querySelectorAll('a, button, [onclick], .work-card, .service-card').forEach(addHover);
})();

/* ── MOBILE MENU ─────────────────────────────────────────── */
(function () {
  var btn  = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    menu.classList.toggle('open');
    var spans = btn.querySelectorAll('span');
    if (menu.classList.contains('open')) {
      spans[0].style.transform = 'translateY(6px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    } else {
      spans.forEach(function (s) { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  window.closeMobileMenu = function () {
    menu.classList.remove('open');
    btn.querySelectorAll('span').forEach(function (s) { s.style.transform = ''; s.style.opacity = ''; });
  };
})();

/* ── COUNTER ANIMATION ───────────────────────────────────── */
function animateCounters () {
  document.querySelectorAll('.stat-num[data-target]').forEach(function (el) {
    var target  = parseInt(el.getAttribute('data-target'), 10);
    var current = 0;
    var frames  = 55;
    var step    = target / frames;
    var timer   = setInterval(function () {
      current += step;
      if (current >= target) {
        el.textContent = target + '+';
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + '+';
      }
    }, 28);
  });
}

var counterDone = false;
var statsEl = document.querySelector('.stats-strip');
if (statsEl) {
  var statsObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !counterDone) {
        counterDone = true;
        animateCounters();
        statsObs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  statsObs.observe(statsEl);
}

/* ── SCROLL REVEAL ───────────────────────────────────────── */
var revealObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObs.observe(el);
});

/* ── ACTIVE NAV ON SCROLL ────────────────────────────────── */
(function () {
  var sections = document.querySelectorAll('section[id]');
  var links    = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        links.forEach(function (a) {
          a.style.color = a.getAttribute('href') === '#' + sec.id ? '#fff' : '';
        });
      }
    });
  });
})();
