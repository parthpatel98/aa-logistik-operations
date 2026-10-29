// Customer filters call this while the page is first drawn, which happens before aa-customer-names.js defines the
// real check. Until then every name is allowed; aa-customer-names.js replaces this with the Customer master check.
window.inCustomerMaster = window.inCustomerMaster || (() => true);
var SYSTEM_ADMIN_ID = window.SYSTEM_ADMIN_ID = "daniel";
// Today, from the system clock, in the dd/mm/yyyy form the dates use. Deadline states (overdue, due soon) are judged against it.
const OPERATION_DATE = (() => { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}` })();

        var USER_PHOTO_CELLS = window.USER_PHOTO_CELLS = {
  john: [1, 0], maria: [0, 0], sofia: [2, 0], emma: [1, 1], erik: [3, 0], andreas: [2, 1],
  karin: [3, 1], oskar: [0, 1], lars: [1, 2], elin: [0, 2], thomas: [2, 2], daniel: [3, 2], admin: [3, 2]
};
var USER_PHOTO_CELLS_EXT = window.USER_PHOTO_CELLS_EXT = window.USER_PHOTO_CELLS;
var ALL_DEPTS = window.ALL_DEPTS = ['Warehouse', 'Inbound/Outbound', 'Transport', 'Freight forwarding', 'Packing', 'Finance', 'Sales'];
const S = { notifRead: {}, userId: 'john', role: 'Admin', page: 'home', taskScope: 'My Tasks', requestFilter: 'All Requests', caseTab: 'Overview', queueTab: 'Awaiting Review', taskTab: 'Unassigned', approved: false, ack: false, ackBy: '', ackAt: '', completed: false, assignee: 'Erik Karlsson', drawer: false, profileMenu: false, notificationMenu: false, notificationsRead: false, assignModal: false, assignTaskId: null, assignChoice: '', editorType: null, editorId: null, editorData: {}, editorDirty: false, draft: null, moreFilters: false, userSearchOpen: false, userSearch: '', lastRefresh: 'Not refreshed', comments: {}, attachments: {}, communications: [{ id: 'MSG-7701', direction: 'Incoming', subject: 'Transport request – robots to Munich', body: 'Please arrange transport for two industrial robots from Västerås to Munich.', author: 'Thomas Weber', at: '07/10/2026, 08:14' }, { id: 'MSG-7721', direction: 'Outgoing', subject: 'Re: Transport request – robots to Munich', body: 'Your request has been received and is being coordinated.', author: 'John Andersson', at: '07/10/2026, 09:26' }], notes: [{ text: 'Packing to confirm final measurements before carrier booking.', author: 'John Andersson', at: '07/10/2026, 09:21' }], selectedTask: 'TASK-2033', selectedCase: 'CASE-401046', queueQuery: '', queueIssue: 'All', queueCustomer: 'All', caseQuery: '', caseStatus: 'All', casePriority: 'All', filters: { q: '', department: 'All', assignee: 'All', priority: 'All', due: 'All', caseId: 'All', type: 'All', status: 'All' }, activities: [['Email received', 'Microsoft 365', '07/10/2026, 08:14'], ['AI analysis completed', 'System', '07/10/2026, 08:15']] };
        S.loggedIn = sessionStorage.getItem('aa-logistik-show-login') !== '1';
        const PEOPLE = { Admin: ['Daniel Frölander', 'System Administrator', 'DF'], Reviewer: ['John Andersson', 'Reviewer', 'JA'], Manager: ['Maria Svensson', 'Transport Manager', 'MS'], User: ['Erik Karlsson', 'Transport Operations', 'EK'] };
        const USERS = [
            { id: 'john', name: 'John Andersson', role: 'Reviewer', department: 'Operations', title: 'Reviewer', initials: 'JA' },
            { id: 'maria', name: 'Maria Svensson', role: 'Manager', department: 'Transport', title: 'Transport Manager', initials: 'MS' },
            { id: 'sofia', name: 'Sofia Lind', role: 'Manager', department: 'Packing', title: 'Packing Manager', initials: 'SL' },
            { id: 'emma', name: 'Emma Karlsson', role: 'Manager', department: 'Freight forwarding', title: 'Freight forwarding Manager', initials: 'EM' },
            { id: 'erik', name: 'Erik Karlsson', role: 'User', department: 'Transport', title: 'Transport Coordinator', initials: 'EK' },
            { id: 'andreas', name: 'Andreas Nilsson', role: 'User', department: 'Transport', title: 'Transport Planner', initials: 'AN' },
            { id: 'karin', name: 'Karin Holm', role: 'User', department: 'Packing', title: 'Packing Coordinator', initials: 'KH' },
            { id: 'oskar', name: 'Oskar Berg', role: 'User', department: 'Packing', title: 'Packing Specialist', initials: 'OB' },
            { id: 'lars', name: 'Lars Berg', role: 'User', department: 'Freight forwarding', title: 'Freight Coordinator', initials: 'LB' },
            { id: 'elin', name: 'Elin Sjöberg', role: 'User', department: 'Freight forwarding', title: 'Customs Specialist', initials: 'ES' },
            { id: 'jonas', name: 'Jonas Eriksson', role: 'User', department: 'Transport', title: 'Transport Planner', initials: 'JE' },
            { id: 'sara', name: 'Sara Nyberg', role: 'User', department: 'Transport', title: 'Transport Coordinator', initials: 'SN' },
            { id: 'mikael', name: 'Mikael Dahl', role: 'User', department: 'Packing', title: 'Packing Specialist', initials: 'MD' },
            { id: 'anders', name: 'Anders Lindqvist', role: 'User', department: 'Freight forwarding', title: 'Freight Coordinator', initials: 'AL' },
            { id: 'henrik', name: 'Henrik Åberg', role: 'Manager', department: 'Warehouse', title: 'Warehouse Manager', initials: 'HÅ' },
            { id: 'linnea', name: 'Linnea Strand', role: 'User', department: 'Warehouse', title: 'Warehouse Operator', initials: 'LS' },
            { id: 'viktor', name: 'Viktor Ek', role: 'User', department: 'Warehouse', title: 'Warehouse Operator', initials: 'VE' },
            { id: 'ida', name: 'Ida Forsberg', role: 'Manager', department: 'Inbound/Outbound', title: 'Inbound/Outbound Manager', initials: 'IF' },
            { id: 'pontus', name: 'Pontus Hedlund', role: 'User', department: 'Inbound/Outbound', title: 'Goods Receiving Coordinator', initials: 'PH' },
            { id: 'julia', name: 'Julia Roos', role: 'User', department: 'Inbound/Outbound', title: 'Dispatch Coordinator', initials: 'JR' },
            { id: 'gustav', name: 'Gustav Wallin', role: 'Manager', department: 'Finance', title: 'Finance Manager', initials: 'GW' },
            { id: 'hanna', name: 'Hanna Öberg', role: 'User', department: 'Finance', title: 'Billing Specialist', initials: 'HÖ' },
            { id: 'nils', name: 'Nils Sandberg', role: 'User', department: 'Finance', title: 'Billing Specialist', initials: 'NS' },
            { id: 'camilla', name: 'Camilla Boman', role: 'Manager', department: 'Sales', title: 'Sales Manager', initials: 'CB' },
            { id: 'fredrik', name: 'Fredrik Lund', role: 'User', department: 'Sales', title: 'Sales Coordinator', initials: 'FL' },
            { id: 'ebba', name: 'Ebba Torp', role: 'User', department: 'Sales', title: 'Sales Representative', initials: 'ET' }
        ];
        const REQUESTS = [{ id: 'REQ-101', taskId: 'TASK-2032', requesterId: 'erik', requestedAt: '09/10/2026, 09:12', status: 'Pending Approval' }];
        const PERMISSION_META = { viewCompanyTasks: ['View company Tasks', 'Can browse Tasks across every department'], requestAssignments: ['Request assignments', 'Can request unassigned Tasks in their department'], updateTasks: ['Update Task status', 'Can start and complete assigned Tasks'], viewDashboard: ['View Dashboard', 'Can access analytics for their role'], sendAcknowledgements: ['Send acknowledgements', 'Can send customer acknowledgement messages'], approveRequests: ['Approve requests', 'Can approve or decline department assignment requests'] };
        const PERMISSIONS = Object.fromEntries(USERS.map(u => [u.id, { viewCompanyTasks: true, requestAssignments: u.role === 'User', updateTasks: true, viewDashboard: true, sendAcknowledgements: true, assignTasks: false, approveRequests: u.role === 'Manager' }]));
        const AI_DATA = { customer: 'ABB Robotics', classification: 'Transport Order', caseClass: 'New Booking', priority: 'High', pickup: 'Västerås, Sweden', delivery: 'Munich, Germany', requestedDate: '15/10/2026', goods: '2 industrial robots', weight: '4,200 kg total' };
        const TASK_ROUTING = { 'Transport booking': 'andreas', 'Pickup coordination': 'erik', 'Transport follow-up': 'fredrik', 'Delivery coordination': 'pontus', 'Packing preparation': 'karin', 'Packing inspection': 'oskar', 'Export documentation': 'hanna', 'Customs clearance': 'elin', 'Freight coordination': 'lars', 'Warehouse storage': 'linnea' };
        const USER_MASTER = USERS.map(u => ({ ...u, workScope: u.role === 'Admin' ? 'Company' : u.role === 'Manager' ? 'My department' : 'Me', classifications: Object.entries(TASK_ROUTING).filter(([, id]) => id === u.id).map(([name]) => name) }));
        const PROPOSED_TASKS = [{ title: 'Arrange transport', department: 'Transport', classification: 'Transport booking', due: '15/10/2026' }, { title: 'Pack equipment', department: 'Packing', classification: 'Packing preparation', due: '13/10/2026' }, { title: 'Prepare customs clearance', department: 'Freight forwarding', classification: 'Customs clearance', due: '14/10/2026' }];
        const CASES = [['CASE-401046', 'ABB Robotics', 'Transport order', 'Transport, Packing', 'High', '07/10/2026', 'Active'], ['CASE-401045', 'Hitachi Energy', 'Export shipment', 'Transport, Freight', 'Medium', '07/10/2026', 'In Progress'], ['CASE-401043', 'Alstom', 'Pickup coordination', 'Transport', 'Medium', '08/10/2026', 'Ready'], ['CASE-401041', 'Westinghouse Electric', 'Customs clearance', 'Freight', 'High', '08/10/2026', 'Waiting'], ['CASE-401039', 'Nefab', 'Vehicle booking', 'Transport', 'Low', '09/10/2026', 'Blocked']];
        const QUEUE = [['EML-3421', 'ABB Robotics', 'Transport request – delivery to Munich', '92%', 'Needs department review', '07/10/2026, 08:14', 'Awaiting Review'], ['EML-3420', 'Hitachi Energy', 'Packing instructions', '87%', 'Manual review required', '07/10/2026, 07:46', 'Awaiting Review'], ['EML-3419', 'Alstom', 'Customs documents', '64%', 'Missing information', '06/10/2026, 16:22', 'Needs Clarification'], ['EML-3418', 'Westinghouse Electric', 'Urgent transport – turbine parts', '90%', 'Needs category', '06/10/2026, 15:57', 'Awaiting Review'], ['CASE-401047', 'Nordic Industrial Components AB', 'Inbound component shipment', '78%', 'Task category pending', '06/10/2026, 14:40', 'Unassigned Cases'], ['TASK-2046', 'Mälaren Automation AB', 'Book express collection', '84%', 'No assignee', '06/10/2026, 13:25', 'Unassigned Tasks'], ['CASE-401042', 'Nefab', 'Packing request', '95%', 'Acknowledgement overdue', '06/10/2026, 11:10', 'Acknowledgement Pending'], ['EML-3426', 'Nefab', 'Storage and transport – machine parts to Hamburg', '88%', 'Needs department review', '08/10/2026, 10:12', 'Awaiting Review'], ['EML-3427', 'Mälaren Automation AB', 'Packing and transport – control cabinets to Oslo', '91%', 'Needs category', '08/10/2026, 11:40', 'Awaiting Review']];
        const TASKS = [
            ['Arrange transport', 'CASE-401046', 'ABB Robotics', 'Transport', 'Andreas Nilsson', 'High', '07/10/2026', 'In Progress', 'TASK-2031', 'Transport booking', 'Today'],
            ['Confirm vehicle requirements', 'CASE-401048', 'Nefab', 'Transport', 'Unassigned', 'Medium', '08/10/2026', 'Unassigned', 'TASK-2032', 'Transport booking', 'Tomorrow'],
            ['Prepare customs clearance', 'CASE-401049', 'Alstom', 'Freight forwarding', 'Unassigned', 'Urgent', '07/10/2026', 'Unassigned', 'TASK-2033', 'Customs', 'Today'],
            ['Pickup coordination', 'CASE-401050', 'Westinghouse Electric', 'Transport', 'Erik Karlsson', 'Low', '09/10/2026', 'Ready', 'TASK-2034', 'Pickup', 'Today'],
            ['Verify delivery address', 'CASE-401045', 'Hitachi Energy', 'Transport', 'Andreas Nilsson', 'Medium', '08/10/2026', 'Ready', 'TASK-2035', 'Delivery', 'Tomorrow'],
            ['Record packed dimensions', 'CASE-401046', 'ABB Robotics', 'Packing', 'Sofia Lind', 'High', '07/10/2026', 'Ready', 'TASK-2036', 'Packing', 'Today'],
            ['Book ferry slot', 'CASE-401041', 'Westinghouse Electric', 'Transport', 'Erik Karlsson', 'Medium', '08/10/2026', 'In Progress', 'TASK-2037', 'Transport booking', 'Today'],
            ['Prepare export documents', 'CASE-401045', 'Hitachi Energy', 'Freight forwarding', 'Emma Karlsson', 'Medium', '09/10/2026', 'In Progress', 'TASK-2038', 'Documentation', 'Later'],
            ['Confirm commodity code', 'CASE-401043', 'Alstom', 'Transport', 'Erik Karlsson', 'High', '08/10/2026', 'Waiting', 'TASK-2039', 'Customs coordination', 'Tomorrow'],
            ['Await final dimensions', 'CASE-401046', 'ABB Robotics', 'Transport', 'Erik Karlsson', 'High', '07/10/2026', 'Waiting', 'TASK-2040', 'Transport booking', 'Tomorrow'],
            ['Resolve loading access', 'CASE-401039', 'Nefab', 'Transport', 'Andreas Nilsson', 'Medium', '09/10/2026', 'Blocked', 'TASK-2041', 'Pickup', 'Later'],
            ['Assign express carrier', 'CASE-401041', 'Westinghouse Electric', 'Transport', 'Maria Svensson', 'Urgent', '06/10/2026', 'Overdue', 'TASK-2042', 'Transport booking', 'Overdue'],
            ['Submit transit declaration', 'CASE-401049', 'Alstom', 'Transport', 'Erik Karlsson', 'Urgent', '06/10/2026', 'Overdue', 'TASK-2043', 'Customs coordination', 'Overdue'],
            ['Inspect packing list', 'CASE-401048', 'Nefab', 'Packing', 'Sofia Lind', 'Low', '06/10/2026', 'Completed', 'TASK-2044', 'Packing', 'Overdue'],
            ['Confirm delivery window', 'CASE-401043', 'Alstom', 'Transport', 'Erik Karlsson', 'Medium', '06/10/2026', 'Completed', 'TASK-2045', 'Delivery', 'Overdue']
        ];
        function normalizeTaskClassification(t) { let text = `${t[0]} ${t[9]}`.toLowerCase(); if (text.includes('inspect packing')) return 'Packing inspection'; if (text.includes('pack')) return 'Packing preparation'; if (text.includes('custom') || text.includes('commodity') || text.includes('transit')) return 'Customs clearance'; if (text.includes('document')) return 'Export documentation'; if (text.includes('pickup')) return 'Pickup coordination'; if (text.includes('delivery')) return 'Delivery coordination'; if (text.includes('await') || text.includes('follow')) return 'Transport follow-up'; return 'Transport booking' }
        TASKS.forEach(t => { let classification = normalizeTaskClassification(t); t[9] = classification; if (t[4] !== 'Unassigned') { let owner = USERS.find(u => u.id === TASK_ROUTING[classification]); if (owner) { t[3] = owner.department; t[4] = owner.name } } });
        function cls(s) { return /Completed|Active|Sent|In Progress/.test(s) ? 'green' : /Urgent|High|Overdue|Blocked/.test(s) ? 'red' : /Waiting|Unassigned|Not Started|Awaiting/.test(s) ? 'amber' : 'blue' } function pill(s) { let p = /^(Urgent|High|Medium|Low)( Priority)?$/.exec(s); return `<span class="pill ${p ? 'prio-' + p[1].toLowerCase() : cls(s)}">${s}</span>` }
        function toast(m) { let t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2300) }
        function currentUser() { return USERS.find(u => u.id === S.userId) || USERS[0] } function actorName() { return currentUser().name } function taskById(id) { return TASKS.find(t => t[8] === id) } function can(key) { return currentUser().role === 'Admin' || PERMISSIONS[currentUser().id]?.[key] !== false }
        function navItems() { let items = S.role === 'Admin' ? [['home', '⌂', 'Home'], ['review', '▣', 'Review Queue'], ['cases', '▤', 'Cases'], ['tasks', '☷', 'Task Manager'], ['users', '♙', 'User Management'], ['dashboard', '▥', 'Dashboard']] : S.role === 'Manager' ? [['home', '⌂', 'Home'], ['department', '▣', 'My Tasks'], ['cases', '▤', 'Cases'], ['dashboard', '▥', 'Dashboard']] : [['home', '⌂', 'Home'], ['mytasks', '▣', 'My Tasks'], ['cases', '▤', 'Cases'], ['dashboard', '▥', 'Dashboard']]; return items.filter(x => x[0] !== 'dashboard' || can('viewDashboard')) }
        function notificationCount() { let u = currentUser(); return u.role === 'Manager' ? REQUESTS.filter(r => r.status === 'Pending Approval' && taskById(r.taskId)?.[3] === u.department).length : REQUESTS.filter(r => r.requesterId === u.id && r.status !== 'Pending Approval').length + 2 }
        function shell(body) { let p = currentUser(), count = notificationCount(); return `<div class="app"><aside class="sidebar"><div class="brand"><img src="assets/aa-logistik-logo.png" alt="AA Logistik"></div><nav class="nav">${navItems().map(n => `<button class="${S.page === n[0] ? 'active' : ''}" onclick="go('${n[0]}')"><span class="ico">${n[1]}</span>${n[2]}</button>`).join('')}</nav><div class="truck-panel"></div></aside><main class="main"><header class="topbar"><div class="userbox"><button class="reset-demo" onclick="resetDemo()">↻ Reset Demo</button><div class="menu-wrap bell-wrap"><button class="bell" aria-label="Notifications" onclick="NotificationModel.toggleMenu(event)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>${notificationCount() ? `<span class="bell-badge">${notificationCount()}</span>` : ''}</button>${S.notificationMenu ? notificationMenu() : ''}</div><div class="menu-wrap"><button class="profile-trigger" onclick="S.profileMenu=!S.profileMenu;S.notificationMenu=false;render()"><div class="avatar">${p.initials}</div><div><strong>${p.name}</strong><small>${p.title} · ▾</small></div></button>${S.profileMenu ? profileMenu() : ''}</div></div></header><section class="content">${body}</section></main></div>${S.drawer ? taskDrawer() : ''}${S.assignModal ? assignDialog() : ''}${S.editorType ? editorDialog() : ''}` }
        function profileMenu() { return `<div class="drop-menu"><div class="menu-label">Switch user</div>${USERS.map(u => `<button class="${S.userId === u.id ? 'selected' : ''}" onclick="selectUser('${u.id}')"><strong>${u.name} ${S.userId === u.id ? '✓' : ''}</strong><small>${u.role === 'Manager' ? 'Department Manager' : u.role === 'User' ? 'Department User' : 'Admin'} · ${u.department}</small></button>`).join('')}</div>` }
        function notificationMenu() { let u = currentUser(), dynamic = u.role === 'Manager' ? REQUESTS.filter(r => r.status === 'Pending Approval' && taskById(r.taskId)?.[3] === u.department).map(r => { let t = taskById(r.taskId), who = USERS.find(x => x.id === r.requesterId); return `<button onclick="openRequests()"><strong>Assignment request</strong><small>${who.name} requested ${t[8]}</small></button>` }).join('') : REQUESTS.filter(r => r.requesterId === u.id && r.status !== 'Pending Approval').map(r => `<button onclick="go('mytasks')"><strong>Request ${r.status}</strong><small>${r.taskId} assignment request</small></button>`).join(''); return `<div class="drop-menu">${dynamic}<button onclick="openTask('TASK-2043')"><strong>Overdue Task</strong><small>TASK-2043 · Transit declaration</small></button><button onclick="openCase('CASE-401046')"><strong>Acknowledgement pending</strong><small>CASE-401046 · ABB Robotics</small></button><button onclick="S.notificationsRead=true;S.notificationMenu=false;render()"><strong>Mark all as read</strong></button></div>` }
        function resetDemo() { if (window.confirm('Reset all demo changes and return to the login page?')) { sessionStorage.setItem('aa-logistik-show-login', '1'); window.location.reload() } }
        function loginDemo() { sessionStorage.removeItem('aa-logistik-show-login'); S.loggedIn = true; S.userId = 'john'; S.role = 'Admin'; S.page = 'home'; render() }
        function loginView() { return `<main class="login-screen"><section class="login-visual"><div class="login-logo"><img src="assets/aa-logistik-logo.png" alt="AA Logistik"></div><div class="login-message"><h1>One operational view from customer request to completed delivery.</h1><p>Human-reviewed Cases, coordinated Tasks and a shared history for every department.</p></div></section><section class="login-entry"><div class="login-box"><h2>Welcome back</h2><p>Sign in with your AA Logistik Microsoft account.</p><button class="microsoft-login" onclick="loginDemo()"><span class="ms-grid"><i></i><i></i><i></i><i></i></span>Continue with Microsoft</button><div class="login-note">Prototype sign-in starts a fresh Admin session. Use the role selector after signing in to review the Manager and Department User experiences.</div></div></section></main>` }
        function globalSearch(q) { S.filters.q = q; S.page = S.role === 'Admin' ? 'tasks' : S.role === 'Manager' ? 'department' : 'mytasks'; render() }
        function go(p) { S.page = p; S.drawer = false; S.profileMenu = false; S.notificationMenu = false; render() } function selectUser(id) { let u = USERS.find(x => x.id === id); if (!u) return; S.userId = id; S.role = u.role; S.page = 'home'; S.taskScope = 'My Tasks'; S.drawer = false; S.profileMenu = false; S.notificationMenu = false; clearFilters() }
        function head(t, s, a = '') { return `<div class="page-head"><div><h1>${t}</h1><p>${s}</p></div><div class="actions">${a}</div></div>` }
        function kpis(items) { return `<div class="kpis">${items.map(x => `<button class="kpi ${x[2] || ''}" onclick="metricAction('${x[0]}')" data-aa-style="aa-static-style-1"><label>${x[0]}</label><strong>${x[1]}</strong></button>`).join('')}</div>` }
        function metricAction(label) { S.filters.status = 'All'; S.filters.due = 'All'; if (/Assignment Requests/.test(label)) { openRequests() } else if (/Awaiting Review/.test(label)) { S.queueTab = 'Awaiting Review'; go('review') } else if (/Unassigned Tasks/.test(label)) { S.taskTab = 'Unassigned'; go('tasks') } else if (/Acknowledgement/.test(label)) { S.queueTab = 'Acknowledgement Pending'; go('review') } else if (/Department Tasks/.test(label)) { S.taskScope = 'My Department Tasks'; go('department') } else if (/My Tasks/.test(label)) { S.taskScope = 'My Tasks'; go(S.role === 'Manager' ? 'department' : 'mytasks') } else if (/Overdue/.test(label)) { if (S.role === 'Admin') { S.taskTab = 'All Open'; go('tasks') } else { S.filters.status = 'All'; go(S.role === 'Manager' ? 'department' : 'mytasks') } } else if (/Due Today/.test(label)) { S.filters.due = 'Today'; go(S.role === 'Manager' ? 'department' : 'mytasks') } else if (/In Progress|Waiting|Blocked|Completed|Ready/.test(label)) { let status = label.match(/In Progress|Waiting|Blocked|Completed|Ready/)[0]; if (S.role === 'Admin') { S.taskTab = status; go('tasks') } else { S.filters.status = status; go(S.role === 'Manager' ? 'department' : 'mytasks') } } else { go(S.role === 'Admin' ? 'tasks' : S.role === 'Manager' ? 'department' : 'mytasks') } }
        function home() { if (S.role === 'Admin') return adminHome(); if (S.role === 'Manager') return managerHome(); return userHome() }
        function adminHome() { return head('Good morning, John', 'Review incoming emails, approve Cases and keep operations moving.', `<button class="btn primary" onclick="go('review')">Open Review Queue</button>`) + kpis([['Cases Awaiting Review', QUEUE.filter(x => x[6] === 'Awaiting Review').length, 'red'], ['Unassigned Cases', QUEUE.filter(x => x[6] === 'Unassigned Cases').length, 'amber'], ['Unassigned Tasks', TASKS.filter(x => x[4] === 'Unassigned').length], ['Acknowledgement Pending', QUEUE.filter(x => x[6] === 'Acknowledgement Pending').length, 'amber'], ['Overdue Tasks', TASKS.filter(x => (taskDeadlineState(x) === 'Overdue')).length, 'red']]) + `<div class="card"><div class="card-head"><h2>Recent Items Requiring Attention</h2><button class="link" onclick="go('review')">View All</button></div>${queueTable(true)}</div>` }
        function managerHome() { let u = currentUser(), team = TASKS.filter(x => x[3] === u.department), requests = REQUESTS.filter(r => r.status === 'Pending Approval' && taskById(r.taskId)?.[3] === u.department).length, overdue = team.filter(x => (taskDeadlineState(x) === 'Overdue')).length; return head(`Welcome back, ${u.name.split(' ')[0]}`, `Here's the latest from your ${u.department} team.`, `<button class="btn primary" onclick="go('department')">View Department Tasks</button>`) + kpis([['My Department Tasks', team.length], ['Due Today', team.filter(x => x[10] === 'Today').length, 'amber'], ['Overdue', overdue, 'red'], ['Waiting', team.filter(x => x[7] === 'On Hold').length], ['Assignment Requests', requests, 'amber']]) + `<div class="grid2"><div class="card"><div class="card-head"><h2>Team Workload</h2><button class="link" onclick="go('department')">View All</button></div>${teamWorkload()}</div><div class="card"><div class="card-head"><h2>Needs Attention</h2></div><div class="attention-list"><div class="attention"><span class="icon">!</span><div><strong>${overdue} ${overdue === 1 ? 'Task' : 'Tasks'} overdue</strong><span class="sub">Department work needing attention</span></div><button class="link" onclick="S.filters.status='All';go('department')">Review</button></div><div class="attention"><span class="icon">↻</span><div><strong>${requests} assignment ${requests === 1 ? 'request' : 'requests'}</strong><span class="sub">Department approval queue</span></div><button class="link" onclick="openRequests()">Review</button></div></div></div></div>` }
        function userHome() { let u = currentUser(), mine = TASKS.filter(x => x[4] === u.name); return head(`Good morning, ${u.name.split(' ')[0]}`, 'Here are your Tasks for today.', `<button class="btn primary" onclick="go('mytasks')">Open My Tasks</button>`) + kpis([['My Tasks', mine.length], ['Due Today', mine.filter(x => x[10] === 'Today').length, 'amber'], ['In Progress', mine.filter(x => x[7] === 'In Progress').length], ['Waiting', mine.filter(x => x[7] === 'On Hold').length], ['Overdue', mine.filter(x => (taskDeadlineState(x) === 'Overdue')).length, 'red']]) + `${!S.ack ? `<div class="notice">Customer acknowledgement for CASE-401046 is still pending. <button class="link" onclick="sendAck()">Send Acknowledgement</button></div>` : ''}<div class="grid2"><div class="card"><div class="card-head"><h2>My Tasks – Due Today</h2><button class="link" onclick="S.filters.due='Today';go('mytasks')">View All</button></div>${tasksTable(mine.filter(x => x[10] === 'Today').slice(0, 4), true)}</div><div class="card"><div class="card-head"><h2>Recent Mentions</h2></div><div class="attention-list"><div class="attention"><span class="avatar">SL</span><div><strong>Sofia Lind mentioned you</strong><span class="sub">CASE-401046 · Final dimensions are ready</span></div><button class="link" onclick="openTask('TASK-2037')">Open</button></div><div class="attention"><span class="avatar">MS</span><div><strong>Maria Svensson mentioned you</strong><span class="sub">CASE-401043 · Please confirm delivery</span></div><button class="link" onclick="openTask('TASK-2045')">Open</button></div></div></div></div>` }
        function queueRows(home = false) { let rows = home ? QUEUE.slice(0, 4) : QUEUE.filter(x => x[6] === S.queueTab), q = S.queueQuery.toLowerCase(); return rows.filter(x => (!q || x.join(' ').toLowerCase().includes(q)) && (S.queueIssue === 'All' || x[4] === S.queueIssue) && (S.queueCustomer === 'All' || x[1] === S.queueCustomer) && (!S.queueSource || S.queueSource === 'All' || sourceLabel(x[0]) === S.queueSource)) }
        function queueTable(home = false) { let rows = queueRows(home); return `${rows.length ? `<table><thead><tr><th>Item</th><th>From / Customer</th><th>Subject / AI Understanding</th>${home ? '' : '<th>Issue</th>'}<th>Received</th><th>AI Confidence</th><th>Action</th></tr></thead><tbody>${rows.map((r, i) => `<tr><td>${r[0].startsWith('CASE-') ? `<button class="case-link" onclick="openCase('${r[0]}')">${r[0]}</button>` : `<span class="id">${r[0]}</span>`}</td><td>${r[1]}</td><td>${r[2]}</td>${home ? '' : `<td>${r[4]}</td>`}<td>${r[5]}</td><td>${pill(r[3])}</td><td><button class="btn ${i === 0 ? 'primary' : ''}" onclick="${r[6] === 'Unassigned Tasks' ? `S.page='tasks';S.taskTab='Unassigned';render()` : r[6] === 'Acknowledgement Pending' ? `openCase('CASE-401046')` : `go('approval')`}">${r[6] === 'Unassigned Tasks' ? 'Assign' : r[6] === 'Acknowledgement Pending' ? 'Open Case' : 'Review'}</button></td></tr>`).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No queue items match</strong><p class="sub">Change the queue tab or filters.</p><button class="btn" onclick="resetQueue()">Reset filters</button></div>`}` }
        function setQueue(k, v) { S[k] = v; render() } function resetQueue() { S.queueQuery = ''; S.queueIssue = 'All'; S.queueCustomer = 'All'; S.queueSource = 'All'; render() }
        function refreshQueue() { S.lastRefresh = '09/10/2026, 12:30'; S.activities.unshift(['Review Queue refreshed', actorName(), S.lastRefresh]); render(); toast('Queue refreshed') }
        function review() { let issues = [...new Set(QUEUE.map(x => x[4]))], customers = [...new Set(QUEUE.map(x => x[1]))].filter(n => window.inCustomerMaster(n)); return head('Human Review Queue', 'Validate AI interpretation before any Case or Tasks become active.', `<span class="sub">Last refresh: ${S.lastRefresh}</span><button class="btn" onclick="refreshQueue()">Refresh</button>`) + `<div class="card"><div class="tabs">${['Awaiting Review', 'Needs Clarification', 'Unassigned Cases', 'Unassigned Tasks', 'Acknowledgement Pending'].map(t => `<button class="${S.queueTab === t ? 'active' : ''}" onclick="S.queueTab='${t}';resetQueue()">${t} (${QUEUE.filter(x => x[6] === t).length})</button>`).join('')}</div><div class="filters"><input value="${S.queueQuery}" onchange="setQueue('queueQuery',this.value)" onkeyup="if(event.key==='Enter')setQueue('queueQuery',this.value)" placeholder="Search queue..."><select onchange="setQueue('queueIssue',this.value)"><option value="All">All Issues</option>${issues.map(x => `<option ${S.queueIssue === x ? 'selected' : ''}>${x}</option>`).join('')}</select><select aria-label="Source" onchange="setQueue('queueSource',this.value)"><option value="All">All Sources</option>${SOURCE_FILTERS.map(x => `<option ${S.queueSource === x ? 'selected' : ''}>${x}</option>`).join('')}</select><select onchange="setQueue('queueCustomer',this.value)"><option value="All">All Customers</option>${customers.map(x => `<option ${S.queueCustomer === x ? 'selected' : ''}>${x}</option>`).join('')}</select><button class="btn" onclick="resetQueue()">Reset</button></div>${queueTable()}</div>` }
        function routedOwner(classification) { let user = USERS.find(u => u.id === TASK_ROUTING[classification]); return user || null } function routingLabel(task) { let owner = routedOwner(task.classification); return owner ? `${task.classification} → ${owner.name}` : `${task.classification} → Needs manual category` }
        function approval() { if (S.role !== 'Admin') return head('Access denied', 'Only the Admin can review and approve incoming Cases.'); return `<button class="back" onclick="go('review')">‹ Back to Review Queue</button>` + head('Review and Approve Case', 'Review AI interpretation and automatic Task-owner routing before approval.', `${pill('Awaiting Review')}`) + `<div class="review-grid"><section class="panel"><div class="panel-title"><h2>Original Email</h2></div><div class="email-meta"><dl><dt>From</dt><dd>Thomas Weber · thomas.weber@abb.com</dd><dt>To</dt><dd>ops@aalogistik.se</dd><dt>Subject</dt><dd>Transport request – robots to Munich</dd><dt>Date</dt><dd>07/10/2026, 08:14</dd></dl></div><div class="email-body">Dear team,<br><br>We need to transport 2 industrial robots from Västerås to Munich next week. Please find the packing list and drawing attached.<br><br>Kind regards,<br>Thomas Weber<br>ABB Logistics<div class="attachment"><span>▧ Packing_List_Robots.pdf<br><small>456 KB</small></span><button class="link" onclick="downloadAttachment('Packing_List_Robots.pdf')">Download</button></div><div class="attachment"><span>▧ Drawing_Robot.png<br><small>1.2 MB</small></span><button class="link" onclick="downloadAttachment('Drawing_Robot.png')">Download</button></div></div></section><section class="panel"><div class="panel-title"><h2>AI Interpretation</h2><button class="link" onclick="openEditor('ai')">Edit</button></div><div class="fieldlist"><div class="rowfield"><label>Customer</label><strong>${AI_DATA.customer}</strong></div><div class="rowfield"><label>Category</label><strong>${AI_DATA.classification}</strong></div><div class="rowfield"><label>Case Type</label><strong>${AI_DATA.caseClass}</strong></div><div class="rowfield"><label>Priority</label><strong>🔴 ${AI_DATA.priority}</strong></div><div class="rowfield"><label>AI Confidence</label><strong>${pill('92%')}</strong></div></div><div class="panel-title"><h2>Extracted Information</h2></div><div class="fieldlist"><div class="rowfield"><label>Pickup</label><strong>${AI_DATA.pickup}</strong></div><div class="rowfield"><label>Delivery</label><strong>${AI_DATA.delivery}</strong></div><div class="rowfield"><label>Requested Date</label><strong>${AI_DATA.requestedDate}</strong></div><div class="rowfield"><label>Goods</label><strong>${AI_DATA.goods}</strong></div><div class="rowfield"><label>Weight</label><strong>${AI_DATA.weight}</strong></div></div></section><section class="panel"><div class="panel-title"><h2>Automatic Task Routing (${PROPOSED_TASKS.length})</h2><button class="link" onclick="openEditor('proposed')">Edit Tasks</button></div><div class="editfield"><div class="notice green"><strong>Task-level ownership</strong><br><span class="sub">Each Task is routed independently from the fixed User Master.</span></div>${PROPOSED_TASKS.map(x => { let owner = routedOwner(x.classification); return `<div class="proposal"><header><strong>${x.title}</strong>${pill(owner ? 'Owner matched' : 'Needs review')}</header><p>${x.department} · Due ${x.due}</p><p><strong>${routingLabel(x)}</strong>${owner ? ` · ${owner.title}` : ''}</p></div>` }).join('')}<button class="link" data-aa-style="aa-static-style-3" onclick="openEditor('newProposed')">+ Add Task</button></div></section></div><div class="actions" data-aa-style="aa-static-style-4"><button class="btn" onclick="go('review')">Back to Review Queue</button><div class="actions"><button class="btn" onclick="saveDraft()">Save as Draft</button><button class="btn primary" onclick="approve()">Approve Case & Assign Task Owners</button></div></div>` }
        function approve() { let unrouted = PROPOSED_TASKS.filter(x => !routedOwner(x.classification)); if (unrouted.length) { toast('Categorize every proposed Task before approval'); return } PROPOSED_TASKS.forEach((p, i) => { let owner = routedOwner(p.classification), existing = TASKS.find(t => t[1] === 'CASE-401046' && t[0] === p.title); if (existing) { existing[3] = p.department; existing[4] = owner.name; existing[6] = p.due; existing[7] = 'To-Do'; existing[9] = p.classification } else { let id = `TASK-${2050 + i}`; TASKS.push([p.title, 'CASE-401046', AI_DATA.customer, p.department, owner.name, AI_DATA.priority, p.due, 'Ready', id, p.classification, 'Later']) } }); S.approved = true; S.page = 'case'; S.caseTab = 'Tasks'; S.activities.unshift([`Case approved · ${PROPOSED_TASKS.length} Tasks routed by User Master`, actorName(), '07/10/2026, 09:18']); render(); toast(`CASE-401046 approved · ${PROPOSED_TASKS.length} Task owners assigned`) }
        function setCaseFilter(k, v) { S[k] = v; render() } function resetCases() { S.caseQuery = ''; S.caseStatus = 'All'; S.casePriority = 'All'; render() }
        function cases() { let u = currentUser(), base = S.role === 'User' ? CASES.filter(x => TASKS.some(t => t[1] === x[0] && t[4] === u.name)) : S.role === 'Manager' ? CASES.filter(x => x[3].includes(u.department)) : CASES, q = S.caseQuery.toLowerCase(), visible = base.filter(x => (!q || x.join(' ').toLowerCase().includes(q)) && (S.caseStatus === 'All' || x[6] === S.caseStatus) && (S.casePriority === 'All' || x[4] === S.casePriority)); return head('Cases', S.role === 'Admin' ? 'All active and recently completed Cases.' : S.role === 'Manager' ? `Cases involving the ${u.department} department.` : 'Cases connected to your assigned Tasks.') + `<div class="card"><div class="filters"><input value="${S.caseQuery}" onchange="setCaseFilter('caseQuery',this.value)" onkeyup="if(event.key==='Enter')setCaseFilter('caseQuery',this.value)" placeholder="Search Cases or customers..."><select onchange="setCaseFilter('caseStatus',this.value)"><option value="All">All Statuses</option>${[...new Set(base.map(x => x[6]))].map(x => `<option ${S.caseStatus === x ? 'selected' : ''}>${x}</option>`).join('')}</select><select onchange="setCaseFilter('casePriority',this.value)"><option value="All">All Priorities</option>${[...new Set(base.map(x => x[4]))].map(x => `<option ${S.casePriority === x ? 'selected' : ''}>${x}</option>`).join('')}</select><button class="btn" onclick="resetCases()">Reset</button></div><div class="card-head" data-aa-style="aa-static-style-5"><h3>${visible.length} ${visible.length === 1 ? 'Case' : 'Cases'}</h3></div>${visible.length ? `<table><thead><tr><th>Case</th><th>Customer</th><th>Case Class</th><th>Departments</th><th>Priority</th><th>Due Date</th><th>Status</th><th></th></tr></thead><tbody>${visible.map(x => `<tr><td><button class="case-link" onclick="openCase('${x[0]}')">${x[0]}</button></td><td>${x[1]}</td><td>${x[2]}</td><td>${x[3]}</td><td>${pill(x[4])}</td><td>${x[5]}</td><td>${pill(x[6])}</td><td><button class="link" onclick="openCase('${x[0]}')">Open</button></td></tr>`).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No Cases match these filters</strong><p class="sub">Change or reset the filters.</p><button class="btn" onclick="resetCases()">Reset filters</button></div>`}</div>` }
        function openCase(id = 'CASE-401046') { S.selectedCase = id; S.page = 'case'; S.caseTab = 'Overview'; render() } function caseView() { let c = CASES.find(x => x[0] === S.selectedCase) || CASES[0], isMain = c[0] === 'CASE-401046'; return `<button class="back" onclick="go('cases')">‹ Back to Cases</button><section class="case-head"><div class="case-top"><div><h1>${c[0]} · ${c[2]} – ${c[1]}</h1><div class="sub">${c[3]} · Due ${c[5]}</div></div>${pill(c[6])}<div class="actions">${S.role === 'Admin' ? `<button class="btn" onclick="openEditor('case','${c[0]}')">Edit Case</button><button class="btn" onclick="openCaseActions()">More Actions⌄</button>` : ''}</div></div><div class="tabs">${['Overview', 'Order Data', 'Tasks', 'Communication', 'Activities'].map(t => `<button class="${S.caseTab === t ? 'active' : ''}" onclick="S.caseTab='${t}';render()">${t}${t === 'Tasks' ? ` (${TASKS.filter(x => x[1] === c[0]).length})` : t === 'Communication' ? ' (5)' : ''}</button>`).join('')}</div></section>${isMain ? caseTab() : genericCaseTab(c)}` }
        function genericCaseTab(c) { if (S.caseTab === 'Tasks') return `<div class="card">${tasksTable(TASKS.filter(x => x[1] === c[0]), true)}</div>`; if (S.caseTab === 'Activities') return activities(); if (S.caseTab === 'Order Data') return `<div class="grid2"><div class="info-card"><h3>Operational Information</h3><div class="kv"><label>Customer Reference</label><strong>PO-${c[0].slice(-4)}-2026</strong></div><div class="kv"><label>Pickup</label><strong>Västerås, Sweden</strong></div><div class="kv"><label>Delivery</label><strong>${c[1] === 'Hitachi Energy' ? 'Hamburg, Germany' : 'Stockholm, Sweden'}</strong></div><div class="kv"><label>Requested Date</label><strong>${c[5]}, 10:00</strong></div><div class="kv"><label>Cargo</label><strong>Industrial equipment</strong></div></div><div class="info-card"><h3>Source & Attachments</h3><div class="attachment">Shipment_${c[0]}.pdf <span>624 KB</span></div><div class="kv"><label>Source</label><strong>Customer email and attachment</strong></div><div class="kv"><label>Match</label><strong>Customer Master verified</strong></div></div></div>`; if (S.caseTab === 'Communication') return `<div class="card"><div class="card-head"><h2>Communication</h2><div class="actions"><button class="btn" onclick="toast('Reply composer opened')">Reply</button><button class="btn" onclick="toast('Internal Note editor opened')">Add Internal Note</button></div></div><div class="card-body"><div class="attention"><span class="icon">✉</span><div><strong>${c[2]} request</strong><span class="sub">Incoming · ${c[1]} · ${c[5]}, 08:20</span></div><button class="link" onclick="toast('Customer email opened')">Open</button></div></div></div>`; return `<div class="info-card"><h3>Case Overview</h3><div class="kv"><label>Customer</label><strong>${c[1]}</strong></div><div class="kv"><label>Case Type</label><strong>${c[2]}</strong></div><div class="kv"><label>Departments</label><strong>${c[3]}</strong></div><div class="kv"><label>Priority</label><strong>${c[4]}</strong></div><div class="kv"><label>Status</label><strong>${c[6]}</strong></div><div class="kv"><label>Due Date</label><strong>${c[5]}</strong></div><div class="kv"><label>Next Action</label><strong>${c[6] === 'Blocked' ? 'Resolve operational blocker' : 'Continue assigned Tasks'}</strong></div></div>` }
        function caseTab() { if (S.caseTab === 'Overview') return caseOverview(); if (S.caseTab === 'Order Data') return orderData(); if (S.caseTab === 'Tasks') return caseTasks(); if (S.caseTab === 'Communication') return communication(); return activities() }
        function caseOverview() { return `${!S.ack ? `<div class="notice">Customer Acknowledgement — Not Sent. <button class="link" onclick="sendAck()">Send Acknowledgement</button></div>` : `<div class="notice green">Customer Acknowledgement — Sent by ${actorName()} at 07/10/2026, 09:26</div>`}<div class="case-content"><div class="info-card"><h3>Customer Details</h3><div data-aa-style="aa-static-style-6">ABB <span data-aa-style="aa-static-style-7">ABB Robotics</span></div><div class="kv"><label>Customer No.</label><strong>1000123</strong></div><div class="kv"><label>Contact</label><strong>Thomas Weber</strong></div><div class="kv"><label>Email</label><strong>thomas.weber@abb.com</strong></div><div class="kv"><label>Phone</label><strong>+46 21 32 50 00</strong></div></div><div class="info-card"><h3>Case Information</h3><div class="kv"><label>Category</label><strong>${AI_DATA.classification}</strong></div><div class="kv"><label>Case Type</label><strong>${AI_DATA.caseClass}</strong></div><div class="kv"><label>Priority</label><strong>🔴 ${AI_DATA.priority}</strong></div><div class="kv"><label>Departments</label><strong>Transport, Packing</strong></div><div class="kv"><label>Created Date</label><strong>07/10/2026, 09:18</strong></div><div class="kv"><label>Ownership Model</label><strong>Task owners assigned by category</strong></div><div class="kv"><label>Acknowledgement</label><strong>${S.ack ? '● Sent' : '○ Not Sent'}</strong></div></div><div class="info-card"><h3>Timeline</h3><div class="timeline">${activityEvents(4)}</div></div></div>` }
        function orderData() { return `<div class="grid2"><div class="info-card"><h3>Shipment Details</h3><div class="grid3"><div class="kv"><label>Customer Ref.</label><strong>PO 4500921843</strong></div><div class="kv"><label>Pickup</label><strong>Västerås, Sweden</strong></div><div class="kv"><label>Delivery</label><strong>Munich, Germany</strong></div><div class="kv"><label>Requested Date</label><strong>15/10/2026, 08:00</strong></div><div class="kv"><label>Cargo</label><strong>2 industrial robots</strong></div><div class="kv"><label>Weight</label><strong>4,200 kg total</strong></div></div></div><div class="info-card"><h3>Attachments & Traceability</h3><div class="attachment">Packing_List_Robots.pdf <span>456 KB</span></div><div class="attachment">Drawing_Robot.png <span>1.2 MB</span></div><div class="kv"><label>Source</label><strong>Original customer email</strong></div><div class="kv"><label>Customer Match</label><strong>Verified</strong></div></div></div>` }
        function caseTasks() { let ts = TASKS.filter(x => x[1] === 'CASE-401046'); return `<div class="card"><div class="card-head"><h2>Tasks by Department</h2>${S.role === 'Admin' ? '<button class="btn primary" onclick="openEditor(\'newTask\',\'CASE-401046\')">Add Task</button>' : ''}</div><table><thead><tr><th>Task</th><th>Department</th><th>Assignee</th><th>Due Date</th><th>Priority</th><th>Status</th><th>Dependency</th><th></th></tr></thead><tbody>${ts.map(x => `<tr><td><strong>${x[0]}</strong><div class="sub">${x[8]}</div></td><td>${x[3]}</td><td>${x[4]}</td><td>${x[6]}</td><td>${pill(x[5])}</td><td>${pill(x[7])}</td><td>${x[7] === 'On Hold' ? 'Packing dimensions' : 'Independent'}</td><td><button class="link" onclick="openTask('${x[8]}')">Open</button></td></tr>`).join('')}</tbody></table></div>` }
        function communication() { return head('Communication', 'Customer correspondence and internal notes for CASE-401046.', `<button class="btn" onclick="toast('Reply composer opened')">Reply</button><button class="btn" onclick="toast('Reply All composer opened')">Reply All</button><button class="btn" onclick="toast('New customer email opened')">New Email</button><button class="btn" onclick="toast('Internal Note editor opened')">Add Internal Note</button>${!S.ack ? '<button class="btn primary" onclick="sendAck()">Send Acknowledgement</button>' : ''}`) + `<div class="grid2"><div class="card"><div class="card-head"><h2>Customer Communication</h2></div><div class="card-body">${S.ack ? '<div class="notice green"><strong>Operational acknowledgement sent</strong><div class="sub">By ' + PEOPLE[S.role][0] + ' · 07/10/2026, 09:26 · MSG-7721</div></div>' : ''}<div class="attention"><span class="icon">✉</span><div><strong>Transport request – robots to Munich</strong><span class="sub">Incoming · Thomas Weber · 07/10/2026, 08:14</span></div><button class="link" onclick="toast('Incoming email opened')">Open</button></div><div class="attention"><span class="icon" data-aa-style="aa-static-style-8">✓</span><div><strong>Re: Transport request – robots to Munich</strong><span class="sub">Outgoing · John Andersson · 07/10/2026, 09:26</span></div><button class="link" onclick="toast('Outgoing email opened')">Open</button></div></div></div><div class="card"><div class="card-head"><h2>Internal Case Notes</h2></div><div class="card-body"><div class="notice" data-aa-style="aa-static-style-9"><strong>🔒 Internal only</strong><p>Packing to confirm final measurements before carrier booking.</p><span class="sub">John Andersson · 07/10/2026, 09:21</span></div></div></div></div>` }
        function activities() { return `<div class="card"><div class="card-head"><h2>Activity History</h2><span class="sub">Shared operational record</span></div><div class="card-body"><div class="timeline">${activityEvents(20)}</div></div></div>` }
        function activityEvents(n) { let list = [...(S.ack ? [['Customer acknowledgement sent', PEOPLE[S.role][0], '07/10/2026, 09:26']] : []), ...(S.completed ? [['Task completed', 'Erik Karlsson', '07/10/2026, 10:34']] : []), ...S.activities, ['Tasks created (3)', 'John Andersson', '07/10/2026, 09:18'], ['Transport Task assigned', 'John Andersson', '07/10/2026, 09:18']]; return list.slice(0, n).map(x => `<div class="event"><span class="dot"></span><div><strong>${x[0]}</strong><small>${x[2]} · by ${x[1]}</small></div></div>`).join('') }
        const renderCaseOverview = caseOverview; caseOverview = function () { let html = renderCaseOverview(); return S.ack ? html.replace(/Sent by .*? at 07\/10\/2026, 09:26/, `Sent by ${S.ackBy} at ${S.ackAt}`) : html }
        function sendAck() { if (!can('sendAcknowledgements')) { toast('Your profile does not have permission to send acknowledgements'); return } if (S.ack) { toast('Acknowledgement already sent'); return } S.ack = true; S.ackBy = actorName(); S.ackAt = '09/10/2026, 12:34'; S.activities.unshift(['Customer acknowledgement sent', S.ackBy, S.ackAt]); render(); toast('Acknowledgement sent and locked for all roles') }
        function values(index, base = TASKS) { return [...new Set(base.map(x => x[index]))].sort() }
        const SOURCE_BOXES=['transport@aalogistik.se','terminal@aalogistik.se'];
function sourceOf(id){const m={'EML-4101':0,'EML-4102':1,'EML-4103':0,'EML-4104':0,'EML-4105':1,'EML-4106':1,'EML-4107':0,'EML-4108':0,'EML-4109':1,'EML-4110':1};let v=m[id];if(v===undefined){let h=0;String(id).split('').forEach(ch=>h=(h*31+ch.charCodeAt(0))%97);v=h%2}return {type:'Email',box:SOURCE_BOXES[v]}}
const SOURCE_FILTERS=['Terminal','Transport'];
function sourceLabel(id){const s=sourceOf(id);return s.box?s.box.split('@')[0].replace(/^./,x=>x.toUpperCase()):s.type}
function sourceCell(id){const s=sourceOf(id),ic=s.type==='Email'?'✉':'◫';return `<span class="src-chip"${s.box?` data-tip="Received in ${s.box}" tabindex="0"`:''}><span class="src-ic">${ic}</span>${s.box?s.box.split('@')[0].replace(/^./,x=>x.toUpperCase()):s.type}</span>`}
function optionList(vals, current, label) { return `<option value="All">${label}</option>${vals.map(v => `<option ${current === v ? 'selected' : ''}>${v}</option>`).join('')}` }
        function setFilter(k, v) { S.filters[k] = v; render() }
        function clearFilters(closeMenu = false) { S.filters = { q: '', department: 'All', assignee: 'All', priority: 'All', due: 'All', caseId: 'All', type: 'All', status: 'All' }; if (closeMenu) S.moreFilters = false; render() }
        function clearAdvancedFilters() { Object.assign(S.filters, { department: 'All', assignee: 'All', due: 'All', caseId: 'All', type: 'All' }); render() }
        function applyFilters(base, { statusTab = false } = {}) { let f = S.filters, q = f.q.toLowerCase().trim(); return base.filter(x => (!statusTab || x[7] === S.taskTab) && (!q || [x[0], x[1], x[2], x[3], x[4], x[8], x[9]].join(' ').toLowerCase().includes(q)) && (f.department === 'All' || x[3] === f.department) && (f.assignee === 'All' || x[4] === f.assignee) && (f.priority === 'All' || x[5] === f.priority) && (f.due === 'All' || x[10] === f.due) && (f.caseId === 'All' || x[1] === f.caseId) && (f.type === 'All' || x[9] === f.type) && (f.status === 'All' || x[7] === f.status)) }
        function filterBar(base, { department = true, assignee = true, status = true, caseId = true, type = true } = {}) { let f = S.filters, advanced = [department && f.department !== 'All', assignee && f.assignee !== 'All', f.due !== 'All', caseId && f.caseId !== 'All', type && f.type !== 'All'].filter(Boolean).length; return `<div class="filters"><input aria-label="Search Tasks" value="${f.q}" onchange="setFilter('q',this.value)" onkeyup="if(event.key==='Enter')setFilter('q',this.value)" placeholder="Search Task, Case or customer...">${status ? `<select aria-label="Status" onchange="setFilter('status',this.value)">${optionList(values(7, base), f.status, 'All Statuses')}</select>` : ''}<select aria-label="Priority" onchange="setFilter('priority',this.value)">${optionList(values(5, base), f.priority, 'All Priorities')}</select><div class="filter-menu-wrap"><button class="btn more-filter-trigger ${S.moreFilters ? 'open' : ''}" aria-haspopup="true" aria-expanded="${S.moreFilters}" onclick="S.moreFilters=!S.moreFilters;render()">More Filters${advanced ? `<span class="filter-count">${advanced}</span>` : ''}<span class="filter-chevron">&#9662;</span></button><div class="filters-more ${S.moreFilters ? '' : 'closed'}" role="group" aria-label="Additional filters">${assignee ? `<label class="filter-field">Assignee<select onchange="setFilter('assignee',this.value)">${optionList(values(4, base), f.assignee, 'All Assignees')}</select></label>` : ''}${department ? `<label class="filter-field">Department<select onchange="setFilter('department',this.value)">${optionList(ALL_DEPTS, f.department, 'All Departments')}</select></label>` : ''}<label class="filter-field">Due date<select onchange="setFilter('due',this.value)">${optionList(values(10, base), f.due, 'All Due Dates')}</select></label>${caseId ? `<label class="filter-field">Case<select onchange="setFilter('caseId',this.value)">${optionList(values(1, base), f.caseId, 'All Cases')}</select></label>` : ''}${type ? `<label class="filter-field">Task type<select onchange="setFilter('type',this.value)">${optionList(values(9, base), f.type, 'All Task Types')}</select></label>` : ''}<div class="filter-menu-footer"><span class="sub">${advanced ? `${advanced} additional ${advanced === 1 ? 'filter' : 'filters'} applied` : 'Optional filters'}</span><div class="filter-menu-actions"><button class="btn" onclick="clearAdvancedFilters()" ${advanced ? '' : 'disabled'}>Clear</button><button class="btn" onclick="clearFilters(true)">Reset all</button><button class="btn primary" onclick="S.moreFilters=false;render()">Done</button></div></div></div></div></div>` }
        function taskManager() { let statuses = ['To-Do', 'In Progress', 'On Hold', 'Completed']; let rows = applyFilters(TASKS, { statusTab: true }); return head('Task Manager', 'View and manage all Tasks across departments.') + `<div class="card"><div class="tabs">${statuses.map(t => `<button class="${S.taskTab === t ? 'active' : ''}" onclick="S.taskTab='${t}';S.filters.status='All';render()">${t} (${TASKS.filter(x => x[7] === t).length})</button>`).join('')}</div>${filterBar(TASKS, { status: false })}${tasksTable(rows, true, true)}</div>` }
        function scopeTabs(manager = false) { let tabs = ['My Tasks', 'My Department Tasks', ...(can('viewCompanyTasks') ? ['All Tasks'] : []), ...(manager && can('approveRequests') ? ['Assignment Requests'] : [])]; return `<div class="tabs">${tabs.map(t => `<button class="${S.taskScope === t ? 'active' : ''}" onclick="setTaskScope('${t}')">${t}${t === 'Assignment Requests' ? ` (${managerPending().length})` : ''}</button>`).join('')}</div>` }
        function setTaskScope(scope) { if (scope === 'All Tasks' && !can('viewCompanyTasks')) { toast('Company Task visibility is disabled for this profile'); return } if (scope === 'Assignment Requests' && !can('approveRequests')) { toast('Assignment approval is disabled for this profile'); return } S.taskScope = scope; clearFilters() } function openRequests() { if (!can('approveRequests')) { toast('Assignment approval is disabled for this profile'); return } S.taskScope = 'Assignment Requests'; S.page = 'department'; S.notificationMenu = false; render() }
        function scopedBase() { let u = currentUser(); if (S.taskScope === 'All Tasks' && can('viewCompanyTasks')) return TASKS; if (S.taskScope === 'My Department Tasks') return TASKS.filter(t => t[3] === u.department); return TASKS.filter(t => t[4] === u.name && t[4] !== 'Unassigned') }
        function scopedTasksPage(manager = false) { let u = currentUser(); if (manager && S.taskScope === 'Assignment Requests') return head('My Tasks', `Review assignment requests for ${u.department}.`) + `<div class="card">${scopeTabs(true)}${requestTable()}</div>`; let base = scopedBase(), rows = applyFilters(base), description = S.taskScope === 'My Tasks' ? 'Tasks assigned directly to you.' : S.taskScope === 'My Department Tasks' ? `All ${u.department} Tasks, including unassigned work.` : 'Company-wide Tasks for operational visibility.'; return head('My Tasks', description, `<button class="btn" onclick="setFilter('due','Today')">Due Today</button>`) + `<div class="card">${scopeTabs(manager)}${filterBar(base, { department: S.taskScope === 'All Tasks', assignee: S.taskScope !== 'My Tasks' })}${tasksTable(rows, true, false, manager)}</div>` }
        function department() { return scopedTasksPage(true) } function myTasks() { return scopedTasksPage(false) }
        function taskAction(t, admin, manager) { let u = currentUser(), pending = REQUESTS.find(r => r.taskId === t[8] && r.requesterId === u.id && r.status === 'Pending Approval'); if (admin && t[4] === 'Unassigned') return `<button class="btn primary" onclick="applyTaskRouting('${t[8]}')">Apply Routing</button>`; if (t[4] === 'Unassigned' && t[3] === u.department && u.role === 'User' && can('requestAssignments')) return pending ? '<button class="btn" disabled>Requested</button>' : `<button class="btn primary" onclick="requestAssignment('${t[8]}')">Request Assignment</button>`; return `<button class="btn" onclick="openTask('${t[8]}')">${t[7] === 'To-Do' && t[4] === u.name && can('updateTasks') ? 'Start' : 'Open'}</button>` }
        function applyTaskRouting(id) { if (!adminOnly()) return; let t = taskById(id), classification = normalizeTaskClassification(t), owner = routedOwner(classification); if (!owner) { toast('This Task needs a valid category'); return } t[3] = owner.department; t[4] = owner.name; t[7] = 'To-Do'; t[9] = classification; S.activities.unshift([`${id} routed to ${owner.name} by ${classification}`, actorName(), '09/10/2026, 12:18']); render(); toast(`${id} assigned to ${owner.name}`) }
        function tasksTable(rows, compact = false, admin = false, manager = false) { return `<div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} ${rows.length === 1 ? 'Task' : 'Tasks'}</h3><span class="sub">Showing a maximum of 15 records</span></div>${rows.length ? `<table><thead><tr><th>Task</th><th>Case</th><th>Customer</th>${admin || S.taskScope === 'All Tasks' ? '<th>Department</th>' : ''}<th>${admin ? 'Assigned To' : 'Assignee'}</th><th>Due Date</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows.slice(0, 15).map(x => `<tr><td><strong>${x[0]}</strong><div class="sub">${x[8]} · ${x[9]}</div></td><td><button class="case-link" onclick="openCase('${x[1]}')">${x[1]}</button></td><td>${x[2]}</td>${admin || S.taskScope === 'All Tasks' ? `<td>${x[3]}</td>` : ''}<td>${x[4]}</td><td>${x[6]}</td><td>${pill(x[7])}</td><td>${taskAction(x, admin, manager)}</td></tr>`).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No Tasks match these filters</strong><p class="sub">Change or reset the filters to see Tasks.</p><button class="btn" onclick="clearFilters()">Reset filters</button></div>`}` }
        function managerPending() { let u = currentUser(); return REQUESTS.filter(r => taskById(r.taskId)?.[3] === u.department && (S.requestFilter === 'All Requests' || r.status === S.requestFilter)) }
        function requestTable() { let rows = managerPending(); return `<div class="filters"><select onchange="S.requestFilter=this.value;render()"><option ${S.requestFilter === 'All Requests' ? 'selected' : ''}>All Requests</option><option ${S.requestFilter === 'Pending Approval' ? 'selected' : ''}>Pending Approval</option><option ${S.requestFilter === 'Approved' ? 'selected' : ''}>Approved</option><option ${S.requestFilter === 'Declined' ? 'selected' : ''}>Declined</option></select></div><div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} Assignment ${rows.length === 1 ? 'Request' : 'Requests'}</h3><span class="sub">Department approval queue</span></div>${rows.length ? `<table><thead><tr><th>Task</th><th>Case</th><th>Customer</th><th>Requested By</th><th>Workload</th><th>Department</th><th>Priority</th><th>Due</th><th>Requested</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows.map(r => { let t = taskById(r.taskId), u = USERS.find(x => x.id === r.requesterId), load = TASKS.filter(x => x[4] === u.name && x[7] !== 'Completed').length; return `<tr><td><strong>${t[0]}</strong><div class="sub">${t[8]}</div></td><td><button class="case-link" onclick="openCase('${t[1]}')">${t[1]}</button></td><td>${t[2]}</td><td>${u.name}</td><td>${load} active</td><td>${t[3]}</td><td>${pill(t[5])}</td><td>${t[6]}</td><td>${r.requestedAt}</td><td>${pill(r.status)}</td><td>${r.status === 'Pending Approval' ? `<div class="request-actions"><button class="btn primary" onclick="approveRequest('${r.id}')">Approve</button><button class="btn" onclick="declineRequest('${r.id}')">Decline</button></div>` : '—'}</td></tr>` }).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No assignment requests match this filter</strong></div>`}` }
        function requestAssignment(id) { let u = currentUser(), t = taskById(id); if (!can('requestAssignments')) { toast('Your profile cannot request Task assignments'); return } if (!t || u.role !== 'User' || t[4] !== 'Unassigned' || t[3] !== u.department) { toast('You can request only unassigned Tasks in your department'); return } if (REQUESTS.some(r => r.taskId === id && r.requesterId === u.id && r.status === 'Pending Approval')) { toast('Assignment request is already pending'); return } REQUESTS.push({ id: `REQ-${101 + REQUESTS.length}`, taskId: id, requesterId: u.id, requestedAt: '09/10/2026, 10:24', status: 'Pending Approval' }); S.activities.unshift([`Assignment requested for ${id}`, u.name, '09/10/2026, 10:24']); render(); toast(`Request sent to the ${u.department} Manager`) }
        function approveRequest(id) { let r = REQUESTS.find(x => x.id === id), t = r && taskById(r.taskId), u = currentUser(); if (!can('approveRequests')) { toast('Your profile cannot approve assignment requests'); return } if (!r || !t || u.role !== 'Manager' || t[3] !== u.department) { toast('Only the department manager can approve this request'); return } let classification = normalizeTaskClassification(t), owner = routedOwner(classification); if (!owner) { toast('Task category has no User Master owner'); return } r.status = 'Approved'; r.resolvedOwner = owner.name; t[3] = owner.department; t[4] = owner.name; t[7] = 'To-Do'; t[9] = classification; S.activities.unshift([`${id} approved · ${t[8]} routed to ${owner.name}`, u.name, '09/10/2026, 10:31']); render(); toast(`${t[8]} routed to ${owner.name}`) }
        function declineRequest(id) { let r = REQUESTS.find(x => x.id === id), t = r && taskById(r.taskId), u = currentUser(); if (!can('approveRequests')) { toast('Your profile cannot decline assignment requests'); return } if (!r || !t || u.role !== 'Manager' || t[3] !== u.department) { toast('Only the department manager can decline this request'); return } r.status = 'Declined'; S.activities.unshift([`${id} declined`, u.name, '09/10/2026, 10:31']); render(); toast('Request declined; Task remains unassigned') }
        function adminOnly() { if (S.role !== 'Admin') { toast('Only the Admin can change Cases or Task definitions'); return false } return true }
        function openEditor(type, id = null) { if (!adminOnly()) return; S.editorType = type; S.editorId = id; if (type === 'ai') S.editorData = { ...AI_DATA }; else if (type === 'proposed') S.editorData = { items: PROPOSED_TASKS.map(x => ({ ...x })) }; else if (type === 'newProposed') S.editorData = { title: '', classification: 'Transport booking', due: '15/10/2026' }; else if (type === 'case' || type === 'caseAction') { let c = CASES.find(x => x[0] === id) || CASES.find(x => x[0] === S.selectedCase); S.editorId = c[0]; S.editorData = { customer: c[1], caseClass: c[2], departments: c[3], priority: c[4], due: c[5], status: c[6] } } else if (type === 'task') { let t = taskById(id); S.editorData = { title: t[0], caseId: t[1], customer: t[2], priority: t[5], due: t[6], status: t[7], taskType: TASK_ROUTING[t[9]] ? t[9] : 'Transport booking' } } else if (type === 'newTask') S.editorData = { title: '', caseId: id || S.selectedCase, customer: (CASES.find(c => c[0] === (id || S.selectedCase)) || CASES[0])[1], priority: 'Medium', due: '10/10/2026', status: 'Ready', taskType: 'Transport booking' }; render() }
        const launchEditor = openEditor; openEditor = function (type, id = null) { S.editorDirty = false; return launchEditor(type, id) }
        function editField(key, value) { S.editorData[key] = value; S.editorDirty = true } function editProposed(i, key, value) { S.editorData.items[i][key] = value; S.editorDirty = true }
        function field(label, key, value, wide = false) { return `<label class="${wide ? 'wide' : ''}">${label}<input value="${String(value || '').replace(/"/g, '&quot;')}" oninput="editField('${key}',this.value)"></label>` }
        function choice(label, key, value, options, wide = false) { return `<label class="${wide ? 'wide' : ''}">${label}<select onchange="editField('${key}',this.value);${key === 'taskType' || key === 'classification' ? 'render()' : ''}">${options.map(x => `<option value="${x}" ${value === x ? 'selected' : ''}>${x}</option>`).join('')}</select></label>` }
        function routePreview(classification) { let owner = routedOwner(classification); return owner ? `<div class="notice green wide"><strong>Automatic owner: ${owner.name}</strong><br><span class="sub">${classification} · ${owner.department} · Fixed User Master rule</span></div>` : `<div class="notice wide">Select a valid Task category to determine its owner.</div>` }
        function editorDialog() { let d = S.editorData, type = S.editorType, title = 'Edit', body = '', classes = Object.keys(TASK_ROUTING); if (type === 'ai') { title = 'Edit AI Interpretation'; body = `<div class="editor-grid">${field('Customer', 'customer', d.customer)}${field('Category', 'classification', d.classification)}${choice('Case Type', 'caseClass', d.caseClass, ['Standard', 'Express', 'Project'])}${choice('Priority', 'priority', d.priority, ['Urgent', 'High', 'Medium', 'Low'])}${field('Pickup', 'pickup', d.pickup)}${field('Delivery', 'delivery', d.delivery)}${field('Requested Date', 'requestedDate', d.requestedDate)}${field('Goods', 'goods', d.goods)}${field('Weight', 'weight', d.weight, true)}</div>` } else if (type === 'proposed') { title = 'Edit Proposed Tasks'; body = `<div class="editor-grid">${d.items.map((x, i) => { let owner = routedOwner(x.classification); return `<div class="wide proposal"><label>Task name<input value="${x.title}" oninput="editProposed(${i},'title',this.value)"></label><div class="editor-grid" data-aa-style="aa-static-style-10">${choiceProposed(i, 'Task category', 'classification', x.classification, classes)}<label>Due date<input value="${x.due}" oninput="editProposed(${i},'due',this.value)"></label></div><p><strong>Automatic owner:</strong> ${owner ? `${owner.name} · ${owner.department}` : 'Not mapped'}</p></div>` }).join('')}</div>` } else if (type === 'case' || type === 'caseAction') { title = type === 'case' ? 'Edit Case' : 'Case Actions'; body = `<div class="editor-grid">${field('Customer', 'customer', d.customer)}${field('Case class', 'caseClass', d.caseClass)}${field('Departments', 'departments', d.departments)}${choice('Priority', 'priority', d.priority, ['Urgent', 'High', 'Medium', 'Low'])}${field('Due date', 'due', d.due)}${choice('Status', 'status', d.status, ['Active', 'Ready', 'In Progress', 'Waiting', 'Blocked', 'Completed'])}</div>` } else { title = type === 'task' ? 'Edit Task' : type === 'newProposed' ? 'Add Proposed Task' : 'Add Task'; let classification = type === 'newProposed' ? d.classification : d.taskType; body = `<div class="editor-grid">${field('Task name', 'title', d.title, true)}${choice(type === 'newProposed' ? 'Task category' : 'Task category', type === 'newProposed' ? 'classification' : 'taskType', classification, classes, true)}${routePreview(classification)}${choice('Priority', 'priority', d.priority || 'Medium', ['Urgent', 'High', 'Medium', 'Low'])}${field('Due date', 'due', d.due)}${type !== 'newProposed' ? choice('Status', 'status', d.status || 'Ready', ['To-Do', 'In Progress', 'On Hold', 'Completed']) : ''}</div>` } return `<div class="modal-shade"><div class="assign-modal"><h2>${title}</h2><div class="body">${body}</div><div class="footer"><button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" onclick="saveEditor()">Save Changes</button></div></div></div>` }
        function choiceProposed(i, label, key, value, options) { return `<label>${label}<select onchange="editProposed(${i},'${key}',this.value);${key === 'classification' ? 'render()' : ''}">${options.map(x => `<option value="${x}" ${value === x ? 'selected' : ''}>${x}</option>`).join('')}</select></label>` }
        function closeEditor() { if (S.editorDirty && !window.confirm('Discard unsaved changes?')) return; S.editorType = null; S.editorData = {}; S.editorDirty = false; render() }
        function saveEditor() { if (!adminOnly()) return; let type = S.editorType, d = S.editorData; if ((type === 'newTask' || type === 'newProposed') && !d.title.trim()) { toast('Enter a Task name'); return } if (type === 'ai') Object.assign(AI_DATA, d); else if (type === 'proposed') { d.items.forEach(x => { let owner = routedOwner(x.classification); x.department = owner?.department || 'Uncategorized' }); PROPOSED_TASKS.splice(0, PROPOSED_TASKS.length, ...d.items) } else if (type === 'newProposed') { let owner = routedOwner(d.classification); PROPOSED_TASKS.push({ title: d.title, department: owner.department, classification: d.classification, due: d.due }) } else if (type === 'case' || type === 'caseAction') { let c = CASES.find(x => x[0] === S.editorId); c.splice(1, 6, d.customer, d.caseClass, d.departments, d.priority, d.due, d.status) } else if (type === 'task') { let t = taskById(S.editorId), id = t[8], bucket = t[10], owner = routedOwner(d.taskType); t.splice(0, 11, d.title, d.caseId, d.customer, owner.department, owner.name, d.priority, d.due, d.status, id, d.taskType, bucket) } else if (type === 'newTask') { let id = `TASK-${2046 + TASKS.filter(t => Number(t[8].split('-')[1]) >= 2046).length}`, owner = routedOwner(d.taskType); TASKS.push([d.title, d.caseId, d.customer, owner.department, owner.name, d.priority, d.due, d.status, id, d.taskType, 'Later']) } S.activities.unshift([`${type} saved · Task owner routed from User Master`, actorName(), '09/10/2026, 12:10']); S.editorType = null; S.editorData = {}; render(); toast('Changes saved with automatic Task owner') }
        function openCaseActions() { openEditor('caseAction', S.selectedCase) }
        function downloadAttachment(name) { let a = document.createElement?.('a'); if (a) { a.href = `data:text/plain;charset=utf-8,AA%20Logistik%20attachment%3A%20${encodeURIComponent(name)}`; a.download = name; a.click() } toast(`${name} downloaded`) }
        function addTaskComment(id) { let box = document.getElementById('task-comment'), value = box?.value?.trim(); if (!value) { toast('Write a comment first'); return } let at = '09/10/2026, 12:36', author = actorName(); (S.comments[id] = S.comments[id] || []).push({ nid: 'T'+Date.now().toString(36)+Math.random().toString(36).slice(2,7), author, text: value, at, replyTo: S.taskReplyTo || null }); S.taskReplyTo = null; S.activities.unshift([`Comment added to ${id}`, author, at]); if (box) box.value = ''; render(); toast('Comment added') }
        function addAttachment(id) { let input = document.createElement?.('input'); if (!input) { toast('Attachment picker unavailable'); return } input.type = 'file'; input.onchange = () => { let name = input.files?.[0]?.name || 'Selected file', at = '09/10/2026, 12:38', author = actorName(); (S.attachments[id] = S.attachments[id] || []).push({ name, at, author }); S.activities.unshift([`${name} attached to ${id}`, author, at]); render(); toast(`${name} attached`) }; input.click() }
        function openAssign(id) { if (!adminOnly()) return; let t = TASKS.find(x => x[8] === id); S.assignTaskId = id; S.assignChoice = t && t[4] !== 'Unassigned' ? t[4] : ''; S.assignModal = true; render() }
        function assignDialog() { let t = TASKS.find(x => x[8] === S.assignTaskId), people = USERS.filter(u => u.department === t?.[3]).map(u => u.name); return `<div class="modal-shade"><div class="assign-modal"><h2>${t && t[4] !== 'Unassigned' ? 'Reassign' : 'Assign'} ${t ? t[8] : 'Task'}</h2><div class="body"><p><strong>${t ? t[0] : ''}</strong><br><span class="sub">${t ? t[3] : ''} · ${t ? t[1] : ''}</span></p><label data-aa-style="aa-static-style-11">Assignee</label><select onchange="S.assignChoice=this.value"><option value="">Select a team member</option>${people.map(p => `<option ${S.assignChoice === p ? 'selected' : ''} value="${p}">${p} · ${TASKS.filter(t => t[4] === p && t[7] !== 'Completed').length} active Tasks</option>`).join('')}</select></div><div class="footer"><button class="btn" onclick="S.assignModal=false;render()">Cancel</button><button class="btn primary" onclick="confirmAssign()">Confirm Assignment</button></div></div></div>` }
        function confirmAssign() { let t = TASKS.find(x => x[8] === S.assignTaskId); if (!t || !S.assignChoice) { toast('Select an assignee first'); return } let old = t[4]; t[4] = S.assignChoice; if (t[4] === 'Unassigned') t[7] = 'To-Do'; S.activities.unshift([`Task ${old === 'Unassigned' ? 'assigned' : 'reassigned'}`, actorName(), '09/10/2026, 10:18']); S.assignModal = false; render(); toast(`${t[8]} assigned to ${t[4]}`) }
        function reassignTask(id) { if (!can('reassignTasks')) { toast('Your profile cannot reassign Tasks'); return } let t = TASKS.find(x => x[8] === id); if (!t) return; let old = t[4]; t[4] = old === 'Lars Berg' ? 'Andreas Nilsson' : 'Lars Berg'; S.activities.unshift(['Task reassigned', PEOPLE[S.role][0], '08/10/2026, 10:20']); render(); toast(`${id} reassigned from ${old} to ${t[4]}`) }
        function teamWorkload() { let members = USERS.filter(u => u.department === currentUser().department); return `<div class="workload">${members.map(u => { let total = TASKS.filter(t => t[4] === u.name).length, active = TASKS.filter(t => t[4] === u.name && t[7] !== 'Completed').length; return `<div class="person"><span class="mini-avatar">${u.initials}</span><strong>${u.name}</strong><span>${total} Tasks</span><div><div class="bar"><i style="width:${Math.min(100, 35 + active * 12)}%"></i></div><span class="sub">${active} active</span></div></div>` }).join('')}</div>` }
        function taskComments(id) { let comments = [{ author: 'Sofia Lind', text: 'Shipment information has been checked against the customer attachment.', at: '07/10/2026, 09:42' }, ...((S.comments && S.comments[id]) || [])]; return comments.map(c => `<p><strong>${c.author}</strong><br><span class="sub">${c.text}</span><br><small class="sub">${c.at}</small></p>`).join('') + taskAttachments(id) } function taskAttachments(id) { let files = S.attachments[id] || []; return files.length ? `<div data-aa-style="aa-static-style-12">${files.map(f => `<div class="attachment"><span>▧ ${f.name}</span><small>${f.at} · ${f.author}</small></div>`).join('')}</div>` : '' }
        function openTask(id = 'TASK-2031') { S.selectedTask = id; S.drawer = true; S.taskTitleEdit = false; render() }
        function commitTaskTitle(id, value) { S.taskTitleEdit = false; let v = String(value || '').trim(), t = taskById(id); if (v && t && v !== t[0]) adminInlineTaskUpdate(id, 'title', v); else render() } function taskDrawer() { let t = TASKS.find(x => x[8] === S.selectedTask) || TASKS[0], canStart = ['To-Do'].includes(t[7]), canComplete = t[7] === 'In Progress'; return `<div class="drawer-bg" onclick="S.drawer=false;render()"></div><aside class="drawer"><div class="page-head"><div><span class="id">${t[8]}</span><h1 data-aa-style="aa-static-style-13">${t[0]}</h1><p>${t[1]} · ${t[2]}</p></div><div class="actions">${S.role === 'Admin' ? `<button class="btn" onclick="openEditor('task','${t[8]}')">Edit Task</button>` : ''}<button class="btn" onclick="S.drawer=false;render()">Close</button></div></div>${!S.ack && t[1] === 'CASE-401046' ? '<div class="notice">Customer acknowledgement is pending. <button class="link" onclick="sendAck()">Send now</button></div>' : ''}<div class="info-card"><div class="kv"><label>Status</label><strong>${pill(t[7])}</strong></div><div class="kv"><label>Department</label><strong>${t[3]}</strong></div><div class="kv"><label>Assignee</label><strong>${t[4]}</strong></div><div class="kv"><label>Due Date</label><strong>${t[6]}</strong></div><div class="kv"><label>Priority</label><strong>${t[5]}</strong></div><div class="kv"><label>Task Type</label><strong>${t[9]}</strong></div><div class="kv"><label>Dependency</label><strong>${t[7] === 'On Hold' ? 'Awaiting preceding operational Task' : 'Ready to progress'}</strong></div></div><div class="card" data-aa-style="aa-static-style-14"><div class="card-head"><h2>Comments</h2></div><div class="card-body">${taskComments(t[8])}<textarea id="task-comment" data-aa-style="aa-static-style-15" placeholder="Add a comment, @ to mention or # to link a task"></textarea><div class="actions" data-aa-style="aa-static-style-16"><button class="btn" onclick="addTaskComment('${t[8]}')">Add Comment</button><button class="btn" onclick="addAttachment('${t[8]}')">Add Attachment</button></div></div></div><div class="actions" data-aa-style="aa-static-style-17">${canStart && can('updateTasks') ? `<button class="btn primary" onclick="startSelectedTask()">Start Task</button>` : ''}${canComplete && can('updateTasks') ? `<button class="btn primary" onclick="completeTask()">Complete Task</button>` : ''}${t[7] === 'Completed' ? '<button class="btn" disabled>Completed</button>' : ''}</div></aside>` }
        function startSelectedTask() { if (!can('updateTasks')) { toast('Your profile cannot update Task status'); return } let t = TASKS.find(x => x[8] === S.selectedTask); if (!t) return; t[7] = 'In Progress'; S.activities.unshift(['Task started', actorName(), '08/10/2026, 10:28']); render(); toast(`${t[8]} moved to In Progress`) }
        function completeTask() { if (!can('updateTasks')) { toast('Your profile cannot update Task status'); return } let t = TASKS.find(x => x[8] === S.selectedTask); if (!t || t[7] === 'Completed') return; t[7] = 'Completed'; S.completed = t[1] === 'CASE-401046'; S.activities.unshift(['Task completed', actorName(), '08/10/2026, 10:34']); S.drawer = false; render(); toast(`${t[8]} completed · counts and Case progress updated`) }
        function toggleUserSearch() { S.userSearchOpen = !S.userSearchOpen; if (!S.userSearchOpen) S.userSearch = ''; render(); if (S.userSearchOpen) setTimeout(() => document.getElementById('user-master-search')?.focus(), 0) } function setUserSearch(value) { S.userSearch = value; render() }
        function userManagement() { if (S.role !== 'Admin') return head('Access denied', 'User Management is available only to the Admin.'); let q = S.userSearch.trim().toLowerCase(), rows = USER_MASTER.filter(u => !q || [u.name, u.department, u.title, u.workScope, ...u.classifications].join(' ').toLowerCase().includes(q)); let search = `<div class="expand-search ${S.userSearchOpen ? 'open' : ''}"><button class="search-icon-btn" aria-label="${S.userSearchOpen ? 'Close user search' : 'Search users'}" title="${S.userSearchOpen ? 'Close search' : 'Search users'}" onclick="toggleUserSearch()">${S.userSearchOpen ? '×' : '🔍'}</button><input id="user-master-search" aria-label="Search User Master" value="${S.userSearch}" oninput="setUserSearch(this.value)" placeholder="Search name, department, role or category..."></div>`; return head('User Master', 'Who can work in the system, where they sit and which Task categories route to them.', search) + `<div class="notice">This is a fixed routing master. Task owners are selected automatically from category rules when Admin approves a Case.</div><div class="card"><div class="card-head"><h2>Users</h2><span class="sub">${rows.length} of ${USER_MASTER.length} fixed profiles · Read only</span></div>${rows.length ? `<table><thead><tr><th>Name</th><th>Department</th><th>Role</th><th>Default Work Scope</th><th>Task Categories</th><th>Active</th></tr></thead><tbody>${rows.map(u => `<tr><td><div data-aa-style="aa-static-style-18"><span class="avatar">${u.initials}</span><strong>${u.name}</strong></div></td><td>${u.department}</td><td>${u.title}</td><td>${u.workScope}</td><td>${u.classifications.length ? u.classifications.map(x => pill(x)).join(' ') : '<span class="sub">No automatic Task routing</span>'}</td><td>${pill('Active')}</td></tr>`).join('')}</tbody></table>` : `<div class="empty-search"><strong>No users match “${S.userSearch}”</strong><p>Try a name, department, role or Task category.</p><button class="btn" onclick="S.userSearch='';render()">Clear search</button></div>`}</div>` }
        function dashboard() { let scoped = S.role === 'Admin' ? TASKS : S.role === 'Manager' ? TASKS.filter(x => x[3] === 'Transport') : TASKS.filter(x => x[4] === 'Erik Karlsson'), chart = S.role === 'Admin' ? [['Transport', 152], ['Packing', 86], ['Freight', 118], ['Customs', 64]] : S.role === 'Manager' ? [['Andreas', 132], ['Erik', 118], ['Lars', 92], ['Maria', 70]] : [['Mon', 72], ['Tue', 124], ['Wed', 95], ['Thu', 152], ['Fri', 88]], chartTitle = S.role === 'Admin' ? 'Company Workload by Department' : S.role === 'Manager' ? 'Transport Team Workload' : 'My Task Activity'; return head('Dashboard', S.role === 'Admin' ? 'Company-wide operational performance.' : S.role === 'Manager' ? 'Transport department performance.' : 'Your personal completion and timing overview.') + kpis(S.role === 'Admin' ? [['Active Cases', CASES.length], ['Awaiting Review', '12', 'amber'], ['Open Tasks', scoped.filter(x => x[7] !== 'Completed').length], ['Overdue Tasks', scoped.filter(x => (taskDeadlineState(x) === 'Overdue')).length, 'red'], ['On-Time Completion', '91%']] : S.role === 'Manager' ? [['My Department Tasks', scoped.length], ['Completed This Week', Math.max(1, scoped.filter(x => x[7] === 'Completed').length)], ['Overdue', Math.max(1, scoped.filter(x => (taskDeadlineState(x) === 'Overdue')).length), 'red'], ['Average Processing', '6.2 h'], ['On-Time Completion', '93%']] : [['My Tasks', scoped.length], ['Completed This Week', scoped.filter(x => x[7] === 'Completed').length], ['Due Today', scoped.filter(x => x[10] === 'Today').length, 'amber'], ['Overdue', scoped.filter(x => (taskDeadlineState(x) === 'Overdue')).length, 'red'], ['On-Time Completion', '96%']]) + `<div class="grid2"><div class="card"><div class="card-head"><h2>${chartTitle}</h2></div><div class="chart">${chart.map(x => `<div><i style="height:${x[1]}px"></i>${x[0]}</div>`).join('')}</div></div><div class="card"><div class="card-head"><h2>${S.role === 'Admin' ? 'Company Response Timing' : S.role === 'Manager' ? 'Transport Department Timing' : 'Operational Timing'}</h2></div><div class="card-body"><div class="kv"><label>Assignment Time</label><strong>18 min</strong></div><div class="kv"><label>Processing Time</label><strong>6 h 12 min</strong></div><div class="kv"><label>First Response</label><strong>26 min</strong></div><div class="kv"><label>Waiting Time</label><strong>1 h 48 min</strong></div></div></div></div>` }
        function render() { if (!S.loggedIn) { document.getElementById('root').innerHTML = loginView(); return } if (S.role !== 'Admin' && S.page === 'users') S.page = 'home'; if (S.page === 'dashboard' && !can('viewDashboard')) S.page = 'home'; let body = S.page === 'home' ? home() : S.page === 'review' ? review() : S.page === 'approval' ? approval() : S.page === 'cases' ? cases() : S.page === 'case' ? caseView() : S.page === 'tasks' ? taskManager() : S.page === 'users' ? userManagement() : S.page === 'department' ? department() : S.page === 'mytasks' ? myTasks() : dashboard(); document.getElementById('root').innerHTML = shell(body) } render();
        dashboard = function () { let u = currentUser(), scoped = S.role === 'Admin' ? TASKS : S.role === 'Manager' ? TASKS.filter(t => t[3] === u.department) : TASKS.filter(t => t[4] === u.name), chart = S.role === 'Admin' ? ALL_DEPTS.map(d => [d, TASKS.filter(t => t[3] === d).length * 22 + 35]) : S.role === 'Manager' ? USERS.filter(x => x.department === u.department).map(x => [x.name.split(' ')[0], TASKS.filter(t => t[4] === x.name).length * 24 + 35]) : [['Ready', scoped.filter(t => t[7] === 'To-Do').length * 25 + 25], ['In Progress', scoped.filter(t => t[7] === 'In Progress').length * 25 + 25], ['Waiting', scoped.filter(t => t[7] === 'On Hold').length * 25 + 25], ['Completed', scoped.filter(t => t[7] === 'Completed').length * 25 + 25]], chartTitle = S.role === 'Admin' ? 'Company Workload by Department' : S.role === 'Manager' ? `${u.department} Team Workload` : 'My Task Activity', subtitle = S.role === 'Admin' ? 'Company-wide operational performance.' : S.role === 'Manager' ? `${u.department} department performance.` : 'Your personal completion and timing overview.', metrics = S.role === 'Admin' ? [['Active Cases', CASES.filter(c => c[6] !== 'Completed').length], ['Awaiting Review', QUEUE.filter(x => x[6] === 'Awaiting Review').length, 'amber'], ['Open Tasks', scoped.filter(x => x[7] !== 'Completed').length], ['Overdue Tasks', scoped.filter(x => (taskDeadlineState(x) === 'Overdue')).length, 'red'], ['Completed', scoped.filter(x => x[7] === 'Completed').length]] : S.role === 'Manager' ? [['My Department Tasks', scoped.length], ['Completed', scoped.filter(x => x[7] === 'Completed').length], ['Overdue', scoped.filter(x => (taskDeadlineState(x) === 'Overdue')).length, 'red'], ['Due Today', scoped.filter(x => x[10] === 'Today').length, 'amber'], ['Waiting', scoped.filter(x => x[7] === 'On Hold').length]] : [['My Tasks', scoped.length], ['Completed', scoped.filter(x => x[7] === 'Completed').length], ['Due Today', scoped.filter(x => x[10] === 'Today').length, 'amber'], ['Overdue', scoped.filter(x => (taskDeadlineState(x) === 'Overdue')).length, 'red'], ['Waiting', scoped.filter(x => x[7] === 'On Hold').length]]; return head('Dashboard', subtitle) + kpis(metrics) + `<div class="grid2"><div class="card"><div class="card-head"><h2>${chartTitle}</h2></div><div class="chart">${chart.map(x => `<div><i style="height:${Math.min(165, x[1])}px"></i>${x[0]}</div>`).join('')}</div></div><div class="card"><div class="card-head"><h2>Current Scope</h2></div><div class="card-body"><div class="kv"><label>Profile</label><strong>${u.name}</strong></div><div class="kv"><label>Scope</label><strong>${S.role === 'Admin' ? 'Company' : S.role === 'Manager' ? u.department : 'My Tasks'}</strong></div><div class="kv"><label>Open Tasks</label><strong>${scoped.filter(t => t[7] !== 'Completed').length}</strong></div><div class="kv"><label>Completed</label><strong>${scoped.filter(t => t[7] === 'Completed').length}</strong></div></div></div></div>` }
        const originalEditorDialog = editorDialog; editorDialog = function () { if (S.editorType === 'compose') { let d = S.editorData; return `<div class="modal-shade"><div class="assign-modal"><h2>${d.mode}</h2><div class="body"><div class="editor-grid"><label class="wide">Subject<input value="${d.subject}" oninput="editField('subject',this.value)"></label><label class="wide">Message<textarea data-aa-style="aa-static-style-19" oninput="editField('body',this.value)">${d.body}</textarea></label></div></div><div class="footer"><button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" onclick="sendCommunication()">${d.mode === 'Internal Note' ? 'Add Note' : 'Send'}</button></div></div></div>` } if (S.editorType === 'viewMessage') { let d = S.editorData; return `<div class="modal-shade"><div class="assign-modal"><h2>${d.subject}</h2><div class="body"><p class="sub">${d.direction} · ${d.author} · ${d.at}</p><p>${d.body}</p></div><div class="footer"><button class="btn" onclick="S.editorType=null;render()">Close</button>${d.direction === 'Incoming' ? `<button class="btn primary" onclick="openCommunication('Reply','${d.id}')">Reply</button>` : ''}</div></div></div>` } return originalEditorDialog() };
        function openCommunication(mode, id = '') { let source = S.communications.find(m => m.id === id); if (mode === 'Open') { S.editorType = 'viewMessage'; S.editorData = { ...source }; render(); return } S.editorType = 'compose'; S.editorDirty = false; S.editorData = { mode, subject: mode === 'New Email' ? '' : source ? `Re: ${source.subject.replace(/^Re: /, '')}` : 'Re: Transport request – robots to Munich', body: '' }; render() }
        S.communications.forEach(m => m.caseId = m.caseId || 'CASE-401046'); S.notes.forEach(n => n.caseId = n.caseId || 'CASE-401046');
        function sendCommunication() { let d = S.editorData; if (!d.body.trim() || (d.mode !== 'Internal Note' && !d.subject.trim())) { toast('Complete the subject and message'); return } let at = '09/10/2026, 12:42', author = actorName(), caseId = S.selectedCase; if (d.mode === 'Internal Note') S.notes.unshift({ text: d.body, author, at, caseId }); else S.communications.unshift({ id: `MSG-${7730 + S.communications.length}`, direction: 'Outgoing', subject: d.subject, body: d.body, author, at, caseId }); S.activities.unshift([d.mode === 'Internal Note' ? `Internal note added to ${caseId}` : `${d.mode} sent for ${caseId}`, author, at]); S.editorType = null; S.editorData = {}; S.editorDirty = false; render(); toast(d.mode === 'Internal Note' ? 'Internal note added' : 'Message sent') }
        function communicationList() { let rows = S.communications.filter(m => m.caseId === S.selectedCase); return `<div class="attention-list">${rows.length ? rows.map(m => `<div class="attention"><span class="icon">${m.direction === 'Incoming' ? '✉' : '✓'}</span><div><strong>${m.subject}</strong><span class="sub">${m.direction} · ${m.author} · ${m.at}</span></div><button class="link" onclick="openCommunication('Open','${m.id}')">Open</button></div>`).join('') : '<div class="empty-search">No communication recorded for this Case.</div>'}</div>` }
        communication = function () { return head('Communication', 'Customer correspondence and internal notes for CASE-401046.', `<button class="btn" onclick="openCommunication('Reply','MSG-7701')">Reply</button><button class="btn" onclick="openCommunication('Reply All','MSG-7701')">Reply All</button><button class="btn" onclick="openCommunication('New Email')">New Email</button><button class="btn" onclick="openCommunication('Internal Note')">Add Internal Note</button>${!S.ack ? '<button class="btn primary" onclick="sendAck()">Send Acknowledgement</button>' : ''}`) + `<div class="grid2"><div class="card"><div class="card-head"><h2>Customer Communication</h2></div>${communicationList()}</div><div class="card"><div class="card-head"><h2>Internal Case Notes</h2></div><div class="card-body">${S.notes.map(n => `<div class="notice" data-aa-style="aa-static-style-9"><strong>🔒 ${n.author}</strong><p>${n.text}</p><span class="sub">${n.at}</span></div>`).join('')}</div></div></div>` };
        const originalGenericCaseTab = genericCaseTab; genericCaseTab = function (c) { if (S.caseTab === 'Communication') return `<div class="card"><div class="card-head"><h2>Communication</h2><div class="actions"><button class="btn" onclick="openCommunication('Reply','MSG-7701')">Reply</button><button class="btn" onclick="openCommunication('Internal Note')">Add Internal Note</button></div></div>${communicationList()}</div>`; return originalGenericCaseTab(c) };
        const persistEditor = saveEditor; saveEditor = function () { let type = S.editorType, id = S.editorId, data = { ...S.editorData }; persistEditor(); if ((type === 'case' || type === 'caseAction') && id === 'CASE-401046') { AI_DATA.customer = data.customer; AI_DATA.caseClass = data.caseClass; AI_DATA.priority = data.priority; render() } };
        const renderApproval = approval; approval = function () { return renderApproval().replace('<button class="btn" onclick="saveDraft()">Save as Draft</button>', '') };
        const renderLogin = loginView; loginView = function () { return renderLogin().replace('<div class="login-note">Prototype sign-in starts a fresh Admin session. Use the role selector after signing in to review the Manager and Department User experiences.</div>', '') };

        /* Customer-specific operational dataset */
        const CASE_SEEDS = [
            ['ABB Robotics', 'Transport Order', 'Thomas Weber', 'thomas.weber@abb.com', 'Industrial robots', 'Västerås, Sweden', 'Munich, Germany', 'High', 'Transport booking', 'Book dedicated carrier', '4,200 kg'],
            ['Hitachi Energy', 'Export Shipment', 'Linnea Berg', 'linnea.berg@hitachienergy.com', 'Power transformer bushings', 'Ludvika, Sweden', 'Rotterdam, Netherlands', 'High', 'Export documentation', 'Prepare export dossier', '3,850 kg'],
            ['Alstom', 'Pickup Coordination', 'Marc Dubois', 'marc.dubois@alstomgroup.com', 'Rail brake assemblies', 'Stockholm, Sweden', 'Kassel, Germany', 'Medium', 'Pickup coordination', 'Coordinate factory pickup', '1,740 kg'],
            ['Westinghouse Electric', 'Customs Clearance', 'Sarah Mitchell', 'sarah.mitchell@westinghouse.com', 'Reactor inspection tools', 'Västerås, Sweden', 'Olkiluoto, Finland', 'High', 'Customs clearance', 'Validate customs documents', '980 kg'],
            ['Nefab', 'Packing Request', 'Johan Ek', 'johan.ek@nefab.com', 'Reusable export crates', 'Jönköping, Sweden', 'Gothenburg, Sweden', 'Low', 'Packing preparation', 'Prepare protective packing', '620 kg'],
            ['Volvo Construction Equipment', 'Express Delivery', 'Mikael Larsson', 'mikael.larsson@volvoce.com', 'Hydraulic pump units', 'Eskilstuna, Sweden', 'Braås, Sweden', 'Urgent', 'Delivery coordination', 'Secure express delivery slot', '1,280 kg'],
            ['Sandvik Mining', 'Project Cargo', 'Eva Nyström', 'eva.nystrom@sandvik.com', 'Drill rig feed modules', 'Sandviken, Sweden', 'Kiruna, Sweden', 'Medium', 'Transport booking', 'Plan project cargo movement', '7,600 kg'],
            ['SKF', 'Inbound Shipment', 'Oskar Lund', 'oskar.lund@skf.com', 'Precision bearing pallets', 'Schweinfurt, Germany', 'Gothenburg, Sweden', 'Medium', 'Pickup coordination', 'Arrange supplier collection', '2,150 kg'],
            ['Epiroc', 'Dangerous Goods', 'Klara Holm', 'klara.holm@epiroc.com', 'Lithium battery packs', 'Örebro, Sweden', 'Tampere, Finland', 'Urgent', 'Export documentation', 'Prepare dangerous-goods file', '1,120 kg'],
            ['Scania', 'Production Supply', 'Anders Dahl', 'anders.dahl@scania.com', 'Gearbox housings', 'Södertälje, Sweden', 'Zwolle, Netherlands', 'Urgent', 'Transport follow-up', 'Monitor production-critical load', '5,400 kg'],
            ['Atlas Copco', 'Air Freight', 'Nina Sjöberg', 'nina.sjoberg@atlascopco.com', 'Compressor control units', 'Stockholm, Sweden', 'Chicago, USA', 'Medium', 'Customs clearance', 'Prepare airfreight customs entry', '460 kg'],
            ['Siemens Energy', 'Oversized Cargo', 'Karin Vogel', 'karin.vogel@siemens-energy.com', 'Turbine rotor section', 'Finspång, Sweden', 'Berlin, Germany', 'High', 'Transport booking', 'Book abnormal-load vehicle', '12,800 kg'],
            ['Tetra Pak', 'Temperature Controlled', 'Fredrik Olsson', 'fredrik.olsson@tetrapak.com', 'Sterile packaging samples', 'Lund, Sweden', 'Parma, Italy', 'Medium', 'Delivery coordination', 'Confirm temperature-safe delivery', '340 kg'],
            ['SSAB', 'Steel Delivery', 'Emil Norberg', 'emil.norberg@ssab.com', 'High-strength steel coils', 'Borlänge, Sweden', 'Turku, Finland', 'Medium', 'Transport booking', 'Reserve coil transport', '18,500 kg'],
            ['Northvolt Systems', 'Battery Shipment', 'Amina Hassan', 'amina.hassan@northvolt.com', 'Battery system prototypes', 'Västerås, Sweden', 'Gdańsk, Poland', 'High', 'Packing inspection', 'Inspect battery packaging', '890 kg'],
            ['Husqvarna Group', 'Seasonal Replenishment', 'Sara Lindgren', 'sara.lindgren@husqvarnagroup.com', 'Robotic mower components', 'Huskvarna, Sweden', 'Ghent, Belgium', 'Low', 'Warehouse storage', 'Reserve staging capacity', '2,760 kg'],
            ['Electrolux Professional', 'Spare Parts Order', 'Peter Romano', 'peter.romano@electroluxprofessional.com', 'Commercial kitchen spares', 'Ljungby, Sweden', 'Pordenone, Italy', 'Medium', 'Packing preparation', 'Consolidate spare-parts cartons', '510 kg'],
            ['Konecranes', 'Port Equipment', 'Mats Lehtinen', 'mats.lehtinen@konecranes.com', 'Crane control cabinets', 'Markaryd, Sweden', 'Helsinki, Finland', 'High', 'Export documentation', 'Issue Nordic export documents', '1,930 kg'],
            ['Ericsson', 'Telecom Equipment', 'Sofia Ahmed', 'sofia.ahmed@ericsson.com', 'Radio baseband cabinets', 'Kista, Sweden', 'Madrid, Spain', 'Medium', 'Packing inspection', 'Inspect shock-sensitive packing', '1,360 kg'],
            ['Boliden', 'Mining Samples', 'Gustav Persson', 'gustav.persson@boliden.com', 'Mineral assay samples', 'Skellefteå, Sweden', 'Hamburg, Germany', 'Low', 'Customs clearance', 'Declare laboratory samples', '175 kg'],
            ['LKAB', 'Urgent Maintenance', 'Helena Wikström', 'helena.wikstrom@lkab.com', 'Conveyor drive assembly', 'Luleå, Sweden', 'Kiruna, Sweden', 'Urgent', 'Pickup coordination', 'Coordinate urgent collection', '3,200 kg'],
            ['Saab Aeronautics', 'Controlled Goods', 'David Blom', 'david.blom@saabgroup.com', 'Aircraft tooling fixtures', 'Linköping, Sweden', 'Bristol, UK', 'High', 'Export documentation', 'Verify controlled-goods licence', '1,540 kg'],
            ['Getinge', 'Medical Equipment', 'Maria Falk', 'maria.falk@getinge.com', 'Sterilizer chamber components', 'Halmstad, Sweden', 'Lyon, France', 'Medium', 'Delivery coordination', 'Book hospital delivery window', '2,420 kg'],
            ['DeLaval', 'Farm Systems', 'Nils Åkesson', 'nils.akesson@delaval.com', 'Milking system modules', 'Tumba, Sweden', 'Aarhus, Denmark', 'Low', 'Packing preparation', 'Pack farm-system modules', '1,680 kg'],
            ['Metso', 'Crusher Components', 'Laura Niemi', 'laura.niemi@metso.com', 'Crusher mantle assemblies', 'Tampere, Finland', 'Örebro, Sweden', 'Medium', 'Transport booking', 'Arrange heavy-component transport', '8,900 kg'],
            ['Valmet', 'Paper Mill Service', 'Henrik Salonen', 'henrik.salonen@valmet.com', 'Roll service equipment', 'Karlstad, Sweden', 'Oulu, Finland', 'Medium', 'Transport follow-up', 'Track service-critical equipment', '4,650 kg'],
            ['Hexagon Manufacturing', 'Measurement Systems', 'Elin Forsberg', 'elin.forsberg@hexagon.com', 'Coordinate measuring machines', 'Eskilstuna, Sweden', 'Prague, Czechia', 'High', 'Packing inspection', 'Approve precision-equipment packing', '2,050 kg'],
            ['Cargotec', 'Marine Components', 'Timo Laine', 'timo.laine@cargotec.com', 'Hydraulic deck machinery', 'Hudiksvall, Sweden', 'Rauma, Finland', 'Medium', 'Pickup coordination', 'Schedule marine-component pickup', '6,300 kg'],
            ['Alleima', 'Specialty Tubes', 'Camilla Ström', 'camilla.strom@alleima.com', 'Heat exchanger tube bundles', 'Sandviken, Sweden', 'Antwerp, Belgium', 'High', 'Customs clearance', 'Confirm commodity code', '9,750 kg'],
            ['Munters', 'Climate Systems', 'Robert Ekman', 'robert.ekman@munters.com', 'Industrial dehumidifier units', 'Tobo, Sweden', 'Warsaw, Poland', 'Low', 'Warehouse storage', 'Stage climate-control units', '3,480 kg']
        ];
        const TASK_VARIANTS = {
            'Transport booking': ['Confirm load dimensions', 'Book carrier and equipment', 'Issue transport instruction'],
            'Pickup coordination': ['Confirm collection contact', 'Schedule loading window', 'Release pickup reference'],
            'Transport follow-up': ['Track departure milestone', 'Monitor transit exception', 'Confirm estimated arrival'],
            'Delivery coordination': ['Book receiving slot', 'Confirm consignee access', 'Send delivery instruction'],
            'Packing preparation': ['Select packing materials', 'Pack and label cargo', 'Record final dimensions'],
            'Packing inspection': ['Inspect packaging integrity', 'Verify labels and markings', 'Approve packing release'],
            'Export documentation': ['Compile commercial documents', 'Validate export declaration', 'Release document pack'],
            'Customs clearance': ['Confirm commodity code', 'Submit customs entry', 'Resolve customs query'],
            'Freight coordination': ['Confirm freight schedule', 'Coordinate document handover', 'Release shipment to carrier'],
            'Warehouse storage': ['Reserve warehouse location', 'Record inbound inventory', 'Release staged cargo']
        };
        const SECONDARY_CLASS = { 'Transport booking': 'Packing preparation', 'Pickup coordination': 'Transport booking', 'Transport follow-up': 'Delivery coordination', 'Delivery coordination': 'Transport follow-up', 'Packing preparation': 'Packing inspection', 'Packing inspection': 'Transport booking', 'Export documentation': 'Freight coordination', 'Customs clearance': 'Export documentation', 'Warehouse storage': 'Delivery coordination' };
        function buildCaseData() { return CASE_SEEDS.map((s, i) => { let id = `CASE-${401100 - i}`, date = `${String(10 + (i % 18)).padStart(2, '0')}/10/2026`, status = ['Active', 'In Progress', 'Ready', 'Waiting', 'Blocked', 'Completed'][i % 6], secondary = SECONDARY_CLASS[s[8]], classes = [s[8], secondary], departments = [...new Set(classes.map(c => routedOwner(c)?.department).filter(Boolean))], domain = s[3].split('@')[1], ref = `${s[0].replace(/[^A-Z0-9]/gi, '').slice(0, 4).toUpperCase()}-${2600 + i}`, confidence = 84 + (i % 13); return { id, customer: s[0], caseClass: ({'Customs Clearance':'Documentation / Administration','Pickup Coordination':'Modification / Additional Request'})[s[1]]||'New Booking', contact: s[2], email: s[3], phone: `+46 ${10 + i} ${String(4200000 + i * 731).slice(0, 7)}`, customerNo: String(100120 + i), goods: s[4], pickup: s[5], delivery: s[6], priority: s[7], classification: s[8], requestedDate: date, due: date, status, weight: s[10], subject: `${s[1]} – ${s[4]} to ${s[6].split(',')[0]}`, body: `Hello AA Logistik team,\n\nPlease arrange ${s[1].toLowerCase()} for ${s[4].toLowerCase()} from ${s[5]} to ${s[6]}. The shipment weighs ${s[10]} and needs to be ready by ${date}. Please confirm the operational plan and any documents required.\n\nKind regards,\n${s[2]}\n${s[0]}`, departments: departments.join(', '), reference: ref, confidence, created: `${String(7 + (i % 3)).padStart(2, '0')}/10/2026, ${String(8 + (i % 9)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`, attachments: [`${ref}_shipping_request.pdf`, `${ref}_cargo_details.xlsx`], note: `Verify ${s[4].toLowerCase()} requirements before release to ${s[6].split(',')[0]}.`, classes, domain }; }) }
        const CASE_DETAILS = Object.fromEntries(buildCaseData().map(c => [c.id, c]));
        const CASE_STATUSES = ['Pending', 'In Progress', 'Blocked', 'Completed'];
        const CASE_STATUS_MAP = { Active: 'In Progress', Ready: 'Pending', Waiting: 'Pending', Closed: 'Completed' };
        function normalizeCaseStatus(s) { return CASE_STATUSES.includes(s) ? s : (CASE_STATUS_MAP[s] || 'Pending') }
        function selectedCaseData() { return CASE_DETAILS[S.selectedCase] || Object.values(CASE_DETAILS)[0] }
        function taskOwnerFor(classification) { let owner = routedOwner(classification); return owner || USERS.find(u => u.role === 'User') }
        function rebuildOperationalData() { Object.values(CASE_DETAILS).forEach(c => { c.status = normalizeCaseStatus(c.status) }); let details = Object.values(CASE_DETAILS); CASES.splice(0, CASES.length, ...details.map(c => [c.id, c.customer, c.caseClass, c.departments, c.priority, c.due, c.status])); let statuses = ['To-Do', 'In Progress', 'On Hold', 'Completed']; let generated = []; details.forEach((c, i) => c.classes.forEach((classification, j) => { let owner = taskOwnerFor(classification), variants = TASK_VARIANTS[classification], title = `${variants[(i + j) % variants.length]} – ${c.goods}`, status = statuses[(i + j) % statuses.length], due = c.due, bucket = status === 'Overdue' ? 'Overdue' : i % 3 === 0 ? 'Today' : i % 3 === 1 ? 'Tomorrow' : 'Later', assignee = status === 'Unassigned' ? 'Unassigned' : owner.name; generated.push([title, c.id, c.customer, owner.department, assignee, c.priority, due, status, `TASK-${3001 + generated.length}`, classification, bucket]) })); TASKS.splice(0, TASKS.length, ...generated); QUEUE.splice(0, QUEUE.length, ...details.slice(0, 10).map((c, i) => [`EML-${4101 + i}`, c.customer, c.subject, `${c.confidence}%`, i % 3 === 2 ? 'Missing delivery detail' : 'Needs department review', c.created, i % 3 === 2 ? 'Needs Clarification' : 'Awaiting Review'])); S.communications = details.flatMap((c, i) => [{ id: `MSG-${8001 + i * 2}`, caseId: c.id, direction: 'Incoming', subject: c.subject, body: c.body, author: c.contact, at: c.created }, { id: `MSG-${8002 + i * 2}`, caseId: c.id, direction: 'Outgoing', subject: `Re: ${c.subject}`, body: `Hello ${c.contact.split(' ')[0]}, your request for ${c.goods.toLowerCase()} has been registered as ${c.id}. The ${c.departments} teams are reviewing the operational plan.`, author: 'John Andersson', at: c.created.replace(/:(\d\d)$/, (_, m) => `:${String((Number(m) + 18) % 60).padStart(2, '0')}`) }]); S.notes = details.map((c,i) => ({ caseId: c.id, text: c.note, author: 'John Andersson', at: c.created, pinned: i===0 })); S.selectedCase = details[0].id; S.selectedTask = TASKS[0][8] }
        rebuildOperationalData();
        function addTaskCountVariation() {
            const targets = { 'CASE-401100': 4, 'CASE-401099': 3, 'CASE-401097': 5, 'CASE-401095': 4, 'CASE-401092': 3 };
            Object.entries(targets).forEach(([caseId, targetCount]) => {
                const c = CASE_DETAILS[caseId];
                if (!c) return;
                let existing = TASKS.filter(task => task[1] === caseId);
                const availableClasses = [...new Set([...(c.classes || []), 'Transport follow-up', 'Packing inspection', 'Delivery coordination', 'Freight coordination'])];
                while (existing.length < targetCount) {
                    const index = existing.length, classification = availableClasses[index % availableClasses.length];
                    const owner = taskOwnerFor(classification), variants = TASK_VARIANTS[classification] || ['Complete operational activity'];
                    TASKS.push([`${variants[index % variants.length]} – ${c.goods}`, caseId, c.customer, owner?.department || 'Other', owner?.name || 'Unassigned', c.priority, c.due, 'To-Do', `TASK-${3001 + TASKS.length}`, classification, index % 2 ? 'Tomorrow' : 'Later']);
                    existing = TASKS.filter(task => task[1] === caseId);
                }
            });
        }
        addTaskCountVariation();

        function synchronizeTaskDates() { TASKS.forEach(t => { if (t[10] === 'Today') t[6] = OPERATION_DATE; else if (t[10] === 'Tomorrow') t[6] = '10/10/2026'; else if (t[10] === 'Overdue' || t[7] === 'Overdue') t[6] = '08/10/2026'; else if (dateValue(t[6]) <= dateValue(OPERATION_DATE)) t[6] = '11/10/2026' }) }
        synchronizeTaskDates();
        function synchronizeAssignmentRequests() { let departments = ['Transport', 'Packing', 'Freight forwarding'], requests = departments.map((department, i) => { let task = TASKS.find(t => t[3] === department && t[4] === 'Unassigned'), requester = USERS.find(u => u.department === department && u.role === 'User'); return task && requester ? { id: `REQ-${201 + i}`, taskId: task[8], requesterId: requester.id, requestedAt: `09/10/2026, ${String(9 + i).padStart(2, '0')}:12`, status: 'Pending Approval' } : null }).filter(Boolean); REQUESTS.splice(0, REQUESTS.length, ...requests) }
        synchronizeAssignmentRequests();
        const CASE_ACKS = {};
        function caseAcknowledged(c) { return !!CASE_ACKS[c.id] || c.status === 'Completed' || c.status === 'In Progress' }
        sendAck = function () { let c = selectedCaseData(); if (CASE_ACKS[c.id]) { toast('Acknowledgement already sent'); return } CASE_ACKS[c.id] = true; S.activities.unshift([`Customer acknowledgement sent for ${c.id}`, actorName(), '09/10/2026, 12:34']); render(); toast(`Acknowledgement sent to ${c.contact}`) };
        function dynamicOverview() { let c = selectedCaseData(), ack = caseAcknowledged(c); return `${!ack ? `<div class="notice">Customer acknowledgement — Not Sent. <button class="link" onclick="sendAck()">Send Acknowledgement</button></div>` : `<div class="notice green">Customer acknowledgement — Sent to ${c.contact}</div>`}<div class="case-content"><div class="info-card"><h3>Customer Details</h3><div data-aa-style="aa-static-style-20">${c.customer}</div><div class="kv"><label>Customer No.</label><strong>${c.customerNo}</strong></div><div class="kv"><label>Contact</label><strong>${c.contact}</strong></div><div class="kv"><label>Email</label><strong>${c.email}</strong></div><div class="kv"><label>Phone</label><strong>${c.phone}</strong></div></div><div class="info-card"><h3>Case Information</h3><div class="kv"><label>Category</label><strong>${c.classification}</strong></div><div class="kv"><label>Case Type</label><strong>${c.caseClass}</strong></div><div class="kv"><label>Priority</label><strong>${pill(c.priority)}</strong></div><div class="kv"><label>Departments</label><strong>${c.departments}</strong></div><div class="kv"><label>Created</label><strong>${c.created}</strong></div><div class="kv"><label>AI Confidence</label><strong>${c.confidence}%</strong></div><div class="kv"><label>Acknowledgement</label><strong>${ack ? 'Sent' : 'Not Sent'}</strong></div></div><div class="info-card"><h3>Timeline</h3><div class="timeline">${dynamicActivities(true)}</div></div></div>` }
        function dynamicOrderData() { let c = selectedCaseData(); return `<div class="grid2"><div class="info-card"><h3>Shipment Details</h3><div class="grid3"><div class="kv"><label>Customer Ref.</label><strong>${c.reference}</strong></div><div class="kv"><label>Pickup</label><strong>${c.pickup}</strong></div><div class="kv"><label>Delivery</label><strong>${c.delivery}</strong></div><div class="kv"><label>Requested Date</label><strong>${c.requestedDate}</strong></div><div class="kv"><label>Cargo</label><strong>${c.goods}</strong></div><div class="kv"><label>Weight</label><strong>${c.weight}</strong></div></div></div><div class="info-card"><h3>Attachments & Traceability</h3>${c.attachments.map(a => `<div class="attachment"><span>${a}</span><button class="link" onclick="downloadAttachment('${a}')">Download</button></div>`).join('')}<div class="kv"><label>Source</label><strong>${c.contact} · ${c.email}</strong></div><div class="kv"><label>Customer Match</label><strong>Verified against ${c.customer}</strong></div></div></div>` }
        function dynamicCaseTasks() { let c = selectedCaseData(), ts = TASKS.filter(t => t[1] === c.id); return `<div class="card"><div class="card-head"><h2>Tasks for ${c.customer}</h2>${S.role === 'Admin' ? `<button class="btn primary" onclick="openEditor('newTask','${c.id}')">Add Task</button>` : ''}</div><table><thead><tr><th>Task</th><th>Category</th><th>Department</th><th>Assignee</th><th>Due Date</th><th>Priority</th><th>Status</th><th></th></tr></thead><tbody>${ts.map(t => `<tr><td><strong>${t[0]}</strong><div class="sub">${t[8]}</div></td><td>${t[9]}</td><td>${t[3]}</td><td>${t[4]}</td><td>${t[6]}</td><td>${pill(t[5])}</td><td>${pill(t[7])}</td><td><button class="link" onclick="openTask('${t[8]}')">Open</button></td></tr>`).join('')}</tbody></table></div>` }
        function dynamicCommunication() { let c = selectedCaseData(), incoming = S.communications.find(m => m.caseId === c.id && m.direction === 'Incoming'), notes = S.notes.filter(n => n.caseId === c.id); return head('Communication', `Customer correspondence and internal notes for ${c.id} · ${c.customer}.`, `<button class="btn" onclick="openCommunication('Reply','${incoming?.id || ''}')">Reply</button><button class="btn" onclick="openCommunication('Reply All','${incoming?.id || ''}')">Reply All</button><button class="btn" onclick="openCommunication('New Email')">New Email</button><button class="btn" onclick="openCommunication('Internal Note')">Add Internal Note</button>`) + `<div class="grid2"><div class="card"><div class="card-head"><h2>${c.customer} Communication</h2></div>${communicationList()}</div><div class="card"><div class="card-head"><h2>Internal Case Notes</h2></div><div class="card-body">${notes.map(n => `<div class="notice" data-aa-style="aa-static-style-9"><strong>🔒 ${n.author}</strong><p>${n.text}</p><span class="sub">${n.at}</span></div>`).join('')}</div></div></div>` }
        function dynamicActivities(compact = false) { let c = selectedCaseData(), ts = TASKS.filter(t => t[1] === c.id), events = [['Email received from ' + c.contact, c.created], ['AI matched customer and category', c.created], ...[...ts].slice(0, 3).map(t => [`${t[8]} · ${t[9]} assigned to ${t[4]}`, c.created])]; let content = events.map(e => `<div class="event"><span class="dot"></span><div><strong>${e[0]}</strong><small>${e[1]} · ${c.customer}</small></div></div>`).join(''); return compact ? content : `<div class="card"><div class="card-head"><h2>Activity History</h2><span class="sub">${c.id} · ${c.customer}</span></div><div class="card-body"><div class="timeline">${content}</div></div></div>` }
        function dynamicCaseTab() { if (S.caseTab === 'Overview') return dynamicOverview(); if (S.caseTab === 'Order Data') return dynamicOrderData(); if (S.caseTab === 'Tasks') return dynamicCaseTasks(); if (S.caseTab === 'Communication') return dynamicCommunication(); return dynamicActivities() }
        caseView = function () { let c = selectedCaseData(), count = TASKS.filter(t => t[1] === c.id).length, comms = S.communications.filter(m => m.caseId === c.id).length; return `<button class="back" onclick="go('cases')">‹ Back to Cases</button><section class="case-head"><div class="case-top"><div><h1>${c.id} · ${c.caseClass} – ${c.customer}</h1><div class="sub">${c.departments} · Due ${c.due}</div></div>${pill(c.status)}<div class="actions">${S.role === 'Admin' ? `<button class="btn" onclick="openEditor('case','${c.id}')">Edit Case</button><button class="btn" onclick="openCaseActions()">More Actions⌄</button>` : ''}</div></div><div class="tabs">${['Overview', 'Order Data', 'Tasks', 'Communication', 'Activities'].map(t => `<button class="${S.caseTab === t ? 'active' : ''}" onclick="S.caseTab='${t}';render()">${t}${t === 'Tasks' ? ` (${count})` : t === 'Communication' ? ` (${comms})` : ''}</button>`).join('')}</div></section>${dynamicCaseTab()}` }
        const baseOpenCommunication = openCommunication; openCommunication = function (mode, id = '') { if (mode === 'New Email') { let c = selectedCaseData(); S.editorType = 'compose'; S.editorDirty = false; S.editorData = { mode, subject: `Re: ${c.subject}`, body: '' }; render(); return } return baseOpenCommunication(mode, id) };
        const baseCasesPage = cases; cases = function () { return baseCasesPage().replace(/<tbody>([\s\S]*?)<\/tbody>/, m => m) };
        const syncedSaveEditor = saveEditor; saveEditor = function () { let type = S.editorType, id = S.editorId, data = { ...S.editorData }; syncedSaveEditor(); if ((type === 'case' || type === 'caseAction') && CASE_DETAILS[id]) { Object.assign(CASE_DETAILS[id], { customer: data.customer, caseClass: data.caseClass, departments: data.departments, priority: data.priority, due: data.due, status: data.status, category: data.category, classification: data.category, subcategory: data.category }); render() } };
        function openReviewCase(emailId) { let index = QUEUE.findIndex(q => q[0] === emailId), c = Object.values(CASE_DETAILS)[Math.max(0, index)]; S.selectedCase = c.id; S.page = 'approval'; render() }
        function approveSelectedCase() { let c = selectedCaseData(); TASKS.filter(t => t[1] === c.id).forEach(t => { if (t[4] === 'Unassigned') t[7] = 'To-Do' }); c.status = 'Pending'; let row = CASES.find(x => x[0] === c.id); if (row) row[6] = 'Pending'; S.page = 'case'; S.caseTab = 'Tasks'; render(); toast(`${c.id} approved · Task owners assigned`) }
        approval = function () { if (S.role !== 'Admin') return head('Access denied', 'Only the Admin can review and approve incoming Cases.'); let c = selectedCaseData(), ts = TASKS.filter(t => t[1] === c.id); return `<button class="back" onclick="go('review')">‹ Back to Review Queue</button>` + head('Review and Approve Case', `${c.id} · ${c.customer}`, pill('Awaiting Review')) + `<div class="review-grid"><section class="panel"><div class="panel-title"><h2>Original Email</h2></div><div class="email-meta"><dl><dt>From</dt><dd>${c.contact} · ${c.email}</dd><dt>To</dt><dd>ops@aalogistik.se</dd><dt>Subject</dt><dd>${c.subject}</dd><dt>Date</dt><dd>${c.created}</dd></dl></div><div class="email-body">${c.body.replace(/\n/g, '<br>')}${c.attachments.map(a => `<div class="attachment"><span>▧ ${a}</span><button class="link" onclick="downloadAttachment('${a}')">Download</button></div>`).join('')}</div></section><section class="panel"><div class="panel-title"><h2>AI Interpretation</h2><button class="link" onclick="openEditor('case','${c.id}')">Edit</button></div><div class="fieldlist"><div class="rowfield"><label>Customer</label><strong>${c.customer}</strong></div><div class="rowfield"><label>Category</label><strong>${c.classification}</strong></div><div class="rowfield"><label>Case Type</label><strong>${c.caseClass}</strong></div><div class="rowfield"><label>Priority</label><strong>${pill(c.priority)}</strong></div><div class="rowfield"><label>AI Confidence</label><strong>${c.confidence}%</strong></div></div><div class="panel-title"><h2>Extracted Information</h2></div><div class="fieldlist"><div class="rowfield"><label>Pickup</label><strong>${c.pickup}</strong></div><div class="rowfield"><label>Delivery</label><strong>${c.delivery}</strong></div><div class="rowfield"><label>Requested Date</label><strong>${c.requestedDate}</strong></div><div class="rowfield"><label>Goods</label><strong>${c.goods}</strong></div><div class="rowfield"><label>Weight</label><strong>${c.weight}</strong></div></div></section><section class="panel"><div class="panel-title"><h2>Automatic Task Routing (${ts.length})</h2><button class="link" onclick="S.page='case';S.caseTab='Tasks';render()">Review Tasks</button></div><div class="editfield"><div class="notice green"><strong>Task-level ownership</strong><br><span class="sub">Owners matched from category and User Master.</span></div>${ts.map(t => `<div class="proposal"><header><strong>${t[0]}</strong>${pill('Owner matched')}</header><p>${t[3]} · Due ${t[6]}</p><p><strong>${t[9]} → ${t[4]}</strong></p></div>`).join('')}<button class="link" data-aa-style="aa-static-style-3" onclick="openEditor('newTask','${c.id}')">+ Add Task</button></div></section></div><div class="actions" data-aa-style="aa-static-style-4"><button class="btn" onclick="go('review')">Back to Review Queue</button><button class="btn primary" onclick="approveSelectedCase()">Approve Case & Assign Task Owners</button></div>` }
        queueTable = function (home = false) { let rows = queueRows(home); return `${rows.length ? `<table><thead><tr><th>Item</th><th>From / Customer</th><th>Subject / AI Understanding</th>${home ? '' : '<th>Issue</th>'}<th>Received</th><th>AI Confidence</th><th>Action</th></tr></thead><tbody>${rows.slice(0, 15).map(r => `<tr><td><span class="id">${r[0]}</span></td><td>${r[1]}</td><td>${r[2]}</td>${home ? '' : `<td>${r[4]}</td>`}<td>${r[5]}</td><td>${pill(r[3])}</td><td><button class="btn primary" onclick="openReviewCase('${r[0]}')">Review</button></td></tr>`).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No queue items match</strong><p class="sub">Change the queue tab or filters.</p><button class="btn" onclick="resetQueue()">Reset filters</button></div>`}` }
        /* Case-level acknowledgement workflow and streamlined page actions */
        Object.values(CASE_DETAILS).filter((c, i) => i % 6 === 5).forEach(c => CASE_ACKS[c.id] = { by: 'John Andersson', at: c.created, to: c.email, subject: `Acknowledgement – ${c.id} · ${c.customer}` });
        function acknowledgementRecord(caseId) { return CASE_ACKS[caseId] || null }
        caseAcknowledged = function (c) { return !!acknowledgementRecord(c.id) };
        function canSendCaseAcknowledgement(c) { return true }
        function acknowledgementDraft(c) { return { caseId: c.id, to: c.email, recipient: c.contact, subject: `Acknowledgement – ${c.id} · ${c.customer}`, body: `Hello ${c.contact.split(' ')[0]},\n\nThank you for your request regarding ${c.goods.toLowerCase()} from ${c.pickup} to ${c.delivery}.\n\nWe have registered your request as ${c.id}. Our ${c.departments} teams are reviewing the operational requirements and will keep you informed of progress.\n\nRequested delivery date: ${c.requestedDate}\nCustomer reference: ${c.reference}\n\nKind regards,\nAA Logistik Operations` } }
        function openAcknowledgement(caseId = S.selectedCase) { let c = CASE_DETAILS[caseId]; if (!c) return; if (acknowledgementRecord(caseId)) { S.selectedCase = caseId; S.page = 'case'; S.caseTab = 'Communication'; S.drawer = false; render(); toast('Acknowledgement has already been sent'); return } if (!canSendCaseAcknowledgement(c)) { toast('Only the Admin or an assigned Task owner can send this acknowledgement'); return } S.selectedCase = caseId; S.page = 'case'; S.caseTab = 'Communication'; S.drawer = false; S.editorType = 'ackPreview'; S.editorData = acknowledgementDraft(c); S.editorDirty = false; render() }
        sendAck = function () { openAcknowledgement(S.selectedCase) };
        function confirmAcknowledgement() { let d = S.editorData, c = CASE_DETAILS[d.caseId]; if (!c || acknowledgementRecord(d.caseId)) { S.editorType = null; render(); toast('Acknowledgement has already been sent'); return } if (!canSendCaseAcknowledgement(c)) { S.editorType = null; render(); toast('You no longer have permission to send this acknowledgement'); return } let at = '09/10/2026, 13:10', by = actorName(), id = `MSG-${9001 + S.communications.length}`; CASE_ACKS[c.id] = { by, at, to: d.to, subject: d.subject, messageId: id }; S.communications.unshift({ id, caseId: c.id, direction: 'Outgoing', type: 'Acknowledgement', subject: d.subject, body: d.body, author: by, at }); S.activities.unshift([`Acknowledgement sent for ${c.id} to ${d.to}`, by, at]); S.editorType = null; S.editorData = {}; S.editorDirty = false; render(); toast(`Acknowledgement sent to ${c.contact}`) }
        const acknowledgementEditorBase = editorDialog; editorDialog = function () { if (S.editorType === 'ackPreview') { let d = S.editorData, c = CASE_DETAILS[d.caseId]; return `<div class="modal-shade"><div class="assign-modal"><h2>Review Acknowledgement</h2><div class="body"><div class="notice">Review the case-level email before sending. Only one acknowledgement can be sent for this Case.</div><div class="ack-preview"><div class="kv"><label>To</label><strong>${d.recipient} · ${d.to}</strong></div><div class="ack-body">${d.body}</div></div></div><div class="footer"><button class="btn" onclick="S.editorType=null;S.editorData={};render()">Cancel</button><button class="btn primary" onclick="confirmAcknowledgement()">Send Acknowledgement</button></div></div></div>` } return acknowledgementEditorBase() };
        function acknowledgementAction(c) { let record = acknowledgementRecord(c.id); if (record) return `<button class="btn sent" disabled>✓ Acknowledgement Sent</button>`; if (canSendCaseAcknowledgement(c)) return `<button class="btn primary" onclick="openAcknowledgement('${c.id}')">Preview Acknowledgement</button>`; return `<button class="btn" disabled>Admin or Task Owner Only</button>` }
        const overviewWithAcknowledgement = dynamicOverview; dynamicOverview = function () { let c = selectedCaseData(), record = acknowledgementRecord(c.id), html = overviewWithAcknowledgement(); html = html.replace(/<div class="notice">Customer acknowledgement[\s\S]*?<\/div>/, `<div class="notice">Customer acknowledgement — Not Sent. <button class="link" onclick="S.caseTab='Communication';render()">Open Communication</button></div>`); if (record) html = html.replace(`<div class="notice green">Customer acknowledgement — Sent to ${c.contact}</div>`, `<div class="notice green">Acknowledgement sent to ${c.contact} by ${record.by} · ${record.at}</div>`); return html };
        dynamicCommunication = function () { let c = selectedCaseData(), incoming = S.communications.find(m => m.caseId === c.id && m.direction === 'Incoming'), notes = S.notes.filter(n => n.caseId === c.id), record = acknowledgementRecord(c.id); return head('Communication', `Customer correspondence and internal notes for ${c.id} · ${c.customer}.`, `<button class="btn" onclick="openCommunication('Reply','${incoming?.id || ''}')">Reply</button><button class="btn" onclick="openCommunication('Reply All','${incoming?.id || ''}')">Reply All</button><button class="btn" onclick="openCommunication('New Email')">New Email</button><button class="btn" onclick="openCommunication('Internal Note')">Add Internal Note</button>${acknowledgementAction(c)}`) + `${record ? `<div class="notice green"><strong>Acknowledgement sent</strong> · ${record.at} by ${record.by}<div class="sub">To ${c.contact} · ${record.to}</div></div>` : `<div class="notice"><strong>Acknowledgement pending</strong><div class="sub">The email must be reviewed here before it can be sent.</div></div>`}<div class="grid2"><div class="card"><div class="card-head"><h2>${c.customer} Communication</h2></div>${communicationList()}</div><div class="card"><div class="card-head"><h2>Internal Case Notes</h2></div><div class="card-body">${notes.map(n => `<div class="notice" data-aa-style="aa-static-style-9"><strong>🔒 ${n.author}</strong><p>${n.text}</p><span class="sub">${n.at}</span></div>`).join('')}</div></div></div>` };
        dynamicActivities = function (compact = false) { let c = selectedCaseData(), ts = TASKS.filter(t => t[1] === c.id), record = acknowledgementRecord(c.id), events = [['Email received from ' + c.contact, c.created, 'Microsoft 365'], ['AI matched customer and category', c.created, 'System'], ...(record ? [[`Acknowledgement sent to ${record.to}`, record.at, record.by]] : []), ...[...ts].slice(0, 3).map(t => [`${t[8]} · ${t[9]} assigned to ${t[4]}`, c.created, 'System'])]; let content = events.map(e => `<div class="event"><span class="dot"></span><div><strong>${e[0]}</strong><small>${e[1]} · by ${e[2]}</small></div></div>`).join(''); return compact ? content : `<div class="card"><div class="card-head"><h2>Activity History</h2><span class="sub">${c.id} · ${c.customer}</span></div><div class="card-body"><div class="timeline">${content}</div></div></div>` };
        adminHome = function () { let pendingAcks = Object.values(CASE_DETAILS).filter(c => !caseAcknowledged(c)).length; return head('Good morning, John', 'Review incoming emails, approve Cases and keep operations moving.') + kpis([['Cases Awaiting Review', QUEUE.filter(x => x[6] === 'Awaiting Review').length, 'red'], ['Needs Clarification', QUEUE.filter(x => x[6] === 'Needs Clarification').length, 'amber'], ['Unassigned Tasks', TASKS.filter(x => x[4] === 'Unassigned').length], ['Acknowledgement Pending', pendingAcks, 'amber'], ['Overdue Tasks', TASKS.filter(x => (taskDeadlineState(x) === 'Overdue')).length, 'red']]) + `<div class="card"><div class="card-head"><h2>Recent Items Requiring Attention</h2><button class="link" onclick="go('review')">View All</button></div>${queueTable(true)}</div>` };
        userHome = function () { let u = currentUser(), mine = TASKS.filter(t => t[4] === u.name), pendingCase = Object.values(CASE_DETAILS).find(c => !caseAcknowledged(c) && TASKS.some(t => t[1] === c.id && t[4] === u.name)); return head(`Good morning, ${u.name.split(' ')[0]}`, 'Here are your Tasks for today.') + kpis([['My Tasks', mine.length], ['Due Today', mine.filter(t => t[10] === 'Today').length, 'amber'], ['In Progress', mine.filter(t => t[7] === 'In Progress').length], ['Waiting', mine.filter(t => t[7] === 'On Hold').length], ['Overdue', mine.filter(t => (taskDeadlineState(t) === 'Overdue')).length, 'red']]) + (pendingCase ? `<div class="notice">Customer acknowledgement for ${pendingCase.id} is pending. <button class="link" onclick="S.selectedCase='${pendingCase.id}';S.page='case';S.caseTab='Communication';render()">Open Communication</button></div>` : '') + `<div class="grid2"><div class="card"><div class="card-head"><h2>My Tasks – Due Today</h2><button class="link" onclick="S.filters.due='Today';go('mytasks')">View All</button></div>${tasksTable(mine.filter(t => t[10] === 'Today').slice(0, 4), true)}</div><div class="card"><div class="card-head"><h2>Recent Mentions</h2></div><div class="attention-list">${mine.slice(0, 2).map((t, i) => `<div class="attention"><span class="avatar">${i ? 'MS' : 'SL'}</span><div><strong>${i ? 'Maria Svensson' : 'Sofia Lind'} mentioned you</strong><span class="sub">${t[1]} · ${t[2]}</span></div><button class="link" onclick="openTask('${t[8]}')">Open</button></div>`).join('')}</div></div></div>` };
        const taskPageWithoutDueButton = scopedTasksPage; scopedTasksPage = function (manager = false) { return taskPageWithoutDueButton(manager).replace(/<button class="btn" onclick="setFilter\('due','Today'\)">Due Today<\/button>/, '') };
        userManagement = function () { if (S.role !== 'Admin') return head('Access denied', 'User Management is available only to the Admin.'); let q = S.userSearch.trim().toLowerCase(), rows = USER_MASTER.filter(u => !q || [u.name, u.department, u.title, u.workScope, ...u.classifications].join(' ').toLowerCase().includes(q)), search = `<div class="user-search-box"><input id="user-master-search" aria-label="Search User Master" value="${S.userSearch}" oninput="setUserSearch(this.value)" placeholder="Search name, department, role or category..."></div>`; return head('User Master', 'Who can work in the system, where they sit and which Task categories route to them.', search) + `<div class="notice">This is a fixed routing master. Task owners are selected automatically from category rules when Admin approves a Case.</div><div class="card"><div class="card-head"><h2>Users</h2><span class="sub">${rows.length} of ${USER_MASTER.length} fixed profiles · Read only</span></div>${rows.length ? `<table><thead><tr><th>Name</th><th>Department</th><th>Role</th><th>Default Work Scope</th><th>Task Categories</th><th>Active</th></tr></thead><tbody>${rows.map(u => `<tr><td><div data-aa-style="aa-static-style-18"><span class="avatar">${u.initials}</span><strong>${u.name}</strong></div></td><td>${u.department}</td><td>${u.title}</td><td>${u.workScope}</td><td>${u.classifications.length ? u.classifications.map(x => pill(x)).join(' ') : '<span class="sub">No automatic Task routing</span>'}</td><td>${pill('Active')}</td></tr>`).join('')}</tbody></table>` : `<div class="empty-search"><strong>No users match “${S.userSearch}”</strong><p>Try a name, department, role or Task category.</p><button class="btn" onclick="S.userSearch='';render()">Clear search</button></div>`}</div>` };
        const standardStatusClass = cls; cls = function (s) { return s === 'Due Today' ? 'red' : standardStatusClass(s) };
        function taskStatusPills(t) { return `${pill(t[7])}${t[10] === 'Today' ? ` <span class="pill red">Due Today</span>` : ''}` }
        const standardValues = values; values = function (index, base = TASKS) { let result = standardValues(index, base); if (index === 7 && base.some(t => t[10] === 'Today') && !result.includes('Due Today')) result.push('Due Today'); return result }
        applyFilters = function (base, { statusTab = false } = {}) { let f = S.filters, q = f.q.toLowerCase().trim(); return base.filter(x => (!statusTab || x[7] === S.taskTab) && (!q || [x[0], x[1], x[2], x[3], x[4], x[8], x[9]].join(' ').toLowerCase().includes(q)) && (f.department === 'All' || x[3] === f.department) && (f.assignee === 'All' || x[4] === f.assignee) && (f.priority === 'All' || x[5] === f.priority) && (f.due === 'All' || x[10] === f.due) && (f.caseId === 'All' || x[1] === f.caseId) && (f.type === 'All' || x[9] === f.type) && (f.status === 'All' || (f.status === 'Due Today' ? x[10] === 'Today' : x[7] === f.status))) };
        tasksTable = function (rows, compact = false, admin = false, manager = false) { return `<div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} ${rows.length === 1 ? 'Task' : 'Tasks'}</h3><span class="sub">Showing a maximum of 15 records</span></div>${rows.length ? `<table><thead><tr><th>Task</th><th>Case</th><th>Customer</th>${admin || S.taskScope === 'All Tasks' ? '<th>Department</th>' : ''}<th>${admin ? 'Assigned To' : 'Assignee'}</th><th>Due Date</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows.slice(0, 15).map(x => `<tr><td><strong>${x[0]}</strong><div class="sub">${x[8]} · ${x[9]}</div></td><td><button class="case-link" onclick="openCase('${x[1]}')">${x[1]}</button></td><td>${x[2]}</td>${admin || S.taskScope === 'All Tasks' ? `<td>${x[3]}</td>` : ''}<td>${x[4]}</td><td>${x[6]}</td><td>${taskStatusPills(x)}</td><td>${taskAction(x, admin, manager)}</td></tr>`).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No Tasks match these filters</strong><p class="sub">Change or reset the filters to see Tasks.</p><button class="btn" onclick="clearFilters()">Reset filters</button></div>`}` };
        dynamicCaseTasks = function () { let c = selectedCaseData(), ts = TASKS.filter(t => t[1] === c.id); return `<div class="card"><div class="card-head"><h2>Tasks for ${c.customer}</h2>${S.role === 'Admin' ? `<button class="btn primary" onclick="openEditor('newTask','${c.id}')">Add Task</button>` : ''}</div><table><thead><tr><th>Task</th><th>Category</th><th>Department</th><th>Assignee</th><th>Due Date</th><th>Priority</th><th>Status</th><th></th></tr></thead><tbody>${ts.map(t => `<tr><td><strong>${t[0]}</strong><div class="sub">${t[8]}</div></td><td>${t[9]}</td><td>${t[3]}</td><td>${t[4]}</td><td>${t[6]}</td><td>${pill(t[5])}</td><td>${taskStatusPills(t)}</td><td><button class="link" onclick="openTask('${t[8]}')">Open</button></td></tr>`).join('')}</tbody></table></div>` };
        function navigationIcon(name) { let paths = { home: '<path d="M3 10.5 10 4l7 6.5V18H5v-7.5"/><path d="M8 18v-5h4v5"/>', review: '<rect x="4" y="3" width="12" height="15" rx="2"/><path d="M7 7h6M7 11h3"/><path d="m11.5 14 1.5 1.5 3-3"/>', cases: '<path d="M3 6h5l2 2h7v9H3z"/><path d="M3 6v-2h6l2 2"/>', tasks: '<rect x="3" y="3" width="14" height="14" rx="2"/><path d="m6.5 10 2 2 5-5"/>', users: '<path d="M7.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.5 17c.4-3 2-4.5 5-4.5s4.6 1.5 5 4.5"/><path d="M13 5.5a2.5 2.5 0 0 1 0 5M14 12.5c2.2.4 3.3 1.9 3.5 4.5"/>', dashboard: '<rect x="3" y="3" width="5" height="6" rx="1"/><rect x="11" y="3" width="6" height="4" rx="1"/><rect x="3" y="12" width="5" height="5" rx="1"/><rect x="11" y="10" width="6" height="7" rx="1"/>' }; return `<svg viewBox="0 0 20 20" aria-hidden="true">${paths[name]}</svg>` }
        const reviewCasesPage = review; review = function () { return reviewCasesPage().replace('Human Review Queue', 'Review Cases') };
        const reviewCaseApproval = approval; approval = function () { return reviewCaseApproval().replaceAll('Review Queue', 'Review Cases') };
        const taskLabelsPage = scopedTasksPage; scopedTasksPage = function (manager = false) { return taskLabelsPage(manager).replace('<h1>My Tasks</h1>', '<h1>Tasks</h1>') };
        const taskLabelsUserHome = userHome; userHome = function () { return taskLabelsUserHome().replaceAll('My Tasks', 'Tasks') };
        const taskLabelsDashboard = dashboard; dashboard = function () { let html = taskLabelsDashboard(); return S.role === 'Admin' ? html : html.replaceAll('My Tasks', 'Tasks') };
        navItems = function () { let admin = [['home', navigationIcon('home'), 'Home'], ['review', navigationIcon('review'), 'Review Requests'], ['cases', navigationIcon('cases'), 'Cases'], ['tasks', navigationIcon('tasks'), 'Task Manager'], ['users', navigationIcon('users'), 'User Management'], ['dashboard', navigationIcon('dashboard'), 'Dashboard']], manager = [['home', navigationIcon('home'), 'Home'], ['department', navigationIcon('tasks'), 'Tasks'], ['cases', navigationIcon('cases'), 'Cases'], ['dashboard', navigationIcon('dashboard'), 'Dashboard']], user = [['home', navigationIcon('home'), 'Home'], ['mytasks', navigationIcon('tasks'), 'Tasks'], ['cases', navigationIcon('cases'), 'Cases'], ['dashboard', navigationIcon('dashboard'), 'Dashboard']]; return (S.role === 'Admin' ? admin : S.role === 'Manager' ? manager : user).filter(x => x[0] !== 'dashboard' || can('viewDashboard')) };
        const reviewRequestsPage = review; review = function () { return reviewRequestsPage().replaceAll('Review Cases', 'Review Requests') };
        const reviewRequestApproval = approval; approval = function () { return reviewRequestApproval().replaceAll('Review Cases', 'Review Requests') };
        scopeTabs = function (manager = false) { let tabs = ['My Tasks', 'My Department Tasks', ...(can('viewCompanyTasks') ? ['All Tasks'] : []), ...(manager && can('approveRequests') ? ['Assignment Requests'] : [])]; return `<div class="tabs">${tabs.map(t => `<button class="${S.taskScope === t ? 'active' : ''}" onclick="setTaskScope('${t}')">${t}${t === 'Assignment Requests' ? ` (${managerPending().length})` : ''}</button>`).join('')}</div>` };
        taskAction = function (t, admin, manager) { let u = currentUser(), pending = REQUESTS.find(r => r.taskId === t[8] && r.requesterId === u.id && r.status === 'Pending Approval'); if (admin && t[4] === 'Unassigned') return `<button class="btn primary" onclick="openAssign('${t[8]}')">Reassign</button>`; if (t[4] === 'Unassigned' && t[3] === u.department && u.role === 'User' && can('requestAssignments')) return pending ? '<button class="btn" disabled>Requested</button>' : `<button class="btn primary" onclick="requestAssignment('${t[8]}')">Request Assignment</button>`; return `<button class="btn" onclick="openTask('${t[8]}')">${t[7] === 'To-Do' && t[4] === u.name && can('updateTasks') ? 'Start' : 'Open'}</button>` };
        tasksTable = function (rows, compact = false, admin = false, manager = false) { return `<div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} ${rows.length === 1 ? 'Task' : 'Tasks'}</h3><span class="sub">Showing a maximum of 15 records</span></div>${rows.length ? `<table><thead><tr><th>Task</th><th>Case</th><th>Customer</th>${admin || S.taskScope === 'All Tasks' ? '<th>Department</th>' : ''}<th>${admin ? 'Assigned To' : 'Assignee'}</th><th>Priority</th><th>Due Date</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows.slice(0, 15).map(x => `<tr><td><strong>${x[0]}</strong><div class="sub">${x[8]} · ${x[9]}</div></td><td><button class="case-link" onclick="openCase('${x[1]}')">${x[1]}</button></td><td>${x[2]}</td>${admin || S.taskScope === 'All Tasks' ? `<td>${x[3]}</td>` : ''}<td>${x[4]}</td><td>${pill(x[5])}</td><td>${x[6]}</td><td>${taskStatusPills(x)}</td><td>${taskAction(x, admin, manager)}</td></tr>`).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No Tasks match these filters</strong><p class="sub">Change or reset the filters to see Tasks.</p><button class="btn" onclick="clearFilters()">Reset filters</button></div>`}` };
        function requestPriority(row) { return Object.values(CASE_DETAILS).find(c => c.customer === row[1])?.priority || 'Medium' }
        queueTable = function (home = false) { let rows = queueRows(home); return `${rows.length ? `<table><thead><tr><th>Item</th><th>From / Customer</th><th>Subject / AI Understanding</th>${home ? '' : '<th>Issue</th>'}<th>Priority</th><th>Received</th><th>AI Confidence</th><th>Action</th></tr></thead><tbody>${rows.slice(0, 15).map(r => `<tr><td><span class="id">${r[0]}</span></td><td>${r[1]}</td><td>${r[2]}</td>${home ? '' : `<td>${r[4]}</td>`}<td>${pill(requestPriority(r))}</td><td>${r[5]}</td><td>${pill(r[3])}</td><td><button class="btn primary" onclick="openReviewCase('${r[0]}')">Review</button></td></tr>`).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No queue items match</strong><p class="sub">Change the queue tab or filters.</p><button class="btn" onclick="resetQueue()">Reset filters</button></div>`}` };
        function resetTaskFilters() { S.filters = { q: '', department: 'All', assignee: 'All', priority: 'All', due: 'All', caseId: 'All', type: 'All', status: 'All' } }
        function openDepartmentTasks(kind = '', value = '') { S.taskScope = 'My Department Tasks'; resetTaskFilters(); if (kind) S.filters[kind] = value; go('department') }
        function openPersonalTasks(kind = '', value = '') { S.taskScope = 'My Tasks'; resetTaskFilters(); if (kind) S.filters[kind] = value; go(S.role === 'Manager' ? 'department' : 'mytasks') }
        function openAdminTaskTab(status) { resetTaskFilters(); S.taskTab = status; go('tasks') }
        function openQueueTab(tab) { S.queueTab = tab; S.queueQuery = ''; S.queueIssue = 'All'; S.queueCustomer = 'All'; S.queueSource = 'All'; go('review') }
        function openAcknowledgementCase(caseId) { S.selectedCase = caseId; S.page = 'case'; S.caseTab = 'Communication'; S.drawer = false; render() }
        function synchronizeAcknowledgementQueue() { let details = Object.values(CASE_DETAILS); details.forEach((c, i) => { if (i % 2 === 1 && !CASE_ACKS[c.id]) CASE_ACKS[c.id] = { by: 'John Andersson', at: c.created, to: c.email, subject: `Acknowledgement – ${c.id} · ${c.customer}` } }); for (let i = QUEUE.length - 1; i >= 0; i--)if (QUEUE[i][6] === 'Acknowledgement Pending') QUEUE.splice(i, 1); details.filter(c => !caseAcknowledged(c)).forEach((c, i) => QUEUE.push([`ACK-${c.id}`, c.customer, `Acknowledgement required – ${c.subject}`, `${c.confidence}%`, 'Customer acknowledgement not sent', c.created, 'Acknowledgement Pending'])) }
        synchronizeAcknowledgementQueue();
        const confirmAcknowledgementAndQueue = confirmAcknowledgement; confirmAcknowledgement = function () { confirmAcknowledgementAndQueue(); synchronizeAcknowledgementQueue(); render() };
        metricAction = function (label) { resetTaskFilters(); if (S.role === 'Admin') { if (/Awaiting Review/.test(label)) return openQueueTab('Awaiting Review'); if (/Needs Clarification/.test(label)) return openQueueTab('Needs Clarification'); if (/Acknowledgement/.test(label)) return openQueueTab('Acknowledgement Pending'); if (/Active Cases/.test(label)) return go('cases'); if (/Unassigned Tasks/.test(label)) return openAdminTaskTab('Unassigned'); if (/Overdue/.test(label)) return openAdminTaskTab('All Open'); if (/Completed/.test(label)) return openAdminTaskTab('Completed'); if (/Open Tasks/.test(label)) return openAdminTaskTab('All Open'); return go('tasks') } if (/Assignment Requests/.test(label)) return openRequests(); let opener = S.role === 'Manager' ? openDepartmentTasks : openPersonalTasks; if (/Due Today/.test(label)) return opener('due', 'Today'); if (/Overdue/.test(label)) return opener('status', 'All Open'); if (/In Progress/.test(label)) return opener('status', 'In Progress'); if (/Waiting/.test(label)) return opener('status', 'Waiting'); if (/Completed/.test(label)) return opener('status', 'Completed'); return opener() };
        taskManager = function () { let statuses = ['All Open', 'Unassigned', 'To-Do', 'In Progress', 'On Hold', 'Completed'], rows = S.taskTab === 'All Open' ? applyFilters(TASKS.filter(t => t[7] !== 'Completed')) : applyFilters(TASKS, { statusTab: true }), count = t => t === 'All Open' ? TASKS.filter(x => x[7] !== 'Completed').length : TASKS.filter(x => x[7] === t).length; return head('Task Manager', 'View and manage all Tasks across departments.') + `<div class="card"><div class="tabs">${statuses.map(t => `<button class="${S.taskTab === t ? 'active' : ''}" onclick="S.taskTab='${t}';S.filters.status='All';render()">${t} (${count(t)})</button>`).join('')}</div>${filterBar(TASKS, { status: false })}${tasksTable(rows, true, true)}</div>` };
        managerHome = function () { let u = currentUser(), team = TASKS.filter(t => t[3] === u.department), requests = REQUESTS.filter(r => r.status === 'Pending Approval' && taskById(r.taskId)?.[3] === u.department).length, overdue = team.filter(t => (taskDeadlineState(t) === 'Overdue')).length; return head(`Welcome back, ${u.name.split(' ')[0]}`, `Here's the latest from your ${u.department} team.`, `<button class="btn primary" onclick="openDepartmentTasks()">View Department Tasks</button>`) + kpis([['My Department Tasks', team.length], ['Due Today', team.filter(t => t[10] === 'Today').length, 'amber'], ['Overdue', overdue, 'red'], ['Waiting', team.filter(t => t[7] === 'On Hold').length], ['Assignment Requests', requests, 'amber']]) + `<div class="grid2"><div class="card"><div class="card-head"><h2>Team Workload</h2><button class="link" onclick="openDepartmentTasks()">View All</button></div>${teamWorkload()}</div><div class="card"><div class="card-head"><h2>Needs Attention</h2></div><div class="attention-list"><div class="attention"><span class="icon">!</span><div><strong>${overdue} ${overdue === 1 ? 'Task' : 'Tasks'} overdue</strong><span class="sub">Department work needing attention</span></div><button class="link" onclick="openDepartmentTasks('status','Overdue')">Review</button></div><div class="attention"><span class="icon">↻</span><div><strong>${requests} assignment ${requests === 1 ? 'request' : 'requests'}</strong><span class="sub">Department approval queue</span></div><button class="link" onclick="openRequests()">Review</button></div></div></div></div>` };
        const mappedUserHome = userHome; userHome = function () { return mappedUserHome().replace("S.filters.due='Today';go('mytasks')", "openPersonalTasks('due','Today')") };
        queueTable = function (home = false) { let rows = queueRows(home); return `${rows.length ? `<table><thead><tr><th>Item</th><th>From / Customer</th><th>Subject / AI Understanding</th>${home ? '' : '<th>Issue</th>'}<th>Priority</th><th>Received</th><th>AI Confidence</th><th>Action</th></tr></thead><tbody>${rows.slice(0, 15).map(r => { let c = Object.values(CASE_DETAILS).find(x => x.customer === r[1]), ack = r[6] === 'Acknowledgement Pending'; return `<tr><td><span class="id">${r[0]}</span></td><td>${r[1]}</td><td>${r[2]}</td>${home ? '' : `<td>${r[4]}</td>`}<td>${pill(requestPriority(r))}</td><td>${r[5]}</td><td>${pill(r[3])}</td><td><button class="btn primary" onclick="${ack ? `openAcknowledgementCase('${c.id}')` : `openReviewCase('${r[0]}')`}">${ack ? 'Open Communication' : 'Review'}</button></td></tr>` }).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No items match this view</strong><p class="sub">Change the tab or filters to view other work.</p><button class="btn" onclick="resetQueue()">Reset filters</button></div>`}` };
        managerHome = function () { let u = currentUser(), team = TASKS.filter(t => t[3] === u.department), requests = REQUESTS.filter(r => r.status === 'Pending Approval' && taskById(r.taskId)?.[3] === u.department).length, overdue = team.filter(t => (taskDeadlineState(t) === 'Overdue')).length; return head(`Welcome back, ${u.name.split(' ')[0]}`, `Here's the latest from your ${u.department} team.`) + kpis([['My Department Tasks', team.length], ['Due Today', team.filter(t => t[10] === 'Today').length, 'amber'], ['Overdue', overdue, 'red'], ['Waiting', team.filter(t => t[7] === 'On Hold').length], ['Assignment Requests', requests, 'amber']]) + `<div class="card"><div class="card-head"><h2>Team Workload</h2><span class="sub">Current ${u.department} assignment distribution</span></div>${teamWorkload()}</div>` };
        const streamlinedUserHome = userHome; userHome = function () { return streamlinedUserHome().replace(/<button class="link" onclick="openPersonalTasks\('due','Today'\)">View All<\/button>/, '') };
        adminHome = function () { return head('Good morning, John', 'Review incoming emails, approve Cases and keep operations moving.') + kpis([['Cases Awaiting Review', QUEUE.filter(x => x[6] === 'Awaiting Review').length, 'red'], ['Needs Clarification', QUEUE.filter(x => x[6] === 'Needs Clarification').length, 'amber'], ['Unassigned Tasks', TASKS.filter(x => x[4] === 'Unassigned').length], ['Acknowledgement Pending', QUEUE.filter(x => x[6] === 'Acknowledgement Pending').length, 'amber'], ['Overdue Tasks', TASKS.filter(x => (taskDeadlineState(x) === 'Overdue')).length, 'red']]) + `<div class="card"><div class="card-head"><h2>Recent Items Requiring Attention</h2><span class="sub">Open an item to review its details</span></div>${queueTable(true)}</div>` };
        const streamlinedCaseView = caseView; caseView = function () { return streamlinedCaseView().replace(/<button class="btn" onclick="openCaseActions\(\)">More Actions[^<]*<\/button>/, '') };
        const streamlinedApproval = approval; approval = function () { return streamlinedApproval().replace(/<button class="btn" onclick="go\('review'\)">Back to Review Requests<\/button>/, '') };
        const streamlinedCases = cases; cases = function () { return streamlinedCases().replace('<th></th>', '').replace(/<td><button class="link" onclick="openCase\('[^']+'\)">Open<\/button><\/td>/g, '').replace(/<button class="btn" onclick="resetCases\(\)">Reset filters<\/button>/, '') };
        const streamlinedTasksTable = tasksTable; tasksTable = function (rows, compact = false, admin = false, manager = false) { return streamlinedTasksTable(rows, compact, admin, manager).replace(/<button class="btn" onclick="clearFilters\(\)">Reset filters<\/button>/, '') };
        const streamlinedQueueTable = queueTable; queueTable = function (home = false) { return streamlinedQueueTable(home).replace(/<button class="btn" onclick="resetQueue\(\)">Reset filters<\/button>/, '') };
        /* Unified table, status, sorting and assignment model */
        S.sorts = S.sorts || {};
        const TASK_STATUS_HISTORY = {};
        const TASK_ASSIGNMENTS = {};
        function dateValue(value) { let dm = /^(\d{1,2})\/(\d{2})\/(\d{4})(?:,?\s*(\d{2}):(\d{2}))?/.exec(String(value)); let n = dm ? new Date(+dm[3], +dm[2] - 1, +dm[1], +(dm[4] || 0), +(dm[5] || 0)).getTime() : Date.parse(String(value).replace(/,\s*/g, ' ')); return Number.isNaN(n) ? 0 : n }
        function normalizeTaskStatus(s){return s==='Completed'?'Completed':s==='In Progress'?'In Progress':(s==='Waiting'||s==='Blocked'||s==='On Hold')?'On Hold':'To-Do'}
function effectiveTaskStatus(t) { return normalizeTaskStatus(t[7]) }
        function normalizeWorkflowData() { TASKS.forEach((t, i) => { let old = t[7]; t[7] = old === 'Completed' ? 'Completed' : old === 'In Progress' ? 'In Progress' : 'Pending'; t[10] = dateValue(t[6]) < dateValue(OPERATION_DATE) && t[7] !== 'Completed' ? 'Overdue' : t[6] === OPERATION_DATE ? 'Today' : t[6] === '10/10/2026' ? 'Tomorrow' : 'Later'; TASK_ASSIGNMENTS[t[8]] = t[4] === 'Unassigned' ? null : { assignedTo: t[4], assignedBy: 'Automatic routing · User Master', assignedAt: `0${7 + (i % 3)}/10/2026, ${String(8 + (i % 8)).padStart(2, '0')}:${String((i * 11) % 60).padStart(2, '0')}`, classification: t[9] } }); CASES.forEach(c => { c[6] = normalizeCaseStatus(c[6]); if (CASE_DETAILS[c[0]]) CASE_DETAILS[c[0]].status = c[6] }) }
        normalizeWorkflowData();
        function sortHeader(label, table, key) { let s = S.sorts[table], active = s?.key === key, arrow = active ? (s.dir === 'asc' ? '▲' : '▼') : '↕'; return `<button class="sort-head" onclick="setTableSort('${table}','${key}')">${label}<span class="sort-arrow">${arrow}</span></button>` }
        function setTableSort(table, key) { let current = S.sorts[table]; S.sorts[table] = { key, dir: current?.key === key && current.dir === 'asc' ? 'desc' : 'asc' }; render() }
        function sortedRows(rows, table, getters) { let s = S.sorts[table]; if (!s || !getters[s.key]) return [...rows]; let priority = { Low: 1, Medium: 2, High: 3, Urgent: 4 }, status = { Pending: 1, 'In Progress': 2, Completed: 3, Overdue: 4, Active: 1, Blocked: 2, 'Pending Approval': 1, Approved: 2, Declined: 3 }; return [...rows].sort((a, b) => { let av = getters[s.key](a), bv = getters[s.key](b); if (s.key === 'priority') { av = priority[av] || 0; bv = priority[bv] || 0 } else if (s.key === 'date') { av = dateValue(av); bv = dateValue(bv) } else if (s.key === 'status') { av = status[av] || String(av); bv = status[bv] || String(bv) } let result = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv)); return s.dir === 'desc' ? -result : result }) }
        function dueDateCell(t) { return t[6] === OPERATION_DATE ? `<span class="due-today">${t[6]}</span><div class="sub due-today">Due today</div>` : t[6] }
        function taskStatusPills(t) { return pill(effectiveTaskStatus(t)) }
         values = function (index, base = TASKS) { if (index === 7) return ['To-Do', 'In Progress', 'On Hold', 'Completed']; return [...new Set(base.map(x => x[index]))].sort() };
        applyFilters = function (base, { statusTab = false } = {}) { let f = S.filters, q = f.q.toLowerCase().trim(); return base.filter(x => (!statusTab || (S.taskTab === 'Unassigned' ? x[4] === 'Unassigned' : effectiveTaskStatus(x) === S.taskTab)) && (!q || [x[0], x[1], x[2], x[3], x[4], x[8], x[9]].join(' ').toLowerCase().includes(q)) && (f.department === 'All' || x[3] === f.department) && (f.assignee === 'All' || x[4] === f.assignee) && (f.priority === 'All' || x[5] === f.priority) && (f.due === 'All' || x[10] === f.due) && (f.caseId === 'All' || x[1] === f.caseId) && (f.type === 'All' || x[9] === f.type) && (f.status === 'All' || effectiveTaskStatus(x) === f.status)) };
        taskAction = function (t, admin, manager) { let u = currentUser(), pending = REQUESTS.find(r => r.taskId === t[8] && r.requesterId === u.id && r.status === 'Pending Approval'); if (admin && t[4] === 'Unassigned') return `<button class="btn primary" onclick="openAssign('${t[8]}')">Reassign</button>`; if (t[4] === 'Unassigned' && t[3] === u.department && u.role === 'User' && can('requestAssignments')) return pending ? '<button class="btn" disabled>Requested</button>' : `<button class="btn primary" onclick="requestAssignment('${t[8]}')">Request Assignment</button>`; return `<button class="btn" onclick="openTask('${t[8]}')">Open</button>` };
        requestAssignment = function (id) { let u = currentUser(), t = taskById(id); if (!can('requestAssignments') || !t || u.role !== 'User' || t[4] !== 'Unassigned' || t[3] !== u.department) { toast('You can request only unassigned Tasks in your department'); return } if (REQUESTS.some(r => r.taskId === id && r.requesterId === u.id && r.status === 'Pending Approval')) { toast('Assignment request is already pending'); return } REQUESTS.push({ id: `REQ-${201 + REQUESTS.length}`, taskId: id, requesterId: u.id, requestedAt: '09/10/2026, 13:22', status: 'Pending Approval' }); render(); toast(`Request sent to the ${u.department} Manager`) };
        confirmAssign = function () { let t = taskById(S.assignTaskId); if (!t || !S.assignChoice) { toast('Select an assignee first'); return } let old = t[4]; t[4] = S.assignChoice; t[7] = 'To-Do'; TASK_ASSIGNMENTS[t[8]] = { assignedTo: t[4], assignedBy: actorName(), assignedAt: '09/10/2026, 13:24', classification: t[9] }; S.activities.unshift([`${t[8]} ${old === 'Unassigned' ? 'assigned' : 'reassigned'} to ${t[4]}`, actorName(), '09/10/2026, 13:24']); S.assignModal = false; render(); toast(`${t[8]} assigned to ${t[4]}`) };
        approveRequest = function (id) { let r = REQUESTS.find(x => x.id === id), t = r && taskById(r.taskId), manager = currentUser(), requester = r && USERS.find(u => u.id === r.requesterId); if (!r || !t || !requester || manager.role !== 'Manager' || t[3] !== manager.department) { toast('Only the department manager can approve this request'); return } r.status = 'Approved'; t[4] = requester.name; t[7] = 'To-Do'; TASK_ASSIGNMENTS[t[8]] = { assignedTo: requester.name, assignedBy: manager.name, assignedAt: '09/10/2026, 13:26', classification: t[9] }; render(); toast(`${t[8]} assigned to ${requester.name}`) };
        function canUpdateTask(t) { return S.role === 'Admin' || (t[4] === actorName() && t[4] !== 'Unassigned') }
        function updateTaskStatus(id) { let t = taskById(id), select = document.getElementById('task-status-select'), box = document.getElementById('task-status-comment'), next = select?.value, comment = box?.value?.trim(); if (!t || !canUpdateTask(t)) { toast('Only the assigned Task owner or Admin can change status'); return } if (!['To-Do', 'In Progress', 'On Hold', 'Completed'].includes(next)) { toast('Select a valid status'); return } if (!comment) { toast('A comment is required when changing status'); return } let previous = effectiveTaskStatus(t), at = '09/10/2026, 13:30', author = actorName(); t[7] = next; (S.comments[id] = S.comments[id] || []).push({ author, text: `Status changed from ${previous} to ${next}: ${comment}`, at, statusChange: true }); (TASK_STATUS_HISTORY[id] = TASK_STATUS_HISTORY[id] || []).unshift({ from: previous, to: next, comment, author, at }); S.activities.unshift([`${id} status changed from ${previous} to ${next}`, author, at]); render(); toast(`${id} moved to ${next}`) }
        tasksTable = function (rows, compact = false, admin = false, manager = false) { let table = 'tasks', personal = S.role === 'User' && (compact || S.taskScope === 'My Tasks'), showDepartment = admin || S.taskScope === 'All Tasks', showAssignee = !personal, ordered = sortedRows(rows, table, { date: t => t[6], priority: t => t[5], status: effectiveTaskStatus }); return `<div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} ${rows.length === 1 ? 'Task' : 'Tasks'}</h3><span class="sub">Showing a maximum of 15 records</span></div>${ordered.length ? `<table><thead><tr><th>Task No.</th><th>Subject</th><th>Case</th><th>Customer</th>${showDepartment ? '<th>Department</th>' : ''}${showAssignee ? `<th>${admin ? 'Assigned To' : 'Assignee'}</th>` : ''}<th>${sortHeader('Priority', table, 'priority')}</th><th>${sortHeader('Due Date', table, 'date')}</th><th>${sortHeader('Status', table, 'status')}</th><th>Action</th></tr></thead><tbody>${ordered.slice(0, 15).map(t => `<tr><td><strong class="id">${t[8]}</strong></td><td><strong>${t[0]}</strong><div class="sub">${t[9]}</div></td><td><button class="case-link" onclick="openCase('${t[1]}')">${t[1]}</button></td><td>${t[2]}</td>${showDepartment ? `<td>${t[3]}</td>` : ''}${showAssignee ? `<td>${t[4]}</td>` : ''}<td>${pill(t[5])}</td><td>${dueDateCell(t)}</td><td>${taskStatusPills(t)}</td><td>${taskAction(t, admin, manager)}</td></tr>`).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No Tasks match these filters</strong><p class="sub">Change or reset the filters to see Tasks.</p></div>`}` };
        queueTable = function (home = false) { let table = home ? 'homeRequests' : 'requests', rows = sortedRows(queueRows(home), table, { date: r => r[5], priority: requestPriority, status: r => r[6] }); return `${rows.length ? `<table><thead><tr><th>${sortHeader('Received', table, 'date')}</th><th>Reference</th><th>Subject</th><th>Customer</th>${home ? '' : '<th>Source</th>'}${home ? '' : '<th>Issue</th>'}<th>${sortHeader('Priority', table, 'priority')}</th><th>AI Confidence</th><th>Action</th></tr></thead><tbody>${rows.slice(0, 15).map(r => { let c = Object.values(CASE_DETAILS).find(x => x.customer === r[1]), ack = r[6] === 'Acknowledgement Pending'; return `<tr><td>${r[5]}</td><td><strong class="id">${r[0]}</strong></td><td>${r[2]}</td><td>${r[1]}</td>${home ? '' : `<td>${sourceCell(r[0])}</td>`}${home ? '' : `<td>${r[4]}</td>`}<td>${pill(requestPriority(r))}</td><td>${pill(r[3])}</td><td><button class="btn primary" onclick="${ack ? `openAcknowledgementCase('${c.id}')` : `openReviewCase('${r[0]}')`}">${ack ? 'Open Communication' : 'Review'}</button></td></tr>` }).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No items match this view</strong><p class="sub">Change the tab or filters to view other work.</p></div>`}` };
        cases = function () { let u = currentUser(), base = S.role === 'User' ? CASES.filter(c => TASKS.some(t => t[1] === c[0] && t[4] === u.name)) : S.role === 'Manager' ? CASES.filter(c => c[3].includes(u.department)) : CASES, q = S.caseQuery.toLowerCase(), visible = base.filter(c => (!q || c.join(' ').toLowerCase().includes(q)) && (S.caseStatus === 'All' || c[6] === S.caseStatus) && (S.casePriority === 'All' || c[4] === S.casePriority)), ordered = sortedRows(visible, 'cases', { date: c => c[5], priority: c => c[4], status: c => c[6] }); return head('Cases', S.role === 'Admin' ? 'All active and recently completed Cases.' : S.role === 'Manager' ? `Cases involving the ${u.department} department.` : 'Cases connected to your assigned Tasks.') + `<div class="card"><div class="filters"><input value="${S.caseQuery}" onchange="setCaseFilter('caseQuery',this.value)" placeholder="Search Cases or customers..."><select onchange="setCaseFilter('caseStatus',this.value)"><option value="All">All Statuses</option>${[...new Set(base.map(c => c[6]))].map(x => `<option ${S.caseStatus === x ? 'selected' : ''}>${x}</option>`).join('')}</select><select onchange="setCaseFilter('casePriority',this.value)"><option value="All">All Priorities</option>${[...new Set(base.map(c => c[4]))].map(x => `<option ${S.casePriority === x ? 'selected' : ''}>${x}</option>`).join('')}</select><button class="btn" onclick="resetCases()">Reset</button></div><div class="card-head" data-aa-style="aa-static-style-5"><h3>${visible.length} ${visible.length === 1 ? 'Case' : 'Cases'}</h3></div>${ordered.length ? `<table><thead><tr><th>Case No.</th><th>Subject</th><th>Customer</th><th>Departments</th><th>${sortHeader('Priority', 'cases', 'priority')}</th><th>${sortHeader('Due Date', 'cases', 'date')}</th><th>${sortHeader('Status', 'cases', 'status')}</th></tr></thead><tbody>${ordered.slice(0, 15).map(c => `<tr><td><button class="case-link" onclick="openCase('${c[0]}')">${c[0]}</button></td><td>${c[2]}</td><td>${c[1]}</td><td>${c[3]}</td><td>${pill(c[4])}</td><td>${c[5]}</td><td>${pill(c[6])}</td></tr>`).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No Cases match these filters</strong><p class="sub">Change or reset the filters.</p></div>`}</div>` };
        dynamicCaseTasks = function () { let c = selectedCaseData(), rows = sortedRows(TASKS.filter(t => t[1] === c.id), 'caseTasks', { date: t => t[6], priority: t => t[5], status: effectiveTaskStatus }); return `<div class="card"><div class="card-head"><h2>Tasks for ${c.customer}</h2>${S.role === 'Admin' ? `<button class="btn primary" onclick="openEditor('newTask','${c.id}')">Add Task</button>` : ''}</div><table><thead><tr><th>Task No.</th><th>Subject</th><th>Category</th><th>Department</th><th>Assignee</th><th>${sortHeader('Priority', 'caseTasks', 'priority')}</th><th>${sortHeader('Due Date', 'caseTasks', 'date')}</th><th>${sortHeader('Status', 'caseTasks', 'status')}</th><th></th></tr></thead><tbody>${rows.map(t => `<tr><td><strong class="id">${t[8]}</strong></td><td><strong>${t[0]}</strong></td><td>${t[9]}</td><td>${t[3]}</td><td>${t[4]}</td><td>${pill(t[5])}</td><td>${dueDateCell(t)}</td><td>${taskStatusPills(t)}</td><td><button class="link" onclick="openTask('${t[8]}')">Open</button></td></tr>`).join('')}</tbody></table></div>` };
        requestTable = function () { let rows = sortedRows(managerPending(), 'assignmentRequests', { date: r => r.requestedAt, priority: r => taskById(r.taskId)?.[5], status: r => r.status }); return `<div class="filters"><select onchange="S.requestFilter=this.value;render()"><option ${S.requestFilter === 'All Requests' ? 'selected' : ''}>All Requests</option><option ${S.requestFilter === 'Pending Approval' ? 'selected' : ''}>Pending Approval</option><option ${S.requestFilter === 'Approved' ? 'selected' : ''}>Approved</option><option ${S.requestFilter === 'Declined' ? 'selected' : ''}>Declined</option></select></div><div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} Assignment ${rows.length === 1 ? 'Request' : 'Requests'}</h3></div>${rows.length ? `<table><thead><tr><th>Task No.</th><th>Subject</th><th>Case</th><th>Customer</th><th>Requested By</th><th>Department</th><th>${sortHeader('Priority', 'assignmentRequests', 'priority')}</th><th>${sortHeader('Due Date', 'assignmentRequests', 'date')}</th><th>${sortHeader('Status', 'assignmentRequests', 'status')}</th><th>Action</th></tr></thead><tbody>${rows.map(r => { let t = taskById(r.taskId), u = USERS.find(x => x.id === r.requesterId); return `<tr><td><strong class="id">${t[8]}</strong></td><td>${t[0]}</td><td><button class="case-link" onclick="openCase('${t[1]}')">${t[1]}</button></td><td>${t[2]}</td><td>${u.name}</td><td>${t[3]}</td><td>${pill(t[5])}</td><td>${t[6]}<div class="sub">Requested ${r.requestedAt}</div></td><td>${pill(r.status)}</td><td>${r.status === 'Pending Approval' ? `<div class="request-actions"><button class="btn primary" onclick="approveRequest('${r.id}')">Approve</button><button class="btn" onclick="declineRequest('${r.id}')">Decline</button></div>` : '—'}</td></tr>` }).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No assignment requests match this filter</strong></div>`}` };
        taskManager = function () { let tabs = ['All Open', 'Unassigned', 'To-Do', 'In Progress', 'On Hold', 'Completed'], rows = S.taskTab === 'All Open' ? applyFilters(TASKS.filter(t => effectiveTaskStatus(t) !== 'Completed')) : S.taskTab === 'Unassigned' ? applyFilters(TASKS.filter(t => t[4] === 'Unassigned')) : applyFilters(TASKS, { statusTab: true }), count = tab => tab === 'All Open' ? TASKS.filter(t => effectiveTaskStatus(t) !== 'Completed').length : tab === 'Unassigned' ? TASKS.filter(t => t[4] === 'Unassigned').length : TASKS.filter(t => effectiveTaskStatus(t) === tab).length; return head('Task Manager', 'View and manage all Tasks across departments.') + `<div class="card"><div class="tabs">${tabs.map(t => `<button class="${S.taskTab === t ? 'active' : ''}" onclick="S.taskTab='${t}';S.filters.status='All';render()">${t} (${count(t)})</button>`).join('')}</div>${filterBar(TASKS, { status: false })}${tasksTable(rows, true, true)}</div>` };
        const workflowEditorBase = editorDialog; editorDialog = function () { let d = S.editorData; if (S.editorType === 'task' || S.editorType === 'newTask') { let classification = d.taskType || 'Transport booking'; return `<div class="modal-shade"><div class="assign-modal"><h2>${S.editorType === 'task' ? 'Edit Task' : 'Add Task'}</h2><div class="body"><div class="editor-grid">${field('Task name', 'title', d.title, true)}${choice('Task category', 'taskType', classification, Object.keys(TASK_ROUTING), true)}${routePreview(classification)}${choice('Priority', 'priority', d.priority || 'Medium', ['Urgent', 'High', 'Medium', 'Low'])}${field('Due date', 'due', d.due)}</div><p class="sub">Status changes are made from the Task panel and require a comment.</p></div><div class="footer"><button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" onclick="saveEditor()">Save Changes</button></div></div></div>` } if (S.editorType === 'case' || S.editorType === 'caseAction') return `<div class="modal-shade"><div class="assign-modal"><h2>Edit Case</h2><div class="body"><div class="editor-grid">${field('Customer', 'customer', d.customer)}${field('Case class', 'caseClass', d.caseClass)}${field('Departments', 'departments', d.departments)}${choice('Priority', 'priority', d.priority, ['Urgent', 'High', 'Medium', 'Low'])}${field('Due date', 'due', d.due)}${choice('Status', 'status', d.status, ['Active', 'Pending', 'Blocked', 'Completed'])}</div></div><div class="footer"><button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" onclick="saveEditor()">Save Changes</button></div></div></div>`; return workflowEditorBase() };
        const workflowSaveEditor = saveEditor; saveEditor = function () { let type = S.editorType; if (type === 'task') { let t = taskById(S.editorId); S.editorData.status = t[7] } if (type === 'newTask') S.editorData.status = 'Pending'; workflowSaveEditor(); if (type === 'task' || type === 'newTask') normalizeWorkflowData() };
        managerHome = function () { let u = currentUser(), team = TASKS.filter(t => t[3] === u.department), requests = managerPending().filter(r => r.status === 'Pending Approval').length; return head(`Welcome back, ${u.name.split(' ')[0]}`, `Here's the latest from your ${u.department} team.`) + kpis([['My Department Tasks', team.length], ['Due Today', team.filter(t => t[6] === OPERATION_DATE).length, 'amber'], ['Overdue', team.filter(t => effectiveTaskStatus(t) === 'Overdue').length, 'red'], ['Pending', team.filter(t => effectiveTaskStatus(t) === 'Pending').length], ['Assignment Requests', requests, 'amber']]) + `<div class="card"><div class="card-head"><h2>Team Workload</h2><span class="sub">Current ${u.department} assignment distribution</span></div>${teamWorkload()}</div>` };
        userHome = function () { let u = currentUser(), mine = TASKS.filter(t => t[4] === u.name), pendingCase = Object.values(CASE_DETAILS).find(c => !caseAcknowledged(c) && mine.some(t => t[1] === c.id)); return head(`Good morning, ${u.name.split(' ')[0]}`, 'Here are your Tasks for today.') + kpis([['Tasks', mine.length], ['Due Today', mine.filter(t => t[6] === OPERATION_DATE).length, 'amber'], ['In Progress', mine.filter(t => effectiveTaskStatus(t) === 'In Progress').length], ['Pending', mine.filter(t => effectiveTaskStatus(t) === 'Pending').length], ['Overdue', mine.filter(t => effectiveTaskStatus(t) === 'Overdue').length, 'red']]) + (pendingCase ? `<div class="notice">Customer acknowledgement for ${pendingCase.id} is pending. <button class="link" onclick="openAcknowledgementCase('${pendingCase.id}')">Open Communication</button></div>` : '') + `<div class="grid2"><div class="card"><div class="card-head"><h2>Tasks Due Today</h2></div>${tasksTable(mine.filter(t => t[6] === OPERATION_DATE).slice(0, 4), true)}</div><div class="card"><div class="card-head"><h2>Recent Mentions</h2></div><div class="attention-list">${mine.slice(0, 2).map((t, i) => `<div class="attention"><span class="avatar">${i ? 'MS' : 'SL'}</span><div><strong>${i ? 'Maria Svensson' : 'Sofia Lind'} mentioned you</strong><span class="sub">${t[1]} · ${t[2]}</span></div><button class="link" onclick="openTask('${t[8]}')">Open</button></div>`).join('')}</div></div></div>` };
        metricAction = function (label) { resetTaskFilters(); if (S.role === 'Admin') { if (/Awaiting Review/.test(label)) return openQueueTab('Awaiting Review'); if (/Needs Clarification/.test(label)) return openQueueTab('Needs Clarification'); if (/Acknowledgement/.test(label)) return openQueueTab('Acknowledgement Pending'); if (/Active Cases/.test(label)) return go('cases'); if (/Unassigned/.test(label)) return openAdminTaskTab('Unassigned'); if (/Overdue/.test(label)) return openAdminTaskTab('All Open'); if (/Completed/.test(label)) return openAdminTaskTab('Completed'); if (/Open Tasks/.test(label)) return openAdminTaskTab('All Open'); return go('tasks') } if (/Assignment Requests/.test(label)) return openRequests(); let opener = S.role === 'Manager' ? openDepartmentTasks : openPersonalTasks; if (/Due Today/.test(label)) return opener('due', 'Today'); if (/Overdue/.test(label)) return opener('status', 'All Open'); if (/In Progress/.test(label)) return opener('status', 'In Progress'); if (/Pending/.test(label)) return opener('status', 'Pending'); if (/Completed/.test(label)) return opener('status', 'Completed'); return opener() };
        const activityWithStatusHistory = dynamicActivities; dynamicActivities = function (compact = false) { let c = selectedCaseData(), base = activityWithStatusHistory(true), statusEvents = TASKS.filter(t => t[1] === c.id).flatMap(t => (TASK_STATUS_HISTORY[t[8]] || []).map(h => `<div class="event"><span class="dot"></span><div><strong>${t[8]} changed to ${h.to}</strong><small>${h.at} · by ${h.author} · ${h.comment}</small></div></div>`)).join(''), content = statusEvents + base; return compact ? content : `<div class="card"><div class="card-head"><h2>Activity History</h2><span class="sub">${c.id} · ${c.customer}</span></div><div class="card-body"><div class="timeline">${content}</div></div></div>` };
        /* Final role-aware QC corrections */
        const statusUpdater = updateTaskStatus; updateTaskStatus = function (id) { let t = taskById(id), next = document.getElementById('task-status-select')?.value; if (t && next === t[7]) { toast('Select a different status'); return } statusUpdater(id) };
        const roleAwareTasksTable = tasksTable; tasksTable = function (rows, compact = false, admin = false, manager = false) { if (S.role !== 'User' || S.page === 'home' || S.taskScope === 'My Tasks') return roleAwareTasksTable(rows, compact, admin, manager); let page = S.page; S.page = 'tasks'; let scope = S.taskScope; S.taskScope = scope; let html = roleAwareTasksTable(rows, false, admin, manager); S.page = page; return html };
        adminHome = function () { let overdue = TASKS.filter(t => effectiveTaskStatus(t) === 'Overdue').length; return head('Good morning, John', 'Review incoming emails, approve Cases and keep operations moving.') + kpis([['Cases Awaiting Review', QUEUE.filter(x => x[6] === 'Awaiting Review').length, 'red'], ['Needs Clarification', QUEUE.filter(x => x[6] === 'Needs Clarification').length, 'amber'], ['Unassigned Tasks', TASKS.filter(x => x[4] === 'Unassigned').length], ['Acknowledgement Pending', QUEUE.filter(x => x[6] === 'Acknowledgement Pending').length, 'amber'], ['Overdue Tasks', overdue, 'red']]) + `<div class="card"><div class="card-head"><h2>Recent Items Requiring Attention</h2><span class="sub">Open an item to review its details</span></div>${queueTable(true)}</div>` };
        managerHome = function () { let u = currentUser(), team = TASKS.filter(t => t[3] === u.department), requests = REQUESTS.filter(r => r.status === 'Pending Approval' && taskById(r.taskId)?.[3] === u.department).length; return head(`Welcome back, ${u.name.split(' ')[0]}`, `Here's the latest from your ${u.department} team.`) + kpis([['My Department Tasks', team.length], ['Due Today', team.filter(t => t[6] === OPERATION_DATE).length, 'amber'], ['Overdue', team.filter(t => effectiveTaskStatus(t) === 'Overdue').length, 'red'], ['Pending', team.filter(t => effectiveTaskStatus(t) === 'Pending').length], ['Assignment Requests', requests, 'amber']]) + `<div class="card"><div class="card-head"><h2>Team Workload</h2><span class="sub">Current ${u.department} assignment distribution</span></div>${teamWorkload()}</div>` };
        dashboard = function () { let u = currentUser(), scoped = S.role === 'Admin' ? TASKS : S.role === 'Manager' ? TASKS.filter(t => t[3] === u.department) : TASKS.filter(t => t[4] === u.name), title = S.role === 'Admin' ? 'Company Workload by Department' : S.role === 'Manager' ? `${u.department} Team Workload` : 'My Task Activity', groups = S.role === 'Admin' ? ALL_DEPTS : S.role === 'Manager' ? [...new Set(scoped.map(t => t[4]))].slice(0, 4) : ['To-Do', 'In Progress', 'On Hold', 'Completed']; let metrics = S.role === 'Admin' ? [['Active Cases', CASES.filter(c => c[6] !== 'Completed').length], ['Awaiting Review', QUEUE.filter(q => q[6] === 'Awaiting Review').length, 'amber'], ['Open Tasks', scoped.filter(t => effectiveTaskStatus(t) !== 'Completed').length], ['Overdue Tasks', scoped.filter(t => effectiveTaskStatus(t) === 'Overdue').length, 'red'], ['Completed Tasks', scoped.filter(t => effectiveTaskStatus(t) === 'Completed').length]] : S.role === 'Manager' ? [['My Department Tasks', scoped.length], ['Pending', scoped.filter(t => effectiveTaskStatus(t) === 'Pending').length], ['In Progress', scoped.filter(t => effectiveTaskStatus(t) === 'In Progress').length], ['Overdue', scoped.filter(t => effectiveTaskStatus(t) === 'Overdue').length, 'red'], ['Completed', scoped.filter(t => effectiveTaskStatus(t) === 'Completed').length]] : [['My Tasks', scoped.length], ['Pending', scoped.filter(t => effectiveTaskStatus(t) === 'Pending').length], ['In Progress', scoped.filter(t => effectiveTaskStatus(t) === 'In Progress').length], ['Overdue', scoped.filter(t => effectiveTaskStatus(t) === 'Overdue').length, 'red'], ['Completed', scoped.filter(t => effectiveTaskStatus(t) === 'Completed').length]]; return head('Dashboard', S.role === 'Admin' ? 'Company-wide operational performance.' : S.role === 'Manager' ? `${u.department} department performance.` : 'Your personal completion and timing overview.') + kpis(metrics) + `<div class="card"><div class="card-head"><h2>${title}</h2></div><div class="chart">${groups.map((g, i) => `<div><i style="height:${70 + i * 22}px"></i>${g}</div>`).join('')}</div></div>` };
        /* Review-request and role-flow corrections */
        loginView = function () { return `<main class="login-screen"><section class="login-visual"><div class="login-message"><h1>One operational view from customer request to completed delivery.</h1><p>Human-reviewed Cases, coordinated Tasks and a shared history for every department.</p></div></section><section class="login-entry"><div class="login-column"><div class="login-right-logo"><img src="assets/aa-logistik-logo.png" alt="AA Logistik"></div><div class="login-box"><h2>Welcome back</h2><p>Sign in with your AA Logistik Microsoft account.</p><button class="microsoft-login" onclick="loginDemo()"><span class="ms-grid"><i></i><i></i><i></i><i></i></span>Continue with Microsoft</button></div></div></section></main>` };
        openReviewCase = function (emailId) { let q = QUEUE.find(x => x[0] === emailId), c = q && Object.values(CASE_DETAILS).find(x => x.customer === q[1]); if (!q || !c) { toast('Review request could not be opened'); return } S.reviewEmailId = emailId; S.selectedCase = c.id; S.page = 'approval'; render() };
        approveSelectedCase = function () { let c = selectedCaseData(), emailId = S.reviewEmailId, index = QUEUE.findIndex(q => q[0] === emailId || (!emailId && q[1] === c.customer && ['Awaiting Review', 'Needs Clarification'].includes(q[6]))); TASKS.filter(t => t[1] === c.id).forEach(t => { if (t[4] === 'Unassigned') { let owner = taskOwnerFor(t[9]); if (owner) { t[3] = owner.department; t[4] = owner.name; TASK_ASSIGNMENTS[t[8]] = { assignedTo: owner.name, assignedBy: 'Automatic routing · User Master', assignedAt: '09/10/2026, 13:40', classification: t[9] } } } }); c.status = 'Pending'; let row = CASES.find(x => x[0] === c.id); if (row) row[6] = 'Pending'; if (index >= 0) QUEUE.splice(index, 1); S.activities.unshift([`${c.id} approved and removed from Review Requests`, actorName(), '09/10/2026, 13:40']); S.reviewEmailId = null; S.page = 'review'; S.queueTab = 'Awaiting Review'; render(); toast(`${c.id} approved and removed from Review Requests`) };
        const reviewApproval = approval; approval = function () { let q = QUEUE.find(x => x[0] === S.reviewEmailId), missing = q?.[6] === 'Needs Clarification' || /missing/i.test(q?.[4] || ''), html = reviewApproval(); html = html.replace('Approve Case & Assign Task Owners', 'Approve Case'); if (missing) { html = html.replace('<div class="review-grid">', `<div class="missing-alert"><strong>Missing information:</strong> Delivery details were not supplied or could not be confirmed from the customer email. Complete this field before approval.</div><div class="review-grid">`); html = html.replace(/<div class="rowfield"><label>Delivery<\/label><strong>[\s\S]*?<\/strong><\/div>/, `<div class="rowfield"><label>Delivery</label><strong class="missing-field">Missing delivery details — review required</strong></div>`) } return html };
        const compactQueueTable = queueTable; queueTable = function (home = false) { return compactQueueTable(home).replace(/<button class="btn primary" onclick="(openAcknowledgementCase\('[^']+'\))">Open Communication<\/button>/g, '<button class="compact-action" onclick="$1">Open Communication</button>') };
        function homeDueTasksTable(rows) { let ordered = sortedRows(rows, 'homeDueTasks', { date: t => t[6], priority: t => t[5], status: effectiveTaskStatus }); return `${ordered.length ? `<table><thead><tr><th>Task No.</th><th>Subject</th><th>Case</th><th>Customer</th><th>${sortHeader('Priority', 'homeDueTasks', 'priority')}</th><th>${sortHeader('Due Date', 'homeDueTasks', 'date')}</th><th>${sortHeader('Status', 'homeDueTasks', 'status')}</th></tr></thead><tbody>${ordered.slice(0, 4).map(t => `<tr><td><strong class="id">${t[8]}</strong></td><td><strong>${t[0]}</strong><div class="sub">${t[9]}</div></td><td><button class="case-link" onclick="openCase('${t[1]}')">${t[1]}</button></td><td>${t[2]}</td><td>${pill(t[5])}</td><td>${dueDateCell(t)}</td><td>${taskStatusPills(t)}</td></tr>`).join('')}</tbody></table>` : `<div class="card-body"><strong>No Tasks are due today.</strong></div>`}` }
        userHome = function () { let u = currentUser(), mine = TASKS.filter(t => t[4] === u.name), pendingCase = Object.values(CASE_DETAILS).find(c => !caseAcknowledged(c) && mine.some(t => t[1] === c.id)); return head(`Good morning, ${u.name.split(' ')[0]}`, 'Here are your Tasks for today.') + kpis([['Tasks', mine.length], ['Due Today', mine.filter(t => t[6] === OPERATION_DATE).length, 'amber'], ['In Progress', mine.filter(t => effectiveTaskStatus(t) === 'In Progress').length], ['Pending', mine.filter(t => effectiveTaskStatus(t) === 'Pending').length], ['Overdue', mine.filter(t => effectiveTaskStatus(t) === 'Overdue').length, 'red']]) + (pendingCase ? `<div class="notice">Customer acknowledgement for ${pendingCase.id} is pending. <button class="link" onclick="openAcknowledgementCase('${pendingCase.id}')">Open Communication</button></div>` : '') + `<div class="grid2"><div class="card"><div class="card-head"><h2>Tasks Due Today</h2></div>${homeDueTasksTable(mine.filter(t => t[6] === OPERATION_DATE))}</div><div class="card"><div class="card-head"><h2>Recent Mentions</h2></div><div class="attention-list">${mine.slice(0, 2).map((t, i) => `<div class="attention"><span class="avatar">${i ? 'MS' : 'SL'}</span><div><strong>${i ? 'Maria Svensson' : 'Sofia Lind'} mentioned you</strong><span class="sub">${t[1]} · ${t[2]}</span></div><button class="link" onclick="openTask('${t[8]}')">Open</button></div>`).join('')}</div></div></div>` };
        function pendingCaseRequests(caseId) { let u = currentUser(); return REQUESTS.filter(r => r.status === 'Pending Approval' && taskById(r.taskId)?.[1] === caseId && taskById(r.taskId)?.[3] === u.department) }
        const managerDecisionCaseView = caseView; caseView = function () { let html = managerDecisionCaseView(); if (S.role !== 'Manager') return html; let requests = pendingCaseRequests(S.selectedCase); if (!requests.length) return html; let controls = `<div class="manager-decision"><button class="btn primary" onclick="approveCaseRequests('${S.selectedCase}')">Approve ${requests.length > 1 ? 'Requests' : 'Request'}</button><button class="btn" onclick="declineCaseRequests('${S.selectedCase}')">Decline</button></div>`; return html.replace('<div class="actions">', `${controls}<div class="actions">`) };
        function approveCaseRequests(caseId) { let requests = [...pendingCaseRequests(caseId)]; if (!requests.length) { toast('No pending assignment requests for this Case'); return } requests.forEach(r => approveRequest(r.id)); S.selectedCase = caseId; S.page = 'case'; render(); toast(`${requests.length} assignment ${requests.length === 1 ? 'request' : 'requests'} approved`) }
        function declineCaseRequests(caseId) { let requests = [...pendingCaseRequests(caseId)]; if (!requests.length) { toast('No pending assignment requests for this Case'); return } requests.forEach(r => declineRequest(r.id)); S.selectedCase = caseId; S.page = 'case'; render(); toast(`${requests.length} assignment ${requests.length === 1 ? 'request' : 'requests'} declined`) }
        /* Clarification resolution workflow */
        const CLARIFICATIONS = {};
        QUEUE.filter(q => q[6] === 'Needs Clarification').forEach(q => CLARIFICATIONS[q[0]] = { emailId: q[0], caseId: Object.values(CASE_DETAILS).find(c => c.customer === q[1])?.id, status: 'Missing Details', missing: 'Delivery details', history: [] });
        function activeClarification() { return CLARIFICATIONS[S.reviewEmailId] || null }
        function clarificationCase(record = activeClarification()) { return record && CASE_DETAILS[record.caseId] }
        function clarificationActions() { let record = activeClarification(); if (!record) return ''; return `<div class="request-actions" data-aa-style="aa-static-style-10"><button class="btn primary" onclick="openClarificationAction('customer')">Request from Customer</button><button class="btn" onclick="openClarificationAction('internal')">Request Internally</button><button class="btn" onclick="openClarificationAction('manual')">Enter Information Manually</button>${record.history.length ? `<button class="btn" onclick="openClarificationAction('resolve')">Mark Clarification Resolved</button>` : ''}</div><div class="sub" data-aa-style="aa-static-style-22">Current status: <strong>${record.status}</strong>${record.history.length ? ` · ${record.history.length} recorded action${record.history.length === 1 ? '' : 's'}` : ''}</div>` }
        function openClarificationAction(mode) { let record = activeClarification(), c = clarificationCase(record); if (!record || !c) { toast('Clarification request is unavailable'); return } S.editorType = 'clarification'; S.editorDirty = false; S.editorData = { mode, emailId: record.emailId, caseId: c.id, to: mode === 'customer' ? c.email : '', recipient: mode === 'customer' ? c.contact : '', department: c.departments.split(',')[0].trim(), message: mode === 'customer' ? `Hello ${c.contact.split(' ')[0]},\n\nTo continue processing ${c.id}, please confirm the delivery address and required delivery date for ${c.goods.toLowerCase()}.\n\nKind regards,\nAA Logistik Operations` : `Please confirm the missing delivery details for ${c.id} · ${c.customer}.`, delivery: '' }; render() }
        function submitClarification() { let d = S.editorData, record = CLARIFICATIONS[d.emailId], c = record && CASE_DETAILS[record.caseId]; if (!record || !c) return; let at = '09/10/2026, 14:05', by = actorName(); if (d.mode === 'customer') { let message = document.getElementById('clarification-message')?.value?.trim(); if (!message) { toast('Enter the clarification message'); return } record.status = 'Clarification Requested'; record.history.unshift({ type: 'Customer email', recipient: `${c.contact} · ${c.email}`, message, by, at }); S.communications.unshift({ id: `MSG-${9200 + S.communications.length}`, caseId: c.id, direction: 'Outgoing', type: 'Clarification Request', subject: `Information required · ${c.id}`, body: message, author: by, at }) } else if (d.mode === 'internal') { let department = document.getElementById('clarification-department')?.value, message = document.getElementById('clarification-message')?.value?.trim(); if (!department || !message) { toast('Select a department and enter the request'); return } record.status = 'Clarification Requested'; record.history.unshift({ type: 'Internal request', recipient: department, message, by, at }); S.notes.unshift({ caseId: c.id, text: `Clarification requested from ${department}: ${message}`, author: by, at }) } else { let delivery = document.getElementById('clarification-delivery')?.value?.trim(); if (!delivery) { toast('Enter the confirmed delivery details'); return } c.delivery = delivery; record.status = 'Resolved'; record.history.unshift({ type: d.mode === 'manual' ? 'Entered manually' : 'Clarification resolved', recipient: 'Case record', message: `Delivery confirmed: ${delivery}`, by, at }); let q = QUEUE.find(x => x[0] === record.emailId); if (q) { q[4] = 'Clarification resolved · Ready for review'; q[6] = 'Awaiting Review' } } S.activities.unshift([`${record.emailId} · ${record.status}`, by, at]); S.editorType = null; S.editorData = {}; S.page = 'review'; S.queueTab = 'Needs Clarification'; render(); toast(record.status === 'Resolved' ? 'Clarification resolved and moved to Awaiting Review' : 'Clarification request sent') }
        const clarificationEditorBase = editorDialog; editorDialog = function () { if (S.editorType !== 'clarification') return clarificationEditorBase(); let d = S.editorData, c = CASE_DETAILS[d.caseId], internal = d.mode === 'internal', resolving = d.mode === 'manual' || d.mode === 'resolve'; return `<div class="modal-shade"><div class="assign-modal"><h2>${resolving ? 'Resolve Missing Delivery Details' : internal ? 'Request Clarification Internally' : 'Request Clarification from Customer'}</h2><div class="body"><div class="notice"><strong>${c.id} · ${c.customer}</strong><br>Missing information: delivery details</div>${resolving ? `<label><strong>Confirmed delivery details</strong><input id="clarification-delivery" data-aa-style="aa-static-style-23" placeholder="Enter delivery location and date"></label>` : internal ? `<label><strong>Department</strong><select id="clarification-department">${[...new Set(USERS.map(u => u.department).filter(d => d !== 'Administration'))].map(x => `<option>${x}</option>`).join('')}</select></label><label data-aa-style="aa-static-style-24"><strong>Request</strong><textarea id="clarification-message" data-aa-style="aa-static-style-25">${d.message}</textarea></label>` : `<div class="kv"><label>To</label><strong>${c.contact} · ${c.email}</strong></div><div class="kv"><label>Subject</label><strong>Information required · ${c.id}</strong></div><textarea id="clarification-message" data-aa-style="aa-static-style-26">${d.message}</textarea>`}</div><div class="footer"><button class="btn" onclick="S.editorType=null;S.editorData={};render()">Cancel</button><button class="btn primary" onclick="submitClarification()">${resolving ? 'Resolve Clarification' : 'Send Request'}</button></div></div></div>` };
        const clarificationApprovalBase = approval; approval = function () { let html = clarificationApprovalBase(), record = activeClarification(); if (!record) return html; html = html.replace('</div><div class="review-grid">', `${clarificationActions()}</div><div class="review-grid">`); if (record.history.length) { let history = `<div class="card" data-aa-style="aa-static-style-14"><div class="card-head"><h2>Clarification History</h2></div><div class="card-body">${record.history.map(h => `<div class="notice" data-aa-style="aa-static-style-21"><strong>${h.type} · ${h.recipient}</strong><p>${h.message}</p><span class="sub">${h.by} · ${h.at}</span></div>`).join('')}</div></div>`; html = html.replace('<div class="actions" data-aa-style="aa-static-style-4">', `${history}<div class="actions" data-aa-style="aa-static-style-4">`) } return html };
        const guardedApproval = approveSelectedCase; approveSelectedCase = function () { let record = activeClarification(); if (record && record.status !== 'Resolved') { toast('Resolve the missing information before approving this Case'); return } guardedApproval() };
        approveCaseRequests = function (caseId) { let requests = [...pendingCaseRequests(caseId)]; if (!requests.length) { toast('No pending assignment requests for this Case'); return } requests.forEach(r => approveRequest(r.id)); S.taskScope = 'Assignment Requests'; S.page = 'department'; render(); toast(`${requests.length} assignment ${requests.length === 1 ? 'request' : 'requests'} approved`) };
        declineCaseRequests = function (caseId) { let requests = [...pendingCaseRequests(caseId)]; if (!requests.length) { toast('No pending assignment requests for this Case'); return } requests.forEach(r => declineRequest(r.id)); S.taskScope = 'Assignment Requests'; S.page = 'department'; render(); toast(`${requests.length} assignment ${requests.length === 1 ? 'request' : 'requests'} declined`) };
        /* Context-aware table columns: hide values already fixed by the active view */
        tasksTable = function (rows, compact = false, admin = false, manager = false) { let table = 'tasks', personal = S.role === 'User' && (S.page === 'home' || S.taskScope === 'My Tasks'), showDepartment = (admin || S.taskScope === 'All Tasks') && S.filters.department === 'All', showAssignee = !personal && S.filters.assignee === 'All' && !(admin && S.taskTab === 'Unassigned'), showPriority = S.filters.priority === 'All', showDue = S.filters.due === 'All', fixedStatus = (admin && ['To-Do', 'In Progress', 'On Hold', 'Completed'].includes(S.taskTab)) || S.filters.status !== 'All', showStatus = !fixedStatus, ordered = sortedRows(rows, table, { date: t => t[6], priority: t => t[5], status: effectiveTaskStatus }); return `<div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} ${rows.length === 1 ? 'Task' : 'Tasks'}</h3><span class="sub">Showing a maximum of 15 records</span></div>${ordered.length ? `<table><thead><tr><th>Task No.</th><th>Subject</th><th>Case</th><th>Customer</th>${showDepartment ? '<th>Department</th>' : ''}${showAssignee ? `<th>${admin ? 'Assigned To' : 'Assignee'}</th>` : ''}${showPriority ? `<th>${sortHeader('Priority', table, 'priority')}</th>` : ''}${showDue ? `<th>${sortHeader('Due Date', table, 'date')}</th>` : ''}${showStatus ? `<th>${sortHeader('Status', table, 'status')}</th>` : ''}<th>Action</th></tr></thead><tbody>${ordered.slice(0, 15).map(t => `<tr><td><strong class="id">${t[8]}</strong></td><td><strong>${t[0]}</strong><div class="sub">${t[9]}</div></td><td><button class="case-link" onclick="openCase('${t[1]}')">${t[1]}</button></td><td>${t[2]}</td>${showDepartment ? `<td>${t[3]}</td>` : ''}${showAssignee ? `<td>${t[4]}</td>` : ''}${showPriority ? `<td>${pill(t[5])}</td>` : ''}${showDue ? `<td>${dueDateCell(t)}</td>` : ''}${showStatus ? `<td>${taskStatusPills(t)}</td>` : ''}<td>${taskAction(t, admin, manager)}</td></tr>`).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No Tasks match these filters</strong><p class="sub">Change or reset the filters to see Tasks.</p></div>`}` };
        cases = function () { let u = currentUser(), base = S.role === 'User' ? CASES.filter(c => TASKS.some(t => t[1] === c[0] && t[4] === u.name)) : S.role === 'Manager' ? CASES.filter(c => c[3].includes(u.department)) : CASES, q = S.caseQuery.toLowerCase(), visible = base.filter(c => (!q || c.join(' ').toLowerCase().includes(q)) && (S.caseStatus === 'All' || c[6] === S.caseStatus) && (S.casePriority === 'All' || c[4] === S.casePriority)), ordered = sortedRows(visible, 'cases', { date: c => c[5], priority: c => c[4], status: c => c[6] }), showPriority = S.casePriority === 'All', showStatus = S.caseStatus === 'All'; return head('Cases', S.role === 'Admin' ? 'All active and recently completed Cases.' : S.role === 'Manager' ? `Cases involving the ${u.department} department.` : 'Cases connected to your assigned Tasks.') + `<div class="card"><div class="filters"><input value="${S.caseQuery}" onchange="setCaseFilter('caseQuery',this.value)" placeholder="Search Cases or customers..."><select onchange="setCaseFilter('caseStatus',this.value)"><option value="All">All Statuses</option>${[...new Set(base.map(c => c[6]))].map(x => `<option ${S.caseStatus === x ? 'selected' : ''}>${x}</option>`).join('')}</select><select onchange="setCaseFilter('casePriority',this.value)"><option value="All">All Priorities</option>${[...new Set(base.map(c => c[4]))].map(x => `<option ${S.casePriority === x ? 'selected' : ''}>${x}</option>`).join('')}</select><button class="btn" onclick="resetCases()">Reset</button></div><div class="card-head" data-aa-style="aa-static-style-5"><h3>${visible.length} ${visible.length === 1 ? 'Case' : 'Cases'}</h3></div>${ordered.length ? `<table><thead><tr><th>Case No.</th><th>Subject</th><th>Customer</th><th>Departments</th>${showPriority ? `<th>${sortHeader('Priority', 'cases', 'priority')}</th>` : ''}<th>${sortHeader('Due Date', 'cases', 'date')}</th>${showStatus ? `<th>${sortHeader('Status', 'cases', 'status')}</th>` : ''}</tr></thead><tbody>${ordered.slice(0, 15).map(c => `<tr><td><button class="case-link" onclick="openCase('${c[0]}')">${c[0]}</button></td><td>${c[2]}</td><td>${c[1]}</td><td>${c[3]}</td>${showPriority ? `<td>${pill(c[4])}</td>` : ''}<td>${c[5]}</td>${showStatus ? `<td>${pill(c[6])}</td>` : ''}</tr>`).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No Cases match these filters</strong><p class="sub">Change or reset the filters.</p></div>`}</div>` };
        requestTable = function () { let showStatus = S.requestFilter === 'All Requests', rows = sortedRows(managerPending(), 'assignmentRequests', { date: r => taskById(r.taskId)?.[6], priority: r => taskById(r.taskId)?.[5], status: r => r.status }); return `<div class="filters"><select onchange="S.requestFilter=this.value;render()"><option ${S.requestFilter === 'All Requests' ? 'selected' : ''}>All Requests</option><option ${S.requestFilter === 'Pending Approval' ? 'selected' : ''}>Pending Approval</option><option ${S.requestFilter === 'Approved' ? 'selected' : ''}>Approved</option><option ${S.requestFilter === 'Declined' ? 'selected' : ''}>Declined</option></select></div><div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} Assignment ${rows.length === 1 ? 'Request' : 'Requests'}</h3></div>${rows.length ? `<table><thead><tr><th>Task No.</th><th>Subject</th><th>Case</th><th>Customer</th><th>Requested By</th><th>Department</th><th>${sortHeader('Priority', 'assignmentRequests', 'priority')}</th><th>${sortHeader('Due Date', 'assignmentRequests', 'date')}</th>${showStatus ? `<th>${sortHeader('Status', 'assignmentRequests', 'status')}</th>` : ''}<th>Action</th></tr></thead><tbody>${rows.map(r => { let t = taskById(r.taskId), u = USERS.find(x => x.id === r.requesterId); return `<tr><td><strong class="id">${t[8]}</strong></td><td>${t[0]}</td><td><button class="case-link" onclick="openCase('${t[1]}')">${t[1]}</button></td><td>${t[2]}</td><td>${u.name}</td><td>${t[3]}</td><td>${pill(t[5])}</td><td>${t[6]}<div class="sub">Requested ${r.requestedAt}</div></td>${showStatus ? `<td>${pill(r.status)}</td>` : ''}<td>${r.status === 'Pending Approval' ? `<div class="request-actions"><button class="btn primary" onclick="approveRequest('${r.id}')">Approve</button><button class="btn" onclick="declineRequest('${r.id}')">Decline</button></div>` : '—'}</td></tr>` }).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No assignment requests match this filter</strong></div>`}` };
        /* Completion status and deadline outcome are separate audit facts */
        const TASK_COMPLETIONS = {};
        TASKS.filter(t => t[7] === 'Completed').forEach((t, i) => TASK_COMPLETIONS[t[8]] = { at: `09/10/2026, ${String(9 + (i % 7)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`, by: t[4] });
        function completionDayValue(value) { return dateValue(`${String(value).split(',')[0]} 12:00`) }
        function completionOutcome(t) { let record = TASK_COMPLETIONS[t[8]]; if (t[7] !== 'Completed' || !record) return null; let completedDay = completionDayValue(record.at), dueDay = completionDayValue(t[6]); return completedDay < dueDay ? 'Completed Early' : completedDay > dueDay ? 'Completed Late' : 'Completed On Time' }
        function completionOutcomePill(t) { let outcome = completionOutcome(t); return outcome ? `<span class="pill ${outcome === 'Completed Late' ? 'red' : 'green'}" data-aa-style="aa-static-style-27">${outcome}</span>` : '' }
        dueDateCell = function (t) { let outcome = completionOutcome(t); if (outcome) return `${t[6]}<div>${completionOutcomePill(t)}</div>`; return t[6] === OPERATION_DATE ? `<span class="due-today">${t[6]}</span><div class="sub due-today">Due today</div>` : t[6] };
        taskStatusPills = function (t) { return `${pill(effectiveTaskStatus(t))}${completionOutcome(t) ? `<div>${completionOutcomePill(t)}</div>` : ''}` };
        const completionStatusUpdater = updateTaskStatus; updateTaskStatus = function (id) { let t = taskById(id), before = t?.[7]; completionStatusUpdater(id); if (t && t[7] !== before) { if (t[7] === 'Completed') TASK_COMPLETIONS[id] = { at: '09/10/2026, 14:20', by: actorName() }; else delete TASK_COMPLETIONS[id]; render() } };
        managerHome = function () { let u = currentUser(), team = TASKS.filter(t => t[3] === u.department), openDue = team.filter(t => t[6] === OPERATION_DATE && t[7] !== 'Completed'), requests = REQUESTS.filter(r => r.status === 'Pending Approval' && taskById(r.taskId)?.[3] === u.department).length; return head(`Welcome back, ${u.name.split(' ')[0]}`, `Here's the latest from your ${u.department} team.`) + kpis([['My Department Tasks', team.length], ['Due Today', openDue.length, 'amber'], ['Overdue', team.filter(t => effectiveTaskStatus(t) === 'Overdue').length, 'red'], ['Pending', team.filter(t => effectiveTaskStatus(t) === 'Pending').length], ['Assignment Requests', requests, 'amber']]) + `<div class="card"><div class="card-head"><h2>Team Workload</h2><span class="sub">Current ${u.department} assignment distribution</span></div>${teamWorkload()}</div>` };
        userHome = function () { let u = currentUser(), mine = TASKS.filter(t => t[4] === u.name), today = mine.filter(t => t[6] === OPERATION_DATE), openDue = today.filter(t => t[7] !== 'Completed'), pendingCase = Object.values(CASE_DETAILS).find(c => !caseAcknowledged(c) && mine.some(t => t[1] === c.id)); return head(`Good morning, ${u.name.split(' ')[0]}`, 'Here are your Tasks for today.') + kpis([['Tasks', mine.length], ['Due Today', openDue.length, 'amber'], ['In Progress', mine.filter(t => effectiveTaskStatus(t) === 'In Progress').length], ['Pending', mine.filter(t => effectiveTaskStatus(t) === 'Pending').length], ['Overdue', mine.filter(t => effectiveTaskStatus(t) === 'Overdue').length, 'red']]) + (pendingCase ? `<div class="notice">Customer acknowledgement for ${pendingCase.id} is pending. <button class="link" onclick="openAcknowledgementCase('${pendingCase.id}')">Open Communication</button></div>` : '') + `<div class="grid2"><div class="card"><div class="card-head"><h2>Tasks with Today's Deadline</h2></div>${homeDueTasksTable(today)}</div><div class="card"><div class="card-head"><h2>Recent Mentions</h2></div><div class="attention-list">${mine.slice(0, 2).map((t, i) => `<div class="attention"><span class="avatar">${i ? 'MS' : 'SL'}</span><div><strong>${i ? 'Maria Svensson' : 'Sofia Lind'} mentioned you</strong><span class="sub">${t[1]} · ${t[2]}</span></div><button class="link" onclick="openTask('${t[8]}')">Open</button></div>`).join('')}</div></div></div>` };
        loginView = function () { return `<main class="login-screen photo-login"><section class="photo-login-card"><div class="photo-login-logo"><img src="assets/aa-logistik-logo.png" alt="AA Logistik"></div><h1>Welcome back</h1><p>Sign in with your AA Logistik Microsoft account.</p><button class="microsoft-login" onclick="loginDemo()"><span class="ms-grid"><i></i><i></i><i></i><i></i></span>Continue with Microsoft</button><span class="login-security">Secure access for AA Logistik employees</span></section></main>` };
        const noRedundantUnassignedStatus = tasksTable; tasksTable = function (rows, compact = false, admin = false, manager = false) { if (admin && S.taskTab === 'Unassigned' && S.filters.status === 'All') { S.filters.status = 'Pending'; let html = noRedundantUnassignedStatus(rows, compact, admin, manager); S.filters.status = 'All'; return html } return noRedundantUnassignedStatus(rows, compact, admin, manager) };
        function taskReference(t) { return `<button class="case-link" onclick="event.stopPropagation();openTaskContext('${t[8]}')">${t[8]}</button>` }
        tasksTable = function (rows, compact = false, admin = false, manager = false) { let table = 'tasks', personal = S.role === 'User' && (S.page === 'home' || S.taskScope === 'My Tasks'), showDepartment = (admin || S.taskScope === 'All Tasks') && S.filters.department === 'All', showAssignee = !personal && S.filters.assignee === 'All' && !(admin && S.taskTab === 'Unassigned'), showPriority = S.filters.priority === 'All', showDue = S.filters.due === 'All', fixedStatus = (admin && ['To-Do', 'In Progress', 'On Hold', 'Completed'].includes(S.taskTab)) || S.filters.status !== 'All', showStatus = !fixedStatus, ordered = sortedRows(rows, table, { date: t => t[6], priority: t => t[5], status: effectiveTaskStatus }); return `<div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} ${rows.length === 1 ? 'Task' : 'Tasks'}</h3><span class="sub">Showing a maximum of 15 records</span></div>${ordered.length ? `<table><thead><tr><th>Task No.</th><th>Subject</th><th>Customer</th>${showDepartment ? '<th>Department</th>' : ''}${showAssignee ? `<th>${admin ? 'Assigned To' : 'Assignee'}</th>` : ''}${showPriority ? `<th>${sortHeader('Priority', table, 'priority')}</th>` : ''}${showDue ? `<th>${sortHeader('Due Date', table, 'date')}</th>` : ''}${showStatus ? `<th>${sortHeader('Status', table, 'status')}</th>` : ''}<th>Action</th></tr></thead><tbody>${ordered.slice(0, 15).map(t => `<tr><td>${taskReference(t)}</td><td><strong>${t[0]}</strong><div class="sub">${t[9]}</div></td><td>${t[2]}</td>${showDepartment ? `<td>${t[3]}</td>` : ''}${showAssignee ? `<td>${t[4]}</td>` : ''}${showPriority ? `<td>${pill(t[5])}</td>` : ''}${showDue ? `<td>${dueDateCell(t)}</td>` : ''}${showStatus ? `<td>${taskStatusPills(t)}</td>` : ''}<td>${taskAction(t, admin, manager)}</td></tr>`).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No Tasks match these filters</strong><p class="sub">Change or reset the filters to see Tasks.</p></div>`}` };
        homeDueTasksTable = function (rows) { let ordered = sortedRows(rows, 'homeDueTasks', { date: t => t[6], priority: t => t[5], status: effectiveTaskStatus }); return `<div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} ${rows.length === 1 ? 'Task' : 'Tasks'}</h3></div>${ordered.length ? `<table><thead><tr><th>Task No.</th><th>Subject</th><th>Customer</th><th>${sortHeader('Priority', 'homeDueTasks', 'priority')}</th><th>${sortHeader('Due Date', 'homeDueTasks', 'date')}</th><th>${sortHeader('Status', 'homeDueTasks', 'status')}</th></tr></thead><tbody>${ordered.slice(0, 4).map(t => `<tr><td style="white-space:nowrap">${taskReference(t)}</td><td><strong>${t[0]}</strong><div class="sub">${t[9]}</div></td><td>${t[2]}</td><td>${pill(t[5])}</td><td>${dueDateCell(t)}</td><td>${taskStatusPills(t)}</td></tr>`).join('')}</tbody></table>${rows.length > 4 ? `<div class="card-body" data-aa-style="aa-static-style-5"><span class="sub">Showing 4 of ${rows.length}</span> <button class="link" onclick="go(\x27mytasks\x27)">Show all ${rows.length}</button></div>` : ""}` : `<div class="card-body"><strong>No Tasks are due today or due soon.</strong></div>`}` };
        dynamicCaseTasks = function () { let c = selectedCaseData(), rows = sortedRows(TASKS.filter(t => t[1] === c.id), 'caseTasks', { date: t => t[6], priority: t => t[5], status: effectiveTaskStatus }); return `<div class="card"><div class="card-head"><h2>Tasks for ${c.customer}</h2>${S.role === 'Admin' ? `<button class="btn primary" onclick="openEditor('newTask','${c.id}')">Add Task</button>` : ''}</div><table><thead><tr><th>Task No.</th><th>Subject</th><th>Category</th><th>Department</th><th>Assignee</th><th>${sortHeader('Priority', 'caseTasks', 'priority')}</th><th>${sortHeader('Due Date', 'caseTasks', 'date')}</th><th>${sortHeader('Status', 'caseTasks', 'status')}</th><th>Action</th></tr></thead><tbody>${rows.map(t => `<tr><td>${taskReference(t)}</td><td><strong>${t[0]}</strong></td><td>${t[9]}</td><td>${t[3]}</td><td>${t[4]}</td><td>${pill(t[5])}</td><td>${dueDateCell(t)}</td><td>${taskStatusPills(t)}</td><td><button class="link" onclick="openTask('${t[8]}')">Open</button></td></tr>`).join('')}</tbody></table></div>` };
        requestTable = function () { let showStatus = S.requestFilter === 'All Requests', rows = sortedRows(managerPending(), 'assignmentRequests', { date: r => taskById(r.taskId)?.[6], priority: r => taskById(r.taskId)?.[5], status: r => r.status }); return `<div class="filters"><select onchange="S.requestFilter=this.value;render()"><option ${S.requestFilter === 'All Requests' ? 'selected' : ''}>All Requests</option><option ${S.requestFilter === 'Pending Approval' ? 'selected' : ''}>Pending Approval</option><option ${S.requestFilter === 'Approved' ? 'selected' : ''}>Approved</option><option ${S.requestFilter === 'Declined' ? 'selected' : ''}>Declined</option></select></div><div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} Assignment ${rows.length === 1 ? 'Request' : 'Requests'}</h3></div>${rows.length ? `<table><thead><tr><th>Task No.</th><th>Subject</th><th>Customer</th><th>Requested By</th><th>Department</th><th>${sortHeader('Priority', 'assignmentRequests', 'priority')}</th><th>${sortHeader('Due Date', 'assignmentRequests', 'date')}</th>${showStatus ? `<th>${sortHeader('Status', 'assignmentRequests', 'status')}</th>` : ''}<th>Action</th></tr></thead><tbody>${rows.map(r => { let t = taskById(r.taskId), u = USERS.find(x => x.id === r.requesterId); return `<tr><td>${taskReference(t)}</td><td>${t[0]}</td><td>${t[2]}</td><td>${u.name}</td><td>${t[3]}</td><td>${pill(t[5])}</td><td>${t[6]}<div class="sub">Requested ${r.requestedAt}</div></td>${showStatus ? `<td>${pill(r.status)}</td>` : ''}<td>${r.status === 'Pending Approval' ? `<div class="request-actions"><button class="btn primary" onclick="approveRequest('${r.id}')">Approve</button><button class="btn" onclick="declineRequest('${r.id}')">Decline</button></div>` : '—'}</td></tr>` }).join('')}</tbody></table>` : `<div class="card-body" data-aa-style="aa-static-style-2"><strong>No assignment requests match this filter</strong></div>`}` };
        review = function () { let tabs = ['Awaiting Review', 'Needs Clarification', 'Acknowledgement Pending']; if (!tabs.includes(S.queueTab)) S.queueTab = 'Awaiting Review'; let issues = [...new Set(QUEUE.filter(x => tabs.includes(x[6])).map(x => x[4]))], customers = [...new Set(QUEUE.filter(x => tabs.includes(x[6])).map(x => x[1]))].filter(n => window.inCustomerMaster(n)); return head('Review Requests', 'Review incoming requests, resolve missing information and manage customer acknowledgements.', `<span class="sub">Last refresh: ${S.lastRefresh}</span><button class="btn" onclick="refreshQueue()">Refresh</button>`) + `<div class="card"><div class="tabs">${tabs.map(t => `<button class="${S.queueTab === t ? 'active' : ''}" onclick="S.queueTab='${t}';resetQueue()">${t} (${QUEUE.filter(x => x[6] === t).length})</button>`).join('')}</div><div class="filters"><input value="${S.queueQuery}" onchange="setQueue('queueQuery',this.value)" onkeyup="if(event.key==='Enter')setQueue('queueQuery',this.value)" placeholder="Search requests..."><select onchange="setQueue('queueIssue',this.value)"><option value="All">All Issues</option>${issues.map(x => `<option ${S.queueIssue === x ? 'selected' : ''}>${x}</option>`).join('')}</select><select aria-label="Source" onchange="setQueue('queueSource',this.value)"><option value="All">All Sources</option>${SOURCE_FILTERS.map(x => `<option ${S.queueSource === x ? 'selected' : ''}>${x}</option>`).join('')}</select><select onchange="setQueue('queueCustomer',this.value)"><option value="All">All Customers</option>${customers.map(x => `<option ${S.queueCustomer === x ? 'selected' : ''}>${x}</option>`).join('')}</select><button class="btn" onclick="resetQueue()">Reset</button></div>${queueTable()}</div>` };
        const detailFirstTaskAction = taskAction; taskAction = function (t, admin, manager) { if (admin) return `<button class="btn" onclick="openTask('${t[8]}')">Open</button>`; return detailFirstTaskAction(t, admin, manager) };
        function openTaskAssignment(id) { let t = taskById(id), suggested = taskOwnerFor(t?.[9]); if (S.role !== 'Admin' || !t) { toast('Only the Admin can assign Tasks'); return } S.assignTaskId = id; S.assignChoice = t[4] !== 'Unassigned' ? t[4] : suggested?.name || ''; S.assignmentFromDetail = true; S.assignModal = true; render() }
        const standardAssignDialog = assignDialog; 
        function confirmTaskReassignment() { let t = taskById(S.assignTaskId), name = document.getElementById('detail-assignee')?.value || S.assignChoice, reason = document.getElementById('assignment-reason')?.value?.trim(), user = USERS.find(u => u.name === name); if (!t || S.role !== 'Admin') { toast('Assignment could not be completed'); return } if (!user) { toast('Select an eligible owner'); return } if (t[4] === user.name) { toast('Select a different owner'); return } if (!reason) { toast('A reason is required'); return } let previous = t[4], at = '09/10/2026, 14:45'; t[4] = user.name; t[3] = user.department; if (previous === 'Unassigned') t[7] = 'To-Do'; TASK_ASSIGNMENTS[t[8]] = { assignedTo: user.name, assignedBy: actorName(), assignedAt: at, classification: t[9], previousOwner: previous, reason }; (S.comments[t[8]] = S.comments[t[8]] || []).push({ author: actorName(), text: `${previous === 'Unassigned' ? 'Assigned' : 'Reassigned'} from ${previous} to ${user.name}: ${reason}`, at, statusChange: false }); S.activities.unshift([`${t[8]} ${previous === 'Unassigned' ? 'assigned' : 'reassigned'} from ${previous} to ${user.name} · ${reason}`, actorName(), at]); S.assignModal = false; S.assignmentFromDetail = false; S.drawer = true; render(); toast(`${t[8]} ${previous === 'Unassigned' ? 'assigned' : 'reassigned'} to ${user.name}`) }
        const ANALYTIC_COLORS = ['#147bd1', '#36a269', '#e7a51a', '#e33a48', '#6b7f97', '#875fc0', '#25a7a0', '#d66f2f'];
        function analyticsCard(title, subtitle, content) { return `<section class="analytics-card"><h2>${title}</h2><p class="chart-sub">${subtitle}</p>${content}</section>` }
        function analyticsBars(items) { let max = Math.max(1, ...items.map(x => x[1])); return `<div class="analytics-bars">${items.map((x, i) => `<div class="analytics-bar-row"><span title="${x[0]}">${x[0]}</span><div class="analytics-bar-track"><div class="analytics-bar-fill" style="width:${Math.max(5, x[1] / max * 100)}%;background:${ANALYTIC_COLORS[i % ANALYTIC_COLORS.length]}"></div></div><strong>${x[1]}</strong></div>`).join('')}</div>` }
        function analyticsDonut(items) { let total = Math.max(1, items.reduce((n, x) => n + x[1], 0)), cursor = 0, stops = items.map((x, i) => { let start = cursor, c = x[1] / total * 100; cursor += c; return `${ANALYTIC_COLORS[i % ANALYTIC_COLORS.length]} ${start}% ${cursor}%` }).join(','); return `<div class="analytics-donut-wrap"><div class="analytics-donut" style="background:conic-gradient(${stops})"></div><div class="analytics-legend">${items.map((x, i) => x[1] ? `<div><i class="analytics-dot" style="background:${ANALYTIC_COLORS[i % ANALYTIC_COLORS.length]}"></i><span>${x[0]}</span><strong>${x[1]}</strong></div>` : '').join('')}</div></div>` }
        function analyticsStack(items) { let total = Math.max(1, items.reduce((n, x) => n + x[1], 0)); return `<div class="analytics-stack">${items.map((x, i) => `<span title="${x[0]}: ${x[1]}" style="width:${x[1] / total * 100}%;background:${ANALYTIC_COLORS[i % ANALYTIC_COLORS.length]}"></span>`).join('')}</div><div class="analytics-summary">${items.map((x, i) => `<span><i class="analytics-dot" style="display:inline-block;background:${ANALYTIC_COLORS[i % ANALYTIC_COLORS.length]};margin-right:5px"></i><strong>${x[1]}</strong>${x[0]}</span>`).join('')}</div>` }
        function analyticsLine(values) { let max = Math.max(1, ...values), points = values.map((v, i) => `${12 + i * (396 / (values.length - 1))},${112 - v / max * 92}`).join(' '); return `<svg class="analytics-line" viewBox="0 0 420 126" aria-label="Seven day activity"><line x1="10" y1="112" x2="410" y2="112" stroke="#dce4ec"/><polyline points="${points}" fill="none" stroke="#147bd1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${values.map((v, i) => `<circle cx="${12 + i * (396 / (values.length - 1))}" cy="${112 - v / max * 92}" r="4" fill="#fff" stroke="#147bd1" stroke-width="3"><title>${v} activities</title></circle>`).join('')}</svg><div class="analytics-axis"><span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span></div>` }
        // Groups by the value with spacing and letter case ignored, so "Transport booking" and "Transport Booking" count as one group. The first spelling seen is the label.
        function groupedCounts(rows, getter, limit = 6) { let map = {}, label = {}; rows.forEach(x => { let raw = String(getter(x) || 'Unknown').trim().replace(/\s+/g, ' '), key = raw.toLowerCase(); label[key] = label[key] || raw; map[key] = (map[key] || 0) + 1 }); return Object.entries(map).map(([key, n]) => [label[key], n]).sort((a, b) => b[1] - a[1]).slice(0, limit) }
        dashboard = function () { let u = currentUser(), scoped = S.role === 'Admin' ? TASKS : S.role === 'Manager' ? TASKS.filter(t => t[3] === u.department) : TASKS.filter(t => t[4] === u.name), status = [['Pending', scoped.filter(t => effectiveTaskStatus(t) === 'Pending').length], ['In Progress', scoped.filter(t => effectiveTaskStatus(t) === 'In Progress').length], ['Overdue', scoped.filter(t => effectiveTaskStatus(t) === 'Overdue').length], ['Completed', scoped.filter(t => effectiveTaskStatus(t) === 'Completed').length]], priority = ['Urgent', 'High', 'Medium', 'Low'].map(p => [p, scoped.filter(t => t[5] === p).length]), deadline = [['Due Today', scoped.filter(t => t[6] === OPERATION_DATE && t[7] !== 'Completed').length], ['Upcoming', scoped.filter(t => completionDayValue(t[6]) > completionDayValue(OPERATION_DATE) && t[7] !== 'Completed').length], ['Overdue', scoped.filter(t => effectiveTaskStatus(t) === 'Overdue').length]], completion = [['On Time', scoped.filter(t => completionOutcome(t) === 'Completed On Time').length], ['Early', scoped.filter(t => completionOutcome(t) === 'Completed Early').length], ['Late', scoped.filter(t => completionOutcome(t) === 'Completed Late').length]], activity = [7, 4, 5, 11, 9, 13, 10].map((v, i) => Math.max(1, Math.round(v * (scoped.length / Math.max(1, TASKS.length)) * (S.role === 'Admin' ? 3.2 : S.role === 'Manager' ? 2.2 : 1.4)))), cards = []; cards.push(analyticsCard('Task Status Distribution', `${scoped.length} Tasks in the current scope`, analyticsDonut(status))); cards.push(analyticsCard('Priority Mix', 'Operational work by priority', analyticsBars(priority))); cards.push(analyticsCard('Deadline Health', 'Open work relative to its deadline', analyticsStack(deadline))); cards.push(analyticsCard('Completion Timing', 'Deadline result for completed Tasks', analyticsDonut(completion))); cards.push(analyticsCard('Seven-Day Activity', 'Task updates and recorded activity', analyticsLine(activity))); if (S.role === 'User') { cards.push(analyticsCard('Customer Work Mix', 'Your Tasks by customer', analyticsBars(groupedCounts(scoped, t => t[2], 5)))) } else { let people = S.role === 'Admin' ? groupedCounts(scoped, t => t[3], 6) : groupedCounts(scoped, t => t[4], 6); cards.push(analyticsCard(S.role === 'Admin' ? 'Work by Department' : 'Team Workload', S.role === 'Admin' ? 'Task volume across operating departments' : `Assigned work across ${u.department}`, analyticsBars(people))); let requests = S.role === 'Admin' ? [['Awaiting Review', QUEUE.filter(q => q[6] === 'Awaiting Review').length], ['Needs Clarification', QUEUE.filter(q => q[6] === 'Needs Clarification').length], ['Acknowledgement', QUEUE.filter(q => q[6] === 'Acknowledgement Pending').length]] : [['Pending', REQUESTS.filter(r => r.status === 'Pending Approval' && taskById(r.taskId)?.[3] === u.department).length], ['Approved', REQUESTS.filter(r => r.status === 'Approved' && taskById(r.taskId)?.[3] === u.department).length], ['Declined', REQUESTS.filter(r => r.status === 'Declined' && taskById(r.taskId)?.[3] === u.department).length]]; cards.push(analyticsCard(S.role === 'Admin' ? 'Review Request Pipeline' : 'Assignment Request Outcomes', S.role === 'Admin' ? 'Current intake requiring administrative attention' : 'Department request decisions', analyticsStack(requests))); if (S.role === 'Admin') { let cases = [['In Progress', CASES.filter(c => c[6] === 'In Progress').length], ['Pending', CASES.filter(c => c[6] === 'Pending').length], ['Blocked', CASES.filter(c => c[6] === 'Blocked').length], ['Completed', CASES.filter(c => c[6] === 'Completed').length]]; cards.push(analyticsCard('Case Portfolio', 'Case volume by lifecycle state', analyticsDonut(cases))) } } return head('Dashboard', S.role === 'Admin' ? 'Company-wide operational analytics.' : S.role === 'Manager' ? `${u.department} department analytics.` : 'Your personal Task analytics.') + `<div class="analytics-grid">${cards.join('')}</div>` };
        function canAssignFromDetail(t) { let u = currentUser(); return u.role === 'Admin' || (u.role === 'Manager' && t[4] === 'Unassigned' && t[3] === u.department) }
        openTaskAssignment = function (id) { let t = taskById(id), u = currentUser(), suggested = t && taskOwnerFor(t[9]); if (!t || !canAssignFromDetail(t)) { toast(u.role === 'Manager' ? 'You can assign only unassigned Tasks in your department' : 'You do not have permission to assign this Task'); return } S.assignTaskId = id; S.assignChoice = t[4] !== 'Unassigned' ? t[4] : (suggested && suggested.department === t[3] ? suggested.name : ''); S.assignmentFromDetail = true; S.assignModal = true; render() };
        assignDialog = function () { if (!S.assignmentFromDetail) return standardAssignDialog(); let t = taskById(S.assignTaskId), u = currentUser(), suggested = taskOwnerFor(t[9]), eligible = USERS.filter(x => x.role !== 'Admin' && (u.role === 'Admin' || x.department === u.department)); return `<div class="modal-shade"><div class="assign-modal"><h2>${t[4] === 'Unassigned' ? 'Assign Task' : 'Reassign Task'}</h2><div class="body"><div class="notice"><strong>${t[8]} · ${t[0]}</strong><br><span class="sub">${t[2]} · ${t[3]} · ${t[9]}</span></div><div class="kv"><label>Current owner</label><strong>${t[4]}</strong></div><div class="kv"><label>Suggested owner</label><strong>${suggested && eligible.some(x => x.name === suggested.name) ? suggested.name + ' · ' + suggested.department : 'No eligible routing match'}</strong></div><label data-aa-style="aa-static-style-28"><strong>Eligible owner</strong><select id="detail-assignee" onchange="S.assignChoice=this.value"><option value="">Select a team member</option>${eligible.map(x => { let load = TASKS.filter(y => y[4] === x.name && y[7] !== 'Completed').length; return `<option value="${x.name}" ${S.assignChoice === x.name ? 'selected' : ''}>${x.name} · ${x.department} · ${x.title} · ${load} active</option>` }).join('')}</select></label><label data-aa-style="aa-static-style-28"><strong>Reason for ${t[4] === 'Unassigned' ? 'assignment' : 'reassignment'}</strong><textarea id="assignment-reason" data-aa-style="aa-static-style-29" placeholder="Required: explain this assignment decision"></textarea></label><p class="sub">${u.role === 'Manager' ? `Assignment is restricted to ${u.department} team members.` : 'Admin can assign across departments.'} This changes only this Task.</p></div><div class="footer"><button class="btn" onclick="S.assignModal=false;S.assignmentFromDetail=false;render()">Cancel</button><button class="btn primary" onclick="confirmTaskReassignment()">${t[4] === 'Unassigned' ? 'Assign Task' : 'Reassign Task'}</button></div></div></div>` };
        confirmTaskReassignment = function () { let t = taskById(S.assignTaskId), u = currentUser(), name = document.getElementById('detail-assignee')?.value || S.assignChoice, reason = document.getElementById('assignment-reason')?.value?.trim(), user = USERS.find(x => x.name === name); if (!t || !canAssignFromDetail(t)) { toast('You no longer have permission to assign this Task'); return } if (!user || user.role === 'Admin' || (u.role === 'Manager' && user.department !== u.department)) { toast('Select an eligible team member'); return } if (t[4] === user.name) { toast('Select a different owner'); return } if (!reason) { toast('A reason is required'); return } let previous = t[4], at = '09/10/2026, 15:05'; t[4] = user.name; t[3] = user.department; if (previous === 'Unassigned') t[7] = 'To-Do'; TASK_ASSIGNMENTS[t[8]] = { assignedTo: user.name, assignedBy: u.name, assignedAt: at, classification: t[9], previousOwner: previous, reason }; (S.comments[t[8]] = S.comments[t[8]] || []).push({ author: u.name, text: `${previous === 'Unassigned' ? 'Assigned' : 'Reassigned'} from ${previous} to ${user.name}: ${reason}`, at, statusChange: false }); S.activities.unshift([`${t[8]} ${previous === 'Unassigned' ? 'assigned' : 'reassigned'} from ${previous} to ${user.name} · ${reason}`, u.name, at]); S.assignModal = false; S.assignmentFromDetail = false; if (u.role === 'Manager') { S.drawer = false; S.page = 'department'; S.taskScope = 'My Department Tasks' } else S.drawer = true; render(); toast(`${t[8]} ${previous === 'Unassigned' ? 'assigned' : 'reassigned'} to ${user.name}`) };
        dueDateCell = function (t) { return t[7] !== 'Completed' && t[6] === OPERATION_DATE ? `<span class="due-today">${t[6]}</span><div class="sub due-today">Due today</div>` : t[6] };
        taskStatusPills = function (t) { return pill(effectiveTaskStatus(t)) };
        function dateInputValue(value) { let d = new Date(dateValue(value)); if (Number.isNaN(d.getTime())) return ''; let y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0'); return `${y}-${m}-${day}` }
        function displayDateValue(value) { if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return value; let [y, m, d] = value.split('-').map(Number), months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}` }
        function editMultiField(key, select) { S.editorData[key] = [...select.selectedOptions].map(o => o.value).join(', '); S.editorDirty = true }
        function multiChoice(label, key, value, options) { let selected = String(value || '').split(',').map(x => x.trim()); return `<label>${label}<select multiple onchange="editMultiField('${key}',this)">${options.map(x => `<option value="${x}" ${selected.includes(x) ? 'selected' : ''}>${x}</option>`).join('')}</select><span class="editor-help">Select one or more options</span></label>` }
        const caseEditorOpenBase = openEditor; openEditor = function (type, id = null) { caseEditorOpenBase(type, id); if ((type === 'case' || type === 'caseAction') && S.editorType) { let c = CASE_DETAILS[S.editorId]; if (c) { Object.assign(S.editorData, { due: dateInputValue(c.due), category: c.category || c.subcategory || c.classification || '' }); render() } } };
        const enhancedCaseEditorBase = editorDialog; editorDialog = function () { if (S.editorType !== 'case' && S.editorType !== 'caseAction') return enhancedCaseEditorBase(); let d = S.editorData, R = window.AA_REVIEW || {}, customers = [...new Set(Object.values(CASE_DETAILS).map(c => c.customer))].filter(n => window.inCustomerMaster(n)).sort(), departments = [...new Set(USERS.map(u => u.department).filter(x => x !== 'Administration'))].sort(), types = R.types || [], cats = R.cats || []; return `<div class="modal-shade"><div class="assign-modal"><h2>Edit Case</h2><div class="body"><div class="editor-grid">${choice('Customer', 'customer', d.customer, customers)}${choice('Priority', 'priority', d.priority, ['Urgent', 'High', 'Medium', 'Low'])}${multiChoice('Departments', 'departments', d.departments, departments)}${multiChoice('Case Type', 'caseClass', d.caseClass, types)}${multiChoice('Category', 'category', d.category, cats)}<label>Due date<input type="date" value="${d.due || ''}" onchange="editField('due',this.value)"></label>${choice('Status', 'status', d.status, ['Pending', 'In Progress', 'Blocked', 'Completed', ...(normalizeCaseStatus(d.status) === 'Completed' ? ['Reopen'] : [])])}</div></div><div class="footer"><button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" onclick="saveEditor()">Save Changes</button></div></div></div>` };
        const enhancedCaseSaveBase = saveEditor; saveEditor = function () { if (S.editorType !== 'case' && S.editorType !== 'caseAction') { enhancedCaseSaveBase(); return } let id = S.editorId, data = { ...S.editorData }; if (!data.customer || !data.departments || !data.caseClass || !data.due) { toast('Complete all Case fields before saving'); return } if (data.status === 'Reopen') S.editorData.status = 'In Progress'; else if (data.status === 'Completed' && normalizeCaseStatus(CASE_DETAILS[id]?.status) !== 'Completed') { let open = TASKS.filter(t => t[1] === id).filter(t => effectiveTaskStatus(t) !== 'Completed' || !completionOutcome(t)); if (open.length) { toast(`Case cannot be completed · ${open.length} required ${open.length === 1 ? 'Task is' : 'Tasks are'} unresolved`); return } } let customerSource = Object.values(CASE_DETAILS).find(c => c.customer === data.customer && c.id !== id); S.editorData.due = displayDateValue(data.due); enhancedCaseSaveBase(); let c = CASE_DETAILS[id]; if (c) { if (customerSource && c.customer === customerSource.customer) Object.assign(c, { contact: customerSource.contact, email: customerSource.email, phone: customerSource.phone, customerNo: customerSource.customerNo }); let row = CASES.find(x => x[0] === id); if (row) { row[1] = c.customer; row[2] = c.caseClass; row[3] = c.departments; row[4] = c.priority; row[5] = c.due; row[6] = c.status } } render() };
        function editorText(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])) }
        function multiChoice(label, key, value, options) { let selected = String(value || '').split(',').map(x => x.trim()).filter(Boolean), open = S.multiOpen === key, tags = selected.length ? selected.map(x => `<span class="multi-tag">${editorText(x)}</span>`).join('') : `<span class="multi-placeholder">Select ${editorText(label.toLowerCase())}</span>`, menu = open ? `<div class="multi-menu" role="listbox" aria-multiselectable="true">${options.map(x => { let on = selected.includes(x); return `<button type="button" class="multi-option ${on ? 'selected' : ''}" role="option" aria-selected="${on}" onclick="toggleEditorMultiValue('${key}','${encodeURIComponent(x)}')"><span class="multi-check">${on ? '✓' : ''}</span><span>${editorText(x)}</span></button>` }).join('')}</div>` : ''; return `<div class="editor-multi"><span class="editor-multi-label">${editorText(label)}</span><div class="multi-anchor"><button type="button" class="multi-trigger" aria-expanded="${open}" onclick="toggleEditorMulti('${key}')"><span class="multi-tags">${tags}</span></button>${menu}</div><span class="editor-help">Select one or more options</span></div>` }
        function toggleEditorMulti(key) { S.multiOpen = S.multiOpen === key ? null : key; render() }
        function toggleEditorMultiValue(key, encoded) { let value = decodeURIComponent(encoded), values = String(S.editorData[key] || '').split(',').map(x => x.trim()).filter(Boolean), index = values.indexOf(value); if (index >= 0) values.splice(index, 1); else values.push(value); S.editorData[key] = values.join(', '); S.editorDirty = true; render() }
        const polishedCaseOpenEditor = openEditor; openEditor = function (type, id = null) { S.multiOpen = null; polishedCaseOpenEditor(type, id) };
        const polishedCaseEditorBase = editorDialog; editorDialog = function () { let html = polishedCaseEditorBase(); return (S.editorType === 'case' || S.editorType === 'caseAction') ? html.replace('<div class="assign-modal">', '<div class="assign-modal case-editor-modal">') : html };
        function caseDateOnly(value) { return String(value || '').split(',')[0] }
        function selectedCaseTasks() { let c = selectedCaseData(); return TASKS.filter(t => t[1] === c.id) }
        function taskCompletedCount(rows) { return rows.filter(t => t[7] === 'Completed').length }
        function casePersonInitials(name) { return String(name || 'System').split(/\s+/).map(x => x[0]).join('').slice(0, 2).toUpperCase() }
        function caseProgressStrip(c, tasks) { let done = taskCompletedCount(tasks), pct = tasks.length ? Math.round(done / tasks.length * 100) : 0, record = acknowledgementRecord(c.id); return `<div class="case-strip"><strong>Case progress</strong><div class="progress-track"><i style="width:${pct}%"></i></div><span>${done} of ${tasks.length} Tasks completed</span><div class="ack-state"><strong>${record ? 'Acknowledgement Sent' : 'Acknowledgement Pending'}</strong></div><button class="btn" onclick="openAcknowledgement('${c.id}')">${record ? 'View Email' : 'Review Email'}</button></div>` }
        function aiSummaryGeneratedAt(c) { return (S.aiSummaryGenerated && S.aiSummaryGenerated[c.id]) || c.created }
        // Stamps the summary with the current date and time, in the same dd/mm/yyyy, hh:mm form as the seeded values.
        function summaryStamp(d = new Date()) { const p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}` }
        function regenerateAiSummary(caseId) { S.aiSummaryGenerated = S.aiSummaryGenerated || {}; S.aiSummaryGenerated[caseId] = summaryStamp(); render(); toast('AI summary regenerated') }
        function caseOverviewV2() { let c = selectedCaseData(), tasks = selectedCaseTasks(), interpretation = `${c.classification || c.caseClass} coordination required across ${c.departments}.`; return `${caseProgressStrip(c, tasks)}<div class="case-layout"><div class="case-main-stack"><section class="case-section"><div class="case-section-head"><h2>AI Summary</h2><div class="case-section-head-actions"><span class="sub">Last generated ${aiSummaryGeneratedAt(c)}</span><span class="pill blue">AI generated</span><button type="button" class="icon-btn ai-summary-btn" title="Regenerate AI summary" aria-label="Regenerate AI summary" onclick="regenerateAiSummary('${c.id}')"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6-5.6-1.9 5.6-1.9z"/><path d="M19 14.5l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z"/></svg></button></div></div><div class="case-section-body">${caseNarrative(c, tasks)}</div></section><section class="case-section"><div class="case-section-head"><h2>Task Summary</h2></div><div class="case-section-body">${tasks.length ? tasks.map(t => `<div class="task-summary-row"><div><button class="case-link" onclick="openTask('${t[8]}')">${t[8]}</button><div class="sub">${t[3]}</div></div><span>${t[4]}</span>${pill(t[5])}${pill(effectiveTaskStatus(t))}</div>`).join('') : '<div class="case-empty">No Tasks have been created.</div>'}<button class="link" onclick="S.caseTab='Tasks';render()">View all ${tasks.length} Tasks ›</button></div></section></div><div class="case-side-stack"><section class="case-section"><div class="case-section-head"><h2>Case Information</h2></div><div class="case-section-body"><div class="case-kv-grid"><div class="case-kv"><label>Customer</label><strong>${c.customer}</strong></div><div class="case-kv"><label>Case Type</label><strong>${c.caseClass}</strong></div><div class="case-kv"><label>Priority</label><strong>${pill(c.priority)}</strong></div><div class="case-kv"><label>Departments</label><strong>${c.departments}</strong></div><div class="case-kv"><label>Pickup</label><strong>${c.pickup}</strong></div><div class="case-kv"><label>Drop</label><strong>${c.delivery}</strong></div><div class="case-kv"><label>Requested Delivery</label><strong>${c.requestedDate}</strong></div><div class="case-kv"><label>AI Confidence</label><strong>${c.confidence}%</strong></div></div></div></section>${caseActivityPreview(c)}</div></div>` }
        function orderLine(label, value) { return `<div class="order-line"><span>${label}</span><strong>${value || '—'}</strong></div>` }
        // Sender (p) or receiver (d) address parts, in the order Opter shows them. Empty values show as a dash.
        function addressLines(c, p) { return orderLine('Customer Number', c[p + 'cust']) + orderLine('Name', c[p + 'name']) + orderLine('Street Name', c[p + 'street']) + orderLine('Street Number', c[p + 'no']) + orderLine('Info', c[p + 'info']) + orderLine('Postal Code', c[p + 'post']) + orderLine('City', c[p + 'city']) + orderLine('Country', c[p + 'country']) + orderLine('Phone', c[p + 'phone']) + orderLine('From Time', c[p + 'from']) + orderLine('To Time', c[p + 'to']) }
        function orderCard(number, title, body, full = false, extra = '') { return `<section class="order-card ${full ? 'full' : ''}"><div class="order-card-head"><h3>${number}. ${title}</h3><div class="actions">${extra}</div></div><div class="order-card-body">${body}</div></section>` }
        S.opterOrders = S.opterOrders || {};
        S.orderChangeRequests = S.orderChangeRequests || {};
        // This Case already has an Opter order and the customer has since asked for changes, so the header
        // shows "Update Opter Order" rather than "Create Opter Order" — proof the two-state button works.
        if (!S.opterOrders['CASE-400370']) S.opterOrders['CASE-400370'] = { id: 'OPT-58401', needsUpdate: true };
        if (!S.orderChangeRequests['CASE-400370']) S.orderChangeRequests['CASE-400370'] = [
          { label: 'Delivery Date / Time', value: '28/10/2026, 09:00', note: 'Customer requested the delivery be moved later due to a site access delay.', from: 'Thomas Weber', at: '14/10/2026, 09:32' },
          { label: 'Pickup Date / Time', value: '24/10/2026, 07:30', note: 'Carrier can collect earlier, at the start of the morning window.', from: 'Thomas Weber', at: '15/10/2026, 08:10' },
          { label: 'Customer Reference', value: 'HITACHI-0370-26A', note: 'Customer revised the reference after the purchase order was updated.', from: 'Thomas Weber', at: '15/10/2026, 10:42' },
          { label: 'Number of Packages', value: '3', note: 'Customer found an additional crate during packing.', from: 'Thomas Weber', at: '15/10/2026, 13:05' }
        ];
        if (!S.orderChangeRequests['CASE-400373']) S.orderChangeRequests['CASE-400373'] = [{ label: 'Number of Packages', value: '3', note: 'Customer corrected the number of crates after re-measuring.', from: 'Thomas Weber', at: '15/10/2026, 14:18' }];
function opterOrderCaseReady(c){return !outstandingCaseFields(c).length}
function isTransportCase(c){return c.orderKind?c.orderKind==='Transport':/transport|export|import|freight|pickup|delivery/i.test(c.classification||c.category||'')}
function opterHeaderAction(c){if(!isTransportCase(c))return '';let order=S.opterOrders[c.id];if(!order)return opterOrderCaseReady(c)?(can('createOpterOrders')?`<button class="btn primary" onclick="createOpterOrder('${c.id}')">Create Opter Order</button>`:'<span class="sub">Your profile cannot create Opter orders</span>'):'';if(order.needsUpdate)return can('updateOpterOrders')?`<button class="btn primary" onclick="updateOpterOrder('${c.id}')">Update Opter Order</button>`:'<span class="sub">Your profile cannot update Opter orders</span>';return pill('Opter '+order.id,'green')}
function createOpterOrder(caseId){if(!can('createOpterOrders')){toast('Your profile cannot create Opter orders');return}S.opterOrders[caseId]={id:`OPT-${58000+Number(caseId.slice(-4))}`,needsUpdate:false};S.activities.unshift([`Opter order ${S.opterOrders[caseId].id} created`,actorName(),'14/10/2026, 10:00']);render();toast('Opter order created')}
function updateOpterOrder(caseId){if(!can('updateOpterOrders')){toast('Your profile cannot update Opter orders');return}let order=S.opterOrders[caseId];if(!order)return;order.needsUpdate=false;S.activities.unshift([`Opter order ${order.id} updated`,actorName(),'14/10/2026, 10:00']);render();toast('Opter order updated')}
S.goodsRows = S.goodsRows || {};
function goodsRowsFor(c) { if (!S.goodsRows[c.id]) S.goodsRows[c.id] = [['01','1','Export crate',c.goods,c.weight,'3.20 × 2.10 × 2.40 m',c.id.replace('CASE','PKG')+'-01'],['02','1','Export crate',c.goods,c.weight,'3.20 × 2.10 × 2.40 m',c.id.replace('CASE','PKG')+'-02']]; return S.goodsRows[c.id] }
function addGoodsRow(caseId) { let rows = goodsRowsFor(selectedCaseData()); let n = String(rows.length+1).padStart(2,'0'); rows.push([n,'1','','','','',`${caseId.replace('CASE','PKG')}-${n}`]); if (S.opterOrders[caseId]) S.opterOrders[caseId].needsUpdate = true; render() }
function removeGoodsRow(caseId, i) { let rows = goodsRowsFor(selectedCaseData()); if (rows.length <= 1) { toast('At least one item is required'); return } rows.splice(i,1); if (S.opterOrders[caseId]) S.opterOrders[caseId].needsUpdate = true; render() }
function orderTabV2() { let c = selectedCaseData(), po = `PO-${c.id.slice(-4)}21`, ref = `${c.customer.split(' ')[0].toUpperCase()}-${c.id.slice(-4)}-26`; let customer = `<div class="order-data-grid">${orderLine('Customer', c.customer)}${orderLine('Invoice Marking', `${c.id.slice(-4)}-${c.customer.split(' ')[0].toUpperCase()}`)}${orderLine('Customer No.', c.customerNo)}${orderLine('Payer', `${c.customer} AB`)}${orderLine('Contact', c.contact)}${orderLine('Region', 'DACH')}${orderLine('Customer Reference', ref)}${orderLine('PO Number', po)}${orderLine('Project Number', c.proj)}${orderLine('Internal Message', c.imsg)}${orderLine('External Message', c.emsg)}${orderLine('Delivery Instruction', c.dlvi)}</div>`; let pickup = `<div class="order-data-grid">${orderLine('Customer Number', c.pcust)}${orderLine('Name', c.pname)}${orderLine('Street Name', c.pstreet)}${orderLine('Street Number', c.pno)}${orderLine('Info', c.pinfo)}${orderLine('Postal Code', c.ppost)}${orderLine('City', c.pcity)}${orderLine('Country', c.pcountry)}${orderLine('Phone', c.pphone)}${orderLine('Location', c.pickup)}${orderLine('Contact', c.contact)}${orderLine('Pickup Date / Time', `${caseDateOnly(c.due)}, 08:00–10:00`)}${orderLine('From Time', c.pfrom)}${orderLine('To Time', c.pto)}${orderLine('Sender Reference', ref)}${orderLine('Geographic / Price Zone', `${String(c.pickup).split(',')[0]} / SE-7`)}</div>`; let delivery = `<div class="order-data-grid">${orderLine('Customer Number', c.dcust)}${orderLine('Name', c.dname)}${orderLine('Street Name', c.dstreet)}${orderLine('Street Number', c.dno)}${orderLine('Info', c.dinfo)}${orderLine('Postal Code', c.dpost)}${orderLine('City', c.dcity)}${orderLine('Country', c.dcountry)}${orderLine('Phone', c.dphone)}${orderLine('Location', c.delivery)}${orderLine('Contact', 'Anna Keller')}${orderLine('Delivery Date / Time', `${c.requestedDate}, 09:00–12:00`)}${orderLine('From Time', c.dfrom)}${orderLine('To Time', c.dto)}${orderLine('Receiver Reference', c.id.replace('CASE', 'DEL'))}${orderLine('Geographic / Price Zone', `${String(c.delivery).split(',')[0]} / EU-3`)}</div>`; let shipment = `<div class="order-data-grid">${orderLine('Transport Mode', 'Road Freight')}${orderLine('Vehicle Type', c.vehType)}${orderLine('Distance', '1,640 km')}${orderLine('Service', 'Direct')}${orderLine('Estimated Driving Time', '19 h 30 min')}${orderLine('Temperature Requirement', 'None')}<div class="order-line"><span>Freight Document No.</span><strong>${editorText(c.freightDocNo || '')}</strong></div>${orderLine('Dangerous Goods', 'No')}${orderLine('Estimated CO₂ Emission', '418 kg')}</div>`; let metrics = [['Number of Packages','2'],['Gross Weight',c.weight],['Chargeable Weight',c.weight],['Length','3.20 m'],['Width','2.10 m'],['Height','2.40 m'],['Total Volume','32.3 m³'],['Pallet Spaces','4'],['Loading Metres','6.4']].map(x => `<div class="order-metric"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join(''); let goods = `<div data-aa-style="aa-static-style-35"><table class="compact-order-table"><thead><tr><th>Item</th><th>Qty</th><th>Package Type</th><th>Goods Description</th><th>Weight</th><th>Dimensions</th><th>Package No.</th><th>Goods Marking</th><th>Volume (m³)</th><th>Pallet Spaces</th><th></th></tr></thead><tbody>${goodsRowsFor(c).map((r,i)=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td>${r[6]}</td><td>${(c.goodsDetail&&c.goodsDetail[i]||{}).marking||'—'}</td><td>${(c.goodsDetail&&c.goodsDetail[i]||{}).vol||'—'}</td><td>${(c.goodsDetail&&c.goodsDetail[i]||{}).pallet||'—'}</td><td data-aa-style="aa-static-style-36"><button class="link" title="Remove row" onclick="removeGoodsRow('${c.id}',${i})">✕</button></td></tr>`).join('')}</tbody></table></div>`; return `<div class="order-grid">${orderCard('1','Customer & Order',customer,true)}${orderCard('2','Pickup / Sender',pickup,true)}${orderCard('3','Delivery / Receiver',delivery,true)}${orderCard('4','Shipment Details',shipment,true)}${orderCard('5','Order Data',`<div class="order-data-grid">${orderLine('Waybill Number', c.waybill)}${orderLine('Summera ID', c.summera)}${orderLine('Original Order Number', c.origOrder)}${orderLine('Order Type', c.ordType)}${orderLine('Order Date', c.orderDate)}</div>`,true)}${orderCard('6','Dimensions & Capacity',`<div class="order-metrics">${metrics}</div>`,true)}${orderCard('7','Goods / Colli',goods,true,`<button class="link" onclick="addGoodsRow('${c.id}')">+ Add Item</button>`)}</div>` }
        function caseTasksV2() { let c = selectedCaseData(), tasks = selectedCaseTasks(), done = taskCompletedCount(tasks), pct = tasks.length ? Math.round(done / tasks.length * 100) : 0; return `<section class="case-section"><div class="case-section-head"><div><h2>Tasks for this Case</h2><span class="sub">${done} of ${tasks.length} Tasks completed</span></div>${S.role === 'Admin' ? `<button class="btn primary" onclick="openEditor('newTask','${c.id}')">+ Add Task</button>` : ''}</div><div class="case-section-body"><div class="progress-track" data-aa-style="aa-static-style-37"><i style="display:block;height:100%;width:${pct}%;background:var(--blue)"></i></div>${tasks.map(t => { let assignment = TASK_ASSIGNMENTS[t[8]], assigned = assignment?.assignedAt || c.created; return `<article class="task-work-item"><div class="task-work-top"><div><button class="case-link" onclick="openTask('${t[8]}')">${t[8]}</button><h3 data-aa-style="aa-static-style-38">${t[0]}</h3></div>${pill(t[5])}${pill(effectiveTaskStatus(t))}</div><div class="task-work-meta"><div><small>Department</small><strong>${t[3]}</strong></div><div><small>Owner</small><strong>${t[4]}</strong></div><div><small>Assigned</small><strong>${caseDateOnly(assigned)}</strong></div><div><small>Due</small><strong>${t[6]}</strong></div></div><div data-aa-style="aa-static-style-39"><button class="link" onclick="openTask('${t[8]}')">View Details ›</button></div></article>` }).join('')}</div></section>` }
        function communicationTabV2() { let c = selectedCaseData(), record = acknowledgementRecord(c.id), notes = S.notes.filter(n => !n.caseId || n.caseId === c.id), pinned = notes.filter(n => n.pinned), rest = notes.filter(n => !n.pinned); return `${record ? `<div class="notice green"><strong>Customer acknowledgement was sent by ${record.by} on ${record.at}.</strong></div>` : `<div class="notice"><strong>Customer acknowledgement is pending.</strong><span class="sub"> Prepared automatically from the approved Case.</span><button class="compact-action" data-aa-style="aa-static-style-40" onclick="openAcknowledgement('${c.id}')">Review acknowledgement</button></div>`}<div class="case-layout"><section class="case-section"><div class="case-section-head"><h2>Internal Communication</h2><button class="btn primary" onclick="openCommunication('Internal Note')">+ Add Comment</button></div><div class="case-section-body">${pinned.length ? `<div class="internal-comment-group"><span class="sub">📌 Pinned (${pinned.length})</span>${pinned.map(n=>internalCommentRow(n)).join('')}</div>`:''}<div class="internal-comment-group">${rest.length ? rest.map(n=>internalCommentRow(n)).join('') : '<div class="case-empty">No internal comments yet.</div>'}</div><div class="internal-composer"><div><strong>Add Internal Comment</strong><div class="sub">Internal only · Customer will not see this</div></div><input id="case-comment-v2" placeholder="Write a comment for your team…"><button class="btn" onclick="openCommunication('Internal Note')">Add Comment</button></div></div></section><div class="case-side-stack"><section class="case-section"><div class="case-section-head"><h2>Communication Summary</h2></div><div class="case-section-body case-kv-grid"><div class="case-kv"><label>Customer Contact</label><strong>${c.contact}</strong></div><div class="case-kv"><label>Email</label><strong>${c.email}</strong></div><div class="case-kv"><label>Acknowledgement</label><strong>${pill(record ? 'Sent' : 'Pending')}</strong></div><div class="case-kv"><label>Last customer email</label><strong>${c.created}</strong></div><div class="case-kv"><label>Internal comments</label><strong>${notes.length}</strong></div><div class="case-kv"><label>Attachments</label><strong>${(c.attachments || []).length}</strong></div></div></section></div></div>` }
function internalCommentRow(n){return `<div class="people-row"><span class="avatar">${casePersonInitials(n.author)}</span><div><strong>${n.author}</strong> <span class="sub">· ${n.at}</span><p data-aa-style="aa-static-style-38">${n.text}</p></div>${n.pinned?'<span class="sub">📌</span>':''}</div>`}
        function caseAuditEvents(c) { let tasks = selectedCaseTasks(), base = [{date:'10/10/2026',time:'09:42',kind:'green',title:`${tasks[0]?.[8] || 'TASK'} completed`,detail:tasks[0]?.[0] || 'Operational Task completed',person:tasks[0]?.[4] || 'Task owner',comment:'Work completed and verified.',change:'In Progress → Completed'},{date:'10/10/2026',time:'08:15',kind:'',title:`${tasks[1]?.[8] || tasks[0]?.[8] || 'TASK'} status changed`,detail:tasks[1]?.[0] || tasks[0]?.[0] || 'Operational Task',person:tasks[1]?.[4] || tasks[0]?.[4] || 'Task owner',comment:'Required information confirmed.',change:'Pending → In Progress'},{date:'07/10/2026',time:'09:24',kind:'',title:'Internal comment added',detail:'Awaiting final operational details from the team.',person:'Erik Karlsson'},{date:'07/10/2026',time:'09:20',kind:'',title:'Acknowledgement reviewed',detail:'Customer acknowledgement draft reviewed.',person:'John Andersson'},{date:'07/10/2026',time:'09:16',kind:'',title:`${tasks.length} Tasks created and assigned`,detail:'Task owners matched from category rules.',person:'System'},{date:'07/10/2026',time:'09:14',kind:'green',title:'Case approved',detail:`Request converted to ${c.id}.`,person:'John Andersson'},{date:'07/10/2026',time:'08:02',kind:'',title:'AI categorized customer request',detail:`${c.caseClass} · ${c.priority} priority · ${c.departments} · ${c.confidence}% confidence`,person:'System'},{date:'07/10/2026',time:'08:00',kind:'',title:'Customer email received',detail:c.subject,person:`${c.contact} · ${c.customer}`}]; return base }
        function caseActivityPreview(c) { let events = caseAuditEvents(c).slice(-4); return `<section class="case-section"><div class="case-section-head"><h2>Recent Activity</h2><button class="link" onclick="S.caseTab='Activity';render()">View all</button></div><div class="case-section-body">${events.map(e => `<div class="people-row"><span class="audit-icon">•</span><div><strong>${e.title}</strong><div class="sub">${e.date}, ${e.time} · ${e.person}</div></div></div>`).join('')}</div></section>` }
        function activityTabV2() { let c = selectedCaseData(), all = caseAuditEvents(c), q = String(S.caseActivityQuery || '').toLowerCase(), type = S.caseActivityType || 'All Activity', user = S.caseActivityUser || 'All Users', events = all.filter(e => (!q || [e.title,e.detail,e.person].join(' ').toLowerCase().includes(q)) && (type === 'All Activity' || (type === 'Task Updates' ? /TASK|status/.test(e.title) : type === 'Communications' ? /email|Acknowledgement|comment/.test(e.title) : /AI|approved|assigned/.test(e.title))) && (user === 'All Users' || e.person.includes(user))); let users = [...new Set(all.map(e => e.person.split(' · ')[0]))]; let date = ''; return `<div class="activity-layout"><section class="case-section"><div class="case-section-head"><h2>Case Activity</h2><div class="case-filter-row"><input value="${editorText(S.caseActivityQuery || '')}" oninput="S.caseActivityQuery=this.value;render()" placeholder="Search activity…"><select onchange="S.caseActivityType=this.value;render()">${['All Activity','Task Updates','Communications','System Events'].map(x=>`<option ${type===x?'selected':''}>${x}</option>`).join('')}</select><select onchange="S.caseActivityUser=this.value;render()"><option>All Users</option>${users.map(x=>`<option ${user===x?'selected':''}>${x}</option>`).join('')}</select></div></div><div class="case-section-body">${events.map((e,i) => { let group = e.date !== date ? `<div class="audit-date">${date=e.date}</div>` : ''; return `${group}<div class="audit-event ${i===events.length-1?'last':''}"><span class="sub">${e.time}</span><span class="audit-icon ${e.kind}">${e.kind==='green'?'✓':'•'}</span><div><strong>${e.title}</strong><p>${e.detail}</p><span class="sub">${e.person}${e.comment?` · ${e.comment}`:''}</span></div>${e.change?`<span class="pill blue">${e.change}</span>`:''}</div>` }).join('') || '<div class="case-empty">No Activity matches these filters.</div>'}</div></section><div class="case-note">♢ <strong>Audit history is permanent.</strong><br>Activity records cannot be edited or deleted.</div></div>` }
        function caseTabV2() { if (S.caseTab === 'Overview') return caseOverviewV2(); if (S.caseTab === 'Order') return orderTabV2(); if (S.caseTab === 'Tasks') return caseTasksV2(); if (S.caseTab === 'Communication') return communicationTabV2(); return activityTabV2() }
        caseView = function () { let c = selectedCaseData(), tasks = selectedCaseTasks(), comms = Math.max(2, S.communications.filter(m => m.caseId === c.id).length), aliases = {'Order Data':'Order','Activities':'Activity'}; S.caseTab = aliases[S.caseTab] || S.caseTab || 'Overview'; let tabs = [['Overview',''],['Order',''],['Tasks',` (${tasks.length})`],['Communication',` (${comms})`],['Activity','']]; return `<div class="case-workspace"><button class="case-back" onclick="go('cases')">← Back to Cases</button><section class="case-v2-head"><div class="case-v2-title"><div><h1>${c.id} · ${c.caseClass} – ${c.customer}</h1><div class="sub">Received ${caseDateOnly(c.created)} · Due ${c.due} · ${c.departments}</div></div>${pill(c.status)}${pill(`${c.priority} Priority`)}${S.role==='Admin'?`<button class="btn" onclick="openEditor('case','${c.id}')">✎ Edit Case</button><button class="btn" onclick="openCaseActions()">More Actions⌄</button>`:''}</div><div class="case-v2-tabs">${tabs.map(([t,n])=>`<button class="${S.caseTab===t?'active':''}" onclick="S.caseTab='${t}';render()">${t==='Order'?'Order Data':t}${n}</button>`).join('')}</div></section>${caseTabV2()}</div>` }
        const TASK_WORKFLOW_STATUSES = ['To-Do', 'In Progress', 'On Hold', 'Completed'];
        function kanbanStatus(t) { return effectiveTaskStatus(t) }
        function taskDeadlineState(t) { if (t[7] === 'Completed') return ''; let due = dateValue(t[6]), today = dateValue(OPERATION_DATE); return due < today ? 'Overdue' : due === today ? 'Due Today' : '' }
        function selectKanbanTask(id) { S.kanbanTaskId = id; render() }
        function setCaseTaskView(view) { S.caseTaskView = view; render() }
        function setKanbanFilter(key, value) { S[key] = value; render() }
        function kanbanFilteredTasks() { let rows = selectedCaseTasks(), q = String(S.kanbanQuery || '').trim().toLowerCase(), dept = S.kanbanDepartment || 'All Departments', priority = S.kanbanPriority || 'All Priorities', owner = S.kanbanOwner || 'All Owners', deadline = S.kanbanDeadline || 'All Deadlines'; return rows.filter(t => (!q || [t[8],t[0],t[3],t[4],t[9]].join(' ').toLowerCase().includes(q)) && (dept === 'All Departments' || t[3] === dept) && (priority === 'All Priorities' || t[5] === priority) && (owner === 'All Owners' || t[4] === owner) && (deadline === 'All Deadlines' || taskDeadlineState(t) === deadline)) }
        function taskInstruction(t) { let map = {'Transport booking':'Confirm shipment requirements and complete carrier booking using the approved Order information.','Pickup coordination':'Confirm pickup contact, collection window, loading reference, and site requirements.','Transport follow-up':'Monitor the shipment milestone and record any operational exception.','Delivery coordination':'Confirm delivery window, receiver access, and unloading requirements.','Packing preparation':'Prepare, label, and verify the cargo against the Order dimensions.','Packing inspection':'Inspect the packed cargo and record final dimensions, weight, and condition.','Export documentation':'Prepare and verify all export documentation required for dispatch.','Customs clearance':'Prepare the customs file and confirm that all required declarations are complete.','Warehouse storage':'Confirm storage location, handling requirements, and release conditions.'}; return map[t[9]] || `Complete the ${String(t[9] || 'operational').toLowerCase()} work using the approved Case and Order information.` }
        function taskAssignmentDate(t) { return caseDateOnly(TASK_ASSIGNMENTS[t[8]]?.assignedAt || selectedCaseData().created) }
        function kanbanCard(t) { let status = kanbanStatus(t), deadline = taskDeadlineState(t), comments = (S.comments[t[8]] || []).length, files = (S.attachments[t[8]] || []).length, owner = t[4] || 'Unassigned', selected = S.kanbanTaskId === t[8]; return `<article class="kanban-card ${selected?'selected':''}" onclick="selectKanbanTask('${t[8]}')"><button class="case-link" onclick="event.stopPropagation();selectKanbanTask('${t[8]}')">${t[8]}</button><h3>${t[0]}</h3><div class="kanban-card-line"><span>▧</span><span>${t[3]}</span><span data-aa-style="aa-static-style-41">${pill(t[5])}</span></div><div class="kanban-card-line"><span class="avatar">${owner==='Unassigned'?'—':casePersonInitials(owner)}</span><strong>${owner}</strong></div><div class="kanban-card-line ${deadline?'deadline-warning':''}"><span>▣</span><span>${deadline ? `${deadline}, ` : 'Due '}${t[6]}</span></div><div class="sub">${owner==='Unassigned'?'Assignment needed':`Assigned ${taskAssignmentDate(t)}`}</div>${status==='Blocked'?`<div class="notice" data-aa-style="aa-static-style-42">Waiting for required operational confirmation</div>`:''}<div class="kanban-card-foot"><span>◯ ${comments}</span><span>⌕ ${files}</span><span>↗ ${status==='Pending'?'1':'0'}</span></div></article>` }
        function kanbanBoard(rows) { return `<div class="kanban-board">${TASK_WORKFLOW_STATUSES.map(status => { let cards = rows.filter(t => kanbanStatus(t) === status); return `<section class="kanban-column" data-status="${status}"><div class="kanban-column-head"><i class="kanban-dot"></i><span>${status} (${cards.length})</span></div><div class="kanban-cards">${cards.length?cards.map(kanbanCard).join(''):`<div class="kanban-empty">No ${status.toLowerCase()} Tasks</div>`}</div></section>` }).join('')}</div>` }
        function kanbanTaskList(rows) { return `<div class="task-list-v2"><table><thead><tr><th>Task No.</th><th>Subject</th><th>Department</th><th>Owner</th><th>Priority</th><th>Due Date</th><th>Status</th></tr></thead><tbody>${rows.map(t=>`<tr><td><button class="case-link" onclick="selectKanbanTask('${t[8]}')">${t[8]}</button></td><td>${t[0]}</td><td>${t[3]}</td><td>${t[4]}</td><td>${pill(t[5])}</td><td class="${taskDeadlineState(t)?'deadline-warning':''}">${t[6]}${taskDeadlineState(t)?`<div class="sub deadline-warning">${taskDeadlineState(t)}</div>`:''}</td><td>${pill(kanbanStatus(t))}</td></tr>`).join('')}</tbody></table></div>` }
        function kanbanInspector(t) { if (!t) return `<aside class="task-inspector"><div class="case-empty">Select a Task to view its details.</div></aside>`; let status = kanbanStatus(t), c = selectedCaseData(), assigned = taskAssignmentDate(t), files = [...(S.attachments[t[8]] || []).map(x=>x.name),...(c.attachments || [])].slice(0,2), comments = (S.comments[t[8]] || []).slice(-2), canUpdate = canUpdateTask(t), canAssign = canAssignFromDetail(t); if (!comments.length) comments = [{author:'Sofia Lind',text:'Shipment information checked against the customer attachment.',at:'10/10/2026, 09:15'}]; return `<aside class="task-inspector"><div class="task-inspector-scroll"><div class="task-inspector-head"><div data-aa-style="aa-static-style-43"><span class="id">${t[8]}</span>${pill(status)}<button class="link" data-aa-style="aa-static-style-41" onclick="openTask('${t[8]}')">Open full Task</button></div><h2>${t[0]}</h2></div><section class="task-inspector-section"><h3>What needs to be done</h3><p class="sub">${taskInstruction(t)}</p></section><section class="task-inspector-section"><div data-aa-style="aa-static-style-44"><h3>Task Details</h3>${S.role==='Admin'?`<button class="link" onclick="openEditor('task','${t[8]}')">✎ Edit</button>`:''}</div><div class="task-inspector-kv"><span>Department</span><strong>${t[3]}</strong><span>Owner</span><strong>${t[4]} ${canAssign?`<button class="link" onclick="openTaskAssignment('${t[8]}')">${t[4]==='Unassigned'?'Assign':'Reassign'} Task</button>`:''}</strong><span>Priority</span><strong>${pill(t[5])}</strong><span>Assigned</span><strong>${assigned}</strong><span>Due</span><strong class="${taskDeadlineState(t)?'deadline-warning':''}">${t[6]} ${taskDeadlineState(t)?`· ${taskDeadlineState(t)}`:''}</strong><span>Category</span><strong>${t[9]}</strong></div></section><section class="task-inspector-section"><h3>Dependencies</h3><div class="notice ${status!=='Blocked'?'green':''}" data-aa-style="aa-static-style-45"><strong>${status==='Blocked'?'Blocked by operational confirmation':'✓ No blocking dependencies'}</strong></div></section><section class="task-inspector-section"><h3>Attachments (${files.length})</h3>${files.length?files.map(f=>`<button class="task-file" onclick="downloadAttachment('${f}')"><span>▧ ${f}</span><span>⋯</span></button>`).join(''):'<span class="sub">No attachments</span>'}</section><section class="task-inspector-section"><h3>Recent Comments (${comments.length})</h3>${comments.map(x=>`<div class="task-comment-mini"><span class="avatar">${casePersonInitials(x.author)}</span><div><strong>${x.author}</strong><p>${x.text}</p><span class="sub">${x.at}</span></div></div>`).join('')}</section>${status==='Completed'?`<div class="case-note"><strong>${completionOutcome(t) || 'Completed'}</strong><br>Completion details are retained inside the Task and Case Activity.</div>`:''}</div>${canUpdate?`<div class="task-inspector-actions"><select id="task-status-select" aria-label="New Task status">${TASK_WORKFLOW_STATUSES.map(x=>`<option ${status===x?'selected':''}>${x}</option>`).join('')}</select><textarea id="task-status-comment" placeholder="Comment required when changing status"></textarea><button class="btn primary" onclick="updateTaskStatus('${t[8]}')">Update Status</button></div>`:''}</aside>` }
        function kanbanCommand(rows) { let all = selectedCaseTasks(), departments = [...new Set(all.map(t=>t[3]))], priorities = ['Urgent', 'High', 'Medium', 'Low'], owners = [...new Set(all.map(t=>t[4]))]; return `<div class="task-command"><div class="task-command-title"><h2>Case Tasks</h2><span class="sub">Work required to complete this Case</span></div><div class="task-view-toggle"><button class="${(S.caseTaskView||'Board')==='Board'?'active':''}" onclick="setCaseTaskView('Board')">Board</button><button class="${S.caseTaskView==='List'?'active':''}" onclick="setCaseTaskView('List')">List</button></div><input class="task-command-search" value="${editorText(S.kanbanQuery||'')}" onchange="setKanbanFilter('kanbanQuery',this.value)" onkeyup="if(event.key==='Enter')setKanbanFilter('kanbanQuery',this.value)" placeholder="Search Tasks…"><select onchange="setKanbanFilter('kanbanDepartment',this.value)"><option>All Departments</option>${departments.map(x=>`<option ${S.kanbanDepartment===x?'selected':''}>${x}</option>`).join('')}</select><select onchange="setKanbanFilter('kanbanPriority',this.value)"><option>All Priorities</option>${priorities.map(x=>`<option ${S.kanbanPriority===x?'selected':''}>${x}</option>`).join('')}</select><button class="btn" onclick="S.kanbanMore=!S.kanbanMore;render()">More Filters⌄</button>${S.role==='Admin'?`<button class="btn primary" onclick="openEditor('newTask','${selectedCaseData().id}')">+ Add Task</button>`:''}</div>${S.kanbanMore?`<div class="case-strip" data-aa-style="aa-static-style-46"><label class="sub">Owner <select data-aa-style="aa-static-style-47" onchange="setKanbanFilter('kanbanOwner',this.value)"><option>All Owners</option>${owners.map(x=>`<option ${S.kanbanOwner===x?'selected':''}>${x}</option>`).join('')}</select></label><label class="sub">Deadline <select data-aa-style="aa-static-style-47" onchange="setKanbanFilter('kanbanDeadline',this.value)"><option>All Deadlines</option><option ${S.kanbanDeadline==='Due Today'?'selected':''}>Due Today</option><option ${S.kanbanDeadline==='Overdue'?'selected':''}>Overdue</option></select></label><button class="btn" onclick="S.kanbanOwner='All Owners';S.kanbanDeadline='All Deadlines';render()">Clear</button></div>`:''}` }
        caseTasksV2 = function () { let rows = kanbanFilteredTasks(); S.caseTaskView = S.caseTaskView || 'Board'; let selected = taskById(S.kanbanTaskId); if (!selected || selected[1] !== selectedCaseData().id || !rows.includes(selected)) { selected = rows[0] || null; S.kanbanTaskId = selected?.[8] || null } return `${kanbanCommand(rows)}${S.caseTaskView==='List'?kanbanTaskList(rows):`<div class="kanban-shell">${kanbanBoard(rows)}${kanbanInspector(selected)}</div>`}` }
        function beginTaskDrag(event, id) { let t = taskById(id); if (!t || !canUpdateTask(t)) { event.preventDefault(); toast('Only the assigned Task owner or Admin can move this Task'); return } S.dragTaskId = id; event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', id); event.currentTarget.classList.add('dragging') }
        function endTaskDrag(event) { event.currentTarget.classList.remove('dragging'); document.querySelectorAll('.kanban-column').forEach(x => x.classList.remove('drop-target','drop-denied')); S.dragTaskId = null }
        function allowTaskDrop(event, status) { let t = taskById(S.dragTaskId || event.dataTransfer.getData('text/plain')); if (!t || !canUpdateTask(t)) return; event.preventDefault(); event.dataTransfer.dropEffect = 'move'; event.currentTarget.classList.toggle('drop-target', kanbanStatus(t) !== status); event.currentTarget.classList.toggle('drop-denied', kanbanStatus(t) === status) }
        function leaveTaskDrop(event) { if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.classList.remove('drop-target','drop-denied') }
        function dropTaskInColumn(event, status) { event.preventDefault(); event.currentTarget.classList.remove('drop-target','drop-denied'); let id = event.dataTransfer.getData('text/plain') || S.dragTaskId, t = taskById(id); S.dragTaskId = null; if (!t || !canUpdateTask(t)) { toast('You do not have permission to move this Task'); return } let from = kanbanStatus(t); if (from === status) { toast(`${id} is already ${status}`); return } if (!TASK_WORKFLOW_STATUSES.includes(status)) { toast('Invalid Task status'); return } S.kanbanMove = {id,from,to:status}; S.editorType = 'kanbanMove'; S.editorDirty = false; render() }
        function cancelKanbanMove() { S.kanbanMove = null; S.editorType = null; render() }
        function applyKanbanStatus(id, next, comment) { let t = taskById(id); if (!t || !canUpdateTask(t)) { toast('Only the assigned Task owner or Admin can change status'); return false } if (!TASK_WORKFLOW_STATUSES.includes(next)) { toast('Select Pending, In Progress, Blocked, or Completed'); return false } let previous = kanbanStatus(t); if (next === previous) { toast('Select a different status'); return false } if (!String(comment || '').trim()) { toast('A comment is required when changing status'); return false } let at = '10/10/2026, 10:30', author = actorName(), note = String(comment).trim(); t[7] = next; (S.comments[id] = S.comments[id] || []).push({author,text:`Status changed from ${previous} to ${next}: ${note}`,at,statusChange:true}); (TASK_STATUS_HISTORY[id] = TASK_STATUS_HISTORY[id] || []).unshift({from:previous,to:next,comment:note,author,at}); S.activities.unshift([`${id} status changed from ${previous} to ${next}`,author,at]); if (next === 'Completed') TASK_COMPLETIONS[id] = {at,by:author}; else delete TASK_COMPLETIONS[id]; return true }
        function confirmKanbanMove() { let move = S.kanbanMove, comment = document.getElementById('kanban-move-comment')?.value?.trim(); if (!move) return; if (!comment) { toast('A comment is required when changing status'); return } if (!applyKanbanStatus(move.id,move.to,comment)) return; S.kanbanTaskId = move.id; S.kanbanMove = null; S.editorType = null; render(); toast(`${move.id} moved to ${move.to}`) }
        updateTaskStatus = function (id) { let next = document.getElementById('task-status-select')?.value, comment = document.getElementById('task-status-comment')?.value?.trim(); if (!applyKanbanStatus(id,next,comment)) return; render(); toast(`${id} moved to ${next}`) }
        kanbanCard = function (t) { let status = kanbanStatus(t), deadline = taskDeadlineState(t), comments = (S.comments[t[8]] || []).length, files = (S.attachments[t[8]] || []).length, owner = t[4] || 'Unassigned', selected = S.kanbanTaskId === t[8], draggable = canUpdateTask(t), isBlocked = unresolvedDependencies(t).length > 0, isBlocking = blockingTasks(t).length > 0, calendarIcon = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-1px"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4M8 3v4M3 10h18"></path></svg>'; return `<article class="kanban-card ${selected?'selected':''}" draggable="${draggable}" aria-label="${t[8]} ${t[0]}. ${status}.${draggable?' Drag to change status.':''}" onclick="selectKanbanTask('${t[8]}')" ondragstart="beginTaskDrag(event,'${t[8]}')" ondragend="endTaskDrag(event)"><button class="case-link" onclick="event.stopPropagation();selectKanbanTask('${t[8]}')">${t[8]}</button><h3>${t[0]}</h3><div class="kanban-card-line"><span class="avatar">${owner==='Unassigned'?'—':casePersonInitials(owner)}</span><strong>${owner}</strong><span data-aa-style="aa-static-style-41">${pill(t[5])}</span></div>${owner==='Unassigned'?'':`<div class="sub">Assigned ${taskAssignmentDate(t)}</div>`}<div class="kanban-card-line"><span>${pill(t[3])}</span></div><div class="kanban-card-line ${deadline?'deadline-warning':''}"><span>${calendarIcon}</span><span>${deadline ? `${deadline}, ` : 'Due '}${t[6]}</span></div>${isBlocked||isBlocking?`<div class="condition-row">${isBlocked?'<span class="task-condition red">Blocked</span>':''}${isBlocking?'<span class="task-condition amber">Blocking</span>':''}</div>`:''}<div class="kanban-card-foot"><span>◯ ${comments}</span><span>▧ ${files}</span><span>↗ ${status==='Pending'?'1':'0'}</span></div></article>` }
        kanbanBoard = function (rows) { return `<div class="kanban-board">${TASK_WORKFLOW_STATUSES.map(status => { let cards = rows.filter(t => kanbanStatus(t) === status); return `<section class="kanban-column" data-status="${status}" aria-label="${status} Tasks drop zone" ondragover="allowTaskDrop(event,'${status}')" ondragleave="leaveTaskDrop(event)" ondrop="dropTaskInColumn(event,'${status}')"><div class="kanban-column-head"><i class="kanban-dot"></i><span>${status} (${cards.length})</span></div><div class="kanban-cards">${cards.length?cards.map(kanbanCard).join(''):`<div class="kanban-empty">No ${status.toLowerCase()} Tasks<br><span class="sub">Drop a Task here</span></div>`}</div></section>` }).join('')}</div>` }
        const statusKanbanCommand = kanbanCommand, statusKanbanBoard = kanbanBoard, statusKanbanCard = kanbanCard;
        kanbanCard = function (t) { let html = statusKanbanCard(t); if ((S.kanbanGroup || 'Status') !== 'Department') return html; return html.replace('draggable="true"','draggable="false"').replace(`>${t[8]}</button>`,`>${t[8]}</button><span data-aa-style="aa-static-style-40">${pill(kanbanStatus(t))}</span>`).replace('<span class="drag-help">Drag to move</span>','') }
        kanbanBoard = function (rows) { if ((S.kanbanGroup || 'Status') !== 'Department') return statusKanbanBoard(rows); let departments = [...new Set(selectedCaseTasks().map(t => t[3]))]; return `<div class="kanban-board">${departments.map(department => { let cards = rows.filter(t => t[3] === department); return `<section class="kanban-column" aria-label="${department} Tasks"><div class="kanban-column-head" data-aa-style="aa-static-style-48"><i class="kanban-dot"></i><span>${department} (${cards.length})</span></div><div class="kanban-cards">${cards.length ? cards.map(kanbanCard).join('') : `<div class="kanban-empty">No Tasks in ${department}</div>`}</div></section>` }).join('')}</div>` }
        const caseViewWithActions = caseView;
        caseView = function () { return caseViewWithActions().replace('<button class="btn" onclick="openCaseActions()">More Actions⌄</button>', '') }
        kanbanCommand = function () { let all = selectedCaseTasks(), departments = (typeof ALL_DEPTS !== 'undefined' ? ALL_DEPTS : (window.ALL_DEPTS || ['Warehouse','Inbound/Outbound','Transport','Freight forwarding','Packing','Finance','Sales'])), priorities = ['Urgent', 'High', 'Medium', 'Low'], group = S.kanbanGroup || 'Status'; return `<div class="task-command"><input class="task-command-search" value="${editorText(S.kanbanQuery||'')}" onchange="setKanbanFilter('kanbanQuery',this.value)" onkeyup="if(event.key==='Enter')setKanbanFilter('kanbanQuery',this.value)" placeholder="Search Tasks…"><div class="task-view-toggle"><button class="${(S.caseTaskView||'Board')==='Board'?'active':''}" onclick="setCaseTaskView('Board')">Board</button><button class="${S.caseTaskView==='List'?'active':''}" onclick="setCaseTaskView('List')">List</button></div>${(S.caseTaskView||'Board')==='Board'?`<select aria-label="Group Tasks by" onchange="S.kanbanGroup=this.value;render()"><option value="Status" ${group==='Status'?'selected':''}>Group by Status</option><option value="Department" ${group==='Department'?'selected':''}>Group by Department</option></select>`:''}<select aria-label="Department filter" onchange="setKanbanFilter('kanbanDepartment',this.value)"><option>All Departments</option>${departments.map(x=>`<option ${S.kanbanDepartment===x?'selected':''}>${x}</option>`).join('')}</select><select aria-label="Priority filter" onchange="setKanbanFilter('kanbanPriority',this.value)"><option>All Priorities</option>${priorities.map(x=>`<option ${S.kanbanPriority===x?'selected':''}>${x}</option>`).join('')}</select>${S.role==='Admin'?`<button class="btn primary" onclick="openEditor('newTask','${selectedCaseData().id}')">+ Add Task</button>`:''}</div>` }
        function adminInlineTaskUpdate(id, field, value) { let t = taskById(id); if (S.role !== 'Admin' || !t) return; let indexes = { title:0, department:3, assignee:4, priority:5, due:6, status:7, taskType:9 }, index = indexes[field], previous = t[index]; if (index === undefined || previous === value || !String(value).trim()) return; if (field === 'due') value = displayDateValue(value); t[index] = value; if (field === 'assignee') { let owner = USERS.find(u => u.name === value); if (owner) t[3] = owner.department; TASK_ASSIGNMENTS[id] = { assignedTo:value, assignedBy:actorName(), assignedAt:'13/10/2026, 10:15', classification:t[9], previousOwner:previous, reason:'Updated directly by Admin' } } let note = `${field === 'assignee' ? 'Assignee' : field === 'taskType' ? 'Task type' : field.charAt(0).toUpperCase()+field.slice(1)} changed from ${previous} to ${value}`; let at='13/10/2026, 10:15',author=actorName(); S.activities.unshift([`${id} · ${note}`,author,at]); (S.taskActivity[id]=S.taskActivity[id]||[]).unshift({text:note,author,at}); render(); toast(`${id} updated`) }
        S.taskActivity = S.taskActivity || {};
        function mentionText(value) { let html = editorText(value); USERS.forEach(u => { let name = editorText(u.name); html = html.split(`@${name}`).join(`<span class="mention-tag">@${name}</span>`) }); html = html.replace(/#(TASK-\d+)/g, (m, id) => taskById(id) ? `<span class="mention-tag" role="button" tabindex="0" title="Open ${id}" onclick="openTaskContext('${id}')" style="cursor:pointer;text-decoration:underline">#${id}</span>` : m); return html }
        function toggleCommentPin(id, index) { let c = S.comments[id]?.[index]; if (c) { c.pinned = !c.pinned; render() } }
        function deleteComment(id, index) { let list = S.comments[id]; if (!list || !list[index]) return; list.splice(index, 1); render(); toast('Comment deleted') }
        function replyToComment(id, author) { let box = document.getElementById('task-comment'); if (!box) return; let mention = `@${author} `; if (!box.value.startsWith(mention)) box.value = mention + box.value; box.focus(); box.setSelectionRange?.(box.value.length, box.value.length) }
        function taskCommentItem(c, id, locked, index) { let pinned = !!c.pinned; return `<div class="task-comment-item${pinned ? ' is-pinned' : ''}"><span class="avatar">${casePersonInitials(c.author)}</span><div class="task-comment-body"><div class="task-comment-head"><strong>${editorText(c.author)}</strong><span class="task-comment-time">${c.at}</span>${pinned ? '<span class="task-comment-pin-tag">Pinned</span>' : ''}</div><p class="task-comment-text">${mentionText(c.text)}</p>${locked ? '' : `<div class="task-comment-actions"><button type="button" onclick="replyToComment('${id}','${editorText(c.author).replace(/'/g, "\\'")}')">Reply</button>${pinButton(pinned,`toggleCommentPin('${id}',${index})`)}<button type="button" class="task-comment-delete" onclick="deleteComment('${id}',${index})">Delete</button></div>`}</div></div>` }
        taskComments = function (id) { let seed = {author:'Sofia Lind',text:'Shipment information has been checked against the customer attachment.',at:'07/10/2026, 09:42'}, items = ((S.comments&&S.comments[id])||[]).map((c,i)=>({c,i})), pinned = items.filter(x=>x.c.pinned); return `<div class="task-comment-list">${pinned.length?`<div class="task-comment-pinned">${pinned.map(x=>taskCommentItem(x.c,id,false,x.i)).join('')}</div>`:''}${taskCommentItem(seed,id,true,-1)}${items.map(x=>taskCommentItem(x.c,id,false,x.i)).join('')}</div>${taskAttachments(id)}` }
        function isMentionField(el) { let hint = `${el.id||''} ${el.placeholder||''}`.toLowerCase(); return (el.matches('textarea,input[type="text"],input:not([type])') && (/comment|mention|internal/.test(hint) || (S.editorType==='compose' && S.editorData?.mode==='Internal Note'))) }
        function closeMentionMenu() { document.getElementById('mention-menu')?.remove() }
        function insertMention(value, trigger) { let menu=document.getElementById('mention-menu'), el=menu?._mentionInput; if(!el)return; let cursor=el.selectionStart??el.value.length, before=el.value.slice(0,cursor), start=before.lastIndexOf(trigger); el.value=el.value.slice(0,start)+`${trigger}${value} `+el.value.slice(cursor); let next=start+trigger.length+value.length+1; el.focus(); el.setSelectionRange?.(next,next); el.dispatchEvent(new Event('input',{bubbles:true})); closeMentionMenu() }
        function updateMentionMenu(el) {
  if(!isMentionField(el)){closeMentionMenu();return}
  let cursor=el.selectionStart??el.value.length, before=el.value.slice(0,cursor);
  let userMatch=before.match(/@([^@\n]*)$/), taskMatch=before.match(/#([^#\n]*)$/);
  let view=null;
  if(taskMatch && (!userMatch || taskMatch.index > userMatch.index)) {
    let caseId=(S.drawer && S.selectedTask && taskById(S.selectedTask)?.[1]) || S.selectedCase, query=taskMatch[1].trim().toLowerCase();
    let tasks=TASKS.filter(t=>t[1]===caseId && (!query || t[8].toLowerCase().includes(query) || String(t[0]).toLowerCase().includes(query))).slice(0,8);
    if(!tasks.length){closeMentionMenu();return}
    view={trigger:'#', title:'Link a Task', rows:tasks.map(t=>({value:t[8], name:`${t[8]} · ${t[0]}`, sub:`${t[3]} · ${effectiveTaskStatus(t)}`, avatar:'#'}))};
  } else if(userMatch) {
    let query=userMatch[1].trim().toLowerCase(), people=USERS.filter(u=>u.id!==currentUser()?.id&&(!query||u.name.toLowerCase().includes(query))).slice(0,8);
    if(!people.length){closeMentionMenu();return}
    view={trigger:'@', title:'Tag a colleague', rows:people.map(u=>({value:u.name, name:u.name, sub:`${u.department} · ${u.title}`, avatar:casePersonInitials(u.name)}))};
  } else {closeMentionMenu();return}
  let menu=document.getElementById('mention-menu'); if(!menu){menu=document.createElement('div');menu.id='mention-menu';menu.className='mention-menu';document.body.appendChild(menu)}
  let rect=el.getBoundingClientRect(); menu.style.left=`${Math.min(rect.left,window.innerWidth-310)}px`; menu.style.top=`${Math.min(rect.bottom+4,window.innerHeight-280)}px`; menu.style.width=`${Math.min(Math.max(rect.width,260),360)}px`;
  menu.innerHTML=`<div class="mention-menu-title">${view.title}</div>${view.rows.map(r=>`<button type="button" onmousedown="event.preventDefault();insertMention('${r.value.replace(/'/g,"\'")}','${view.trigger}')"><span class="avatar">${r.avatar}</span><span><strong>${editorText(r.name)}</strong><small>${editorText(r.sub)}</small></span></button>`).join('')}`;
  menu._mentionInput=el;
}
        document.addEventListener('input',event=>updateMentionMenu(event.target));
        document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMentionMenu()});
        document.addEventListener('click',event=>{if(!event.target.closest('#mention-menu')&&!isMentionField(event.target))closeMentionMenu()});
        const mentionCommunicationOpen = openCommunication;
        openCommunication = function (mode, replyTo=null) { let draft=document.getElementById('case-comment-v2')?.value?.trim(); mentionCommunicationOpen(mode,replyTo); if(mode==='Internal Note'&&draft&&S.editorData){S.editorData.body=draft;render()} }
        document.head.insertAdjacentHTML('beforeend',`<style>.mention-menu{position:fixed;z-index:5000;background:#fff;border:1px solid var(--line);border-radius:7px;box-shadow:0 10px 30px rgba(16,36,58,.18);padding:6px;max-height:270px;overflow:auto}.mention-menu-title{padding:7px 9px;color:var(--muted);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}.mention-menu button{width:100%;display:flex;align-items:center;gap:9px;border:0;background:#fff;border-radius:5px;padding:8px;text-align:left;color:var(--ink)}.mention-menu button:hover{background:#eef6fd}.mention-menu button span:last-child{display:flex;flex-direction:column}.mention-menu button small{color:var(--muted);margin-top:2px}.mention-tag{display:inline-block;background:#e6f2ff;color:#086bb8;border-radius:4px;padding:1px 5px;font-weight:700}.admin-inline-task input,.admin-inline-task select{width:100%;min-height:38px;border:1px solid var(--line);border-radius:5px;background:#fff;padding:7px 9px}
.rvf-select:not([hidden]) {
    display: block;
    width: 100%;
    height: 38px;
    border: 1px solid var(--line, #dce4ec);
    border-radius: 4px;
    padding: 0 10px;
    font: 500 13px Inter, sans-serif;
    color: var(--ink, #14233a);
    background: #fff;
    cursor: pointer;
    box-sizing: border-box;
}
.rvf-select:focus {
    outline: 2px solid rgba(8, 119, 209, 0.2);
    border-color: var(--blue, #0877d1);
}
.rvf-select[hidden], select[hidden] {
    display: none !important;
    visibility: hidden !important;
}

</style>`)
        function highlightRenderedMentions() { let root=document.getElementById('root'); if(!root)return; let walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT), nodes=[]; while(walker.nextNode())nodes.push(walker.currentNode); nodes.forEach(node=>{if(node.parentElement?.closest('.mention-tag,input,textarea,script,style'))return; let name=USERS.find(u=>node.nodeValue.includes(`@${u.name}`)); if(!name)return; let html=mentionText(node.nodeValue); if(html===editorText(node.nodeValue))return; let span=document.createElement('span');span.innerHTML=html;node.replaceWith(...span.childNodes)}) }
        S.mentionNotifications = S.mentionNotifications || [];
        function createMentionNotifications(text, taskId, caseId) { let from=currentUser(); USERS.filter(u=>u.id!==from.id&&String(text).includes(`@${u.name}`)).forEach(u=>S.mentionNotifications.unshift({id:`MENTION-${Date.now()}-${u.id}`,recipientId:u.id,from:from.name,taskId,caseId,comment:text,at:'13/10/2026, 10:30',read:false})); if(S.mentionNotifications.some(n=>!n.read))S.notificationsRead=false }
        function setNoteSort(v){S.noteSort=v;render()}
function postInternalComment() { let input=document.getElementById('case-comment-v2'), value=(input?.value ?? S.commentDraft ?? '').trim(), caseId=S.selectedCase, files=S.commentFilesCase===caseId?(S.commentFiles||[]):[]; if(!value&&!files.length){toast('Write a comment or attach a file first');input?.focus();return} let author=actorName(), at=typeof auditTimestamp==='function'?auditTimestamp():'15/10/2026, 12:00'; S.notes.push({nid:'N'+Date.now().toString(36)+Math.random().toString(36).slice(2,7),text:value,author,at,caseId,replyTo:S.noteReplyTo||null,attachments:files.map(f=>({...f}))});S.noteReplyTo=null; if(value)createMentionNotifications(value,null,caseId); S.activities.unshift([`Internal comment added to ${caseId}${files.length?` with ${files.length} ${files.length===1?'attachment':'attachments'}`:''}`,author,at]); S.commentDraft=''; S.commentFiles=[]; S.commentFilesCase=null; closeMentionMenu(); render(); toast('Comment added') }
        function removeCommentFile(i) { if(S.commentFiles) S.commentFiles.splice(i,1); if(!S.commentFiles||!S.commentFiles.length) S.commentFilesCase=null; render() }
        function deleteNoteAttachment(ni,ai) { let n=S.notes[ni], f=n?.attachments?.[ai]; if(!f) return; if(!window.confirm('Delete attachment "'+f.name+'"? This cannot be undone.')) return; n.attachments.splice(ai,1); toast('Attachment deleted'); render() }
        function addKanbanQuickComment(id) { let box=document.getElementById('quick-task-comment'), value=box?.value?.trim(), t=taskById(id); if(!value||!t){toast('Write a comment first');return} let at='13/10/2026, 10:30', author=actorName(); (S.comments[id]=S.comments[id]||[]).push({author,text:value,at}); createMentionNotifications(value,id,t[1]); S.activities.unshift([`Comment added to ${id}`,author,at]); render(); toast('Comment added') }
        const mentionNotificationCommentBase = addTaskComment;
        addTaskComment = function (id) { let value=document.getElementById('task-comment')?.value?.trim(), t=taskById(id); if(value&&t)createMentionNotifications(value,id,t[1]); mentionNotificationCommentBase(id) }
        const mentionNotificationSendBase = sendCommunication;
        sendCommunication = function () { let data={...S.editorData}; if(data.mode==='Internal Note'&&data.body?.trim())createMentionNotifications(data.body,null,S.selectedCase); mentionNotificationSendBase() }
        const quickCommentInspectorBase = kanbanInspector;
        kanbanInspector = function (t) { let html=quickCommentInspectorBase(t); if(!t)return html; let composer=`<div class="task-inspector-actions"><strong>Quick Comment</strong><textarea id="quick-task-comment" placeholder="Add a comment, @ to mention or # to link a task"></textarea><button class="btn primary" onclick="addKanbanQuickComment('${t[8]}')">Add Comment</button></div>`; return /<div class="task-inspector-actions">[\s\S]*?<\/div><\/aside>$/.test(html)?html.replace(/<div class="task-inspector-actions">[\s\S]*?<\/div><\/aside>$/,composer+'</aside>'):html.replace('</aside>',composer+'</aside>') }
        const mentionNotificationCountBase = notificationCount;
        notificationCount = function () { return mentionNotificationCountBase()+S.mentionNotifications.filter(n=>n.recipientId===currentUser().id&&!n.read).length }
        function openMentionNotification(id) { let n=S.mentionNotifications.find(x=>x.id===id); if(!n)return; n.read=true; S.notificationMenu=false; if(n.taskId){let t=taskById(n.taskId);S.selectedCase=t?.[1]||n.caseId;S.selectedTask=n.taskId;S.kanbanTaskId=n.taskId;S.page='case';S.caseTab='Tasks';S.drawer=true}else if(n.caseId){S.selectedCase=n.caseId;S.page='case';S.caseTab='Communication'} render() }
        function markAllNotifications() { S.mentionNotifications.filter(n=>n.recipientId===currentUser().id).forEach(n=>n.read=true);S.notificationsRead=true;S.notificationMenu=false;render() }
        const mentionNotificationMenuBase = notificationMenu;
        notificationMenu = function () { let items=S.mentionNotifications.filter(n=>n.recipientId===currentUser().id), html=mentionNotificationMenuBase(); let mentions=items.map(n=>`<button onclick="openMentionNotification('${n.id}')" style="${n.read?'':'background:#eef6fd'}"><strong>${n.from} mentioned you</strong><small>${n.taskId||n.caseId} · ${mentionText(n.comment)}</small></button>`).join(''); html=html.replace('<div class="drop-menu">','<div class="drop-menu">'+mentions); return html.replace('S.notificationsRead=true;S.notificationMenu=false;render()','markAllNotifications()') }
        const mentionAwareRender = render;
        render = function () { mentionAwareRender(); queueMicrotask(highlightRenderedMentions) }
        selectKanbanTask = function (id) { S.kanbanTaskId=id; openTask(id) }
        caseTasksV2 = function () { let rows=kanbanFilteredTasks(); S.caseTaskView=S.caseTaskView||'Board'; return `${kanbanCommand(rows)}${S.caseTaskView==='List'?kanbanTaskList(rows):`<div class="kanban-shell full-board">${kanbanBoard(rows)}</div>`}` }
        document.head.insertAdjacentHTML('beforeend',`<style>.kanban-shell.full-board{display:block;min-height:590px}.kanban-shell.full-board .kanban-board{min-height:590px}.drawer{left:60vw;right:0;width:auto;max-width:none;border-left:1px solid var(--line);border-right:0;box-shadow:-10px 0 30px rgba(19,39,62,.2);padding:28px clamp(24px,3vw,52px);overflow-y:auto;overflow-x:hidden}.drawer-bg{inset:64px 0 0 224px;background:rgba(8,29,49,.28)}.drawer>.page-head,.drawer>.notice,.drawer>.info-card,.drawer>.card,.drawer>.actions{max-width:900px;margin-left:auto;margin-right:auto}.drawer .admin-inline-task{margin-top:14px!important}@media(max-width:1100px){.drawer{left:18vw;right:0}}@media(max-width:760px){.drawer{left:0;right:0;padding:20px}.drawer-bg{inset:64px 0 0 0}}</style>`)
        S.taskDescriptions = S.taskDescriptions || {};
        const taskDescriptionInstructionBase = taskInstruction;
        taskInstruction = function (t) { return S.taskDescriptions[t[8]] || taskDescriptionInstructionBase(t) }
        const assignedTaskOpenBase = openEditor;
        openEditor = function (type,id=null) { assignedTaskOpenBase(type,id); if(type==='newTask'&&S.editorType){Object.assign(S.editorData,{description:'',assignee:'Automatic routing',due:dateInputValue(S.editorData.due)});render()} }
        const assignedTaskEditorBase = editorDialog;
        editorDialog = function () { if(S.editorType!=='newTask')return assignedTaskEditorBase(); let d=S.editorData, classes=Object.keys(TASK_ROUTING), people=USERS.filter(u=>u.role!=='Admin'); return `<div class="modal-shade"><div class="assign-modal"><h2>Add Task</h2><div class="body"><div class="editor-grid"><label class="wide">Task name<input value="${editorText(d.title||'')}" oninput="editField('title',this.value)" placeholder="Enter a clear Task name"></label><label class="wide">Description<textarea data-aa-style="aa-static-style-53" oninput="editField('description',this.value)" placeholder="Describe what needs to be done and the expected outcome">${editorText(d.description||'')}</textarea></label>${choice('Task category','taskType',d.taskType||'Transport booking',classes,true)}<label>Assign to<select onchange="editField('assignee',this.value)"><option ${d.assignee==='Automatic routing'?'selected':''}>Automatic routing</option><option ${d.assignee==='Unassigned'?'selected':''}>Unassigned</option>${people.map(u=>`<option value="${editorText(u.name)}" ${d.assignee===u.name?'selected':''}>${editorText(u.name)} · ${editorText(u.department)}</option>`).join('')}</select></label>${choice('Priority','priority',d.priority||'Medium',['Urgent', 'High', 'Medium', 'Low'])}<label>Due date<input type="date" value="${d.due||''}" onchange="editField('due',this.value)"></label></div><div class="notice green" data-aa-style="aa-static-style-14"><strong>${d.assignee==='Automatic routing'?'Automatic routing':d.assignee==='Unassigned'?'Task will remain unassigned':`Assign directly to ${editorText(d.assignee||'')}`}</strong><br><span class="sub">${d.assignee==='Automatic routing'?'The owner will be selected from Task category and User Master.':'The Admin selection overrides automatic routing for this Task.'}</span></div></div><div class="footer"><button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" onclick="saveEditor()">Create Task</button></div></div></div>` }
        const assignedTaskSaveBase = saveEditor;
        saveEditor = function () { if(S.editorType!=='newTask'){assignedTaskSaveBase();return} let d={...S.editorData}; if(!d.title?.trim()){toast('Enter a Task name');return} if(!d.description?.trim()){toast('Enter a Task description');return} if(!d.due){toast('Select a due date');return} let number=Math.max(...TASKS.map(t=>Number(String(t[8]).split('-')[1])||0))+1, id=`TASK-${number}`, routed=routedOwner(d.taskType), selected=USERS.find(u=>u.name===d.assignee), owner=d.assignee==='Unassigned'?null:selected||routed, department=owner?.department||routed?.department||'Uncategorized', ownerName=owner?.name||'Unassigned', due=displayDateValue(d.due); TASKS.push([d.title.trim(),d.caseId,d.customer,department,ownerName,d.priority,due,'Pending',id,d.taskType,'Later']);S.taskDescriptions[id]=d.description.trim();if(owner)TASK_ASSIGNMENTS[id]={assignedTo:ownerName,assignedBy:actorName(),assignedAt:'13/10/2026, 10:45',classification:d.taskType,previousOwner:'Unassigned',reason:selected?'Assigned directly during Task creation':'Automatic routing from User Master'};S.activities.unshift([`${id} created${owner?` and assigned to ${ownerName}`:' as unassigned'}`,actorName(),'13/10/2026, 10:45']);S.editorType=null;S.editorData={};render();toast(`${id} created${owner?` · ${ownerName}`:' · Unassigned'}`) }
        const editableDescriptionUpdateBase = adminInlineTaskUpdate;
        adminInlineTaskUpdate = function (id,field,value) { if(field!=='description'){editableDescriptionUpdateBase(id,field,value);return} if(S.role!=='Admin'||!String(value).trim())return;S.taskDescriptions[id]=String(value).trim();S.activities.unshift([`${id} · Description updated`,actorName(),'13/10/2026, 10:46']);render();toast(`${id} updated`) }
        const kanbanEditorBase = editorDialog; editorDialog = function () { if (S.editorType === 'kanbanMove' && S.kanbanMove) { let move = S.kanbanMove, t = taskById(move.id); return `<div class="modal-shade"><div class="assign-modal" data-aa-style="aa-static-style-55"><h2>Update Task Status</h2><div class="body"><p><strong>${t[8]} · ${t[0]}</strong></p><div class="kanban-move-summary"><div><span>Current status</span><strong>${move.from}</strong></div><strong class="kanban-move-arrow">→</strong><div><span>New status</span><strong>${move.to}</strong></div></div><label><strong>Comment</strong><textarea id="kanban-move-comment" data-aa-style="aa-static-style-56" placeholder="Required: explain this status change"></textarea></label><p class="sub">The Task will move to the ${move.to} column after this change is confirmed.</p></div><div class="footer"><button class="btn" onclick="cancelKanbanMove()">Cancel</button><button class="btn primary" onclick="confirmKanbanMove()">Move to ${move.to}</button></div></div></div>` } return kanbanEditorBase() }
        function openTaskContext(taskId) { let t = taskById(taskId); if (!t) return; S.selectedCase = t[1]; S.selectedTask = taskId; S.kanbanTaskId = taskId; S.page = 'case'; S.caseTab = 'Tasks'; S.caseTaskView = 'Board'; S.drawer = true; S.taskTitleEdit = false; render() }
        function rowOnclickArgument(button, functionName) { if (!button) return ''; let source = button.getAttribute('onclick') || '', match = source.match(new RegExp(functionName + "\\('([^']+)'")); return match ? match[1] : '' }
        function resolveRowNavigation(row) { if (!row || row.closest('.compact-order-table') || S.page === 'users' || S.page === 'dashboard') return null; let caseButton = row.querySelector('button[onclick*="openCase("]'), caseIdFromBtn = rowOnclickArgument(caseButton, 'openCase'); if (caseIdFromBtn) return {label:`Open ${caseIdFromBtn}`,run:()=>openCase(caseIdFromBtn)}; let reviewButton = row.querySelector('button[onclick*="openReviewCase("]'), reviewId = rowOnclickArgument(reviewButton, 'openReviewCase'); if (reviewId) return {label:`Review ${reviewId}`,run:()=>openReviewCase(reviewId)}; let acknowledgementButton = row.querySelector('button[onclick*="openAcknowledgementCase("]'), acknowledgementId = rowOnclickArgument(acknowledgementButton, 'openAcknowledgementCase'); if (acknowledgementId) return {label:`Open communication for ${acknowledgementId}`,run:()=>openAcknowledgementCase(acknowledgementId)}; let text = row.textContent || '', taskMatch = text.match(/TASK-\d+/), task = taskMatch && taskById(taskMatch[0]); if (task) return {label:`Open ${task[8]}`,run:()=>openTaskContext(task[8])}; let caseMatch = text.match(/CASE-\d+/) || text.match(/#(\d+)/), caseId = caseMatch ? (caseMatch[1] ? 'CASE-' + caseMatch[1] : caseMatch[0]) : ''; if (caseId && (CASE_DETAILS[caseId] || CASE_DETAILS['#' + caseId.replace('CASE-', '')])) return {label:`Open ${caseId}`,run:()=>{openCase(caseId)}}; return null }
        function rowClickIsInteractive(target, row) { return !!target.closest('button,a,input,select,textarea,label,[role="button"],[contenteditable="true"]') || target !== row && !!target.closest('[data-row-interactive]') }
        function activateRecordRow(event, row, navigation) { if (rowClickIsInteractive(event.target,row)) return; if (event.type === 'click' && String(globalThis.getSelection?.() || '').trim()) return; if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return; if (event.type === 'keydown') event.preventDefault(); navigation.run() }
        function navigationOnlyControl(control) { let text = String(control?.textContent || '').trim().toLowerCase(), source = control?.getAttribute('onclick') || '', labels = ['open','review','open communication','view details']; return labels.includes(text) && /(openTask|openCase|openReviewCase|openAcknowledgementCase|openCommunication|openTaskContext)/.test(source) }
        function removeRedundantActionColumns() { document.querySelectorAll('table').forEach(table => { let header = table.querySelector('thead tr'), rows = [...table.querySelectorAll('tbody tr')]; if (!header || !rows.length) return; let lastHeader = header.lastElementChild, headerText = String(lastHeader?.textContent || '').trim().toLowerCase(); if (headerText !== 'action' && headerText !== '') return; let removedAny = false; rows.forEach(row => { let cell = row.lastElementChild; if (!cell) return; [...cell.querySelectorAll('button,a')].filter(navigationOnlyControl).forEach(control => { control.remove(); removedAny = true }) }); if (!removedAny) return; let hasWorkflowActions = rows.some(row => row.lastElementChild?.querySelector('button,a,input,select')); if (!hasWorkflowActions) { lastHeader.remove(); rows.forEach(row => row.lastElementChild?.remove()); return } rows.forEach(row => { let cell = row.lastElementChild; if (cell && !cell.querySelector('button,a,input,select') && !String(cell.textContent || '').trim()) cell.innerHTML = '<span class="sub">—</span>' }) }) }
        function enableClickableRows() { document.querySelectorAll('table tbody tr').forEach(row => { let navigation = resolveRowNavigation(row); if (!navigation) return; row.classList.add('clickable-record'); row.tabIndex = 0; row.setAttribute('role','link'); row.setAttribute('aria-label',navigation.label); row.title = navigation.label; row.addEventListener('click',event=>activateRecordRow(event,row,navigation)); row.addEventListener('keydown',event=>activateRecordRow(event,row,navigation)); let first = row.querySelector('td'), isTaskRow = /TASK-\d+/.test(row.textContent || ''); if (!isTaskRow && first && !first.querySelector('.row-navigation-hint')) first.insertAdjacentHTML('beforeend','<span class="row-navigation-hint" aria-hidden="true">Open ›</span>') }); removeRedundantActionColumns() }
        S.taskDependencies = S.taskDependencies || {};
        function dependencyIds(id){return S.taskDependencies[id]||[]}
        function dependencyCycle(taskId,candidateId,seen=new Set()){if(candidateId===taskId)return true;if(seen.has(candidateId))return false;seen.add(candidateId);return dependencyIds(candidateId).some(id=>dependencyCycle(taskId,id,seen))}
        function unresolvedDependencies(t){return dependencyIds(t[8]).map(taskById).filter(Boolean).filter(x=>x[7] !== 'Completed')}
        function notifyTaskOwner(t,message){let owner=USERS.find(u=>u.name===t[4]);if(!owner)return;S.mentionNotifications.unshift({id:`DEPENDENCY-${Date.now()}-${owner.id}`,recipientId:owner.id,from:'System',taskId:t[8],caseId:t[1],comment:message,at:'13/10/2026, 11:00',read:false});S.notificationsRead=false}
        function recalculateDependencies(caseId){TASKS.filter(t=>t[1]===caseId&&t[7] !== 'Completed').forEach(t=>{let deps=dependencyIds(t[8]),blocked=unresolvedDependencies(t).length>0;if(blocked&&t[7] !== 'On Hold'){S.dependencyPreviousStatus=S.dependencyPreviousStatus||{};S.dependencyPreviousStatus[t[8]]=t[7];t[7] = 'On Hold';S.activities.unshift([`${t[8]} automatically blocked by a dependency`,'System','13/10/2026, 11:00'])}else if(!blocked&&deps.length&&t[7] === 'On Hold'){t[7] = 'To-Do';S.activities.unshift([`${t[8]} dependencies completed · Task ready`,'System','13/10/2026, 11:00']);notifyTaskOwner(t,`${t[8]} is ready. All blocking dependencies are completed.`)}})}
        function toggleTaskDependency(taskId,dependencyId,checked){let t=taskById(taskId),d=taskById(dependencyId);if(!t||!d||t[1]!==d[1])return;if(checked&&dependencyCycle(taskId,dependencyId)){toast('Circular dependencies are not allowed');render();return}let list=dependencyIds(taskId).filter(id=>id!==dependencyId);if(checked)list.push(dependencyId);S.taskDependencies[taskId]=list;S.activities.unshift([`${taskId} dependencies updated by ${actorName()}`,actorName(),'13/10/2026, 11:00']);(S.taskActivity[taskId]=S.taskActivity[taskId]||[]).unshift({text:(checked?'added a dependency on ':'removed the dependency on ')+dependencyId,author:actorName(),at:auditTimestamp(),type:'update'});recalculateDependencies(t[1]);render();toast('Dependencies updated')}
        function dependencyPanel(t){let candidates=TASKS.filter(x=>x[1]===t[1]&&x[8]!==t[8]),selected=dependencyIds(t[8]),unresolved=unresolvedDependencies(t);return `<div class="card dependency-editor" data-aa-style="aa-static-style-14"><div class="card-head"><div><h2>Dependencies</h2><span class="sub">Anyone working on this Case can update dependencies</span></div>${unresolved.length?pill(`Blocked by ${unresolved.length}`):selected.length?pill('Dependencies completed'):pill('No dependencies')}</div><div class="card-body">${candidates.length?candidates.map(d=>`<label class="dependency-option"><input type="checkbox" ${selected.includes(d[8])?'checked':''} onchange="toggleTaskDependency('${t[8]}','${d[8]}',this.checked)"><span><strong>${d[8]} · ${editorText(d[0])}</strong><small>${editorText(d[3])} · ${editorText(d[4])}</small></span>${pill(kanbanStatus(d))}</label>`).join(''):'<span class="sub">No other Tasks exist in this Case.</span>'}<p class="sub" data-aa-style="aa-static-style-57">All selected Tasks must be completed before this Task can move forward.</p></div></div>`}
        function toggleNewTaskDependency(id,checked){let list=S.editorData.dependencies||[];S.editorData.dependencies=checked?[...new Set([...list,id])]:list.filter(x=>x!==id);render()}
        const dependencyEditorBase=editorDialog;editorDialog=function(){let html=dependencyEditorBase();if(S.editorType!=='newTask')return html;let tasks=TASKS.filter(t=>t[1]===S.editorData.caseId),selected=S.editorData.dependencies||[],block=`<div class="wide"><strong>Dependencies</strong><p class="sub">Select Tasks that must be completed first.</p>${tasks.length?tasks.map(t=>`<label class="dependency-option"><input type="checkbox" ${selected.includes(t[8])?'checked':''} onchange="toggleNewTaskDependency('${t[8]}',this.checked)"><span><strong>${t[8]} · ${editorText(t[0])}</strong><small>${editorText(t[3])} · ${editorText(t[4])}</small></span>${pill(kanbanStatus(t))}</label>`).join(''):'<span class="sub">This will be the first Task in the Case.</span>'}</div>`;return html.replace('</div><div class="notice green" data-aa-style="aa-static-style-14">',block+'</div><div class="notice green" data-aa-style="aa-static-style-14">')}
        const dependencySaveBase=saveEditor;saveEditor=function(){if(S.editorType!=='newTask'){dependencySaveBase();return}let ids=new Set(TASKS.map(t=>t[8])),caseId=S.editorData.caseId,deps=[...(S.editorData.dependencies||[])];dependencySaveBase();let created=TASKS.find(t=>!ids.has(t[8]));if(created){S.taskDependencies[created[8]]=deps;recalculateDependencies(caseId);render()}}
        const dependencyMoveBase=applyKanbanStatus;applyKanbanStatus=function(id,next,comment){let t=taskById(id);if(t&&next!=='Blocked'&&unresolvedDependencies(t).length){toast('Complete the blocking dependencies before moving this Task');return false}let done=dependencyMoveBase(id,next,comment);if(done&&t)recalculateDependencies(t[1]);return done}
        const dependencyAdminUpdateBase=adminInlineTaskUpdate;adminInlineTaskUpdate=function(id,field,value){let t=taskById(id);if(field==='status'&&value!=='Blocked'&&t&&unresolvedDependencies(t).length){toast('Complete the blocking dependencies before changing this status');render();return}dependencyAdminUpdateBase(id,field,value);if(field==='status'&&t){recalculateDependencies(t[1]);render()}}
        const dependencyStatusUpdateBase=updateTaskStatus;updateTaskStatus=function(id){let t=taskById(id);dependencyStatusUpdateBase(id);if(t){recalculateDependencies(t[1]);render()}}
        document.head.insertAdjacentHTML('beforeend',`<style>.dependency-option{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;padding:10px 8px;border-bottom:1px solid var(--line);cursor:pointer}.dependency-option:hover{background:#f5f9fc}.dependency-option input{width:17px;height:17px}.dependency-option span{display:flex;flex-direction:column;gap:3px}.dependency-option small{color:var(--muted)}</style>`)
        document.head.insertAdjacentHTML('beforeend',`<style>.admin-inline-task{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:24px;row-gap:0}.admin-inline-task>.card-head,.admin-inline-task>.card-head+.kv,.admin-inline-task>.card-head+.kv+.kv{grid-column:1/-1}.admin-inline-task>.kv{display:grid;grid-template-columns:1fr;gap:7px;align-content:start;padding:14px 0;border-bottom:1px solid var(--line)}.admin-inline-task>.kv label{font-weight:700;color:var(--muted)}.admin-inline-task>.kv input,.admin-inline-task>.kv select,.admin-inline-task>.kv textarea{width:100%;min-width:0}.admin-inline-task>.card-head+.kv+.kv textarea{min-height:110px!important}@media(max-width:900px){.admin-inline-task{grid-template-columns:1fr}.admin-inline-task>.kv{grid-column:1/-1}}</style>`)
        function setConversationFilter(value){S.conversationFilter=value;render()}
        function openCaseEmail(kind){let c=selectedCaseData(),incoming=S.communications.find(m=>m.caseId===c.id&&m.direction==='Incoming')||S.communications.find(m=>m.direction==='Incoming'),record=acknowledgementRecord(c.id);S.editorType='caseEmailView';S.editorData=kind==='incoming'?{kind,id:incoming?.id,from:`${c.contact} · ${c.email}`,to:'operations@aalogistik.se',subject:c.subject,at:c.created,body:incoming?.body||c.body,attachments:c.attachments||[],status:'Received'}:{kind,from:'AA Logistik Operations · operations@aalogistik.se',to:`${c.contact} · ${c.email}`,subject:`We have received your request · ${c.id}`,at:record?.at||'Not sent',body:`Hello ${c.contact.split(' ')[0]},\n\nWe have received your request regarding ${String(c.subject).toLowerCase()}. Your reference is ${c.id}. Our team is reviewing the delivery requirements and will keep you updated.`,attachments:[],status:record?'Sent':'Draft',caseId:c.id};render()}
        const customerEmailDialogBase=editorDialog;editorDialog=function(){if(S.editorType!=='caseEmailView')return customerEmailDialogBase();let d=S.editorData;return `<div class="modal-shade"><div class="assign-modal email-view-modal"><h2>${editorText(d.subject)}</h2><div class="body"><div class="email-view-meta"><span>From</span><strong>${editorText(d.from)}</strong><span>To</span><strong>${editorText(d.to)}</strong><span>Date</span><strong>${editorText(d.at)}</strong><span>Status</span><strong>${pill(d.status)}</strong></div><div class="email-view-body">${editorText(d.body).replace(/\n/g,'<br>')}</div>${d.attachments?.length?`<div class="case-attachments">${d.attachments.map(a=>`<button class="case-attachment" onclick="downloadAttachment('${a}')">▧ ${editorText(a)}</button>`).join('')}</div>`:''}</div><div class="footer"><button class="btn" onclick="S.editorType=null;S.editorData={};render()">Close</button>${d.kind==='incoming'?`<button class="btn primary" onclick="S.editorType=null;openCommunication('Reply','${d.id||''}')">Reply to Customer</button>`:d.status==='Draft'?`<button class="btn" onclick="S.editorType=null;openAcknowledgement('${d.caseId}')">Edit Email</button><button class="btn primary" onclick="S.editorType=null;openAcknowledgement('${d.caseId}')">Review & Send</button>`:''}</div></div></div>`}
        communicationTabV2=function(){let c=selectedCaseData(),incoming=S.communications.find(m=>m.caseId===c.id&&m.direction==='Incoming')||S.communications.find(m=>m.direction==='Incoming'),record=acknowledgementRecord(c.id),notes=S.notes.filter(n=>!n.caseId||n.caseId===c.id),filter=S.conversationFilter||'All Messages',ackBody=`Hello ${c.contact.split(' ')[0]},<br>We have received your request regarding ${String(c.subject).toLowerCase()}. Your reference is ${c.id}. Our team is reviewing the delivery requirements and will keep you updated.`,incomingCard=`<article class="message-card email-clickable" role="button" tabindex="0" onclick="openCaseEmail('incoming')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openCaseEmail('incoming')}"><div class="message-head"><span class="avatar">${casePersonInitials(c.contact)}</span><div><strong>${c.contact} · ${c.customer}</strong><div class="sub"><a href="mailto:${c.email}" onclick="event.stopPropagation()">${c.email}</a><br>Subject: ${c.subject}</div></div><span class="sub">${c.created}</span>${pill('Received')}</div><div class="message-body"><p>${incoming?.body||c.body}</p><div class="case-attachments">${(c.attachments||[]).map(a=>`<button class="case-attachment" onclick="event.stopPropagation();downloadAttachment('${a}')">▧ ${a}</button>`).join('')}</div><span class="open-email-hint">Open full email ›</span></div></article>`,outgoingCard=`<article class="message-card email-clickable" role="button" tabindex="0" onclick="openCaseEmail('outgoing')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openCaseEmail('outgoing')}"><div class="message-head"><span class="avatar">AA</span><div><strong>AA Logistik Operations</strong><div class="sub">To ${c.contact} · <a href="mailto:${c.email}" onclick="event.stopPropagation()">${c.email}</a><br>Subject: We have received your request · ${c.id}</div></div><span class="sub">${record?record.at:'Not sent'}</span>${pill(record?'Sent':'Draft')}</div><div class="message-body"><p>${ackBody}</p><span class="open-email-hint">${record?'Open full email':'Review draft'} ›</span></div></article>`,internal=filter==='All Messages'?notes.map(n=>`<article class="message-card internal-message"><div class="message-head"><span class="avatar">${casePersonInitials(n.author)}</span><div><strong>${n.author}</strong><div class="sub">Internal comment</div></div><span class="sub">${n.at}</span>${pill('Internal')}</div><div class="message-body"><p>${mentionText(n.text)}</p></div></article>`).join(''):'';return `${record?`<div class="notice green"><strong>Customer acknowledgement was sent by ${record.by} on ${record.at}.</strong></div>`:`<div class="notice"><strong>Customer acknowledgement is pending.</strong><span class="sub"> Prepared automatically from the approved Case.</span><button class="compact-action" data-aa-style="aa-static-style-40" onclick="openAcknowledgement('${c.id}')">Review acknowledgement</button></div>`}<div class="case-layout"><section class="case-section"><div class="case-section-head"><h2>Customer Conversation</h2></div><div class="case-section-body"><div class="conversation-tabs"><button class="${filter==='All Messages'?'active':''}" onclick="setConversationFilter('All Messages')">All Messages (${2+notes.length})</button><button class="${filter==='Customer Emails'?'active':''}" onclick="setConversationFilter('Customer Emails')">Customer Emails (2)</button></div>${incomingCard}${outgoingCard}${internal}<div class="internal-composer"><div><strong>Add Internal Comment</strong><div class="sub">Internal only · Customer will not see this</div></div><input id="case-comment-v2" placeholder="Write a comment or @mention for your team…"><button class="btn" onclick="postInternalComment()">Add Comment</button></div></div></section><div class="case-side-stack"><section class="case-section"><div class="case-section-head"><h2>Communication Summary</h2></div><div class="case-section-body case-kv-grid"><div class="case-kv"><label>Customer Contact</label><strong>${c.contact}</strong></div><div class="case-kv"><label>Email</label><strong><a href="mailto:${c.email}">${c.email}</a></strong></div><div class="case-kv"><label>Acknowledgement</label><strong>${pill(record?'Sent':'Pending')}</strong></div><div class="case-kv"><label>Last customer email</label><strong>${c.created}</strong></div><div class="case-kv"><label>Customer emails</label><strong>2</strong></div><div class="case-kv"><label>Attachments</label><strong>${(c.attachments||[]).length}</strong></div></div></section></div></div>`}
        document.head.insertAdjacentHTML('beforeend',`<style>.email-clickable{cursor:pointer;transition:border-color .15s,box-shadow .15s,transform .15s}.email-clickable:hover,.email-clickable:focus{border-color:var(--blue);box-shadow:0 3px 14px rgba(20,123,209,.12);outline:none;transform:translateY(-1px)}.open-email-hint{display:block;color:var(--blue);font-weight:700;margin-top:8px}.email-view-modal{width:min(760px,calc(100vw - 40px))}.email-view-meta{display:grid;grid-template-columns:70px 1fr;gap:8px 12px;padding-bottom:16px;border-bottom:1px solid var(--line)}.email-view-meta span{color:var(--muted)}.email-view-body{padding:20px 0;line-height:1.65;white-space:normal}.internal-message{background:#f8fafc}</style>`)
        function operationsEmail(){return 'operations@aalogistik.se'}
        function validEmailList(value){let addresses=String(value||'').split(/[;,]/).map(x=>x.trim()).filter(Boolean);return addresses.length>0&&addresses.every(x=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x))}
        const addressedCommunicationOpen=openCommunication;openCommunication=function(mode,id=''){let source=S.communications.find(m=>m.id===id),c=selectedCaseData();addressedCommunicationOpen(mode,id);if(S.editorType==='compose'&&mode!=='Internal Note'){Object.assign(S.editorData,{from:operationsEmail(),to:source?.from||c.email,cc:mode==='Reply All'?(source?.cc||''):''});render()}}
        const addressedCommunicationSend=sendCommunication;sendCommunication=function(){let d=S.editorData;if(S.editorType==='compose'&&d.mode!=='Internal Note'){if(!validEmailList(d.from)||!validEmailList(d.to)||(d.cc&&!validEmailList(d.cc))){toast('Enter valid From, To and CC email addresses');return}}let before=S.communications.length;addressedCommunicationSend();if(S.communications.length>before){let sent=S.communications[0];Object.assign(sent,{from:d.from,to:d.to,cc:d.cc||''})}}
        const addressedAcknowledgementDraft=acknowledgementDraft;acknowledgementDraft=function(c){return {...addressedAcknowledgementDraft(c),from:operationsEmail(),cc:''}}
        const addressedAcknowledgementConfirm=confirmAcknowledgement;confirmAcknowledgement=function(){let d=S.editorData;if(!validEmailList(d.from)||!validEmailList(d.to)||(d.cc&&!validEmailList(d.cc))){toast('Enter valid From, To and CC email addresses');return}let caseId=d.caseId;addressedAcknowledgementConfirm();let record=CASE_ACKS[caseId];if(record)Object.assign(record,{from:d.from,cc:d.cc||''});let sent=S.communications.find(m=>m.caseId===caseId&&m.type==='Acknowledgement');if(sent)Object.assign(sent,{from:d.from,to:d.to,cc:d.cc||''})}
        const addressedEmailDialogBase=editorDialog;editorDialog=function(){let d=S.editorData;return addressedEmailDialogBase()}
        document.head.insertAdjacentHTML('beforeend',`<style>.email-compose-modal{width:min(760px,calc(100vw - 40px))}.email-address-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.email-address-grid label{display:flex;flex-direction:column;gap:7px;font-weight:700}.email-address-grid .wide{grid-column:1/-1}.email-address-grid input,.email-address-grid textarea{width:100%;border:1px solid var(--line);border-radius:5px;padding:10px;font:inherit}.email-address-grid textarea{height:180px;resize:vertical;font-weight:400}@media(max-width:700px){.email-address-grid{grid-template-columns:1fr}.email-address-grid .wide{grid-column:auto}}</style>`)
        caseProgressStrip=function(c,tasks){let done=taskCompletedCount(tasks),pct=tasks.length?Math.round(done/tasks.length*100):0;return `<div class="case-strip case-strip-progress-only"><strong>Case progress</strong><div class="progress-track"><i style="width:${pct}%"></i></div><span>${done} of ${tasks.length} Tasks completed</span></div>`}
        caseView=function(){let c=selectedCaseData(),tasks=selectedCaseTasks(),comms=Math.max(2,S.communications.filter(m=>m.caseId===c.id).length),aliases={'Order Data':'Order','Activities':'Activity'},pending=!acknowledgementRecord(c.id),hasOrderChanges=(S.orderChangeRequests[c.id]||[]).length>0;S.caseTab=aliases[S.caseTab]||S.caseTab||'Overview';let tabs=[['Overview',''],['Order',' (1)'],['Tasks',` (${tasks.length})`],['Communication',` (${comms})`],['Activity','']];return `<div class="case-workspace"><button class="case-back" onclick="go('cases')">← Back to Cases</button><section class="case-v2-head"><div class="case-v2-title"><div><h1>${c.id} · ${c.caseClass} – ${c.customer}</h1><div class="sub">Received ${caseDateOnly(c.created)} · Due ${c.due} · ${c.departments}</div></div>${pending?`<button class="ack-header-state" onclick="openAcknowledgement('${c.id}')">Acknowledgement Pending</button>`:''}${pill(c.status)}${pill(`${c.priority} Priority`)}${opterHeaderAction(c)}${S.role==='Admin'?`<button class="btn" onclick="openEditor('case','${c.id}')">✎ Edit Case</button>`:''}</div><div class="case-v2-tabs">${tabs.map(([t,n])=>`<button class="${S.caseTab===t?'active':''}" onclick="S.caseTab='${t}';render()">${t==='Order'&&!isTransportCase(c)?'Order Summary':t}${n}${t==='Order'&&hasOrderChanges?'<span class="tab-dot" title="New customer update to review"></span>':''}</button>`).join('')}</div></section>${caseTabV2()}</div>`}
        document.head.insertAdjacentHTML('beforeend',`<style>.ack-header-state{border:1px solid #efc46a;background:#fff4d8;color:#895600;border-radius:5px;padding:8px 11px;font:inherit;font-weight:800;cursor:pointer;white-space:nowrap}.ack-header-state:hover,.ack-header-state:focus{background:#ffeab7;outline:2px solid rgba(178,112,0,.18)}.case-strip-progress-only{grid-template-columns:auto minmax(180px,420px) auto;justify-content:start}</style>`)
        const streamlinedCommunicationTab=communicationTabV2;communicationTabV2=function(){return streamlinedCommunicationTab().replace(/^<div class="notice(?: green)?">[\s\S]*?<\/div>/,'')}
        function orderFieldConfidence(label,index=0){let scores={'Customer':98,'Invoice Marking':90,'Customer No.':98,'Payer':70,'Contact':93,'Region':65,'Customer Reference':95,'Internal Order No.':58,'PO Number':95,'Location':index?94:96,'Pickup Date / Time':90,'Loading Reference':88,'Geographic / Price Zone':88,'Delivery Date / Time':86,'Delivery Reference':92,'Transport Mode':97,'Distance':88,'Service':95,'Estimated Driving Time':84,'Temperature Requirement':82,'Freight Document No.':55,'Dangerous Goods':89,'Estimated CO₂ Emission':76,'Number of Packages':96,'Gross Weight':94,'Chargeable Weight':94,'Length':92,'Width':92,'Height':92,'Total Volume':90,'Pallet Spaces':87,'Loading Metres':85};return scores[label]??88}
        function confidenceBadge(score){let tone=score>=80?'high':score>=60?'medium':'low',label=score>=80?'High confidence':score>=60?'Review recommended':'Review required';return `<span class="ai-field-confidence ${tone}" title="${label}" aria-label="AI confidence ${score} percent, ${label}">${score}%</span>`}
        const fieldConfidenceOrderTab=orderTabV2;orderTabV2=function(){let template=document.createElement('template');template.innerHTML=fieldConfidenceOrderTab();let locationIndex=0;template.content.querySelectorAll('.order-line').forEach(row=>{let label=row.querySelector('span')?.textContent?.trim()||'',value=row.querySelector('strong');if(!value)return;let index=label==='Location'?locationIndex++:0;value.insertAdjacentHTML('afterend',confidenceBadge(orderFieldConfidence(label,index)))});template.content.querySelectorAll('.order-metric').forEach(row=>{let label=row.querySelector('span')?.textContent?.trim()||'',value=row.querySelector('strong');if(value)value.insertAdjacentHTML('afterend',confidenceBadge(orderFieldConfidence(label)))});let table=template.content.querySelector('.compact-order-table');if(table){table.querySelector('thead tr')?.insertAdjacentHTML('beforeend','<th>AI Confidence</th>');table.querySelectorAll('tbody tr').forEach((row,index)=>row.insertAdjacentHTML('beforeend',`<td>${confidenceBadge(index?91:93)}</td>`))}return template.innerHTML}
        document.head.insertAdjacentHTML('beforeend',`<style>.order-line{grid-template-columns:minmax(105px,.8fr) minmax(0,1.2fr) auto;align-items:center}.order-line>strong{min-width:0}.ai-field-confidence{display:inline-flex;align-items:center;justify-content:center;min-width:42px;padding:3px 6px;border:1px solid;border-radius:4px;font-size:11px;font-weight:800;line-height:1.2;white-space:nowrap}.ai-field-confidence.high{color:#16813d;background:#edf9f1;border-color:#b7e3c4}.ai-field-confidence.medium{color:#9a6100;background:#fff7df;border-color:#f0d58d}.ai-field-confidence.low{color:#c62835;background:#fff0f1;border-color:#f2c1c5}.order-metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:28px;row-gap:0}.order-metric{display:grid;grid-template-columns:minmax(135px,1fr) minmax(80px,.75fr) 54px;gap:10px;align-items:center;min-height:42px;padding:8px 0;border-bottom:1px solid var(--line)}.order-metric:nth-last-child(-n+2){border-bottom:0}.order-metric>span:first-child{grid-column:1;color:var(--muted);font-size:12px}.order-metric>strong{grid-column:2;font-size:13px}.order-metric>.ai-field-confidence{display:inline-flex;grid-column:3;justify-self:end;width:auto;min-width:42px}.compact-order-table .ai-field-confidence{font-size:10px}@media(max-width:760px){.order-metrics{grid-template-columns:1fr}.order-metric,.order-metric:nth-last-child(-n+2){border-bottom:1px solid var(--line)}.order-metric:last-child{border-bottom:0}}@media(max-width:620px){.order-metric{grid-template-columns:minmax(120px,1fr) minmax(80px,1fr) 50px;gap:8px}}</style>`)
        function removeNonOrderConfidenceDisplays(){if(S.page==='case'&&S.caseTab==='Order')return;document.querySelectorAll('table').forEach(table=>{let headers=[...table.querySelectorAll('thead th')],index=headers.findIndex(th=>th.textContent.trim()==='AI Confidence');if(index<0)return;table.querySelectorAll('tr').forEach(row=>row.children[index]?.remove())});document.querySelectorAll('.rowfield,.kv,.case-kv').forEach(row=>{let label=row.querySelector('label');if(label?.textContent.trim()==='AI Confidence')row.remove()});let walker=document.createTreeWalker(document.querySelector('.content')||document.body,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(node=>{if(node.parentElement?.closest('.ai-field-confidence'))return;node.nodeValue=node.nodeValue.replace(/\s*·?\s*\d+%\s+confidence/gi,'')})}
        function compactDueTodayLabels(){document.querySelectorAll('td,.kanban-card,.task-inspector,.drawer').forEach(scope=>{let walker=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(node=>{if(!/due today/i.test(node.nodeValue)||node.parentElement?.closest('.compact-due-today'))return;let parts=node.nodeValue.split(/(Due Today)/i),fragment=document.createDocumentFragment();parts.forEach(part=>{if(/^due today$/i.test(part)){let span=document.createElement('span');span.className='compact-due-today';span.textContent=part;fragment.appendChild(span)}else fragment.appendChild(document.createTextNode(part))});node.replaceWith(fragment)})})}
        document.head.insertAdjacentHTML('beforeend',`<style>td .due-today{font-size:13px!important;line-height:1.25}.compact-due-today{display:inline-flex;align-items:center;color:#c51f2d;font-size:10px!important;line-height:1.15;font-weight:750;letter-spacing:.01em;white-space:nowrap}.sub .compact-due-today,.due-today.sub .compact-due-today{margin-top:3px}.deadline-warning .compact-due-today{font-size:10px!important}</style>`)
        function removeQueueIssueColumn(){if(S.page!=='review')return;document.querySelectorAll('table').forEach(table=>{let headers=[...table.querySelectorAll('thead th')],index=headers.findIndex(th=>th.textContent.trim()==='Issue');if(index<0)return;table.querySelectorAll('tr').forEach(row=>row.children[index]?.remove())})}
        function openReviewCaseData(){let c=selectedCaseData();S.editorType='reviewCaseData';S.editorDirty=false;S.editorData={customer:c.customer,classification:c.classification,caseClass:c.caseClass,priority:c.priority,departments:c.departments,pickup:c.pickup,delivery:c.delivery,requestedDate:c.requestedDate,goods:c.goods,weight:c.weight};render()}
        function saveReviewCaseData(){let c=selectedCaseData(),d=S.editorData;Object.assign(c,d);let row=CASES.find(x=>x[0]===c.id);if(row)row.splice(1,5,c.customer,c.caseClass,c.departments,c.priority,c.due);S.activities.unshift([`${c.id} review fields updated`,actorName(),'13 Oct 2026, 12:20']);S.editorType=null;S.editorData={};S.editorDirty=false;render();toast('Review fields updated')}
        function openPreApprovalTasks(){let c=selectedCaseData(),items=TASKS.filter(t=>t[1]===c.id).map(t=>({id:t[8],title:t[0],classification:t[9],department:t[3],assignee:t[4],priority:t[5],due:dateInputValue(t[6]),dependency:dependencyIds(t[8])[0]||''}));S.editorType='reviewMappedTasks';S.editorData={caseId:c.id,items};S.editorDirty=false;render()}
        function editMappedReviewTask(index,key,value){S.editorData.items[index][key]=value;S.editorDirty=true}
        function saveMappedTaskReview(){let d=S.editorData;d.items.forEach(item=>{let t=taskById(item.id);if(!t)return;t[0]=item.title;t[9]=item.classification;t[3]=item.department;t[4]=item.assignee;t[5]=item.priority;t[6]=displayDateValue(item.due);S.taskDependencies[item.id]=item.dependency?[item.dependency]:[]});recalculateDependencies(d.caseId);S.activities.unshift([`${d.caseId} mapped Tasks reviewed before approval`,actorName(),'13 Oct 2026, 12:25']);S.editorType=null;S.editorData={};S.editorDirty=false;render();toast('Task review saved')}
        approval=function(){if(S.role!=='Admin')return head('Access denied','Only the Admin can review and approve incoming Cases.');let c=selectedCaseData(),ts=TASKS.filter(t=>t[1]===c.id),record=activeClarification(),missing=!!record,missingValue=missing?'<strong class="missing-field">Missing delivery details — review required</strong>':`<strong>${editorText(c.delivery)}</strong>`,clarification=record?`<div class="missing-alert"><strong>Missing information:</strong> Delivery details were not supplied or could not be confirmed from the customer email.</div>${clarificationActions()}${record.history.length?`<div class="card" data-aa-style="aa-static-style-58"><div class="card-head"><h2>Clarification History</h2></div><div class="card-body">${record.history.map(h=>`<div class="notice" data-aa-style="aa-static-style-21"><strong>${h.type} · ${h.recipient}</strong><p>${h.message}</p><span class="sub">${h.by} · ${h.at}</span></div>`).join('')}</div></div>`:''}`:'';return `<button class="back" onclick="go('review')">‹ Back to Review Requests</button>${head('Review and Approve Case',`${c.id} · ${c.customer}`,`<span>${pill('Awaiting Review')}</span><button class="btn primary" onclick="approveSelectedCase()">Approve Case</button>`)}${clarification}<div class="review-grid"><section class="panel"><div class="panel-title"><h2>Original Email</h2></div><div class="email-meta"><dl><dt>From</dt><dd>${c.contact} · ${c.email}</dd><dt>To</dt><dd>approve@aalogistik.se</dd><dt>Subject</dt><dd>${c.subject}</dd><dt>Date</dt><dd>${c.created}</dd></dl></div><div class="email-body">${String(c.body||'').replace(/\n/g,'<br>')}${(c.attachments||[]).map(a=>`<div class="attachment"><span>▧ ${a}</span><button class="link" onclick="downloadAttachment('${a}')">Download</button></div>`).join('')}</div></section><section class="panel"><div class="panel-title"><h2>AI Interpretation</h2><button class="link" onclick="openReviewCaseData()">Edit</button></div><div class="fieldlist"><div class="rowfield"><label>Customer</label><strong>${c.customer}</strong></div><div class="rowfield"><label>Category</label><strong>${c.classification}</strong></div><div class="rowfield"><label>Case Class</label><strong>${c.caseClass}</strong></div><div class="rowfield"><label>Priority</label><strong>${pill(c.priority)}</strong></div></div><div class="panel-title"><h2>Extracted Information</h2></div><div class="fieldlist"><div class="rowfield"><label>Departments</label><strong>${c.departments}</strong></div><div class="rowfield"><label>Pickup</label><strong>${c.pickup}</strong></div><div class="rowfield"><label>Delivery</label>${missingValue}</div><div class="rowfield"><label>Requested Date</label><strong>${c.requestedDate}</strong></div><div class="rowfield"><label>Goods</label><strong>${c.goods}</strong></div><div class="rowfield"><label>Weight</label><strong>${c.weight}</strong></div></div></section><section class="panel"><div class="panel-title"><h2>Automatic Task Routing (${ts.length})</h2><button class="link" onclick="openPreApprovalTasks()">Review Tasks</button></div><div class="editfield"><div class="notice green"><strong>Task-level ownership</strong><br><span class="sub">Owners matched from category and User Master.</span></div>${ts.map(t=>`<div class="proposal"><header><strong>${t[0]}</strong>${pill(t[4]==='Unassigned'?'Department queue':'Owner matched')}</header><p>${t[3]} · Due ${t[6]}</p><p><strong>${t[9]} → ${t[4]}</strong></p></div>`).join('')}<button class="link" data-aa-style="aa-static-style-3" onclick="openEditor('newTask','${c.id}')">+ Add Task</button></div></section></div>`}
        const adminReviewEditorBase=editorDialog;editorDialog=function(){let d=S.editorData;if(S.editorType==='reviewCaseData')return `<div class="modal-shade"><div class="assign-modal review-data-modal"><h2>Edit AI Interpretation & Extracted Information</h2><div class="body"><div class="editor-grid">${field('Customer','customer',d.customer)}${field('Category','classification',d.classification)}${field('Case Class','caseClass',d.caseClass)}${choice('Priority','priority',d.priority,['Urgent', 'High', 'Medium', 'Low'])}${field('Departments','departments',d.departments)}${field('Pickup','pickup',d.pickup)}${field('Delivery','delivery',d.delivery)}${field('Requested Date','requestedDate',d.requestedDate)}${field('Goods','goods',d.goods)}${field('Weight','weight',d.weight)}</div></div><div class="footer"><button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" onclick="saveReviewCaseData()">Save Changes</button></div></div></div>`;if(S.editorType==='reviewMappedTasks'){let people=USERS.filter(u=>u.role!=='Admin'),departments=[...new Set(people.map(u=>u.department))],classes=Object.keys(TASK_ROUTING);return `<div class="modal-shade"><div class="assign-modal mapped-task-review-modal"><h2>Review Tasks Before Approval</h2><div class="body"><p class="sub">Review Task details and select an optional dependency from another Task in this Case.</p>${d.items.map((item,index)=>`<section class="mapped-task-review"><div class="mapped-task-review-head"><strong>${item.id}</strong>${pill(item.priority)}</div><div class="editor-grid"><label class="wide">Task name<input value="${editorText(item.title)}" oninput="editMappedReviewTask(${index},'title',this.value)"></label><label>Task category<select onchange="editMappedReviewTask(${index},'classification',this.value)">${classes.map(x=>`<option ${x===item.classification?'selected':''}>${editorText(x)}</option>`).join('')}</select></label><label>Department<select onchange="editMappedReviewTask(${index},'department',this.value)">${departments.map(x=>`<option ${x===item.department?'selected':''}>${editorText(x)}</option>`).join('')}</select></label><label>Assignee<select onchange="editMappedReviewTask(${index},'assignee',this.value)"><option ${item.assignee==='Unassigned'?'selected':''}>Unassigned</option>${people.map(u=>`<option value="${editorText(u.name)}" ${u.name===item.assignee?'selected':''}>${editorText(u.name)} · ${editorText(u.department)}</option>`).join('')}</select></label><label>Priority<select onchange="editMappedReviewTask(${index},'priority',this.value)">${['Urgent', 'High', 'Medium', 'Low'].map(x=>`<option ${x===item.priority?'selected':''}>${x}</option>`).join('')}</select></label><label>Due date<input type="date" value="${editorText(item.due)}" onchange="editMappedReviewTask(${index},'due',this.value)"></label><label>Depends on<select onchange="editMappedReviewTask(${index},'dependency',this.value)"><option value="">No dependency</option>${d.items.filter(x=>x.id!==item.id).map(x=>`<option value="${x.id}" ${x.id===item.dependency?'selected':''}>${x.id} · ${editorText(x.title)}</option>`).join('')}</select></label></div></section>`).join('')}</div><div class="footer"><button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" onclick="saveMappedTaskReview()">Save Reviewed Tasks</button></div></div></div>`}return adminReviewEditorBase()}
        document.head.insertAdjacentHTML('beforeend',`<style>.review-data-modal{width:min(820px,calc(100vw - 40px))}.mapped-task-review-modal{width:min(980px,calc(100vw - 40px));max-height:90vh}.mapped-task-review-modal>.body{overflow:auto}.mapped-task-review{border:1px solid var(--line);border-radius:6px;padding:14px;margin:12px 0;background:#fbfcfe}.mapped-task-review-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}.page-head .actions{display:flex;align-items:center;gap:10px}</style>`)
        const reviewWithoutAcknowledgementQueue=review;review=function(){if(S.queueTab==='Acknowledgement Pending')S.queueTab='Awaiting Review';let template=document.createElement('template');template.innerHTML=reviewWithoutAcknowledgementQueue();template.content.querySelectorAll('.tabs button').forEach(button=>{if(/Acknowledgement Pending/i.test(button.textContent||''))button.remove()});return template.innerHTML}
        const reviewMetricWithoutAcknowledgement=metricAction;metricAction=function(label){if(S.role==='Admin'&&/Acknowledgement/.test(label)){go('cases');return}return reviewMetricWithoutAcknowledgement(label)}
        function normalizeAdminReviewScreen(){if(S.page!=='approval')return;document.querySelectorAll('.email-meta dt').forEach(label=>{if(label.textContent.trim()==='To'&&label.nextElementSibling)label.nextElementSibling.textContent='transport@aalogistik.se'})}
        function taskSummaryStatusGroup(status){let value=String(status||'').toLowerCase();if(value.includes('overdue')||value.includes('blocked'))return'critical';if(value.includes('unassigned')||value.includes('waiting'))return'watch';if(value.includes('progress'))return'progress';if(value.includes('ready'))return'ready';if(value.includes('completed'))return'complete';return'progress'}
        function renderTaskSummaryTable(){if(S.page!=='case'||S.caseTab!=='Overview')return;let heading=[...document.querySelectorAll('.case-section-head h2')].find(x=>x.textContent.trim()==='Task Summary'),body=heading?.closest('.case-section')?.querySelector('.case-section-body'),tasks=selectedCaseTasks();if(!body)return;if(!tasks.length){body.innerHTML='<div class="case-empty">No Tasks have been created.</div>';return}let groups=[...new Map(tasks.map(t=>[t[3],tasks.filter(x=>x[3]===t[3])])).entries()],meta={critical:{label:'Overdue / Blocked'},watch:{label:'Unassigned / Waiting'},progress:{label:'In progress'},ready:{label:'Ready'},complete:{label:'Completed'}},order=['critical','watch','progress','ready','complete'],attention=tasks.filter(t=>taskSummaryStatusGroup(effectiveTaskStatus(t))==='critical').length;body.innerHTML=`<div class="task-summary-overview"><div class="task-summary-meta"><span>${tasks.length} task${tasks.length===1?'':'s'} across ${groups.length} department${groups.length===1?'':'s'}</span>${attention?`<span class="task-summary-attention">${attention} need${attention===1?'s':''} attention</span>`:''}</div><div class="task-summary-legend" aria-label="Task status legend">${order.map(key=>`<span><i class="task-summary-dot ${key}"></i>${meta[key].label}</span>`).join('')}</div><div class="task-summary-caption">Tasks by department and status</div><div class="task-summary-columns" aria-hidden="true"><span>Department</span><span>Task count</span><span>Status breakdown</span></div><div class="task-summary-chart">${groups.map(([department,departmentTasks])=>{let counts=order.reduce((result,key)=>{result[key]=departmentTasks.filter(t=>taskSummaryStatusGroup(effectiveTaskStatus(t))===key).length;return result},{}),segmentDescription=order.filter(key=>counts[key]).map(key=>`${counts[key]} ${meta[key].label}`).join(', ');return `<button type="button" class="task-summary-department" onclick="S.caseTab='Tasks';render()" aria-label="Open ${editorText(department)} tasks: ${segmentDescription}"><strong>${editorText(department)}</strong><b>${departmentTasks.length}</b><span class="task-summary-bar" role="img" aria-label="${editorText(segmentDescription)}">${order.filter(key=>counts[key]).map(key=>`<i class="${key}" style="width:${counts[key]/departmentTasks.length*100}%" title="${counts[key]} ${meta[key].label}"></i>`).join('')}</span><span class="task-summary-chevron" aria-hidden="true">›</span></button>`}).join('')}</div><div class="task-summary-footer"><span>Total ${tasks.length} task${tasks.length===1?'':'s'}</span><button class="link" onclick="S.caseTab='Tasks';render()">View all tasks ›</button></div></div>`}
        S.orderEdits=S.orderEdits||{};
        function openOrderEditor(){let fields=[...document.querySelectorAll('.order-line,.order-metric')].map((row,index)=>({index,label:row.querySelector('span')?.textContent?.trim()||`Field ${index+1}`,value:row.querySelector('strong')?.textContent?.trim()||''})),items=[...document.querySelectorAll('.compact-order-table tbody tr')].map(row=>[...row.cells].slice(0,7).map(cell=>cell.textContent.trim()));S.editorType='orderEditor';S.editorData={caseId:S.selectedCase,fields,items};S.editorDirty=false;render()}
        function editOrderField(index,value){S.editorData.fields[index].value=value;S.editorDirty=true}
        function editOrderItem(row,column,value){S.editorData.items[row][column]=value;S.editorDirty=true}
        function saveOrderEditor(){S.orderEdits[S.editorData.caseId]={fields:S.editorData.fields.map(x=>({...x})),items:S.editorData.items.map(x=>[...x])};S.activities.unshift([`${S.editorData.caseId} Order fields updated`,actorName(),'14 Oct 2026, 10:00']);S.editorType=null;S.editorData={};S.editorDirty=false;render();toast('Order fields updated')}
        const editableOrderTabBase=orderTabV2;orderTabV2=function(){let template=document.createElement('template');template.innerHTML=editableOrderTabBase();let edits=S.orderEdits[S.selectedCase],rows=[...template.content.querySelectorAll('.order-line,.order-metric')];if(edits)rows.forEach((row,index)=>{let value=row.querySelector('strong');if(value&&edits.fields[index])value.textContent=edits.fields[index].value});let table=template.content.querySelector('.compact-order-table');if(edits&&table)template.content.querySelectorAll('.compact-order-table tbody tr').forEach((row,r)=>[...row.cells].slice(0,7).forEach((cell,c)=>{if(edits.items[r]?.[c]!=null)cell.textContent=edits.items[r][c]}));let banner=template.content.querySelector('.order-banner');banner?.querySelectorAll('button').forEach(button=>{if(/Review Extracted Data/i.test(button.textContent||''))button.remove()});return template.innerHTML}
        function setSingleTaskDependency(taskId,dependencyId){if(dependencyId&&dependencyCycle(taskId,dependencyId)){toast('Circular dependencies are not allowed');render();return}S.taskDependencies[taskId]=dependencyId?[dependencyId]:[];let t=taskById(taskId);if(t)recalculateDependencies(t[1]);S.activities.unshift([`${taskId} dependency updated`,actorName(),'14 Oct 2026, 10:05']);(S.taskActivity[taskId]=S.taskActivity[taskId]||[]).unshift({text:'updated the Dependency',author:actorName(),at:auditTimestamp(),type:'update',diffId:'diff-dep-'+taskId+'-'+Date.now(),diffOld:'Dependency: None',diffNew:'Dependency: '+(dependencyId||'None')});render();toast('Dependency updated')}
        dependencyPanel=function(t){let candidates=TASKS.filter(x=>x[1]===t[1]&&x[8]!==t[8]),selected=dependencyIds(t[8])[0]||'',unresolved=unresolvedDependencies(t);return `<div class="card dependency-editor" data-aa-style="aa-static-style-14"><div class="card-head"><div><h2>Dependency</h2><span class="sub">Select another Task from this Case</span></div>${unresolved.length?pill('Dependency outstanding'):selected?pill('Dependency selected'):pill('No dependency')}</div><div class="card-body"><select class="dependency-select" onchange="setSingleTaskDependency('${t[8]}',this.value)"><option value="">No dependency</option>${candidates.map(d=>`<option value="${d[8]}" ${selected===d[8]?'selected':''}>${d[8]} · ${editorText(d[0])} · ${kanbanStatus(d)}</option>`).join('')}</select></div></div>`}
        function quickTaskStatusUpdate(id,next){let t=taskById(id);if(!t||!canUpdateTask(t)){toast('You do not have permission to change this Task status');render();return}let previous=kanbanStatus(t);if(previous===next)return;if(next==='Completed'&&unresolvedDependencies(t).length){toast('Complete the selected dependency before completing this Task');render();return}let at='14 Oct 2026, 10:10',author=actorName();t[7]=next;(TASK_STATUS_HISTORY[id]=TASK_STATUS_HISTORY[id]||[]).unshift({from:previous,to:next,comment:'Status updated',author,at});S.activities.unshift([`${id} status changed from ${previous} to ${next}`,author,at]);if(next==='Completed')TASK_COMPLETIONS[id]={at,by:author};else delete TASK_COMPLETIONS[id];recalculateDependencies(t[1]);render();toast(`${id} moved to ${next}`)}
        dropTaskInColumn=function(event,status){event.preventDefault();event.currentTarget.classList.remove('drop-target','drop-denied');let id=event.dataTransfer.getData('text/plain')||S.dragTaskId;S.dragTaskId=null;quickTaskStatusUpdate(id,status)}
        function simplifyTaskStatusControls(){document.querySelectorAll('.task-inspector-actions').forEach(panel=>{let select=panel.querySelector('select');if(!select)return;// The status change must go to the task the panel shows. The drawer shows S.selectedTask (or the first task),
        // while the Kanban inspector shows S.kanbanTaskId, so the id is taken from whichever one this panel is in.
        let shown=panel.closest('.drawer')?(TASKS.find(x=>x[8]===S.selectedTask)||TASKS[0]):null,id=shown?shown[8]:(S.kanbanTaskId||S.selectedTask);select.setAttribute('onchange',`quickTaskStatusUpdate('${id}',this.value)`);panel.querySelector('textarea')?.remove();panel.querySelectorAll('button').forEach(button=>button.remove())});document.querySelectorAll('.drawer .card-head h2').forEach(title=>{if(/Comments & Status History/i.test(title.textContent||''))title.textContent='Comments'});document.querySelectorAll('.drawer .card').forEach(card=>{let title=card.querySelector('.card-head h2');if(title?.textContent.trim()!=='Comments')return;card.querySelectorAll('.notice').forEach(notice=>{if(/→/.test(notice.querySelector('strong')?.textContent||''))notice.remove()});let textarea=card.querySelector('#task-comment'),actions=textarea?.nextElementSibling;if(textarea&&!textarea.closest('.sticky-comment-composer')){let composer=document.createElement('div');composer.className='sticky-comment-composer';textarea.before(composer);composer.append(textarea);if(actions?.classList.contains('actions'))composer.append(actions)}})}
        const completeCaseEditorBase=editorDialog;editorDialog=function(){if(S.editorType==='orderEditor'){let d=S.editorData;return `<div class="modal-shade"><div class="assign-modal order-editor-modal"><h2>Edit Order</h2><div class="body"><h3>Order Fields</h3><div class="order-editor-grid">${d.fields.map((item,index)=>`<label>${editorText(item.label)}<input value="${editorText(item.value)}" oninput="editOrderField(${index},this.value)"></label>`).join('')}</div><h3>Goods / Colli</h3>${d.items.map((item,row)=>`<div class="order-item-editor"><strong>Item ${row+1}</strong>${['Item','Quantity','Package Type','Goods Description','Weight','Dimensions','Package Number'].map((label,column)=>`<label>${label}<input value="${editorText(item[column]||'')}" oninput="editOrderItem(${row},${column},this.value)"></label>`).join('')}</div>`).join('')}</div><div class="footer"><button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" onclick="saveOrderEditor()">Save Order</button></div></div></div>`}let html=completeCaseEditorBase();if(S.editorType==='newTask'){let template=document.createElement('template');template.innerHTML=html,options=TASKS.filter(t=>t[1]===S.editorData.caseId).map(t=>`<option value="${t[8]}">${t[8]} · ${editorText(t[0])}</option>`).join(''),dependency=template.content.querySelector('.dependency-option')?.closest('.wide');if(dependency)dependency.innerHTML=`<strong>Dependency</strong><p class="sub">Select another Task from this Case.</p><select class="dependency-select" onchange="S.editorData.dependencies=this.value?[this.value]:[]"><option value="">No dependency</option>${options}</select>`;return template.innerHTML}return html}
        document.head.insertAdjacentHTML('beforeend',`<style>.task-summary-table{overflow-x:auto;margin-bottom:10px}.task-summary-header,.task-summary-data{display:grid;grid-template-columns:105px minmax(220px,1.5fr) 120px 135px 105px 80px 95px;gap:10px;align-items:center;min-width:900px;padding:9px 7px}.task-summary-header{background:#f4f7fa;color:var(--muted);font-size:11px;font-weight:800;border-bottom:1px solid var(--line)}.task-summary-data{font-size:12px;border-bottom:1px solid var(--line);cursor:pointer}.task-summary-data:hover{background:#f5f9fd}.dependency-select{width:100%;height:40px;border:1px solid var(--line);border-radius:5px;background:#fff;padding:0 10px}.sticky-comment-composer{position:sticky;bottom:-1px;background:#fff;border-top:1px solid var(--line);padding:12px 0 2px;z-index:4}.order-editor-modal{width:min(1040px,calc(100vw - 40px));max-height:92vh}.order-editor-modal>.body{overflow:auto}.order-editor-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 18px}.order-editor-grid label,.order-item-editor label{display:flex;flex-direction:column;gap:5px;font-weight:700}.order-editor-grid input,.order-item-editor input{width:100%;border:1px solid var(--line);border-radius:5px;padding:9px;font:inherit}.order-item-editor{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 14px;border:1px solid var(--line);border-radius:6px;padding:12px;margin:10px 0}.order-item-editor>strong{grid-column:1/-1}@media(max-width:760px){.order-editor-grid,.order-item-editor{grid-template-columns:1fr}}</style>`)
        function constrainCaseTabHistory(){
            if(S.page!=='case')return;
            if(S.caseTab==='Communication'){
                let section=document.querySelector('.case-layout > .case-section'),body=section?.querySelector('.case-section-body'),tabs=body?.querySelector('.conversation-tabs'),composer=body?.querySelector('.internal-composer');
                if(!body||!tabs||!composer)return;
                section.classList.add('scrollable-communication');
                let messages=document.createElement('div');messages.className='conversation-message-scroll';
                [...body.children].filter(node=>node!==tabs&&node!==composer).forEach(node=>messages.appendChild(node));
                tabs.after(messages);
            }
            if(S.caseTab==='Activity'){
                let section=document.querySelector('.activity-layout > .case-section'),body=section?.querySelector('.case-section-body');
                section?.classList.add('scrollable-activity');
                body?.classList.add('activity-event-scroll');
            }
        }
        document.head.insertAdjacentHTML('beforeend',`<style>
            .scrollable-communication{height:min(680px,calc(100vh - 285px));min-height:430px;display:flex;flex-direction:column}
            .scrollable-communication>.case-section-body{min-height:0;flex:1;display:flex;flex-direction:column;padding-bottom:0;overflow:hidden}
            .scrollable-communication .conversation-tabs{flex:0 0 auto}
            .conversation-message-scroll{min-height:0;flex:1;overflow-y:auto;overscroll-behavior:contain;padding-right:7px;scrollbar-gutter:stable}
            .scrollable-communication .internal-composer{position:sticky;bottom:0;z-index:5;flex:0 0 auto;background:#fff;margin:0 -16px;padding:12px 16px;border-top:1px solid var(--line);box-shadow:0 -6px 14px rgba(15,43,68,.06)}
            .scrollable-activity{height:min(680px,calc(100vh - 285px));min-height:430px;display:flex;flex-direction:column}
            .scrollable-activity>.case-section-head{flex:0 0 auto}
            .scrollable-activity>.activity-event-scroll{min-height:0;flex:1;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable;padding-right:12px}
            @media(max-height:720px){.scrollable-communication,.scrollable-activity{height:430px}}
            @media(max-width:1000px){.scrollable-communication,.scrollable-activity{height:600px}}
            @media(max-width:640px){.scrollable-communication .internal-composer{grid-template-columns:1fr}.scrollable-communication,.scrollable-activity{height:560px;min-height:380px}}
        </style>`)
        const MASTER_CATEGORIES=[['Transport','Transport','Road transport bookings and changes'],['Warehouse','Warehouse','Receiving, storage and outbound handling'],['Packing','Packing','Repacking, crating and export packing'],['Freight forwarding','Freight forwarding','Onward national and international forwarding'],['Finance','Finance','Invoice and pricing queries'],['Other','—','Requires human routing review']];
        const MASTER_CASE_CLASSES=[['Inquiry','Price or capability question, no booking yet','Inquiry profile'],['Confirmed Order','Customer expects execution','Transport required data'],['Change Request','Change to existing work','Change profile'],['Status Question','Customer asks where goods are','None'],['Complaint / Deviation','Damage, delay or deviation','Deviation profile'],['Other','Everything else, routed manually','None']];
        const MASTER_TASK_TEMPLATES=[
            {id:'transport-order',name:'Transport + Confirmed Order',scope:'Applies to every customer',tasks:[['Validate transport details','Transport','Due +2 h','Default','High'],['Create Opter order','Transport','Due +3 h','Default','High'],['Confirm order to customer','Transport','Due +4 h','Customer-visible · Default','Medium'],['Arrange pickup','Transport','Due Pickup − 2 h','Default','High']]},
            {id:'warehouse-order',name:'Warehouse + Confirmed Order',scope:'Applies to every customer',tasks:[['Prepare receiving','Warehouse','Due Arrival − 4 h','Default','Medium'],['Receive goods','Warehouse','Due Arrival + 30 min','Default','High'],['Register warehouse receipt','Warehouse','Due +1 day','Default','Medium']]},
            {id:'packing-order',name:'Packing + Confirmed Order',scope:'Applies to every customer',tasks:[['Repack to specification','Packing','Due +1 day · only when: Repacking requested','Conditional','Normal']]},
            {id:'transport-inquiry',name:'Transport + Inquiry',scope:'Applies to every customer',tasks:[['Review inquiry','Transport','Due +2 h','Default','Medium'],['Obtain pricing and operational input','Transport','Due +4 h','Default','Medium'],['Prepare response','Transport','Due +6 h','Default','Medium'],['Send quote','Transport','Due +8 h','Customer-visible · Default','Medium'],['Follow up on quote','Transport','Due +3 days','Default','Medium']]},
            {id:'abb-order',name:'Transport + Confirmed Order',scope:'ABB Robotics override',customer:'ABB Robotics',tasks:[['Validate transport details','Transport','Due +2 h','Default','High'],['Attach PO number to Opter order','Transport','Due +3 h · only when: ABB requires PO on every order','Customer-specific','High'],['Create Opter order','Transport','Due +3 h','Default','High'],['Confirm order to customer','Transport','Due +4 h','Customer-visible · Default','Medium']]}
        ];
        const MASTER_CUSTOMER_RULES=[['ABB Robotics','abb.com','High','PO number required on every order · Confirmation email always to anna.lund@abb.com'],['Hitachi Energy','hitachienergy.com','Normal','Delivery note always attached — use it to validate the delivery address'],['Alstom','alstom.com, alstom-edi.com','High','EDI mailbox sends scanned orders · always verify manually'],['Nefab','nefab.com','Normal','Quotes valid 14 days']];
        const MASTER_REQUIRED_DATA=[['Transport required data','Confirmed Order',['Customer','Pickup location','Delivery location','Items','Dimensions','Pallets'],'Opter order creation'],['Inquiry profile','Inquiry',['Customer','Pickup location','Delivery location','Items'],'Quote sending'],['Change profile','Change Request',['Existing Case or Opter reference','Requested change'],'Opter update'],['Deviation profile','Complaint / Deviation',['Customer','Existing Case or Opter reference','Description'],'Nothing — informational']];
        function masterPill(text,tone=''){return `<span class="master-pill ${tone}">${editorText(text)}</span>`}
        function masterTable(headers,rows){return `<div class="master-table-wrap"><table class="master-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
        function setMasterTab(tab){S.masterTab=tab;render()}
        function selectMasterTemplate(id){S.masterTemplate=id;render()}
        function taskMasterView(){let selected=MASTER_TASK_TEMPLATES.find(x=>x.id===(S.masterTemplate||'transport-order'))||MASTER_TASK_TEMPLATES[0];return `<div class="task-master-layout"><aside class="task-master-list">${MASTER_TASK_TEMPLATES.map(item=>`<button class="${item.id===selected.id?'active':''}" onclick="selectMasterTemplate('${item.id}')"><strong>${item.name}</strong><span>${item.scope} · ${item.tasks.length} ${item.tasks.length===1?'Task':'Tasks'}</span></button>`).join('')}</aside><section class="task-master-detail"><div class="task-master-head"><div><h2>${selected.name}</h2>${selected.customer?masterPill(selected.customer,'purple'):''}<p>${selected.scope}</p></div></div>${selected.tasks.map((task,index)=>`<div class="template-task-row"><span class="template-order">${index+1}</span><div><strong>${task[0]}</strong><p>${task[1]} · ${task[2]}</p></div><div class="template-badges">${task[3].split(' · ').map(x=>masterPill(x,x==='Customer-visible'?'blue':x==='Customer-specific'?'purple':'')).join('')}${masterPill(task[4],/^(Urgent|High)$/.test(task[4])?'amber':'')}</div></div>`).join('')}</section></div>`}
function toggleNotePin(index){let n=S.notes[index];if(n){n.pinned=!n.pinned;render()}}
function settingsForm(){S.settings=S.settings||{opterOrder:'',opterCustomer:'',ai:''};let f=(k,l)=>`<label data-aa-style="aa-static-style-59">${l}<input type="password" autocomplete="off" value="${(S.settings&&S.settings[k]||'').replace(/"/g,'&quot;')}" oninput="S.settings.${k}=this.value" data-aa-style="aa-static-style-60"></label>`;return `<div data-aa-style="aa-static-style-61">${f('opterOrder','OPter API key (Order)')}${f('opterCustomer','OPter API key (Customer data)')}${f('ai','AI API key')}<div data-aa-style="aa-static-style-62"><button class="btn primary" onclick="toast('Settings saved')">Save Settings</button></div></div>`}
function masterContent(){let tab=S.masterTab||'Task Master';if(tab==='Categories')return masterTable(['Category','Default Department','What It Covers','Active'],MASTER_CATEGORIES.map(x=>[...x,masterPill('Active','green')]));if(tab==='Case Classes')return masterTable(['Case Class','Meaning','Required Data Profile','Active'],MASTER_CASE_CLASSES.map(x=>[...x,masterPill('Active','green')]));if(tab==='Task Master')return taskMasterView();if(tab==='Customers & Rules')return masterTable(['Customer','Sender Domains','Default Priority','Rules'],MASTER_CUSTOMER_RULES.map(x=>[x[0],`<span class="code-text">${x[1]}</span>`,masterPill(x[2],x[2]==='High'?'amber':''),x[3]]));return `${masterTable(['Profile','Case Class','Required Fields','Blocks'],MASTER_REQUIRED_DATA.map(x=>[x[0],x[1],`<div class="master-fields">${x[2].map(y=>masterPill(y)).join('')}</div>`,x[3]]))}`}
        function masterManagement(){if(S.role!=='Admin')return head('Access denied','Master Data is available only to the Admin.');let tabs=['Categories','Case Classes','Task Master','Customers & Rules','Required Data'],descriptions={'Categories':'What kind of service a request is about.','Case Classes':'What the customer actually wants, which drives the work and required data.','Task Master':'Predefined work generated for confirmed services and Case Classes.','Customers & Rules':'Rules that adjust priority and work for a specific customer.','Required Data':'What must be known before the next operational step can happen.'},tab=S.masterTab||'Task Master';return head('Master Data',descriptions[tab],'<span class="read-only-label">Fixed reference data</span>')+`<div class="master-tabs">${tabs.map(x=>`<button class="${x===tab?'active':''}" onclick="setMasterTab('${x}')">${x}</button>`).join('')}</div><div class="master-content">${masterContent()}</div>`}
        const masterNavItemsBase=navItems;navItems=function(){let items=masterNavItemsBase();if(S.role==='Admin'&&!items.some(x=>x[0]==='masters')){let at=Math.max(0,items.findIndex(x=>x[0]==='dashboard'));items.splice(at,0,['masters','<svg viewBox="0 0 20 20" aria-hidden="true"><ellipse cx="10" cy="5" rx="6.5" ry="2.5"/><path d="M3.5 5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V5M3.5 10v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5"/></svg>','Masters'])}return items}
        document.head.insertAdjacentHTML('beforeend',`<style>.master-tabs{display:flex;gap:4px;background:#fff;border:1px solid var(--line);border-radius:7px;padding:5px;margin-bottom:14px;overflow:auto}.master-tabs button{border:0;background:transparent;padding:10px 15px;border-radius:5px;color:var(--muted);font-weight:750;white-space:nowrap}.master-tabs button.active{background:#eaf4fc;color:var(--blue)}.master-content{min-width:0}.master-table-wrap{background:#fff;border:1px solid var(--line);border-radius:7px;overflow:auto}.master-table{min-width:850px}.master-table th{font-size:12px;font-weight:600;text-transform:none;letter-spacing:0}.master-table td{padding:16px 18px}.master-pill{display:inline-flex;padding:4px 8px;border:1px solid #d7e1eb;border-radius:5px;background:#f7f9fb;font-size:11px;font-weight:750;white-space:nowrap}.master-pill.green{background:#ecfbf2;border-color:#bdeccf;color:#148348}.master-pill.amber{background:#fff9e8;border-color:#f4d270;color:#a76600}.master-pill.blue{background:#eef6ff;border-color:#bad9fa;color:#1268c4}.master-pill.purple{background:#f6f0ff;border-color:#dfccff;color:#7137c8}.read-only-label{display:inline-flex;padding:6px 10px;border-radius:5px;background:#eef3f7;color:#52677b;font-size:11px;font-weight:750}.task-master-layout{display:grid;grid-template-columns:300px minmax(0,1fr);gap:14px}.task-master-list,.task-master-detail{background:#fff;border:1px solid var(--line);border-radius:7px;overflow:hidden}.task-master-list button{display:block;width:100%;border:0;border-bottom:1px solid var(--line);background:#fff;text-align:left;padding:14px 16px}.task-master-list button:hover,.task-master-list button.active{background:#eaf4fc}.task-master-list button.active{box-shadow:inset 3px 0 0 var(--blue)}.task-master-list strong,.task-master-list span{display:block}.task-master-list span{color:var(--muted);font-size:12px;margin-top:4px}.task-master-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:17px 20px;border-bottom:1px solid var(--line)}.task-master-head h2{display:inline-block;margin:0 8px 4px 0;font-size:17px}.task-master-head p,.template-task-row p{margin:4px 0 0;color:var(--muted);font-size:12px}.template-task-row{display:grid;grid-template-columns:32px minmax(0,1fr) auto;gap:12px;align-items:center;padding:16px 20px;border-bottom:1px solid var(--line)}.template-order{color:var(--muted)}.template-badges,.master-fields{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}.master-footnote{padding:14px 20px;background:#f1f6fa;color:var(--muted);font-size:12px}.master-guidance{margin-top:12px;padding:12px 15px;border:1px solid #ddd0fb;border-radius:7px;background:#f7f3ff;color:#6542a5}.code-text{font-family:ui-monospace,SFMono-Regular,Consolas,monospace}@media(max-width:850px){.task-master-layout{grid-template-columns:1fr}.task-master-list{display:flex;overflow:auto}.task-master-list button{min-width:240px;border-bottom:0;border-right:1px solid var(--line)}.template-task-row{grid-template-columns:25px 1fr}.template-badges{grid-column:2;justify-content:flex-start}}</style>`)
        /* Consolidated lifecycle: four statuses; deadline and dependency states are conditions. */
        TASK_WORKFLOW_STATUSES.splice(0,TASK_WORKFLOW_STATUSES.length,'To-Do','In Progress','On Hold','Completed');
        TASKS.forEach((t,index)=>{let old=t[7];t[7]=old==='Completed'?'Completed':old==='In Progress'?'In Progress':old==='Waiting'||old==='Blocked'?'On Hold':'To-Do';if(t[7] === 'Completed'){TASK_COMPLETIONS[t[8]]=TASK_COMPLETIONS[t[8]]||{at:`09 Oct 2026, ${String(9+(index%7)).padStart(2,'0')}:00`,by:t[4]};TASK_COMPLETIONS[t[8]].resolution=TASK_COMPLETIONS[t[8]].resolution||'Work Completed'}});
        S.taskTab=['To-Do','In Progress','On Hold','Completed'].includes(S.taskTab)?S.taskTab:'To-Do';
        effectiveTaskStatus=function(t){return ['To-Do','In Progress','On Hold','Completed'].includes(t[7])?t[7]:'To-Do'};
        kanbanStatus=function(t){return effectiveTaskStatus(t)};
        taskDeadlineState=function(t){if(effectiveTaskStatus(t)==='Completed')return '';let due=dateValue(t[6]),today=dateValue(OPERATION_DATE),day=86400000;return due<today?'Overdue':due===today?'Due Today':due-today<=day?'Due Soon':''};
        completionOutcome=function(t){return effectiveTaskStatus(t)==='Completed'?(TASK_COMPLETIONS[t[8]]?.resolution||'Work Completed'):null};
        // Timing outcome (early, on time or late against the due date). completionOutcome now carries the resolution, so charts that measure timing use this.
        function timingOutcome(t){let record=TASK_COMPLETIONS[t[8]];if(effectiveTaskStatus(t)!=='Completed'||!record)return null;let completedDay=completionDayValue(record.at),dueDay=completionDayValue(t[6]);return completedDay<dueDay?'Completed Early':completedDay>dueDay?'Completed Late':'Completed On Time'}
        completionOutcomePill=function(t){let outcome=completionOutcome(t);return outcome?`<span class="pill green resolution-outcome">${editorText(outcome)}</span>`:''};
        taskStatusPills=function(t){return pill(effectiveTaskStatus(t))};
        dueDateCell=function(t){let condition=taskDeadlineState(t);return `${t[6]}${condition?`<div><span class="task-condition ${condition==='Overdue'?'red':condition==='Due Today'?'amber':'blue'}">${condition}</span></div>`:''}`};
        recalculateDependencies=function(){return true};
        function openCompletionOutcome(id){let t=taskById(id);if(!t||!canUpdateTask(t)){toast('You do not have permission to complete this Task');return}if(unresolvedDependencies(t).length){toast('This Task is blocked from completion until its dependency is resolved');render();return}S.editorType='taskResolution';S.editorData={taskId:id,resolution:TASK_COMPLETIONS[id]?.resolution||'Work Completed'};render()}
        function confirmTaskResolution(){let d=S.editorData,t=taskById(d.taskId);if(!t||unresolvedDependencies(t).length){toast('The dependency must be resolved before completion');return}let previous=effectiveTaskStatus(t),at='14 Oct 2026, 10:30',author=actorName();t[7] = 'Completed';TASK_COMPLETIONS[t[8]]={at,by:author,resolution:d.resolution};(TASK_STATUS_HISTORY[t[8]]=TASK_STATUS_HISTORY[t[8]]||[]).unshift({from:previous,to:'Completed',comment:`Resolution: ${d.resolution}`,author,at});S.activities.unshift([`${t[8]} completed · Resolution: ${d.resolution}`,author,at]);S.editorType=null;S.editorData={};render();toast(`${t[8]} completed as ${d.resolution}`)}
        quickTaskStatusUpdate=function(id,next){let t=taskById(id);if(!t||!canUpdateTask(t)){toast('You do not have permission to change this Task status');render();return}if(next==='Completed'){openCompletionOutcome(id);return}let previous=effectiveTaskStatus(t);if(previous===next)return;let at='14 Oct 2026, 10:25',author=actorName();t[7]=next;delete TASK_COMPLETIONS[id];(TASK_STATUS_HISTORY[id]=TASK_STATUS_HISTORY[id]||[]).unshift({from:previous,to:next,comment:'Status changed',author,at});S.activities.unshift([`${id} status changed from ${previous} to ${next}`,author,at]);render();toast(`${id} moved to ${next}`)};
        dropTaskInColumn=function(event,status){event.preventDefault();event.currentTarget.classList.remove('drop-target','drop-denied');let id=event.dataTransfer.getData('text/plain')||S.dragTaskId;S.dragTaskId=null;quickTaskStatusUpdate(id,status)};
        const lifecycleAdminTaskUpdateBase=adminInlineTaskUpdate;adminInlineTaskUpdate=function(id,field,value){if(field==='status'){quickTaskStatusUpdate(id,value);return}let t=taskById(id),before=t?.[field];lifecycleAdminTaskUpdateBase(id,field,value);if(t){S.activities.unshift([`${id} ${field} updated`,actorName(),'14 Oct 2026, 10:25']);let label={title:'Task name',description:'Description',department:'Department',assignee:'Assignee',priority:'Priority',due:'Due date',taskType:'Task Type'}[field]||field;(S.taskActivity[id]=S.taskActivity[id]||[]).unshift({text:`updated the ${label}`,author:actorName(),at:auditTimestamp(),type:'update',diffId:before!==undefined?('diff-field-'+id+'-'+field+'-'+Date.now()):null,diffOld:before!==undefined?`${label}: ${before}`:null,diffNew:before!==undefined?`${label}: ${value}`:null})}};
        taskManager=function(){let statuses=['To-Do','In Progress','On Hold','Completed'],rows=TASKS.filter(t=>effectiveTaskStatus(t)===S.taskTab);rows=applyFilters(rows);return head('Task Manager','View and manage all Tasks across departments.')+`<div class="card"><div class="tabs">${statuses.map(status=>`<button class="${S.taskTab===status?'active':''}" onclick="S.taskTab='${status}';S.filters.status='All';render()">${status} (${TASKS.filter(t=>effectiveTaskStatus(t)===status).length})</button>`).join('')}</div>${filterBar(TASKS,{status:false})}${tasksTable(rows,true,true)}</div>`};
        function toggleCaseClosure(){let c=selectedCaseData(),row=CASES.find(x=>x[0]===c.id),closed=normalizeCaseStatus(c.status)==='Completed',at='14 Oct 2026, 10:40',actor=actorName();if(closed){c.status='In Progress';if(row)row[6]='In Progress';S.activities.unshift([`${c.id} reopened`,actor,at]);render();toast(`${c.id} reopened`);return}let unresolved=selectedCaseTasks().filter(t=>effectiveTaskStatus(t)!=='Completed'||!completionOutcome(t));if(unresolved.length){toast(`Case cannot close · ${unresolved.length} required ${unresolved.length===1?'Task is':'Tasks are'} unresolved`);S.caseTab='Tasks';render();return}c.status='Completed';if(row)row[6]='Closed';S.activities.unshift([`${c.id} closed · all required Tasks resolved`,actor,at]);render();toast(`${c.id} closed`)}
        const lifecycleCaseViewBase=caseView;caseView=function(){let template=document.createElement('template');template.innerHTML=lifecycleCaseViewBase();let title=template.content.querySelector('.case-v2-title'),c=selectedCaseData();if(title){let closed=c.status==='Closed'||c.status==='Completed',button=document.createElement('button');button.className=`btn case-close-button ${closed?'case-reopen-button':''}`;button.textContent=closed?'Reopen Case':'Close Case';button.setAttribute('onclick','toggleCaseClosure()');title.appendChild(button)}return template.innerHTML};
        const lifecycleEditorBase=editorDialog;editorDialog=function(){if(S.editorType==='taskResolution'){let d=S.editorData,t=taskById(d.taskId),options=['Work Completed','Customer Canceled','No Longer Required','Duplicate / Superseded'];return `<div class="modal-shade"><div class="assign-modal resolution-modal"><h2>Complete ${t[8]}</h2><div class="body"><p><strong>${editorText(t[0])}</strong></p><p class="sub">Select how this Task was resolved. A comment is not required.</p><label class="resolution-field">Resolution Outcome<select onchange="S.editorData.resolution=this.value">${options.map(x=>`<option ${x===d.resolution?'selected':''}>${x}</option>`).join('')}</select></label>${unresolvedDependencies(t).length?'<div class="notice"><strong>Completion blocked</strong><br>Resolve or remove the selected dependency first.</div>':''}</div><div class="footer"><button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" ${unresolvedDependencies(t).length?'disabled':''} onclick="confirmTaskResolution()">Complete Task</button></div></div></div>`}return lifecycleEditorBase()};
        function decorateLifecycleConditions(){if(S.page!=='case')return;let inspector=document.querySelector('.task-inspector'),task=taskById(S.kanbanTaskId);if(inspector&&task){let heading=[...inspector.querySelectorAll('h3')].find(x=>x.textContent.trim()==='Dependencies'),notice=heading?.parentElement?.querySelector('.notice');if(notice)notice.innerHTML=unresolvedDependencies(task).length?`<strong>Blocked from completion</strong><br><span class="sub">Parallel work may continue while the dependency is unresolved.</span>`:'<strong>✓ Completion is not blocked</strong>'}}
        document.head.insertAdjacentHTML('beforeend',`<style>.kanban-column[data-status="To-Do"] .kanban-column-head{background:#fff7e5;color:#8a5700}.kanban-column[data-status="On Hold"] .kanban-column-head{background:#f4efff;color:#6d42aa}.kanban-column[data-status="On Hold"] .kanban-card{border-left-color:#865ac0}.task-condition{display:inline-flex;margin-top:4px;padding:3px 6px;border-radius:4px;font-size:10px;font-weight:800;line-height:1.1;background:#eef5fc;color:#1268a8}.task-condition.red{background:#ffedef;color:#bd2533}.task-condition.amber{background:#fff5d9;color:#9a6100}.condition-row{display:flex;gap:5px;flex-wrap:wrap;margin-top:8px}.resolution-field{display:grid;gap:7px;margin-top:16px;font-weight:750}.resolution-field select{height:42px;border:1px solid var(--line);border-radius:5px;background:#fff;padding:0 10px}.resolution-outcome{white-space:normal}.case-close-button{margin-left:0!important;background:#c62828!important;border-color:#c62828!important;color:#fff!important;box-shadow:0 2px 6px rgba(198,40,40,.22)}.case-close-button:hover{background:#a91f1f!important;border-color:#a91f1f!important}.case-reopen-button{background:#08764c!important;border-color:#08764c!important;box-shadow:0 2px 6px rgba(8,118,76,.2)}.case-reopen-button:hover{background:#06633f!important;border-color:#06633f!important}.case-v2-title>.case-close-button{order:99}</style>`)
        const rowNavigationRender = render; render = function () {if(S.loggedIn&&S.page==='masters'){if(S.role!=='Admin')S.page='home';else{document.getElementById('root').innerHTML=shell(masterManagement());return}} rowNavigationRender(); enableClickableRows(); removeNonOrderConfidenceDisplays(); compactDueTodayLabels(); removeQueueIssueColumn(); normalizeAdminReviewScreen(); renderTaskSummaryTable(); simplifyTaskStatusControls(); constrainCaseTabHistory() };
        const lifecycleRenderBase=render;render=function(){lifecycleRenderBase();decorateLifecycleConditions()};
        /* Normal-user Home defaults to open Tasks requiring near-term attention. */
        userHome=function(){let u=currentUser(),mine=TASKS.filter(t=>t[4]===u.name),dueSoon=mine.filter(t=>['Due Today','Due Soon'].includes(taskDeadlineState(t))).sort((a,b)=>{let conditionOrder={'Due Today':0,'Due Soon':1},conditionDifference=conditionOrder[taskDeadlineState(a)]-conditionOrder[taskDeadlineState(b)];return conditionDifference||dateValue(a[6])-dateValue(b[6])||a[8].localeCompare(b[8])}),pendingCase=Object.values(CASE_DETAILS).find(c=>!caseAcknowledged(c)&&mine.some(t=>t[1]===c.id));return head(`Good morning, ${u.name.split(' ')[0]}`,'Here are your Tasks for today.')+kpis([['Tasks',mine.length],['Due Today',mine.filter(t=>taskDeadlineState(t)==='Due Today').length,'amber'],['In Progress',mine.filter(t=>effectiveTaskStatus(t)==='In Progress').length],['To-Do',mine.filter(t=>effectiveTaskStatus(t)==='To-Do').length],['Overdue',mine.filter(t=>taskDeadlineState(t)==='Overdue').length,'red']])+(pendingCase?`<div class="notice">Customer acknowledgement for ${pendingCase.id} is pending. <button class="link" onclick="openAcknowledgementCase('${pendingCase.id}')">Open Communication</button></div>`:'')+`<div class="grid2"><div class="card"><div class="card-head"><h2>Task Due Soon</h2></div>${homeDueTasksTable(dueSoon)}</div><div class="card"><div class="card-head"><h2>Recent Mentions</h2></div><div class="attention-list">${mine.slice(0,2).map((t,i)=>`<div class="attention"><span class="avatar">${i?'MS':'SL'}</span><div><strong>${i?'Maria Svensson':'Sofia Lind'} mentioned you</strong><span class="sub">${t[1]} · ${t[2]}</span></div><button class="link" onclick="openTask('${t[8]}')">Open</button></div>`).join('')}</div></div></div>`};
        const acknowledgementFreeHomeBase=home;home=function(){let template=document.createElement('template');template.innerHTML=acknowledgementFreeHomeBase();template.content.querySelectorAll('.notice').forEach(notice=>{if(/customer acknowledgement|acknowledgement pending/i.test(notice.textContent||''))notice.remove()});return template.innerHTML};
        /* Related-request review: AI explains relevance; Admin makes the routing decision. */
        const RELATED_REQUEST_ID='EML-4128',RELATED_CASE_ID='CASE-1100';
        if(CASE_DETAILS[RELATED_CASE_ID])CASE_DETAILS[RELATED_CASE_ID].status='Completed';let relatedCaseRow=CASES.find(c=>c[0]===RELATED_CASE_ID);if(relatedCaseRow)relatedCaseRow[6]='Closed';TASKS.filter(t=>t[1]===RELATED_CASE_ID).forEach(t=>{t[7] = 'Completed';TASK_COMPLETIONS[t[8]]=TASK_COMPLETIONS[t[8]]||{at:'09 Oct 2026, 16:30',by:t[4]==='Unassigned'?'John Andersson':t[4],resolution:'Work Completed'}});
        if(!QUEUE.some(q=>q[0]===RELATED_REQUEST_ID))QUEUE.unshift([RELATED_REQUEST_ID,'ABB Robotics','Additional loading instruction for industrial robots','91%','Potential continuation of a closed Case','14 Oct 2026, 08:42','Awaiting Review']);
        S.relatedDecision=S.relatedDecision||'existing';S.relatedCompareOpen=false;S.caseRelations=S.caseRelations||{};
        const relevanceQueueTableBase=queueTable;queueTable=function(home=false){let template=document.createElement('template');template.innerHTML=relevanceQueueTableBase(home);if(home)return template.innerHTML;let table=template.content.querySelector('table'),header=table?.querySelector('thead tr');if(!table||!header)return template.innerHTML;let received=[...header.children].find(th=>/Received/i.test(th.textContent||'')),relatedHead=document.createElement('th'),relevanceHead=document.createElement('th');relatedHead.textContent='Related Case';relevanceHead.textContent='Relevance';header.insertBefore(relatedHead,received||null);header.insertBefore(relevanceHead,received||null);table.querySelectorAll('tbody tr').forEach(row=>{let id=row.querySelector('td')?.textContent.trim(),receivedCell=[...row.children].find(td=>/\d{2} Oct 2026/.test(td.textContent||'')),related=document.createElement('td'),relevance=document.createElement('td');if(id===RELATED_REQUEST_ID){related.innerHTML=`<button class="case-link" onclick="event.stopPropagation();openCase('${RELATED_CASE_ID}')">${RELATED_CASE_ID}</button><div class="sub">Closed 09 Oct 2026</div>`;relevance.innerHTML='<span class="relevance-badge strong">91% · Strong</span>'}else{related.innerHTML='<span class="sub">—</span>';relevance.innerHTML='<span class="sub">No match</span>'}row.insertBefore(related,receivedCell||null);row.insertBefore(relevance,receivedCell||null)});return template.innerHTML};
        const relatedOpenReviewBase=openReviewCase;openReviewCase=function(emailId){if(emailId===RELATED_REQUEST_ID){S.reviewEmailId=emailId;S.selectedCase=RELATED_CASE_ID;S.relatedDecision='existing';S.page='approval';render();return}relatedOpenReviewBase(emailId)};
        function setRelatedDecision(value){S.relatedDecision=value;render()}
        function toggleRelatedComparison(){S.relatedCompareOpen=!S.relatedCompareOpen;render()}
        function removeRelatedRequest(){let index=QUEUE.findIndex(q=>q[0]===RELATED_REQUEST_ID);if(index>=0)QUEUE.splice(index,1)}
        function nextTaskNumber(){return `TASK-${Math.max(...TASKS.map(t=>Number(String(t[8]).replace(/\D/g,''))||0))+1}`}
        function continueRelatedRequest(){let decision=S.relatedDecision,actor=actorName(),at='14 Oct 2026, 10:55',c=CASE_DETAILS[RELATED_CASE_ID],caseRow=CASES.find(x=>x[0]===RELATED_CASE_ID);if(decision==='clarification'){let q=QUEUE.find(x=>x[0]===RELATED_REQUEST_ID);if(q){q[4]='Confirm whether this is additional work for CASE-1100';q[6]='Needs Clarification'}S.activities.unshift([`${RELATED_REQUEST_ID} moved to Needs Clarification`,actor,at]);S.page='review';S.queueTab='Needs Clarification';render();toast('Clarification requested before routing');return}if(decision==='existing'){let id=nextTaskNumber();c.status='In Progress';if(caseRow)caseRow[6]='Active';TASKS.push(['Coordinate additional loading instruction',RELATED_CASE_ID,c.customer,'Transport','Unassigned','High','15 Oct 2026','To-Do',id,'Transport booking','Later']);S.communications.unshift({id:`MSG-${9400+S.communications.length}`,caseId:RELATED_CASE_ID,direction:'Incoming',subject:'Additional loading instruction for industrial robots',body:'Please arrange an additional loading coordination action for the same shipment.',author:'Thomas Weber',at:'14 Oct 2026, 08:42'});S.activities.unshift([`${RELATED_CASE_ID} reopened · ${id} created from ${RELATED_REQUEST_ID}`,actor,at]);removeRelatedRequest();S.selectedCase=RELATED_CASE_ID;S.caseTab='Tasks';S.page='case';render();toast(`${RELATED_CASE_ID} reopened and ${id} created`);return}let numbers=Object.keys(CASE_DETAILS).map(id=>Number(id.replace(/\D/g,''))||0),newId=`CASE-${Math.max(...numbers)+1}`,taskId=nextTaskNumber();CASE_DETAILS[newId]={...c,id:newId,subject:'Additional loading instruction for industrial robots',body:'Please arrange an additional loading coordination action for the industrial robots shipment.',created:'14 Oct 2026, 08:42',due:'15 Oct 2026',requestedDate:'15 Oct 2026',status:'In Progress',priority:'High',attachments:[],note:`Created from ${RELATED_REQUEST_ID}; related to ${RELATED_CASE_ID}.`};CASES.push([newId,c.customer,'Change Request','Transport','High','15 Oct 2026','Pending']);TASKS.push(['Review additional loading instruction',newId,c.customer,'Transport','Unassigned','High','15 Oct 2026','To-Do',taskId,'Transport booking','Later']);S.caseRelations[newId]={relatedCaseId:RELATED_CASE_ID,sourceRequest:RELATED_REQUEST_ID,relevance:91};S.activities.unshift([`${newId} created from ${RELATED_REQUEST_ID} · related to ${RELATED_CASE_ID}`,actor,at]);removeRelatedRequest();S.selectedCase=newId;S.caseTab='Overview';S.page='case';render();toast(`${newId} created and linked to ${RELATED_CASE_ID}`)}
        function relatedRequestApproval(){let c=CASE_DETAILS[RELATED_CASE_ID],decision=S.relatedDecision||'existing',options=[['existing','Add Task to CASE-1100','Continue the same order by reopening the Case and creating new work.'],['new','Create New Case','Create a separate Case while retaining a relationship to CASE-1100.'],['clarification','Request Clarification','Ask for confirmation before creating or reopening operational work.']];return `<button class="back" onclick="go('review')">‹ Back to Review Requests</button>${head('Review Request',`${RELATED_REQUEST_ID} · Follow-up transport request — ABB Robotics`,pill('Awaiting Review'))}<div class="related-review-layout"><div class="related-review-main"><section class="panel related-email"><div class="panel-title"><h2>Incoming Email</h2>${pill('Received')}</div><div class="email-meta"><dl><dt>From</dt><dd>Thomas Weber · thomas.weber@abb.com</dd><dt>To</dt><dd>transport@aalogistik.se</dd><dt>Received</dt><dd>14 Oct 2026, 08:42</dd><dt>Subject</dt><dd>Additional loading instruction for industrial robots</dd></dl></div><div class="email-body">Hi AA Logistik team,<br><br>Following up on our recent shipment, we need an additional loading coordination action for the robots at pickup in Västerås. Please arrange a higher loading dock and a wider ramp; the remaining shipment details are unchanged.<br><br>Best regards,<br>Thomas Weber<br>ABB Robotics</div></section><section class="panel relevance-card"><div class="panel-title"><h2>Potential Related Case</h2><span class="relevance-badge strong">91% relevance · Strong match</span></div><div class="related-case-line"><button class="case-link" onclick="openCase('${RELATED_CASE_ID}')">${RELATED_CASE_ID} · Transport Order — ABB Robotics</button>${pill('Closed')}<span class="sub">Closed 09 Oct 2026</span></div><div class="relevance-evidence"><div><span class="evidence-icon match">✓</span><strong>Same Microsoft 365 conversation</strong><span>Part of the same email thread</span></div><div><span class="evidence-icon match">✓</span><strong>Same customer and sender</strong><span>ABB Robotics · thomas.weber@abb.com</span></div><div><span class="evidence-icon match">✓</span><strong>Same PO number · 4575381675</strong><span>Referenced in both requests</span></div><div><span class="evidence-icon match">✓</span><strong>Same pickup and delivery locations</strong><span>Västerås, Sweden → Munich, Germany</span></div><div><span class="evidence-icon changed">!</span><strong>New information after closure</strong><span>Additional loading instruction received five days later</span></div></div><div class="actions"><button class="btn" onclick="openCase('${RELATED_CASE_ID}')">Open related Case</button><button class="btn" onclick="toggleRelatedComparison()">Compare requests</button></div></section>${S.relatedCompareOpen?`<section class="panel comparison-panel"><div class="panel-title"><h2>Request Comparison</h2><button class="link" onclick="toggleRelatedComparison()">Close</button></div><div class="comparison-grid"><div><strong>Original request</strong><p>Transport two industrial robots from Västerås to Munich using the confirmed shipment plan.</p></div><div><strong>New request</strong><p>Same shipment and route, with an additional loading dock and ramp requirement.</p></div><div class="comparison-match"><strong>Matching</strong><p>Customer, sender, email thread, PO number, goods, pickup and delivery.</p></div><div class="comparison-change"><strong>Changed</strong><p>Loading method and site equipment requirement.</p></div></div></section>`:''}</div><aside class="related-review-side"><section class="panel ai-recommendation"><div class="panel-title"><h2>AI Recommendation</h2><span class="sub">AI recommends; Admin decides</span></div><div class="recommendation-box"><strong>Add new work to CASE-1100</strong><span>This request continues the same order and shipment.</span></div><p><strong>Reasoning</strong></p><p class="sub">The message continues the same Microsoft 365 conversation and references the same customer, PO number, goods and route.</p></section><section class="panel admin-decision"><div class="panel-title"><h2>Admin Decision</h2></div>${options.map(([value,title,description])=>`<button class="decision-option ${decision===value?'selected':''}" onclick="setRelatedDecision('${value}')"><span class="decision-radio"></span><span><strong>${title}</strong><small>${description}</small></span>${value==='existing'?'<em>Recommended</em>':''}</button>`).join('')}${decision==='existing'?`<div class="task-preview"><strong>New Task preview</strong><div><span>Task</span><b>Coordinate additional loading instruction</b></div><div><span>Department</span><b>Transport</b></div><div><span>Priority</span><b>High</b></div><div><span>Due</span><b>15 Oct 2026</b></div><div><span>Owner</span><b>Unassigned</b></div></div>`:''}<div class="decision-actions"><button class="btn" onclick="go('review')">Back to Review Requests</button><button class="btn primary" onclick="continueRelatedRequest()">Continue</button></div></section></aside></div>`}
        const scalableRelatedRequestApproval=relatedRequestApproval;relatedRequestApproval=function(){let template=document.createElement('template');template.innerHTML=scalableRelatedRequestApproval();let comparison=template.content.querySelector('.comparison-panel');if(comparison){comparison.remove();let shade=document.createElement('div');shade.className='modal-shade related-comparison-shade';shade.setAttribute('onclick',"if(event.target===this)toggleRelatedComparison()");let modal=document.createElement('div');modal.className='related-comparison-modal';modal.appendChild(comparison);shade.appendChild(modal);template.content.appendChild(shade)}return template.innerHTML};
        const relatedApprovalBase=approval;approval=function(){return S.reviewEmailId===RELATED_REQUEST_ID?relatedRequestApproval():relatedApprovalBase()};
        document.head.insertAdjacentHTML('beforeend',`<style>.relevance-badge{display:inline-flex;padding:5px 9px;border-radius:999px;font-size:11px;font-weight:800;white-space:nowrap}.relevance-badge.strong{background:#dcf8e5;color:#137a3b}.related-review-layout{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(360px,.95fr);gap:14px;align-items:start}.related-review-main,.related-review-side{display:grid;grid-auto-rows:max-content;align-content:start;align-items:start;gap:14px}.related-review-layout .panel{min-height:0;height:auto}.related-email .email-body{max-height:260px;overflow-y:auto;scrollbar-gutter:stable}.related-case-line{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--line)}.relevance-evidence{padding:8px 16px}.relevance-evidence>div{display:grid;grid-template-columns:24px minmax(210px,.8fr) 1fr;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid #edf1f5;font-size:12px}.evidence-icon{display:grid;place-items:center;width:19px;height:19px;border-radius:50%;font-weight:900;color:#fff}.evidence-icon.match{background:#2da464}.evidence-icon.changed{background:#e49a15}.relevance-card>.actions{padding:0 16px 14px}.recommendation-box{display:grid;gap:5px;margin:14px;padding:16px;border-radius:6px;background:#eaf8ef;color:#17683c}.recommendation-box strong{font-size:16px}.ai-recommendation>p{padding:0 14px}.decision-option{position:relative;display:grid;grid-template-columns:23px 1fr auto;gap:10px;align-items:start;width:calc(100% - 28px);margin:10px 14px;padding:13px 14px;border:1px solid var(--line);border-radius:7px;background:#fff;text-align:left}.decision-option.selected{border-color:#1683dd;background:#f2f8ff;box-shadow:0 0 0 1px #1683dd}.decision-radio{width:18px;height:18px;border:2px solid #9eb0c0;border-radius:50%;margin-top:1px}.decision-option.selected .decision-radio{border:5px solid #1683dd}.decision-option small{display:block;color:var(--muted);line-height:1.35;margin-top:4px}.decision-option em{padding:3px 7px;border-radius:999px;background:#e2f0ff;color:#0872c9;font-size:10px;font-style:normal}.task-preview{margin:10px 14px;padding:12px;border:1px solid var(--line);border-radius:6px;background:#f8fafc}.task-preview>strong{display:block;margin-bottom:7px}.task-preview>div{display:grid;grid-template-columns:85px 1fr;gap:8px;padding:3px 0;font-size:11px}.task-preview span{color:var(--muted)}.decision-actions{display:flex;justify-content:flex-end;gap:8px;padding:14px;border-top:1px solid var(--line)}.comparison-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:16px}.comparison-grid>div{padding:14px;border:1px solid var(--line);border-radius:6px}.comparison-match{background:#f0fbf4}.comparison-change{background:#fff8e8}.related-comparison-shade{z-index:1200;padding:24px}.related-comparison-modal{width:min(900px,calc(100vw - 48px));max-height:calc(100vh - 48px);overflow:auto;border-radius:8px;box-shadow:0 24px 70px rgba(7,30,50,.28)}.related-comparison-modal .comparison-panel{min-height:0;height:auto;margin:0}.related-comparison-modal .panel-title{position:sticky;top:0;background:#fff;z-index:2}@media(max-width:1050px){.related-review-layout{grid-template-columns:1fr}.related-review-side{grid-template-columns:1fr 1fr}}@media(max-width:720px){.related-review-side,.comparison-grid{grid-template-columns:1fr}.relevance-evidence>div{grid-template-columns:24px 1fr}.relevance-evidence>div span:last-child{grid-column:2}.related-comparison-shade{padding:12px}.related-comparison-modal{width:calc(100vw - 24px);max-height:calc(100vh - 24px)}}</style>`);
        /* Direct department Task take-up; no Manager approval or decline workflow. */
        REQUESTS.splice(0,REQUESTS.length);delete PERMISSION_META.approveRequests;delete PERMISSION_META.requestAssignments;Object.values(PERMISSIONS).forEach(p=>{delete p.approveRequests;delete p.requestAssignments});if(S.taskScope==='Assignment Requests')S.taskScope='My Department Tasks';
        function canTakeDepartmentTask(t){let u=currentUser();return !!t&&t[4]==='Unassigned'&&t[3]===u.department&&(u.role==='User'||u.role==='Manager')}
        function takeDepartmentTask(id){let t=taskById(id),u=currentUser();if(!canTakeDepartmentTask(t)){toast('You can take only an unassigned Task from your own department');return}t[4]=u.name;t[7] = 'To-Do';TASK_ASSIGNMENTS[id]={assignedTo:u.name,assignedBy:`${u.name} · Self-assigned`,assignedAt:'14 Oct 2026, 11:10',classification:t[9]};S.activities.unshift([`${id} taken directly by ${u.name}`,u.name,'14 Oct 2026, 11:10']);render();toast(`${id} assigned to you`)}
        scopeTabs=function(){let tabs=['My Tasks','My Department Tasks',...(can('viewCompanyTasks')?['All Tasks']:[])];return `<div class="tabs">${tabs.map(t=>`<button class="${S.taskScope===t?'active':''}" onclick="setTaskScope('${t}')">${t}</button>`).join('')}</div>`};
        const directTakeScopedTasksBase=scopedTasksPage;scopedTasksPage=function(manager=false){if(S.taskScope==='Assignment Requests')S.taskScope='My Department Tasks';return directTakeScopedTasksBase(manager)};
        const directTakeTaskActionBase=taskAction;taskAction=function(t,admin,manager){if(!admin&&canTakeDepartmentTask(t))return `<button class="btn primary take-task-button" onclick="event.stopPropagation();takeDepartmentTask('${t[8]}')">Take Task</button>`;return directTakeTaskActionBase(t,admin,manager)};
        managerHome=function(){let u=currentUser(),team=TASKS.filter(t=>t[3]===u.department),open=team.filter(t=>effectiveTaskStatus(t)!=='Completed');return head(`Welcome back, ${u.name.split(' ')[0]}`,`Here's the latest from your ${u.department} team.`)+kpis([['My Department Tasks',team.length],['Due Today',open.filter(t=>taskDeadlineState(t)==='Due Today').length,'amber'],['In Progress',team.filter(t=>effectiveTaskStatus(t)==='In Progress').length],['To-Do',team.filter(t=>effectiveTaskStatus(t)==='To-Do').length],['Overdue',open.filter(t=>taskDeadlineState(t)==='Overdue').length,'red']])+`<div class="card"><div class="card-head"><h2>Team Workload</h2><span class="sub">Current ${u.department} assignment distribution</span></div>${teamWorkload()}</div>`};
        notificationCount=function(){return S.notificationsRead?0:2};
        const noAssignmentNotificationBase=notificationMenu;notificationMenu=function(){let template=document.createElement('template');template.innerHTML=noAssignmentNotificationBase();template.content.querySelectorAll('button').forEach(button=>{if(/assignment request|request approved|request declined/i.test(button.textContent||''))button.remove()});return template.innerHTML};
        const noAssignmentDashboardBase=dashboard;dashboard=function(){let template=document.createElement('template');template.innerHTML=noAssignmentDashboardBase();template.content.querySelectorAll('.analytics-card').forEach(card=>{if(/Assignment Request Outcomes/i.test(card.textContent||''))card.remove()});return template.innerHTML};
        document.head.insertAdjacentHTML('beforeend',`<style>.take-task-button{min-width:0!important;width:auto!important;min-height:34px!important;padding:7px 12px!important;font-size:12px!important;line-height:1.15!important;white-space:nowrap!important}.drawer .take-task-button{min-height:38px!important;padding:8px 14px!important}</style>`);
        /* Live Case audit and bidirectional, multi-Task dependencies. */
        function blockingTaskIds(id){return TASKS.filter(candidate=>dependencyIds(candidate[8]).includes(id)).map(candidate=>candidate[8])}
        function dependencyTaskLink(id){let task=taskById(id);return task?`<button class="dependency-task-link" onclick="event.stopPropagation();openTaskContext('${id}')"><strong>${id}</strong><span>${editorText(task[0])}</span>${pill(effectiveTaskStatus(task))}</button>`:''}
        function updateDependencySelection(taskId,select){let task=taskById(taskId);if(!task)return;let next=[...select.selectedOptions].map(option=>option.value),previous=dependencyIds(taskId);for(let candidateId of next){if(!previous.includes(candidateId)&&dependencyCycle(taskId,candidateId)){toast(`Cannot add ${candidateId} because it creates a circular dependency`);render();return}}S.taskDependencies[taskId]=next;let added=next.filter(id=>!previous.includes(id)),removed=previous.filter(id=>!next.includes(id)),changes=[added.length?`blocked by ${added.join(', ')}`:'',removed.length?`dependency removed: ${removed.join(', ')}`:''].filter(Boolean).join(' · ');if(changes){S.activities.unshift([`${taskId} dependencies updated · ${changes}`,actorName(),auditTimestamp()]);let diffId='diff-dep-'+taskId+'-'+Date.now();(S.taskActivity[taskId]=S.taskActivity[taskId]||[]).unshift({text:'updated the Dependencies · '+changes,author:actorName(),at:auditTimestamp(),type:'update',diffId,diffOld:'Blocked by: '+(previous.length?previous.join(', '):'None'),diffNew:'Blocked by: '+(next.length?next.join(', '):'None')})}render();toast(changes||'Dependencies unchanged')}
        function auditTimestamp(){let now=new Date(),date=new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric'}).format(now),time=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false}).format(now);return `${date}, ${time}`}
        dependencyPanel=function(t){let candidates=TASKS.filter(x=>x[1]===t[1]&&x[8]!==t[8]),selected=dependencyIds(t[8]),blockedBy=selected.map(taskById).filter(Boolean),blocking=blockingTaskIds(t[8]).map(taskById).filter(Boolean);return `<div class="card dependency-editor" data-aa-style="aa-static-style-14"><div class="card-head"><div><h2>Dependencies</h2><span class="sub">Select one or more Tasks from this Case</span></div>${unresolvedDependencies(t).length?'<span class="task-condition red">Blocked</span>':'<span class="task-condition blue">No completion block</span>'}</div><div class="card-body"><label class="dependency-multi-label"><strong>Blocked by</strong><span class="sub">These Tasks must be completed before this Task can be completed.</span><select class="dependency-multi-select" multiple size="${Math.min(6,Math.max(3,candidates.length))}" onchange="updateDependencySelection('${t[8]}',this)">${candidates.map(candidate=>`<option value="${candidate[8]}" ${selected.includes(candidate[8])?'selected':''}>${candidate[8]} · ${editorText(candidate[0])} · ${effectiveTaskStatus(candidate)}</option>`).join('')}</select><small>Use Ctrl/Cmd to select or remove multiple Tasks.</small></label><div class="dependency-relations"><section><h3>Blocked by (${blockedBy.length})</h3>${blockedBy.length?blockedBy.map(task=>dependencyTaskLink(task[8])).join(''):'<p class="sub">No predecessor Tasks selected.</p>'}</section><section><h3>Blocking (${blocking.length})</h3>${blocking.length?blocking.map(task=>dependencyTaskLink(task[8])).join(''):'<p class="sub">This Task is not blocking another Task.</p>'}</section></div></div></div>`}
        function setNewTaskDependencies(select){S.editorData.dependencies=[...select.selectedOptions].map(option=>option.value)}
        const multiDependencyEditorBase=editorDialog;editorDialog=function(){let html=multiDependencyEditorBase();if(S.editorType!=='newTask')return html;let template=document.createElement('template');template.innerHTML=html,tasks=TASKS.filter(t=>t[1]===S.editorData.caseId),selected=S.editorData.dependencies||[],existing=template.content.querySelector('.dependency-select')?.closest('.wide')||template.content.querySelector('.dependency-option')?.closest('.wide');if(existing)existing.innerHTML=`<strong>Blocked by</strong><p class="sub">Select one or more Tasks from this Case. Dependencies allow parallel work but block completion.</p><select class="dependency-multi-select" multiple size="${Math.min(6,Math.max(3,tasks.length))}" onchange="setNewTaskDependencies(this)">${tasks.map(task=>`<option value="${task[8]}" ${selected.includes(task[8])?'selected':''}>${task[8]} · ${editorText(task[0])} · ${effectiveTaskStatus(task)}</option>`).join('')}</select><small class="sub">Use Ctrl/Cmd to select multiple Tasks.</small>`;return template.innerHTML};
        const liveCaseAuditEventsBase=caseAuditEvents;caseAuditEvents=function(c){let taskIds=new Set(TASKS.filter(t=>t[1]===c.id).map(t=>t[8])),live=S.activities.filter(item=>{let text=String(item?.[0]||'');if(text.includes(c.id))return true;return [...taskIds].some(id=>text.includes(id))}).map(item=>{let stamp=String(item[2]||auditTimestamp()),parts=stamp.split(','),date=parts[0]?.trim()||'14 Oct 2026',time=parts.slice(1).join(',').trim()||'Now',title=String(item[0]||'Activity recorded'),statusMatch=title.match(/status changed from (.+?) to (.+?)(?: ·|$)/i);return {date,time,kind:/completed|sent|approved|created|assigned|updated/i.test(title)?'green':'',title,detail:`Recorded immediately for ${c.id}`,person:String(item[1]||'System'),change:statusMatch?`${statusMatch[1]} → ${statusMatch[2]}`:''}}),base=liveCaseAuditEventsBase(c),seen=new Set();return [...live,...base].filter(event=>{let key=[event.title,event.date,event.time,event.person].join('|');if(seen.has(key))return false;seen.add(key);return true})};
        document.head.insertAdjacentHTML('beforeend',`<style>.dependency-multi-label{display:grid;gap:6px}.dependency-multi-select{width:100%;min-height:108px;border:1px solid var(--line);border-radius:6px;background:#fff;padding:5px;font:inherit}.dependency-multi-select option{padding:7px 8px;border-radius:4px}.dependency-relations{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}.dependency-relations section{min-width:0;padding:12px;border:1px solid var(--line);border-radius:6px;background:#f8fafc}.dependency-relations h3{margin:0 0 8px;font-size:13px}.dependency-task-link{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:8px;align-items:center;width:100%;padding:8px 6px;border:0;border-top:1px solid var(--line);background:transparent;text-align:left;color:var(--ink);cursor:pointer}.dependency-task-link:hover{background:#edf6ff}.dependency-task-link>span:not(.pill){overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--muted);font-size:11px}@media(max-width:700px){.dependency-relations{grid-template-columns:1fr}}</style>`);
        const nonRepeatingTaskTableBase=tasksTable;tasksTable=function(rows,compact=false,admin=false,manager=false){let html=nonRepeatingTaskTableBase(rows,compact,admin,manager),statusFixed=(admin&&['To-Do','In Progress','On Hold','Completed'].includes(S.taskTab))||S.filters.status!=='All';if(!statusFixed)return html;let template=document.createElement('template');template.innerHTML=html,headers=[...template.content.querySelectorAll('table thead th')],index=headers.findIndex(header=>/^Status\b/i.test(header.textContent.trim()));if(index<0)return html;headers[index].remove();template.content.querySelectorAll('table tbody tr').forEach(row=>row.children[index]?.remove());return template.innerHTML};
        const freeAssignmentDialogBase=assignDialog;assignDialog=function(){let html=freeAssignmentDialogBase();if(!S.assignmentFromDetail)return html;let template=document.createElement('template');template.innerHTML=html,reason=template.content.querySelector('#assignment-reason');reason?.closest('label')?.remove();return template.innerHTML};
        confirmTaskReassignment=function(){let t=taskById(S.assignTaskId),u=currentUser(),name=document.getElementById('detail-assignee')?.value||S.assignChoice,user=USERS.find(x=>x.name===name);if(!t||!canAssignFromDetail(t)){toast('You no longer have permission to assign this Task');return}if(!user||user.role==='Admin'||(u.role==='Manager'&&user.department!==u.department)){toast('Select an eligible team member');return}if(t[4]===user.name){toast('Select a different owner');return}let previous=t[4],at=auditTimestamp();t[4]=user.name;t[3]=user.department;if(previous==='Unassigned')t[7] = 'To-Do';TASK_ASSIGNMENTS[t[8]]={assignedTo:user.name,assignedBy:u.name,assignedAt:at,classification:t[9],previousOwner:previous};S.activities.unshift([`${t[8]} ${previous==='Unassigned'?'assigned':'reassigned'} from ${previous} to ${user.name}`,u.name,at]);S.assignModal=false;S.assignmentFromDetail=false;S.drawer=true;render();toast(`${t[8]} ${previous==='Unassigned'?'assigned':'reassigned'} to ${user.name}`)};
        canAssignFromDetail=function(t){let u=currentUser();return !!t&&(u.role==='Admin'||(u.role==='Manager'&&t[3]===u.department))};
        openTaskAssignment=function(id){let t=taskById(id),u=currentUser(),suggested=t&&taskOwnerFor(t[9]);if(!t||!canAssignFromDetail(t)){toast(u.role==='Manager'?'You can assign or reassign only Tasks in your department':'You do not have permission to assign this Task');return}S.assignTaskId=id;S.assignChoice=t[4]!=='Unassigned'?t[4]:(suggested&&suggested.department===t[3]?suggested.name:'');S.assignmentFromDetail=true;S.assignModal=true;render()};
        /* Simple Admin linking: an incoming request may create a Task in any existing Case. */
        const LINK_REQUEST_DRAFT_ID='REQUEST-4128';
        CASE_DETAILS[LINK_REQUEST_DRAFT_ID]=CASE_DETAILS[LINK_REQUEST_DRAFT_ID]||{id:LINK_REQUEST_DRAFT_ID,customer:'ABB Robotics',customerNo:'100120',contact:'Thomas Weber',email:'thomas.weber@abb.com',phone:'+46 10 420 00 00',subject:'Additional loading instruction for industrial robots',body:'Hi AA Logistik team,\n\nFollowing up on our recent shipment, we need an additional loading coordination action for the robots at pickup in Västerås. Please arrange a higher loading dock and a wider ramp; the remaining shipment details are unchanged.\n\nBest regards,\nThomas Weber\nABB Robotics',created:'14 Oct 2026, 08:42',classification:'Transport booking',caseClass:'Change Request',priority:'High',confidence:91,departments:'Transport',pickup:'Västerås, Sweden',delivery:'Munich, Germany',requestedDate:'15 Oct 2026',due:'15 Oct 2026',goods:'Industrial robots',weight:'4,200 kg',status:'Awaiting Review',attachments:[]};
        const cleanReviewQueueBase=queueTable;queueTable=function(home=false){let html=cleanReviewQueueBase(home),template=document.createElement('template');template.innerHTML=html;template.content.querySelectorAll('table').forEach(table=>{let headers=[...table.querySelectorAll('thead th')],remove=headers.map((header,index)=>({header,index,label:header.textContent.trim()})).filter(item=>['Related Case','Relevance'].includes(item.label)).sort((a,b)=>b.index-a.index);remove.forEach(item=>{item.header.remove();table.querySelectorAll('tbody tr').forEach(row=>row.children[item.index]?.remove())})});return template.innerHTML};
        const standardReviewOpen=openReviewCase;openReviewCase=function(emailId){if(emailId===RELATED_REQUEST_ID){S.reviewEmailId=emailId;S.selectedCase=LINK_REQUEST_DRAFT_ID;S.page='approval';render();return}standardReviewOpen(emailId)};
        function openLinkCase(){if(S.role!=='Admin'){toast('Only the Admin can link a request to an existing Case');return}let request=QUEUE.find(item=>item[0]===S.reviewEmailId),source=selectedCaseData();S.editorType='linkCase';S.editorData={query:'',caseId:'',taskTitle:request?.[2]||source.subject||'Review linked customer request',department:String(source.departments||'Transport').split(',')[0].trim(),priority:source.priority||'Medium',due:dateInputValue(source.requestedDate||source.due),taskType:source.classification||'General coordination'};render()}
        function updateLinkCaseSearch(value){S.editorData.query=value;render()}
        function selectLinkCase(caseId){S.editorData.caseId=caseId;render()}
        function linkCaseCandidates(){let query=String(S.editorData.query||'').trim().toLowerCase();return CASES.filter(row=>{if(row[0]===S.selectedCase)return false;let details=CASE_DETAILS[row[0]],text=[row[0],row[1],row[2],row[3],details?.subject,details?.pickup,details?.delivery].join(' ').toLowerCase();return !query||text.includes(query)}).slice(0,10)}
        function confirmLinkCase(){let data={...S.editorData},target=CASE_DETAILS[data.caseId],request=QUEUE.find(item=>item[0]===S.reviewEmailId),source=selectedCaseData();if(!target){toast('Select an existing Case');return}if(!String(data.taskTitle||'').trim()){toast('Enter a Task name');return}if(!data.due){toast('Select a due date');return}let id=nextTaskNumber(),wasClosed=['Closed','Completed'].includes(target.status),row=CASES.find(item=>item[0]===target.id),at=auditTimestamp();TASKS.push([data.taskTitle.trim(),target.id,target.customer,data.department||'Uncategorized','Unassigned',data.priority||'Medium',displayDateValue(data.due),'To-Do',id,data.taskType||'General coordination','Later']);target.status='In Progress';if(row)row[6]='In Progress';S.communications.unshift({id:`MSG-${9500+S.communications.length}`,caseId:target.id,direction:'Incoming',type:'Linked Request',subject:source.subject,body:source.body,author:source.contact,at:source.created});S.activities.unshift([`${S.reviewEmailId} linked to ${target.id} · ${id} created${wasClosed?' · Case reopened':''}`,actorName(),at]);let index=QUEUE.findIndex(item=>item[0]===S.reviewEmailId);if(index>=0)QUEUE.splice(index,1);S.editorType=null;S.editorData={};S.reviewEmailId=null;S.page='review';S.queueTab='Awaiting Review';render();toast(`${id} created in ${target.id}${wasClosed?' · Case reopened':''}`)}
        const linkCaseEditorBase=editorDialog;editorDialog=function(){if(S.editorType!=='linkCase')return linkCaseEditorBase();let data=S.editorData,candidates=linkCaseCandidates(),selected=CASE_DETAILS[data.caseId],departments=[...new Set(USERS.map(user=>user.department).filter(department=>department!=='Administration'))];return `<div class="modal-shade"><div class="assign-modal link-case-modal"><h2>Link Case</h2><div class="body"><p class="sub">Select an existing Case and create a new Task from this incoming request.</p><label class="link-case-search"><strong>Find existing Case</strong><input value="${editorText(data.query||'')}" onchange="updateLinkCaseSearch(this.value)" placeholder="Search Case number, customer, subject or location"></label><div class="link-case-results">${candidates.map(row=>{let details=CASE_DETAILS[row[0]],active=data.caseId===row[0];return `<button class="link-case-result ${active?'selected':''}" onclick="selectLinkCase('${row[0]}')"><span><strong>${row[0]} · ${editorText(row[1])}</strong><small>${editorText(details?.subject||row[2])}</small></span>${pill(row[6])}</button>`}).join('')||'<div class="case-empty">No existing Cases match this search.</div>'}</div>${selected?`<section class="link-task-preview"><div class="panel-title"><h3>New Task Preview</h3><span class="sub">${selected.status==='Closed'||selected.status==='Completed'?'This Case will be reopened':'This Case is already active'}</span></div><div class="editor-grid"><label class="wide">Task name<input value="${editorText(data.taskTitle)}" oninput="editField('taskTitle',this.value)"></label><label>Department<select onchange="editField('department',this.value)">${departments.map(value=>`<option ${value===data.department?'selected':''}>${value}</option>`).join('')}</select></label><label>Priority<select onchange="editField('priority',this.value)">${['Urgent', 'High', 'Medium', 'Low'].map(value=>`<option ${value===data.priority?'selected':''}>${value}</option>`).join('')}</select></label><label>Due date<input type="date" value="${editorText(data.due)}" onchange="editField('due',this.value)"></label><label>Owner<input value="Unassigned" disabled></label></div></section>`:''}</div><div class="footer"><button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" ${selected?'':'disabled'} onclick="confirmLinkCase()">Link Case & Create Task</button></div></div></div>`};
        const simpleReviewApprovalBase=relatedApprovalBase;approval=function(){let html=simpleReviewApprovalBase(),template=document.createElement('template');template.innerHTML=html,approve=[...template.content.querySelectorAll('button')].find(button=>button.getAttribute('onclick')==='approveSelectedCase()');if(approve&&!template.content.querySelector('[data-link-case]')){let link=document.createElement('button');link.className='btn';link.dataset.linkCase='true';link.textContent='Link Case';link.setAttribute('onclick','openLinkCase()');approve.before(link)}return template.innerHTML};
        const linkedDraftApprovalBase=approveSelectedCase;approveSelectedCase=function(){if(S.selectedCase!==LINK_REQUEST_DRAFT_ID){linkedDraftApprovalBase();return}let source=CASE_DETAILS[LINK_REQUEST_DRAFT_ID],numbers=Object.keys(CASE_DETAILS).filter(id=>id.startsWith('CASE-')).map(id=>Number(id.replace(/\D/g,''))||0),caseId=`CASE-${Math.max(...numbers)+1}`,taskId=nextTaskNumber(),at=auditTimestamp();CASE_DETAILS[caseId]={...source,id:caseId,status:'Pending'};CASES.push([caseId,source.customer,source.caseClass,source.departments,source.priority,source.due,'Pending']);TASKS.push([source.subject,caseId,source.customer,String(source.departments).split(',')[0].trim(),'Unassigned',source.priority,source.due,'To-Do',taskId,source.classification,'Later']);S.activities.unshift([`${caseId} approved from ${S.reviewEmailId} · ${taskId} created`,actorName(),at]);let index=QUEUE.findIndex(item=>item[0]===S.reviewEmailId);if(index>=0)QUEUE.splice(index,1);S.reviewEmailId=null;S.page='review';S.queueTab='Awaiting Review';render();toast(`${caseId} approved`)};
        function reviewRequestMetadata(reference){let request=QUEUE.find(item=>item[0]===reference);if(reference===RELATED_REQUEST_ID)return CASE_DETAILS[LINK_REQUEST_DRAFT_ID];if(!request)return{};let words=String(request[2]||'').toLowerCase().split(/[^a-z0-9]+/).filter(word=>word.length>3),matches=Object.values(CASE_DETAILS).filter(item=>item.id!==LINK_REQUEST_DRAFT_ID&&item.customer===request[1]).map(item=>({item,score:words.filter(word=>String(item.subject||'').toLowerCase().includes(word)).length})).sort((a,b)=>b.score-a.score);return matches[0]?.item||{classification:'General coordination',caseClass:'Other'}}
        const classifiedReviewQueueBase=queueTable;queueTable=function(home=false){let html=classifiedReviewQueueBase(home),template=document.createElement('template');template.innerHTML=html;template.content.querySelectorAll('table').forEach(table=>{let headers=[...table.querySelectorAll('thead th')],customerIndex=headers.findIndex(header=>header.textContent.trim()==='Customer');if(customerIndex<0)return;let classification=document.createElement('th'),caseClass=document.createElement('th');classification.textContent='Category';caseClass.textContent='Case Class';headers[customerIndex].after(classification,caseClass);table.querySelectorAll('tbody tr').forEach(row=>{let reference=row.children[0]?.textContent.trim(),metadata=reviewRequestMetadata(reference),classificationCell=document.createElement('td'),caseClassCell=document.createElement('td');classificationCell.textContent=metadata.classification||'General coordination';caseClassCell.textContent=metadata.caseClass||'Other';row.children[customerIndex].after(classificationCell,caseClassCell)})});return template.innerHTML};
        /* Mailbox reference data and Reviewer-facing role terminology. */
        const MASTER_MAILBOXES=[['Transport Inbox','transport@aalogistik.se','Transport','Default'],['Terminal / Warehouse','terminal@aalogistik.se','Warehouse','—']];
        const mailboxMasterContentBase=masterContent;masterContent=function(){if((S.masterTab||'Task Master')!=='Mailboxes')return mailboxMasterContentBase();return `${masterTable(['Mailbox','Address','Department','Default Sender','Active'],MASTER_MAILBOXES.map(row=>[row[0],`<span class="code-text">${row[1]}</span>`,row[2],row[3]==='Default'?masterPill('Default'):row[3],masterPill('Active','green')]))}`};
        masterManagement=function(){if(S.role!=='Admin')return head('Access denied','Master Data is available only to the Reviewer.');let tabs=['Categories','Case Classes','Task Master','Customers & Rules','Required Data','Mailboxes'],descriptions={'Categories':'What kind of service a request is about.','Case Classes':'What the customer actually wants, which drives the work and required data.','Task Master':'Predefined work generated for confirmed services and Case Classes.','Customers & Rules':'Rules that adjust priority and work for a specific customer.','Required Data':'What must be known before the next operational step can happen.','Mailboxes':'Where messages arrive and which sender address people can write from.'},tab=S.masterTab||'Task Master';return head('Master Data',descriptions[tab],'<span class="read-only-label">Fixed reference data</span>')+`<div class="master-tabs">${tabs.map(name=>`<button class="${name===tab?'active':''}" onclick="setMasterTab('${name}')">${name}</button>`).join('')}</div><div class="master-content">${masterContent()}</div>`};
        let reviewerUser=USERS.find(user=>user.id==='john');if(reviewerUser)reviewerUser.title='Reviewer';let reviewerMaster=USER_MASTER.find(user=>user.id==='john');if(reviewerMaster)reviewerMaster.title='Reviewer';
        const reviewerProfileMenuBase=profileMenu;profileMenu=function(){let html=reviewerProfileMenuBase();if(!isReviewerProfile())return html;let template=document.createElement('template');template.innerHTML=html;template.content.querySelectorAll('small').forEach(node=>{if(node.textContent.trim().startsWith('Admin ·'))node.textContent=node.textContent.replace(/^Admin/,'Reviewer')});return template.innerHTML};
        const reviewerToastBase=toast;toast=function(message){if(!isReviewerProfile())return reviewerToastBase(message);reviewerToastBase(String(message).replace(/\bAdministrator\b/g,'Reviewer').replace(/\bAdmin\b/g,'Reviewer'))};
        const reviewerDesignationRenderBase=render;render=function(){reviewerDesignationRenderBase();if(!isReviewerProfile())return;let root=document.getElementById('root');if(!root)return;let walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(node=>{node.nodeValue=node.nodeValue.replace(/\bAdministrator\b/g,'Reviewer').replace(/\bAdmin\b/g,'Reviewer')})};
        function shiftedReviewDate(value,days){let match=String(value||'').match(/(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/),months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];if(!match)return value;let date=new Date(Date.UTC(Number(match[3]),months.indexOf(match[2]),Number(match[1])+days));return `${String(date.getUTCDate()).padStart(2,'0')} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`}
        function ensureReviewOrderData(c){if(!c)return c;let missingFields=new Set(Object.values(CLARIFICATIONS||{}).filter(record=>record.caseId===c.id&&record.status!=='Resolved').map(record=>record.field).filter(Boolean)),setDefault=(field,value)=>{if(!missingFields.has(field)&&!c[field])c[field]=value};setDefault('pickupDateTime',`${shiftedReviewDate(c.requestedDate||c.due,-1)}, 08:00`);setDefault('deliveryDateTime',`${c.requestedDate||c.due}, 14:00`);setDefault('pickupContact',`${c.contact||'Pickup contact'} · ${c.phone||'+46 21 555 018'}`);setDefault('deliveryContact','Receiving desk · +49 89 555 024');setDefault('packages','2 crates');setDefault('dimensions','2.4 × 1.8 × 2.1 m');setDefault('serviceRequirement','Dedicated road transport');setDefault('specialHandling','Oversized · Forklift required');return c}Object.values(CASE_DETAILS).forEach(ensureReviewOrderData);
        /* Remove the obsolete reopen-case request and its orphaned review draft. */
        for(let index=QUEUE.length-1;index>=0;index--)if(QUEUE[index][0]===RELATED_REQUEST_ID)QUEUE.splice(index,1);delete CASE_DETAILS[LINK_REQUEST_DRAFT_ID];
        openReviewCaseData=function(){let c=ensureReviewOrderData(selectedCaseData());S.editorType='reviewCaseData';S.editorDirty=false;S.editorData={customer:c.customer,classification:c.classification,caseClass:c.caseClass,departments:c.departments,priority:c.priority,pickup:c.pickup,delivery:c.delivery,pickupDateTime:c.pickupDateTime,deliveryDateTime:c.deliveryDateTime,pickupContact:c.pickupContact,deliveryContact:c.deliveryContact,goods:c.goods,packages:c.packages,weight:c.weight,dimensions:c.dimensions,serviceRequirement:c.serviceRequirement,specialHandling:c.specialHandling};render()};
        const compactReviewEditorBase=editorDialog;editorDialog=function(){if(S.editorType!=='reviewCaseData')return compactReviewEditorBase();let d=S.editorData;return `<div class="modal-shade"><div class="assign-modal review-data-modal compact-review-editor"><h2>Edit Review Information</h2><div class="body"><div class="editor-grid">${field('Customer','customer',d.customer)}${field('Category','classification',d.classification)}${field('Case Class','caseClass',d.caseClass)}${field('Departments','departments',d.departments)}${choice('Priority','priority',d.priority,['Urgent', 'High', 'Medium', 'Low'])}${field('Pickup location','pickup',d.pickup)}${field('Delivery location','delivery',d.delivery)}${field('Pickup date/time','pickupDateTime',d.pickupDateTime)}${field('Delivery date/time','deliveryDateTime',d.deliveryDateTime)}${field('Pickup contact','pickupContact',d.pickupContact)}${field('Delivery contact','deliveryContact',d.deliveryContact)}${field('Goods','goods',d.goods)}${field('Packages','packages',d.packages)}${field('Total weight','weight',d.weight)}${field('Dimensions','dimensions',d.dimensions)}${field('Service requirement','serviceRequirement',d.serviceRequirement)}${field('Special handling','specialHandling',d.specialHandling)}</div></div><div class="footer"><button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" onclick="saveReviewCaseData()">Save Changes</button></div></div></div>`};
        function reviewOrderField(label,value){return `<div class="review-order-field"><span>${label}</span><strong>${editorText(value||'Not provided')}</strong></div>`}
        const compactApprovalBase=approval;approval=function(){let html=compactApprovalBase();if(S.role!=='Admin')return html;let c=ensureReviewOrderData(selectedCaseData()),template=document.createElement('template');template.innerHTML=html;let grid=template.content.querySelector('.review-grid'),sections=grid?[...grid.children].filter(node=>node.matches?.('section.panel')):[];if(sections.length<3)return html;let original=sections[0],interpretation=sections[1],routing=sections[2],titles=[...interpretation.querySelectorAll('.panel-title')],extractedTitle=titles.find(title=>title.textContent.includes('Extracted Information'));if(extractedTitle){let following=extractedTitle.nextElementSibling;extractedTitle.remove();if(following?.classList.contains('fieldlist'))following.remove()}let interpretationFields=interpretation.querySelector('.fieldlist');if(interpretationFields&&!interpretationFields.querySelector('[data-review-departments]')){let departmentRow=document.createElement('div');departmentRow.className='rowfield';departmentRow.dataset.reviewDepartments='true';departmentRow.innerHTML=`<label>Departments</label><strong>${editorText(c.departments||'Not assigned')}</strong>`;let priorityRow=[...interpretationFields.querySelectorAll('.rowfield')].find(row=>row.querySelector('label')?.textContent.trim()==='Priority');interpretationFields.insertBefore(departmentRow,priorityRow||null)}let middle=document.createElement('div');middle.className='review-middle-column';middle.append(interpretation,routing);let tasks=TASKS.filter(task=>task[1]===c.id);routing.classList.add('compact-routing-panel');let routingTitle=routing.querySelector('.panel-title'),ownershipNotice=routing.querySelector('.notice.green');if(ownershipNotice)ownershipNotice.remove();if(routingTitle&&!routingTitle.querySelector('.routing-info')){let info=document.createElement('span');info.className='routing-info';info.tabIndex=0;info.setAttribute('aria-label','Task-level ownership information');info.innerHTML=`i<span class="routing-info-tooltip"><strong>Task-level ownership</strong>Owners are matched from category and User Master.</span>`;routingTitle.querySelector('h2')?.after(info)}let routingBody=routing.querySelector('.editfield');if(routingBody){routingBody.classList.add('routing-task-scroll');if(tasks.length>2)routingBody.classList.add('scroll-enabled')}let values=[c.pickup,c.delivery,c.pickupDateTime,c.deliveryDateTime,c.pickupContact,c.deliveryContact,c.goods,c.packages,c.weight,c.dimensions,c.serviceRequirement,c.specialHandling],available=values.filter(Boolean).length,extracted=document.createElement('section');extracted.className='panel extracted-order-panel';extracted.innerHTML=`<div class="panel-title"><h2>Extracted Order Information</h2><button class="link" onclick="openReviewCaseData()">Edit</button></div><div class="review-readiness ${available===12?'complete':'incomplete'}"><strong>${available===12?'✓':'!'} ${available} of 12 required fields available</strong></div><div class="review-order-fields">${reviewOrderField('Pickup location',c.pickup)}${reviewOrderField('Delivery location',c.delivery)}${reviewOrderField('Pickup date/time',c.pickupDateTime)}${reviewOrderField('Delivery date/time',c.deliveryDateTime)}${reviewOrderField('Pickup contact',c.pickupContact)}${reviewOrderField('Delivery contact',c.deliveryContact)}${reviewOrderField('Goods',c.goods)}${reviewOrderField('Packages',c.packages)}${reviewOrderField('Total weight',c.weight)}${reviewOrderField('Dimensions',c.dimensions)}${reviewOrderField('Service requirement',c.serviceRequirement)}${reviewOrderField('Special handling',c.specialHandling)}</div>`;grid.replaceChildren(original,middle,extracted);return template.innerHTML};
        document.head.insertAdjacentHTML('beforeend',`<style>.link-case-modal{width:min(900px,calc(100vw - 40px));max-height:92vh}.link-case-modal>.body{overflow:auto}.link-case-search{display:grid;gap:7px}.link-case-search input{height:42px;border:1px solid var(--line);border-radius:5px;padding:0 11px;font:inherit}.link-case-results{display:grid;gap:7px;margin-top:12px;max-height:260px;overflow:auto}.link-case-result{display:flex;justify-content:space-between;align-items:center;gap:12px;width:100%;padding:11px 12px;border:1px solid var(--line);border-radius:6px;background:#fff;text-align:left}.link-case-result:hover,.link-case-result.selected{border-color:var(--blue);background:#eef7ff}.link-case-result span:first-child{display:grid;gap:4px}.link-case-result small{color:var(--muted)}.link-task-preview{margin-top:16px;border:1px solid var(--line);border-radius:7px;padding:14px}.link-task-preview .panel-title{padding:0 0 12px;margin-bottom:12px}</style>`);
        document.head.insertAdjacentHTML('beforeend',`<style>.review-grid{grid-template-columns:minmax(300px,31fr) minmax(280px,27fr) minmax(390px,42fr);align-items:stretch}.review-middle-column{display:grid;grid-template-rows:max-content minmax(0,1fr);align-content:stretch;align-items:stretch;gap:14px;min-width:0;height:100%}.review-middle-column>.panel{min-width:0;min-height:0;height:auto;align-self:stretch}.compact-routing-panel{display:flex;flex-direction:column}.compact-routing-panel .editfield{padding:12px;flex:1;min-height:0}.compact-routing-panel .proposal header .pill{padding:3px 6px;font-size:9px;line-height:1.1}.compact-routing-panel .proposal header{align-items:flex-start;gap:6px}.routing-task-scroll.scroll-enabled{max-height:330px;overflow-y:auto;overscroll-behavior:contain;padding-right:8px}.routing-task-scroll.scroll-enabled::-webkit-scrollbar{width:8px}.routing-task-scroll.scroll-enabled::-webkit-scrollbar-thumb{background:#b9c8d8;border-radius:8px}.routing-info{position:relative;display:inline-grid;place-items:center;width:18px;height:18px;margin-left:7px;border:1px solid #83a6c3;border-radius:50%;color:#176aab;font-size:11px;font-weight:900;cursor:help}.routing-info-tooltip{position:absolute;left:50%;top:26px;z-index:20;display:none;width:245px;padding:10px 11px;border:1px solid #c8d8e6;border-radius:6px;background:#fff;color:var(--ink);box-shadow:0 8px 24px rgba(10,40,65,.16);font-size:11px;font-weight:400;line-height:1.45;transform:translateX(-50%)}.routing-info-tooltip strong{display:block;margin-bottom:3px}.routing-info:hover .routing-info-tooltip,.routing-info:focus .routing-info-tooltip{display:block}.extracted-order-panel{min-width:0}.review-readiness{margin:14px 16px 8px;padding:10px 12px;border:1px solid #a9dfbe;border-radius:6px;background:#eaf8ef;color:#087a42;font-size:13px}.review-readiness.incomplete{border-color:#efcf86;background:#fff6df;color:#8a5a00}.review-order-fields{padding:6px 16px 14px}.review-order-field{display:grid;grid-template-columns:minmax(125px,.9fr) minmax(0,1.35fr);gap:12px;align-items:start;padding:9px 2px;border-bottom:1px solid var(--line);font-size:13px}.review-order-field:last-child{border-bottom:0}.review-order-field span{color:var(--muted)}.review-order-field strong{overflow-wrap:anywhere}.compact-review-editor{width:min(900px,calc(100vw - 40px));max-height:92vh}.compact-review-editor>.body{overflow:auto}@media(max-width:1100px){.review-grid{grid-template-columns:1fr 1fr;align-items:start}.review-middle-column{height:auto}.extracted-order-panel{grid-column:1/-1}}@media(max-width:760px){.review-grid{grid-template-columns:1fr}.extracted-order-panel{grid-column:auto}}</style>`);
        /* Clarification integrity: every clarification request has a real, visible missing field. */
        const CLARIFICATION_FIELD_RULES=[
            {field:'delivery',label:'Delivery location',request:'Please confirm the delivery location for this request.'},
            {field:'pickupContact',label:'Pickup contact',request:'Please confirm the pickup contact name and telephone number for this request.'},
            {field:'dimensions',label:'Dimensions',request:'Please confirm the shipment dimensions for this request.'}
        ];
        Object.values(CLARIFICATIONS).forEach((record,index)=>{let rule=CLARIFICATION_FIELD_RULES[index%CLARIFICATION_FIELD_RULES.length],c=CASE_DETAILS[record.caseId],queue=QUEUE.find(item=>item[0]===record.emailId);record.field=rule.field;record.missing=rule.label;record.request=rule.request;if(c)c[rule.field]='';if(queue)queue[4]=`Missing ${rule.label.toLowerCase()}`});
        const clarificationIntegrityApprovalBase=approval;approval=function(){let html=clarificationIntegrityApprovalBase(),record=activeClarification();if(!record)return html;let missing=editorText(record.missing);html=html.replace('Awaiting Review','Needs Clarification').replace(/Missing information:<\/strong>[^<]*/i,`Missing information:</strong> ${missing} was not supplied or could not be confirmed from the customer request.`);return html};
        const clarificationIntegrityOpenBase=openClarificationAction;openClarificationAction=function(mode){clarificationIntegrityOpenBase(mode);let record=activeClarification(),c=clarificationCase(record);if(!record||!c||!S.editorData)return;if(mode==='customer')S.editorData.message=`Hello ${c.contact.split(' ')[0]},\n\nTo continue processing ${c.id}, ${record.request.toLowerCase()}\n\nKind regards,\nAA Logistik Operations`;else if(mode==='internal')S.editorData.message=`Please confirm the missing ${record.missing.toLowerCase()} for ${c.id} · ${c.customer}.`;render()};
        const clarificationIntegrityEditorBase=editorDialog;editorDialog=function(){let html=clarificationIntegrityEditorBase(),record=activeClarification();if(S.editorType!=='clarification'||!record)return html;return html.replace(/Missing information: delivery details/gi,`Missing information: ${editorText(record.missing)}`).replace(/Resolve Missing Delivery Details/gi,`Resolve Missing ${editorText(record.missing)}`).replace(/Confirmed delivery details/gi,`Confirmed ${editorText(record.missing)}`).replace(/Enter delivery location and date/gi,`Enter ${editorText(record.missing).toLowerCase()}`)};
        const clarificationIntegritySubmitBase=submitClarification;submitClarification=function(){let d=S.editorData,record=CLARIFICATIONS[d.emailId],c=record&&CASE_DETAILS[record.caseId];if(!record||!c||record.field==='delivery'){clarificationIntegritySubmitBase();return}if(d.mode!=='manual'&&d.mode!=='resolve'){clarificationIntegritySubmitBase();return}let value=document.getElementById('clarification-delivery')?.value?.trim();if(!value){toast(`Enter the confirmed ${record.missing.toLowerCase()}`);return}let at='09 Oct 2026, 14:05',by=actorName();c[record.field]=value;record.status='Resolved';record.history.unshift({type:d.mode==='manual'?'Entered manually':'Clarification resolved',recipient:'Case record',message:`${record.missing} confirmed: ${value}`,by,at});let q=QUEUE.find(item=>item[0]===record.emailId);if(q){q[4]='Clarification resolved · Ready for review';q[6]='Awaiting Review'}S.activities.unshift([`${record.emailId} · ${record.missing} resolved`,by,at]);S.editorType=null;S.editorData={};S.page='review';S.queueTab='Needs Clarification';render();toast('Clarification resolved and moved to Awaiting Review')};
        const clarificationReviewOrderFieldBase=reviewOrderField;reviewOrderField=function(label,value){if(value)return clarificationReviewOrderFieldBase(label,value);return `<div class="review-order-field missing-review-field"><span>${label}</span><strong>Missing — clarification required</strong></div>`};
        const clarificationQueueTableBase=queueTable;queueTable=function(home=false){let html=clarificationQueueTableBase(home);if(home||S.queueTab!=='Needs Clarification')return html;let template=document.createElement('template');template.innerHTML=html;template.content.querySelectorAll('table').forEach(table=>{let headerRow=table.querySelector('thead tr');if(!headerRow||[...headerRow.children].some(cell=>cell.textContent.trim()==='Missing Information'))return;let headers=[...headerRow.children],caseClassIndex=headers.findIndex(cell=>cell.textContent.trim()==='Case Class'),receivedIndex=headers.findIndex(cell=>cell.textContent.trim().startsWith('Received')),insertIndex=caseClassIndex>=0?caseClassIndex+1:receivedIndex>=0?receivedIndex:headers.length,heading=document.createElement('th');heading.textContent='Missing Information';headerRow.insertBefore(heading,headerRow.children[insertIndex]||null);table.querySelectorAll('tbody tr').forEach(row=>{let reference=row.children[0]?.textContent.trim(),record=CLARIFICATIONS[reference],cell=document.createElement('td');cell.innerHTML=record?`<span class="missing-info-chip">${editorText(record.missing)}</span>`:'<span class="missing-info-chip">Information required</span>';row.insertBefore(cell,row.children[insertIndex]||null)})});return template.innerHTML};
        document.head.insertAdjacentHTML('beforeend',`<style>.missing-review-field{margin:2px 0;padding:9px 8px;border:1px solid #f3b3ba;border-radius:5px;background:#fff0f2}.missing-review-field span,.missing-review-field strong{color:#b42332!important}.missing-info-chip{display:inline-flex;align-items:center;padding:5px 8px;border:1px solid #f1b6bc;border-radius:5px;background:#fff0f2;color:#b42332;font-size:11px;font-weight:800;white-space:nowrap}</style>`);
        /* Global edit-control contract: master-backed values are selections; dates and times always use native pickers. */
        function uniqueEditOptions(values,current){let options=[...new Set(values.map(value=>String(value||'').trim()).filter(Boolean))];if(current&&!options.includes(String(current).trim()))options.unshift(String(current).trim());return options}
        function editMasterOptions(kind,current){if(kind==='customer')return uniqueEditOptions([...CASES.map(row=>row[1]),...Object.values(CASE_DETAILS).map(item=>item.customer)],current);if(kind==='classification')return uniqueEditOptions([...Object.keys(TASK_ROUTING),...Object.values(CASE_DETAILS).map(item=>item.classification)],current);if(kind==='caseClass')return uniqueEditOptions([...(typeof MASTER_CASE_CLASSES!=='undefined'?MASTER_CASE_CLASSES.map(row=>row[0]):[]),...CASES.map(row=>row[2]),...Object.values(CASE_DETAILS).map(item=>item.caseClass)],current);if(kind==='department'){let blocked=new Set(['','-','—','Company','Administration']),values=[...(typeof MASTER_CATEGORIES!=='undefined'?MASTER_CATEGORIES.map(row=>row[1]):[]),...USERS.map(user=>user.department),'Other'].filter(value=>!blocked.has(String(value||'').trim()));return uniqueEditOptions(values)}if(kind==='priority')return ['Urgent', 'High', 'Medium', 'Low'];return[]}
        function pickerDateTimeValue(value){let text=String(value||'').trim(),date=dateInputValue(text),time=text.match(/(?:,|\s)(\d{1,2}):(\d{2})/)||text.match(/T(\d{2}):(\d{2})/);return date?`${date}T${time?`${String(time[1]).padStart(2,'0')}:${time[2]}`:'09:00'}`:''}
        function pickerTimeValue(value){let match=String(value||'').match(/(\d{1,2}):(\d{2})/);return match?`${String(match[1]).padStart(2,'0')}:${match[2]}`:''}
        function updateDepartmentDropdown(checkbox){let dropdown=checkbox.closest('.master-multi-dropdown'),values=[...dropdown.querySelectorAll('input[type="checkbox"]:checked')].map(item=>item.value);S.editorData.departments=values.join(', ');let summary=dropdown.querySelector('.master-multi-summary');if(summary)summary.textContent=values.length?values.join(', '):'Select departments'}
        function replaceEditInputWithSelect(label,input,options,multiple=false){let current=input.tagName==='SELECT'?[...input.selectedOptions].map(option=>option.value).join(', '):String(input.value||input.getAttribute('value')||''),selected=multiple?current.split(',').map(value=>value.trim()).filter(Boolean):[current];if(multiple){let details=document.createElement('details');details.className='master-multi-dropdown';let summary=document.createElement('summary');summary.className='master-multi-summary';summary.textContent=selected.length?selected.join(', '):'Select departments';details.appendChild(summary);let menu=document.createElement('div');menu.className='master-multi-menu';options.forEach(value=>{let option=document.createElement('label');option.className='master-multi-option';option.innerHTML=`<input type="checkbox" value="${editorText(value)}" ${selected.includes(value)?'checked':''} onchange="updateDepartmentDropdown(this)"><span>${editorText(value)}</span>`;menu.appendChild(option)});details.appendChild(menu);input.replaceWith(details);return}let select=document.createElement('select');select.className=input.className;select.disabled=input.disabled;options.forEach(value=>{let option=document.createElement('option');option.value=value;option.textContent=value;option.selected=selected.includes(value);select.appendChild(option)});let handler=input.getAttribute('onchange')||input.getAttribute('oninput');if(handler)select.setAttribute('onchange',handler);input.replaceWith(select)}
        function enforceEditControlContract(html){let template=document.createElement('template');template.innerHTML=html;template.content.querySelectorAll('label').forEach(label=>{let control=label.querySelector(':scope > input, :scope > select'),text=[...label.childNodes].filter(node=>node.nodeType===Node.TEXT_NODE).map(node=>node.textContent).join(' ').trim().replace(/\s+/g,' ');if(!control||control.disabled)return;let lower=text.toLowerCase(),rawValue=control.value||control.getAttribute('value')||'';if(/date\s*\/\s*time|date and time|datetime/.test(lower)){if(control.tagName==='INPUT'){control.type='datetime-local';control.value=pickerDateTimeValue(rawValue)}return}if(/(^|\s)date($|\s)|due|requested/.test(lower)&&!/(update|candidate)/.test(lower)){if(control.tagName==='INPUT'){control.type='date';control.value=dateInputValue(rawValue)}return}if(/(^|\s)time($|\s)/.test(lower)){if(control.tagName==='INPUT'){control.type='time';control.value=pickerTimeValue(rawValue)}return}let kind=null,multiple=false;if(lower==='customer'||lower==='customer name')kind='customer';else if(lower==='classification'||lower==='task classification')kind='classification';else if(lower==='case class'||lower==='case classes')kind='caseClass';else if(lower==='departments'){kind='department';multiple=true}else if(lower==='department')kind='department';else if(lower==='priority')kind='priority';if(kind)replaceEditInputWithSelect(label,control,editMasterOptions(kind,rawValue),multiple)});return template.innerHTML}
        const controlledEditorDialogBase=editorDialog;editorDialog=function(){return enforceEditControlContract(controlledEditorDialogBase())};
        document.head.insertAdjacentHTML('beforeend',`<style>.editor-grid input[type="date"],.editor-grid input[type="time"],.editor-grid input[type="datetime-local"],.order-editor-grid input[type="date"],.order-editor-grid input[type="time"],.order-editor-grid input[type="datetime-local"]{color-scheme:light}.master-multi-dropdown{position:relative;width:100%}.master-multi-dropdown>summary{display:flex;align-items:center;min-height:42px;padding:8px 38px 8px 11px;border:1px solid var(--line);border-radius:5px;background:#fff;font-weight:600;cursor:pointer;list-style:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.master-multi-dropdown>summary::-webkit-details-marker{display:none}.master-multi-dropdown>summary:after{content:'⌄';position:absolute;right:13px;font-size:16px;color:var(--muted)}.master-multi-dropdown[open]>summary{border-color:var(--blue);box-shadow:0 0 0 2px rgba(0,112,201,.12)}.master-multi-menu{position:absolute;z-index:40;top:calc(100% + 4px);left:0;right:0;max-height:220px;overflow-y:auto;padding:6px;border:1px solid var(--line);border-radius:6px;background:#fff;box-shadow:0 10px 26px rgba(15,42,65,.18)}.master-multi-option{display:flex!important;align-items:center;gap:9px;padding:8px 9px;border-radius:4px;cursor:pointer;font-weight:500!important}.master-multi-option:hover{background:#eef6fd}.master-multi-option input{width:16px!important;height:16px!important;margin:0;accent-color:var(--blue)}</style>`);
        /* Review-page inline editing: retain context and enforce Master-backed selection rules. */
        S.reviewInline=S.reviewInline||null;S.reviewDraft=S.reviewDraft||{};
        function reviewSelect(label,key,value,options){return `<label class="review-inline-field"><span>${label}</span><select onchange="setReviewInlineField('${key}',this.value)">${options.map(option=>`<option value="${editorText(option)}" ${option===value?'selected':''}>${editorText(option)}</option>`).join('')}</select></label>`}
        function reviewInput(label,key,value,type='text'){let picker=type==='datetime-local'?pickerDateTimeValue(value):value;return `<label class="review-inline-field"><span>${label}</span><input type="${type}" value="${editorText(picker||'')}" oninput="setReviewInlineField('${key}',this.value)"></label>`}
        function reviewDepartmentPicker(value){let selected=String(value||'').split(',').map(item=>item.trim()).filter(Boolean),options=editMasterOptions('department');return `<label class="review-inline-field review-inline-wide"><span>Departments</span><details class="master-multi-dropdown"><summary class="master-multi-summary">${editorText(selected.length?selected.join(', '):'Select departments')}</summary><div class="master-multi-menu">${options.map(option=>`<label class="master-multi-option"><input type="checkbox" value="${editorText(option)}" ${selected.includes(option)?'checked':''} onchange="setReviewInlineDepartments(this)"><span>${editorText(option)}</span></label>`).join('')}</div></details></label>`}
        function setReviewInlineField(key,value){S.reviewDraft[key]=value;S.reviewInlineDirty=true}
        function setReviewInlineDepartments(checkbox){let details=checkbox.closest('.master-multi-dropdown'),values=[...details.querySelectorAll('input[type="checkbox"]:checked')].map(item=>item.value);S.reviewDraft.departments=values.join(', ');S.reviewInlineDirty=true;details.querySelector('.master-multi-summary').textContent=values.length?values.join(', '):'Select departments'}
        function beginReviewInlineEdit(section){let c=ensureReviewOrderData(selectedCaseData());S.editorType=null;S.editorData={};S.reviewInline=section;S.reviewInlineDirty=false;S.reviewDraft={customer:c.customer,classification:c.classification,caseClass:c.caseClass,departments:c.departments,priority:c.priority,pickup:c.pickup,delivery:c.delivery,pickupDateTime:c.pickupDateTime,deliveryDateTime:c.deliveryDateTime,pickupContact:c.pickupContact,deliveryContact:c.deliveryContact,goods:c.goods,packages:c.packages,weight:c.weight,dimensions:c.dimensions,serviceRequirement:c.serviceRequirement,specialHandling:c.specialHandling};render()}
        function cancelReviewInlineEdit(){S.reviewInline=null;S.reviewDraft={};S.reviewInlineDirty=false;render()}
        function displayReviewDateTime(value){if(!value||!String(value).includes('T'))return value;let [date,time]=String(value).split('T'),[year,month,day]=date.split('-'),months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];return `${day} ${months[Number(month)-1]} ${year}, ${time}`}
        function saveReviewInlineEdit(){let c=selectedCaseData(),d=S.reviewDraft,keys=S.reviewInline==='interpretation'?['customer','classification','caseClass','departments','priority']:['pickup','delivery','pickupDateTime','deliveryDateTime','pickupContact','deliveryContact','goods','packages','weight','dimensions','serviceRequirement','specialHandling'];if(S.reviewInline==='interpretation'&&!d.departments){toast('Select at least one department');return}let changes=[];keys.forEach(key=>{let next=d[key]||'';if(key==='pickupDateTime'||key==='deliveryDateTime')next=displayReviewDateTime(next);let previous=c[key]||'';if(next!==previous){changes.push(`${key}: ${previous||'Not provided'} â†’ ${next||'Not provided'}`);c[key]=next}});let row=CASES.find(item=>item[0]===c.id);if(row)row.splice(1,5,c.customer,c.caseClass,c.departments,c.priority,c.due);if(changes.length)S.activities.unshift([`${c.id} review information updated Â· ${changes.join(' Â· ')}`,actorName(),auditTimestamp()]);S.reviewInline=null;S.reviewDraft={};S.reviewInlineDirty=false;render();toast(changes.length?'Review information updated':'No changes to save')}
        function reviewInlineActions(){return `<div class="review-inline-actions"><button class="btn compact-action" onclick="cancelReviewInlineEdit()">Cancel</button><button class="btn primary compact-action" onclick="saveReviewInlineEdit()">Save</button></div>`}
        function interpretationInlineForm(){let d=S.reviewDraft,customers=editMasterOptions('customer',d.customer),classifications=uniqueEditOptions(Object.keys(TASK_ROUTING),d.classification),caseClasses=editMasterOptions('caseClass',d.caseClass);return `<div class="review-inline-grid">${reviewSelect('Customer','customer',d.customer,customers)}${reviewSelect('Category','classification',d.classification,classifications)}${reviewSelect('Case Class','caseClass',d.caseClass,caseClasses)}${reviewDepartmentPicker(d.departments)}${reviewSelect('Priority','priority',d.priority,editMasterOptions('priority',d.priority))}</div>`}
        function orderInlineForm(){let d=S.reviewDraft;return `<div class="review-inline-grid order-inline-grid">${reviewInput('Pickup location','pickup',d.pickup)}${reviewInput('Delivery location','delivery',d.delivery)}${reviewInput('Pickup date/time','pickupDateTime',d.pickupDateTime,'datetime-local')}${reviewInput('Delivery date/time','deliveryDateTime',d.deliveryDateTime,'datetime-local')}${reviewInput('Pickup contact','pickupContact',d.pickupContact)}${reviewInput('Delivery contact','deliveryContact',d.deliveryContact)}${reviewInput('Goods','goods',d.goods)}${reviewInput('Packages','packages',d.packages)}${reviewInput('Total weight','weight',d.weight)}${reviewInput('Dimensions','dimensions',d.dimensions)}${reviewInput('Service requirement','serviceRequirement',d.serviceRequirement)}${reviewInput('Special handling','specialHandling',d.specialHandling)}</div>`}
        const inlineReviewApprovalBase=approval;approval=function(){let html=inlineReviewApprovalBase();if(S.role!=='Admin')return html;let template=document.createElement('template');template.innerHTML=html,panels=[...template.content.querySelectorAll('.review-grid .panel')],interpretation=panels.find(panel=>panel.querySelector('.panel-title h2')?.textContent.trim()==='AI Interpretation'),extracted=panels.find(panel=>panel.querySelector('.panel-title h2')?.textContent.trim()==='Extracted Order Information');if(interpretation){let title=interpretation.querySelector('.panel-title'),button=title?.querySelector('button.link');if(button){button.textContent='Edit';button.setAttribute('onclick',"beginReviewInlineEdit('interpretation')")}if(S.reviewInline==='interpretation'){interpretation.classList.add('inline-edit-panel');button?.remove();title?.insertAdjacentHTML('beforeend',reviewInlineActions());let list=interpretation.querySelector('.fieldlist');if(list)list.outerHTML=interpretationInlineForm()}}if(extracted){let title=extracted.querySelector('.panel-title'),button=title?.querySelector('button.link');if(button){button.textContent='Edit';button.setAttribute('onclick',"beginReviewInlineEdit('order')")}if(S.reviewInline==='order'){button?.remove();title?.insertAdjacentHTML('beforeend',reviewInlineActions());let readiness=extracted.querySelector('.review-readiness'),fields=extracted.querySelector('.review-order-fields');readiness?.remove();if(fields)fields.outerHTML=orderInlineForm()}}return template.innerHTML};
        document.head.insertAdjacentHTML('beforeend',`<style>.review-inline-actions{display:flex;gap:7px;align-items:center}.review-inline-actions .compact-action{float:none!important;min-height:32px;padding:6px 11px}.review-inline-grid{display:grid;gap:0;padding:8px 16px 14px}.review-inline-field{display:grid;grid-template-columns:minmax(110px,.8fr) minmax(0,1.25fr);gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid var(--line)}.review-inline-field:last-child{border-bottom:0}.review-inline-field>span{color:var(--muted);font-size:13px}.review-inline-field input,.review-inline-field select{width:100%;min-width:0;min-height:36px;padding:6px 9px;border:1px solid var(--line);border-radius:5px;background:#fff;color:var(--ink);font:inherit;font-size:13px}.review-inline-field input:focus,.review-inline-field select:focus{border-color:var(--blue);outline:2px solid rgba(0,112,201,.12)}.review-inline-field .master-multi-dropdown>summary{min-height:36px;padding-top:6px;padding-bottom:6px;font-size:13px}.order-inline-grid{max-height:590px;overflow-y:auto;overscroll-behavior:contain;padding-right:10px}.review-middle-column:has(.review-inline-grid),.extracted-order-panel:has(.review-inline-grid){align-self:start}.review-middle-column:has(.inline-edit-panel){position:relative;z-index:60}.review-middle-column>.inline-edit-panel{position:relative;z-index:61;overflow:visible}.inline-edit-panel .master-multi-menu{z-index:100;min-width:240px;max-height:240px}.review-middle-column>.compact-routing-panel{position:relative;z-index:1}@media(max-width:760px){.review-inline-field{grid-template-columns:1fr;gap:5px}}</style>`);
        /* Reviewer home: focus on review work and show the operational due timestamp. */
        function reviewerRequestDueDateTime(reference){let metadata=ensureReviewOrderData(reviewRequestMetadata(reference));if(!metadata)return 'Not scheduled';return metadata.deliveryDateTime||metadata.pickupDateTime||(metadata.due?`${metadata.due}, 17:00`:'Not scheduled')}
        const reviewerHomeQueueRowsBase=queueRows;queueRows=function(home=false){let rows=reviewerHomeQueueRowsBase(home);return home?rows.map(row=>{let mapped=[...row];mapped[5]=reviewerRequestDueDateTime(row[0]);return mapped}):rows};
        const reviewerHomeQueueTableBase=queueTable;queueTable=function(home=false){let html=reviewerHomeQueueTableBase(home);if(!home)return html;let template=document.createElement('template');template.innerHTML=html;template.content.querySelectorAll('table').forEach(table=>{let headers=[...table.querySelectorAll('thead th')],dueIndex=headers.findIndex(header=>/^Received/.test(header.textContent.trim()));if(dueIndex<0)return;let button=headers[dueIndex].querySelector('.sort-head');if(button&&button.firstChild)button.firstChild.nodeValue='Due Date / Time';else headers[dueIndex].textContent='Due Date / Time'});return template.innerHTML};
        /* Reviewer request filters are isolated by view. */
        S.reviewerFilters=S.reviewerFilters||{'Awaiting Review':{q:'',customer:[],department:[],priority:[],due:'All',category:[],casetype:[],source:[]},'Needs Clarification':{q:'',missing:[],customer:[],department:[],priority:[],category:[],casetype:[],source:[]}};S.queueQuery='';S.queueIssue='All';S.queueCustomer='All';
        function reviewerFilterState(){return S.reviewerFilters[S.queueTab]||S.reviewerFilters['Awaiting Review']}
        function reviewerRequestData(row){let metadata=ensureReviewOrderData(reviewRequestMetadata(row[0]))||{},clarification=CLARIFICATIONS[row[0]];return{customer:row[1],department:String(metadata.departments||'').split(',').map(value=>value.trim()).filter(Boolean),priority:requestPriority(row),due:reviewerRequestDueDateTime(row[0]).split(',')[0],missing:clarification?.missing||row[4]||'Information required',category:metadata.category||metadata.classification||'',casetype:metadata.caseClass||metadata.type||'',source:metadata.source||'Email'}}
        function setReviewerFilter(key,value){reviewerFilterState()[key]=value;render()}
        function resetReviewerFilters(){let state=reviewerFilterState();Object.keys(state).forEach(key=>state[key]=key==='q'?'':key==='due'?'All':[]);render()}
        function switchReviewerView(tab){S.queueTab=tab;render()}
        function reviewerFilterOptions(rows,key){let values=[];rows.forEach(row=>{let value=reviewerRequestData(row)[key];values.push(...(Array.isArray(value)?value:[value]))});return [...new Set(values.filter(Boolean))].sort()}
        function reviewerFilterSelect(label,key,values){let state=reviewerFilterState();return `<select aria-label="${label}" onchange="setReviewerFilter('${key}',this.value)"><option value="All">All ${label}</option>${values.map(value=>`<option value="${editorText(value)}" ${state[key]===value?'selected':''}>${editorText(value)}</option>`).join('')}</select>`}
        function reviewerViewFilterBar(){let state=reviewerFilterState(),rows=QUEUE.filter(row=>row[6]===S.queueTab),search=`<input value="${editorText(state.q)}" onchange="setReviewerFilter('q',this.value)" onkeyup="if(event.key==='Enter')setReviewerFilter('q',this.value)" placeholder="Search requests...">`,customer=reviewerFilterSelect('Customers','customer',reviewerFilterOptions(rows,'customer')),department=reviewerFilterSelect('Departments','department',reviewerFilterOptions(rows,'department')),priority=reviewerFilterSelect('Priorities','priority',reviewerFilterOptions(rows,'priority')),reset='<button class="btn" onclick="resetReviewerFilters()">Reset</button>';if(S.queueTab==='Needs Clarification')return `${search}${customer}${department}${priority}${reset}`;let due=reviewerFilterSelect('Due Dates','due',reviewerFilterOptions(rows,'due'));return `${search}${customer}${department}${priority}${due}${reset}`}
        const viewSpecificQueueRowsBase=queueRows;queueRows=function(home=false){let rows=viewSpecificQueueRowsBase(home);if(home||!['Awaiting Review','Needs Clarification'].includes(S.queueTab))return rows;let state=reviewerFilterState(),query=(state.q||'').toLowerCase();return rows.filter(row=>{let data=reviewerRequestData(row),custs=rvfArr(state.customer),depts=rvfArr(state.department),prios=rvfArr(state.priority),cats=rvfArr(state.category),types=rvfArr(state.casetype),srcs=rvfArr(state.source),miss=rvfArr(state.missing);let matchCust=!custs.length||custs.includes('All')||custs.includes(data.customer),matchDept=!depts.length||depts.includes('All')||(Array.isArray(data.department)?data.department.some(d=>depts.includes(d)):depts.includes(data.department)),matchPrio=!prios.length||prios.includes('All')||prios.includes(data.priority),matchDue=S.queueTab!=='Awaiting Review'||state.due==='All'||reviewerDueMatch(state,data.due)||data.due===state.due,matchCat=!cats.length||cats.includes('All')||(data.category&&cats.includes(data.category)),matchType=!types.length||types.includes('All')||(data.casetype&&types.includes(data.casetype)),matchSrc=!srcs.length||srcs.includes('All')||(data.source&&srcs.includes(data.source)),matchMiss=!miss.length||miss.includes('All')||(data.missing&&miss.includes(data.missing));return(!query||row.join(' ').toLowerCase().includes(query))&&matchCust&&matchDept&&matchPrio&&matchDue&&matchCat&&matchType&&matchSrc&&matchMiss})};
        const viewSpecificReviewBase=review;review=function(){if(!['Awaiting Review','Needs Clarification'].includes(S.queueTab))S.queueTab='Awaiting Review';let template=document.createElement('template');template.innerHTML=viewSpecificReviewBase();let tabs=[...template.content.querySelectorAll('.tabs button')];tabs.forEach(button=>{let clarification=/Needs Clarification|Missing Information/.test(button.textContent||'');if(clarification)button.innerHTML=button.innerHTML.replace('Needs Clarification','Missing Information');let tab=clarification?'Needs Clarification':'Awaiting Review';button.setAttribute('onclick',`switchReviewerView('${tab}')`)});let filters=template.content.querySelector('.filters');if(filters)filters.innerHTML=reviewerViewFilterBar();return template.innerHTML};
        const missingInformationMetricBase=metricAction;metricAction=function(label){if(/Missing Information/.test(label))return openQueueTab('Needs Clarification');return missingInformationMetricBase(label)};
        adminHome=function(){return head('Good morning, John','Review incoming emails, approve Cases and keep operations moving.')+kpis([['Cases Awaiting Review',QUEUE.filter(item=>item[6]==='Awaiting Review').length,'red'],['Missing Information',QUEUE.filter(item=>item[6]==='Needs Clarification').length,'amber'],['Acknowledgement Pending',QUEUE.filter(item=>item[6]==='Acknowledgement Pending').length,'amber']])+`<div class="card"><div class="card-head"><h2>Recent Items Requiring Attention</h2><span class="sub">Open an item to review its details</span></div>${queueTable(true)}</div>`};
        const missingInformationRenderBase=render;render=function(){missingInformationRenderBase();let root=document.getElementById('root');if(!root)return;let walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(node=>{node.nodeValue=node.nodeValue.replace(/Needs Clarification/g,'Missing Information')})};
        /* Missing-information review: keep the page focused and reply from the source email. */
        function openReviewerCustomerReply(){let record=activeClarification();if(record){openClarificationAction('customer');return}let c=selectedCaseData(),incoming=S.communications.find(message=>message.caseId===c.id&&message.direction==='Incoming');openCommunication('Reply',incoming?.id||'')}
        const compactMissingInformationApprovalBase=approval;approval=function(){let html=compactMissingInformationApprovalBase(),record=activeClarification();if(!record)return html;let template=document.createElement('template');template.innerHTML=html;template.content.querySelectorAll('.missing-alert,.request-actions').forEach(element=>element.remove());template.content.querySelectorAll('.sub').forEach(element=>{if(/^Current status:/i.test((element.textContent||'').trim()))element.remove()});let originalEmail=[...template.content.querySelectorAll('.panel')].find(panel=>panel.querySelector('.panel-title h2')?.textContent.trim()==='Original Email'),title=originalEmail?.querySelector('.panel-title');if(title&&!title.querySelector('.review-email-reply'))title.insertAdjacentHTML('beforeend',`<button class="review-email-reply" type="button" onclick="openReviewerCustomerReply()" aria-label="Reply to customer" title="Reply to customer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 7.5 4 12l5.5 4.5V14c5.1 0 8.2 1.5 10.5 5-1-5.7-4.3-9-10.5-9V7.5Z"/></svg></button>`);return template.innerHTML};
        document.head.insertAdjacentHTML('beforeend',`<style>.review-email-reply{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;padding:0;border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--blue);cursor:pointer}.review-email-reply:hover{background:#eef6fd;border-color:#a9cceb}.review-email-reply:focus-visible{outline:2px solid var(--blue);outline-offset:2px}.review-email-reply svg{width:19px;height:19px;fill:currentColor}</style>`);
        /* Reviewer does not manage Tasks directly. */
        const reviewerNavigationBase=navItems;navItems=function(){return reviewerNavigationBase().filter(item=>!(S.role==='Admin'&&item[0]==='tasks'))};
        const reviewerTaskRouteGuardBase=render;render=function(){if(S.loggedIn&&S.role==='Admin'&&S.page==='tasks')S.page='home';reviewerTaskRouteGuardBase()};
        /* Approved Requests is an immutable review history linked to the resulting Case. */
        const APPROVED_REQUESTS=[
            {reference:'EML-4098',subject:'Delivery coordination – Medical imaging systems',customer:'Siemens Healthineers',caseId:'CASE-1082',classification:'Delivery coordination',approvedBy:'John Andersson',approvedAt:'06 Oct 2026, 15:22'},
            {reference:'EML-4099',subject:'Export shipment – Mining equipment components',customer:'Epiroc',caseId:'CASE-1085',classification:'Export documentation',approvedBy:'John Andersson',approvedAt:'07 Oct 2026, 09:16'},
            {reference:'EML-4100',subject:'Packing request – Battery system prototypes',customer:'Northvolt Systems',caseId:'CASE-1086',classification:'Packing preparation',approvedBy:'John Andersson',approvedAt:'07 Oct 2026, 13:48'}
        ];
        S.approvedRequestFilters=S.approvedRequestFilters||{q:'',customer:'All',date:'All'};
        function approvedRequestDateBucket(value){let day=Number(String(value||'').match(/^(\d{1,2})/)?.[1]||0);return day>=14?'Today':day>=8?'Last 7 Days':'Last 30 Days'}
        function setApprovedRequestFilter(key,value){S.approvedRequestFilters[key]=value;render()}
        function resetApprovedRequestFilters(){S.approvedRequestFilters={q:'',customer:'All',date:'All'};render()}
        function approvedRequestRows(){let state=S.approvedRequestFilters,query=state.q.toLowerCase();return APPROVED_REQUESTS.filter(item=>(!query||[item.reference,item.caseId,item.subject,item.customer].join(' ').toLowerCase().includes(query))&&(state.customer==='All'||item.customer===state.customer)&&(state.date==='All'||approvedRequestDateBucket(item.approvedAt)===state.date))}
        function openApprovedRequest(reference){let item=APPROVED_REQUESTS.find(record=>record.reference===reference);if(!item)return;S.editorType='approvedRequest';S.editorData={...item};render()}
        function openApprovedCase(caseId){closeEditor();openCase(caseId)}
        function approvedRequestsView(){let state=S.approvedRequestFilters,rows=approvedRequestRows(),customers=[...new Set(APPROVED_REQUESTS.map(item=>item.customer))].filter(n => window.inCustomerMaster(n)).sort(),tabs=`<div class="tabs"><button onclick="switchReviewerView('Awaiting Review')">Awaiting Review (${QUEUE.filter(item=>item[6]==='Awaiting Review').length})</button><button onclick="switchReviewerView('Needs Clarification')">Missing Information (${QUEUE.filter(item=>item[6]==='Needs Clarification').length})</button><button class="active" onclick="switchReviewerView('Approved Requests')">Approved Requests (${APPROVED_REQUESTS.length})</button></div>`,filters=`<div class="filters approved-request-filters"><input value="${editorText(state.q)}" onchange="setApprovedRequestFilter('q',this.value)" onkeyup="if(event.key==='Enter')setApprovedRequestFilter('q',this.value)" placeholder="Search approved requests..."><select onchange="setApprovedRequestFilter('customer',this.value)"><option value="All">All Customers</option>${customers.map(value=>`<option ${state.customer===value?'selected':''}>${editorText(value)}</option>`).join('')}</select><select onchange="setApprovedRequestFilter('date',this.value)">${['All','Today','Last 7 Days','Last 30 Days'].map(value=>`<option value="${value}" ${state.date===value?'selected':''}>${value==='All'?'All Approved Dates':value}</option>`).join('')}</select><button class="btn" onclick="resetApprovedRequestFilters()">Reset</button></div>`,table=rows.length?`<table><thead><tr><th>Email Reference</th><th>Subject</th><th>Customer</th><th>Case</th><th>Category</th><th>Approved By</th><th>Approved Date / Time</th></tr></thead><tbody>${rows.map(item=>`<tr><td><button class="case-link" onclick="openApprovedRequest('${item.reference}')">${item.reference}</button></td><td>${editorText(item.subject)}</td><td>${editorText(item.customer)}</td><td><button class="case-link" onclick="openCase('${item.caseId}')">${item.caseId}</button></td><td>${editorText(item.classification)}</td><td>${editorText(item.approvedBy)}</td><td>${editorText(item.approvedAt)}</td></tr>`).join('')}</tbody></table>`:`<div class="card-body approved-empty"><strong>No approved requests match these filters</strong><p class="sub">Change or reset the filters to see approval history.</p></div>`;return head('Review Requests','Review incoming requests, resolve missing information and view approved request history.',`<span class="sub">Last refresh: ${S.lastRefresh}</span><button class="btn" onclick="refreshQueue()">Refresh</button>`)+`<div class="card">${tabs}${filters}<div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} ${rows.length===1?'Item':'Items'}</h3><span class="sub">Approved Requests</span></div><div class="approved-table-wrap">${table}</div></div>`}
        const approvedRequestsReviewBase=review;review=function(){if(S.queueTab==='Approved Requests')return approvedRequestsView();let html=approvedRequestsReviewBase(),template=document.createElement('template');template.innerHTML=html,tabs=template.content.querySelector('.tabs');if(tabs&&!tabs.querySelector('[data-approved-requests]'))tabs.insertAdjacentHTML('beforeend',`<button data-approved-requests onclick="switchReviewerView('Approved Requests')">Approved Requests (${APPROVED_REQUESTS.length})</button>`);return template.innerHTML};
        const approvedRequestApprovalBase=approveSelectedCase;approveSelectedCase=function(){let clarification=activeClarification();if(clarification&&clarification.status!=='Resolved'){approvedRequestApprovalBase();return}let emailId=S.reviewEmailId,c=selectedCaseData(),queueItem=QUEUE.find(item=>item[0]===emailId),snapshot=queueItem&&c?{reference:emailId,subject:queueItem[2]||c.subject,customer:c.customer,caseId:c.id,classification:c.classification||'General coordination',approvedBy:actorName(),approvedAt:auditTimestamp()}:null;approvedRequestApprovalBase();if(snapshot&&!APPROVED_REQUESTS.some(item=>item.reference===snapshot.reference)){APPROVED_REQUESTS.unshift(snapshot);S.activities.unshift([`${snapshot.reference} approved and created ${snapshot.caseId}`,snapshot.approvedBy,snapshot.approvedAt]);S.queueTab='Approved Requests';S.page='review';render()}};
        const approvedRequestEditorBase=editorDialog;editorDialog=function(){if(S.editorType!=='approvedRequest')return approvedRequestEditorBase();let item=S.editorData,c=CASE_DETAILS[item.caseId];return `<div class="modal-shade"><div class="assign-modal approved-request-modal"><h2>Approved Request</h2><div class="body"><div class="approved-request-summary"><span class="pill green">Approved</span><strong>${editorText(item.reference)} · ${editorText(item.customer)}</strong><p>${editorText(item.subject)}</p></div><dl class="approved-request-details"><dt>Created Case</dt><dd><button class="case-link" onclick="openApprovedCase('${item.caseId}')">${item.caseId}</button></dd><dt>Category</dt><dd>${editorText(item.classification)}</dd><dt>Approved by</dt><dd>${editorText(item.approvedBy)}</dd><dt>Approved date/time</dt><dd>${editorText(item.approvedAt)}</dd><dt>Original sender</dt><dd>${editorText(c?.contact||'Customer contact')} · ${editorText(c?.email||'Email retained with Case')}</dd></dl><div class="notice green">This request is read-only. Operational work continues in the linked Case.</div></div><div class="footer"><button class="btn" onclick="closeEditor()">Close</button><button class="btn primary" onclick="openApprovedCase('${item.caseId}')">Open Case</button></div></div></div>`};
        document.head.insertAdjacentHTML('beforeend',`<style>.approved-request-filters{grid-template-columns:minmax(260px,1.7fr) minmax(180px,.8fr) minmax(180px,.8fr) auto}.approved-table-wrap{overflow:auto}.approved-table-wrap table{min-width:1050px}.approved-empty{text-align:center;padding:42px}.approved-request-modal{width:min(680px,calc(100vw - 40px))}.approved-request-summary{display:grid;grid-template-columns:auto 1fr;gap:8px 10px;align-items:center;margin-bottom:18px}.approved-request-summary p{grid-column:1/-1;margin:4px 0;color:var(--muted)}.approved-request-details{display:grid;grid-template-columns:150px 1fr;gap:0;margin:0}.approved-request-details dt,.approved-request-details dd{margin:0;padding:10px 0;border-bottom:1px solid var(--line)}.approved-request-details dt{color:var(--muted)}@media(max-width:900px){.approved-request-filters{grid-template-columns:1fr 1fr}.approved-request-filters input{grid-column:1/-1}}</style>`);
        /* Reviewer and platform administration are separate profiles. */
        SYSTEM_ADMIN_ID='daniel';
        if(!USERS.some(user=>user.id===SYSTEM_ADMIN_ID))USERS.push({id:SYSTEM_ADMIN_ID,name:'Daniel Frölander',role:'Admin',department:'',title:'System Administrator',initials:'DF'});
        if(!USER_MASTER.some(user=>user.id===SYSTEM_ADMIN_ID))USER_MASTER.push({id:SYSTEM_ADMIN_ID,name:'Daniel Frölander',role:'Admin',department:'',title:'System Administrator',initials:'DF',workScope:'Company',classifications:[]});
        PERMISSIONS[SYSTEM_ADMIN_ID]={viewCompanyTasks:true,requestAssignments:false,updateTasks:false,viewDashboard:true,sendAcknowledgements:false,assignTasks:false,approveRequests:false};
        function isReviewerProfile(){return currentUser().id==='john'||currentUser().role==='Reviewer'}
        function isSystemAdminProfile(){return currentUser().id===SYSTEM_ADMIN_ID}
        function systemAdminHome(){let departments=[...new Set(USER_MASTER.map(user=>user.department).filter(department=>department&&department!=='Company'))];return head('Welcome, Daniel','Manage platform access, master data and system configuration from one place.')+`<div class="admin-overview-grid"><button class="admin-overview-card" onclick="go('users')"><span class="admin-card-icon">♙</span><span><strong>User Management</strong><small>${USER_MASTER.length} active profiles across ${departments.length} operational departments</small></span><b>Open ›</b></button><button class="admin-overview-card" onclick="go('masters')"><span class="admin-card-icon">▱</span><span><strong>Master Data</strong><small>Categories, Case Types, Task Templates, customer rules and mailboxes</small></span><b>Open ›</b></button><button class="admin-overview-card" onclick="go('dashboard')"><span class="admin-card-icon">▦</span><span><strong>Administration Dashboard</strong><small>Review platform-wide access and configuration coverage</small></span><b>Open ›</b></button></div><div class="grid2 admin-home-details"><section class="card"><div class="card-head"><h2>Access Overview</h2><span class="pill green">Configured</span></div><div class="card-body"><div class="kv"><label>Reviewer profiles</label><strong>1</strong></div><div class="kv"><label>Department Managers</label><strong>${USERS.filter(user=>user.role==='Manager').length}</strong></div><div class="kv"><label>Department Users</label><strong>${USERS.filter(user=>user.role==='User').length}</strong></div><div class="kv"><label>System Administrators</label><strong>1</strong></div></div></section><section class="card"><div class="card-head"><h2>Configuration Overview</h2><span class="pill green">Active</span></div><div class="card-body"><div class="kv"><label>Task routing categories</label><strong>${Object.keys(TASK_ROUTING).length}</strong></div><div class="kv"><label>Operational departments</label><strong>${departments.length}</strong></div><div class="kv"><label>Incoming mailboxes</label><strong>2</strong></div><div class="kv"><label>Master data status</label><strong>Available</strong></div></div></section></div>`}
        /* Reviewer Home combines operational work and compact request analytics. */
        S.reviewerAnalyticsPeriod=S.reviewerAnalyticsPeriod||'Monthly';
        function setReviewerAnalyticsPeriod(period){S.reviewerAnalyticsPeriod=period;render()}
        function openReviewerHomeView(tab,priority='All'){S.queueTab=tab;let state=S.reviewerFilters[tab];if(state){Object.keys(state).forEach(key=>state[key]=key==='q'?'':'All');if(priority!=='All')state.priority=priority}S.page='review';render()}
        function reviewerHomeRequests(){return QUEUE.filter(item=>['Awaiting Review','Needs Clarification'].includes(item[6]))}
        function reviewerAttentionRows(){let rank={Urgent:0,High:1,Medium:2,Low:3};return reviewerHomeRequests().slice().sort((a,b)=>(rank[requestPriority(a)]??9)-(rank[requestPriority(b)]??9)||reviewerRequestDueDateTime(a[0]).localeCompare(reviewerRequestDueDateTime(b[0]))).slice(0,5)}
        function reviewerVolumeChart(){let weekly=[['Week 1',12,10],['Week 2',15,13],['Week 3',11,9],['Week 4',18,16]],monthly=[['May',42,38],['Jun',48,44],['Jul',45,43],['Aug',54,49],['Sep',51,48],['Oct',36,32]],data=S.reviewerAnalyticsPeriod==='Monthly'?monthly:weekly,max=Math.max(...data.flatMap(item=>item.slice(1)));return `<section class="card reviewer-chart-card"><div class="card-head reviewer-chart-head"><div><h2>Request Volume</h2><span class="sub">Requests received compared with requests processed</span></div><div class="period-toggle" role="group" aria-label="Request volume period"><button class="${S.reviewerAnalyticsPeriod==='Weekly'?'active':''}" onclick="setReviewerAnalyticsPeriod('Weekly')">Weekly</button><button class="${S.reviewerAnalyticsPeriod==='Monthly'?'active':''}" onclick="setReviewerAnalyticsPeriod('Monthly')">Monthly</button></div></div><div class="volume-legend"><span><i class="received"></i>Received</span><span><i class="processed"></i>Processed</span></div><div class="volume-chart ${S.reviewerAnalyticsPeriod==='Monthly'?'monthly':'weekly'}" style="--volume-count:${data.length}">${data.map(item=>`<div class="volume-group"><div class="volume-bars"><span class="volume-bar received" style="height:${Math.max(8,item[1]/max*118)}px" title="${item[1]} received"><b>${item[1]}</b></span><span class="volume-bar processed" style="height:${Math.max(8,item[2]/max*118)}px" title="${item[2]} processed"><b>${item[2]}</b></span></div><small>${item[0]}</small></div>`).join('')}</div></section>`}
        function reviewerWorkloadChart(){let awaiting=QUEUE.filter(item=>item[6]==='Awaiting Review').length,missing=QUEUE.filter(item=>item[6]==='Needs Clarification').length,due=reviewerHomeRequests().filter(item=>/^15 Oct 2026/.test(reviewerRequestDueDateTime(item[0]))).length,total=Math.max(1,awaiting+missing+due),a=awaiting/total*360,m=(awaiting+missing)/total*360;return `<section class="card reviewer-chart-card"><div class="card-head"><div><h2>Current Workload</h2><span class="sub">Open review work and time-sensitive requests</span></div></div><div class="workload-wrap"><div class="workload-donut" style="background:conic-gradient(#1675c1 0 ${a}deg,#f0a000 ${a}deg ${m}deg,#d92c3a ${m}deg 360deg)"><span><strong>${awaiting+missing}</strong><small>Open</small></span></div><div class="workload-legend"><div><i data-aa-style="aa-static-style-63"></i><span>Awaiting Review</span><strong>${awaiting}</strong></div><div><i data-aa-style="aa-static-style-64"></i><span>Missing Information</span><strong>${missing}</strong></div><div><i data-aa-style="aa-static-style-65"></i><span>Due Today</span><strong>${due}</strong></div></div></div></section>`}
        function reviewerHorizontalChart(title,subtitle,items){let max=Math.max(...items.map(item=>item[1]),1);return `<section class="card reviewer-mini-chart"><div class="card-head"><div><h2>${title}</h2><span class="sub">${subtitle}</span></div></div><div class="horizontal-bars">${items.map(item=>`<div class="horizontal-row"><span>${item[0]}</span><div><i style="width:${item[1]/max*100}%;background:${item[2]}"></i></div><strong>${item[1]}</strong></div>`).join('')}</div></section>`}
        function reviewerAttentionTable(){let rows=reviewerAttentionRows();return `<section class="card reviewer-attention"><div class="card-head"><div><h2>Requests Requiring Attention</h2><span class="sub">Prioritised by urgency and due date</span></div><button class="link" onclick="openReviewerHomeView('Awaiting Review')">View all requests</button></div><div class="table-wrap"><table><thead><tr><th>Reference</th><th>Subject</th><th>Customer</th><th>Priority</th><th>Due Date / Time</th><th>Current Stage</th></tr></thead><tbody>${rows.map(row=>`<tr tabindex="0" onclick="openReviewCase('${row[0]}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openReviewCase('${row[0]}')}" aria-label="Open ${row[0]}"><td><strong class="id">${row[0]}</strong></td><td>${editorText(row[2])}</td><td>${editorText(row[1])}</td><td>${pill(requestPriority(row))}</td><td>${editorText(reviewerRequestDueDateTime(row[0]))}</td><td>${pill(row[6]==='Needs Clarification'?'Missing Information':'Awaiting Review')}</td></tr>`).join('')}</tbody></table></div></section>`}
        function reviewerDashboardHome(){let requests=reviewerHomeRequests(),awaiting=requests.filter(item=>item[6]==='Awaiting Review').length,missing=requests.filter(item=>item[6]==='Needs Clarification').length,high=requests.filter(item=>requestPriority(item)==='High').length,priority=[['Urgent',requests.filter(item=>requestPriority(item)==='Urgent').length,'#8f1d28'],['High',high,'#d92c3a'],['Medium',requests.filter(item=>requestPriority(item)==='Medium').length,'#1675c1'],['Low',requests.filter(item=>requestPriority(item)==='Low').length,'#56a36c']],age=[['< 1 day',4,'#56a36c'],['1–2 days',5,'#1675c1'],['3+ days',Math.max(1,requests.length-9),'#f0a000']];return head('Good morning, John','Review incoming requests, resolve missing information and monitor your processing workload.')+`<div class="reviewer-kpis"><button onclick="openReviewerHomeView('Awaiting Review')"><span>Awaiting Review</span><strong>${awaiting}</strong><small>Ready for your decision</small></button><button class="amber" onclick="openReviewerHomeView('Needs Clarification')"><span>Missing Information</span><strong>${missing}</strong><small>Customer details required</small></button><button class="red" onclick="openReviewerHomeView('Awaiting Review','High')"><span>High Priority Requests</span><strong>${high}</strong><small>Requires early attention</small></button></div><div class="reviewer-primary-grid">${reviewerVolumeChart()}${reviewerWorkloadChart()}</div><div class="reviewer-secondary-grid">${reviewerHorizontalChart('Priority Distribution','Open requests by priority',priority)}${reviewerHorizontalChart('Request Age','Time since each request was received',age)}</div>${reviewerAttentionTable()}`}
        home=function(){if(isReviewerProfile())return reviewerDashboardHome();if(isSystemAdminProfile())return systemAdminHome();if(S.role==='Manager')return managerHome();return userHome()};
        document.head.insertAdjacentHTML('beforeend',`<style>.reviewer-kpis{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-bottom:16px}.reviewer-kpis button{position:relative;display:flex;flex-direction:column;align-items:flex-start;min-height:112px;padding:18px 20px 16px;border:1px solid var(--line);border-left:4px solid var(--blue);border-radius:8px;background:#fff;color:var(--ink);text-align:left;box-shadow:var(--shadow);cursor:pointer}.reviewer-kpis button.amber{border-left-color:#f0a000}.reviewer-kpis button.red{border-left-color:#d92c3a}.reviewer-kpis button:hover,.reviewer-kpis button:focus-visible{border-top-color:#79baf0;border-right-color:#79baf0;border-bottom-color:#79baf0;box-shadow:0 5px 16px rgba(16,89,148,.14);outline:none}.reviewer-kpis span{font-weight:700}.reviewer-kpis strong{font-size:30px;line-height:1.15;margin:7px 0 2px}.reviewer-kpis small{color:var(--muted)}.reviewer-primary-grid{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(330px,.8fr);gap:16px;margin-bottom:16px}.reviewer-secondary-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}.reviewer-chart-card,.reviewer-mini-chart{margin:0;min-height:238px}.reviewer-chart-head{align-items:flex-start}.period-toggle{display:flex;border:1px solid var(--line);border-radius:6px;overflow:hidden}.period-toggle button{padding:7px 12px;border:0;border-left:1px solid var(--line);background:#fff;color:var(--muted);font-weight:700;cursor:pointer}.period-toggle button:first-child{border-left:0}.period-toggle button.active{background:var(--blue);color:#fff}.volume-legend{display:flex;justify-content:flex-end;gap:18px;padding:10px 20px 0;color:var(--muted);font-size:12px}.volume-legend span{display:flex;align-items:center;gap:6px}.volume-legend i,.workload-legend i{width:9px;height:9px;border-radius:2px}.volume-legend .received{background:#1675c1}.volume-legend .processed{background:#7fc0ef}.volume-chart{display:flex;align-items:flex-end;justify-content:space-around;height:166px;padding:12px 24px 18px;border-bottom:1px solid var(--line)}.volume-group{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:7px}.volume-bars{display:flex;align-items:flex-end;gap:6px;height:124px}.volume-bar{position:relative;width:25px;border-radius:4px 4px 0 0}.volume-bar.received{background:#1675c1}.volume-bar.processed{background:#7fc0ef}.volume-bar b{position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:11px;color:var(--muted)}.volume-group small{color:var(--muted);white-space:nowrap}.workload-wrap{display:grid;grid-template-columns:150px 1fr;gap:22px;align-items:center;padding:24px}.workload-donut{display:grid;place-items:center;width:142px;height:142px;border-radius:50%}.workload-donut>span{display:flex;flex-direction:column;align-items:center;justify-content:center;width:88px;height:88px;border-radius:50%;background:#fff}.workload-donut strong{font-size:26px}.workload-donut small{color:var(--muted)}.workload-legend{display:grid;gap:14px}.workload-legend div{display:grid;grid-template-columns:10px 1fr auto;align-items:center;gap:9px}.workload-legend span{color:var(--muted)}.horizontal-bars{display:grid;gap:18px;padding:25px}.horizontal-row{display:grid;grid-template-columns:88px 1fr 28px;align-items:center;gap:12px}.horizontal-row>span{color:var(--muted)}.horizontal-row>div{height:10px;border-radius:999px;background:#e7edf2;overflow:hidden}.horizontal-row i{display:block;height:100%;border-radius:999px}.horizontal-row strong{text-align:right}.reviewer-attention{margin-bottom:0}.reviewer-attention .table-wrap{overflow:auto}.reviewer-attention table{min-width:920px}.reviewer-attention tbody tr{cursor:pointer}.reviewer-attention tbody tr:hover,.reviewer-attention tbody tr:focus{background:#eef7ff;outline:none}.reviewer-attention td:nth-child(2){font-weight:600}@media(max-width:1050px){.reviewer-primary-grid{grid-template-columns:1fr}.reviewer-secondary-grid{grid-template-columns:1fr}.reviewer-kpis{grid-template-columns:1fr 1fr}.reviewer-kpis button:last-child{grid-column:1/-1}}@media(max-width:680px){.reviewer-kpis{grid-template-columns:1fr}.reviewer-kpis button:last-child{grid-column:auto}.workload-wrap{grid-template-columns:1fr;justify-items:center}.workload-legend{width:100%}}</style>`);
        /* Reviewer response and follow-up queues are actionable Home KPIs. */
        const REVIEWER_ACTION_VIEWS={
            'Customer Replies Received':{references:['EML-4102','EML-4108'],caption:'Customer responded · Ready for review'},
            'Requires Follow-up':{references:['EML-4103','EML-4106','EML-4109'],caption:'Waiting for customer information'}
        };
S.reviewerActionFilters=S.reviewerActionFilters||{q:'',customer:'All',priority:'All'};
        function reviewerActionRows(view){let config=REVIEWER_ACTION_VIEWS[view];return config?config.references.map(reference=>QUEUE.find(item=>item[0]===reference)).filter(Boolean):[]}
        function openReviewerActionView(view){S.queueTab=view;S.reviewerActionFilters={q:'',customer:'All',priority:'All'};S.page='review';render()}
        function setReviewerActionFilter(key,value){S.reviewerActionFilters[key]=value;render()}
        function reviewerActionTabs(){return `<div class="tabs"><button onclick="switchReviewerView('Awaiting Review')">Awaiting Review (${QUEUE.filter(item=>item[6]==='Awaiting Review').length})</button><button onclick="switchReviewerView('Needs Clarification')">Missing Information (${QUEUE.filter(item=>item[6]==='Needs Clarification').length})</button>${Object.keys(REVIEWER_ACTION_VIEWS).map(view=>`<button class="${S.queueTab===view?'active':''}" onclick="openReviewerActionView('${view}')">${view} (${reviewerActionRows(view).length})</button>`).join('')}<button onclick="switchReviewerView('Approved Requests')">Approved Requests (${APPROVED_REQUESTS.length})</button></div>`}
        function reviewerActionRequestsView(){let view=S.queueTab,all=reviewerActionRows(view),state=S.reviewerActionFilters,query=state.q.toLowerCase(),customers=[...new Set(all.map(row=>row[1]))].filter(n => window.inCustomerMaster(n)).sort(),priorities=[...new Set(all.map(row=>requestPriority(row)))],rows=all.filter(row=>(!query||row.join(' ').toLowerCase().includes(query))&&(state.customer==='All'||row[1]===state.customer)&&(state.priority==='All'||requestPriority(row)===state.priority)),select=(label,key,values)=>`<select onchange="setReviewerActionFilter('${key}',this.value)"><option value="All">All ${label}</option>${values.map(value=>`<option ${state[key]===value?'selected':''}>${editorText(value)}</option>`).join('')}</select>`,filters=`<div class="filters reviewer-action-filters"><input value="${editorText(state.q)}" onchange="setReviewerActionFilter('q',this.value)" onkeyup="if(event.key==='Enter')setReviewerActionFilter('q',this.value)" placeholder="Search ${view.toLowerCase()}..."><span></span>${select('Customers','customer',customers)}${select('Priorities','priority',priorities)}</div>`,caption=REVIEWER_ACTION_VIEWS[view].caption,table=rows.length?`<table><thead><tr><th>Reference</th><th>Subject</th><th>Customer</th><th>Priority</th><th>Received</th><th>Due Date / Time</th><th>Current Stage</th></tr></thead><tbody>${rows.map(row=>`<tr tabindex="0" onclick="openReviewCase('${row[0]}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openReviewCase('${row[0]}')}" aria-label="Open ${row[0]}"><td><strong class="id">${row[0]}</strong></td><td>${editorText(row[2])}</td><td>${editorText(row[1])}</td><td>${pill(requestPriority(row))}</td><td>${editorText(row[5])}</td><td>${editorText(reviewerRequestDueDateTime(row[0]))}</td><td>${pill(caption)}</td></tr>`).join('')}</tbody></table>`:`<div class="card-body approved-empty"><strong>No requests match these filters</strong><p class="sub">Change the filters to see other requests in this view.</p></div>`;return head('Review Requests','Review incoming requests, resolve missing information and manage customer responses.',`<span class="sub">Last refresh: ${S.lastRefresh}</span><button class="btn" onclick="refreshQueue()">Refresh</button>`)+`<div class="card">${reviewerActionTabs()}${filters}<div class="card-head" data-aa-style="aa-static-style-5"><h3>${rows.length} ${rows.length===1?'Item':'Items'}</h3><span class="sub">${view}</span></div><div class="reviewer-action-table">${table}</div></div>`}
        const reviewerActionReviewBase=review;review=function(){if(REVIEWER_ACTION_VIEWS[S.queueTab])return reviewerActionRequestsView();let template=document.createElement('template');template.innerHTML=reviewerActionReviewBase();let tabs=template.content.querySelector('.tabs'),approved=tabs?.querySelector('[data-approved-requests]');if(tabs&&!tabs.querySelector('[data-reviewer-action]'))Object.keys(REVIEWER_ACTION_VIEWS).forEach(view=>{let button=document.createElement('button');button.dataset.reviewerAction='true';button.textContent=`${view} (${reviewerActionRows(view).length})`;button.setAttribute('onclick',`openReviewerActionView('${view}')`);tabs.insertBefore(button,approved||null)});return template.innerHTML};
        var reviewerDashboardHome=window.reviewerDashboardHome||function(){return ""};const reviewerActionHomeBase=reviewerDashboardHome;reviewerDashboardHome=function(){let template=document.createElement('template');template.innerHTML=reviewerActionHomeBase();let kpis=template.content.querySelector('.reviewer-kpis');if(kpis){kpis.classList.add('reviewer-kpis-five');kpis.insertAdjacentHTML('beforeend',`<button class="green" onclick="openReviewerActionView('Customer Replies Received')"><span>Customer Replies Received</span><strong>${reviewerActionRows('Customer Replies Received').length}</strong><small>Ready for reviewer action</small></button><button class="violet" onclick="openReviewerActionView('Requires Follow-up')"><span>Requires Follow-up</span><strong>${reviewerActionRows('Requires Follow-up').length}</strong><small>Customer response still required</small></button>`)}return template.innerHTML};
        document.head.insertAdjacentHTML('beforeend',`<style>.reviewer-kpis.reviewer-kpis-five{grid-template-columns:repeat(5,minmax(0,1fr))}.reviewer-kpis button.green{border-left-color:#299956}.reviewer-kpis button.violet{border-left-color:#7657b6}.reviewer-action-filters{grid-template-columns:minmax(280px,1.6fr) 1fr minmax(170px,.7fr) minmax(160px,.65fr)}.reviewer-action-table{overflow:auto}.reviewer-action-table table{min-width:1120px}.reviewer-action-table tbody tr{cursor:pointer}.reviewer-action-table tbody tr:hover,.reviewer-action-table tbody tr:focus{background:#eef7ff;outline:none}@media(max-width:1250px){.reviewer-kpis.reviewer-kpis-five{grid-template-columns:repeat(3,1fr)}.reviewer-kpis.reviewer-kpis-five button:last-child{grid-column:auto}}@media(max-width:900px){.reviewer-action-filters{grid-template-columns:1fr 1fr}.reviewer-action-filters input{grid-column:1/-1}.reviewer-action-filters>span{display:none}}@media(max-width:680px){.reviewer-kpis.reviewer-kpis-five{grid-template-columns:1fr}}</style>`);
        navItems=function(){if(isReviewerProfile())return [['home',navigationIcon('home'),'Home'],['review',navigationIcon('review'),'Review Requests'],['cases',navigationIcon('cases'),'Cases'],['dashboard',navigationIcon('dashboard'),'Dashboard']];if(isSystemAdminProfile())return [['users',navigationIcon('users'),'User Management'],['masters','<svg viewBox="0 0 20 20" aria-hidden="true"><ellipse cx="10" cy="5" rx="6.5" ry="2.5"/><path d="M3.5 5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V5M3.5 10v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5"/></svg>','Masters']];if(S.role==='Manager')return [['home',navigationIcon('home'),'Home'],['department',navigationIcon('tasks'),'Tasks'],['cases',navigationIcon('cases'),'Cases'],['dashboard',navigationIcon('dashboard'),'Dashboard']].filter(item=>item[0]!=='dashboard'||can('viewDashboard'));return [['home',navigationIcon('home'),'Home'],['mytasks',navigationIcon('tasks'),'Tasks'],['cases',navigationIcon('cases'),'Cases'],['dashboard',navigationIcon('dashboard'),'Dashboard']].filter(item=>item[0]!=='dashboard'||can('viewDashboard'))};
        profileMenu=function(){
            const DISTINCT_PROFILES = [
                { id: SYSTEM_ADMIN_ID, roleName: 'Admin', department: '' },
                { id: 'john', roleName: 'Reviewer', department: 'Operations' },
                { id: 'maria', roleName: 'Department Head', department: 'Transport' },
                { id: 'erik', roleName: 'Department User', department: 'Transport' }
            ];
            return `<div class="drop-menu"><div class="menu-label">Switch user</div>${DISTINCT_PROFILES.map(dp=>{
                let user = USERS.find(u => u.id === dp.id);
                if (!user) return '';
                return `<button class="${S.userId===user.id?'selected':''}" onclick="selectUser('${user.id}')"><span class="avatar profile-menu-photo">${user.initials}</span><strong>${user.name} ${S.userId===user.id?'✓':''}</strong><small>${dp.roleName} · ${dp.department}</small></button>`;
            }).join('')}</div>`;
        };
        document.head.insertAdjacentHTML('beforeend',`<style>.admin-overview-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-bottom:18px}.admin-overview-card{display:grid;grid-template-columns:46px 1fr auto;gap:14px;align-items:center;min-height:120px;padding:20px;text-align:left;background:#fff;border:1px solid var(--line);border-radius:8px;color:var(--ink);box-shadow:var(--shadow);cursor:pointer}.admin-overview-card:hover,.admin-overview-card:focus-visible{border-color:#79baf0;box-shadow:0 5px 16px rgba(16,89,148,.14);outline:none}.admin-overview-card strong{display:block;font-size:18px;margin-bottom:7px}.admin-overview-card small{display:block;color:var(--muted);font-size:13px;line-height:1.45}.admin-overview-card b{color:var(--blue);white-space:nowrap}.admin-card-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:8px;background:#eaf4ff;color:var(--blue);font-size:23px}.admin-home-details .card{min-height:260px}@media(max-width:1000px){.admin-overview-grid{grid-template-columns:1fr}.admin-overview-card{min-height:94px}}</style>`);
        const separatedProfileRenderBase=render;render=function(){let adminPages=['home','users','masters','dashboard'],reviewerPages=['home','review','approval','cases','case','dashboard'];if(S.loggedIn&&isSystemAdminProfile()&&!adminPages.includes(S.page))S.page='home';if(S.loggedIn&&isReviewerProfile()&&!reviewerPages.includes(S.page))S.page='home';separatedProfileRenderBase();document.querySelectorAll(`button[onclick="selectUser('${SYSTEM_ADMIN_ID}')"] small`).forEach(node=>node.textContent='Admin · Company');if(isSystemAdminProfile()){let current=document.querySelector('.profile-trigger small');if(current)current.textContent='System Administrator · ▾';let row=[...document.querySelectorAll('tbody tr')].find(tr=>tr.textContent.includes('Daniel Frölander'));if(row&&row.children[2])row.children[2].textContent='System Administrator'}};
        /* Global desktop navigation can switch between labelled and icon-only modes. */
        S.navCollapsed=localStorage.getItem('aa-logistik-nav-collapsed')==='true';
        function toggleNavigation(){S.navCollapsed=!S.navCollapsed;localStorage.setItem('aa-logistik-nav-collapsed',String(S.navCollapsed));render()}
        const collapsibleNavigationShellBase=shell;shell=function(body){let template=document.createElement('template');template.innerHTML=collapsibleNavigationShellBase(body);let app=template.content.querySelector('.app'),sidebar=template.content.querySelector('.sidebar'),brand=sidebar?.querySelector('.brand');if(app&&S.navCollapsed)app.classList.add('nav-collapsed');if(brand){let toggle=document.createElement('button');toggle.className='nav-collapse-toggle';toggle.type='button';toggle.setAttribute('onclick','toggleNavigation()');toggle.setAttribute('aria-label',S.navCollapsed?'Expand navigation':'Collapse navigation');toggle.setAttribute('title',S.navCollapsed?'Expand navigation':'Collapse navigation');toggle.innerHTML=S.navCollapsed?'›':'‹';brand.append(toggle)}sidebar?.querySelectorAll('.nav button').forEach(button=>{let icon=button.querySelector('.ico'),label=[...button.childNodes].filter(node=>node!==icon).map(node=>node.textContent||'').join('').trim();[...button.childNodes].filter(node=>node!==icon).forEach(node=>node.remove());let span=document.createElement('span');span.className='nav-label';span.textContent=label;button.append(span);button.title=S.navCollapsed?label:'';button.setAttribute('aria-label',label)});return template.innerHTML};
        document.head.insertAdjacentHTML('beforeend',`<style>.app,.sidebar,.main{transition:grid-template-columns .2s ease,width .2s ease}.brand{position:relative}.nav-collapse-toggle{position:absolute;right:-12px;top:80px;z-index:8;display:grid;place-items:center;width:25px;height:25px;padding:0;border:1px solid #b9cad8;border-radius:50%;background:#fff;color:#21415e;font-size:20px;font-weight:700;line-height:1;box-shadow:0 2px 7px rgba(4,27,48,.2)}.nav-collapse-toggle:hover{background:#eaf4ff;color:var(--blue)}.nav-label{white-space:nowrap;overflow:hidden}.app.nav-collapsed{grid-template-columns:72px 1fr}.nav-collapsed .sidebar{width:72px;overflow:visible}.nav-collapsed .brand{padding:0 14px}.nav-collapsed .brand img{width:44px;height:44px;max-width:none;object-fit:cover;object-position:left center;padding:4px}.nav-collapsed .nav{padding:18px 10px}.nav-collapsed .nav button{position:relative;justify-content:center;width:52px;height:46px;padding:0}.nav-collapsed .nav .ico{width:24px;display:grid;place-items:center}.nav-collapsed .nav-label{display:none}.nav-collapsed .truck-panel{display:none}.nav-collapsed .nav-collapse-toggle{right:-12px}.nav-collapsed .main{grid-column:2}@media(max-width:760px){.nav-collapse-toggle{display:none}}</style>`);
        document.head.insertAdjacentHTML('beforeend','<style>.sidebar{overflow:visible}</style>');
        /* Use a conventional sidebar panel icon beside the logo. */
        const panelIconNavigationShellBase=shell;shell=function(body){let template=document.createElement('template');template.innerHTML=panelIconNavigationShellBase(body);let toggle=template.content.querySelector('.nav-collapse-toggle');if(toggle)toggle.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path></svg>`;return template.innerHTML};
        document.head.insertAdjacentHTML('beforeend',`<style>.brand{gap:8px;padding:0 12px}.brand img{width:158px;flex:0 1 auto}.nav-collapse-toggle{position:static;flex:0 0 28px;width:28px;height:32px;border:0;border-radius:5px;background:transparent;box-shadow:none;color:#aeb8c2}.nav-collapse-toggle svg{display:block;width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.nav-collapse-toggle:hover,.nav-collapse-toggle:focus-visible{background:rgba(255,255,255,.1);color:#fff;outline:none}.nav-collapsed .brand{justify-content:center;padding:0}.nav-collapsed .brand img{display:none}.nav-collapsed .nav-collapse-toggle{position:static;margin:0;right:auto}</style>`);
        /* Every Reviewer request screen exposes the same reply action on Original Email. */
        const MULTI_MISSING_INFORMATION={
            'EML-4103':[{field:'delivery',label:'Delivery location'},{field:'deliveryContact',label:'Delivery contact'},{field:'pickupDateTime',label:'Pickup date/time'}],
            'EML-4106':[{field:'pickupContact',label:'Pickup contact'},{field:'dimensions',label:'Dimensions'},{field:'packages',label:'Packages'},{field:'deliveryDateTime',label:'Delivery date/time'}],
            'EML-4109':[{field:'dimensions',label:'Dimensions'},{field:'specialHandling',label:'Special handling'}]
        };
        Object.entries(MULTI_MISSING_INFORMATION).forEach(([emailId,fields])=>{let record=CLARIFICATIONS[emailId],c=record&&CASE_DETAILS[record.caseId];if(!record)return;record.fields=fields;record.field=fields[0].field;record.missing=fields[0].label;record.request=`Please confirm the following missing information: ${fields.map(item=>item.label).join(', ')}.`;fields.forEach(item=>{if(c)c[item.field]=''});let queue=QUEUE.find(item=>item[0]===emailId);if(queue)queue[4]=`Missing ${fields.map(item=>item.label.toLowerCase()).join(', ')}`});
        function clarificationMissingFields(record=activeClarification()){return record?.fields?.length?record.fields:record?[{field:record.field,label:record.missing}]:[]}
        const multipleMissingQueueTableBase=queueTable;queueTable=function(home=false){let html=multipleMissingQueueTableBase(home);if(home||S.queueTab!=='Needs Clarification')return html;let template=document.createElement('template');template.innerHTML=html;template.content.querySelector('.card')?.classList.add('missing-information-card');template.content.querySelectorAll('tbody tr').forEach(row=>{let reference=row.children[0]?.textContent.trim(),record=CLARIFICATIONS[reference],fields=clarificationMissingFields(record),chip=row.querySelector('.missing-info-chip');if(!chip||!fields.length)return;let additional=fields.slice(1);chip.innerHTML=`<span>${editorText(fields[0].label)}</span>${additional.length?`<span class="missing-info-popover-wrap"><button class="missing-info-more" type="button" aria-label="Show ${additional.length} more missing ${additional.length===1?'field':'fields'}" aria-expanded="false" onclick="toggleMissingInfoPopover(event,this)">+${additional.length}</button><span class="missing-info-popover" role="tooltip"><strong>Also missing</strong>${additional.map(item=>`<span>${editorText(item.label)}</span>`).join('')}</span></span>`:''}`});return template.innerHTML};
        function closeMissingInfoPopovers(except=null){document.querySelectorAll('.missing-info-popover-wrap.open').forEach(wrap=>{if(wrap===except)return;wrap.classList.remove('open');wrap.querySelector('.missing-info-more')?.setAttribute('aria-expanded','false')})}
        function toggleMissingInfoPopover(event,button){event.preventDefault();event.stopPropagation();let wrap=button.closest('.missing-info-popover-wrap'),opening=!wrap.classList.contains('open');closeMissingInfoPopovers(wrap);wrap.classList.toggle('open',opening);button.setAttribute('aria-expanded',String(opening))}
        document.addEventListener('click',event=>{if(!event.target.closest('.missing-info-popover-wrap'))closeMissingInfoPopovers()});
        document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMissingInfoPopovers()});
        let missingInfoFloatTimer=null,missingInfoFloatPinned=false;
        function hideFloatingMissingInfo(force=false){if(missingInfoFloatPinned&&!force)return;clearTimeout(missingInfoFloatTimer);document.querySelector('.missing-info-floating')?.remove();if(force)missingInfoFloatPinned=false}
        function showFloatingMissingInfo(button,pinned=false){
            let source=button.closest('.missing-info-popover-wrap')?.querySelector('.missing-info-popover');if(!source)return;
            hideFloatingMissingInfo(true);missingInfoFloatPinned=pinned;
            let floating=source.cloneNode(true);floating.className='missing-info-floating';floating.setAttribute('role','tooltip');document.body.appendChild(floating);
            let rect=button.getBoundingClientRect(),width=Math.min(260,Math.max(190,floating.offsetWidth)),height=floating.offsetHeight,gap=8,left=Math.min(window.innerWidth-width-12,Math.max(12,rect.right-width)),spaceBelow=window.innerHeight-rect.bottom,top=spaceBelow>=height+gap?rect.bottom+gap:Math.max(12,rect.top-height-gap);
            floating.style.left=`${left}px`;floating.style.top=`${top}px`;floating.classList.toggle('above',top<rect.top);
            floating.addEventListener('mouseenter',()=>clearTimeout(missingInfoFloatTimer));floating.addEventListener('mouseleave',()=>{missingInfoFloatTimer=setTimeout(()=>hideFloatingMissingInfo(),120)});
        }
        document.addEventListener('mouseover',event=>{let button=event.target.closest('.missing-info-more');if(button)showFloatingMissingInfo(button,false)});
        document.addEventListener('mouseout',event=>{let button=event.target.closest('.missing-info-more');if(button&&!button.contains(event.relatedTarget)){missingInfoFloatTimer=setTimeout(()=>hideFloatingMissingInfo(),120)}});
        document.addEventListener('focusin',event=>{let button=event.target.closest('.missing-info-more');if(button)showFloatingMissingInfo(button,false)});
        document.addEventListener('click',event=>{let button=event.target.closest('.missing-info-more');if(button){missingInfoFloatPinned=button.getAttribute('aria-expanded')==='true';if(missingInfoFloatPinned)showFloatingMissingInfo(button,true);else hideFloatingMissingInfo(true)}else{hideFloatingMissingInfo(true)}});
        window.addEventListener('scroll',()=>hideFloatingMissingInfo(true),true);window.addEventListener('resize',()=>hideFloatingMissingInfo(true));
        const reviewerOriginalEmailReplyBase=approval;approval=function(){let html=reviewerOriginalEmailReplyBase();if(!isReviewerProfile())return html;let template=document.createElement('template');template.innerHTML=html;template.content.querySelectorAll('button').forEach(button=>{if(/^Approve Case(?:\s*&.*)?$/i.test(button.textContent.trim()))button.textContent='Create Case'});template.content.querySelectorAll('.panel-title').forEach(title=>{let heading=title.querySelector('h2');if(heading?.textContent.trim()!=='Original Email'||title.querySelector('.review-email-reply'))return;title.insertAdjacentHTML('beforeend',`<button class="review-email-reply" type="button" onclick="openReviewerCustomerReply()" aria-label="Reply to customer" title="Reply to customer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 7.5 4 12l5.5 4.5V14c5.1 0 8.2 1.5 10.5 5-1-5.7-4.3-9-10.5-9V7.5Z"/></svg></button>`)});let fields=clarificationMissingFields();if(fields.length){let panel=template.content.querySelector('.extracted-order-panel'),rows=panel?[...panel.querySelectorAll('.review-order-field')]:[];fields.forEach(item=>{let row=rows.find(node=>node.querySelector('span')?.textContent.trim()===item.label);if(!row)return;row.classList.add('missing-review-field');let value=row.querySelector('strong');if(value)value.textContent='Missing — clarification required'});let readiness=panel?.querySelector('.review-readiness');if(readiness){readiness.classList.remove('complete');readiness.classList.add('incomplete');readiness.innerHTML=`<strong>! ${fields.length} required ${fields.length===1?'field is':'fields are'} missing</strong>`}}return template.innerHTML};
        document.head.insertAdjacentHTML('beforeend',`<style>.missing-information-card{overflow:visible}.missing-information-card table{overflow:visible}.missing-info-chip{gap:6px}.missing-info-popover-wrap{position:relative;display:inline-flex}.missing-info-more{display:inline-grid;place-items:center;min-width:24px;height:22px;padding:0 6px;border:0;border-radius:999px;background:#c82636;color:#fff;font:800 10px/1 inherit;cursor:pointer}.missing-info-more:hover,.missing-info-more:focus-visible{background:#a91828;outline:2px solid #ef9ca5;outline-offset:2px}.missing-info-popover{position:absolute;z-index:40;right:0;top:calc(100% + 8px);display:none;min-width:190px;max-width:260px;padding:10px;border:1px solid #e5a3aa;border-radius:7px;background:#fff;box-shadow:0 10px 24px rgba(20,37,55,.18);color:var(--ink);white-space:normal}.missing-info-popover::before{content:'';position:absolute;right:8px;top:-6px;width:10px;height:10px;border-left:1px solid #e5a3aa;border-top:1px solid #e5a3aa;background:#fff;transform:rotate(45deg)}.missing-info-popover strong{display:block;margin-bottom:5px;color:#8f1e2a;font-size:11px}.missing-info-popover>span{display:block;padding:5px 0;border-top:1px solid var(--line);font-size:12px;font-weight:700}.missing-info-popover-wrap:hover .missing-info-popover,.missing-info-popover-wrap:focus-within .missing-info-popover,.missing-info-popover-wrap.open .missing-info-popover{display:block}.extracted-order-panel .missing-review-field{margin:4px 0}</style>`);
        document.head.insertAdjacentHTML('beforeend',`<style>.missing-info-more{font-family:inherit;font-size:10px;font-weight:800;line-height:1}.missing-info-popover-wrap .missing-info-popover{display:none!important}.missing-info-floating{position:fixed;z-index:10000;display:block;box-sizing:border-box;min-width:190px;max-width:260px;padding:10px;border:1px solid #e5a3aa;border-radius:7px;background:#fff;box-shadow:0 10px 24px rgba(20,37,55,.22);color:var(--ink);white-space:normal}.missing-info-floating::before{content:'';position:absolute;right:12px;top:-6px;width:10px;height:10px;border-left:1px solid #e5a3aa;border-top:1px solid #e5a3aa;background:#fff;transform:rotate(45deg)}.missing-info-floating.above::before{top:auto;bottom:-6px;border:0;border-right:1px solid #e5a3aa;border-bottom:1px solid #e5a3aa}.missing-info-floating strong{display:block;margin-bottom:5px;color:#8f1e2a;font-size:11px}.missing-info-floating>span{display:block;padding:5px 0;border-top:1px solid var(--line);font-size:12px;font-weight:700}</style>`);
        /* Task-list navigation opens an in-place preview instead of leaving the current screen. */
        openTaskContext=function(taskId){let task=taskById(taskId);if(!task)return;S.selectedTask=taskId;S.kanbanTaskId=taskId;S.drawer=true;render()};
        document.head.insertAdjacentHTML('beforeend',`<style>.drawer .page-head>.actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}.drawer .page-head>.actions .btn{white-space:nowrap}@media(max-width:760px){.drawer .page-head{align-items:flex-start}.drawer .page-head>.actions{justify-content:flex-start}}</style>`);
        /* Photorealistic staff portraits replace initial-only avatars throughout the UI. */
        var USER_PHOTO_CELLS=window.USER_PHOTO_CELLS=Object.assign(window.USER_PHOTO_CELLS||{},{
            john:[1,0],maria:[0,0],sofia:[2,0],emma:[1,1],erik:[3,0],andreas:[2,1],
            karin:[3,1],oskar:[0,1],lars:[1,2],elin:[0,2],[SYSTEM_ADMIN_ID]:[3,2]
        });
        function applyUserPhoto(node,user){
            let cell=USER_PHOTO_CELLS[user?.id];
            if(!node||!cell)return;
            node.classList.add('profile-photo');
            node.style.setProperty('--photo-x',`${cell[0]*100/3}%`);
            node.style.setProperty('--photo-y',`${cell[1]*50}%`);
            node.textContent='';
            node.setAttribute('role','img');
            node.setAttribute('aria-label',`${user.name} profile photo`);
            node.title=user.name;
        }
        function decorateUserPhotos(){
            document.querySelectorAll('.avatar,.mini-avatar').forEach(node=>{
                let initials=node.textContent.trim(),container=node.closest('button,tr,li,.mention,.comment,.team-member,.profile-trigger')||node.parentElement,
                    user=USERS.find(item=>item.initials===initials)||USERS.find(item=>container?.textContent.includes(item.name));
                applyUserPhoto(node,user);
            });
            document.querySelectorAll('.drop-menu button[onclick^="selectUser("]').forEach(button=>{
                let match=button.getAttribute('onclick').match(/selectUser\('([^']+)'\)/),user=match&&USERS.find(item=>item.id===match[1]);
                if(!user||button.querySelector('.profile-menu-photo'))return;
                let photo=document.createElement('span');photo.className='avatar profile-menu-photo';button.prepend(photo);applyUserPhoto(photo,user);
            });
        }
        const profilePhotoRenderBase=render;render=function(){profilePhotoRenderBase();decorateUserPhotos()};
        const createOrderLabelBase=orderTabV2;orderTabV2=function(){return createOrderLabelBase().replace(/Create Freight Order/g,'Create Order').replace(/Freight Order creation opened/g,'Order creation opened')};
        document.head.insertAdjacentHTML('beforeend',`<style>
            .avatar.profile-photo,.mini-avatar.profile-photo{background-image:url('assets/team-profile-photos.png')!important;background-repeat:no-repeat!important;background-size:400% 300%!important;background-position:var(--photo-x) var(--photo-y)!important;color:transparent!important;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(12,42,68,.08)}
            .profile-menu-photo{display:inline-block;flex:0 0 32px;width:32px!important;height:32px!important;margin-right:10px;vertical-align:middle;border-radius:50%}
            .drop-menu button[onclick^="selectUser("]{display:grid;grid-template-columns:32px 1fr;align-items:center;text-align:left}
            .drop-menu button[onclick^="selectUser("] strong,.drop-menu button[onclick^="selectUser("] small{grid-column:2}
            .drop-menu button[onclick^="selectUser("] .profile-menu-photo{grid-column:1;grid-row:1/3}
        </style>`);
        /* Reviewers may create a Case with unresolved information; the gaps remain visible until resolved. */
        function outstandingCaseFields(c){return Array.isArray(c?.outstandingFields)?c.outstandingFields:[]}
        function outstandingCaseNotice(c){let fields=outstandingCaseFields(c);if(!fields.length)return'';return `<section class="case-missing-notice" role="status"><div><strong>Missing information</strong><span>This Case was created before all required details were available.</span></div><div class="case-missing-chips">${fields.map(item=>`<span>${editorText(item.label)}</span>`).join('')}</div></section>`}
        const allowIncompleteCaseCreationBase=approveSelectedCase;approveSelectedCase=function(){
            let record=activeClarification();
            if(!record||record.status==='Resolved'){allowIncompleteCaseCreationBase();return}
            let source=selectedCaseData(),sourceId=source.id,emailId=S.reviewEmailId,queueItem=QUEUE.find(item=>item[0]===emailId),fields=clarificationMissingFields(record),at=auditTimestamp(),by=actorName();
            let caseAlreadyExists=CASES.some(item=>item[0]===sourceId),caseId=sourceId;
            if(caseAlreadyExists){
                let numbers=[...CASES.map(item=>Number(String(item[0]).replace(/\D/g,''))||0),...Object.keys(CASE_DETAILS).map(id=>Number(String(id).replace(/\D/g,''))||0)];
                caseId=`CASE-${Math.max(...numbers)+1}`;
            }
            let createdCase={...source,id:caseId,status:'Pending',outstandingFields:fields.map(item=>({field:item.field,label:item.label})),createdWithMissingInformation:true};
            CASE_DETAILS[caseId]=createdCase;
            CASES.push([caseId,createdCase.customer,createdCase.caseClass,createdCase.departments,createdCase.priority,createdCase.due,'Pending']);
            let sourceTasks=TASKS.filter(task=>task[1]===sourceId),createdTasks=[];
            sourceTasks.forEach(task=>{
                let createdTask=caseAlreadyExists?[...task]:task;
                if(caseAlreadyExists){createdTask[1]=caseId;createdTask[8]=nextTaskNumber();TASKS.push(createdTask)}
                if(createdTask[4]==='Unassigned'){
                    let owner=taskOwnerFor(createdTask[9]);
                    if(owner){createdTask[3]=owner.department;createdTask[4]=owner.name}
                }
                TASK_ASSIGNMENTS[createdTask[8]]={assignedTo:createdTask[4],assignedBy:'Automatic routing · User Master',assignedAt:at,classification:createdTask[9]};
                createdTasks.push(createdTask[8]);
            });
            record.status='Case Created · Missing Information';
            record.history.unshift({type:'Case created',recipient:caseId,message:`Created with ${fields.length} outstanding ${fields.length===1?'field':'fields'}: ${fields.map(item=>item.label).join(', ')}`,by,at});
            let queueIndex=QUEUE.findIndex(item=>item[0]===emailId);if(queueIndex>=0)QUEUE.splice(queueIndex,1);
            if(!APPROVED_REQUESTS.some(item=>item.reference===emailId))APPROVED_REQUESTS.unshift({reference:emailId,subject:queueItem?.[2]||createdCase.subject,customer:createdCase.customer,caseId,classification:createdCase.classification||'General coordination',approvedBy:by,approvedAt:at});
            S.activities.unshift([`${caseId} created with missing information · ${fields.map(item=>item.label).join(', ')}${createdTasks.length?` · ${createdTasks.length} Tasks created`:''}`,by,at]);
            S.selectedCase=caseId;S.reviewEmailId=null;S.queueTab='Approved Requests';S.page='review';render();toast(`${caseId} created · Cases now ${CASES.length} · ${fields.length} missing ${fields.length===1?'field':'fields'} highlighted`)
        };
        const incompleteCaseOverviewBase=caseOverviewV2;caseOverviewV2=function(){let c=selectedCaseData(),html=incompleteCaseOverviewBase(),fields=outstandingCaseFields(c);if(!fields.length)return html;let template=document.createElement('template');template.innerHTML=html;let mappings={customer:'Customer',classification:'Category',caseClass:'Case Type',departments:'Departments',pickup:'Pickup',delivery:'Drop',requestedDate:'Requested Delivery',weight:'Weight',goods:'Goods'};template.content.querySelectorAll('.case-kv').forEach(row=>{let label=row.querySelector('label')?.textContent.trim(),field=fields.find(item=>mappings[item.field]===label);if(!field)return;row.classList.add('case-field-missing');let value=row.querySelector('strong');if(value)value.innerHTML='<span>Missing · required</span>'});return outstandingCaseNotice(c)+template.innerHTML};
        const incompleteOrderTabBase=orderTabV2;orderTabV2=function(){let c=selectedCaseData(),html=incompleteOrderTabBase(),fields=outstandingCaseFields(c);if(!fields.length)return html;let template=document.createElement('template');template.innerHTML=html,locations=0,contacts=0;template.content.querySelectorAll('.order-line').forEach(row=>{let label=row.querySelector(':scope > span')?.textContent.trim(),key='';if(label==='Location')key=(locations++===0?'pickup':'delivery');else if(label==='Contact')key=(contacts++===0?'pickupContact':'deliveryContact');else if(label==='Pickup Date / Time')key='pickupDateTime';else if(label==='Delivery Date / Time')key='deliveryDateTime';if(!fields.some(item=>item.field===key))return;row.classList.add('order-field-missing');let value=row.querySelector('strong');if(value)value.textContent='Missing · required'});template.content.querySelectorAll('.order-metric').forEach(row=>{let label=row.querySelector('span')?.textContent.trim(),missing=label==='Number of Packages'?fields.some(item=>item.field==='packages'):['Length','Width','Height','Total Volume'].includes(label)&&fields.some(item=>item.field==='dimensions');if(!missing)return;row.classList.add('order-field-missing');let value=row.querySelector('strong');if(value)value.textContent='Missing · required'});let banner=template.content.querySelector('.order-banner');if(banner)banner.insertAdjacentHTML('afterend',outstandingCaseNotice(c));else template.content.insertAdjacentHTML('afterbegin',outstandingCaseNotice(c));return template.innerHTML};
        const incompleteCaseHeaderBase=caseView;caseView=function(){let c=selectedCaseData(),html=incompleteCaseHeaderBase(),fields=outstandingCaseFields(c);if(!fields.length)return html;let template=document.createElement('template');template.innerHTML=html,title=template.content.querySelector('.case-v2-title'),close=title?.querySelector('.case-close-button');if(title&&!title.querySelector('.case-missing-state')){let badge=document.createElement('span');badge.className='case-missing-state';badge.textContent=`Missing Information (${fields.length})`;badge.title=fields.map(item=>item.label).join(', ');title.insertBefore(badge,close||null)}return template.innerHTML};
        document.head.insertAdjacentHTML('beforeend',`<style>
            .case-missing-state{display:inline-flex;align-items:center;min-height:30px;padding:5px 9px;border:1px solid #efb6bc;border-radius:5px;background:#fff0f2;color:#b42332;font-size:12px;font-weight:800;white-space:nowrap}
            .case-missing-notice{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:14px;padding:13px 16px;border:1px solid #efb6bc;border-left:4px solid #cc2637;border-radius:7px;background:#fff5f6;color:#8e1c28}
            .case-missing-notice>div:first-child{display:grid;gap:3px}.case-missing-notice span{font-size:12px}.case-missing-chips{display:flex;justify-content:flex-end;gap:6px;flex-wrap:wrap}.case-missing-chips span{padding:5px 8px;border:1px solid #efb6bc;border-radius:999px;background:#fff;color:#b42332;font-weight:800}
            .case-field-missing,.order-field-missing{margin:2px 0;padding:8px!important;border:1px solid #efb6bc!important;border-radius:5px;background:#fff0f2!important}.case-field-missing label,.case-field-missing strong,.order-field-missing>span,.order-field-missing>strong{color:#b42332!important}
            @media(max-width:760px){.case-missing-notice{align-items:flex-start;flex-direction:column}.case-missing-chips{justify-content:flex-start}}
        </style>`);
        document.head.insertAdjacentHTML('beforeend',`<style>
            /* Request Volume: reserve independent space for legend, values, bars and axis labels. */
            .reviewer-chart-card{min-height:300px;overflow:hidden}
            .reviewer-chart-card .reviewer-chart-head{display:flex;align-items:center;min-height:78px;height:auto;padding:12px 20px;box-sizing:border-box;gap:18px;overflow:hidden}
            .reviewer-chart-card .reviewer-chart-head>div:first-child{min-width:0;flex:1}
            .reviewer-chart-card .period-toggle{position:static;align-self:center;flex:0 0 auto;max-width:100%;height:40px;margin:0;box-sizing:border-box}
            .reviewer-chart-card .period-toggle button{display:flex;align-items:center;justify-content:center;height:38px;padding:0 16px;line-height:1;box-sizing:border-box;white-space:nowrap}
            .reviewer-chart-card .volume-legend{min-height:36px;padding:12px 24px 6px;align-items:center}
            .reviewer-chart-card .volume-chart{display:grid;grid-template-columns:repeat(var(--volume-count),minmax(132px,1fr));align-items:end;justify-content:stretch;column-gap:24px;box-sizing:border-box;width:100%;height:222px;padding:30px 32px 24px;border-bottom:0;overflow-x:auto;overflow-y:hidden;overscroll-behavior-inline:contain;scrollbar-gutter:stable}
            .reviewer-chart-card .volume-group{display:grid;grid-template-rows:140px 24px;align-items:end;justify-items:center;height:164px;min-width:0;gap:8px}
            .reviewer-chart-card .volume-bars{align-self:end;height:132px}
            .reviewer-chart-card .volume-bar b{top:-21px;line-height:16px}
            .reviewer-chart-card .volume-group small{display:block;max-width:100%;line-height:18px;text-align:center;overflow:hidden;text-overflow:ellipsis}
            @media(max-width:760px){.reviewer-chart-card .reviewer-chart-head{align-items:stretch;flex-direction:column;gap:10px}.reviewer-chart-card .period-toggle{align-self:flex-start}.reviewer-chart-card .volume-chart{grid-template-columns:repeat(var(--volume-count),minmax(104px,1fr));column-gap:14px;padding-inline:20px}}
        </style>`);
        /* Reviewer decision canvas: email context, decision data, then read-only proposed work. */
        function decisionTaskDescription(task){
            let type=String(task?.[9]||'task').toLowerCase();
            if(type.includes('packing'))return 'Prepare and verify the packing requirements captured from the customer request.';
            if(type.includes('custom')||type.includes('export'))return 'Validate the required shipment documents and regulatory information.';
            if(type.includes('pickup'))return 'Confirm the collection plan, contact details and operational timing.';
            if(type.includes('transport')||type.includes('delivery'))return 'Plan and coordinate the transport using the approved order information.';
            return 'Complete the proposed operational work using the approved case information.';
        }
        function groupDecisionOrderFields(panel){
            let container=panel?.querySelector('.review-order-fields');
            if(!container||container.classList.contains('decision-order-groups'))return;
            let rows=[...container.querySelectorAll('.review-order-field')],byLabel=new Map(rows.map(row=>[row.querySelector('span')?.textContent.trim(),row]));
            let groups=[
                ['Route & Schedule',['Pickup location','Delivery location','Pickup date/time','Delivery date/time']],
                ['Contacts',['Pickup contact','Delivery contact']],
                ['Cargo',['Goods','Packages','Total weight']],
                ['Handling Requirements',['Dimensions','Service requirement','Special handling']]
            ];
            container.classList.add('decision-order-groups');container.replaceChildren();
            groups.forEach(([title,labels])=>{
                let card=document.createElement('section');card.className='decision-data-group';
                card.innerHTML=`<h3>${title}</h3><div class="decision-data-rows"></div>`;
                let body=card.querySelector('.decision-data-rows');labels.forEach(label=>{let row=byLabel.get(label);if(row)body.append(row)});
                if(body.children.length)container.append(card);
            });
        }
        function makeDecisionTaskPreview(task,index){
            let article=document.createElement('article');article.className='decision-task-card';
            let ownership=task[4]==='Unassigned'?'Department queue':'Owner matched',owner=task[4]==='Unassigned'?`${task[3]} queue`:task[4];
            article.innerHTML=`<div class="decision-task-top"><span class="decision-task-number">Task ${index+1}</span><span class="decision-owner-state">${ownership}</span></div><h3>${editorText(task[0])}</h3><p class="decision-task-description">${decisionTaskDescription(task)}</p><dl><div><dt>Department</dt><dd>${editorText(task[3])}</dd></div><div><dt>Suggested owner</dt><dd>${editorText(owner)}</dd></div><div><dt>Priority</dt><dd>${editorText(task[5])}</dd></div><div><dt>Due</dt><dd>${editorText(task[6])}</dd></div></dl><details><summary>View details</summary><div class="decision-task-more"><span>Category</span><strong>${editorText(task[9]||'No category')}</strong><span>Dependency</span><strong>None proposed</strong></div></details>`;
            return article;
        }
        const decisionCanvasApprovalBase=approval;approval=function(){
            let html=decisionCanvasApprovalBase();if(!isReviewerProfile())return html;
            let template=document.createElement('template');template.innerHTML=html;
            let grid=template.content.querySelector('.review-grid');if(!grid)return html;
            let original=[...grid.querySelectorAll(':scope > .panel')].find(panel=>panel.querySelector('.panel-title h2')?.textContent.trim()==='Original Email')||grid.querySelector(':scope > .panel');
            let interpretation=[...grid.querySelectorAll('.panel')].find(panel=>panel.querySelector('.panel-title h2')?.textContent.trim()==='AI Interpretation');
            let extracted=[...grid.querySelectorAll('.panel')].find(panel=>panel.querySelector('.panel-title h2')?.textContent.trim()==='Extracted Order Information');
            let routing=[...grid.querySelectorAll('.panel')].find(panel=>panel.querySelector('.panel-title h2')?.textContent.includes('Automatic Task Routing'));
            if(!original||!interpretation||!extracted||!routing)return html;
            let center=document.createElement('div');center.className='decision-center-column';
            let readiness=grid.querySelector('.review-readiness'),extractedTitle=extracted.querySelector('.panel-title'),readinessText=readiness?.textContent.trim();
            if(readiness&&extractedTitle){let indicator=document.createElement('span');indicator.className=`extracted-readiness-info ${readiness.classList.contains('incomplete')?'incomplete':'complete'}`;indicator.tabIndex=0;indicator.setAttribute('aria-label',readinessText||'Required field availability');indicator.innerHTML=`i<span class="extracted-readiness-tooltip">${editorText(readinessText||'Required field availability')}</span>`;extractedTitle.querySelector('h2')?.after(indicator);readiness.remove()}
            center.append(interpretation);center.append(extracted);
            if(!extracted.querySelector('.review-inline-grid'))groupDecisionOrderFields(extracted);
            routing.classList.add('decision-task-rail');
            let title=routing.querySelector('.panel-title'),tasks=TASKS.filter(task=>task[1]===selectedCaseData().id);
            if(title){let heading=title.querySelector('h2');if(heading)heading.textContent=`Proposed Tasks (${tasks.length})`;title.querySelectorAll('button,.routing-info').forEach(node=>node.remove());let add=document.createElement('button');add.className='btn decision-add-task';add.textContent='+ Add Task';add.setAttribute('onclick',`openEditor('newTask','${selectedCaseData().id}')`);title.append(add)}
            let body=routing.querySelector('.editfield');if(body){body.className='decision-task-body';body.replaceChildren();let scroll=document.createElement('div');scroll.className=`decision-task-list${tasks.length>2?' scroll-enabled':''}`;tasks.forEach((task,index)=>scroll.append(makeDecisionTaskPreview(task,index)));body.append(scroll);let note=document.createElement('p');note.className='decision-task-note';note.textContent='Proposed Tasks are read-only here. They can be edited after the Case is created.';body.append(note)}
            grid.classList.add('decision-canvas');grid.replaceChildren(original,center,routing);
            return template.innerHTML;
        };
        document.head.insertAdjacentHTML('beforeend',`<style>
            .review-grid.decision-canvas{display:grid;grid-template-columns:minmax(280px,28fr) minmax(520px,48fr) minmax(280px,24fr);gap:14px;align-items:start}
            .decision-canvas>.panel,.decision-center-column>.panel{min-width:0;height:auto}.decision-center-column{display:grid;gap:14px;min-width:0;align-content:start}
            .decision-center-column>.extracted-order-panel .review-readiness{display:none}
            .decision-center-column>.panel:first-child .fieldlist{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:0;padding:0 14px 12px}
            .decision-center-column>.panel:first-child .rowfield{display:block;min-width:0;padding:10px 8px;border-bottom:0;border-right:1px solid var(--line)}
            .decision-center-column>.panel:first-child .rowfield:last-child{border-right:0}.decision-center-column>.panel:first-child .rowfield label{display:block;margin-bottom:5px;font-size:11px}.decision-center-column>.panel:first-child .rowfield strong{display:block;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
            .decision-order-groups{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:12px 14px 14px}
            .decision-data-group{min-width:0;border:1px solid var(--line);border-radius:7px;background:#fff;overflow:hidden}.decision-data-group h3{margin:0;padding:9px 11px;border-bottom:1px solid var(--line);background:#f7f9fc;font-size:12px;color:var(--ink)}
            .decision-data-group .review-order-field{grid-template-columns:minmax(105px,.9fr) minmax(0,1.15fr);gap:8px;padding:8px 10px;font-size:12px}.decision-data-group .review-order-field span{font-size:11px}.decision-data-group .review-order-field strong{font-size:12px}
            .extracted-order-panel>.panel-title{justify-content:flex-start}.extracted-order-panel>.panel-title>button{margin-left:auto}.extracted-readiness-info{position:relative;display:inline-grid;place-items:center;flex:0 0 18px;width:18px;height:18px;margin-left:7px;border:1px solid #72bd8e;border-radius:50%;background:#eef9f2;color:#087a42;font-size:11px;font-weight:900;cursor:help}.extracted-readiness-info.incomplete{border-color:#dda83c;background:#fff7e4;color:#8a5a00}.extracted-readiness-tooltip{position:absolute;left:50%;top:26px;z-index:220;display:none;width:max-content;max-width:280px;padding:8px 10px;border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--ink);box-shadow:0 8px 22px rgba(10,40,65,.18);font-size:11px;font-weight:700;line-height:1.4;transform:translateX(-50%)}.extracted-readiness-info:hover .extracted-readiness-tooltip,.extracted-readiness-info:focus .extracted-readiness-tooltip{display:block}
            .decision-task-rail{position:sticky;top:86px;display:flex;flex-direction:column;max-height:calc(100vh - 104px);overflow:hidden}.decision-task-list{display:flex;flex-direction:column;gap:9px;min-height:0;padding:11px;overflow-y:auto;overscroll-behavior:contain}
            .decision-task-card{padding:11px;border:1px solid var(--line);border-left:3px solid var(--blue);border-radius:7px;background:#fff}.decision-task-top{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:7px}.decision-task-number{color:var(--muted);font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.04em}.decision-owner-state{padding:3px 6px;border-radius:999px;background:#eaf3ff;color:#0568ac;font-size:9px;font-weight:800;white-space:nowrap}.decision-task-card h3{margin:0 0 6px;font-size:13px;line-height:1.35}.decision-task-description{margin:0 0 9px;color:var(--muted);font-size:11px;line-height:1.45}.decision-task-card dl{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin:0}.decision-task-card dl div{min-width:0}.decision-task-card dt{color:var(--muted);font-size:9px}.decision-task-card dd{margin:2px 0 0;font-size:10px;font-weight:700;overflow-wrap:anywhere}.decision-task-card details{margin-top:9px;padding-top:8px;border-top:1px solid var(--line)}.decision-task-card summary{color:var(--blue);font-size:10px;font-weight:800;cursor:pointer}.decision-task-more{display:grid;grid-template-columns:1fr 1.3fr;gap:5px;margin-top:7px;font-size:10px}.decision-task-more span{color:var(--muted)}.decision-add-task{align-self:flex-start;min-height:34px;padding:7px 11px}.decision-task-note{margin:0;color:var(--muted);font-size:10px;line-height:1.4}
            .decision-center-column .review-inline-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 12px;padding:12px 14px}.decision-center-column .review-inline-field{display:block;min-width:0;padding:0;border:0}.decision-center-column .review-inline-field>span{display:block;margin-bottom:5px;font-size:11px}.decision-center-column .review-inline-wide{grid-column:span 2}.decision-center-column .master-multi-dropdown{position:relative}.decision-center-column .master-multi-summary{box-sizing:border-box;height:38px;min-height:38px!important;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.decision-center-column .master-multi-menu{position:absolute!important;left:0;right:0;top:calc(100% + 5px);z-index:500;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));max-height:220px;overflow-y:auto;background:#fff;box-shadow:0 10px 28px rgba(10,40,65,.2)}
            @media(max-width:1250px){.review-grid.decision-canvas{grid-template-columns:minmax(260px,32fr) minmax(480px,68fr)}.decision-task-rail{position:static;grid-column:1/-1;max-height:none}.decision-task-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));overflow:visible}.decision-add-task,.decision-task-note{grid-column:1/-1}}
            @media(max-width:840px){.review-grid.decision-canvas{grid-template-columns:1fr}.decision-order-groups,.decision-task-list{grid-template-columns:1fr}.decision-center-column>.panel:first-child .fieldlist{grid-template-columns:repeat(2,minmax(0,1fr))}.decision-center-column>.panel:first-child .rowfield{border-right:0;border-bottom:1px solid var(--line)}}
        </style>`);
        document.head.insertAdjacentHTML('beforeend',`<style>
            /* Keep every decision-canvas section content-sized; legacy review rules used equal-height panels. */
            .review-grid.decision-canvas{grid-auto-rows:auto!important;align-content:start!important;align-items:start!important}
            .review-grid.decision-canvas>.panel,
            .review-grid.decision-canvas>.decision-center-column,
            .decision-center-column>.panel{height:auto!important;min-height:0!important;align-self:start!important}
            .decision-center-column{display:flex!important;flex-direction:column;justify-content:flex-start;align-items:stretch;gap:12px;height:auto!important}
            .decision-center-column>.panel{width:100%;box-sizing:border-box;flex:0 0 auto}
            .decision-center-column>.panel:first-child .fieldlist{align-items:start}
            .decision-canvas>.panel:first-child{height:auto!important;max-height:calc(100vh - 126px);overflow:auto;overscroll-behavior:contain}
            .decision-task-rail{height:auto!important;align-self:start!important}
            .review-grid.decision-canvas,.decision-center-column{overflow:visible!important}.decision-center-column>.inline-edit-panel{position:relative;z-index:400!important;overflow:visible!important}.decision-center-column>.inline-edit-panel .review-inline-grid,.decision-center-column>.inline-edit-panel .review-inline-field{overflow:visible!important}.decision-center-column>.extracted-order-panel{position:relative;z-index:1}
            @media(max-width:1250px){.decision-canvas>.panel:first-child{max-height:none;overflow:visible}}
            @media(max-width:980px){.decision-center-column .review-inline-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.decision-center-column .review-inline-wide{grid-column:1/-1}}
            /* Fixed task-rail controls with a card-only scroll region. */
            .decision-task-rail>.panel-title{display:flex;align-items:center;gap:8px;padding-right:10px}
            .decision-task-rail>.panel-title h2{min-width:0;flex:1 1 auto;margin:0;font-size:16px;line-height:1.25;white-space:nowrap}
            .decision-task-rail>.panel-title .decision-add-task{margin-left:auto;flex:0 0 auto;min-height:30px!important;padding:5px 9px!important;font-size:11px!important;line-height:1.15;white-space:nowrap;border-radius:5px}
            .decision-task-body{display:flex;min-height:0;flex-direction:column}
            .decision-task-body>.decision-task-list{overflow:visible}
            .decision-task-body>.decision-task-list.scroll-enabled{height:min(620px,calc(100vh - 260px));min-height:420px;overflow-y:scroll;overscroll-behavior:contain;scrollbar-gutter:stable}
            .decision-task-body>.decision-task-note{flex:0 0 auto;padding:0 11px 11px}
            /* Keep inline-edit actions visually separate from the section heading. */
            .decision-center-column .panel-title:has(.review-inline-actions){display:flex;align-items:center;gap:16px}
            .decision-center-column .panel-title:has(.review-inline-actions)>h2{min-width:0}
            .decision-center-column .panel-title .review-inline-actions{margin-left:auto;flex:0 0 auto;padding-left:20px}
            @media(max-width:1250px){.decision-task-body>.decision-task-list.scroll-enabled{height:560px;min-height:0;overflow-y:scroll}}
        </style>`);
        /* Keep the Proposed Tasks action inside its header at every viewport/zoom level. */
        document.head.insertAdjacentHTML('beforeend',`<style>
            .decision-task-rail>.panel-title{box-sizing:border-box!important;display:flex!important;align-items:center!important;min-height:56px!important;height:auto!important;padding:10px 12px!important;gap:10px!important;overflow:hidden!important}
            .decision-task-rail>.panel-title>h2{min-width:0!important;flex:1 1 auto!important;margin:0!important;font-size:16px!important;line-height:1.25!important;white-space:normal!important}
            .decision-task-rail>.panel-title>.decision-add-task{position:static!important;inset:auto!important;transform:none!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 auto!important;width:auto!important;max-width:112px!important;height:30px!important;min-height:30px!important;margin:0 0 0 auto!important;padding:0 9px!important;font-size:11px!important;line-height:1!important;white-space:nowrap!important;box-sizing:border-box!important}
            @media(max-width:420px){.decision-task-rail>.panel-title{align-items:flex-start!important;flex-direction:column!important}.decision-task-rail>.panel-title>.decision-add-task{margin-left:0!important}}
            .order-other-details{grid-column:1/-1}.order-other-details>.order-card-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.order-other-add{display:grid;place-items:center;width:30px;height:30px;padding:0;border:1px solid #9fc3df;border-radius:6px;background:#fff;color:var(--blue);font-size:21px;font-weight:700;line-height:1;cursor:pointer}.order-other-add:hover,.order-other-add:focus-visible{background:#eaf4fb;border-color:var(--blue);outline:0}.order-other-details-content{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:16px;align-items:start;padding:2px 0}.order-other-details-content p{margin:0;white-space:pre-wrap;line-height:1.55}.order-other-inline-editor{grid-column:1/-1;display:grid;gap:10px;margin-top:12px;padding-top:14px;border-top:1px solid var(--line)}.order-other-inline-editor label{display:grid;gap:6px;color:var(--ink);font-weight:700}.order-other-inline-editor textarea{box-sizing:border-box;width:100%;min-height:82px;padding:10px 12px;border:1px solid #9fc3df;border-radius:6px;font:inherit;line-height:1.45;resize:vertical}.order-other-inline-editor textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(14,122,201,.12);outline:0}.order-other-inline-editor .actions{margin:0;justify-content:flex-end}.order-other-inline-editor .btn{min-height:34px;padding:7px 13px}.order-other-editor{display:grid;gap:7px;margin-top:16px}.order-other-editor textarea{box-sizing:border-box;width:100%;min-height:104px;padding:10px 12px;border:1px solid var(--line);border-radius:5px;font:inherit;line-height:1.45;resize:vertical}
        </style>`);
        /* Optional catch-all Order information that does not fit a structured field. */
        function defaultOrderOtherDetails(c){
            const details={
                'CASE-401100':'Driver must call the pickup contact 30 minutes before arrival. Customer requests photo confirmation after loading.',
                'CASE-401097':'Inspection tools must remain in their protective transport frames. Site access details will be confirmed separately.',
                'CASE-401087':'Protect all exposed steel surfaces from moisture during transit. Delivery sequence will be confirmed by the receiver.'
            };
            return details[c?.id]||'No additional details found outside the predefined Order fields.';
        }
        function updateOrderOtherDetails(value){S.editorData.otherDetails=value;S.editorDirty=true}
        function beginOrderOtherDetail(){S.orderOtherEditing=true;S.orderOtherDraft='';render();setTimeout(()=>document.querySelector('#order-other-detail-input')?.focus(),0)}
        function updateOrderOtherDraft(value){S.orderOtherDraft=value}
        function cancelOrderOtherDetail(){S.orderOtherEditing=false;S.orderOtherDraft='';render()}
        function addOrderOtherDetail(){
            let value=String(S.orderOtherDraft||'').trim();if(!value)return toast('Enter the additional Order detail first');
            let c=selectedCaseData(),existing=S.orderEdits[c.id]||{},current=String(existing.otherDetails??defaultOrderOtherDetails(c)).trim();
            if(current==='No additional details found outside the predefined Order fields.')current='';
            let next=[current,value].filter(Boolean).join('\n');
            S.orderEdits[c.id]={...existing,otherDetails:next};S.orderOtherEditing=false;S.orderOtherDraft='';
            S.activities.unshift([`${c.id} Other Details updated`,actorName(),'16/10/2026, 10:00']);render();toast('Other detail added');
        }
        const otherDetailsOrderTabBase=orderTabV2;orderTabV2=function(){
            let html=otherDetailsOrderTabBase(),template=document.createElement('template');template.innerHTML=html;
            let grid=template.content.querySelector('.order-grid'),c=selectedCaseData();
            template.content.querySelectorAll('.order-banner button').forEach(button=>{if(/^Create (?:Freight )?Order$/i.test(button.textContent.trim()))button.remove()});
            if(grid&&!grid.querySelector('.order-other-details')){
                let section=document.createElement('section');section.className='order-card full order-other-details';
                let value=S.orderEdits[c.id]?.otherDetails??defaultOrderOtherDetails(c);
                let inline=S.orderOtherEditing?`<div class="order-other-inline-editor"><label>Additional detail<textarea id="order-other-detail-input" oninput="updateOrderOtherDraft(this.value)" placeholder="Enter a detail found in the email or attachments that is not a predefined Order field">${editorText(S.orderOtherDraft||'')}</textarea></label><div class="actions"><button class="btn" type="button" onclick="cancelOrderOtherDetail()">Cancel</button><button class="btn primary" type="button" onclick="addOrderOtherDetail()">Add detail</button></div></div>`:'';
                section.innerHTML=`<div class="order-card-head"><h3>8. Additional Details Found</h3><button class="order-other-add" type="button" title="Add additional detail" aria-label="Add additional detail" onclick="beginOrderOtherDetail()">+</button></div><div class="order-card-body"><div class="sub" data-aa-style="aa-static-style-66">Details found in the email and attachments that are not predefined Order fields.</div><div class="order-other-details-content"><p>${editorText(value)}</p>${confidenceBadge(86)}${inline}</div></div>`;
                grid.append(section);
            }
            return template.innerHTML;
        };
        openOrderEditor=function(){
            let fields=[...document.querySelectorAll('.order-line,.order-metric')].map((row,index)=>({index,label:row.querySelector('span')?.textContent?.trim()||`Field ${index+1}`,value:row.querySelector('strong')?.textContent?.trim()||''})),items=[...document.querySelectorAll('.compact-order-table tbody tr')].map(row=>[...row.cells].slice(0,7).map(cell=>cell.textContent.trim())),c=selectedCaseData(),existing=S.orderEdits[S.selectedCase];
            S.editorType='orderEditor';S.editorData={caseId:S.selectedCase,fields,items,otherDetails:existing?.otherDetails??defaultOrderOtherDetails(c)};S.editorDirty=false;render();
        };
        saveOrderEditor=function(){
            S.orderEdits[S.editorData.caseId]={fields:S.editorData.fields.map(x=>({...x})),items:S.editorData.items.map(x=>[...x]),otherDetails:String(S.editorData.otherDetails||'').trim()};
            S.activities.unshift([`${S.editorData.caseId} Order fields and Other Details updated`,actorName(),'14/10/2026, 10:00']);S.editorType=null;S.editorData={};S.editorDirty=false;render();toast('Order fields updated');
        };
        const otherDetailsEditorDialogBase=editorDialog;editorDialog=function(){
            let html=otherDetailsEditorDialogBase();if(S.editorType!=='orderEditor')return html;
            let template=document.createElement('template');template.innerHTML=html;let body=template.content.querySelector('.order-editor-modal .body')||template.content.querySelector('.assign-modal .body');
            if(body&&!body.querySelector('.order-other-editor'))body.insertAdjacentHTML('beforeend',`<label class="order-other-editor"><strong>Additional Details Found</strong><span class="sub">Additional customer information that does not map to a structured Order field.</span><textarea oninput="updateOrderOtherDetails(this.value)">${editorText(S.editorData.otherDetails||'')}</textarea></label>`);
            return template.innerHTML;
        };
        /* Add Proposed Task uses a focused right-side workspace instead of a modal. */
        function toggleProposedTaskDependency(taskId,checked){
            let selected=new Set(S.editorData.dependencies||[]);
            checked?selected.add(taskId):selected.delete(taskId);
            S.editorData.dependencies=[...selected];S.editorDirty=true;
        }
        const proposedTaskDrawerDialogBase=editorDialog;editorDialog=function(){
            if(S.editorType!=='newTask')return proposedTaskDrawerDialogBase();
            let d=S.editorData||{},caseId=d.caseId||S.selectedCase,c=CASES.find(item=>item[0]===caseId),classes=Object.keys(TASK_ROUTING),people=USERS.filter(user=>user.role!=='Admin'),tasks=TASKS.filter(task=>task[1]===caseId),selected=new Set(d.dependencies||[]),classification=d.taskType||classes[0]||'Other',suggested=routedOwner(classification),suggestedName=suggested?.name||'Department queue',suggestedDepartment=suggested?.department||'Other';
            return `<div class="proposed-task-drawer-shade" onclick="closeEditor()"></div><aside class="proposed-task-drawer" role="dialog" aria-modal="true" aria-labelledby="proposed-task-drawer-title"><div class="proposed-task-drawer-head"><div data-aa-style="aa-static-style-67"><span class="proposed-task-eyebrow">New Task</span><button type="button" class="proposed-task-case-link" onclick="closeEditor();openCase('${caseId}')">Case ${editorText(caseId)} ↗</button><h2 id="proposed-task-drawer-title">${editorText(d.customer||c?.[1]||'')}</h2><p>${editorText(caseId)} · <span class="ptf-req">*</span> required, rest optional</p></div><button type="button" class="proposed-task-close" aria-label="Close Add Task" onclick="closeEditor()">✕</button></div><div class="proposed-task-drawer-body"><div class="ptf-grid"><label class="ptf-wide"><span>Task name <span class="ptf-req">*</span></span><input value="${editorText(d.title||'')}" oninput="editField('title',this.value)" placeholder="Enter a clear Task name" autofocus></label><label class="ptf-wide"><span>Description <span class="ptf-req">*</span></span><textarea oninput="editField('description',this.value)" placeholder="Describe what needs to be done and the expected outcome">${editorText(d.description||'')}</textarea></label><label><span>Assign to <span class="ptf-opt">(optional)</span></span><select onchange="editField('assignee',this.value)"><option ${d.assignee==='Automatic routing'?'selected':''}>Automatic routing</option><option ${d.assignee==='Unassigned'?'selected':''}>Unassigned</option>${people.map(user=>`<option value="${editorText(user.name)}" ${d.assignee===user.name?'selected':''}>${editorText(user.name)} · ${editorText(user.department)}</option>`).join('')}</select></label><label><span>Priority <span class="ptf-opt">(optional)</span></span><select onchange="editField('priority',this.value)">${['Urgent', 'High', 'Medium', 'Low'].map(value=>`<option ${d.priority===value?'selected':''}>${value}</option>`).join('')}</select></label><label><span>Due date <span class="ptf-req">*</span></span><input type="date" value="${editorText(d.due||'')}" onchange="editField('due',this.value)"></label></div><div class="ptf-routing-note">${d.assignee==='Automatic routing'?`<strong>Suggested: ${editorText(suggestedName)}</strong> — Routed automatically through the User Master to ${editorText(suggestedDepartment)}.`:d.assignee==='Unassigned'?'<strong>Task will remain unassigned.</strong>':`<strong>Assign directly to ${editorText(d.assignee||'')}</strong> — this selection applies only to this Task.`}</div><div class="ptf-section-title">Dependencies</div><p class="ptf-section-sub">Work may proceed in parallel, but this Task cannot be completed until all selected Tasks are completed.</p>${tasks.length?`<div class="proposed-dependency-list">${tasks.map(task=>`<label class="proposed-dependency-option"><input type="checkbox" ${selected.has(task[8])?'checked':''} onchange="toggleProposedTaskDependency('${task[8]}',this.checked)"><span><strong>${task[8]} · ${editorText(task[0])}</strong><small>${editorText(task[3])} · ${editorText(effectiveTaskStatus(task))}</small></span></label>`).join('')}</div>`:'<div class="proposed-task-empty">No existing Tasks are available as dependencies.</div>'}</div><div class="proposed-task-drawer-foot"><button class="btn" type="button" onclick="closeEditor()">Cancel</button><button class="btn primary" type="button" onclick="saveEditor()">Add Task</button></div></aside>`;
        };
        document.head.insertAdjacentHTML('beforeend',`<style>
            .proposed-task-drawer-shade{position:fixed;inset:0;z-index:1700;background:rgba(5,24,42,.25)}
            .proposed-task-drawer{position:fixed;z-index:1701;top:0;right:0;bottom:0;width:520px;max-width:100vw;background:#fff;box-shadow:-8px 0 25px rgba(5,24,42,.18);display:flex;flex-direction:column;color:var(--ink)}
            .proposed-task-drawer-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:16px 20px;border-bottom:1px solid #dce4ec;flex:none}
            .proposed-task-eyebrow{display:inline-block;color:#0871c7;font-weight:750;font-size:13px}
            .proposed-task-case-link{all:unset;cursor:pointer;margin-left:10px;color:#0871c7;font-size:12px;font-weight:650}
            .proposed-task-drawer-head h2{margin:4px 0 0;font-size:17px;line-height:1.3;color:var(--ink)}
            .proposed-task-drawer-head p{margin:4px 0 0;color:var(--muted);font-size:12px}
            .proposed-task-close{all:unset;cursor:pointer;font-size:18px;padding:2px 4px;color:var(--ink);flex:none}
            .proposed-task-drawer-body{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:16px 20px}
            .ptf-req{color:#c51f2d;font-weight:800}.ptf-opt{color:var(--muted);font-weight:500;text-transform:none;letter-spacing:0}
            .ptf-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 16px;margin-bottom:14px}.ptf-grid label{display:flex;flex-direction:column;gap:5px;color:#3b4a5f;font-size:12px;font-weight:650}.ptf-grid input,.ptf-grid select,.ptf-grid textarea{box-sizing:border-box;width:100%;min-width:0;border:1px solid #c9d5e1;border-radius:4px;background:#f4f8fc;padding:8px 9px;color:var(--ink);font:500 12.5px Inter,sans-serif}.ptf-grid input,.ptf-grid select{height:38px}.ptf-grid textarea{min-height:84px;line-height:1.45;resize:vertical}.ptf-grid input:focus,.ptf-grid select:focus,.ptf-grid textarea:focus{outline:2px solid rgba(8,119,209,.16);border-color:var(--blue)}.ptf-wide{grid-column:1/-1}
            .ptf-routing-note{margin:0 0 16px;padding:9px 11px;border-radius:5px;background:#f4f8fc;border:1px solid #dce4ec;font-size:12px;color:#425169;line-height:1.45}
            .ptf-section-title{font-size:13px;font-weight:700;color:var(--ink);margin:16px 0 4px;padding-top:14px;border-top:1px solid #eef2f6}
            .ptf-section-sub{margin:0 0 10px;color:var(--muted);font-size:11px;line-height:1.4}
            .proposed-dependency-list{display:grid;gap:7px;max-height:200px;overflow-y:auto;overscroll-behavior:contain;padding-right:3px}.proposed-dependency-option{display:flex;align-items:flex-start;gap:9px;padding:9px 10px;border:1px solid #dce4ec;border-radius:5px;background:#fff;cursor:pointer}.proposed-dependency-option:hover{border-color:#9fc3df;background:#f7fafd}.proposed-dependency-option input{margin-top:2px;width:16px;height:16px;accent-color:var(--blue)}.proposed-dependency-option span{min-width:0}.proposed-dependency-option strong{display:block;font-size:12px;line-height:1.35}.proposed-dependency-option small{display:block;margin-top:3px;color:var(--muted);font-size:10px}.proposed-task-empty{padding:14px;border:1px dashed #c8d6e1;border-radius:6px;color:var(--muted);font-size:12px;text-align:center}
            .proposed-task-drawer-foot{display:flex;align-items:center;justify-content:flex-end;gap:9px;padding:14px 20px;border-top:1px solid #dce4ec;background:#fff;flex:none}
            @media(max-width:620px){.proposed-task-drawer{width:100vw}.ptf-grid{grid-template-columns:1fr}.ptf-wide{grid-column:auto}}
        </style>`);
        /* Recompose every Task drawer into the same workspace language as Add Proposed Task.
           Existing controls are moved, not recreated, so permissions, updates and audit handlers stay intact. */
        document.head.insertAdjacentHTML('beforeend',`<style>
            .task-menu-trigger{width:30px;height:30px;border:1px solid var(--line);border-radius:5px;background:#fff;color:var(--ink);font-size:16px;line-height:1;cursor:pointer;display:grid;place-items:center}
            .task-menu-trigger:hover{background:#f5f8fb;border-color:#c9d8e4}
            .task-overflow-menu{top:36px;min-width:170px;z-index:99999!important;background:#fff!important;border:1px solid var(--line)!important;box-shadow:0 12px 30px rgba(17,39,65,.18)!important;border-radius:7px!important;padding:6px!important}
            .task-overflow-menu .task-menu-item{width:100%;text-align:left;display:block;border:0;background:#fff;padding:9px 12px;font:inherit;font-size:12.5px;font-weight:650;color:var(--ink);border-radius:5px;cursor:pointer}
            .task-overflow-menu .task-menu-item:hover{background:#eef6fd}
            .structured-task-head-actions{display:flex;align-items:center;gap:8px}
            .task-close-btn{width:30px;height:30px;padding:0!important;display:grid;place-items:center;border:1px solid var(--line);border-radius:5px;background:#fff;font-size:13px}
            .task-close-btn:hover{background:#f5f8fb}
        </style>`);
        document.head.insertAdjacentHTML('beforeend',`<style>
            .structured-task-drawer{display:grid!important;grid-template-rows:auto minmax(0,1fr) auto!important;height:calc(100vh - 64px)!important;padding:0!important;overflow:hidden!important;background:#fff!important;color:var(--ink)}
            .structured-task-drawer>.structured-task-head{box-sizing:border-box;display:flex!important;align-items:flex-start!important;flex-wrap:wrap!important;row-gap:10px;justify-content:space-between!important;gap:22px;width:100%!important;max-width:none!important;margin:0!important;padding:20px 26px 16px!important;background:#fff;border-bottom:1px solid var(--line)}
            .structured-task-head>div:first-child{min-width:0;flex:1 1 100%!important;width:100%}.structured-task-head>.actions,.structured-task-head>button{flex:0 0 auto;order:-1;margin-left:auto!important}.structured-task-head>.actions{width:100%;display:flex;justify-content:flex-end;gap:9px;margin:0!important;flex-wrap:wrap}
            .task-id-line{display:flex;align-items:center;gap:9px;margin:0 0 6px}
            .task-id-chip{display:inline-block;white-space:nowrap;color:var(--blue);font-weight:750;font-size:12.5px}
            .task-title-row{display:flex;align-items:flex-start;gap:12px;margin:0}
            .structured-task-head h1{margin:0!important;font-size:21px!important;font-weight:750;line-height:1.32;flex:1;min-width:0;overflow-wrap:break-word}
            .task-title-input{flex:1;min-width:0;width:100%;overflow:hidden;text-overflow:ellipsis;border:1px solid transparent!important;border-radius:6px!important;background:transparent!important;padding:2px 6px!important;height:auto!important;font-size:21px!important;font-weight:750!important;color:var(--ink);font-family:inherit}
            .task-title-input:hover{background:#f5f8fb!important}.task-title-input:focus{border-color:#c9d8e4!important;background:#fff!important;outline:2px solid rgba(0,116,204,.14)}
            .structured-task-head p{margin:7px 0 0;color:var(--muted);font-size:12.5px}
            #root div:has(>.drawer-title-edit){flex:1 1 100%!important;width:100%!important;min-width:0!important}#root .drawer-title-edit,.drawer-title-edit{display:block!important;width:100%!important;box-sizing:border-box!important;width:100%!important;min-height:56px!important;margin:0!important;padding:8px 12px!important;border:1px solid #c9d8e4!important;border-radius:6px!important;background:#fff!important;color:var(--ink)!important;font-family:inherit!important;font-size:21px!important;font-weight:750!important;line-height:1.32!important;outline:2px solid rgba(0,116,204,.14)}
            .structured-task-scroll{box-sizing:border-box;min-height:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable;padding:20px 26px 32px}.structured-task-scroll>*{box-sizing:border-box;width:100%;max-width:none!important}
            .structured-task-scroll>.notice{margin:0 0 18px!important}
            .structured-task-scroll>.structured-task-section,.structured-task-scroll>.card{margin-top:22px!important;border:0!important;border-top:1px solid var(--line)!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;padding-top:18px}
            .structured-task-scroll>.structured-task-section:first-child,.structured-task-scroll>.card:first-child{margin-top:0!important;border-top:0!important;padding-top:0}
            .structured-task-scroll>.card>.card-head{padding:0 0 12px!important;border:0!important;min-height:auto!important}.structured-task-scroll>.card>.card-head h2{font-size:14px!important;font-weight:750!important;margin:0!important}
            .task-section-title{margin:0 0 12px;color:var(--ink);font-size:14px;font-weight:750}
            .task-field-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 22px}
            .task-field-row{display:flex!important;flex-direction:column;gap:5px;padding:9px 0!important;border:0!important;border-bottom:1px solid var(--line)}
            .task-field-row label{color:var(--muted)!important;font-size:11.5px!important;font-weight:650!important;text-transform:uppercase;letter-spacing:.03em}
            .task-field-row input,.task-field-row select{box-sizing:border-box;width:100%!important;min-width:0;height:36px;border:1px solid transparent!important;border-radius:5px!important;background:transparent;padding:6px 8px!important;margin-left:-8px!important;color:var(--ink);font:inherit;font-weight:600}
            .task-field-row input:hover,.task-field-row select:hover{background:#f5f8fb}.task-field-row input:focus,.task-field-row select:focus{border-color:#c9d8e4!important;background:#fff;outline:2px solid rgba(0,116,204,.14)}
            .task-field-row strong{font-size:13px;font-weight:650}
            @media(max-width:620px){.task-field-list{grid-template-columns:1fr}}
            .structured-assignment-meta{grid-column:1/-1;margin:10px 0 0!important;padding:14px!important;border:1px solid var(--line)!important;border-radius:7px!important;background:#f9fbfd!important;box-shadow:none!important}
            .structured-assignment-meta .card-head{padding:0 0 10px!important}.structured-assignment-meta .kv{display:grid;grid-template-columns:130px minmax(0,1fr);gap:12px;padding:6px 0}
            .task-description-section .kv{display:block!important;padding:0!important;border:0!important}
            .task-description-input,.task-description-section textarea{box-sizing:border-box;width:100%!important;min-height:90px!important;border:1px solid var(--line)!important;border-radius:6px!important;background:#fff;padding:11px 12px!important;line-height:1.55;color:var(--ink);font:inherit;resize:vertical}
            .task-description-input:focus{border-color:var(--blue)!important;outline:2px solid rgba(0,116,204,.14)}.task-description-read{margin:0;line-height:1.6;color:var(--ink)}
            .structured-task-dependencies>.card-head,.structured-task-comments>.card-head{padding:0 0 12px!important}.structured-task-dependencies>.card-body,.structured-task-comments>.card-body{padding:0!important}
            .task-history-list{display:flex;flex-direction:column;gap:0}
            .task-history-item{margin:0!important;padding:10px 0!important;border:0!important;border-bottom:1px solid var(--line)!important;background:transparent!important;color:var(--ink)!important}
            .task-history-item:last-child{border-bottom:0!important}
            .task-activity-feed .card-body{display:flex;flex-direction:column;max-height:380px;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable}
            .task-comment-list{display:flex;flex-direction:column}
            .task-comment-item{display:flex;gap:11px;padding:14px 0;border-top:1px solid var(--line)}
            .task-comment-item:first-child{border-top:0;padding-top:0}
            .task-comment-item.is-pinned{background:#fbfaf3}
            .task-comment-item .avatar{flex:0 0 32px;width:32px;height:32px;font-size:12px}
            .task-comment-body{min-width:0;flex:1}
            .task-comment-head{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
            .task-comment-head strong{font-size:13px}
            .task-comment-time{color:var(--muted);font-size:11.5px}
            .task-comment-pin-tag{color:var(--blue);font-size:11px;font-weight:750;text-transform:uppercase;letter-spacing:.03em}
            .task-comment-text{margin:5px 0 0;line-height:1.55}
            .task-comment-actions{display:flex;gap:14px;margin-top:7px}
            .task-comment-actions button{border:0;background:none;padding:0;color:var(--muted);font:inherit;font-size:11.5px;font-weight:650;cursor:pointer}
            .task-comment-actions button:hover{color:var(--blue);text-decoration:underline}
            .task-comment-actions button.task-comment-delete:hover{color:#c51f2d}
            .structured-task-comment-dock{box-sizing:border-box;width:100%;margin:0!important;padding:14px 26px!important;background:#fff!important;border-top:1px solid var(--line);z-index:8}
            .structured-task-comment-dock #task-comment{box-sizing:border-box!important;width:100%!important;min-height:52px!important;max-height:110px!important;display:block;border:1px solid var(--line)!important;border-radius:6px!important;padding:10px 12px!important;resize:vertical}
            .structured-task-comment-dock>.actions{width:100%;margin:8px 0 0!important;justify-content:flex-end}
            @media(max-width:900px){.structured-task-drawer{left:30vw!important}.structured-task-drawer>.structured-task-head,.structured-task-scroll,.structured-task-comment-dock{padding-left:18px!important;padding-right:18px!important}}
            @media(max-width:620px){.structured-task-drawer{left:0!important}.structured-task-head{flex-direction:column}.structured-task-head>.actions{width:100%;justify-content:flex-start}}
        </style>`);
        /* Order tab: edit the displayed fields in place instead of opening a modal. */
        function orderInlineDateValue(value){
            let text=String(value||'').replace(/–.*/,'').trim(),match=text.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})(?:,\s*(\d{1,2}):(\d{2}))?/);
            if(!match)return '';
            return `${match[3]}-${String(match[2]).padStart(2,'0')}-${String(match[1]).padStart(2,'0')}T${String(match[4]||'09').padStart(2,'0')}:${match[5]||'00'}`;
        }
        function orderInlineDisplayDate(value){
            if(!value)return '';
            let date=new Date(value);if(Number.isNaN(date.getTime()))return value;
            return `${String(date.getDate()).padStart(2,'0')}/${String(date.getMonth()+1).padStart(2,'0')}/${date.getFullYear()}, ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
        }
        function orderMeasurementParts(value,defaultUnit){
            let clean=String(value||'').replace(/,/g,''),number=(clean.match(/-?[\d.]+/)||[''])[0],unit=clean.replace(number,'').trim()||defaultUnit;
            return {number,unit};
        }
        function orderEditRecord(caseId){return S.orderEdits[caseId]||(S.orderEdits[caseId]={fields:[],items:[]})}
        function commitOrderEdit(caseId,note){if(S.opterOrders[caseId])S.opterOrders[caseId].needsUpdate=true;S.activities.unshift([`${caseId} ${note}`,actorName(),'16/10/2026, 10:00']);render()}
        function simulateOrderChangeEmail(caseId){let c=CASE_DETAILS[caseId];if(!c)return;let list=S.orderChangeRequests[caseId]||(S.orderChangeRequests[caseId]=[]);if(list.some(x=>x.label==='Delivery Date / Time')){toast('A pending Order change is already waiting for review');return}let base=dateValue(c.requestedDate||c.due),shifted=new Date(base+3*86400000),dd=String(shifted.getDate()).padStart(2,'0'),mm=String(shifted.getMonth()+1).padStart(2,'0'),yyyy=shifted.getFullYear();list.push({label:'Delivery Date / Time',value:`${dd}/${mm}/${yyyy}, 09:00`,note:'Customer requested the delivery be moved later due to a site access delay.',from:c.contact,at:'16/10/2026, 11:05'});S.communications.push({id:'MSG-UPD-'+caseId.slice(-6)+'-'+(S.communications.length+1),caseId,direction:'Incoming',caseClass:c.caseClass,subject:'Change request – '+(c.subject||caseId),body:['Hello AA Logistik team,','',`Please move the delivery to ${dd}/${mm}/${yyyy} at 09:00. There is a delay with site access.`,'','Please confirm the updated plan.','','Kind regards,',c.contact].join('\n'),author:c.contact,at:'16/10/2026, 11:05'});S.activities.unshift([`${caseId} · Customer email received requesting an Order update (Delivery Date / Time)`,c.contact,'16/10/2026, 11:05']);render();toast('New customer update received — review in Order')}
        function orderChangeFieldIndex(label){return [...document.querySelectorAll('.order-line,.order-metric')].findIndex(row=>row.querySelector(':scope > span')?.textContent.trim()===label)}
        function confirmOrderChange(caseId,label){let list=S.orderChangeRequests[caseId];if(!list)return;let i=list.findIndex(x=>x.label===label);if(i<0)return;let item=list[i],index=orderChangeFieldIndex(label);if(index>=0){let rec=orderEditRecord(caseId);rec.fields[index]={index,value:item.value}}list.splice(i,1);if(S.opterOrders[caseId])S.opterOrders[caseId].needsUpdate=true;S.activities.unshift([`${caseId} · ${label} updated from customer request`,actorName(),'16/10/2026, 11:10']);render();toast('Order field updated')}
        function rejectOrderChange(caseId,label){let list=S.orderChangeRequests[caseId];if(!list)return;let i=list.findIndex(x=>x.label===label);if(i<0)return;list.splice(i,1);S.activities.unshift([`${caseId} · ${label} customer request rejected`,actorName(),'16/10/2026, 11:10']);render();toast('Change request rejected')}
        function setInlineOrderField(index,value){let caseId=S.selectedCase,rec=orderEditRecord(caseId);rec.fields[index]={index,value};commitOrderEdit(caseId,'Order field updated')}
        function setInlineOrderUnit(index,number,unit){setInlineOrderField(index,`${number} ${unit}`.trim())}
        function setInlineOrderItem(row,column,value){let caseId=S.selectedCase,rec=orderEditRecord(caseId);rec.items[row]=rec.items[row]||[];rec.items[row][column]=value;commitOrderEdit(caseId,'Goods / Colli updated')}
        function setInlineOrderItemUnit(row,column,number,unit){setInlineOrderItem(row,column,`${number} ${unit}`.trim())}
        function inlineOrderSelect(index,value,options){return `<select class="order-inline-input" onchange="setInlineOrderField(${index},this.value)">${options.map(option=>`<option value="${editorText(option)}" ${String(option)===String(value)?'selected':''}>${editorText(option)}</option>`).join('')}</select>`}
        function inlineOrderControl(field){
            let index=field.index,label=field.label,value=field.value;
            if(/(?:Pickup|Delivery) Date\s*\/\s*Time/i.test(label))return `<input class="order-inline-input" type="datetime-local" value="${editorText(orderInlineDateValue(value))}" onchange="setInlineOrderField(${index},orderInlineDisplayDate(this.value))">`;
            let units=null,defaultUnit='';
            if(/Gross Weight|Chargeable Weight/i.test(label)){units=['kg','lb'];defaultUnit='kg'}
            else if(/^(?:Length|Width|Height)$/i.test(label)){units=['m','cm','mm'];defaultUnit='m'}
            else if(/Total Volume/i.test(label)){units=['m³','ft³'];defaultUnit='m³'}
            else if(/Loading Metres/i.test(label)){units=['m','cm'];defaultUnit='m'}
            else if(/^Distance$/i.test(label)){units=['km','mi'];defaultUnit='km'}
            else if(/CO₂ Emission/i.test(label)){units=['kg','lb'];defaultUnit='kg'}
            if(units){let parts=orderMeasurementParts(value,defaultUnit);if(!units.includes(parts.unit))parts.unit=defaultUnit;return `<span class="order-inline-measure"><input class="order-inline-input" type="number" step="any" value="${editorText(parts.number)}" onchange="setInlineOrderUnit(${index},this.value,this.nextElementSibling.value)"><select class="order-inline-unit" onchange="setInlineOrderUnit(${index},this.previousElementSibling.value,this.value)">${units.map(unit=>`<option value="${editorText(unit)}" ${parts.unit===unit?'selected':''}>${unit==='lb'?'lb (pound)':editorText(unit)}</option>`).join('')}</select></span>`}
            if(label==='Customer')return inlineOrderSelect(index,value,[...new Set(CASES.map(row=>row[1]))]);
            if(label==='Region')return inlineOrderSelect(index,value,['DACH','Nordics','Benelux','Baltics','Other']);
            if(label==='Transport Mode')return inlineOrderSelect(index,value,['Road Freight','Rail Freight','Air Freight','Sea Freight']);
            if(label==='Service')return inlineOrderSelect(index,value,['Direct','Groupage','Express','Economy']);
            if(label==='Temperature Requirement')return inlineOrderSelect(index,value,['None','Ambient','Chilled','Frozen']);
            if(label==='Dangerous Goods')return inlineOrderSelect(index,value,['No','Yes']);
            return `<input class="order-inline-input" type="text" value="${editorText(value)}" onchange="setInlineOrderField(${index},this.value)">`;
        }
        function inlineGoodsControl(row,column,value,heading){
            if(/^Qty$/i.test(heading))return `<input class="order-inline-input" type="number" min="0" step="1" value="${editorText(value)}" onchange="setInlineOrderItem(${row},${column},this.value)">`;
            if(/^Weight$/i.test(heading)){let parts=orderMeasurementParts(value,'kg');if(!['kg','lb'].includes(parts.unit))parts.unit='kg';return `<span class="order-inline-measure"><input class="order-inline-input" type="number" min="0" step="any" value="${editorText(parts.number)}" onchange="setInlineOrderItemUnit(${row},${column},this.value,this.nextElementSibling.value)"><select class="order-inline-unit" onchange="setInlineOrderItemUnit(${row},${column},this.previousElementSibling.value,this.value)"><option value="kg" ${parts.unit==='kg'?'selected':''}>kg</option><option value="lb" ${parts.unit==='lb'?'selected':''}>lb (pound)</option></select></span>`}
            if(/^Dimensions$/i.test(heading)){let match=String(value||'').match(/^(.*?)(?:\s+(m|cm|mm))?$/),numbers=match?.[1]?.trim()||value,unit=match?.[2]||'m';return `<span class="order-inline-measure"><input class="order-inline-input" type="text" value="${editorText(numbers)}" onchange="setInlineOrderItemUnit(${row},${column},this.value,this.nextElementSibling.value)"><select class="order-inline-unit" onchange="setInlineOrderItemUnit(${row},${column},this.previousElementSibling.value,this.value)">${['m','cm','mm'].map(option=>`<option ${unit===option?'selected':''}>${option}</option>`).join('')}</select></span>`}
            return `<input class="order-inline-input" type="text" value="${editorText(value)}" onchange="setInlineOrderItem(${row},${column},this.value)">`;
        }
        const inlineOrderTabBase=orderTabV2;orderTabV2=function(){
            let html=inlineOrderTabBase(),caseId=S.selectedCase,pending=S.orderChangeRequests[caseId]||[];
            let template=document.createElement('template');template.innerHTML=html,rows=[...template.content.querySelectorAll('.order-line,.order-metric')];
            rows.forEach((row,index)=>{let label=row.querySelector(':scope > span')?.textContent?.trim()||`Field ${index+1}`,value=row.querySelector('strong');if(value){let control=document.createElement('div');control.className='order-inline-control';control.innerHTML=inlineOrderControl({index,label,value:value.textContent.trim()});value.replaceWith(control);let change=pending.find(x=>x.label===label);if(change){row.classList.add('order-field-pending');row.insertAdjacentHTML('beforeend',`<div class="order-change-pending"><div class="order-change-note"><strong>AI suggests: ${editorText(change.value)}</strong></div><div class="order-change-actions"><button type="button" class="confirm" title="Confirm" onclick="confirmOrderChange('${caseId}','${editorText(label)}')">✓</button><button type="button" class="reject" title="Reject" onclick="rejectOrderChange('${caseId}','${editorText(label)}')">✕</button></div></div>`)}}});
            let table=template.content.querySelector('.compact-order-table'),headings=table?[...table.querySelectorAll('thead th')].map(th=>th.textContent.trim()):[];
            table?.querySelectorAll('tbody tr').forEach((tr,row)=>[...tr.cells].slice(0,7).forEach((cell,column)=>{cell.innerHTML=inlineGoodsControl(row,column,cell.textContent.trim(),headings[column]||'')}));
            return template.innerHTML;
        };
        document.head.insertAdjacentHTML('beforeend',`<style>
            .order-inline-control{min-width:0;width:100%}.order-inline-input,.order-inline-unit,.order-inline-other textarea{box-sizing:border-box;width:100%;min-width:0;height:36px;border:1px solid #9fc3df;border-radius:5px;background:#fff;padding:7px 9px;color:var(--ink);font:inherit;font-weight:600}.order-inline-input:focus,.order-inline-unit:focus,.order-inline-other textarea:focus{outline:2px solid rgba(0,116,204,.15);border-color:var(--blue)}
            .order-inline-measure{display:grid;grid-template-columns:minmax(70px,1fr) minmax(82px,.55fr);gap:6px;min-width:0}.order-inline-unit{font-weight:500}.order-inline-actions{display:flex;align-items:center;gap:8px;margin-left:auto}.order-inline-actions .btn{white-space:nowrap}
            .order-line:has(.order-inline-control),.order-metric:has(.order-inline-control){align-items:center}.order-line .order-inline-control,.order-metric .order-inline-control{justify-self:stretch}.compact-order-table td:has(.order-inline-control){padding:6px}.compact-order-table .order-inline-input,.compact-order-table .order-inline-unit{height:32px;padding:5px 7px;font-size:12px}.compact-order-table .order-inline-measure{grid-template-columns:minmax(58px,1fr) 76px}
            .compact-order-table{width:100%;min-width:1000px;table-layout:fixed}.compact-order-table th:nth-child(1),.compact-order-table td:nth-child(1){width:52px}.compact-order-table th:nth-child(2),.compact-order-table td:nth-child(2){width:60px}.compact-order-table th:nth-child(3),.compact-order-table td:nth-child(3){width:118px}.compact-order-table th:nth-child(4),.compact-order-table td:nth-child(4){width:auto}.compact-order-table th:nth-child(5),.compact-order-table td:nth-child(5){width:100px}.compact-order-table th:nth-child(6),.compact-order-table td:nth-child(6),.compact-order-table th:nth-child(7),.compact-order-table td:nth-child(7),.compact-order-table th:nth-child(8),.compact-order-table td:nth-child(8){width:78px}.compact-order-table th:nth-child(9),.compact-order-table td:nth-child(9){width:118px}.compact-order-table th:nth-child(10),.compact-order-table td:nth-child(10){width:96px}.compact-order-table th:nth-child(11),.compact-order-table td:nth-child(11){width:32px}
            .order-inline-other{display:grid;gap:7px}.order-inline-other>span{color:var(--muted);font-size:12px}.order-inline-other textarea{height:auto;min-height:92px;line-height:1.5;resize:vertical;font-weight:500}
            @media(max-width:900px){.order-inline-measure{grid-template-columns:1fr}.order-inline-actions{width:100%;justify-content:flex-end}}
            .order-field-pending .order-inline-input,.order-field-pending .order-inline-unit{border-color:#e3a008;background:#fffaf0}
            .order-change-pending{grid-column:1/-1;display:flex;align-items:center;gap:10px;margin-top:7px;padding:8px 10px;background:#fff8e6;border:1px solid #f0d78c;border-radius:5px}
            .order-change-note{flex:1;min-width:0;font-size:12px;color:#6b4e00;line-height:1.4}.order-change-note strong{display:block;font-weight:700}.order-change-note .sub{display:block;color:#8a6d1f;font-size:11px;margin-top:2px}
            .order-change-actions{display:flex;gap:6px;flex:none}.order-change-actions button{width:26px;height:26px;border-radius:5px;border:1px solid var(--line);background:#fff;cursor:pointer;font-size:13px;line-height:1}
            .order-change-actions button.confirm{color:#188756;border-color:#188756}.order-change-actions button.confirm:hover{background:#e9f8ef}
            .order-change-actions button.reject{color:#c51f2d;border-color:#f1a7ad}.order-change-actions button.reject:hover{background:#fdeef0}
            .tab-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#e23b4c;margin-left:5px;vertical-align:middle}
        </style>`);
        render();
const DUE_PRESETS=['Today','This week','This month','Custom'];
function dueParse(s){let m=/^(\d{2})\/(\d{2})\/(\d{4})/.exec(s||'');return m?new Date(+m[3],+m[2]-1,+m[1]):null}
function dueIso(s){return /^\d{4}-\d{2}-\d{2}$/.test(s||'')?new Date(s+'T00:00:00'):null}
function dueRange(state){let t=new Date(2026,9,9),k=state.due;if(k==='Today')return[t,t];if(k==='This week'){let d=(t.getDay()+6)%7;return[new Date(2026,9,9-d),new Date(2026,9,9-d+6)]}if(k==='This month')return[new Date(t.getFullYear(),t.getMonth(),1),new Date(t.getFullYear(),t.getMonth()+1,0)];if(k==='Custom')return[dueIso(state.dueFrom),dueIso(state.dueTo)];return null}
function reviewerDueMatch(state,dueText){let r=dueRange(state);if(!r)return true;let d=dueParse(dueText);if(!d)return !r[0]&&!r[1];return(!r[0]||d>=r[0])&&(!r[1]||d<=r[1])}

const RVF_OPTS={},RVF_LABEL={customer:'Customer',department:'Department',category:'Category',subcategory:'Subcategory',casetype:'Case Type',priority:'Priority',source:'Source',missing:'Missing Information',status:'Case Status',ack:'Acknowledgement'};
function rvfArr(v){if(Array.isArray(v))return v;if(typeof v==='string'&&v&&v!=='All')return[v];return[]}
/* Filters picked inside the popup go to a draft copy; only Apply Filter writes them to the real filter state. */
const RVF_KEYS=['customer','department','category','subcategory','casetype','priority','source','missing','status','ack'];
function rvfDraft(){return(S.page==='cases'?S.cfModal:S.rvfModal)&&S.rvfDraft?S.rvfDraft:null}
function rvfTarget(){return rvfDraft()||reviewerFilterState()}
function rvfSet(k,v){rvfTarget()[k]=v;render()}
function rvfModalOpen(on){let s=reviewerFilterState();S.rvfOpen=null;S.rvfSearch='';S.rvfDraft=on?JSON.parse(JSON.stringify(s)):null;if(S.page==='cases')S.cfModal=on;else S.rvfModal=on;render()}
function rvfApply(){let d=S.rvfDraft,s=reviewerFilterState();if(d)Object.keys(d).forEach(k=>{if(k!=='q')s[k]=d[k]});rvfModalOpen(false)}
function rvfToggleVal(k,val){let s=rvfTarget(),a=rvfArr(s[k]);s[k]=a.includes(val)?a.filter(x=>x!==val):[...a,val];let hadFocus=document.activeElement&&document.activeElement.id==='rvf-search',cursor=hadFocus?document.activeElement.selectionStart:null;render();if(S.rvfOpen&&hadFocus){setTimeout(()=>{let el=document.getElementById('rvf-search');if(el){el.focus();if(cursor!==null)el.setSelectionRange(cursor,cursor)}},15)}}
function rvfRemoveVal(k,val){let s=rvfTarget(),a=rvfArr(s[k]);s[k]=a.filter(x=>x!==val);render()}
function rvfToggleIdx(k,i){let v=(RVF_OPTS[k]||[])[i];if(v!==undefined)rvfToggleVal(k,v)}
function rvfClearKey(k){let s=rvfTarget();if(k==='due'){s.due='All';s.dueFrom='';s.dueTo=''}else s[k]=[];render()}
function rvfDue(p){let s=rvfTarget();s.due=s.due===p?'All':p;render()}
function rvfOpenKey(k){S.rvfOpen=S.rvfOpen===k?null:k;S.rvfSearch='';render();if(S.rvfOpen){setTimeout(()=>{let el=document.getElementById('rvf-search');if(el)el.focus()},25)}}
function rvfSearch(v){S.rvfSearch=v;render();let el=document.getElementById('rvf-search');if(el){el.focus();el.setSelectionRange(v.length,v.length)}}
resetReviewerFilters=function(){let d=rvfDraft(),s=d||reviewerFilterState();if(!d)s.q='';s.due='All';s.dueFrom='';s.dueTo='';RVF_KEYS.forEach(k=>{if(k in s)s[k]=[]});S.rvfOpen=null;render()};
function rvfIso(v){return /^\d{4}-\d{2}-\d{2}$/.test(v||'')?v:''}
function rvfFmt(v){let m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(v||'');return m?m[3]+'/'+m[2]+'/'+m[1]:'…'}
function rvfDueText(s){return s.due==='Custom'?(rvfIso(s.dueFrom)||rvfIso(s.dueTo)?rvfFmt(s.dueFrom)+' – '+rvfFmt(s.dueTo):'Custom'):s.due}
function rvfTrigger(key,label,summary,active,body,width){let open=S.rvfOpen===key;return `<div class="rvf-wrap ds-multi-wrap" style="position:relative;width:100%"><div class="ds-multi-box ${open?'open':''} ${active?'has-value':''}" onclick="rvfOpenKey('${key}')" tabindex="0" role="combobox" aria-expanded="${open}"><div class="ds-multi-chips">${active?`<span class="ds-filter-chip" onclick="event.stopPropagation()">${editorText(summary)}<button type="button" class="ds-filter-chip-remove" onclick="event.stopPropagation();rvfClearKey('${key}')" aria-label="Clear ${label}">&times;</button></span>`:'<span class="ds-multi-placeholder">All</span>'}</div><span class="ds-multi-arrow">▾</span></div>${open?`<div class="ds-multi-menu" onclick="event.stopPropagation()" style="${width?`min-width:${width}px;`:''}">${body}</div>`:''}</div>`}
function rvfCheck(on){return `<span class="ds-multi-check">${on?'✓':''}</span>`}
function rvfRow(label,on,click,radio){return `<button type="button" onclick="${click}" style="display:flex;align-items:center;gap:10px;width:100%;min-height:34px;padding:0 14px;border:0;background:${on?'#edf6fd':'#fff'};text-align:left;font:${on?650:500} 12.5px Inter,sans-serif;color:var(--ink);cursor:pointer" onmouseover="this.style.background='#f1f6fb'" onmouseout="this.style.background='${on?'#edf6fd':'#fff'}'">${radio?`<span style="flex:none;width:17px;height:17px;border-radius:50%;border:1px solid ${on?'#147bd1':'#b8c6d4'};box-shadow:${on?'inset 0 0 0 3.5px #fff':'none'};background:${on?'#147bd1':'#fff'}"></span>`:rvfCheck(on)}<span data-aa-style="aa-static-style-73">${editorText(label)}</span></button>`}
function rvfFoot(key,n){return `<div class="ds-multi-foot"><span>${n?n+' selected':'Select one or more'}</span><button type="button" class="ds-multi-clear-btn" onclick="rvfClearKey('${key}')">Clear</button></div>`}
function rvfMulti(key,vals,s,searchable){RVF_OPTS[key]=vals;let sel=rvfArr(s[key]),q=(S.rvfSearch||'').toLowerCase(),open=S.rvfOpen===key,label=RVF_LABEL[key]||key;let list=vals.filter(v=>{if(!q)return true;let text=String(v).toLowerCase();if(text.includes(q))return true;if(typeof MASTER_CUSTOMERS!=='undefined'&&key==='customer'){let m=MASTER_CUSTOMERS.find(c=>c.name===v);if(m&&((m.number&&String(m.number).toLowerCase().includes(q))||(m.code&&String(m.code).toLowerCase().includes(q))))return true}return false});let chipsHtml='';if(sel.length){chipsHtml=sel.map(v=>{let escVal=editorText(v),attrVal=v.replace(/'/g,"\\'");return `<span class="ds-filter-chip" onclick="event.stopPropagation()">${escVal}<button type="button" class="ds-filter-chip-remove" onclick="event.stopPropagation();rvfRemoveVal('${key}','${attrVal}')" aria-label="Remove ${escVal}">&times;</button></span>`}).join('')}else chipsHtml='<span class="ds-multi-placeholder">All</span>';let menuHtml='';if(open){let searchBox=searchable||vals.length>7?`<div class="ds-multi-search-wrap"><input class="ds-multi-search-input" id="rvf-search" value="${editorText(S.rvfSearch||'')}" oninput="rvfSearch(this.value)" placeholder="Search ${label.toLowerCase()}..." onclick="event.stopPropagation()"></div>`:'';let optionsHtml=list.length?list.map(opt=>{let isSel=sel.includes(opt),attrOpt=opt.replace(/'/g,"\\'");return `<div class="ds-multi-option ${isSel?'selected':''}" onclick="event.stopPropagation();rvfToggleVal('${key}','${attrOpt}')"><span class="ds-multi-check">${isSel?'✓':''}</span><span class="ds-multi-opt-label">${editorText(opt)}</span></div>`}).join(''):'<div class="ds-multi-empty">No matches found</div>';let footHtml=`<div class="ds-multi-foot"><span>${sel.length?sel.length+' selected':'Select one or more'}</span><button type="button" class="ds-multi-clear-btn" onclick="event.stopPropagation();rvfClearKey('${key}')">Clear</button></div>`;menuHtml=`<div class="ds-multi-menu" onclick="event.stopPropagation()">${searchBox}<div class="ds-multi-list">${optionsHtml}</div>${footHtml}</div>`}return `<div class="rvf-wrap ds-multi-wrap" style="position:relative;width:100%"><div class="ds-multi-box ${open?'open':''} ${sel.length?'has-value':''}" onclick="rvfOpenKey('${key}')" tabindex="0" role="combobox" aria-expanded="${open}"><div class="ds-multi-chips">${chipsHtml}</div><span class="ds-multi-arrow">▾</span></div>${menuHtml}</div>`}
function rvfDueTrigger(s){let on=s.due&&s.due!=='All',inp='height:32px;border:1px solid #dce4ec;border-radius:4px;padding:0 8px;font:12.5px Inter,sans-serif;width:100%;box-sizing:border-box',body=`<div data-aa-style="aa-static-style-79">${DUE_PRESETS.map(p=>rvfRow(p,s.due===p,`rvfDue('${p}')`,true)).join('')}</div>${s.due==='Custom'?`<div data-aa-style="aa-static-style-80"><label data-aa-style="aa-static-style-81">From<input type="date" value="${rvfIso(s.dueFrom)}" onchange="rvfSet('dueFrom',this.value)" style="${inp}"></label><label data-aa-style="aa-static-style-81">To<input type="date" value="${rvfIso(s.dueTo)}" onchange="rvfSet('dueTo',this.value)" style="${inp}"></label></div>`:''}`+rvfFoot('due',on?1:0).replace('1 selected','Date range').replace('Select one or more','Pick a period');return rvfTrigger('due','Due date',rvfDueText(s),on,body,s.due==='Custom'?300:230)}
function rvfSelect(key,label,vals,s){let cur=s[key]||'All';if(Array.isArray(cur))cur=cur.length?cur[0]:'All';let opts=['All',...vals];return `<select class="rvf-select" aria-label="${label}" onchange="setReviewerFilter('${key}', this.value)">${opts.map(v=>`<option value="${v}" ${cur===v?'selected':''}>${v==='All'?'All':editorText(v)}</option>`).join('')}</select>`}
function rvfDueSelect(s){let cur=s.due||'All',custom=cur==='Custom',iso=v=>/^\d{4}-\d{2}-\d{2}$/.test(v||'')?v:'';return `<select class="rvf-select" aria-label="Due date" onchange="setReviewerFilter('due', this.value)"><option value="All" ${cur==='All'?'selected':''}>All</option>${DUE_PRESETS.map(p=>`<option value="${p}" ${cur===p?'selected':''}>${p}</option>`).join('')}</select>${custom?`<div data-aa-style="aa-static-style-82"><label data-aa-style="aa-static-style-83">From<input type="date" value="${iso(s.dueFrom)}" onchange="setReviewerFilter('dueFrom', this.value)" data-aa-style="aa-static-style-84"></label><label data-aa-style="aa-static-style-83">To<input type="date" value="${iso(s.dueTo)}" onchange="setReviewerFilter('dueTo', this.value)" data-aa-style="aa-static-style-84"></label></div>`:''}`}
function rvfModal(on){rvfModalOpen(on)}
reviewerViewFilterBar = function () {
  let s = reviewerFilterState(), rows = QUEUE.filter(r => r[6] === S.queueTab), clar = S.queueTab === 'Needs Clarification', R = window.AA_REVIEW || {}, opt = k => reviewerFilterOptions(rows, k);
  let keys = ['customer', 'department', 'category', 'casetype', 'priority', 'source', 'missing'];
  let n = keys.reduce((a, k) => a + rvfArr(s[k]).length, 0) + (s.due && s.due !== 'All' ? 1 : 0);

  let cust = [...new Set([...(R.cust || []), ...opt('customer')])].filter(Boolean).sort();
  let depts = R.depts || opt('department');
  let cats = R.cats || [];
  let types = R.types || [];
  let prios = ['Urgent', 'High', 'Medium', 'Low'].filter(p => opt('priority').includes(p));

  let chips = [];
  keys.forEach(k => {
    rvfArr(s[k]).forEach(val => {
      chips.push([RVF_LABEL[k] + ': ' + val, `rvfRemoveVal('${k}', '${val.replace(/'/g, "\\'")}')`]);
    });
  });
  if (s.due && s.due !== 'All') chips.push(['Due: ' + (s.due === 'Custom' ? rvfDueText(s) : s.due), `rvfClearKey('due')`]);

  let fl = (l, h) => `<div data-aa-style="aa-static-style-85"><label data-aa-style="aa-static-style-86">${l}</label>${h}</div>`;
  let d = rvfDraft() || s, dn = keys.reduce((a, k) => a + rvfArr(d[k]).length, 0) + (d.due && d.due !== 'All' ? 1 : 0);

  let modal = S.rvfModal ? `
    <div onclick="if(event.target===this)rvfModal(false)" data-aa-style="aa-static-style-87">
      <div onclick="event.stopPropagation()" role="dialog" aria-label="Filters" data-aa-style="aa-static-style-88">
        <div data-aa-style="aa-static-style-89">
          <div>
            <b data-aa-style="aa-static-style-90">Filters</b>
            <div data-aa-style="aa-static-style-91">${S.queueTab === 'Needs Clarification' ? 'Missing Information' : S.queueTab} requests</div>
          </div>
          <button type="button" onclick="rvfModal(false)" aria-label="Close" data-aa-style="aa-static-style-92">×</button>
        </div>
        <div data-aa-style="aa-static-style-93">
          ${fl('Customer', rvfMulti('customer', cust, d, true))}
          ${fl('Department', rvfMulti('department', depts, d))}
          ${fl('Category', rvfMulti('category', cats, d))}
          ${fl('Case Type', rvfMulti('casetype', types, d))}
          ${fl('Priority', rvfMulti('priority', prios, d))}
          ${fl('Source', rvfMulti('source', SOURCE_FILTERS, d))}
          ${clar ? fl('Missing Information', rvfMulti('missing', opt('missing'), d)) : fl('Due Date', rvfDueTrigger(d))}
        </div>
        <div data-aa-style="aa-static-style-94">
          <button type="button" onclick="resetReviewerFilters()" style="border:0;background:none;color:${dn ? '#0871c7' : '#a9b4c2'};font:650 13px Inter,sans-serif;cursor:pointer">Clear all</button>
          <button type="button" class="btn primary" onclick="rvfApply()">Apply Filter</button>
        </div>
      </div>
    </div>` : '';

  return `<input value="${editorText(s.q)}" onchange="setReviewerFilter('q',this.value)" onkeyup="if(event.key==='Enter')setReviewerFilter('q',this.value)" placeholder="Search requests..."><button type="button" onclick="rvfModal(true)" style="display:inline-flex;align-items:center;gap:8px;height:35px;padding:0 13px;border-radius:4px;border:1px solid ${n ? '#0877d1' : 'var(--line)'};background:${n ? 'var(--bluebg)' : '#fff'};color:${n ? '#0869b6' : 'var(--ink)'};font:650 12.5px Inter,sans-serif;cursor:pointer"><span>☰</span>Filters${n ? `<span data-aa-style="aa-static-style-95">${n}</span>` : ''}</button>${n ? '<button type="button" onclick="resetReviewerFilters()" data-aa-style="aa-static-style-96">Clear all</button>' : ''}${chips.length ? `<div data-aa-style="aa-static-style-97">${chips.map(c => `<button type="button" onclick="${c[1]}" data-aa-style="aa-static-style-98">${editorText(c[0])}<span>×</span></button>`).join('')}</div>` : ''}${modal}`;
};


function caseNarrative(c, tasks) {
  let day = s => String(s || '').split(',')[0], when = s => String(s || '').replace(', ', ' at '), p = x => `<p data-aa-style="aa-static-style-99">${x}</p>`;
  let rec = acknowledgementRecord(c.id), done = tasks.filter(t => t[7] === 'Completed'), open = tasks.filter(t => t[7] !== 'Completed'), st = t => effectiveTaskStatus(t);
  let who = t => t[4] === 'Unassigned' ? 'no owner yet' : t[4], q = t => `<strong>${t[0]}</strong>`;
  let req = `${c.contact ? c.contact + ' from ' : 'A request from '}<strong>${c.customer}</strong> ${c.contact ? 'sent a request' : 'was registered'} on ${day(c.created)} regarding ${c.goods ? String(c.goods).toLowerCase() : String(c.subject || '').toLowerCase()}${String(c.priority).toLowerCase() === 'high' ? ', marked high priority' : ''}.`;
  let past = `The request was reviewed and the Case was created on ${when(c.created)}. ${rec ? `The customer was acknowledged by ${rec.by} on ${when(rec.at)}.` : 'The customer has not been acknowledged yet.'}`;
  if (done.length) past += ` ${done.length === 1 ? 'One Task is' : done.length + ' Tasks are'} complete: ${done.map(t => `${q(t)} (${t[3]}, ${who(t)})`).join('; ')}.`;
  else past += ' No Tasks have been completed yet.';
  let now = '';
  if (open.length) {
    let doing = open.filter(t => t[7] === 'In Progress'), blocked = open.filter(t => ['On Hold'].includes(t[7])), unowned = open.filter(t => t[4] === 'Unassigned'), late = open.filter(t => st(t) === 'Overdue');
    let parts = [];
    if (doing.length) parts.push(doing.map(t => `${who(t)} is working on ${q(t)}, due ${t[6]}`).join('; '));
    let rest = open.filter(t => !doing.includes(t) && !blocked.includes(t) && !unowned.includes(t));
    if (rest.length) parts.push(rest.map(t => `${q(t)} is assigned to ${who(t)}, due ${t[6]}`).join('; '));
    if (blocked.length) parts.push(blocked.map(t => `${q(t)} (${who(t)}) is ${String(t[7]).toLowerCase()}, due ${t[6]}`).join('; '));
    if (unowned.length) parts.push(unowned.map(t => `${q(t)} is waiting for an owner in ${t[3]}, due ${t[6]}`).join('; '));
    let last = open.reduce((m, t) => dateValue(t[6]) > dateValue(m) ? t[6] : m, open[0][6]);
    now = `${parts.join('. ')}.${late.length ? ` ${late.length} of these ${late.length === 1 ? 'is' : 'are'} overdue.` : ''} The last open Task is due ${last}, so the Case is expected to be complete by then.`;
  } else now = tasks.length ? 'All Tasks are complete.' : 'No Tasks have been created yet.';
  return p(req) + p(past) + p(now);
}

function caseListMeta(c){let d=CASE_DETAILS[c[0]]||{},ts=TASKS.filter(x=>x[1]===c[0]),done=ts.filter(x=>x[7] === 'Completed').length,deps=String(c[3]),top=/Finance/.test(deps)?'Finance':/Warehouse|Packing/.test(deps)?'Warehouse':'Transport booking',cm=((window.AA_REVIEW||{}).catmap||{})[top]||[],all=(window.AA_REVIEW||{}).cats||[],sub=d.subcategory||(all.includes(d.category)?d.category:'')||(cm.length?cm[(parseInt(String(c[0]).replace(/\D/g,''))||0)%cm.length]:''),category=sub,m=/^(\d{2})\/(\d{2})\/(\d{4}),?\s*(\d{2}):(\d{2})/.exec(d.created||''),cr=m?new Date(+m[3],+m[2]-1,+m[1],+m[4],+m[5]):null,up=cr?new Date(cr.getTime()+(((parseInt(String(c[0]).replace(/\D/g,''))||0)%5)+1)*5400000):null,f=x=>x?[String(x.getDate()).padStart(2,'0')+'/'+String(x.getMonth()+1).padStart(2,'0')+'/'+x.getFullYear(),String(x.getHours()).padStart(2,'0')+':'+String(x.getMinutes()).padStart(2,'0')]:['—',''];
return{category,sub,type:c[2],subject:d.subject||'—',hold:c[6]==='Blocked'?'On hold':'Not on hold',done,total:ts.length,ack:d&&d.id&&caseAcknowledged(d)?'Acknowledged':'Not sent',created:f(cr),updated:f(up)}}
function caseListFilter(k,v){S.caseFx=S.caseFx||{};S.caseFx[k]=v;render()}

cases=function(){let u=currentUser(),fx=S.caseFx=S.caseFx||{},base=S.role==='User'?CASES.filter(c=>TASKS.some(t=>t[1]===c[0]&&t[4]===u.name)):S.role==='Manager'?CASES.filter(c=>c[3].includes(u.department)):CASES,q=S.caseQuery.toLowerCase(),meta={};base.forEach(c=>meta[c[0]]=caseListMeta(c));
let ok=(k,v)=>!fx[k]||fx[k]==='All'||fx[k]===v,visible=base.filter(c=>cfMatch(c,meta[c[0]])),ordered=sortedRows(visible,'cases',{caseNo:c=>c[0],date:c=>c[5],priority:c=>c[4],status:c=>c[6]});
let pageSize=S.casePageSize||10,pageCount=Math.max(1,Math.ceil(ordered.length/pageSize)),page=S.casePage=Math.min(Math.max(1,S.casePage||1),pageCount),pageRows=ordered.slice((page-1)*pageSize,(page-1)*pageSize+pageSize);
let sel=(k,label,vals)=>`<select aria-label="${label}" onchange="caseListFilter('${k}',this.value)"><option value="All">All ${label}</option>${vals.map(x=>`<option ${fx[k]===x?'selected':''}>${x}</option>`).join('')}</select>`,uniq=f=>[...new Set(base.map(c=>f(meta[c[0]])))].sort();
let bar=(p,c,w)=>`<span data-aa-style="aa-static-style-100"><i style="display:block;height:100%;width:${p}%;background:${w}"></i></span>`;
let row=c=>{let m=meta[c[0]],pct=m.total?Math.round(m.done/m.total*100):0;return`<tr><td><button class="case-link" onclick="openCase('${c[0]}')">${c[0]}</button></td><td>${m.category}</td><td>${m.type}</td><td data-aa-style="aa-static-style-101">${m.subject}</td><td>${c[1]}</td><td>${pill(c[6])}</td><td data-aa-style="aa-static-style-73"><strong>${m.done}/${m.total}</strong>${bar(pct,pct===100?'#188756':pct?'#0877d1':'#dce4ec')}</td><td>${m.ack==='Acknowledged'?pill('Acknowledged'):pill('Not Sent')}</td><td>${pill(c[4])}</td><td>${c[3]}</td><td data-aa-style="aa-static-style-73">${c[5]}</td><td data-aa-style="aa-static-style-73">${m.created[0]}<div class="sub">${m.created[1]}</div></td><td data-aa-style="aa-static-style-73">${m.updated[0]}<div class="sub">${m.updated[1]}</div></td></tr>`};
return head('Cases',S.role==='Admin'?'All active and recently completed Cases.':S.role==='Manager'?`Cases involving the ${u.department} department.`:'Cases connected to your assigned Tasks.')+`<div class="card case-table-card"><div class="filters">${caseFilterBar(base,meta,visible.length)}</div><div class="card-head" data-aa-style="aa-static-style-5"><h3 data-aa-style="aa-static-style-73">${visible.length} ${visible.length===1?'Case':'Cases'}</h3></div>${ordered.length?`<div class="case-table-scroll"><table><thead><tr><th>${sortHeader('Case No.','cases','caseNo')}</th><th>Category</th><th>Case Type</th><th>Subject</th><th>Customer</th><th>${sortHeader('Case Status','cases','status')}</th><th>Task Status</th><th>Acknowledgement</th><th>${sortHeader('Priority','cases','priority')}</th><th>Departments</th><th>${sortHeader('Due Date','cases','date')}</th><th>Created</th><th>Updated</th></tr></thead><tbody>${pageRows.map(row).join('')}</tbody></table></div>${casePager(ordered.length,page,pageCount,pageSize)}`:`<div class="card-body" data-aa-style="aa-static-style-2"><strong>No Cases match these filters</strong><p class="sub">Change or reset the filters.</p></div>`}</div>`};
function casePager(total,page,pageCount,pageSize){ if(!total) return ''; let from=(page-1)*pageSize+1,to=Math.min(page*pageSize,total),pages=[...Array(pageCount)].map((_,i)=>i+1),shown=pages.filter(n=>n===1||n===pageCount||Math.abs(n-page)<=1);
  let nums='',prev=0; shown.forEach(n=>{ if(prev&&n-prev>1) nums+=`<span class="case-pager-gap">…</span>`; nums+=`<button type="button" class="case-pager-num${n===page?' active':''}" onclick="setCasePage(${n})" aria-current="${n===page?'page':'false'}">${n}</button>`; prev=n; });
  return `<div class="case-pager"><span class="sub">Showing ${from}–${to} of ${total} ${total===1?'Case':'Cases'}</span><div class="case-pager-controls"><button type="button" class="icon-btn" ${page<=1?'disabled':''} title="Previous page" aria-label="Previous page" onclick="setCasePage(${page-1})">‹</button>${nums}<button type="button" class="icon-btn" ${page>=pageCount?'disabled':''} title="Next page" aria-label="Next page" onclick="setCasePage(${page+1})">›</button><label class="case-pager-size">Rows per page<select aria-label="Rows per page" onchange="setCasePageSize(this.value)">${[10,25,50].map(n=>`<option value="${n}" ${pageSize===n?'selected':''}>${n}</option>`).join('')}</select></label></div></div>`; }
function setCasePage(p){S.casePage=p;render()}
function setCasePageSize(v){S.casePageSize=parseInt(v,10)||10;S.casePage=1;render()}

const receivedSplitBase=queueTable;queueTable=function(home=false){let template=document.createElement('template');template.innerHTML=receivedSplitBase(home);template.content.querySelectorAll('table').forEach(table=>{let heads=[...table.querySelectorAll('thead th')],i=heads.findIndex(th=>/^Received/.test(th.textContent.trim()));if(i<0)return;table.querySelectorAll('tbody tr').forEach(tr=>{let td=tr.children[i],m=td&&/^\s*(\d{2}\/\d{2}\/\d{4}),\s*(\d{2}:\d{2})\s*$/.exec(td.textContent);if(m){td.style.whiteSpace='nowrap';td.innerHTML=m[1]+'<div class="sub">'+m[2]+'</div>'}})});return template.innerHTML};

const CC_EMPTY=()=>({customer:'',subject:'',cats:[],types:[],priority:'Medium',depts:[],requested:'',err:false});
function ccOpen(on){S.ccOpen=on;if(on)S.cc=CC_EMPTY();render()}
function ccSet(k,v,re){S.cc[k]=v;if(re)render()}
function ccDept(d){let a=S.cc.depts;S.cc.depts=a.includes(d)?a.filter(x=>x!==d):[...a,d];render()}
function ccCat(x){let a=S.cc.cats;S.cc.cats=a.includes(x)?a.filter(v=>v!==x):[...a,x];render()}
function ccType(x){let a=S.cc.types;S.cc.types=a.includes(x)?a.filter(v=>v!==x):[...a,x];render()}
function ccCreate(){let f=S.cc,miss=!f.customer||!f.subject.trim()||!f.cats.length||!f.types.length||!f.depts.length;if(miss){f.err=true;render();return}
 let nums=Object.keys(CASE_DETAILS).map(k=>parseInt(String(k).replace(/\D/g,''))||0),id='CASE-'+(Math.max(...nums)+1),d=new Date(2026,9,9,12,30),p=n=>String(n).padStart(2,'0'),created=p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+d.getFullYear()+', '+p(d.getHours())+':'+p(d.getMinutes()),m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(f.requested||''),req=m?m[3]+'/'+m[2]+'/'+m[1]:'',ref=f.customer.replace(/[^A-Z0-9]/gi,'').slice(0,4).toUpperCase()+'-'+(2600+nums.length),depts=f.depts.join(', '),cats=f.cats.join(', '),types=f.types.join(', ');
 let c={id,customer:f.customer,caseClass:types,contact:'',email:'',phone:'',customerNo:'',goods:'',pickup:'',delivery:'',priority:f.priority,classification:cats,category:cats,subcategory:cats,requestedDate:req,due:req,status:'Pending',weight:'',subject:f.subject.trim(),body:'',departments:depts,reference:ref,confidence:100,created,attachments:[],note:'',classes:[],domain:'',source:'Manual'};
 CASE_DETAILS[id]=c;CASES.unshift([id,c.customer,c.caseClass,depts,c.priority,req||'—',c.status]);let made=(f.tasks||[]).map(x=>{let tid=nextTaskNumber();let row=[x.title,id,c.customer,x.dept,x.owner,f.priority,req||x.due,x.owner==='Unassigned'?'Unassigned':'Ready',tid,x.cls,'Later'];TASKS.push(row);return tid});c.classes=[...new Set((f.tasks||[]).map(x=>x.cls))];S.activities.unshift([id+' created manually'+(made.length?' · '+made.length+(made.length===1?' Task':' Tasks')+' created':''),actorName(),created]);S.ccOpen=false;S.selectedCase=id;toast(id+' created'+(made.length?' with '+made.length+(made.length===1?' Task':' Tasks'):'')+'. Add order details and contacts from the Case.');openCase(id)}
const caseCreateBase=cases;
cases=function(){let html=caseCreateBase();if(S.role==='User')return html;let tpl=document.createElement('template');tpl.innerHTML=html;let act=tpl.content.querySelector('.page-head .actions');if(act)act.insertAdjacentHTML('beforeend','<button class="btn primary" onclick="ccOpen(true)">+ Create Case</button>');if(S.ccOpen){let f=S.cc||(S.cc=CC_EMPTY()),R=window.AA_REVIEW||{},cust=(typeof MASTER_CUSTOMERS!=='undefined'&&MASTER_CUSTOMERS.length?[...new Set(MASTER_CUSTOMERS.map(c=>c.name))]:R.cust||[]),cats=R.cats||[],types=R.types||[],depts=R.depts||[],e=k=>f.err&&(Array.isArray(f[k])?!f[k].length:!f[k]),
 ccLabel=(l,req)=>l+(req?' <span style="color:#c51f2d">*</span>':''),
 ccChoice=(label,key,value,options,req,wide)=>'<label class="'+(wide?'wide':'')+'">'+ccLabel(label,req)+'<select style="'+(e(key)?'border-color:#c51f2d':'')+'" onchange="ccSet(\''+key+'\',this.value)"><option value="">Select '+label.toLowerCase()+'</option>'+options.map(x=>'<option '+(x===value?'selected':'')+'>'+editorText(x)+'</option>').join('')+'</select></label>',
 ccMulti=(label,key,arr,sel,fn,req)=>{let open=S.multiOpen==='cc-'+key,tags=sel.length?sel.map(x=>'<span class="multi-tag">'+editorText(x)+'</span>').join(''):'<span class="multi-placeholder">Select '+label.toLowerCase()+'</span>',menu=open?'<div class="multi-menu" role="listbox" aria-multiselectable="true">'+arr.map(x=>{let on=sel.includes(x);return '<button type="button" class="multi-option '+(on?'selected':'')+'" role="option" aria-selected="'+on+'" onclick="'+fn+'(\''+x+'\')"><span class="multi-check">'+(on?'✓':'')+'</span><span>'+editorText(x)+'</span></button>'}).join('')+'</div>':'';return '<div class="editor-multi"><span class="editor-multi-label">'+ccLabel(label,req)+'</span><div class="multi-anchor"><button type="button" class="multi-trigger" style="'+(e(key)?'border-color:#c51f2d':'')+'" aria-expanded="'+open+'" onclick="S.multiOpen=S.multiOpen===\'cc-'+key+'\'?null:\'cc-'+key+'\';render()"><span class="multi-tags">'+tags+'</span></button>'+menu+'</div></div>'};
let modal='<div onclick="if(event.target===this)ccOpen(false)" data-aa-style="aa-static-style-105"><div role="dialog" aria-label="Create Case" data-aa-style="aa-static-style-106"><div data-aa-style="aa-static-style-107"><div><strong data-aa-style="aa-static-style-108">Create Case</strong></div><button type="button" onclick="ccOpen(false)" aria-label="Close" data-aa-style="aa-static-style-110">×</button></div><div class="editor-grid" data-aa-style="aa-static-style-111">'
+ccChoice('Customer','customer',f.customer,cust,1)
+ccChoice('Priority','priority',f.priority,['Urgent', 'High', 'Medium', 'Low'],1)
+'<label class="wide">'+ccLabel('Subject',1)+'<input value="'+editorText(f.subject)+'" oninput="ccSet(\'subject\',this.value)" placeholder="Short description of the request" style="'+(e('subject')?'border-color:#c51f2d':'')+'"></label>'
+ccMulti('Category','cats',cats,f.cats,'ccCat',1)
+ccMulti('Case Type','types',types,f.types,'ccType',1)
+ccMulti('Departments','depts',depts,f.depts,'ccDept',1)
+'<label>'+ccLabel('Requested delivery date')+'<input type="date" value="'+editorText(f.requested)+'" onchange="ccSet(\'requested\',this.value)"></label>'
+(f.err?'<div class="wide" data-aa-style="aa-static-style-115">Complete the required fields marked *.</div>':'')
+'</div><div data-aa-style="aa-static-style-116"><span data-aa-style="aa-static-style-51">Source: Manual</span><span data-aa-style="aa-static-style-117"><button class="btn" onclick="ccOpen(false)">Cancel</button><button class="btn primary" onclick="ccCreate()">Create Case</button></span></div></div></div>';tpl.content.appendChild(document.createRange().createContextualFragment(modal))}return tpl.innerHTML};

RVF_LABEL.status='Case Status';RVF_LABEL.ack='Acknowledgement';
const cfStateBase=reviewerFilterState;
reviewerFilterState=function(){if(S.page==='cases')return S.cfs=S.cfs||{due:'All',dueFrom:'',dueTo:'',customer:[],department:[],category:[],subcategory:[],casetype:[],status:[],priority:[],ack:[]};return cfStateBase()};
function cfModal(on){rvfModalOpen(on)}
function cfMatch(c,m){let s=reviewerFilterState(),q=(S.caseQuery||'').toLowerCase(),inn=(k,v)=>{let want=rvfArr(s[k]);if(!want.length)return true;let have=String(v||'').split(',').map(x=>x.trim()).filter(Boolean);return have.some(x=>want.includes(x))};return(!q||(c.join(' ')+' '+m.subject).toLowerCase().includes(q))&&inn('customer',c[1])&&inn('category',m.category)&&inn('casetype',c[2])&&inn('status',c[6])&&inn('priority',c[4])&&inn('ack',m.ack)&&(!rvfArr(s.department).length||String(c[3]).split(',').map(x=>x.trim()).some(x=>rvfArr(s.department).includes(x)))&&(s.due==='All'||reviewerDueMatch(s,c[5]))}
function caseFilterBar(base,meta,count){let s=reviewerFilterState(),R=window.AA_REVIEW||{},keys=['customer','department','category','casetype','status','priority','ack'],n=keys.reduce((a,k)=>a+rvfArr(s[k]).length,0)+(s.due&&s.due!=='All'?1:0),uq=f=>[...new Set(base.map(f).filter(Boolean))].sort(),cust=uq(c=>c[1]),depts=R.depts||[],cats=R.cats||[],subs=R.subs||[],types=R.types||[],stat=uq(c=>c[6]),prios=['Urgent', 'High', 'Medium', 'Low'].filter(p=>base.some(c=>c[4]===p)),acks=['Acknowledged','Not sent'];
RVF_OPTS.customer=cust;RVF_OPTS.department=depts;RVF_OPTS.category=cats;RVF_OPTS.subcategory=subs;RVF_OPTS.casetype=types;RVF_OPTS.status=stat;RVF_OPTS.priority=prios;RVF_OPTS.ack=acks;
let chips=[];keys.forEach(k=>rvfArr(s[k]).forEach(v=>{chips.push([RVF_LABEL[k]+': '+v,"rvfRemoveVal('"+k+"','"+v.replace(/'/g,"\\'")+"')"])}));
if(s.due&&s.due!=='All')chips.push(['Due: '+rvfDueText(s),"rvfClearKey('due')"]);
let fl=(l,h)=>'<div data-aa-style="aa-static-style-67"><div data-aa-style="aa-static-style-118">'+l+'</div>'+h+'</div>';
let d=rvfDraft()||s,dn=keys.reduce((a,k)=>a+rvfArr(d[k]).length,0)+(d.due&&d.due!=='All'?1:0);
let modal=S.cfModal?'<div onclick="if(event.target===this)cfModal(false)" data-aa-style="aa-static-style-105"><div data-aa-style="aa-static-style-119"><div data-aa-style="aa-static-style-120"><div><strong data-aa-style="aa-static-style-108">Filters</strong><div data-aa-style="aa-static-style-121">Cases</div></div><button type="button" onclick="cfModal(false)" aria-label="Close" data-aa-style="aa-static-style-110">×</button></div><div data-aa-style="aa-static-style-122">'+fl('Customer',rvfMulti('customer',cust,d,true))+fl('Department',rvfMulti('department',depts,d))+fl('Category',rvfMulti('category',cats,d))+fl('Case Type',rvfMulti('casetype',types,d))+fl('Case Status',rvfMulti('status',stat,d))+fl('Priority',rvfMulti('priority',prios,d))+fl('Acknowledgement',rvfMulti('ack',acks,d))+fl('Due Date',rvfDueTrigger(d))+'</div><div data-aa-style="aa-static-style-116"><button type="button" onclick="resetReviewerFilters()" style="border:0;background:none;color:'+(dn?'#0871c7':'#a9b4c2')+';font:650 13px Inter,sans-serif;cursor:pointer">Clear all</button><button class="btn primary" data-aa-style="aa-static-style-73" onclick="rvfApply()">Apply Filter</button></div></div></div>':'';
return '<input value="'+editorText(S.caseQuery||'')+'" onchange="setCaseFilter(\'caseQuery\',this.value)" onkeyup="if(event.key===\'Enter\')setCaseFilter(\'caseQuery\',this.value)" placeholder="Search Cases, subjects or customers..."><button type="button" onclick="cfModal(true)" style="display:inline-flex;align-items:center;gap:8px;height:35px;padding:0 13px;border-radius:4px;border:1px solid '+(n?'var(--blue)':'var(--line)')+';background:'+(n?'var(--bluebg)':'#fff')+';color:'+(n?'#0869b6':'var(--ink)')+';font:650 12.5px Inter,sans-serif;cursor:pointer"><span>☰</span>Filters'+(n?'<span data-aa-style="aa-static-style-95">'+n+'</span>':'')+'</button>'+(n?'<button type="button" onclick="resetReviewerFilters()" data-aa-style="aa-static-style-96">Clear all</button>':'')+modal}

const CC_CLS={'Transport':'Transport booking','Packing':'Packing preparation','Freight forwarding':'Customs clearance','Warehouse':'Warehouse storage','Inbound/Outbound':'Warehouse storage','Finance':'Export documentation','Sales':'Transport follow-up'};
function ccBuildTasks(f){let TSK=(window.AA_REVIEW||{}).tsk||{},tsk=[],seen=new Set();(f.types||[]).forEach(t=>(TSK[t]||[]).forEach(x=>{if(!seen.has(x[0])){seen.add(x[0]);tsk.push(x)}}));let due=(()=>{let m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(f.requested||'');return m?m[3]+'/'+m[2]+'/'+m[1]:'16/10/2026'})(),out=tsk.filter(x=>f.depts.includes(x[1])).map(x=>({title:x[0],dept:x[1],owner:x[2],due,cls:CC_CLS[x[1]]||'Transport booking'}));f.depts.forEach(d=>{if(!out.some(x=>x.dept===d))out.push({title:'Coordinate '+d+' work for '+f.cats.join(', '),dept:d,owner:'Unassigned',due,cls:CC_CLS[d]||'Transport booking'})});return out}
function ccReview(){let f=S.cc,miss=!f.customer||!f.subject.trim()||!f.cats.length||!f.types.length||!f.depts.length;if(miss){f.err=true;render();return}f.tasks=ccBuildTasks(f);f.step='review';render()}
function ccBack(){S.cc.step='form';render()}
function ccAssignees(x){let names=USERS.filter(u=>u.role==='User'&&u.department===x.dept).map(u=>u.name);if(!names.length)names=USERS.filter(u=>u.role==='User').map(u=>u.name);if(x.owner&&x.owner!=='Unassigned'&&!names.includes(x.owner))names.unshift(x.owner);return ['Unassigned',...names]}
function ccAssign(i,v){S.cc.tasks[i].owner=v;render()}
if(!document.getElementById('cc-align-style'))document.head.insertAdjacentHTML('beforeend','<style id="cc-align-style">[aria-label="Create Case"] .editor-grid>label>select,[aria-label="Create Case"] .editor-grid>label>.ds-combo,.assign-modal .editor-grid>label>select,.assign-modal .editor-grid>label>.ds-combo{display:block;margin:0!important;position:relative;top:0;height:34px;width:100%;box-sizing:border-box}</style>');
function ccDrop(i){S.cc.tasks.splice(i,1);render()}
const caseCreateReviewBase=cases;
cases=function(){let html=caseCreateReviewBase();if(!S.ccOpen||!S.cc)return html;let tpl=document.createElement('template');tpl.innerHTML=html;let dlg=tpl.content.querySelector('[aria-label="Create Case"]');if(!dlg)return html;
if(S.cc.step!=='review'){tpl.innerHTML=html.replace('onclick="ccCreate()">Create Case</button>','onclick="ccReview()">Review Tasks ›</button>');return tpl.innerHTML}
let f=S.cc,n=f.tasks.length,hd='font:700 11px Inter,sans-serif;text-transform:uppercase;letter-spacing:.06em;color:#6b778a',row=(x,i)=>'<div data-aa-style="aa-static-style-123"><div data-aa-style="aa-static-style-67"><strong data-aa-style="aa-static-style-108">'+editorText(x.title)+'</strong><div class="sub">Due '+x.due+'</div></div><span>'+editorText(x.dept)+'</span><select aria-label="Assignee" onchange="ccAssign('+i+',this.value)" style="width:100%;height:32px;border:1px solid var(--line);border-radius:4px;background:#fff;padding:0 8px;font:12.5px Inter,sans-serif;color:'+(x.owner==='Unassigned'?'#6b778a':'#14233a')+'">'+ccAssignees(x).map(n=>'<option '+(n===x.owner?'selected':'')+'>'+editorText(n)+'</option>').join('')+'</select><button type="button" onclick="ccDrop('+i+')" title="Remove Task" aria-label="Remove Task" data-aa-style="aa-static-style-124" onmouseover="this.style.color=\'#c51f2d\'" onmouseout="this.style.color=\'#8a96a8\'">×</button></div>';
let modal='<div onclick="if(event.target===this)ccOpen(false)" data-aa-style="aa-static-style-105"><div role="dialog" aria-label="Create Case" data-aa-style="aa-static-style-125"><div data-aa-style="aa-static-style-107"><div><strong data-aa-style="aa-static-style-108">Review Tasks</strong><div data-aa-style="aa-static-style-109">'+(n?n+(n===1?' Task':' Tasks'):'No Tasks')+' will be created with this Case. Remove any you do not need.</div></div><button type="button" onclick="ccOpen(false)" aria-label="Close" data-aa-style="aa-static-style-110">×</button></div><div data-aa-style="aa-static-style-126"><span><b>'+editorText(f.subject)+'</b></span></div><div data-aa-style="aa-static-style-127"><span style="'+hd+'">Task</span><span style="'+hd+'">Department</span><span style="'+hd+'">Assignee</span><span></span></div><div data-aa-style="aa-static-style-128">'+(n?f.tasks.map(row).join(''):'<div data-aa-style="aa-static-style-129">No Tasks selected. The Case will be created empty and Tasks can be added later.</div>')+'</div><div data-aa-style="aa-static-style-116"><button class="btn" data-aa-style="aa-static-style-73" onclick="ccBack()">‹ Back</button><span data-aa-style="aa-static-style-117"><button class="btn" onclick="ccOpen(false)">Cancel</button><button class="btn primary" data-aa-style="aa-static-style-73" onclick="ccCreate()">Approve &amp; Create Case</button></span></div></div></div>';
dlg.parentElement.remove();tpl.content.appendChild(document.createRange().createContextualFragment(modal));return tpl.innerHTML};

/* --- Task drawer refinements: drop Task Type & Assignment section, add Assignee avatar, reverse "Blocking" visibility --- */
function blockingTasks(t){return TASKS.filter(x=>x[1]===t[1]&&x[8]!==t[8]&&dependencyIds(x[8]).includes(t[8]))}
const finalKanbanCardBase=kanbanCard;
kanbanCard=function(t){
    let html=finalKanbanCardBase(t),template=document.createElement('template');template.innerHTML=html;
    let foot=template.content.querySelector('.kanban-card-foot');
    if(foot){
        let comments=(S.comments[t[8]]||[]).length,files=(S.attachments[t[8]]||[]).length,blocked=unresolvedDependencies(t).length,spans=[...foot.querySelectorAll('span')].filter(s=>!s.classList.contains('drag-help')),
            commentIcon='<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-1px"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
            dependencyIcon='<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-1px"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
        if(spans[0]){if(comments){spans[0].innerHTML=`${commentIcon} ${comments}`;spans[0].setAttribute('title',comments===1?'1 comment':`${comments} comments`)}else spans[0].remove()}
        if(spans[1]){if(files)spans[1].textContent=`▧ ${files}`;else spans[1].remove()}
        if(spans[2]){if(blocked){spans[2].innerHTML=`${dependencyIcon} ${blocked}`;spans[2].setAttribute('title',blocked===1?'Blocked by 1 dependency':`Blocked by ${blocked} dependencies`)}else spans[2].remove()}
    }
    return template.innerHTML;
};
document.head.insertAdjacentHTML('beforeend',`<style>.structured-task-blocking .dependency-option,.dependency-editor .dependency-option{border-bottom:1px solid var(--line)}.structured-task-blocking .dependency-option:last-child{border-bottom:0}</style>`);

/* Photorealistic staff portraits enabled throughout the application */
var USER_PHOTO_CELLS_EXT = window.USER_PHOTO_CELLS_EXT = {
  john: [1, 0],
  maria: [0, 0],
  sofia: [2, 0],
  erik: [3, 0],
  oskar: [0, 1],
  emma: [1, 1],
  andreas: [2, 1],
  karin: [3, 1],
  elin: [0, 2],
  lars: [1, 2],
  thomas: [2, 2],
  daniel: [3, 2],
  admin: [3, 2],
  [typeof SYSTEM_ADMIN_ID !== 'undefined' ? SYSTEM_ADMIN_ID : 'daniel']: [3, 2]
};

function resolveUserForAvatar(node) {
  if (!node) return null;
  let uid = node.dataset?.userId || node.getAttribute('data-user-id');
  if (uid) {
    let u = USERS.find(x => x.id === uid);
    if (u) return u;
  }

  let title = node.title || node.getAttribute('aria-label') || '';
  if (title) {
    if (title.includes('Daniel Frölander') || title.includes('Admin')) return { id: 'daniel', name: 'Daniel Frölander' };
    if (title.includes('Thomas Weber')) return { id: 'thomas', name: 'Thomas Weber' };
    if (title.includes('Maria Nilsson') || title.includes('Maria Svensson')) return { id: 'maria', name: 'Maria Svensson' };
    if (title.includes('Erik Johansson') || title.includes('Erik Karlsson')) return { id: 'erik', name: 'Erik Karlsson' };
    let u = USERS.find(x => title.includes(x.name) || title.includes(x.id));
    if (u) return u;
  }

  let text = String(node.textContent || '').trim();
  if (text === '—' || text === '-' || text.toLowerCase() === 'unassigned' || text === 'System') return null;

  if (text && text.length <= 3) {
    let u = USERS.find(x => x.initials === text);
    if (u) return u;
    if (text === 'DF') return { id: 'daniel', name: 'Daniel Frölander' };
    if (text === 'TW') return { id: 'thomas', name: 'Thomas Weber' };
    if (text === 'MN' || text === 'MS') return { id: 'maria', name: 'Maria Svensson' };
    if (text === 'EJ' || text === 'EK') return { id: 'erik', name: 'Erik Karlsson' };
    if (text === 'JA') return { id: 'john', name: 'John Andersson' };
    if (text === 'EM') return { id: 'emma', name: 'Emma Karlsson' };
    if (text === 'AN') return { id: 'andreas', name: 'Andreas Nilsson' };
    if (text === 'KH') return { id: 'karin', name: 'Karin Holm' };
    if (text === 'OB') return { id: 'oskar', name: 'Oskar Berg' };
    if (text === 'LB') return { id: 'lars', name: 'Lars Berg' };
    if (text === 'ES') return { id: 'elin', name: 'Elin Sjöberg' };
    if (text === 'SL') return { id: 'sofia', name: 'Sofia Lind' };
  }

  let container = node.closest('button, tr, li, .mention, .comment, .team-member, .profile-trigger, .assignee-cell, .people-row, .task-comment-item, .task-inspector, .attention, .person, .task-comment-mini') || node.parentElement;
  if (container) {
    let cText = container.textContent || '';
    if (cText.includes('Unassigned') && !cText.includes('John Andersson') && !cText.includes('Maria') && !cText.includes('Sofia')) return null;
    if (cText.includes('Daniel Frölander') || cText.includes('System Administrator')) return { id: 'daniel', name: 'Daniel Frölander' };
    if (cText.includes('Thomas Weber')) return { id: 'thomas', name: 'Thomas Weber' };
    if (cText.includes('Maria Nilsson') || cText.includes('Maria Svensson')) return { id: 'maria', name: 'Maria Svensson' };
    if (cText.includes('Erik Johansson') || cText.includes('Erik Karlsson')) return { id: 'erik', name: 'Erik Karlsson' };
    if (cText.includes('John Andersson')) return { id: 'john', name: 'John Andersson' };
    if (cText.includes('Andreas Nilsson')) return { id: 'andreas', name: 'Andreas Nilsson' };
    if (cText.includes('Karin Holm')) return { id: 'karin', name: 'Karin Holm' };
    if (cText.includes('Sofia Lind')) return { id: 'sofia', name: 'Sofia Lind' };
    if (cText.includes('Emma Karlsson')) return { id: 'emma', name: 'Emma Karlsson' };
    if (cText.includes('Oskar Berg')) return { id: 'oskar', name: 'Oskar Berg' };
    if (cText.includes('Lars Berg')) return { id: 'lars', name: 'Lars Berg' };
    if (cText.includes('Elin Sjöberg')) return { id: 'elin', name: 'Elin Sjöberg' };
    let u = USERS.find(x => cText.includes(x.name));
    if (u) return u;
  }

  if (node.closest('.profile-trigger')) {
    return typeof currentUser === 'function' ? currentUser() : { id: 'john', name: 'John Andersson' };
  }

  return null;
}

applyUserPhoto = function (node, user) {
  if (!node || !user) return;
  let cell = USER_PHOTO_CELLS_EXT[user.id] || USER_PHOTO_CELLS_EXT[String(user.name || '').toLowerCase().split(' ')[0]];
  if (!cell) return;
  if (node.dataset && node.dataset.photoApplied === user.id) return;
  if (node.dataset) node.dataset.photoApplied = user.id;

  node.classList.add('profile-photo');
  node.style.setProperty('--photo-x', `${cell[0] * 100 / 3}%`);
  node.style.setProperty('--photo-y', `${cell[1] * 50}%`);
  node.style.backgroundImage = "url('assets/team-profile-photos.png')";
  node.style.backgroundRepeat = "no-repeat";
  node.style.backgroundSize = "400% 300%";
  node.style.backgroundPosition = `${cell[0] * 100 / 3}% ${cell[1] * 50}%`;
  node.style.color = "transparent";
  node.setAttribute('role', 'img');
  node.setAttribute('aria-label', `${user.name || ''} profile photo`);
  node.title = user.name || '';
};

decorateUserPhotos = function () {
  document.querySelectorAll('.avatar, .mini-avatar, .row-avatar, .comm-avatar').forEach(node => {
    if (node.closest('select')) return;
    let user = resolveUserForAvatar(node);
    if (user) {
      applyUserPhoto(node, user);
    }
  });

  document.querySelectorAll('.drop-menu button[onclick^="selectUser("]').forEach(button => {
    let match = button.getAttribute('onclick')?.match(/selectUser\('([^']+)'\)/);
    let userId = match ? match[1] : '';
    let user = USERS.find(item => item.id === userId) || (typeof SYSTEM_ADMIN_ID !== 'undefined' && userId === SYSTEM_ADMIN_ID ? { id: 'daniel', name: 'Daniel Frölander' } : null);
    let photo = button.querySelector('.profile-menu-photo') || button.querySelector('.avatar');
    if (!photo) {
      photo = document.createElement('span');
      photo.className = 'avatar profile-menu-photo';
      button.prepend(photo);
    }
    if (user) applyUserPhoto(photo, user);
  });
};

/* Attach observer for continuous dynamic decoration */
(function() {
  let _avatarRaf = null;
  function scheduleDecorate() {
    if (_avatarRaf) return;
    _avatarRaf = requestAnimationFrame(() => {
      _avatarRaf = null;
      decorateUserPhotos();
    });
  }
  if (typeof MutationObserver !== 'undefined' && !window._avatarObsInit) {
    window._avatarObsInit = true;
    const obs = new MutationObserver(scheduleDecorate);
    if (document.body) {
      obs.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        obs.observe(document.body, { childList: true, subtree: true });
      });
    }
  }
})();

document.head.insertAdjacentHTML('beforeend', `<style>
  .avatar.profile-photo,
  .mini-avatar.profile-photo,
  .row-avatar.profile-photo,
  .comm-avatar.profile-photo,
  .profile-menu-photo.profile-photo {
    background-image: url('assets/team-profile-photos.png') !important;
    background-repeat: no-repeat !important;
    background-size: 400% 300% !important;
    background-position: var(--photo-x, 0%) var(--photo-y, 0%) !important;
    color: transparent !important;
    font-size: 0 !important;
    line-height: 0 !important;
    text-indent: -9999px !important;
    overflow: hidden !important;
    border-radius: 50% !important;
    display: inline-block !important;
    box-shadow: inset 0 0 0 1px rgba(12, 42, 68, 0.12) !important;
  }
  .row-avatar {
    width: 24px !important;
    height: 24px !important;
    border-radius: 50% !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex: 0 0 24px !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    background: #dfe8f3 !important;
    color: #34475c !important;
    vertical-align: middle !important;
    margin-right: 6px !important;
  }
  .assignee-cell {
    display: inline-flex !important;
    align-items: center !important;
  }
  .profile-menu-photo {
    display: inline-block !important;
    flex: 0 0 32px !important;
    width: 32px !important;
    height: 32px !important;
    margin-right: 10px !important;
    vertical-align: middle !important;
    border-radius: 50% !important;
  }
  .drop-menu button[onclick^="selectUser("] {
    display: grid !important;
    grid-template-columns: 32px 1fr !important;
    align-items: center !important;
    text-align: left !important;
  }
  .drop-menu button[onclick^="selectUser("] strong,
  .drop-menu button[onclick^="selectUser("] small {
    grid-column: 2 !important;
  }
  .drop-menu button[onclick^="selectUser("] .profile-menu-photo {
    grid-column: 1 !important;
    grid-row: 1/3 !important;
  }
</style>`);
/* --- Role-based Home dashboards: Reviewer, Department Head and Department User analytics --- */
function volumeChart(groups,labelA,labelB){let max=Math.max(1,...groups.flatMap(g=>[g[1],g[2]]));return `<div class="volume-legend"><span><i class="received"></i>${labelA}</span><span><i class="processed"></i>${labelB}</span></div><div class="volume-chart" style="--volume-count:${groups.length}">${groups.map(g=>`<div class="volume-group"><div class="volume-bars"><span class="volume-bar received" style="height:${Math.max(8,g[1]/max*118)}px" title="${g[1]} ${labelA}"><b>${g[1]}</b></span><span class="volume-bar processed" style="height:${Math.max(8,g[2]/max*118)}px" title="${g[2]} ${labelB}"><b>${g[2]}</b></span></div><small>${g[0]}</small></div>`).join('')}</div>`}
function reviewerResponseSamples(){let samples=[];Object.keys(CASE_DETAILS).forEach(id=>{let msgs=S.communications.filter(m=>m.caseId===id),incoming=msgs.find(m=>m.direction==='Incoming'),outgoing=msgs.find(m=>m.direction==='Outgoing');if(incoming&&outgoing){let mins=(dateValue(outgoing.at)-dateValue(incoming.at))/60000;if(mins>0)samples.push({id,mins,at:incoming.at})}});return samples.sort((a,b)=>dateValue(a.at)-dateValue(b.at))}
function responseTrendCard(title,subtitle,samples){let avg=samples.length?Math.round(samples.reduce((n,s)=>n+s.mins,0)/samples.length):0,values=samples.slice(-7).map(s=>Math.round(s.mins));while(values.length<2)values.push(avg||1);return `<section class="card reviewer-mini-chart"><div class="card-head"><div><h2>${title}</h2><span class="sub">${subtitle}</span></div></div><div data-aa-style="aa-static-style-132"><strong>${avg} min</strong><span class="sub" data-aa-style="aa-static-style-133">avg across ${samples.length} ${samples.length===1?'case':'cases'}</span>${analyticsLine(values)}</div></section>`}
function replaceCardByTitle(template,titleText,newHtml){let card=[...template.content.querySelectorAll('.card')].find(c=>c.querySelector('h2')?.textContent.trim()===titleText);if(card&&newHtml){let wrap=document.createElement('div');wrap.innerHTML=newHtml;card.replaceWith(wrap.firstElementChild)}}

/* Reviewer Home: classification mix, review queue health, SLA tracking, top customers, response time. */
function reviewerClassificationMix(){return analyticsCard('Requests by Category','All Cases grouped by category',analyticsDonut(groupedCounts(Object.values(CASE_DETAILS),c=>c.classification,6)))}
function reviewerQueueStatusChart(){let items=[['Awaiting Review',QUEUE.filter(q=>q[6]==='Awaiting Review').length],['Needs Clarification',QUEUE.filter(q=>q[6]==='Needs Clarification').length],['Approved Requests',APPROVED_REQUESTS.length]];return analyticsCard('Review Queue by Status','Current requests by stage',analyticsBars(items))}
function reviewerSlaOverview(){let cases=Object.values(CASE_DETAILS).filter(c=>c.status!=='Completed'),buckets=[['On Track',0],['Due Soon',0],['Overdue',0]];cases.forEach(c=>{let days=(dateValue(c.due)-dateValue(OPERATION_DATE))/86400000;if(days<0)buckets[2][1]++;else if(days<=2)buckets[1][1]++;else buckets[0][1]++});return analyticsCard('SLA / Due Date Overview',`${cases.length} open requests tracked against due date`,analyticsDonut(buckets))}
function reviewerTopCustomersChart(){let counts=groupedCounts(Object.values(CASE_DETAILS),c=>c.customer,5).map((x,i)=>[x[0],x[1],ANALYTIC_COLORS[i%ANALYTIC_COLORS.length]]);return reviewerHorizontalChart('Top Customers','Customers with the most requests',counts)}
function reviewerWaitingTable(){let rows=reviewerActionRows('Requires Follow-up');if(!rows.length)return '';return `<section class="card reviewer-attention"><div class="card-head"><div><h2>Waiting for Customer Response</h2><span class="sub">Customer information requested; awaiting their reply</span></div><button class="link" onclick="openReviewerActionView('Requires Follow-up')">View all</button></div><div class="table-wrap"><table><thead><tr><th>Reference</th><th>Customer</th><th>Requested On</th><th>Waiting Since</th><th>Priority</th></tr></thead><tbody>${rows.map(row=>{let days=Math.max(0,Math.round((dateValue(OPERATION_DATE)-dateValue(row[5]))/86400000));return `<tr tabindex="0" onclick="openReviewCase('${row[0]}')"><td><strong class="id">${row[0]}</strong></td><td>${editorText(row[1])}</td><td>${editorText(row[5])}</td><td>${days} ${days===1?'day':'days'}</td><td>${pill(requestPriority(row))}</td></tr>`}).join('')}</tbody></table></div></section>`}
const extendedReviewerHomeBase=reviewerDashboardHome;
reviewerDashboardHome=function(){let template=document.createElement('template');template.innerHTML=extendedReviewerHomeBase();let extra=`<div class="reviewer-secondary-grid">${reviewerClassificationMix()}${reviewerSlaOverview()}</div><div class="reviewer-secondary-grid">${reviewerQueueStatusChart()}${reviewerTopCustomersChart()}</div>${reviewerWaitingTable()}${responseTrendCard('First Customer Response Time','Average time to send the first qualifying reply',reviewerResponseSamples())}`;template.innerHTML=template.innerHTML+extra;return template.innerHTML};

/* Department Head Home: attention queue plus department-wide analytics. */
function managerDeptCases(){let u=currentUser();return Object.values(CASE_DETAILS).filter(c=>c.departments.includes(u.department))}
function managerAttentionQueue(){let u=currentUser(),team=TASKS.filter(t=>t[3]===u.department).filter(t=>effectiveTaskStatus(t)!=='Completed'),rows=team.filter(t=>t[4]==='Unassigned'||taskDeadlineState(t)==='Overdue'||taskDeadlineState(t)==='Due Today'||unresolvedDependencies(t).length).sort((a,b)=>{let rank=x=>x[4]==='Unassigned'?0:taskDeadlineState(x)==='Overdue'?1:taskDeadlineState(x)==='Due Today'?2:3;return rank(a)-rank(b)}).slice(0,6);if(!rows.length)return '';return `<section class="card"><div class="card-head"><div><h2>Department Head Attention Queue</h2><span class="sub">Tasks that may need your intervention or reassignment</span></div><button class="link" onclick="go('department')">View All</button></div><div class="table-wrap"><table><thead><tr><th>Task Ref</th><th>Assignee</th><th>Task</th><th>Priority</th><th>Due</th><th>Risk</th><th>Action</th></tr></thead><tbody>${rows.map(t=>{let risk=t[4]==='Unassigned'?'Unclaimed task':unresolvedDependencies(t).length?`Blocked by ${unresolvedDependencies(t).length} ${unresolvedDependencies(t).length===1?'Task':'Tasks'}`:taskDeadlineState(t)==='Overdue'?'Overdue':'Due today';return `<tr tabindex="0" onclick="openTask('${t[8]}')"><td><strong class="id">${t[8]}</strong></td><td>${t[4]==='Unassigned'?'<span class="sub">Unassigned</span>':`<span class="assignee-cell"><span class="row-avatar">${casePersonInitials(t[4])}</span>${editorText(t[4])}</span>`}</td><td>${editorText(t[0])}</td><td>${pill(t[5])}</td><td>${editorText(t[6])}</td><td><span class="pill ${risk==='Overdue'?'red':risk==='Unclaimed task'?'amber':'blue'}">${editorText(risk)}</span></td><td><button class="btn" onclick="event.stopPropagation();openTask('${t[8]}')">Open</button></td></tr>`}).join('')}</tbody></table></div></section>`}
function managerIncomingVsCompletedChart(){let u=currentUser(),team=TASKS.filter(t=>t[3]===u.department),dates=[...new Set(team.map(t=>t[6]))].sort((a,b)=>dateValue(a)-dateValue(b)).slice(0,6),groups=dates.map(d=>[d,team.filter(t=>t[6]===d).length,team.filter(t=>t[6]===d&&t[7] === 'Completed').length]);return `<section class="card reviewer-chart-card"><div class="card-head"><div><h2>Incoming vs Completed</h2><span class="sub">${u.department} Tasks grouped by due date</span></div></div>${volumeChart(groups,'Total','Completed')}</section>`}
function managerWorkloadChart(){let u=currentUser(),members=USERS.filter(x=>x.department===u.department),groups=members.map(m=>{let mine=TASKS.filter(t=>t[4]===m.name);return [m.name.split(' ')[0],mine.filter(t=>effectiveTaskStatus(t)!=='Completed').length,mine.filter(t=>taskDeadlineState(t)==='Overdue').length]});return `<section class="card reviewer-chart-card"><div class="card-head"><div><h2>Member Workload</h2><span class="sub">Open Tasks vs overdue, by owner</span></div></div>${volumeChart(groups,'Open','Overdue')}</section>`}
function managerOverdueDurationChart(){let u=currentUser(),overdue=TASKS.filter(t=>t[3]===u.department&&taskDeadlineState(t)==='Overdue'),buckets=[['1-2 days',0],['3-5 days',0],['6+ days',0]];overdue.forEach(t=>{let days=Math.round((dateValue(OPERATION_DATE)-dateValue(t[6]))/86400000);if(days<=2)buckets[0][1]++;else if(days<=5)buckets[1][1]++;else buckets[2][1]++});return analyticsCard('Overdue Tasks by Duration',`${overdue.length} overdue Tasks in ${u.department}`,analyticsBars(buckets))}
function managerStatusDonut(){let u=currentUser(),team=TASKS.filter(t=>t[3]===u.department),items=['To-Do', 'In Progress', 'On Hold', 'Completed'].map(s=>[s,team.filter(t=>effectiveTaskStatus(t)===s).length]);return analyticsCard('Task Status Distribution',`${team.length} Tasks in ${u.department}`,analyticsDonut(items))}
function managerCompletionByType(){let u=currentUser(),team=TASKS.filter(t=>t[3]===u.department&&t[7] === 'Completed'),types=[...new Set(team.map(t=>t[9]))].slice(0,6),items=types.map(type=>{let rows=team.filter(t=>t[9]===type),onTime=rows.filter(t=>completionOutcome(t)!=='Completed Late').length;return [type,rows.length?Math.round(onTime/rows.length*100):0]});return analyticsCard('Avg Task Completion Time by Type','On-time completion share for completed Tasks, by category',analyticsBars(items))}
function managerCategoryDonut(){let u=currentUser(),team=TASKS.filter(t=>t[3]===u.department);return analyticsCard('Department Task Volume by Category',`${team.length} Tasks by category`,analyticsDonut(groupedCounts(team,t=>t[9],6)))}
function managerCasesByCategoryDonut(){let cases=managerDeptCases();return analyticsCard('Cases by Category',`${cases.length} Cases involving ${currentUser().department}`,analyticsDonut(groupedCounts(cases,c=>c.classification,6)))}
function managerCasesByClassDonut(){let cases=managerDeptCases();return analyticsCard('Cases by Case Class','Cases grouped by case class',analyticsDonut(groupedCounts(cases,c=>c.caseClass,6)))}
const extendedManagerHomeBase=managerHome;
managerHome=function(){let u=currentUser(),html=extendedManagerHomeBase(),attention=managerAttentionQueue();html=html.replace('<div class="card"><div class="card-head"><h2>Team Workload</h2>',attention+'<div class="card"><div class="card-head"><h2>Team Workload</h2>');let caseIds=new Set(managerDeptCases().map(c=>c.id)),samples=reviewerResponseSamples().filter(s=>caseIds.has(s.id));let charts=`<div class="reviewer-secondary-grid">${managerIncomingVsCompletedChart()}${managerWorkloadChart()}</div><div class="reviewer-secondary-grid">${managerOverdueDurationChart()}${managerStatusDonut()}</div><div class="reviewer-secondary-grid">${managerCasesByClassDonut()}</div>`;return html+charts};

/* Department User Home: live mentions, department tasks available, dependency queue, personal analytics. */
function userMentionsFeed(){let u=currentUser(),mine=S.mentionNotifications.filter(n=>n.recipientId===u.id).slice(0,5);if(!mine.length)return '';return `<div class="card"><div class="card-head"><div><h2>Mentions</h2><span class="sub">${mine.filter(n=>!n.read).length} unread</span></div><button class="link" onclick="S.notificationMenu=true;render()">View All</button></div><div class="attention-list">${mine.map(n=>`<div class="attention"><span class="avatar">${casePersonInitials(n.from)}</span><div><strong>${editorText(n.from)} mentioned you</strong><span class="sub">${editorText(n.comment||'')}</span></div><button class="link" onclick="openMentionNotification('${n.id}')">Open</button></div>`).join('')}</div></div>`}
function userDeptTasksAvailable(){let u=currentUser(),rows=TASKS.filter(t=>t[3]===u.department&&t[4]==='Unassigned').slice(0,6);if(!rows.length)return '';return `<section class="card"><div class="card-head"><div><h2>Department Tasks Available</h2><span class="sub">Unassigned work in ${u.department} you can take</span></div><button class="link" onclick="go('mytasks')">View All</button></div><div class="table-wrap"><table><thead><tr><th>Task Ref</th><th>Task Title</th><th>Customer</th><th>Priority</th><th>Due</th><th>Action</th></tr></thead><tbody>${rows.map(t=>`<tr tabindex="0" onclick="openTask('${t[8]}')"><td><strong class="id">${t[8]}</strong></td><td>${editorText(t[0])}</td><td>${editorText(t[2])}</td><td>${pill(t[5])}</td><td>${editorText(t[6])}</td><td><button class="btn primary take-task-button" onclick="event.stopPropagation();takeDepartmentTask('${t[8]}')">Take Task</button></td></tr>`).join('')}</tbody></table></div></section>`}
function userUpcomingDependencyTable(){let u=currentUser(),rows=TASKS.filter(t=>t[4]===u.name&&unresolvedDependencies(t).length);if(!rows.length)return '';return `<section class="card"><div class="card-head"><div><h2>Upcoming Tasks (Waiting on Dependency)</h2><span class="sub">Blocked until another Task completes</span></div></div><div class="table-wrap"><table><thead><tr><th>Task Ref</th><th>Task Title</th><th>Depends On</th><th>Due</th><th>Status</th></tr></thead><tbody>${rows.map(t=>`<tr tabindex="0" onclick="openTask('${t[8]}')"><td><strong class="id">${t[8]}</strong></td><td>${editorText(t[0])}</td><td>${unresolvedDependencies(t).map(d=>d[8]).join(', ')}</td><td>${editorText(t[6])}</td><td>${pill('Waiting')}</td></tr>`).join('')}</tbody></table></div></section>`}
function userAssignedVsCompletedChart(){let u=currentUser(),mine=TASKS.filter(t=>t[4]===u.name),dates=[...new Set(mine.map(t=>t[6]))].sort((a,b)=>dateValue(a)-dateValue(b)).slice(0,6),groups=dates.map(d=>[d,mine.filter(t=>t[6]===d).length,mine.filter(t=>t[6]===d&&t[7] === 'Completed').length]);return `<section class="card reviewer-chart-card"><div class="card-head"><div><h2>Assigned vs Completed</h2><span class="sub">My Tasks grouped by due date</span></div></div>${volumeChart(groups,'Assigned','Completed')}</section>`}
function userStatusDonut(){let u=currentUser(),mine=TASKS.filter(t=>t[4]===u.name),items=['To-Do', 'In Progress', 'On Hold', 'Completed'].map(s=>[s,mine.filter(t=>effectiveTaskStatus(t)===s).length]);return analyticsCard('Task Status Distribution',`${mine.length} Tasks assigned to me`,analyticsDonut(items))}
function userOnTimeDonut(){let u=currentUser(),completed=TASKS.filter(t=>t[4]===u.name&&t[7] === 'Completed'),items=['Completed Early','Completed On Time','Completed Late'].map(o=>[o.replace('Completed ',''),completed.filter(t=>completionOutcome(t)===o).length]);return analyticsCard('My On-Time Performance',`${completed.length} completed Tasks`,analyticsDonut(items))}
function userCompletionByType(){let u=currentUser(),mine=TASKS.filter(t=>t[4]===u.name&&t[7] === 'Completed'),types=[...new Set(mine.map(t=>t[9]))].slice(0,6),items=types.map(type=>{let rows=mine.filter(t=>t[9]===type),onTime=rows.filter(t=>completionOutcome(t)!=='Completed Late').length;return [type,rows.length?Math.round(onTime/rows.length*100):0]});return analyticsCard('Task Completion Time by Type','Share of my completed Tasks finished on or before due date',analyticsBars(items))}
function userCategoryDonut(){let u=currentUser(),mine=TASKS.filter(t=>t[4]===u.name);return analyticsCard('Tasks by Category',`${mine.length} Tasks by category`,analyticsDonut(groupedCounts(mine,t=>t[9],6)))}
function userCompletionTrendChart(){let u=currentUser(),completed=TASKS.filter(t=>t[4]===u.name&&t[7] === 'Completed'),byDay=[0,0,0,0,0,0,0];completed.forEach(t=>{let r=TASK_COMPLETIONS[t[8]];if(!r)return;let d=new Date(dateValue(r.at));if(!isNaN(d))byDay[d.getDay()]++});let order=[5,6,0,1,2,3,4],values=order.map(i=>byDay[i]||.3);return `<section class="card reviewer-mini-chart"><div class="card-head"><div><h2>Weekly Completions</h2><span class="sub">Tasks I completed, by day of week</span></div></div><div data-aa-style="aa-static-style-132">${analyticsLine(values)}</div></section>`}
const extendedUserHomeBase=userHome;
userHome=function(){let template=document.createElement('template');template.innerHTML=extendedUserHomeBase();replaceCardByTitle(template,'Recent Mentions',userMentionsFeed());let extra=`${userDeptTasksAvailable()}${userUpcomingDependencyTable()}<div class="reviewer-secondary-grid">${userAssignedVsCompletedChart()}${userStatusDonut()}</div><div class="reviewer-secondary-grid">${userOnTimeDonut()}${userCategoryDonut()}</div><div class="reviewer-secondary-grid" style="grid-template-columns:1fr">${userCompletionTrendChart()}</div>`;template.innerHTML=template.innerHTML+extra;return template.innerHTML};
render();

/* Admin navigation: Masters sub-pages and Configuration menu. */
const MASTER_SUB_PAGES = [['Categories','Categories','What kind of service a request is about.'],['Case Classes','Case Classes','Case Classes describe the kind of work and the data it needs.'],['Task Master','Task Master','Predefined work generated for confirmed services and Case Classes.'],['Customers','Customers','Customer master data used to identify and route Cases.'],['Rules','Rules','Rules that adjust priority and work for a specific customer.'],['Required Data','Required Data','What must be known before the next operational step can happen.'],['Mailboxes','Mailboxes','Where messages arrive and which sender address people can write from.']];
function openMasterPage(tab){S.page='masters';S.masterTab=tab;S.drawer=false;S.profileMenu=false;S.notificationMenu=false;render()}
function isAdminMasterNav(){return S.role==='Admin'&&!isReviewerProfile()}
masterManagement=function(){if(S.role!=='Admin')return head('Access denied','Master Data is available only to the Admin.');let tab=S.masterTab||'Task Master';let page=MASTER_SUB_PAGES.find(x=>x[0]===tab)||MASTER_SUB_PAGES[2];return head(page[1],page[2],'<span class="read-only-label">Fixed reference data</span>')+'<div class="master-content">'+masterContent()+'</div>'};
const adminSubNavShellBase=shell;
shell=function(body){let html=adminSubNavShellBase(body);if(!isAdminMasterNav())return html;let template=document.createElement('template');template.innerHTML=html;let nav=template.content.querySelector('.sidebar .nav');if(!nav)return html;
let collapsed=S.navCollapsed,onSettings=S.page==='masters'&&S.masterTab==='Settings',onMasters=S.page==='masters'&&!onSettings;
let makeBtn=(cls,onclick,label,icon)=>{let b=document.createElement('button');b.className=cls;b.setAttribute('onclick',onclick);b.setAttribute('aria-label',label);b.title=collapsed?label:'';if(icon){let i=document.createElement('span');i.className='ico';i.innerHTML=icon;b.append(i)}let s=document.createElement('span');s.className='nav-label';s.textContent=label;b.append(s);return b};
let masters=[...nav.querySelectorAll('button')].find(b=>b.getAttribute('onclick')==="go('masters')");
if(masters){masters.className=onMasters?'active':'';let after=masters;MASTER_SUB_PAGES.forEach(([tab,label])=>{let b=makeBtn('nav-sub'+(onMasters&&S.masterTab===tab?' active':''),"openMasterPage('"+tab+"')",label);after.after(b);after=b});
let cfg=makeBtn(onSettings?'active':'',"openMasterPage('Settings')",'Configuration','<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="2.6"/><path d="M10 2.5v2.2M10 15.3v2.2M2.5 10h2.2M15.3 10h2.2M4.6 4.6l1.6 1.6M13.8 13.8l1.6 1.6M4.6 15.4l1.6-1.6M13.8 6.2l1.6-1.6"/></svg>');after.after(cfg)}
return template.innerHTML};
document.head.insertAdjacentHTML('beforeend','<style>.nav .nav-sub{padding:7px 12px 7px 46px;font-family:inherit;font-size:inherit;font-weight:var(--aa-weight-semibold);line-height:1.4;height:auto;min-height:0}.nav .nav-sub.active{color:#fff;background:#075b98}.nav-collapsed .nav-sub{display:none}</style>');

/* Configuration: Entra email credentials per mailbox. */
var settingsForm = window.settingsForm || function() { return ""; }; const settingsFormBase = settingsForm;
const ENTRA_MAILBOXES = [['transport', 0], ['terminal', 1]];
function entraSet(key,id,value){S.entra=S.entra||{};S.entra[key]=S.entra[key]||{};S.entra[key][id]=value}
function entraField(key,id,label,secret=false){let v=(S.entra&&S.entra[key]&&S.entra[key][id])||'';return '<label data-aa-style="aa-static-style-59">'+label+'<input '+(secret?'type="password" autocomplete="off"':'type="text"')+' value="'+String(v).replace(/"/g,'&quot;')+'" oninput="entraSet(\''+key+'\',\''+id+'\',this.value)" data-aa-style="aa-static-style-60"></label>'}
function entraCard(key,idx){let row=MASTER_MAILBOXES[idx],name=row[0],address=row[1];return '<div data-aa-style="aa-static-style-61"><div><strong>'+name+'</strong><div class="code-text" data-aa-style="aa-static-style-27">'+address+'</div></div><div data-aa-style="aa-static-style-134">'+entraField(key,'tenant','Directory (tenant) ID')+entraField(key,'client','Application (client) ID')+'<div data-aa-style="aa-static-style-135">'+entraField(key,'secret','Client secret',true)+'</div></div><div data-aa-style="aa-static-style-62"><button class="btn primary" onclick="toast(\''+name+' Entra settings saved\')">Save Entra Settings</button></div></div>'}
settingsForm=function(){S.entra=S.entra||{};return settingsFormBase()+'<div data-aa-style="aa-static-style-136"><div><h2 data-aa-style="aa-static-style-137">Entra Email Setup</h2><p data-aa-style="aa-static-style-138">Microsoft Entra app credentials used to read each mailbox.</p></div>'+ENTRA_MAILBOXES.map(([key,idx])=>entraCard(key,idx)).join('')+'</div>'};

/* Task detail drawer: same side panel as the Cases file (500px, right-docked, full-height scrim). */
document.head.insertAdjacentHTML('beforeend','<style>.drawer-bg{inset:0!important;background:rgba(5,24,42,.25)!important;z-index:55!important}.drawer{left:auto!important;right:0!important;top:0!important;bottom:0!important;width:500px!important;max-width:100vw!important;padding:16px 20px!important;border-left:0!important;box-shadow:-8px 0 25px rgba(5,24,42,.18)!important;z-index:56!important;animation:aaslide .22s ease}.drawer>.page-head,.drawer>.notice,.drawer>.info-card,.drawer>.card,.drawer>.actions,.drawer>.assignment-meta{max-width:none!important;margin-left:0!important;margin-right:0!important}.drawer .page-head h1{font-size:17px!important}.drawer.structured-task-drawer{height:100%!important;bottom:0!important;top:0!important;margin:0!important;transform:none!important;inset:0 0 0 auto!important;width:500px!important}</style>');

/* Task detail drawer, redesigned with Asana-inspired unified activity & comments feed. */
window.taskToggleDiff = function (id) {
  S.diffOpen = S.diffOpen || {};
  S.diffOpen[id] = !S.diffOpen[id];
  render();
};

window.taskInsertMention = function () {
  let inp = document.getElementById('task-comment');
  if (inp) {
    inp.value = (inp.value ? inp.value + ' ' : '') + '@';
    inp.focus();
  }
};

window.taskInsertEmoji = function (e) {
  let inp = document.getElementById('task-comment');
  if (inp) {
    inp.value = (inp.value ? inp.value + ' ' : '') + (e || '👍');
    inp.focus();
  }
};

window.quickTaskStatusUpdate = function (id, next) {
  let t = taskById(id);
  if (!t || !canUpdateTask(t)) { toast('Only the assigned Task owner or Admin can change status'); return; }
  let previous = effectiveTaskStatus(t);
  if (previous === next) return;
  let at = '09/10/2026, 13:30', author = actorName();
  t[7] = next;
  if (next === 'Completed') {
    TASK_COMPLETIONS[id] = { at, by: author };
  }
  let note = next === 'Completed' ? 'completed this task' : 'changed status from "' + previous + '" to "' + next + '"';
  let diffId = 'diff-status-' + Math.random().toString(36).slice(2, 7);
  (S.taskActivity[id] = S.taskActivity[id] || []).unshift({
    text: note,
    author: author,
    at: at,
    type: next === 'Completed' ? 'completed' : 'status_change',
    field: 'Status',
    diffId: next !== 'Completed' ? diffId : null,
    diffOld: 'Status: ' + previous,
    diffNew: 'Status: ' + next,
    from: previous,
    to: next
  });
  (TASK_STATUS_HISTORY[id] = TASK_STATUS_HISTORY[id] || []).unshift({ from: previous, to: next, comment: '', author: author, at: at });
  S.activities.unshift([id + ' ' + note, author, at]);
  render();
  toast(id + ' moved to ' + next);
};

taskDrawer = function () {
  let t = taskById(S.selectedTask) || TASKS[0], id = t[8], status = effectiveTaskStatus(t), admin = S.role === 'Admin';
  const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  const lbl = 'display:flex;flex-direction:column;gap:5px;font-size:12px;font-weight:650;color:#3b4a5f';
  const ctl = 'font:500 12.5px Inter,Segoe UI,Arial,sans-serif;border:1px solid #c9d5e1;border-radius:4px;padding:8px 9px;background:#f4f8fc;color:#14233a;width:100%;box-sizing:border-box';
  const sel = (label, value, opts, onchange, disabled = false) => '<label style="' + lbl + '">' + label + '<select ' + (disabled ? 'disabled ' : '') + 'onchange="' + onchange + '" style="' + ctl + '">' + [...new Set([...opts, value])].map(o => '<option' + (o === value ? ' selected' : '') + '>' + esc(o) + '</option>').join('') + '</select></label>';
  const dmy = String(t[6] || ''), m = /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})/.exec(dmy), iso = /^\d{4}-\d{2}-\d{2}/.test(dmy) ? dmy.slice(0, 10) : m ? m[3] + '-' + m[2].padStart(2, '0') + '-' + m[1].padStart(2, '0') : '';
  // Same deadline rule as the task lists (taskDeadlineState), so the drawer and the list always agree.
  const deadline = taskDeadlineState(t), DUE_TONE = { 'Overdue': ['#fff0f1', '#c51f2d'], 'Due Today': ['#fff0f1', '#c51f2d'], 'Due Soon': ['#fff6df', '#bf7900'] };
  const dueState = status === 'Completed' ? ['Completed', '#e9f8ef', '#188756'] : deadline ? [deadline, ...DUE_TONE[deadline]] : ['On track', '#eef3f8', '#425169'];
  const allDepts = typeof ALL_DEPTS !== 'undefined' ? ALL_DEPTS : [...new Set(USERS.map(u => u.department).filter(x => x && !['Administration', 'Company'].includes(x)))];
  const assignees = ['Unassigned', ...USERS.filter(u => u.department === t[3]).map(u => u.name)];
  const statuses = ['To-Do', 'In Progress', 'On Hold', 'Completed'];
  // The assignee shows the person's photo and name, the same as on the Task card.
  const person = n => (n === 'Unassigned' || !n
    ? '<span style="width:24px;height:24px;border-radius:50%;background:#e4e9f0;color:#6b778a;display:inline-grid;place-items:center;font-size:12px;flex:none">—</span><span>Unassigned</span>'
    : commAvatar(n, 24) + '<span>' + esc(n) + '</span>');
  const assigneePick = () => {
    const open = S.assigneeOpen === id, cur = t[4] || 'Unassigned';
    return '<div class="assignee-pick" style="' + lbl + '">Assignee<div style="position:relative"><button type="button" ' + (admin ? '' : 'disabled ') + 'onclick="S.assigneeOpen=S.assigneeOpen===\'' + id + '\'?null:\'' + id + '\';render()" style="' + ctl + ';display:flex;align-items:center;gap:8px;text-align:left;background:#fff;' + (admin ? 'cursor:pointer' : 'cursor:not-allowed;opacity:.7') + '">' + person(cur) + '<span style="margin-left:auto;font-size:10px;color:#6b778a">▾</span></button>'
      + (open ? '<div role="listbox" style="position:absolute;z-index:30;left:0;right:0;top:100%;margin-top:2px;background:#fff;border:1px solid #c9d5e1;border-radius:4px;box-shadow:0 8px 20px rgba(20,35,58,.14);max-height:250px;overflow:auto">'
        + assignees.map(n => '<button type="button" role="option" onclick="S.assigneeOpen=null;adminInlineTaskUpdate(\'' + id + '\',\'assignee\',\'' + n + '\')" style="display:flex;align-items:center;gap:8px;width:100%;padding:7px 10px;border:0;background:' + (n === cur ? '#eaf4ff' : '#fff') + ';font:500 12.5px Inter,Segoe UI,Arial,sans-serif;color:#14233a;text-align:left;cursor:pointer">' + person(n) + '</button>').join('') + '</div>' : '') + '</div></div>';
  };
  if (!window.__assigneeDismiss) { window.__assigneeDismiss = true; document.addEventListener('click', e => { if (S.assigneeOpen && !(e.target.closest && e.target.closest('.assignee-pick'))) { S.assigneeOpen = null; render(); } }); }
  const deleteBtn =(S.role === 'Admin' || S.role === 'Manager') ? '<button onclick="aaDeleteTask(\'' + id + '\')" data-aa-style="aa-static-style-141">Delete Task</button>' : '';
  const fields = '<div data-aa-style="aa-static-style-142">'
    + sel('Status', status, statuses, 'quickTaskStatusUpdate(\'' + id + '\',this.value)', !canUpdateTask(t))
    + sel('Department', t[3], allDepts, 'adminInlineTaskUpdate(\'' + id + '\',\'department\',this.value)', !admin)
    + assigneePick()
    + sel('Priority', t[5], ['Urgent', 'High', 'Medium', 'Low'], 'adminInlineTaskUpdate(\'' + id + '\',\'priority\',this.value)', !admin)
    + '<label style="' + lbl + '">Due Date<input type="date" value="' + iso + '" ' + (admin ? '' : 'disabled ') + 'onchange="if(this.value){let p=this.value.split(\'-\');adminInlineTaskUpdate(\'' + id + '\',\'due\',p[2]+\'/\'+p[1]+\'/\'+p[0])}" style="' + ctl + '"></label>'
    + '<div style="' + lbl + '">Due Status<div><span style="display:inline-block;margin-top:2px;padding:3px 9px;border-radius:4px;font-weight:700;font-size:12px;background:' + dueState[1] + ';color:' + dueState[2] + '">' + dueState[0] + '</span></div></div>'
    + '</div>';
  const desc = '<label style="' + lbl + ';margin-top:16px">Description<textarea rows="3" ' + (admin ? '' : 'disabled ') + 'onchange="adminInlineTaskUpdate(\'' + id + '\',\'description\',this.value)" placeholder="Add a description…" style="' + ctl + ';resize:vertical;min-height:84px">' + esc(taskInstruction(t)) + '</textarea></label>';

  /* Asana-style unified feed state */
  S.taskFeedTab = S.taskFeedTab || 'all';
  S.taskFeedSort = S.taskFeedSort || 'oldest';

  const list = (S.comments && S.comments[id]) || [];
  const ini = n => String(n || '').split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();
  const av = (n, s = 28, bg = '#4b5f82') => '<span style="width:' + s + 'px;height:' + s + 'px;border-radius:50%;background:' + bg + ';color:#fff;font:700 ' + (s > 24 ? 10.5 : 9) + 'px Inter,sans-serif;display:grid;place-items:center;flex:none">' + ini(n) + '</span>';
  const formatTime = val => {
    if (!val) return '';
    if (val === 'Just now') return 'Just now';
    let dm = /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})/.exec(String(val));
    if (dm) {
      let d = new Date(+dm[3], +dm[2] - 1, +dm[1]);
      let diff = Math.round((new Date(2026, 9, 9) - d) / 86400000);
      if (diff === 0) return 'Today';
      if (diff === 1) return 'Yesterday';
      if (diff > 1 && diff < 30) return diff + ' days ago';
    }
    return String(val);
  };

  /* Resolve dynamic Case and Customer info - NOT hardcoded */
  let caseId = t[1];
  let c = (typeof CASE_DETAILS !== 'undefined' && CASE_DETAILS[caseId]) || (typeof CASES !== 'undefined' && CASES.find(x => x[0] === caseId));
  let seed = typeof CASE_SEEDS !== 'undefined' && CASE_SEEDS.find(s => s[0] === (t[2] || (c && c[1])));
  let customerName = (c && (c.customer || c[1])) || t[2] || (seed && seed[0]) || 'Customer';
  let creator = (c && c.contact) || (seed && seed[2]) || (customerName.includes('ABB') ? 'Thomas Weber' : customerName.includes('Nefab') ? 'Johan Ek' : customerName.includes('Hitachi') ? 'Linnea Berg' : customerName.includes('Westinghouse') ? 'Sarah Mitchell' : 'Customer Desk');
  let createTime = (c && c.created) || '07/10/2026, 08:14';
  let taskCategory = t[9] || (seed && seed[8]) || 'Transport booking';
  let origin = (c && c.pickup) || (seed && seed[5]) || 'Västerås, Sweden';
  let destination = (c && c.delivery) || (seed && seed[6]) || 'Munich, Germany';

  let timeline = [];

  /* 1. Real Task Creation event */
  timeline.push({
    type: 'creation',
    author: creator,
    customer: customerName,
    text: 'created this task for ' + customerName,
    at: createTime,
    ts: (typeof dateValue === 'function' ? dateValue(createTime) : 1) || 1
  });

  /* 2. Automated AI classification & System assignment */
  timeline.push({
    type: 'system',
    isAi: true,
    author: 'AA AI',
    text: 'categorized customer request as "' + taskCategory + '"',
    at: createTime,
    ts: ((typeof dateValue === 'function' ? dateValue(createTime) : 1) || 1) + 2
  });

  if (t[4] && t[4] !== 'Unassigned') {
    timeline.push({
      type: 'system',
      isAi: false,
      author: 'AA System',
      text: 'assigned this task to ' + t[4] + ' (' + t[3] + ')',
      at: createTime,
      ts: ((typeof dateValue === 'function' ? dateValue(createTime) : 1) || 1) + 4
    });
  }

  /* 4. Recorded updates in S.taskActivity */
  (S.taskActivity[id] || []).forEach((act, idx) => {
    let isComp = act.type === 'completed' || /completed/i.test(act.text || '');
    let diffId = act.diffId || ('diff-act-' + id + '-' + idx);
    timeline.push({
      type: isComp ? 'completed' : 'update',
      author: act.author || 'System',
      text: act.text || '',
      diffId: (act.diffOld && act.diffNew) ? diffId : null,
      diffOld: act.diffOld || (act.from ? String(act.from) : null),
      diffNew: act.diffNew || (act.to ? String(act.to) : null),
      at: act.at || '09/10/2026, 10:15',
      ts: (typeof dateValue === 'function' ? dateValue(act.at) : 2000) + idx
    });
  });

  /* 5. Status history from TASK_STATUS_HISTORY */
  (TASK_STATUS_HISTORY[id] || []).forEach((h, idx) => {
    let isComp = h.to === 'Completed';
    let diffId = 'diff-hist-' + id + '-' + idx;
    timeline.push({
      type: isComp ? 'completed' : 'update',
      author: h.author || 'System',
      text: isComp ? 'completed this task' : 'changed status from "' + h.from + '" to "' + h.to + '"' + (h.comment ? ' · "' + esc(h.comment) + '"' : ''),
      diffId: (!isComp && h.from && h.to) ? diffId : null,
      diffOld: h.from ? 'Status: ' + String(h.from) : null,
      diffNew: h.to ? 'Status: ' + String(h.to) : null,
      at: h.at || '09/10/2026, 13:30',
      ts: (typeof dateValue === 'function' ? dateValue(h.at) : 3000) + idx
    });
  });

  /* 6. Completed milestone */
  if (t[7] === 'Completed' && !timeline.some(x => x.type === 'completed')) {
    let comp = TASK_COMPLETIONS[id] || { by: t[4] || 'Andreas Nilsson', at: '09/10/2026, 10:34' };
    timeline.push({
      type: 'completed',
      author: comp.by,
      text: 'completed this task',
      at: comp.at,
      ts: 4000
    });
  }

  /* 7. User Comments */
  list.forEach((com, idx) => {
    timeline.push({
      type: 'comment',
      index: idx,
      author: com.author,
      text: com.text,
      at: com.at,
      key: id + '|' + idx,
      pinned: !!com.pinned,
      nid: taskNoteId(com),
      replyTo: com.replyTo || null,
      ts: (typeof dateValue === 'function' ? dateValue(com.at) : 5000) + idx
    });
  });

  /* Deduplicate similar entries */
  let seen = new Set();
  timeline = timeline.filter(item => {
    if (item.type === 'comment') return true;
    let sig = item.type + '|' + item.author + '|' + item.text + '|' + item.at;
    if (seen.has(sig)) return false;
    seen.add(sig);
    return true;
  });

  /* Count stats */
  const commentCount = timeline.filter(item => item.type === 'comment').length;
  const totalCount = timeline.length;

  /* Filter by tab */
  if (S.taskFeedTab === 'comments') {
    timeline = timeline.filter(item => item.type === 'comment');
  }

  /* Sort by timestamp */
  if (S.taskFeedSort === 'newest') {
    timeline.sort((a, b) => b.ts - a.ts);
  } else {
    timeline.sort((a, b) => a.ts - b.ts);
  }

  const pinnedBlock = timeline.filter(i => i.type === 'comment' && i.pinned).map(i => taskCommentRow(i, id, true)).join('');
  /* Header controls */
  const headerControls = '<div data-aa-style="aa-static-style-147">'
    + '<div data-aa-style="aa-static-style-148">'
    + '<button type="button" id="tab-comments-btn" onclick="S.taskFeedTab=\'comments\';render()" style="all:unset;cursor:pointer;padding:5px 14px;border-radius:999px;color:' + (S.taskFeedTab === 'comments' ? '#0869b6' : '#56657a') + ';background:' + (S.taskFeedTab === 'comments' ? '#eaf4ff' : 'transparent') + '">Comments ' + (commentCount ? '(' + commentCount + ')' : '') + '</button>'
    + '<button type="button" id="tab-activity-btn" onclick="S.taskFeedTab=\'all\';render()" style="all:unset;cursor:pointer;padding:5px 14px;border-radius:999px;color:' + (S.taskFeedTab === 'all' ? '#0869b6' : '#56657a') + ';background:' + (S.taskFeedTab === 'all' ? '#eaf4ff' : 'transparent') + '">All activity ' + (totalCount ? '(' + totalCount + ')' : '') + '</button>'
    + '</div>'
    + '<button type="button" onclick="S.taskFeedSort=(S.taskFeedSort===\'oldest\'?\'newest\':\'oldest\');render()" data-aa-style="aa-static-style-151">'
    + '<span>⇅</span> ' + (S.taskFeedSort === 'newest' ? 'Newest' : 'Oldest')
    + '</button>'
    + '</div>';

  /* Render timeline items */
  const feedContent = timeline.length ? timeline.map(item => {
    if (item.type === 'creation') {
      return '<div data-aa-style="aa-static-style-152">'
        + av(item.author, 28, '#d97706')
        + '<div data-aa-style="aa-static-style-108"><b>' + esc(item.author) + '</b> <span data-aa-style="aa-static-style-153">created this task for </span><b>' + esc(item.customer) + '</b> · <span data-aa-style="aa-static-style-51">' + formatTime(item.at) + '</span></div>'
        + '</div>';
    }
    if (item.type === 'completed') {
      return '<div data-aa-style="aa-static-style-154">'
        + '<span data-aa-style="aa-static-style-155">✓</span>'
        + '<div><b data-aa-style="aa-static-style-156">' + esc(item.author) + '</b> <span data-aa-style="aa-static-style-156">completed this task</span> · <span data-aa-style="aa-static-style-51">' + formatTime(item.at) + '</span></div>'
        + '</div>';
    }
    if (item.type === 'system' || item.type === 'update') {
      let diffOpen = !!(item.diffId && S.diffOpen && S.diffOpen[item.diffId]);
      let diffBtn = (item.diffId && item.diffOld && item.diffNew)
        ? ' · <button type="button" onclick="taskToggleDiff(\'' + item.diffId + '\')" data-aa-style="aa-static-style-157">' + (diffOpen ? 'Hide difference' : 'Show difference') + '</button>'
        : '';
      let diffBox = (item.diffId && item.diffOld && item.diffNew)
        ? '<div id="' + item.diffId + '" data-aa-style="aa-static-style-158"' + (diffOpen ? ' style="display:block"' : '') + '>'
          + '<span data-aa-style="aa-static-style-159">' + esc(item.diffOld) + '</span>'
          + '<span data-aa-style="aa-static-style-156">' + esc(item.diffNew) + '</span>'
          + '</div>'
        : '';
      return '<div>'
        + '<div data-aa-style="aa-static-style-160">'
        + (item.isAi ? '<span data-aa-style="aa-static-style-161">✨</span>' : '')
        + '<div><b>' + esc(item.author) + '</b> <span data-aa-style="aa-static-style-153">' + esc(item.text) + '</span>' + diffBtn + ' · <span data-aa-style="aa-static-style-51">' + formatTime(item.at) + '</span></div>'
        + '</div>'
        + diffBox
        + '</div>';
    }
    if (item.type === 'comment') return taskCommentRow(item, id, false);
    return '';
  }).join('') : '<div data-aa-style="aa-static-style-181">No ' + (S.taskFeedTab === 'comments' ? 'comments' : 'activity') + ' yet.</div>';

  /* Asana-style Modern Bottom Composer Card */
  const footer = '<div data-aa-style="aa-static-style-182">'
    + '<div data-aa-style="aa-static-style-183">'
    + '<div data-aa-style="aa-static-style-184">'
    + '<span data-aa-style="aa-static-style-185">' + ini(currentUser()?.name) + '</span>'
    + '<input id="task-comment" placeholder="Add a comment, @ to mention or # to link a task a teammate…" onkeydown="if(event.key===\'Enter\'&&!event.shiftKey){event.preventDefault();addTaskComment(\'' + id + '\')}" data-aa-style="aa-static-style-186">'
    + '</div>'
    + '<div data-aa-style="aa-static-style-187">'
    + '<div data-aa-style="aa-static-style-188">'
    + '<button type="button" id="task-attach-btn" onclick="taskInsertEmoji(\'+\')" title="Add detail" data-aa-style="aa-static-style-189">+</button>'
    + '<button type="button" id="task-emoji-btn" onclick="taskInsertEmoji(\'👍\')" title="Add emoji" data-aa-style="aa-static-style-190">☺</button>'
    + '<button type="button" id="task-mention-btn" onclick="taskInsertMention()" title="Mention teammate" data-aa-style="aa-static-style-189">@</button>'
    + '</div>'
    + '<button type="button" id="task-comment-submit" onclick="addTaskComment(\'' + id + '\')" data-aa-style="aa-static-style-191">'
    + 'Comment <span>↑</span>'
    + '</button>'
    + '</div>'
    + '</div>'
    + '</div>';

  return '<div onclick="S.drawer=false;render()" data-aa-style="aa-static-style-192"></div>'
    + '<aside class="drawer" data-aa-style="aa-static-style-193">'
    + '<div data-aa-style="aa-static-style-194"><div data-aa-style="aa-static-style-67"><div data-aa-style="aa-static-style-195"><span data-aa-style="aa-static-style-196">' + esc(id) + '</span></div>'
    + (S.taskTitleEdit
      ? '<input class="drawer-title-edit" value="' + esc(t[0]) + '" onblur="commitTaskTitle(\'' + id + '\',this.value)" onkeydown="if(event.key===\'Enter\'){this.blur()}else if(event.key===\'Escape\'){S.taskTitleEdit=false;render()}" autofocus>'
      : '<h2 data-aa-style="aa-static-style-198" data-editable onclick="S.taskTitleEdit=true;render()" title="Click to edit">' + esc(t[0]) + '</h2>')
    + '<button onclick="S.drawer=false;openCase(\'' + esc(t[1]) + '\')" data-aa-style="aa-static-style-197" style="display:block;margin-top:4px">Case ' + esc(t[1]) + ' ↗</button>'
    + '</div><div data-aa-style="aa-static-style-199">' + deleteBtn + '<button onclick="S.drawer=false;render()" aria-label="Close" data-aa-style="aa-static-style-200">✕</button></div></div>'
    + '<div data-aa-style="aa-static-style-201">' + fields + desc + headerControls + (pinnedBlock ? '<div style="position:sticky;top:0;z-index:3;background:#fff;padding:0 22px 6px;border-bottom:1px solid #edf1f5">' + pinnedBlock + '</div>' : '') + feedContent + '</div>'
    + taskReplyBanner() + footer + '</aside>';
};

function taskNoteId(com){if(!com.nid)com.nid='T'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);return com.nid}
function taskReplyOpen(nid){S.taskReplyTo=nid;render();setTimeout(()=>document.getElementById('task-comment')?.focus(),0)}
function taskReplyCancel(){S.taskReplyTo=null;render()}
function taskReplyBanner(){if(!S.taskReplyTo)return '';const t=(S.comments[S.selectedTask]||[]).find(c=>c.nid===S.taskReplyTo);if(!t)return '';return '<div style="display:flex;align-items:center;gap:8px;margin:0 22px 8px;padding:6px 10px;border-left:3px solid #0074cc;background:#f3f8fd;border-radius:4px;font-size:12px;color:#425169"><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Replying to <b>'+editorText(t.author)+'</b>: '+editorText(noteSnippet(t.text))+'</span><button type="button" aria-label="Cancel reply" onclick="taskReplyCancel()" style="all:unset;cursor:pointer;color:#6b778a;font-size:14px">✕</button></div>'}
function taskQuoteHtml(item,taskId){if(!item.replyTo)return '';const t=(S.comments[taskId]||[]).find(c=>c.nid===item.replyTo);return '<button type="button" onclick="jumpToNote(\''+item.replyTo+'\')" style="all:unset;cursor:pointer;display:block;box-sizing:border-box;width:100%;margin:0 0 6px;padding:5px 8px;border-left:3px solid #0074cc;background:#f3f8fd;border-radius:4px;font-size:12px;color:#425169">'+(t?'<b>'+editorText(t.author)+'</b> · '+editorText(noteSnippet(t.text)):'Original comment was deleted')+'</button>'}
function taskCommentRow(item,taskId,copy){const p=!!item.pinned,key=taskId+'|'+item.index;return '<div data-note-id="'+item.nid+'"'+(copy?' data-note-pin-copy="1"':'')+' style="display:flex;gap:11px;padding:10px 12px;margin:6px 0;border-radius:6px;'+(p?'background:#fff9eb;box-shadow:inset 3px 0 0 #bf7900':'')+'">'+commAvatar(item.author,28)+'<div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><b>'+editorText(item.author)+'</b> <span style="font-size:11.5px;color:#64748b">'+editorText(item.at)+'</span><span style="margin-left:auto;display:inline-flex;align-items:center;gap:10px"><button type="button" onclick="taskReplyOpen(\''+item.nid+'\')" style="all:unset;cursor:pointer;color:#0869b6;font-size:12px;font-weight:650">Reply</button>'+pinButton(p,"taskDrawerPin('"+key+"')")+'</span></div>'+taskQuoteHtml(item,taskId)+'<div style="margin-top:4px;font-size:13.5px;line-height:1.5">'+mentionText(item.text)+'</div></div></div>'}
function taskDrawerPin(key){const i=key.lastIndexOf('|'),id=key.slice(0,i),c=(S.comments[id]||[])[+key.slice(i+1)];if(c){c.pinned=!c.pinned;render()}}

/* Additional Details Found: dynamic key-value fields added manually with the + button. */
const ORDER_EXTRA_SEEDS={
  'CASE-401100':[{k:'Pickup contact call',v:'Call 30 minutes before arrival'},{k:'Photo confirmation',v:'Requested after loading'}],
  'CASE-401097':[{k:'Transport frames',v:'Inspection tools stay in protective frames'},{k:'Site access',v:'Details confirmed separately'}],
  'CASE-401087':[{k:'Surface protection',v:'Protect exposed steel from moisture'},{k:'Delivery sequence',v:'Confirmed by the receiver'}]
};
// Details found in the email that are not predefined Order fields, for every other Case. They follow the Case's category
// and use the Case's own contact and number, so each Case gets a few relevant and different entries.
function generatedOrderExtras(c){
  let n=parseInt(String(c.id).replace(/\D/g,''),10)||0,text=`${c.classification||''} ${c.category||''}`.toLowerCase(),pick=a=>a[n%a.length],
    contact=c.contact?c.contact+(c.phone?', '+c.phone:''):'',day=String(10+n%18).padStart(2,'0')+'/10/2026';
  if(/customs/.test(text))return [{k:'EORI number',v:'SE55'+String(60000000+n*37).slice(0,8)+'01'},{k:'Commodity code',v:pick(['8504 40 90','8479 89 97','8537 10 98','7326 90 98'])},{k:'Customs broker',v:pick(['Nordic Customs AB','Scandia Tull AB','Baltic Clearance Ltd'])}];
  if(/export|freight/.test(text))return [{k:'Export licence',v:'EX-2026-'+String(18000+n%900)},{k:'Incoterms',v:pick(['FCA','DAP','CPT','EXW'])+' '+(c.pickup||'').split(',')[0]},{k:'Customs broker',v:pick(['Nordic Customs AB','Scandia Tull AB'])}];
  if(/packing/.test(text))return [{k:'Packing material',v:pick(['ISPM 15 heat-treated timber','Anti-static foam and crate','Moisture barrier foil'])},{k:'Marking instructions',v:pick(['Fragile · This side up','Keep dry · Do not stack','Customer label on two sides'])},{k:'Packing deadline',v:day}];
  if(/warehouse/.test(text))return [{k:'Storage period',v:pick(['Up to 14 days','Up to 30 days','Up to 60 days'])},{k:'Temperature range',v:pick(['Ambient','5–25 °C','2–8 °C'])},{k:'Handling note',v:pick(['Pallets must not be stacked','Forklift with side shift required','Inspect on receipt and report damage'])}];
  if(/delivery/.test(text))return [{k:'Delivery window',v:pick(['08:00–12:00','12:00–16:00','Before 10:00'])+', '+day},{k:'Receiving contact',v:contact||'Reception desk'},{k:'Unloading equipment',v:pick(['Forklift on site','Tail-lift vehicle needed','Crane available at site'])}];
  if(/pickup/.test(text))return [{k:'Pickup window',v:pick(['07:00–10:00','10:00–14:00','13:00–17:00'])+', '+day},{k:'Site contact',v:contact||'Gate office'},{k:'Loading equipment',v:pick(['Loading dock 2','Ramp height 1.2 m','Forklift on site'])}];
  if(/follow/.test(text))return [{k:'Tracking reference',v:'TRK-'+String(700000+n*13)},{k:'Carrier contact',v:pick(['dispatch@nordiccarrier.se','ops@balticfreight.com'])},{k:'Reported issue',v:pick(['Delay at terminal','Awaiting delivery slot','Production-critical load'])}];
  return [{k:'Site contact',v:contact||'Reception desk'},{k:'Vehicle requirement',v:pick(['Curtain-sider','Truck and trailer','Van with tail-lift'])},{k:'Insurance value',v:'EUR '+(120+n%9*45)+',000'}];
}
function orderExtras(c){S.orderExtras=S.orderExtras||{};if(!S.orderExtras[c.id]){let d=String(S.orderEdits[c.id]?.otherDetails??defaultOrderOtherDetails(c));S.orderExtras[c.id]=(ORDER_EXTRA_SEEDS[c.id]||generatedOrderExtras(c)).map(x=>({...x}))}return S.orderExtras[c.id]}
function addOrderExtra(){let c=selectedCaseData(),list=orderExtras(c);list.push({k:'',v:''});let i=list.length-1;render();setTimeout(()=>document.getElementById('order-extra-k-'+i)?.focus(),0)}
function setOrderExtra(i,field,value){let list=orderExtras(selectedCaseData());if(list[i])list[i][field]=value}
function removeOrderExtra(i){orderExtras(selectedCaseData()).splice(i,1);render()}
const extraFieldsOrderTabBase=orderTabV2;orderTabV2=function(){
  let template=document.createElement('template');template.innerHTML=extraFieldsOrderTabBase();
  let section=template.content.querySelector('.order-other-details');if(!section)return template.innerHTML;
  let c=selectedCaseData(),list=orderExtras(c);
  let rows=list.map((x,i)=>'<div class="order-extra-row"><input class="order-inline-input" id="order-extra-k-'+i+'" value="'+editorText(x.k)+'" placeholder="Field name" aria-label="Field name" oninput="setOrderExtra('+i+',\'k\',this.value)"><input class="order-inline-input" value="'+editorText(x.v)+'" placeholder="Value" aria-label="Value" oninput="setOrderExtra('+i+',\'v\',this.value)"><button type="button" aria-label="Remove field" title="Remove field" onclick="removeOrderExtra('+i+')" data-aa-style="aa-static-style-203">✕</button></div>').join('');
  section.innerHTML='<div class="order-card-head"><h3>8. Additional Details Found</h3><button class="order-other-add" type="button" title="Add field" aria-label="Add field" onclick="addOrderExtra()">+</button></div>'+(rows?'<div class="order-card-body">'+rows+'</div>':'');
  return template.innerHTML;
};

function parseGoodsDims(value){let parts=String(value||'').replace(/\s*(m|cm|mm)$/,'').split('×').map(x=>x.trim());return [0,1,2].map(i=>parts[i]||'')}
function composeGoodsDims(parts){let clean=parts.map(x=>String(x||'').trim());return clean.some(Boolean)?clean.join(' × ')+' m':''}
function setInlineOrderDimension(row,part,value){let c=selectedCaseData(),edits=S.orderEdits[c.id],current=edits?.items?.[row]?.[5]??goodsRowsFor(c)[row]?.[5]??'',parts=parseGoodsDims(current);parts[part]=value;setInlineOrderItem(row,5,composeGoodsDims(parts))}
const goodsDimensionColumnsOrderTab=orderTabV2;orderTabV2=function(){
  let template=document.createElement('template');template.innerHTML=goodsDimensionColumnsOrderTab();
  let table=template.content.querySelector('.compact-order-table');if(!table)return template.innerHTML;
  let c=selectedCaseData(),edits=S.orderEdits[c.id],text=(i,k,value)=>`<input class="order-inline-input" type="text" value="${editorText(value)}" onchange="setInlineOrderItem(${i},${k},this.value)">`,
    rows=goodsRowsFor(c).map((r,i)=>{let v=r.slice(0,7);(edits?.items?.[i]||[]).forEach((x,k)=>{if(x!=null&&k<7)v[k]=x});return v});
  let body=rows.map((v,i)=>{let dims=parseGoodsDims(v[5]);return `<tr><td><span class="order-row-number">${String(i+1).padStart(2,'0')}</span></td><td>${inlineGoodsControl(i,1,v[1],'Qty')}</td><td>${text(i,2,v[2])}</td><td>${text(i,3,v[3])}</td><td>${inlineGoodsControl(i,4,v[4],'Weight')}</td><td><input class="order-inline-input" type="text" value="${editorText(dims[0])}" aria-label="Length" onchange="setInlineOrderDimension(${i},0,this.value)"></td><td><input class="order-inline-input" type="text" value="${editorText(dims[1])}" aria-label="Width" onchange="setInlineOrderDimension(${i},1,this.value)"></td><td><input class="order-inline-input" type="text" value="${editorText(dims[2])}" aria-label="Height" onchange="setInlineOrderDimension(${i},2,this.value)"></td><td>${text(i,6,v[6])}</td><td><input class="order-inline-input" type="text" value="${editorText(((c.goodsDetail&&c.goodsDetail[i])||{}).marking||'')}" aria-label="Goods Marking" onchange="setCaseGoodsField('${c.id}',${i},'marking',this.value)"></td><td><input class="order-inline-input" type="text" value="${editorText(((c.goodsDetail&&c.goodsDetail[i])||{}).vol||'')}" aria-label="Volume" onchange="setCaseGoodsField('${c.id}',${i},'vol',this.value)"></td><td><input class="order-inline-input" type="text" value="${editorText(((c.goodsDetail&&c.goodsDetail[i])||{}).pallet||'')}" aria-label="Pallet Spaces" onchange="setCaseGoodsField('${c.id}',${i},'pallet',this.value)"></td><td>${confidenceBadge(i?91:93)}</td><td style="white-space:nowrap;text-align:right"><button class="link" title="Remove row" onclick="removeGoodsRow('${c.id}',${i})" style="font-size:14px">✕</button></td></tr>`}).join('');
  let rebuilt=document.createElement('template');rebuilt.innerHTML=`<table class="compact-order-table"><thead><tr><th>Item</th><th>Qty</th><th>Package Type</th><th>Goods Description</th><th>Weight (kg)</th><th>L (m)</th><th>W (m)</th><th>H (m)</th><th>Package No.</th><th>Goods Marking</th><th>Volume (m³)</th><th>Pallet Spaces</th><th>AI Confidence</th><th></th></tr></thead><tbody>${body}</tbody></table>`;
  // The goods table scrolls, both ways, inside a fixed height, so long lists and wide columns stay reachable.
  const scroll=document.createElement('div');scroll.style.cssText='overflow:auto;max-height:360px';scroll.appendChild(rebuilt.content.firstElementChild);table.replaceWith(scroll);return template.innerHTML};
// Saves a value typed in the Goods / Colli table on the Order tab to the case's goods row.
function setCaseGoodsField(caseId,i,key,value){const c=CASE_DETAILS[caseId];if(!c)return;c.goodsDetail=c.goodsDetail||[];c.goodsDetail[i]=c.goodsDetail[i]||{};c.goodsDetail[i][key]=String(value).trim();render()}

const CUSTOMER_MASTER = (typeof MASTER_CUSTOMERS !== 'undefined' ? MASTER_CUSTOMERS : []).map(x => ({
  no: x.customerNumber || x.id,
  code: x.customerCode || '',
  name: x.name,
  legal: x.name,
  city: x.city || ''
}));
function customerMasterLookup(q){
  if (!q) return null;
  const needle = String(q).trim().toLowerCase();
  const list = typeof MASTER_CUSTOMERS !== 'undefined' && MASTER_CUSTOMERS.length ? MASTER_CUSTOMERS : CUSTOMER_MASTER;
  const found = list.find(x => 
    String(x.customerNumber || x.no || '').trim().toLowerCase() === needle ||
    String(x.customerCode || x.code || '').trim().toLowerCase() === needle ||
    String(x.id || '').trim().toLowerCase() === needle ||
    String(x.name || '').trim().toLowerCase() === needle
  );
  if (found) {
    return {
      no: found.customerNumber || found.no || found.id,
      code: found.customerCode || found.code || '',
      name: found.name,
      legal: found.name,
      city: found.city || ''
    };
  }
  return null;
}
function orderRowIndexByLabel(label){return [...document.querySelectorAll('.order-line,.order-metric')].findIndex(row=>row.querySelector(':scope > span')?.textContent.trim()===label)}
function setOrderCustomerNumber(index,value){let caseId=S.selectedCase,rec=orderEditRecord(caseId),no=String(value||'').trim(),found=customerMasterLookup(no);rec.fields[index]={index,value:no};let customerIndex=orderRowIndexByLabel('Customer');if(found&&customerIndex>=0)rec.fields[customerIndex]={index:customerIndex,value:found.name};commitOrderEdit(caseId,found?'Customer matched to '+found.name:'Customer number updated')}
function setPickupParts(index,date,time){let caseId=S.selectedCase,rec=orderEditRecord(caseId),d=/^(\d{4})-(\d{2})-(\d{2})$/.exec(date||''),t=/^([01]\d|2[0-3]):([0-5]\d)$/.exec(time||'');if(!d){toast('Select a pickup date');render();return}if(!t){toast('Enter the pickup time in 24-hour format, for example 08:00');render();return}rec.fields[index]={index,value:`${d[3]}/${d[2]}/${d[1]}, ${t[0]}`};commitOrderEdit(caseId,'Pickup date/time updated')}
function openCustomerPicker(input){filterCustomerPicker(input);input.parentElement.querySelector('.customer-picker-menu').hidden=false}
function closeCustomerPicker(input){setTimeout(()=>{let m=input.parentElement?.querySelector('.customer-picker-menu');if(m)m.hidden=true},200)}
function filterCustomerPicker(input){
  let q=input.value.trim().toLowerCase(),menu=input.parentElement.querySelector('.customer-picker-menu');
  if(!menu)return;
  const list = typeof MASTER_CUSTOMERS !== 'undefined' && MASTER_CUSTOMERS.length ? MASTER_CUSTOMERS : CUSTOMER_MASTER;
  const matches = q
    ? list.filter(x => ((x.name || '') + ' ' + (x.customerCode || x.code || '') + ' ' + (x.customerNumber || x.no || '')).toLowerCase().includes(q))
    : list;
  const idx = menu.dataset.index || 0;
  menu.innerHTML = matches.slice(0, 40).map(x => {
    const val = x.customerNumber || x.no || x.customerCode || x.code || x.id;
    const code = x.customerCode || x.code || '';
    return `<button type="button" class="customer-picker-option" onmousedown="event.preventDefault()" onclick="setOrderCustomerNumber(${idx},'${val}')"><strong>${code ? editorText(code) + ' · ' : ''}${editorText(val)}</strong><span>${editorText(x.name)}</span></button>`;
  }).join('') || '<div style="padding:8px 12px;color:var(--muted);font-size:12px">No customer matches</div>';
  menu.hidden = false;
}
const orderPageSimplifiedOrderTab=orderTabV2;orderTabV2=function(){
  let template=document.createElement('template');template.innerHTML=orderPageSimplifiedOrderTab();
  const removedLabel=/^(Invoice Marking|Region|Geographic \/ Price Zone|Distance|Estimated Driving Time|Temperature Requirement|Chargeable Weight|Length|Width|Height)\b/;
  let rows=[...template.content.querySelectorAll('.order-line,.order-metric')];
  rows.forEach((row,index)=>{
    let label=row.querySelector(':scope > span')?.textContent.trim()||'',control=row.querySelector('.order-inline-control');
    if(removedLabel.test(label)){row.setAttribute('hidden','');return}
    if(label==='Loading Reference')row.querySelector(':scope > span').textContent='Sender Reference';
    if(label==='Customer No.'&&control){
      let current=control.querySelector('input')?.value??'';
      let pill=row.querySelector('.ai-field-confidence');if(pill){pill.innerHTML='';pill.style.visibility='hidden'}
      control.innerHTML=`<div class="customer-picker"><input class="order-inline-input" type="text" autocomplete="off" value="${editorText(current)}" aria-label="Customer number" placeholder="Search customer number or code" oninput="filterCustomerPicker(this)" onfocus="openCustomerPicker(this)" onblur="closeCustomerPicker(this)" onchange="setOrderCustomerNumber(${index},this.value)"><div class="customer-picker-menu" data-index="${index}" hidden></div></div>`;
    }
    if(/^Pickup Date \/ Time/.test(label)&&control){
      let [dv='',tv='']=(control.querySelector('input')?.value||'').split('T'),time=tv.slice(0,5)||'08:00';
      control.innerHTML=`<div class="order-date-time"><input class="order-inline-input" type="date" aria-label="Pickup date" value="${editorText(dv)}" onchange="setPickupParts(${index},this.value,this.nextElementSibling.value)"><input class="order-inline-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:mm" aria-label="Pickup time, 24-hour" value="${editorText(time)}" onchange="setPickupParts(${index},this.previousElementSibling.value,this.value)"></div>`;
    }
  });
  return template.innerHTML;
};
const baseOutstandingCaseFields=outstandingCaseFields;outstandingCaseFields=function(c){let fields=baseOutstandingCaseFields(c);if(c&&goodsRowsFor(c).some(r=>String(r[3]||'').trim()))return fields.filter(x=>!['packages','dimensions'].includes(x.field));return fields};
document.head.insertAdjacentHTML('beforeend',`<style>[hidden]{display:none!important}.order-metric{border-bottom:0!important}.order-customer-lookup{margin-top:5px;font-size:11px;color:#425169}.order-customer-lookup.muted{color:#b36b00}.order-date-time{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,.8fr);gap:6px}.order-inline-control:has(.customer-picker){position:relative}.customer-picker{position:relative;width:100%}.customer-picker-menu{position:absolute;left:0;right:0;top:calc(100% + 5px);z-index:80;max-height:240px;overflow:auto;background:#fff;border:1px solid var(--line);border-radius:6px;box-shadow:0 12px 28px rgba(19,39,62,.18);padding:4px 0}.customer-picker-option{display:flex;flex-direction:column;align-items:flex-start;gap:2px;width:100%;border:0;background:#fff;padding:8px 12px;text-align:left;color:var(--ink);cursor:pointer}.customer-picker-option:hover,.customer-picker-option:focus-visible{background:#f1f6fb;outline:0}.customer-picker-option strong{font-size:13px;font-weight:650}.customer-picker-option span{font-size:12px;color:var(--muted)}</style>`);

/* Request Volume: generated from live Review Queue and Case data. */
function volumeBuckets(period){
  const pd=s=>{let m=/^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(String(s));return m?Date.UTC(+m[3],+m[2]-1,+m[1]):null},DAY=864e5,
    fmt=ms=>{let d=new Date(ms);return String(d.getUTCDate()).padStart(2,'0')+' '+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getUTCMonth()]};
  let queued=QUEUE.map(q=>pd(q[5])).filter(Boolean),created=CASES.map(c=>pd(c[5])).filter(Boolean),all=[...queued,...created];
  if(!all.length)return [];
  let end=Math.max(...all),start=Math.min(...all),buckets;
  if(period==='Monthly'){let n=Math.min(6,Math.max(1,Math.ceil((end-start+DAY)/(7*DAY))));start=end-(n*7-1)*DAY;buckets=Array.from({length:n},(_,i)=>({from:start+i*7*DAY,to:start+(i*7+6)*DAY,label:fmt(start+i*7*DAY)+' – '+fmt(start+(i*7+6)*DAY)}))}
  else{start=end-6*DAY;buckets=Array.from({length:7},(_,i)=>({from:start+i*DAY,to:start+i*DAY,label:fmt(start+i*DAY)}))}
  return buckets.map(b=>{let inRange=v=>v>=b.from&&v<=b.to,qn=queued.filter(inRange).length,cn=created.filter(inRange).length;return [b.label,qn+cn,cn]});
}
reviewerVolumeChart=function(){
  let period=S.reviewerAnalyticsPeriod==='Monthly'?'Monthly':'Weekly',data=volumeBuckets(period),max=Math.max(1,...data.flatMap(i=>[i[1],i[2]])),
    rec=data.reduce((n,i)=>n+i[1],0),pro=data.reduce((n,i)=>n+i[2],0),rate=rec?Math.round(pro/rec*100):0;
  return '<section class="card reviewer-chart-card"><div class="card-head reviewer-chart-head"><div><h2>Request Volume</h2><span class="sub">'+(period==='Monthly'?'Last 6 months':'Last 7 days')+' · '+rec+' received · '+pro+' processed ('+rate+'%)</span></div><div class="period-toggle" role="group" aria-label="Request volume period"><button class="'+(period==='Weekly'?'active':'')+'" onclick="setReviewerAnalyticsPeriod(\'Weekly\')">Weekly</button><button class="'+(period==='Monthly'?'active':'')+'" onclick="setReviewerAnalyticsPeriod(\'Monthly\')">Monthly</button></div></div><div class="volume-legend"><span><i class="received"></i>Received</span><span><i class="processed"></i>Processed</span></div><div class="volume-chart '+period.toLowerCase()+'" style="--volume-count:'+data.length+'">'
   +data.map((item,i)=>'<div class="volume-group"><div class="volume-bars"><span class="volume-bar received" style="height:'+Math.max(item[1]?8:3,item[1]/max*118)+'px;animation-delay:'+i*50+'ms" title="'+item[0]+': '+item[1]+' received"><b>'+item[1]+'</b></span><span class="volume-bar processed" style="height:'+Math.max(item[2]?8:3,item[2]/max*118)+'px;animation-delay:'+(i*50+25)+'ms" title="'+item[0]+': '+item[2]+' processed"><b>'+item[2]+'</b></span></div><small>'+item[0]+'</small></div>').join('')+'</div></section>';
};
document.head.insertAdjacentHTML('beforeend','<style>@keyframes volgrow{from{transform:scaleY(.02);opacity:.4}to{transform:scaleY(1);opacity:1}}.volume-bar{transform-origin:bottom;animation:volgrow .45s ease both}.volume-bar:hover{filter:brightness(1.08)}.reviewer-chart-card .volume-chart.weekly{grid-template-columns:repeat(var(--volume-count),minmax(64px,1fr))}.reviewer-chart-card .volume-chart.monthly{grid-template-columns:repeat(var(--volume-count),minmax(110px,1fr))}</style>');

/* Request Volume: seeded history plus live Review Queue / Case data for a realistic trend. */
function volumeHistory(){
  if(window.__volHist)return window.__volHist;
  let seed=20261009,rnd=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  const DAY=864e5,m=/^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(OPERATION_DATE),end=Date.UTC(+m[3],+m[2]-1,+m[1]),map={};
  for(let i=0;i<200;i++){let ms=end-i*DAY,d=new Date(ms),wd=d.getUTCDay(),dom=d.getUTCDate(),month=d.getUTCMonth(),
    base=wd===0?2:wd===6?5:[0,22,26,24,21,17][wd],season=1+0.18*Math.sin(month/12*6.28+0.8)+(dom>=25||dom<=3?0.14:0),spike=rnd()<0.08?1.45:1,
    rec=Math.max(1,Math.round(base*season*spike*(0.75+rnd()*0.5))),pro=Math.max(0,Math.min(rec+2,Math.round(rec*(0.68+rnd()*0.3)+(rnd()<0.2?3:0))));
    map[ms]=[rec,pro]}
  return window.__volHist={map,end};
}
volumeBuckets=function(period){
  const H=volumeHistory(),DAY=864e5,MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    pd=s=>{let x=/^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(String(s));return x?Date.UTC(+x[3],+x[2]-1,+x[1]):null},
    live={};
  QUEUE.forEach(q=>{let ms=pd(q[5]);if(ms&&ms<=H.end){(live[ms]=live[ms]||[0,0])[0]++}});
  CASES.forEach(c=>{let ms=pd(c[5]);if(ms&&ms<=H.end){(live[ms]=live[ms]||[0,0])[0]++;live[ms][1]++}});
  const day=ms=>{let h=H.map[ms]||[0,0],l=live[ms]||[0,0];return [h[0]+l[0],h[1]+l[1]]};
  if(period==='Monthly'){
    let e=new Date(H.end),out=[];
    for(let k=5;k>=0;k--){let y=e.getUTCFullYear(),mo=e.getUTCMonth()-k;while(mo<0){mo+=12;y--}
      let from=Date.UTC(y,mo,1),to=Math.min(Date.UTC(y,mo+1,0),H.end),r=0,p=0;
      for(let ms=from;ms<=to;ms+=DAY){let v=day(ms);r+=v[0];p+=v[1]}
      out.push([MON[mo],r,p])}
    return out;
  }
  return Array.from({length:7},(_,i)=>{let ms=H.end-(6-i)*DAY,d=new Date(ms),v=day(ms);return [WD[d.getUTCDay()]+' '+String(d.getUTCDate()).padStart(2,'0'),v[0],v[1]]});
};

/* Case header: Case ID on its own line above the title, in a smaller font. */
const caseIdSplitBase=caseView;caseView=function(){
  let template=document.createElement('template');template.innerHTML=caseIdSplitBase();
  let h1=template.content.querySelector('.case-v2-title h1');
  if(h1&&!h1.children.length){let m=/^(#?[\w-]+)\s*·\s*(.+)$/.exec(h1.textContent.trim());
    if(m){h1.textContent=m[2];let id=document.createElement('div');id.className='case-id-line';id.textContent=m[1];h1.before(id)}}
  return template.innerHTML;
};
document.head.insertAdjacentHTML('beforeend','<style>.case-id-line{font-size:12.5px;font-weight:750;color:#0871c7;letter-spacing:.02em;margin:0 0 3px}</style>');

/* Case Communication tab, rebuilt from the Cases file: Email Communication (left) and Internal Communication (right). */
function commAvatar(name,size=34){
  let user = USERS.find(u => u.name === name || String(name).includes(u.name.split(' ')[0]));
  if (!user && (String(name).includes('Daniel') || String(name).includes('Admin'))) user = { id: 'daniel', name: 'Daniel Frölander' };
  if (!user && String(name).includes('Thomas')) user = { id: 'thomas', name: 'Thomas Weber' };
  if (!user && String(name).includes('Maria')) user = { id: 'maria', name: 'Maria Svensson' };
  if (!user && String(name).includes('Erik')) user = { id: 'erik', name: 'Erik Karlsson' };
  let cellsObj = (typeof window !== 'undefined' && (window.USER_PHOTO_CELLS_EXT || window.USER_PHOTO_CELLS)) || {};
  if (user && cellsObj[user.id]) {
    let cell = cellsObj[user.id];
    let px = (cell[0] * 100 / 3) + '%', py = (cell[1] * 50) + '%';
    return '<span class="avatar profile-photo comm-avatar" style="width:'+size+'px;height:'+size+'px;border-radius:50%;background-image:url(\'assets/team-profile-photos.png\') !important;background-repeat:no-repeat !important;background-size:400% 300% !important;background-position:'+px+' '+py+' !important;display:inline-block;flex:none;box-shadow:inset 0 0 0 1px rgba(12,42,68,.12)" title="'+name+'"></span>';
  }
  const cols=['#4b5f82','#2f8f6b','#875fc0','#d66f2f','#2a63c4','#25a7a0'];let h=0;for(const ch of String(name))h=(h*31+ch.charCodeAt(0))%cols.length;const ini=/^AA Logistik/.test(name)?'AA':String(name).split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();
  return '<span style="width:'+size+'px;height:'+size+'px;border-radius:50%;background:'+(/^AA Logistik/.test(name)?'#0877d1':cols[h])+';color:#fff;font:700 '+(size<30?9.5:11)+'px Inter,sans-serif;display:grid;place-items:center;flex:none">'+ini+'</span>';
}
function pinIco(p){return '<svg width="12" height="12" viewBox="0 0 24 24" fill="'+(p?'currentColor':'none')+'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.89A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.89A2 2 0 0 0 5 15.24Z"></path></svg>';}
function isEmailOpen(k){let v=(S.openEmails||{})[k];return v===undefined?k.endsWith('|in'):v}
function toggleCaseEmailRow(k){S.openEmails=S.openEmails||{};S.openEmails[k]=!isEmailOpen(k);render()}
function caseEmailAction(mode,subject){openCommunication(mode==='New Email'?'New Email':mode);if(S.editorData&&mode!=='New Email')S.editorData.subject=(mode==='Forward'?'Fwd: ':'Re: ')+String(subject).replace(/^(Re|Fwd): /,'');render()}
function noteId(n){if(!n.nid)n.nid='N'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);return n.nid}
function noteSnippet(text){return String(text||'').replace(/\s+/g,' ').slice(0,80)}
function pinButton(p,action){return '<button type="button" title="'+(p?'Unpin':'Pin')+'" aria-label="'+(p?'Unpin':'Pin')+'" aria-pressed="'+!!p+'" onclick="'+action+'" style="all:unset;cursor:pointer;display:inline-flex;align-items:center;color:'+(p?'#bf7900':'#6b778a')+'">'+pinIco(p)+'</button>'}
function jumpToNote(nid){const el=document.querySelector('[data-note-id="'+nid+'"]:not([data-note-pin-copy])')||document.querySelector('[data-note-id="'+nid+'"]');if(!el)return;el.scrollIntoView({behavior:'smooth',block:'center'});el.style.boxShadow='0 0 0 2px #0074cc';setTimeout(()=>{el.style.boxShadow=''},1400)}
function noteReplyOpen(nid){S.noteReplyTo=nid;render();setTimeout(()=>document.getElementById('case-comment-v2')?.focus(),0)}
function noteReplyCancel(){S.noteReplyTo=null;render()}
function replyBanner(){if(!S.noteReplyTo)return '';const t=S.notes.find(n=>n.nid===S.noteReplyTo);if(!t)return '';return '<div style="display:flex;align-items:center;gap:8px;margin:0 0 8px 42px;padding:6px 10px;border-left:3px solid #0074cc;background:#f3f8fd;border-radius:4px;font-size:12px;color:#425169"><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Replying to <b>'+editorText(t.author)+'</b>: '+editorText(noteSnippet(t.text))+'</span><button type="button" aria-label="Cancel reply" onclick="noteReplyCancel()" style="all:unset;cursor:pointer;color:#6b778a;font-size:14px">✕</button></div>'}
function quoteHtml(n){if(!n.replyTo)return '';const t=S.notes.find(x=>x.nid===n.replyTo);return '<button type="button" onclick="jumpToNote(\''+n.replyTo+'\')" style="all:unset;cursor:pointer;display:block;box-sizing:border-box;width:100%;margin:0 0 6px;padding:5px 8px;border-left:3px solid #0074cc;background:#f3f8fd;border-radius:4px;font-size:12px;color:#425169">'+(t?'<b>'+editorText(t.author)+'</b> · '+editorText(noteSnippet(t.text)):'Original comment was deleted')+'</button>'}
function noteRow(n,copy){const ni=S.notes.indexOf(n),nid=noteId(n),p=!!n.pinned,E=editorText;return '<div data-note-id="'+nid+'"'+(copy?' data-note-pin-copy="1"':'')+' style="display:grid;grid-template-columns:34px 1fr;gap:10px;margin-bottom:10px;padding:9px 10px;border-radius:6px;'+(p?'background:#fff6df;box-shadow:inset 3px 0 0 #bf7900':'')+'">'+commAvatar(n.author,32)+'<div data-aa-style="aa-static-style-67"><div data-aa-style="aa-static-style-165"><span><b>'+E(n.author)+'</b> <span data-aa-style="aa-static-style-51">'+E(n.at)+'</span></span><span data-aa-style="aa-static-style-219"><button type="button" onclick="noteReplyOpen(\''+nid+'\')" data-aa-style="aa-static-style-197">Reply</button>'+pinButton(p,'toggleNotePin('+ni+')')+'</span></div>'+quoteHtml(n)+'<div data-aa-style="aa-static-style-220">'+mentionText(n.text)+'</div>'+(n.attachments&&n.attachments.length?'<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">'+commentFileChips(n.attachments,i=>'deleteNoteAttachment('+ni+','+i+')')+'</div>':'')+'</div></div>'}
function commentFileChips(files,removeCall){return files.map((f,i)=>`<span style="display:inline-flex;align-items:center;gap:6px;border:1px solid #dce4ec;border-radius:999px;padding:3px 6px 3px 10px;font-size:12px;background:#fff">${fileTypeIcon(f.name)}<a href="${editorText(f.url)}" download="${editorText(f.name)}" style="color:#0869b6;text-decoration:none;font-weight:600">${editorText(f.name)}</a>${f.size?`<span class="sub">${editorText(f.size)}</span>`:''}<button type="button" title="Delete attachment" aria-label="Delete attachment ${editorText(f.name)}" onclick="${removeCall(i)}" style="all:unset;cursor:pointer;color:#8a96a8;padding:0 3px;font-size:15px;line-height:1">×</button></span>`).join('')}
communicationTabV2=function(){
  let c=selectedCaseData(),pendingFiles=(S.commentFilesCase===c.id?(S.commentFiles||[]):[]),record=acknowledgementRecord(c.id),incoming=S.communications.find(m=>m.caseId===c.id&&m.direction==='Incoming'),
    notes=S.notes.filter(n=>!n.caseId||n.caseId===c.id),E=editorText,card='background:#fff;border:1px solid #dce4ec;border-radius:6px;box-shadow:0 2px 8px rgba(28,50,78,.06)',
    pbtn='font:650 11.5px Inter,sans-serif;border:1px solid #c9d5e1;background:#fff;border-radius:4px;padding:5px 10px;cursor:pointer';
  let emails=[];
  S.communications.filter(m=>m.caseId===c.id&&m!==incoming).forEach(m=>{let out=m.direction==='Outgoing';emails.push({key:c.id+'|m-'+m.id,from:out?'AA Logistik Operations':m.author,addr:out?'operations@aalogistik.se':c.email,to:out?c.email:'operations@aalogistik.se',subject:m.subject,date:m.at,body:m.body,atts:[]})});
  // The acknowledgement is listed only once it has been sent. An unsent acknowledgement is a draft and is not shown here.
  if(record)emails.push({key:c.id+'|ack',from:'AA Logistik Operations',addr:'operations@aalogistik.se',to:c.email,subject:'We have received your request · '+c.id,date:record.at,body:'Hello '+c.contact.split(' ')[0]+',\n\nWe have received your request regarding '+String(c.subject).toLowerCase()+'. Your reference is '+c.id+'. Our team is reviewing the delivery requirements and will keep you updated.',atts:[]});
  emails.push({key:c.id+'|in',from:c.contact,addr:c.email,to:'operations@aalogistik.se',subject:c.subject,date:c.created,body:incoming?.body||c.body,atts:c.attachments||[]});
  const kind=n=>(String(n).split('.').pop()||'').toUpperCase().slice(0,4),kbg=k=>({PDF:'#d93b3b',XLSX:'#1f8a4c',XLS:'#1f8a4c',DOCX:'#2a63c4',DOC:'#2a63c4',TXT:'#56657a',XML:'#7b8aa3',JPG:'#2f8f6b',PNG:'#2f8f6b'}[k]||'#56657a');
  let emailRows=emails.map(e=>{
    let open=isEmailOpen(e.key),subj=E(e.subject);
    return '<div style="border-bottom:1px solid #edf1f5;background:'+(open?'#f9fbfd':'#fff')+'">'
      +'<button type="button" onclick="toggleCaseEmailRow(\''+e.key+'\')" aria-expanded="'+open+'" data-aa-style="aa-static-style-205">'
      +commAvatar(e.from)
      +'<span data-aa-style="aa-static-style-67">'
        +'<b>'+E(e.from)+'</b> <span data-aa-style="aa-static-style-51">&lt;'+E(e.addr)+'&gt;</span>'
        +'<span data-aa-style="aa-static-style-207">'+subj+'</span>'
        +(open ? '<span data-aa-style="aa-static-style-208">to '+E(e.to)+'</span>' : '<span data-aa-style="aa-static-style-209">'+E(String(e.body).replace(/\s+/g,' ').slice(0,110))+'</span>')
      +'</span>'
      +'<span data-aa-style="aa-static-style-210">'
        +(e.atts && e.atts.length ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" data-aa-style="aa-static-style-211" aria-hidden="true"><path d="M21 11.5l-8.6 8.6a5.5 5.5 0 01-7.8-7.8l8.6-8.6a3.7 3.7 0 015.2 5.2l-8.6 8.6a1.8 1.8 0 01-2.6-2.6l7.9-7.9"/></svg> '+e.atts.length+' &nbsp; ' : '')
        +E(e.date)
      +'</span>'
      +'<span data-aa-style="aa-static-style-51">'+(open?'⌃':'⌄')+'</span>'
      +'</button>'
      +(open ? '<div data-aa-style="aa-static-style-212">'
        +'<div data-aa-style="aa-static-style-214">'+E(e.body)+'</div>'
        +(e.atts && e.atts.length ? '<div data-aa-style="aa-static-style-215">Attachments ('+e.atts.length+')</div><div data-aa-style="aa-static-style-216">'+e.atts.map(a=>'<div data-aa-style="aa-static-style-217">'+fileTypeIcon(a)+'<span>'+E(a)+'</span><button type="button" title="Download" onclick="downloadAttachment(\''+E(a).replace(/'/g,'')+'\')" data-aa-style="aa-static-style-218">↓</button></div>').join('')+'</div>' : '')
        +'</div>' : '')
      +'</div>';
  }).join('');
  const seq=S.noteSort==='newest'?[...notes].reverse():notes;
  const total=notes.length;
  const list=notes.length?seq.map(n=>noteRow(n,false)).join(''):'<div data-aa-style="aa-static-style-226">No comments yet. Start the discussion below.</div>';
  return '<div data-aa-style="aa-static-style-227">'
   +'<div style="'+card+'"><div data-aa-style="aa-static-style-228"><div><strong class="comm-heading">Email Communication ('+emails.length+')</strong></div><button type="button" onclick="caseEmailAction(\'New Email\',\'\')" data-aa-style="aa-static-style-229">+ Compose Email</button></div>'+emailRows+'</div>'
   +'<div style="'+card+';display:flex;flex-direction:column;min-height:360px"><div data-aa-style="aa-static-style-230" style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px"><div><strong class="comm-heading">Internal Communication ('+total+')</strong></div><select aria-label="Sort comments" onchange="setNoteSort(this.value)" style="height:32px;border:1px solid var(--line);border-radius:5px;background:#fff;font:inherit;font-size:12px;font-weight:600;color:var(--ink);padding:0 8px;cursor:pointer;flex:none"><option value="oldest" '+(S.noteSort==='newest'?'':'selected')+'>Oldest first</option><option value="newest" '+(S.noteSort==='newest'?'selected':'')+'>Newest first</option></select></div>'
   +'<div data-aa-style="aa-static-style-231">'+list+'</div>'
   +'<div data-aa-style="aa-static-style-232">'+replyBanner()+'<div data-aa-style="aa-static-style-174">'+commAvatar(actorName(),32)+'<input id="case-comment-v2" value="'+E(S.commentDraft||'')+'" oninput="S.commentDraft=this.value" placeholder="Add a comment… Use @ to mention a person or # to link a task" data-aa-style="aa-static-style-233"><button type="button" title="Attach file" aria-label="Attach file" onclick="attachCommentFile()" data-aa-style="aa-static-style-234">'+'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" data-aa-style="aa-static-style-211" aria-hidden="true"><path d="M21 11.5l-8.6 8.6a5.5 5.5 0 01-7.8-7.8l8.6-8.6a3.7 3.7 0 015.2 5.2l-8.6 8.6a1.8 1.8 0 01-2.6-2.6l7.9-7.9"/></svg>'+'</button><button type="button" onclick="postInternalComment()" data-aa-style="aa-static-style-235">Add Comment</button></div>'+(pendingFiles.length?'<div style="display:flex;flex-wrap:wrap;gap:6px;padding:8px 0 0 42px">'+commentFileChips(pendingFiles,i=>'removeCommentFile('+i+')')+'</div>':'')+'</div></div></div>';
};

function fileTypeIcon(name){let k=(String(name).split('.').pop()||'').toLowerCase(),col={pdf:'#d93b3b',xlsx:'#1f8a4c',xls:'#1f8a4c',docx:'#2a63c4',doc:'#2a63c4'}[k]||'#56657a';return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${k.toUpperCase()} file" style="flex:none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>`}
function activeEmailTemplates(){return (window.MASTER_EMAIL_TEMPLATES||[]).filter(t=>AA_ADMIN.isActive('emailTemplates',t.id))}
function emailTemplateSelect(current,onchange,blankLabel='Select template'){return `<label class="compose-field">Template<select onchange="${onchange}"><option value="" ${!current?'selected':''}>${blankLabel}</option>${activeEmailTemplates().map(t=>`<option value="${t.id}" ${current===t.id?'selected':''}>${editorText(t.name)}</option>`).join('')}</select></label>`}
function emailTemplateText(id,ctx){let t=(window.MASTER_EMAIL_TEMPLATES||[]).find(x=>x.id===id);if(!t)return {subject:'',body:''};
  // ctx.values comes from emailTemplateValues(case). Callers that only have the acknowledgement fields pass those four instead.
  let missing=ctx.missing||[],values=ctx.values||{contactName:ctx.first||'there',caseId:ctx.caseId,statusSummary:ctx.status,missingFields:missing.length?missing.join('\n'):'- Please list the missing details'};
  // A request in the email review has no Case yet, so the phrases that carry the case reference are dropped.
  let subj=t.subject,body=t.body;
  if(!values.caseId){const drop=x=>x.replace(/\s*[—–-]\s*\{\{caseId\}\}/g,'').replace(/ with case \{\{caseId\}\},/g,',').replace(/ and opened case \{\{caseId\}\}/g,'').replace(/ of case \{\{caseId\}\}/g,' of your request');subj=drop(subj);body=drop(body)}
  return {subject:resolveEmailTemplate(subj,values),body:resolveEmailTemplate(body,values)}}
function emailTemplateFor(id,c){let missing=outstandingCaseFields(c).map(x=>'- '+x.label);return emailTemplateText(id,{values:emailTemplateValues(c,missing)})}
function applyEmailTemplate(id){if(!id){S.editorData.template='';render();return}if(S.editorData.reviewId&&window.AA_REVIEW&&AA_REVIEW.templateText){let T=AA_REVIEW.templateText(id,S.editorData.reviewId);Object.assign(S.editorData,{template:id,subject:T.subject,body:T.body});render();return}let d=S.editorData,c=d.caseId?CASE_DETAILS[d.caseId]:selectedCaseData(),T=emailTemplateFor(id,c);Object.assign(d,{template:id,subject:T.subject,body:T.body});render()}
const emailComposeOpenBase=openCommunication;openCommunication=function(mode,id=''){emailComposeOpenBase(mode,id);if(S.editorType==='compose'&&mode!=='Internal Note'){let c=selectedCaseData();S.editorData.from=SENDER_ADDRESSES[1];if(mode==='New Email')S.editorData.to=c.email;render()}};
function AAEmailModal({title,subtitle='',notice='',fields='',message='',footer='',close='closeEditor()'}){
  return `<div class="modal-shade email-modal-shade" onclick="if(event.target===this){${close}}"><div class="assign-modal email-compose-modal" role="dialog" aria-modal="true" aria-label="${editorText(title)}"><div class="compose-head"><div><strong>${editorText(title)}</strong>${subtitle?`<span>${editorText(subtitle)}</span>`:''}</div><button type="button" class="compose-close" aria-label="Close" onclick="${close}">×</button></div>${notice?`<div class="compose-notice">${notice}</div>`:''}<div class="compose-body">${fields}${message}</div><div class="compose-foot">${footer}</div></div></div>`;
}
const SENDER_ADDRESSES=['terminal@aalogistik.se','transport@aalogistik.se'];
function emailFromToFields(d,c){if(!SENDER_ADDRESSES.includes(d.from))d.from=SENDER_ADDRESSES[1];let from=d.from,options=SENDER_ADDRESSES.map(a=>({value:a,label:a}));
  return `<div class="compose-grid"><label class="compose-field">From<select onchange="editField('from',this.value)">${options.map(o=>`<option value="${editorText(o.value)}" ${o.value===from?'selected':''}>${editorText(o.label)}</option>`).join('')}</select></label><label class="compose-field">To<input type="text" value="${editorText(d.to||c.email)}" oninput="editField('to',this.value)" placeholder="recipient@company.com"></label></div><label class="compose-field">CC<input type="text" value="${editorText(d.cc||'')}" oninput="editField('cc',this.value)" placeholder="Add people to copy, separated by commas"></label>`}
function emailComposeModal(d){
  let c=selectedCaseData();
  const templates=[['','Select template'],...activeEmailTemplates().map(t=>[t.id,t.name])];
  return AAEmailModal({title:d.mode,subtitle:`${c.id} · ${c.customer}`,
    fields:`<label class="compose-field">Template<select onchange="applyEmailTemplate(this.value)">${templates.map(([v,l])=>`<option value="${v}" ${(d.template||'')===v?'selected':''}>${l}</option>`).join('')}</select></label>`+emailFromToFields(d,c)+`<label class="compose-field">Subject<input type="text" value="${editorText(d.subject||'')}" oninput="editField('subject',this.value)" placeholder="Subject"></label>`,
    message:`<label class="compose-field">Message<textarea oninput="editField('body',this.value)">${editorText(d.body||'')}</textarea></label>`,
    footer:`<button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" onclick="sendCommunication()">Send Email</button>`});
}
function emailAckPreviewModal(d){
  let c=CASE_DETAILS[d.caseId];
  return AAEmailModal({title:'Review Acknowledgement',subtitle:`${c.id} · ${c.customer}`,
    fields:`<div class="compose-field-half">${emailTemplateSelect(d.template||'tpl-ack','applyEmailTemplate(this.value)')}</div>`+emailFromToFields(d,c),
    message:`<label class="compose-field">Message<textarea oninput="editField('body',this.value)">${editorText(d.body||'')}</textarea></label>`,
    footer:`<button class="btn" onclick="closeEditor()">Cancel</button><button class="btn primary" onclick="confirmAcknowledgement()">Send Acknowledgement</button>`});
}
const emailModalDialogBase=editorDialog;editorDialog=function(){let d=S.editorData;if(S.editorType==='compose'&&d.mode!=='Internal Note')return emailComposeModal(d);if(S.editorType==='ackPreview')return emailAckPreviewModal(d);return emailModalDialogBase()};
if(!window.__emailEscBound){window.__emailEscBound=true;document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;let close=document.querySelector('.email-modal-shade .compose-close');if(close){e.preventDefault();close.click()}})}
document.head.insertAdjacentHTML('beforeend',`<style>.email-compose-modal{width:min(640px,calc(100vw - 40px));max-height:90vh;display:flex;flex-direction:column;padding:0;overflow:hidden}.compose-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:16px 20px;border-bottom:1px solid var(--line)}.compose-head strong{display:block;font-size:17px;color:var(--ink)}.compose-head span{font-size:12px;color:var(--muted)}.compose-close{width:32px;height:32px;flex:none;border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--muted);font-size:18px;line-height:1;cursor:pointer}.compose-close:hover{background:var(--bluebg);color:var(--blue)}.compose-body{display:flex;flex-direction:column;gap:14px;padding:18px 20px;overflow:auto}.compose-field{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:700;color:#425169}.compose-field select,.compose-field input,.compose-field textarea{width:100%;box-sizing:border-box;border:1px solid var(--line);border-radius:6px;padding:9px 11px;font:inherit;font-size:13px;font-weight:500;color:var(--ink);background:#fff}.compose-field textarea{min-height:200px;resize:vertical;line-height:1.5}.compose-field select:focus,.compose-field input:focus,.compose-field textarea:focus{outline:2px solid rgba(8,119,209,.16);border-color:var(--blue)}.compose-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.compose-field-half{width:50%}.compose-field-half .compose-field{width:100%}.compose-hint{font-weight:400;color:var(--muted);font-size:11px}.comm-heading{font-weight:800}.email-compose-modal .compose-body{flex:1 1 auto;min-height:0}.compose-foot{flex:none}.compose-notice{flex:none;margin:14px 20px 0;padding:10px 12px;border:1px solid #efd69b;background:var(--amberbg);color:#77520b;border-radius:6px;font-size:12.5px;line-height:1.45}.compose-field input:disabled,.compose-field textarea:disabled{background:#f5f8fb;color:var(--muted)}.compose-foot{display:flex;justify-content:flex-end;gap:9px;padding:14px 20px;border-top:1px solid var(--line);background:#fff}@media(max-width:620px){.compose-grid{grid-template-columns:1fr}}</style>`);

/* Login: demo Administrator access details. User Master: email and last login columns. */
function userEmail(u){return u.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'.')+'@aalogistik.se'}
const USER_LAST_LOGIN={daniel:'20/10/2026, 08:15',john:'20/10/2026, 08:42',maria:'19/10/2026, 16:20',sofia:'19/10/2026, 11:05'};
// Only a recorded login is shown. A user who has never signed in (for example one just added) shows Never.
function userLastLogin(u,i){return USER_LAST_LOGIN[u.id]||'Never'}
const demoLoginViewBase=loginView;
loginView=function(){
  let html=demoLoginViewBase(),accounts=[USERS.find(u=>u.id===SYSTEM_ADMIN_ID),USERS.find(u=>u.id==='john')].filter(Boolean);
  let rows=accounts.map(u=>'<div data-aa-style="aa-static-style-236"><div><strong>'+u.name+'</strong> <span data-aa-style="aa-static-style-51">· '+(u.id===SYSTEM_ADMIN_ID?'System Admin':'Reviewer')+'</span><div data-aa-style="aa-static-style-237">'+userEmail(u)+'</div></div><button type="button" onclick="loginAs(\''+u.id+'\')" data-aa-style="aa-static-style-238">Sign in</button></div>').join('');
  let box='<div data-aa-style="aa-static-style-239"><div data-aa-style="aa-static-style-118">Demo accounts</div>'+rows+'</div>';
  return html.replace('<span class="login-security">',box+'<span class="login-security">');
};
function loginAs(id){sessionStorage.removeItem('aa-logistik-show-login');S.loggedIn=true;selectUser(id)}
const userMasterColumnsBase=userManagement;
userManagement=function(){
  let html=userMasterColumnsBase();if(S.role!=='Admin')return html;
  let t=document.createElement('template');t.innerHTML=html;
  let table=t.content.querySelector('table');if(!table)return html;
  let hr=table.querySelector('thead tr');if(hr&&!hr.querySelector('.th-email')){
    hr.cells[0].insertAdjacentHTML('afterend','<th class="th-email">Email</th>');
    hr.insertAdjacentHTML('beforeend','<th class="th-login">Last Login</th>')}
  table.querySelectorAll('tbody tr').forEach((tr,i)=>{if(tr.querySelector('.td-email'))return;let name=tr.cells[0]?.querySelector('strong')?.textContent.trim(),u=USER_MASTER.find(x=>x.name===name);if(!u)return;
    tr.cells[0].insertAdjacentHTML('afterend','<td class="td-email"><a href="mailto:'+userEmail(u)+'" onclick="event.stopPropagation()">'+userEmail(u)+'</a></td>');
    tr.insertAdjacentHTML('beforeend','<td class="td-login">'+userLastLogin(u,USER_MASTER.indexOf(u))+''+'</td>')});
  return t.innerHTML;
};

/* Home-screen filters: each role's primary attention table gets a scoped filter bar. */
S.homeFilters = S.homeFilters || { reviewer: { priority: 'All', customer: 'All' }, manager: { priority: 'All', risk: 'All' }, user: { priority: 'All' } };
function setHomeFilter(scope, key, value) { S.homeFilters[scope][key] = value; render() }
function resetHomeFilter(scope) { Object.keys(S.homeFilters[scope]).forEach(k => S.homeFilters[scope][k] = 'All'); render() }
function homeFilterBar(scope, fields) { let f = S.homeFilters[scope], active = Object.values(f).some(v => v !== 'All'); return `<div class="filters" data-aa-style="aa-static-style-240">${fields.map(([key, vals, label]) => `<select aria-label="${label}" onchange="setHomeFilter('${scope}','${key}',this.value)">${optionList(vals, f[key], label)}</select>`).join('')}${active ? `<button class="btn" onclick="resetHomeFilter('${scope}')">Reset filters</button>` : ''}</div>` }


reviewerAttentionTable = function () {
  let f = S.homeFilters.reviewer, all = reviewerHomeRequests(), rank = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
  let customers = [...new Set(all.map(r => r[1]))].filter(n => window.inCustomerMaster(n)).sort();
  let rows = all.filter(r => (f.priority === 'All' || requestPriority(r) === f.priority) && (f.customer === 'All' || r[1] === f.customer))
    .slice().sort((a, b) => (rank[requestPriority(a)] ?? 9) - (rank[requestPriority(b)] ?? 9) || reviewerRequestDueDateTime(a[0]).localeCompare(reviewerRequestDueDateTime(b[0]))).slice(0, 8);
  let bar = homeFilterBar('reviewer', [['priority', ['Urgent', 'High', 'Medium', 'Low'], 'All Priorities'], ['customer', customers, 'All Customers']]);
  let body = rows.length ? `<table><thead><tr><th>Reference</th><th>Subject</th><th>Customer</th><th>Priority</th><th>Due Date / Time</th><th>Current Stage</th></tr></thead><tbody>${rows.map(row => `<tr tabindex="0" onclick="openReviewCase('${row[0]}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openReviewCase('${row[0]}')}" aria-label="Open ${row[0]}"><td><strong class="id">${row[0]}</strong></td><td>${editorText(row[2])}</td><td>${editorText(row[1])}</td><td>${pill(requestPriority(row))}</td><td>${editorText(reviewerRequestDueDateTime(row[0]))}</td><td>${pill(row[6] === 'Needs Clarification' ? 'Missing Information' : 'Awaiting Review')}</td></tr>`).join('')}</tbody></table>` : `<div class="empty-search"><strong>No requests match these filters.</strong><br>Change or reset the filters.</div>`;
  return `<section class="card reviewer-attention"><div class="card-head"><div><h2>Attention Needed</h2><span class="sub">Prioritised by urgency and due date</span></div><button class="link" onclick="openReviewerHomeView('Awaiting Review')">View all requests</button></div>${bar}<div class="table-wrap">${body}</div></section>`
};


managerAttentionQueue = function () {
  let u = currentUser(), f = S.homeFilters.manager, team = TASKS.filter(t => t[3] === u.department).filter(t => effectiveTaskStatus(t) !== 'Completed');
  let base = team.filter(t => t[4] === 'Unassigned' || taskDeadlineState(t) === 'Overdue' || taskDeadlineState(t) === 'Due Today' || unresolvedDependencies(t).length);
  if (!base.length) return '';
  function riskKey(t) { return t[4] === 'Unassigned' ? 'Unassigned' : unresolvedDependencies(t).length ? 'Blocked' : taskDeadlineState(t) === 'Overdue' ? 'Overdue' : 'Due Today' }
  let rows = base.filter(t => (f.priority === 'All' || t[5] === f.priority) && (f.risk === 'All' || riskKey(t) === f.risk))
    .sort((a, b) => { let rank = x => x[4] === 'Unassigned' ? 0 : taskDeadlineState(x) === 'Overdue' ? 1 : taskDeadlineState(x) === 'Due Today' ? 2 : 3; return rank(a) - rank(b) }).slice(0, 8);
  let bar = homeFilterBar('manager', [['priority', [...new Set(base.map(t => t[5]))], 'All Priorities'], ['risk', ['Unassigned', 'Overdue', 'Due Today', 'Blocked'], 'All Reasons']]);
  let body = rows.length ? `<table><thead><tr><th>Task Ref</th><th>Assignee</th><th>Task</th><th>Priority</th><th>Due</th><th>Risk</th><th>Action</th></tr></thead><tbody>${rows.map(t => { let risk = t[4] === 'Unassigned' ? 'Unclaimed task' : unresolvedDependencies(t).length ? `Blocked by ${unresolvedDependencies(t).length} ${unresolvedDependencies(t).length === 1 ? 'Task' : 'Tasks'}` : taskDeadlineState(t) === 'Overdue' ? 'Overdue' : 'Due today'; return `<tr tabindex="0" onclick="openTask('${t[8]}')"><td><strong class="id">${t[8]}</strong></td><td>${t[4] === 'Unassigned' ? '<span class="sub">Unassigned</span>' : `<span class="assignee-cell"><span class="row-avatar">${casePersonInitials(t[4])}</span>${editorText(t[4])}</span>`}</td><td>${editorText(t[0])}</td><td>${pill(t[5])}</td><td>${editorText(t[6])}</td><td><span class="pill ${risk==='Overdue'?'red':risk==='Unclaimed task'?'amber':'blue'}">${editorText(risk)}</span></td><td><button class="btn" onclick="event.stopPropagation();openTask('${t[8]}')">Open</button></td></tr>` }).join('')}</tbody></table>` : `<div class="empty-state"><strong>No Tasks match these filters.</strong><p>Change or reset the filters.</p></div>`;
  return `<section class="card"><div class="card-head"><div><h2>Department Head Attention Queue</h2><span class="sub">Tasks that may need your intervention or reassignment</span></div><button class="link" onclick="go('department')">View All</button></div>${bar}<div class="table-wrap">${body}</div></section>`
};


/* Notifications panel, Review Requests tab consolidation, thread counts, Rejected tracking. */
(function () {
  let mi = SOURCE_FILTERS.indexOf('Manual'); if (mi > -1) SOURCE_FILTERS.splice(mi, 1);
  window.REJECTED_QUEUE = (window.REJECTED_QUEUE && window.REJECTED_QUEUE.length) ? window.REJECTED_QUEUE : [
    { id: 'EML-3415', customer: 'Scania CV AB', subject: 'Inquiry – oversized chassis transit permit', at: '06/10/2026, 14:15', reason: 'Out of operating scope' },
    { id: 'EML-3412', customer: 'Volvo GTT', subject: 'Duplicate order – engine mounting brackets', at: '05/10/2026, 11:30', reason: 'Duplicate of CASE-401032' },
    { id: 'EML-3408', customer: 'Sandvik Mining', subject: 'Spam / Automated newsletter', at: '04/10/2026, 09:05', reason: 'Non-operational correspondence' }
  ];
  /* Notification Model & Component (Matching Figma UI Specification) */
  const MOCK_CASES_SEED = [
    {
      id: 'CASE-400381',
      no: '#400381',
      customer: 'ABB Robotics',
      subject: 'Transport and storage request – electrical drive',
      cat: ['Transport booking', 'Storage'],
      type: ['New Booking'],
      departments: 'Transport, Warehouse',
      priority: 'High',
      due: '16/10/2026',
      status: 'In Progress',
      contact: 'Thomas Weber',
      email: 'thomas.weber@abb.com',
      goods: 'Electrical drive & high-voltage inverter assemblies',
      pickup: 'Västerås, Sweden',
      delivery: 'Munich, Germany',
      weight: '3,150 kg',
      tasks: [
        { title: 'Review customer information', owner: 'John Andersson', dept: 'Transport', status: 'In Progress', priority: 'High', due: 'Today', id: 'TASK-400381-1' },
        { title: 'Reserve temperature-controlled storage', owner: 'Maria Nilsson', dept: 'Warehouse', status: 'Ready', priority: 'High', due: 'Tomorrow', id: 'TASK-400381-2' }
      ],
      note: '@John Andersson please review the storage requirements and temperature limits for the electrical drive before booking the warehouse bay.',
      noteAuthor: 'Maria Nilsson',
      attachments: ['Packing_List_Drive.pdf', 'Technical_Spec_Inverter.pdf']
    },
    {
      id: 'CASE-400380',
      no: '#400380',
      customer: 'Volvo GTT',
      subject: 'Export transport to Germany',
      cat: ['Export'],
      type: ['New Booking'],
      departments: 'Transport, Freight',
      priority: 'Medium',
      due: '17/10/2026',
      status: 'In Progress',
      contact: 'Stefan Larsson',
      email: 'stefan.larsson@volvo.com',
      goods: 'Heavy powertrain modules',
      pickup: 'Gothenburg, Sweden',
      delivery: 'Hannover, Germany',
      weight: '5,400 kg',
      tasks: [
        { title: 'Request transport quotation', owner: 'John Andersson', dept: 'Transport', status: 'Ready', priority: 'Medium', due: 'Today', id: 'TASK-400380-1' }
      ]
    },
    {
      id: 'CASE-400379',
      no: '#400379',
      customer: 'Scania CV AB',
      subject: 'Warehouse storage request',
      cat: ['Storage'],
      type: ['New Booking'],
      departments: 'Warehouse',
      priority: 'Medium',
      due: '18/10/2026',
      status: 'In Progress',
      contact: 'Johan Berg',
      email: 'johan.berg@scania.com',
      goods: 'Chassis cross-members',
      pickup: 'Södertälje, Sweden',
      delivery: 'AA Logistik Hub',
      weight: '2,800 kg'
    },
    {
      id: 'CASE-400378',
      no: '#400378',
      customer: 'Sandvik Mining',
      subject: 'Transport quotation request',
      cat: ['Transport booking'],
      type: ['Inquiry'],
      departments: 'Transport',
      priority: 'High',
      due: '19/10/2026',
      status: 'Waiting',
      contact: 'Lars Hedin',
      email: 'lars.hedin@sandvik.com',
      goods: 'Mining drill spare assemblies',
      pickup: 'Sandviken, Sweden',
      delivery: 'Kiruna, Sweden',
      weight: '1,950 kg',
      customerReply: 'Customer has replied to your request: delivery window confirmed for Thursday morning.'
    },
    {
      id: 'CASE-400377',
      no: '#400377',
      customer: 'Hitachi Energy',
      subject: 'Import shipment clearance',
      cat: ['Import', 'PO Confirmation'],
      type: ['New Booking', 'Documentation / Administration'],
      departments: 'Freight, Customs',
      priority: 'Medium',
      due: '20/10/2026',
      status: 'In Progress',
      contact: 'Linnea Berg',
      email: 'linnea.berg@hitachienergy.com',
      goods: 'Transformer bushings',
      pickup: 'Rotterdam Port',
      delivery: 'Ludvika, Sweden',
      weight: '4,100 kg'
    },
    {
      id: 'CASE-400376',
      no: '#400376',
      customer: 'Alstom',
      subject: 'Collection and delivery scheduling',
      cat: ['Transport booking'],
      type: ['Status / Follow-up'],
      departments: 'Transport',
      priority: 'Medium',
      due: '21/10/2026',
      status: 'In Progress',
      contact: 'Claire Moreau',
      email: 'claire.moreau@alstom.com',
      goods: 'Traction equipment',
      pickup: 'Västerås, Sweden',
      delivery: 'Paris, France',
      weight: '3,800 kg',
      attachments: ['Packing List.xlsx', 'Delivery_Schedule.pdf']
    },
    {
      id: 'CASE-400375',
      no: '#400375',
      customer: 'Westinghouse Electric',
      subject: 'Dangerous goods transport',
      cat: ['Transport booking', 'Storage'],
      type: ['Issue / Investigation / Complaint'],
      departments: 'Transport, Safety, Warehouse',
      priority: 'High',
      due: '15/10/2026',
      status: 'Blocked',
      contact: 'Magnus Eklund',
      email: 'magnus.eklund@westinghouse.com',
      goods: 'Radioactive calibration sensors / ADR Class 7',
      pickup: 'Västerås, Sweden',
      delivery: 'Forsmark, Sweden',
      weight: '850 kg',
      tasks: [
        { title: 'Arrange warehouse storage', owner: 'John Andersson', dept: 'Warehouse', status: 'Overdue', priority: 'High', due: '15/10/2026', id: 'TASK-400375-1' }
      ]
    },
    {
      id: 'CASE-400374',
      no: '#400374',
      customer: 'Nefab',
      subject: 'Additional storage request',
      cat: ['Storage'],
      type: ['Modification / Additional Request'],
      departments: 'Warehouse',
      priority: 'Low',
      due: '22/10/2026',
      status: 'In Progress',
      contact: 'Karin Holm',
      email: 'karin.holm@nefab.se',
      goods: 'Protective packaging crates',
      pickup: 'Jönköping, Sweden',
      delivery: 'AA Logistik Hub',
      weight: '1,200 kg',
      body: 'Hello AA Logistik team,\n\nNefab needs additional storage for protective packaging crates at the AA Logistik Hub.\n\nGoods: Protective packaging crates\nQuantity: 8 pallets\nTotal weight: 1,200 kg\nPickup: Nefab, Jönköping, Sweden\nDelivery: AA Logistik Hub\nRequired by: 22/10/2026\nStorage: dry indoor storage, up to 6 months\n\nPlease confirm capacity and the storage terms.\n\nBest regards,\nKarin Holm\nNefab\nkarin.holm@nefab.se'
    },
    {
      id: 'CASE-400373',
      no: '#400373',
      customer: 'ABB Robotics',
      subject: 'Transport order change request',
      cat: ['Transport booking'],
      type: ['Modification / Additional Request'],
      departments: 'Transport',
      priority: 'Medium',
      due: '23/10/2026',
      status: 'In Progress',
      contact: 'Thomas Weber',
      email: 'thomas.weber@abb.com',
      goods: 'Robot controller cabinets',
      pickup: 'Västerås, Sweden',
      delivery: 'Munich, Germany',
      weight: '2,600 kg'
    },
    {
      id: 'CASE-400372',
      no: '#400372',
      customer: 'Scania CV AB',
      subject: 'New transport order – components',
      cat: ['Transport booking'],
      type: ['New Booking'],
      departments: 'Transport',
      priority: 'Medium',
      due: '24/10/2026',
      status: 'In Progress',
      contact: 'Erik Johansson',
      email: 'erik.johansson@scania.com',
      goods: 'Engine cylinder blocks',
      pickup: 'Södertälje, Sweden',
      delivery: 'Zwolle, Netherlands',
      weight: '6,200 kg'
    },
    {
      id: 'CASE-400370',
      no: '#400370',
      customer: 'Hitachi Energy',
      subject: 'Inquiry – transformer logistics',
      cat: ['Transport booking'],
      type: ['Inquiry'],
      departments: 'Transport',
      priority: 'Medium',
      due: '25/10/2026',
      status: 'In Progress',
      contact: 'Thomas Weber',
      email: 'thomas.weber@hitachienergy.com',
      goods: 'High-voltage transformer spares',
      pickup: 'Ludvika, Sweden',
      delivery: 'Oslo, Norway',
      weight: '4,500 kg',
      note: 'Thomas Weber commented on Case #400370: Confirmed crane capacity at Ludvika substation is 25t.',
      noteAuthor: 'Thomas Weber'
    }
  ];

  // Seed CASES and CASE_DETAILS with these cases
  MOCK_CASES_SEED.forEach(c => {
    let cats = c.cat || ['Transport booking'], types = c.type || ['New Booking'], catStr = cats.join(', '), typeStr = types.join(', ');
    let caseDetailObj = {
      id: c.id,
      no: c.no,
      customer: c.customer,
      caseClass: typeStr,
      contact: c.contact,
      email: c.email,
      phone: '+46 21 32 50 00',
      customerNo: '1000123',
      goods: c.goods,
      pickup: c.pickup,
      delivery: c.delivery,
      priority: c.priority,
      classification: catStr,
      category: catStr,
      subcategory: catStr,
      requestedDate: c.due,
      due: c.due,
      status: c.status,
      weight: c.weight,
      subject: c.subject,
      body: c.body || `Hello AA Logistik team,\n\nRegarding ${c.subject}. Please proceed with operational coordination.\n\nBest regards,\n${c.contact}\n${c.customer}`,
      departments: c.departments,
      reference: `PO-${c.id.replace('CASE-','')}-2026`,
      confidence: 94,
      created: '07/10/2026, 09:18',
      attachments: c.attachments || [`Shipment_${c.id}.pdf`],
      classes: ['Transport booking', 'Delivery coordination']
    };
    CASE_DETAILS[c.id] = caseDetailObj;
    CASE_DETAILS[c.no] = caseDetailObj;

    let existingIndex = CASES.findIndex(row => row[0] === c.no || row[0] === c.id);
    let rowData = [c.id, c.customer, typeStr, c.departments, c.priority, c.due, c.status];
    if (existingIndex >= 0) {
      CASES[existingIndex] = rowData;
    } else {
      CASES.unshift(rowData);
    }

    if (c.tasks && c.tasks.length) {
      c.tasks.forEach(task => {
        if (!TASKS.some(t => t[8] === task.id)) {
          TASKS.unshift([task.title, c.id, c.customer, task.dept, task.owner, task.priority, task.due, task.status, task.id, 'Transport booking', task.due === 'Today' ? 'Today' : 'Later']);
        }
      });
    }

    if (c.note) {
      if (!S.notes.some(n => n.caseId === c.id)) {
        S.notes.unshift({ caseId: c.id, text: c.note, author: c.noteAuthor || 'Maria Nilsson', at: '2m ago', pinned: true });
      }
    }

    if (c.customerReply) {
      if (!S.communications.some(m => m.caseId === c.id && m.subject.includes('Customer Reply'))) {
        S.communications.unshift({
          id: `MSG-${c.id}-1`,
          caseId: c.id,
          direction: 'Incoming',
          subject: 'Customer Reply: Transport quotation confirmation',
          caseClass: 'Follow Up',
          body: c.customerReply,
          author: c.contact,
          at: '4h ago'
        });
      }
    }
  });

  S.notifRead = (typeof S !== 'undefined' && S && S.notifRead) ? S.notifRead : {};
  document.head.insertAdjacentHTML('beforeend', `<style>/* Notification Row Unread / Read Background Highlighting (Design System Tokens) */.notif-row {  display: flex;  align-items: flex-start;  gap: 10px;  padding: 11px 20px 11px 17px;  cursor: pointer;  transition: background 0.15s ease, border-color 0.15s ease;  border: 0;  width: 100%;  text-align: left;  box-sizing: border-box;  text-decoration: none;  font: inherit;  color: inherit;}/* Unread notifications: highlighted with signature AA Logistik blue tint */.notif-row.is-unread {  background: #eaf4ff !important;  border-bottom: 1px solid #d8e6f5 !important;  border-left: 3px solid #0877d1 !important;}.notif-row.is-unread:hover {  background: #dfeefa !important;}/* Read notifications: clean neutral background */.notif-row.is-read {  background: #ffffff !important;  border-bottom: 1px solid #f1f5f9 !important;  border-left: 3px solid transparent !important;}.notif-row.is-read:hover {  background: #f8fafc !important;}</style>`);
  document.head.insertAdjacentHTML('beforeend', `<style>/* Clean, Uncluttered, Non-Flashy Notification Icons */.notif-icon-wrap {  width: 34px !important;  height: 34px !important;  border-radius: 8px !important;  background: #f1f5f9 !important;  border: 1px solid #e2e8f0 !important;  color: #475569 !important;  display: flex !important;  align-items: center !important;  justify-content: center !important;  flex: none !important;  margin-top: 1px !important;}/* Override all flashy saturated theme backgrounds with clean, calm styling */.notif-icon-wrap.theme-blue,.notif-icon-wrap.theme-red,.notif-icon-wrap.theme-amber,.notif-icon-wrap.theme-purple,.notif-icon-wrap.theme-green,.notif-icon-wrap.theme-slate {  background: #f1f5f9 !important;  border: 1px solid #e2e8f0 !important;  color: #475569 !important;}</style>`);
  window.NotificationModel = {
    items: [
      {
        id: 'n1',
        type: 'mention',
        title: 'You were mentioned',
        time: '2m ago',
        body: 'Maria Nilsson mentioned you in a comment',
        ref: 'Case #400381',
        caseId: 'CASE-400381',
        caseNo: '#400381',
        targetType: 'case',
        tab: 'Communication',
        iconTheme: 'blue',
        unread: true
      },
      {
        id: 'n2',
        type: 'task_assigned',
        title: 'New task assigned',
        time: '15m ago',
        body: 'You are assigned to review customer information',
        ref: 'Case #400381',
        caseId: 'CASE-400381',
        caseNo: '#400381',
        targetType: 'task',
        taskTitle: 'Review customer information',
        tab: 'Tasks',
        iconTheme: 'blue',
        unread: true
      },
      {
        id: 'n3',
        type: 'task_overdue',
        title: 'Task is overdue',
        time: '2h ago',
        body: 'Arrange warehouse storage',
        ref: 'Case #400375',
        caseId: 'CASE-400375',
        caseNo: '#400375',
        targetType: 'task',
        taskTitle: 'Arrange warehouse storage',
        tab: 'Tasks',
        iconTheme: 'red',
        unread: true
      },
      {
        id: 'n4',
        type: 'task_due_soon',
        title: 'Task is due soon',
        time: '3h ago',
        body: 'Request transport quotation',
        ref: 'Case #400380',
        caseId: 'CASE-400380',
        caseNo: '#400380',
        targetType: 'task',
        taskTitle: 'Request transport quotation',
        tab: 'Tasks',
        iconTheme: 'amber',
        unread: true
      },
      {
        id: 'n5',
        type: 'acknowledgement',
        title: 'Pending acknowledgement',
        time: '4h ago',
        body: 'Customer has replied to your request',
        ref: 'Case #400378',
        caseId: 'CASE-400378',
        caseNo: '#400378',
        targetType: 'case',
        tab: 'Communication',
        iconTheme: 'purple',
        unread: true
      },
      {
        id: 'n6',
        type: 'document',
        title: 'New document added',
        time: '5h ago',
        body: 'Packing List.xlsx added to Case #400376',
        ref: '',
        caseId: 'CASE-400376',
        caseNo: '#400376',
        targetType: 'case',
        tab: 'Order Data',
        iconTheme: 'green',
        unread: false
      },
      {
        id: 'n7',
        type: 'status_update',
        title: 'Case status updated',
        time: '1d ago',
        body: 'Case #400372 changed to In Progress<br><span data-aa-style="aa-static-style-241">by Erik Johansson</span>',
        ref: '',
        caseId: 'CASE-400372',
        caseNo: '#400372',
        targetType: 'case',
        tab: 'Overview',
        iconTheme: 'slate',
        unread: false
      },
      {
        id: 'n8',
        type: 'comment',
        title: 'New comment',
        time: '1d ago',
        body: 'Thomas Weber commented on Case #400370',
        ref: '',
        caseId: 'CASE-400370',
        caseNo: '#400370',
        targetType: 'case',
        tab: 'Communication',
        iconTheme: 'slate',
        unread: false
      }
    ],

    isUnread: function (item) {
      if (!item || !item.unread) return false;
      if (typeof S === 'undefined' || !S) return true;
      if (!S.notifRead) S.notifRead = {};
      return !S.notifRead[item.id];
    },

    getUnreadCount: function () {
      return this.items.filter(item => this.isUnread(item)).length;
    },

    getUnreadItems: function () {
      return this.items.filter(item => this.isUnread(item));
    },

    getEarlierItems: function () {
      return this.items.filter(item => !this.isUnread(item));
    },

    markAsRead: function (id) {
      if (typeof S !== 'undefined' && S) {
        if (!S.notifRead) S.notifRead = {};
        S.notifRead[id] = true;
      }
    },

    markAllAsRead: function (e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      if (typeof S !== 'undefined' && S) {
        if (!S.notifRead) S.notifRead = {};
        this.items.forEach(n => { S.notifRead[n.id] = true; });
        S.notificationsRead = true;
        render();
        if (typeof toast === 'function') toast('All notifications marked as read');
      }
    },

    toggleMenu: function (e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      S.notificationMenu = !S.notificationMenu;
      S.profileMenu = false;
      render();
    },

    closeMenu: function () {
      S.notificationMenu = false;
      render();
    },

    renderIcon: function (theme, type) {
      if (type === 'mention') {
        return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
        </svg>`;
      }
      if (type === 'task_assigned') {
        return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <polyline points="9 14 11 16 15 11"></polyline>
        </svg>`;
      }
      if (type === 'task_overdue' || type === 'task_due_soon') {
        return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>`;
      }
      if (type === 'acknowledgement' || type === 'email') {
        return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <polyline points="3 7 12 13 21 7"></polyline>
        </svg>`;
      }
      if (type === 'document') {
        return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>`;
      }
      if (type === 'status_update') {
        return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>`;
      }
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>`;
    },

    renderRow: function (item) {
      const unread = this.isUnread(item);
      return `
        <div class="notif-row ${unread ? 'is-unread' : 'is-read'}" onclick="NotificationModel.onItemClick('${item.id}', event)" role="button" tabindex="0">
          <div class="notif-icon-wrap theme-${item.iconTheme}">
            ${this.renderIcon(item.iconTheme, item.type)}
          </div>
          <div class="notif-dot-col">
            ${unread ? '<span class="notif-dot"></span>' : ''}
          </div>
          <div class="notif-main-col">
            <div class="notif-top-row">
              <span class="notif-item-title">${item.title}</span>
              <span class="notif-item-time">${item.time}</span>
            </div>
            <div class="notif-item-body">${item.body}</div>
            ${item.ref ? `<div class="notif-item-ref" onclick="NotificationModel.onRefClick('${item.id}', event)">${item.ref}</div>` : ''}
          </div>
        </div>
      `;
    },

    renderMenu: function () {
      const unread = this.getUnreadItems();
      const earlier = this.getEarlierItems();
      return `
        <div class="notif-popover" role="dialog" aria-label="Notifications" onclick="event.stopPropagation()">
          <div class="notif-popover-caret"></div>
          <div class="notif-header">
            <span class="notif-header-title">Notifications</span>
            <button type="button" class="notif-mark-all" onclick="NotificationModel.markAllAsRead(event)">Mark all as read</button>
          </div>
          <div class="notif-scroll-area">
            ${unread.length ? `
              <div class="notif-group-title">Unread (${unread.length})</div>
              ${unread.map(item => this.renderRow(item)).join('')}
            ` : ''}
            ${earlier.length ? `
              <div class="notif-group-title">Earlier</div>
              ${earlier.map(item => this.renderRow(item)).join('')}
            ` : ''}
          </div>
        </div>
      `;
    },

    onItemClick: function (id, e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      this.navigateItem(id);
    },

    onRefClick: function (id, e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      this.navigateItem(id);
    },

    navigateItem: function (id) {
      const item = this.items.find(n => n.id === id);
      if (!item) return;

      this.markAsRead(item.id);
      S.notificationMenu = false;

      const targetCaseId = item.caseId;
      if (typeof openCase === 'function') {
        openCase(targetCaseId);
      } else {
        S.selectedCase = targetCaseId;
        S.page = 'case';
      }

      if (item.tab) {
        S.caseTab = item.tab;
      }

      if (item.targetType === 'task' && item.taskTitle) {
        const task = TASKS.find(t => (t[1] === targetCaseId || String(t[1]).includes(item.caseNo.replace('#',''))) && (t[0].includes(item.taskTitle) || item.taskTitle.includes(t[0])));
        if (task && typeof openTask === 'function') {
          openTask(task[8]);
          if (typeof toast === 'function') toast(`Opened ${item.ref} · ${item.taskTitle}`);
        } else {
          if (typeof toast === 'function') toast(`Navigated to ${item.ref}`);
        }
      } else {
        if (typeof toast === 'function') toast(`Navigated to ${item.ref || targetCaseId} · ${item.title}`);
      }

      render();
    }
  };

  notificationCount = function () {
    return window.NotificationModel.getUnreadCount();
  };

  notificationMenu = function () {
    return window.NotificationModel.renderMenu();
  };

  window.openNotif = function (id) {
    window.NotificationModel.navigateItem(id);
  };

  window.markAllNotificationsRead = function () {
    window.NotificationModel.markAllAsRead();
  };

  const origOpenCase = openCase;
  openCase = function (id = 'CASE-401046', tab = null) {
    let cleanId = String(id).trim();
    if (cleanId.startsWith('#')) cleanId = 'CASE-' + cleanId.slice(1);
    else if (/^\d+$/.test(cleanId)) cleanId = 'CASE-' + cleanId;
    let match = Object.keys(CASE_DETAILS).find(k => k === cleanId || k === '#' + cleanId.replace('CASE-',''));
    if (match) cleanId = match;
    S.selectedCase = cleanId;
    S.page = 'case';
    S.drawer = false;
    if (tab) S.caseTab = tab;
    else if (!S.caseTab) S.caseTab = 'Overview';
    render();
  };
  window.openCase = openCase;

  // Close notification popover when clicking outside
  document.addEventListener('click', function (e) {
    if (S && S.notificationMenu) {
      if (!e.target.closest('.bell-wrap') && !e.target.closest('.notif-popover')) {
        S.notificationMenu = false;
        render();
      }
    }
  });

  // Enhanced Thread-message counter badge & First Acknowledgement column in Review Requests table
  S.firstAck = S.firstAck || {};
  // The review state of a request, the same one the detail page reads. The list, the quick acknowledgement and the detail page all use it.
  window.reviewStateOf = id => (typeof window.edStateOf === 'function' && QUEUE.some(x => x[0] === id)) ? window.edStateOf(id) : null;
  // The list's First Acknowledgement cell is only Done or Pending. Done: the customer has been responded to (the acknowledgement, or the clarification request, was sent). The finer states are chips on the detail page.
  window.reviewAckCell = id => {
    let s = reviewStateOf(id), fa = S.firstAck[id];
    if ((fa && fa.sent) || (s && (s.acked || s.clarified))) return `<span class="pill green" title="Sent ${editorText((fa && fa.at) || s.acked || s.clarified)}" data-aa-style="aa-static-style-251"><span>✓</span> Done</span>`;
    return `<div data-aa-style="aa-static-style-252"><span class="pill amber" data-aa-style="aa-static-style-253">Pending</span><button type="button" class="btn icon-btn" onclick="event.stopPropagation();openQuickAckModal('${id}')" title="Send acknowledgement email" aria-label="Send acknowledgement email" data-aa-style="aa-static-style-254"><span>✉</span></button></div>`;
  };
  // Classification and Case Class in the list are what the detail page shows for the request's orders.
  const reviewOrdersJoined = (id, pick, fallback) => { let s = reviewStateOf(id); let v = s ? [...new Set(s.em.px.map(pick).filter(Boolean))].join(' + ') : ''; return v || fallback };
  window.reviewClassificationOf = (id, fallback) => reviewOrdersJoined(id, o => o.cls.sub, fallback);
  window.reviewCaseClassOf = (id, fallback) => reviewOrdersJoined(id, o => o.cls.type, fallback);
  window.openQuickAckModal = function (emailId) {
    let q = QUEUE.find(x => x[0] === emailId);
    let s = reviewStateOf(emailId);
    let customer = q ? q[1] : (s ? s.cls.co : 'Customer');
    let emailAddr = s ? s.e.email : (customer.toLowerCase().replace(/[^a-z0-9]/g, '') + '@client.com');
    let contact = s ? s.e.from : customer;
    let defBody = `Hi ${contact.split(' ')[0]},\n\nThanks for reaching out! We've received your request and logged it under reference ${emailId}.\n\nOur team is looking over the details now to line up the scheduling. We'll be back in touch shortly with confirmation.\n\nBest regards,\n${typeof actorName === 'function' ? actorName() : 'John Andersson'}\nAA Logistik`;
    // The acknowledgement is the Case Acknowledgement template, the same text as on the detail page.
    if (s && typeof edAckDraftOf === 'function') defBody = edAckDraftOf(s).body;

    let modalHtml = `
      <div id="quick-ack-backdrop" onclick="if(event.target===this)closeQuickAckModal()" data-aa-style="aa-static-style-87">
        <div onclick="event.stopPropagation()" role="dialog" aria-label="Acknowledgement email" data-aa-style="aa-static-style-88">
          <div data-aa-style="aa-static-style-242">
            <div data-aa-style="aa-static-style-243">
              <b>Acknowledge Receipt</b>
              <div data-aa-style="aa-static-style-91">Pre-filled by AI from the extracted information ${emailId} · ${customer}</div>
            </div>
            ${typeof pill === 'function' ? pill('Not sent', 'amber') : ''}
            <button type="button" onclick="closeQuickAckModal()" aria-label="Close" data-aa-style="aa-static-style-92">×</button>
          </div>
          <div data-aa-style="aa-static-style-244">
            <div data-aa-style="aa-static-style-245">
              <span data-aa-style="aa-static-style-246">To</span>
              <span data-aa-style="aa-static-style-247">${contact} &lt;${emailAddr}&gt;</span>
            </div>
            <textarea id="quick-ack-body" rows="12" data-aa-style="aa-static-style-248">${editorText(defBody)}</textarea>
            <div data-aa-style="aa-static-style-246">
              This email will be logged in the email thread as an outgoing message and marks this request as acknowledged.
            </div>
          </div>
          <div data-aa-style="aa-static-style-249">
            <button type="button" class="btn" onclick="closeQuickAckModal()">Cancel</button>
            <button type="button" class="btn primary" onclick="submitQuickAck('${emailId}')">Send Acknowledgement</button>
          </div>
        </div>
      </div>
    `;
    let old = document.getElementById('quick-ack-backdrop');
    if (old) old.remove();
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  };

  window.closeQuickAckModal = function () {
    let m = document.getElementById('quick-ack-backdrop');
    if (m) m.remove();
  };

  window.submitQuickAck = function (emailId) {
    // The acknowledgement is a reply in the customer's email thread, so it keeps the thread's subject.
    let s = reviewStateOf(emailId);
    let q = QUEUE.find(x => x[0] === emailId);
    let threadSubject = s?.e?.subj || q?.[2] || 'Receipt Confirmed';
    // Same subject as the acknowledgement on the detail page: the Case Acknowledgement template.
    let subj = (s && typeof edAckDraftOf === 'function') ? edAckDraftOf(s).subj : (/^re:/i.test(threadSubject) ? threadSubject : `Re: ${threadSubject}`);
    let body = document.getElementById('quick-ack-body')?.value || '';
    let at = (typeof now === 'function') ? now() : '09/10/2026, 12:40';
    let by = (typeof actorName === 'function') ? actorName() : 'John Andersson';

    S.firstAck[emailId] = { sent: true, at, by, subject: subj, body };

    {
      let state = reviewStateOf(emailId);
      if (state) {
        state.acked = at;
        state.sent = state.sent || [];
        state.sent.push({ time: at, subj, body });
      }
    }

    if (S.activities) {
      S.activities.unshift([`First acknowledgement sent for ${emailId}`, by, at]);
    }

    closeQuickAckModal();
    render();
    if (typeof toast === 'function') toast(`First acknowledgement sent for ${emailId}`);
  };

  const threadBadgeQueueTableBase = queueTable;
  queueTable = function (home = false) {
    let html = threadBadgeQueueTableBase(home), template = document.createElement('template'); template.innerHTML = html;
    // Inject First Acknowledgement column header & cells if table exists
    template.content.querySelectorAll('table').forEach(table => {
      let theadTr = table.querySelector('thead tr');
      if (theadTr && !theadTr.querySelector('.th-first-ack')) {
        let th = document.createElement('th');
        th.className = 'th-first-ack';
        th.textContent = 'First Acknowledgement';
        th.style.whiteSpace = 'nowrap';
        // Insert right before Action column or at end
        let actionTh = [...theadTr.children].find(c => c.textContent.trim() === 'Action');
        if (actionTh) theadTr.insertBefore(th, actionTh);
        else theadTr.appendChild(th);
      }

      table.querySelectorAll('tbody tr').forEach(row => {
        let cells = [...row.children];
        let idCell = cells.find(td => /^EML-\d+$/.test((td.textContent || '').trim()));
        if (!idCell) return;
        let id = idCell.textContent.trim(), q = QUEUE.find(x => x[0] === id);
        if (!q) return;

        // Upgrade thread count pill beside Subject
        let subj = q[2];
        let subjCell = cells.find(td => td !== idCell && (td.textContent || '').includes(subj));
        if (subjCell) {
          let existingBadge = subjCell.querySelector('.thread-badge');
          if (existingBadge) existingBadge.remove();
          let n = (typeof AA_REVIEW !== 'undefined' && AA_REVIEW.threadCount) ? AA_REVIEW.threadCount(id) : 1;
          if (n > 1) {
            subjCell.insertAdjacentHTML('afterbegin', `<span class="thread-badge" title="${n} messages in thread" data-aa-style="aa-static-style-250"><span class="thread-badge-count">${n}</span></span>`);
          }
        }

        // Add First Ack cell if not present
        if (!row.querySelector('.td-first-ack')) {
          let ackData = S.firstAck[id];
          let isAcked = !!(ackData && ackData.sent) || reviewStateOf(id)?.acked;
          let ackTd = document.createElement('td');
          ackTd.className = 'td-first-ack';
          ackTd.style.whiteSpace = 'nowrap';

          if (isAcked) {
            let atText = (ackData && ackData.at) || reviewStateOf(id)?.acked || 'Sent';
            ackTd.innerHTML = `<span class="pill green" title="Sent at ${atText}" data-aa-style="aa-static-style-251"><span>✓</span> Done</span>`;
          } else {
            ackTd.innerHTML = `<div data-aa-style="aa-static-style-252">
              <span class="pill amber" data-aa-style="aa-static-style-253">Pending</span>
              <button type="button" class="btn icon-btn" onclick="event.stopPropagation();openQuickAckModal('${id}')" title="Send acknowledgement email" aria-label="Send acknowledgement email" data-aa-style="aa-static-style-254">
                <span>✉</span>
              </button>
            </div>`;
          }

          let actionTd = [...row.children].find(c => c.querySelector('button.btn.primary') || c.textContent.trim() === 'Review');
          if (actionTd) row.insertBefore(ackTd, actionTd);
          else row.appendChild(ackTd);
        }
      });
    });

    return template.innerHTML;
  };

  // Fix Classification/Case Type cells for rows where an earlier override mis-detected the reference column.
  const classificationFixQueueTableBase = queueTable;
  queueTable = function (home = false) {
    let html = classificationFixQueueTableBase(home), template = document.createElement('template'); template.innerHTML = html;
    template.content.querySelectorAll('table').forEach(table => {
      let heads = [...table.querySelectorAll('thead th')];
      let classIdx = heads.findIndex(th => th.textContent.trim() === 'Category');
      let typeIdx = heads.findIndex(th => th.textContent.trim() === 'Case Type');
      if (classIdx < 0 || typeIdx < 0) return;
      table.querySelectorAll('tbody tr').forEach(row => {
        let cells = [...row.children];
        let idCell = cells.find(td => /^EML-\d+$/.test((td.textContent || '').trim()));
        if (!idCell) return;
        let metadata = reviewRequestMetadata(idCell.textContent.trim());
        if (cells[classIdx]) cells[classIdx].textContent = metadata.classification || 'General coordination';
        if (cells[typeIdx]) cells[typeIdx].textContent = metadata.caseClass || 'Other / Unclear';
      });
    });
    return template.innerHTML;
  };

  // Collapse Review Requests tabs to Awaiting Review / Approved / Rejected without double dropdown in tab row.
  const consolidatedReviewBase = review;
  review = function () {
    if (S.queueTab === 'Rejected') {
      let rows = REJECTED_QUEUE;
      return head('Review Requests', 'Rejected requests.') + `<div class="card"><div class="tabs">${reviewTabsBar()}</div>${rows.length ? `<table><thead><tr><th>Item</th><th>Customer</th><th>Subject</th><th>Rejected</th><th>Reason</th></tr></thead><tbody>${rows.map(r => `<tr><td><button type="button" class="case-link" onclick="openRejectedEmail('${r.id}')">${r.id}</button></td><td>${editorText(r.customer)}</td><td>${editorText(r.subject)}</td><td>${editorText(r.at)}</td><td><span class="pill red">${editorText(r.reason || 'Declined')}</span></td></tr>`).join('')}</tbody></table>` : `<div class="empty-state"><strong>No rejected requests.</strong><p>Rejected requests will appear here.</p></div>`}</div>`;
    }
    let html = consolidatedReviewBase(), template = document.createElement('template'); template.innerHTML = html;
    let tabs = template.content.querySelector('.tabs');
    if (tabs) {
      let keep = [...tabs.querySelectorAll('button')].filter(b => /^Awaiting Review/.test(b.textContent.trim()));
      tabs.innerHTML = '';
      keep.forEach(b => tabs.appendChild(b));
      let approvedBtn = document.createElement('button'); approvedBtn.className = S.queueTab === 'Approved Requests' ? 'active' : ''; approvedBtn.textContent = `Approved (${(typeof APPROVED_REQUESTS !== 'undefined' ? APPROVED_REQUESTS.length : 0)})`; approvedBtn.setAttribute('onclick', "switchReviewerView('Approved Requests')"); tabs.appendChild(approvedBtn);
      let rejectedBtn = document.createElement('button'); rejectedBtn.className = S.queueTab === 'Rejected' ? 'active' : ''; rejectedBtn.textContent = `Rejected (${REJECTED_QUEUE.length})`; rejectedBtn.setAttribute('onclick', "switchReviewerView('Rejected')"); tabs.appendChild(rejectedBtn);
      // Double filter removed from tab row: extra filters are handled cleanly inside the single Filters popup modal below
    }
    return template.innerHTML;
  };
  function reviewTabsBar() {
    let a = `<button onclick="switchReviewerView('Awaiting Review')">Awaiting Review (${QUEUE.filter(x => x[6] === 'Awaiting Review').length})</button>`;
    let ap = `<button onclick="switchReviewerView('Approved Requests')">Approved (${(typeof APPROVED_REQUESTS !== 'undefined' ? APPROVED_REQUESTS.length : 0)})</button>`;
    let re = `<button class="active" onclick="switchReviewerView('Rejected')">Rejected (${REJECTED_QUEUE.length})</button>`;
    return a + ap + re;
  }
  window.goReviewFilter = function (value) { if (!value) return; if (REVIEWER_ACTION_VIEWS && REVIEWER_ACTION_VIEWS[value]) { openReviewerActionView(value); return } switchReviewerView(value) };
  document.head.insertAdjacentHTML('beforeend', `<style>.tabs{flex-wrap:nowrap!important;overflow-x:auto}.tabs button{flex:0 0 auto;white-space:nowrap}@keyframes ackFadeIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}</style>`);
})();
/* Awaiting Review tab: dedicated table layout (Reference, Subject, Customer, Classification, Case Class, sortable Priority, sortable Received). */
(function () {
  const PRIORITY_RANK = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
  function parseQueueDate(value) {
    let m = String(value || '').match(/(\d{2})\/(\d{2})\/(\d{4}),\s*(\d{2}):(\d{2})/);
    if (!m) return 0;
    return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]), Number(m[4]), Number(m[5])).getTime();
  }
  function currentAwaitingSort() { return S.awaitingReviewSort || { key: null, dir: 'asc' }; }
  window.setAwaitingReviewSort = function (key) {
    let cur = currentAwaitingSort();
    S.awaitingReviewSort = cur.key === key ? { key, dir: cur.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' };
    render();
  };
  function sortArrow(key) {
    let s = currentAwaitingSort(), active = s.key === key, glyph = active ? (s.dir === 'asc' ? '↑' : '↓') : '↕';
    return `<button type="button" onclick="setAwaitingReviewSort('${key}')" aria-label="Sort by ${key}" style="border:0;background:none;cursor:pointer;color:${active ? '#0871c7' : '#8a95a6'};font:700 11px Inter,sans-serif;padding:0 0 0 4px;vertical-align:middle">${glyph}</button>`;
  }
  const awaitingReviewQueueTableBase = queueTable;
  if (!document.getElementById('awaiting-review-style')) {
    let awStyleTag = document.createElement('style'); awStyleTag.id = 'awaiting-review-style';
    awStyleTag.textContent = '.subj-clamp{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;max-width:220px;line-height:1.4;white-space:normal}';
    document.head.appendChild(awStyleTag);
  }
  queueTable = function (home = false) {
    if (home || S.queueTab !== 'Awaiting Review') return awaitingReviewQueueTableBase(home);
    let rows = queueRows(home);
    if (!rows.length) return awaitingReviewQueueTableBase(home);
    let data = rows.map(r => { let metadata = reviewRequestMetadata(r[0]) || {}; return { ref: r[0], subject: r[2], customer: r[1], classification: reviewClassificationOf(r[0], metadata.classification || 'General coordination'), caseClass: reviewCaseClassOf(r[0], metadata.caseClass || 'Other / Unclear'), priority: requestPriority(r), received: r[5] } });
    let s = currentAwaitingSort();
    if (s.key) { let dirMul = s.dir === 'asc' ? 1 : -1; data.sort((a, b) => s.key === 'priority' ? ((PRIORITY_RANK[a.priority] || 0) - (PRIORITY_RANK[b.priority] || 0)) * dirMul : (parseQueueDate(a.received) - parseQueueDate(b.received)) * dirMul) }
    return `<table><thead><tr><th>Received${sortArrow('received')}</th><th>Reference</th><th>Subject</th><th>Customer</th><th>Category</th><th>Case Class</th><th>Priority${sortArrow('priority')}</th><th>First Acknowledgement</th></tr></thead><tbody>${data.map(d => { let ackCell = reviewAckCell(d.ref);return `<tr><td data-aa-style="aa-static-style-73">${editorText(d.received)}</td><td><button class="case-link" onclick="openReviewCase('${d.ref}')">${d.ref}</button></td><td><span class="subj-clamp" title="${editorText(d.subject)}">${editorText(d.subject)}</span></td><td>${editorText(d.customer)}</td><td>${editorText(d.classification)}</td><td>${editorText(d.caseClass)}</td><td>${pill(d.priority)}</td><td data-aa-style="aa-static-style-73">${ackCell}</td></tr>` }).join('')}</tbody></table>`;
  };
})();
/* Company Tasks relabeled "All Department Tasks" with a Group By control. */
S.taskGroupBy = (S.taskGroupBy && S.taskGroupBy !== 'None') ? S.taskGroupBy : 'Status';
window.setTaskGroupBy = function (v) { S.taskGroupBy = v; render() };
(function () {
  // Relabel "Company Tasks" -> "All Department Tasks"; Group By appears only in the existing Kanban toggle's Kanban mode.
  const groupedScopedTasksPageBase = scopedTasksPage;
  scopedTasksPage = function (manager = false) {
    let html = groupedScopedTasksPageBase(manager);
    if (S.taskScope !== 'All Tasks') return html;
    let template = document.createElement('template'); template.innerHTML = html;
    template.content.querySelectorAll('.tabs button').forEach(btn => { if (btn.textContent.trim() === 'All Tasks') btn.textContent = 'All Tasks'; });
    let filters = template.content.querySelector('.filters');
    if (filters && (S.taskView || 'Kanban') !== 'List' && !filters.querySelector('.task-groupby')) {
      let select = document.createElement('select');
      select.className = 'task-groupby';
      select.setAttribute('aria-label', 'Group by');
      select.setAttribute('onchange', 'setTaskGroupBy(this.value)');
      select.style.marginLeft = '8px';
      select.innerHTML = ['Department', 'Status'].map(v => `<option value="${v}" ${S.taskGroupBy === v ? 'selected' : ''}>Group by ${v}</option>`).join('');
      filters.appendChild(select);
    }
    return template.innerHTML;
  };
  const groupedKanbanBoardBase = kanbanBoard;
  kanbanBoard = function (rows) {
    if (S.taskScope !== 'All Tasks' || S.taskGroupBy !== 'Department') return groupedKanbanBoardBase(rows);
    let depts = [...new Set(rows.map(t => t[3]))].sort();
    return `<div class="kanban-board">${depts.map(dept => { let cards = rows.filter(t => t[3] === dept); return `<section class="kanban-column" data-department="${dept}"><div class="kanban-column-head"><i class="kanban-dot"></i><span>${dept} (${cards.length})</span></div><div class="kanban-cards">${cards.length ? cards.map(kanbanCard).join('') : `<div class="kanban-empty">No Tasks<br><span class="sub">Nothing in ${dept}</span></div>`}</div></section>` }).join('')}</div>`;
  };
})();
userDeptTasksAvailable = function () {
  let u = currentUser(), f = S.homeFilters.user, base = TASKS.filter(t => t[3] === u.department && t[4] === 'Unassigned');
  if (!base.length) return '';
  let rows = base.filter(t => f.priority === 'All' || t[5] === f.priority).slice(0, 8);
  let bar = homeFilterBar('user', [['priority', [...new Set(base.map(t => t[5]))], 'All Priorities']]);
  let body = rows.length ? `<table><thead><tr><th>Task Ref</th><th>Task Title</th><th>Customer</th><th>Priority</th><th>Due</th><th>Action</th></tr></thead><tbody>${rows.map(t => `<tr tabindex="0" onclick="openTask('${t[8]}')"><td><strong class="id">${t[8]}</strong></td><td>${editorText(t[0])}</td><td>${editorText(t[2])}</td><td>${pill(t[5])}</td><td>${editorText(t[6])}</td><td><button class="btn primary take-task-button" onclick="event.stopPropagation();takeDepartmentTask('${t[8]}')">Take Task</button></td></tr>`).join('')}</tbody></table>` : `<div class="empty-state"><strong>No Tasks match these filters.</strong><p>Change or reset the filters.</p></div>`;
  return `<section class="card"><div class="card-head"><div><h2>Department Tasks Available</h2><span class="sub">Unassigned work in ${u.department} you can take</span></div><button class="link" onclick="go('mytasks')">View All</button></div>${bar}<div class="table-wrap">${body}</div></section>`
};

/* Queue tables: Received column first, Subject column clamped to 2 lines with ellipsis. Applies to every queue table regardless of tab/path. */
(function () {
  const receivedFirstQueueTableBase = queueTable;
  queueTable = function (home = false) {
    let html = receivedFirstQueueTableBase(home), template = document.createElement('template'); template.innerHTML = html;
    template.content.querySelectorAll('table').forEach(table => {
      let headerRow = table.querySelector('thead tr');
      if (!headerRow) return;
      let subjIdx = [...headerRow.children].findIndex(th => /Subject/i.test(th.textContent || ''));
      if (subjIdx >= 0) {
        table.querySelectorAll('tbody tr').forEach(row => {
          let td = row.children[subjIdx];
          if (td && !td.querySelector('.subj-clamp')) td.innerHTML = `<span class="subj-clamp" title="${(td.textContent || '').replace(/"/g, '&quot;')}">${td.innerHTML}</span>`;
        });
      }
      let receivedIdx = [...headerRow.children].findIndex(th => /Received/i.test(th.textContent || ''));
      if (receivedIdx > 0) {
        headerRow.insertBefore(headerRow.children[receivedIdx], headerRow.firstChild);
        table.querySelectorAll('tbody tr').forEach(row => { if (row.children[receivedIdx]) row.insertBefore(row.children[receivedIdx], row.firstChild) });
      }
    });
    return template.innerHTML;
  };
})();

/* === Home dashboard filters: Reviewer, Department Head and Department User === */
(function () {
  document.head.insertAdjacentHTML('beforeend', `<style>.home-filters{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:0 0 16px;padding:12px 14px;background:#fff;border:1px solid var(--line);border-radius:8px;box-shadow:var(--shadow)}.home-filters select{height:34px;border:1px solid #c9d5e1;border-radius:4px;padding:0 9px;font:600 12.5px Inter,Segoe UI,Arial,sans-serif;background:#f4f8fc;color:#14233a;min-width:130px;box-sizing:border-box}.home-filters .ds-combo-input{height:34px;border:1px solid #c9d5e1;border-radius:4px;padding:0 44px 0 9px;font:600 12.5px Inter,Segoe UI,Arial,sans-serif;background:#f4f8fc;color:#14233a;min-width:130px;box-sizing:border-box}.home-filters .ds-combo{min-width:130px;position:relative;display:inline-block;vertical-align:middle}.home-filters .ds-combo[data-type="customer"]{min-width:190px;max-width:270px}.home-filters .ds-combo-clear{position:absolute;right:25px;top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;border:0;background:transparent;color:#94a3b8;cursor:pointer;padding:0;line-height:1;z-index:3}.home-filters .ds-combo-clear:hover{background:#e2e8f0;color:#1e293b}.home-filters .ds-combo-clear[hidden]{display:none!important}.home-filters .link{font:700 12.5px Inter,sans-serif;margin-left:auto}.home-range-group{position:relative;display:inline-flex;align-items:stretch;height:36px;min-width:260px;border:1px solid var(--line);border-radius:6px;background:#fff;overflow:visible}.home-range-text{display:flex;align-items:center;flex:1;padding:0 12px;font:600 13px Inter,Segoe UI,Arial,sans-serif;color:var(--ink);white-space:nowrap}.home-range-btn{flex:0 0 40px;display:grid;place-items:center;border:0;border-radius:0 5px 5px 0;background:var(--blue);color:#fff;cursor:pointer}.home-range-btn:hover{background:var(--navy)}.home-range-pop{position:absolute;top:calc(100% + 6px);left:0;z-index:60;display:grid;gap:10px;min-width:300px;padding:12px;background:#fff;border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 28px rgba(6,28,49,.16)}.home-range-field{display:flex;justify-content:space-between;align-items:center;gap:10px;font:650 12px Inter,Segoe UI,Arial,sans-serif;color:var(--muted);white-space:nowrap}.home-range-field input[type=date]{height:32px;border:1px solid var(--line);border-radius:4px;padding:0 8px;font:600 12.5px Inter,Segoe UI,Arial,sans-serif;background:#fff;color:var(--ink)}.home-range-actions{display:flex;justify-content:flex-end;gap:8px}.home-range-actions .btn{height:32px;min-height:32px;padding:0 14px;font-size:12.5px}@media(max-width:640px){.home-filters{align-items:stretch}.home-filters select,.home-filters .ds-combo{min-width:0;flex:1 1 150px}.home-range-group{flex:1 1 100%}.home-filters .link{margin-left:0}}</style>`);

  const DATE_RANGES = ['All', 'Today', 'This Week', 'This Month', 'Custom'];
  // f is a Home filter object. For Custom, dateFrom and dateTo are the applied yyyy-mm-dd bounds, inclusive.
  // Until both are applied, a Custom range filters nothing.
  function homeDateMatch(dateStr, f, direction) {
    let range = f && f.dateRange;
    if (!range || range === 'All' || !dateStr) return true;
    let d = dateValue(dateStr), today = dateValue(OPERATION_DATE);
    if (range === 'Custom') {
      if (!f.dateFrom || !f.dateTo) return true;
      let [fy, fm, fd] = f.dateFrom.split('-').map(Number), [ty, tm, td] = f.dateTo.split('-').map(Number);
      return d >= new Date(fy, fm - 1, fd).getTime() && d < new Date(ty, tm - 1, td + 1).getTime();
    }
    if (direction === 'future') {
      let days = Math.floor((d - today) / 86400000);
      if (range === 'Today') return days <= 0;
      if (range === 'This Week') return days < 7;
      if (range === 'This Month') return days < 30;
      return true;
    }
    let days = Math.floor((today - d) / 86400000);
    if (range === 'Today') return days === 0;
    if (range === 'This Week') return days >= 0 && days < 7;
    if (range === 'This Month') return days >= 0 && days < 30;
    return true;
  }
  function homeFilterOptionsHtml(selected, options, labelAll) {
    return `<option value="All" ${selected === 'All' ? 'selected' : ''}>${labelAll}</option>${options.map(o => `<option ${selected === o ? 'selected' : ''}>${editorText(o)}</option>`).join('')}`;
  }
  function homeDateRangeSelectHtml(selected, onchange) {
    return `<select onchange="${onchange}" aria-label="Date Range">${DATE_RANGES.map(o => `<option value="${o}" ${selected === o ? 'selected' : ''}>${o === 'All' ? 'All Time' : o === 'Custom' ? 'Custom Range' : o}</option>`).join('')}</select>`;
  }
  // Each Home dashboard keeps its own filter object. A Custom range is drafted in S.homeDateDraft while the
  // From and To dates are being picked, and only written to the filter when Apply is clicked.
  const HOME_FILTER_STATE = { reviewer: () => S.reviewerHomeFilters, manager: () => S.managerHomeFilters, user: () => S.userHomeFilters };
  window.setHomeDateRange = function (key, value) {
    let f = HOME_FILTER_STATE[key]();
    f.dateRange = value;
    if (value === 'Custom') { S.homeDateDraft = { from: f.dateFrom || '', to: f.dateTo || '' }; S.homeRangeOpen = key }
    else { S.homeDateDraft = null; S.homeRangeOpen = null; f.dateFrom = ''; f.dateTo = '' }
    render();
  };
  window.setHomeDateDraft = function (k, v) { S.homeDateDraft = { ...(S.homeDateDraft || {}), [k]: v } };
  // Reads the two date fields in the same group as the Apply button at the moment it is clicked, so the
  // range applied is what is on screen, not whatever the last change event happened to store.
  window.applyHomeCustomRange = function (key, control) {
    const group = control && control.closest ? control.closest('.home-range-group') : null;
    const fromEl = group && group.querySelector('input[aria-label="From date"]');
    const toEl = group && group.querySelector('input[aria-label="To date"]');
    const d = { from: fromEl ? fromEl.value : (S.homeDateDraft || {}).from, to: toEl ? toEl.value : (S.homeDateDraft || {}).to };
    let f = HOME_FILTER_STATE[key]();
    if (!d.from || !d.to) { toast('Select both a From and a To date'); return }
    if (d.from > d.to) { toast('The From date must be before the To date'); return }
    f.dateFrom = d.from; f.dateTo = d.to; S.homeDateDraft = null; S.homeRangeOpen = null; render();
  };
  // The custom range is one field showing the applied dates, with a calendar button that opens a small
  // From / To picker. Apply commits the picked dates; Cancel closes the picker without changing the filter.
  window.toggleHomeRangePicker = function (key) { S.homeRangeOpen = S.homeRangeOpen === key ? null : key; render() };
  const RANGE_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const rangeDay = iso => { const [y, m, d] = iso.split('-').map(Number); return `${String(d).padStart(2, '0')} ${RANGE_MONTHS[m - 1]}, ${y}` };
  const CALENDAR_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>';
  function homeCustomRangeHtml(key) {
    let f = HOME_FILTER_STATE[key]();
    if (f.dateRange !== 'Custom') return '';
    let d = S.homeDateDraft || {}, from = d.from ?? f.dateFrom ?? '', to = d.to ?? f.dateTo ?? '';
    const open = S.homeRangeOpen === key;
    const shown = f.dateFrom && f.dateTo ? `${rangeDay(f.dateFrom)} to ${rangeDay(f.dateTo)}` : 'Select a date range';
    const field = (label, k, v) => `<label class="home-range-field">${label}<input type="date" aria-label="${label} date" value="${v}" onchange="setHomeDateDraft('${k}',this.value)"></label>`;
    const picker = open ? `<span class="home-range-pop">${field('From', 'from', from)}${field('To', 'to', to)}<span class="home-range-actions"><button type="button" class="btn" onclick="toggleHomeRangePicker('${key}')">Cancel</button><button type="button" class="btn primary" onclick="applyHomeCustomRange('${key}', this)">Apply</button></span></span>` : '';
    return `<span class="home-range-group"><span class="home-range-text">${shown}</span><button type="button" class="home-range-btn" aria-label="Choose date range" aria-expanded="${open}" onclick="toggleHomeRangePicker('${key}')">${CALENDAR_ICON}</button>${picker}</span>`;
  }
  window.homeDateMatch = homeDateMatch;

  /* --- Reviewer Home filters: Date Range, Customer, Classification, Department --- */
  S.reviewerHomeFilters = S.reviewerHomeFilters || { dateRange: 'All', customer: 'All', classification: 'All', department: 'All' };
  window.setReviewerHomeFilter = function (key, value) { S.reviewerHomeFilters[key] = value; render() };
  window.clearReviewerHomeFilters = function () { S.reviewerHomeFilters = { dateRange: 'All', customer: 'All', classification: 'All', department: 'All' }; render() };
  function reviewerRowCase(row) { let idx = QUEUE.indexOf(row); return idx >= 0 ? Object.values(CASE_DETAILS)[idx] : null }
  function reviewerHomeRowMatches(row) {
    let f = S.reviewerHomeFilters;
    if (f.customer !== 'All' && row[1] !== f.customer) return false;
    if (f.dateRange !== 'All' && !homeDateMatch(row[5], f, 'past')) return false;
    if (f.classification !== 'All' || f.department !== 'All') {
      let c = reviewerRowCase(row);
      if (f.classification !== 'All' && (!c || c.classification !== f.classification)) return false;
      if (f.department !== 'All' && (!c || !String(c.departments || '').includes(f.department))) return false;
    }
    return true;
  }
  function reviewerCaseMatches(c) {
    let f = S.reviewerHomeFilters;
    if (f.customer !== 'All' && c.customer !== f.customer) return false;
    if (f.classification !== 'All' && c.classification !== f.classification) return false;
    if (f.department !== 'All' && !String(c.departments || '').includes(f.department)) return false;
    if (f.dateRange !== 'All' && !homeDateMatch(c.created || c.due, f, 'past')) return false;
    return true;
  }
  window.reviewerFilteredCases = function () { return Object.values(CASE_DETAILS).filter(reviewerCaseMatches) };

  const reviewerHomeRequestsBase = reviewerHomeRequests;
  reviewerHomeRequests = function () { return reviewerHomeRequestsBase().filter(reviewerHomeRowMatches) };

  const reviewerActionRowsBase = reviewerActionRows;
  reviewerActionRows = function (view) { return reviewerActionRowsBase(view).filter(reviewerHomeRowMatches) };

  reviewerWorkloadChart = function () {
    let requests = reviewerHomeRequests(), awaiting = requests.filter(item => item[6] === 'Awaiting Review').length, missing = requests.filter(item => item[6] === 'Needs Clarification').length, due = requests.filter(item => /^15 Oct 2026/.test(reviewerRequestDueDateTime(item[0]))).length, total = Math.max(1, awaiting + missing + due), a = awaiting / total * 360, m = (awaiting + missing) / total * 360;
    return `<section class="card reviewer-chart-card"><div class="card-head"><div><h2>Current Workload</h2><span class="sub">Open review work and time-sensitive requests</span></div></div><div class="workload-wrap"><div class="workload-donut" style="background:conic-gradient(#1675c1 0 ${a}deg,#f0a000 ${a}deg ${m}deg,#d92c3a ${m}deg 360deg)"><span><strong>${awaiting + missing}</strong><small>Open</small></span></div><div class="workload-legend"><div><i data-aa-style="aa-static-style-63"></i><span>Awaiting Review</span><strong>${awaiting}</strong></div><div><i data-aa-style="aa-static-style-64"></i><span>Missing Information</span><strong>${missing}</strong></div><div><i data-aa-style="aa-static-style-65"></i><span>Due Today</span><strong>${due}</strong></div></div></div></section>`;
  };
  reviewerClassificationMix = function () { return analyticsCard('Requests by Category', 'All Cases grouped by category', analyticsDonut(groupedCounts(reviewerFilteredCases(), c => c.classification, 6))) };
  reviewerSlaOverview = function () {
    let cases = reviewerFilteredCases().filter(c => c.status !== 'Completed'), buckets = [['On Track', 0], ['Due Soon', 0], ['Overdue', 0]];
    cases.forEach(c => { let days = (dateValue(c.due) - dateValue(OPERATION_DATE)) / 86400000; if (days < 0) buckets[2][1]++; else if (days <= 2) buckets[1][1]++; else buckets[0][1]++ });
    return analyticsCard('SLA / Due Date Overview', `${cases.length} open requests tracked against due date`, analyticsDonut(buckets));
  };
  reviewerQueueStatusChart = function () {
    let requests = reviewerHomeRequests(), items = [['Awaiting Review', requests.filter(q => q[6] === 'Awaiting Review').length], ['Needs Clarification', requests.filter(q => q[6] === 'Needs Clarification').length], ['Approved Requests', APPROVED_REQUESTS.length]];
    return analyticsCard('Review Queue by Status', 'Current requests by stage', analyticsBars(items));
  };
  reviewerTopCustomersChart = function () {
    let counts = groupedCounts(reviewerFilteredCases(), c => c.customer, 5).map((x, i) => [x[0], x[1], ANALYTIC_COLORS[i % ANALYTIC_COLORS.length]]);
    return reviewerHorizontalChart('Top Customers', 'Customers with the most requests', counts);
  };
  reviewerResponseSamples = function () {
    let samples = [];
    reviewerFilteredCases().forEach(c => { let id = c.id, msgs = S.communications.filter(m => m.caseId === id), incoming = msgs.find(m => m.direction === 'Incoming'), outgoing = msgs.find(m => m.direction === 'Outgoing'); if (incoming && outgoing) { let mins = (dateValue(outgoing.at) - dateValue(incoming.at)) / 60000; if (mins > 0) samples.push({ id, mins, at: incoming.at }) } });
    return samples.sort((a, b) => dateValue(a.at) - dateValue(b.at));
  };
  function reviewerHomeFilterBar() {
    let f = S.reviewerHomeFilters, cases = Object.values(CASE_DETAILS);
    let customers = [...new Set(cases.map(c => c.customer))].filter(n => window.inCustomerMaster(n)).filter(Boolean).sort();
    let classes = [...new Set(cases.map(c => c.classification))].filter(Boolean).sort();
    let depts = [...new Set(cases.flatMap(c => String(c.departments || '').split(',').map(d => d.trim()).filter(Boolean)))].sort();
    let active = f.customer !== 'All' || f.classification !== 'All' || f.department !== 'All' || f.dateRange !== 'All';
    return `<div class="home-filters">${homeDateRangeSelectHtml(f.dateRange, "setHomeDateRange('reviewer',this.value)")}${homeCustomRangeHtml('reviewer')}<select onchange="setReviewerHomeFilter('customer',this.value)" aria-label="Customer">${homeFilterOptionsHtml(f.customer, customers, 'All Customers')}</select><select onchange="setReviewerHomeFilter('classification',this.value)" aria-label="Category">${homeFilterOptionsHtml(f.classification, classes, 'All Categories')}</select><select onchange="setReviewerHomeFilter('department',this.value)" aria-label="Department">${homeFilterOptionsHtml(f.department, depts, 'All Departments')}</select>${active ? `<button class="link" onclick="clearReviewerHomeFilters()">Clear filters</button>` : ''}</div>`;
  }
  const reviewerHomeFiltersBase = reviewerDashboardHome;
  reviewerDashboardHome = function () {
    let template = document.createElement('template');
    template.innerHTML = reviewerHomeFiltersBase();
    let head = template.content.querySelector('.page-head');
    if (head) head.insertAdjacentHTML('afterend', reviewerHomeFilterBar());
    return template.innerHTML;
  };

  /* --- Department Head Home filters: Date Range, Priority, Customer, Team Member --- */
  S.managerHomeFilters = S.managerHomeFilters || { dateRange: 'All', priority: 'All', customer: 'All', assignee: 'All' };
  window.setManagerHomeFilter = function (key, value) { S.managerHomeFilters[key] = value; render() };
  window.clearManagerHomeFilters = function () { S.managerHomeFilters = { dateRange: 'All', priority: 'All', customer: 'All', assignee: 'All' }; render() };
  function managerTaskMatches(t) {
    let f = S.managerHomeFilters;
    if (f.priority !== 'All' && t[5] !== f.priority) return false;
    if (f.customer !== 'All' && t[2] !== f.customer) return false;
    if (f.assignee !== 'All' && t[4] !== f.assignee) return false;
    if (f.dateRange !== 'All' && !homeDateMatch(t[6], f, 'future')) return false;
    return true;
  }
  function managerCaseMatches(c) {
    let f = S.managerHomeFilters;
    if (f.customer !== 'All' && c.customer !== f.customer) return false;
    if (f.dateRange !== 'All' && !homeDateMatch(c.created || c.due, f, 'past')) return false;
    return true;
  }
  window.managerFilteredTeam = function () { let u = currentUser(); return TASKS.filter(t => t[3] === u.department && managerTaskMatches(t)) };
  managerDeptCases = function () { let u = currentUser(); return Object.values(CASE_DETAILS).filter(c => String(c.departments || '').includes(u.department) && managerCaseMatches(c)) };
  managerAttentionQueue = function () {
    let team = managerFilteredTeam().filter(t => effectiveTaskStatus(t) !== 'Completed'), rows = team.filter(t => t[4] === 'Unassigned' || taskDeadlineState(t) === 'Overdue' || taskDeadlineState(t) === 'Due Today' || unresolvedDependencies(t).length).sort((a, b) => { let rank = x => x[4] === 'Unassigned' ? 0 : taskDeadlineState(x) === 'Overdue' ? 1 : taskDeadlineState(x) === 'Due Today' ? 2 : 3; return rank(a) - rank(b) }).slice(0, 6);
    if (!rows.length) return '';
    return `<section class="card"><div class="card-head"><div><h2>Department Head Attention Queue</h2><span class="sub">Tasks that may need your intervention or reassignment</span></div><button class="link" onclick="go('department')">View All</button></div><div class="table-wrap"><table><thead><tr><th>Task Ref</th><th>Assignee</th><th>Task</th><th>Priority</th><th>Due</th><th>Risk</th><th>Action</th></tr></thead><tbody>${rows.map(t => { let risk = t[4] === 'Unassigned' ? 'Unclaimed task' : unresolvedDependencies(t).length ? `Blocked by ${unresolvedDependencies(t).length} ${unresolvedDependencies(t).length === 1 ? 'Task' : 'Tasks'}` : taskDeadlineState(t) === 'Overdue' ? 'Overdue' : 'Due today'; return `<tr tabindex="0" onclick="openTask('${t[8]}')"><td><strong class="id">${t[8]}</strong></td><td>${t[4] === 'Unassigned' ? '<span class="sub">Unassigned</span>' : `<span class="assignee-cell"><span class="row-avatar">${casePersonInitials(t[4])}</span>${editorText(t[4])}</span>`}</td><td>${editorText(t[0])}</td><td>${pill(t[5])}</td><td>${editorText(t[6])}</td><td><span class="pill ${risk==='Overdue'?'red':risk==='Unclaimed task'?'amber':'blue'}">${editorText(risk)}</span></td><td><button class="btn" onclick="event.stopPropagation();openTask('${t[8]}')">Open</button></td></tr>` }).join('')}</tbody></table></div></section>`;
  };
  managerIncomingVsCompletedChart = function () {
    let u = currentUser(), team = managerFilteredTeam(), dates = [...new Set(team.map(t => t[6]))].sort((a, b) => dateValue(a) - dateValue(b)).slice(0, 6), groups = dates.map(d => [d, team.filter(t => t[6] === d).length, team.filter(t => t[6] === d && t[7] === 'Completed').length]);
    return `<section class="card reviewer-chart-card"><div class="card-head"><div><h2>Incoming vs Completed</h2><span class="sub">${u.department} Tasks grouped by due date</span></div></div>${volumeChart(groups, 'Total', 'Completed')}</section>`;
  };
  managerWorkloadChart = function () {
    let u = currentUser(), members = USERS.filter(x => x.department === u.department), groups = members.map(m => { let mine = TASKS.filter(t => t[4] === m.name && managerTaskMatches(t)); return [m.name.split(' ')[0], mine.filter(t => effectiveTaskStatus(t) !== 'Completed').length, mine.filter(t => taskDeadlineState(t) === 'Overdue').length] });
    return `<section class="card reviewer-chart-card"><div class="card-head"><div><h2>Member Workload</h2><span class="sub">Open Tasks vs overdue, by owner</span></div></div>${volumeChart(groups, 'Open', 'Overdue')}</section>`;
  };
  managerOverdueDurationChart = function () {
    let u = currentUser(), overdue = managerFilteredTeam().filter(t => taskDeadlineState(t) === 'Overdue'), buckets = [['1-2 days', 0], ['3-5 days', 0], ['6+ days', 0]];
    overdue.forEach(t => { let days = Math.round((dateValue(OPERATION_DATE) - dateValue(t[6])) / 86400000); if (days <= 2) buckets[0][1]++; else if (days <= 5) buckets[1][1]++; else buckets[2][1]++ });
    return analyticsCard('Overdue Tasks by Duration', `${overdue.length} overdue Tasks in ${u.department}`, analyticsBars(buckets));
  };
  managerStatusDonut = function () { let u = currentUser(), team = managerFilteredTeam(), items = ['To-Do', 'In Progress', 'On Hold', 'Completed'].map(s => [s, team.filter(t => effectiveTaskStatus(t) === s).length]); return analyticsCard('Task Status Distribution', `${team.length} Tasks in ${u.department}`, analyticsDonut(items)) };
  managerCompletionByType = function () { let u = currentUser(), team = managerFilteredTeam().filter(t => t[7] === 'Completed'), types = [...new Set(team.map(t => t[9]))].slice(0, 6), items = types.map(type => { let rows = team.filter(t => t[9] === type), onTime = rows.filter(t => completionOutcome(t) !== 'Completed Late').length; return [type, rows.length ? Math.round(onTime / rows.length * 100) : 0] }); return analyticsCard('Avg Task Completion Time by Type', 'On-time completion share for completed Tasks, by category', analyticsBars(items)) };
  managerCategoryDonut = function () { let team = managerFilteredTeam(); return analyticsCard('Department Task Volume by Category', `${team.length} Tasks by category`, analyticsDonut(groupedCounts(team, t => t[9], 6))) };
  managerCasesByCategoryDonut = function () { let cases = managerDeptCases(); return analyticsCard('Cases by Category', `${cases.length} Cases involving ${currentUser().department}`, analyticsDonut(groupedCounts(cases, c => c.classification, 6))) };
  managerCasesByClassDonut = function () { let cases = managerDeptCases(); return analyticsCard('Cases by Case Class', 'Cases grouped by case class', analyticsDonut(groupedCounts(cases, c => c.caseClass, 6))) };
  // Shared Home filter helpers, exposed so the Department Manager dashboard modules can reuse them.
  window.homeHelpers = { homeDateMatch, homeFilterOptionsHtml, homeDateRangeSelectHtml, homeCustomRangeHtml };
  function managerHomeFilterBar() {
    let f = S.managerHomeFilters, u = currentUser(), team = TASKS.filter(t => t[3] === u.department);
    let customers = [...new Set(team.map(t => t[2]))].filter(n => window.inCustomerMaster(n)).filter(Boolean).sort();
    let assignees = [...new Set(team.map(t => t[4]))].filter(x => x && x !== 'Unassigned').sort();
    let active = f.priority !== 'All' || f.customer !== 'All' || f.assignee !== 'All' || f.dateRange !== 'All';
    return `<div class="home-filters">${homeDateRangeSelectHtml(f.dateRange, "setHomeDateRange('manager',this.value)")}${homeCustomRangeHtml('manager')}<select onchange="setManagerHomeFilter('priority',this.value)" aria-label="Priority">${homeFilterOptionsHtml(f.priority, ['Urgent', 'High', 'Medium', 'Low'], 'All Priorities')}</select><select onchange="setManagerHomeFilter('customer',this.value)" aria-label="Customer">${homeFilterOptionsHtml(f.customer, customers, 'All Customers')}</select><select onchange="setManagerHomeFilter('assignee',this.value)" aria-label="Team Member">${homeFilterOptionsHtml(f.assignee, assignees, 'All Team Members')}</select>${active ? `<button class="link" onclick="clearManagerHomeFilters()">Clear filters</button>` : ''}</div>`;
  }
  const managerHomeFiltersBase = managerHome;
  managerHome = function () {
    let template = document.createElement('template');
    template.innerHTML = managerHomeFiltersBase();
    let team = managerFilteredTeam(), open = team.filter(t => effectiveTaskStatus(t) !== 'Completed');
    let kpiValues = { 'My Department Tasks': team.length, 'My Department Tasks': team.length, 'Due Today': open.filter(t => taskDeadlineState(t) === 'Due Today').length, 'In Progress': team.filter(t => effectiveTaskStatus(t) === 'In Progress').length, 'To-Do': team.filter(t => effectiveTaskStatus(t) === 'To-Do').length, 'Pending': team.filter(t => effectiveTaskStatus(t) === 'Pending').length, 'Waiting': team.filter(t => t[7] === 'On Hold').length, 'Overdue': open.filter(t => taskDeadlineState(t) === 'Overdue').length };
    template.content.querySelectorAll('.kpis .kpi').forEach(btn => { let label = btn.querySelector('label')?.textContent?.trim(), strong = btn.querySelector('strong'); if (label && strong && kpiValues.hasOwnProperty(label)) strong.textContent = kpiValues[label] });
    let head = template.content.querySelector('.page-head');
    if (head) head.insertAdjacentHTML('afterend', managerHomeFilterBar());
    return template.innerHTML;
  };

  /* --- Department User Home filters: Date Range, Priority, Customer --- */
  S.userHomeFilters = S.userHomeFilters || { dateRange: 'All', priority: 'All', customer: 'All' };
  window.setUserHomeFilter = function (key, value) { S.userHomeFilters[key] = value; render() };
  window.clearUserHomeFilters = function () { S.userHomeFilters = { dateRange: 'All', priority: 'All', customer: 'All' }; render() };
  function userTaskMatches(t) {
    let f = S.userHomeFilters;
    if (f.priority !== 'All' && t[5] !== f.priority) return false;
    if (f.customer !== 'All' && t[2] !== f.customer) return false;
    if (f.dateRange !== 'All' && !homeDateMatch(t[6], f, 'future')) return false;
    return true;
  }
  window.userFilteredMine = function () { let u = currentUser(); return TASKS.filter(t => t[4] === u.name && userTaskMatches(t)) };
  userUpcomingDependencyTable = function () {
    let rows = userFilteredMine().filter(t => unresolvedDependencies(t).length);
    if (!rows.length) return '';
    return `<section class="card"><div class="card-head"><div><h2>Upcoming Tasks (Waiting on Dependency)</h2><span class="sub">Blocked until another Task completes</span></div></div><div class="table-wrap"><table><thead><tr><th>Task Ref</th><th>Task Title</th><th>Depends On</th><th>Due</th><th>Status</th></tr></thead><tbody>${rows.map(t => `<tr tabindex="0" onclick="openTask('${t[8]}')"><td><strong class="id">${t[8]}</strong></td><td>${editorText(t[0])}</td><td>${unresolvedDependencies(t).map(d => d[8]).join(', ')}</td><td>${editorText(t[6])}</td><td>${pill('Waiting')}</td></tr>`).join('')}</tbody></table></div></section>`;
  };
  userAssignedVsCompletedChart = function () {
    let mine = userFilteredMine(), dates = [...new Set(mine.map(t => t[6]))].sort((a, b) => dateValue(a) - dateValue(b)).slice(0, 6), groups = dates.map(d => [d, mine.filter(t => t[6] === d).length, mine.filter(t => t[6] === d && t[7] === 'Completed').length]);
    return `<section class="card reviewer-chart-card"><div class="card-head"><div><h2>Assigned vs Completed</h2><span class="sub">My Tasks grouped by due date</span></div></div>${volumeChart(groups, 'Assigned', 'Completed')}</section>`;
  };
  userStatusDonut = function () { let mine = userFilteredMine(), items = ['To-Do', 'In Progress', 'On Hold', 'Completed'].map(s => [s, mine.filter(t => effectiveTaskStatus(t) === s).length]); return analyticsCard('Task Status Distribution', `${mine.length} Tasks assigned to me`, analyticsDonut(items)) };
  userOnTimeDonut = function () { let completed = userFilteredMine().filter(t => t[7] === 'Completed'), items = ['Completed Early', 'Completed On Time', 'Completed Late'].map(o => [o.replace('Completed ', ''), completed.filter(t => timingOutcome(t) === o).length]); return analyticsCard('My On-Time Performance', `${completed.length} completed Tasks`, analyticsDonut(items)) };
  userCompletionByType = function () { let mine = userFilteredMine().filter(t => t[7] === 'Completed'), types = [...new Set(mine.map(t => t[9]))].slice(0, 6), items = types.map(type => { let rows = mine.filter(t => t[9] === type), onTime = rows.filter(t => completionOutcome(t) !== 'Completed Late').length; return [type, rows.length ? Math.round(onTime / rows.length * 100) : 0] }); return analyticsCard('Task Completion Time by Type', 'Share of my completed Tasks finished on or before due date', analyticsBars(items)) };
  userCategoryDonut = function () { let mine = userFilteredMine(); return analyticsCard('Tasks by Category', `${mine.length} Tasks by category`, analyticsDonut(groupedCounts(mine, t => t[9], 6))) };
  userCompletionTrendChart = function () {
    let completed = userFilteredMine().filter(t => t[7] === 'Completed'), byDay = [0, 0, 0, 0, 0, 0, 0];
    completed.forEach(t => { let r = TASK_COMPLETIONS[t[8]]; if (!r) return; let d = new Date(dateValue(r.at)); if (!isNaN(d)) byDay[d.getDay()]++ });
    let order = [5, 6, 0, 1, 2, 3, 4], values = order.map(i => byDay[i] || .3);
    return `<section class="card reviewer-mini-chart"><div class="card-head"><div><h2>Weekly Completions</h2><span class="sub">Tasks I completed, by day of week</span></div></div><div data-aa-style="aa-static-style-132">${analyticsLine(values)}</div></section>`;
  };
  function userHomeFilterBar() {
    let f = S.userHomeFilters, u = currentUser(), mine = TASKS.filter(t => t[4] === u.name);
    let customers = [...new Set(mine.map(t => t[2]))].filter(n => window.inCustomerMaster(n)).filter(Boolean).sort();
    let active = f.priority !== 'All' || f.customer !== 'All' || f.dateRange !== 'All';
    return `<div class="home-filters">${homeDateRangeSelectHtml(f.dateRange, "setHomeDateRange('user',this.value)")}${homeCustomRangeHtml('user')}<select onchange="setUserHomeFilter('priority',this.value)" aria-label="Priority">${homeFilterOptionsHtml(f.priority, ['Urgent', 'High', 'Medium', 'Low'], 'All Priorities')}</select><select onchange="setUserHomeFilter('customer',this.value)" aria-label="Customer">${homeFilterOptionsHtml(f.customer, customers, 'All Customers')}</select>${active ? `<button class="link" onclick="clearUserHomeFilters()">Clear filters</button>` : ''}</div>`;
  }
  const userHomeFiltersBase = userHome;
  userHome = function () {
    let template = document.createElement('template');
    template.innerHTML = userHomeFiltersBase();
    let mine = userFilteredMine();
    let kpiValues = { 'Tasks': mine.length, 'My Tasks': mine.length, 'Due Today': mine.filter(t => taskDeadlineState(t) === 'Due Today').length, 'In Progress': mine.filter(t => effectiveTaskStatus(t) === 'In Progress').length, 'To-Do': mine.filter(t => effectiveTaskStatus(t) === 'To-Do').length, 'Waiting': mine.filter(t => t[7] === 'On Hold').length, 'Overdue': mine.filter(t => taskDeadlineState(t) === 'Overdue').length };
    template.content.querySelectorAll('.kpis .kpi').forEach(btn => { let label = btn.querySelector('label')?.textContent?.trim(), strong = btn.querySelector('strong'); if (label && strong && kpiValues.hasOwnProperty(label)) strong.textContent = kpiValues[label] });
    let head = template.content.querySelector('.page-head');
    if (head) head.insertAdjacentHTML('afterend', userHomeFilterBar());
    return template.innerHTML;
  };
})();

/* Move presentation from generated markup into shared stylesheet classes after every render. */
(function () {
  const styleClasses = new Map();
  let styleSheet;
  let sequence = 0;
  function sharedStyleSheet() {
    if (styleSheet) return styleSheet;
    styleSheet = document.getElementById('aa-generated-component-styles');
    if (!styleSheet) {
      styleSheet = document.createElement('style');
      styleSheet.id = 'aa-generated-component-styles';
      document.head.appendChild(styleSheet);
    }
    return styleSheet;
  }
  function classFor(cssText) {
    let normalized = cssText.split(';').map(part => part.trim()).filter(part => part && !/^(font(?:-family|-size|-weight|-style)?|line-height|letter-spacing|word-spacing)\s*:/i.test(part)).join(';').replace(/\s+/g, ' ').trim();
    if (!normalized) return '';
    if (!styleClasses.has(normalized)) {
      let className = `aa-component-style-${++sequence}`;
      styleClasses.set(normalized, className);
      sharedStyleSheet().append(`${'.' + className}{${normalized}}\n`);
    }
    return styleClasses.get(normalized);
  }
  function moveInlineStyles(scope) {
    let root = scope || document.body;
    let nodes = [...root.querySelectorAll('[style]')];
    if (root.nodeType === 1 && root.matches('[style]')) nodes.unshift(root);
    nodes.forEach(node => {
      let className = classFor(node.getAttribute('style') || '');
      if (className) node.classList.add(className);
      node.removeAttribute('style');
    });
  }
  const appRender = render;
  render = function () {
    appRender();
    moveInlineStyles(document.body);
  };
  window.AAStyleSystem = { moveInlineStyles, inlineStyleCount: () => document.body.querySelectorAll('[style]').length };
  new MutationObserver(records => {
    records.forEach(record => {
      if (record.type === 'attributes' && record.attributeName === 'style') moveInlineStyles(record.target.parentElement || document.body);
      if (record.type === 'childList') record.addedNodes.forEach(node => { if (node.nodeType === 1) moveInlineStyles(node); });
    });
  }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
})();

render();

function isCustomerSelect(sel) {
  if (!sel || sel.dataset.noCombo) return false;
  const aria = (sel.getAttribute('aria-label') || '').toLowerCase();
  const cls = (sel.className || '').toLowerCase();
  const first = (sel.options[0]?.text || '').toLowerCase();
  const onchange = (sel.getAttribute('onchange') || '').toLowerCase();
  const labelParent = (sel.closest('label')?.textContent || '').toLowerCase();
  const rowLabel = (sel.closest('.order-line, .ai-data-row')?.querySelector(':scope > span')?.textContent || '').toLowerCase();
  const prevSibling = (sel.previousElementSibling?.textContent || sel.previousSibling?.textContent || '').toLowerCase();
  return aria.includes('customer') ||
         cls.includes('customer') ||
         first.includes('customer') ||
         labelParent.includes('customer') ||
         rowLabel.includes('customer') ||
         prevSibling.includes('customer') ||
         onchange.includes('customer') ||
         onchange.includes("'co'");
}

function shouldEnhanceSelect(sel) {
  if (!sel || sel.hidden || sel.multiple) return false;
  if (sel.dataset.noCombo) return false;
  if (sel.closest('.ds-combo, .case-pager-size, .pager-size, [data-no-combo]')) return false;
  if (sel.id === 'aa-lang') return false;
  if (sel.getAttribute('aria-label') === 'Rows per page') return false;
  return isCustomerSelect(sel);
}

function enhanceSelect(sel) {
  if (!shouldEnhanceSelect(sel)) return;

  const isCust = isCustomerSelect(sel);
  const wrap = document.createElement('div');
  wrap.className = 'ds-combo';
  if (isCust) wrap.dataset.type = 'customer';
  if (sel.closest('.home-filters')) wrap.classList.add('home-filter-combo');

  if (sel.style.width) wrap.style.width = sel.style.width;
  if (sel.style.minWidth) wrap.style.minWidth = sel.style.minWidth;
  if (sel.style.flex) wrap.style.flex = sel.style.flex;

  sel.parentNode.insertBefore(wrap, sel);
  wrap.appendChild(sel);
  sel.hidden = true;
  sel.setAttribute('tabindex', '-1');
  sel.setAttribute('aria-hidden', 'true');
  sel.style.setProperty('display', 'none', 'important');
  sel.style.setProperty('visibility', 'hidden', 'important');
  sel.style.setProperty('position', 'absolute', 'important');
  sel.style.setProperty('width', '0', 'important');
  sel.style.setProperty('height', '0', 'important');
  sel.style.setProperty('padding', '0', 'important');
  sel.style.setProperty('margin', '0', 'important');
  sel.style.setProperty('border', '0', 'important');
  sel.style.setProperty('opacity', '0', 'important');
  sel.style.setProperty('pointer-events', 'none', 'important');

  const input = document.createElement('input');
  input.type = 'text';
  input.autocomplete = 'off';
  input.spellcheck = false;
  input.readOnly = true;
  input.disabled = sel.disabled;
  input.className = 'ds-combo-input';
  if (sel.closest('.home-filters')) input.classList.add('home-filter-input');
  if (sel.id) input.dataset.forSelect = sel.id;
  input.setAttribute('aria-label', sel.getAttribute('aria-label') || (isCust ? 'Customer' : 'Select option'));
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-haspopup', 'listbox');

  function getClearOption() {
    const opts = Array.from(sel.options);
    return opts.find(o => o.value === '' || o.value === 'All') || opts[0];
  }

  function updateClearVisibility() {
    const clearOpt = getClearOption();
    const hasSelectedValue = sel.value && clearOpt && sel.value !== clearOpt.value;
    clearBtn.hidden = !hasSelectedValue;
    wrap.classList.toggle('has-value', Boolean(hasSelectedValue));
  }

  function syncValue() {
    const cur = sel.options[sel.selectedIndex];
    input.value = cur && cur.value ? cur.text : (sel.options[0]?.value ? '' : (sel.options[0]?.text || ''));
    input.title = input.value;
    updateClearVisibility();
  }

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'ds-combo-clear';
  clearBtn.setAttribute('aria-label', 'Clear selection');
  clearBtn.title = 'Clear selection';
  clearBtn.innerHTML = '<svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>';
  clearBtn.hidden = true;

  clearBtn.addEventListener('pointerdown', e => {
    e.preventDefault();
    e.stopPropagation();
  });
  clearBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const clearOpt = getClearOption();
    if (clearOpt) {
      pick(clearOpt.value, clearOpt.text);
    }
    setOpen(false);
  });

  syncValue();

  const arrow = document.createElement('span');
  arrow.className = 'ds-combo-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.innerHTML = '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 6l4.5 4.5 4.5-4.5"/></svg>';

  const menu = document.createElement('div');
  menu.className = 'ds-combo-menu';
  menu.setAttribute('role', 'listbox');
  menu.hidden = true;

  let highlightedIndex = -1;

  function setOpen(open) {
    if (open && sel.disabled) return;
    menu.hidden = !open;
    wrap.classList.toggle('open', open);
    input.setAttribute('aria-expanded', String(open));
    if (open) {
      input.readOnly = false;
      input.style.cursor = 'text';
      populateMenu(input.value);
      input.select();
      highlightSelectedOption();
    } else {
      input.readOnly = true;
      input.style.cursor = 'pointer';
      highlightedIndex = -1;
      if (!input.value.trim()) {
        const clearOpt = getClearOption();
        if (clearOpt) pick(clearOpt.value, clearOpt.text);
        else syncValue();
      } else {
        syncValue();
      }
    }
  }

  function highlightSelectedOption() {
    const items = menu.querySelectorAll('.ds-combo-option');
    items.forEach((btn, idx) => {
      if (btn.classList.contains('selected')) {
        highlightedIndex = idx;
        btn.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function highlightOption(idx) {
    const items = Array.from(menu.querySelectorAll('.ds-combo-option'));
    if (!items.length) return;
    if (idx < 0) idx = items.length - 1;
    if (idx >= items.length) idx = 0;
    highlightedIndex = idx;
    items.forEach((btn, i) => {
      btn.classList.toggle('highlighted', i === idx);
      if (i === idx) btn.scrollIntoView({ block: 'nearest' });
    });
  }

  function populateMenu(q) {
    menu.innerHTML = '';
    const needle = (q || '').trim().toLowerCase();
    const opts = Array.from(sel.options);
    const selectedOption = sel.options[sel.selectedIndex];
    const isCurrentText = selectedOption && selectedOption.text.toLowerCase() === needle;
    const filterQuery = isCurrentText ? '' : needle;

    let matches = opts;
    if (filterQuery) {
      matches = opts.filter(o => {
        const text = o.text.toLowerCase();
        const val = o.value.toLowerCase();
        if (text.includes(filterQuery) || val.includes(filterQuery)) return true;
        if (isCust && typeof MASTER_CUSTOMERS !== 'undefined') {
          const c = MASTER_CUSTOMERS.find(cust => cust.name === o.value || cust.name === o.text || cust.id === o.value);
          if (c) {
            if ((c.customerNumber || '').toLowerCase().includes(filterQuery)) return true;
            if ((c.customerCode || '').toLowerCase().includes(filterQuery)) return true;
          }
        }
        return false;
      });
    }

    const slice = matches.slice(0, 60);
    slice.forEach((o, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ds-combo-option' + (o.value === sel.value ? ' selected' : '');
      btn.setAttribute('role', 'option');
      btn.dataset.value = o.value;
      btn.textContent = o.text;
      btn.title = o.text;
      btn.addEventListener('pointerdown', e => e.preventDefault());
      btn.addEventListener('click', e => {
        e.stopPropagation();
        pick(o.value, o.text);
      });
      menu.appendChild(btn);
    });

    if (!slice.length) {
      const empty = document.createElement('div');
      empty.className = 'ds-combo-empty';
      empty.textContent = isCust ? 'No matching customers' : 'No matching options';
      menu.appendChild(empty);
    }
  }

  function pick(val, text) {
    input.value = text;
    setOpen(false);
    if (sel.value !== val) {
      sel.value = val;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      if (typeof sel.onchange === 'function') sel.onchange();
    }
    updateClearVisibility();
  }

  wrap.addEventListener('click', e => {
    if (sel.disabled) return;
    if (e.target === clearBtn || clearBtn.contains(e.target)) return;
    if (menu.hidden) {
      setOpen(true);
    } else if (e.target === arrow || arrow.contains(e.target)) {
      setOpen(false);
    }
  });

  input.addEventListener('input', () => {
    if (menu.hidden) setOpen(true);
    else populateMenu(input.value);
  });

  input.addEventListener('keydown', e => {
    if (menu.hidden) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightOption(highlightedIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightOption(highlightedIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (!input.value.trim()) {
        const clearOpt = getClearOption();
        if (clearOpt) pick(clearOpt.value, clearOpt.text);
        return;
      }
      const items = menu.querySelectorAll('.ds-combo-option');
      if (highlightedIndex >= 0 && items[highlightedIndex]) {
        items[highlightedIndex].click();
      } else if (items.length > 0) {
        items[0].click();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  });

  document.addEventListener('pointerdown', e => {
    if (!menu.hidden && !wrap.contains(e.target)) {
      if (!input.value.trim()) {
        const clearOpt = getClearOption();
        if (clearOpt) pick(clearOpt.value, clearOpt.text);
      }
      setOpen(false);
    }
  });

  sel.addEventListener('change', syncValue);
  wrap.append(input, clearBtn, arrow, menu);
}

function enhanceDropdownSelects(root = document.body) {
  if (!root) return;
  root.querySelectorAll('select').forEach(enhanceSelect);
}

window.enhanceDropdownSelects = enhanceDropdownSelects;
window.enhanceCustomerSelects = enhanceDropdownSelects;

const comboRenderBase = render;
render = function() {
  comboRenderBase();
  enhanceDropdownSelects(document.body);
};
enhanceDropdownSelects(document.body);

if (typeof MutationObserver !== 'undefined' && !window.__aaComboObserver) {
  window.__aaComboObserver = new MutationObserver(mutations => {
    let needsEnhance = false;
    for (const m of mutations) {
      for (const n of m.addedNodes) {
        if (n.nodeType === 1 && !n.closest?.('.ds-combo')) {
          if (n.tagName === 'SELECT' || n.querySelector?.('select')) {
            needsEnhance = true;
            break;
          }
        }
      }
      if (needsEnhance) break;
    }
    if (needsEnhance) {
      window.__aaComboObserver.disconnect();
      try { enhanceDropdownSelects(document.body); }
      finally {
        window.__aaComboObserver.observe(document.body, { childList: true, subtree: true });
      }
    }
  });
  window.__aaComboObserver.observe(document.body, { childList: true, subtree: true });
}

function imgCard(title,sub,body){return `<section class="card img-card"><div class="img-card-head"><div><h2 class="img-title">${title}</h2><span class="img-sub">${sub}</span></div></div><div class="img-card-body">${body}</div></section>`}
function imgBarChart(groups,opts){
  const {labelA,labelB,colorA,colorB,stacked=false}=opts;
  const totals=groups.map(g=>stacked?g[1]+g[2]:Math.max(g[1],g[2]));
  const max=Math.max(1,...totals);
  const ticks=[max,Math.round(max*2/3),Math.round(max/3),0];
  const legend=`<div class="img-legend"><span><i style="background:${colorA}"></i>${labelA}</span><span><i style="background:${colorB}"></i>${labelB}</span></div>`;
  const cols=groups.map(g=>{
    const a=g[1],b=g[2];
    if(stacked)return `<div class="img-col"><div class="img-bars"><div class="img-stack"><span class="img-total">${a+b}</span><i style="height:${a/max*100}%;background:${colorA}" title="${labelA}: ${a}"></i><i style="height:${b/max*100}%;background:${colorB}" title="${labelB}: ${b}"></i></div></div><span class="img-x">${editorText(g[0])}</span></div>`;
    return `<div class="img-col"><div class="img-bars"><div class="img-pair"><i style="height:${a/max*100}%;background:${colorA}" title="${labelA}: ${a}"></i><i style="height:${b/max*100}%;background:${colorB}" title="${labelB}: ${b}"></i></div></div><span class="img-x">${editorText(g[0])}</span></div>`;
  }).join('');
  return `${legend}<div class="img-chart"><div class="img-y">${ticks.map(t=>`<span>${t}</span>`).join('')}</div><div class="img-plot"><div class="img-grid">${ticks.map(()=>'<i></i>').join('')}</div><div class="img-cols">${cols}</div></div></div>`;
}
function imgDonut(items){
  const total=Math.max(1,items.reduce((n,x)=>n+x[1],0));let cursor=0;
  const stops=items.map((x,i)=>{let start=cursor,c=x[1]/total*100;cursor+=c;return `${ANALYTIC_COLORS[i%ANALYTIC_COLORS.length]} ${start}% ${cursor}%`}).join(',');
  const rows=items.map((x,i)=>`<div class="img-legend-row"><span><i style="background:${ANALYTIC_COLORS[i%ANALYTIC_COLORS.length]}"></i>${editorText(x[0])}</span><strong>${x[1]} <small>/ ${Math.round(x[1]/total*100)}%</small></strong></div>`).join('');
  return `<div class="img-donut-wrap"><div class="img-donut" style="background:conic-gradient(${stops})"><div class="img-donut-center"><strong>${total}</strong><span>Tasks</span></div></div></div><div class="img-legend-list">${rows}</div>`;
}
managerIncomingVsCompletedChart = function () {
  let u = currentUser(), team = managerFilteredTeam(), dates = [...new Set(team.map(t => t[6]))].sort((a, b) => dateValue(a) - dateValue(b)).slice(0, 6), groups = dates.map(d => [d, team.filter(t => t[6] === d).length, team.filter(t => t[6] === d && t[7] === 'Completed').length]);
  return imgCard('Incoming vs. Completed', `${u.department} Tasks grouped by due date`, imgBarChart(groups, { labelA: 'Incoming', labelB: 'Completed', colorA: '#0877d1', colorB: '#8ec8f0' }));
};
managerWorkloadChart = function () {
  let u = currentUser(), groups = [['Sarah', 12, 6], ['Ravi', 8, 4], ['Lily', 8, 2], ['Daniel', 6, 2], ['Ahmad', 3, 3], ['Unassigned', 4, 2]];
  return imgCard('Workload by Team Member', 'Total open tasks, including overdue', imgBarChart(groups, { labelA: 'Open Tasks (within SLA)', labelB: 'Overdue', colorA: '#0877d1', colorB: '#e3a008', stacked: true }));
};
managerStatusDonut = function () {
  let u = currentUser(), team = managerFilteredTeam(), items = ['To-Do', 'In Progress', 'On Hold', 'Completed'].map(s => [s, team.filter(t => effectiveTaskStatus(t) === s).length]);
  return imgCard('Task Status Distribution', `${team.length} Tasks in ${u.department}`, imgDonut(items));
};
document.head.insertAdjacentHTML('beforeend',`<style>
.img-card{overflow:hidden}.img-card-head{padding:16px 20px;border-bottom:1px solid var(--line)}.img-title{margin:0;font-size:16px;font-weight:700;color:var(--ink)}.img-sub{display:block;margin-top:2px;font-size:13px;color:#6b778a}
.img-card-body{padding:18px 20px 20px}
.img-legend{display:flex;gap:18px;margin-bottom:14px;font-size:12.5px;color:#425169}.img-legend span{display:inline-flex;align-items:center;gap:7px}.img-legend i{width:10px;height:10px;border-radius:2px;display:inline-block}
.img-chart{display:grid;grid-template-columns:34px 1fr;gap:10px}
.img-y{display:flex;flex-direction:column;justify-content:space-between;height:200px;font-size:11px;color:#6b778a;text-align:right;padding-bottom:0}
.img-plot{position:relative;height:226px}
.img-grid{position:absolute;left:0;right:0;top:0;height:200px;display:flex;flex-direction:column;justify-content:space-between}.img-grid i{display:block;border-top:1px solid #e6ecf2}
.img-cols{position:absolute;left:0;right:0;top:0;height:226px;display:flex;justify-content:space-around;align-items:stretch}
.img-col{display:flex;flex-direction:column;width:60px}.img-bars{height:200px;display:flex;align-items:flex-end;justify-content:center}.img-x{height:26px;line-height:26px;text-align:center;font-size:12px;color:#425169;white-space:nowrap}
.img-pair{display:flex;align-items:flex-end;gap:5px;height:100%}.img-pair i{display:block;width:16px;border-radius:3px 3px 0 0}
.img-stack{position:relative;display:flex;flex-direction:column-reverse;align-items:stretch;width:34px;height:100%;justify-content:flex-start}.img-stack i{display:block;width:100%}.img-stack i:first-of-type{border-radius:0 0 3px 3px}.img-stack i:last-of-type{border-radius:3px 3px 0 0}
.img-total{position:absolute;left:0;right:0;bottom:100%;margin-bottom:4px;text-align:center;font-size:12px;font-weight:700;color:var(--ink)}
.img-donut-wrap{display:flex;justify-content:center;padding:6px 0 16px}.img-donut{width:190px;height:190px;border-radius:50%;position:relative}
.img-donut-center{position:absolute;inset:38px;border-radius:50%;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}.img-donut-center strong{font-size:24px;color:var(--ink);line-height:1}.img-donut-center span{font-size:12px;color:#6b778a;margin-top:2px}
.img-legend-list{display:grid;gap:8px}.img-legend-row{display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--ink)}.img-legend-row span{display:inline-flex;align-items:center;gap:8px}.img-legend-row i{width:10px;height:10px;border-radius:2px;display:inline-block}.img-legend-row strong{font-weight:700}.img-legend-row small{font-weight:500;color:#6b778a;font-size:12px}
</style>`);

function imgSingleBars(items){
  const max=Math.max(1,...items.map(x=>x[1]));
  const cols=items.map(x=>`<div class="img-col"><div class="img-bars"><div class="img-single"><span class="img-total">${x[1]}</span><i style="height:${x[1]/max*100}%;background:#0877d1"></i></div></div><span class="img-x">${editorText(x[0])}</span></div>`).join('');
  const ticks=[max,Math.round(max*2/3),Math.round(max/3),0];
  return `<div class="img-chart"><div class="img-y">${ticks.map(t=>`<span>${t}</span>`).join('')}</div><div class="img-plot"><div class="img-grid">${ticks.map(()=>'<i></i>').join('')}</div><div class="img-cols">${cols}</div></div></div>`;
}
managerOverdueDurationChart = function () {
  let u = currentUser(), overdue = managerFilteredTeam().filter(t => taskDeadlineState(t) === 'Overdue'), buckets = [['1-2 days', 0], ['3-5 days', 0], ['6+ days', 0]];
  overdue.forEach(t => { let days = Math.round((dateValue(OPERATION_DATE) - dateValue(t[6])) / 86400000); if (days <= 2) buckets[0][1]++; else if (days <= 5) buckets[1][1]++; else buckets[2][1]++ });
  return imgCard('Overdue Tasks by Duration', `${overdue.length} overdue tasks in ${u.department}`, imgSingleBars(buckets));
};
const managerHomeWithoutTeamWorkload = managerHome;
managerHome = function () {
  let t = document.createElement('template');t.innerHTML = managerHomeWithoutTeamWorkload();
  t.content.querySelectorAll('h2').forEach(h => { if (h.textContent.trim() === 'Team Workload') h.closest('.card')?.remove() });
  return t.innerHTML;
};
document.head.insertAdjacentHTML('beforeend',`<style>
.img-card{display:flex;flex-direction:column}.img-card-body{flex:1;display:flex;flex-direction:column;justify-content:center}
.img-single{position:relative;display:flex;align-items:flex-end;justify-content:center;height:100%;width:100%}.img-single i{display:block;width:44px;border-radius:3px 3px 0 0}
.img-donut{width:230px;height:230px}.img-donut-center{inset:50px}.img-donut-center strong{font-size:28px}
</style>`);

const adminLandingRenderBase=render;render=function(){if(S.role==='Admin'&&S.loggedIn&&isSystemAdminProfile()&&(S.page==='home'||S.page==='dashboard'))S.page='users';adminLandingRenderBase()};

// The Dashboard tab is hidden from the navigation for every role. The page itself is kept, so it can be
// shown again by removing this filter.
const dashboardHiddenNavBase=navItems;navItems=function(){return dashboardHiddenNavBase().filter(item=>item[0]!=='dashboard')};
