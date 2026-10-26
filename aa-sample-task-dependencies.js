/* Sample data: open Tasks linked by dependencies, so the department user dashboard has blocked and blocking
   Tasks to show. For each User-role account there is a "blocking" Task (In Progress) and a Task that waits on
   it (To Do), owned by the next User-role account on the same Case. So every user is both blocked by someone
   and blocking someone. Dependencies are stored in S.taskDependencies (Task id -> predecessor ids) and only
   link Tasks on the same Case, as the Task editor requires. Idempotent: rows are only added if their id is
   not already present. Loaded after aa-app.js (TASKS, S, CASE_DETAILS, USERS). */
(function () {
  const owners = USERS.filter(u => u.role === 'User');
  const cases = Object.values(CASE_DETAILS);
  if (owners.length < 2 || !cases.length) return;
  S.taskDependencies = S.taskDependencies || {};

  owners.forEach((owner, i) => {
    const next = owners[(i + 1) % owners.length];
    const c = cases[i % cases.length];
    const blockingId = `TASK-${6301 + i * 2}`;
    const waitingId = `TASK-${6302 + i * 2}`;
    if (TASKS.some(t => t[8] === blockingId)) return;

    // Same column order as every other Task row: title, case, customer, dept, owner, priority, due, status, id, classification, bucket.
    TASKS.push(['Confirm vehicle requirements', c.id, c.customer, owner.department, owner.name, 'High', '10/10/2026', 'In Progress', blockingId, 'Transport booking', 'Later']);
    TASKS.push(['Book carrier for transport', c.id, c.customer, next.department, next.name, 'Medium', '12/10/2026', 'To-Do', waitingId, 'Transport booking', 'Later']);
    S.taskDependencies[waitingId] = [blockingId];
  });
})();
