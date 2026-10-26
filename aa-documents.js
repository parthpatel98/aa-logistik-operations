(function () {
  const DOC_ROWS = [
    ['ABB_Robotics_Packing_List.pdf', 'Packing list with dimensions and weight', 'PDF', 'Email', 'Thomas Weber', '09 Oct 2026, 09:14', '245 KB'],
    ['Technical_specifications.xlsx', 'Technical specifications for industrial robots', 'Excel', 'Email', 'Thomas Weber', '09 Oct 2026, 09:14', '128 KB'],
    ['Loading_Instructions.docx', 'Instructions for forklift loading', 'Word', 'Email', 'Thomas Weber', '08 Oct 2026, 10:22', '320 KB'],
    ['Customer_Notes.txt', 'Additional notes from customer', 'Text', 'Internal Comment', 'Malin Andersson', '08 Oct 2026, 16:20', '12 KB'],
    ['Order_Data.xml', 'Order data received from customer system', 'XML', 'Email', 'Thomas Weber', '08 Oct 2026, 11:05', '64 KB'],
    ['Robot_Crates.jpg', 'Image of packed crates', 'Image', 'Email', 'Thomas Weber', '08 Oct 2026, 10:48', '1.2 MB'],
    ['Dimensions.png', 'Crate dimensions drawing', 'Image', 'Manual Upload', 'Lisa Svensson', '08 Oct 2026, 14:35', '980 KB'],
    ['ADR_Certificate.pdf', 'ADR Class 9 certificate', 'PDF', 'Internal Comment', 'Parth Patel', '07 Oct 2026, 15:10', '450 KB'],
    ['Weight_Calculation.xlsx', 'Weight calculation and load distribution', 'Excel', 'Internal Comment', 'Parth Patel', '07 Oct 2026, 12:45', '210 KB'],
    ['Transport_Requirements.docx', 'Specific transport requirements', 'Word', 'Manual Upload', 'John Andersson', '07 Oct 2026, 11:30', '320 KB'],
    ['Munich_Terminal_Guide.pdf', 'Terminal handling guideline', 'PDF', 'Email', 'Karin Holm', '06 Oct 2026, 16:18', '980 KB'],
    ['Customs_Information.txt', 'Customs clearance information', 'Text', 'Manual Upload', 'John Andersson', '06 Oct 2026, 14:05', '8 KB']
  ];
  // Uploaded documents: each row also carries the uploaded file as an object URL, so its preview and download are the real file.
  const extraDocs = [];
  const allDocs = () => DOC_ROWS.concat(extraDocs);

  const docKind = name => /\.pdf$/i.test(name) ? 'pdf' : /\.(png|jpe?g|gif|webp)$/i.test(name) ? 'image' : 'other';
  const extOf = name => (String(name).match(/\.[^.]+$/) || [''])[0].toLowerCase();
  const asciiOnly = s => String(s).replace(/[^\x20-\x7e]/g, '?');

  // Sample content for seeded documents (the prototype does not store their original files).
  function sampleLines(d) {
    return [`Type: ${d[2]}`, `Description: ${d[1]}`, `Source: ${d[3]}`, `Uploaded by: ${d[4]} on ${d[5]}`, `Size: ${d[6]}`, '', 'Sample copy. The original file is not stored in this prototype.'];
  }
  function samplePdfBlob(title, lines) {
    const esc = s => asciiOnly(s).replace(/[()\\]/g, '\\$&');
    const text = [`BT /F1 18 Tf 60 760 Td (${esc(title)}) Tj ET`].concat(lines.map((l, i) => `BT /F1 11 Tf 60 ${720 - i * 18} Td (${esc(l)}) Tj ET`)).join('\n');
    const objs = [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
      `<< /Length ${text.length} >>\nstream\n${text}\nendstream`,
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    ];
    let out = '%PDF-1.4\n';
    const offsets = [];
    objs.forEach((o, i) => { offsets.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
    const xref = out.length;
    out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offsets.map(o => String(o).padStart(10, '0') + ' 00000 n \n').join('')
      + `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    return new Blob([out], { type: 'application/pdf' });
  }
  function sampleImage(d, done) {
    const canvas = document.createElement('canvas');
    canvas.width = 800; canvas.height = 500;
    const ctx = canvas.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 800, 500);
    g.addColorStop(0, '#dbeafe'); g.addColorStop(1, '#bfdbfe');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 800, 500);
    ctx.fillStyle = '#1e3a5f'; ctx.font = 'bold 36px Arial'; ctx.fillText(d[0], 40, 80);
    ctx.font = '22px Arial'; sampleLines(d).slice(0, 5).forEach((l, i) => ctx.fillText(l, 40, 140 + i * 40));
    const type = /\.jpe?g$/i.test(d[0]) ? 'image/jpeg' : 'image/png';
    canvas.toBlob(blob => done(blob), type);
  }
  function triggerDownload(href, name, revoke) {
    const a = document.createElement('a');
    a.href = href; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    if (revoke) setTimeout(() => URL.revokeObjectURL(href), 1000);
  }
  function triggerBlobDownload(blob, name) { triggerDownload(URL.createObjectURL(blob), name, true); }

  window.downloadDoc = function (i) {
    const d = allDocs()[i];
    if (!d) return;
    if (d.url) { triggerDownload(d.url, d[0]); return; }
    const kind = docKind(d[0]);
    if (kind === 'pdf') { triggerBlobDownload(samplePdfBlob(d[0], sampleLines(d)), d[0]); return; }
    if (kind === 'image') { sampleImage(d, blob => triggerBlobDownload(blob, d[0])); return; }
    triggerBlobDownload(new Blob([`Sample copy of ${d[0]}\n\n${sampleLines(d).join('\n')}\n`], { type: 'text/plain' }), d[0]);
  };

  window.openDocPreview = function (i) { S.docPreview = i; render(); };
  window.closeDocPreview = function () { S.docPreview = null; render(); };

  function previewBody(d) {
    const kind = docKind(d[0]);
    if (kind === 'pdf') {
      if (d.url) return `<iframe src="${d.url}" title="${editorText(d[0])}" style="width:100%;height:68vh;border:1px solid var(--line);border-radius:6px"></iframe>`;
      return `<div style="background:#fff;border:1px solid var(--line);border-radius:6px;padding:36px 40px;min-height:52vh;box-shadow:0 2px 10px rgba(0,0,0,.06)"><div style="font-size:20px;font-weight:700;margin-bottom:18px">${editorText(d[0])}</div>${sampleLines(d).map(l => `<div style="font-size:14px;line-height:1.7;color:var(--ink-2,#3d4d63)">${editorText(l)}</div>`).join('')}</div>`;
    }
    if (kind === 'image') {
      if (d.url) return `<img src="${d.url}" alt="${editorText(d[0])}" style="display:block;max-width:100%;max-height:68vh;margin:0 auto;border-radius:6px">`;
      return `<div style="border-radius:6px;padding:40px;background:linear-gradient(135deg,#dbeafe,#bfdbfe);min-height:40vh"><div style="font-size:22px;font-weight:700;color:#1e3a5f;margin-bottom:14px">${editorText(d[0])}</div>${sampleLines(d).slice(0, 5).map(l => `<div style="font-size:14px;color:#1e3a5f;line-height:1.8">${editorText(l)}</div>`).join('')}</div>`;
    }
    return `<div class="empty-state"><strong>No preview for ${editorText(extOf(d[0]) || 'this')} files</strong>Download the file to open it on your computer.</div>`;
  }

  function docPreviewModal() {
    const i = S.docPreview, d = allDocs()[i];
    if (!d) return '';
    return `<div class="modal-shade" onclick="if(event.target===this)closeDocPreview()"><div class="assign-modal" role="dialog" aria-modal="true" aria-label="${editorText(d[0])}" style="width:min(920px,94vw);max-height:92vh;display:flex;flex-direction:column">
      <div class="compose-head"><div><strong>${editorText(d[0])}</strong><span>${editorText(d[2])} · ${editorText(d[6])} · ${editorText(d[4])} · ${editorText(d[5])}</span></div><button type="button" class="compose-close" aria-label="Close" onclick="closeDocPreview()">×</button></div>
      <div class="compose-body" style="overflow:auto">${previewBody(d)}</div>
      <div class="compose-foot"><button class="btn" onclick="closeDocPreview()">Close</button><button class="btn primary" onclick="downloadDoc(${i})">Download</button></div></div></div>`;
  }

  function caseDocumentsTab() {
    const q = (S.docQuery || '').toLowerCase();
    const rows = allDocs().map((d, i) => ({ d, i })).filter(({ d }) => !q || (d[0] + ' ' + d[1]).toLowerCase().includes(q));
    const body = rows.map(({ d, i }) => `<tr><td><span><button type="button" class="link" onclick="openDocPreview(${i})" style="font-weight:700;padding:0;text-align:left" title="Preview">${editorText(d[0])}</button><small style="display:block;color:var(--muted)">${editorText(d[1])}</small></span></td><td>${d[2]}</td><td>${d[3]}</td><td>${editorText(d[4])}</td><td>${d[5]}</td><td>${d[6]}</td><td style="text-align:right"><button type="button" class="btn" onclick="downloadDoc(${i})" title="Download ${editorText(d[0])}" style="padding:5px 11px;font-size:12px">Download</button></td></tr>`).join('');
    return `<div class="card"><div class="card-head" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><h2 style="margin:0">Documents (${rows.length})</h2><div style="display:flex;gap:8px"><input value="${editorText(S.docQuery || '')}" placeholder="Search documents" onchange="S.docQuery=this.value;render()" style="height:34px;min-width:220px;border:1px solid #c9d5e1;border-radius:4px;padding:0 10px;font:inherit"><button class="btn primary" onclick="uploadCaseDocument()">Upload</button></div></div><table><thead><tr><th>Document</th><th>Type</th><th>Source</th><th>Uploaded by</th><th>Date</th><th>Size</th><th></th></tr></thead><tbody>${body}</tbody></table>${rows.length ? '' : '<div class="empty-state"><strong>No documents match</strong>Change the search to see more.</div>'}</div>${S.docPreview != null ? docPreviewModal() : ''}`;
  }

  // A real file picker for every upload action. The input is added to the page before it is clicked, so
  // browsers reliably open the chooser, and it is removed again once a choice is made or cancelled.
  window.pickFiles = function (onPicked) {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.style.display = 'none';
    input.addEventListener('change', () => { const files = Array.from(input.files || []); input.remove(); onPicked(files); });
    input.addEventListener('cancel', () => input.remove());
    document.body.appendChild(input);
    input.click();
  };

  const DOC_TYPES = [[/\.pdf$/i, 'PDF'], [/\.(xlsx?|csv)$/i, 'Excel'], [/\.docx?$/i, 'Word'], [/\.txt$/i, 'Text'], [/\.xml$/i, 'XML'], [/\.(png|jpe?g|gif|webp)$/i, 'Image']];
  const docType = name => (DOC_TYPES.find(([re]) => re.test(name)) || [null, 'File'])[1];
  const fileSize = bytes => bytes >= 1048576 ? (bytes / 1048576).toFixed(1) + ' MB' : bytes >= 1024 ? Math.round(bytes / 1024) + ' KB' : bytes + ' B';
  window.fileSizeLabel = fileSize;

  window.uploadCaseDocument = function () {
    pickFiles(files => {
      if (!files.length) return;
      const at = auditTimestamp(), by = actorName();
      files.forEach(f => {
        const row = [f.name, 'Uploaded from this device', docType(f.name), 'Manual Upload', by, at, fileSize(f.size)];
        row.url = URL.createObjectURL(f);
        extraDocs.push(row);
      });
      toast(`${files.length} document${files.length === 1 ? '' : 's'} uploaded`);
      render();
    });
  };

  // Task "Add Attachment": same picker, and each file is recorded against the Task with its real name and size.
  window.addAttachment = function (id) {
    pickFiles(files => {
      if (!files.length) return;
      const at = auditTimestamp(), by = actorName();
      (S.attachments[id] = S.attachments[id] || []).push(...files.map(f => ({ name: f.name, at, author: by, size: fileSize(f.size) })));
      const word = files.length === 1 ? 'file' : 'files';
      S.activities.unshift([`${files.length} ${word} attached to ${id}`, by, at]);
      toast(`${files.length} ${word} attached`);
      render();
    });
  };

  // The paperclip in the Internal Communication composer stages the chosen files on that comment. They are
  // saved onto the comment when it is posted, and are not added to the Case or to any customer email.
  window.attachCommentFile = function () {
    const caseId = S.selectedCase;
    pickFiles(files => {
      if (!files.length) return;
      if (S.commentFilesCase !== caseId) S.commentFiles = [];
      S.commentFilesCase = caseId;
      S.commentFiles = S.commentFiles || [];
      files.forEach(f => S.commentFiles.push({ name: f.name, size: fileSize(f.size), url: URL.createObjectURL(f) }));
      toast(`${files.length} ${files.length === 1 ? 'file' : 'files'} attached to the comment`);
      render();
    });
  };

  const docsCaseViewBase = caseView;
  caseView = function () {
    return docsCaseViewBase().replace(/<button class="([^"]*)" onclick="S\.caseTab='Activity';render\(\)">/, (m, cls) => `<button class="${S.caseTab === 'Documents' ? 'active' : ''}" onclick="S.caseTab='Documents';render()">Documents</button>` + m);
  };

  const docsCaseTabBase = caseTabV2;
  caseTabV2 = function () {
    return S.caseTab === 'Documents' ? caseDocumentsTab() : docsCaseTabBase();
  };
})();

