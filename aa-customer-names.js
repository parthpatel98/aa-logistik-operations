/* Customer names: four cases and their Tasks were created with the short name "ABB", while the rest use "ABB Robotics".
   Both are the same customer, so the bare name is written as "ABB Robotics" in the case, Task and case-list records. This keeps
   the Customer filter from listing the same customer twice. Loaded last, once the seed data is in place. */
(function () {
  const CANONICAL = { 'ABB': 'ABB Robotics' };
  const rename = name => CANONICAL[name] || name;

  Object.values(CASE_DETAILS).forEach(c => { c.customer = rename(c.customer); });
  TASKS.forEach(t => { t[2] = rename(t[2]); });
  CASES.forEach(row => { row[1] = rename(row[1]); });

  // The Customer filters on the home and queue screens only offer customers that exist in the Customer master
  // (Masters > Customers), so every option returns results there. Cases for other names still show in the lists.
  window.inCustomerMaster = name => MASTER_CUSTOMERS.some(c => c.name === name);
})();
