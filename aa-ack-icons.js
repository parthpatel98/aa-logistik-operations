/* Send-acknowledgement icon (✉) on the Cases list, next to the Acknowledgement column's "Not Sent" pill.
   Clicking it opens the acknowledgement for that Case, as the Review Requests table does. The case header's
   "Acknowledgement Pending" pill already opens the same dialog on click, so it gets no separate icon.
   Wraps cases() last. */
(function () {
  const ICON = '✉';
  const casesBase = cases;

  cases = function () {
    const template = document.createElement('template');
    template.innerHTML = casesBase();
    const table = template.content.querySelector('.case-table-scroll table');
    if (!table) return template.innerHTML;

    const column = [...table.querySelectorAll('thead th')].findIndex(th => th.textContent.trim().startsWith('Acknowledgement'));
    if (column < 0) return template.innerHTML;

    table.querySelectorAll('tbody tr').forEach(tr => {
      const cell = tr.children[column];
      const caseId = tr.querySelector('.case-link')?.textContent.trim();
      if (!cell || !caseId || !/Not Sent/.test(cell.textContent)) return;
      // Same markup as the Review Requests table's acknowledgement cell: a compact state pill, then a
      // 26px blue-outlined mail button. The generic .btn / .icon-btn classes are not used because their
      // padding and height made the button larger than the pill beside it.
      const statePill = cell.innerHTML;
      cell.style.whiteSpace = 'nowrap';
      cell.innerHTML = `<div style="display:inline-flex;align-items:center;gap:6px">${statePill}<button type="button" onclick="event.stopPropagation();openAcknowledgement('${caseId}')" title="Send acknowledgement email" aria-label="Send acknowledgement email" style="padding:0;width:26px;height:24px;border-radius:4px;border:1px solid #0877d1;color:#0871c7;background:#fff;display:inline-flex;align-items:center;justify-content:center;cursor:pointer">${ICON}</button></div>`;
    });
    return template.innerHTML;
  };
})();
