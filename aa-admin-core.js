/* Administration core: the status registry, the shared add/edit dialog, row actions, pagination and the
   delete guard used by the admin screens in aa-admin-masters.js, aa-admin-users.js, aa-admin-blocklist.js,
   aa-admin-account-mapping.js and aa-admin-task-library.js. Each screen registers its form spec in
   AA_ADMIN.forms and its page in AA_ADMIN.panels. Status is session-only, like the rest of the prototype.
   Inactive values stay on existing records and are only left out of new selections. */
(function () {
  const IN = 'height:36px;border:1px solid var(--line);border-radius:4px;padding:0 10px;font:inherit;width:100%;box-sizing:border-box;background:#fff';
  const label = 'display:grid;gap:5px;font-size:12px;font-weight:650;color:var(--ink-2,#3d4d63)';

  // headActions: optional per-tab builders for buttons shown in the page heading, on the same line as the title.
  const AA_ADMIN = window.AA_ADMIN = { forms: {}, panels: {}, status: {}, headActions: {} };

  AA_ADMIN.isActive = (kind, id) => AA_ADMIN.status[kind + ':' + id] !== false;
  AA_ADMIN.setActive = (kind, id, active) => { AA_ADMIN.status[kind + ':' + id] = active; };
  AA_ADMIN.clearStatus = (kind, id) => { delete AA_ADMIN.status[kind + ':' + id]; };
  AA_ADMIN.statusPill = active => masterPill(active ? 'Active' : 'Inactive', active ? 'green' : '');
  // A value safe to place inside an onclick attribute: a quoted JavaScript string literal.
  const jsArg = value => editorText(JSON.stringify(String(value ?? '')));

  // Icon row actions with a native tooltip (title) on each. Edit is a pencil tilted to the right, and Delete
  // a bin. Active/Inactive is not on the list: it is a switch inside the Edit dialog (see AA_ADMIN.dialog).
  const iconBtn = (onclick, title, icon, color) => `<button type="button" onclick="${onclick}" title="${title}" aria-label="${title}" style="border:0;background:transparent;color:${color};cursor:pointer;font-size:15px;line-height:1;padding:5px;border-radius:4px">${icon}</button>`;
  // A switch that is on while the record is Active. `onclick` is the handler it runs when clicked.
  AA_ADMIN.switch = (onclick, active, title) => `<button type="button" role="switch" aria-checked="${active}" onclick="${onclick}" title="${title}" aria-label="${title}" style="position:relative;width:34px;height:18px;border:0;border-radius:999px;padding:0;margin:0;cursor:pointer;background:${active ? '#188756' : '#c3ccd6'};flex:0 0 auto">`
    + `<span style="position:absolute;top:2px;left:${active ? 18 : 2}px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:left .15s"></span></button>`;
  AA_ADMIN.actions = (kind, id, { edit = true, remove = false } = {}) => {
    const arg = jsArg(id);
    // The pencil is mirrored so it tilts to the right, the same on every screen.
    const editGlyph = '<span style="display:inline-block;transform:scaleX(-1)">✎</span>';
    return `<div style="display:flex;gap:2px;justify-content:flex-end;align-items:center;white-space:nowrap">`
      + (edit ? iconBtn(`adminOpen('${kind}',${arg})`, 'Edit', editGlyph, 'var(--blue)') : '')
      + (remove ? iconBtn(`adminDelete('${kind}',${arg})`, 'Delete', '🗑', 'var(--red-ink,#c51f2d)') : '')
      + `</div>`;
  };

  AA_ADMIN.toolbar = (buttons) => `<div style="display:flex;justify-content:flex-end;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap">${buttons}</div>`;
  AA_ADMIN.addButton = (kind, text) => `<button type="button" class="btn primary" onclick="adminOpen('${kind}')">${text}</button>`;

  // Pagination: the same numbered-page strip the Cases/Review Requests list uses (case-pager classes,
  // already styled in aa-app.css), so admin tables page the same way as the rest of the app.
  // S.adminPage[key] / S.adminPageSize[key] hold the current page and page size per list.
  AA_ADMIN.pageSizes = [10, 25, 50];
  AA_ADMIN.paginate = (rows, key, defaultSize = 10) => {
    S.adminPage = S.adminPage || {};
    S.adminPageSize = S.adminPageSize || {};
    const pageSize = AA_ADMIN.pageSizes.includes(S.adminPageSize[key]) ? S.adminPageSize[key] : defaultSize;
    const total = rows.length, pages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(Math.max(1, S.adminPage[key] || 1), pages);
    S.adminPage[key] = page;
    const start = (page - 1) * pageSize;
    const pageRows = rows.slice(start, start + pageSize);
    const shown = [...Array(pages)].map((_, i) => i + 1).filter(n => n === 1 || n === pages || Math.abs(n - page) <= 1);
    let nums = '', prev = 0;
    shown.forEach(n => {
      if (prev && n - prev > 1) nums += `<span class="case-pager-gap">…</span>`;
      nums += `<button type="button" class="case-pager-num${n === page ? ' active' : ''}" onclick="adminGoPage('${key}',${n})" aria-current="${n === page ? 'page' : 'false'}">${n}</button>`;
      prev = n;
    });
    const pager = total === 0 ? '' : `<div class="case-pager"><span class="sub">Showing ${start + 1}–${Math.min(start + pageSize, total)} of ${total}</span><div class="case-pager-controls"><button type="button" class="icon-btn" ${page <= 1 ? 'disabled' : ''} title="Previous page" aria-label="Previous page" onclick="adminGoPage('${key}',${page - 1})">‹</button>${nums}<button type="button" class="icon-btn" ${page >= pages ? 'disabled' : ''} title="Next page" aria-label="Next page" onclick="adminGoPage('${key}',${page + 1})">›</button><label class="case-pager-size">Rows per page<select aria-label="Rows per page" onchange="adminSetPageSize('${key}',this.value)">${AA_ADMIN.pageSizes.map(n => `<option value="${n}" ${pageSize === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label></div></div>`;
    return { pageRows, pager, page, pages, total };
  };
  window.adminGoPage = (key, page) => { S.adminPage = S.adminPage || {}; S.adminPage[key] = page; render(); };
  window.adminSetPageSize = (key, size) => { S.adminPageSize = S.adminPageSize || {}; S.adminPageSize[key] = parseInt(size, 10) || 10; S.adminPage = S.adminPage || {}; S.adminPage[key] = 1; render(); };

  // Form dialog. A spec gives: noun, fields(values, isEdit), blank(), load(id), validate(values, id),
  // save(values, id) and optionally remove(id), inUse(id) (returns a message when the value is referenced),
  // cannotDeactivate(id) and toggleable (adds an Active/Inactive switch to the dialog when editing).
  AA_ADMIN.dialog = () => {
    const f = S.adminForm;
    if (!f) return '';
    const spec = AA_ADMIN.forms[f.kind], edit = !!f.id;
    const active = edit ? AA_ADMIN.isActive(f.kind, f.id) : true;
    const controlFor = (x, value, style) => {
      const aria = x.aria ? `aria-label="${editorText(x.aria)}"` : '';
      return x.type === 'select'
        ? `<select ${aria} onchange="adminFormField('${x.key}',this.value)" style="${style}">${x.options.map(([v, l]) => `<option value="${editorText(v)}" ${v === value ? 'selected' : ''}>${editorText(l)}</option>`).join('')}</select>`
        : x.type === 'textarea'
        ? `<textarea ${aria} onchange="adminFormField('${x.key}',this.value)" rows="${x.rows || 5}" style="${style};height:auto;padding:8px 10px;resize:vertical;font-family:inherit">${editorText(value)}</textarea>`
        : `<input ${aria} type="${x.type === 'email' ? 'email' : x.type === 'number' ? 'number' : x.type === 'password' ? 'password' : 'text'}" ${x.type === 'number' ? 'min="0"' : ''} ${x.type === 'password' ? 'autocomplete="off"' : ''} value="${editorText(value)}" ${x.readonly ? 'readonly' : ''} onchange="adminFormField('${x.key}',this.value)" style="${style}${x.readonly ? ';background:var(--bg)' : ''}">`;
    };
    const hintFor = x => x.hint ? `<small style="color:var(--muted);font-weight:500">${editorText(x.hint)}</small>` : '';
    const fields = spec.fields(f.values, edit).map(x => {
      // A html field is a block the spec draws itself (e.g. a row of insert buttons), with no label or input.
      if (x.type === 'html') return x.html(f.values, edit);
      // An inline field lays several controls out as one sentence, e.g. "Due [2] [Hours] after [Task created]".
      if (x.type === 'inline') return `<div style="${label}">${x.label}<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">${x.parts.map(p => typeof p === 'string'
        ? `<span style="font-weight:500;color:var(--ink)">${editorText(p)}</span>`
        : controlFor(p, f.values[p.key] ?? '', `${IN};${p.width ? `width:${p.width};flex:0 0 auto` : 'width:auto;flex:1;min-width:180px'}`)).join('')}</div>${hintFor(x)}</div>`;
      return `<label style="${label}">${x.label}${controlFor(x, f.values[x.key] ?? '', IN)}${hintFor(x)}</label>`;
    }).join('');
    // Active/Inactive lives in the dialog: a switch row under the fields, shown only when editing.
    const status = edit && spec.toggleable
      ? `<div style="${label}">Status<div style="display:flex;align-items:center;gap:10px;font-weight:500;color:var(--ink)">${AA_ADMIN.switch('adminFormToggle()', active, active ? 'Deactivate' : 'Activate')}<span>${active ? 'Active' : 'Inactive'}</span></div></div>`
      : '';
    return `<div onclick="if(event.target===this)adminFormClose()" style="position:fixed;inset:0;background:rgba(5,24,42,.46);z-index:2100;display:grid;place-items:center;padding:24px">
      <div style="width:520px;max-width:94vw;max-height:90vh;display:flex;flex-direction:column;background:#fff;border-radius:7px;box-shadow:0 22px 60px rgba(0,0,0,.25)">
        <div style="padding:16px 20px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between">
          <b style="font-size:15px;color:var(--ink)">${edit ? 'Edit' : 'Add'} ${spec.noun}</b>
          <button type="button" onclick="adminFormClose()" aria-label="Close" style="border:0;background:transparent;cursor:pointer;color:var(--muted);font-size:18px;line-height:1;padding:4px">×</button>
        </div>
        <div style="padding:16px 20px;display:flex;flex-direction:column;gap:12px;overflow:auto;flex:1">
          ${fields}
          ${status}
          ${f.error ? `<div role="alert" style="color:var(--red-ink,#c51f2d);font-size:12px;font-weight:650">${editorText(f.error)}</div>` : ''}
        </div>
        <div style="padding:13px 20px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:9px">
          <div style="display:flex;gap:9px">
            ${edit && spec.remove ? `<button type="button" onclick="adminFormDelete()" style="border:1px solid var(--red-ink,#c51f2d);background:#fff;color:var(--red-ink,#c51f2d);border-radius:4px;padding:9px 15px;font:inherit;font-weight:700;cursor:pointer">Delete</button>` : ''}
          </div>
          <div style="display:flex;gap:9px"><button type="button" class="btn" onclick="adminFormClose()">Cancel</button><button type="button" class="btn primary" onclick="adminFormSave()">Save</button></div>
        </div>
      </div></div>`;
  };

  window.adminOpen = (kind, id) => {
    const spec = AA_ADMIN.forms[kind];
    const values = id ? spec.load(id) : spec.blank();
    if (!values) return;
    S.adminForm = { kind, id: id || null, values, error: '' };
    render();
  };
  // Re-rendering on every keystroke/change replaces the whole dialog's DOM (render() rewrites
  // #root via innerHTML), which can swap out the button the user is mid-click on (mousedown blurs
  // the field, firing this onchange, before the click's mouseup lands) and silently swallow the
  // click. Only re-render when there is a visible error to clear; a plain value change needs no redraw.
  window.adminFormField = (key, value) => { S.adminForm.values[key] = value; if (S.adminForm.error) { S.adminForm.error = ''; render(); } };
  window.adminFormClose = () => { S.adminForm = null; render(); };
  window.adminFormSave = () => {
    const f = S.adminForm, spec = AA_ADMIN.forms[f.kind];
    const error = spec.validate(f.values, f.id);
    // The message is shown in the dialog and as a toast, because the dialog body scrolls and the error can sit out of view.
    if (error) { f.error = error; toast(error); render(); return; }
    spec.save(f.values, f.id);
    S.adminForm = null;
    toast(`${spec.noun} ${f.id ? 'updated' : 'added'}`);
    render();
  };
  window.adminFormDelete = () => {
    const f = S.adminForm, spec = AA_ADMIN.forms[f.kind];
    const blocked = spec.inUse ? spec.inUse(f.id) : '';
    if (blocked) { f.error = blocked; render(); return; }
    if (!window.confirm(`Delete this ${spec.noun.toLowerCase()}? This cannot be undone. Existing records are not changed.`)) return;
    spec.remove(f.id);
    AA_ADMIN.clearStatus(f.kind, f.id);
    S.adminForm = null;
    toast(`${spec.noun} deleted`);
    render();
  };
  window.adminDelete = (kind, id) => {
    S.adminForm = { kind, id, values: AA_ADMIN.forms[kind].load(id) || {}, error: '' };
    window.adminFormDelete();
  };
  window.adminToggle = (kind, id) => {
    const spec = AA_ADMIN.forms[kind], active = AA_ADMIN.isActive(kind, id);
    const blocked = active && spec.cannotDeactivate ? spec.cannotDeactivate(id) : '';
    if (blocked) { toast(blocked); return; }
    AA_ADMIN.setActive(kind, id, !active);
    toast(`${spec.noun} ${active ? 'set to Inactive' : 'set to Active'}`);
    render();
  };
  // Toggle from inside the dialog footer: the dialog stays open and its button label flips.
  window.adminFormToggle = () => {
    const f = S.adminForm;
    if (f && f.id) window.adminToggle(f.kind, f.id);
  };

  // Unique, sorted-as-given options for a select, always keeping the value the record already holds.
  AA_ADMIN.options = (values, current) => [...new Set([...values, current].map(v => String(v ?? '').trim()).filter(Boolean))].map(v => [v, v]);
  AA_ADMIN.jsArg = jsArg;
})();
