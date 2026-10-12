/* DSLandscaping Services — site interactions */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });
  }

  /* ---------- Scroll effects ----------
     Header shadow, active nav link and reveal-on-scroll all run from one
     throttled scroll handler, measured against the page directly, so content
     always appears once it has been scrolled to. */
  var header = document.querySelector(".site-header");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav li a"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);
  var pendingReveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  pendingReveals.forEach(function (el, i) {
    // Small stagger for items that sit side by side in a grid
    el.style.transitionDelay = (i % 3) * 80 + "ms";
  });

  function updateActiveLink() {
    var marker = window.innerHeight * 0.4;
    var current = null;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= marker) current = section;
    });
    // Back at the top of the page (in the hero), no section is active
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", Boolean(current) && link.getAttribute("href") === "#" + current.id);
    });
  }

  function revealInView() {
    var limit = window.innerHeight * 0.92;
    pendingReveals = pendingReveals.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) {
        el.classList.add("is-visible");
        return false;
      }
      return true;
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      updateActiveLink();
      revealInView();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", onScroll);
  // Run straight away so anything already on screen is shown without waiting
  header.classList.toggle("is-scrolled", window.scrollY > 8);
  updateActiveLink();
  revealInView();

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Contact form ----------
     Fields are checked before sending. If the form has an action attribute
     (e.g. a Formspree URL) it then submits there as normal. Otherwise, with no
     server behind the site, it opens the visitor's email app with their
     enquiry filled in, ready to send to the form's data-email address. */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  function setError(field, message) {
    var wrapper = field.closest(".field");
    var existing = wrapper.querySelector(".field-error");
    if (existing) existing.remove();
    wrapper.classList.toggle("has-error", Boolean(message));
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
    if (!message) return;

    var error = document.createElement("span");
    error.className = "field-error";
    error.id = field.id + "-error";
    error.textContent = message;
    wrapper.appendChild(error);
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", error.id);
  }

  function validate(field) {
    var value = field.value.trim();
    if (field.required && !value) {
      setError(field, "Please fill in this field.");
      return false;
    }
    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(field, "Please enter a valid email address.");
      return false;
    }
    setError(field, "");
    return true;
  }

  if (form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll("input, textarea"));

    fields.forEach(function (field) {
      field.addEventListener("blur", function () {
        if (field.value.trim() || field.closest(".field").classList.contains("has-error")) validate(field);
      });
    });

    form.addEventListener("submit", function (e) {
      var firstInvalid = null;
      fields.forEach(function (field) {
        if (!validate(field) && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        e.preventDefault();
        firstInvalid.focus();
        status.textContent = "";
        return;
      }

      if (form.hasAttribute("action")) return;
      e.preventDefault();

      var data = new FormData(form);
      var subject = "Quote request: " + data.get("service") + " (" + data.get("name") + ")";
      var body = [
        "Name: " + data.get("name"),
        "Email: " + data.get("email"),
        "Phone: " + (data.get("phone") || "Not given"),
        "Service: " + data.get("service"),
        "",
        data.get("message")
      ].join("\n");

      window.location.href = "mailto:" + form.dataset.email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      status.textContent = "Thanks! Your email app should now open with your enquiry ready to send.";
    });
  }
})();
