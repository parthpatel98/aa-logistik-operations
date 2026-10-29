/* Email Settings: Connected Mailboxes. Each Microsoft 365 mailbox is read through its own Microsoft Entra app
   registration, so the connection parameters live on the mailbox itself, not in Integrations (which holds
   system-wide services such as Opter). Values are session-only, like the rest of the prototype: nothing is
   read from the mailbox live yet. */
(function () {
  const IN = 'height:36px;border:1px solid var(--line);border-radius:4px;padding:0 10px;font:inherit;width:100%;box-sizing:border-box;background:#fff';
  const label = 'display:grid;gap:5px;font-size:12px;font-weight:650;color:var(--ink-2,#3d4d63)';

  // Connection parameters per mailbox: where the mailbox is, which Entra app may read it, and what to read.
  const FIELDS = [
    ['tenant', 'Directory (tenant) ID', 'text', 'e.g. 9b1d…-tenant-guid'],
    ['client', 'Application (client) ID', 'text', 'Entra app registration client ID'],
    ['secret', 'Client secret', 'password', 'Enter client secret'],
    ['folder', 'Mail folder', 'text', 'Inbox'],
  ];

  const connectionKey = address => address;
  const connectionOf = address => (S.mailboxConnections || {})[connectionKey(address)] || {};
  const isConfigured = c => !!(c.tenant && c.client && c.secret);

  window.setMailboxField = (address, field, value) => {
    S.mailboxConnections = S.mailboxConnections || {};
    const key = connectionKey(address);
    S.mailboxConnections[key] = { ...(S.mailboxConnections[key] || {}), [field]: value };
    render();
  };
  // A connection is only saved when the three values needed to sign in are filled in. The mail folder is optional
  // and falls back to Inbox.
  window.saveMailboxConnection = (address, name) => {
    const c = connectionOf(address);
    const missing = FIELDS.filter(([field]) => field !== 'folder' && !c[field]).map(([, text]) => text);
    if (missing.length) { toast(`Enter ${missing.join(', ')} before saving`); return; }
    toast(`${name} connection saved`);
    render();
  };

  function mailboxCard(name, address, department, isDefault) {
    const c = connectionOf(address);
    const status = isConfigured(c)
      ? '<span class="pill green">Configured</span>'
      : '<span class="pill">Not configured</span>';
    const fields = FIELDS.map(([field, text, type, placeholder]) => `
        <label style="${label}">${text}<input type="${type}" autocomplete="off" value="${editorText(c[field] || (field === 'folder' ? 'Inbox' : ''))}" placeholder="${editorText(placeholder)}" onchange="setMailboxField(${AA_ADMIN.jsArg(address)},${AA_ADMIN.jsArg(field)},this.value)" style="${IN}"></label>`).join('');
    return `<div class="card" style="margin-bottom:14px">
      <div class="card-head"><h2>${editorText(name)}</h2><span class="sub code-text">${editorText(address)}</span>${status}</div>
      <div style="padding:16px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 16px">
        <div class="sub" style="grid-column:1 / -1">Microsoft 365 mailbox · ${editorText(department)}${isDefault ? ' · Default' : ''}</div>
        ${fields}
        <div style="grid-column:1 / -1"><button type="button" class="btn primary" onclick="saveMailboxConnection(${AA_ADMIN.jsArg(address)},${AA_ADMIN.jsArg(name)})">Save Connection</button></div>
      </div>
    </div>`;
  }

  AA_ADMIN.panels.Mailboxes = () => MASTER_MAILBOXES.map(([name, address, department, def]) => mailboxCard(name, address, department, def === 'Default')).join('')
    + '<div class="master-guidance">Which mailbox a message arrives in is a routing hint, never a category on its own.</div>';
})();
