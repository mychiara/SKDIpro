// ============================================
// E-SDKI Pro — App Logic (Final Complete Version)
// ============================================

// === CONSTANTS & MAPPINGS ===
const ITEMS_PER_PAGE = 24;
const SEARCH_DEBOUNCE_MS = 250;
const TOAST_DURATION = 2800;

const SDKI_CATEGORIES = {
  Respirasi: {
    icon: "fa-lungs",
    color: "#0ea5e9",
    codes: ["D.0001", "D.0002", "D.0003", "D.0004", "D.0005", "D.0006"],
  },
  Sirkulasi: {
    icon: "fa-heart-pulse",
    color: "#f43f5e",
    codes: [
      "D.0007",
      "D.0008",
      "D.0009",
      "D.0010",
      "D.0011",
      "D.0012",
      "D.0013",
      "D.0014",
      "D.0015",
      "D.0016",
      "D.0017",
    ],
  },
  "Nutrisi & Cairan": {
    icon: "fa-droplet",
    color: "#38bdf8",
    codes: [
      "D.0018",
      "D.0019",
      "D.0020",
      "D.0021",
      "D.0022",
      "D.0023",
      "D.0024",
      "D.0025",
      "D.0026",
      "D.0027",
      "D.0028",
      "D.0029",
      "D.0030",
      "D.0031",
      "D.0032",
      "D.0033",
      "D.0034",
      "D.0035",
      "D.0036",
      "D.0037",
      "D.0038",
      "D.0039",
    ],
  },
  Eliminasi: {
    icon: "fa-toilet",
    color: "#fbbf24",
    codes: [
      "D.0040",
      "D.0041",
      "D.0042",
      "D.0043",
      "D.0044",
      "D.0045",
      "D.0046",
      "D.0047",
      "D.0048",
      "D.0049",
      "D.0050",
      "D.0051",
      "D.0052",
      "D.0053",
    ],
  },
  "Aktivitas & Istirahat": {
    icon: "fa-walking",
    color: "#10b981",
    codes: [
      "D.0054",
      "D.0055",
      "D.0056",
      "D.0057",
      "D.0058",
      "D.0059",
      "D.0060",
    ],
  },
  Neurosensori: {
    icon: "fa-brain",
    color: "#8b5cf6",
    codes: [
      "D.0061",
      "D.0062",
      "D.0063",
      "D.0064",
      "D.0065",
      "D.0066",
      "D.0067",
      "D.0068",
    ],
  },
  "Reproduksi & Seksualitas": {
    icon: "fa-venus-mars",
    color: "#f472b6",
    codes: ["D.0069", "D.0070", "D.0071", "D.0072", "D.0073"],
  },
  "Nyeri & Kenyamanan": {
    icon: "fa-face-smile-beam",
    color: "#f59e0b",
    codes: ["D.0074", "D.0075", "D.0076", "D.0077", "D.0078", "D.0079"],
  },
  "Integritas Ego": {
    icon: "fa-hand-holding-heart",
    color: "#ec4899",
    codes: [
      "D.0080",
      "D.0081",
      "D.0082",
      "D.0083",
      "D.0084",
      "D.0085",
      "D.0086",
      "D.0087",
      "D.0088",
      "D.0089",
      "D.0090",
      "D.0091",
      "D.0092",
      "D.0093",
      "D.0094",
      "D.0095",
      "D.0096",
      "D.0100",
      "D.0101",
      "D.0102",
    ],
  },
  "Pertumbuhan & Perkembangan": {
    icon: "fa-children",
    color: "#6366f1",
    codes: ["D.0103", "D.0104", "D.0105"],
  },
  "Kebersihan Diri": {
    icon: "fa-hand-sparkles",
    color: "#06b6d4",
    codes: ["D.0106", "D.0107", "D.0108", "D.0109", "D.0110"],
  },
  "Penyuluhan & Pembelajaran": {
    icon: "fa-user-graduate",
    color: "#64748b",
    codes: ["D.0111", "D.0112", "D.0113"],
  },
  "Interaksi Sosial": {
    icon: "fa-users",
    color: "#475569",
    codes: [
      "D.0114",
      "D.0115",
      "D.0116",
      "D.0117",
      "D.0118",
      "D.0119",
      "D.0120",
      "D.0121",
      "D.0122",
      "D.0123",
      "D.0124",
      "D.0125",
      "D.0126",
      "D.0127",
      "D.0128",
    ],
  },
  "Keamanan & Proteksi": {
    icon: "fa-shield-halved",
    color: "#4ade80",
    codes: [
      "D.0129",
      "D.0130",
      "D.0131",
      "D.0132",
      "D.0133",
      "D.0134",
      "D.0135",
      "D.0136",
      "D.0137",
      "D.0138",
      "D.0139",
      "D.0140",
      "D.0141",
      "D.0142",
      "D.0143",
      "D.0144",
      "D.0145",
      "D.0146",
      "D.0147",
      "D.0148",
      "D.0149",
    ],
  },
};

const GLOSSARY = [
  { term: "Abduksi", def: "Gerakan menjauhi garis tengah tubuh." },
  { term: "Adduksi", def: "Gerakan mendekati garis tengah tubuh." },
  {
    term: "Adiksi",
    def: "Ketergantungan fisik atau psikis pada zat tertentu.",
  },
  { term: "Afasia", def: "Gangguan kemampuan bicara atau memahami bahasa." },
  { term: "Akral", def: "Bagian ujung tubuh (ujung jari tangan/kaki)." },
  {
    term: "Akrosianosis",
    def: "Sianosis pada bagian akral (ujung-ujung ekstremitas).",
  },
  {
    term: "Albumin",
    def: "Protein utama dalam plasma darah yang menjaga tekanan osmotik.",
  },
  {
    term: "Anemia",
    def: "Kekurangan sel darah merah atau hemoglobin dalam darah.",
  },
  { term: "Anuria", def: "Tidak adanya produksi urine (< 100 ml/24 jam)." },
  { term: "Apnea", def: "Berhentinya pernapasan sementara." },
  { term: "Aritmia", def: "Gangguan irama jantung." },
  { term: "Asites", def: "Penumpukan cairan di rongga peritoneum (perut)." },
  {
    term: "Aterosklerosis",
    def: "Pengerasan dan penyempitan pembuluh darah arteri akibat plak.",
  },
  {
    term: "Auskultasi",
    def: "Teknik pemeriksaan dengan mendengarkan bunyi tubuh menggunakan stetoskop.",
  },
  { term: "Bradikardia", def: "Denyut jantung di bawah normal (< 60 x/mnt)." },
  {
    term: "Bradipnea",
    def: "Frekuensi napas di bawah normal (< 12 x/mnt pada dewasa).",
  },
  {
    term: "CRT",
    def: "Capillary Refill Time — waktu pengisian kapiler (normal < 3 detik).",
  },
  {
    term: "CVP",
    def: "Central Venous Pressure — tekanan vena sentral (normal 5-10 cmH2O).",
  },
  {
    term: "Dekubitus",
    def: "Luka tekan akibat tekanan berkepanjangan pada kulit.",
  },
  { term: "Diaforesis", def: "Keringat berlebih yang tidak wajar." },
  {
    term: "Distensi",
    def: "Peregangan atau pembengkakan (mis: distensi abdomen, kandung kemih).",
  },
  { term: "Dispnea", def: "Kesulitan bernapas atau sesak napas." },
  { term: "Disuria", def: "Nyeri atau rasa terbakar saat berkemih." },
  { term: "Diuretik", def: "Obat yang meningkatkan pengeluaran urine." },
  { term: "Edema", def: "Penumpukan cairan berlebih di jaringan tubuh." },
  { term: "Ekstremitas", def: "Anggota gerak tubuh (tangan dan kaki)." },
  { term: "Emesis", def: "Muntah." },
  { term: "Enuresis", def: "Mengompol (inkontinensia urin di tempat tidur)." },
  {
    term: "Eritema",
    def: "Kemerahan pada kulit akibat pelebaran pembuluh darah.",
  },
  {
    term: "GCS",
    def: "Glasgow Coma Scale — skala untuk menilai tingkat kesadaran (3-15).",
  },
  {
    term: "Hematokrit",
    def: "Persentase volume sel darah merah dalam darah (Pria: 40-54%, Wanita: 36-48%).",
  },
  { term: "Hematuria", def: "Adanya darah di dalam urine." },
  {
    term: "Hemoglobin",
    def: "Protein dalam sel darah merah yang membawa oksigen (Pria: 14-18 g/dL, Wanita: 12-16 g/dL).",
  },
  { term: "Hemoptisis", def: "Batuk darah yang berasal dari saluran napas." },
  { term: "Hipertensi", def: "Tekanan darah tinggi (> 140/90 mmHg)." },
  { term: "Hipertermia", def: "Suhu tubuh di atas normal (> 37.5°C)." },
  { term: "Hipoksia", def: "Kekurangan oksigen di tingkat jaringan tubuh." },
  { term: "Hipotensi", def: "Tekanan darah rendah (< 90/60 mmHg)." },
  { term: "Hipotermia", def: "Suhu tubuh di bawah normal (< 36°C)." },
  {
    term: "Inkontinensia",
    def: "Ketidakmampuan mengendalikan pengeluaran urine atau feses.",
  },
  {
    term: "Intubasi",
    def: "Pemasangan pipa (endotracheal tube) ke dalam trakea untuk menjaga jalan napas.",
  },
  {
    term: "JVP",
    def: "Jugular Venous Pressure — tekanan vena jugularis untuk menilai volume cairan.",
  },
  {
    term: "Konstipasi",
    def: "Kesulitan buang air besar dengan feses keras dan jarang (< 3x/minggu).",
  },
  {
    term: "MAP",
    def: "Mean Arterial Pressure — tekanan arteri rata-rata (normal 70-105 mmHg).",
  },
  { term: "Nokturia", def: "Sering berkemih di malam hari." },
  {
    term: "Oliguria",
    def: "Produksi urine kurang dari normal (< 400 ml/24 jam).",
  },
  {
    term: "Ortopnea",
    def: "Sesak napas yang terjadi saat berbaring dan membaik saat duduk/berdiri.",
  },
  { term: "Palpasi", def: "Teknik pemeriksaan fisik dengan perabaan." },
  {
    term: "Palpitasi",
    def: "Perasaan jantung berdebar-debar yang tidak normal.",
  },
  {
    term: "Parastesia",
    def: "Sensasi abnormal seperti kesemutan, mati rasa, atau tertusuk jarum.",
  },
  {
    term: "Perkusi",
    def: "Teknik pemeriksaan fisik dengan mengetuk permukaan tubuh.",
  },
  { term: "Polidipsi", def: "Rasa haus berlebihan (sering pada diabetes)." },
  { term: "Polifagi", def: "Nafsu makan berlebihan (sering pada diabetes)." },
  { term: "Poliuri", def: "Produksi urine berlebihan (> 2500 ml/24 jam)." },
  {
    term: "Ronkhi",
    def: "Bunyi napas tambahan bernada rendah akibat sekret di jalan napas besar.",
  },
  {
    term: "Semi-Fowler",
    def: "Posisi tidur dengan kepala ditinggikan 30-45 derajat.",
  },
  {
    term: "Sianosis",
    def: "Warna kebiruan pada kulit dan membran mukosa akibat kurang oksigen.",
  },
  {
    term: "SpO2",
    def: "Saturasi oksigen perifer yang diukur melalui pulse oximeter (normal 95-100%).",
  },
  {
    term: "Suction",
    def: "Prosedur penghisapan sekret/lendir dari jalan napas.",
  },
  { term: "Takikardia", def: "Denyut jantung di atas normal (> 100 x/mnt)." },
  {
    term: "Takipnea",
    def: "Frekuensi napas di atas normal (> 20 x/mnt pada dewasa).",
  },
  {
    term: "Trombositopenia",
    def: "Jumlah trombosit (keping darah) di bawah normal (< 150.000/µL).",
  },
  {
    term: "Turgor",
    def: "Elastisitas kulit — menilai status hidrasi (normal kembali < 2 detik).",
  },
  {
    term: "Wheezing",
    def: "Bunyi napas tambahan bernada tinggi seperti siulan, sering pada asma.",
  },
];

const QUIZ_DATA = [
  {
    q: "Apa diagnosa utama untuk pasien dengan sesak napas dan bunyi ronkhi?",
    options: [
      "Pola Napas Tidak Efektif",
      "Bersihan Jalan Napas Tidak Efektif",
      "Gangguan Pertukaran Gas",
    ],
    correct: 1,
  },
  {
    q: "Berapa nilai normal saturasi oksigen (SpO2)?",
    options: ["80-85%", "90-94%", "95-100%"],
    correct: 2,
  },
  {
    q: "Manakah yang termasuk gejala mayor dari Hipertermia?",
    options: ["Suhu tubuh diatas nilai normal", "Kulit kemerahan", "Kejang"],
    correct: 0,
  },
  {
    q: "Apa kode SDKI untuk 'Nyeri Akut'?",
    options: ["D.0076", "D.0077", "D.0078"],
    correct: 1,
  },
  {
    q: "Posisi semi-fowler berarti kepala ditinggikan berapa derajat?",
    options: ["15-20 derajat", "30-45 derajat", "60-90 derajat"],
    correct: 1,
  },
  {
    q: "CRT (Capillary Refill Time) normal adalah?",
    options: ["< 1 detik", "< 3 detik", "< 5 detik"],
    correct: 1,
  },
  {
    q: "Diagnosa keperawatan 'Hipovolemia' termasuk kategori?",
    options: ["Respirasi", "Sirkulasi", "Nutrisi & Cairan"],
    correct: 2,
  },
  {
    q: "Apa intervensi utama untuk 'Bersihan Jalan Napas Tidak Efektif'?",
    options: ["Manajemen Nyeri", "Manajemen Jalan Napas", "Manajemen Nutrisi"],
    correct: 1,
  },
  {
    q: "Berapa frekuensi napas normal pada dewasa?",
    options: ["8-10 x/mnt", "12-20 x/mnt", "24-30 x/mnt"],
    correct: 1,
  },
  {
    q: "Oliguria adalah produksi urine kurang dari?",
    options: ["100 ml/24 jam", "400 ml/24 jam", "1000 ml/24 jam"],
    correct: 1,
  },
  {
    q: "Apa gejala mayor dari 'Penurunan Curah Jantung'?",
    options: [
      "Nyeri dada saja",
      "Bradikardia/Takikardia dan Palpitasi",
      "Batuk darah",
    ],
    correct: 1,
  },
  {
    q: "Luaran keperawatan (SLKI) untuk Nyeri Akut adalah?",
    options: ["Tingkat Nyeri", "Status Cairan", "Mobilitas Fisik"],
    correct: 0,
  },
  {
    q: "Tekanan darah yang termasuk hipertensi adalah?",
    options: ["> 120/80 mmHg", "> 130/85 mmHg", "> 140/90 mmHg"],
    correct: 2,
  },
  {
    q: "Apa yang dimaksud dengan 'Ortopnea'?",
    options: [
      "Sesak napas saat berdiri",
      "Sesak napas saat berbaring",
      "Sesak napas saat duduk",
    ],
    correct: 1,
  },
  {
    q: "Skala GCS (Glasgow Coma Scale) memiliki rentang?",
    options: ["0-10", "1-12", "3-15"],
    correct: 2,
  },
  {
    q: "Intervensi 'Reduksi Ansietas' ditujukan untuk diagnosa?",
    options: ["Nyeri Akut", "Ansietas", "Defisit Nutrisi"],
    correct: 1,
  },
  {
    q: "Apa yang dimaksud 'Parastesia'?",
    options: ["Nyeri otot", "Kesemutan/mati rasa", "Kejang otot"],
    correct: 1,
  },
  {
    q: "Berapa nilai normal hemoglobin pada pria dewasa?",
    options: ["10-12 g/dL", "14-18 g/dL", "20-24 g/dL"],
    correct: 1,
  },
  {
    q: "Konstipasi ditandai dengan defekasi kurang dari?",
    options: ["1x/hari", "3x/minggu", "2x/minggu"],
    correct: 2,
  },
  {
    q: "Tindakan suction sebaiknya dilakukan tidak lebih dari?",
    options: ["10 detik", "15 detik", "30 detik"],
    correct: 1,
  },
];

let quizScore = parseInt(localStorage.getItem("esdki_quiz_score") || "0");
let quizTotal = parseInt(localStorage.getItem("esdki_quiz_total") || "0");

const TAB_META = {
  sdki: {
    title: "Panduan Diagnosa Keperawatan",
    desc: "Alat Bantu Digital untuk Belajar Diagnosis Keperawatan (SDKI) Berbasis Data.",
  },
  slki: {
    title: "Panduan Luaran Keperawatan",
    desc: "Standar Luaran Keperawatan Indonesia (SLKI) — Target hasil yang diharapkan.",
  },
  siki: {
    title: "Panduan Intervensi Keperawatan",
    desc: "Standar Intervensi Keperawatan Indonesia (SIKI) — Tindakan berbasis bukti.",
  },
};

// === STATE ===
function safeParse(key, fallback = []) {
  try {
    const val = localStorage.getItem(key);
    return val && val !== "undefined" ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
}

let diagnosaData = { sdki: [], slki: [], siki: [] };
let allFavorites = {
  sdki: safeParse("esdki_fav_sdki"),
  slki: safeParse("esdki_fav_slki"),
  siki: safeParse("esdki_fav_siki"),
};
let askepBasket = safeParse("esdki_askep");
let currentMode = "sdki",
  currentFilter = "all",
  currentCategory = "all";
let currentView = localStorage.getItem("esdki_view") || "grid";
let currentTheme = localStorage.getItem("esdki_theme") || "system";
let symptomMode = false,
  displayedCount = ITEMS_PER_PAGE,
  filteredData = [];
let currentModalItem = null,
  currentModalMode = null;
let searchTimeout;

const CODE_TO_CAT = {};
Object.entries(SDKI_CATEGORIES).forEach(([name, info]) => {
  info.codes.forEach((code) => {
    CODE_TO_CAT[code] = { name, ...info };
  });
});

// === DOM ELEMENTS ===
const grid = document.getElementById("diagnosisGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const loading = document.getElementById("loadingIndicator");
const emptyState = document.getElementById("emptyState");
const tabBtns = document.querySelectorAll(".tab-btn");
const modal = document.getElementById("detailsModal");
const askepCounter = document.getElementById("askepCounter");
const toastContainer = document.getElementById("toastContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const loadMoreContainer = document.getElementById("loadMoreContainer");
const remainingCountSpan = document.getElementById("remainingCount");

// === INITIALIZATION ===
document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
  try {
    initTheme();
    initView();
    initEventListeners();
    updateAskepCounter();

    // Try to load from LocalStorage first for "Instant Load"
    const cached = localStorage.getItem("esdki_db_cache_v4");
    if (cached) {
      try {
        diagnosaData = JSON.parse(cached);
        if (diagnosaData.sdki && diagnosaData.sdki.length > 0) {
          loading.classList.add("hidden");
          grid.classList.remove("hidden");
          updateTabCounts();
          populateCategories();
          applyFilters();
          console.log("Loaded from Cache (Instant)");
        }
      } catch (e) {
        console.error("Cache error", e);
      }
    }

    // Backdoor fetch to update cache and live data
    if (!diagnosaData.sdki || diagnosaData.sdki.length === 0) {
      loading.classList.remove("hidden");
    }

    const [dSDKI, dSLKI, dSIKI] = await Promise.all([
      fetch("data/sdki.json").then((r) => r.json()),
      fetch("data/slki.json").then((r) => r.json()),
      fetch("data/siki.json").then((r) => r.json()),
    ]);

    const newData = { sdki: dSDKI, slki: dSLKI, siki: dSIKI };

    // Update state and cache
    diagnosaData = newData;
    localStorage.setItem("esdki_db_cache_v4", JSON.stringify(newData));

    loading.classList.add("hidden");
    grid.classList.remove("hidden");
    updateTabCounts();
    populateCategories();
    applyFilters();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw.js")
        .catch((e) => console.log("SW Error:", e));
    }
  } catch (err) {
    console.error("Master Error:", err);
    loading.innerHTML = `<div style="text-align:left; color:red; max-width:100%; word-break:break-all;"><strong>ERROR:</strong> ${err.message}<br><br>${err.stack}</div>`;
  }
}

// === CORE LOGIC ===
function applyFilters() {
  const term = searchInput.value.toLowerCase().trim();
  const activeData = diagnosaData[currentMode] || [];

  filteredData = activeData.filter((item) => {
    if (currentMode === "sdki" && currentCategory !== "all") {
      const c = CODE_TO_CAT[item.Kode];
      if (!c || c.name !== currentCategory) return false;
    }
    if (
      currentFilter === "favorites" &&
      !allFavorites[currentMode].includes(item.Kode)
    )
      return false;
    if (!term) return true;
    if (symptomMode && currentMode === "sdki") {
      const g = (item["Gejala Mayor"] || "") + (item["Gejala Minor"] || "");
      return g.toLowerCase().includes(term);
    }
    return Object.values(item).some((v) =>
      String(v).toLowerCase().includes(term),
    );
  });

  renderGrid(filteredData.slice(0, displayedCount));
  updateUI();
}

function renderGrid(data) {
  grid.innerHTML = "";
  if (!data.length) {
    grid.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }
  grid.classList.remove("hidden");
  emptyState.classList.add("hidden");

  data.forEach((item, idx) => {
    const isFav = allFavorites[currentMode].includes(item.Kode);
    const cat = CODE_TO_CAT[item.Kode];
    const card = document.createElement("div");
    card.className = "glass-card";
    if (cat) card.style.setProperty("--accent-color", cat.color);

    let icon = "fa-notes-medical";
    if (currentMode === "siki") icon = "fa-hand-holding-medical";
    else if (currentMode === "slki") icon = "fa-bullseye";
    else if (cat) icon = cat.icon;

    card.innerHTML = `
      <div class="card-icon-bg" style="background: ${cat ? cat.color + "18" : "var(--bg-alt)"}">
        <i class="fa-solid ${icon}" style="color: ${cat ? cat.color : "var(--primary)"}"></i>
      </div>
      <button class="fav-btn ${isFav ? "active" : ""}" onclick="event.stopPropagation(); toggleFavorite('${item.Kode}')">
        <i class="fa-${isFav ? "solid" : "regular"} fa-star"></i>
      </button>
      <div class="card-content">
        <div class="card-top">
          <span class="card-code ${currentMode}-code">${item.Kode}</span>
          ${cat ? `<span class="card-category-badge" style="background:${cat.color}18; color:${cat.color}">${cat.name}</span>` : ""}
        </div>
        <h3 class="card-title">${item.Nama}</h3>
        <p class="card-desc">${item.Definisi || item.Observasi || ""}</p>
      </div>
    `;
    card.onclick = () => openModal(item, currentMode);
    grid.appendChild(card);
  });
}

// === MODAL & CROSS-LINKING ===
function openModal(item, mode) {
  currentModalItem = item;
  currentModalMode = mode;
  document.getElementById("modalKode").textContent = item.Kode;
  document.getElementById("modalNama").textContent = item.Nama;

  ["SDKI", "SIKI", "SLKI"].forEach((m) =>
    document.getElementById(`modalBody${m}`).classList.add("hidden"),
  );
  document
    .getElementById(`modalBody${mode.toUpperCase()}`)
    .classList.remove("hidden");

  if (mode === "sdki") {
    document.getElementById("modalDefinisi").textContent = item.Definisi || "-";
    document.getElementById("modalPenyebab").innerHTML = formatList(
      item.Penyebab,
    );
    document.getElementById("modalGejalaMayor").innerHTML = formatList(
      item["Gejala Mayor"],
    );
    document.getElementById("modalGejalaMinor").innerHTML = formatList(
      item["Gejala Minor"],
    );
    document.getElementById("modalKondisi").innerHTML = formatList(
      item["Kondisi Klinis Terkait"],
    );
    renderTriad(item.Kode);
  } else if (mode === "siki") {
    ["Observasi", "Terapeutik", "Edukasi", "Kolaborasi"].forEach(
      (k) =>
        (document.getElementById(`modal${k}`).innerHTML = formatList(item[k])),
    );
    renderCrossLinks(
      document.getElementById("modalTautan"),
      item["Tautan Diagnosa"],
    );
  } else {
    document.getElementById("modalDefinisiSLKI").textContent =
      item.Definisi || "-";
    document.getElementById("modalEkspektasiSLKI").textContent =
      item.Ekspektasi || "-";
    document.getElementById("modalKriteriaSLKI").innerHTML = formatList(
      item["Kriteria Hasil"],
    );
    renderCrossLinks(
      document.getElementById("modalTautanSLKI"),
      item["Tautan Diagnosa"],
    );
  }

  // Askep Button Inject
  let actions = modal.querySelector(".modal-header-actions");
  if (!actions.querySelector(".btn-add-askep")) {
    const b = document.createElement("button");
    b.className = "btn btn-primary btn-add-askep";
    b.innerHTML = '<i class="fa-solid fa-plus"></i> ASKEP';
    b.style.marginLeft = "1rem";
    b.onclick = () => addToAskep(currentModalItem, currentModalMode);
    actions.appendChild(b);
  }

  updateModalFav();
  openModalEl(modal);
}

// === MODAL HELPERS ===
function openModalEl(el) {
  el.classList.remove("hidden");
  // Force reflow so transition works after removing display:none
  void el.offsetHeight;
  el.classList.add("visible");
  document.body.style.overflow = "hidden";
}
function closeModalEl(el) {
  el.classList.remove("visible");
  document.body.style.overflow = "auto";
  // Wait for CSS transition to finish, then hide completely
  setTimeout(() => el.classList.add("hidden"), 300);
}

function renderTriad(kode) {
  const sikiList = document.getElementById("relatedSIKIList");
  const slkiList = document.getElementById("relatedSLKIList");
  sikiList.innerHTML = "";
  slkiList.innerHTML = "";

  // Find SIKI/SLKI that have this SDKI code in their 'Tautan Diagnosa'
  const relatedSIKI = diagnosaData.siki
    .filter((s) => s["Tautan Diagnosa"] && s["Tautan Diagnosa"].includes(kode))
    .slice(0, 8);
  const relatedSLKI = diagnosaData.slki
    .filter((s) => s["Tautan Diagnosa"] && s["Tautan Diagnosa"].includes(kode))
    .slice(0, 6);

  relatedSIKI.forEach((s) => {
    const div = document.createElement("div");
    div.className = "askep-card";
    div.style.padding = "0.75rem";
    div.style.cursor = "pointer";
    div.innerHTML = `<strong>${s.Kode}</strong> ${s.Nama}`;
    div.onclick = () => openModal(s, "siki");
    sikiList.appendChild(div);
  });

  relatedSLKI.forEach((s) => {
    const div = document.createElement("div");
    div.className = "askep-card";
    div.style.padding = "0.75rem";
    div.style.cursor = "pointer";
    div.innerHTML = `<strong>${s.Kode}</strong> ${s.Nama}`;
    div.onclick = () => openModal(s, "slki");
    slkiList.appendChild(div);
  });
}

function renderCrossLinks(container, tautanString) {
  container.innerHTML = "";
  if (!tautanString) {
    container.textContent = "-";
    return;
  }
  tautanString
    .split(/[,;]/)
    .filter((c) => c.trim())
    .forEach((code) => {
      const clean = code.trim();
      const btn = document.createElement("button");
      btn.className = "btn btn-outline";
      btn.style.padding = "0.3rem 0.6rem";
      btn.style.fontSize = "0.8rem";
      btn.textContent = clean;
      btn.onclick = () => {
        const match = diagnosaData.sdki.find((s) => s.Kode === clean);
        if (match) openModal(match, "sdki");
        else showToast("Data tidak ditemukan", "warning");
      };
      container.appendChild(btn);
    });
}

// === FEATURES: ASKEP & EXPORT ===
function addToAskep(item, type) {
  if (askepBasket.find((i) => i.Kode === item.Kode))
    return showToast("Sudah ada di ASKEP", "warning");
  askepBasket.push({ ...item, type });
  saveAskep();
  showToast("Ditambahkan ke Rencana Asuhan", "success");
}

function saveAskep() {
  localStorage.setItem("esdki_askep", JSON.stringify(askepBasket));
  updateAskepCounter();
}

function updateAskepCounter() {
  askepCounter.textContent = askepBasket.length;
}

function renderAskepList() {
  if (typeof renderAskepListPro === "function") {
    renderAskepListPro();
    return;
  }
  const cont = document.getElementById("askepItemsContainer");
  if (!askepBasket.length) {
    cont.innerHTML = "<p>Pilih item dari daftar untuk membuat asuhan.</p>";
    return;
  }
  cont.innerHTML = askepBasket
    .map(
      (it, idx) => `
    <div class="askep-card">
      <div style="display:flex; justify-content:space-between; align-items:center">
        <span class="card-code ${it.type}-code">${it.Kode}</span>
        <i class="fa-solid fa-trash askep-remove" onclick="removeFromAskep(${idx})"></i>
      </div>
      <h4 style="margin: 0.5rem 0">${it.Nama}</h4>
      <div style="font-size: 0.8rem; opacity: 0.6">${it.type.toUpperCase()}</div>
    </div>
  `,
    )
    .join("");
}

window.removeFromAskep = (i) => {
  askepBasket.splice(i, 1);
  saveAskep();
  renderAskepList();
};

async function downloadPDF() {
  if (!askepBasket.length) return showToast("Keranjang kosong", "warning");
  showToast("Menyiapkan PDF...", "info");

  const content = document.createElement("div");
  content.style.padding = "40px";
  content.style.fontFamily = "Arial, sans-serif";
  content.style.fontSize = "11px";
  content.style.lineHeight = "1.6";
  content.style.color = "#1e293b";

  const renderItemDetail = (it) => {
    if (it.type === "sdki") {
      return `
        <p><strong>Definisi:</strong> ${it.Definisi || "-"}</p>
        <p><strong>Penyebab:</strong> ${it.Penyebab || "-"}</p>
        <p><strong>Gejala Mayor:</strong> ${it["Gejala Mayor"] || "-"}</p>
        <p><strong>Gejala Minor:</strong> ${it["Gejala Minor"] || "-"}</p>
        <p><strong>Kondisi Klinis:</strong> ${it["Kondisi Klinis Terkait"] || "-"}</p>
      `;
    } else if (it.type === "siki") {
      return `
        <p><strong>Observasi:</strong> ${it.Observasi || "-"}</p>
        <p><strong>Terapeutik:</strong> ${it.Terapeutik || "-"}</p>
        <p><strong>Edukasi:</strong> ${it.Edukasi || "-"}</p>
        <p><strong>Kolaborasi:</strong> ${it.Kolaborasi || "-"}</p>
      `;
    } else {
      return `
        <p><strong>Definisi:</strong> ${it.Definisi || "-"}</p>
        <p><strong>Ekspektasi:</strong> ${it.Ekspektasi || "-"}</p>
        <p><strong>Kriteria Hasil:</strong> ${it["Kriteria Hasil"] || "-"}</p>
      `;
    }
  };

  const namaPasien =
    document.getElementById("askepNamaPasien")?.value ||
    "................................";
  const noRM =
    document.getElementById("askepNoRM")?.value ||
    "................................";
  const ruangan =
    document.getElementById("askepRuangan")?.value ||
    "................................";
  const tglInput = document.getElementById("askepTanggal")?.value;
  const catatan = document.getElementById("askepCatatan")?.value || "";

  const tgl = tglInput
    ? new Date(tglInput).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  content.innerHTML = `
    <div style="text-align:center; margin-bottom:24px;">
      <h1 style="color:#2563eb; margin:0; font-size:20px;">RENCANA ASUHAN KEPERAWATAN</h1>
      <p style="margin:4px 0; color:#64748b;">E-SDKI Pro — Dokumentasi Digital</p>
    </div>
    <table style="width:100%; border-collapse:collapse; margin-bottom:20px; font-size:11px;">
      <tr><td style="padding:6px; border:1px solid #e2e8f0; width:30%;"><strong>Nama Pasien</strong></td><td style="padding:6px; border:1px solid #e2e8f0;">${namaPasien}</td></tr>
      <tr><td style="padding:6px; border:1px solid #e2e8f0;"><strong>No. Rekam Medis</strong></td><td style="padding:6px; border:1px solid #e2e8f0;">${noRM}</td></tr>
      <tr><td style="padding:6px; border:1px solid #e2e8f0;"><strong>Ruangan / Unit</strong></td><td style="padding:6px; border:1px solid #e2e8f0;">${ruangan}</td></tr>
      <tr><td style="padding:6px; border:1px solid #e2e8f0;"><strong>Tanggal</strong></td><td style="padding:6px; border:1px solid #e2e8f0;">${tgl}</td></tr>
    </table>
    <hr style="border:1px solid #2563eb; margin-bottom:16px;">
    ${askepBasket
      .map(
        (it, idx) => `
      <div style="margin-bottom:20px; padding:12px; border:1px solid #e2e8f0; border-radius:8px; border-left:4px solid ${it.type === "sdki" ? "#2563eb" : it.type === "siki" ? "#6366f1" : "#10b981"};">
        <h3 style="margin:0 0 8px 0; font-size:14px; color:${it.type === "sdki" ? "#2563eb" : it.type === "siki" ? "#6366f1" : "#10b981"};">${idx + 1}. ${it.Nama} <span style="font-size:11px; background:#f1f5f9; padding:2px 8px; border-radius:12px;">${it.Kode} — ${it.type.toUpperCase()}</span></h3>
        ${renderItemDetail(it)}
      </div>
    `,
      )
      .join("")}
    ${catatan ? `<div style="margin-top:16px;padding:12px;border:1px solid #e2e8f0;border-radius:8px;"><strong>Catatan Tambahan:</strong><p style="margin:4px 0;">${catatan}</p></div>` : ""}
    <div style="margin-top:40px; padding-top:16px; border-top:1px solid #e2e8f0; display:flex; justify-content:space-between;">
      <div><p style="margin:0;">Tanda Tangan Perawat</p><br><br><p style="border-top:1px solid #333; display:inline-block; padding-top:4px; min-width:200px;">(............................)</p></div>
      <div style="text-align:right;"><p style="font-size:9px; color:#94a3b8;">Dicetak via E-SDKI Pro — ${tgl}</p></div>
    </div>
  `;

  html2pdf()
    .from(content)
    .set({
      margin: [0.5, 0.6],
      filename: `ASKEP_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .save();
}

// === FEATURES: GLOSSARY & QUIZ ===
function renderGlossary(filter = "") {
  const cont = document.getElementById("glossaryItems");
  const filtered = GLOSSARY.filter(
    (g) =>
      g.term.toLowerCase().includes(filter.toLowerCase()) ||
      g.def.toLowerCase().includes(filter.toLowerCase()),
  );
  cont.innerHTML = filtered
    .map(
      (g) => `
    <div class="askep-card" style="border-left: 4px solid var(--primary)">
      <strong>${g.term}</strong>
      <p style="margin-top: 5px; font-size: 0.9rem">${g.def}</p>
    </div>
  `,
    )
    .join("");
}

function startQuiz() {
  if (typeof updateOsceScoreboard === "function") updateOsceScoreboard();
  const cont = document.getElementById("quizContent");
  const q = QUIZ_DATA[Math.floor(Math.random() * QUIZ_DATA.length)];
  const pct = quizTotal > 0 ? Math.round((quizScore / quizTotal) * 100) : 0;
  cont.innerHTML = `
    <div class="quiz-score-bar" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;padding:0.75rem 1rem;background:var(--bg-alt);border-radius:var(--radius-lg);font-size:0.85rem;">
      <span><i class="fa-solid fa-trophy" style="color:var(--amber)"></i> Skor: <strong>${quizScore}/${quizTotal}</strong></span>
      <span>${pct}% benar</span>
      <button onclick="resetQuizScore()" class="btn btn-outline" style="padding:0.3rem 0.75rem;font-size:0.75rem;">Reset</button>
    </div>
    <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1.5rem;">${q.q}</p>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `<div class="quiz-option" onclick="checkQuiz(${i}, ${q.correct})">${opt}</div>`).join("")}
    </div>
  `;
}

window.resetQuizScore = () => {
  quizScore = 0;
  quizTotal = 0;
  if (typeof quizStreak !== "undefined") {
    quizStreak = 0;
    localStorage.setItem("esdki_quiz_streak", "0");
  }
  localStorage.setItem("esdki_quiz_score", "0");
  localStorage.setItem("esdki_quiz_total", "0");
  if (typeof updateOsceScoreboard === "function") updateOsceScoreboard();
  if (typeof currentOsceMode !== "undefined" && currentOsceMode === "kasus")
    startKasusKlinis();
  else if (
    typeof currentOsceMode !== "undefined" &&
    currentOsceMode === "identifikasi"
  )
    startIdentifikasiGejala();
  else startQuiz();
  showToast("Skor direset!", "info");
};

window.checkQuiz = (selected, correct) => {
  const options = document.querySelectorAll(".quiz-option");
  options.forEach((opt, i) => {
    opt.style.pointerEvents = "none";
    if (i === correct) opt.classList.add("quiz-correct");
    else if (i === selected) opt.classList.add("quiz-wrong");
  });
  quizTotal++;
  if (selected === correct) quizScore++;
  localStorage.setItem("esdki_quiz_score", String(quizScore));
  localStorage.setItem("esdki_quiz_total", String(quizTotal));
  showToast(
    selected === correct
      ? `Benar! Skor: ${quizScore}/${quizTotal}`
      : `Salah! Skor: ${quizScore}/${quizTotal}`,
    selected === correct ? "success" : "warning",
  );
  setTimeout(startQuiz, 2000);
};

// === EVENT LISTENERS ===
function initEventListeners() {
  tabBtns.forEach(
    (btn) =>
      (btn.onclick = () => {
        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentMode = btn.getAttribute("data-target");
        displayedCount = ITEMS_PER_PAGE;
        updateTabMeta();
        populateCategories();
        applyFilters();
      }),
  );
  searchInput.oninput = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(applyFilters, SEARCH_DEBOUNCE_MS);
  };
  categoryFilter.onchange = () => {
    currentCategory = categoryFilter.value;
    applyFilters();
  };
  document.getElementById("themeToggle").onclick = cycleTheme;
  document.getElementById("viewToggle").onclick = toggleView;
  document.getElementById("closeModal").onclick = () => closeModalEl(modal);
  // Close detail modal on overlay click
  modal.querySelector(".modal-overlay").onclick = () => closeModalEl(modal);
  document.getElementById("toggleFavorites").onclick = () => {
    currentFilter = currentFilter === "all" ? "favorites" : "all";
    document.getElementById("toggleFavorites").classList.toggle("active");
    applyFilters();
  };
  document.getElementById("symptomModeToggle").onclick = () => {
    symptomMode = !symptomMode;
    document.getElementById("symptomModeToggle").classList.toggle("active");
    applyFilters();
  };

  if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
      displayedCount += ITEMS_PER_PAGE;
      applyFilters();
    };
  }

  // Modals Toggles
  // ASKEP modal
  const askepModal = document.getElementById("askepModal");
  document.getElementById("toggleAskep").onclick = () => {
    renderAskepList();
    openModalEl(askepModal);
  };
  document.getElementById("closeAskepModal").onclick = () =>
    closeModalEl(askepModal);
  askepModal.querySelector(".modal-overlay").onclick = () =>
    closeModalEl(askepModal);

  // Glossary modal
  const glossaryModal = document.getElementById("glossaryModal");
  document.getElementById("toggleGlossary").onclick = () => {
    renderGlossary();
    openModalEl(glossaryModal);
  };
  document.getElementById("closeGlossaryModal").onclick = () =>
    closeModalEl(glossaryModal);
  glossaryModal.querySelector(".modal-overlay").onclick = () =>
    closeModalEl(glossaryModal);
  document.getElementById("glossarySearch").oninput = (e) =>
    renderGlossary(e.target.value);

  // Quiz modal
  const quizModal = document.getElementById("quizModal");
  document.getElementById("toggleQuiz").onclick = () => {
    startQuiz();
    if (typeof updateOsceScoreboard === "function") updateOsceScoreboard();
    openModalEl(quizModal);
  };
  document.getElementById("closeQuizModal").onclick = () =>
    closeModalEl(quizModal);
  quizModal.querySelector(".modal-overlay").onclick = () =>
    closeModalEl(quizModal);

  // Global Escape key to close any visible modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(".modal.visible")
        .forEach((m) => closeModalEl(m));
    }
  });
  document.getElementById("downloadAskepPdf").onclick = downloadPDF;
  // Print button
  const printBtn = document.getElementById("printAskep");
  if (printBtn) {
    printBtn.onclick = () => {
      if (!askepBasket.length) return showToast("Keranjang kosong", "warning");
      window.print();
    };
  }
  document.getElementById("clearAskep").onclick = () => {
    if (confirm("Bersihkan keranjang?")) {
      askepBasket = [];
      saveAskep();
      renderAskepList();
    }
  };

  // Modal favorite button
  document.getElementById("modalFavBtn").onclick = () => {
    if (currentModalItem && currentModalMode) {
      toggleFavorite(currentModalItem.Kode);
      updateModalFav();
    }
  };

  // Modal copy button
  document.getElementById("modalCopyBtn").onclick = () => {
    if (currentModalItem) {
      const text = `${currentModalItem.Kode} - ${currentModalItem.Nama}\n${currentModalItem.Definisi || currentModalItem.Observasi || ""}`;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showToast("Disalin ke clipboard!", "success");
        })
        .catch(() => {
          showToast("Gagal menyalin", "warning");
        });
    }
  };

  // Ctrl+K shortcut for search
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.altKey && e.key === "t") {
      e.preventDefault();
      cycleTheme();
    }
  });

  // Back to top button
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("visible", window.scrollY > 400);
    });
    backToTopBtn.onclick = () =>
      window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// === UTILS ===
function updateTabMeta() {
  const meta = TAB_META[currentMode] || TAB_META.sdki;
  document.getElementById("pageTitle").textContent = meta.title;
  document.getElementById("pageDesc").textContent = meta.desc;
}

function cycleTheme() {
  const t = ["light", "dark", "system"];
  currentTheme = t[(t.indexOf(currentTheme) + 1) % 3];
  initTheme();
  localStorage.setItem("esdki_theme", currentTheme);
}
function initTheme() {
  let resolvedTheme = currentTheme;
  if (currentTheme === "system") {
    resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  document.documentElement.setAttribute("data-theme", resolvedTheme);
  updateThemeIcon();
}
function updateThemeIcon() {
  const i = {
    light: "fa-sun",
    dark: "fa-moon",
    system: "fa-circle-half-stroke",
  };
  document.getElementById("themeIcon").className =
    `fa-solid ${i[currentTheme]}`;
}
function initView() {
  grid.classList.toggle("list-view", currentView === "list");
  document.getElementById("viewIcon").className =
    `fa-solid fa-${currentView === "grid" ? "list" : "grip"}`;
}
function toggleView() {
  currentView = currentView === "grid" ? "list" : "grid";
  grid.classList.toggle("list-view", currentView === "list");
  document.getElementById("viewIcon").className =
    `fa-solid fa-${currentView === "grid" ? "list" : "grip"}`;
  localStorage.setItem("esdki_view", currentView);
}
function toggleFavorite(kode) {
  const f = allFavorites[currentMode];
  const i = f.indexOf(kode);
  if (i > -1) f.splice(i, 1);
  else f.push(kode);
  localStorage.setItem(`esdki_fav_${currentMode}`, JSON.stringify(f));
  applyFavorites();
}
function updateModalFav() {
  const is = allFavorites[currentModalMode].includes(currentModalItem.Kode);
  document.getElementById("modalFavBtn").innerHTML =
    `<i class="fa-${is ? "solid" : "regular"} fa-star"></i>`;
}
function formatList(s) {
  if (!s || s === "-") return "<li>-</li>";
  // Auto-detect delimiter: use semicolon if present, otherwise comma
  const d = s.includes(";") ? ";" : ",";
  return s
    .split(d)
    .filter((x) => x.trim())
    .map((x) => `<li>${x.trim()}</li>`)
    .join("");
}
function updateTabCounts() {
  document.getElementById("countSDKI").textContent = diagnosaData.sdki.length;
  document.getElementById("countSLKI").textContent = diagnosaData.slki.length;
  document.getElementById("countSIKI").textContent = diagnosaData.siki.length;
}
function populateCategories() {
  categoryFilter.innerHTML = '<option value="all">Semua Kategori</option>';
  if (currentMode !== "sdki") {
    categoryFilter.classList.add("hidden");
    return;
  }
  categoryFilter.classList.remove("hidden");
  Object.keys(SDKI_CATEGORIES).forEach(
    (c) => (categoryFilter.innerHTML += `<option value="${c}">${c}</option>`),
  );
  categoryFilter.value = currentCategory;
}
function updateUI() {
  document.getElementById("dataCounter").textContent =
    `Ditemukan ${filteredData.length} data`;

  if (loadMoreContainer) {
    const remaining = filteredData.length - displayedCount;
    if (remaining > 0) {
      loadMoreContainer.classList.remove("hidden");
      if (remainingCountSpan) remainingCountSpan.textContent = remaining;
    } else {
      loadMoreContainer.classList.add("hidden");
    }
  }
}
function showToast(m, t) {
  const div = document.createElement("div");
  div.className = `toast ${t}`;
  div.textContent = m;
  toastContainer.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}
function showEmptyState(t, d) {
  emptyState.classList.remove("hidden");
  grid.classList.add("hidden");
}
function applyFavorites() {
  applyFilters();
}
