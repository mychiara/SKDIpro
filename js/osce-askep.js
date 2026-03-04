// ============================================
// E-SDKI Pro — OSCE & ASKEP Professional Module
// ============================================

// === OSCE CLINICAL CASE DATA ===
const KASUS_KLINIS = [
  {
    scenario:
      "Ny. S, 65 tahun, dirawat di ruang penyakit dalam dengan keluhan sesak napas sejak 3 hari, batuk berdahak kental berwarna hijau kekuningan, dan demam. Riwayat PPOK sejak 5 tahun lalu.",
    vitals: {
      TD: "130/85 mmHg",
      Nadi: "110 x/mnt",
      RR: "28 x/mnt",
      Suhu: "38.7°C",
      SpO2: "91%",
    },
    question: "Diagnosa keperawatan prioritas untuk Ny. S adalah?",
    options: [
      "Pola Napas Tidak Efektif",
      "Bersihan Jalan Napas Tidak Efektif",
      "Hipertermia",
      "Gangguan Pertukaran Gas",
    ],
    correct: 1,
    explanation:
      "Batuk berdahak kental berwarna hijau kekuningan menunjukkan adanya akumulasi sekret yang menghalangi jalan napas. Diagnosa Bersihan Jalan Napas Tidak Efektif (D.0001) paling tepat.",
  },
  {
    scenario:
      "Tn. A, 50 tahun, post-operasi laparatomi hari ke-2. Mengeluh nyeri pada area insisi, skala nyeri 7/10. Wajah meringis, posisi protektif, nadi 98 x/mnt, TD meningkat dari baseline.",
    vitals: {
      TD: "150/95 mmHg",
      Nadi: "98 x/mnt",
      RR: "22 x/mnt",
      Suhu: "37.2°C",
      SpO2: "97%",
    },
    question: "Intervensi keperawatan prioritas untuk Tn. A adalah?",
    options: [
      "Manajemen Jalan Napas",
      "Manajemen Nyeri",
      "Pemantauan Tanda Vital",
      "Perawatan Luka",
    ],
    correct: 1,
    explanation:
      "Dengan nyeri skala 7/10 post-operasi, intervensi prioritas adalah Manajemen Nyeri (I.08238) yang mencakup identifikasi nyeri, pemberian analgesik, dan teknik non-farmakologis.",
  },
  {
    scenario:
      "An. R, 3 tahun, datang ke IGD dengan diare > 10x/hari, muntah 5x, rewel, mata cekung, turgor kulit menurun, bibir kering, BAK sedikit.",
    vitals: {
      TD: "80/50 mmHg",
      Nadi: "140 x/mnt",
      RR: "32 x/mnt",
      Suhu: "38.0°C",
      CRT: "> 3 detik",
    },
    question:
      "Luaran keperawatan (SLKI) yang diharapkan untuk kasus ini adalah?",
    options: [
      "Tingkat Nyeri menurun",
      "Status Cairan membaik",
      "Pola Tidur membaik",
      "Mobilitas Fisik meningkat",
    ],
    correct: 1,
    explanation:
      "Tanda-tanda dehidrasi jelas (mata cekung, turgor kulit menurun, oliguria, CRT > 3 detik). Luaran Status Cairan (L.03020) membaik adalah target utama.",
  },
  {
    scenario:
      "Ny. M, 45 tahun, DM tipe 2 sejak 10 tahun. Datang dengan luka di kaki kanan yang tidak kunjung sembuh sejak 3 minggu, berbau, kemerahan meluas, GDS 350 mg/dL.",
    vitals: {
      TD: "140/90 mmHg",
      Nadi: "88 x/mnt",
      RR: "20 x/mnt",
      Suhu: "37.8°C",
      GDS: "350 mg/dL",
    },
    question: "Diagnosa keperawatan yang BUKAN prioritas untuk Ny. M adalah?",
    options: [
      "Gangguan Integritas Kulit",
      "Risiko Infeksi",
      "Ketidakstabilan Kadar Glukosa Darah",
      "Gangguan Pola Tidur",
    ],
    correct: 3,
    explanation:
      "Gangguan Pola Tidur bukan prioritas. Prioritas utama: Gangguan Integritas Kulit (luka kronis), Risiko Infeksi (luka terbuka berbau), dan Ketidakstabilan Glukosa (GDS 350).",
  },
  {
    scenario:
      "Tn. B, 70 tahun, stroke iskemik hari ke-3. Hemiplegik kiri, afasia motorik, kesulitan menelan, terpasang NGT. GCS E4V2M5.",
    vitals: {
      TD: "160/100 mmHg",
      Nadi: "78 x/mnt",
      RR: "18 x/mnt",
      Suhu: "36.8°C",
      SpO2: "96%",
    },
    question:
      "Diagnosa keperawatan yang berkaitan dengan kesulitan menelan pada Tn. B adalah?",
    options: [
      "Defisit Nutrisi",
      "Risiko Aspirasi",
      "Gangguan Komunikasi Verbal",
      "Gangguan Mobilitas Fisik",
    ],
    correct: 1,
    explanation:
      "Disfagia/kesulitan menelan pada pasien stroke meningkatkan Risiko Aspirasi (D.0006). NGT terpasang sebagai tindakan pencegahan.",
  },
  {
    scenario:
      "Ny. K, 28 tahun, post partum hari ke-1 dengan riwayat perdarahan post partum. Tampak pucat, konjungtiva anemis, mengeluh pusing dan lemah, Hb 8 g/dL.",
    vitals: {
      TD: "100/60 mmHg",
      Nadi: "112 x/mnt",
      RR: "24 x/mnt",
      Suhu: "36.5°C",
      SpO2: "95%",
    },
    question: "Masalah keperawatan utama pada Ny. K adalah?",
    options: [
      "Intoleransi Aktivitas",
      "Perfusi Perifer Tidak Efektif",
      "Hipovolemia",
      "Risiko Syok",
    ],
    correct: 2,
    explanation:
      "Perdarahan post partum menyebabkan kehilangan volume cairan. Tanda takikardia, hipotensi, pucat, dan Hb rendah menunjukkan Hipovolemia (D.0023).",
  },
  {
    scenario:
      "Tn. D, 55 tahun, dirawat di ICU dengan CHF NYHA IV. Sesak napas saat istirahat, tidur dengan 3 bantal, edema kedua tungkai (+3), JVP meningkat, BB naik 5 kg dalam 1 minggu.",
    vitals: {
      TD: "90/60 mmHg",
      Nadi: "120 x/mnt",
      RR: "30 x/mnt",
      Suhu: "36.4°C",
      SpO2: "88%",
    },
    question: "Diagnosa keperawatan prioritas untuk Tn. D adalah?",
    options: [
      "Hipervolemia",
      "Penurunan Curah Jantung",
      "Intoleransi Aktivitas",
      "Gangguan Pertukaran Gas",
    ],
    correct: 1,
    explanation:
      "CHF NYHA IV dengan EF rendah, takikardia, hipotensi, dan SpO2 rendah — Penurunan Curah Jantung (D.0008) adalah diagnosa prioritas karena mendasari semua gejala lainnya.",
  },
];

const IDENTIFIKASI_GEJALA_DATA = [
  {
    gejala: [
      "Dispnea",
      "Penggunaan otot bantu napas",
      "Fase ekspirasi memanjang",
      "Pernapasan cuping hidung",
      "Ortopnea",
    ],
    question: "Gejala-gejala di atas menunjukkan diagnosa keperawatan?",
    options: [
      "Bersihan Jalan Napas Tidak Efektif",
      "Pola Napas Tidak Efektif",
      "Gangguan Pertukaran Gas",
    ],
    correct: 1,
    kode: "D.0005",
  },
  {
    gejala: [
      "Frekuensi nadi meningkat",
      "Nadi teraba lemah",
      "Tekanan darah menurun",
      "Turgor kulit menurun",
      "Membran mukosa kering",
      "Volume urin menurun",
    ],
    question: "Kumpulan gejala di atas paling sesuai dengan diagnosa?",
    options: ["Hipervolemia", "Hipovolemia", "Risiko Syok"],
    correct: 1,
    kode: "D.0023",
  },
  {
    gejala: [
      "Mengeluh nyeri",
      "Tampak meringis",
      "Bersikap protektif",
      "Gelisah",
      "Frekuensi nadi meningkat",
      "Sulit tidur",
    ],
    question: "Tanda dan gejala di atas merupakan gejala mayor dari?",
    options: ["Nyeri Akut", "Nyeri Kronis", "Ansietas"],
    correct: 0,
    kode: "D.0077",
  },
  {
    gejala: [
      "Merasa bingung",
      "Merasa khawatir",
      "Sulit berkonsentrasi",
      "Tampak gelisah",
      "Tampak tegang",
      "Sulit tidur",
      "Palpitasi",
    ],
    question: "Diagnosa keperawatan yang sesuai dengan gejala di atas?",
    options: ["Gangguan Pola Tidur", "Ansietas", "Keputusasaan"],
    correct: 1,
    kode: "D.0080",
  },
  {
    gejala: [
      "Berat badan menurun > 10%",
      "Nafsu makan menurun",
      "Otot menelan lemah",
      "Membran mukosa pucat",
      "Serum albumin turun",
      "Bising usus hiperaktif",
    ],
    question: "Gejala-gejala tersebut mengarah ke diagnosa?",
    options: ["Diare", "Defisit Nutrisi", "Risiko Ketidakseimbangan Cairan"],
    correct: 1,
    kode: "D.0019",
  },
  {
    gejala: [
      "Edema perifer",
      "Ortopnea",
      "Distensi vena jugularis",
      "Berat badan meningkat cepat",
      "Refleks hepatojugular positif",
      "Oliguria",
    ],
    question: "Kumpulan gejala ini menunjukkan?",
    options: ["Hipovolemia", "Hipervolemia", "Gangguan Sirkulasi Spontan"],
    correct: 1,
    kode: "D.0022",
  },
  {
    gejala: [
      "Suhu tubuh di atas normal",
      "Kulit merah",
      "Kejang",
      "Takikardia",
      "Takipnea",
      "Kulit terasa hangat",
    ],
    question: "Tanda-tanda klinis di atas merujuk pada diagnosa?",
    options: ["Hipertermia", "Hipotermia", "Termoregulasi Tidak Efektif"],
    correct: 0,
    kode: "D.0130",
  },
];

let quizStreak = parseInt(localStorage.getItem("esdki_quiz_streak") || "0");
let currentOsceMode = "quiz";

function updateOsceScoreboard() {
  const el = (id) => document.getElementById(id);
  if (el("osceScoreTotal")) el("osceScoreTotal").textContent = quizTotal;
  if (el("osceScoreCorrect")) el("osceScoreCorrect").textContent = quizScore;
  if (el("osceScorePct"))
    el("osceScorePct").textContent =
      quizTotal > 0 ? Math.round((quizScore / quizTotal) * 100) + "%" : "0%";
  if (el("osceScoreStreak")) el("osceScoreStreak").textContent = quizStreak;
}

window.switchOsceMode = (mode) => {
  currentOsceMode = mode;
  document.querySelectorAll(".osce-tab").forEach((t) => {
    t.classList.toggle("active", t.getAttribute("data-mode") === mode);
  });
  if (mode === "quiz") startQuiz();
  else if (mode === "kasus") startKasusKlinis();
  else if (mode === "identifikasi") startIdentifikasiGejala();
};

function startKasusKlinis() {
  updateOsceScoreboard();
  const cont = document.getElementById("quizContent");
  const k = KASUS_KLINIS[Math.floor(Math.random() * KASUS_KLINIS.length)];
  const vitalsHtml = Object.entries(k.vitals)
    .map(
      ([key, val]) =>
        `<span class="osce-vital-tag"><strong>${key}:</strong> ${val}</span>`,
    )
    .join("");
  cont.innerHTML = `
    <div class="osce-kasus-box">
      <div class="osce-kasus-title"><i class="fa-solid fa-file-medical"></i> Skenario Kasus</div>
      <p class="osce-kasus-text">${k.scenario}</p>
      <div class="osce-kasus-vitals">${vitalsHtml}</div>
    </div>
    <p style="font-size: 1.05rem; font-weight: 600; margin-bottom: 1rem;">${k.question}</p>
    <div class="quiz-options">
      ${k.options.map((opt, i) => `<div class="quiz-option" onclick="checkKasus(${i}, ${k.correct}, '${k.explanation.replace(/'/g, "\\'")}')">${opt}</div>`).join("")}
    </div>
  `;
}

function startIdentifikasiGejala() {
  updateOsceScoreboard();
  const cont = document.getElementById("quizContent");
  const g =
    IDENTIFIKASI_GEJALA_DATA[
      Math.floor(Math.random() * IDENTIFIKASI_GEJALA_DATA.length)
    ];
  cont.innerHTML = `
    <div class="osce-kasus-box">
      <div class="osce-kasus-title"><i class="fa-solid fa-list-check"></i> Gejala yang Ditemukan</div>
      <div class="osce-kasus-vitals">
        ${g.gejala.map((s) => `<span class="osce-vital-tag">${s}</span>`).join("")}
      </div>
    </div>
    <p style="font-size: 1.05rem; font-weight: 600; margin-bottom: 1rem;">${g.question}</p>
    <div class="quiz-options">
      ${g.options.map((opt, i) => `<div class="quiz-option" onclick="checkIdentifikasi(${i}, ${g.correct}, '${g.kode}')">${opt}</div>`).join("")}
    </div>
  `;
}

function handleOsceAnswer(selected, correct) {
  const options = document.querySelectorAll(".quiz-option");
  options.forEach((opt, i) => {
    opt.style.pointerEvents = "none";
    if (i === correct) opt.classList.add("quiz-correct");
    else if (i === selected) opt.classList.add("quiz-wrong");
  });
  quizTotal++;
  if (selected === correct) {
    quizScore++;
    quizStreak++;
  } else {
    quizStreak = 0;
  }
  localStorage.setItem("esdki_quiz_score", String(quizScore));
  localStorage.setItem("esdki_quiz_total", String(quizTotal));
  localStorage.setItem("esdki_quiz_streak", String(quizStreak));
  updateOsceScoreboard();
  showToast(
    selected === correct
      ? `Benar! Streak: ${quizStreak} 🔥`
      : `Salah! Streak reset.`,
    selected === correct ? "success" : "warning",
  );
}

window.checkKasus = (selected, correct, explanation) => {
  handleOsceAnswer(selected, correct);
  const cont = document.getElementById("quizContent");
  const explDiv = document.createElement("div");
  explDiv.style.cssText =
    "margin-top:1rem;padding:1rem;border-radius:8px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);font-size:0.9rem;line-height:1.6;";
  explDiv.innerHTML = `<strong><i class="fa-solid fa-lightbulb" style="color:#f59e0b;"></i> Pembahasan:</strong> ${explanation}`;
  cont.appendChild(explDiv);
  setTimeout(startKasusKlinis, 4500);
};

window.checkIdentifikasi = (selected, correct, kode) => {
  handleOsceAnswer(selected, correct);
  const cont = document.getElementById("quizContent");
  const explDiv = document.createElement("div");
  explDiv.style.cssText =
    "margin-top:1rem;padding:1rem;border-radius:8px;background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.2);font-size:0.9rem;";
  explDiv.innerHTML = `<strong><i class="fa-solid fa-book-medical" style="color:#2563eb;"></i> Jawaban Benar:</strong> Kode ${kode}`;
  cont.appendChild(explDiv);
  setTimeout(startIdentifikasiGejala, 3500);
};

// === ASKEP PROFESSIONAL RENDERING ===
function renderAskepListPro() {
  const cont = document.getElementById("askepItemsContainer");
  const sdkiItems = askepBasket.filter((i) => i.type === "sdki");
  const sikiItems = askepBasket.filter((i) => i.type === "siki");
  const slkiItems = askepBasket.filter((i) => i.type === "slki");

  document.getElementById("askepCountSDKI").textContent = sdkiItems.length;
  document.getElementById("askepCountSIKI").textContent = sikiItems.length;
  document.getElementById("askepCountSLKI").textContent = slkiItems.length;

  if (!askepBasket.length) {
    cont.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text-secondary);">
      <i class="fa-solid fa-inbox" style="font-size:2.5rem;opacity:0.3;margin-bottom:1rem;display:block;"></i>
      <p style="font-weight:600;">Belum ada item</p>
      <p style="font-size:0.85rem;">Buka detail SDKI/SIKI/SLKI lalu tekan <strong>+ ASKEP</strong> untuk menambahkan.</p>
    </div>`;
    return;
  }

  const renderGroup = (items, label, icon, cssClass, borderColor) => {
    if (!items.length) return "";
    return `
      <div class="askep-group-header ${cssClass}"><i class="fa-solid ${icon}"></i> ${label} (${items.length})</div>
      ${items
        .map((it) => {
          const globalIdx = askepBasket.indexOf(it);
          let detail = "";
          if (it.type === "sdki") {
            detail = `<div style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.5rem;line-height:1.6;">
            <div><strong>Definisi:</strong> ${it.Definisi || "-"}</div>
            ${it.Penyebab && !it.Penyebab.startsWith("Faktor fisiologis") ? `<div><strong>Penyebab:</strong> ${it.Penyebab}</div>` : ""}
          </div>`;
          } else if (it.type === "siki") {
            detail = `<div style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.5rem;line-height:1.6;">
            ${it.Observasi ? `<div><strong>Observasi:</strong> ${it.Observasi}</div>` : ""}
            ${it.Terapeutik ? `<div><strong>Terapeutik:</strong> ${it.Terapeutik}</div>` : ""}
          </div>`;
          } else {
            detail = `<div style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.5rem;line-height:1.6;">
            <div><strong>Ekspektasi:</strong> ${it.Ekspektasi || "-"}</div>
            ${it["Kriteria Hasil"] ? `<div><strong>Kriteria:</strong> ${it["Kriteria Hasil"]}</div>` : ""}
          </div>`;
          }
          return `<div class="askep-card-grouped" style="border-left-color:${borderColor};">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div style="flex:1;">
              <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;flex-wrap:wrap;">
                <span class="card-code ${it.type}-code" style="font-size:0.75rem;">${it.Kode}</span>
                <h4 style="margin:0;font-size:0.95rem;">${it.Nama}</h4>
              </div>
              ${detail}
            </div>
            <i class="fa-solid fa-trash askep-remove" onclick="removeFromAskep(${globalIdx})" style="cursor:pointer;color:var(--danger);opacity:0.5;padding:0.5rem;" title="Hapus"></i>
          </div>
        </div>`;
        })
        .join("")}
    `;
  };

  cont.innerHTML =
    renderGroup(
      sdkiItems,
      "Diagnosa Keperawatan",
      "fa-stethoscope",
      "sdki-group",
      "#2563eb",
    ) +
    renderGroup(
      slkiItems,
      "Luaran Keperawatan",
      "fa-bullseye",
      "slki-group",
      "#10b981",
    ) +
    renderGroup(
      sikiItems,
      "Intervensi Keperawatan",
      "fa-hand-holding-medical",
      "siki-group",
      "#6366f1",
    );
}
