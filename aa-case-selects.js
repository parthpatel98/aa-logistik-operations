/* Dropdowns in the case module (case list, case page, task drawer and the create/edit dialogs) use the
   compact filter look: light border, rounded corners, 34px high. Other screens keep their own styles. */
(function () {
  const style = document.createElement('style');
  style.id = 'case-select-style';
  style.textContent = `
#root .case-workspace select,
#root .home-filters select,
#root .filters select,
#root .case-filter-row select,
#root .drawer select,
#root .assign-modal select,
#root .modal-shade select,
#root [role="dialog"] select {
  height: 34px;
  border: 1px solid #c9d5e1;
  border-radius: 4px;
  padding: 0 9px;
  font: 600 12.5px Inter, Segoe UI, Arial, sans-serif;
  color: #14233a;
  background-color: #fff;
  min-width: 130px;
  box-sizing: border-box;
}`;
  document.head.appendChild(style);
})();
