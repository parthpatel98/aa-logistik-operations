/* Task statuses are four: To-Do, In Progress, On Hold, Completed. Earlier modules and sample data still add
   tasks with older status words (Ready, Pending, Unassigned, Waiting, Blocked, Overdue, ...). This module maps every
   task to one of the four when the app loads and again before each screen is drawn, so the Tasks list, Kanban,
   Task Manager, Case Task Summary and dashboards all show the same status. Overdue is not a status: it comes from
   the due date (taskDeadlineState). Loaded last. */
(function () {
  const normalizeAll = () => {
    TASKS.forEach(t => { t[7] = normalizeTaskStatus(t[7]); });
  };
  normalizeAll();
  const renderBase = render;
  render = function () { normalizeAll(); return renderBase(); };
})();
