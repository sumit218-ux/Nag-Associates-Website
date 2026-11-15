(function () {
  "use strict";

  document.getElementById("yr").textContent = new Date().getFullYear();

  // Solid nav after scrolling past the top of the hero
  var nav = document.querySelector(".nav");
  function onScroll() { nav.classList.toggle("solid", window.scrollY > 20); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  btn.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // Pricing buttons preselect the package in the quote form
  var need = document.getElementById("q-need");
  document.querySelectorAll("[data-plan]").forEach(function (a) {
    a.addEventListener("click", function () { need.value = a.getAttribute("data-plan"); });
  });

  // Reveal on scroll
  var items = document.querySelectorAll(".feature, .process li, .quote, .plan, .sec-head, .cta-inner");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { el.classList.add("rv"); io.observe(el); });
  }

  // Quote form: validate, then open the visitor's email app
  var form = document.getElementById("quote-form");
  var msg = form.querySelector(".form-msg");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name, phone = form.elements.phone;
    var okName = name.value.trim() !== "";
    var okPhone = /^[+\d][\d\s-]{7,}$/.test(phone.value.trim());
    name.classList.toggle("bad", !okName);
    phone.classList.toggle("bad", !okPhone);
    if (!okName || !okPhone) {
      msg.className = "form-msg err";
      msg.textContent = "Please enter your name and a valid phone number.";
      return;
    }
    var body = "Name: " + name.value + "\nPhone: " + phone.value +
      "\nService: " + form.elements.need.value +
      "\nSite location: " + form.elements.location.value;
    window.location.href = "mailto:nag_associates@outlook.com?subject=" +
      encodeURIComponent("Quote request - " + form.elements.need.value) +
      "&body=" + encodeURIComponent(body);
    msg.className = "form-msg ok";
    msg.textContent = "Thanks! Your email app will open to send the request. You can also call us directly.";
    form.reset();
  });
})();
