/* Department Manager Home, laid out to the agreed design: greeting and department overview with the date
   range at top right; one row of labelled filters (Department, Task Type, Priority, Customer, Assignee);
   five KPI cards (Open, Overdue, Due today, In progress, Completed); the Department Head Attention Queue;
   and three charts side by side (Incoming vs Completed, Workload by Team Member, Overdue Tasks by Duration).
   Everything is computed from the same Department Tasks and Home filters the rest of the app uses, and the
   duration bars open the filtered Tasks list (aa-manager-overdue-drilldown.js). Loaded last. */
(function () {
  const managerHomeBase = managerHome;
  const PRIORITY_STYLE = { High: 'background:#fde8e8;color:#c51f2d', Medium: 'background:#e6f0fb;color:#0871c7', Low: 'background:#eef2f6;color:#52677b' };

  const { homeDateRangeSelectHtml, homeCustomRangeHtml, homeFilterOptionsHtml } = window.homeHelpers;
  const f = () => S.managerHomeFilters || {};
  // Department Tasks that match the Home filters.
  function teamRows() { return managerFilteredTeam() }
  const isOpen = t => effectiveTaskStatus(t) !== 'Completed';
  const isOverdue = t => taskDeadlineState(t) === 'Overdue';
  const isDueToday = t => taskDeadlineState(t) === 'Due Today';
  const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening'; };

  function kpi(label, value) {
    return `<div class="mh-kpi"><span>${label}</span><strong>${value}</strong></div>`;
  }

  function filterSelect(label, control) {
    return `<label class="mh-filter"><span>${label}</span>${control}</label>`;
  }

  // The Department filter starts on the manager's own department; another department can be chosen to view it.
  const ownDept = () => currentUser().department;
  const dept = () => f().department || ownDept();
  function filtersHtml() {
    const team = TASKS.filter(t => t[3] === dept());
    const assignees = [...new Set(team.map(t => t[4]))].filter(x => x && x !== 'Unassigned').sort();
    const cur = f();
    const active = (cur.priority && cur.priority !== 'All') || (cur.assignee && cur.assignee !== 'All') || (cur.dateRange && cur.dateRange !== 'All') || (cur.department && cur.department !== ownDept());
    return `<div class="mh-filters">
      ${filterSelect('Department', `<select onchange="setManagerHomeFilter('department',this.value)" aria-label="Department">${ALL_DEPTS.filter(d => d !== '—').map(d => `<option ${d === dept() ? 'selected' : ''}>${editorText(d)}</option>`).join('')}</select>`)}
      ${filterSelect('Date Range', homeDateRangeSelectHtml(cur.dateRange || 'All', "setHomeDateRange('manager',this.value)"))}
      ${homeCustomRangeHtml('manager')}
      ${filterSelect('Priority', `<select onchange="setManagerHomeFilter('priority',this.value)" aria-label="Priority">${homeFilterOptionsHtml(cur.priority || 'All', ['High', 'Medium', 'Low'], 'All')}</select>`)}
      ${filterSelect('Assignee', `<select onchange="setManagerHomeFilter('assignee',this.value)" aria-label="Assignee">${homeFilterOptionsHtml(cur.assignee || 'All', assignees, 'All Team Members')}</select>`)}
      ${active ? '<button type="button" class="link mh-clear" onclick="clearManagerHomeFilters()">Clear filters</button>' : ''}
    </div>`;
  }

  // Attention queue: unclaimed, overdue, due today or blocked Department Tasks, most urgent first.
  function attentionRows(rows) {
    const rank = t => t[4] === 'Unassigned' ? 0 : isOverdue(t) ? 1 : isDueToday(t) ? 2 : 3;
    return rows.filter(t => isOpen(t) && (t[4] === 'Unassigned' || isOverdue(t) || isDueToday(t) || unresolvedDependencies(t).length))
      .sort((a, b) => rank(a) - rank(b)).slice(0, 6);
  }
  function statusCell(t) {
    if (t[4] === 'Unassigned') return '<span class="mh-status amber">Unclaimed task</span>';
    if (isOverdue(t)) return '<span class="mh-status red">Overdue</span>';
    if (isDueToday(t)) return '<span class="mh-status amber">Due today</span>';
    const blockers = unresolvedDependencies(t).length;
    return blockers ? `<span class="mh-status grey">Blocked by ${blockers} ${blockers === 1 ? 'Task' : 'Tasks'}</span>` : '';
  }
  function attentionCard(rows) {
    const items = attentionRows(rows);
    const body = items.length
      ? `<table class="mh-table"><thead><tr><th>Task Ref</th><th>Assignee</th><th>Task</th><th>Priority</th><th>Due Date</th><th>Status</th></tr></thead><tbody>${items.map(t => `<tr>
          <td><button type="button" class="mh-link" onclick="openTask('${t[8]}')">${editorText(t[8])}</button></td>
          <td>${t[4] === 'Unassigned' ? '<span class="mh-muted">Unassigned</span>' : editorText(t[4])}</td>
          <td>${editorText(t[0])}</td>
          <td><span class="mh-pill" style="${PRIORITY_STYLE[t[5]] || PRIORITY_STYLE.Low}">${editorText(t[5])}</span></td>
          <td>${isDueToday(t) ? 'Today' : editorText(t[6])}</td>
          <td>${statusCell(t)}</td></tr>`).join('')}</tbody></table>`
      : '<div class="mh-muted" style="padding:14px 0">Nothing needs attention right now.</div>';
    return `<section class="mh-card"><div class="mh-card-head"><div><h2>Department Head Attention Queue</h2><p>Tasks that may need your intervention or reassignment</p></div><button type="button" class="link" onclick="go('department')">View all</button></div>${body}</section>`;
  }

  function incomingCompletedCard(rows) {
    const u = currentUser();
    const dates = [...new Set(rows.map(t => t[6]))].sort((a, b) => dateValue(a) - dateValue(b)).slice(0, 6);
    const groups = dates.map(d => [String(d).slice(0, 5), rows.filter(t => t[6] === d).length, rows.filter(t => t[6] === d && t[7] === 'Completed').length]);
    return `<section class="mh-card"><div class="mh-card-head"><div><h2>Incoming vs. Completed</h2><p>${editorText(dept())} Tasks by due date</p></div></div>${volumeChart(groups, 'Incoming', 'Completed')}</section>`;
  }

  function workloadCard(rows) {
    const u = currentUser();
    const members = [...USERS.filter(x => x.department === dept()).map(x => x.name), 'Unassigned'];
    const groups = members.map(name => {
      const mine = rows.filter(t => t[4] === name && isOpen(t));
      const overdue = mine.filter(isOverdue).length;
      return { label: name === 'Unassigned' ? 'Unassigned' : name.split(' ')[0], open: mine.length - overdue, overdue };
    });
    const max = Math.max(1, ...groups.map(g => g.open + g.overdue));
    const cols = groups.map(g => {
      const total = g.open + g.overdue;
      // Both segments are in pixels of the bar: the bar is the team total, red is the overdue share of it, blue is the rest.
      const barPx = total ? Math.max(4, total / max * 150) : 0;
      const overduePx = total ? g.overdue / total * barPx : 0;
      const openPx = barPx - overduePx;
      // Drawn as SVG with sizes set as attributes, so the segments keep their heights when the page is rendered.
      const label = `${g.label}: ${g.open} open, ${g.overdue} overdue`;
      const bar = `<svg class="mh-stack-bar" width="46" height="${barPx}" viewBox="0 0 46 ${barPx}" role="img" aria-label="${editorText(label)}"><title>${editorText(label)}</title><rect x="0" y="0" width="46" height="${overduePx}" fill="#e5484d"/><rect x="0" y="${overduePx}" width="46" height="${openPx}" fill="#0877d1"/></svg>`;
      return `<div class="mh-stack-col"><span class="mh-stack-total">${total}</span>${bar}<span class="mh-stack-x">${editorText(g.label)}</span></div>`;
    }).join('');
    return `<section class="mh-card mh-wide"><div class="mh-card-head"><div><h2>Workload by Team Member</h2><p>Total open tasks, including overdue</p></div></div>
      <div class="mh-legend"><span><i class="mh-open"></i>Open tasks</span><span><i class="mh-over"></i>Overdue</span></div>
      <div class="mh-stack-chart"><div class="mh-stack-plot">${cols}</div></div></section>`;
  }

  function durationCard(rows) {
    const u = currentUser();
    const overdue = rows.filter(isOverdue);
    const counts = OVERDUE_BUCKETS.map(b => [b, overdue.filter(t => overdueBucketOf(t) === b).length]);
    const max = Math.max(1, ...counts.map(x => x[1]));
    const cols = counts.map(([b, n]) => {
      const label = `View ${n} overdue Task${n === 1 ? '' : 's'}, ${b}`;
      return `<div class="mh-dur-col" role="button" tabindex="0" aria-label="${editorText(label)}" title="${editorText(label)}" onclick="openOverdueBucket(${editorText(JSON.stringify(b))})" onkeydown="if(event.key==='Enter'||event.key===' ')openOverdueBucket(${editorText(JSON.stringify(b))})"><span class="mh-stack-total">${n}</span><div class="mh-dur-bar"><i style="height:${n / max * 100}%"></i></div><span class="mh-stack-x">${editorText(b)}</span></div>`;
    }).join('');
    return `<section class="mh-card"><div class="mh-card-head"><div><h2>Overdue Tasks by Duration</h2><p>${overdue.length} overdue tasks in ${editorText(dept())} · click a bar to view</p></div></div>
      <div class="mh-stack-chart"><div class="mh-stack-plot">${cols}</div></div></section>`;
  }

  window.managerHome = function () {
    if (S.role !== 'Manager') return managerHomeBase();
    // Customer and Task Type filters are no longer on this screen, so a choice left from before is cleared.
    if (S.managerHomeFilters) { S.managerHomeFilters.customer = 'All'; S.managerHomeFilters.taskType = 'All' }
    const u = currentUser(), rows = teamRows();
    const kpis = [
      kpi('Open tasks', rows.filter(isOpen).length),
      kpi('Overdue tasks', rows.filter(isOverdue).length),
      kpi('Due today', rows.filter(isDueToday).length),
      kpi('In progress', rows.filter(t => effectiveTaskStatus(t) === 'In Progress').length),
      kpi('Completed tasks', rows.filter(t => effectiveTaskStatus(t) === 'Completed').length),
    ].join('');
    return `<div class="mh-page">
      <div class="mh-head">
        <div><h1>Good ${greeting()}, ${editorText(u.name.split(' ')[0])}</h1><p class="mh-sub">${editorText(dept())} Operations Overview</p></div>
      </div>
      ${filtersHtml()}
      <div class="mh-kpis">${kpis}</div>
      ${attentionCard(rows)}
      <div class="mh-charts">${incomingCompletedCard(rows)}${durationCard(rows)}</div>
      ${workloadCard(rows)}
    </div>`;
  };

  // Tasks and Cases for the selected department (the manager's own unless another is chosen), matched
  // against the Home filters. These replace the versions in aa-app.js, which always used the manager's own
  // department, so the KPIs, Attention queue, charts and workload all follow the Department filter.
  // A Task is in the date range when its due date falls inside it: Today is due today, This Week the next 7 days,
  // This Month the next 30 days. Overdue Tasks are therefore only in range for a Custom Range that includes them,
  // so every section on this screen narrows with the Date Range filter.
  function dueInRange(dateStr, cur) {
    if (!cur.dateRange || cur.dateRange === 'All' || !dateStr) return true;
    if (cur.dateRange === 'Custom') return homeDateMatch(dateStr, cur, 'future');
    const days = Math.floor((dateValue(dateStr) - dateValue(OPERATION_DATE)) / 86400000);
    if (cur.dateRange === 'Today') return days === 0;
    if (cur.dateRange === 'This Week') return days >= 0 && days < 7;
    if (cur.dateRange === 'This Month') return days >= 0 && days < 30;
    return true;
  }
  function matchesHomeFilters(t) {
    const cur = f();
    if (cur.priority && cur.priority !== 'All' && t[5] !== cur.priority) return false;
    if (cur.customer && cur.customer !== 'All' && t[2] !== cur.customer) return false;
    if (cur.assignee && cur.assignee !== 'All' && t[4] !== cur.assignee) return false;
    return dueInRange(t[6], cur);
  }
  managerFilteredTeam = function () { return TASKS.filter(t => t[3] === dept() && matchesHomeFilters(t)) };
  // Shared with the drill-down lists and the Attention Queue "View all", so they use the same date rule as this screen.
  window.dueInRange = dueInRange;
  managerDeptCases = function () {
    const cur = f();
    return Object.values(CASE_DETAILS).filter(c => String(c.departments || '').includes(dept())
      && (!cur.customer || cur.customer === 'All' || c.customer === cur.customer)
      && homeDateMatch(c.created || c.due, cur, 'past'));
  };

  document.head.insertAdjacentHTML('beforeend', `<style>
    .mh-page{display:flex;flex-direction:column;gap:14px}
    .mh-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap}
    .mh-head h1{margin:0;font-size:28px;line-height:1.2}
    .mh-sub{margin:4px 0 0;color:var(--muted);font-size:15px;font-weight:600}
    .mh-daterange{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
    .mh-filters{display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;background:#fff;border:1px solid var(--line);border-radius:7px;padding:12px 14px}
    .mh-filter{display:grid;gap:4px;min-width:150px;flex:1}
    .mh-filter span{font-size:11px;color:var(--muted);font-weight:650}
    .mh-filter select{height:38px;border:1px solid var(--line);border-radius:6px;padding:0 10px;font:inherit;background:#fff;color:var(--ink);width:100%}
    .mh-clear{align-self:center}
    .mh-kpis{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
    .mh-kpi{background:#fff;border:1px solid var(--line);border-radius:7px;padding:16px 18px;display:grid;gap:6px}
    .mh-kpi span{font-size:13px;color:var(--ink-2,#3d4d63);font-weight:600}
    .mh-kpi strong{font-size:30px;line-height:1;color:var(--ink)}
    .mh-card{background:#fff;border:1px solid var(--line);border-radius:7px;padding:16px 18px;min-width:0}
    .mh-card-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px}
    .mh-card-head h2{margin:0;font-size:16px}
    .mh-card-head p{margin:3px 0 0;color:var(--muted);font-size:12px}
    .mh-table{width:100%;border-collapse:collapse;font-size:13px}
    .mh-table th{text-align:left;font-size:12px;color:var(--ink-2,#3d4d63);font-weight:650;background:#f6f9fb;padding:9px 10px;border-bottom:1px solid var(--line)}
    .mh-table td{padding:11px 10px;border-bottom:1px solid var(--line);vertical-align:middle}
    .mh-link{border:0;background:none;color:#0871c7;font-weight:700;cursor:pointer;padding:0;font:inherit}
    .mh-muted{color:var(--muted)}
    .mh-pill{display:inline-block;padding:3px 9px;border-radius:5px;font-size:12px;font-weight:650}
    .mh-status{display:inline-block;padding:3px 9px;border-radius:5px;font-size:12px;font-weight:650;white-space:nowrap}
    .mh-status.amber{background:#fff7e0;color:#9a6a00}.mh-status.red{background:#fde8e8;color:#c51f2d}.mh-status.grey{background:#eef2f6;color:#52677b}
    .mh-charts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    .mh-wide{width:100%}
    .mh-legend{display:flex;gap:14px;font-size:12px;color:var(--ink-2,#3d4d63);margin-bottom:8px}
    .mh-legend span{display:inline-flex;align-items:center;gap:6px}
    .mh-legend i,.mh-open,.mh-over{display:inline-block;width:10px;height:10px;border-radius:2px}
    .mh-open{background:#0877d1}.mh-over{background:#e5484d}
    .mh-stack-chart{height:230px;display:flex;align-items:flex-end;padding-top:6px}
    .mh-stack-plot{flex:1;height:100%;display:flex;align-items:flex-end;justify-content:space-around;gap:6px;border-bottom:1px solid var(--line);min-width:0}
    .mh-stack-col,.mh-dur-col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;flex:1;min-width:0;cursor:default}
    .mh-dur-col{cursor:pointer}
    .mh-stack-total{font-size:12px;font-weight:700;color:var(--ink);margin-bottom:4px}
    .mh-stack-bar{width:100%;max-width:46px;display:flex;flex-direction:column;border-radius:3px 3px 0 0;overflow:hidden}
    .mh-stack-bar i{display:block;width:100%;border-radius:0}
    .mh-stack-bar .mh-over{flex:0 0 auto;background:#e5484d}
    .mh-stack-bar .mh-open{flex:1 1 auto;background:#0877d1;min-height:0}
    .mh-dur-bar{width:100%;max-width:70px;height:100%;display:flex;align-items:flex-end}
    .mh-dur-bar i{display:block;width:100%;background:#f08a8a;border-radius:3px 3px 0 0}
    .mh-charts .volume-legend{margin-bottom:14px}
    .mh-charts .volume-chart{padding-top:22px}
    .mh-stack-x{font-size:11px;color:var(--muted);margin-top:6px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
    @media (max-width:1180px){.mh-kpis{grid-template-columns:repeat(3,minmax(0,1fr))}.mh-charts{grid-template-columns:1fr}}
    @media (max-width:760px){.mh-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}}
  </style>`);
})();
