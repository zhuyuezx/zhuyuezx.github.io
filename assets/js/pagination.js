// Client-side pagination for the archive and category feeds.
// Every card is rendered into the HTML by Liquid; this only shows a slice at a
// time. With JS off, the page degrades to showing every post.
(function () {
  'use strict';

  function buildPager(container, index) {
    var perPage = parseInt(container.getAttribute('data-per-page'), 10) || 10;
    var items = Array.prototype.slice.call(
      container.querySelectorAll(':scope > [data-page-item]')
    );
    if (items.length <= perPage) { return; }

    var totalPages = Math.ceil(items.length / perPage);
    var key = index === 0 ? 'page' : 'page' + (index + 1);

    var nav = document.createElement('nav');
    nav.className = 'pager';
    nav.setAttribute('aria-label', 'Pagination');
    container.parentNode.insertBefore(nav, container.nextSibling);

    function readPage() {
      var v = parseInt(new URLSearchParams(window.location.search).get(key), 10);
      if (!v || v < 1) { return 1; }
      return v > totalPages ? totalPages : v;
    }

    function writePage(page) {
      if (!window.history || !window.history.pushState) { return; }
      var params = new URLSearchParams(window.location.search);
      if (page === 1) { params.delete(key); } else { params.set(key, page); }
      var qs = params.toString();
      window.history.pushState(
        {}, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash
      );
    }

    // first, last, and the current page's neighbours - with gaps marked
    function pageNumbers(current) {
      var shown = [];
      var add = function (n) { if (shown.indexOf(n) === -1) { shown.push(n); } };
      add(1);
      for (var i = current - 1; i <= current + 1; i++) {
        if (i > 1 && i < totalPages) { add(i); }
      }
      add(totalPages);
      shown.sort(function (a, b) { return a - b; });

      var out = [];
      for (var j = 0; j < shown.length; j++) {
        if (j > 0 && shown[j] - shown[j - 1] > 1) { out.push('gap'); }
        out.push(shown[j]);
      }
      return out;
    }

    function button(text, targetPage, extraClass) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pager-btn' + (extraClass ? ' ' + extraClass : '');
      b.textContent = text;
      b.addEventListener('click', function () { go(targetPage); });
      return b;
    }

    function render(page, scroll) {
      items.forEach(function (el, i) {
        var first = (page - 1) * perPage;
        el.style.display = (i >= first && i < first + perPage) ? '' : 'none';
      });

      nav.innerHTML = '';

      var prev = button('‹ Prev', page - 1, 'pager-step');
      prev.disabled = page === 1;
      nav.appendChild(prev);

      pageNumbers(page).forEach(function (n) {
        if (n === 'gap') {
          var gap = document.createElement('span');
          gap.className = 'pager-gap';
          gap.textContent = '…';
          nav.appendChild(gap);
          return;
        }
        var b = button(String(n), n, n === page ? 'is-current' : '');
        if (n === page) { b.setAttribute('aria-current', 'page'); }
        nav.appendChild(b);
      });

      var next = button('Next ›', page + 1, 'pager-step');
      next.disabled = page === totalPages;
      nav.appendChild(next);

      var count = document.createElement('span');
      count.className = 'pager-count';
      count.textContent = page + ' / ' + totalPages;
      nav.appendChild(count);

      if (scroll) {
        var top = container.getBoundingClientRect().top + window.pageYOffset - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    }

    function go(page) {
      if (page < 1 || page > totalPages) { return; }
      render(page, true);
      writePage(page);
    }

    window.addEventListener('popstate', function () { render(readPage(), false); });
    render(readPage(), false);
  }

  function init() {
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-paginate]'), buildPager
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
