/* Masters: Categories, Case Types, Customers, Departments and Business Rules can all be created, edited
   and set Active or Inactive. Categories, Case Types and Departments are deleted only when nothing
   references them. Loaded after aa-admin-core.js. */
(function () {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cell = value => editorText(value) || '<span style="color:var(--muted)">—</span>';
  const splitList = value => String(value || '').split(',').map(x => x.trim());
  const IN = 'height:36px;border:1px solid var(--line);border-radius:4px;padding:0 10px;font:inherit;width:100%;box-sizing:border-box;background:#fff';

  // --- Additional categories, each with the department that would own the work. Skipped when a
  // same-named category already exists (Freight forwarding, Packing), so this never creates a duplicate. -
  [
    ['Transport booking', 'Transport', 'Booking and scheduling of transport orders'],
    ['Export', 'Freight forwarding', 'Outbound international freight forwarding'],
    ['Import', 'Freight forwarding', 'Inbound international freight forwarding'],
    ['Incoming', 'Inbound/Outbound', 'Incoming goods handling'],
    ['Outbound', 'Inbound/Outbound', 'Outbound goods handling'],
    ['Inspection', 'Warehouse', 'Goods and quality inspection'],
    ['Storage', 'Warehouse', 'Warehousing and storage'],
    ['Rebooking', 'Transport', 'Rebooking an existing transport order'],
    ['PO', 'Finance', 'Purchase order handling'],
    ['Invoice', 'Finance', 'Invoice queries and processing'],
    ['Credit note', 'Finance', 'Credit note requests and processing'],
    ['PO Confirmation', 'Finance', 'Purchase order confirmation'],
  ].forEach(row => { if (!MASTER_CATEGORIES.some(x => x[0].toLowerCase() === row[0].toLowerCase())) MASTER_CATEGORIES.push(row); });

  // --- Categories -------------------------------------------------------------------------
  AA_ADMIN.forms.categories = {
    noun: 'Category',
    toggleable: true,
    blank: () => ({ name: '', dept: ALL_DEPTS[0], covers: '' }),
    load: id => { const row = MASTER_CATEGORIES.find(x => x[0] === id); return row && { name: row[0], dept: row[1], covers: row[2] }; },
    fields: (v, edit) => [
      { key: 'name', label: 'Category', readonly: edit },
      { key: 'dept', label: 'Default Department', type: 'select', options: AA_ADMIN.options(ALL_DEPTS, v.dept) },
      { key: 'covers', label: 'Description' },
    ],
    validate: (v, id) => {
      const name = v.name.trim();
      if (!name) return 'Enter a category name';
      if (!id && MASTER_CATEGORIES.some(x => x[0].toLowerCase() === name.toLowerCase())) return 'This category already exists';
      if (!v.dept) return 'Select a default department';
      return '';
    },
    save: (v, id) => {
      const row = [v.name.trim(), v.dept, v.covers.trim()];
      if (id) MASTER_CATEGORIES[MASTER_CATEGORIES.findIndex(x => x[0] === id)] = row;
      else MASTER_CATEGORIES.push(row);
    },
    remove: id => { const i = MASTER_CATEGORIES.findIndex(x => x[0] === id); if (i >= 0) MASTER_CATEGORIES.splice(i, 1); },
    inUse: id => {
      const n = MASTER_TASK_TEMPLATES.filter(t => t.category === id).length;
      return n ? `Used by ${n} task template${n === 1 ? '' : 's'}. Set it to Inactive instead.` : '';
    },
  };

  AA_ADMIN.panels.Categories = () => AA_ADMIN.toolbar(AA_ADMIN.addButton('categories', '+ Add Category'))
    + masterTable(['Category', 'Default Department', 'Description', 'Status', ''], MASTER_CATEGORIES.map(x => [
      `<strong>${editorText(x[0])}</strong>`,
      cell(x[1]),
      cell(x[2]),
      AA_ADMIN.statusPill(AA_ADMIN.isActive('categories', x[0])),
      AA_ADMIN.actions('categories', x[0], { remove: true }),
    ]));

  // --- Case Types -------------------------------------------------------------------------
  const caseTypeUses = id => MASTER_TASK_TEMPLATES.filter(t => t.caseType === id).length
    + MASTER_REQUIRED_DATA.filter(x => x[1] === id).length
    + CASES.filter(row => splitList(row[2]).includes(id)).length
    + Object.values(CASE_DETAILS).filter(c => splitList(c.caseClass).includes(id)).length;

  AA_ADMIN.forms.caseTypes = {
    noun: 'Case Type',
    toggleable: true,
    blank: () => ({ name: '', description: '' }),
    load: id => { const row = MASTER_CASE_CLASSES.find(x => x[0] === id); return row && { name: row[0], description: row[1] }; },
    fields: (v, edit) => [
      { key: 'name', label: 'Case Type', readonly: edit },
      { key: 'description', label: 'Description' },
    ],
    validate: (v, id) => {
      const name = v.name.trim();
      if (!name) return 'Enter a case type name';
      if (!id && MASTER_CASE_CLASSES.some(x => x[0].toLowerCase() === name.toLowerCase())) return 'This case type already exists';
      return '';
    },
    // The Required Data Profile (row[2]) is no longer shown or edited here, but its value is kept as-is
    // on existing rows and defaults to 'None' for a new one — nothing else in the app loses it.
    save: (v, id) => {
      const existing = id && MASTER_CASE_CLASSES.find(x => x[0] === id);
      const row = [v.name.trim(), v.description.trim(), existing ? existing[2] : 'None'];
      if (id) MASTER_CASE_CLASSES[MASTER_CASE_CLASSES.findIndex(x => x[0] === id)] = row;
      else MASTER_CASE_CLASSES.push(row);
    },
    remove: id => { const i = MASTER_CASE_CLASSES.findIndex(x => x[0] === id); if (i >= 0) MASTER_CASE_CLASSES.splice(i, 1); },
    inUse: id => {
      const n = caseTypeUses(id);
      return n ? `Used by ${n} case or template record${n === 1 ? '' : 's'}. Set it to Inactive instead.` : '';
    },
  };

  AA_ADMIN.panels['Case Types'] = () => AA_ADMIN.toolbar(AA_ADMIN.addButton('caseTypes', '+ Add Case Type'))
    + masterTable(['Case Type', 'Description', 'Status', ''], MASTER_CASE_CLASSES.map(x => [
      `<strong>${editorText(x[0])}</strong>`,
      cell(x[1]),
      AA_ADMIN.statusPill(AA_ADMIN.isActive('caseTypes', x[0])),
      AA_ADMIN.actions('caseTypes', x[0], { remove: true }),
    ]));

  // --- Customers --------------------------------------------------------------------------
  const customerById = id => MASTER_CUSTOMERS.find(c => c.id === id);

  AA_ADMIN.forms.customers = {
    noun: 'Customer',
    toggleable: true,
    blank: () => ({ name: '', customerNumber: '', email: '', phone: '', address: '' }),
    load: id => {
      const c = customerById(id);
      return c && { name: c.name, customerNumber: c.customerNumber || '', email: c.email || '', phone: c.phone || '', address: c.address || '' };
    },
    fields: () => [
      { key: 'name', label: 'Company' },
      { key: 'customerNumber', label: 'Customer Number' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'phone', label: 'Phone' },
      { key: 'address', label: 'Address' },
    ],
    validate: (v, id) => {
      const name = v.name.trim();
      if (!name) return 'Enter the company name';
      if (!v.customerNumber.trim()) return 'Enter a customer number';
      if (MASTER_CUSTOMERS.some(c => c.id !== id && c.name.trim().toLowerCase() === name.toLowerCase())) return 'A customer with this name already exists';
      if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) return 'Enter a valid email address';
      return '';
    },
    save: (v, id) => {
      const data = { name: v.name.trim(), customerNumber: v.customerNumber.trim(), email: v.email.trim(), phone: v.phone.trim(), address: v.address.trim() };
      if (id) Object.assign(customerById(id), data);
      else MASTER_CUSTOMERS.push({ id: 'cust-' + Date.now(), orgNumber: '', priceList: 'Base', contacts: 0, ...data });
    },
  };

  AA_ADMIN.panels.Customers = () => {
    const q = (S.adminCustomerQuery || '').trim().toLowerCase();
    const filtered = MASTER_CUSTOMERS.filter(c => !q || [c.name, c.customerNumber, c.email, c.address].join(' ').toLowerCase().includes(q));
    const { pageRows, pager } = AA_ADMIN.paginate(filtered, 'customers', 15);
    const search = `<input aria-label="Search customers" value="${editorText(S.adminCustomerQuery || '')}" onchange="setAdminCustomerQuery(this.value)" placeholder="Search company, number, email or address" style="height:36px;border:1px solid var(--line);border-radius:4px;padding:0 10px;font:inherit;min-width:260px">`;
    return AA_ADMIN.toolbar(search + AA_ADMIN.addButton('customers', '+ Add Customer'))
      + `<div class="sub" style="margin-bottom:8px">${filtered.length} of ${MASTER_CUSTOMERS.length} customers</div>`
      + masterTable(['Company', 'Customer Number', 'Phone', 'Email', 'Address', 'Contacts', 'Status', ''], pageRows.map(c => [
        `<strong>${editorText(c.name)}</strong>`,
        `<span class="code-text">${editorText(c.customerNumber || c.id)}</span>`,
        cell(c.phone),
        cell(c.email),
        cell(c.address),
        String(window.contactsForCustomer(c.id).length),
        AA_ADMIN.statusPill(AA_ADMIN.isActive('customers', c.id)),
        AA_ADMIN.actions('customers', c.id),
      ])) + pager;
  };
  // Sync group shown in the Customers heading, on the same line as the title.
  AA_ADMIN.headActions.Customers = () => `<div style="display:flex;align-items:center;gap:10px;white-space:nowrap">`
    + `<span style="color:var(--muted);font-size:10px!important;white-space:nowrap" title="Last time customers were synced">${S.customersSyncedAt ? `Last synced ${editorText(S.customersSyncedAt)}` : 'Not synced yet'}</span>`
    + `<button type="button" class="btn" onclick="syncMasterData('customers')" ${S.masterSyncing === 'customers' ? 'disabled' : ''}>${S.masterSyncing === 'customers' ? '↻ Syncing…' : '↻ Sync'}</button>`
    + `</div>`;
  window.setAdminCustomerQuery = value => { S.adminCustomerQuery = value; S.adminPage = S.adminPage || {}; S.adminPage.customers = 1; render(); };

  // --- Departments --------------------------------------------------------------------------
  // ALL_DEPTS is a plain string array read by selects across the app; it is mutated in place (push,
  // splice, in-place rename) rather than reassigned, so every dropdown that reads it stays in sync.
  const deptUses = d => USER_MASTER.filter(u => u.department === d).length
    + MASTER_CATEGORIES.filter(c => c[1] === d).length
    + MASTER_TASK_TEMPLATES.reduce((n, t) => n + t.tasks.filter(x => x[1] === d).length, 0);

  AA_ADMIN.forms.departments = {
    noun: 'Department',
    toggleable: true,
    blank: () => ({ name: '' }),
    load: id => ALL_DEPTS.includes(id) ? { name: id } : null,
    fields: () => [{ key: 'name', label: 'Department' }],
    validate: (v, id) => {
      const name = v.name.trim();
      if (!name) return 'Enter a department name';
      if (!id && ALL_DEPTS.some(d => d.toLowerCase() === name.toLowerCase())) return 'This department already exists';
      return '';
    },
    save: (v, id) => {
      const name = v.name.trim();
      if (!id) { ALL_DEPTS.push(name); return; }
      if (name === id) return;
      // Renaming carries the new name into every record that stores the department.
      ALL_DEPTS[ALL_DEPTS.indexOf(id)] = name;
      USERS.forEach(u => { if (u.department === id) u.department = name; });
      USER_MASTER.forEach(u => { if (u.department === id) u.department = name; });
      MASTER_CATEGORIES.forEach(c => { if (c[1] === id) c[1] = name; });
      MASTER_TASK_TEMPLATES.forEach(t => { t.departments = t.departments.map(d => d === id ? name : d); t.tasks.forEach(x => { if (x[1] === id) x[1] = name; }); });
      (window.MASTER_TASK_LIBRARY || []).forEach(t => { if (t.dept === id) t.dept = name; });
      const active = AA_ADMIN.isActive('departments', id);
      AA_ADMIN.clearStatus('departments', id);
      AA_ADMIN.setActive('departments', name, active);
    },
    remove: id => { const i = ALL_DEPTS.indexOf(id); if (i >= 0) ALL_DEPTS.splice(i, 1); },
    inUse: id => {
      const n = deptUses(id);
      return n ? `Used by ${n} user, category or template record${n === 1 ? '' : 's'}. Set it to Inactive instead.` : '';
    },
  };

  AA_ADMIN.panels.Departments = () => AA_ADMIN.toolbar(AA_ADMIN.addButton('departments', '+ Add Department'))
    + masterTable(['Department', 'Users', 'Categories Routed Here', 'Status', ''], ALL_DEPTS.map(d => [
      `<strong>${editorText(d)}</strong>`,
      String(USER_MASTER.filter(u => u.department === d).length),
      String(MASTER_CATEGORIES.filter(c => c[1] === d).length),
      AA_ADMIN.statusPill(AA_ADMIN.isActive('departments', d)),
      AA_ADMIN.actions('departments', d, { remove: true }),
    ]));

  // --- System Rules: conditions and results -------------------------------------------------
  // A rule matches when every one of its conditions holds (AND), and then applies all of its results.
  // Both are field and value pairs, so a rule reads the same way at both ends. Rules start from the
  // original customer rules: each becomes a Customer condition (plus a Sender domain condition when it had
  // one) and a Priority result.
  window.BUSINESS_RULES = window.BUSINESS_RULES || MASTER_CUSTOMER_RULES.map((row, i) => ({
    id: 'rule-' + i,
    name: row[0] + ' rule',
    conditions: [{ field: 'Customer', value: row[0] }, ...(row[1] ? [{ field: 'Sender domain', value: row[1] }] : [])],
    results: [{ field: 'Priority', value: row[2] }],
  }));
  const CONDITION_FIELDS = ['Customer', 'Category', 'Case Type', 'Sender domain'];
  const RESULT_FIELDS = ['Priority', 'Department'];
  const RULE_PRIORITIES = ['Urgent', 'High', 'Normal', 'Low'];
  const ruleById = id => BUSINESS_RULES.find(x => x.id === id);

  // Choices for a field's value, with a blank first entry so nothing is picked by accident. null means
  // free text (Sender domain). An inactive value is still offered when it is the one the row already holds.
  const ruleValueChoices = (field, current) => {
    const live = (list, name, kind) => list.filter(x => name(x) === current || AA_ADMIN.isActive(kind, name(x))).map(x => [name(x), name(x)]);
    if (field === 'Customer') return [['', 'Select a customer'], ...live(MASTER_CUSTOMERS, c => c.name, 'customers')];
    if (field === 'Category') return [['', 'Select a category'], ...live(MASTER_CATEGORIES, c => c[0], 'categories')];
    if (field === 'Case Type') return [['', 'Select a case type'], ...live(MASTER_CASE_CLASSES, c => c[0], 'caseTypes')];
    if (field === 'Priority') return [['', 'Choose a priority'], ...RULE_PRIORITIES.map(p => [p, p])];
    if (field === 'Department') return [['', 'Choose a department'], ...live(ALL_DEPTS.map(d => [d]), d => d[0], 'departments')];
    return null;
  };

  const ruleFieldsFor = key => key === 'conditions' ? CONDITION_FIELDS : RESULT_FIELDS;
  window.ruleSetRow = (key, i, prop, value) => {
    const f = S.adminForm, row = f.values[key][i];
    row[prop] = value;
    // A new field starts with no value, so the row never keeps a value that belongs to another field.
    if (prop === 'field') row.value = '';
    f.error = '';
    render();
  };
  window.ruleAddRow = key => { S.adminForm.values[key].push({ field: ruleFieldsFor(key)[0], value: '' }); render(); };
  window.ruleRemoveRow = (key, i) => { S.adminForm.values[key].splice(i, 1); render(); };

  // One editable list of field and value rows. key is 'conditions' or 'results'.
  const ruleRows = (key, values, title, hint, addText, emptyText) => {
    const rows = values[key].map((row, i) => {
      const choices = ruleValueChoices(row.field, row.value);
      const valueControl = choices
        ? `<select aria-label="${title} value" onchange="ruleSetRow('${key}',${i},'value',this.value)" style="${IN}">${choices.map(([v, l]) => `<option value="${editorText(v)}" ${v === row.value ? 'selected' : ''}>${editorText(l)}</option>`).join('')}</select>`
        : `<input aria-label="${title} value" value="${editorText(row.value)}" placeholder="e.g. example.com" onchange="ruleSetRow('${key}',${i},'value',this.value)" style="${IN}">`;
      return `<div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr) 32px;gap:8px;align-items:center">
        <select aria-label="${title} field" onchange="ruleSetRow('${key}',${i},'field',this.value)" style="${IN}">${ruleFieldsFor(key).map(x => `<option ${x === row.field ? 'selected' : ''}>${x}</option>`).join('')}</select>
        ${valueControl}
        <button type="button" onclick="ruleRemoveRow('${key}',${i})" title="Remove" aria-label="Remove ${title.toLowerCase()}" style="border:0;background:transparent;color:var(--red-ink,#c51f2d);cursor:pointer;font-size:16px">✕</button>
      </div>`;
    }).join('');
    return `<div style="display:grid;gap:8px">
      <div style="font-size:12px;font-weight:650;color:var(--ink-2,#3d4d63)">${title}s <small style="color:var(--muted);font-weight:500">${hint}</small></div>
      ${rows || `<div style="color:var(--muted);font-size:12px">${emptyText}</div>`}
      <div><button type="button" class="btn" onclick="ruleAddRow('${key}')">${addText}</button></div>
    </div>`;
  };

  AA_ADMIN.forms.businessRules = {
    noun: 'System Rule',
    toggleable: true,
    blank: () => ({ name: '', conditions: [{ field: 'Customer', value: '' }], results: [{ field: 'Priority', value: '' }] }),
    load: id => { const r = ruleById(id); return r && { name: r.name, conditions: r.conditions.map(c => ({ ...c })), results: r.results.map(x => ({ ...x })) }; },
    fields: () => [
      { key: 'name', label: 'Rule Name' },
      { type: 'html', html: values => ruleRows('conditions', values, 'Condition', 'All of these must match', '+ Add Condition', 'No conditions yet.') },
      { type: 'html', html: values => ruleRows('results', values, 'Result', 'Everything here is applied when the conditions match', '+ Add Result', 'No results yet.') },
    ],
    validate: v => {
      if (!v.name.trim()) return 'Enter a rule name';
      if (!v.conditions.length) return 'Add at least one condition';
      if (v.conditions.some(c => !String(c.value || '').trim())) return 'Fill in a value for every condition';
      if (!v.results.length) return 'Add at least one result';
      if (v.results.some(r => !String(r.value || '').trim())) return 'Fill in a value for every result';
      return '';
    },
    save: (v, id) => {
      const clean = list => list.map(x => ({ field: x.field, value: String(x.value).trim() }));
      const row = { name: v.name.trim(), conditions: clean(v.conditions), results: clean(v.results) };
      if (id) Object.assign(ruleById(id), row);
      else BUSINESS_RULES.push({ id: 'rule-' + Date.now(), ...row });
    },
    remove: id => { const i = BUSINESS_RULES.findIndex(x => x.id === id); if (i >= 0) BUSINESS_RULES.splice(i, 1); },
  };

  const pairsText = list => list.map(x => `${editorText(x.field)} = <strong>${editorText(x.value)}</strong>`).join(' <span style="color:var(--muted)">and</span> ') || cell('');
  AA_ADMIN.panels.Rules = () => AA_ADMIN.toolbar(AA_ADMIN.addButton('businessRules', '+ Add Rule'))
    + masterTable(['Rule', 'Conditions (all must match)', 'Results', 'Status', ''], BUSINESS_RULES.map(r => [
      `<strong>${editorText(r.name)}</strong>`,
      pairsText(r.conditions),
      pairsText(r.results),
      AA_ADMIN.statusPill(AA_ADMIN.isActive('businessRules', r.id)),
      AA_ADMIN.actions('businessRules', r.id, { remove: true }),
    ]));

  // --- Only active values are offered for new selection ----------------------------------
  const editMasterOptionsBase = editMasterOptions;
  editMasterOptions = function (kind, current) {
    const options = editMasterOptionsBase(kind, current);
    const keeps = v => v === String(current ?? '').trim();
    if (kind === 'caseClass') return options.filter(v => keeps(v) || AA_ADMIN.isActive('caseTypes', v) || !MASTER_CASE_CLASSES.some(x => x[0] === v));
    if (kind === 'customer') return options.filter(v => keeps(v) || !MASTER_CUSTOMERS.some(c => c.name === v && !AA_ADMIN.isActive('customers', c.id)));
    return options;
  };
})();
