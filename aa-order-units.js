/* Order tab units. The unit dropdowns are removed: each measure is a plain number input, and its unit is
   shown in the label (for example "Gross Weight (kg)"). The unit is still stored with the value, so
   downstream reads are unchanged. Loaded last, after the Order tab's own inline editing. */
(function () {
  const ORDER_UNITS = [
    [/Gross Weight|Chargeable Weight|CO₂ Emission/i, 'kg'],
    [/^(?:Length|Width|Height|Loading Metres)$/i, 'm'],
    [/Total Volume/i, 'm³'],
    [/^Distance$/i, 'km'],
  ];
  const unitFor = label => ORDER_UNITS.find(([pattern]) => pattern.test(label))?.[1] || '';

  // Order fields: number input, unit fixed by the field.
  const orderControlBase = inlineOrderControl;
  inlineOrderControl = function (field) {
    const unit = unitFor(field.label);
    if (!unit) return orderControlBase(field);
    return `<input class="order-inline-input" type="number" step="any" value="${editorText(orderMeasurementParts(field.value, unit).number)}" onchange="setInlineOrderField(${field.index},this.value?this.value+' ${unit}':'')">`;
  };

  // Goods table: Weight in kg, Dimensions in m.
  const goodsControlBase = inlineGoodsControl;
  inlineGoodsControl = function (row, column, value, heading) {
    if (/^Weight$/i.test(heading)) {
      return `<input class="order-inline-input" type="number" min="0" step="any" value="${editorText(orderMeasurementParts(value, 'kg').number)}" onchange="setInlineOrderItem(${row},${column},this.value?this.value+' kg':'')">`;
    }
    if (/^Dimensions$/i.test(heading)) {
      return `<input class="order-inline-input" type="text" value="${editorText(String(value || '').replace(/\s*m$/, ''))}" onchange="setInlineOrderItem(${row},${column},this.value?this.value+' m':'')">`;
    }
    return goodsControlBase(row, column, value, heading);
  };

  // Units move into the labels, after the inline controls have been built from the original labels.
  const orderTabUnitBase = orderTabV2;
  orderTabV2 = function () {
    const template = document.createElement('template');
    template.innerHTML = orderTabUnitBase();

    template.content.querySelectorAll('.order-line, .order-metric').forEach(row => {
      const label = row.querySelector(':scope > span') || row.querySelector('span');
      const unit = label && unitFor(label.textContent.trim());
      if (unit) label.textContent = `${label.textContent.trim()} (${unit})`;
    });

    const table = template.content.querySelector('.compact-order-table');
    table?.querySelectorAll('thead th').forEach(th => {
      const heading = th.textContent.trim();
      if (/^Weight$/i.test(heading)) th.textContent = 'Weight (kg)';
      if (/^Dimensions$/i.test(heading)) th.textContent = 'Dimensions (m)';
    });

    return template.innerHTML;
  };
})();
