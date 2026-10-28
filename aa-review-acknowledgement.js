/* Review request detail: the request header is a white section. It holds the title with the acknowledgement chip, and the
   details (From, Customer, Received, Reference) as labelled fields.
   - Pending: an amber "Acknowledgement Pending" chip. Clicking it opens the send flow.
   - Sent: a green "Acknowledged" chip. Clicking it opens the acknowledgement that was sent, which also appears in the Email Thread.
   Some requests start with a sent acknowledgement and some are pending, so both states show. Loaded last so it wraps the
   approval screen (edStateOf and edAckDraftOf come from aa-email-detail.js). */
(function () {
  const requestIds = () => QUEUE.map(q => q[0]).filter(id => String(id).startsWith('EML-'));

  // Seed: every other request has had its acknowledgement sent. The sent message is added to the Email Thread.
  requestIds().forEach((id, i) => {
    const s = edStateOf(id);
    s.sent = s.sent || [];
    if (i % 2 !== 0 || s.acked) return;
    const draft = edAckDraftOf(s);
    s.acked = s.e.recv;
    s.sent.push({ time: s.e.recv, subj: draft.subj, body: draft.body });
  });

  const chip = (id, s) => s.acked
    ? `<button type="button" onclick="edAckOpen('${id}')" title="Acknowledgement sent ${editorText(s.acked)}" style="border:1px solid #b9e1ca;background:#e9f8ef;color:#188756;border-radius:999px;padding:3px 10px;font:inherit;font-size:12px;font-weight:700;cursor:pointer">Acknowledged</button>`
    : `<button type="button" onclick="edAckOpen('${id}')" title="Send the acknowledgement to the customer" style="border:1px solid #f1dfb0;background:#fff4d6;color:#8a5a00;border-radius:999px;padding:3px 10px;font:inherit;font-size:12px;font-weight:700;cursor:pointer">Acknowledgement Pending</button>`;

  const approvalBase = approval;
  approval = function () {
    const html = approvalBase();
    const id = S.reviewEmailId;
    if (!id || !String(id).startsWith('EML-') || !QUEUE.some(q => q[0] === id)) return html;
    const s = edStateOf(id);
    const template = document.createElement('template');
    template.innerHTML = html;
    const root = template.content.querySelector('.review-page');
    if (!root) return html;
    // The thread header keeps no acknowledgement button; the heading carries the chip.
    template.content.querySelectorAll('.ack-header-state').forEach(b => b.remove());

    const heading = root.querySelector('h1');
    const details = [...root.querySelectorAll('div')].find(d => d.querySelector('b') && /^From\s/.test(d.textContent.trim()));
    if (heading) {
      const holder = document.createElement('span');
      holder.innerHTML = chip(id, s);
      heading.parentElement.appendChild(holder.firstElementChild);
    }
    if (heading && details) {
      // One white section for the title row and the details.
      const headRow = heading.parentElement;
      const section = document.createElement('section');
      section.setAttribute('style', 'background:#fff;border:1px solid var(--line);border-radius:7px;padding:14px 17px;display:grid;gap:10px');
      // The section goes under the top row (Back link and Previous / Next), so it spans the full width of the page.
      root.firstElementChild.after(section);
      section.appendChild(headRow);
      section.appendChild(details);

      // The details line under the title is split into labelled fields instead of one run of dot-separated text.
      const parts = details.textContent.trim().split(/\s*·\s*/);
      const fields = [
        ['From', parts[0].replace(/^From\s*/, '')],
        ['Customer', parts[1]],
        ['Received', (parts[2] || '').replace(/^Received\s*/, '')],
        ['Reference', parts[3]],
        ['Status', edStateOf(id).status || 'Pending'],
      ].filter(([, value]) => value);
      details.outerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,max-content));gap:8px 32px">`
        + fields.map(([label, value]) => `<div style="display:grid;gap:2px"><span style="font-size:12px;font-weight:600;color:var(--muted)">${label}</span><strong style="font-size:13px;color:#14233a;font-weight:650">${editorText(value)}</strong></div>`).join('')
        + '</div>';
    }
    return template.innerHTML;
  };
})();
