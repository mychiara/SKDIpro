/**
 * SOAP / CPPT Module
 */

let soapLogs = JSON.parse(localStorage.getItem("esdki_soap_logs") || "[]");

function saveSOAP() {
  const s = document.getElementById("soap-s").value;
  const o = document.getElementById("soap-o").value;
  const a = document.getElementById("soap-a").value;
  const p = document.getElementById("soap-p").value;
  const time = new Date().toLocaleString("id-ID");

  if (!s && !o && !a && !p)
    return showToast("Mohon isi minimal satu kolom SOAP", "warning");

  const entry = { s, o, a, p, time, id: Date.now() };
  soapLogs.unshift(entry);
  localStorage.setItem("esdki_soap_logs", JSON.stringify(soapLogs));

  renderSOAPLogs();
  resetSOAPForm();
  showToast("Catatan SOAP disimpan", "success");
}

function resetSOAPForm() {
  ["s", "o", "a", "p"].forEach(
    (id) => (document.getElementById(`soap-${id}`).value = ""),
  );
}

function renderSOAPLogs() {
  const cont = document.getElementById("soapHistory");
  if (!cont) return;

  if (soapLogs.length === 0) {
    cont.innerHTML =
      '<p style="text-align:center; opacity:0.5; padding:2rem;">Belum ada riwayat catatan.</p>';
    return;
  }

  cont.innerHTML = soapLogs
    .map(
      (log) => `
        <div class="askep-card soap-entry-card" style="margin-bottom:1rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
                <small style="color:var(--text-secondary); font-weight:600;"><i class="fa-regular fa-clock"></i> ${log.time}</small>
                <i class="fa-solid fa-trash-can" style="color:var(--danger); cursor:pointer; opacity:0.6; transition:0.2s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6" onclick="deleteSOAP(${log.id})"></i>
            </div>
            <div style="font-size:0.95rem; line-height:1.6;">
                <p style="margin-bottom:0.4rem;"><strong>S:</strong> ${log.s || "-"}</p>
                <p style="margin-bottom:0.4rem;"><strong>O:</strong> ${log.o || "-"}</p>
                <p style="margin-bottom:0.4rem;"><strong>A:</strong> ${log.a || "-"}</p>
                <p style="margin-bottom:0.4rem;"><strong>P:</strong> ${log.p || "-"}</p>
            </div>
            <button class="btn btn-outline btn-sm" onclick="printSingleSOAP(${log.id})" style="margin-top:1rem; width:100%; justify-content:center;">
                <i class="fa-solid fa-file-pdf"></i> Cetak PDF
            </button>
        </div>
    `,
    )
    .join("");
}

function deleteSOAP(id) {
  if (!confirm("Hapus catatan ini?")) return;
  soapLogs = soapLogs.filter((l) => l.id !== id);
  localStorage.setItem("esdki_soap_logs", JSON.stringify(soapLogs));
  renderSOAPLogs();
}

function printSingleSOAP(id) {
  const log = soapLogs.find((l) => l.id === id);
  if (!log) return;

  const content = document.createElement("div");
  content.style.padding = "40px";
  content.innerHTML = `
        <h2 style="text-align:center; color:#2563eb;">Catatan Perkembangan Pasien Terintegrasi (CPPT)</h2>
        <hr>
        <p><strong>Waktu:</strong> ${log.time}</p>
        <div style="margin-top:20px; border:1px solid #ccc; padding:15px;">
            <p><strong>Subjective:</strong><br>${log.s || "-"}</p>
            <p><strong>Objective:</strong><br>${log.o || "-"}</p>
            <p><strong>Assessment:</strong><br>${log.a || "-"}</p>
            <p><strong>Plan:</strong><br>${log.p || "-"}</p>
        </div>
        <div style="margin-top:50px; text-align:right;">
            <p>Tanda Tangan Perawat,</p>
            <br><br>
            <p>( ............................ )</p>
        </div>
    `;

  html2pdf()
    .from(content)
    .set({
      margin: 1,
      filename: `SOAP_${id}.pdf`,
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .save();
}
