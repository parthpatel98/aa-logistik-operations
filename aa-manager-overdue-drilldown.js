/* Department Head dashboard: "Overdue Tasks by Duration". Clicking a bar opens the Tasks list already
   filtered to exactly the overdue Tasks that bar counts, with a chip showing the filter and a way to clear
   it. The list applies the same Home-page filters (priority, customer, team member, date range) the chart
   used, so the number on the bar and the number of rows in the list always agree. Loaded after aa-app.js. */
(function () {
  // Buckets follow the Department Head dashboard design: 1–2, 3–7, 8–14 and more than 14 days overdue.
  const BUCKETS = ['1–2 days', '3–7 days', '8–14 days', '> 14 days'];
  const overdueDays = t => Math.round((dateValue(OPERATION_DATE) - dateValue(t[6])) / 86400000);
  const overdueBucketOf = t => { const d = overdueDays(t); return d <= 2 ? BUCKETS[0] : d <= 7 ? BUCKETS[1] : d <= 14 ? BUCKETS[2] : BUCKETS[3]; };
  window.overdueBucketOf = overdueBucketOf;
  window.OVERDUE_BUCKETS = BUCKETS;

  // Same rule the chart uses for "team" Tasks, evaluated against a snapshot of the Home filters taken
  // when the bar was clicked, so the list is not affected by later changes elsewhere.
  function matchesHomeSnapshot(t, f) {
    if (!f) return true;
    if (f.priority && f.priority !== 'All' && t[5] !== f.priority) return false;
    if (f.customer && f.customer !== 'All' && t[2] !== f.customer) return false;
    if (f.assignee && f.assignee !== 'All' && t[4] !== f.assignee) return false;
    if (f.taskType && f.taskType !== 'All' && t[9] !== f.taskType) return false;
    if (f.dateRange && f.dateRange !== 'All' && !(window.dueInRange ? window.dueInRange(t[6], f) : window.homeHelpers.homeDateMatch(t[6], f, 'future'))) return false;
    return true;
  }

  const applyFiltersBase = applyFilters;
  applyFilters = function (base, opts) {
    let rows = applyFiltersBase(base, opts);
    const bucket = S.filters && S.filters.overdueBucket;
    if (bucket && bucket !== 'All') {
      // A bar opened while another department was selected lists that department's Tasks, not the viewer's own.
      const snapshotDept = S.overdueHomeSnapshot && S.overdueHomeSnapshot.department;
      const pool = snapshotDept ? TASKS.filter(t => t[3] === snapshotDept) : rows;
      rows = pool.filter(t => taskDeadlineState(t) === 'Overdue' && overdueBucketOf(t) === bucket && matchesHomeSnapshot(t, S.overdueHomeSnapshot));
    }
    return rows;
  };

  // The bar opens every Task of the department chosen on Home (the viewer's own when none is chosen), with the
  // Department filter set to it and the bar's duration bucket applied, on the Department page.
  window.openOverdueBucket = function (bucket) {
    const dept = (S.managerHomeFilters && S.managerHomeFilters.department) || currentUser().department;
    S.page = 'department';
    S.taskScope = can('viewCompanyTasks') ? 'Company Tasks' : 'Department Tasks';
    S.overdueHomeSnapshot = { ...S.managerHomeFilters, department: dept };
    S.filters = { q: '', department: dept, assignee: 'All', priority: 'All', due: 'All', caseId: 'All', type: 'All', status: 'All', overdueBucket: bucket };
    S.moreFilters = false;
    render();
  };
  window.clearOverdueBucket = function () {
    S.filters.overdueBucket = 'All';
    S.overdueHomeSnapshot = null;
    render();
  };

  const scopedTasksPageBase = scopedTasksPage;
  scopedTasksPage = function (manager = false) {
    const html = scopedTasksPageBase(manager);
    const bucket = S.filters && S.filters.overdueBucket;
    if (!bucket || bucket === 'All') return html;
    const chip = `<div class="notice" style="display:flex;justify-content:space-between;align-items:center;gap:12px"><span>Showing overdue Tasks · <strong>${editorText(bucket)}</strong></span><button type="button" class="link" onclick="clearOverdueBucket()">Clear filter</button></div>`;
    return html.replace('<div class="card">', chip + '<div class="card">');
  };

})();
