/* Department user dashboard: my Tasks that are blocked by other Tasks, and my Tasks that are blocking other Tasks.
   A Task counts as blocked when an unfinished Task it depends on is still open, and as blocking when an
   unfinished Task depends on it. Each card's "View all" opens My Tasks with the matching Dependency filter
   applied; a banner on that screen shows the filter and can clear it. Loaded last so it wraps the Task filter
   pipeline (applyFilters), the My Tasks page (myTasks) and the dashboard section (userUpcomingDependencyTable). */
(function () {
  const isOpen = t => effectiveTaskStatus(t) !== 'Completed';
  const openPredecessors = t => unresolvedDependencies(t);
  const openDependents = t => blockingTaskIds(t[8]).map(taskById).filter(x => x && isOpen(x));
  const isBlocked = t => isOpen(t) && openPredecessors(t).length > 0;
  const isBlocking = t => isOpen(t) && openDependents(t).length > 0;
  const FILTERS = { Blocked: isBlocked, Blocking: isBlocking };

  // The same set My Tasks shows before any filter is applied, so the dashboard counts match "View all".
  // The Home filters (Priority, Customer, Date Range) apply, so the cards match the rest of the page.
  const myTasksAll = () => userFilteredMine();
  const ownerOf = id => { const t = taskById(id); return t ? `${id} (${t[4]})` : id; };

  function dependencyCard({ title, sub, rows, filter, empty, column, related }) {
    const shown = rows.slice(0, 5);
    const body = rows.length
      ? `<div class="table-wrap"><table><thead><tr><th>Task Ref</th><th>Task Title</th><th>${column}</th><th>Due</th><th>Status</th></tr></thead><tbody>${shown.map(t => `<tr tabindex="0" onclick="openTask('${t[8]}')"><td><strong class="id">${t[8]}</strong></td><td>${editorText(t[0])}</td><td>${related(t).map(ownerOf).join(', ')}</td><td>${editorText(t[6])}</td><td>${pill(effectiveTaskStatus(t))}</td></tr>`).join('')}</tbody></table></div>`
      : `<div class="card-body sub" style="padding:14px 16px">${empty}</div>`;
    return `<section class="card"><div class="card-head"><div><h2>${title}</h2></div>${rows.length ? `<button class="link" onclick="openPersonalTasks('dependency','${filter}')">View all (${rows.length})</button>` : ''}</div>${body}</section>`;
  }

  // Dashboard section: replaces the old "Upcoming Tasks (Waiting on Dependency)" table with two cards.
  userUpcomingDependencyTable = function () {
    const mine = myTasksAll();
    const blocked = mine.filter(isBlocked), blocking = mine.filter(isBlocking);
    return `<div class="reviewer-secondary-grid">${dependencyCard({
      title: 'Blocked by other Tasks', sub: 'My Tasks waiting on an unfinished Task', rows: blocked, filter: 'Blocked',
      empty: 'None of my Tasks are waiting on another Task.', column: 'Blocked by', related: t => openPredecessors(t).map(p => p[8]),
    })}${dependencyCard({
      title: 'Blocking other Tasks', sub: 'My unfinished Tasks that other Tasks wait on', rows: blocking, filter: 'Blocking',
      empty: 'None of my Tasks are blocking another Task.', column: 'Blocks', related: t => openDependents(t).map(d => d[8]),
    })}</div>`;
  };

  // My Tasks filter: 'Blocked' or 'Blocking' narrows the list. Any other value (or none) leaves it unchanged.
  const dependencyFilterBase = applyFilters;
  applyFilters = function (base, opts) {
    const rows = dependencyFilterBase(base, opts);
    const test = FILTERS[S.filters && S.filters.dependency];
    return test ? rows.filter(test) : rows;
  };

  window.clearDependencyFilter = () => { S.filters.dependency = 'All'; render(); };

  // Banner on My Tasks so the active dependency filter is visible and can be cleared.
  const dependencyMyTasksBase = myTasks;
  myTasks = function () {
    const html = dependencyMyTasksBase();
    const kind = S.filters && S.filters.dependency;
    if (!FILTERS[kind]) return html;
    const text = kind === 'Blocked' ? 'Showing my Tasks that are blocked by other Tasks.' : 'Showing my Tasks that are blocking other Tasks.';
    const banner = `<div class="notice" role="status" style="margin:0 0 12px">${text} <button class="link" onclick="clearDependencyFilter()">Clear filter</button></div>`;
    return html.includes('<div class="card">') ? html.replace('<div class="card">', banner + '<div class="card">') : banner + html;
  };
})();
