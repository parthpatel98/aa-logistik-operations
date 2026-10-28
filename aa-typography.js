/* One type scale across the app. Inter is the product face (see the design system's fonts.css). Form
   controls do not inherit the page font, and individual screens set their own sizes and weights inline,
   so this sets the scale once and applies it with !important. Loaded last, so it wins over those inline
   settings. Scale:
     Page title (h1)        20px / 700
     Section title (h2)     16px / 700
     Card title (h3)        14px / 700
     Body and table cells   13px / 400
     Field values, inputs   13px / 500
     Buttons                13px / 600
     Table headings         12px / 600
     Secondary text (.sub)  12px / 400
     Status pills           11px / 600
     KPI tile label         12px / 500
     KPI tile value         24px / 700
   Compact order tables keep their smaller size on purpose. Code stays monospace. Field backgrounds are
   white everywhere, including dialogs that are added outside the app root.

   The Home screen's KPI tiles come in two markups that had drifted apart: the Reviewer home's
   `.reviewer-kpis` (label as <span>, 12px/500) and the generic `.kpi` used by Manager/User/Admin home
   (label as <label>, was 12px/650) — same role, different weight. Both now follow the scale above. */
(function () {
  const style = document.createElement('style');
  style.id = 'app-typography-style';
  style.textContent = `
#root *:not(code):not(kbd):not(pre), #toast, #toast * {
  font-family: Inter, "Segoe UI", Arial, sans-serif !important;
}
#root code, #root kbd, #root pre {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace !important;
}
#root h1 { font-size: 20px !important; font-weight: 700 !important; }
#root h2 { font-size: 16px !important; font-weight: 700 !important; }
#root h3 { font-size: 14px !important; font-weight: 700 !important; }
#root input, #root select, #root textarea { font-size: 13px !important; font-weight: 500 !important; }
#root button { font-size: 13px !important; font-weight: 600 !important; }
#root .pill { font-size: 11px !important; font-weight: 600 !important; }
#root table:not(.compact-order-table) th { font-size: 12px !important; font-weight: 600 !important; }
#root table:not(.compact-order-table) td { font-size: 13px !important; font-weight: 400 !important; }
#root .sub, #root .chart-sub { font-size: 12px !important; font-weight: 400 !important; }
#root .pill, #root button.btn, #root button.link, #root button.case-link { line-height: 1.3 !important; }
#root .kpi label, #root .reviewer-kpis button span { font-size: 12px !important; font-weight: 500 !important; }
#root .kpi strong, #root .reviewer-kpis button strong { font-size: 24px !important; font-weight: 700 !important; }
input:not([type="checkbox"]):not([type="radio"]), select, textarea {
  background-color: #fff !important;
}`;
  document.head.appendChild(style);
})();
