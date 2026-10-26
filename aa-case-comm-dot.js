/* Case tabs: a red dot beside Communication when the case has a new communication the user has not seen yet. A case
   starts with everything seen. The count is the emails the Communication tab lists. Opening the tab marks them seen.
   A new email, a composed reply or a sent acknowledgement brings the dot back until the tab is opened. Loaded last
   so it wraps caseView and uses the same red dot as the Order tab. */
(function () {
  S.commSeen = S.commSeen || {};
  const commCount = c => S.communications.filter(m => m.caseId === c.id).length + (acknowledgementRecord(c.id) ? 1 : 0);

  const caseViewBase = caseView;
  caseView = function () {
    const c = selectedCaseData();
    const count = commCount(c);
    if (S.caseTab === 'Communication' || S.commSeen[c.id] === undefined) S.commSeen[c.id] = count;
    const html = caseViewBase();
    if (S.caseTab === 'Communication' || count <= S.commSeen[c.id]) return html;

    const template = document.createElement('template');
    template.innerHTML = html;
    const tab = [...template.content.querySelectorAll('.case-v2-tabs button')].find(b => /^Communication/.test(b.textContent.trim()));
    if (tab && !tab.querySelector('.tab-dot')) {
      const dot = document.createElement('span');
      dot.className = 'tab-dot';
      dot.title = 'New communication on this case';
      tab.appendChild(dot);
    }
    return template.innerHTML;
  };
})();
