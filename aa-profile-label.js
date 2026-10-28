/* Profile label under the user's name: the profile they are using (Department Head, Department User, Reviewer, Admin), not
   their job title. The switch-user menu uses the same labels. Loaded last so it wraps the shell and the profile menu. */
(function () {
  const roleLabel = u => {
    if (u.role === 'Manager') return 'Department Head';
    if (u.role === 'User') return 'Department User';
    if (u.role === 'Reviewer' || u.id === 'john') return 'Reviewer';
    return 'Admin';
  };

  const shellBase = shell;
  shell = function (body) {
    const html = shellBase(body);
    const template = document.createElement('template');
    template.innerHTML = html;
    const trigger = template.content.querySelector('.profile-trigger small');
    if (trigger) trigger.textContent = `${roleLabel(currentUser())} · ▾`;
    return template.innerHTML;
  };

  const profileMenuBase = profileMenu;
  profileMenu = function () {
    return profileMenuBase().replace(/Department Manager/g, 'Department Head');
  };
})();
