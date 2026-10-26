/* Sample data: more dependencies for the first department user (Erik Karlsson), so the Blocked by other Tasks and Blocking other
   Tasks cards have several rows. Three of Erik's Tasks wait on Tasks owned by others, and two of Erik's open Tasks block Tasks
   owned by others. Each pair is on one Case, as the Task editor requires. Idempotent by Task id.
   Loaded after aa-sample-task-dependencies.js (TASKS, S, CASE_DETAILS, USERS). */
(function () {
  const erik = USERS.find(u => u.id === 'erik');
  const others = USERS.filter(u => u.role === 'User' && u.id !== 'erik');
  const cases = Object.values(CASE_DETAILS);
  if (!erik || !others.length || !cases.length) return;
  S.taskDependencies = S.taskDependencies || {};

  const add = (id, title, owner, c, due, status) => {
    if (TASKS.some(t => t[8] === id)) return false;
    // Same column order as every other Task row.
    TASKS.push([title, c.id, c.customer, owner.department, owner.name, 'High', due, status, id, 'Transport booking', 'Later']);
    return true;
  };

  // Erik waits on others: Erik's Task (To-Do) is blocked by another user's open Task.
  const waiting = [
    ['TASK-6401', 'Arrange loading slot', '14/10/2026'],
    ['TASK-6402', 'Confirm customs papers', '15/10/2026'],
    ['TASK-6403', 'Send final invoice', '16/10/2026'],
  ];
  waiting.forEach(([id, title, due], i) => {
    const c = cases[(i + 2) % cases.length];
    const blocker = `TASK-${6411 + i}`;
    const blockerOwner = others[i % others.length];
    if (add(blocker, `${title} (prerequisite)`, blockerOwner, c, '12/10/2026', 'In Progress') && add(id, title, erik, c, due, 'To-Do')) {
      S.taskDependencies[id] = [blocker];
    }
  });

  // Erik blocks others: Erik's open Task (In Progress) is the predecessor of another user's Task.
  const blocking = [
    ['TASK-6421', 'Prepare packing list', '11/10/2026'],
    ['TASK-6422', 'Book dock door', '11/10/2026'],
  ];
  blocking.forEach(([id, title, due], i) => {
    const c = cases[(i + 6) % cases.length];
    const dependent = `TASK-${6431 + i}`;
    const dependentOwner = others[(i + 1) % others.length];
    if (add(id, title, erik, c, due, 'In Progress') && add(dependent, `${title} follow-up`, dependentOwner, c, '13/10/2026', 'To-Do')) {
      S.taskDependencies[dependent] = [id];
    }
  });
})();
