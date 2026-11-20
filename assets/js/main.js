(function () {
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

  // Header shadow on scroll
  var header = document.getElementById('header');
  var bar = document.getElementById('progressBar');
  var toTop = document.getElementById('toTop');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 10);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    toTop.classList.toggle('show', y > 600);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // Active nav link + reveal on scroll
  if ('IntersectionObserver' in window) {
    var links = nav.querySelectorAll('a[href^="#"]');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var groups = [
      ['.highlight', ''], ['.card', ''], ['.pill', 'zoom'], ['.stat', 'zoom'],
      ['.value', ''], ['.entity', ''], ['.timeline li', 'from-right'],
      ['.vm-card:first-child', 'from-left'], ['.vm-card:last-child', 'from-right'],
      ['.info-item', 'from-left'], ['.contact-form', 'from-right'],
      ['.print-list li', 'from-right'], ['.printing-grid > div:first-child', 'from-left'],
      ['.aadrita-services div', 'zoom'], ['.aadrita-logo', 'zoom'],
      ['.about-grid > div:first-child', 'from-left'], ['.group-banner > *', ''],
      ['.section-sub', ''], ['.eyebrow.center', ''], ['.cta-inner > *', '']
    ];
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var t = e.target;
          t.classList.add('visible', 'in-view');
          rev.unobserve(t);
          // once revealed, drop reveal classes so hover effects work normally
          if (t.classList.contains('reveal')) {
            setTimeout(function () {
              t.classList.remove('reveal', 'visible', 'from-left', 'from-right', 'zoom');
              t.style.removeProperty('--i');
            }, 1700);
          }
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    if (!reduce) {
      groups.forEach(function (g) {
        var els = document.querySelectorAll(g[0]);
        els.forEach(function (el, idx) {
          if (el.closest('.hero')) return;
          el.classList.add('reveal');
          if (g[1]) el.classList.add(g[1]);
          var sib = Array.prototype.indexOf.call(el.parentNode.children, el);
          el.style.setProperty('--i', Math.min(sib, 8));
          rev.observe(el);
        });
      });
    }
    // titles underline + timeline line
    document.querySelectorAll('.section-title, .about-heading.center, .group-name, .timeline').forEach(function (el) { rev.observe(el); });
  }

  // Enquiry form -> WhatsApp or Email (no server needed)
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var via = 'whatsapp';
  form.querySelectorAll('button[type="submit"]').forEach(function (b) {
    b.addEventListener('click', function () { via = b.getAttribute('data-via'); });
  });
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var d = new FormData(form);
    var name = (d.get('name') || '').trim();
    var phone = (d.get('phone') || '').trim();
    if (!name || !phone) {
      note.textContent = 'Please enter your name and phone number.';
      return;
    }
    note.textContent = '';
    var text = 'Enquiry from website\n' +
      'Name: ' + name + '\n' +
      'Phone: ' + phone + '\n' +
      'Service: ' + d.get('service') + '\n' +
      'Message: ' + (d.get('message') || '');
    if (via === 'email') {
      window.location.href = 'mailto:nag_associates@outlook.com?subject=' +
        encodeURIComponent('Website enquiry – ' + d.get('service')) +
        '&body=' + encodeURIComponent(text);
    } else {
      window.open('https://wa.me/919564295656?text=' + encodeURIComponent(text), '_blank', 'noopener');
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
