/* Email review batch: the emails in AA_Logistik_Email_Review_Transport_Cases_40.xlsx.
   Each email becomes a Review Request (QUEUE), its own Case (CASES / CASE_DETAILS) and the Tasks
   its Classification and Case Class imply (TASKS). Loaded after aa-app.js. */
(function () {
  const EMAIL_BATCH = [
  {
    "received": "07/10/2026, 08:00",
    "ref": "EML-4101",
    "subject": "Transport Order – Industrial robots to Västerås",
    "customer": "ABB Robotics",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "Standard transport order; minimal email body"
  },
  {
    "received": "07/10/2026, 08:18",
    "ref": "EML-4102",
    "subject": "Today's pickup – Robotics line material",
    "customer": "ABB Robotics",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "Daily/scheduled pickup; quantities supplied on the day"
  },
  {
    "received": "07/10/2026, 08:43",
    "ref": "EML-4103",
    "subject": "Machines Outbound – pickup details attached",
    "customer": "ABB Robotics",
    "classification": "Transport Booking + Warehouse",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "AA/ABB Excel template; transport plus warehouse activity"
  },
  {
    "received": "07/10/2026, 09:07",
    "ref": "EML-4104",
    "subject": "Export Shipment – Power transformer to Hamburg",
    "customer": "Hitachi Energy",
    "classification": "Transport Booking + Export",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "Export transport with shipment details in attachment"
  },
  {
    "received": "07/10/2026, 09:24",
    "ref": "EML-4105",
    "subject": "Please pick up tomorrow instead of today – Order 1000962512",
    "customer": "Hitachi Energy",
    "classification": "Transport Booking",
    "caseClass": "Change Request",
    "priority": "High",
    "variation": "Existing transport; pickup-date change"
  },
  {
    "received": "07/10/2026, 09:51",
    "ref": "EML-4106",
    "subject": "Inbound transformer – delivery to Västerås",
    "customer": "Hitachi Energy",
    "classification": "Transport Booking + Import",
    "caseClass": "New Booking",
    "priority": "Medium",
    "variation": "Inbound/import transport"
  },
  {
    "received": "07/10/2026, 10:16",
    "ref": "EML-4107",
    "subject": "CMR attached – shipment reference HEN-88431",
    "customer": "Hitachi Energy",
    "classification": "Transport Booking + Documentation",
    "caseClass": "Documentation / Administration",
    "priority": "Medium",
    "variation": "Transport-related document received after booking"
  },
  {
    "received": "07/10/2026, 10:42",
    "ref": "EML-4108",
    "subject": "Urgent rotor transport – pickup before 14:00",
    "customer": "ABB",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "Time-critical instructions embedded in text"
  },
  {
    "received": "07/10/2026, 11:05",
    "ref": "EML-4109",
    "subject": "Express pickup required – Ludvika to Västerås",
    "customer": "Hitachi Energy",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "Express service inferred from urgency/location rule"
  },
  {
    "received": "07/10/2026, 11:21",
    "ref": "EML-4110",
    "subject": "Customs clearance – reactor components",
    "customer": "Westinghouse Electric",
    "classification": "Transport Booking + Export",
    "caseClass": "Documentation / Administration",
    "priority": "High",
    "variation": "Transport with customs/export administration"
  },
  {
    "received": "07/10/2026, 11:48",
    "ref": "EML-4111",
    "subject": "Dangerous goods shipment – ADR details attached",
    "customer": "Westinghouse Electric",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "ADR / dangerous goods transport"
  },
  {
    "received": "07/10/2026, 12:12",
    "ref": "EML-4112",
    "subject": "Packing and transport request – reusable export crates",
    "customer": "Nefab",
    "classification": "Transport Booking + Packing",
    "caseClass": "New Booking",
    "priority": "Medium",
    "variation": "Multi-classification: packing followed by transport"
  },
  {
    "received": "07/10/2026, 12:39",
    "ref": "EML-4113",
    "subject": "Transport booking – 4 pallets, full details in email",
    "customer": "Nefab",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "Low",
    "variation": "Clean email-body booking; easy extraction case"
  },
  {
    "received": "07/10/2026, 13:06",
    "ref": "EML-4114",
    "subject": "Quote request – 6 pallets Västerås to Gothenburg",
    "customer": "Nefab",
    "classification": "Price Request",
    "caseClass": "Inquiry / Quotation",
    "priority": "High",
    "variation": "Pricing inquiry before booking"
  },
  {
    "received": "07/10/2026, 13:28",
    "ref": "EML-4115",
    "subject": "Proceed with quoted transport – REF NF-22818",
    "customer": "Nefab",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "Inquiry converted to confirmed booking"
  },
  {
    "received": "07/10/2026, 13:53",
    "ref": "EML-4116",
    "subject": "Project cargo – drill rig feed modules to Kiruna",
    "customer": "Sandvik Mining",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "Medium",
    "variation": "Heavy/project cargo requiring dimensions and planning"
  },
  {
    "received": "07/10/2026, 14:17",
    "ref": "EML-4117",
    "subject": "Delivery must arrive 08:00 sharp – Project cargo",
    "customer": "Sandvik Mining",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "Time-specific delivery"
  },
  {
    "received": "07/10/2026, 14:42",
    "ref": "EML-4118",
    "subject": "Add one crate to booking – REF SM-55204",
    "customer": "Sandvik Mining",
    "classification": "Transport Booking",
    "caseClass": "Change Request",
    "priority": "Medium",
    "variation": "Change quantity/colli on existing transport"
  },
  {
    "received": "07/10/2026, 15:04",
    "ref": "EML-4119",
    "subject": "Cancel tomorrow's pickup – REF SM-55204",
    "customer": "Sandvik Mining",
    "classification": "Transport Booking",
    "caseClass": "Cancellation",
    "priority": "High",
    "variation": "Cancellation of an existing transport order"
  },
  {
    "received": "07/10/2026, 15:31",
    "ref": "EML-4120",
    "subject": "Inbound shipment – precision bearings from Germany",
    "customer": "SKF",
    "classification": "Transport Booking + Import",
    "caseClass": "New Booking",
    "priority": "Medium",
    "variation": "Cross-border inbound transport"
  },
  {
    "received": "07/10/2026, 15:49",
    "ref": "EML-4121",
    "subject": "Pickup coordination – bearing shipment ready at 16:30",
    "customer": "SKF",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "Medium",
    "variation": "Pickup readiness/time coordination"
  },
  {
    "received": "07/10/2026, 16:11",
    "ref": "EML-4122",
    "subject": "Where is shipment K2-325841?",
    "customer": "SKF",
    "classification": "Transport Booking",
    "caseClass": "Status / Follow-up",
    "priority": "Medium",
    "variation": "Customer asks status on existing shipment"
  },
  {
    "received": "08/10/2026, 07:42",
    "ref": "EML-4123",
    "subject": "Please send CMR for yesterday's delivery",
    "customer": "SKF",
    "classification": "Transport Booking + Documentation",
    "caseClass": "Documentation / Administration",
    "priority": "Low",
    "variation": "Post-delivery CMR request"
  },
  {
    "received": "08/10/2026, 08:05",
    "ref": "EML-4124",
    "subject": "Transport to Norway – price and pickup request",
    "customer": "Alstom",
    "classification": "Transport Booking + Price Request",
    "caseClass": "Inquiry / Quotation",
    "priority": "High",
    "variation": "Combined quotation + booking-intent email"
  },
  {
    "received": "08/10/2026, 08:31",
    "ref": "EML-4125",
    "subject": "Confirmed – book Norway transport as quoted",
    "customer": "Alstom",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "Quotation accepted; create transport order"
  },
  {
    "received": "08/10/2026, 08:57",
    "ref": "EML-4126",
    "subject": "Two delivery points – Västerås / Oslo / Trondheim",
    "customer": "Alstom",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "One email potentially creates multiple transport orders"
  },
  {
    "received": "08/10/2026, 09:26",
    "ref": "EML-4127",
    "subject": "Change delivery address – Order AL-77412",
    "customer": "Alstom",
    "classification": "Transport Booking",
    "caseClass": "Change Request",
    "priority": "High",
    "variation": "Existing booking; delivery-location change"
  },
  {
    "received": "08/10/2026, 09:54",
    "ref": "EML-4128",
    "subject": "Shipment delayed at supplier – new pickup Friday",
    "customer": "Alstom",
    "classification": "Transport Booking",
    "caseClass": "Change Request",
    "priority": "Medium",
    "variation": "Supplier delay causing pickup-date revision"
  },
  {
    "received": "08/10/2026, 10:22",
    "ref": "EML-4129",
    "subject": "Air freight to Mexico – packed goods ready",
    "customer": "ABB",
    "classification": "Transport Booking + Export",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "Freight-forwarding request; external air freight plus own-truck leg"
  },
  {
    "received": "08/10/2026, 10:49",
    "ref": "EML-4130",
    "subject": "Airport transfer – goods to Arlanda",
    "customer": "ABB",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "Own truck leg to airport for air shipment"
  },
  {
    "received": "08/10/2026, 11:13",
    "ref": "EML-4131",
    "subject": "Book sea freight – export machinery to Busan",
    "customer": "ABB",
    "classification": "Transport Booking + Export",
    "caseClass": "New Booking",
    "priority": "Medium",
    "variation": "Sea-freight forwarding variation"
  },
  {
    "received": "08/10/2026, 11:36",
    "ref": "EML-4132",
    "subject": "Courier needed – documents to Gothenburg today",
    "customer": "Westinghouse Electric",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "Small/time-sensitive courier movement"
  },
  {
    "received": "08/10/2026, 12:03",
    "ref": "EML-4133",
    "subject": "Freight booked – carrier confirmation attached",
    "customer": "Kuehne + Nagel",
    "classification": "Transport Booking",
    "caseClass": "Status / Follow-up",
    "priority": "Low",
    "variation": "Booked freight confirmation"
  },
  {
    "received": "08/10/2026, 12:28",
    "ref": "EML-4134",
    "subject": "CMR – inbound freight document attached",
    "customer": "Kuehne + Nagel",
    "classification": "Transport Booking + Documentation",
    "caseClass": "Documentation / Administration",
    "priority": "Medium",
    "variation": "PDF/CMR is primary source of shipment data"
  },
  {
    "received": "08/10/2026, 12:56",
    "ref": "EML-4135",
    "subject": "Missing weight – can you still arrange pickup?",
    "customer": "Kuehne + Nagel",
    "classification": "Transport Booking",
    "caseClass": "New Booking",
    "priority": "Medium",
    "variation": "Incomplete transport request requiring clarification"
  },
  {
    "received": "08/10/2026, 13:24",
    "ref": "EML-4136",
    "subject": "Warehouse receipt + onward transport next week",
    "customer": "ABB Robotics",
    "classification": "Transport Booking + Warehouse",
    "caseClass": "New Booking",
    "priority": "Medium",
    "variation": "Goods first to warehouse, later transport; dependent activities"
  },
  {
    "received": "08/10/2026, 13:51",
    "ref": "EML-4137",
    "subject": "Pick, pack, store and ship – project material",
    "customer": "Hitachi Energy",
    "classification": "Transport Booking + Warehouse + Packing",
    "caseClass": "New Booking",
    "priority": "High",
    "variation": "Complex multi-department request in one email"
  },
  {
    "received": "08/10/2026, 14:19",
    "ref": "EML-4138",
    "subject": "Customer portal order – please change pickup to Monday",
    "customer": "Hitachi Energy",
    "classification": "Transport Booking",
    "caseClass": "Change Request",
    "priority": "Medium",
    "variation": "Order already created via portal; email only changes date"
  },
  {
    "received": "08/10/2026, 14:47",
    "ref": "EML-4139",
    "subject": "Delivery discrepancy – 1 pallet missing",
    "customer": "Nefab",
    "classification": "Deviation",
    "caseClass": "Complaint / Deviation",
    "priority": "High",
    "variation": "Transport-related deviation/claim"
  },
  {
    "received": "08/10/2026, 15:18",
    "ref": "EML-4140",
    "subject": "Follow-up: pickup not completed as planned",
    "customer": "ABB Robotics",
    "classification": "Transport Booking",
    "caseClass": "Status / Follow-up",
    "priority": "High",
    "variation": "Operational follow-up on an active transport"
  }
];

  const TASK_BY_CLASSIFICATION = {
    'Transport Booking': ['Arrange transport', 'Transport booking'],
    'Price Request': ['Prepare transport quotation', 'Freight coordination'],
    'Import': ['Coordinate inbound transport', 'Freight coordination'],
    'Export': ['Prepare export documentation', 'Export documentation'],
    'Warehouse': ['Coordinate warehouse handling', 'Warehouse storage'],
    'Packing': ['Arrange packing', 'Packing preparation'],
    'Deviation': ['Investigate deviation', 'Transport follow-up'],
  };

  const TASK_BY_CASE_CLASS = {
    'Change Request': ['Process change request', 'Transport follow-up'],
    'Cancellation': ['Process cancellation', 'Transport follow-up'],
    'Status / Follow-up': ['Respond to status request', 'Transport follow-up'],
    'Inquiry / Quotation': ['Prepare transport quotation', 'Freight coordination'],
    'Documentation / Administration': ['Process shipment documents', 'Customs clearance'],
    'Complaint / Deviation': ['Investigate deviation', 'Transport follow-up'],
  };

  // A new booking's tasks come from its Classification. Any other Case Class is a lifecycle
  // event on an existing order, so its lifecycle task replaces the generic booking task.
  function taskSpecs(row) {
    const parts = row.classification.split('+').map(part => part.trim());
    const specs = parts
      .filter(part => row.caseClass === 'New Booking' || part !== 'Transport Booking')
      .map(part => TASK_BY_CLASSIFICATION[part])
      .filter(Boolean);
    if (row.caseClass !== 'New Booking' && TASK_BY_CASE_CLASS[row.caseClass]) specs.push(TASK_BY_CASE_CLASS[row.caseClass]);
    return specs.filter((spec, i) => specs.findIndex(other => other[0] === spec[0]) === i);
  }

  const nextCaseNumber = () => Math.max(...Object.keys(CASE_DETAILS).map(id => Number(String(id).replace(/\D/g, '')) || 0)) + 1;

  // rebuildOperationalData() seeds the queue with demo requests EML-4101 to EML-4110. Those
  // references are the spreadsheet's, so the demo rows are removed to keep one request per reference.
  const batchRefs = new Set(EMAIL_BATCH.map(row => row.ref));
  for (let i = QUEUE.length - 1; i >= 0; i--) if (batchRefs.has(QUEUE[i][0])) QUEUE.splice(i, 1);

  // The sender of each email. A customer that already has a Case gets its contact, email, phone and customer number from that
  // Case, with the same lane and goods. "ABB" is the same customer as "ABB Robotics". Customers with no Case yet are listed here.
  const EXTRA_SENDERS = {
    'Kuehne + Nagel': { contact: 'Petra Holm', email: 'petra.holm@kuehne-nagel.com', phone: '+46 8 5063 7010', customerNo: '100412', goods: 'Consolidated pallet shipment', pickup: 'Jönköping, Sweden', delivery: 'Hamburg, Germany', weight: '2,400 kg', domain: 'kuehne-nagel.com' },
  };
  const ALIAS = { 'ABB': 'ABB Robotics' };
  const senderFor = customer => {
    const name = ALIAS[customer] || customer;
    return Object.values(CASE_DETAILS).find(c => c.customer === name && c.contact) || EXTRA_SENDERS[customer] || {};
  };

  EMAIL_BATCH.forEach(row => {
    const due = row.received.split(',')[0];
    const specs = taskSpecs(row);
    const caseId = `CASE-${nextCaseNumber()}`;
    const departments = [...new Set(specs.map(([, cls]) => routedOwner(cls)?.department).filter(Boolean))].join(', ');

    CASE_DETAILS[caseId] = {
      id: caseId, reference: row.ref, customer: row.customer, subject: row.subject,
      caseClass: row.caseClass, classification: row.classification, classes: [...new Set(specs.map(([, cls]) => cls))],
      priority: row.priority, status: 'Pending', requestedDate: due, due, created: row.received,
      departments, note: row.variation, source: sourceLabel(row.ref),
      contact: '', email: '', phone: '', customerNo: '', goods: '', pickup: '', delivery: '', weight: '', body: '', domain: '', attachments: [],
    };
    const sender = senderFor(row.customer);
    Object.assign(CASE_DETAILS[caseId], {
      contact: sender.contact || '', email: sender.email || '', phone: sender.phone || '', customerNo: sender.customerNo || '',
      goods: sender.goods || '', pickup: sender.pickup || '', delivery: sender.delivery || '', weight: sender.weight || '', domain: sender.domain || '',
      body: `Hello AA Logistik team,

${row.subject}. Please see the details below and let us know if you need anything more from us.

Best regards,
${sender.contact || row.customer}
${row.customer}`,
    });
    CASES.push([caseId, row.customer, row.caseClass, departments, row.priority, due, 'Pending']);

    specs.forEach(([title, cls]) => {
      const owner = routedOwner(cls);
      TASKS.push([title, caseId, row.customer, owner?.department || '', owner?.name || 'Unassigned', row.priority, due, 'To-Do', nextTaskNumber(), cls, 'Later']);
    });

    QUEUE.push([row.ref, row.customer, row.subject, '—', row.variation, row.received, 'Awaiting Review']);
  });

  // Opening a request must open its own Case, not the first Case for the same customer.
  const openReviewCaseBase = openReviewCase;
  openReviewCase = function (emailId) {
    const batchCase = Object.values(CASE_DETAILS).find(c => c.reference === emailId);
    if (!batchCase) return openReviewCaseBase(emailId);
    S.reviewEmailId = emailId;
    S.selectedCase = batchCase.id;
    S.page = 'approval';
    render();
  };
})();
