/* Admin sidebar: one behaviour for every click.
   - Opening or closing a group (User Management, Masters, Task Configuration, ...) keeps the page where it is.
   - Going to any admin page (a sub-item or a standalone item such as Integrations or Blocklist Management) opens the
     page at the top, so every page starts in the same place.
   Loaded last so it wraps the admin navigation functions. */
(function () {
  const keepScroll = fn => function (...args) {
    const y = window.scrollY;
    const result = fn.apply(this, args);
    window.scrollTo(0, y);
    return result;
  };
  const toTop = fn => function (...args) {
    const result = fn.apply(this, args);
    window.scrollTo(0, 0);
    return result;
  };

  window.adminToggleNavGroup = keepScroll(window.adminToggleNavGroup);
  openMasterPage = toTop(openMasterPage);

  const goBase = go;
  go = function (page) {
    const result = goBase.apply(this, arguments);
    if (S.role === 'Admin' && (page === 'users' || page === 'masters')) window.scrollTo(0, 0);
    return result;
  };
})();
