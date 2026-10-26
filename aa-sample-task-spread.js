/* Sample data: spreads Tasks across all four statuses so the Kanban, Tasks lists and Case Task Summary are not all
   To-Do. For each of six Cases: two Completed Tasks, an In Progress Task, an On Hold Task that waits on the In Progress
   one, a To-Do Task that is ready because its predecessor is Completed, and a plain To-Do Task. Dependencies are
   stored in S.taskDependencies and only link Tasks on the same Case, as the Task editor requires. Idempotent: skipped
   if its first Task id already exists. Loaded after aa-app.js (TASKS, S, CASE_DETAILS, USERS). */
(function () {
  if (TASKS.some(t => t[8] === 'TASK-7001')) return;
  const cases = Object.values(CASE_DETAILS).slice(0, 6);
  if (!cases.length) return;
  S.taskDependencies = S.taskDependencies || {};

  const DEPT_CLASS = { Transport: 'Transport booking', Packing: 'Packing preparation', 'Freight forwarding': 'Customs clearance', Warehouse: 'Warehouse storage', 'Inbound/Outbound': 'Pickup coordination' };
  const TITLES = {
    Transport: ['Arrange pickup slot', 'Confirm carrier booking', 'Send shipment documents', 'Confirm delivery window', 'Update transport order'],
    Packing: ['Pack goods to specification', 'Label crates', 'Inspect packaging', 'Prepare packing list', 'Check weight limits'],
    'Freight forwarding': ['Prepare customs declaration', 'Confirm export documents', 'Book freight space', 'Check tariff codes', 'Confirm port slot'],
    Warehouse: ['Prepare receiving', 'Stage goods for loading', 'Count stock', 'Check storage conditions', 'Release goods'],
  };
  const teamFor = dept => USERS.find(u => u.department === dept && u.role !== 'Admin') || USERS[0];
  let next = 7001;
  function add(c, dept, title, status, due, priority, deps) {
    const owner = teamFor(dept), id = `TASK-${next++}`;
    // Same column order as every other Task row: title, case, customer, dept, owner, priority, due, status, id, classification, bucket.
    TASKS.push([title, c.id, c.customer, dept, owner.name, priority, due, status, id, DEPT_CLASS[dept] || 'Transport booking', 'Later']);
    if (deps && deps.length) S.taskDependencies[id] = deps;
    return id;
  }

  cases.forEach(c => {
    const depts = [...new Set(String(c.departments || '').split(',').map(x => x.trim()))].filter(d => TITLES[d]);
    const dept = depts[0] || 'Transport';
    const t = TITLES[dept];
    const done1 = add(c, dept, t[0], 'Completed', '06/10/2026', 'Medium');
    const done2 = add(c, dept, t[1], 'Completed', '07/10/2026', 'High');
    const active = add(c, dept, t[2], 'In Progress', '12/10/2026', 'High', [done1]);
    add(c, dept, t[3], 'On Hold', '14/10/2026', 'Medium', [active]);
    add(c, dept, t[4], 'To-Do', '15/10/2026', 'Low', [done2]);
    add(c, dept, 'Review load plan', 'To-Do', '16/10/2026', 'Medium');
  });
})();
