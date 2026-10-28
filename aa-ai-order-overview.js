/* Order tab for a Case that is not a Transport order (Cases from the email review with orderKind 'Non-transport', or an
   older Case whose category is only packing, storage or warehouse).
   These orders have no pickup, delivery, goods or price data that Opter needs, so the Order tab shows only:
     1. Customer           the same Customer section as a transport order
     2. AI Order Overview  the AI text: a summary paragraph, a blank line, then one "Detail: Information" line per fact
     3. Additional Details key / value rows the user adds by hand (c.addDetails), edited in place
   Both are kept as plain data on the Case, never HTML: the overview as text (c.aiOrder = { text, original }), the
   additional details as rows ({ label, value }). For the overview, the view splits the text: the first paragraph is the summary and each "Detail: Information" line (split at the first
   colon) becomes a cell pair, filled down the left pair of columns and then the right. A line without a colon is
   shown as plain text under the table. Values are escaped when the page is built. Edit swaps the section for one big
   text box; Update saves it. `original` is the AI text as first generated and is never edited, so "Reset to AI version"
   can restore it. The text is generated from the Case record here; a real AI response in the same layout replaces
   seedText. Loaded after aa-order-form.js (orderTabV2) and aa-email-detail.js (Case records). */
(function () {
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  // Cases made from the email review carry orderKind. Older sample Cases do not, so those are judged by their category:
  // packing, storage and warehouse work is non-transport; anything with a transport word (incl. customs/freight) is not.
  const isNonTransport = c => !!c && (c.orderKind ? c.orderKind === 'Non-transport'
    : /packing|storage|warehouse/i.test(c.classification || c.category || '') && !/transport|export|import|freight|customs|pickup|delivery/i.test(c.classification || c.category || ''));

  const STYLE = `
    .ao-pill{display:inline-flex;align-items:center;height:22px;padding:0 9px;border-radius:5px;font:700 11.5px Inter,sans-serif;white-space:nowrap}
    .ao-pill.ai{background:#eef0ff;color:#4b3fc4}.ao-pill.review{background:#fff3d6;color:#8a5a00;border:1px solid #f0d78c}.ao-pill.done{background:#e9f8ef;color:#188756;border:1px solid #bfe6cf}
    .ao-head-tools{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .ao-summary{display:flex;gap:12px;margin:0 0 14px;padding:14px 16px;background:#f2f7fd;border:1px solid #d9e7f6;border-radius:7px}
    .ao-summary-icon{flex:none;color:#4b3fc4;font-size:18px;line-height:1.2}
    .ao-summary b{display:block;margin-bottom:3px;font-size:13.5px;color:var(--ink)}
    .ao-summary p{margin:0;font-size:13px;line-height:1.5;color:#2c3a4e;white-space:pre-wrap}
    .ao-table{width:100%;table-layout:fixed;border-collapse:collapse;border:1px solid #e3e9f0;border-radius:6px;font-size:13px}
    .ao-table th{background:#f6f8fb;text-align:left;font:700 11.5px Inter,sans-serif;color:#4a5668;padding:9px 12px;border-bottom:1px solid #e3e9f0}
    .ao-table td{padding:8px 12px;border-bottom:1px solid #eef2f6;vertical-align:top;color:var(--ink);overflow-wrap:anywhere}
    .ao-table tr:last-child td{border-bottom:0}
    .ao-table td.ao-detail{font-weight:700;width:17%}
    .ao-table th:nth-child(2),.ao-table th:nth-child(4),.ao-table td:nth-child(2),.ao-table td:nth-child(4){width:33%}
    .ao-table .ao-right{border-left:1px solid #e3e9f0}
    .ao-notes p{margin:8px 0 0;font-size:13px;color:#2c3a4e}
    .ao-text{width:100%;min-height:240px;box-sizing:border-box;border:1px solid var(--line);border-radius:6px;padding:12px 14px;font:13px/1.6 Inter,sans-serif;color:var(--ink);resize:vertical;background:#fff}
    .ao-empty{padding:14px;color:var(--muted);font-size:13px;text-align:center}
    .ao-foot{display:flex;align-items:center;gap:8px;margin-top:12px;flex-wrap:wrap}
    .ao-note{margin-left:auto;font-size:12px;color:var(--muted)}
    .ao-kv{grid-template-columns:minmax(105px,.8fr) 1.2fr 24px;align-items:center}.ao-key{background:transparent}
    .ao-x{border:0;background:none;color:#8a96a8;font-size:18px;line-height:1;cursor:pointer;padding:0}.ao-x:hover{color:#c51f2d}
    .ao-link{border:0;background:none;color:#0871c7;font:650 12.5px Inter,sans-serif;cursor:pointer;padding:0}`;
  if (!document.getElementById('ai-order-overview-style')) document.head.insertAdjacentHTML('beforeend', `<style id="ai-order-overview-style">${STYLE}</style>`);

  // Text built from what the Case already holds (stands in for the AI response): a short plain-language summary of what
  // the customer is asking for and when, then one "Detail: Information" line per fact. Parts that are not known are left
  // out, so a Case with less data gets a shorter summary. The wording is not fixed; an AI response can say more.
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const ordinal = n => n + (n % 100 >= 11 && n % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th'));
  const niceDate = s => { const m = /(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(s || ''); return m ? `${ordinal(+m[1])} ${MONTHS[+m[2] - 1] || ''} ${m[3]}`.replace('  ', ' ') : ''; };
  const clock = (h, mi) => { const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return !mi || mi === '00' ? `${h} ${ap}` : `${h}:${mi} ${ap}`; };
  function timeOf(c) {
    const body = /\bby\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i.exec(c.body || '');
    if (body) return clock((+body[1] % 12) + (/pm/i.test(body[3]) ? 12 : 0), body[2]);
    const m = /(\d{1,2}):(\d{2})/.exec([c.requestedDate, c.due, c.pfromAt].find(x => /\d{1,2}:\d{2}/.test(x || '')) || '');
    return m ? clock(+m[1], m[2]) : '';
  }
  function itemsOf(c) {
    const m = /(\d+)\s*(items|pieces|pcs|units|pallets|crates|boxes|colli|packages)\b/i.exec(c.pk || c.packages || c.body || '');
    return m ? `${m[1]} ${m[2].toLowerCase()}` : '';
  }
  function seedText(c) {
    const cust = c.customer || 'The customer', cat = String(c.category || c.classification || '');
    const goods = c.goods || '', items = itemsOf(c), date = niceDate(c.requestedDate || c.due), time = timeOf(c);
    const what = goods ? (items ? `${goods} (${items})` : goods) : (items || 'goods');
    const when = date ? date + (time ? ' by ' + time : '') : '';
    const sentences = [];
    if (/storage|warehouse/i.test(cat)) {
      sentences.push(`${cust} is requesting storage of ${what} in the AA Logistik warehouse.`);
      if (when) sentences.push(`The goods will be sent to us on ${when}.`);
    } else if (/packing/i.test(cat)) {
      sentences.push(`${cust} is requesting packing of ${what}.`);
      if (when) sentences.push(`The packing is needed by ${when}.`);
    } else {
      sentences.push(`${cust} is requesting ${cat ? cat.toLowerCase() : 'a service'}${goods ? ' for ' + what : ''}.`);
      if (when) sentences.push(`Requested date: ${when}.`);
    }
    sentences.push('The details of the order are as displayed below:');
    const lines = [];
    const add = (detail, info) => { if (info && String(info).trim()) lines.push(`${detail}: ${String(info).trim()}`); };
    add('Proposed Categories', c.category || c.classification);
    add('Departments', c.departments);
    add('Goods', goods);
    add('Quantity', items);
    add('Weight', c.weight);
    add(/storage|warehouse/i.test(cat) ? 'Goods Arrival' : 'Requested Date', when);
    add('Service', c.service);
    add('Special Handling', c.handling || c.temp);
    add('References', [c.cref, c.po].filter(Boolean).join(', '));
    return sentences.join(' ') + '\n\n' + lines.join('\n');
  }
  function overviewFor(c) {
    if (!c.aiOrder || typeof c.aiOrder.text !== 'string') { const text = seedText(c); c.aiOrder = { text, original: text }; }
    if (!Array.isArray(c.addDetails)) c.addDetails = [];
    return c.aiOrder;
  }

  const KV = /^\s*([^:\n]{1,60}?)\s*:\s*(.*\S)\s*$/;
  // text -> { summary, pairs: [[detail, info]], notes: [lines without a colon] }. withSummary: the first paragraph is the summary.
  function parse(text, withSummary) {
    const blocks = String(text || '').replace(/\r/g, '').split(/\n\s*\n/).map(b => b.split('\n').filter(l => l.trim())).filter(b => b.length);
    let summary = '';
    if (withSummary && blocks.length && !(blocks.length === 1 && blocks[0].every(l => KV.test(l)))) summary = blocks.shift().join(' ');
    const pairs = [], notes = [];
    blocks.flat().forEach(l => { const m = KV.exec(l); if (m) pairs.push([m[1], m[2]]); else notes.push(l.trim()); });
    return { summary, pairs, notes };
  }
  // Pairs shown in two groups side by side: the left group is filled first, then the right.
  function pairsTable(pairs) {
    if (!pairs.length) return '';
    const half = Math.ceil(pairs.length / 2), rows = [];
    for (let i = 0; i < half; i++) {
      const l = pairs[i], r = pairs[half + i];
      rows.push(`<tr><td class="ao-detail">${esc(l[0])}</td><td>${esc(l[1])}</td>${r ? `<td class="ao-detail ao-right">${esc(r[0])}</td><td>${esc(r[1])}</td>` : '<td class="ao-right"></td><td></td>'}</tr>`);
    }
    return `<table class="ao-table"><thead><tr><th>Detail</th><th>Information</th><th class="ao-right">Detail</th><th>Information</th></tr></thead><tbody>${rows.join('')}</tbody></table>`;
  }
  const notesHtml = notes => notes.length ? `<div class="ao-notes">${notes.map(n => `<p>${esc(n)}</p>`).join('')}</div>` : '';

  S.aiDraft = S.aiDraft || null;
  const draftOf = (c, which) => (S.aiDraft && S.aiDraft.caseId === c.id && S.aiDraft.which === which ? S.aiDraft : null);
  const stamp = () => { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`; };
  const HINT = 'One detail per line, written as "Detail: Information".';
  const editTools = () => '<button type="button" class="btn" onclick="aoEdit()">Edit</button>';
  const saveTools = '<button type="button" class="btn" onclick="aoCancel()">Cancel</button><button type="button" class="btn primary" onclick="aoSave()">Update</button>';

  function overviewCard(c) {
    const o = overviewFor(c), d = draftOf(c, 'ov'), editing = !!d;
    let body;
    if (editing) {
      body = `<textarea class="ao-text" aria-label="AI order overview" oninput="aoText(this.value)">${esc(d.text)}</textarea><div class="ao-foot"><span class="ao-note" style="margin-left:0">Start with the summary, leave a blank line, then add details. ${HINT}</span><button type="button" class="ao-link" style="margin-left:auto" onclick="aoReset()">Reset to AI version</button></div>`;
    } else {
      const v = parse(o.text, true);
      body = `<div class="ao-summary"><span class="ao-summary-icon">✦</span><div><b>AI Summary</b>${v.summary ? `<p>${esc(v.summary)}</p>` : '<p style="color:var(--muted)">No summary.</p>'}</div></div>${pairsTable(v.pairs) || (v.notes.length ? '' : '<div class="ao-empty">No details were extracted. Use Edit to add them.</div>')}${notesHtml(v.notes)}<div class="ao-foot">${o.editedAt ? `<span class="ao-note">Edited by ${esc(o.editedBy)} · ${esc(o.editedAt)}</span>` : ''}</div>`;
    }
    return `<section class="order-card full"><div class="order-card-head"><h3>2. AI Order Overview</h3><div class="actions ao-head-tools"><span class="ao-pill ai">✦ AI Structured Summary</span>${editing ? saveTools : editTools()}</div></div><div class="order-card-body">${body}</div></section>`;
  }

  // Additional Details: key / value rows laid out like the fields in the other Order sections, edited in place.
  function additionalCard(c) {
    overviewFor(c);
    const rows = c.addDetails.map((r, i) => `<div class="order-line ao-kv"><input class="order-inline-input ao-key" type="text" aria-label="Detail name" value="${esc(r.label)}" placeholder="Detail name" onchange="aoKV(${i},'label',this.value)"><div class="order-inline-control"><input class="order-inline-input" type="text" aria-label="Value" value="${esc(r.value)}" placeholder="Value" onchange="aoKV(${i},'value',this.value)"></div><button type="button" class="ao-x" aria-label="Remove detail" onclick="aoKVDel(${i})">×</button></div>`).join('');
    const body = (rows ? `<div class="order-data-grid">${rows}</div>` : '<div class="ao-empty">No additional details.</div>') + '<div class="ao-foot"><button type="button" class="btn" onclick="aoKVAdd()">+ Add detail</button></div>';
    return `<section class="order-card full"><div class="order-card-head"><h3>3. Additional Details</h3><div class="actions"></div></div><div class="order-card-body">${body}</div></section>`;
  }

  window.aoEdit = () => { const c = selectedCaseData(), o = overviewFor(c); S.aiDraft = { caseId: c.id, which: 'ov', text: o.text }; render(); };
  window.aoKVAdd = () => { const c = selectedCaseData(); overviewFor(c); c.addDetails.push({ label: '', value: '' }); render(); };
  window.aoKV = (i, key, v) => { const r = selectedCaseData().addDetails[i]; if (r) r[key] = v.trim(); };
  window.aoKVDel = i => { selectedCaseData().addDetails.splice(i, 1); render(); };
  window.aoCancel = () => { S.aiDraft = null; render(); };
  window.aoText = v => { if (S.aiDraft) S.aiDraft.text = v; };
  window.aoReset = () => { const c = selectedCaseData(), o = overviewFor(c); if (S.aiDraft) { S.aiDraft.text = o.original; render(); } };
  window.aoSave = () => {
    const c = selectedCaseData(), o = overviewFor(c), d = S.aiDraft;
    if (!d || d.caseId !== c.id) return;
    const text = d.text.replace(/s+$/, ''), changed = text !== o.text.replace(/s+$/, '');
    o.text = text;
    if (changed) {
      const by = typeof actorName === 'function' ? actorName() : 'User', at = stamp();
      o.editedBy = by; o.editedAt = at;
      S.activities.unshift([`${c.id} AI order overview edited`, by, at]);
    }
    S.aiDraft = null; render(); toast(changed ? 'Saved' : 'No changes to save');
  };

  const baseOrderTab = orderTabV2;
  orderTabV2 = function () {
    const c = selectedCaseData();
    const html = baseOrderTab();
    if (!isNonTransport(c)) return html;
    try {
      const tpl = document.createElement('template');
      tpl.innerHTML = html;
      const grid = tpl.content.querySelector('.order-grid');
      const customer = grid && [...grid.children].find(el => /^\s*\d*\.?\s*Customer\s*$/.test((el.querySelector('h3') || {}).textContent || ''));
      if (!customer) return html;
      const holder = document.createElement('div');
      holder.innerHTML = overviewCard(c) + additionalCard(c);
      grid.replaceChildren(customer, ...holder.children);
      return tpl.innerHTML;
    } catch (e) {
      console.warn('AI order overview fell back to the base Order tab:', e);
      return html;
    }
  };
})();
