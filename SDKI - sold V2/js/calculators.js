// === CALCULATORS LOGIC ===
function switchCalcTab(tabId) {
  document
    .querySelectorAll(".calc-tab-btn")
    .forEach((b) => b.classList.remove("active"));
  let activeBtn = document.querySelector(
    `.calc-tab-btn[data-target="calc-${tabId}"]`,
  );
  if (activeBtn) activeBtn.classList.add("active");

  document
    .querySelectorAll(".calc-section")
    .forEach((s) => s.classList.add("hidden"));
  let targetSection = document.getElementById(`calc-${tabId}`);
  if (targetSection) targetSection.classList.remove("hidden");
}
function hitungInfus() {
  const vol = parseFloat(document.getElementById("calc-infus-vol").value);
  const waktu = parseFloat(document.getElementById("calc-infus-waktu").value);
  const faktor = parseInt(document.getElementById("calc-infus-faktor").value);

  if (!vol || !waktu || !faktor) {
    showToast("Mohon lengkapi data infus form", "warning");
    return;
  }

  let hasil = 0;
  let desc = "";

  if (faktor === 1) {
    // Syringe pump ml/jam
    hasil = vol / waktu;
    desc = "cc/jam (ml/jam)";
  } else {
    // Tetes per menit
    hasil = (vol * faktor) / (waktu * 60);
    desc = "Tetes/menit (TPM)";
  }

  document.getElementById("val-infus").innerHTML =
    `${Math.round(hasil)} <span style="font-size:1rem; color:var(--text-secondary);">${desc}</span>`;
  document.getElementById("res-infus").classList.remove("hidden");
}
function hitungBMI() {
  const bb = parseFloat(document.getElementById("calc-bb").value);
  const tb = parseFloat(document.getElementById("calc-tb").value) / 100;

  if (!bb || !tb) {
    showToast("Lengkapi berat dan tinggi badan", "warning");
    return;
  }

  const bmi = bb / (tb * tb);
  let kat = "";
  let color = "";

  if (bmi < 18.5) {
    kat = "Underweight";
    color = "var(--amber)";
  } else if (bmi < 25) {
    kat = "Normal";
    color = "var(--emerald)";
  } else if (bmi < 30) {
    kat = "Overweight";
    color = "var(--amber)";
  } else {
    kat = "Obese";
    color = "var(--danger)";
  }

  document.getElementById("val-bmi").textContent = bmi.toFixed(1);
  const badge = document.getElementById("kategori-bmi");
  badge.textContent = kat;
  badge.style.background = color;
  document.getElementById("res-bmi").classList.remove("hidden");
}
function hitungMAP() {
  const sis = parseFloat(document.getElementById("calc-sistol").value);
  const dia = parseFloat(document.getElementById("calc-diastol").value);

  if (!sis || !dia) {
    showToast("Lengkapi tekanan darah", "warning");
    return;
  }

  const map = (sis + 2 * dia) / 3;
  let kat = "";
  let color = "";

  if (map < 65) {
    kat = "Hipotensi (Kurang)";
    color = "var(--danger)";
  } else if (map <= 100) {
    kat = "Normal";
    color = "var(--emerald)";
  } else {
    kat = "Hipertensi (Tinggi)";
    color = "var(--amber)";
  }

  document.getElementById("val-map").textContent = map.toFixed(0) + " mmHg";
  const badge = document.getElementById("kategori-map");
  badge.textContent = kat;
  badge.style.background = color;
  document.getElementById("res-map").classList.remove("hidden");
}
function hitungBaxter() {
  const bb = parseFloat(document.getElementById("calc-baxter-bb").value);
  const luas = parseFloat(document.getElementById("calc-baxter-luas").value);

  if (!bb || !luas) {
    showToast("Lengkapi BB dan luas luka bakar", "warning");
    return;
  }
  if (luas > 100) {
    showToast("Luas luka maksimal 100%", "warning");
    return;
  }

  // Baxter: 4 cc * BB * luas luka %
  const total = 4 * bb * luas;
  const jam8 = total / 2;
  const jam16 = total / 2;

  document.getElementById("val-baxter-total").textContent =
    `${total.toLocaleString("id-ID")} cc/ml`;
  document.getElementById("val-baxter-8").textContent =
    `${jam8.toLocaleString("id-ID")} cc`;
  document.getElementById("val-baxter-16").textContent =
    `${jam16.toLocaleString("id-ID")} cc`;
  document.getElementById("res-baxter").classList.remove("hidden");
}
function hitungDosis() {
  const bb = parseFloat(document.getElementById("calc-dosis-bb").value);
  const rek = parseFloat(document.getElementById("calc-dosis-rek").value);
  const mg = parseFloat(document.getElementById("calc-dosis-mg").value);
  const ml = parseFloat(document.getElementById("calc-dosis-ml").value);

  if (!bb || !rek || !mg || !ml) {
    showToast("Lengkapi form dosis dengan benar", "warning");
    return;
  }

  const butuh_mg = bb * rek;
  const hasil_ml = (butuh_mg / mg) * ml;

  document.getElementById("val-dosis-total").innerHTML =
    `${hasil_ml.toFixed(1)} <span style="font-size:1.2rem;">ml (cc)</span>`;
  document.getElementById("val-dosis-butuh").textContent =
    `${butuh_mg.toLocaleString()} mg`;
  document.getElementById("res-dosis").classList.remove("hidden");
}
function hitungAGD() {
  const ph = parseFloat(document.getElementById("agd-ph").value);
  const pco2 = parseFloat(document.getElementById("agd-pco2").value);
  const hco3 = parseFloat(document.getElementById("agd-hco3").value);
  const po2 = parseFloat(document.getElementById("agd-po2").value);
  const sao2 = parseFloat(document.getElementById("agd-sao2").value);

  if (!ph || !pco2 || !hco3) {
    showToast("Lengkapi parameter utama AGD (pH, PCO2, HCO3)", "warning");
    return;
  }

  let diag = "";
  // Acid-Base Interpretation
  if (ph >= 7.35 && ph <= 7.45) {
    if (pco2 >= 35 && pco2 <= 45 && hco3 >= 22 && hco3 <= 26) {
      diag = "Normal / Seimbang";
    } else if (pco2 > 45 && hco3 > 26) {
      diag =
        ph < 7.4
          ? "Asidosis Respiratorik (Terkompensasi Penuh)"
          : "Alkalosis Metabolik (Terkompensasi Penuh)";
    } else if (pco2 < 35 && hco3 < 22) {
      diag =
        ph < 7.4
          ? "Asidosis Metabolik (Terkompensasi Penuh)"
          : "Alkalosis Respiratorik (Terkompensasi Penuh)";
    } else {
      diag = "Normal (Kompensasi Penuh)";
    }
  } else if (ph < 7.35) {
    if (pco2 > 45 && hco3 >= 22 && hco3 <= 26)
      diag = "Asidosis Respiratorik Murni";
    else if (pco2 > 45 && hco3 > 26)
      diag = "Asidosis Respiratorik (Kompensasi Sebagian)";
    else if (hco3 < 22 && pco2 >= 35 && pco2 <= 45)
      diag = "Asidosis Metabolik Murni";
    else if (hco3 < 22 && pco2 < 35)
      diag = "Asidosis Metabolik (Kompensasi Sebagian)";
    else diag = "Asidosis Campuran (Respiratorik & Metabolik)";
  } else if (ph > 7.45) {
    if (pco2 < 35 && hco3 >= 22 && hco3 <= 26)
      diag = "Alkalosis Respiratorik Murni";
    else if (pco2 < 35 && hco3 < 22)
      diag = "Alkalosis Respiratorik (Kompensasi Sebagian)";
    else if (hco3 > 26 && pco2 >= 35 && pco2 <= 45)
      diag = "Alkalosis Metabolik Murni";
    else if (hco3 > 26 && pco2 > 45)
      diag = "Alkalosis Metabolik (Kompensasi Sebagian)";
    else diag = "Alkalosis Campuran (Respiratorik & Metabolik)";
  }

  // Oxygenation Status (PaO2)
  let o2Status = "";
  if (po2) {
    if (po2 >= 80) o2Status = "Normal";
    else if (po2 >= 60) o2Status = "Hipoksemia Ringan";
    else if (po2 >= 40) o2Status = "Hipoksemia Sedang";
    else o2Status = "Hipoksemia Berat";
  }

  // Saturation Status (SaO2)
  let saStatus = "";
  if (sao2) {
    saStatus = sao2 >= 95 ? "Normal" : "Saturasi Rendah";
  }

  let finalHtml = `<div style="font-weight:800; font-size:1.2rem; margin-bottom:0.5rem;">${diag}</div>`;
  if (o2Status)
    finalHtml += `<div style="font-size:0.9rem; opacity:0.8;">Oksigenasi: <span style="font-weight:600; color:${o2Status === "Normal" ? "var(--emerald)" : "var(--danger)"}">${o2Status}</span></div>`;
  if (saStatus)
    finalHtml += `<div style="font-size:0.9rem; opacity:0.8;">Saturasi: <span style="font-weight:600; color:${saStatus === "Normal" ? "var(--emerald)" : "var(--danger)"}">${saStatus}</span></div>`;

  document.getElementById("val-agd").innerHTML = finalHtml;
  document.getElementById("res-agd").classList.remove("hidden");
}
function hitungGFR() {
  const jk = document.getElementById("calc-gfr-jk").value;
  const umur = parseFloat(document.getElementById("calc-gfr-umur").value);
  const bb = parseFloat(document.getElementById("calc-gfr-bb").value);
  const scr = parseFloat(document.getElementById("calc-gfr-scr").value);

  if (!umur || !bb || !scr || scr <= 0 || umur <= 0 || bb <= 0) {
    showToast("Mohon lengkapi data GFR pasien dengan benar!", "error");
    return;
  }

  let gfr = ((140 - umur) * bb) / (72 * scr);
  if (jk === "wanita") {
    gfr = gfr * 0.85;
  }

  let status = "";
  if (gfr >= 90) status = "G1 - Normal / Tinggi";
  else if (gfr >= 60) status = "G2 - Penurunan Ringan";
  else if (gfr >= 45) status = "G3a - Penurunan Ringan-Sedang";
  else if (gfr >= 30) status = "G3b - Penurunan Sedang-Berat";
  else if (gfr >= 15) status = "G4 - Penurunan Berat";
  else status = "G5 - Gagal Ginjal (End-stage)";

  document.getElementById("val-gfr").textContent = gfr.toFixed(1) + " mL/min";
  document.getElementById("val-gfr-status").textContent =
    "Kesimpulan: " + status;
  document.getElementById("res-gfr").classList.remove("hidden");
}
function hitungHPL() {
  const hphtInput = document.getElementById("calc-hpl-date").value;
  if (!hphtInput) {
    showToast("Masukkan tanggal Hari Pertama Haid Terakhir (HPHT)!", "error");
    return;
  }

  const hphtDate = new Date(hphtInput);
  const hplDate = new Date(hphtDate.getTime() + 280 * 24 * 60 * 60 * 1000); // +280 days

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const hplString = hplDate.toLocaleDateString("id-ID", options);

  const today = new Date();
  const diffTime = today.getTime() - hphtDate.getTime();
  let statusUsia = "";

  if (diffTime < 0) {
    statusUsia = "HPHT tidak falid (di masa depan)";
  } else {
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    if (weeks >= 42) {
      statusUsia = weeks + " Minggu " + days + " Hari (Post-term)";
    } else {
      statusUsia = weeks + " Minggu " + days + " Hari";
    }
  }

  document.getElementById("val-hpl").textContent = hplString;
  document.getElementById("val-hpl-usia").textContent = statusUsia;
  document.getElementById("res-hpl").classList.remove("hidden");
}
