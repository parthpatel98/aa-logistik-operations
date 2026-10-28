/* Case page header. The title and its meta line take the full width, the status chips (Acknowledgement,
   Status, Priority, Missing Information) sit under the title, and the action buttons form a right-aligned
   group that wraps on narrow screens. Wraps caseView last, so it runs after every other header change. */
(function () {
  const CHIP_SELECTOR = '.pill, .case-missing-state';

  const style = document.createElement('style');
  style.id = 'case-header-style';
  style.textContent = `
.case-v2-title { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 10px 20px; padding: 14px 18px 12px; }
.case-v2-title > div:first-child { flex: 1 1 360px; min-width: 0; }
.case-v2-title h1 { font-size: 20px; line-height: 1.25; margin: 2px 0 4px; overflow-wrap: break-word; }
.case-v2-title .sub { margin: 0; line-height: 1.35; }
.case-v2-chips { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.case-v2-actions { display: flex; align-items: center; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
.case-v2-actions .btn, .case-v2-actions button { white-space: nowrap; }`;
  document.head.appendChild(style);

  const caseViewBase = caseView;
  caseView = function () {
    const template = document.createElement('template');
    template.innerHTML = caseViewBase();
    const title = template.content.querySelector('.case-v2-title');
    if (!title || title.querySelector('.case-v2-actions')) return template.innerHTML;

    const titleBlock = title.firstElementChild;
    const chips = document.createElement('div');
    chips.className = 'case-v2-chips';
    const actions = document.createElement('div');
    actions.className = 'case-v2-actions';

    const ack = title.querySelector('.ack-header-state');
    if (ack) actions.appendChild(ack);
    [...title.children].slice(1).forEach(el => (el.matches(CHIP_SELECTOR) ? chips : actions).appendChild(el));
    titleBlock.appendChild(chips);
    title.appendChild(actions);

    return template.innerHTML;
  };
})();
