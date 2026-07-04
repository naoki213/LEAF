document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("step-modal");
  if (!modal) return;

  var panel = modal.querySelector(".step-modal-panel");
  var iconEl = document.getElementById("step-modal-icon");
  var numberEl = document.getElementById("step-modal-number");
  var titleEl = document.getElementById("step-modal-title");
  var bodyEl = document.getElementById("step-modal-body");
  var lastFocused = null;

  function openModal(stepEl) {
    var icon = stepEl.querySelector(".step-icon");
    iconEl.innerHTML = icon ? icon.innerHTML : "";
    numberEl.textContent = stepEl.querySelector(".step-number").textContent;
    titleEl.textContent = stepEl.querySelector(".step-title").textContent;
    bodyEl.textContent = stepEl.dataset.detail || stepEl.querySelector(".step-desc").textContent;

    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    panel.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll(".step").forEach(function (stepEl) {
    stepEl.addEventListener("click", function () {
      openModal(stepEl);
    });
  });

  modal.querySelectorAll("[data-modal-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
});
