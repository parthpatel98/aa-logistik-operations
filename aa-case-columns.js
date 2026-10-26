/* Case list columns in the agreed order: identity and subject, then due date, customer, classification,
   department, status, priority and dates. Reorders the header and every row together, so sorting and
   filtering (which work by column name, not position) are unchanged. Wraps cases() last. */
(function () {
  const ORDER = ['Case No.', 'Subject', 'Due Date', 'Customer', 'Category', 'Case Type', 'Departments', 'Case Status', 'Task Status', 'Acknowledgement', 'Priority', 'Created', 'Updated'];
  const casesBase = cases;

  cases = function () {
    const template = document.createElement('template');
    template.innerHTML = casesBase();
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
