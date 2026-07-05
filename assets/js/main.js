document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  function stripHashLater() {
    if (!location.hash) return;
    window.setTimeout(function () {
      history.replaceState(null, "", location.pathname + location.search);
    }, 1000);
  }

  stripHashLater();
  window.addEventListener("hashchange", stripHashLater);

  var stickyCta = document.querySelector(".sticky-cta");
  if (stickyCta) {
    var lastScrollY = window.scrollY;
    var ticking = false;

    function updateStickyCta() {
      var currentScrollY = window.scrollY;
      var scrollingDown = currentScrollY > lastScrollY;

      if (scrollingDown && currentScrollY > 80) {
        stickyCta.classList.add("is-hidden");
      } else {
        stickyCta.classList.remove("is-hidden");
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateStickyCta);
          ticking = true;
        }
      },
      { passive: true }
    );
  }
});
