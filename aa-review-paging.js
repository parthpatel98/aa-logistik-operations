/* Pagination for the Review Requests table. Wraps review() last, so it pages whatever table the
   screen finally renders (queue tabs, filters and sorting are applied before the rows are cut). */
const REVIEW_PAGE_SIZES = [10, 25, 50];

function setReviewPage(p) { S.reviewPage = p; render() }
function setReviewPageSize(v) { S.reviewPageSize = parseInt(v, 10) || 10; S.reviewPage = 1; render() }

(function () {
  const reviewPagedBase = review;

  function reviewPager(total, page, pageCount, pageSize) {
    const from = (page - 1) * pageSize + 1, to = Math.min(page * pageSize, total);
    const shown = [...Array(pageCount)].map((_, i) => i + 1).filter(n => n === 1 || n === pageCount || Math.abs(n - page) <= 1);
    let nums = '', prev = 0;
    shown.forEach(n => {
      if (prev && n - prev > 1) nums += `<span class="case-pager-gap">…</span>`;
      nums += `<button type="button" class="case-pager-num${n === page ? ' active' : ''}" onclick="setReviewPage(${n})" aria-current="${n === page ? 'page' : 'false'}">${n}</button>`;
      prev = n;
    });
    return `<div class="case-pager"><span class="sub">Showing ${from}–${to} of ${total} ${total === 1 ? 'Request' : 'Requests'}</span><div class="case-pager-controls"><button type="button" class="icon-btn" ${page <= 1 ? 'disabled' : ''} title="Previous page" aria-label="Previous page" onclick="setReviewPage(${page - 1})">‹</button>${nums}<button type="button" class="icon-btn" ${page >= pageCount ? 'disabled' : ''} title="Next page" aria-label="Next page" onclick="setReviewPage(${page + 1})">›</button><label class="case-pager-size">Rows per page<select aria-label="Rows per page" onchange="setReviewPageSize(this.value)">${REVIEW_PAGE_SIZES.map(n => `<option value="${n}" ${pageSize === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label></div></div>`;
  }

  review = function () {
    const html = reviewPagedBase();
    const template = document.createElement('template');
    template.innerHTML = html;

    const table = [...template.content.querySelectorAll('table')].find(t => t.querySelector('tbody > tr'));
    if (!table) return html;

    // Keep each Reference (EML-4101 etc.) on one line.
    table.querySelectorAll('td > button.case-link').forEach(button => {
      button.style.whiteSpace = 'nowrap';
      button.parentElement.style.whiteSpace = 'nowrap';
    });

    // A different queue tab or a changed filter starts again at page 1.
    if (S.reviewPageTab !== S.queueTab) { S.reviewPage = 1; S.reviewPageTab = S.queueTab }
    const rows = [...table.querySelectorAll('tbody > tr')];
    const pageSize = REVIEW_PAGE_SIZES.includes(S.reviewPageSize) ? S.reviewPageSize : 10;
    const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
    const page = S.reviewPage = Math.min(Math.max(1, S.reviewPage || 1), pageCount);

    rows.forEach((row, i) => { if (i < (page - 1) * pageSize || i >= page * pageSize) row.remove() });
    table.insertAdjacentHTML('afterend', reviewPager(rows.length, page, pageCount, pageSize));
    return template.innerHTML;
  };
})();
