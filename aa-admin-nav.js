/* Administration navigation: an accordion sidebar — Main menu (e.g. "User Management") on top, its
   sub-items shown only once that menu is clicked open, one menu open at a time. The menu containing the
   page currently on screen opens automatically so navigating never hides where you are.
   AI Configuration and General Settings are out of scope and not shown. Integrations and Blocklist
   Management are each a single link (no sub-items) because their content lives on one screen.
   Loaded last, so it wraps the shell and the Masters screens built by the earlier modules. */
(function () {
  const ADMIN_MODULES = [
    { name: 'User Management', items: [
      { key: 'Application Users', label: 'Application Users', page: 'users' },
    ] },
    { name: 'Masters', items: [
      { key: 'Customers', label: 'Customers', desc: 'Customer master data used to identify and route Cases.' },
      { key: 'Contacts', label: 'Contacts', desc: 'People at a Customer who can be reached about a Case.' },
      { key: 'Departments', label: 'Departments', desc: 'Departments used for user association and task routing.' },
      { key: 'Categories', label: 'Categories', desc: 'What kind of service a request is about.' },
      { key: 'Case Types', label: 'Case Types', desc: 'The kind of work a Case represents and the data it needs.' },
    ] },
    { name: 'Task Configuration', items: [
      { key: 'Task Template Mapping', label: 'Task Library', desc: 'Reusable tasks, grouped by Department, picked into a Task Template below.' },
      { key: 'Task Master', label: 'Task Templates', desc: 'Pick which Tasks run for a Category + Case Type + Department. Tasks are generated for a Case only where an exact match exists.' },
    ] },
    { name: 'Rule Management', items: [
      { key: 'Rules', label: 'System Rules', desc: 'Rules that match a case on its conditions, then apply their results.' },
    ] },
    { name: 'Email Settings', items: [
      { key: 'Mailboxes', label: 'Connected Mailboxes', desc: 'Microsoft 365 mailboxes that messages are read from, and the connection each one uses.' },
      { key: 'Email Templates', label: 'Email Templates', desc: 'Predefined email templates used for customer communication.' },
    ] },
    { name: 'Integrations', standalone: true, items: [
      { key: 'Integrations', label: 'Integrations', desc: 'Opter connection settings.' },
    ] },
    { name: 'Blocklist Management', standalone: true, items: [
      { key: 'Blocklist Management', label: 'Blocklist Management', desc: 'Blocked sender email addresses and domains.' },
    ] },
  ];

  window.ADMIN_MODULES = ADMIN_MODULES;
  const adminItem = key => ADMIN_MODULES.flatMap(m => m.items).find(item => item.key === key);
  const moduleOf = key => ADMIN_MODULES.find(m => m.items.some(item => item.key === key));
  const currentTab = () => adminItem(S.masterTab) ? S.masterTab : 'Task Master';

  // Integrations: Opter only (Customer Portal API and Integration Logs are out of scope for now). Opter has
  // two API keys, one per capability: the Order key creates and updates Opter orders, the Customer key reads
  // Opter customers. Both share one base URL. Values are session-only, like the rest of the prototype, and
  // the keys are masked in the inputs the way real secrets would be.
  window.setOpterField = (key, value) => { S.opterSettings = S.opterSettings || {}; S.opterSettings[key] = value; render(); };
  window.saveOpterSettings = () => { toast('Opter settings saved'); };
  AA_ADMIN.panels.Integrations = () => {
    const v = S.opterSettings || {};
    const IN = 'height:36px;border:1px solid var(--line);border-radius:4px;padding:0 10px;font:inherit;width:100%;box-sizing:border-box;background:#fff';
    const label = 'display:grid;gap:5px;font-size:12px;font-weight:650;color:var(--ink-2,#3d4d63)';
    const hint = 'font-size:12px;font-weight:400;color:var(--muted)';
    return `<div class="card"><div class="card-head"><h2>Opter</h2><span class="sub">Connection settings</span></div>
      <div style="padding:16px;display:flex;flex-direction:column;gap:12px;max-width:460px">
        <label style="${label}">Base URL<input value="${editorText(v.url || '')}" onchange="setOpterField('url',this.value)" placeholder="https://api.opter.example.com" style="${IN}"></label>
        <label style="${label}"><span>Order API Key <span style="${hint}">· creates and updates Opter orders</span></span><input type="password" autocomplete="off" value="${editorText(v.orderApiKey || '')}" onchange="setOpterField('orderApiKey',this.value)" placeholder="Enter Order API key" style="${IN}"></label>
        <label style="${label}"><span>Customer API Key <span style="${hint}">· reads Opter customers</span></span><input type="password" autocomplete="off" value="${editorText(v.customerApiKey || '')}" onchange="setOpterField('customerApiKey',this.value)" placeholder="Enter Customer API key" style="${IN}"></label>
        <div><button type="button" class="btn primary" onclick="saveOpterSettings()">Save Settings</button></div>
      </div>
    </div>`;
  };

  // Sidebar: Home and Dashboard first; each grouped module is a clickable header whose sub-items show
  // only while that group is open (accordion — one group open at a time). A standalone module
  // (Integrations, Blocklist Management) is one direct link with no header to click.
  function adminNavHtml() {
    // Open the group holding the current page the first time the admin sidebar renders (so arriving
    // on a page, e.g. from the admin home cards, doesn't land with every group collapsed). After that,
    // only a click (adminToggleNavGroup) changes which group is open — clicking a different group to
    // browse it must not keep snapping back to whichever page is still on screen.
    if (S.adminNavGroup === undefined) {
      const activeModule = S.page === 'users' ? moduleOf('Application Users')
        : S.page === 'masters' ? moduleOf(currentTab())
        : null;
      S.adminNavGroup = activeModule && !activeModule.standalone ? activeModule.name : null;
    }

    const top = (page, text, icon) => `<button class="${S.page === page ? 'active' : ''}" onclick="go('${page}')" aria-label="${text}"><span class="ico">${navigationIcon(icon)}</span><span class="nav-label">${text}</span></button>`;
    const sub = item => {
      const active = item.page ? S.page === item.page : S.page === 'masters' && currentTab() === item.key;
      const onclick = item.page ? `go('${item.page}')` : `openMasterPage(${AA_ADMIN.jsArg(item.key)})`;
      return `<button class="nav-sub nav-admin-sub${active ? ' active' : ''}" onclick="${onclick}" aria-label="${editorText(item.label)}"><span class="nav-label">${editorText(item.label)}</span></button>`;
    };
    const group = m => {
      const open = S.adminNavGroup === m.name;
      return `<button class="nav-admin-group${open ? ' open' : ''}" onclick="adminToggleNavGroup(${AA_ADMIN.jsArg(m.name)})" aria-expanded="${open}"><span class="nav-label">${editorText(m.name)}</span><span class="nav-admin-chevron">${open ? '▾' : '▸'}</span></button>`
        + (open ? m.items.map(sub).join('') : '');
    };
    const standalone = item => {
      const active = S.page === 'masters' && currentTab() === item.key;
      const icon = item.key === 'Integrations'
        ? '<path d="M8 12l4-4M7 9 5.5 7.5a2.5 2.5 0 1 1 3.5-3.5L10.5 5.5M13 11l1.5 1.5a2.5 2.5 0 1 1-3.5 3.5L9.5 14.5"/>'
        : '<path d="M10 2.5 16 5v5c0 4-2.5 6.5-6 7.5-3.5-1-6-3.5-6-7.5V5l6-2.5Z"/><path d="M6.5 13.5l7-7"/>';
      return `<button class="${active ? 'active' : ''}" onclick="openMasterPage(${AA_ADMIN.jsArg(item.key)})" aria-label="${editorText(item.label)}"><span class="ico"><svg viewBox="0 0 20 20" aria-hidden="true">${icon}</svg></span><span class="nav-label">${editorText(item.label)}</span></button>`;
    };
    return ADMIN_MODULES.map(m => m.standalone ? standalone(m.items[0]) : group(m)).join('');
  }

  window.adminToggleNavGroup = name => { S.adminNavGroup = S.adminNavGroup === name ? null : name; render(); };

  document.head.insertAdjacentHTML('beforeend', '<style>'
    + '.nav .nav-admin-group{display:flex;align-items:center;justify-content:space-between;padding:11px 14px;font-size:14px;font-weight:600;letter-spacing:0;text-transform:none;color:#d6e1eb;white-space:nowrap;overflow:hidden;background:transparent;border:0;width:100%;cursor:pointer}'
    + '.nav .nav-admin-group:hover{color:#fff}.nav .nav-admin-group.open{color:#fff}.nav-admin-chevron{font-size:10px;opacity:.85}'
    + '.nav .nav-admin-sub{padding:7px 10px 7px 30px;height:auto;min-height:0;line-height:1.25;text-align:left}.nav .nav-admin-sub .nav-label{white-space:normal}'
    + '.nav-collapsed .nav-admin-group .nav-label,.nav-collapsed .nav-admin-chevron,.nav-collapsed .nav-admin-sub{display:none}'
    + '.sidebar{overflow-y:auto}</style>');

  const adminShellBase = shell;
  shell = function (body) {
    const html = adminShellBase(body);
    if (!isAdminMasterNav()) return html;
    const template = document.createElement('template');
    template.innerHTML = html;
    const nav = template.content.querySelector('.sidebar .nav');
    if (nav) nav.innerHTML = adminNavHtml();
    return template.innerHTML + AA_ADMIN.dialog();
  };

  // Page heading for every Masters item. Anything unknown falls back to Task Templates, so a stale tab
  // value can never land on dead content.
  const masterManagementBase = masterManagement;
  masterManagement = function () {
    if (S.role !== 'Admin') return masterManagementBase();
    // Snap any stale or removed tab value to a known one before either this function or masterContent()
    // reads S.masterTab, so a dead tab can never resurface.
    S.masterTab = currentTab();
    const item = adminItem(S.masterTab);
    const headActions = AA_ADMIN.headActions[S.masterTab];
    return head(item.label, item.desc, headActions ? headActions() : '') + '<div class="master-content">' + masterContent() + '</div>';
  };

  // Content for each Masters tab: a built panel, a pending notice, or the existing screen.
  const masterContentBase = masterContent;
  masterContent = function () {
    const tab = currentTab();
    if (AA_ADMIN.panels[tab]) return AA_ADMIN.panels[tab]();
    const item = adminItem(tab);
    if (item && item.pending) return `<div class="notice">${editorText(item.pending)}</div>`;
    return masterContentBase();
  };
})();
