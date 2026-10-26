/* Sample data: a few Transport Tasks that are overdue by 3-5 days, so the "Overdue Tasks by Duration"
   chart on the Department Head dashboard has something in every bar. Each row is attached to an existing
   Transport Case and owned by a real Transport team member. Idempotent: rows are only added if their id
   is not already present. Loaded after aa-app.js (TASKS, CASE_DETAILS, USERS, OPERATION_DATE). */
(function () {
  const transportCases = Object.values(CASE_DETAILS).filter(c => String(c.departments || '').includes('Transport')).slice(0, 3);
  const transportTeam = USERS.filter(u => u.department === 'Transport').map(u => u.name);
  if (!transportCases.length || !transportTeam.length) return;

  // Due dates 3, 4 and 5 days before OPERATION_DATE (09/10/2026) so they land in the "3-5 days" bucket.
  const SAMPLES = [
    { id: 'TASK-5001', title: 'Confirm pickup slot with carrier', due: '04/10/2026', priority: 'High', classification: 'Pickup coordination' },
    { id: 'TASK-5002', title: 'Send delivery window to customer', due: '05/10/2026', priority: 'Medium', classification: 'Delivery coordination' },
    { id: 'TASK-5003', title: 'Check transport documents', due: '06/10/2026', priority: 'Medium', classification: 'Transport follow-up' },
  ];

  SAMPLES.forEach((s, i) => {
    if (TASKS.some(t => t[8] === s.id)) return;
    const c = transportCases[i % transportCases.length];
    const owner = transportTeam[i % transportTeam.length];
    // Same column order as every other Task row: title, case, customer, dept, owner, priority, due, status, id, classification, bucket.
    TASKS.push([s.title, c.id, c.customer, 'Transport', owner, s.priority, s.due, 'In Progress', s.id, s.classification, 'Later']);
  });
})();
