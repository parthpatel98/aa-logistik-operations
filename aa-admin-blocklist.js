/* Blocklist Management: blocked sender email addresses and blocked sender domains. Each entry can be
   Active or Inactive; only Active entries block. Adding, editing or deleting an entry never changes
   existing emails or cases. AA_isSenderBlocked(sender) is the check for the incoming-email step. The
   prototype has no live intake, so nothing calls it yet. Rows can be selected, then enabled, disabled or
   deleted together. Loaded after aa-admin-core.js. */
(function () {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const DOMAIN_RE = /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/;
  const BLOCKLIST = window.AA_BLOCKLIST = {
    addresses: [
      { id: 'blockAddress-seed-1', value: 'winner@prize-claim-center.xyz', addedAt: '18/10/2026, 09:12' },
      { id: 'blockAddress-seed-2', value: 'noreply@free-crypto-gains.top', addedAt: '19/10/2026, 14:03' },
      { id: 'blockAddress-seed-3', value: 'offers@cheap-pills-online.biz', addedAt: '21/10/2026, 07:45' },
    ],
    domains: [
      { id: 'blockDomain-seed-1', value: 'prize-claim-center.xyz', addedAt: '18/10/2026, 09:14' },
      { id: 'blockDomain-seed-2', value: 'free-crypto-gains.top', addedAt: '19/10/2026, 14:05' },
      { id: 'blockDomain-seed-3', value: 'cheap-pills-online.biz', addedAt: '21/10/2026, 07:47' },
      { id: 'blockDomain-seed-4', value: 'easy-loan-approval.click', addedAt: '22/10/2026, 11:30' },
    ],
  };

  const normalizeAddress = value => String(value || '').trim().toLowerCase();
  const normalizeDomain = value => String(value || '').trim().toLowerCase().replace(/^@/, '');

  // Matching is exact: "example.com" blocks mail from example.com, not from its subdomains.
  window.AA_isSenderBlocked = function (sender) {
    const address = normalizeAddress(sender), domain = address.split('@')[1] || '';
    const addressHit = BLOCKLIST.addresses.find(e => e.value === address && AA_ADMIN.isActive('blockAddress', e.id));
    if (addressHit) return { type: 'address', entry: addressHit };
    const domainHit = BLOCKLIST.domains.find(e => e.value === domain && AA_ADMIN.isActive('blockDomain', e.id));
    return domainHit ? { type: 'domain', entry: domainHit } : null;
  };

  // One form spec per list; the address and domain screens differ only in these settings.
  function blockFormSpec(kind, list, rules) {
    return {
      noun: rules.noun,
      toggleable: true,
      blank: () => ({ value: '' }),
      load: id => { const e = list().find(x => x.id === id); return e && { value: e.value }; },
      fields: () => [{ key: 'value', label: rules.fieldLabel, hint: rules.hint }],
      validate: (v, id) => {
        const value = rules.normalize(v.value);
        if (!rules.isValid(value)) return rules.invalid;
        if (list().some(e => e.id !== id && e.value === value)) return rules.duplicate;
        return '';
      },
      save: (v, id) => {
        const value = rules.normalize(v.value);
        if (id) list().find(e => e.id === id).value = value;
        else list().push({ id: kind + '-' + Date.now(), value, addedAt: auditTimestamp() });
      },
      remove: id => { const i = list().findIndex(e => e.id === id); if (i >= 0) list().splice(i, 1); },
    };
  }

  AA_ADMIN.forms.blockAddress = blockFormSpec('blockAddress', () => BLOCKLIST.addresses, {
    noun: 'Blocked Address', fieldLabel: 'Sender email address', hint: 'Example: sender@example.com',
    normalize: normalizeAddress, isValid: v => EMAIL_RE.test(v),
    invalid: 'Enter a valid email address, for example sender@example.com', duplicate: 'This address is already blocked',
  });
  AA_ADMIN.forms.blockDomain = blockFormSpec('blockDomain', () => BLOCKLIST.domains, {
    noun: 'Blocked Domain', fieldLabel: 'Sender domain', hint: 'Example: example.com',
    normalize: normalizeDomain, isValid: v => DOMAIN_RE.test(v),
    invalid: 'Enter a valid domain, for example example.com', duplicate: 'This domain is already blocked',
  });

  const listOf = kind => kind === 'blockAddress' ? BLOCKLIST.addresses : BLOCKLIST.domains;

  // Selected row ids per list, kept on the session state. Ids of entries that no longer exist are dropped.
  const selectedIds = kind => {
    S.blocklistSelected = S.blocklistSelected || {};
    const live = (S.blocklistSelected[kind] || []).filter(id => listOf(kind).some(e => e.id === id));
    S.blocklistSelected[kind] = live;
    return live;
  };
  window.blocklistToggleRow = (kind, id) => {
    const ids = selectedIds(kind), i = ids.indexOf(id);
    if (i >= 0) ids.splice(i, 1); else ids.push(id);
    render();
  };
  window.blocklistToggleAll = (kind, checked) => {
    S.blocklistSelected = S.blocklistSelected || {};
    S.blocklistSelected[kind] = checked ? listOf(kind).map(e => e.id) : [];
    render();
  };
  // Applies one action to every selected entry: enable, disable or delete.
  window.blocklistBulk = (kind, action) => {
    const ids = selectedIds(kind), list = listOf(kind), count = ids.length;
    if (!count || !action) return;
    if (action === 'delete') {
      if (!window.confirm(`Delete ${count} selected ${count === 1 ? 'entry' : 'entries'}? This cannot be undone.`)) return;
      ids.forEach(id => { const i = list.findIndex(e => e.id === id); if (i >= 0) list.splice(i, 1); AA_ADMIN.clearStatus(kind, id); });
    } else {
      ids.forEach(id => AA_ADMIN.setActive(kind, id, action === 'enable'));
    }
    S.blocklistSelected[kind] = [];
    toast(action === 'delete' ? `${count} deleted` : `${count} set to ${action === 'enable' ? 'Active' : 'Inactive'}`);
    render();
  };

  function blockSection(title, kind, header, addText, emptyText) {
    const list = listOf(kind), ids = selectedIds(kind);
    const allChecked = list.length > 0 && ids.length === list.length;
    const rows = list.map(e => [
      `<input type="checkbox" aria-label="Select ${editorText(e.value)}" ${ids.includes(e.id) ? 'checked' : ''} onchange="blocklistToggleRow('${kind}',${AA_ADMIN.jsArg(e.id)})" style="width:16px;height:16px;cursor:pointer">`,
      `<span class="code-text">${editorText(e.value)}</span>`,
      AA_ADMIN.statusPill(AA_ADMIN.isActive(kind, e.id)),
      editorText(e.addedAt || '—'),
      AA_ADMIN.actions(kind, e.id, { remove: true }),
    ]);
    const selectAll = `<input type="checkbox" aria-label="Select all" ${allChecked ? 'checked' : ''} onchange="blocklistToggleAll('${kind}',this.checked)" style="width:16px;height:16px;cursor:pointer">`;
    // With rows selected, one bar offers a single bulk action: pick it in the dropdown, then Apply.
    const bar = ids.length
      ? `<div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px;padding:8px 12px;margin-bottom:12px;border-radius:5px;background:#eef6fd;font-size:13px">`
        + `<strong style="margin-right:4px">${ids.length} selected</strong>`
        + `<select aria-label="Bulk action" style="height:34px;border:1px solid var(--line);border-radius:4px;padding:0 10px;font:inherit;background:#fff">`
        + `<option value="">Choose an action…</option><option value="enable">Enable</option><option value="disable">Disable</option><option value="delete">Delete</option></select>`
        + `<button type="button" class="btn primary" onclick="blocklistBulk('${kind}',this.previousElementSibling.value)">Apply</button>`
        + `<button type="button" class="link" onclick="blocklistToggleAll('${kind}',false)" style="margin-left:auto">Clear selection</button>`
        + `</div>`
      : '';
    return `<div class="card">
      <div class="card-head" style="display:flex;justify-content:space-between;align-items:center;gap:10px"><h2>${title}</h2>${AA_ADMIN.addButton(kind, addText)}</div>
      <div style="padding:14px">${bar}${list.length ? masterTable([selectAll, header, 'Status', 'Added', ''], rows) : `<div class="notice">${emptyText}</div>`}</div>
    </div>`;
  }

  // One screen for both lists, so an admin manages blocked addresses and domains in the same place.
  window.setBlocklistTab = tab => { S.blocklistTab = tab; render(); };
  AA_ADMIN.panels['Blocklist Management'] = () => {
    const tab = S.blocklistTab === 'domains' ? 'domains' : 'addresses';
    const tabs = `<div class="master-tabs" style="margin-bottom:14px">
      <button type="button" class="${tab === 'addresses' ? 'active' : ''}" onclick="setBlocklistTab('addresses')">Email Addresses</button>
      <button type="button" class="${tab === 'domains' ? 'active' : ''}" onclick="setBlocklistTab('domains')">Domains</button>
    </div>`;
    const section = tab === 'addresses'
      ? blockSection('Blocked Email Addresses', 'blockAddress', 'Sender Address', '+ Add Address', 'No blocked email addresses.')
      : blockSection('Blocked Domains', 'blockDomain', 'Sender Domain', '+ Add Domain', 'No blocked domains.');
    return tabs + section;
  };
})();
