/* Application Users: the admin can add a user, and edit name, work email, role and department, and set
   access Active or Inactive from inside the same dialog. Users sign in through Microsoft SSO, so the
   prototype keeps no passwords here — adding a user here is account provisioning (name, role, department,
   access), not SSO account creation, which still happens outside this app. Identity is kept by user id,
   so editing details never creates a new user.
   Roles are fixed (Admin, Reviewer, Department Manager, Department User) and assigned per user here.
   Each role's permissions are fixed in code (see defaultPermissionsFor below); there is no screen to edit them.
   Loaded after aa-admin-core.js. */
(function () {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ROLES = ['Admin', 'Reviewer', 'Manager', 'User'];
  const ROLE_LABEL = { Admin: 'Admin', Reviewer: 'Reviewer', Manager: 'Department Manager', User: 'Department User' };
  const roleLabel = role => ROLE_LABEL[role] || role;
  // The fixed permissions each role has. These are hardcoded: Admin always has every permission, and the
  // other roles get the same set on every account. The four Task Actions keys and the two Opter keys each
  // start in lockstep per role.
  const defaultPermissionsFor = role => {
    const taskActions = role !== 'Reviewer'; // reviewing/classifying requests, not running operational tasks
    const opterOrders = true; // matches how the app behaved before this permission existed
    return {
      viewDashboard: true,
      viewCompanyTasks: true,
      sendAcknowledgements: true,
      updateTasks: taskActions,
      reassignTasks: taskActions,
      requestAssignments: taskActions,
      approveRequests: taskActions,
      createOpterOrders: opterOrders,
      updateOpterOrders: opterOrders,
    };
  };
  const permissionsFor = role => defaultPermissionsFor(role);
  // Apply the current permission keys to every existing user now, not only to one edited through the
  // dialog — otherwise a user who is never opened in Edit would keep a stale PERMISSIONS object.
  USER_MASTER.forEach(u => { PERMISSIONS[u.id] = { ...PERMISSIONS[u.id], ...permissionsFor(u.role) }; });

  const userById = id => USER_MASTER.find(u => u.id === id);
  const isActiveUser = id => AA_ADMIN.isActive('users', id);
  const activeAdmins = () => USER_MASTER.filter(u => u.role === 'Admin' && isActiveUser(u.id));
  const initialsOf = name => name.trim().split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase();
  const workScopeOf = role => role === 'Admin' || role === 'Reviewer' ? 'Company' : role === 'Manager' ? 'My department' : 'Me';

  // The work email is stored on the user when it is edited; otherwise the generated address is used.
  const userEmailBase = userEmail;
  userEmail = function (u) { return u.workEmail || userEmailBase(u); };

  // Sign-in and switching profile both respect access status.
  const inactiveMessage = 'This user has no active application access';
  const loginAsBase = loginAs;
  loginAs = function (id) { if (!isActiveUser(id)) { toast(inactiveMessage); return; } loginAsBase(id); };
  const selectUserBase = selectUser;
  selectUser = function (id) { if (!isActiveUser(id)) { toast(inactiveMessage); return; } selectUserBase(id); };

  const deptOptions = current => AA_ADMIN.options([...ALL_DEPTS], current);

  AA_ADMIN.forms.users = {
    noun: 'User',
    toggleable: true,
    blank: () => ({ name: '', email: '', role: 'User', department: ALL_DEPTS[0] }),
    load: id => {
      const u = userById(id);
      return u && { name: u.name, email: userEmail(u), role: u.role, department: u.department };
    },
    fields: v => [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Work Email', type: 'email' },
      { key: 'role', label: 'Role', type: 'select', options: ROLES.map(r => [r, roleLabel(r)]) },
      { key: 'department', label: 'Department', type: 'select', options: deptOptions(v.department) },
    ],
    validate: (v, id) => {
      const u = id ? userById(id) : null, name = v.name.trim(), email = v.email.trim();
      if (!name) return 'Enter the user name';
      if (!EMAIL_RE.test(email)) return 'Enter a valid work email address';
      if (USER_MASTER.some(x => x.id !== id && userEmail(x).toLowerCase() === email.toLowerCase())) return 'Another user already has this work email';
      if (!ROLES.includes(v.role)) return 'Select a role';
      if (!v.department) return 'Select a department';
      if (u && u.role === 'Admin' && v.role !== 'Admin' && isActiveUser(id) && activeAdmins().length <= 1) return 'At least one active Admin is required';
      return '';
    },
    save: (v, id) => {
      const name = v.name.trim(), email = v.email.trim();
      if (!id) {
        // New account: provisioned here with a role and department, same identity rules as everyone
        // else. SSO sign-in itself is still handled outside this app, per the brief.
        const newId = 'user-' + Date.now();
        const newUser = { id: newId, name, role: v.role, department: v.department, title: roleLabel(v.role), initials: initialsOf(name), workEmail: email, workScope: workScopeOf(v.role), classifications: [] };
        USERS.push(newUser);
        USER_MASTER.push({ ...newUser });
        PERMISSIONS[newId] = { ...permissionsFor(v.role) };
        return;
      }
      const u = userById(id), account = USERS.find(x => x.id === id);
      const changes = { name, workEmail: email, role: v.role, department: v.department, initials: initialsOf(name), workScope: workScopeOf(v.role) };
      Object.assign(u, changes);
      if (account) Object.assign(account, { name: changes.name, workEmail: changes.workEmail, role: changes.role, department: changes.department, initials: changes.initials });
      PERMISSIONS[id] = { ...PERMISSIONS[id], ...permissionsFor(v.role) };
      if (id === S.userId) S.role = v.role;
    },
    cannotDeactivate: id => {
      if (id === SYSTEM_ADMIN_ID) return 'The System Administrator cannot be deactivated';
      if (id === currentUser().id) return 'You cannot deactivate the account you are signed in with';
      const u = userById(id);
      if (u && u.role === 'Admin' && activeAdmins().length <= 1) return 'At least one active Admin is required';
      return '';
    },
  };

  const userManagementBase = userManagement;
  userManagement = function () {
    if (S.role !== 'Admin') return userManagementBase();
    const q = (S.adminUserQuery || '').trim().toLowerCase();
    const filtered = USER_MASTER.filter(u => !q || [u.name, userEmail(u), u.department, u.role].join(' ').toLowerCase().includes(q));
    const { pageRows, pager } = AA_ADMIN.paginate(filtered, 'users', 10);
    const table = masterTable(['Name', 'Work Email', 'Department', 'Role', 'Last Login', 'Access', ''], pageRows.map(u => [
      `<div style="display:flex;align-items:center;gap:10px"><span class="avatar">${editorText(u.initials)}</span><strong>${editorText(u.name)}</strong></div>`,
      `<span class="code-text">${editorText(userEmail(u))}</span>`,
      editorText(u.department),
      editorText(roleLabel(u.role)),
      userLastLogin(u, USER_MASTER.indexOf(u)),
      AA_ADMIN.statusPill(isActiveUser(u.id)),
      u.id === SYSTEM_ADMIN_ID
        ? '<span style="color:var(--muted);font-size:12px">Fixed</span>'
        : AA_ADMIN.actions('users', u.id),
    ]));
    return `<div class="page-head"><div><h1>Application Users</h1><p>Users sign in with Microsoft SSO. Only active application users can access the application.</p></div>`
      + `<div class="actions"><input aria-label="Search users" value="${editorText(S.adminUserQuery || '')}" onchange="setAdminUserQuery(this.value)" placeholder="Search name, email, department or role" style="height:36px;border:1px solid var(--line);border-radius:4px;padding:0 10px;font:inherit;min-width:260px">${AA_ADMIN.addButton('users', '+ Add User')}</div></div>`
      + `<div class="card"><div class="card-head"><h2>Users</h2><span class="sub">${filtered.length} of ${USER_MASTER.length} · ${USER_MASTER.filter(u => isActiveUser(u.id)).length} active</span></div><div style="overflow-x:auto">${table}</div>${pager}</div>`;
  };
  window.setAdminUserQuery = value => { S.adminUserQuery = value; S.adminPage = S.adminPage || {}; S.adminPage.users = 1; render(); };

})();
