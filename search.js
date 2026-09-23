document.addEventListener("DOMContentLoaded", function () {
  var openBtn = document.getElementById("searchToggle");
  var overlay = document.getElementById("searchOverlay");
  var input = document.getElementById("searchInput");
  var results = document.getElementById("searchResults");

  if (!openBtn || !overlay || !input || !results || typeof SEARCH_INDEX === "undefined") return;

  var isArticlePage = location.pathname.indexOf("/posts/") !== -1;

  function resolveUrl(url) {
    return isArticlePage ? "../" + url : url;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render(query) {
    var q = query.trim().toLowerCase();

    if (!q) {
      results.innerHTML = '<p class="search-hint">글 제목, 키워드, 태그로 검색해보세요.</p>';
      return;
    }

    var matches = SEARCH_INDEX.filter(function (item) {
      var haystack = [item.title, item.category, item.tags.join(" "), item.content]
        .join(" ")
        .toLowerCase();
      return haystack.indexOf(q) !== -1;
    });

    if (matches.length === 0) {
      results.innerHTML = '<p class="search-empty">검색 결과가 없습니다.</p>';
      return;
    }

    results.innerHTML = matches
      .map(function (item) {
        return (
          '<a class="search-result" href="' + resolveUrl(item.url) + '">' +
          '<span class="search-result-kicker">' + escapeHtml(item.category) + " · " + escapeHtml(item.date) + "</span>" +
          '<span class="search-result-title">' + escapeHtml(item.title) + "</span>" +
          '<span class="search-result-excerpt">' + escapeHtml(item.excerpt) + "</span>" +
          "</a>"
        );
      })
      .join("");
  }

  function openSearch() {
    overlay.classList.add("open");
    input.value = "";
    render("");
    setTimeout(function () {
      input.focus();
    }, 0);
  }

  function closeSearch() {
    overlay.classList.remove("open");
  }

  openBtn.addEventListener("click", openSearch);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeSearch();
  });

  input.addEventListener("input", function () {
    render(input.value);
  });

  document.addEventListener("keydown", function (e) {
    var isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
    if (isCmdK) {
      e.preventDefault();
      overlay.classList.contains("open") ? closeSearch() : openSearch();
    } else if (e.key === "Escape" && overlay.classList.contains("open")) {
      closeSearch();
    }
  });
});
