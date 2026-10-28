/* Admin sidebar in collapsed mode.
   - Every group has an icon, so the collapsed sidebar shows a clear button for each group.
   - Hovering a group icon opens a flyout to its right listing the group's pages. Moving the pointer away closes it after
     a short pause, so it can be reached. Clicking a page goes there and closes the flyout. Clicking the icon pins the
     flyout open, for touch and keyboard use. The accordion in expanded mode is not changed by hovering.
   - Standalone items (Integrations, Blocklist Management) show their name as a tooltip.
   Loaded last so it wraps shell (the sidebar markup). */
(function () {
  const ICONS = {
    'User Management': '<circle cx="10" cy="7" r="3"/><path d="M4 16.5c.8-2.6 3.1-4 6-4s5.2 1.4 6 4"/>',
    'Masters': '<ellipse cx="10" cy="5" rx="6.5" ry="2.5"/><path d="M3.5 5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V5M3.5 10v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5"/>',
    'Task Configuration': '<rect x="4" y="3.5" width="12" height="13" rx="2"/><path d="M7 8l1.5 1.5L11 7M7 13h6"/>',
    'Rule Management': '<path d="M10 2.5 16 5v5c0 4-2.5 6.5-6 7.5-3.5-1-6-3.5-6-7.5V5l6-2.5Z"/><path d="M6.5 10l2.5 2.5 4.5-4.5"/>',
    'Email Settings': '<rect x="3" y="5" width="14" height="10" rx="2"/><path d="M3.5 6l6.5 5 6.5-5"/>',
  };
  const iconSvg = paths => `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

  const isCollapsed = () => !!document.querySelector('.nav-collapsed');
  const groupOf = button => {
    const name = (button.querySelector('.nav-label') || button).textContent.trim();
    return (window.ADMIN_MODULES || []).find(m => m.name === name);
  };
  const itemHtml = item => {
    const active = item.page ? S.page === item.page : S.page === 'masters' && S.masterTab === item.key;
    const onclick = item.page ? `go('${item.page}')` : `openMasterPage(${AA_ADMIN.jsArg(item.key)})`;
    return `<button type="button" class="admin-flyout-item${active ? ' active' : ''}" onclick="${onclick};hideAdminFlyout()">${editorText(item.label)}</button>`;
  };

  // The flyout sits on the body, not in the sidebar, so the sidebar's scroll area cannot clip it.
  let flyout = null, hideTimer = null, pinned = false, anchorEl = null;
  function ensureFlyout() {
    if (flyout) return flyout;
    flyout = document.createElement('div');
    flyout.className = 'admin-flyout';
    flyout.hidden = true;
    flyout.addEventListener('mouseenter', () => clearTimeout(hideTimer));
    flyout.addEventListener('mouseleave', scheduleHide);
    document.body.appendChild(flyout);
    return flyout;
  }
  function showFlyout(button, pin) {
    const group = groupOf(button);
    if (!group) return;
    clearTimeout(hideTimer);
    const box = ensureFlyout();
    if (anchorEl !== button) {
      const r = button.getBoundingClientRect();
      box.style.top = `${Math.max(8, r.top)}px`;
      box.style.left = `${r.right + 10}px`;
      box.innerHTML = `<div class="admin-flyout-title">${editorText(group.name)}</div>${group.items.map(itemHtml).join('')}`;
    }
    box.hidden = false;
    anchorEl = button;
    pinned = pinned || pin;
  }
  function hideAdminFlyout() {
    clearTimeout(hideTimer);
    if (flyout) flyout.hidden = true;
    anchorEl = null;
    pinned = false;
  }
  window.hideAdminFlyout = hideAdminFlyout;
  function scheduleHide() {
    if (pinned) return;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideAdminFlyout, 180);
  }

  document.addEventListener('mouseover', e => {
    if (!isCollapsed()) return;
    const group = e.target.closest && e.target.closest('.sidebar .nav-admin-group');
    if (group) showFlyout(group, false);
  });
  document.addEventListener('mouseout', e => {
    if (!isCollapsed() || !anchorEl) return;
    if (e.target.closest && e.target.closest('.sidebar .nav-admin-group')) scheduleHide();
  });
  // Clicking a group icon in collapsed mode pins its flyout. It does not toggle the accordion.
  document.addEventListener('click', e => {
    if (!isCollapsed()) return;
    const group = e.target.closest && e.target.closest('.sidebar .nav-admin-group');
    if (!group) return;
    e.stopPropagation();
    e.preventDefault();
    if (pinned && anchorEl === group) hideAdminFlyout();
    else { pinned = true; showFlyout(group, true); }
  }, true);
  document.addEventListener('click', e => {
    if (flyout && !flyout.hidden && !e.target.closest('.admin-flyout') && !e.target.closest('.sidebar .nav-admin-group')) hideAdminFlyout();
  });

  // Sidebar markup: an icon for each group, and tooltips for the standalone items.
  const shellBase = shell;
  shell = function (body) {
    const html = shellBase(body);
    if (!isAdminMasterNav()) return html;
    const template = document.createElement('template');
    template.innerHTML = html;
    template.content.querySelectorAll('.sidebar .nav-admin-group').forEach(button => {
      const group = groupOf(button);
      if (!group || !ICONS[group.name] || button.querySelector('.ico')) return;
      const icon = document.createElement('span');
      icon.className = 'ico admin-group-ico';
      icon.innerHTML = iconSvg(ICONS[group.name]);
      button.prepend(icon);
      button.setAttribute('title', group.name);
    });
    template.content.querySelectorAll('.sidebar .nav > button:not(.nav-admin-group)').forEach(button => {
      const label = (button.getAttribute('aria-label') || button.textContent).trim();
      if (label && !button.getAttribute('title')) button.setAttribute('title', label);
    });
    return template.innerHTML;
  };

  document.head.insertAdjacentHTML('beforeend', '<style id="admin-collapsed-nav">'
    + '.nav-collapsed .nav .nav-admin-group{justify-content:center;padding:11px 0;gap:0}'
    + '.nav-collapsed .nav .nav-admin-group .admin-group-ico{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px}'
    + '.nav-collapsed .nav .nav-admin-group .admin-group-ico svg{width:20px;height:20px}'
    + '.admin-flyout{position:fixed;z-index:60;min-width:200px;background:#fff;border:1px solid var(--line);border-radius:8px;box-shadow:0 12px 28px rgba(17,39,65,.18);padding:6px;display:grid;gap:2px}'
    + '.admin-flyout[hidden]{display:none}'
    + '.admin-flyout-title{padding:8px 10px 6px;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}'
    + '.admin-flyout-item{border:0;background:none;text-align:left;padding:8px 10px;border-radius:6px;font:inherit;font-size:13px;color:var(--ink);cursor:pointer;white-space:nowrap}'
    + '.admin-flyout-item:hover{background:#f2f7fc}'
    + '.admin-flyout-item.active{color:var(--blue);font-weight:700}'
    + '.nav .nav-admin-group{justify-content:flex-start;gap:10px;text-align:left}'
    + '.nav .nav-admin-group .nav-label{flex:1;min-width:0;text-align:left}'
    + '.nav .nav-admin-group .admin-group-ico{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;flex:none}'
    + '.nav .nav-admin-group .admin-group-ico svg{width:18px;height:18px}'
    + '.nav .nav-admin-group .nav-admin-chevron{margin-left:auto;flex:none}'
    + '</style>');
})();
