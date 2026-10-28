/* Reviewer Home layout. Removes the response-time, waiting-for-customer, queue-status, top-customer and
   SLA sections, then arranges what remains: KPIs, then Current Workload (narrow) and Request Volume
   (wide) side by side, then Priority Distribution, Request Age and Requests by Classification in one row
   (three columns from 1200px, stacked below), then the attention list. Wraps reviewerDashboardHome last,
   so it runs after every other wrapper. */
(function () {
  const REMOVED_TITLES = ['First Customer Response Time', 'Waiting for Customer Response', 'Review Queue by Status', 'Top Customers', 'SLA / Due Date Overview'];
  const cardTitle = card => card.querySelector('h2')?.textContent.trim();
  const reviewerHomeBase = reviewerDashboardHome;

  const style = document.createElement('style');
  style.id = 'reviewer-home-layout-style';
  style.textContent = `
.reviewer-secondary-grid.reviewer-three-up .reviewer-wide-card { grid-column: 1 / -1; }
@media (min-width: 1200px) {
  .reviewer-secondary-grid.reviewer-three-up { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .reviewer-secondary-grid.reviewer-three-up .reviewer-wide-card { grid-column: auto; }
}
/* Current Workload is just a donut and a short legend, so it needs less room than Request Volume's
   bar chart. Same breakpoint as the grid's own responsive rule, so narrow screens still stack to 1fr. */
.reviewer-primary-grid { grid-template-columns: minmax(300px, .85fr) minmax(0, 1.6fr); }
@media (max-width: 1050px) { .reviewer-primary-grid { grid-template-columns: 1fr; } }`;
  document.head.appendChild(style);

  reviewerDashboardHome = function () {
    const template = document.createElement('template');
    template.innerHTML = reviewerHomeBase();
    const content = template.content;

    content.querySelectorAll('section').forEach(card => { if (REMOVED_TITLES.includes(cardTitle(card))) card.remove() });

    // Current Workload on the left, Request Volume on the right.
    const primary = content.querySelector('.reviewer-primary-grid');
    if (primary && primary.children.length === 2) primary.prepend(primary.children[1]);

    // The Classification filter goes: Requests by Classification already shows that breakdown.
    content.querySelectorAll('.home-filters select[aria-label="Classification"]').forEach(select => select.remove());

    // Priority Distribution and Request Age share one row with Requests by Classification.
    const row = content.querySelector('.reviewer-secondary-grid');
    const classification = [...content.querySelectorAll('section')].find(card => cardTitle(card) === 'Requests by Classification');
    if (row && classification) {
      classification.classList.add('reviewer-wide-card');
      row.classList.add('reviewer-three-up');
      row.appendChild(classification);
    }

    // Grids left empty by the removals go.
    content.querySelectorAll('.reviewer-secondary-grid').forEach(grid => { if (!grid.children.length) grid.remove() });

    return template.innerHTML;
  };

  // The app renders once before this file loads, so redraw the current page with the new layout.
  if (S.loggedIn) render();
})();
