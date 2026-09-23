(function () {
  function applyLanguage(lang) {
    document.querySelectorAll("[data-en]").forEach(function (el) {
      if (!el.dataset.ko) {
        el.dataset.ko = el.innerHTML;
      }
      el.innerHTML = lang === "en" ? el.dataset.en : el.dataset.ko;
    });
    document.documentElement.lang = lang === "en" ? "en" : "ko";
    var langToggle = document.getElementById("langToggle");
    if (langToggle) langToggle.textContent = lang === "en" ? "KO" : "EN";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");

    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        menu.classList.toggle("open");
        menu.style.display = menu.classList.contains("open") ? "flex" : "";
      });
    }

    var filterPills = document.querySelectorAll(".filter-pill");
    var postRows = document.querySelectorAll(".post-row");
    var emptyState = document.getElementById("emptyState");

    filterPills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        filterPills.forEach(function (p) { p.classList.remove("active"); });
        pill.classList.add("active");

        var selected = pill.getAttribute("data-filter");
        var visibleCount = 0;

        postRows.forEach(function (row) {
          var match = selected === "전체" || row.getAttribute("data-category") === selected;
          row.style.display = match ? "" : "none";
          if (match) visibleCount++;
        });

        if (emptyState) {
          emptyState.style.display = visibleCount === 0 ? "block" : "none";
        }
      });
    });

    var themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      themeToggle.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀" : "☽";
      themeToggle.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        var next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        themeToggle.textContent = next === "dark" ? "☀" : "☽";
        try { localStorage.setItem("theme", next); } catch (e) {}
      });
    }

    var grayscaleToggle = document.getElementById("grayscaleToggle");
    if (grayscaleToggle) {
      grayscaleToggle.classList.toggle("active", document.documentElement.getAttribute("data-grayscale") === "true");
      grayscaleToggle.addEventListener("click", function () {
        var isOn = document.documentElement.getAttribute("data-grayscale") === "true";
        var next = isOn ? "false" : "true";
        document.documentElement.setAttribute("data-grayscale", next);
        grayscaleToggle.classList.toggle("active", next === "true");
        try { localStorage.setItem("grayscale", next); } catch (e) {}
      });
    }

    var savedLang = "ko";
    try { savedLang = localStorage.getItem("lang") || "ko"; } catch (e) {}
    applyLanguage(savedLang);

    var langToggle = document.getElementById("langToggle");
    if (langToggle) {
      langToggle.addEventListener("click", function () {
        var current = document.documentElement.lang === "en" ? "en" : "ko";
        var next = current === "en" ? "ko" : "en";
        applyLanguage(next);
        try { localStorage.setItem("lang", next); } catch (e) {}
      });
    }
  });
})();
