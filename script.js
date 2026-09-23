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
});
