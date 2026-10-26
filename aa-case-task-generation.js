/* Wires Task Templates into the real Approve Case flow: when a Case is approved, its tasks are
   generated from the Task Template(s) whose Category + Case Type + Department match the Case,
   instead of the earlier demo-only routing. Agreed behaviour:
   - A template now belongs to exactly one Department. A Case can span several Departments
     (c.departments), so each of its Departments is matched separately and the results are combined —
     this is what lets a multi-department Case pull one Department's tasks from one template and
     another Department's tasks from a different template.
   - No template matches a given (Category, Case Type, Department): that Department gets no generated
     tasks for this Case. The Admin adds them by hand. Nothing is forced to fill a gap.
   - More than one matching template for the same Department: every matching template's tasks apply
     (union by task title).
   - Editing or deleting a Template never changes a Case that already generated its Tasks from it —
     generation only happens once, at Approve, the same "not retroactive" rule the rest of the masters
     follow.
   A Case has neither a clean Category nor a clean Case Type field of its own — c.classification and
   c.caseClass carry whatever vocabulary the Case came from (the AI/email classifier's categories, or
   the manual Case Creation form's own chip list), not the Category/Case Type ids the Admin picks from
   in the Task Templates screen (MASTER_CATEGORIES / MASTER_CASE_CLASSES). categoryForCase/caseTypeForCase
   below translate a Case's raw text onto those same ids, the same way the department/owner routing
   already does for Classification via TASK_ROUTING, rather than asking every historical Case to be
   re-tagged. Inactive Categories, Case Types or Templates never match a new Case, the same rule the
   rest of the masters follow.
   Loaded after aa-app.js (TASK_ROUTING, MASTER_TASK_TEMPLATES, USERS, TASKS) and aa-admin-core.js
   (AA_ADMIN.isActive). */
(function () {
  // Classification already drives department/owner routing via TASK_ROUTING; its 10 keys cover every
  // Classification in use, so this table maps each one onto the Category id the Admin picks from.
  const CLASSIFICATION_CATEGORY = {
    'Transport booking': 'Transport', 'Pickup coordination': 'Transport', 'Transport follow-up': 'Transport', 'Delivery coordination': 'Transport',
    'Packing preparation': 'Packing', 'Packing inspection': 'Packing',
    'Warehouse storage': 'Warehouse',
    'Export documentation': 'Freight forwarding', 'Customs clearance': 'Freight forwarding', 'Freight coordination': 'Freight forwarding',
    // A manually created Case's Classification can also come from the email-triage category list
    // (aa-email-detail.js CATMAP) rather than TASK_ROUTING's keys; cover its terms too.
    'Export': 'Freight forwarding', 'Import': 'Freight forwarding', 'Incoming': 'Warehouse', 'Outbound': 'Warehouse', 'Rebooking': 'Warehouse',
    'Inspection': 'Packing', 'PO': 'Finance', 'Invoice': 'Finance', 'Credit note': 'Finance', 'PO Confirmation': 'Finance',
  };
  const FALLBACK_CATEGORY = 'Other / Unclassified';
  window.categoryForClassification = classification => CLASSIFICATION_CATEGORY[classification] || FALLBACK_CATEGORY;

  // A Case can carry more than one Classification (c.classes — a primary and a secondary one, each
  // routing to its own Department via TASK_ROUTING), so when matching a specific Department, Category
  // is derived from whichever Classification actually routes to that Department, not always from the
  // Case's single primary classification field. Otherwise a Transport + Packing Case would only ever
  // match Transport-category templates, even for its Packing Department.
  window.categoryForDepartment = function (c, department) {
    const classes = Array.isArray(c.classes) && c.classes.length ? c.classes : [c.classification];
    const match = classes.find(cls => cls && typeof routedOwner === 'function' && routedOwner(cls)?.department === department);
    return window.categoryForClassification(match || c.classification);
  };

  // c.caseClass is free text (on the demo seed Cases it is literally always "New Booking" — a
  // pre-existing quirk of the seed data, not a real distinction), so Case Type is derived the same
  // heuristic way the pre-mapping task generator used to pick a template: from the words in the
  // Case's own caseClass + classification text, same spirit as the Classification → Category table
  // above, just as a set of keyword checks instead of a fixed dictionary.
  window.caseTypeForCase = function (c) {
    const text = `${c.caseClass || ''} ${c.classification || ''}`.toLowerCase();
    if (/complaint|deviation|damage|delay/.test(text)) return 'Complaint / Deviation';
    if (/status|follow.?up|where is|track/.test(text)) return 'Status Question';
    if (/inquiry|price|quot|question/.test(text)) return 'Inquiry';
    if (/cancel/.test(text)) return 'Other';
    if (/change|modification|special handling/.test(text)) return 'Change Request';
    if (/issue|investigation/.test(text)) return 'Complaint / Deviation';
    return 'Confirmed Order';
  };

  // The templates seeded before the admin Category/Case Type/Department fields existed never got
  // values, so they could never match anything. Backfill them once, from what their name already says;
  // a template created or edited through the admin screen already carries its own real values.
  const SEED_TAGS = {
    'transport-order': ['Transport', 'Confirmed Order', 'Transport'],
    'warehouse-order': ['Warehouse', 'Confirmed Order', 'Warehouse'],
    'packing-order': ['Packing', 'Confirmed Order', 'Packing'],
    'transport-inquiry': ['Transport', 'Inquiry', 'Transport'],
    'abb-order': ['Transport', 'Confirmed Order', 'Transport'],
  };
  MASTER_TASK_TEMPLATES.forEach(t => {
    if (t.category || t.caseType || t.departments.length) return;
    const tags = SEED_TAGS[t.id];
    if (!tags) return;
    // The seed names are mapped onto the nine Case Types, as aa-case-types.js does for the templates it finds.
    [t.category, t.caseType] = [tags[0], window.caseTypeName(tags[1])];
    t.departments = [tags[2]];
    // Matches the subtitle the admin screen computes for a mapping saved through the form (aa-templates.js).
    t.scope = `${t.category} · ${t.caseType} · ${t.departments.join(', ')}` + (t.customer ? ` · ${t.customer} override` : '');
  });

  // A template that names a specific customer (e.g. the ABB override) only matches that customer's
  // Cases; it is additional to, not instead of, the general template for the same Category + Case Type
  // + Department, matching the agreed "every matching template applies" rule.
  function matchingTemplates(c, department) {
    const category = window.categoryForDepartment(c, department), caseType = window.caseTypeForCase(c);
    const categoryOk = !window.AA_ADMIN || AA_ADMIN.isActive('categories', category);
    const caseTypeOk = !window.AA_ADMIN || AA_ADMIN.isActive('caseTypes', caseType);
    if (!categoryOk || !caseTypeOk) return [];
    return MASTER_TASK_TEMPLATES.filter(t => t.category === category && t.caseType === caseType && t.departments.includes(department)
      && (!t.customer || t.customer === c.customer));
  }
  window.matchingTaskTemplates = matchingTemplates;

  const PRIORITY_LABEL = { High: 'High', Normal: 'Medium', Low: 'Low' };
  // Spreads generated tasks over every member of a department, like the existing demo seed does,
  // instead of always picking the same first person. Kept for the session, not reset per Case.
  const deptTurn = {};
  function ownerForDept(dept) {
    const team = USERS.filter(u => u.department === dept);
    if (!team.length) return { name: 'Unassigned', department: dept };
    deptTurn[dept] = (deptTurn[dept] || 0) + 1;
    return { name: team[deptTurn[dept] % team.length].name, department: dept };
  }

  // Creates the Tasks a Case's matching Template(s) call for. Each of the Case's own Departments is
  // matched separately against its Category + Case Type, so a multi-department Case can pick up one
  // Department's tasks from one template and another Department's from a different one. A Task already
  // on the Case (by title) is never duplicated, so calling this more than once for the same Case is
  // safe. Returns how many it added.
  window.generateTasksForCase = function (c) {
    const departments = [...new Set(String(c.departments || '').split(',').map(d => d.trim()).filter(Boolean))];
    const seen = new Set(), picked = [];
    departments.forEach(department => {
      matchingTemplates(c, department).forEach(t => t.tasks.forEach(([title, dept, , , pri]) => {
        if (seen.has(title)) return;
        seen.add(title);
        picked.push({ title, dept, pri });
      }));
    });
    if (!picked.length) return 0;
    const existingTitles = new Set(TASKS.filter(t => t[1] === c.id).map(t => t[0]));
    let added = 0;
    picked.forEach(task => {
      if (existingTitles.has(task.title)) return;
      const owner = ownerForDept(task.dept);
      TASKS.push([task.title, c.id, c.customer, task.dept, owner.name, PRIORITY_LABEL[task.pri] || 'Medium', c.due, 'To-Do', nextTaskNumber(), c.classification, 'Later']);
      existingTitles.add(task.title);
      added++;
    });
    return added;
  };

  // --- Wire into the real approval actions ------------------------------------------------
  const approveSelectedCaseBase = approveSelectedCase;
  approveSelectedCase = function () {
    const c = selectedCaseData();
    const added = window.generateTasksForCase(c);
    approveSelectedCaseBase();
    if (added) toast(`${c.id} approved · ${added} Task${added === 1 ? '' : 's'} generated from matching Templates`);
  };

  const approveBase = approve;
  approve = function () {
    const c = CASE_DETAILS['CASE-401046'];
    const added = c ? window.generateTasksForCase(c) : 0;
    approveBase();
    if (added) toast(`${added} additional Task${added === 1 ? '' : 's'} generated from matching Templates`);
  };
})();
