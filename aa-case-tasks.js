/* Case Tasks from the Masters. Each Case gets the Task Template tasks that fit its Case Class and
   customer, so every Case ends with 3 to 7 Tasks. Existing Tasks are kept, and a Task already on the
   Case is not added twice. Loaded last, after the Case and Task data. */
(function () {
  const MIN_TASKS = 3, MAX_TASKS = 7;
  const PRIORITY = { Urgent: 'Urgent', High: 'High', Normal: 'Medium', Medium: 'Medium', Low: 'Low' };
  const DEPARTMENT_CLASSIFICATION = { Transport: 'Transport booking', Warehouse: 'Warehouse storage', Packing: 'Packing preparation' };
  const template = id => MASTER_TASK_TEMPLATES.find(t => t.id === id);

  // The Templates that fit a Case, from its Case Class, Classification and customer.
  function matchedTemplates(c) {
    const text = `${c.caseClass} ${c.classification}`.toLowerCase(), ids = [];
    const inquiry = /inquiry|price|quot/.test(text);
    if (inquiry) ids.push('transport-inquiry');
    if (/warehouse/.test(text)) ids.push('warehouse-order');
    if (/packing/.test(text)) ids.push('packing-order');
    if (!inquiry && /abb/i.test(c.customer)) ids.push('abb-order');
    if (/transport|booking|order/.test(text) || !ids.length) ids.push('transport-order');
    return ids.map(template).filter(Boolean);
  }

  // Master Tasks for a Case. Transport Templates are added only while the Case has fewer than MIN_TASKS.
  function masterTasksFor(c) {
    const picked = [];
    const add = tpl => tpl.tasks.forEach(([title, dept, , , pri]) => {
      if (picked.length < MAX_TASKS && !picked.some(p => p.title === title)) picked.push({ title, dept, pri });
    });
    matchedTemplates(c).forEach(add);
    if (picked.length < MIN_TASKS) add(template('transport-order'));
    if (picked.length < MIN_TASKS) add(template('transport-inquiry'));
    return picked;
  }

  Object.values(CASE_DETAILS).forEach(c => {
    let total = TASKS.filter(t => t[1] === c.id).length;
    masterTasksFor(c).forEach(task => {
      if (total >= MAX_TASKS || TASKS.some(t => t[1] === c.id && t[0] === task.title)) return;
      const cls = DEPARTMENT_CLASSIFICATION[task.dept] || 'Transport booking';
      const owner = taskOwnerFor(cls);
      TASKS.push([task.title, c.id, c.customer, owner.department, owner.name, PRIORITY[task.pri] || 'Medium', c.due, 'To-Do', nextTaskNumber(), cls, 'Later']);
      total++;
    });
  });

  // Spread Tasks over every member of each department, instead of one person per routing rule.
  const turns = {};
  TASKS.forEach(t => {
    const team = USERS.filter(u => u.department === t[3]);
    if (t[4] === 'Unassigned' || !team.length) return;
    turns[t[3]] = (turns[t[3]] || 0) + 1;
    t[4] = team[turns[t[3]] % team.length].name;
  });
})();
