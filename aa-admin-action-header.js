/* Admin screens: a table column that holds the row actions (edit, activate, delete icons) gets the header "Action".
   Before, those columns had an empty header. The header is set on the admin table pages only, so other tables are unchanged.
   Loaded last so it wraps masterManagement and userManagement, the admin pages. */
(function () {
  // Gives the empty header of every column that holds row action buttons the label "Action".
  function labelActionColumns(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    template.content.querySelectorAll('table').forEach(table => {
      const headerCells = [...table.querySelectorAll('thead th')];
      const firstRow = table.querySelector('tbody tr');
      if (!firstRow) return;
      headerCells.forEach((th, index) => {
        if (th.textContent.trim()) return;
        const cell = firstRow.children[index];
        if (cell && cell.querySelector('button')) {
          th.textContent = 'Action';
          th.classList.add('admin-action-col');
          cell.classList.add('admin-action-col');
        }
      });
    });
    return template.innerHTML;
  }

  // The action column is as narrow as its icons, and its header sits right above them.
  document.head.insertAdjacentHTML('beforeend', '<style>.master-table .admin-action-col{width:1%;white-space:nowrap;text-align:right}</style>');

  const masterManagementBase = masterManagement;
  masterManagement = function () { return labelActionColumns(masterManagementBase()); };

  const userManagementBase = userManagement;
  userManagement = function () { return labelActionColumns(userManagementBase()); };
})();
