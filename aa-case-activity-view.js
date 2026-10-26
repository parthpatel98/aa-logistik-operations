/* Case Activity tab, redesigned: a single panel with search, activity-type and user filters, a date range,
   category chips with counts, and a timeline grouped by day. Each row has a time, a simple icon on a
   thread line, the title and detail, a category tag, an optional change, and the person who did it.
   Only the Case Activity panel is changed; the rest of the Case view is untouched. Events still come from
   caseAuditEvents(c), so live activity and the seeded history both appear. Loaded last. */
(function () {
  const CATEGORIES = ['All', 'Communication', 'Case Edits', 'AI & Summary', 'Opter Data'];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const ICON = {
    check: '<path d="M5 12.5l4.2 4.2L19 7"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5"/>',
    calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    message: '<path d="M5 6h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4.5 3v-3H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/>',
    cpu: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    plus: '<circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/>',
    file: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M9.5 13h6M9.5 17h6"/>',
    box: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
    dot: '<circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/>',
  };

  // Category comes from the title: Opter and order data first, then AI and summaries, then communication,
  // and anything else is a case edit. Task events are not in this list at all.
  function categoryOf(e) {
    const t = e.title || '';
    if (/opter|order/i.test(t)) return 'Opter Data';
    if (/summary|\bAI\b|classif|extract|proposed/i.test(t)) return 'AI & Summary';
    if (/email|acknowledg|comment|note|customer|reply|message/i.test(t)) return 'Communication';
    return 'Case Edits';
  }

  // Icon and tone come from the title, so the same kind of event always looks the same.
  function iconOf(e) {
    const t = e.title || '';
    if (/opter|order/i.test(t)) return { svg: ICON.box, tone: '' };
    if (/summary/i.test(t)) return { svg: ICON.file, tone: '' };
    if (/completed/i.test(t)) return { svg: ICON.check, tone: 'done' };
    if (/due date/i.test(t)) return { svg: ICON.calendar, tone: 'alert' };
    if (/reassigned|assigned/i.test(t)) return { svg: ICON.user, tone: '' };
    if (/status/i.test(t)) return { svg: ICON.clock, tone: '' };
    if (/comment/i.test(t)) return { svg: ICON.message, tone: '' };
    if (/acknowledg|email|sent|customer|reply/i.test(t)) return { svg: ICON.mail, tone: '' };
    if (/\bAI\b|classif/i.test(t)) return { svg: ICON.cpu, tone: '' };
    if (/approved/i.test(t)) return { svg: ICON.shield, tone: 'done' };
    if (/created/i.test(t)) return { svg: ICON.plus, tone: '' };
    if (/data|confirmed|extracted|reviewed/i.test(t)) return { svg: ICON.file, tone: '' };
    return { svg: ICON.dot, tone: '' };
  }

  const initials = name => String(name || '?').split(' · ')[0].split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase();
  const dayLabel = value => {
    const m = /^(\d{1,2})\/(\d{2})\/(\d{4})/.exec(String(value || ''));
    return m ? `${String(+m[1]).padStart(2, '0')} ${MONTHS[+m[2] - 1]} ${m[3]}` : String(value || '');
  };
  const inRange = (value, from, to) => {
    if (!from && !to) return true;
    const d = dateValue(value);
    if (from) { const [y, m, dd] = from.split('-').map(Number); if (d < new Date(y, m - 1, dd).getTime()) return false; }
    if (to) { const [y, m, dd] = to.split('-').map(Number); if (d >= new Date(y, m - 1, dd + 1).getTime()) return false; }
    return true;
  };

  const CSS = `<style>
    .activity-layout { display: block }
    .cact-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 16px }
    .cact-controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center }
    .cact-controls input, .cact-controls select { height: 34px; border: 1px solid #d5dee8; border-radius: 6px; padding: 0 10px; font: inherit; font-size: 13px; background: #fff; color: var(--ink) }
    .cact-controls input[type="search"] { min-width: 200px }
    .cact-range { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--muted) }
    .cact-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 16px; border-bottom: 1px solid var(--line) }
    .cact-chips button { border: 1px solid #d5dee8; background: #fff; border-radius: 999px; padding: 5px 12px; font: inherit; font-size: 12.5px; color: #425169; cursor: pointer }
    .cact-chips button.active { background: #eaf3fc; border-color: #9fc2e3; color: #0b5aa0; font-weight: 650 }
    .cact-date { padding: 14px 16px 4px; font-size: 13px; font-weight: 700; color: var(--ink) }
    .cact-colhead { display: grid; grid-template-columns: 56px 30px minmax(0, 1fr) 150px 170px 170px; gap: 12px; padding: 8px 16px; border-bottom: 1px solid var(--line); font-size: 12px; font-weight: 650; color: var(--muted) }
    .cact-row { position: relative; display: grid; grid-template-columns: 56px 30px minmax(0, 1fr) 150px 170px 170px; align-items: center; gap: 12px; padding: 10px 16px; border-bottom: 1px solid #eef2f6 }
    .cact-none { color: var(--muted) }
    .cact-row:last-child { border-bottom: 0 }
    .cact-time { font-size: 12.5px; color: var(--muted); font-variant-numeric: tabular-nums }
    .cact-track { position: relative; display: flex; justify-content: center }
    .cact-track::after { content: ''; position: absolute; top: 30px; bottom: -11px; width: 1px; background: #e1e8ef }
    .cact-row:last-child .cact-track::after { display: none }
    .cact-icon { position: relative; z-index: 1; width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; border: 1px solid #d5dee8; color: #425169; background: #fff }
    .cact-icon svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round }
    .cact-icon.done { color: #188756; border-color: #b9e0c9; background: #f1fbf5 }
    .cact-icon.alert { color: #a8710a; border-color: #efd9a6; background: #fff9ec }
    .cact-main { min-width: 0 }
    .cact-main strong { display: block; font-size: 13.5px; color: var(--ink) }
    .cact-main p { margin: 2px 0 0; font-size: 12.5px; color: #5b6b7d; overflow-wrap: anywhere }
    .cact-main .cact-note { display: block; margin-top: 3px; font-size: 12px; color: var(--muted) }
    .cact-meta { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end }
    .cact-chip { font-size: 11.5px; border: 1px solid #d5dee8; border-radius: 4px; padding: 2px 7px; color: #425169; background: #fff; white-space: nowrap }
    .cact-change { display: inline-block; max-width: 100%; font-size: 11.5px; background: #f1f4f8; border-radius: 4px; padding: 2px 7px; color: #2c3e52; overflow-wrap: anywhere; white-space: normal }
    .cact-actor { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 13px; font-weight: 600; color: var(--ink) }
    .cact-actor span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
    .cact-avatar { flex: 0 0 auto; width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; background: #e4ecf4; color: #2c3e52; font-size: 11px; font-weight: 700 }
    .cact-empty { padding: 28px 16px; color: var(--muted); font-size: 13px }
    @media (max-width: 900px) {
      .cact-colhead { display: none }
      .cact-row { grid-template-columns: 44px 26px minmax(0, 1fr) }
      .cact-type, .cact-changes, .cact-actor { grid-column: 3; justify-content: flex-start }
    }
  </style>`;
  document.head.insertAdjacentHTML('beforeend', CSS);

  function row(e, last) {
    const { svg, tone } = iconOf(e);
    const change = e.change ? `<span class="cact-change">${editorText(e.change)}</span>` : '';
    return `<div class="cact-row">
      <span class="cact-time">${editorText(e.time)}</span>
      <span class="cact-track"><span class="cact-icon ${tone}"><svg viewBox="0 0 24 24" aria-hidden="true">${svg}</svg></span></span>
      <div class="cact-main"><strong>${editorText(e.title)}</strong><p>${editorText(e.detail)}</p>${e.comment ? `<span class="cact-note">${editorText(e.comment)}</span>` : ''}</div>
      <span class="cact-type"><span class="cact-chip">${editorText(categoryOf(e))}</span></span>
      <span class="cact-changes">${change || '<span class="cact-none">—</span>'}</span>
      <div class="cact-actor"><span class="cact-avatar">${editorText(initials(e.person))}</span><span>${editorText(String(e.person || '').split(' · ')[0])}</span></div>
    </div>`;
  }

  // --- Case activity sources -------------------------------------------------------------------
  // Task events are tracked on each Task, so they are left out here. A Case's activity is its emails and
  // acknowledgements, its internal notes, its seeded history, and the edits, AI summaries, Opter and
  // order-data actions logged below.
  const splitStamp = value => {
    const parts = String(value || '').split(',');
    return { date: parts[0].trim(), time: parts.slice(1).join(',').trim() };
  };
  const nowStamp = () => {
    const n = new Date(), p = v => String(v).padStart(2, '0');
    return { date: `${p(n.getDate())}/${p(n.getMonth() + 1)}/${n.getFullYear()}`, time: `${p(n.getHours())}:${p(n.getMinutes())}` };
  };
  const stampValue = e => dateValue(/:\d{2}$/.test(e.time) ? `${e.date}, ${e.time}` : e.date);

  window.logCaseActivity = function (caseId, title, detail, person, change) {
    S.caseLog = S.caseLog || [];
    S.caseLog.unshift({ caseId, ...nowStamp(), title, detail, person: person || actorName(), change: change || '' });
  };

  function caseActivityEvents(c) {
    const comms = S.communications.filter(m => m.caseId === c.id);
    const notes = S.notes.filter(n => n.caseId === c.id);
    const comm = comms.map(m => ({ ...splitStamp(m.at), title: m.direction === 'Incoming' ? 'Customer email received' : /acknowledg|received your request/i.test(m.subject || '') ? 'Acknowledgement sent' : 'Email sent to customer', detail: m.subject || '', person: m.author || 'System', change: /acknowledg|received your request/i.test(m.subject || '') ? 'Not sent → Sent' : '' }));
    const noteRows = notes.map(n => ({ ...splitStamp(n.at), title: 'Internal note added', detail: n.text || '', person: n.author || 'System' }));
    // The seeded history's own email and comment lines are dropped once real ones exist for this Case.
    const hasRealRows = comm.length || noteRows.length;
    const seeded = liveCaseAuditEventsBase(c).filter(e => !/task/i.test(e.title) && !(hasRealRows && /email received|update sent|acknowledg|comment/i.test(e.title)));
    const logged = (S.caseLog || []).filter(e => e.caseId === c.id);
    const seen = new Set();
    return [...logged, ...comm, ...noteRows, ...seeded]
      .filter(e => !/task/i.test(e.title || ''))
      .filter(e => { const key = [e.title, e.date, e.time, e.person].join('|'); if (seen.has(key)) return false; seen.add(key); return true })
      .sort((a, b) => stampValue(b) - stampValue(a));
  }

  // Actions that don't record their Case in the activity log are logged here. Each wrapper only logs when
  // the action is allowed, then hands over to the original so its behaviour does not change.
  // Each wrapper records the value before and after where the action changes one, shown in the Changes column.
  // The base action runs first, so the log only records what actually happened.
  const regenerateBase = regenerateAiSummary;
  regenerateAiSummary = function (caseId) {
    const before = S.aiSummaryGenerated && S.aiSummaryGenerated[caseId];
    regenerateBase(caseId);
    const after = S.aiSummaryGenerated && S.aiSummaryGenerated[caseId];
    logCaseActivity(caseId, 'AI summary regenerated', 'Case summary refreshed from the latest details', actorName(), `${before || 'Not generated'} → ${after}`);
    render();
  };

  // The order fields as shown on the Order tab (label → value). Read when the order is created and before each
  // update, so an update can show which fields changed since the last time they were sent to Opter.
  // A field's value is the input on the Order tab when there is one, otherwise the text in the row.
  const rowValue = r => {
    const input = r.querySelector('input, textarea, select');
    if (!input) return r.querySelector(':scope > strong')?.textContent.trim();
    const value = input.value?.trim();
    return input.type === 'datetime-local' ? orderInlineDisplayDate(value) : value;
  };
  // Keyed by position as well as label, since several sections have a field with the same name (e.g. Location).
  const orderSnapshot = () => {
    const out = {};
    document.querySelectorAll('.order-line,.order-metric').forEach((r, i) => {
      const label = r.querySelector(':scope > span')?.textContent.trim(), value = rowValue(r);
      if (label && value !== undefined) out[`${i}|${label}`] = value;
    });
    return Object.keys(out).length ? out : null;
  };
  const storeSnapshot = (caseId, snap) => { if (snap) S.opterSnapshot = { ...(S.opterSnapshot || {}), [caseId]: snap } };

  const createOpterBase = createOpterOrder;
  createOpterOrder = function (caseId) {
    const allowed = can('createOpterOrders');
    createOpterBase(caseId);
    const order = S.opterOrders[caseId];
    if (allowed && order) {
      storeSnapshot(caseId, orderSnapshot());
      logCaseActivity(caseId, 'Opter order created', `Order ${order.id} created in Opter`, actorName(), `Not created → ${order.id}`);
      render();
    }
  };

  const updateOpterBase = updateOpterOrder;
  updateOpterOrder = function (caseId) {
    const before = S.opterOrders[caseId];
    const allowed = before && can('updateOpterOrders');
    const wasPending = before && before.needsUpdate;
    const now = orderSnapshot(), prev = (S.opterSnapshot || {})[caseId];
    updateOpterBase(caseId);
    if (allowed) {
      const diffs = prev && now ? Object.keys(now).filter(k => k in prev && prev[k] !== now[k]).map(k => `${k.split('|')[1]}: ${prev[k]} → ${now[k]}`) : [];
      const change = diffs.length ? diffs.join('; ') : (wasPending ? 'Needs update → Up to date' : '');
      storeSnapshot(caseId, now);
      logCaseActivity(caseId, 'Opter order updated', `Order ${before.id} updated in Opter`, actorName(), change);
      render();
    }
  };

  // The value currently shown on the Order tab for a field (the Order tab is where these actions happen).
  const shownOrderValue = label => {
    const row = [...document.querySelectorAll('.order-line,.order-metric')].find(r => r.querySelector(':scope > span')?.textContent.trim() === label);
    return (row && rowValue(row)) || '—';
  };

  const confirmOrderBase = confirmOrderChange;
  confirmOrderChange = function (caseId, label) {
    const item = (S.orderChangeRequests[caseId] || []).find(x => x.label === label);
    const before = item ? shownOrderValue(label) : null;
    confirmOrderBase(caseId, label);
    if (item) {
      logCaseActivity(caseId, 'Order data updated from customer request', label, actorName(), `${before} → ${item.value}`);
      render();
    }
  };

  const rejectOrderBase = rejectOrderChange;
  rejectOrderChange = function (caseId, label) {
    const item = (S.orderChangeRequests[caseId] || []).find(x => x.label === label);
    const current = item ? shownOrderValue(label) : null;
    rejectOrderBase(caseId, label);
    if (item) {
      logCaseActivity(caseId, 'Order change request rejected', `Requested ${label.toLowerCase()} not applied`, actorName(), `${current} → unchanged`);
      render();
    }
  };

  const CASE_FIELDS = [['customer', 'Customer'], ['caseClass', 'Case Type'], ['departments', 'Departments'], ['priority', 'Priority'], ['due', 'Due date'], ['status', 'Status']];
  const saveEditorBase = saveEditor;
  saveEditor = function () {
    const type = S.editorType, id = S.editorId, before = (type === 'case' || type === 'caseAction') && CASE_DETAILS[id] ? { ...CASE_DETAILS[id] } : null;
    saveEditorBase();
    if (!before || !CASE_DETAILS[id]) return;
    const after = CASE_DETAILS[id];
    const changed = CASE_FIELDS.filter(([key]) => String(before[key] ?? '') !== String(after[key] ?? ''));
    changed.forEach(([key, label]) => logCaseActivity(id, 'Case details edited', `${label} changed`, actorName(), `${before[key] || '—'} → ${after[key] || '—'}`));
    if (changed.length) render();
  };

  activityTabV2 = function () {
    const c = selectedCaseData(), all = caseActivityEvents(c);
    const q = String(S.caseActivityQuery || '').trim().toLowerCase();
    const group = S.caseActivityGroup || 'All';
    const user = S.caseActivityUser || 'All Users';
    const from = S.caseActivityFrom || '', to = S.caseActivityTo || '';

    const matches = all.filter(e =>
      (!q || [e.title, e.detail, e.person, e.comment].join(' ').toLowerCase().includes(q)) &&
      (group === 'All' || categoryOf(e) === group) &&
      (user === 'All Users' || String(e.person || '').split(' · ')[0] === user) &&
      inRange(e.date, from, to));
    const users = [...new Set(all.map(e => String(e.person || '').split(' · ')[0]).filter(Boolean))].sort();
    const count = name => name === 'All' ? all.length : all.filter(e => categoryOf(e) === name).length;

    let lastDate = '';
    const rows = matches.map((e, i) => {
      const heading = e.date !== lastDate ? `<div class="cact-date">${dayLabel(e.date)}</div>` : '';
      lastDate = e.date;
      return heading + row(e, i === matches.length - 1);
    }).join('');

    return `<div class="activity-layout"><section class="case-section">
      <div class="case-section-head cact-head">
        <h2>Case Activity</h2>
        <div class="cact-controls">
          <input type="search" aria-label="Search activity" value="${editorText(S.caseActivityQuery || '')}" onchange="S.caseActivityQuery=this.value;render()" placeholder="Search activity…">
          <select aria-label="Activity type" onchange="S.caseActivityGroup=this.value;render()">${CATEGORIES.map(x => `<option value="${x}" ${group === x ? 'selected' : ''}>${x === 'All' ? 'All Activity Types' : x}</option>`).join('')}</select>
          <select aria-label="User" onchange="S.caseActivityUser=this.value;render()"><option>All Users</option>${users.map(x => `<option ${user === x ? 'selected' : ''}>${editorText(x)}</option>`).join('')}</select>
          <span class="cact-range">From <input type="date" aria-label="From date" value="${from}" onchange="S.caseActivityFrom=this.value;render()"></span>
          <span class="cact-range">To <input type="date" aria-label="To date" value="${to}" onchange="S.caseActivityTo=this.value;render()"></span>
        </div>
      </div>
      <div class="cact-chips">${CATEGORIES.map(x => `<button type="button" class="${group === x ? 'active' : ''}" onclick="S.caseActivityGroup='${x}';render()">${x} (${count(x)})</button>`).join('')}</div>
      <div class="case-section-body"><div class="cact-colhead"><span>Time</span><span></span><span>Event</span><span>Type</span><span>Changes</span><span>User</span></div>${rows || '<div class="cact-empty">No Activity matches these filters.</div>'}</div>
    </section></div>`;
  };
})();
