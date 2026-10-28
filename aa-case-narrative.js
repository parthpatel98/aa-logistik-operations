/* AI Summary on the Case Overview, written in three short paragraphs from the case's data:
   1. Who submitted what, regarding what, and when, with the route, weight and priority where the case has them.
   2. The acknowledgement (or that none has been sent), and the Tasks created and assigned, with how many are complete.
   3. Due dates, overdue Tasks, and what the case is waiting for.
   Each sentence has several phrasings. The case's number picks one, so a case reads the same every time, but cases
   with different data do not read alike. Dates are written in full (7 October 2026).
   Loaded last so it replaces caseNarrative from aa-app.js. */
(function () {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
  const numberWord = n => (n < WORDS.length ? WORDS[n] : String(n));
  const capitalise = s => s.charAt(0).toUpperCase() + s.slice(1);
  const article = word => (/^[aeiou]/i.test(word) ? 'an' : 'a');

  // "07/10/2026, 09:18" -> { day, month, year, time, key }
  const parse = value => {
    const m = /^(\d{1,2})\/(\d{2})\/(\d{4})/.exec(String(value || ''));
    if (!m) return null;
    const time = (String(value).match(/(\d{2}:\d{2})/) || [])[1] || '';
    return { day: +m[1], month: +m[2], year: +m[3], time, key: `${m[3]}${m[2]}${m[1]}` };
  };
  const longDate = value => {
    const p = parse(value);
    return p ? `${p.day} ${MONTHS[p.month - 1]} ${p.year}` : String(value || '');
  };

  // Stable choice among phrasings: the same case always gets the same wording, different cases differ.
  const hash = (text, salt) => [...`${text}|${salt}`].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
  const pick = (c, salt, options) => options[hash(c.id, salt) % options.length];

  // CASE-400370 keeps the summary that was supplied for it, word for word.
  const SUPPLIED = {
    'CASE-400370': [
      'Thomas Weber from Hitachi Energy submitted an inquiry regarding high-voltage transformer spares on 7 October 2026.',
      'The case was created and the customer acknowledged at 09:18 on the same day. Seven tasks have been created and assigned, with none completed so far.',
      'All tasks are due by 25 October 2026, making timely progress a key focus. The case is currently awaiting completion of the assigned activities.',
    ],
  };

  caseNarrative = function (c, tasks) {
    const p = text => `<p data-aa-style="aa-static-style-99">${text}</p>`;
    if (SUPPLIED[c.id]) return SUPPLIED[c.id].map(p).join('');
    const rec = acknowledgementRecord(c.id);
    const hasEmail = S.communications.some(m => m.caseId === c.id && m.direction === 'Incoming');
    const kind = (String(c.subject || '').split(/\s[–-]\s/)[0] || 'request').toLowerCase();
    const goods = String(c.goods || c.subject || '').toLowerCase();
    const contact = editorText(c.contact);
    const customer = `<strong>${editorText(c.customer)}</strong>`;
    const date = longDate(c.created);
    const created = parse(c.created);
    const route = c.pickup && c.delivery ? ` The route runs from ${editorText(c.pickup)} to ${editorText(c.delivery)}.` : '';
    const weight = c.weight ? ` The shipment weighs ${editorText(c.weight)}.` : '';
    const priority = String(c.priority || '').toLowerCase() === 'high' ? ' It was flagged as high priority.' : '';

    // Paragraph 1: who submitted what, and when.
    const firstOptions = hasEmail
      ? [
        `${contact} from ${customer} submitted ${article(kind)} ${kind} regarding ${editorText(goods)} on ${date}.`,
        `${customer} sent ${article(kind)} ${kind} on ${date}, with ${contact} as the contact, concerning ${editorText(goods)}.`,
        `On ${date}, ${contact} of ${customer} raised ${article(kind)} ${kind} about ${editorText(goods)}.`,
      ]
      : [
        `A ${kind} for ${customer} regarding ${editorText(goods)} was created on ${date} without a customer email.`,
        `${customer} has ${article(kind)} ${kind} on file for ${editorText(goods)}, opened on ${date} with no customer email attached.`,
      ];
    const first = pick(c, 'first', firstOptions) + pick(c, 'route', [route, '', route]) + (hash(c.id, 'weight') % 2 ? weight : '') + (priority && hash(c.id, 'prio') % 2 ? priority : '');

    // Paragraph 2: the acknowledgement, then the Tasks.
    const sentences = [];
    if (rec) {
      const ackDay = parse(rec.at);
      const sameDay = created && ackDay && created.key === ackDay.key;
      sentences.push(sameDay
        ? pick(c, 'ack-same', [
          `The case was created and the customer acknowledged at ${ackDay.time} on the same day.`,
          `The customer acknowledged the request at ${ackDay.time}, on the day the case was opened.`,
          `An acknowledgement went to the customer at ${ackDay.time} on the day the case was created.`,
        ])
        : pick(c, 'ack-later', [
          `The case was created on ${longDate(c.created)}, and the customer acknowledged on ${longDate(rec.at)} at ${ackDay ? ackDay.time : ''}.`,
          `Acknowledgement followed on ${longDate(rec.at)} at ${ackDay ? ackDay.time : ''}, after the case was opened on ${longDate(c.created)}.`,
        ]));
    } else if (hasEmail) {
      sentences.push(pick(c, 'ack-none', [
        `The case was created on ${longDate(c.created)}, and the customer has not been acknowledged yet.`,
        `No acknowledgement has gone to the customer yet; the case was opened on ${longDate(c.created)}.`,
      ]));
    }

    const done = tasks.filter(t => t[7] === 'Completed').length;
    const inProgress = tasks.filter(t => t[7] === 'In Progress').length;
    const unassigned = tasks.filter(t => t[4] === 'Unassigned').length;
    const departments = [...new Set(tasks.map(t => t[3]).filter(Boolean))];
    const n = tasks.length;
    const doneWord = done === 0 ? 'none' : numberWord(done);
    if (!n) sentences.push('No tasks have been created yet.');
    else if (unassigned) {
      sentences.push(`${capitalise(numberWord(n))} tasks have been created, with ${numberWord(n - unassigned)} assigned and ${numberWord(unassigned)} waiting for an owner, and ${doneWord} completed so far.`);
    } else {
      const deptPhrase = departments.length > 1 ? ` across ${departments.slice(0, -1).join(', ')} and ${departments[departments.length - 1]}` : departments.length === 1 ? ` in ${departments[0]}` : '';
      const variants = [
        `${capitalise(numberWord(n))} ${n === 1 ? 'task has' : 'tasks have'} been created and assigned${deptPhrase}, with ${doneWord} completed so far.`,
        `The team has ${numberWord(n)} ${n === 1 ? 'task' : 'tasks'} on this case${deptPhrase}, ${doneWord} of ${n === 1 ? 'it' : 'them'} completed.`,
        `${capitalise(numberWord(n))} ${n === 1 ? 'task is' : 'tasks are'} in place${deptPhrase}; ${doneWord} ${done === 1 ? 'is' : 'are'} complete.`,
      ];
      let sentence = pick(c, 'tasks', variants);
      if (inProgress) sentence += ` ${capitalise(numberWord(inProgress))} ${inProgress === 1 ? 'is' : 'are'} in progress.`;
      sentences.push(sentence);
    }

    // Paragraph 3: due dates, overdue Tasks, and what the case waits for.
    const open = tasks.filter(t => t[7] !== 'Completed');
    const third = [];
    if (!n) third.push('The case has no tasks to track yet.');
    else if (!open.length) third.push(`All ${numberWord(n)} tasks are complete, so the case can be closed.`);
    else {
      const latest = open.reduce((max, t) => (parse(t[6]) && (!parse(max) || parse(t[6]).key > parse(max).key) ? t[6] : max), open[0][6]);
      const sameDue = open.every(t => t[6] === open[0][6]);
      const overdue = open.filter(t => taskDeadlineState(t) === 'Overdue').length;
      if (overdue) third.push(pick(c, 'overdue', [
        `${capitalise(numberWord(overdue))} of these ${overdue === 1 ? 'is' : 'are'} overdue.`,
        `${capitalise(numberWord(overdue))} open ${overdue === 1 ? 'task is' : 'tasks are'} already past ${overdue === 1 ? 'its' : 'their'} due date.`,
      ]));
      third.push(sameDue
        ? pick(c, 'due-same', [
          `${open.length === n ? 'All tasks are' : 'All open tasks are'} due by ${longDate(latest)}, making timely progress a key focus.`,
          `Every open task is due by ${longDate(latest)}, so timing is the main focus.`,
        ])
        : pick(c, 'due-last', [
          `The last open task is due ${longDate(latest)}, so the case is expected to be complete by then.`,
          `The final open task falls due on ${longDate(latest)}, which sets the expected completion date.`,
        ]));
      const statusWord = String(c.status || '').toLowerCase();
      const closing = [`The case is currently awaiting completion of the assigned activities.`];
      if (statusWord && statusWord !== 'completed') closing.push(`The case is ${editorText(statusWord)}, and the assigned work is still open.`);
      third.push(pick(c, 'status', closing));
    }

    return p(first) + p(sentences.join(' ')) + p(third.join(' '));
  };

  // Generating: the Regenerate button spins and is disabled, and the summary area shows a placeholder until
  // the new text is ready. The generated time is recorded when it finishes, not when the button is clicked.
  const AI_SUMMARY_WAIT_MS = 1400;
  document.head.insertAdjacentHTML('beforeend', '<style>'
    + '@keyframes aa-spin{to{transform:rotate(360deg)}}'
    + '.ai-summary-btn.is-generating{cursor:progress;opacity:.7}'
    + '.ai-summary-btn.is-generating svg{animation:aa-spin .8s linear infinite;transform-origin:center}'
    + '.ai-summary-spinner{width:14px;height:14px;border:2px solid #c9d6e3;border-top-color:var(--blue);border-radius:50%;animation:aa-spin .8s linear infinite;flex:0 0 auto}'
    + '</style>');

  const isGenerating = caseId => !!(S.aiSummaryBusy && S.aiSummaryBusy[caseId]);

  const narrativeBase = caseNarrative;
  caseNarrative = function (c, tasks) {
    if (!isGenerating(c.id)) return narrativeBase(c, tasks);
    return `<div role="status" aria-live="polite" style="display:flex;align-items:center;gap:10px;color:var(--muted);padding:6px 0"><span class="ai-summary-spinner" aria-hidden="true"></span>Generating the summary from the latest case details…</div>`;
  };

  // The wrapper in aa-case-activity-view.js logs and records the regenerated summary; this one only adds the wait.
  const regenerateRecord = regenerateAiSummary;
  regenerateAiSummary = function (caseId) {
    if (isGenerating(caseId)) return;
    S.aiSummaryBusy = S.aiSummaryBusy || {};
    S.aiSummaryBusy[caseId] = true;
    render();
    setTimeout(() => {
      delete S.aiSummaryBusy[caseId];
      regenerateRecord(caseId);
    }, AI_SUMMARY_WAIT_MS);
  };

  // Marks the Regenerate button of a case that is generating, after every render.
  const renderBase = render;
  render = function () {
    renderBase();
    document.querySelectorAll('.ai-summary-btn').forEach(btn => {
      const match = (btn.getAttribute('onclick') || '').match(/regenerateAiSummary\('([^']+)'\)/);
      const busy = !!(match && isGenerating(match[1]));
      btn.classList.toggle('is-generating', busy);
      btn.disabled = busy;
      btn.setAttribute('aria-busy', String(busy));
    });
  };
})();
