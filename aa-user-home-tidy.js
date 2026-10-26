/* Department user home.
   - Task Due Soon follows the Home filters (Priority, Customer, Date Range), and shows no classification line under the subject.
   - A 16px gap separates the top row from the dependency cards below it, matching the spacing between the other rows.
   Loaded last so it wraps the department user home. */
(function () {
  // Cards in a row keep their own height instead of stretching to the tallest card, so short cards have no empty space.
  const STYLE = '<style id="user-home-spacing">#root .grid2{margin-bottom:16px}#root .reviewer-secondary-grid{align-items:start}</style>';
  if (!document.getElementById('user-home-spacing')) document.head.insertAdjacentHTML('beforeend', STYLE);

  const dueSoonOf = rows => rows
    .filter(t => ['Due Today', 'Due Soon'].includes(taskDeadlineState(t)))
    .sort((a, b) => {
      const order = { 'Due Today': 0, 'Due Soon': 1 };
      return (order[taskDeadlineState(a)] - order[taskDeadlineState(b)]) || (dateValue(a[6]) - dateValue(b[6]));
    });

  // Assigned vs Completed: drawn as SVG with bar heights set as attributes. Inline style heights on divs are not kept on
  // this page, which made every bar the same height. Dates are the first seven due dates of the Tasks that are shown.
  // Some Tasks store "Today" or "Tomorrow" instead of a date; those are read as the operation date and the day after.
  const dueDate = t => {
    if (t[6] === 'Today') return OPERATION_DATE;
    if (t[6] === 'Tomorrow') {
      const [dd, mm, yyyy] = OPERATION_DATE.split('/').map(Number);
      const next = new Date(yyyy, mm - 1, dd + 1);
      return `${String(next.getDate()).padStart(2, '0')}/${String(next.getMonth() + 1).padStart(2, '0')}/${next.getFullYear()}`;
    }
    return t[6];
  };
  userAssignedVsCompletedChart = function () {
    const mine = userFilteredMine();
    const dates = [...new Set(mine.map(dueDate))].sort((a, b) => dateValue(a) - dateValue(b)).slice(0, 7);
    const groups = dates.map(d => ({
      d,
      assigned: mine.filter(t => dueDate(t) === d).length,
      completed: mine.filter(t => dueDate(t) === d && t[7] === 'Completed').length,
    }));
    const W = 540, H = 200, base = H - 26, plot = H - 60;
    const max = Math.max(1, ...groups.flatMap(g => [g.assigned, g.completed]));
    const slot = groups.length ? (W - 20) / groups.length : W;
    const bw = Math.min(22, slot / 3);
    const bars = groups.map((g, i) => {
      const x = 10 + i * slot + slot / 2;
      const ha = g.assigned / max * plot, hc = g.completed / max * plot;
      const label = g.d === OPERATION_DATE ? 'Today' : g.d.slice(0, 5);
      return `<rect x="${x - bw - 2}" y="${base - ha}" width="${bw}" height="${ha}" rx="3" fill="#0877d1"><title>${g.assigned} assigned, due ${label}</title></rect>`
        + `<rect x="${x + 2}" y="${base - hc}" width="${bw}" height="${hc}" rx="3" fill="#9cc9f2"><title>${g.completed} completed, due ${label}</title></rect>`
        + (g.assigned ? `<text x="${x - bw / 2 - 2}" y="${base - ha - 5}" text-anchor="middle" font-size="11" font-weight="700" fill="#14233a">${g.assigned}</text>` : '')
        + (g.completed ? `<text x="${x + bw / 2 + 2}" y="${base - hc - 5}" text-anchor="middle" font-size="11" font-weight="700" fill="#14233a">${g.completed}</text>` : '')
        + `<text x="${x}" y="${H - 6}" text-anchor="middle" font-size="11" fill="#6b778a">${label}</text>`;
    }).join('');
    const legend = `<svg width="200" height="14" viewBox="0 0 200 14" role="presentation"><rect x="0" y="2" width="10" height="10" rx="2" fill="#0877d1"/><text x="16" y="11" font-size="12" fill="#425169">Assigned</text><rect x="90" y="2" width="10" height="10" rx="2" fill="#9cc9f2"/><text x="106" y="11" font-size="12" fill="#425169">Completed</text></svg>`;
    return `<section class="card reviewer-chart-card"><div class="card-head reviewer-chart-head"><div><h2>Assigned vs Completed</h2><span class="sub">My Tasks grouped by due date</span></div></div>`
      + `<div style="padding:10px 16px 16px;display:grid;gap:8px"><div style="display:flex;justify-content:flex-end">${legend}</div>`
      + (groups.length ? `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Assigned and completed Tasks by due date">${bars}</svg>` : '<div class="sub">No Tasks to chart for these filters.</div>')
      + '</div></section>';
  };

  // Final layout of the department user home: the cards sit in three labelled sections, each row is two equal
  // columns, and the cards in a row share one height. The card content is unchanged; only its placement moves.
  const UD_SECTIONS = [
    { title: 'Needs your attention', rows: [['Acknowledgement Pending'], ['Task Due Soon', 'Recent Mentions']] },
    { title: 'Dependencies', rows: [['Blocked by other Tasks', 'Blocking other Tasks']] },
    { title: 'Performance', rows: [['Assigned vs Completed', 'Task Status Distribution'], ['My On-Time Performance', 'Tasks by Category']] },
  ];
  function layoutUserHomeSections(root) {
    if (!document.getElementById('ud-layout-style')) {
      document.head.insertAdjacentHTML('beforeend', '<style id="ud-layout-style">.ud-sections{display:grid;gap:22px;margin-top:6px}.ud-section-title{margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}.ud-grid{display:grid;gap:16px;align-items:stretch}.ud-grid+.ud-grid{margin-top:16px}.ud-grid-1{grid-template-columns:minmax(0,1fr)}.ud-grid-2{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.ud-card{display:flex;flex-direction:column;margin:0;min-width:0;height:100%}.ud-card>*:last-child{flex:1 1 auto}.ud-card .attention-list{flex:1 1 auto}@media(max-width:1000px){.ud-grid-2{grid-template-columns:minmax(0,1fr)}}</style>');
    }
    const cardByTitle = title => [...root.querySelectorAll('.card, .analytics-card, .img-card')].find(c => {
      const h = c.querySelector('h2, h3');
      return h && h.textContent.trim() === title;
    });
    const placed = new Map();
    UD_SECTIONS.forEach(s => s.rows.flat().forEach(title => {
      const card = cardByTitle(title);
      if (card) { placed.set(title, card); card.remove(); }
    }));
    placed.forEach(card => card.querySelectorAll('.card-head .sub, .card-head .chart-sub, .card-head .img-sub, .img-card-head .sub, .img-card-head .img-sub, .analytics-card > .chart-sub').forEach(n => n.remove()));
    root.querySelectorAll('.grid2, .reviewer-secondary-grid').forEach(g => { if (!g.children.length) g.remove() });
    const wrap = document.createElement('div');
    wrap.className = 'ud-sections';
    UD_SECTIONS.forEach(s => {
      const rows = s.rows.map(row => {
        const cards = row.map(t => placed.get(t)).filter(Boolean);
        if (!cards.length) return null;
        const grid = document.createElement('div');
        grid.className = `ud-grid ud-grid-${cards.length > 1 ? 2 : 1}`;
        cards.forEach(c => { c.classList.add('ud-card'); grid.appendChild(c) });
        return grid;
      }).filter(Boolean);
      if (!rows.length) return;
      const section = document.createElement('section');
      section.innerHTML = `<h3 class="ud-section-title">${s.title}</h3>`;
      rows.forEach(r => section.appendChild(r));
      wrap.appendChild(section);
    });
    const kpis = root.querySelector('.kpis');
    if (kpis) kpis.after(wrap); else root.appendChild(wrap);
  }

  const userHomeBase = userHome;
  userHome = function () {
    const html = userHomeBase();
    const template = document.createElement('template');
    template.innerHTML = html;
    const card = [...template.content.querySelectorAll('.card')].find(c => {
      const h = c.querySelector('h2');
      return h && h.textContent.trim() === 'Task Due Soon';
    });
    if (card) {
      const dueTasks = dueSoonOf(userFilteredMine());
      const rebuilt = document.createElement('div');
      rebuilt.innerHTML = homeDueTasksTable(dueTasks);
      rebuilt.querySelectorAll('.card-head').forEach(n => n.remove());
      rebuilt.querySelectorAll('.card-body').forEach(n => { if (/Showing|Show all/.test(n.textContent)) n.remove() });
      rebuilt.querySelectorAll('tbody tr td:nth-child(2) .sub').forEach(sub => sub.remove());
      const showAll = dueTasks.length > 4 ? `<button type="button" class="link" onclick="go('mytasks')">Show all ${dueTasks.length}</button>` : '';
      card.innerHTML = `<div class="card-head" style="display:flex;justify-content:space-between;align-items:center;gap:12px"><h2>Task Due Soon</h2>${showAll}</div>${rebuilt.innerHTML}`;
    }

    // Weekly Completions is not shown on the department user home. Remove its row when the card was its only card.
    const weekly = [...template.content.querySelectorAll('.card')].find(c => {
      const h = c.querySelector('h2');
      return h && h.textContent.trim() === 'Weekly Completions';
    });
    if (weekly) {
      const row = weekly.parentElement;
      weekly.remove();
      if (row && row.classList.contains('reviewer-secondary-grid') && !row.children.length) row.remove();
    }

    template.content.querySelectorAll('.notice').forEach(n => { if (/acknowledgement for .* is pending/i.test(n.textContent)) n.remove() });
    const me = currentUser();
    const pending = Object.values(CASE_DETAILS).filter(c => !caseAcknowledged(c) && TASKS.some(t => t[1] === c.id && t[4] === me.name));
    if (pending.length) {
      const shown = S.ackHomeAll ? pending : pending.slice(0, 5);
      const more = pending.length > 5 ? `<div style="padding:10px 16px"><button type="button" class="link" onclick="S.ackHomeAll=!S.ackHomeAll;render()">${S.ackHomeAll ? 'Show fewer' : `Show all ${pending.length}`}</button></div>` : '';
      const rows = shown.map(c => `<tr><td><button type="button" class="case-link" onclick="openAcknowledgementCase('${c.id}')">${c.id}</button></td><td>${editorText(c.customer)}</td><td>${editorText(c.caseClass)}</td><td>${editorText(c.created)}</td><td><button type="button" class="link" onclick="openAcknowledgementCase('${c.id}')">Open Communication</button></td></tr>`).join('');
      const card = document.createElement('section');
      card.className = 'card';
      card.innerHTML = `<div class="card-head"><div><h2>Acknowledgement Pending</h2></div></div><table><thead><tr><th>Case</th><th>Customer</th><th>Case Class</th><th>Received</th><th></th></tr></thead><tbody>${rows}</tbody></table>${more}`;
      const grid = template.content.querySelector('.grid2');
      if (grid) grid.before(card); else template.content.appendChild(card);
    }

    // Recent Mentions: one row per open Task of this user, with the person who mentioned them.
    const mentionCard = [...template.content.querySelectorAll('.card')].find(c => {
      const h = c.querySelector('h2');
      return h && h.textContent.trim() === 'Recent Mentions';
    });
    const list = mentionCard && mentionCard.querySelector('.attention-list');
    if (list) {
      const me = currentUser().name;
      const mentions = Object.entries(S.comments || {}).flatMap(([taskId, comments]) => comments
        .filter(c => c.author !== me && String(c.text).includes(`@${me}`))
        .map(c => ({ taskId, c })))
        .reverse()
        .slice(0, 6);
      list.innerHTML = mentions.map(({ taskId, c }) => {
        const task = taskById(taskId);
        const initials = c.author.split(' ').map(part => part[0]).join('');
        return `<div class="attention"><span class="avatar">${initials}</span><div><strong>${editorText(c.author)} mentioned you</strong><span class="sub">${editorText(task ? task[0] : taskId)} · ${editorText(c.text)}</span></div><button class="link" onclick="openTaskMention('${taskId}','${taskNoteId(c)}')">Open</button></div>`;
      }).join('');
    }
    layoutUserHomeSections(template.content);
    return template.innerHTML;
  };

  // Each assignee's first two open Tasks carry a teammate's comment that mentions them.
  const teammates = ['Sofia Lind', 'Maria Svensson', 'Andreas Nilsson', 'Karin Holm', 'Jonas Eriksson', 'Sara Nyberg'];
  const seedCounts = {};
  TASKS.forEach((t, i) => {
    const owner = t[4];
    if (!owner || owner === 'Unassigned' || t[7] === 'Completed') return;
    seedCounts[owner] = (seedCounts[owner] || 0) + 1;
    if (seedCounts[owner] > 2) return;
    const list = S.comments[t[8]] = S.comments[t[8]] || [];
    if (list.some(c => c.seed)) return;
    const others = teammates.filter(n => n !== owner);
    const comment = { author: others[i % others.length], text: `@${owner} can you confirm ${t[0].toLowerCase()} for ${t[2]} before we book?`, at: '09/10/2026, 09:15', seed: true };
    taskNoteId(comment);
    list.push(comment);
  });

  window.openTaskMention = function (taskId, nid) {
    S.taskFeedTab = 'comments';
    openTask(taskId);
    setTimeout(() => jumpToNote(nid), 80);
  };

  // "View all" on the dependency cards opens My Tasks with the Home Priority filter applied, so the list matches the card.
  const openPersonalBase = openPersonalTasks;
  openPersonalTasks = function (kind = '', value = '') {
    const priority = S.userHomeFilters && S.userHomeFilters.priority;
    openPersonalBase(kind, value);
    if (kind === 'dependency' && priority && priority !== 'All') {
      S.filters.priority = priority;
      render();
    }
  };
  // Every home (Admin, Reviewer, Department Head, Department User): the grey description line under each card heading is removed.
  const HOME_SUBTEXT = '.card-head .sub, .card-head .chart-sub, .card-head .img-sub, .img-card-head .sub, .img-card-head .img-sub, .analytics-card > .chart-sub, .card > .card-head p';
  const renderBeforeHomeStrip = render;
  render = function () {
    const result = renderBeforeHomeStrip.apply(this, arguments);
    if (S.page === 'home') document.querySelectorAll(`#root ${HOME_SUBTEXT.split(', ').join(`, #root `)}`).forEach(n => n.remove());
    return result;
  };
})();
