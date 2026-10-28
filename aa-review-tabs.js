/* Review Requests tab bar: three tabs only, Awaiting Review, Approved and Rejected, with the open tab selected. The
   Missing Information, Customer Replies Received and Requires Follow-up views are options of the Awaiting Review
   View filter (aa-review-views.js), not tabs. Loaded last so it replaces the tab row that earlier overrides rebuilt. */
(function () {
  const TABS = () => [
    { view: 'Awaiting Review', label: `Awaiting Review (${QUEUE.filter(x => x[6] === 'Awaiting Review').length})`, action: "switchReviewerView('Awaiting Review')" },
    { view: 'Approved Requests', label: `Approved (${typeof APPROVED_REQUESTS !== 'undefined' ? APPROVED_REQUESTS.length : 0})`, action: "switchReviewerView('Approved Requests')" },
    { view: 'Rejected', label: `Rejected (${REJECTED_QUEUE.length})`, action: "switchReviewerView('Rejected')" },
  ];

  const reviewBase = review;
  review = function () {
    const html = reviewBase();
    const template = document.createElement('template');
    template.innerHTML = html;
    const tabs = template.content.querySelector('.tabs');
    if (!tabs) return html;
    tabs.innerHTML = TABS().map(tab => `<button type="button" class="${S.queueTab === tab.view ? 'active' : ''}" aria-current="${S.queueTab === tab.view ? 'true' : 'false'}" onclick="${tab.action}">${editorText(tab.label)}</button>`).join('');
    return template.innerHTML;
  };
})();
