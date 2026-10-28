/* Case emails by case. A case created from a customer email always has that email:
   - pending: the customer's request. The acknowledgement is not sent yet, so the tab offers "Send acknowledgement".
   - sent:    the customer's request and the acknowledgement that was sent.
   Only a case created manually (source "Manual") can have no email (none). The Acknowledgement Pending queue and the
   Communication count follow the same states. Loaded last so it wraps rebuildOperationalData, communicationTabV2 and caseView. */
(function () {
  const STATES = ['pending', 'sent'];
  const numberOf = c => parseInt(String(c.id).replace(/\D/g, ''), 10) || 0;
  window.caseMailState = c => c.source === 'Manual' ? 'none' : STATES[numberOf(c) % STATES.length];
  const isSeedMessage = m => /^MSG-8\d{3}$/.test(m.id);
  const hasIncoming = c => S.communications.some(m => m.caseId === c.id && m.direction === 'Incoming');

  function applyCaseMailStates() {
    Object.keys(CASE_ACKS).forEach(id => delete CASE_ACKS[id]);
    S.communications = S.communications.filter(m => !(isSeedMessage(m) && m.caseId));
    const cases = Object.values(CASE_DETAILS);
    cases.forEach(c => {
      const state = caseMailState(c);
      if (state === 'none') return;
      // Replace this Case's incoming message rather than adding another copy each time the data is rebuilt.
      S.communications = S.communications.filter(m => m.id !== `MSG-IN-${c.id}`);
      S.communications.push({ id: `MSG-IN-${c.id}`, caseId: c.id, direction: 'Incoming', subject: c.subject, body: c.body, author: c.contact, at: c.created });
      if (state === 'sent') CASE_ACKS[c.id] = { by: 'John Andersson', at: c.created, to: c.email, subject: `Acknowledgement – ${c.id} · ${c.customer}` };
    });
    for (let i = QUEUE.length - 1; i >= 0; i--) if (QUEUE[i][6] === 'Acknowledgement Pending') QUEUE.splice(i, 1);
    cases.filter(c => caseMailState(c) === 'pending').forEach(c => QUEUE.push([`ACK-${c.id}`, c.customer, `Acknowledgement required – ${c.subject}`, `${c.confidence}%`, 'Customer acknowledgement not sent', c.created, 'Acknowledgement Pending']));
  }
  applyCaseMailStates();

  const rebuildBase = rebuildOperationalData;
  rebuildOperationalData = function () { rebuildBase(); applyCaseMailStates(); };

  // Communication tab: the rows follow the case's emails, and the acknowledgement is offered when it is not sent.
  const communicationBase = communicationTabV2;
  communicationTabV2 = function () {
    const html = communicationBase();
    const c = selectedCaseData();
    const template = document.createElement('template');
    template.innerHTML = html;
    const rows = [...template.content.querySelectorAll('button[onclick^="toggleCaseEmailRow"]')];
    const first = rows[0];
    if (!first) return html;
    const list = first.parentElement.parentElement;
    if (!hasIncoming(c)) {
      rows.filter(b => b.getAttribute('onclick').includes(`'${c.id}|in'`)).forEach(b => b.parentElement.remove());
    }
    const left = [...template.content.querySelectorAll('button[onclick^="toggleCaseEmailRow"]')];
    if (!hasIncoming(c) && !acknowledgementRecord(c.id) && !left.length) {
      const empty = document.createElement('div');
      empty.setAttribute('style', 'padding:22px 16px;color:var(--muted);font-size:13px');
      empty.textContent = 'No emails for this case yet. The case was created without a customer email.';
      list.appendChild(empty);
    }
    const caseClassOf = key => {
      if (key === c.id + '|in') return c.caseClass || '';
      const m = key.match(/\|m-(.+)$/);
      const msg = m && S.communications.find(x => String(x.id) === m[1]);
      return msg && msg.direction === 'Incoming' ? (msg.caseClass || c.caseClass || '') : '';
    };
    rows.forEach(btn => {
      const key = (btn.getAttribute('onclick').match(/toggleCaseEmailRow\('([^']+)'\)/) || [])[1];
      const cls = key && caseClassOf(key);
      if (!cls) return;
      const tag = document.createElement('span');
      tag.setAttribute('style', 'margin-top:0;font-size:11px;font-weight:700;border-radius:4px;padding:2px 7px;color:#0869b6;background:var(--bluebg);white-space:nowrap');
      tag.textContent = cls;
      const spans = [...btn.children].filter(el => el.tagName === 'SPAN');
      const right = spans.pop();
      if (spans[0]) spans[0].style.minWidth = '0';
      if (right) {
        Object.assign(right.style, { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' });
        right.appendChild(tag);
      } else btn.appendChild(tag);
    });
    return template.innerHTML;
  };

  // Case tab count: the emails the tab lists.
  // Case header and Overview: a case with no customer email has no acknowledgement to send, so the pending state is not shown.
  const caseViewBase = caseView;
  caseView = function () {
    const c = selectedCaseData();
    const count = S.communications.filter(m => m.caseId === c.id).length + (acknowledgementRecord(c.id) ? 1 : 0);
    const html = caseViewBase().replace(/Communication \(\d+\)/, `Communication (${count})`);
    if (hasIncoming(c) || acknowledgementRecord(c.id)) return html;
    const template = document.createElement('template');
    template.innerHTML = html;
    template.content.querySelectorAll('button.ack-header-state').forEach(b => b.remove());
    template.content.querySelectorAll('.notice').forEach(n => {
      if (/Customer acknowledgement/.test(n.textContent)) n.textContent = 'No customer email on this case, so there is no acknowledgement to send.';
    });
    return template.innerHTML;
  };
})();
