document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
});
