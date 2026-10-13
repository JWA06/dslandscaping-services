/* DSLandscaping Services — site interactions */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation (full-screen panel) ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function navIsOpen() {
    return nav.classList.contains("is-open");
  }

  function setNav(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    // Stop the page scrolling behind the open menu
    document.documentElement.style.overflow = open ? "hidden" : "";
    onScroll();
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(!navIsOpen());
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && navIsOpen()) setNav(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navIsOpen()) {
        setNav(false);
        toggle.focus();
      }
    });

    // Close the panel if the window is widened to the desktop layout
    window.matchMedia("(min-width: 1100px)").addEventListener("change", function (e) {
      if (e.matches) setNav(false);
    });
  }

  /* ---------- Scroll effects ----------
     One throttled handler, measured against the page directly, so content
     always appears once it has been scrolled to. */
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");
  var contact = document.getElementById("contact");
  var mobileBar = document.querySelector(".mobile-bar");
  var band = document.querySelector(".band");
  var bandImg = document.querySelector(".band-img");

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  var pendingReveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  pendingReveals.forEach(function (el) {
    // Stagger items that sit side by side (service cards, steps, promises)
    var siblings = Array.prototype.filter.call(el.parentNode.children, function (child) {
      return child.classList.contains("reveal");
    });
    el.style.transitionDelay = (siblings.indexOf(el) % 3) * 110 + "ms";
  });

  function revealInView() {
    var limit = window.innerHeight * 0.9;
    pendingReveals = pendingReveals.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) {
        el.classList.add("is-visible");
        return false;
      }
      return true;
    });
  }

  function updateActiveLink() {
    // The active section is the one whose top is closest above this line
    var marker = window.innerHeight * 0.35;
    var current = null;
    var currentTop = -Infinity;
    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top;
      if (top <= marker && top > currentTop) {
        current = section;
        currentTop = top;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", Boolean(current) && link.getAttribute("href") === "#" + current.id);
    });
  }

  function updateMobileBar() {
    if (!mobileBar) return;
    var pastHero = hero.getBoundingClientRect().bottom < window.innerHeight * 0.5;
    var atContact = contact.getBoundingClientRect().top < window.innerHeight * 0.8;
    mobileBar.classList.toggle("is-visible", pastHero && !atContact && !navIsOpen());
  }

  function updateParallax() {
    if (reduceMotion || !band || !bandImg) return;
    var rect = band.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    // -1 when the band enters at the bottom, 1 when it leaves at the top
    var progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2 + rect.height / 2);
    bandImg.style.transform = "translateY(" + (progress * -8).toFixed(2) + "%)";
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      header.classList.toggle("is-solid", window.scrollY > 40 || navIsOpen());
      revealInView();
      updateActiveLink();
      updateMobileBar();
      updateParallax();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", onScroll);
  // Run straight away so anything already on screen is shown without waiting
  header.classList.toggle("is-solid", window.scrollY > 40);
  revealInView();
  updateActiveLink();

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
  var serviceSelect = document.getElementById("service");

  // "Enquire" links on the service cards pick that service in the form
  Array.prototype.forEach.call(document.querySelectorAll("[data-service]"), function (link) {
    link.addEventListener("click", function () {
      if (!serviceSelect) return;
      serviceSelect.value = link.getAttribute("data-service");
      serviceSelect.classList.add("is-picked");
      window.setTimeout(function () { serviceSelect.classList.remove("is-picked"); }, 1800);
    });
  });

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
        "Postcode: " + (data.get("postcode") || "Not given"),
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
