/* Layout fixes for the Department User home (Good morning, <name>): task IDs stay on one line in the
   Home tables, the Department Tasks Available filter sits inside its card with even spacing, and the
   chart cards no longer show a horizontal scrollbar. Loaded last, after every Home override. */
(function () {
  document.head.insertAdjacentHTML('beforeend', `<style>
    .table-wrap td:first-child strong.id,
    .table-wrap td strong.id { white-space: nowrap }
    .card > .filters { margin: 0; padding: 12px 16px; border: 0; border-bottom: 1px solid var(--line); box-shadow: none; background: transparent }
    .reviewer-chart-card { overflow: hidden; min-width: 0 }
    .reviewer-chart-card .volume-chart { min-width: 0; width: 100% }
  </style>`);
})();
