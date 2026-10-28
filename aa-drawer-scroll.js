/* Task drawer keeps its scroll position when it re-renders for the same Task, for example after a
   comment is added. Wraps render() last, so it works on top of every other render wrapper. */
(function () {
  const renderBase = render;
  let shownTask = null;

  render = function () {
    const before = document.querySelector('.drawer');
    const saved = before && shownTask === S.selectedTask
      ? [before, ...before.querySelectorAll('*')].map((el, i) => [i, el.scrollTop]).filter(([, top]) => top > 0)
      : [];

    renderBase();

    const after = document.querySelector('.drawer');
    shownTask = after ? S.selectedTask : null;
    if (!after || !saved.length) return;
    const elements = [after, ...after.querySelectorAll('*')];
    saved.forEach(([i, top]) => { if (elements[i]) elements[i].scrollTop = top });
  };
})();
