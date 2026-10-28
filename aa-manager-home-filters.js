/* Transport Manager home: "View all" on the Department Head Attention Queue opens the department Tasks with the Home
   filters applied (department, priority, assignee and date range), as a snapshot taken at the click. A banner on that
   list shows which filters are applied and can clear them. The date rule is the one the Home uses (window.dueInRange).
   Loaded last so it wraps managerHome, applyFilters and department. */
(function () {
  const ownDefaults = () => ({ q: '', department: 'All', assignee: 'All', priority: 'All', due: 'All', caseId: 'All', type: 'All', status: 'All' });

  // The Home filters as they stand, with the department made explicit (the Home uses the manager's own when none is chosen).
  const snapshotNow = () => {
    const cur = S.managerHomeFilters || {};
    return { ...cur, department: cur.department || currentUser().department };
  };

  const matchesSnapshot = (t, snap) => {
    if (t[3] !== snap.department) return false;
    if (snap.priority && snap.priority !== 'All' && t[5] !== snap.priority) return false;
    if (snap.assignee && snap.assignee !== 'All' && t[4] !== snap.assignee) return false;
    return window.dueInRange ? window.dueInRange(t[6], snap) : true;
  };

  const describe = snap => {
    const parts = [snap.department];
    if (snap.priority && snap.priority !== 'All') parts.push(`Priority ${snap.priority}`);
    if (snap.assignee && snap.assignee !== 'All') parts.push(snap.assignee);
    if (snap.dateRange && snap.dateRange !== 'All') parts.push(snap.dateRange === 'Custom' ? `Custom range ${snap.dateFrom || ''} to ${snap.dateTo || ''}` : snap.dateRange);
    return parts.filter(Boolean).join(' · ');
  };

  window.openAttentionFromHome = function () {
    S.homeSnapshot = snapshotNow();
    S.page = 'department';
    S.taskScope = 'Department Tasks';
    S.filters = { ...ownDefaults(), fromHome: true };
    S.moreFilters = false;
    render();
  };
  window.clearHomeSnapshot = function () {
    S.homeSnapshot = null;
    S.filters = ownDefaults();
    render();
  };

  const active = () => !!(S.filters && S.filters.fromHome && S.homeSnapshot);

  // The department list is built from the snapshot instead of the viewer's department scope, so it follows the Home filters.
  const applyFiltersBase = applyFilters;
  applyFilters = function (base, opts) {
    if (!active()) return applyFiltersBase(base, opts);
    return applyFiltersBase(TASKS.filter(t => matchesSnapshot(t, S.homeSnapshot)), opts);
  };

  const departmentBase = department;
  department = function () {
    const html = departmentBase();
    if (!active()) return html;
    const banner = `<div class="notice" role="status" style="margin:0 0 12px">Showing ${editorText(describe(S.homeSnapshot))} Tasks, as filtered on Home. <button class="link" onclick="clearHomeSnapshot()">Clear filters</button></div>`;
    return html.includes('<div class="card">') ? html.replace('<div class="card">', banner + '<div class="card">') : banner + html;
  };

  // The Attention Queue "View all" button is drawn by the Home layout; point it at the snapshot instead of the bare list.
  const managerHomeBase = managerHome;
  managerHome = function () {
    return managerHomeBase().replace(`onclick="go('department')">View all`, `onclick="openAttentionFromHome()">View all`);
  };
})();
