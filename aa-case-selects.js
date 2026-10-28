/* Dropdowns in the case module (case list, case page, task drawer and the create/edit dialogs) use the
   compact filter look: light border, rounded corners, 34px high. Other screens keep their own styles. */
(function () {
  const style = document.createElement('style');
  style.id = 'case-select-style';
  style.textContent = `
#root .case-workspace select:not([hidden]),
#root .home-filters select:not([hidden]),
#root .filters select:not([hidden]),
#root .case-filter-row select:not([hidden]),
#root .drawer select:not([hidden]),
#root .assign-modal select:not([hidden]),
#root .modal-shade select:not([hidden]),
#root [role="dialog"] select:not([hidden]),
#root [data-aa-style="aa-static-style-88"] select:not([hidden]),
#root [data-aa-style="aa-static-style-119"] select:not([hidden]) {
  height: 34px;
  border: 1px solid #c9d5e1 !important;
  border-radius: 4px !important;
  padding: 0 28px 0 10px !important;
  font: 600 12.5px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important;
  color: #14233a !important;
  background-color: #ffffff !important;
  min-width: 130px;
  box-sizing: border-box !important;
  outline: none;
}

#root .home-filters select:not([hidden]) {
  background-color: #f4f8fc !important;
  border-color: #c9d5e1 !important;
  padding: 0 9px !important;
}

/* Ensure hidden underlying native selects are never displayed */
#root select[hidden],
#root [role="dialog"] select[hidden],
#root .modal-shade select[hidden],
#root .filters select[hidden],
#root .home-filters select[hidden],
#root .rvf-select[hidden],
#root .ai-field-control[hidden],
.ds-combo select,
.ds-combo select[hidden],
select[hidden] {
  display: none !important;
  visibility: hidden !important;
  position: absolute !important;
  width: 0 !important;
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  border: 0 !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

#root .ds-combo-input {
  height: 34px !important;
  border: 1px solid #c9d5e1 !important;
  border-radius: 4px !important;
  padding: 0 44px 0 10px !important;
  font: 600 12.5px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important;
  color: #14233a !important;
  background-color: #ffffff !important;
  min-width: 130px;
  box-sizing: border-box !important;
  outline: none !important;
  cursor: pointer !important;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100% !important;
  margin: 0 !important;
}

/* Home Filters specific: light grayish-blue background #f4f8fc matching adjacent selects */
#root .home-filters .ds-combo-input,
#root .home-filter-combo .ds-combo-input {
  background-color: #f4f8fc !important;
  border-color: #c9d5e1 !important;
  padding: 0 44px 0 9px !important;
}

#root .home-filters .ds-combo-input:hover,
#root .home-filter-combo .ds-combo-input:hover,
#root .home-filters select:hover {
  background-color: #eaf1f7 !important;
  border-color: #94a3b8 !important;
}

#root .home-filters .ds-combo.open .ds-combo-input,
#root .home-filters .ds-combo-input:focus,
#root .home-filter-combo .ds-combo.open .ds-combo-input,
#root .home-filter-combo .ds-combo-input:focus,
#root .home-filters select:focus {
  background-color: #ffffff !important;
  border-color: #0871c7 !important;
  box-shadow: 0 0 0 2px rgba(8, 113, 199, 0.15) !important;
  cursor: text !important;
}

#root .ds-combo-input:hover {
  border-color: #94a3b8 !important;
}

#root .ds-combo-input:focus,
#root .ds-combo.open .ds-combo-input {
  border-color: #0871c7 !important;
  box-shadow: 0 0 0 2px rgba(8, 113, 199, 0.15) !important;
  cursor: text !important;
}

/* ds-combo container: pure layout positioning wrapper, no borders/padding/shadows */
.ds-combo {
  position: relative !important;
  display: inline-block !important;
  vertical-align: middle !important;
  min-width: 130px;
  box-sizing: border-box !important;
  border: 0 !important;
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  height: auto !important;
}

.home-filters .ds-combo {
  min-width: 130px;
}

.home-filters .ds-combo[data-type="customer"] {
  min-width: 190px;
  max-width: 270px;
}

.ds-combo-clear {
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 0;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: background-color 0.15s ease, color 0.15s ease;
  z-index: 3;
}

.ds-combo-clear:hover {
  background-color: #e2e8f0;
  color: #1e293b;
}

.ds-combo-clear[hidden] {
  display: none !important;
}

.ds-combo-arrow {
  position: absolute;
  right: 9px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: transform 0.18s ease, color 0.15s ease;
  z-index: 2;
  line-height: 1;
}

.ds-combo.open .ds-combo-arrow {
  transform: translateY(-50%) rotate(180deg);
  color: #0871c7;
}

.ds-combo-menu {
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  min-width: 100%;
  width: max-content;
  max-width: 380px;
  max-height: 260px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
  border: 1px solid #c9d5e1;
  border-radius: 6px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.16);
  padding: 4px;
  z-index: 99999;
  box-sizing: border-box;
}

.ds-combo-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  border: 0;
  background: transparent;
  padding: 7px 10px;
  border-radius: 4px;
  text-align: left;
  font: 500 12.5px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  color: #14233a;
  cursor: pointer;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.1s ease, color 0.1s ease;
}

.ds-combo-option:hover,
.ds-combo-option.highlighted {
  background: #f1f5f9;
  outline: 0;
  color: #0871c7;
}

.ds-combo-option.selected {
  background: #eef6fc;
  color: #0871c7;
  font-weight: 700;
}

.ds-combo-empty {
  padding: 10px 14px;
  color: #64748b;
  font-size: 12.5px;
  font-style: italic;
  text-align: center;
}

/* Modals, dialogs, drawers, and full-width forms */
.modal-shade .ds-combo,
[role="dialog"] .ds-combo,
[data-aa-style="aa-static-style-88"] .ds-combo,
[data-aa-style="aa-static-style-119"] .ds-combo,
[data-aa-style="aa-static-style-85"] .ds-combo,
[data-aa-style="aa-static-style-67"] .ds-combo,
.ai-data-row .ds-combo,
.order-line .ds-combo,
.drawer .ds-combo,
.editfield .ds-combo,
.editor-grid .ds-combo,
.assign-modal .ds-combo,
[role="dialog"] .ds-multi-wrap,
[data-aa-style="aa-static-style-88"] .ds-multi-wrap,
[data-aa-style="aa-static-style-119"] .ds-multi-wrap,
[data-aa-style="aa-static-style-85"] .ds-multi-wrap,
[data-aa-style="aa-static-style-67"] .ds-multi-wrap {
  width: 100% !important;
  display: block !important;
}

/* Match AI Classification data row height */
.ai-data-row .ds-combo-input {
  height: 30px !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  border-color: #c7d4e0 !important;
}
`;
  document.head.appendChild(style);

  if (typeof window.enhanceDropdownSelects === 'function') {
    window.enhanceDropdownSelects(document.body);
  }
})();
