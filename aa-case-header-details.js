/* Case header: the details are a full-width row of labelled fields under the case title (Received, Due, Department, Status,
   Priority). Status and Priority are shown as coloured tags in their fields, and the separate pills that repeated them are
   removed, so each value appears once. The same approach as the review request header. Loaded last so it wraps caseView. */
(function () {
  const tag = (value, colors) => `<span style="display:inline-flex;align-items:center;padding:3px 9px;border-radius:999px;font-size:12px;font-weight:700;font-family:Inter,"Segoe UI",Arial,sans-serif;${colors}">${editorText(value)}</span>`;
  const STATUS_COLORS = 'background:#e9f8ef;color:#188756';
  const PRIORITY_COLORS = 'background:#e6f0fb;color:#0871c7';

  const caseViewBase = caseView;
  caseView = function () {
    const html = caseViewBase();
    const c = selectedCaseData();
    const template = document.createElement('template');
    template.innerHTML = html;
    const head = template.content.querySelector('.case-v2-head');
    const title = head && head.querySelector('.case-v2-title');
    const sub = title && title.querySelector('.sub');
    if (!sub || !/Received/.test(sub.textContent)) return html;

    const parts = sub.textContent.split(/\s*·\s*/).map(part => part.trim());
    const order = S.opterOrders && S.opterOrders[c.id];
    const fields = [
      ['Received', editorText((parts[0] || '').replace(/^Received\s*/, ''))],
      ['Due', editorText((parts[1] || '').replace(/^Due\s*/, ''))],
      ['Department', editorText(parts[2] || c.departments)],
      ['Category', editorText(c.classification || '—')],
      ['Case Type', editorText(c.caseClass || '—')],
      ['Status', tag(c.status, STATUS_COLORS)],
      ['Priority', tag(c.priority, PRIORITY_COLORS)],
      ['Opter Order', !isTransportCase(c) ? '' : order ?`<span style="font-size:13px;color:#14233a;font-weight:650">${editorText(order.id)}</span>` : '<span style="color:var(--muted);font-weight:500">Not created</span>'],
    ].filter(([, value]) => value);

    // The title and the details are separate lines. The details take the full width of the card.
    sub.remove();
    // Status, Priority and the Opter chip now show as fields, so their pills leave the title row.
    head.querySelectorAll('.pill').forEach(p => {
      const text = p.textContent.trim();
      if (text === c.status || text === `${c.priority} Priority` || /^Opter OPT-/.test(text)) p.remove();
    });
    const row = document.createElement('div');
    // One row, spread across the card. Labels and values use the same sizes as the Case Information card.
    row.setAttribute('style', `display:grid;grid-template-columns:repeat(${fields.length},auto);justify-content:space-between;gap:10px 20px;padding:0 20px 18px;font-family:Inter,"Segoe UI",Arial,sans-serif`);
    row.innerHTML = fields.map(([label, value]) => `<div style="display:grid;gap:4px;align-content:start;white-space:nowrap"><span style="font-size:12px;color:var(--muted)">${label}</span><div style="font-size:14px;font-weight:600;color:var(--ink)">${value.startsWith('<span') ? value : editorText(value)}</div></div>`).join('');
    title.after(row);
    return template.innerHTML;
  };
})();
