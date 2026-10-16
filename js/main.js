/* DSLandscaping Services — site interactions */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Parallax is for larger screens only; on phones it costs smoothness for little gain
  var wideScreen = window.matchMedia("(min-width: 900px)");

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
    if (!band || !bandImg) return;
    if (reduceMotion || !wideScreen.matches) {
      bandImg.style.transform = "";
      return;
    }
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

  /* ---------- Swipeable services on phones: progress dots ---------- */
  var serviceGrid = document.querySelector(".service-grid");
  var dotsBox = document.querySelector(".service-dots");

  if (serviceGrid && dotsBox) {
    var cards = serviceGrid.querySelectorAll(".service");
    var dots = Array.prototype.map.call(cards, function () {
      return dotsBox.appendChild(document.createElement("span"));
    });
    var dotsTicking = false;

    var updateDots = function () {
      dotsTicking = false;
      var step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 1;
      var maxScroll = serviceGrid.scrollWidth - serviceGrid.clientWidth;
      // At the far end, the last card may not reach the left edge, so mark it explicitly
      var index = serviceGrid.scrollLeft >= maxScroll - 2
        ? cards.length - 1
        : Math.round(serviceGrid.scrollLeft / step);
      dots.forEach(function (dot, i) { dot.classList.toggle("is-active", i === index); });
    };

    serviceGrid.addEventListener("scroll", function () {
      if (dotsTicking) return;
      dotsTicking = true;
      window.requestAnimationFrame(updateDots);
    }, { passive: true });
    window.addEventListener("resize", updateDots);
    updateDots();
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Contact form ----------
     Fields are checked, then the enquiry is posted to Netlify Forms, which
     stores it and emails it to the business. If that fails (e.g. the site
     isn't on Netlify), the visitor gets a link to email it to the form's
     data-email address instead, with everything already filled in. */
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
    var fields = Array.prototype.slice.call(form.querySelectorAll(".field input, .field textarea"));

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

      e.preventDefault();

      var data = new FormData(form);
      var button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      status.textContent = "Sending…";

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString()
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Status " + response.status);
          form.reset();
          status.textContent = "Thanks, " + data.get("name") + "! Your enquiry has been sent and we’ll get back to you as soon as we can.";
        })
        .catch(function () {
          // Couldn't send it from the page, so offer the visitor's email app instead
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
          var link = document.createElement("a");
          link.href = "mailto:" + form.dataset.email +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);
          link.textContent = "email it to us instead";
          status.textContent = "Sorry, your enquiry couldn’t be sent just now. Please try again, call us, or ";
          status.appendChild(link);
          status.appendChild(document.createTextNode(" (your enquiry is already filled in)."));
        })
        .then(function () {
          button.disabled = false;
        });
    });
  }

  /* ---------- Reviews ----------
     Approved reviews live in the JSON list in index.html (id="reviews-data").
     New reviews from the form are sent to Netlify Forms for checking first. */
  var reviewsData = document.getElementById("reviews-data");
  var reviewsList = document.getElementById("reviews-list");
  var reviewsEmpty = document.getElementById("reviews-empty");

  function renderReviews() {
    if (!reviewsData || !reviewsList) return;
    var reviews;
    try {
      reviews = JSON.parse(reviewsData.textContent);
    } catch (err) {
      return;
    }
    if (!Array.isArray(reviews)) return;
    reviews = reviews.filter(function (r) { return r && r.name && r.text; });
    if (!reviews.length) return;

    reviews.forEach(function (r) {
      var item = document.createElement("blockquote");
      item.className = "review";

      var rating = Math.max(0, Math.min(5, Math.round(Number(r.rating) || 0)));
      if (rating) {
        var stars = document.createElement("div");
        stars.className = "review-stars";
        stars.setAttribute("role", "img");
        stars.setAttribute("aria-label", "Rated " + rating + " out of 5");
        stars.textContent = new Array(rating + 1).join("★");
        if (rating < 5) {
          var off = document.createElement("span");
          off.className = "off";
          off.textContent = new Array(5 - rating + 1).join("★");
          stars.appendChild(off);
        }
        item.appendChild(stars);
      }

      var text = document.createElement("p");
      text.textContent = r.text;
      item.appendChild(text);

      var by = document.createElement("footer");
      by.textContent = [r.name, r.area, r.source && "via " + r.source].filter(Boolean).join(" · ");
      item.appendChild(by);

      reviewsList.appendChild(item);
    });
    if (reviewsEmpty) reviewsEmpty.hidden = true;
  }
  renderReviews();

  var reviewForm = document.getElementById("review-form");
  var reviewStatus = document.getElementById("review-status");

  if (reviewForm) {
    var ratingField = document.getElementById("rating-field");
    var ratingInputs = reviewForm.querySelectorAll('input[name="rating"]');
    var reviewFields = [document.getElementById("review-name"), document.getElementById("review-text")];
    var businessEmail = (form && form.dataset.email) || "dslandscapes84@gmail.com";

    var validateRating = function () {
      var existing = ratingField.querySelector(".field-error");
      if (existing) existing.remove();
      var chosen = Array.prototype.some.call(ratingInputs, function (input) { return input.checked; });
      ratingField.classList.toggle("has-error", !chosen);
      if (chosen) {
        ratingField.removeAttribute("aria-describedby");
      } else {
        var error = document.createElement("span");
        error.className = "field-error";
        error.id = "rating-error";
        error.textContent = "Please choose a star rating.";
        ratingField.appendChild(error);
        ratingField.setAttribute("aria-describedby", error.id);
      }
      return chosen;
    };

    Array.prototype.forEach.call(ratingInputs, function (input) {
      input.addEventListener("change", function () {
        if (ratingField.classList.contains("has-error")) validateRating();
      });
    });
    reviewFields.forEach(function (field) {
      field.addEventListener("input", function () {
        if (field.closest(".field").classList.contains("has-error")) validate(field);
      });
      field.addEventListener("blur", function () {
        if (field.value.trim()) validate(field);
      });
    });

    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var firstInvalid = validateRating() ? null : ratingInputs[0];
      reviewFields.forEach(function (field) {
        if (!validate(field) && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        reviewStatus.textContent = "";
        return;
      }

      var button = reviewForm.querySelector('button[type="submit"]');
      button.disabled = true;
      reviewStatus.textContent = "Sending…";

      // Netlify Forms accepts the review when it's posted to the site
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(reviewForm)).toString()
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Status " + response.status);
          reviewForm.reset();
          reviewStatus.textContent = "Thank you! Your review has been sent and will appear here once it’s been checked.";
        })
        .catch(function () {
          reviewStatus.textContent = "Sorry, your review couldn’t be sent just now. Please try again, or email it to ";
          var link = document.createElement("a");
          link.href = "mailto:" + businessEmail + "?subject=" + encodeURIComponent("Review");
          link.textContent = businessEmail;
          reviewStatus.appendChild(link);
          reviewStatus.appendChild(document.createTextNode("."));
        })
        .then(function () {
          button.disabled = false;
        });
    });
  }

})();
