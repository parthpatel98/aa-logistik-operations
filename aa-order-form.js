/* Order tab layout and customer data. Wraps orderTabV2 last, so it runs after every other Order tab change.
   - Customer and Order are separate sections, Order directly under Customer. The Order section holds the order
     references, the order data fields and the messages.
   - Customer, Customer No. and the pickup and delivery party (Customer Number, Name) come from the Customer master
     (MASTER_CUSTOMERS). Choosing a customer by name fills the number, choosing by number fills the name, and choosing
     a pickup or delivery party also fills its address and phone.
   - Street Name and Number share one label with two boxes. Country is a dropdown. Pickup and delivery have a From and
     a To date and time; times are typed as 24-hour HH:MM and validated.
   - Fields that have no value get plausible data from the case, the master or a small list of destinations.
   The values for these fields are kept on the case record (pcust, pname, pstreet, pno, pinfo, ppost, pcity, pcountry,
   pphone, pfromAt, ptoAt and the same with d for delivery), so every screen that reads the case sees the same data. */
(function () {
  const COUNTRIES = ['Austria', 'Belgium', 'Bulgaria', 'Canada', 'China', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Hungary', 'Iceland', 'India', 'Ireland', 'Italy', 'Japan', 'Latvia', 'Lithuania', 'Luxembourg', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'United Kingdom', 'United States'];
  const COUNTRY_ALIAS = { uk: 'United Kingdom', usa: 'United States', us: 'United States', czech: 'Czechia', 'czech republic': 'Czechia' };
  const normCountry = v => { const s = String(v || '').trim(); return COUNTRY_ALIAS[s.toLowerCase()] || s; };

  // Destinations that are not in the Customer master: [name, street, number, postal code, country, phone].
  const PLACES = {
    munich: ['Müller Maschinenbau GmbH', 'Leopoldstraße', '52', '80802', 'Germany', '+49 89 555 0240'],
    zwolle: ['Hanze Industrial Supplies BV', 'Hanzeweg', '18', '8017 JK', 'Netherlands', '+31 38 555 0120'],
    hannover: ['Nordstahl Logistik GmbH', 'Hildesheimer Straße', '210', '30173', 'Germany', '+49 511 555 0310'],
    paris: ['Société Delmas Industrie', 'Rue de la Chapelle', '45', '75018', 'France', '+33 1 55 50 12 00'],
    oslo: ['Nordic Industri AS', 'Drammensveien', '126', '0277', 'Norway', '+47 22 55 01 00'],
    rotterdam: ['Maasvlakte Terminal Services BV', 'Containerweg', '12', '3198 LK', 'Netherlands', '+31 10 555 0180'],
    olkiluoto: ['Olkiluoto Site Receiving', 'Olkiluodontie', '1', '27160', 'Finland', '+358 2 555 0140'],
    tampere: ['Pirkanmaa Koneet Oy', 'Hatanpään valtatie', '24', '33100', 'Finland', '+358 3 555 0120'],
    chicago: ['Great Lakes Industrial Inc.', 'West Fulton Street', '410', '60607', 'United States', '+1 312 555 0147'],
    berlin: ['Spree Anlagenbau GmbH', 'Friedrichstraße', '112', '10117', 'Germany', '+49 30 555 0270'],
    parma: ['Emilia Meccanica S.p.A.', 'Via Emilia Ovest', '76', '43126', 'Italy', '+39 0521 555 018'],
    turku: ['Turun Telakka Oy', 'Telakkatie', '5', '20240', 'Finland', '+358 2 555 0188'],
    gdańsk: ['Baltic Cargo Handling Sp. z o.o.', 'ul. Przemysłowa', '14', '80-557', 'Poland', '+48 58 555 01 20'],
    ghent: ['Gentse Haven Logistics NV', 'Rijnkaai', '3', '9000', 'Belgium', '+32 9 555 01 10'],
    pordenone: ['Friuli Macchine S.r.l.', 'Via Nuova di Corva', '88', '33170', 'Italy', '+39 0434 555 021'],
    helsinki: ['Helsingin Teollisuuspalvelu Oy', 'Mechelininkatu', '30', '00260', 'Finland', '+358 9 555 0100'],
    madrid: ['Iberia Maquinaria S.A.', 'Calle de Alcalá', '210', '28028', 'Spain', '+34 91 555 01 30'],
    hamburg: ['Elbe Hafenlogistik GmbH', 'Am Sandtorkai', '50', '20457', 'Germany', '+49 40 555 0190'],
    bristol: ['Severn Industrial Ltd', 'Avonmouth Way', '7', 'BS11 9YA', 'United Kingdom', '+44 117 555 0123'],
    lyon: ['Rhône Équipements SAS', 'Rue de la Part-Dieu', '88', '69003', 'France', '+33 4 55 50 11 00'],
    aarhus: ['Jysk Industriservice A/S', 'Havnegade', '22', '8000', 'Denmark', '+45 86 55 01 20'],
    oulu: ['Pohjois-Suomen Konepaja Oy', 'Kemintie', '45', '90230', 'Finland', '+358 8 555 0110'],
    prague: ['Vltava Průmysl s.r.o.', 'Vinohradská', '150', '13000', 'Czechia', '+420 2 5555 0160'],
    rauma: ['Rauman Satama Oy', 'Satamakatu', '9', '26100', 'Finland', '+358 2 555 0170'],
    antwerp: ['Scheldt Port Terminals NV', 'Noorderlaan', '147', '2030', 'Belgium', '+32 3 555 01 40'],
    warsaw: ['Mazowsze Logistyka Sp. z o.o.', 'ul. Marszałkowska', '78', '00-517', 'Poland', '+48 22 555 01 50'],
    schweinfurt: ['Mainfranken Antriebstechnik GmbH', 'Ernst-Sachs-Straße', '12', '97424', 'Germany', '+49 9721 555 020'],
    kiruna: ['Malmfälten Service AB', 'Lars Janssonsgatan', '15', '98132', 'Sweden', '+46 980 555 01'],
    forsmark: ['Forsmark Site Gate', 'Forsmarksverket', '1', '74203', 'Sweden', '+46 173 555 01'],
    braås: ['Braås Industripark AB', 'Industrivägen', '8', '36030', 'Sweden', '+46 470 555 01'],
  };
  const FALLBACK_DELIVERY = ['Göteborg, Sweden', 'Stockholm, Sweden', 'Malmö, Sweden', 'Oslo, Norway', 'Hamburg, Germany'];
  const SENDER_INFO = ['Loading dock 2. Call the gate 30 minutes before arrival.', 'Gate 3, opens 07:00. Report to the goods-out desk.', 'Pickup from the warehouse, ramp height 1.2 m.', 'Forklift available on site. Bring ID for site access.'];
  const RECEIVER_INFO = ['Goods receipt, ramp 2. Call 30 minutes before arrival.', 'Delivery to the main gate. Reception signs the delivery note.', 'Unloading by forklift, booking required for the time slot.', 'Tail-lift vehicle needed. Deliver to the loading bay at the rear.'];
  const INTERNAL_MSG = ['Booked with the customer by phone. Confirm the pickup slot with the terminal before dispatch.', 'Check that the goods are ready and packed before the carrier is booked.', 'Customer asked for a call if the pickup time changes.'];
  const EXTERNAL_MSG = ['Please have the packing list and delivery note ready at pickup.', 'Please confirm the delivery address and contact before dispatch.', 'The driver will call the pickup contact on arrival.'];

  const hash = s => { let h = 7; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
  const pick = (arr, seed) => arr[hash(seed) % arr.length];
  const norm = s => String(s || '').trim().toLowerCase();
  const master = () => (typeof MASTER_CUSTOMERS !== 'undefined' ? MASTER_CUSTOMERS : []);
  const titleCase = s => (/[a-zåäöéü]/.test(s) ? s : String(s).toLowerCase().replace(/(^|[\s\-/])(\p{L})/gu, (m, a, b) => a + b.toUpperCase()));

  // "Elmotorgatan 22, 72136 Västerås" -> street, number, postal code, city.
  function parseAddress(addr) {
    const text = String(addr || ''), i = text.lastIndexOf(',');
    const left = (i >= 0 ? text.slice(0, i) : text).replace(/[s.]+$/, '').trim(), right = i >= 0 ? text.slice(i + 1).trim() : '';
    const zip = right.match(/^([A-Za-z]{0,2}[- ]?\d{3,5}(?:\s\d{2})?)\s+(.+)$/);
    const st = left.match(/^(.*?)\s+(\d+\s?[A-Za-z]?(?:[-–/]\d+[A-Za-z]?)?)$/);
    return { street: st ? st[1] : left, no: st ? st[2] : '', post: zip ? zip[1] : '', city: zip ? titleCase(zip[2]) : titleCase(right), country: /^DK[- ]?\d/i.test(zip ? zip[1] : '') ? 'Denmark' : 'Sweden' };
  }
  const place = text => { const s = String(text || ''), p = s.split(','); return { city: (p[0] || '').trim(), country: normCountry(p[1] || '') }; };
  const placeKey = city => Object.keys(PLACES).find(k => norm(city).startsWith(k));
  const masterIn = city => master().filter(m => norm(m.city) === norm(city) || norm(m.city) === ({ gothenburg: 'göteborg' }[norm(city)]));
  const noOf = m => String(m.customerNumber || m.customerCode || m.id || '');
  const masterById = id => master().find(m => String(m.id) === String(id));
  const masterByNumber = v => { const n = norm(v); return n ? master().find(m => norm(noOf(m)) === n || norm(m.customerNumber) === n || norm(m.customerCode) === n) : null; };
  const masterByName = v => { const n = norm(v); const hits = n ? master().filter(m => norm(m.name) === n) : []; return hits.length === 1 ? hits[0] : null; };
  const currentCustomer = c => masterById(c.customerMasterId) || master().find(m => norm(noOf(m)) === norm(c.customerNo)) || master().find(m => norm(m.name) === norm(c.customer)) || null;

  // ---- seed data ---------------------------------------------------------------------------------------------
  const dmy = s => (String(s || '').match(/(\d{2}\/\d{2}\/\d{4})/) || [])[1];
  const hmOf = s => { const m = String(s || '').match(/(\d{1,2}):(\d{2})/); return m ? m[1].padStart(2, '0') + ':' + m[2] : ''; };
  const addHours = (t, h) => { const [hh, mm] = t.split(':').map(Number), v = hh + h; return v > 23 ? '23:59' : String(v).padStart(2, '0') + ':' + String(mm).padStart(2, '0'); };
  const dateNum = d => { const m = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(d || ''); return m ? +m[3] * 10000 + +m[2] * 100 + +m[1] : 0; };

  const AREA = { västerås: '21', stockholm: '8', göteborg: '31', malmö: '40', ludvika: '240', örebro: '19', uppsala: '18', jönköping: '36', eskilstuna: '16', luleå: '920', östersund: '63', helsingborg: '42', skultuna: '21', fagersta: '223' };
  // The master has a phone number for only some customers, so the rest get a local number in the city's area code.
  const phoneFor = (rec, city) => rec.phone || `+46 ${AREA[norm(city)] || '10'} ${100 + (hash(rec.id) % 899)} ${10 + (hash(rec.name) % 89)} ${10 + (hash(noOf(rec)) % 89)}`;
  function partyFromMaster(rec) {
    const a = parseAddress(rec.address);
    const city = a.city || titleCase(rec.city || '') || 'Västerås', post = a.post || String(10000 + (hash(rec.id) % 89999)).replace(/^(d{3})(d{2})$/, '$1 $2');
    return { cust: noOf(rec), name: rec.name, street: a.street, no: a.no, post, city, country: a.country, phone: phoneFor(rec, city) };
  }
  function partyFromPlace(city, country, seed, fallbackName) {
    const key = placeKey(city), pl = key && PLACES[key];
    if (pl) return { cust: String(99112000 + (hash(pl[0]) % 900)), name: pl[0], street: pl[1], no: pl[2], post: pl[3], city, country: pl[4], phone: pl[5] };
    const streets = ['Industrivägen', 'Verkstadsgatan', 'Hamnvägen', 'Fabriksgatan', 'Terminalvägen'];
    return { cust: String(99112000 + (hash(seed) % 900)), name: fallbackName, street: pick(streets, seed), no: String(2 + (hash(seed + 'n') % 60)), post: String(10000 + (hash(seed + 'z') % 89999)).replace(/^(\d{3})(\d{2})$/, '$1 $2'), city, country: country || 'Sweden', phone: '+46 ' + (10 + (hash(seed) % 80)) + ' 555 ' + String(100 + (hash(seed + 'p') % 899)) };
  }
  function senderFor(c) {
    const token = norm(c.customer).split(/[\s,]+/)[0], p = place(c.pickup), seed = c.id + 'p';
    const byName = token.length >= 3 ? master().filter(m => norm(m.name).includes(token)) : [];
    const here = p.city ? masterIn(p.city) : [];
    const key = placeKey(p.city);
    if (key && !here.length) return partyFromPlace(p.city, p.country, seed, c.customer);
    const pool = (here.length && byName.filter(m => here.includes(m)).length ? byName.filter(m => here.includes(m)) : (byName.length && !p.city ? byName : here));
    if (pool.length) return partyFromMaster(pick(pool, seed));
    if (byName.length) return partyFromMaster(pick(byName, seed));
    return partyFromPlace(p.city || 'Västerås', p.country || 'Sweden', seed, c.customer);
  }
  function receiverFor(c) {
    const p = place(c.delivery), seed = c.id + 'd';
    if (/^AA Logistik/i.test(p.city)) {
      const hub = master().find(m => /^AA Logistik/i.test(m.name) && /Terminalv/i.test(m.address)) || master().find(m => /^AA Logistik/i.test(m.name));
      if (hub) return partyFromMaster(hub);
    }
    const here = p.city && !placeKey(p.city) ? masterIn(p.city) : [];
    if (here.length) return partyFromMaster(pick(here, seed));
    return partyFromPlace(p.city, p.country, seed, (p.city || 'Receiving') + ' Receiving Dock');
  }

  function seedOrder(c) {
    if (!c || c._orderSeeded || c.source === 'Manual') return;
    c._orderSeeded = true;
    const n = parseInt(String(c.id).replace(/\D/g, ''), 10) || 1, set = (k, v) => { if (c[k] === undefined || c[k] === null || c[k] === '') c[k] = v; };
    // Locations: an empty pickup is the sender's city, an empty delivery is one of a few common destinations.
    const sender = senderFor(c);
    set('pickup', `${sender.city}, ${sender.country}`);
    set('delivery', pick(FALLBACK_DELIVERY, c.id));
    const receiver = receiverFor(c);
    const put = (pre, party, info) => { set(pre + 'cust', party.cust); set(pre + 'name', party.name); set(pre + 'street', party.street); set(pre + 'no', party.no); set(pre + 'info', info); set(pre + 'post', party.post); set(pre + 'city', party.city); set(pre + 'country', party.country); set(pre + 'phone', party.phone); };
    put('p', sender, pick(SENDER_INFO, c.id + 'i'));
    put('d', receiver, pick(RECEIVER_INFO, c.id + 'j'));
    // Pickup and delivery windows.
    const pDate = dmy(c.pickupDateTime) || dmy(c.due) || dmy(c.created) || '10/10/2026';
    const pFrom = hmOf(c.pickupDateTime) || '08:00';
    let dDate = dmy(c.deliveryDateTime) || dmy(c.requestedDate) || dmy(c.due) || pDate;
    if (dateNum(dDate) < dateNum(pDate)) dDate = pDate;
    const dFrom = hmOf(c.deliveryDateTime) || '09:00';
    set('pfromAt', `${pDate}, ${pFrom}`); set('ptoAt', `${pDate}, ${addHours(pFrom, 2)}`);
    set('dfromAt', `${dDate}, ${dFrom}`); set('dtoAt', `${dDate}, ${addHours(dFrom, 3)}`);
    // Order data and messages.
    const kg = parseFloat(String(c.weight || '').replace(/[, ]/g, '')) || 0;
    set('vehType', kg > 12000 ? 'Truck and trailer' : kg > 1500 ? 'Truck' : 'Van');
    set('proj', `P26-${String(1000 + (n % 9000))}`);
    set('imsg', pick(INTERNAL_MSG, c.id + 'm'));
    set('emsg', pick(EXTERNAL_MSG, c.id + 'e'));
    set('dlvi', c.specialHandling ? `${c.specialHandling}. Call the receiving desk 30 minutes before arrival.` : 'Call the receiving desk 30 minutes before arrival.');
    set('waybill', String(1000000000 + ((n * 7919) % 899999999)));
    set('summera', String(300000 + ((n * 131) % 99999)));
    set('origOrder', `OO-2026-${String(n % 100000).padStart(5, '0')}`);
    set('ordType', /change/i.test(c.caseClass) ? 'Change order' : 'Order reception');
    set('orderDate', dmy(c.created) || dmy(c.due) || '07/10/2026');
    // Goods marking, volume, flat meter and pallet places for each goods row, from its dimensions and quantity.
    c.goodsDetail = c.goodsDetail || [];
    goodsRowsFor(c).forEach((row, i) => {
      const d = (c.goodsDetail[i] = c.goodsDetail[i] || {}), dims = String(row[5] || '').match(/(\d+(?:[.,]\d+)?)\s*[×x]\s*(\d+(?:[.,]\d+)?)\s*[×x]\s*(\d+(?:[.,]\d+)?)/), qty = Math.max(1, parseInt(row[1], 10) || 1);
      const [l, w, h] = dims ? dims.slice(1, 4).map(x => parseFloat(x.replace(',', '.'))) : [0, 0, 0];
      if (d.marking === undefined) d.marking = `L${String(n % 1000000).padStart(6, '0')}-A${i + 1}`;
      if (d.vol === undefined) d.vol = l ? (l * w * h * qty).toFixed(2) : '';
      if (d.flat === undefined) d.flat = l ? (l * w * qty / 2.4).toFixed(1) : '';
      if (d.pallet === undefined) d.pallet = l ? String(Math.max(1, Math.ceil(l * w * qty / 0.96))) : '';
    });
  }

  // Used by the email review (aa-email-detail.js) so the extracted data shows the same sample data as the Order tab.
  // Takes the extracted email data {id, customer, pickup, delivery, pdate, ddate, mode, weight, service} and returns
  // the optional review fields. Locations that were not extracted stay empty, so the required checks still work.
  window.AAOrderForm = {
    COUNTRIES, normCountry, master, noOf, masterByNumber, masterByName, partyFromMaster,
    seedReview(e) {
      const c = { id: e.id, customer: e.customer, pickup: e.pickup, delivery: e.delivery }, n = parseInt(String(e.id).replace(/\D/g, ''), 10) || 1, out = {};
      const put = (pre, party, info) => { Object.assign(out, { [pre + 'cust']: party.cust, [pre + 'name']: party.name, [pre + 'street']: party.street, [pre + 'no']: party.no, [pre + 'info']: info, [pre + 'post']: party.post, [pre + 'city']: party.city, [pre + 'country']: party.country, [pre + 'phone']: party.phone }); };
      if (e.pickup) put('p', senderFor(c), pick(SENDER_INFO, e.id + 'i'));
      if (e.delivery) put('d', receiverFor(c), pick(RECEIVER_INFO, e.id + 'j'));
      const pFrom = hmOf(e.pdate), dFrom = hmOf(e.ddate);
      if (pFrom) out.ptoAt = `${dmy(e.pdate)}, ${addHours(pFrom, 2)}`;
      if (dFrom) out.dtoAt = `${dmy(e.ddate)}, ${addHours(dFrom, 3)}`;
      const kg = parseFloat(String(e.weight || '').replace(/[, ]/g, '')) || 0;
      Object.assign(out, {
        vehType: kg > 12000 ? 'Truck and trailer' : kg > 1500 ? 'Truck' : 'Van', proj: `P26-${String(1000 + (n % 9000))}`,
        imsg: pick(INTERNAL_MSG, e.id + 'm'), emsg: pick(EXTERNAL_MSG, e.id + 'e'), dlvi: 'Call the receiving desk 30 minutes before arrival.',
        waybill: String(1000000000 + ((n * 7919) % 899999999)), summera: String(300000 + ((n * 131) % 99999)), origOrder: `OO-2026-${String(n % 100000).padStart(5, '0')}`,
        ordType: 'Order reception', orderDate: dmy(e.recv) || '07/10/2026', service: e.service || 'Direct',
      });
      return out;
    },
  };

  // ---- date and time helpers -----------------------------------------------------------------------------------
  const toIso = d => { const m = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(d || ''); return m ? `${m[3]}-${m[2]}-${m[1]}` : ''; };
  const fromIso = i => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(i || ''); return m ? `${m[3]}/${m[2]}/${m[1]}` : ''; };
  const parseAt = v => ({ date: toIso(v), time: hmOf(v) });
  const minutes = (iso, hm) => { if (!iso || !hm) return null; const [y, mo, d] = iso.split('-').map(Number), [h, mi] = hm.split(':').map(Number); return Date.UTC(y, mo - 1, d, h, mi) / 60000; };
  window.opNormTime = v => { const m = /^([01]?\d|2[0-3]):?([0-5]\d)$/.exec(String(v || '').trim()); return m ? m[1].padStart(2, '0') + ':' + m[2] : null; };
  window.opTimeMask = el => { const d = el.value.replace(/\D/g, '').slice(0, 4); el.value = d.length > 2 ? d.slice(0, 2) + ':' + d.slice(2) : d; };

  const FIELD = { cust: 'cust', name: 'name', street: 'street', no: 'no', info: 'info', post: 'post', city: 'city', country: 'country', phone: 'phone' };
  const FIELD_LABEL = { cust: 'customer number', name: 'name', street: 'street name', no: 'street number', info: 'info', post: 'postal code', city: 'city', country: 'country', phone: 'phone' };
  const ROLE_LABEL = { p: 'Sender', d: 'Receiver' };
  const errors = () => (S.opErr = S.opErr || {});
  const afterEdit = (c, note) => { commitOrderEdit(c.id, note) };
  // Plain edits keep the focus where it is: the value is saved and logged, and the tab is not drawn again. Only edits that
  // change other fields (choosing a customer or a party) draw the tab again.
  const quietEdit = (c, note) => {
    if (S.opterOrders[c.id]) S.opterOrders[c.id].needsUpdate = true;
    S.activities.unshift([`${c.id} ${note}`, actorName(), typeof auditTimestamp === 'function' ? auditTimestamp() : '']);
  };
  const rowError = (row, msg) => {
    if (!row) return;
    row.querySelectorAll('.order-field-error').forEach(n => n.remove());
    row.querySelectorAll('.invalid').forEach(n => n.classList.remove('invalid'));
    if (msg) { const ctl = row.querySelector('.order-inline-control'); if (ctl) ctl.insertAdjacentHTML('beforeend', `<div class="order-field-error" role="alert">${editorText(msg)}</div>`); }
  };

  // Plain text fields of a pickup (p) or delivery (d) party.
  window.opSet = (role, key, value) => {
    const c = selectedCaseData(), f = FIELD[key];
    if (!c || !f) return;
    c[role + f] = String(value || '').trim();
    const row = document.activeElement && document.activeElement.closest && document.activeElement.closest('.order-line');
    if (row) { const hidden = row.querySelector('.order-composite'); if (hidden) hidden.value = ((c[role + 'street'] || '') + ' ' + (c[role + 'no'] || '')).trim(); }
    quietEdit(c, `${ROLE_LABEL[role]} ${FIELD_LABEL[key]} updated`);
  };
  // From / To of a pickup or delivery. which is 'from' or 'to', part is 'date' or 'time'.
  window.opSetDT = (role, which, part, value, el) => {
    const c = selectedCaseData(), key = role + which + 'At', cur = parseAt(c[key]), errKey = c.id + '|' + key;
    const label = `${ROLE_LABEL[role] === 'Sender' ? 'Pickup' : 'Delivery'} ${which === 'from' ? 'From' : 'To'} date and time`;
    let date = cur.date, time = cur.time;
    if (part === 'time') {
      const t = window.opNormTime(value);
      if (!t) { errors()[errKey] = { time: value, msg: 'Enter a valid 24-hour time, for example 08:30' }; showDTError(el, 'Enter a valid 24-hour time, for example 08:30'); return; }
      time = t;
    } else {
      if (!value) { errors()[errKey] = { msg: 'Select a date' }; showDTError(el, 'Select a date'); return; }
      date = value;
    }
    const other = parseAt(c[role + (which === 'from' ? 'to' : 'from') + 'At']);
    const mine = minutes(date, time), theirs = minutes(other.date, other.time);
    if (mine !== null && theirs !== null && (which === 'from' ? mine > theirs : mine < theirs)) {
      const msg = which === 'from' ? 'From must not be later than To' : 'To must not be earlier than From';
      errors()[errKey] = { time: part === 'time' ? time : undefined, msg };
      showDTError(el, msg);
      return;
    }
    delete errors()[errKey];
    c[key] = `${fromIso(date)}, ${time}`;
    const row = el && el.closest('.order-line');
    if (row) {
      rowError(row, '');
      const t = row.querySelector('input[inputmode="numeric"]'); if (t) t.value = time;
      const hidden = row.querySelector('.order-composite'); if (hidden) hidden.value = c[key];
    }
    quietEdit(c, `${label} updated`);
  };
  const showDTError = (el, msg) => { const row = el && el.closest('.order-line'); rowError(row, msg); if (el) el.classList.add('invalid'); };

  // ---- customer master ----------------------------------------------------------------------------------------
  function applyCustomer(c, rec) {
    c.customer = rec.name; c.customerNo = noOf(rec); c.customerMasterId = rec.id;
    const row = CASES.find(r => r[0] === c.id); if (row) row[1] = rec.name;
    TASKS.forEach(t => { if (t[1] === c.id) t[2] = rec.name; });
    afterEdit(c, `Customer changed to ${rec.name} (No. ${noOf(rec)})`);
  }
  window.opPickCustomer = id => { const c = selectedCaseData(), rec = masterById(id); if (c && rec) applyCustomer(c, rec); };
  function applyParty(c, role, rec) {
    const p = partyFromMaster(rec);
    c[role + 'cust'] = p.cust; c[role + 'name'] = p.name; c[role + 'street'] = p.street; c[role + 'no'] = p.no; c[role + 'post'] = p.post; c[role + 'city'] = p.city; c[role + 'country'] = p.country;
    if (p.phone) c[role + 'phone'] = p.phone;
    afterEdit(c, `${ROLE_LABEL[role]} set to ${p.name} (No. ${p.cust})`);
  }
  window.opPickMaster = (role, id) => {
    const c = selectedCaseData(), rec = masterById(id);
    if (!c || !rec) return;
    if (role === 'c') applyCustomer(c, rec); else applyParty(c, role, rec);
  };
  window.opOpen = input => { window.opFilter(input); };
  window.opClose = input => { setTimeout(() => { const m = input.parentElement && input.parentElement.querySelector('.customer-picker-menu'); if (m) m.hidden = true; }, 200); };
  window.opFilter = input => {
    const menu = input.parentElement.querySelector('.customer-picker-menu'); if (!menu) return;
    const q = norm(input.value), role = input.dataset.role;
    const hits = (q ? master().filter(m => `${m.name} ${m.customerCode} ${noOf(m)} ${m.city}`.toLowerCase().includes(q)) : master()).slice(0, 40);
    menu.innerHTML = hits.map(m => `<button type="button" class="customer-picker-option" onmousedown="event.preventDefault()" onclick="opPickMaster('${role}','${editorText(m.id)}')"><strong>${editorText(noOf(m))}${m.customerCode && m.customerCode !== noOf(m) ? ' · ' + editorText(m.customerCode) : ''}</strong><span>${editorText(m.name)}${m.city ? ' · ' + editorText(titleCase(m.city)) : ''}</span></button>`).join('') || '<div class="order-picker-empty">No customer matches</div>';
    menu.hidden = false;
  };
  // Typing and leaving a picker: an exact customer number or name picks that customer, anything else is kept as typed
  // for a name and rejected for a number, which must exist in the Customer master.
  window.opPickerChange = input => {
    const c = selectedCaseData(), role = input.dataset.role, field = input.dataset.field, v = input.value.trim();
    if (!c) return;
    const rec = field === 'no' ? masterByNumber(v) : masterByName(v);
    if (rec) { window.opPickMaster(role, rec.id); return; }
    if (field === 'no') {
      if (v) { toast('Customer number not found in the Customer master'); render(); return; }
      if (role !== 'c') { c[role + 'cust'] = ''; afterEdit(c, `${ROLE_LABEL[role]} customer number cleared`); } else render();
      return;
    }
    if (role !== 'c') { c[role + 'name'] = v; quietEdit(c, `${ROLE_LABEL[role]} name updated`); }
  };

  // Accepting a customer change to any field other than the two dates. The base handler stores the value by the row's
  // position in the page, which changes when this layout reorders the grid, so the value is kept on the Case by label.
  function acceptOtherField(c, list, item) {
    const before = orderRowValue(item.label);
    c.orderOverrides = c.orderOverrides || {};
    c.orderOverrides[item.label] = item.value;
    list.splice(list.indexOf(item), 1);
    if (S.opterOrders[c.id]) S.opterOrders[c.id].needsUpdate = true;
    if (typeof logCaseActivity === 'function') logCaseActivity(c.id, 'Order data updated from customer request', item.label, actorName(), `${before} → ${item.value}`);
    S.activities.unshift([`${c.id} · ${item.label} updated from customer request`, actorName(), auditTimestamp()]);
    render(); toast('Order field updated');
  }
  function orderRowValue(label) {
    const row = [...document.querySelectorAll('.order-line,.order-metric')].find(r => r.querySelector(':scope > span')?.textContent.trim() === label);
    const f = row && row.querySelector('input:not([type=hidden]), select, textarea, strong');
    if (!f) return '—';
    if (f.tagName === 'SELECT') return f.options[f.selectedIndex]?.text || '—';
    return ('value' in f ? f.value : f.textContent).trim() || '—';
  }
  // Puts accepted values back into their rows on every redraw.
  function applyOrderOverrides(grid, c) {
    const o = c.orderOverrides || {};
    grid.querySelectorAll('.order-line,.order-metric').forEach(row => {
      const label = row.querySelector(':scope > span')?.textContent.trim();
      if (!label || !(label in o)) return;
      const val = o[label], inp = row.querySelector('input.order-inline-input:not([type=hidden])'), sel = row.querySelector('select'), ro = row.querySelector('strong');
      if (inp) { inp.value = val; inp.setAttribute('value', val); }
      else if (sel) { const opt = [...sel.options].find(x => x.text === val || x.value === val); if (opt) sel.value = opt.value; }
      else if (ro) ro.textContent = val;
    });
  }

  // Another layer (aa-case-activity-view.js) logs customer changes to Order dates; the two date rows are owned here.
  const confirmChainBase = confirmOrderChange;
  confirmOrderChange = function (caseId, label) {
    const map = { 'Pickup Date / Time': 'pfromAt', 'Delivery Date / Time': 'dfromAt' };
    const key = map[label], c = CASE_DETAILS[caseId], list = S.orderChangeRequests[caseId] || [];
    const item = list.find(x => x.label === label);
    if (!c || !item) return confirmChainBase(caseId, label);
    if (!key) return acceptOtherField(c, list, item);
    const before = c[key] || '—', to = key.replace('from', 'to'), oldFrom = parseAt(c[key]), oldTo = parseAt(c[to]);
    const nv = parseAt(item.value);
    c[key] = `${fromIso(nv.date) || fromIso(oldFrom.date)}, ${nv.time || oldFrom.time}`;
    if (nv.date && oldTo.date) {
      const shift = Math.round((minutes(nv.date, '00:00') - minutes(oldFrom.date, '00:00')) / 1440), d = new Date(minutes(oldTo.date, '00:00') * 60000 + shift * 86400000);
      c[to] = `${String(d.getUTCDate()).padStart(2, '0')}/${String(d.getUTCMonth() + 1).padStart(2, '0')}/${d.getUTCFullYear()}, ${oldTo.time}`;
    }
    list.splice(list.indexOf(item), 1);
    if (S.opterOrders[caseId]) S.opterOrders[caseId].needsUpdate = true;
    if (typeof logCaseActivity === 'function') logCaseActivity(caseId, 'Order data updated from customer request', label, actorName(), `${before} → ${c[key]}`);
    S.activities.unshift([`${caseId} · ${label} updated from customer request`, actorName(), auditTimestamp()]);
    render(); toast('Order field updated');
  };

  // ---- rendering -----------------------------------------------------------------------------------------------
  // A value typed or chosen by hand is not an AI extraction, so its AI confidence badge becomes "Manual". Fields are
  // remembered per Case by card title and label. A goods row is flagged on the row itself (position 7), so the flag follows
  // the row when other rows are removed. Rows added with + Add Item start out manual.
  const MANUAL_BADGE = '<span class="ai-field-confidence is-manual" title="Entered manually" aria-label="Entered manually">Manual</span>';
  const manualFields = caseId => ((S.orderManual = S.orderManual || {})[caseId] = S.orderManual[caseId] || {});
  const cardTitleOf = el => ((el.closest('.order-card') || document.createElement('div')).querySelector('h3')?.textContent || '').replace(/^\d+\.\s*/, '').trim();
  document.addEventListener('change', event => {
    const el = event.target;
    if (!el.closest || !el.closest('.order-card') || S.page !== 'case') return;
    const c = typeof selectedCaseData === 'function' ? selectedCaseData() : null;
    if (!c) return;
    const goodsRow = el.closest('.compact-order-table tbody tr');
    if (goodsRow) {
      const row = goodsRowsFor(c)[goodsRow.rowIndex - 1];
      if (row) row[7] = true;
      return;
    }
    const line = el.closest('.order-line');
    if (line) manualFields(c.id)[cardTitleOf(el) + '|' + (line.querySelector(':scope > span')?.textContent.trim() || '')] = true;
  }, true);
  const markManualBadges = (grid, c) => {
    const manual = manualFields(c.id), goodsRows = goodsRowsFor(c);
    grid.querySelectorAll('.order-card').forEach(card => {
      const title = cardTitleOf(card.querySelector('h3') || card);
      card.querySelectorAll('.order-line').forEach(line => {
        const badge = line.querySelector('.ai-field-confidence:not(.is-manual)');
        if (badge && manual[title + '|' + (line.querySelector(':scope > span')?.textContent.trim() || '')]) badge.outerHTML = MANUAL_BADGE;
      });
      const msgBadge = card.querySelector('.order-card-head .ai-field-confidence:not(.is-manual)');
      if (msgBadge && manual[title + '|']) msgBadge.outerHTML = MANUAL_BADGE;
    });
    grid.querySelectorAll('.compact-order-table tbody tr').forEach((tr, i) => {
      const badge = tr.querySelector('.ai-field-confidence:not(.is-manual)');
      if (badge && goodsRows[i] && goodsRows[i][7]) badge.outerHTML = MANUAL_BADGE;
    });
  };
  const rowHtml = (label, control, opts = {}) => `<div class="order-line${opts.wide ? ' order-wide' : ''}"><span>${label}</span><div class="order-inline-control">${control}</div>${confidenceBadge(opts.score || 88)}</div>`;
  const input = (value, attrs) => `<input class="order-inline-input" type="text" value="${editorText(value)}" ${attrs}>`;
  const toNode = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };

  function pickerHtml(role, field, value, aria, placeholder) {
    return `<div class="customer-picker">${input(value, `autocomplete="off" aria-label="${aria}" placeholder="${placeholder}" data-role="${role}" data-field="${field}" oninput="opFilter(this)" onfocus="opOpen(this)" onblur="opClose(this)" onchange="opPickerChange(this)"`)}<div class="customer-picker-menu" hidden></div></div>`;
  }
  function customerSelectHtml(c) {
    const cur = currentCustomer(c), count = {};
    master().forEach(m => { count[m.name] = (count[m.name] || 0) + 1; });
    const opts = master().map(m => `<option value="${editorText(m.id)}"${cur && cur.id === m.id ? ' selected' : ''}>${editorText(count[m.name] > 1 ? `${m.name} · ${noOf(m)}` : m.name)}</option>`).join('');
    return `<select class="order-inline-input" aria-label="Customer" onchange="opPickCustomer(this.value)">${cur ? '' : `<option value="__case__" selected>${editorText(c.customer)}</option>`}${opts}</select>`;
  }
  const countryHtml = (role, v) => {
    const cur = normCountry(v);
    return `<select class="order-inline-input" aria-label="Country" onchange="opSet('${role}','country',this.value)">${cur && !COUNTRIES.includes(cur) ? `<option selected>${editorText(cur)}</option>` : ''}${!cur ? '<option value="" selected>Select country</option>' : ''}${COUNTRIES.map(x => `<option${x === cur ? ' selected' : ''}>${x}</option>`).join('')}</select>`;
  };
  const streetHtml = (c, role) => {
    const street = c[role + 'street'] || '', no = c[role + 'no'] || '';
    return `<input type="hidden" class="order-composite" value="${editorText((street + ' ' + no).trim())}"><div class="order-street">${input(no, `aria-label="Street number" placeholder="No." onchange="opSet('${role}','no',this.value)"`)}${input(street, `aria-label="Street name" placeholder="Street name" onchange="opSet('${role}','street',this.value)"`)}</div>`;
  };
  function dateTimeHtml(c, role, which) {
    const key = role + which + 'At', cur = parseAt(c[key]), err = (S.opErr || {})[c.id + '|' + key], who = role === 'p' ? 'Pickup' : 'Delivery', w = which === 'from' ? 'From' : 'To';
    const timeValue = err && err.time !== undefined ? err.time : cur.time;
    return `<input type="hidden" class="order-composite" value="${editorText(c[key] || '')}"><div class="order-date-time"><input class="order-inline-input${err && err.msg && err.time === undefined ? ' invalid' : ''}" type="date" aria-label="${who} ${w} date" value="${cur.date}" onchange="opSetDT('${role}','${which}','date',this.value,this)">`
      + `<input class="order-inline-input${err && err.time !== undefined ? ' invalid' : ''}" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" aria-label="${who} ${w} time, 24-hour" value="${editorText(timeValue)}" oninput="opTimeMask(this)" onchange="opSetDT('${role}','${which}','time',this.value,this)"></div>`
      + (err ? `<div class="order-field-error" role="alert">${editorText(err.msg)}</div>` : '');
  }

  const STYLE = `.compact-order-table .goods-desc-col{width:230px!important;min-width:230px}.compact-order-table td.goods-desc-col input{width:100%!important;min-width:0;box-sizing:border-box}.order-street{display:grid;grid-template-columns:84px minmax(0,1fr);gap:6px}.order-card,.order-card.full{overflow:visible}.order-msg-row{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}@media(max-width:1000px){.order-msg-row{grid-template-columns:minmax(0,1fr)}}.order-line.order-msg{display:block}.order-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.order-line textarea.order-inline-input{display:block;width:100%;min-height:118px;height:auto;padding:8px 10px;resize:vertical;line-height:1.45;font:inherit;box-sizing:border-box}.order-field-error{margin-top:4px;font-size:11.5px;color:#c51f2d}.order-inline-input.invalid{border-color:#c51f2d;background:#fff5f5}#root .order-card .order-card-head h3.order-msg-title{font-size:12px;font-weight:400!important;color:var(--muted);line-height:1.4}.compact-order-table .goods-desc-col input{width:320px}.order-upd{position:relative}.order-upd-badge{position:absolute;top:-9px;right:8px;z-index:2;display:inline-grid;place-items:center;width:18px;height:18px;padding:0;border:0;border-radius:50%;background:#e3a008;color:#fff;font:italic 800 11px Georgia,serif;cursor:pointer}.order-upd.up .order-upd-pop{top:auto;bottom:calc(100% + 3px)}.order-upd-pop{display:none;position:absolute;z-index:60;top:calc(100% + 3px);right:0;width:max-content;min-width:230px;max-width:min(340px,90vw);padding:10px 12px 11px;background:#fff;border:1px solid #d9e2ec;border-radius:8px;box-shadow:0 10px 26px rgba(20,35,58,.16);text-align:left}.order-upd-pop:before{content:"";position:absolute;top:-6px;right:9px;width:10px;height:10px;background:#fff;border-left:1px solid #d9e2ec;border-top:1px solid #d9e2ec;transform:rotate(45deg)}.order-upd.up .order-upd-pop:before{top:auto;bottom:-6px;transform:rotate(225deg)}.order-upd.hov .order-upd-pop,.order-upd:focus-within .order-upd-pop,.order-upd.open .order-upd-pop{display:block}.order-upd-head{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:7px}.order-upd-head>span{font-size:11.5px;font-weight:700;color:#8a5a00;letter-spacing:.01em}.order-upd-compare{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:12px}
.order-upd-col{min-width:0;display:flex;flex-direction:column;gap:3px}
.order-upd-lbl{font-size:11px;color:#6b778a}
.order-upd-val{font-size:12.5px;color:#5b6b80;overflow-wrap:anywhere}
.order-upd-col.is-new .order-upd-lbl{color:#0869b6;font-weight:650}
.order-upd-col.is-new .order-upd-val{font-size:13px;font-weight:700;color:#14233a}
.order-upd-arrow{color:#6b778a;font-size:14px}.order-upd-icons{display:flex;gap:6px;flex:none}.order-upd-icons button{width:28px;height:28px;border-radius:50%;border:1px solid var(--line);background:#fff;cursor:pointer;font-size:14px;line-height:1;padding:0}.order-upd-icons .accept{color:#188756;border-color:#188756}.order-upd-icons .accept:hover{background:#e9f8ef}.order-upd-icons .reject{color:#c51f2d;border-color:#f1a7ad}.order-upd-icons .reject:hover{background:#fdeef0}.order-upd-count{margin-right:8px;padding:2px 9px;border-radius:999px;background:#fff8e6;border:1px solid #f0d78c;color:#8a5a00;font-size:11.5px;font-weight:700}.order-calculated{background:#f1f4f8!important;color:#44536a;cursor:default}.order-picker-empty{padding:8px 12px;color:var(--muted);font-size:12px}`;
  if (!document.getElementById('order-form-style')) document.head.insertAdjacentHTML('beforeend', `<style id="order-form-style">${STYLE}</style>`);

  // The parcel table follows the order of the Opter parcel table: quantity, parcel type, goods marking, goods type, weight,
  // volume, flat meter, pallet places, length, width, height, parcel number. Cells are moved, not rebuilt, so their handlers stay.
  const GOODS_ORDER = ['Item', 'Qty', 'Package Type', 'Goods Marking', 'Goods Description', 'Weight (kg)', 'Volume (m³)', 'Flat Meter (m)', 'Pallet Spaces', 'L (m)', 'W (m)', 'H (m)', 'Package No.', 'AI Confidence', ''];
  function reorderGoods(cardEl, c) {
    const table = cardEl && cardEl.querySelector('.compact-order-table');
    if (!table) return;
    const headRow = table.querySelector('thead tr'), heads = [...headRow.cells].map(th => th.textContent.trim());
    const flatAt = heads.indexOf('Pallet Spaces');
    if (flatAt < 0) return;
    const th = document.createElement('th'); th.textContent = 'Flat Meter (m)';
    headRow.insertBefore(th, headRow.cells[flatAt]);
    [...table.querySelectorAll('tbody tr')].forEach((tr, i) => {
      const td = document.createElement('td');
      td.innerHTML = `<input class="order-inline-input" type="text" value="${editorText(((c.goodsDetail && c.goodsDetail[i]) || {}).flat || '')}" aria-label="Flat meter" onchange="setCaseGoodsField('${c.id}',${i},'flat',this.value)">`;
      tr.insertBefore(td, tr.cells[flatAt]);
    });
    const newHeads = [...headRow.cells].map(x => x.textContent.trim());
    const order = GOODS_ORDER.map(name => newHeads.indexOf(name));
    if (order.some(x => x < 0)) return;
    [headRow, ...table.querySelectorAll('tbody tr')].forEach(tr => { const cells = [...tr.cells]; order.forEach(idx => tr.appendChild(cells[idx])); });
    // Marks the Goods Description cells so they can be made wider than the other columns.
    const descAt = GOODS_ORDER.indexOf('Goods Description');
    [headRow, ...table.querySelectorAll('tbody tr')].forEach(tr => tr.cells[descAt] && tr.cells[descAt].classList.add('goods-desc-col'));
    // Quantity starts at 1: 0 can't be typed, and an empty box goes back to 1 when it loses focus.
    const qtyAt = GOODS_ORDER.indexOf('Qty');
    table.querySelectorAll('tbody tr').forEach(tr => {
      const inp = tr.cells[qtyAt] && tr.cells[qtyAt].querySelector('input');
      if (!inp || inp.getAttribute('min') === '1') return;
      inp.setAttribute('min', '1');
      if (+inp.value < 1) { inp.value = '1'; inp.setAttribute('value', '1'); }
      // Inline handlers, because the page is rebuilt from HTML text and listeners added here would be lost.
      inp.setAttribute('oninput', "if(this.value!==''&&+this.value<1)this.value=''");
      inp.setAttribute('onblur', "if(this.value===''){this.value='1';this.setAttribute('value','1');this.dispatchEvent(new Event('change',{bubbles:true}))}");
    });
  }
  // Dimensions & Capacity is the total of the Goods / Colli table. With at least one goods row the totals are calculated
  // from what the table shows and can't be edited; with no rows the fields stay editable.
  function summarizeGoods(dimCard, goodsCard) {
    const rows = goodsCard ? [...goodsCard.querySelectorAll('tbody tr')] : [];
    if (!dimCard || !rows.length) return;
    const num = v => { const n = parseFloat(String(v || '').replace(/,/g, '').replace(/[^0-9.\-]/g, '')); return isFinite(n) ? n : 0; };
    const sum = i => rows.reduce((a, tr) => { const el = tr.cells[i] && tr.cells[i].querySelector('input'); return a + num(el && el.value); }, 0);
    const fmt = (n, d) => String(+n.toFixed(d));
    const totals = { 'Number of Packages': fmt(sum(1), 0), 'Gross Weight (kg)': fmt(sum(5), 1), 'Total Volume (m³)': fmt(sum(6), 2), 'Loading Metres (m)': fmt(sum(7), 1), 'Pallet Spaces': fmt(sum(8), 0) };
    dimCard.querySelectorAll('.order-metric').forEach(m => {
      const name = m.querySelector(':scope > span').textContent.trim(), inp = m.querySelector('input');
      if (!(name in totals) || !inp) return;
      inp.type = 'text'; inp.value = totals[name]; inp.setAttribute('value', totals[name]); inp.readOnly = true; inp.removeAttribute('onchange'); inp.classList.add('order-calculated'); inp.title = 'Calculated from Goods / Colli';
      const badge = m.querySelector('.ai-field-confidence'); if (badge) { badge.textContent = 'Auto'; badge.className = 'ai-field-confidence is-manual'; badge.removeAttribute('title'); badge.setAttribute('aria-label', 'Calculated from Goods / Colli'); }
    });
  }
  // A customer's suggested change to a field: the field gets an "Update suggested" badge and the comparison opens in a
  // popup on hover, focus or click, so the form keeps its height. Accept and Keep current run the same actions as before.
  function decoratePending(grid, c) {
    const list = (S.orderChangeRequests && S.orderChangeRequests[c.id]) || [];
    grid.querySelectorAll('.order-field-pending').forEach(row => {
      const block = row.querySelector('.order-change-pending'), ctl = row.querySelector('.order-inline-control');
      if (!block || !ctl) return;
      const onclick = block.querySelector('.confirm') ? block.querySelector('.confirm').getAttribute('onclick') : '';
      const label = onclick.split("'")[3] || '', change = list.find(x => x.label === label) || {};
      const composite = row.querySelector('.order-composite'), field = row.querySelector('input:not([type=hidden]), select, textarea');
      const current = composite ? composite.value : field ? (field.tagName === 'SELECT' ? field.options[field.selectedIndex].text : field.value) : '';
      const enc = encodeURIComponent(label);
      block.remove();
      ctl.classList.add('order-upd');
      ctl.insertAdjacentHTML('beforeend', `<button type="button" class="order-upd-badge" title="Update suggested" aria-label="Update suggested" aria-haspopup="dialog" onclick="opUpdToggle(this)">i</button>`
        + `<div class="order-upd-pop" role="dialog" aria-label="Suggested update for ${editorText(label)}"><div class="order-upd-head"><span>Customer suggests</span><div class="order-upd-icons"><button type="button" class="accept" title="Accept" aria-label="Accept update" onclick="opUpd('ok','${enc}')">✓</button><button type="button" class="reject" title="Reject" aria-label="Reject update" onclick="opUpd('no','${enc}')">✕</button></div></div>`
        + `<div class="order-upd-compare"><div class="order-upd-col"><span class="order-upd-lbl">Current value</span><span class="order-upd-val">${editorText(current || '—')}</span></div><span class="order-upd-arrow" aria-hidden="true">→</span><div class="order-upd-col is-new"><span class="order-upd-lbl">Customer provided</span><span class="order-upd-val">${editorText(change.value || '')}</span></div></div></div>`);
    });
    grid.querySelectorAll('.order-card').forEach(card => {
      const n = card.querySelectorAll('.order-upd-badge').length, actions = card.querySelector('.order-card-head .actions');
      if (n && actions) actions.insertAdjacentHTML('afterbegin', `<span class="order-upd-count">${n} ${n === 1 ? 'update' : 'updates'} suggested</span>`);
    });
  }
  const placePop = wrap => {
    const pop = wrap.querySelector('.order-upd-pop'); if (!pop) return;
    pop.style.visibility = 'hidden'; pop.style.display = 'block';
    const h = pop.offsetHeight, r = wrap.getBoundingClientRect();
    wrap.classList.toggle('up', r.bottom + h + 12 > window.innerHeight && r.top - h - 12 > 0);
    pop.style.display = ''; pop.style.visibility = '';
  };
  // Hover opens the popup straight away and closes it 0.3 s after the pointer leaves, so there is time to move onto it.
  ['mouseover', 'focusin'].forEach(type => document.addEventListener(type, e => {
    const w = e.target.closest && e.target.closest('.order-upd'); if (!w) return;
    placePop(w);
    if (type === 'mouseover') { clearTimeout(w._hovTimer); w.classList.add('hov'); }
  }));
  document.addEventListener('mouseout', e => {
    const w = e.target.closest && e.target.closest('.order-upd'); if (!w || (e.relatedTarget && w.contains(e.relatedTarget))) return;
    clearTimeout(w._hovTimer); w._hovTimer = setTimeout(() => w.classList.remove('hov'), 300);
  });
  window.opUpdToggle = btn => { const wrap = btn.closest('.order-upd'), open = wrap.classList.contains('open'); document.querySelectorAll('.order-upd.open').forEach(w => w.classList.remove('open')); if (!open) { placePop(wrap); wrap.classList.add('open'); } };
  window.opUpd = (action, enc) => { const c = selectedCaseData(), label = decodeURIComponent(enc); if (action === 'ok') confirmOrderChange(c.id, label); else rejectOrderChange(c.id, label); };
  if (!window.__opUpdDismiss) {
    window.__opUpdDismiss = true;
    document.addEventListener('click', e => { if (!(e.target.closest && e.target.closest('.order-upd'))) document.querySelectorAll('.order-upd.open').forEach(w => w.classList.remove('open')); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { document.querySelectorAll('.order-upd.open').forEach(w => w.classList.remove('open')); const ae = document.activeElement; if (ae && ae.closest && ae.closest('.order-upd')) ae.blur(); } });
  }

  const addGoodsBase = addGoodsRow;
  addGoodsRow = function (caseId) {
    addGoodsBase(caseId);
    const rows = goodsRowsFor(CASE_DETAILS[caseId]);
    rows[rows.length - 1][7] = true;
    render();
  };
  const removeGoodsBase = removeGoodsRow;
  removeGoodsRow = function (caseId, i) {
    const c = CASE_DETAILS[caseId], before = goodsRowsFor(selectedCaseData()).length;
    removeGoodsBase(caseId, i);
    if (c && c.goodsDetail && goodsRowsFor(selectedCaseData()).length < before) c.goodsDetail.splice(i, 1);
  };

  const baseOrderTab = orderTabV2;
  orderTabV2 = function () {
    const c = selectedCaseData();
    seedOrder(c);
    const html = baseOrderTab();
    try {
      const tpl = document.createElement('template');
      tpl.innerHTML = html;
      const grid = tpl.content.querySelector('.order-grid');
      if (!grid) return html;
      const cards = {};
      [...grid.children].forEach(card => { const h = card.querySelector('h3'); if (h) cards[h.textContent.replace(/^\d+\.\s*/, '').trim()] = card; });
      const need = ['Customer & Order', 'Pickup / Sender', 'Delivery / Receiver', 'Shipment Details', 'Order Data', 'Dimensions & Capacity', 'Goods / Colli'];
      if (need.some(n => !cards[n])) return html;
      const label = r => r.querySelector(':scope > span')?.textContent.trim();
      const find = (card, text) => [...card.querySelectorAll('.order-line')].find(r => !r.hasAttribute('hidden') && label(r) === text) || null;
      // Internal message, external message and delivery instructions: sections of their own, side by side, without a number.
      const messageCard = (title, row) => {
        if (!row) return null;
        const inp = row.querySelector('.order-inline-control input[type="text"]');
        const badge = row.querySelector('.ai-field-confidence');
        const handler = inp ? inp.getAttribute('onchange') : '';
        const sec = toNode(`<section class="order-card"><div class="order-card-head"><h3 class="order-msg-title">${title}</h3><div class="actions"></div></div><div class="order-card-body"><div class="order-line order-msg"><span class="order-sr">${row.querySelector(':scope > span').textContent.trim()}</span><div class="order-inline-control"><textarea class="order-inline-input" aria-label="${title}" rows="5"></textarea></div></div></div></section>`);
        const ta = sec.querySelector('textarea'); ta.value = inp ? inp.value : ''; ta.textContent = ta.value; if (handler) ta.setAttribute('onchange', handler);
        if (badge) sec.querySelector('.actions').appendChild(badge);
        return sec;
      };
      const card = (num, title, rows) => {
        const sec = toNode(`<section class="order-card full"><div class="order-card-head"><h3>${num}. ${title}</h3><div class="actions"></div></div><div class="order-card-body"><div class="order-data-grid"></div></div></section>`);
        const g = sec.querySelector('.order-data-grid');
        rows.filter(Boolean).forEach(r => g.appendChild(typeof r === 'string' ? toNode(r) : r));
        return sec;
      };
      const src = cards['Customer & Order'], ord = cards['Order Data'];

      const customer = card(1, 'Customer', [
        rowHtml('Customer', customerSelectHtml(c), { score: 98 }),
        rowHtml('Customer No.', pickerHtml('c', 'no', c.customerNo || '', 'Customer number', 'Search customer number or code'), { score: 98 }),
        find(src, 'Payer'), find(src, 'Contact'),
      ]);
      const order = card(2, 'Order', [
        find(ord, 'Order Date'), find(ord, 'Order Type'), find(ord, 'Waybill Number'), find(ord, 'Summera ID'), find(ord, 'Original Order Number'),
        find(src, 'Customer Reference'), find(src, 'PO Number'), find(src, 'Project Number'),
      ]);
      const messages = document.createElement('div');
      messages.className = 'order-msg-row';
      [messageCard('Internal Message', find(src, 'Internal Message')), messageCard('External Message', find(src, 'External Message')), messageCard('Delivery Instructions', find(src, 'Delivery Instruction'))].filter(Boolean).forEach(m => messages.appendChild(m));

      const renameLabel = (row, text) => { const l = row && row.querySelector(':scope > span'); if (l) l.textContent = text; return row; };
      const party = (role, source, title, refLabel) => {
        const keepPending = (from, to) => { const old = find(source, from); if (old && old.classList.contains('order-field-pending')) { to.classList.add('order-field-pending'); const block = old.querySelector('.order-change-pending'); if (block) to.appendChild(block); } };
        const fromRow = toNode(rowHtml('From Date and Time', dateTimeHtml(c, role, 'from'), { score: 90 }));
        keepPending(role === 'p' ? 'Pickup Date / Time' : 'Delivery Date / Time', fromRow);
        return card(role === 'p' ? 3 : 4, title, [
          rowHtml('Customer Number', pickerHtml(role, 'no', c[role + 'cust'] || '', 'Customer number', 'Search customer number'), { score: 94 }),
          rowHtml('Name', pickerHtml(role, 'name', c[role + 'name'] || '', 'Name', 'Search customer name'), { score: 94 }),
          rowHtml('Street Number and Name', streetHtml(c, role)),
          rowHtml('Info', input(c[role + 'info'] || '', `aria-label="Info" onchange="opSet('${role}','info',this.value)"`)),
          rowHtml('Postal Code', input(c[role + 'post'] || '', `aria-label="Postal code" onchange="opSet('${role}','post',this.value)"`)),
          rowHtml('City', input(c[role + 'city'] || '', `aria-label="City" onchange="opSet('${role}','city',this.value)"`)),
          rowHtml('Country', countryHtml(role, c[role + 'country'])),
          rowHtml('Phone', input(c[role + 'phone'] || '', `type="tel" aria-label="Phone" onchange="opSet('${role}','phone',this.value)"`)),
          renameLabel(find(source, 'Contact'), 'Name of contact'),
          find(source, refLabel),
          fromRow, rowHtml('To Date and Time', dateTimeHtml(c, role, 'to'), { score: 90 }),
        ]);
      };
      const pickup = party('p', cards['Pickup / Sender'], 'Pickup / Sender', 'Sender Reference');
      const delivery = party('d', cards['Delivery / Receiver'], 'Delivery / Receiver', 'Receiver Reference');

      const ship = cards['Shipment Details'];
      ship.querySelectorAll('.order-line').forEach(r => { if (r.hasAttribute('hidden') || /^Estimated CO/i.test(label(r) || '')) r.remove(); });
      const reselect = (text, options, map) => {
        const r = find(ship, text), sel = r && r.querySelector('select');
        if (!sel) return;
        const cur = map(sel.value), next = document.createElement('select');
        next.className = sel.className; next.setAttribute('onchange', sel.getAttribute('onchange'));
        next.innerHTML = options.map(o => `<option${o === cur ? ' selected' : ''}>${o}</option>`).join('');
        sel.replaceWith(next);
      };
      reselect('Transport Mode', ['Air', 'Road', 'Sea'], v => (/air/i.test(v) ? 'Air' : /sea|ocean|vessel/i.test(v) ? 'Sea' : 'Road'));
      reselect('Service', ['Express', 'Direct', 'Economy'], v => (['Express', 'Direct', 'Economy'].includes(v) ? v : 'Direct'));

      reorderGoods(cards['Goods / Colli'], c);
      summarizeGoods(cards['Dimensions & Capacity'], cards['Goods / Colli']);
      const rest = [cards['Dimensions & Capacity'], cards['Goods / Colli']];
      const used = new Set(['Customer & Order', 'Pickup / Sender', 'Delivery / Receiver', 'Shipment Details', 'Order Data', 'Dimensions & Capacity', 'Goods / Colli']);
      const extras = [...grid.children].filter(el => { const h = el.querySelector('h3'); return !(h && used.has(h.textContent.replace(/^\d+\.\s*/, '').trim())); });
      const ordered = [customer, order, messages, pickup, delivery, ship, ...rest, ...extras];
      grid.replaceChildren(...ordered);
      applyOrderOverrides(grid, c);
      decoratePending(grid, c);
      markManualBadges(grid, c);
      // A field with no value is empty, not a dash.
      grid.querySelectorAll('input.order-inline-input:not([type=hidden]), textarea.order-inline-input').forEach(el => { if (/^[—–-]$/.test(el.value.trim())) { el.value = ''; el.setAttribute('value', ''); el.textContent = ''; } });
      grid.querySelectorAll('.order-card > .order-card-head > h3:not(.order-msg-title)').forEach((h, i) => { h.textContent = h.textContent.replace(/^\d+\.\s*/, `${i + 1}. `); });
      return tpl.innerHTML;
    } catch (e) {
      console.warn('Order tab layout fell back to the base layout:', e);
      return html;
    }
  };
})();
