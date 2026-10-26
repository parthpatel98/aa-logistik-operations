/* Email Templates (replaces the earlier Acknowledgement Templates placeholder): predefined templates
   used for customer communication, editable and set Active or Inactive, with create/delete for further
   templates. Seeded with the templates AA Logistik's case flow already implies — an acknowledgement,
   a booking confirmation, an information request, a status update, an issue acknowledgement, a
   document request and a quote response — so the screen is not empty. Loaded after aa-admin-core.js.

   Variables are one list (EMAIL_TEMPLATE_VARIABLES). Each is either filled from the case when an email is
   written ('case') or left as [name] for the sender to type in ('sender'). The same list drives the
   reference table, the insert buttons and preview in the editor, the validation on save, and the fill
   used by the Compose and acknowledgement flows (window.resolveEmailTemplate). The editor offers the list as
   one "Insert variable" dropdown; the Templates screen does not list the variables. */
(function () {
  if (!window.MASTER_EMAIL_TEMPLATES) {
    window.MASTER_EMAIL_TEMPLATES = [
      { id: 'tpl-ack', name: 'Case Acknowledgement', subject: 'We have received your request — {{caseId}}', body: 'Hello {{contactName}},\n\nThank you for contacting AA Logistik. We have received your request and opened case {{caseId}}. We will get back to you as soon as possible.\n\nBest regards,\nAA Logistik' },
      { id: 'tpl-booking', name: 'Booking Confirmed', subject: 'Booking confirmed — {{caseId}}', body: 'Hello {{contactName}},\n\nYour transport booking under case {{caseId}} has been confirmed. Pickup: {{pickupDate}}. Delivery: {{deliveryDate}}.\n\nBest regards,\nAA Logistik' },
      { id: 'tpl-missing-info', name: 'Missing Information Request', subject: 'We need more information — {{caseId}}', body: 'Hello {{contactName}},\n\nTo proceed with case {{caseId}}, we still need the following information: {{missingFields}}. Please reply with these details at your earliest convenience.\n\nBest regards,\nAA Logistik' },
      { id: 'tpl-status', name: 'Status Update', subject: 'Status update — {{caseId}}', body: 'Hello {{contactName}},\n\nHere is the current status of case {{caseId}}: {{statusSummary}}.\n\nBest regards,\nAA Logistik' },
      { id: 'tpl-issue', name: 'Issue Acknowledgement', subject: 'We are looking into this — {{caseId}}', body: 'Hello {{contactName}},\n\nWe have registered the issue you reported under case {{caseId}} and are investigating. We will update you as soon as we know more.\n\nBest regards,\nAA Logistik' },
      { id: 'tpl-doc', name: 'Document Request', subject: 'Document needed — {{caseId}}', body: 'Hello {{contactName}},\n\nCould you please send us {{documentName}} so we can proceed with case {{caseId}}?\n\nBest regards,\nAA Logistik' },
      { id: 'tpl-quote', name: 'Quote Sent', subject: 'Your quote — {{caseId}}', body: 'Hello {{contactName}},\n\nPlease find our quote for your inquiry under case {{caseId}} attached. The quote is valid for 14 days.\n\nBest regards,\nAA Logistik' },
      { id: 'tpl-cancel', name: 'Cancellation Confirmed', subject: 'Cancellation confirmed — {{caseId}}', body: 'Hello {{contactName}},\n\nWe confirm that case {{caseId}} has been cancelled as requested.\n\nBest regards,\nAA Logistik' },
    ];
  }

  const EMAIL_TEMPLATE_VARIABLES = [
    { key: 'contactName', group: 'Contact', label: 'Contact first name', source: 'case', value: c => String(c.contact || '').split(' ')[0] || 'there' },
    { key: 'contactFullName', group: 'Contact', label: 'Contact full name', source: 'case', value: c => c.contact },
    { key: 'customerName', group: 'Customer', label: 'Customer name', source: 'case', value: c => c.customer },
    { key: 'customerNo', group: 'Customer', label: 'Customer number', source: 'case', value: c => c.customerNo },
    { key: 'caseId', group: 'Case', label: 'Case number', source: 'case', value: c => c.id },
    { key: 'caseReference', group: 'Case', label: 'Case reference', source: 'case', value: c => c.reference },
    { key: 'caseClass', group: 'Case', label: 'Case class', source: 'case', value: c => c.caseClass },
    { key: 'statusSummary', group: 'Case', label: 'Case status', source: 'case', value: c => c.status },
    { key: 'missingFields', group: 'Case', label: 'Missing information list', source: 'case', value: (c, missing) => (missing.length ? missing.join('\n') : '- Please list the missing details') },
    { key: 'dueDate', group: 'Case', label: 'Due date', source: 'case', value: c => c.due },
    { key: 'pickupLocation', group: 'Shipment', label: 'Pickup location', source: 'case', value: c => c.pickup },
    { key: 'deliveryLocation', group: 'Shipment', label: 'Delivery location', source: 'case', value: c => c.delivery },
    { key: 'goods', group: 'Shipment', label: 'Goods', source: 'case', value: c => c.goods },
    { key: 'pickupDate', group: 'Shipment', label: 'Pickup date', source: 'sender' },
    { key: 'deliveryDate', group: 'Shipment', label: 'Delivery date', source: 'sender' },
    { key: 'documentName', group: 'Documents', label: 'Document name', source: 'sender' },
  ];
  window.EMAIL_TEMPLATE_VARIABLES = EMAIL_TEMPLATE_VARIABLES;

  // Values for every 'case' variable, read from one case. Sender variables are left out on purpose.
  const variableValues = (c, missing = []) => Object.fromEntries(
    EMAIL_TEMPLATE_VARIABLES.filter(v => v.source === 'case').map(v => [v.key, v.value(c, missing)])
  );
  window.emailTemplateValues = variableValues;

  // Replaces {{name}} with its value. A variable with no value (a sender variable, or no case) stays as
  // [name] so the sender can see what still needs typing.
  window.resolveEmailTemplate = (text, values) => String(text).replace(/\{\{(\w+)\}\}/g, (m, k) => (values[k] ? values[k] : `[${k}]`));

  const byId = id => MASTER_EMAIL_TEMPLATES.find(x => x.id === id);
  const sampleCase = () => Object.values(CASE_DETAILS)[0];
  const sampleMissing = c => outstandingCaseFields(c).map(x => '- ' + x.label);
  const usedVariables = text => [...String(text).matchAll(/\{\{(\w+)\}\}/g)].map(m => m[1]);

  // Insert buttons: a click puts {{name}} into the Subject or Body the admin last clicked, at the cursor.
  let lastEmailField = 'Email body';
  document.addEventListener('focusin', e => {
    const name = e.target.getAttribute && e.target.getAttribute('aria-label');
    if (name === 'Email subject' || name === 'Email body') lastEmailField = name;
  });
  window.insertEmailVariable = key => {
    if (!key) return;
    const f = S.adminForm;
    const el = document.querySelector(`[aria-label="${lastEmailField}"]`);
    if (!f || !el) return;
    const field = lastEmailField === 'Email subject' ? 'subject' : 'body';
    const token = `{{${key}}}`;
    const start = el.selectionStart ?? el.value.length, end = el.selectionEnd ?? start;
    f.values[field] = el.value.slice(0, start) + token + el.value.slice(end);
    f.error = '';
    render();
    const pos = start + token.length;
    setTimeout(() => {
      const next = document.querySelector(`[aria-label="${lastEmailField}"]`);
      if (next) { next.focus(); next.setSelectionRange(pos, pos); }
    }, 0);
  };

  // One dropdown, grouped like the variables themselves. Picking one inserts it at the cursor and resets.
  const insertPanel = () => {
    const groups = [...new Set(EMAIL_TEMPLATE_VARIABLES.map(v => v.group))];
    return `<label style="display:grid;gap:5px;font-size:12px;font-weight:650;color:var(--ink-2,#3d4d63)">Insert variable <small style="color:var(--muted);font-weight:500">Adds it to the Subject or Body at the cursor. Sender variables are typed in before sending.</small>
      <select aria-label="Insert variable" onchange="insertEmailVariable(this.value)" style="height:36px;border:1px solid var(--line);border-radius:4px;padding:0 10px;font:inherit;font-weight:500;width:100%;box-sizing:border-box;background:#fff">
        <option value="">Choose a variable…</option>
        ${groups.map(g => `<optgroup label="${editorText(g)}">${EMAIL_TEMPLATE_VARIABLES.filter(v => v.group === g).map(v => `<option value="${v.key}">${editorText(v.label)} — {{${v.key}}}${v.source === 'sender' ? ' (sender)' : ''}</option>`).join('')}</optgroup>`).join('')}
      </select>
    </label>`;
  };

  const previewPanel = values => {
    const c = sampleCase();
    const vals = variableValues(c, sampleMissing(c));
    const subject = resolveEmailTemplate(values.subject || '', vals);
    const body = resolveEmailTemplate(values.body || '', vals);
    return `<div style="display:grid;gap:6px">
      <div style="font-size:12px;font-weight:650;color:var(--ink-2,#3d4d63)">Preview <small style="color:var(--muted);font-weight:500">Filled with case ${editorText(c.id)}. Sender variables show as [name].</small></div>
      <div style="border:1px solid var(--line);border-radius:4px;padding:10px 12px;background:var(--bg,#f7f9fb);font-size:13px;display:grid;gap:8px">
        <div><strong>${editorText(subject)}</strong></div>
        <div style="white-space:pre-wrap;color:var(--ink)">${editorText(body)}</div>
      </div>
    </div>`;
  };

  AA_ADMIN.forms.emailTemplates = {
    noun: 'Email Template',
    toggleable: true,
    blank: () => ({ name: '', subject: '', body: '' }),
    load: id => { const t = byId(id); return t && { name: t.name, subject: t.subject, body: t.body }; },
    fields: () => [
      { key: 'name', label: 'Template Name' },
      { key: 'subject', label: 'Subject', aria: 'Email subject' },
      { key: 'body', label: 'Body', type: 'textarea', rows: 8, aria: 'Email body' },
      { type: 'html', html: () => insertPanel() },
      { type: 'html', html: values => previewPanel(values) },
    ],
    validate: (v, id) => {
      const name = v.name.trim();
      if (!name) return 'Enter a template name';
      if (MASTER_EMAIL_TEMPLATES.some(x => x.id !== id && x.name.trim().toLowerCase() === name.toLowerCase())) return 'A template with this name already exists';
      if (!v.subject.trim()) return 'Enter a subject';
      if (!v.body.trim()) return 'Enter the template body';
      const unknown = [...usedVariables(v.subject), ...usedVariables(v.body)].find(k => !EMAIL_TEMPLATE_VARIABLES.some(x => x.key === k));
      if (unknown) return `Unknown variable {{${unknown}}}. Insert variables from the list so the name matches.`;
      return '';
    },
    save: (v, id) => {
      const data = { name: v.name.trim(), subject: v.subject.trim(), body: v.body.trim() };
      if (id) Object.assign(byId(id), data);
      else MASTER_EMAIL_TEMPLATES.push({ id: 'tpl-' + Date.now(), ...data });
    },
    remove: id => { const i = MASTER_EMAIL_TEMPLATES.findIndex(x => x.id === id); if (i >= 0) MASTER_EMAIL_TEMPLATES.splice(i, 1); },
  };

  AA_ADMIN.panels['Email Templates'] = () => {
    const rows = MASTER_EMAIL_TEMPLATES.map(t => [
      `<strong>${editorText(t.name)}</strong>`,
      editorText(t.subject),
      AA_ADMIN.statusPill(AA_ADMIN.isActive('emailTemplates', t.id)),
      AA_ADMIN.actions('emailTemplates', t.id, { remove: true }),
    ]);
    return AA_ADMIN.toolbar(AA_ADMIN.addButton('emailTemplates', '+ Add Template'))
      + masterTable(['Template', 'Subject', 'Status', ''], rows);
  };
})();
