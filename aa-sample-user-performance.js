/* Sample data: six completed Tasks for every department user, due 04/10 to 08/10 and completed 03/10 to 09/10,
   with two early, two on-time and two late completions each. Feeds "My On-Time Performance", "Assigned vs Completed"
   and "Weekly Completions" on the department user dashboard. Each completion is written to TASK_COMPLETIONS
   explicitly. Idempotent: rows are only added if their id is not already present.
   Loaded after aa-app.js (TASKS, TASK_COMPLETIONS, CASE_DETAILS, USERS). */
(function () {
  const owners = USERS.filter(u => u.role === 'User');
  const cases = Object.values(CASE_DETAILS);
  if (!owners.length || !cases.length) return;

  const DUE_DAYS = [4, 5, 6, 7, 8];
  const OUTCOMES = ['early', 'on', 'late'];
  const TITLES = ['Confirm pickup slot', 'Send delivery window', 'Check transport documents', 'Book carrier', 'Verify customs documents', 'Update packing list', 'Confirm delivery address', 'Arrange loading access'];
  const CLASSES = ['Transport booking', 'Pickup', 'Delivery', 'Customs', 'Packing'];
  const PRIORITIES = ['High', 'Medium', 'Low'];
  const pad = n => String(n).padStart(2, '0');

  owners.forEach((owner, o) => {
    for (let k = 0; k < 6; k++) {
      const n = o * 6 + k;
      const id = `TASK-63${pad(n + 1)}`;
      if (TASKS.some(t => t[8] === id)) continue;
      const dueDay = DUE_DAYS[(o + k) % DUE_DAYS.length];
      const outcome = OUTCOMES[(o + k) % OUTCOMES.length];
      const doneDay = outcome === 'early' ? dueDay - 1 : outcome === 'late' ? dueDay + 1 : dueDay;
      const c = cases[n % cases.length];
      // Same column order as every other Task row: title, case, customer, dept, owner, priority, due, status, id, classification, bucket.
      TASKS.push([TITLES[n % TITLES.length], c.id, c.customer, owner.department, owner.name, PRIORITIES[n % PRIORITIES.length], `${pad(dueDay)}/10/2026`, 'Completed', id, CLASSES[n % CLASSES.length], 'Later']);
      TASK_COMPLETIONS[id] = { at: `${pad(doneDay)}/10/2026, ${pad(9 + (n % 8))}:${pad((n * 13) % 60)}`, by: owner.name, resolution: 'Work Completed' };
    }
  });
})();
