/* Case threads. The initial email and the acknowledgement stay as they are. Each Case also gets what happens after them,
   built from the Case's own Tasks, grouped by department, so it never disagrees with the Tasks tab:
   - Customer thread (only once the acknowledgement is sent): a clarification request when a department needs information
     from the customer, the customer's answer when no department is still waiting, and a status update with one line per
     department. Both emails use the Admin email templates.
   - Internal comments: the Case status, one comment per department, and a hand-over when more than one department is involved.
   Loaded last so it sees the final Task statuses, and it wraps rebuildOperationalData so rebuilds keep the threads. */
(function () {
  const pad = n => String(n).padStart(2, '0');
  const plus = (stamp, min) => {
    const m = String(stamp).match(/^(\d\d)\/(\d\d)\/(\d{4}), (\d\d):(\d\d)$/);
    if (!m) return stamp;
    const d = new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5] + min);
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const variantOf = t => String(t[0]).split(' – ')[0];
  const lower = s => s.charAt(0).toLowerCase() + s.slice(1);
  const count = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

  // One entry per department, in the order the departments first appear in the Case's Tasks.
  function departmentsOf(tasks) {
    const map = new Map();
    tasks.forEach(t => { if (!map.has(t[3])) map.set(t[3], []); map.get(t[3]).push(t) });
    return [...map].map(([name, list]) => {
      const done = list.filter(t => t[7] === 'Completed').length;
      const hold = list.find(t => t[7] === 'On Hold'), prog = list.find(t => t[7] === 'In Progress'), todo = list.find(t => t[7] === 'To-Do');
      const focus = hold || prog || todo;
      return { name, list, done, hold, prog, todo, owner: (focus || list[0])[4] };
    });
  }
  // What the department is doing now, in one sentence.
  const doing = d => d.hold ? `${variantOf(d.hold)} is on hold, waiting for the customer.`
    : d.prog ? `${variantOf(d.prog)} is in progress.`
    : d.done === d.list.length ? 'All Tasks are completed.'
    : `Next is ${lower(variantOf(d.todo))}.`;

  function threadsFor(c, i) {
    const tasks = TASKS.filter(t => t[1] === c.id);
    const first = String(c.contact || '').split(' ')[0] || 'there';
    const state = typeof caseMailState === 'function' ? caseMailState(c) : 'none';
    const at = min => plus(c.created, min);
    const depts = departmentsOf(tasks);
    const mail = [], notes = [];

    if (state === 'sent' && depts.length) {
      // A department waits on the customer while a Task is on hold. Some in-progress departments asked earlier and were answered.
      const asks = depts.filter((d, k) => d.hold || (d.prog && (i + k) % 3 === 0));
      if (asks.length) {
        // The question follows the Task that is waiting. The template ends the list with its own full stop.
        const lines = asks.map(d => `- ${d.name}: please send the information we need to ${lower(variantOf(d.hold || d.prog))}`);
        const T = emailTemplateText('tpl-missing-info', { first, caseId: c.id, missing: ['', ...lines] });
        mail.push({ direction: 'Outgoing', subject: T.subject, body: T.body, author: 'John Andersson', at: at(60) });
        if (!asks.some(d => d.hold)) {
          mail.push({ direction: 'Incoming', subject: 'Re: ' + T.subject, author: c.contact, at: at(300),
            body: `Hello,\n\nThank you for checking. We have confirmed the details you asked about and will keep the plan as booked. Let us know if you need anything else.\n\nKind regards,\n${c.contact}` });
        }
      }
      const summary = '\n' + depts.map(d => `- ${d.name}: ${d.done} of ${count(d.list.length, 'Task')} completed${d.hold ? ', one is on hold' : d.prog ? ', one is in progress' : ''}`).join('\n');
      const T = emailTemplateText('tpl-status', { first, caseId: c.id, status: summary });
      mail.push({ direction: 'Outgoing', subject: T.subject, body: T.body, author: 'John Andersson', at: at(1500) });
    }

    // Internal: the Case status, one comment per department, and a hand-over when more than one department is involved.
    const done = tasks.filter(t => t[7] === 'Completed').length;
    const note = (min, author, text) => notes.push({ min, caseId: c.id, author, at: at(min), text, pinned: false });
    note(30, 'John Andersson', `Status: ${c.status}. ${done} of ${count(tasks.length, 'Task')} completed across ${count(depts.length, 'department')}.`);
    depts.forEach((d, k) => note(120 + 40 * k, d.owner, `${d.name} – ${d.done} of ${count(d.list.length, 'Task')} completed. ${doing(d)}`));
    if (depts.length > 1) note(100, depts[0].owner, `Hand-over to ${depts[1].name}: ${depts[0].name} – ${doing(depts[0]).replace(/\.$/, '')}. Please plan around it.`);
    notes.sort((a, b) => a.min - b.min).forEach(n => delete n.min);
    return { mail, notes };
  }

  function applyCaseThreads() {
    if (typeof TASKS === 'undefined' || typeof CASE_DETAILS === 'undefined' || typeof emailTemplateText !== 'function') return;
    S.communications = S.communications.filter(m => !String(m.id).startsWith('MSG-TH-'));
    S.notes = S.notes.filter(n => !n.thread);
    Object.values(CASE_DETAILS).forEach((c, i) => {
      const t = threadsFor(c, i);
      // The Communication tab lists emails newest first, so the latest message is added first.
      t.mail.map((m, k) => ({ id: `MSG-TH-${c.id}-${k}`, caseId: c.id, ...m })).reverse().forEach(m => S.communications.push(m));
      t.notes.forEach(n => S.notes.push({ ...n, thread: true }));
    });
  }
  applyCaseThreads();

  const rebuildBase = rebuildOperationalData;
  rebuildOperationalData = function () { rebuildBase(); applyCaseThreads(); };
})();
