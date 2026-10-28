const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const custPath = fs.existsSync(path.join(rootDir, 'Customer Info.json'))
  ? path.join(rootDir, 'Customer Info.json')
  : 'C:/Users/hb.DESKTOP-C0DHAUD/Downloads/Customer Info.json';

const contactsPath = fs.existsSync(path.join(rootDir, 'Contacts.json'))
  ? path.join(rootDir, 'Contacts.json')
  : 'C:/Users/hb.DESKTOP-C0DHAUD/Downloads/COntacts.json';

console.log('Reading customers from:', custPath);
console.log('Reading contacts from:', contactsPath);

const rawCust = JSON.parse(fs.readFileSync(custPath, 'utf8'));
const rawContactsData = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
const rawContacts = Array.isArray(rawContactsData) ? rawContactsData : (rawContactsData.data || []);

console.log(`Loaded ${rawCust.length} customers and ${rawContacts.length} contacts.`);

// Build index of customer IDs and Names
const custIdSet = new Set(rawCust.map(c => String(c.id)));
const custByName = new Map();
rawCust.forEach(c => {
  if (c.name) custByName.set(c.name.trim().toLowerCase(), String(c.id));
});

// Count contacts per customer
const contactCounts = new Map();
const processedContacts = [];
let contactSeq = 0;

for (const r of rawContacts) {
  const rawId = String(r.CustomerID || '').trim();
  const cname = String(r.CompanyName || '').trim();
  let matchedId = '';
  let matchedName = 'Unassigned';

  if (rawId && rawId !== '-1' && custIdSet.has(rawId)) {
    matchedId = rawId;
    const found = rawCust.find(c => String(c.id) === rawId);
    matchedName = found ? found.name : cname;
  } else if (cname && custByName.has(cname.toLowerCase())) {
    matchedId = custByName.get(cname.toLowerCase());
    const found = rawCust.find(c => String(c.id) === matchedId);
    matchedName = found ? found.name : cname;
  } else if (cname) {
    matchedName = cname;
  }

  if (matchedId) {
    contactCounts.set(matchedId, (contactCounts.get(matchedId) || 0) + 1);
  }

  const name = String(r.Name || '').trim();
  if (name) {
    processedContacts.push({
      id: 'contact-' + (++contactSeq),
      name,
      email: String(r.Email || '').trim(),
      phone: String(r.Cellphone || r.Phone || '').trim(),
      customerId: matchedId,
      customerName: matchedName,
      info: String(r.Info || '').trim()
    });
  }
}

// Build customer master rows
const customers = rawCust
  .filter(r => r.id && r.name && r.name !== '0')
  .map(r => {
    // Construct address
    const visitStreet = [r.streetVisit, r.streetNoVisit].filter(Boolean).join(' ');
    const visitLoc = [r.zipCodeVisit, r.cityVisit].filter(Boolean).join(' ');
    const visitAddr = [visitStreet, visitLoc].filter(Boolean).join(', ');

    const invStreet = [r.streetInvoice, r.streetNoInvoice].filter(Boolean).join(' ');
    const invLoc = [r.zipCodeInvoice, r.cityInvoice].filter(Boolean).join(' ');
    const invAddr = [invStreet, invLoc].filter(Boolean).join(', ');

    const address = visitAddr || invAddr || r.addressLine1Visit || r.companyVisit || '';
    const city = r.cityVisit || r.cityInvoice || '';

    return {
      id: String(r.id),
      name: String(r.name).trim(),
      customerCode: String(r.customerCode || '').trim(),
      customerNumber: String(r.customerNumber || '').trim(),
      email: String(r.emailAddress || r.emailAddressInvoice || '').trim(),
      phone: String(r.phone1 || r.phone2 || '').trim(),
      address,
      city,
      orgNumber: String(r.organizationNumber || '').trim(),
      vatNumber: String(r.vatNumber || '').trim(),
      invoiceReference: String(r.invoiceReference || '').trim(),
      dispatchInfo: String(r.dispatchInformation || '').trim(),
      driverInfo: String(r.driverInformation || '').trim(),
      priceList: 'Base',
      active: r.active !== false,
      contacts: contactCounts.get(String(r.id)) || 0
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'sv'));

const out = `/* Generated from Customer Info.json and Contacts.json. Do not hand-edit — rerun scripts/build-customers-data.js instead. */
const MASTER_CUSTOMERS = ${JSON.stringify(customers, null, 2)};
const MASTER_CONTACTS = ${JSON.stringify(processedContacts, null, 2)};
`;

const targetFile = path.join(rootDir, 'data-customers.js');
fs.writeFileSync(targetFile, out, 'utf8');
console.log(`Successfully generated ${targetFile}: ${customers.length} customers, ${processedContacts.length} contacts.`);
