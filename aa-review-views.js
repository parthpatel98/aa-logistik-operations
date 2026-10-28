/* Review Requests: Missing Information, Customer Replies Received and Requires Follow-up are views of the Awaiting Review
   tab. They are chosen with a "Filtered view" field at the top of the Awaiting Review Filters dialog, and they show as a
   chip with the other applied filters. They are not tabs. The Reviewer home cards open Awaiting Review with the matching
   view selected. The table keeps its usual columns and shows only the requests in the chosen view. Loaded last. */
(function () {
  const VIEWS = {
    'Missing Information': () => QUEUE.filter(r => r[6] === 'Needs Clarification').map(r => r[0]),
    'Customer Replies Received': () => REVIEWER_ACTION_VIEWS['Customer Replies Received'].references,
    'Requires Follow-up': () => REVIEWER_ACTION_VIEWS['Requires Follow-up'].references,
  };
  // Reviewer home card labels that open a view.
  const HOME_VIEW = { 'Needs Clarification': 'Missing Information' };

  const awaitingState = () => {
    S.reviewerFilters = S.reviewerFilters || {};
    S.reviewerFilters['Awaiting Review'] = S.reviewerFilters['Awaiting Review'] || { q: '', customer: 'All', department: 'All', priority: 'All', due: 'All' };
    return S.reviewerFilters['Awaiting Review'];
  };
  const currentView = () => awaitingState().view || 'All';
  const optionsHtml = () => ['All', ...Object.keys(VIEWS)]
    .map(k => `<option value="${k}" ${currentView() === k ? 'selected' : ''}>${k === 'All' ? 'All requests' : `${k} (${VIEWS[k]().length})`}</option>`).join('');

  // Adds the "Filtered view" field to the Filters dialog, its chip next to the other applied filters, and the count on the Filters button.
  function withFilteredView(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    const dialog = template.content.querySelector('[role="dialog"][aria-label="Filters"]');
    if (dialog) {
      const customer = [...dialog.querySelectorAll('label')].find(l => l.textContent.trim() === 'Customer');
      const row = customer && customer.parentElement;
      if (row) {
        const field = row.cloneNode(false);
        field.innerHTML = `<label>Filtered view</label><select aria-label="Filtered view" onchange="setReviewerFilter('view',this.value)" style="width:100%">${optionsHtml()}</select>`;
        row.parentElement.insertBefore(field, row);
      }
    }
    const view = currentView();
    if (view !== 'All') {
      const clear = [...template.content.querySelectorAll('button')].find(b => /Clear all/.test(b.textContent));
      if (clear) {
        const chip = document.createElement('span');
        chip.className = 'rv-view-chip';
        chip.setAttribute('style', 'display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;background:#e8f2fc;color:#0871c7;font-size:12px;font-weight:700');
        chip.innerHTML = `Filtered view: ${view} <button type="button" onclick="setReviewerFilter('view','All')" aria-label="Remove filtered view" style="border:0;background:none;color:inherit;font-size:14px;cursor:pointer;padding:0">×</button>`;
        clear.parentElement.insertBefore(chip, clear);
      }
      const trigger = [...template.content.querySelectorAll('button')].find(b => /Filters/.test(b.textContent) && !/Clear/.test(b.textContent));
      if (trigger) {
        const count = [...trigger.querySelectorAll('span')].find(s => /^\d+$/.test(s.textContent.trim()));
        if (count) count.textContent = String(+count.textContent + 1);
        else { const badge = document.createElement('span'); badge.textContent = '1'; badge.setAttribute('style', 'margin-left:6px;background:#0871c7;color:#fff;border-radius:999px;padding:0 7px;font-size:11px'); trigger.appendChild(badge); }
      }
    }
    return template.innerHTML;
  }

  const filterBarBase = reviewerViewFilterBar;
  reviewerViewFilterBar = function () {
    const html = filterBarBase();
    return S.queueTab === 'Awaiting Review' ? withFilteredView(html) : html;
  };

  // Rows: the Awaiting Review table shows only the requests in the chosen view.
  const queueRowsBase = queueRows;
  queueRows = function (home = false) {
    const rows = queueRowsBase(home);
    if (home || S.queueTab !== 'Awaiting Review') return rows;
    const view = currentView();
    if (view === 'All' || !VIEWS[view]) return rows;
    const ids = VIEWS[view]();
    return rows.filter(row => ids.includes(row[0]));
  };

  // Clear all also clears the view.
  const resetBase = resetReviewerFilters;
  resetReviewerFilters = function () {
    if (!rvfDraft()) awaitingState().view = 'All';
    resetBase();
  };

  // Home cards: open Awaiting Review with the view selected.
  const openHomeBase = openReviewerHomeView;
  openReviewerHomeView = function (tab, priority = 'All') {
    const view = HOME_VIEW[tab] || (VIEWS[tab] ? tab : null);
    if (!view) return openHomeBase(tab, priority);
    openHomeBase('Awaiting Review', priority);
    awaitingState().view = view;
    render();
  };
  openReviewerActionView = function (view) {
    openHomeBase('Awaiting Review', 'All');
    awaitingState().view = VIEWS[view] ? view : 'All';
    S.page = 'review';
    render();
  };
})();
