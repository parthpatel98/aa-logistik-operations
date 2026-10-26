/* Masters: Customers and Contacts. Contacts link back to a Customer by id and
   can be filtered by customer, which is also how other screens will look up
   "contacts for this customer" once they grow a Customer field. Each page has
   a manual Sync button (prototype: re-reads the bundled master data and
   stamps a "last synced" time — there is no live backend to call yet).
   Contacts support full CRUD. Customers are maintained in the Customers panel (aa-admin-masters.js). */
(function () {
  const IN = 'height:36px;border:1px solid var(--line);border-radius:4px;padding:0 10px;font:inherit;width:100%;box-sizing:border-box;background:#fff';
  const label = 'display:grid;gap:5px;font-size:12px;font-weight:650;color:var(--ink-2,#3d4d63)';

  MASTER_SUB_PAGES.splice(
    MASTER_SUB_PAGES.findIndex(x => x[0] === 'Customers') + 1,
    0,
    ['Contacts', 'Contacts', 'People at a Customer who can be reached about a Case.']
  );

  function contactsOf(customerId) {
    return MASTER_CONTACTS.filter(c => c.customerId === String(customerId));
  }
  window.contactsForCustomer = contactsOf;

  window.setContactsCustomerFilter = function (value) {
    S.contactsCustomerFilter = value;
    S.adminPage = S.adminPage || {}; S.adminPage.contacts = 1;
    render();
  };

  // --- Sync (prototype: simulated — no live source to call yet) ---
  window.syncMasterData = function (kind) {
    if (S.masterSyncing) return;
    S.masterSyncing = kind;
    render();
    setTimeout(() => {
      S.masterSyncing = null;
      const at = auditTimestamp();
      if (kind === 'customers') { S.customersSyncedAt = at; toast(`Synced ${MASTER_CUSTOMERS.length} customers`); }
      else { S.contactsSyncedAt = at; toast(`Synced ${MASTER_CONTACTS.length} contacts`); }
      render();
    }, 650);
  };

  // --- Contacts CRUD ---
  window.contactNew = function () {
    S.contactForm = { mode: 'create', id: null, name: '', email: '', phone: '', customerId: S.contactsCustomerFilter || '', info: '' };
    render();
  };
  window.contactEdit = function (id) {
    const c = MASTER_CONTACTS.find(x => x.id === id);
    if (!c) return;
    S.contactForm = { mode: 'edit', id: c.id, name: c.name, email: c.email, phone: c.phone, customerId: c.customerId, info: c.info };
    render();
  };
  window.contactClose = function () { S.contactForm = null; render(); };
  window.contactField = function (k, v) { S.contactForm[k] = v; render(); };
  window.contactSave = function () {
    const f = S.contactForm;
    if (!f.name.trim()) { toast('Enter a contact name'); return; }
    const customer = MASTER_CUSTOMERS.find(x => x.id === f.customerId);
    const obj = { name: f.name.trim(), email: f.email.trim(), phone: f.phone.trim(), customerId: f.customerId, customerName: customer ? customer.name : 'Unassigned', info: f.info.trim() };
    if (f.mode === 'edit') Object.assign(MASTER_CONTACTS.find(x => x.id === f.id), obj);
    else MASTER_CONTACTS.push({ id: 'contact-' + Date.now(), ...obj });
    S.contactForm = null;
    toast(f.mode === 'edit' ? 'Contact updated' : 'Contact added');
    render();
  };
  window.contactDelete = function (id) {
    id = id || (S.contactForm && S.contactForm.id);
    if (!id) return;
    if (!window.confirm('Delete this contact? This cannot be undone.')) return;
    const i = MASTER_CONTACTS.findIndex(x => x.id === id);
    if (i >= 0) MASTER_CONTACTS.splice(i, 1);
    S.contactForm = null;
    toast('Contact deleted');
    render();
  };

  function contactModal() {
    const f = S.contactForm, edit = f.mode === 'edit';
    const customerOptions = [['', 'Unassigned'], ...MASTER_CUSTOMERS.filter(c => c.id === f.customerId || AA_ADMIN.isActive('customers', c.id)).map(c => [c.id, c.name])];
    return `<div onclick="if(event.target===this)contactClose()" style="position:fixed;inset:0;background:rgba(5,24,42,.46);z-index:2100;display:grid;place-items:center;padding:24px">
      <div style="width:520px;max-width:94vw;max-height:90vh;display:flex;flex-direction:column;background:#fff;border-radius:7px;box-shadow:0 22px 60px rgba(0,0,0,.25)">
        <div style="padding:16px 20px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between">
          <b style="font-size:15px;color:var(--ink)">${edit ? 'Edit Contact' : 'Add Contact'}</b>
          <button type="button" onclick="contactClose()" aria-label="Close" style="border:0;background:transparent;cursor:pointer;color:var(--muted);font-size:18px;line-height:1;padding:4px">×</button>
        </div>
        <div style="padding:16px 20px;display:flex;flex-direction:column;gap:12px;overflow:auto;flex:1">
          <label style="${label}">Contact name<input value="${editorText(f.name)}" onchange="contactField('name',this.value)" style="${IN}"></label>
          <label style="${label}">Customer${sel(customerOptions, f.customerId, `contactField('customerId',this.value)`)}</label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <label style="${label}">Email<input type="email" value="${editorText(f.email)}" onchange="contactField('email',this.value)" style="${IN}"></label>
            <label style="${label}">Phone<input value="${editorText(f.phone)}" onchange="contactField('phone',this.value)" style="${IN}"></label>
          </div>
          <label style="${label}">Info<input value="${editorText(f.info)}" onchange="contactField('info',this.value)" style="${IN}"></label>
        </div>
        <div style="padding:13px 20px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:9px">
          <div>${edit ? `<button type="button" onclick="contactDelete()" style="border:1px solid var(--red-ink,#c51f2d);background:#fff;color:var(--red-ink,#c51f2d);border-radius:4px;padding:9px 15px;font:inherit;font-weight:700;cursor:pointer">Delete</button>` : ''}</div>
          <div style="display:flex;gap:9px"><button type="button" class="btn" onclick="contactClose()">Cancel</button><button type="button" class="btn primary" onclick="contactSave()">Save Contact</button></div>
        </div>
      </div></div>`;
  }

  function sel(pairs, val, handler) {
    return `<select onchange="${handler}" style="${IN}">${pairs.map(([v, l]) => `<option value="${editorText(v)}" ${v === val ? 'selected' : ''}>${editorText(l)}</option>`).join('')}</select>`;
  }

  window.setContactsQuery = function (value) { S.contactsQuery = value; S.adminPage = S.adminPage || {}; S.adminPage.contacts = 1; render(); };

  // Customer filter: type to search, then pick a match. Typing only redraws the suggestion list, so the
  // page is not re-rendered (and the input keeps focus) until a customer is picked or the filter is cleared.
  const customerNameOf = id => { const c = MASTER_CUSTOMERS.find(x => x.id === id); return c ? c.name : ''; };
  const customerSuggestions = query => {
    const needle = query.trim().toLowerCase();
    const matches = needle
      ? MASTER_CUSTOMERS.filter(c => [c.name, c.customerNumber].join(' ').toLowerCase().includes(needle))
      : MASTER_CUSTOMERS;
    if (!matches.length) return '<div style="padding:9px 12px;color:var(--muted);font-size:13px">No customers match</div>';
    return matches.slice(0, 10).map(c => `<button type="button" data-id="${editorText(c.id)}" onmousedown="event.preventDefault();setContactsCustomerFilter(this.dataset.id)" style="display:flex;justify-content:space-between;gap:12px;width:100%;border:0;background:#fff;padding:8px 12px;font:inherit;font-size:13px;text-align:left;cursor:pointer"><span>${editorText(c.name)}</span><span style="color:var(--muted);font-size:12px">${editorText(c.customerNumber || '')}</span></button>`).join('');
  };
  window.contactsCustomerTyped = function (input) {
    const list = document.getElementById('contacts-customer-list');
    if (!list) return;
    const selectedName = customerNameOf(S.contactsCustomerFilter || '');
    // Focusing the box shows every customer; the selected name is not a search term.
    list.innerHTML = customerSuggestions(input.value === selectedName ? '' : input.value);
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  };
  window.contactsCustomerBlur = function (input) {
    const list = document.getElementById('contacts-customer-list');
    if (list) list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.value = customerNameOf(S.contactsCustomerFilter || '');
  };
  window.contactsCustomerEnter = function (event) {
    if (event.key === 'Escape') { event.target.blur(); return; }
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const first = document.querySelector('#contacts-customer-list button');
    if (first) setContactsCustomerFilter(first.dataset.id);
  };
  function customerFilterBox(filter) {
    const selectedName = customerNameOf(filter);
    return `<div style="position:relative;display:flex;align-items:center;gap:6px">
          <input role="combobox" aria-label="Filter contacts by customer" aria-expanded="false" aria-autocomplete="list" autocomplete="off" value="${editorText(selectedName)}" placeholder="Type to find a customer" oninput="contactsCustomerTyped(this)" onfocus="contactsCustomerTyped(this)" onblur="contactsCustomerBlur(this)" onkeydown="contactsCustomerEnter(event)" style="height:36px;border:1px solid var(--line);border-radius:4px;padding:0 10px;font:inherit;width:240px;box-sizing:border-box;background:#fff">
          ${filter ? `<button type="button" onmousedown="event.preventDefault();setContactsCustomerFilter('')" aria-label="Clear customer filter" title="Clear customer filter" style="border:0;background:transparent;cursor:pointer;color:var(--muted);font-size:16px;line-height:1;padding:4px">×</button>` : ''}
          <div id="contacts-customer-list" hidden style="position:absolute;top:40px;left:0;width:340px;max-height:280px;overflow:auto;z-index:20;background:#fff;border:1px solid var(--line);border-radius:4px;box-shadow:0 8px 20px rgba(17,39,65,.15)">${customerSuggestions('')}</div>
        </div>`;
  }

  function contactsView() {
    const filter = S.contactsCustomerFilter || '';
    const q = (S.contactsQuery || '').trim().toLowerCase();
    const base = filter ? contactsOf(filter) : MASTER_CONTACTS;
    const list = q ? base.filter(c => [c.name, c.email, c.phone, c.customerName].join(' ').toLowerCase().includes(q)) : base;
    const { pageRows, pager } = AA_ADMIN.paginate(list, 'contacts', 15);
    const toolbar = `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;flex-wrap:nowrap">
      <div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap;flex:1 1 auto;min-width:0">
        <input aria-label="Search contacts" value="${editorText(S.contactsQuery || '')}" onchange="setContactsQuery(this.value)" placeholder="Search name, email or phone" style="height:36px;border:1px solid var(--line);border-radius:4px;padding:0 10px;font:inherit;min-width:160px;width:220px">
        <span style="font-size:12px;font-weight:650;color:var(--ink-2,#3d4d63)">Customer</span>
        ${customerFilterBox(filter)}
        <span style="color:var(--muted);font-size:12px">${list.length} contact${list.length === 1 ? '' : 's'}</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex:0 0 auto;white-space:nowrap">
        ${S.contactsSyncedAt ? `<span style="color:var(--muted);font-size:10px!important">Last synced ${editorText(S.contactsSyncedAt)}</span>` : ''}
        <button type="button" class="btn" onclick="syncMasterData('contacts')" ${S.masterSyncing === 'contacts' ? 'disabled' : ''}>${S.masterSyncing === 'contacts' ? '↻ Syncing…' : '↻ Sync'}</button>
        <button type="button" class="btn primary" onclick="contactNew()">+ Add Contact</button>
      </div>
    </div>`;
    const emailCell = email => email
      ? `<span title="${editorText(email)}" style="display:inline-block;max-width:170px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:bottom">${editorText(email)}</span>`
      : '<span style="color:var(--muted)">—</span>';
    const rows = pageRows.map(c => [
      `<strong>${editorText(c.name)}</strong>`,
      emailCell(c.email),
      editorText(c.phone) || '<span style="color:var(--muted)">—</span>',
      c.customerId ? editorText(c.customerName) : '<span style="color:var(--muted)">Unassigned</span>',
      `<div style="display:flex;gap:2px;justify-content:flex-end"><button type="button" onclick="contactEdit('${c.id}')" title="Edit" aria-label="Edit contact" style="border:0;background:transparent;color:var(--blue);cursor:pointer;font-size:15px;padding:5px"><span style="display:inline-block;transform:scaleX(-1)">✎</span></button><button type="button" onclick="contactDelete('${c.id}')" title="Delete" aria-label="Delete contact" style="border:0;background:transparent;color:var(--red-ink,#c51f2d);cursor:pointer;font-size:15px;padding:5px">🗑</button></div>`,
    ]);
    return toolbar
      + masterTable(['Contact', 'Email', 'Phone', 'Customer', ''], rows) + pager
      + (S.contactForm ? contactModal() : '');
  }

  const customersMasterContentBase = masterContent;
  masterContent = function () {
    const tab = S.masterTab || 'Task Master';
    if (tab === 'Contacts') return contactsView();
    return customersMasterContentBase();
  };
})();
