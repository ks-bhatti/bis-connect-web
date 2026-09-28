/* BIS Connect, site interactions. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Sticky header shadow on scroll ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Scroll reveal via IntersectionObserver ---- */
  var reveals = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function revealAll() { reveals.forEach(function (el) { el.classList.add('in'); }); }
  if (reduceMotion || !('IntersectionObserver' in window) || !reveals.length) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    // Fail-safe: if the rendering loop is throttled (background tab, power
    // saving, some headless tools) the observer may never fire. setTimeout is
    // not tied to the paint loop, so this guarantees content becomes visible.
    setTimeout(revealAll, 2500);
  }

  /* ---- Animated counters (only for real, factual numbers) ---- */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        if (reduce) { el.textContent = target + suffix; cio.unobserve(el); return; }
        var start = 0, dur = 1400, t0 = null;
        var tick = function (ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(start + (target - start) * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---- Current year in footer ---- */
  var yr = document.querySelectorAll('[data-year]');
  yr.forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- Swiper: customer app carousel (progressive enhancement) ---- */
  if (typeof Swiper !== 'undefined' && document.getElementById('appSwiper')) {
    try {
      new Swiper('#appSwiper', {
        slidesPerView: 1.15, spaceBetween: 18, centeredSlides: true, grabCursor: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
          640:  { slidesPerView: 2.2, centeredSlides: false },
          900:  { slidesPerView: 3.2, centeredSlides: false },
          1160: { slidesPerView: 4, centeredSlides: false }
        }
      });
    } catch (e) { /* leave slides as a static row if init fails */ }
  }

  /* ---- Demo request: compose a prefilled email (no fake submission) ---- */
  var demoForm = document.getElementById('demoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var lines = [
        'Name: ' + g('d_name'),
        'ISP / company: ' + g('d_isp'),
        'Phone / WhatsApp: ' + g('d_phone'),
        'Approx. customers: ' + g('d_size'),
        '',
        'What they want to see:',
        g('d_msg')
      ];
      var url = 'mailto:bisconnect.info@gmail.com'
        + '?subject=' + encodeURIComponent('BIS Connect demo request')
        + '&body=' + encodeURIComponent(lines.join('\n'));
      window.location.href = url;
    });
  }

  /* ---- GSAP hero entrance (optional; content is visible without it) ---- */
  if (!reduceMotion && typeof gsap !== 'undefined') {
    // Only NOW hide the hero pieces, so if GSAP is missing they never get hidden.
    document.documentElement.classList.add('gsap-ready');
    try {
      var tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
      tl.from('.hero__copy.g-hero', { y: 24, opacity: 0 })
        .from('#heroDash', { y: 34, opacity: 0, scale: 0.98 }, '-=0.5')
        .from('.hero__phone.g-hero', { y: 40, opacity: 0 }, '-=0.5');
      // safety: guarantee visible shortly after, even if a tween is interrupted
      setTimeout(function () {
        document.querySelectorAll('.g-hero').forEach(function (el) { el.style.opacity = '1'; });
      }, 1600);
    } catch (e) {
      document.querySelectorAll('.g-hero').forEach(function (el) { el.style.opacity = '1'; });
    }
  }
})();
