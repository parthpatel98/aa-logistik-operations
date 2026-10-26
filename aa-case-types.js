/* Case Type: one set of nine types across the app. Every case, the Create Case and classification
   dropdowns, and the Masters use these names, and older labels are mapped onto them. Loaded last, after all
   case data has been built. */
(function () {
  const LEGACY = {
    'New Booking': 'New Booking', 'New Transport Order': 'New Booking', 'Confirmed Order': 'New Booking',
    'Warehouse Request': 'New Booking', 'Packing Request': 'New Booking',
    'Inquiry': 'Inquiry', 'Inquiry / Quotation': 'Inquiry', 'Price Request': 'Inquiry',
    'Change Request': 'Change Request', 'Modification / Additional Request': 'Change Request', 'Special Handling': 'Change Request',
    'Cancellation': 'Cancellation',
    'Follow Up': 'Follow Up', 'Status / Follow-up': 'Follow Up', 'Status Question': 'Follow Up', 'Status': 'Follow Up',
    'Issue': 'Issue', 'Issue / Investigation / Complaint': 'Issue', 'Complaint / Deviation': 'Issue', 'Deviation': 'Issue',
    'Administrative': 'Administrative', 'Documentation / Administration': 'Administrative', 'Document Request': 'Administrative',
    'Information': 'Information', 'Information / Notification': 'Information',
    'Other / Unclear': 'Other / Unclear', 'Other': 'Other / Unclear',
  };
  const toCaseType = name => LEGACY[String(name).trim()] || 'Other / Unclear';
  window.caseTypeName = toCaseType;
  // A value can hold several types joined by commas, for example "New Booking, Inquiry".
  const toCaseTypes = value => [...new Set(String(value || '').split(',').map(toCaseType))].join(', ');

  Object.values(CASE_DETAILS).forEach(c => { c.caseClass = toCaseTypes(c.caseClass) });
  CASES.forEach(row => { row[2] = toCaseTypes(row[2]) });

  // Masters: the case class list is the nine types, each with its required-data profile.
  MASTER_CASE_CLASSES.splice(0, MASTER_CASE_CLASSES.length,
    ['New Booking', 'Customer expects execution', 'Transport required data'],
    ['Inquiry', 'Price or capability question, no booking yet', 'Inquiry profile'],
    ['Change Request', 'Change to existing work', 'Change profile'],
    ['Cancellation', 'Cancel an existing order', 'None'],
    ['Follow Up', 'Customer asks for status or follow-up', 'None'],
    ['Issue', 'Damage, delay or deviation', 'Deviation profile'],
    ['Administrative', 'Documents and administration', 'None'],
    ['Information', 'Information or notification only', 'None'],
    ['Other / Unclear', 'Everything else, routed manually', 'None']
  );
  MASTER_REQUIRED_DATA.forEach(row => { row[1] = toCaseType(row[1]) });

  // Task templates store their Case Type too, so they move to the same nine names. Without this a template saved
  // with an older name shows a blank Case Type in its editor and never matches a case. The scope text is rebuilt to match.
  MASTER_TASK_TEMPLATES.forEach(t => {
    if (!t.caseType) return;
    t.caseType = toCaseType(t.caseType);
    if (t.category && Array.isArray(t.departments) && t.departments.length) {
      t.scope = `${t.category} · ${t.caseType} · ${t.departments.join(', ')}` + (t.customer ? ` · ${t.customer} override` : '');
    }
  });

  if (typeof MOCK_CASES_SEED !== 'undefined') {
    MOCK_CASES_SEED.forEach(c => { if (c.type) c.type = [...new Set(c.type.map(toCaseType))] });
  }
})();
