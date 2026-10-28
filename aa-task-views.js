(function(){
let active=false;
window.setTaskView=function(v){S.taskView=v;render()};
const baseTable=tasksTable;
tasksTable=function(rows){
  if(!active)return baseTable.apply(this,arguments);
  const view=S.taskView||'Kanban';
  const toggle='';
  if(view==='List')return toggle+baseTable.apply(this,arguments);
  const board=kanbanBoard(rows).split('selectKanbanTask(').join('openTask(');
  return toggle+`<div style="padding:12px 16px 16px">${board}</div>`;
};
const baseFilter=filterBar;
filterBar=function(){const h=baseFilter.apply(this,arguments);if(!active)return h;const view=S.taskView||'Kanban';return h.replace(/<\/div>\s*$/,`<div class="task-view-toggle" style="margin-left:8px"><button class="${view==='Kanban'?'active':''}" onclick="setTaskView('Kanban')">Kanban</button><button class="${view==='List'?'active':''}" onclick="setTaskView('List')">List</button></div></div>`)};
const wrap=name=>{const f=window[name];window[name]=function(){active=true;try{return f.apply(this,arguments)}finally{active=false}}};
['taskManager','scopedTasksPage','department','myTasks'].forEach(wrap);
render();
})();
