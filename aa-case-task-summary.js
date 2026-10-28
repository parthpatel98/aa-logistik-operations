/* Case Overview > Task Summary: one stacked bar chart with two bars for every department.
   The left bar of each pair stacks all tasks by status. The right bar stacks all tasks by time: Overdue,
   Due soon, Active and Completed. Both bars therefore total the same number of tasks per department. Both bars share the department axis and the
   count axis, and each bar is captioned, so the two groups stay readable even where colours repeat in meaning.
   Colours come from the dataviz reference palette: the four status segments use the first four categorical
   slots in order, the overdue and due-soon segments use the status palette, and active uses the violet slot.
   Every segment carries its count, the legend lists both groups, and "Show as table" gives the same numbers as text.
   A task is overdue when it is open and past its due date (taskDeadlineState). Loaded last so it replaces
   renderTaskSummaryTable from aa-app.js, which render() calls after each screen is drawn. */
(function () {
  // Stacked bottom to top in this order. Each status keeps its colour everywhere it appears.
  const STATUS_SERIES = [
    { key: 'To-Do', label: 'To-Do', color: '#2a78d6', ink: '#ffffff' },
    { key: 'In Progress', label: 'In Progress', color: '#eb6834', ink: '#ffffff' },
    { key: 'On Hold', label: 'On Hold', color: '#1baf7a', ink: '#0b0b0b' },
    { key: 'Completed', label: 'Completed', color: '#eda100', ink: '#0b0b0b' },
  ];
  // Stacked bottom to top: overdue sits on the baseline so the most urgent work is the most visible. Completed
  // tasks are counted here too, in neutral grey, so the time bar adds up to the same total as the status bar.
  const TIME_SERIES = [
    { key: 'overdue', label: 'Overdue', icon: '⚠', color: '#d03b3b', ink: '#ffffff' },
    { key: 'dueSoon', label: 'Due soon', icon: '◔', color: '#fab219', ink: '#0b0b0b' },
    { key: 'active', label: 'Active', icon: '●', color: '#6250d6', ink: '#ffffff' },
    { key: 'completed', label: 'Completed', icon: '✓', color: '#9aa5b4', ink: '#0b0b0b' },
  ];

  // Chart geometry in SVG units. The SVG scales to the width of its card.
  const W = 720, H = 320, M = { l: 44, r: 16, t: 26, b: 70 };
  const BAR = 26, GAP = 4;
  const esc = editorText;
  const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

  const STYLE = '<style id="case-task-summary-style">'
    + '.ts-summary{display:flex;gap:18px;flex-wrap:wrap;margin-bottom:14px;color:var(--muted);font-size:13px}'
    + '.ts-summary b{font-size:18px;color:var(--ink);margin-right:4px}.ts-summary .ts-red b{color:#d93b3b}'
    + '.tc-chart{background:#fff;border:1px solid var(--line);border-radius:8px;padding:14px 16px}'
    + '.tc-chart h3{margin:0;font-size:14px;font-weight:700;color:var(--ink)}'
    + '.tc-sub{margin:2px 0 8px;color:var(--muted);font-size:12px}'
    + '.tc-legends{display:flex;flex-direction:column;gap:8px;margin-top:12px;padding-top:12px;border-top:1px solid var(--line)}'
    + '.tc-legend{display:grid;grid-template-columns:64px 1fr;gap:6px 12px;font-size:12px;color:var(--muted);align-items:center}'
    + '.tc-legend .tc-group{font-weight:700;color:var(--ink)}.tc-legend .tc-items{display:flex;flex-wrap:wrap;gap:6px 18px}'
    + '.tc-legend span{display:inline-flex;align-items:center;gap:6px}.tc-legend i{width:10px;height:10px;border-radius:2px;display:inline-block}'
    + '.tc-legend em{font-style:normal}.tc-legend b{color:var(--ink)}.tc-legend .tc-zero{opacity:.55}'
    + '.tc-table-wrap{margin-top:10px;font-size:12px}.tc-table-wrap summary{cursor:pointer;color:var(--blue);width:max-content}'
    + '.tc-table{border-collapse:collapse;margin-top:8px;width:100%}'
    + '.tc-table th,.tc-table td{border-bottom:1px solid var(--line);padding:6px 8px;text-align:right}'
    + '.tc-table th:first-child,.tc-table td:first-child{text-align:left}'
    + '</style>';

  // A round step (1, 2, 5 or 10 times a power of ten) for the top of the count axis, split into four steps.
  function axisScale(max) {
    const exp = Math.pow(10, Math.floor(Math.log10(Math.max(max, 1))));
    const f = Math.max(max, 1) / exp;
    const nice = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * exp;
    const step = Math.max(1, Math.ceil(nice / 4));
    return { step, top: step * 4 };
  }

  // One SVG chart. Each department has a status bar (left) and a time bar (right) side by side.
  function groupedChart(depts, statusRows, timeRows, label) {
    const statusTotals = statusRows.map(r => r.reduce((a, b) => a + b, 0));
    const timeTotals = timeRows.map(r => r.reduce((a, b) => a + b, 0));
    const { step, top } = axisScale(Math.max(0, ...statusTotals, ...timeTotals));
    const plotW = W - M.l - M.r, plotH = H - M.t - M.b;
    const band = plotW / depts.length;
    const y = v => M.t + plotH - (v / top) * plotH;

    let grid = '';
    for (let v = 0; v <= top; v += step) {
      grid += `<line x1="${M.l}" x2="${W - M.r}" y1="${y(v)}" y2="${y(v)}" stroke="${v === 0 ? '#9aa5b4' : '#e6ebf1'}" stroke-width="1"/>`
        + `<text x="${M.l - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#52514e">${v}</text>`;
    }

    // Draws one stacked bar from its counts; x is the left edge of the bar.
    const stack = (d, x, rows, series, total, caption) => {
      let bars = '', acc = 0;
      rows.forEach((c, k) => {
        if (!c) return;
        const s = series[k], yTop = y(acc + c), h = y(acc) - yTop;
        // The 2px surface stroke leaves a gap between stacked segments.
        bars += `<rect x="${x}" y="${yTop}" width="${BAR}" height="${h}" fill="${s.color}" stroke="#fcfcfb" stroke-width="2"><title>${esc(d)} · ${esc(caption)} · ${esc(s.label)}: ${c}</title></rect>`;
        if (h >= 18) bars += `<text x="${x + BAR / 2}" y="${yTop + h / 2 + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="${s.ink}" pointer-events="none">${c}</text>`;
        acc += c;
      });
      bars += `<text x="${x + BAR / 2}" y="${y(total) - 6}" text-anchor="middle" font-size="12" font-weight="700" fill="#0b0b0b">${total}</text>`;
      bars += `<text x="${x + BAR / 2}" y="${H - M.b + 30}" text-anchor="middle" font-size="11" fill="#52514e">${caption}</text>`;
      return bars;
    };

    let bars = '';
    depts.forEach((d, i) => {
      const cx = M.l + band * i + band / 2;
      bars += stack(d, cx - BAR - GAP / 2, statusRows[i], STATUS_SERIES, statusTotals[i], 'Status');
      bars += stack(d, cx + GAP / 2, timeRows[i], TIME_SERIES, timeTotals[i], 'Time');
      bars += `<text x="${cx}" y="${H - M.b + 50}" text-anchor="middle" font-size="12" font-weight="700" fill="#0b0b0b"><title>${esc(d)}</title>${esc(d)}</text>`;
    });

    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}" style="width:100%;height:auto;display:block">${grid}${bars}</svg>`;
  }

  function chartCard(depts, statusRows, timeRows) {
    const legendItem = (s, sum) => `<span class="${sum ? '' : 'tc-zero'}"><i style="background:${s.color}"></i>${esc(s.label)} <b>${sum}</b></span>`;
    const statusLegend = STATUS_SERIES.map((s, k) => legendItem(s, statusRows.reduce((a, r) => a + r[k], 0))).join('');
    const timeLegend = TIME_SERIES.map((s, k) => legendItem(s, timeRows.reduce((a, r) => a + r[k], 0))).join('');
    const headers = [...STATUS_SERIES.map(s => s.label), ...TIME_SERIES.map(s => s.label)];
    const table = `<table class="tc-table"><thead><tr><th>Department</th>${headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>`
      + `<tbody>${depts.map((d, i) => `<tr><td>${esc(d)}</td>${[...statusRows[i], ...timeRows[i]].map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    return `<section class="tc-chart"><h3>Tasks by department</h3>`
      + `<p class="tc-sub">Both bars count every task. Left: by status. Right: by time (overdue, due soon, active, completed).</p>`
      + groupedChart(depts, statusRows, timeRows, 'Tasks by status and by time for each department')
      + `<div class="tc-legends"><div class="tc-legend" role="group" aria-label="Status legend"><span class="tc-group">Status</span><div class="tc-items">${statusLegend}</div></div><div class="tc-legend" role="group" aria-label="Time legend"><span class="tc-group">Time</span><div class="tc-items">${timeLegend}</div></div></div>`
      + `<details class="tc-table-wrap"><summary>Show as table</summary>${table}</details></section>`;
  }

  // Every task falls into one time group: completed, overdue, due soon (today or within a day), or active.
  const timeGroup = t => {
    if (effectiveTaskStatus(t) === 'Completed') return 3;
    const state = taskDeadlineState(t);
    return state === 'Overdue' ? 0 : (state === 'Due Today' || state === 'Due Soon') ? 1 : 2;
  };

  renderTaskSummaryTable = function () {
    if (S.page !== 'case' || S.caseTab !== 'Overview') return;
    const heading = [...document.querySelectorAll('.case-section-head h2')].find(x => x.textContent.trim() === 'Task Summary');
    const body = heading?.closest('.case-section')?.querySelector('.case-section-body');
    if (!body) return;
    const tasks = selectedCaseTasks();
    if (!tasks.length) { body.innerHTML = '<div class="case-empty">No Tasks have been created.</div>'; return; }

    const depts = [...new Set(tasks.map(t => t[3]))];
    const overdueTotal = tasks.filter(t => taskDeadlineState(t) === 'Overdue').length;
    const statusRows = depts.map(d => STATUS_SERIES.map(s => tasks.filter(t => t[3] === d && effectiveTaskStatus(t) === s.key).length));
    const timeRows = depts.map(d => {
      const counts = TIME_SERIES.map(() => 0);
      tasks.filter(t => t[3] === d).forEach(t => { counts[timeGroup(t)]++; });
      return counts;
    });

    if (!document.getElementById('case-task-summary-style')) document.head.insertAdjacentHTML('beforeend', STYLE);
    body.innerHTML = `<div class="ts-summary"><span><b>${tasks.length}</b>tasks</span><span><b>${depts.length}</b>departments</span><span class="${overdueTotal ? 'ts-red' : ''}"><b>${overdueTotal}</b>overdue</span></div>`
      + chartCard(depts, statusRows, timeRows);
  };
})();
