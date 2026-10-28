/* Case list columns in the agreed order: identity and subject, then due date, customer, classification,
   department, status, priority and dates. Reorders the header and every row together, so sorting and
   filtering (which work by column name, not position) are unchanged. The case count sits at the right end of
   the filter row, and the table scrolls under a header that stays in view, so the columns are always labelled.
   Wraps cases() last. */
(function () {
  const ORDER = ['Case No.', 'Subject', 'Due Date', 'Customer', 'Category', 'Case Type', 'Departments', 'Case Status', 'Task Status', 'Acknowledgement', 'Priority', 'Created', 'Updated'];
  const casesBase = cases;

  document.head.insertAdjacentHTML('beforeend', '<style id="case-list-sticky-style">'
    + '.case-table-scroll{overflow:auto;max-height:calc(100vh - 250px);min-height:200px}'
    + '.case-table-scroll thead th{position:sticky;top:0;z-index:2;background:#f9fbfd;box-shadow:0 1px 0 var(--line)}'
    + '.case-table-scroll thead th:first-child{z-index:3}'
    + '</style>');

  // Moves the "N Cases" count out of its own row and into the filter row, at the right end.
  function moveCountToFilters(template) {
    const card = template.content.querySelector('.case-table-card');
    const filters = card && card.querySelector(':scope > .filters');
    const head = card && card.querySelector(':scope > .card-head');
    const count = head && head.querySelector('h3');
    if (!filters || !count) return;
    count.style.marginLeft = 'auto';
    count.style.alignSelf = 'center';
    filters.appendChild(count);
    head.remove();
  }

  cases = function () {
    const template = document.createElement('template');
    template.innerHTML = casesBase();
    moveCountToFilters(template);
    const table = template.content.querySelector('.case-table-scroll table');
    if (!table) return template.innerHTML;

    const headers = [...table.querySelectorAll('thead th')];
    const order = ORDER.map(name => headers.findIndex(th => th.textContent.trim().startsWith(name)));
    if (order.some(i => i < 0) || order.length !== headers.length) return template.innerHTML;

    table.querySelectorAll('tr').forEach(tr => {
      const cells = [...tr.children];
      order.forEach(i => tr.appendChild(cells[i]));
    });
    return template.innerHTML;
  };
})();
