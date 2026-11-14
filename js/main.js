(function () {
  "use strict";

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function setNav(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () {
    setNav(!nav.classList.contains("open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setNav(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNav(false);
  });

  // Reveal-on-scroll animation
  var revealTargets = document.querySelectorAll(".card, .section-head, .split > *, .sister, .tech-inner > *");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  // Contact form: validates input, then opens the visitor's email app.
  // To receive submissions directly, point the form at a service such as
  // Formspree or Netlify Forms (see README).
  var form = document.getElementById("contact-form");
  var status = form.querySelector(".form-status");
  var RECIPIENT = "nag_associates@outlook.com";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    ["name", "phone", "email", "message"].forEach(function (id) {
      var input = form.elements[id];
      var empty = input.value.trim() === "";
      var valid = input.required ? !empty && input.checkValidity() : (empty || input.checkValidity());
      input.closest(".field").classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    });

    if (!ok) {
      status.className = "form-status err";
      status.textContent = "Please fill in your name, phone number and a message (and a valid email if given).";
      return;
    }

    var d = form.elements;
    var subject = "Website enquiry - " + d.service.value;
    var body =
      "Name: " + d.name.value + "\n" +
      "Phone: " + d.phone.value + "\n" +
      "Email: " + d.email.value + "\n" +
      "Site location: " + d.location.value + "\n\n" +
      d.message.value;
    window.location.href =
      "mailto:" + RECIPIENT +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    status.className = "form-status ok";
    status.textContent = "Thank you! Your email app should open to send the message.";
    form.reset();
  });
})();
