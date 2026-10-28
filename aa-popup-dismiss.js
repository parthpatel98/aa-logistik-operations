/* Dropdowns and popups close when the user clicks outside them. Covers the state-driven popups (review
   filters, multi-select, profile and notification menus, More Filters, the custom date picker) and the
   customer dropdown menus. Runs in the capture phase, so the click that closes a popup still reaches the
   control it landed on. Loaded last. */
(function () {
  const INSIDE = '.rvf-wrap, .ds-multi-wrap, .editor-multi, .menu-wrap, .filter-menu-wrap, .home-range-group, .customer-picker, .ds-combo';
  const STATE_POPUPS = ['rvfOpen', 'multiOpen', 'profileMenu', 'notificationMenu', 'moreFilters', 'homeRangeOpen'];

  document.addEventListener('click', event => {
    const target = event.target;

    // DOM menus (customer dropdowns): hide any open one the click landed outside of.
    document.querySelectorAll('.customer-picker-menu:not([hidden]), .ds-combo-menu:not([hidden])').forEach(menu => {
      const wrap = menu.parentElement;
      if (!wrap || !wrap.contains(target)) menu.hidden = true;
    });

    // State-driven popups: close them all when the click is outside every one of them.
    if (!target.closest || target.closest(INSIDE)) return;
    if (!STATE_POPUPS.some(key => S[key])) return;
    STATE_POPUPS.forEach(key => { S[key] = key === 'profileMenu' || key === 'notificationMenu' || key === 'moreFilters' ? false : null });
    render();
  }, true);

  // Escape closes the open state-driven popups and the DOM dropdown menus, the same as a click outside them.
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.customer-picker-menu:not([hidden]), .ds-combo-menu:not([hidden])').forEach(menu => { menu.hidden = true; });
    if (!STATE_POPUPS.some(key => S[key])) return;
    STATE_POPUPS.forEach(key => { S[key] = key === 'profileMenu' || key === 'notificationMenu' || key === 'moreFilters' ? false : null });
    render();
  });
})();
