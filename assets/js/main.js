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
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

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

    var revealEls = document.querySelectorAll('.card, .highlight, .pill, .stat, .info-item, .print-list li, .aadrita-services div');
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); rev.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { el.classList.add('reveal'); rev.observe(el); });
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
