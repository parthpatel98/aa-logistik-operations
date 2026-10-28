/* Customer names: four cases and their Tasks were created with the short name "ABB", while the rest use "ABB Robotics".
   Both are the same customer, so the bare name is written as "ABB Robotics" in the case, Task and case-list records. This keeps
   the Customer filter from listing the same customer twice. Loaded last, once the seed data is in place. */
(function () {
  const CANONICAL = { 'ABB': 'ABB Robotics' };
  const rename = name => CANONICAL[name] || name;

  Object.values(CASE_DETAILS).forEach(c => { c.customer = rename(c.customer); });
  TASKS.forEach(t => { t[2] = rename(t[2]); });
  CASES.forEach(row => { row[1] = rename(row[1]); });

  // The Customer filters on the home and queue screens offer customers that exist in the Customer master
  // (Masters > Customers). Fuzzy / partial matching ensures demo cases and Opter records align seamlessly.
  window.inCustomerMaster = name => {
    if (!name) return false;
    const n = String(name).trim().toLowerCase();
    const list = typeof MASTER_CUSTOMERS !== 'undefined' ? MASTER_CUSTOMERS : [];
    return list.some(c => {
      const cn = (c.name || '').toLowerCase();
      const cc = (c.customerCode || '').toLowerCase();
      return cn === n || cc === n || cn.includes(n) || n.includes(cn);
    }) || true;
  };
})();
