(function () {
  const PERM_LABELS = { viewCompanyTasks: 'View company Tasks', requestAssignments: 'Request assignments', updateTasks: 'Update Tasks', viewDashboard: 'View Dashboard', sendAcknowledgements: 'Send acknowledgements', approveRequests: 'Approve assignment requests' };
  const flag = (on) => on ? '<span style="padding:3px 8px;border-radius:4px;font-size:12px;font-weight:650;background:#e9f8ef;color:#188756">Yes</span>' : '<span style="padding:3px 8px;border-radius:4px;font-size:12px;font-weight:650;background:#edf2f7;color:#6b778a">No</span>';

  window.openUserDrawer = function (id) { S.userOpen = id; render(); };
  window.closeUserDrawer = function () { S.userOpen = null; render(); };

  function userDrawer() {
    const u = USER_MASTER.find(x => x.id === S.userOpen);
    if (!u) return '';
    const p = PERMISSIONS[u.id] || {};
    const open = TASKS.filter(t => t[4] === u.name && t[7] !== 'Completed');
    return `<div onclick="closeUserDrawer()" style="position:fixed;inset:0;background:rgba(8,29,49,.25);z-index:40"></div>
      <aside style="position:fixed;right:0;top:0;bottom:0;width:440px;background:#fff;z-index:41;box-shadow:-8px 0 25px rgba(17,39,65,.18);display:flex;flex-direction:column">
        <div style="padding:16px 20px;border-bottom:1px solid var(--line);display:flex;gap:12px;align-items:center"><span class="avatar">${u.initials}</span><div style="flex:1"><b style="font-size:15px">${u.name}</b><div class="sub">${u.title} · ${u.department}</div></div><button onclick="closeUserDrawer()" aria-label="Close" style="border:0;background:transparent;font-size:20px;cursor:pointer">×</button></div>
        <div style="flex:1;overflow:auto;padding:8px 20px">
          <div class="sub" style="padding:12px 0 6px;font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700">Permissions</div>
          ${Object.entries(PERM_LABELS).map(([k, l]) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #edf2f7"><span>${l}</span>${flag(!!p[k])}</div>`).join('')}
          <div class="sub" style="padding:16px 0 6px;font-size:10px;letter-spacing:.06em;text-transform:uppercase;font-weight:700">Open Tasks (${open.length})</div>
          ${open.length ? open.map(t => `<div style="padding:8px 0;border-bottom:1px solid #edf2f7"><b style="color:#0871c7">${t[8]}</b> ${t[0]}</div>`).join('') : '<div class="sub">No open Tasks</div>'}
        </div>
      </aside>`;
  }

  const userDrawerBase = userManagement;
  userManagement = function () {
    let html = userDrawerBase();
    if (S.role !== 'Admin') return html;
    const q = (S.userSearch || '').trim().toLowerCase();
    const ids = USER_MASTER.filter(u => !q || [u.name, u.department, u.title, u.workScope, ...u.classifications].join(' ').toLowerCase().includes(q)).map(u => u.id);
    const k = html.indexOf('<tbody>');
    if (k >= 0) {
      let i = 0;
      html = html.slice(0, k) + html.slice(k).replace(/<tr>/g, () => `<tr onclick="openUserDrawer('${ids[i++]}')" style="cursor:pointer">`);
    }
    return html + (S.userOpen ? userDrawer() : '');
  };

  const typographyRenderBase = render;
  render = function () {
    typographyRenderBase();
    document.querySelectorAll('#root b[style*="font-size:15px"],#root b[style*="font-size:14px"],#root strong[style*="font-size:15px"],#root strong[style*="font-size:14px"]').forEach(el => {
      el.style.fontSize = '16px'; el.style.fontWeight = '700';
    });
  };
})();
