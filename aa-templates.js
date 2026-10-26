(function () {
  const IN = 'height:36px;border:1px solid #c9d5e1;border-radius:4px;padding:0 10px;font:inherit;width:100%;box-sizing:border-box;background:#fff';
  // Due is relative, Asana style: "Due 2 hours after Task created". The clock starts either when the
  // Task is created or when it moves to In Progress.
  const BASES = [['created', 'Task created'], ['started', 'Task started (In Progress)']];
  const UNITS = [['minutes', 'Minutes'], ['hours', 'Hours'], ['days', 'Days']];
  // Only Active values are offered; a template keeps its current value even if that value is now Inactive.
  const CATS = current => MASTER_CATEGORIES.map(x => x[0]).filter(n => n === current || AA_ADMIN.isActive('categories', n));
  const CASE_TYPES = current => MASTER_CASE_CLASSES.map(x => x[0]).filter(n => n === current || AA_ADMIN.isActive('caseTypes', n));
  const DEPTS = () => ALL_DEPTS.filter(d => d !== '—');
  const PRIS = ['High', 'Normal', 'Low'];

  const unitOf = u => { u = u.toLowerCase(); return u.startsWith('m') ? 'minutes' : u.startsWith('h') ? 'hours' : 'days'; };
  function parseDue(s) {
    const str = String(s || '');
    let m = str.match(/^Due\s+(\d+)\s*(minutes?|min|hours?|h|days?)\s+after\s+(creation|start)/i);
    if (m) return { base: m[3].toLowerCase() === 'start' ? 'started' : 'created', amount: Number(m[1]), unit: unitOf(m[2]), cond: str.slice(m[0].length) };
    // Older wording ("Due +2 h", "Due Pickup − 2 h"): a Pickup or Arrival anchor becomes "after start".
    m = str.match(/^Due\s+(?:(Pickup|Arrival)\s+)?[+−-]\s*(\d+)\s*(min|h|hours?|days?)/i);
    if (m) return { base: m[1] ? 'started' : 'created', amount: Number(m[2]), unit: unitOf(m[3]), cond: str.slice(m[0].length) };
    return { base: 'created', amount: 1, unit: 'hours', cond: '' };
  }
  function dueText(d) {
    const n = Number(d.amount) || 0, word = { minutes: 'minute', hours: 'hour', days: 'day' }[d.unit] || 'hour';
    return `Due ${n} ${word}${n === 1 ? '' : 's'} after ${d.base === 'started' ? 'start' : 'creation'}`;
  }
  // A template holds a list of Departments. Older templates stored one Department, which becomes a one-item list.
  MASTER_TASK_TEMPLATES.forEach(t => { t.departments = t.departments || (t.department ? [t.department] : []); delete t.department; });
  MASTER_TASK_TEMPLATES.forEach(t => t.tasks.forEach(x => { const d = parseDue(x[2]); x[2] = dueText(d) + d.cond; }));
  window.AA_DUE = { BASES, UNITS, parse: parseDue, text: dueText };
  function sel(pairs, val, handler, style, aria) {
    return `<select ${aria ? `aria-label="${aria}"` : ''} onchange="${handler}" style="${style || IN}">${pairs.map(([v, l]) => `<option value="${editorText(v)}" ${v === val ? 'selected' : ''}>${editorText(l)}</option>`).join('')}</select>`;
  }
  const simple = list => list.map(v => [v, v]);
  const selectedTpl = () => MASTER_TASK_TEMPLATES.find(x => x.id === (S.masterTemplate || 'transport-order')) || MASTER_TASK_TEMPLATES[0];

  window.tplNew = function () { S.tplForm = { mode: 'create', id: null, name: '', category: '', caseType: '', departments: [], tasks: [] }; render(); };
  window.tplEdit = function () {
    const t = selectedTpl();
    S.tplForm = { mode: 'edit', id: t.id, name: t.name, category: t.category || '', caseType: t.caseType || '', departments: [...t.departments], tasks: t.tasks.map(x => ({ title: x[0], dept: x[1], owner: x[3], pri: x[4], ...parseDue(x[2]) })) };
    render();
  };
  window.tplClose = function () { S.tplForm = null; render(); };
  window.tplField = function (k, v) { S.tplForm[k] = v; render(); };
  // Departments are a list: a template can cover several. Unticking one also removes its Tasks.
  window.tplSetDept = function (dept, on) {
    const f = S.tplForm;
    if (on) {
      if (!f.departments.includes(dept)) f.departments.push(dept);
      S.tplLibQuery = '';
    } else {
      const before = f.tasks.length;
      f.departments = f.departments.filter(d => d !== dept);
      f.tasks = f.tasks.filter(t => t.dept !== dept);
      const removed = before - f.tasks.length;
      if (removed) toast(`${removed} ${removed === 1 ? 'Task' : 'Tasks'} from ${dept} removed`);
    }
    render();
  };
  // Remembers whether the Department dropdown is open, so it stays open across the re-render after a tick.
  window.tplDeptOpenState = open => { S.tplDeptOpen = open; };
  window.tplTask = function (i, k, v) { S.tplForm.tasks[i][k] = k === 'amount' ? (Number(v) || 0) : v; render(); };
  window.tplTaskDel = function (i) { S.tplForm.tasks.splice(i, 1); render(); };
  // Search box for the mapping's own Department Library. Typing refreshes only the results list, so the
  // input keeps focus; a click adds the Task, copying its current defaults as an independent row.
  window.tplLibSearch = function (v) {
    S.tplLibQuery = v;
    const box = document.getElementById('tpl-lib-results');
    if (box) { box.innerHTML = tplLibResults(); box.hidden = false; }
  };
  window.tplAddFromLibrary = function (id) {
    const t = (window.MASTER_TASK_LIBRARY || []).find(x => x.id === id);
    if (!t) return;
    if (S.tplForm.tasks.some(x => x.title === t.name)) { toast('Already added to this template'); return; }
    S.tplForm.tasks.push({ title: t.name, dept: t.dept, owner: t.owner, pri: t.priority, base: t.base, amount: t.amount, unit: t.unit, cond: '' });
    S.tplLibQuery = '';
    toast('Task added from library');
    render();
  };
  window.tplSave = function () {
    const f = S.tplForm;
    if (!f.name.trim()) { toast('Enter a template name'); return; }
    if (!f.category || !f.caseType || !f.departments.length) { toast('Select a Category, Case Type and at least one Department'); return; }
    // Customer override is not editable here; an existing one on a template is left as it is.
    const obj = { name: f.name, category: f.category, caseType: f.caseType, departments: [...f.departments],
      scope: `${f.category} · ${f.caseType} · ${f.departments.join(', ')}`,
      // Due times always count from task creation, so the saved text never uses the removed After option.
      tasks: f.tasks.map(t => [t.title, t.dept, dueText({ ...t, base: 'created' }) + (t.cond || ''), t.owner, t.pri]) };
    if (f.mode === 'edit') Object.assign(MASTER_TASK_TEMPLATES.find(x => x.id === f.id), obj);
    else { const id = 'tpl-' + Date.now(); MASTER_TASK_TEMPLATES.push({ id, ...obj }); S.masterTemplate = id; }
    S.tplForm = null; toast('Template saved'); render();
  };
  window.tplDelete = function () {
    if (!window.confirm('Delete this template? This cannot be undone.')) return;
    const i = MASTER_TASK_TEMPLATES.findIndex(x => x.id === S.tplForm.id);
    if (i >= 0) MASTER_TASK_TEMPLATES.splice(i, 1);
    S.masterTemplate = null; S.tplForm = null; toast('Deleted'); render();
  };

  // Matching Library tasks for the template's Departments, filtered by the search text. Each Task keeps the
  // Department its Library entry belongs to, so a template can mix Tasks from every Department it covers.
  function tplLibResults() {
    const depts = S.tplForm.departments;
    if (!depts.length) return '<div style="padding:10px 12px;color:var(--muted);font-size:12px">Add a Department above to search its Library.</div>';
    const inDepts = depts.map(d => editorText(d)).join(', ');
    const q = (S.tplLibQuery || '').trim().toLowerCase();
    // Active Library tasks for this Department that match the search, in Library order. The first 8 are
    // listed; the count line says how many there are in total, so a search narrows the list down.
    // Tasks already on this template are left out, so every row offers something new to add.
    const all = (window.MASTER_TASK_LIBRARY || [])
      .filter(t => depts.includes(t.dept) && (!window.AA_ADMIN || AA_ADMIN.isActive('taskLibrary', t.id)) && (!q || t.name.toLowerCase().includes(q)))
      .filter(t => !S.tplForm.tasks.some(x => x.title === t.name));
    if (!all.length) return `<div style="padding:10px 12px;color:var(--muted);font-size:12px">No matching Library tasks in ${inDepts} left to add.</div>`;
    const shown = all.slice(0, 8);
    const rows = shown.map(t => `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid var(--line)">
        <div style="min-width:0"><div style="color:var(--ink)">${editorText(t.name)}</div><div style="color:var(--muted);font-size:12px">${editorText(t.dept)} · ${editorText(AA_DUE.text(t))} · ${editorText(t.priority)}</div></div>
        <button type="button" class="btn" onclick="tplAddFromLibrary('${t.id}')" aria-label="Add ${editorText(t.name)}">Add</button>
      </div>`).join('');
    const count = all.length > shown.length
      ? `Showing ${shown.length} of ${all.length} · type to narrow the list`
      : `${all.length} ${all.length === 1 ? 'task' : 'tasks'} in ${inDepts} Library`;
    return rows + `<div style="padding:8px 10px;color:var(--muted);font-size:12px">${count}</div>`;
  }
  // Department multi-select: one dropdown box. The chosen Departments show as chips inside it, and opening
  // it lists every Department with a checkbox.
  function tplDeptPicker(depts) {
    const chips = depts.length
      ? depts.map(d => `<span style="display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;padding:2px 10px;background:#eef6fd;font-size:12px;color:var(--ink);white-space:nowrap">${editorText(d)}</span>`).join('')
      : '<span style="color:var(--muted);font-weight:500">Select Departments</span>';
    const options = DEPTS().map(d => `<label style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:4px;cursor:pointer;color:var(--ink);font-weight:500">
        <input type="checkbox" ${depts.includes(d) ? 'checked' : ''} onchange="tplSetDept(${AA_ADMIN.jsArg(d)},this.checked)" style="width:15px;height:15px;margin:0">${editorText(d)}</label>`).join('');
    return `<div style="display:grid;gap:5px;font-size:12px;font-weight:650;color:var(--ink-2,#3d4d63)">Departments
      <details ${S.tplDeptOpen ? 'open' : ''} ontoggle="tplDeptOpenState(this.open)" style="position:relative">
        <summary aria-label="Departments" style="list-style:none;cursor:pointer;min-height:36px;box-sizing:border-box;border:1px solid var(--line);border-radius:4px;padding:4px 30px 4px 8px;background:#fff;display:flex;flex-wrap:wrap;gap:4px;align-items:center;font-size:13px">${chips}<span style="position:absolute;right:10px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:11px">▾</span></summary>
        <div style="position:absolute;z-index:30;left:0;right:0;top:100%;margin-top:4px;background:#fff;border:1px solid var(--line);border-radius:5px;box-shadow:0 8px 20px rgba(17,39,65,.15);padding:6px;max-height:260px;overflow:auto;font-size:13px">${options}</div>
      </details>
    </div>`;
  }
  // Search box with a dropdown of matching Library tasks. The dropdown opens when the box is focused or
  // typed in, and closes when focus leaves it. Its mousedown is cancelled so a click on a result does not
  // close it before the click lands.
  function tplLibraryPicker(depts) {
    const placeholder = depts.length ? `Search Library tasks in ${depts.join(', ')}` : 'Add a Department first';
    return `<div style="position:relative">
      <input type="search" autocomplete="off" aria-label="Search Library tasks" placeholder="${editorText(placeholder)}" ${depts.length ? '' : 'disabled'} value="${editorText(S.tplLibQuery || '')}" oninput="tplLibSearch(this.value)" onfocus="tplLibOpen(true)" onblur="tplLibOpen(false)" style="${IN}">
      <div id="tpl-lib-results" hidden onmousedown="event.preventDefault()" style="position:absolute;z-index:30;top:100%;left:0;right:0;margin-top:4px;border:1px solid var(--line);border-radius:5px;background:#fff;box-shadow:0 8px 20px rgba(17,39,65,.15);max-height:280px;overflow:auto">${tplLibResults()}</div>
    </div>`;
  }
  window.tplLibOpen = function (open) {
    const box = document.getElementById('tpl-lib-results');
    if (box) box.hidden = !open;
  };

  function tplModal() {
    const f = S.tplForm, edit = f.mode === 'edit';
    const label = 'display:grid;gap:5px;font-size:12px;font-weight:650;color:var(--ink-2,#3d4d63)';
    // Each Task is a card with two lines. The first holds the name and priority. The second holds the due
    // time (amount and unit) and the anchor it counts from. Each control takes only the width it needs.
    const taskLine = 'display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap';
    // Small info marker beside Due: the tooltip says when the due time starts counting.
    const dueTip = 'Counted from the moment the task is created, so the due date and time are worked out at that point.';
    const dueInfo = `<span role="img" aria-label="${dueTip}" title="${dueTip}" style="display:inline-flex;align-items:center;justify-content:center;width:12px;height:12px;border:1px solid var(--muted);border-radius:50%;color:var(--muted);font-size:8px;font-style:italic;font-weight:700;cursor:help">i</span>`;
    const rows = f.tasks.map((t, i) => `<div style="border:1px solid var(--line);border-radius:6px;background:#fff;padding:12px 14px;display:grid;gap:12px">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:12px;font-weight:650;color:var(--muted)">Task ${i + 1}</span>
        <button type="button" onclick="tplTaskDel(${i})" aria-label="Remove Task ${i + 1}" style="border:0;background:transparent;color:var(--red-ink,#c51f2d);cursor:pointer;font:inherit;font-size:12px;font-weight:600;padding:2px 4px">Remove</button>
      </div>
      <div style="${taskLine}">
        <label style="${label};flex:1 1 260px;min-width:0">Task name<input value="${editorText(t.title)}" onchange="tplTask(${i},'title',this.value)" style="${IN}"></label>
        <label style="${label};flex:0 0 150px">Priority${sel(simple(PRIS), t.pri, `tplTask(${i},'pri',this.value)`)}</label>
      </div>
      <div style="${taskLine}">
        <label style="${label}"><span style="display:inline-flex;align-items:center;gap:5px">Due${dueInfo}</span><span style="display:flex;gap:8px"><input type="number" min="0" aria-label="Due amount" value="${t.amount}" onchange="tplTask(${i},'amount',this.value)" style="${IN};width:90px">${sel(UNITS, t.unit, `tplTask(${i},'unit',this.value)`, IN + ';width:auto', 'Due unit')}</span></label>
      </div>
      ${t.cond ? `<div style="color:var(--muted);font-size:12px;margin-top:-4px">${editorText(t.cond.replace(/^\s*·\s*/, ''))}</div>` : ''}
    </div>`).join('');
    return `<div onclick="if(event.target===this)tplClose()" style="position:fixed;inset:0;background:rgba(5,24,42,.46);z-index:2100;display:grid;place-items:center;padding:24px">
      <div style="width:720px;max-width:94vw;max-height:90vh;display:flex;flex-direction:column;background:#fff;border-radius:7px;box-shadow:0 22px 60px rgba(0,0,0,.25)">
        <div style="padding:16px 20px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between">
          <b style="font-size:15px;color:var(--ink)">${edit ? 'Edit Task Template' : 'Add Task Template'}</b>
          <button type="button" onclick="tplClose()" aria-label="Close" style="border:0;background:transparent;cursor:pointer;color:var(--muted);font-size:18px;line-height:1;padding:4px">×</button>
        </div>
        <div style="padding:16px 20px;display:flex;flex-direction:column;gap:12px;overflow:auto;flex:1">
          <label style="${label}">Template Name<input value="${editorText(f.name)}" onchange="tplField('name',this.value)" style="${IN}"></label>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
            <label style="${label}">Category${sel([['', 'Select Category'], ...simple(CATS(f.category))], f.category, `tplField('category',this.value)`)}</label>
            <label style="${label}">Case Type${sel([['', 'Select Case Type'], ...simple(CASE_TYPES(f.caseType))], f.caseType, `tplField('caseType',this.value)`)}</label>
            ${tplDeptPicker(f.departments)}
          </div>
          <div style="margin-top:6px"><b style="font-size:13px;color:var(--ink)">Tasks</b></div>
          ${tplLibraryPicker(f.departments)}
          ${f.tasks.length ? rows : '<div style="color:var(--muted);font-size:12px">No Tasks yet. Search the Library above to add one.</div>'}
        </div>
        <div style="padding:13px 20px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:9px">
          <div>${edit ? '<button type="button" onclick="tplDelete()" style="border:1px solid var(--red-ink,#c51f2d);background:#fff;color:var(--red-ink,#c51f2d);border-radius:4px;padding:9px 15px;font:inherit;font-weight:700;cursor:pointer">Delete</button>' : ''}</div>
          <div style="display:flex;gap:9px"><button type="button" class="btn" onclick="tplClose()">Cancel</button><button type="button" class="btn primary" onclick="tplSave()">Save Template</button></div>
        </div>
      </div></div>`;
  }

  const taskMasterViewBase = taskMasterView;
  taskMasterView = function () {
    const toolbar = `<div style="display:flex;justify-content:flex-end;gap:8px;margin-bottom:12px"><button class="btn" onclick="tplEdit()" ${S.masterTemplate || MASTER_TASK_TEMPLATES.length ? '' : 'disabled'}>✎ Edit Template</button><button class="btn primary" onclick="tplNew()">+ Add Template</button></div>`;
    return toolbar + taskMasterViewBase() + (S.tplForm ? tplModal() : '');
  };
})();
