/* Task drawers take half the screen: the Task view drawer (.drawer) and the New Task drawer (.proposed-task-drawer).
   Several earlier style rules set these widths, so this is the last rule in the cascade and uses !important.
   Loaded last in the chain. */
(function () {
  document.head.insertAdjacentHTML('beforeend', '<style id="task-drawer-width">'
    + '.drawer{width:50vw!important;min-width:0!important;max-width:50vw!important;left:auto!important}'
    + '.proposed-task-drawer{width:50vw!important;min-width:0!important;max-width:50vw!important}'
    + '</style>');
})();
