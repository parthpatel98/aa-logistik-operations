/* Dependencies in the Task drawer (view) and the New Task drawer (create), in the Asana pattern:
   - The section starts with one "Add dependencies" link.
   - Opening it shows a relation switch (Blocked by / Blocking) and a "Find a task" search. Several Tasks can be
     picked in one go; the list stays open until Done or Escape.
   - Picked Tasks appear as rows with their relation, status, name, due date and a remove ×.
   A link is stored once (the blocked Task lists its blocker). The other Task shows the reverse relation, so
   Task 1 "Blocked by" Task 2 shows as Task 2 "Blocking" Task 1.
   View mode saves through toggleTaskDependency (same-case and no-circular rules apply). Create mode keeps the
   picks in S.editorData until Add Task. Loaded last so it wraps taskDrawer, editorDialog and saveEditor. */
(function () {
  const LIMIT = 8;
  const STYLE = '<style id="task-deps-style">'
    + '.tdep{display:grid;gap:10px;padding:14px 0;border-top:1px solid var(--line);font-family:Inter,Segoe UI,Arial,sans-serif}'
    + '.tdep-head{display:flex;align-items:center;justify-content:space-between;gap:10px}'
    + '.tdep-title{font-weight:700;font-size:13px}'
    + '.tdep-add{border:0;background:none;padding:0;color:var(--muted);font:inherit;font-size:13px;cursor:pointer}'
    + '.tdep-add:hover{color:var(--blue)}'
    + '.tdep-rows{display:grid;gap:6px}'
    + '.tdep-row{display:grid;grid-template-columns:96px minmax(0,1fr) auto;gap:10px;align-items:center;border:1px solid var(--line);border-radius:6px;padding:7px 8px 7px 10px;font-size:13px;background:#fff}'
    + '.tdep-rel{font-size:12.5px;color:var(--muted)}'
    + '.tdep-task{display:flex;align-items:center;gap:8px;min-width:0}'
    + '.tdep-name{border:0;background:none;padding:0;font:inherit;color:var(--ink);text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;min-width:0}'
    + '.tdep-name:hover{color:var(--blue);text-decoration:underline}'
    + '.tdep-meta{color:var(--muted);font-size:12px;white-space:nowrap}'
    + '.tdep-x{border:0;background:none;color:var(--muted);cursor:pointer;font-size:16px;line-height:1;padding:0 2px}.tdep-x:hover{color:#c51f2d}'
    + '.tdep-icon{display:inline-block;width:12px;height:12px;border-radius:50%;border:2px solid #d93b3b;flex:none}'
    + '.tdep-icon.done{border-color:#2f9e5b;background:#2f9e5b}'
    + '.tdep-editor{border:1px solid #9fc2e3;border-radius:8px;padding:8px;background:#fff;box-shadow:0 6px 18px rgba(17,39,65,.10)}'
    + '.tdep-bar{display:flex;gap:8px;align-items:center}'
    + '.tdep-kind{height:34px;border:1px solid var(--line);border-radius:6px;padding:0 8px;font:inherit;font-size:13px;background:#fff;flex:none}'
    + '.tdep-search{flex:1;min-width:0;height:34px;border:1px solid var(--line);border-radius:6px;padding:0 10px;font:inherit;box-sizing:border-box;background:#fff}'
    + '.tdep-done{height:34px;border:1px solid var(--line);border-radius:6px;padding:0 12px;background:#fff;font:inherit;font-size:13px;cursor:pointer;flex:none}'
    + '.tdep-results{margin-top:8px;max-height:240px;overflow:auto;display:grid;gap:2px}'
    + '.tdep-option{display:flex;align-items:center;gap:9px;width:100%;border:0;background:none;padding:7px 8px;border-radius:6px;text-align:left;font:inherit;font-size:13px;cursor:pointer;color:var(--ink)}'
    + '.tdep-option:hover:not(:disabled){background:#f2f7fc}'
    + '.tdep-option:disabled{color:#a3adba;cursor:not-allowed}'
    + '.tdep-option .tdep-check{width:16px;color:var(--blue);font-weight:700;flex:none;text-align:center}'
    + '.tdep-option .tdep-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}'
    + '.tdep-option .tdep-sub{margin-left:auto;color:var(--muted);font-size:11.5px;white-space:nowrap}'
    + '.tdep-empty{padding:8px;color:var(--muted);font-size:12.5px}'
    + '.tdep-hint{margin:0;color:var(--muted);font-size:12px}'
    + '</style>';
  document.head.insertAdjacentHTML('beforeend', STYLE);

  const isDone = t => effectiveTaskStatus(t) === 'Completed';
  const keyFor = kind => (kind === 'blockedBy' ? 'dependencies' : 'blocking');
  const otherKind = kind => (kind === 'blockedBy' ? 'blocking' : 'blockedBy');
  const ownerOf = (mode, taskId) => (mode === 'create' ? 'create' : taskId);
  const linkedIds = (kind, mode, taskId) => {
    if (mode === 'create') return [...((S.editorData && S.editorData[keyFor(kind)]) || [])];
    return kind === 'blockedBy' ? dependencyIds(taskId) : blockingTaskIds(taskId);
  };
  const caseFor = (mode, taskId) => (mode === 'create' ? S.editorData.caseId : taskById(taskId)[1]);
  const editorOpen = owner => !!(S.depEditor && S.depEditor.open && S.depEditor.owner === owner);
  const relationLabel = kind => (kind === 'blockedBy' ? 'Blocked by' : 'Blocking');

  // Candidates for the open relation: Tasks on the same Case, not this Task. Picked Tasks stay listed (with a
  // check) so they can be unpicked. View: a Task that would close a loop is disabled. Create: a Task already
  // picked under the other relation is disabled.
  function options(kind, mode, taskId, query) {
    const caseId = caseFor(mode, taskId);
    const picked = linkedIds(kind, mode, taskId);
    const other = mode === 'create' ? linkedIds(otherKind(kind), mode, taskId) : [];
    const q = String(query || '').trim().toLowerCase();
    return TASKS
      .filter(x => x[1] === caseId && x[8] !== taskId)
      .filter(x => !q || [x[0], x[8], x[3], x[4]].join(' ').toLowerCase().includes(q))
      .slice(0, LIMIT)
      .map(x => ({
        t: x,
        picked: picked.includes(x[8]),
        disabled: (mode === 'view' && (kind === 'blockedBy' ? dependencyCycle(taskId, x[8]) : dependencyCycle(x[8], taskId)))
          || other.includes(x[8]),
      }));
  }

  function optionHtml({ t, picked, disabled }, kind, mode, taskId) {
    const title = disabled && !picked
      ? (mode === 'view' ? 'Would create a circular dependency' : 'Already set under the other relation')
      : '';
    return `<button type="button" class="tdep-option" data-id="${t[8]}"${disabled && !picked ? ' disabled' : ''}${title ? ` title="${title}"` : ''} onmousedown="event.preventDefault();tdepToggle('${mode}','${taskId}','${t[8]}')">`
      + `<span class="tdep-check">${picked ? '✓' : ''}</span><i class="tdep-icon${isDone(t) ? ' done' : ''}"></i>`
      + `<span class="tdep-label">${editorText(t[0])}</span><span class="tdep-sub">${t[8]} · ${editorText(t[3])}</span></button>`;
  }

  function resultsHtml(kind, mode, taskId, query) {
    const list = options(kind, mode, taskId, query);
    if (!list.length) return `<div class="tdep-empty">${String(query || '').trim() ? 'No Tasks match. Only Tasks on this Case can be linked.' : 'No other Tasks on this Case.'}</div>`;
    return list.map(o => optionHtml(o, kind, mode, taskId)).join('');
  }

  function rowHtml(kind, id, mode, taskId) {
    const t = taskById(id);
    if (!t) return '';
    const remove = `tdepRemove('${kind}','${mode}','${taskId}','${id}')`;
    return `<div class="tdep-row"><span class="tdep-rel">${relationLabel(kind)}</span>`
      + `<span class="tdep-task"><i class="tdep-icon${isDone(t) ? ' done' : ''}" aria-label="${isDone(t) ? 'Completed' : 'Not completed'}"></i>`
      + (mode === 'view'
        ? `<button type="button" class="tdep-name" title="${editorText(t[0])}" onclick="openTask('${id}')">${editorText(t[0])}</button>`
        : `<span class="tdep-name" title="${editorText(t[0])}">${editorText(t[0])}</span>`)
      + `<span class="tdep-meta">${t[8]} · ${editorText(t[6])}</span></span>`
      + `<button type="button" class="tdep-x" aria-label="Remove ${id}" onclick="${remove}">×</button></div>`;
  }

  function editorHtml(mode, taskId) {
    const kind = S.depEditor.kind;
    return `<div class="tdep-editor"><div class="tdep-bar">`
      + `<select class="tdep-kind" aria-label="Relation" onchange="tdepKind(this.value)"><option value="blockedBy"${kind === 'blockedBy' ? ' selected' : ''}>Blocked by</option><option value="blocking"${kind === 'blocking' ? ' selected' : ''}>Blocking</option></select>`
      + `<input id="tdep-search" class="tdep-search" type="search" autocomplete="off" aria-label="Find a task" placeholder="Find a task" data-kind="${kind}" data-mode="${mode}" data-task="${taskId}" oninput="tdepSearch(this)" onkeydown="tdepKey(event,this)">`
      + `<button type="button" class="tdep-done" onclick="tdepClose()">Done</button></div>`
      + `<div class="tdep-results">${resultsHtml(kind, mode, taskId, '')}</div></div>`;
  }

  function section(mode, taskId) {
    const owner = ownerOf(mode, taskId);
    const open = editorOpen(owner);
    const rows = [
      ...linkedIds('blockedBy', mode, taskId).map(id => rowHtml('blockedBy', id, mode, taskId)),
      ...linkedIds('blocking', mode, taskId).map(id => rowHtml('blocking', id, mode, taskId)),
    ].join('');
    const addButton = open ? '' : `<button type="button" class="tdep-add" onclick="tdepOpen('${owner}','${mode}','${taskId}')">Add dependencies</button>`;
    return `<section class="tdep" aria-label="Dependencies"><div class="tdep-head"><span class="tdep-title">Dependencies</span>${addButton}</div>`
      + (rows ? `<div class="tdep-rows">${rows}</div>` : '')
      + (open ? editorHtml(mode, taskId) : '')
      + '</section>';
  }

  // Search as the user types: only the result list is redrawn, so the input keeps focus.
  window.tdepSearch = input => {
    const { kind, mode, task } = input.dataset;
    const box = input.closest('.tdep-editor').querySelector('.tdep-results');
    box.innerHTML = resultsHtml(kind, mode, task, input.value);
  };
  window.tdepKey = (event, input) => {
    if (event.key === 'Escape') { window.tdepClose(); return; }
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const first = input.closest('.tdep-editor').querySelector('.tdep-option:not([disabled])');
    if (first) { const { mode, task } = input.dataset; window.tdepToggle(mode, task, first.dataset.id); }
  };
  const focusSearch = () => setTimeout(() => { const i = document.getElementById('tdep-search'); if (i) i.focus(); }, 0);

  window.tdepOpen = (owner, mode, taskId) => {
    S.depEditor = { owner, kind: 'blockedBy', open: true };
    render();
    focusSearch();
  };
  window.tdepClose = () => { S.depEditor = null; render(); };
  window.tdepKind = value => { S.depEditor.kind = value; render(); focusSearch(); };

  // Toggle one Task under the open relation. Adding a Task closes the list; to add another, press "Add dependencies"
  // again. Unpicking a Task keeps the list open.
  window.tdepToggle = (mode, taskId, id) => {
    const kind = S.depEditor ? S.depEditor.kind : 'blockedBy';
    const picked = linkedIds(kind, mode, taskId).includes(id);
    const adding = !picked;
    if (adding) S.depEditor = null;
    if (mode === 'view') {
      if (kind === 'blockedBy') toggleTaskDependency(taskId, id, !picked);
      else toggleTaskDependency(id, taskId, !picked);
    } else {
      const key = keyFor(kind);
      const current = S.editorData[key] || [];
      S.editorData[key] = picked ? current.filter(x => x !== id) : [...current, id];
      render();
    }
    if (!adding) focusSearch();
  };
  window.tdepRemove = (kind, mode, taskId, id) => {
    if (mode === 'view') {
      if (kind === 'blockedBy') toggleTaskDependency(taskId, id, false);
      else toggleTaskDependency(id, taskId, false);
      return;
    }
    const key = keyFor(kind);
    S.editorData[key] = (S.editorData[key] || []).filter(x => x !== id);
    render();
  };

  // View: the section sits after the Description field in the Task drawer.
  const taskDrawerBase = taskDrawer;
  taskDrawer = function () {
    const html = taskDrawerBase();
    const t = taskById(S.selectedTask);
    if (!t) return html;
    const template = document.createElement('template');
    template.innerHTML = html;
    const body = template.content.querySelector('aside.drawer')?.children[1];
    if (!body || body.querySelector('.tdep') || !body.querySelector('textarea')) return html;
    const description = [...body.querySelectorAll('textarea')].pop().closest('label');
    const holder = document.createElement('div');
    holder.innerHTML = section('view', t[8]);
    const block = holder.firstElementChild;
    if (description) description.after(block); else body.append(block);
    return template.innerHTML;
  };

  // Create: the old checkbox list is replaced by the same section.
  const editorDialogBase = editorDialog;
  editorDialog = function () {
    const html = editorDialogBase();
    if (S.editorType !== 'newTask') return html;
    const template = document.createElement('template');
    template.innerHTML = html;
    // The old block is the "Dependencies" title, its subtitle and the checkbox list, which are siblings in the drawer body.
    const heading = [...template.content.querySelectorAll('.ptf-section-title')].find(h => h.textContent.trim() === 'Dependencies');
    if (!heading) return html;
    const old = [heading];
    for (let n = heading.nextElementSibling; n && n.matches('.ptf-section-sub, .proposed-dependency-list'); n = n.nextElementSibling) old.push(n);
    const holder = document.createElement('div');
    holder.innerHTML = section('create', '');
    heading.before(holder.firstElementChild);
    old.forEach(e => e.remove());
    return template.innerHTML;
  };

  // Create: after the new Task is saved, the Tasks chosen under "Blocking" are blocked by it.
  const saveEditorBase = saveEditor;
  saveEditor = function () {
    if (S.editorType !== 'newTask') return saveEditorBase();
    const blocking = [...((S.editorData && S.editorData.blocking) || [])];
    const caseId = S.editorData && S.editorData.caseId;
    const before = new Set(TASKS.map(t => t[8]));
    saveEditorBase();
    const created = TASKS.find(t => !before.has(t[8]));
    if (!created || !blocking.length) return;
    blocking.forEach(id => {
      const current = dependencyIds(id);
      S.taskDependencies[id] = current.includes(created[8]) ? current : [...current, created[8]];
    });
    recalculateDependencies(caseId);
    render();
  };
})();
