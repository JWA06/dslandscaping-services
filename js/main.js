/* DSLandscaping Services — site interactions */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Header: transparent over the hero, solid once scrolled ---------- */
  var header = document.querySelector(".site-header");

  function updateHeader() {
    header.classList.toggle("is-solid", window.scrollY > 40);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------- Mobile navigation (full-screen panel) ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    // Stop the page scrolling behind the open menu
    document.documentElement.style.overflow = open ? "hidden" : "";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setNav(false);
        toggle.focus();
      }
    });

    // Close the panel if the window is widened to the desktop layout
    window.matchMedia("(min-width: 1000px)").addEventListener("change", function (e) {
      if (e.matches) setNav(false);
    });
  }

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
      // Clear an error as soon as it's fixed, while typing. Doing it on blur
      // instead would move the Send button just as it's being clicked.
      field.addEventListener("input", function () {
        if (field.closest(".field").classList.contains("has-error")) validate(field);
      });
      field.addEventListener("blur", function () {
        if (field.value.trim()) validate(field);
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
