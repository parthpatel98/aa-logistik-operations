/* Create Case: the dialog built in aa-app.js now renders Case Type, Category and Departments directly as
   the same tag-trigger multi-select used by the Edit Case dialog, so no post-render DOM rewrite is needed
   here any more. Left in place (as a no-op) rather than removed from the load chain, so nothing else that
   references this file's position has to change. */
