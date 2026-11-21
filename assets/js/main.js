(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Header state, progress bar, back-to-top
  var header = document.getElementById('header');
  var bar = document.getElementById('progressBar');
  var toTop = document.getElementById('toTop');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 10);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    toTop.classList.toggle('show', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // Years of experience (from 2002)
  var years = new Date().getFullYear() - 2002;
  document.querySelectorAll('[data-count="years"]').forEach(function (el) {
    el.setAttribute('data-count', years);
    el.textContent = years + '+';
  });

  // Count-up numbers
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var start = el.hasAttribute('data-plain') ? Math.max(0, target - 40) : 0;
    if (reduce) { el.textContent = target + suffix; return; }
    var t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    // Active nav link
    var links = nav.querySelectorAll('a[href^="#"]');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });

    // Reveal on scroll
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var t = e.target;
        t.classList.add('visible', 'in-view');
        rev.unobserve(t);
        if (t.hasAttribute('data-count')) countUp(t);
        if (t.classList.contains('reveal')) {
          setTimeout(function () { t.classList.remove('reveal', 'visible'); t.style.removeProperty('--i'); }, 1600);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    var sel = '.quote, .stat, .client, .split-head, .about-text > *, .about-figure, .journey li, .rows li, .rows-split > div > .h2, .value, .entities-head > *, .tabs, .panels, .svc, .two-cards .wcard, .center-block > *, .contact-panel, .footer-cols > div, .band > .container > .mono-label, .band > .container > .h2, .band > .container > .muted';
    if (!reduce) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (el.closest('.hero')) return;
        el.classList.add('reveal');
        var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
        el.style.setProperty('--i', Math.min(idx, 6));
        rev.observe(el);
      });
    }
    document.querySelectorAll('.journey, [data-count]').forEach(function (el) { rev.observe(el); });
    document.querySelectorAll('.journey li').forEach(function (li, i) { li.style.setProperty('--i', i); });
  }

  // Core values: expand cards
  var values = document.querySelectorAll('.value');
  values.forEach(function (card) {
    card.addEventListener('click', function () {
      values.forEach(function (c) {
        var on = c === card ? !c.classList.contains('open') : false;
        c.classList.toggle('open', on);
        c.querySelector('.plus').setAttribute('aria-expanded', on);
      });
    });
  });

  // Entity tabs
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on);
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        panel.hidden = !on;
        panel.classList.toggle('active', on);
      });
    });
  });
  if (location.hash === '#topogrid' || location.hash === '#aadrita') {
    var t = document.getElementById('t-' + location.hash.slice(1));
    if (t) t.click();
  }

  // Enquiry form -> WhatsApp or Email (no server needed)
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var d = new FormData(form);
    var name = (d.get('name') || '').trim();
    var phone = (d.get('phone') || '').trim();
    if (!name || !phone) { note.className = 'form-note err'; note.textContent = 'Please enter your name and phone number.'; return; }
    var via = d.get('via') || 'whatsapp';
    note.className = 'form-note ok';
    note.textContent = via === 'email' ? 'Opening your email app…' : 'Opening WhatsApp…';
    var text = 'Enquiry from website\nName: ' + name + '\nPhone: ' + phone + '\nService: ' + d.get('service') + '\nMessage: ' + (d.get('message') || '');
    if (via === 'email') {
      window.location.href = 'mailto:nag_associates@outlook.com?subject=' + encodeURIComponent('Website enquiry – ' + d.get('service')) + '&body=' + encodeURIComponent(text);
    } else {
      window.open('https://wa.me/919564295656?text=' + encodeURIComponent(text), '_blank', 'noopener');
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
