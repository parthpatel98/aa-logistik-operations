/* Task Template Mapping: a library of tasks grouped by Department. A Task Template is built by picking
   tasks from this library (see the "From Department" picker added to the template editor in
   aa-templates.js), so a Case's Category and Case Type drive which template applies, and each task on
   that template already carries the Department that should own it.
   Picking a library task copies its defaults onto the template; editing or deleting the library entry
   afterwards does not change templates that already picked it — the same rule the rest of the masters
   follow. Seeded from the tasks already authored on the existing templates, deduplicated by name and
   department, so the screen opens with real data instead of empty. Loaded after aa-admin-core.js and
   aa-templates.js. */
(function () {
  const DEPTS = () => ALL_DEPTS.filter(d => d !== '—');
  const PRIS = ['Urgent', 'High', 'Medium', 'Low'];

  // Same relative-due model as the Task Template editor (AA_DUE in aa-templates.js).
  const parseDueText = s => { const d = AA_DUE.parse(s); return { base: d.base, amount: d.amount, unit: d.unit }; };
  const dueText = t => AA_DUE.text(t);
  window.AA_taskLibraryDueText = dueText;

  function seedLibrary() {
    if (window.MASTER_TASK_LIBRARY) return;
    const seen = new Set(), rows = [];
    MASTER_TASK_TEMPLATES.forEach(t => t.tasks.forEach(row => {
      const [title, dept, due, owner, pri, description = ''] = row, key = title + '|' + dept;
      if (seen.has(key)) return;
      seen.add(key);
      rows.push({ id: 'lib-' + rows.length, name: title, description, dept, owner, priority: pri, ...parseDueText(due), base: 'created' });
    }));
    window.MASTER_TASK_LIBRARY = rows;
  }
  seedLibrary();

  const libById = id => MASTER_TASK_LIBRARY.find(x => x.id === id);

  // The due time always counts from when the Task is created, so the form has no 'after' option.
  const DUE_TIP = 'Counted from the moment the task is created, so the due date and time are worked out at that point.';
  const DUE_LABEL = `<span style="display:inline-flex;align-items:center;gap:5px">Due<span role="img" aria-label="${DUE_TIP}" title="${DUE_TIP}" style="display:inline-flex;align-items:center;justify-content:center;width:12px;height:12px;border:1px solid var(--muted);border-radius:50%;color:var(--muted);font-size:8px;font-style:italic;font-weight:700;cursor:help">i</span></span>`;

  AA_ADMIN.forms.taskLibrary = {
    noun: 'Task',
    toggleable: true,
    blank: () => ({ name: '', description: '', dept: DEPTS()[0], priority: 'Medium', base: 'created', amount: 1, unit: 'hours' }),
    load: id => { const t = libById(id); return t && { ...t }; },
    fields: v => [
      { key: 'name', label: 'Task Name' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 3, aria: 'Task description' },
      { key: 'dept', label: 'Department', type: 'select', options: AA_ADMIN.options(DEPTS(), v.dept) },
      { label: DUE_LABEL, type: 'inline', parts: [
        { key: 'amount', type: 'number', aria: 'Due amount', width: '80px' },
        { key: 'unit', type: 'select', aria: 'Due unit', options: AA_DUE.UNITS, width: '120px' },
      ] },
      { key: 'priority', label: 'Priority', type: 'select', options: AA_ADMIN.options(PRIS, v.priority) },
    ],
    validate: v => {
      if (!v.name.trim()) return 'Enter a task name';
      if (!v.dept) return 'Select a department';
      if (v.amount === '' || Number(v.amount) < 0) return 'Enter a due number of 0 or more';
      return '';
    },
    save: (v, id) => {
      const row = { name: v.name.trim(), description: (v.description || '').trim(), dept: v.dept, priority: v.priority, base: 'created', amount: Number(v.amount), unit: v.unit };
      if (id) Object.assign(libById(id), row);
      else MASTER_TASK_LIBRARY.push({ id: 'lib-' + Date.now(), owner: 'Default', ...row });
    },
    remove: id => { const i = MASTER_TASK_LIBRARY.findIndex(x => x.id === id); if (i >= 0) MASTER_TASK_LIBRARY.splice(i, 1); },
  };

  window.setAdminTaskLibraryDept = value => { S.adminTaskLibraryDept = value; S.adminPage = S.adminPage || {}; S.adminPage.taskLibrary = 1; render(); };

  AA_ADMIN.panels['Task Template Mapping'] = () => {
    const filter = S.adminTaskLibraryDept || '';
    const filtered = filter ? MASTER_TASK_LIBRARY.filter(t => t.dept === filter) : MASTER_TASK_LIBRARY;
    const { pageRows, pager } = AA_ADMIN.paginate(filtered, 'taskLibrary', 12);
    const deptFilterOptions = [['', 'All departments'], ...DEPTS().map(d => [d, d])];
    const toolbar = `<label style="font-size:12px;font-weight:650;color:var(--ink-2,#3d4d63)">Department
        <select onchange="setAdminTaskLibraryDept(this.value)" style="height:36px;border:1px solid var(--line);border-radius:4px;padding:0 10px;font:inherit;margin-left:8px;background:#fff">
          ${deptFilterOptions.map(([v, l]) => `<option value="${editorText(v)}" ${v === filter ? 'selected' : ''}>${editorText(l)}</option>`).join('')}
        </select>
      </label>` + AA_ADMIN.addButton('taskLibrary', '+ Add Task');
    const rows = pageRows.map(t => [
      `<strong>${editorText(t.name)}</strong>`,
      editorText(t.dept),
      editorText(dueText(t)),
      masterPill(t.priority, /^(Urgent|High)$/.test(t.priority) ? 'amber' : ''),
      AA_ADMIN.statusPill(AA_ADMIN.isActive('taskLibrary', t.id)),
      AA_ADMIN.actions('taskLibrary', t.id, { remove: true }),
    ]);
    return AA_ADMIN.toolbar(toolbar)
      + masterTable(['Task', 'Department', 'Due', 'Priority', 'Status', ''], rows) + pager;
  };
})();
