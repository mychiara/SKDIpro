// ============================================
// E-SDKI Pro â€” App Logic (Final Complete Version)
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
      "D.0097",
      "D.0098",
      "D.0099",
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

let GLOSSARY = []; // Data loaded from data/glossary.json

let QUIZ_DATA = []; // Data loaded from data/quiz.json

// === DATA STORAGE ===
let PENYAKIT_DATA = []; // Data loaded from multi-file categories

let quizScore = parseInt(localStorage.getItem("esdki_quiz_score") || "0");
let quizTotal = parseInt(localStorage.getItem("esdki_quiz_total") || "0");

const TAB_META = {
  sdki: {
    title: "Panduan Diagnosa Keperawatan",
    desc: "Alat Bantu Digital untuk Belajar Diagnosis Keperawatan (SDKI) Berbasis Data.",
  },
  slki: {
    title: "Panduan Luaran Keperawatan",
    desc: "Standar Luaran Keperawatan Indonesia (SLKI) â€” Target hasil yang diharapkan.",
  },
  siki: {
    title: "Panduan Intervensi Keperawatan",
    desc: "Standar Intervensi Keperawatan Indonesia (SIKI) â€” Tindakan berbasis bukti.",
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
    const cachedPenyakit = localStorage.getItem("esdki_penyakit_cache_v5");

    if (cached) {
      try {
        diagnosaData = JSON.parse(cached);
        if (cachedPenyakit) PENYAKIT_DATA = JSON.parse(cachedPenyakit);
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

    const penyakitFiles = [
      "data/penyakit.json",
      "data/penyakit_kmb.json",
      "data/penyakit_maternitas.json",
      "data/penyakit_anak.json",
      "data/penyakit_jiwa.json",
      "data/penyakit_tropis.json",
    ];

    // Fetch Penyakit conditionally
    let fetchPenyakitPromises = [];
    if (!cachedPenyakit) {
      fetchPenyakitPromises = penyakitFiles.map((f) =>
        fetch(f)
          .then((r) => (r.ok ? r.json() : []))
          .catch(() => []),
      );
    }

    const resultPromises = await Promise.all([
      fetch("data/sdki.json").then((r) => r.json()),
      fetch("data/slki.json").then((r) => r.json()),
      fetch("data/siki.json").then((r) => r.json()),
      fetch("data/glossary.json")
        .then((r) => r.json())
        .catch(() => []),
      fetch("data/quiz.json")
        .then((r) => r.json())
        .catch(() => []),
      ...fetchPenyakitPromises,
    ]);

    const dSDKI = resultPromises[0];
    const dSLKI = resultPromises[1];
    const dSIKI = resultPromises[2];
    const dGlossary = resultPromises[3];
    const dQuiz = resultPromises[4];

    const dPenyakitAll = resultPromises.slice(5);

    const newData = { sdki: dSDKI, slki: dSLKI, siki: dSIKI };

    // Update state and cache
    diagnosaData = newData;
    GLOSSARY = dGlossary;
    QUIZ_DATA = dQuiz;

    if (!cachedPenyakit) {
      PENYAKIT_DATA = dPenyakitAll.flat();
      try {
        localStorage.setItem(
          "esdki_penyakit_cache_v5",
          JSON.stringify(PENYAKIT_DATA),
        );
      } catch (e) {
        console.warn("Storage cap limit reached for Penyakit cache.");
      }
    }

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

  const cat = CODE_TO_CAT[item.Kode];
  const subtitleSpan = document.querySelector("#modalSubtitle span");
  const modalHeroBg = document.getElementById("modalHeroBg");

  if (cat && mode === "sdki") {
    subtitleSpan.textContent = cat.name;
    modalHeroBg.style.background = `linear-gradient(135deg, ${cat.color}, #1d4ed8)`;
  } else if (mode === "siki") {
    subtitleSpan.textContent = "Intervensi Keperawatan";
    modalHeroBg.style.background = "linear-gradient(135deg, #a78bfa, #8b5cf6)";
  } else {
    subtitleSpan.textContent = "Luaran Keperawatan";
    modalHeroBg.style.background = "linear-gradient(135deg, #34d399, #10b981)";
  }

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
    initValidationCheck(item);
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
    document.getElementById("modalKriteriaSLKI").innerHTML = formatSLKITable(
      item["Kriteria Hasil"],
      item.Ekspektasi,
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
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  el.classList.remove("visible");
  document.body.style.overflow = "auto";
  // Wait for CSS transition to finish, then hide completely
  setTimeout(() => el.classList.add("hidden"), 300);
}

const SIKI_PRIORITY = {
  "D.0001": ["I.01011", "I.01006"], // Bersihan Jalan Napas: Manajemen Jalan Napas, Latihan Batuk Efektif
  "D.0003": ["I.01014", "I.01026"], // Pertukaran Gas: Pemantauan Respirasi, Terapi Oksigen
  "D.0005": ["I.01011", "I.01014"], // Pola Napas: Manajemen Jalan Napas, Pemantauan Respirasi
  "D.0008": ["I.02075", "I.02076"], // Penurunan Curah Jantung: Perawatan Jantung, Perawatan Jantung Akut
  "D.0019": ["I.03119"], // Defisit Nutrisi: Manajemen Nutrisi
  "D.0022": ["I.03114", "I.03121"], // Hipervolemia: Manajemen Hipervolemia, Pemantauan Cairan
  "D.0023": ["I.03116", "I.03121"], // Hipovolemia: Manajemen Hipovolemia, Pemantauan Cairan
  "D.0020": ["I.03115", "I.03121"], // Diare: Manajemen Diare, Pemantauan Cairan
  "D.0056": ["I.05178", "I.05186"], // Intoleransi Aktivitas: Manajemen Energi, Terapi Aktivitas
  "D.0077": ["I.08238", "I.08243"], // Nyeri Akut: Manajemen Nyeri, Pemberian Analgesik
  "D.0129": ["I.14537", "I.14545"], // Gangguan Integritas Kulit: Perawatan Integritas Kulit, Perawatan Luka
};

function renderTriad(kode) {
  const sikiListUtama = document.getElementById("relatedSIKIListUtama");
  const sikiListPendukung = document.getElementById("relatedSIKIListPendukung");
  const slkiList = document.getElementById("relatedSLKIList");

  if (sikiListUtama) sikiListUtama.innerHTML = "";
  if (sikiListPendukung) sikiListPendukung.innerHTML = "";
  if (slkiList) slkiList.innerHTML = "";

  // Find SIKI/SLKI that have this SDKI code in their 'Tautan Diagnosa'
  const allRelatedSIKI = diagnosaData.siki.filter(
    (s) => s["Tautan Diagnosa"] && s["Tautan Diagnosa"].includes(kode),
  );

  const relatedSLKI = diagnosaData.slki
    .filter((s) => s["Tautan Diagnosa"] && s["Tautan Diagnosa"].includes(kode))
    .slice(0, 6);

  // Split SIKI into Utama and Pendukung
  const priorityCodes = SIKI_PRIORITY[kode] || [];
  const relatedSIKIUtama = allRelatedSIKI.filter((s) =>
    priorityCodes.includes(s.Kode),
  );
  const relatedSIKIPendukung = allRelatedSIKI
    .filter((s) => !priorityCodes.includes(s.Kode))
    .slice(0, 8);

  const renderItem = (s, container, mode) => {
    const div = document.createElement("div");
    div.className = "askep-card";
    div.style.padding = "0.75rem";
    div.style.cursor = "pointer";
    div.innerHTML = `<strong>${s.Kode}</strong> ${s.Nama}`;
    div.onclick = () => openModal(s, mode);
    container.appendChild(div);
  };

  if (sikiListUtama)
    relatedSIKIUtama.forEach((s) => renderItem(s, sikiListUtama, "siki"));
  if (sikiListPendukung)
    relatedSIKIPendukung.forEach((s) =>
      renderItem(s, sikiListPendukung, "siki"),
    );
  if (slkiList) relatedSLKI.forEach((s) => renderItem(s, slkiList, "slki"));

  // Handle empty states
  if (sikiListUtama && relatedSIKIUtama.length === 0) {
    sikiListUtama.innerHTML =
      '<div style="font-size:0.8rem; opacity:0.5; font-style:italic;">Gunakan intervensi pendukung</div>';
  }
}

// === DIAGNOSTIC VALIDITY CHECK ===
function initValidationCheck(sdki) {
  const container = document.getElementById("validationList");
  const statusEl = document.getElementById("validationStatus");
  if (!container || !statusEl) return;

  container.innerHTML = "";

  // Parse Gejala Mayor
  const mayorRaw = sdki["Gejala Mayor"] || "-";
  const items = mayorRaw
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(
      (s) =>
        s &&
        s !== "(Tidak tersedia)" &&
        !s.startsWith("Tidak tersedia") &&
        s !== "-",
    );

  if (items.length === 0) {
    document.getElementById("validationSection").classList.add("hidden");
    return;
  }

  document.getElementById("validationSection").classList.remove("hidden");

  let selectedCount = 0;
  const totalCount = items.length;

  items.forEach((text, idx) => {
    const label = document.createElement("label");
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.gap = "0.5rem";
    label.style.cursor = "pointer";
    label.className = "validation-gejala-item";
    label.innerHTML = `
      <input type="checkbox" class="validation-cb" data-gejala="${text.replace(/"/g, "&quot;")}" style="width:16px; height:16px;">
      <span>${text}</span>
    `;

    const cb = label.querySelector("input");
    cb.onchange = () => {
      selectedCount = container.querySelectorAll(
        "input.validation-cb:checked",
      ).length;
      const pct = Math.round((selectedCount / totalCount) * 100);
      statusEl.innerHTML = `Validasi: ${selectedCount}/${totalCount} Gejala (${pct}%) \u2014 ${pct >= 80 ? '<span style="color:var(--emerald)">Diagnosa Tegak (Valid)</span>' : '<span style="color:var(--rose)">Belum Mencukupi</span>'}`;
    };

    container.appendChild(label);
  });

  statusEl.innerHTML = `Validasi: 0/${totalCount} Gejala (0%)`;
}

// Helper: Read current validation state from modal
function getValidationData() {
  const container = document.getElementById("validationList");
  if (!container) return null;
  const allCbs = container.querySelectorAll("input.validation-cb");
  if (allCbs.length === 0) return null;
  const total = allCbs.length;
  const checked = container.querySelectorAll(
    "input.validation-cb:checked",
  ).length;
  const pct = Math.round((checked / total) * 100);
  const gejalaList = [];
  allCbs.forEach((cb) => {
    gejalaList.push({ text: cb.dataset.gejala, checked: cb.checked });
  });
  return { total, checked, pct, valid: pct >= 80, gejalaList };
}

// Helper: Read current SLKI scores from modal
function getSLKIScoresFromModal() {
  const modalKriteria = document.getElementById("modalKriteriaSLKI");
  if (!modalKriteria) return null;
  const rows = modalKriteria.querySelectorAll("tr[data-kriteria]");
  if (rows.length === 0) return null;
  const scores = [];
  rows.forEach((row) => {
    const name = row.dataset.kriteria;
    const radios = row.querySelectorAll('input[type="radio"]');
    const select = row.querySelector("select");
    let currentScore = 0;
    radios.forEach((r) => {
      if (r.checked) currentScore = parseInt(r.value);
    });
    const targetScore = select ? parseInt(select.value) || 5 : 5;
    scores.push({ name, currentScore, targetScore });
  });
  return scores;
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

  const entry = { ...item, type };

  // Capture SDKI validation data from the modal
  if (type === "sdki") {
    const valData = getValidationData();
    if (valData) {
      entry._validation = valData;
    }
  }

  // Capture SLKI scores from the modal
  if (type === "slki") {
    const slkiScores = getSLKIScoresFromModal();
    if (slkiScores) {
      entry._scores = slkiScores;
    }
  }

  askepBasket.push(entry);
  saveAskep();
  showToast("Ditambahkan ke Rencana Asuhan", "success");
}

function saveAskep() {
  localStorage.setItem("esdki_askep", JSON.stringify(askepBasket));
  updateAskepCounter();
}

function updateAskepCounter() {
  if (askepCounter) {
    askepCounter.textContent = askepBasket.length;
  }
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
      const tableHTML = formatSLKITable(
        it["Kriteria Hasil"],
        it.Ekspektasi,
      ).replace(/<input type="radio"[^>]*>/g, "â—‹");
      return `
        <p><strong>Definisi:</strong> ${it.Definisi || "-"}</p>
        <p><strong>Ekspektasi:</strong> ${it.Ekspektasi || "-"}</p>
        <p><strong>Kriteria Hasil:</strong></p>
        ${tableHTML}
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
      <p style="margin:4px 0; color:#64748b;">SDKI Pro â€” Dokumentasi Digital</p>
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
        <h3 style="margin:0 0 8px 0; font-size:14px; color:${it.type === "sdki" ? "#2563eb" : it.type === "siki" ? "#6366f1" : "#10b981"};">${idx + 1}. ${it.Nama} <span style="font-size:11px; background:#f1f5f9; padding:2px 8px; border-radius:12px;">${it.Kode} â€” ${it.type.toUpperCase()}</span></h3>
        ${renderItemDetail(it)}
      </div>
    `,
      )
      .join("")}
    ${catatan ? `<div style="margin-top:16px;padding:12px;border:1px solid #e2e8f0;border-radius:8px;"><strong>Catatan Tambahan:</strong><p style="margin:4px 0;">${catatan}</p></div>` : ""}
    <div style="margin-top:40px; padding-top:16px; border-top:1px solid #e2e8f0; display:flex; justify-content:space-between;">
      <div><p style="margin:0;">Tanda Tangan Perawat</p><br><br><p style="border-top:1px solid #333; display:inline-block; padding-top:4px; min-width:200px;">(............................)</p></div>
      <div style="text-align:right;"><p style="font-size:9px; color:#94a3b8;">Dicetak via SDKI Pro â€” ${tgl}</p></div>
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
  if (!cont) return;

  if (!GLOSSARY || !Array.isArray(GLOSSARY)) {
    cont.innerHTML =
      '<div class="empty-state"><p>Gagal memuat data glosarium.</p></div>';
    return;
  }

  const query = filter.toLowerCase().trim();
  const filtered = GLOSSARY.filter(
    (g) =>
      (g.term && g.term.toLowerCase().includes(query)) ||
      (g.def && g.def.toLowerCase().includes(query)),
  );

  if (filtered.length === 0) {
    cont.innerHTML = `
      <div style="text-align:center; padding:2rem; opacity:0.6;">
        <i class="fa-solid fa-magnifying-glass" style="font-size:2rem; margin-bottom:1rem; display:block;"></i>
        <p>Tidak ada hasil untuk "${filter}"</p>
      </div>
    `;
    return;
  }

  cont.innerHTML = filtered
    .map(
      (g) => `
    <div class="askep-card" style="border-left: 4px solid var(--primary); margin-bottom: 0.8rem; position: relative; padding-right: 3.5rem;">
      <button class="voice-btn-mini" onclick="handleGlossaryVoice(this, '${g.term}', '${g.def.replace(/'/g, "\\'")}')" style="position: absolute; top: 1rem; right: 1rem; background: var(--bg-alt); border: 1px solid var(--border); width: 32px; height: 32px; border-radius: 50%; color: var(--primary); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
        <i class="fa-solid fa-volume-high"></i>
      </button>
      <strong style="color: var(--primary); font-size: 1.05rem;">${g.term}</strong>
      <p style="margin-top: 5px; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">${g.def}</p>
      ${g.category ? `<span style="font-size: 0.75rem; opacity: 0.5; display: block; margin-top: 5px;"><i class="fa-solid fa-tag"></i> ${g.category}</span>` : ""}
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
  // Helper function to safely set onclick
  const safeSetClick = (id, fn) => {
    const el = document.getElementById(id);
    if (el) el.onclick = fn;
  };

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
  if (searchInput) {
    searchInput.oninput = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(applyFilters, SEARCH_DEBOUNCE_MS);
    };
  }
  if (categoryFilter) {
    categoryFilter.onchange = () => {
      currentCategory = categoryFilter.value;
      applyFilters();
    };
  }
  safeSetClick("themeToggle", cycleTheme);
  safeSetClick("viewToggle", toggleView);
  safeSetClick("closeModal", () => closeModalEl(modal));

  // Close detail modal on overlay click
  if (modal) {
    const overlay = modal.querySelector(".modal-overlay");
    if (overlay) overlay.onclick = () => closeModalEl(modal);
  }

  safeSetClick("toggleFavorites", () => {
    currentFilter = currentFilter === "all" ? "favorites" : "all";
    const favBtn = document.getElementById("toggleFavorites");
    if (favBtn) favBtn.classList.toggle("active");
    applyFilters();
  });

  safeSetClick("symptomModeToggle", () => {
    symptomMode = !symptomMode;
    const symptomBtn = document.getElementById("symptomModeToggle");
    if (symptomBtn) symptomBtn.classList.toggle("active");
    applyFilters();
  });

  if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
      displayedCount += ITEMS_PER_PAGE;
      applyFilters();
    };
  }

  // Modals Toggles
  // ASKEP modal
  const askepModal = document.getElementById("askepModal");
  if (askepModal) {
    safeSetClick("toggleAskep", () => {
      renderAskepList();
      openModalEl(askepModal);
    });
    safeSetClick("closeAskepModal", () => closeModalEl(askepModal));
    const overlay = askepModal.querySelector(".modal-overlay");
    if (overlay) overlay.onclick = () => closeModalEl(askepModal);
  }

  // Glossary modal
  const glossaryModal = document.getElementById("glossaryModal");
  if (glossaryModal) {
    safeSetClick("toggleGlossary", () => {
      renderGlossary();
      openModalEl(glossaryModal);
    });
    safeSetClick("closeGlossaryModal", () => closeModalEl(glossaryModal));
    const overlay = glossaryModal.querySelector(".modal-overlay");
    if (overlay) overlay.onclick = () => closeModalEl(glossaryModal);

    const glossarySearch = document.getElementById("glossarySearch");
    if (glossarySearch) {
      glossarySearch.addEventListener("input", (e) => {
        renderGlossary(e.target.value);
      });
    }
  }

  // Quiz modal
  const quizModal = document.getElementById("quizModal");
  if (quizModal) {
    safeSetClick("toggleQuiz", () => {
      startQuiz();
      if (typeof updateOsceScoreboard === "function") updateOsceScoreboard();
      openModalEl(quizModal);
    });
    safeSetClick("closeQuizModal", () => closeModalEl(quizModal));
    const overlay = quizModal.querySelector(".modal-overlay");
    if (overlay) overlay.onclick = () => closeModalEl(quizModal);
  }

  // Global Escape key to close any visible modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(".modal.visible")
        .forEach((m) => closeModalEl(m));
    }
  });
  safeSetClick("downloadAskepPdf", downloadPDF);
  // Print button
  const printBtn = document.getElementById("printAskep");
  if (printBtn) {
    printBtn.onclick = () => {
      if (!askepBasket.length) return showToast("Keranjang kosong", "warning");
      window.print();
    };
  }
  safeSetClick("clearAskep", () => {
    if (confirm("Bersihkan keranjang?")) {
      askepBasket = [];
      saveAskep();
      renderAskepList();
    }
  });

  // Modal favorite button
  safeSetClick("modalFavBtn", () => {
    if (currentModalItem && currentModalMode) {
      toggleFavorite(currentModalItem.Kode);
      updateModalFav();
    }
  });

  // Modal copy button
  safeSetClick("modalCopyBtn", () => {
    if (currentModalItem) {
      const text = `${currentModalItem.Nama}\n${currentModalItem.Kode}\n${currentModalItem.Definisi || currentModalItem.Observasi || ""}`;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showToast("Disalin ke clipboard!", "success");
        })
        .catch(() => {
          showToast("Gagal menyalin", "warning");
        });
    }
  });

  // Modal Voice Over button
  safeSetClick("modalVoiceBtn", handleModalVoice);

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
  const titleEl = document.getElementById("pageTitle");
  const descEl = document.getElementById("pageDesc");
  if (titleEl) titleEl.textContent = meta.title;
  if (descEl) descEl.textContent = meta.desc;
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
  const iconEl = document.getElementById("themeIcon");
  if (iconEl) {
    const i = {
      light: "fa-sun",
      dark: "fa-moon",
      system: "fa-circle-half-stroke",
    };
    iconEl.className = `fa-solid ${i[currentTheme]}`;
  }
}
function initView() {
  if (grid) grid.classList.toggle("list-view", currentView === "list");
  const iconEl = document.getElementById("viewIcon");
  if (iconEl) {
    iconEl.className = `fa-solid fa-${currentView === "grid" ? "list" : "grip"}`;
  }
}
function toggleView() {
  currentView = currentView === "grid" ? "list" : "grid";
  if (grid) grid.classList.toggle("list-view", currentView === "list");
  const iconEl = document.getElementById("viewIcon");
  if (iconEl) {
    iconEl.className = `fa-solid fa-${currentView === "grid" ? "list" : "grip"}`;
  }
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

function formatSLKITable(s, ekspektasi) {
  if (!s || s === "-") return "<p>-</p>";
  const d = s.includes(";") ? ";" : ",";
  const items = s.split(d).filter((x) => x.trim());

  let h1 = "1",
    h2 = "2",
    h3 = "3",
    h4 = "4",
    h5 = "5";
  let e = (ekspektasi || "").toLowerCase();

  if (e.includes("meningkat")) {
    h1 = "Menurun";
    h2 = "Cukup Menurun";
    h3 = "Sedang";
    h4 = "Cukup Meningkat";
    h5 = "Meningkat";
  } else if (e.includes("menurun")) {
    h1 = "Meningkat";
    h2 = "Cukup Meningkat";
    h3 = "Sedang";
    h4 = "Cukup Menurun";
    h5 = "Menurun";
  } else if (e.includes("membaik")) {
    h1 = "Memburuk";
    h2 = "Cukup Memburuk";
    h3 = "Sedang";
    h4 = "Cukup Membaik";
    h5 = "Membaik";
  }

  let html = `<div class="table-responsive" style="overflow-x:auto; margin-top:0.5rem; background:var(--bg-card); border-radius:var(--radius-md); border:1px solid var(--border);">
    <table style="width:100%; border-collapse:collapse; font-size:0.85rem; text-align:center;">
      <thead>
        <tr style="background:var(--bg-alt); border-bottom:1px solid var(--border);">
          <th style="padding:0.75rem; text-align:left; width:35%;">Kriteria Hasil</th>
          <th style="padding:0.75rem; width:45%;">Opsi Skor (1-5)</th>
          <th style="padding:0.75rem; width:20%;">Target</th>
        </tr>
      </thead>
      <tbody>`;

  items.forEach((item, idx) => {
    let text = item.trim();
    text = text.replace(
      /\s+(meningkat|menurun|membaik|memburuk|positif|negatif)(?:\s*\([^\)]*\))?$/i,
      "",
    );
    text = text.trim();
    let id = "slki_" + Date.now() + "_" + idx;

    html += `
        <tr style="border-bottom:1px solid var(--border);" data-kriteria="${text.replace(/"/g, "&quot;")}">
          <td style="padding:0.75rem; text-align:left; font-weight:500;">${text}</td>
          <td style="padding:0.75rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.3rem;">
              <span style="font-size:0.7rem; opacity:0.6;">${h1}</span>
              <div style="display:flex; gap:0.4rem;">
                <input type="radio" name="${id}_cur" value="1" title="${h1}">
                <input type="radio" name="${id}_cur" value="2" title="${h2}">
                <input type="radio" name="${id}_cur" value="3" title="${h3}">
                <input type="radio" name="${id}_cur" value="4" title="${h4}">
                <input type="radio" name="${id}_cur" value="5" title="${h5}">
              </div>
              <span style="font-size:0.7rem; opacity:0.6;">${h5}</span>
            </div>
          </td>
          <td style="padding:0.75rem;">
             <select style="width:100%; font-size:0.8rem; padding:0.2rem; border-radius:4px; border:1px solid var(--border);">
                <option value="5">5 (${h5})</option>
                <option value="4">4 (${h4})</option>
                <option value="3">3 (${h3})</option>
                <option value="2">2 (${h2})</option>
                <option value="1">1 (${h1})</option>
             </select>
          </td>
        </tr>`;
  });

  html += `</tbody></table></div>
  <div style="font-size:0.75rem; opacity:0.7; margin-top:0.5rem; background:var(--bg-alt); padding:0.5rem; border-radius:var(--radius-sm); display:flex; justify-content:space-between;">
    <div><strong>Skor:</strong> 1:${h1} â€” 5:${h5}</div>
    <div style="color:var(--primary); font-weight:600;"><i class="fa-solid fa-circle-info"></i> Pilih Target & Skor Saat Ini</div>
  </div>`;

  return html;
}
function updateTabCounts() {
  const sdki = document.getElementById("countSDKI");
  const slki = document.getElementById("countSLKI");
  const siki = document.getElementById("countSIKI");
  if (sdki) sdki.textContent = diagnosaData.sdki.length;
  if (slki) slki.textContent = diagnosaData.slki.length;
  if (siki) siki.textContent = diagnosaData.siki.length;
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
  const counterEl = document.getElementById("dataCounter");
  if (counterEl) {
    counterEl.textContent = `Ditemukan ${filteredData.length} data`;
  }

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

// === PENGKAJIAN PINTAR LOGIC ===
let hasilPengkajianGlobal = [];

document
  .getElementById("btnProsesPengkajian")
  ?.addEventListener("click", () => {
    // 1. Gather ALL data from form (TTV + Subjektif + Objektif)
    const td = document.getElementById("pkj-td").value.trim();
    const nadi = parseInt(document.getElementById("pkj-nadi").value) || 0;
    const rr = parseInt(document.getElementById("pkj-rr").value) || 0;
    const suhu = parseFloat(document.getElementById("pkj-suhu").value) || 0;
    const spo2 = parseInt(document.getElementById("pkj-spo2").value) || 0;
    const keluhan = document.getElementById("pkj-keluhan").value.toLowerCase();
    const nyeri = parseInt(document.getElementById("pkj-nyeri").value) || 0;
    const lamaKeluhan = document
      .getElementById("pkj-lama")
      .value.toLowerCase()
      .trim();
    const pencetus = document
      .getElementById("pkj-pencetus")
      .value.toLowerCase()
      .trim();
    const luka = document.getElementById("pkj-luka").value;
    const gcsRaw = document.getElementById("pkj-gcs").value.trim();
    const riwayat = document.getElementById("pkj-riwayat").value.toLowerCase();

    // Parse GCS value (accept formats: "15", "E4V5M6", "E4V5M6 (15)")
    let gcsValue = 15;
    if (gcsRaw) {
      const gcsMatch = gcsRaw.match(/\((\d+)\)/);
      if (gcsMatch) {
        gcsValue = parseInt(gcsMatch[1]) || 15;
      } else if (/^\d+$/.test(gcsRaw)) {
        gcsValue = parseInt(gcsRaw) || 15;
      } else {
        const eMatch = gcsRaw.match(/E(\d)/i);
        const vMatch = gcsRaw.match(/V(\d)/i);
        const mMatch = gcsRaw.match(/M(\d)/i);
        if (eMatch && vMatch && mMatch) {
          gcsValue =
            parseInt(eMatch[1]) + parseInt(vMatch[1]) + parseInt(mMatch[1]);
        }
      }
    }

    // Parse TD (sistol/diastol)
    let sistol = 0,
      diastol = 0;
    if (td.includes("/")) {
      sistol = parseInt(td.split("/")[0]) || 0;
      diastol = parseInt(td.split("/")[1]) || 0;
    }

    // Combine all text for keyword fallback
    const allText = `${keluhan} ${pencetus} ${riwayat}`.toLowerCase();

    // Weighted keyword system: { keyword, weight, reason }
    let weightedKeywords = [];

    // ===== TTV RULES (Weight: 3 = High priority from objective data) =====

    // --- Tekanan Darah ---
    if (sistol > 0 && sistol < 90) {
      weightedKeywords.push({
        kw: "hipovolemia",
        w: 3,
        reason: "TD Sistol <90 mmHg (Hipotensi)",
      });
    }
    if (sistol >= 140 || diastol >= 90) {
      weightedKeywords.push({
        kw: "perfusi serebral",
        w: 2,
        reason: `TD ${td} (Hipertensi)`,
      });
      weightedKeywords.push({
        kw: "perfusi miokard",
        w: 1,
        reason: `TD ${td} (Hipertensi)`,
      });
    }
    if (sistol >= 180 || diastol >= 120) {
      weightedKeywords.push({
        kw: "sirkulasi spontan",
        w: 2,
        reason: `TD ${td} (Krisis Hipertensi)`,
      });
    }

    // --- Nadi ---
    if (nadi > 0 && nadi > 120) {
      weightedKeywords.push({
        kw: "hipovolemia",
        w: 2,
        reason: `Nadi ${nadi} x/mnt (Takikardia Berat)`,
      });
      weightedKeywords.push({
        kw: "curah jantung",
        w: 2,
        reason: `Nadi ${nadi} x/mnt (Takikardia)`,
      });
    } else if (nadi > 100) {
      weightedKeywords.push({
        kw: "curah jantung",
        w: 1,
        reason: `Nadi ${nadi} x/mnt (Takikardia Ringan)`,
      });
      weightedKeywords.push({
        kw: "intoleransi aktivitas",
        w: 1,
        reason: `Nadi ${nadi} x/mnt`,
      });
    }
    if (nadi > 0 && nadi < 60) {
      weightedKeywords.push({
        kw: "curah jantung",
        w: 3,
        reason: `Nadi ${nadi} x/mnt (Bradikardia)`,
      });
      weightedKeywords.push({
        kw: "sirkulasi spontan",
        w: 2,
        reason: `Nadi ${nadi} x/mnt (Bradikardia)`,
      });
    }

    // --- RR ---
    if (rr > 0 && (rr > 24 || rr < 12)) {
      weightedKeywords.push({
        kw: "pola napas",
        w: 3,
        reason: `RR ${rr} x/mnt (Abnormal)`,
      });
      weightedKeywords.push({
        kw: "bersihan jalan napas",
        w: 1,
        reason: `RR ${rr} x/mnt`,
      });
    }
    if (rr > 28) {
      weightedKeywords.push({
        kw: "ventilasi spontan",
        w: 2,
        reason: `RR ${rr} x/mnt (Takipnea Berat)`,
      });
    }

    // --- Suhu ---
    if (suhu > 37.5) {
      weightedKeywords.push({
        kw: "hipertermia",
        w: 3,
        reason: `Suhu ${suhu}°C (Demam)`,
      });
      weightedKeywords.push({
        kw: "infeksi",
        w: 2,
        reason: `Suhu ${suhu}°C (Risiko Infeksi)`,
      });
      weightedKeywords.push({
        kw: "termoregulasi",
        w: 1,
        reason: `Suhu ${suhu}°C`,
      });
    }
    if (suhu > 0 && suhu < 36.0) {
      weightedKeywords.push({
        kw: "hipotermia",
        w: 3,
        reason: `Suhu ${suhu}°C (Hipotermia)`,
      });
      weightedKeywords.push({
        kw: "termoregulasi",
        w: 1,
        reason: `Suhu ${suhu}°C`,
      });
    }

    // --- SpO2 ---
    if (spo2 > 0 && spo2 < 90) {
      weightedKeywords.push({
        kw: "pertukaran gas",
        w: 3,
        reason: `SpO2 ${spo2}% (Kritis)`,
      });
      weightedKeywords.push({
        kw: "ventilasi spontan",
        w: 3,
        reason: `SpO2 ${spo2}% (Kritis)`,
      });
      weightedKeywords.push({
        kw: "pola napas",
        w: 2,
        reason: `SpO2 ${spo2}%`,
      });
    } else if (spo2 > 0 && spo2 < 95) {
      weightedKeywords.push({
        kw: "pertukaran gas",
        w: 2,
        reason: `SpO2 ${spo2}% (Ringan)`,
      });
      weightedKeywords.push({
        kw: "perfusi perifer",
        w: 1,
        reason: `SpO2 ${spo2}%`,
      });
    }

    // ===== DATA SUBJEKTIF RULES (Weight: 2 = Medium from patient complaints) =====

    // --- Keluhan Utama ---
    if (keluhan.includes("sesak") || keluhan.includes("napas")) {
      weightedKeywords.push({
        kw: "pola napas",
        w: 2,
        reason: "Keluhan: sesak/napas",
      });
      weightedKeywords.push({
        kw: "bersihan jalan napas",
        w: 1,
        reason: "Keluhan: napas",
      });
    }
    if (keluhan.includes("batuk") || keluhan.includes("dahak")) {
      weightedKeywords.push({
        kw: "bersihan jalan napas",
        w: 3,
        reason: "Keluhan: batuk/dahak",
      });
    }
    if (keluhan.includes("demam") || keluhan.includes("panas")) {
      weightedKeywords.push({
        kw: "hipertermia",
        w: 2,
        reason: "Keluhan: demam/panas",
      });
    }
    if (keluhan.includes("dingin") || keluhan.includes("menggigil")) {
      weightedKeywords.push({
        kw: "hipotermia",
        w: 2,
        reason: "Keluhan: dingin/menggigil",
      });
    }
    if (
      keluhan.includes("nyeri") ||
      keluhan.includes("sakit") ||
      keluhan.includes("cekot") ||
      keluhan.includes("ngilu")
    ) {
      weightedKeywords.push({
        kw: "nyeri",
        w: 3,
        reason: "Keluhan: nyeri/sakit",
      });
    }
    if (nyeri > 0) {
      const nyeriW = nyeri >= 7 ? 3 : nyeri >= 4 ? 2 : 1;
      weightedKeywords.push({
        kw: "nyeri",
        w: nyeriW,
        reason: `Skala Nyeri: ${nyeri}/10`,
      });
    }
    if (keluhan.includes("mual") || keluhan.includes("muntah")) {
      weightedKeywords.push({
        kw: "nausea",
        w: 3,
        reason: "Keluhan: mual/muntah",
      });
    }
    if (
      keluhan.includes("diare") ||
      keluhan.includes("mencret") ||
      keluhan.includes("BAB cair")
    ) {
      weightedKeywords.push({
        kw: "diare",
        w: 3,
        reason: "Keluhan: diare/mencret",
      });
    }
    if (
      keluhan.includes("sembelit") ||
      keluhan.includes("sulit BAB") ||
      keluhan.includes("konstipasi") ||
      keluhan.includes("tidak BAB")
    ) {
      weightedKeywords.push({
        kw: "konstipasi",
        w: 3,
        reason: "Keluhan: sembelit/konstipasi",
      });
    }
    if (
      keluhan.includes("lemas") ||
      keluhan.includes("lelah") ||
      keluhan.includes("lemah") ||
      keluhan.includes("capek") ||
      keluhan.includes("loyo")
    ) {
      weightedKeywords.push({
        kw: "intoleransi aktivitas",
        w: 2,
        reason: "Keluhan: lemas/lelah",
      });
      weightedKeywords.push({
        kw: "keletihan",
        w: 1,
        reason: "Keluhan: lemas/lelah",
      });
    }
    if (
      keluhan.includes("cemas") ||
      keluhan.includes("takut") ||
      keluhan.includes("gelisah") ||
      keluhan.includes("khawatir")
    ) {
      weightedKeywords.push({
        kw: "ansietas",
        w: 3,
        reason: "Keluhan: cemas/takut/gelisah",
      });
    }
    if (
      keluhan.includes("tidur") ||
      keluhan.includes("insomnia") ||
      keluhan.includes("tidak bisa tidur")
    ) {
      weightedKeywords.push({
        kw: "gangguan pola tidur",
        w: 3,
        reason: "Keluhan: gangguan tidur",
      });
    }
    if (keluhan.includes("pusing") || keluhan.includes("vertigo")) {
      weightedKeywords.push({
        kw: "perfusi serebral",
        w: 2,
        reason: "Keluhan: pusing",
      });
      weightedKeywords.push({
        kw: "pertukaran gas",
        w: 1,
        reason: "Keluhan: pusing",
      });
    }
    if (
      keluhan.includes("edema") ||
      keluhan.includes("bengkak") ||
      keluhan.includes("sembab")
    ) {
      weightedKeywords.push({
        kw: "hipervolemia",
        w: 3,
        reason: "Keluhan: edema/bengkak",
      });
    }
    if (
      keluhan.includes("makan") ||
      keluhan.includes("nafsu makan") ||
      keluhan.includes("BB turun") ||
      keluhan.includes("kurus")
    ) {
      weightedKeywords.push({
        kw: "defisit nutrisi",
        w: 3,
        reason: "Keluhan: nafsu makan menurun/BB turun",
      });
    }
    if (
      keluhan.includes("haus") ||
      keluhan.includes("mulut kering") ||
      keluhan.includes("dehidrasi")
    ) {
      weightedKeywords.push({
        kw: "hipovolemia",
        w: 2,
        reason: "Keluhan: haus/mulut kering",
      });
    }
    if (
      keluhan.includes("gerak") ||
      keluhan.includes("jalan") ||
      keluhan.includes("lumpuh") ||
      keluhan.includes("kaku")
    ) {
      weightedKeywords.push({
        kw: "mobilitas fisik",
        w: 3,
        reason: "Keluhan: gangguan gerak",
      });
    }
    if (
      keluhan.includes("BAK") ||
      keluhan.includes("kencing") ||
      keluhan.includes("berkemih")
    ) {
      weightedKeywords.push({
        kw: "eliminasi urin",
        w: 2,
        reason: "Keluhan: gangguan BAK",
      });
    }
    if (
      keluhan.includes("perdarahan") ||
      keluhan.includes("pendarahan") ||
      keluhan.includes("darah")
    ) {
      weightedKeywords.push({
        kw: "hipovolemia",
        w: 2,
        reason: "Keluhan: perdarahan",
      });
      weightedKeywords.push({
        kw: "perdarahan",
        w: 3,
        reason: "Keluhan: perdarahan",
      });
    }
    if (keluhan.includes("bingung") || keluhan.includes("linglung")) {
      weightedKeywords.push({
        kw: "konfusi",
        w: 2,
        reason: "Keluhan: bingung/linglung",
      });
    }
    if (
      keluhan.includes("gula") ||
      keluhan.includes("diabetes") ||
      keluhan.includes("kencing manis")
    ) {
      weightedKeywords.push({
        kw: "glukosa darah",
        w: 2,
        reason: "Keluhan: gula/diabetes",
      });
    }
    if (
      keluhan.includes("menelan") ||
      keluhan.includes("sulit menelan") ||
      keluhan.includes("tersedak")
    ) {
      weightedKeywords.push({
        kw: "menelan",
        w: 3,
        reason: "Keluhan: sulit menelan",
      });
    }
    if (keluhan.includes("jatuh")) {
      weightedKeywords.push({
        kw: "risiko jatuh",
        w: 2,
        reason: "Keluhan: risiko jatuh",
      });
    }

    // --- Lama Keluhan (bisa bedakan akut vs kronis) ---
    let isKronis = false;
    if (lamaKeluhan) {
      const bulanMatch = lamaKeluhan.match(/(\d+)\s*bulan/);
      const tahunMatch = lamaKeluhan.match(/(\d+)\s*tahun/);
      if ((bulanMatch && parseInt(bulanMatch[1]) >= 3) || tahunMatch) {
        isKronis = true;
      }
      if (
        lamaKeluhan.includes("lama") ||
        lamaKeluhan.includes("kronis") ||
        lamaKeluhan.includes("menahun")
      ) {
        isKronis = true;
      }
    }

    // --- Faktor Pencetus ---
    if (pencetus) {
      if (
        pencetus.includes("operasi") ||
        pencetus.includes("bedah") ||
        pencetus.includes("post op")
      ) {
        weightedKeywords.push({
          kw: "infeksi",
          w: 2,
          reason: "Pencetus: pasca operasi",
        });
        weightedKeywords.push({
          kw: "integritas kulit",
          w: 1,
          reason: "Pencetus: pasca operasi",
        });
        weightedKeywords.push({
          kw: "nyeri",
          w: 1,
          reason: "Pencetus: pasca operasi",
        });
      }
      if (
        pencetus.includes("trauma") ||
        pencetus.includes("kecelakaan") ||
        pencetus.includes("jatuh")
      ) {
        weightedKeywords.push({
          kw: "nyeri",
          w: 2,
          reason: "Pencetus: trauma",
        });
        weightedKeywords.push({
          kw: "mobilitas fisik",
          w: 1,
          reason: "Pencetus: trauma",
        });
        weightedKeywords.push({
          kw: "perdarahan",
          w: 1,
          reason: "Pencetus: trauma",
        });
      }
      if (pencetus.includes("stres") || pencetus.includes("tekanan")) {
        weightedKeywords.push({
          kw: "ansietas",
          w: 1,
          reason: "Pencetus: stres",
        });
      }
      if (pencetus.includes("makanan") || pencetus.includes("makan")) {
        weightedKeywords.push({
          kw: "nausea",
          w: 1,
          reason: "Pencetus: makanan",
        });
        weightedKeywords.push({
          kw: "diare",
          w: 1,
          reason: "Pencetus: makanan",
        });
      }
    }

    // ===== DATA OBJEKTIF RULES (Weight: 2-3 = objective clinical findings) =====

    // --- GCS ---
    if (gcsRaw && gcsValue < 15) {
      if (gcsValue <= 8) {
        weightedKeywords.push({
          kw: "perfusi serebral",
          w: 3,
          reason: `GCS ${gcsValue} (Koma/Berat)`,
        });
        weightedKeywords.push({
          kw: "kapasitas adaptif intrakranial",
          w: 3,
          reason: `GCS ${gcsValue}`,
        });
        weightedKeywords.push({
          kw: "risiko aspirasi",
          w: 3,
          reason: `GCS ${gcsValue} (Penurunan Kesadaran)`,
        });
        weightedKeywords.push({
          kw: "ventilasi spontan",
          w: 2,
          reason: `GCS ${gcsValue}`,
        });
      } else if (gcsValue <= 12) {
        weightedKeywords.push({
          kw: "perfusi serebral",
          w: 3,
          reason: `GCS ${gcsValue} (Sedang)`,
        });
        weightedKeywords.push({
          kw: "konfusi",
          w: 2,
          reason: `GCS ${gcsValue}`,
        });
        weightedKeywords.push({
          kw: "risiko aspirasi",
          w: 2,
          reason: `GCS ${gcsValue}`,
        });
        weightedKeywords.push({
          kw: "risiko jatuh",
          w: 2,
          reason: `GCS ${gcsValue}`,
        });
      } else {
        weightedKeywords.push({
          kw: "perfusi serebral",
          w: 1,
          reason: `GCS ${gcsValue} (Ringan)`,
        });
        weightedKeywords.push({
          kw: "konfusi",
          w: 1,
          reason: `GCS ${gcsValue}`,
        });
      }
    }

    // --- Luka ---
    if (luka !== "Tidak Ada Luka") {
      weightedKeywords.push({
        kw: "integritas kulit",
        w: 3,
        reason: `Luka: ${luka}`,
      });
      weightedKeywords.push({
        kw: "infeksi",
        w: 2,
        reason: `Luka: ${luka} (Risiko Infeksi)`,
      });
      weightedKeywords.push({ kw: "nyeri", w: 1, reason: `Luka: ${luka}` });
      if (luka === "Luka Dekubitus") {
        weightedKeywords.push({
          kw: "luka tekan",
          w: 3,
          reason: "Luka Dekubitus",
        });
        weightedKeywords.push({
          kw: "mobilitas fisik",
          w: 1,
          reason: "Luka Dekubitus → immobil",
        });
      }
      if (luka === "Luka Bakar") {
        weightedKeywords.push({
          kw: "hipovolemia",
          w: 2,
          reason: "Luka Bakar → risiko hipovolemia",
        });
      }
    }

    // --- Riwayat Penyakit ---
    if (riwayat) {
      if (
        riwayat.includes("dm") ||
        riwayat.includes("diabetes") ||
        riwayat.includes("kencing manis") ||
        riwayat.includes("gula")
      ) {
        weightedKeywords.push({
          kw: "glukosa darah",
          w: 2,
          reason: "Riwayat: Diabetes Mellitus",
        });
        weightedKeywords.push({
          kw: "perfusi perifer",
          w: 1,
          reason: "Riwayat: DM → perfusi",
        });
        weightedKeywords.push({
          kw: "infeksi",
          w: 1,
          reason: "Riwayat: DM → risiko infeksi",
        });
      }
      if (
        riwayat.includes("ht") ||
        riwayat.includes("hipertensi") ||
        riwayat.includes("darah tinggi") ||
        riwayat.includes("tensi tinggi")
      ) {
        weightedKeywords.push({
          kw: "perfusi serebral",
          w: 2,
          reason: "Riwayat: Hipertensi",
        });
        weightedKeywords.push({
          kw: "perfusi miokard",
          w: 1,
          reason: "Riwayat: Hipertensi",
        });
      }
      if (
        riwayat.includes("jantung") ||
        riwayat.includes("chf") ||
        riwayat.includes("gagal jantung") ||
        riwayat.includes("pjk")
      ) {
        weightedKeywords.push({
          kw: "curah jantung",
          w: 2,
          reason: "Riwayat: Penyakit Jantung",
        });
        weightedKeywords.push({
          kw: "intoleransi aktivitas",
          w: 1,
          reason: "Riwayat: Penyakit Jantung",
        });
      }
      if (
        riwayat.includes("asma") ||
        riwayat.includes("ppok") ||
        riwayat.includes("tb") ||
        riwayat.includes("paru")
      ) {
        weightedKeywords.push({
          kw: "pola napas",
          w: 2,
          reason: "Riwayat: Penyakit Paru",
        });
        weightedKeywords.push({
          kw: "bersihan jalan napas",
          w: 1,
          reason: "Riwayat: Penyakit Paru",
        });
      }
      if (riwayat.includes("stroke") || riwayat.includes("cerebral")) {
        weightedKeywords.push({
          kw: "perfusi serebral",
          w: 2,
          reason: "Riwayat: Stroke",
        });
        weightedKeywords.push({
          kw: "mobilitas fisik",
          w: 1,
          reason: "Riwayat: Stroke",
        });
      }
      if (
        riwayat.includes("ginjal") ||
        riwayat.includes("ckd") ||
        riwayat.includes("gagal ginjal")
      ) {
        weightedKeywords.push({
          kw: "hipervolemia",
          w: 1,
          reason: "Riwayat: Penyakit Ginjal",
        });
        weightedKeywords.push({
          kw: "eliminasi urin",
          w: 1,
          reason: "Riwayat: Penyakit Ginjal",
        });
      }
      if (
        riwayat.includes("kanker") ||
        riwayat.includes("tumor") ||
        riwayat.includes("ca ")
      ) {
        weightedKeywords.push({ kw: "nyeri", w: 1, reason: "Riwayat: Kanker" });
        weightedKeywords.push({
          kw: "defisit nutrisi",
          w: 1,
          reason: "Riwayat: Kanker",
        });
      }
    }

    // Fallback: if absolutely no weighted keywords matched, parse keluhan words
    if (weightedKeywords.length === 0) {
      if (keluhan.length > 3) {
        let words = keluhan.split(" ").filter((w) => w.length > 3);
        words.forEach((w) =>
          weightedKeywords.push({ kw: w, w: 1, reason: "Kata kunci keluhan" }),
        );
      } else {
        showToast(
          "Harap isi minimal keluhan utama, TTV, atau data objektif pasien",
          "warning",
        );
        return;
      }
    }

    // 2. Search in SDKI Database with weighted scoring
    const btn = document.getElementById("btnProsesPengkajian");
    btn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Menganalisis...';
    btn.disabled = true;

    setTimeout(() => {
      let results = [];
      const sdkiData = diagnosaData.sdki || [];

      sdkiData.forEach((item) => {
        let score = 0;
        let matchedReasons = [];
        const namaLower = item.Nama.toLowerCase();
        const targetText =
          `${item.Nama} ${item.Definisi} ${item.Penyebab} ${item["Gejala Mayor"]} ${item["Gejala Minor"]} ${item["Kondisi Klinis Terkait"] || ""}`.toLowerCase();

        // Check if this is a risk diagnosis (diagnosa risiko)
        const isRisk =
          namaLower.startsWith("risiko") || namaLower.startsWith("kesiapan");

        weightedKeywords.forEach(({ kw, w, reason }) => {
          if (targetText.includes(kw)) {
            if (namaLower.includes(kw)) {
              // Direct name match = highest relevance
              score += w * 3;
              matchedReasons.push(reason);
            } else if (
              item.Definisi &&
              item.Definisi.toLowerCase().includes(kw)
            ) {
              // Definition match = high relevance
              score += w * 2;
              matchedReasons.push(reason);
            } else {
              // Content match
              score += w;
              matchedReasons.push(reason);
            }
          }
        });

        // Bonus: differentiate Nyeri Akut vs Kronis
        if (score > 0 && namaLower.includes("nyeri")) {
          if (isKronis && namaLower.includes("kronis")) {
            score += 5;
          } else if (!isKronis && namaLower.includes("akut")) {
            score += 5;
          }
        }

        // Penalty: reduce score for risk diagnoses (prefer actual diagnoses)
        if (isRisk && score > 0) {
          score = Math.ceil(score * 0.6);
        }

        if (score > 0) {
          // Deduplicate reasons
          matchedReasons = [...new Set(matchedReasons)];
          results.push({ item, score, reasons: matchedReasons });
        }
      });

      // Sort by score descending
      results.sort((a, b) => b.score - a.score);
      const topResults = results.slice(0, 7); // Top 7 for wider coverage
      hasilPengkajianGlobal = topResults.map((r) => r.item);

      renderHasilPengkajian(topResults);

      btn.innerHTML =
        '<i class="fa-solid fa-wand-magic-sparkles"></i> Analisis Otomatis (SDKI-SIKI-SLKI)';
      btn.disabled = false;
    }, 800);
  });

function renderHasilPengkajian(data) {
  const resDiv = document.getElementById("pengkajianResult");
  const resList = document.getElementById("pengkajianResultList");

  resList.innerHTML = "";

  if (!data || data.length === 0) {
    resList.innerHTML = `
            <div class="empty-state" style="padding: 2rem;">
                <div class="empty-icon"><i class="fa-solid fa-robot"></i></div>
                <h3 style="font-size:1.1rem">Tidak ada diagnosa spesifik yang terdeteksi</h3>
                <p>Coba tuliskan keluhan dengan kata kunci medis atau lebih detail (contoh: batuk berdahak, demam, nyeri akut).</p>
            </div>
        `;
  } else {
    data.forEach((entry, idx) => {
      const item = entry.item || entry;
      const reasons = entry.reasons || [];
      const score = entry.score || 0;
      const cat = CODE_TO_CAT[item.Kode];
      const isRisk =
        item.Nama.toLowerCase().startsWith("risiko") ||
        item.Nama.toLowerCase().startsWith("kesiapan");

      // Find related SLKI & SIKI
      const relatedSLKI = (diagnosaData.slki || [])
        .filter(
          (s) =>
            s["Tautan Diagnosa"] && s["Tautan Diagnosa"].includes(item.Kode),
        )
        .slice(0, 3);
      const relatedSIKI = (diagnosaData.siki || [])
        .filter(
          (s) =>
            s["Tautan Diagnosa"] && s["Tautan Diagnosa"].includes(item.Kode),
        )
        .slice(0, 3);

      // Reason tags HTML
      const reasonsHTML =
        reasons.length > 0
          ? `<div style="display:flex; flex-wrap:wrap; gap:0.3rem; margin-top:0.5rem;">
            ${reasons
              .slice(0, 4)
              .map(
                (r) =>
                  `<span style="font-size:0.7rem; background:rgba(var(--primary-rgb),0.1); color:var(--primary); padding:0.15rem 0.5rem; border-radius:999px; font-weight:500;"><i class="fa-solid fa-check" style="font-size:0.6rem;"></i> ${r}</span>`,
              )
              .join("")}
           </div>`
          : "";

      // Related SLKI/SIKI HTML
      let triadHTML = "";
      if (relatedSLKI.length > 0 || relatedSIKI.length > 0) {
        triadHTML = `<div style="margin-top:0.6rem; padding-top:0.6rem; border-top:1px dashed var(--border); display:flex; flex-wrap:wrap; gap:0.4rem;">`;
        relatedSLKI.forEach((s) => {
          triadHTML += `<span style="font-size:0.7rem; background:rgba(16,185,129,0.1); color:#10b981; padding:0.2rem 0.5rem; border-radius:var(--radius-sm); cursor:pointer; font-weight:500;" onclick="event.stopPropagation(); openModalFallbackTriad('${s.Kode}','slki')" title="${s.Nama}"><i class="fa-solid fa-bullseye"></i> ${s.Kode}</span>`;
        });
        relatedSIKI.forEach((s) => {
          triadHTML += `<span style="font-size:0.7rem; background:rgba(99,102,241,0.1); color:#6366f1; padding:0.2rem 0.5rem; border-radius:var(--radius-sm); cursor:pointer; font-weight:500;" onclick="event.stopPropagation(); openModalFallbackTriad('${s.Kode}','siki')" title="${s.Nama}"><i class="fa-solid fa-hand-holding-medical"></i> ${s.Kode}</span>`;
        });
        triadHTML += `</div>`;
      }

      resList.innerHTML += `
                <div class="askep-card" style="display:flex; justify-content:space-between; align-items:flex-start; ${isRisk ? "opacity:0.85; border-left:3px solid var(--amber);" : "border-left:3px solid var(--primary);"}">
                    <div style="flex:1; min-width:0;">
                        <div style="margin-bottom:0.4rem; display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                            <span class="badge" style="background:${cat ? cat.color : "var(--primary)"}">${item.Kode}</span>
                            ${cat ? `<span style="font-size:0.75rem; color:var(--text-secondary); font-weight:600;"><i class="fa-solid ${cat.icon}"></i> ${cat.name}</span>` : ""}
                            ${isRisk ? '<span style="font-size:0.65rem; background:var(--amber); color:white; padding:0.1rem 0.4rem; border-radius:999px; font-weight:600;">RISIKO</span>' : '<span style="font-size:0.65rem; background:var(--primary); color:white; padding:0.1rem 0.4rem; border-radius:999px; font-weight:600;">AKTUAL</span>'}
                            <span style="font-size:0.65rem; color:var(--text-muted); margin-left:auto;">Skor: ${score}</span>
                        </div>
                        <h4 style="margin:0 0 0.3rem; font-size:1rem; color:var(--text-primary); cursor:pointer;" onclick="openModalFallback('${item.Kode}')">${item.Nama}</h4>
                        <p style="font-size:0.82rem; color:var(--text-secondary); margin:0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${item.Definisi}</p>
                        ${reasonsHTML}
                        ${triadHTML}
                    </div>
                    <button class="btn btn-primary" style="padding:0.4rem 0.6rem; font-size:0.8rem; flex-shrink:0; margin-left:0.75rem;" onclick="addToAskepByKode('${item.Kode}', 'sdki')"><i class="fa-solid fa-plus"></i></button>
                </div>
            `;
    });
  }

  resDiv.classList.remove("hidden");
  resDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function openModalFallbackTriad(kode, mode) {
  closeModalEl(document.getElementById("pengkajianModal"));
  setTimeout(() => {
    let d = (diagnosaData[mode] || []).find((x) => x.Kode === kode);
    if (d) openModal(d, mode);
  }, 300);
}

function openModalFallback(kode) {
  // If the modal was behind, close it and open normal modal.
  closeModalEl(document.getElementById("pengkajianModal"));
  setTimeout(() => {
    let d = diagnosaData.sdki.find((x) => x.Kode === kode);
    if (d) openModal(d, "sdki");
  }, 300);
}

function salinKeAskep() {
  if (hasilPengkajianGlobal.length === 0) return;
  let added = 0;
  hasilPengkajianGlobal.forEach((d) => {
    const found = askepBasket.find((a) => a.Kode === d.Kode);
    if (!found) {
      askepBasket.push({ ...d, mode: "sdki" });
      added++;
    }
  });

  if (added > 0) {
    localStorage.setItem("esdki_askep", JSON.stringify(askepBasket));
    updateAskepCounter();
    showToast(`${added} diagnosa ditambahkan ke ASKEP`, "success");
  } else {
    showToast(`Diagnosa sudah ada di ASKEP`, "info");
  }
}

function addToAskepByKode(kode, mode) {
  let d = diagnosaData[mode].find((x) => x.Kode === kode);
  if (d) {
    const found = askepBasket.find((a) => a.Kode === kode);
    if (!found) {
      askepBasket.push({ ...d, mode: mode });
      localStorage.setItem("esdki_askep", JSON.stringify(askepBasket));
      updateAskepCounter();
      showToast(`${d.Kode} ditambahkan ke ASKEP`, "success");
    } else {
      showToast(`${kode} sudah ada di ASKEP`, "info");
    }
  }
}

// === MEDICAL CALCULATOR LOGIC ===

function renderSOP() {
  const container = document.getElementById("sopList");
  const data =
    window.SOP_DATA || (typeof SOP_DATA !== "undefined" ? SOP_DATA : null);

  if (!container || !data) {
    console.error("SOP Container or Data not found", { container, data });
    return;
  }

  container.innerHTML = "";

  const grouped = {};
  data.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  const catNames = {
    kmb: "Keperawatan Medikal Bedah (KMB)",
    anak: "Keperawatan Anak",
    maternitas: "Keperawatan Maternitas",
    jiwa: "Keperawatan Jiwa",
    gadar: "Gawat Darurat (GADAR)",
  };

  const catColors = {
    kmb: "var(--primary)",
    anak: "var(--emerald)",
    maternitas: "#db2777",
    jiwa: "var(--purple)",
    gadar: "var(--rose)",
  };

  Object.keys(grouped).forEach((cat) => {
    const header = document.createElement("div");
    header.className = "sop-category-header";
    header.setAttribute("data-category", cat);
    header.style.cssText = `font-weight: 700; color: ${catColors[cat] || "var(--primary)"}; margin: 1.5rem 0 0.8rem 0; font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 2px solid ${catColors[cat] || "var(--primary)"}; padding-bottom: 0.3rem;`;
    header.textContent = catNames[cat] || cat.toUpperCase();
    container.appendChild(header);

    grouped[cat].forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.className = "guide-item sop-item";
      itemEl.setAttribute("data-category", cat);

      const stepsHtml = item.steps.map((step) => `<li>${step}</li>`).join("");

      itemEl.innerHTML = `
        <div class="guide-header" onclick="this.nextElementSibling.classList.toggle('hidden')" style="cursor:pointer;">
            <i class="fa-solid ${item.icon} text-${item.color}"></i> ${item.name} 
            <i class="fa-solid fa-chevron-down" style="margin-left:auto; font-size:0.8rem; opacity:0.5;"></i>
        </div>
        <div class="guide-content hidden" style="margin-top:1rem;">
            <p><strong>Alat/Bahan:</strong> ${item.tools}</p>
            <ol style="margin-left:2rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.5;">
                ${stepsHtml}
            </ol>
        </div>
      `;
      container.appendChild(itemEl);
    });
  });

  // Ensure default state
  filterSOPByCategory("all");
}

// === MEDICAL CALCULATOR LOGIC ===

function filterSOP() {
  const input = document.getElementById("sopSearch").value.toLowerCase();
  const items = document.querySelectorAll(".sop-item");
  const headers = document.querySelectorAll(".sop-category-header");

  items.forEach((item) => {
    const text = item.querySelector(".guide-header").textContent.toLowerCase();
    if (text.includes(input)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  // Hide headers if no items in that category are visible
  headers.forEach((header) => {
    const category = header.getAttribute("data-category");
    const visibleItems = document.querySelectorAll(
      `.sop-item[data-category="${category}"]`,
    );
    let hasVisible = false;
    visibleItems.forEach((vi) => {
      if (vi.style.display !== "none") hasVisible = true;
    });
    header.style.display = hasVisible ? "block" : "none";
  });
}

function filterSOPByCategory(cat) {
  const items = document.querySelectorAll(".sop-item");
  const headers = document.querySelectorAll(".sop-category-header");
  const buttons = document.querySelectorAll(".sop-categories button");

  // Update active button style
  buttons.forEach((btn) => {
    if (btn.getAttribute("onclick").includes(`'${cat}'`)) {
      btn.style.background = "var(--primary)";
      btn.style.color = "white";
    } else {
      btn.style.background = "var(--bg-alt)";
      btn.style.color = "var(--text-primary)";
    }
  });

  items.forEach((item) => {
    if (cat === "all" || item.getAttribute("data-category") === cat) {
      item.setAttribute("data-visible-cat", "true");
    } else {
      item.setAttribute("data-visible-cat", "false");
    }
  });

  headers.forEach((header) => {
    if (cat === "all" || header.getAttribute("data-category") === cat) {
      header.style.display = "block";
    } else {
      header.style.display = "none";
    }
  });

  // Re-apply search filter logic
  items.forEach((item) => {
    const isCatVisible = item.getAttribute("data-visible-cat") === "true";
    const searchText = item
      .querySelector(".guide-header")
      .textContent.toLowerCase();
    const input = document.getElementById("sopSearch").value.toLowerCase();

    if (isCatVisible && searchText.includes(input)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function filterEdu() {
  const input = document.getElementById("eduSearch").value.toLowerCase();
  const items = document.querySelectorAll(".edu-item");

  items.forEach((item) => {
    const text = item.querySelector(".guide-header").textContent.toLowerCase();
    if (text.includes(input)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// --- GFR Calculator ---

// --- HPL Calculator ---

// === VOICE OVER SYSTEM ===
let activeVoiceIcon = null;
let currentVoiceText = "";

function speakContent(text, iconEl) {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    if (activeVoiceIcon) {
      activeVoiceIcon.classList.remove("fa-stop-circle", "fa-pulse");
      activeVoiceIcon.classList.add("fa-volume-high");
    }
    if (currentVoiceText === text) {
      currentVoiceText = "";
      return;
    }
  }

  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  utterance.rate = 1.0;
  currentVoiceText = text;

  utterance.onstart = () => {
    if (iconEl) {
      iconEl.classList.remove("fa-volume-high");
      iconEl.classList.add("fa-stop-circle", "fa-pulse");
      activeVoiceIcon = iconEl;
    }
  };
  utterance.onend = () => {
    if (iconEl) {
      iconEl.classList.remove("fa-stop-circle", "fa-pulse");
      iconEl.classList.add("fa-volume-high");
    }
    activeVoiceIcon = null;
    currentVoiceText = "";
  };

  window.speechSynthesis.speak(utterance);
}

function handleModalVoice() {
  if (!currentModalItem || !currentModalMode) return;
  const icon = document.getElementById("modalVoiceIcon");

  let textToSpeak = `${currentModalItem.Nama}. Kode ${currentModalItem.Kode.split("").join(" ")}. `;

  if (currentModalMode === "sdki") {
    textToSpeak += `Definisi: ${currentModalItem.Definisi || ""}. `;
    if (currentModalItem.Penyebab)
      textToSpeak += `Penyebab: ${currentModalItem.Penyebab}. `;
    if (currentModalItem["Gejala Mayor"])
      textToSpeak += `Gejala Mayor: ${currentModalItem["Gejala Mayor"]}. `;
  } else if (currentModalMode === "siki") {
    if (currentModalItem.Observasi)
      textToSpeak += `Observasi: ${currentModalItem.Observasi}. `;
    if (currentModalItem.Terapeutik)
      textToSpeak += `Terapeutik: ${currentModalItem.Terapeutik}. `;
    if (currentModalItem.Edukasi)
      textToSpeak += `Edukasi: ${currentModalItem.Edukasi}. `;
    if (currentModalItem.Kolaborasi)
      textToSpeak += `Kolaborasi: ${currentModalItem.Kolaborasi}. `;
  } else if (currentModalMode === "slki") {
    textToSpeak += `Definisi: ${currentModalItem.Definisi || ""}. `;
    textToSpeak += `Ekspektasi: ${currentModalItem.Ekspektasi || ""}. `;
    if (currentModalItem["Kriteria Hasil"])
      textToSpeak += `Kriteria Hasil: ${currentModalItem["Kriteria Hasil"]}. `;
  }

  // Clean HTML tags
  textToSpeak = textToSpeak.replace(/<[^>]*>?/gm, " ");
  speakContent(textToSpeak, icon);
}

function handleGlossaryVoice(btn, term, def) {
  const icon = btn.querySelector("i");
  speakContent(`${term}. ${def}`, icon);
}

// Global function for SOP and Edukasi Voice
window.speakGuideItem = function (btn) {
  const header = btn.parentElement;
  const title = header.firstChild.textContent.trim();
  const content = header.nextElementSibling
    ? header.nextElementSibling.innerText.trim()
    : "";
  const icon = btn.querySelector("i");
  speakContent(`${title}. ${content}`, icon);
};

// Initialize Voice Buttons for Hardcoded sections
document.addEventListener("DOMContentLoaded", () => {
  renderSOP();

  setTimeout(() => {
    document.querySelectorAll(".guide-header").forEach((header) => {
      if (!header.querySelector(".voice-btn-mini")) {
        const btn = document.createElement("button");
        btn.className = "voice-btn-mini";
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        btn.style.marginLeft = "auto";
        btn.style.marginRight = "0.5rem";
        btn.style.background = "rgba(var(--primary-rgb), 0.1)";
        btn.style.border = "none";
        btn.style.fontSize = "0.8rem";
        btn.style.padding = "0.4rem";
        btn.style.borderRadius = "50%";
        btn.style.cursor = "pointer";
        btn.style.color = "var(--primary)";
        btn.setAttribute(
          "onclick",
          "event.stopPropagation(); speakGuideItem(this)",
        );

        // Find the chevron and insert before it
        const chevron = header.querySelector(".fa-chevron-down");
        if (chevron) {
          header.insertBefore(btn, chevron);
        } else {
          header.appendChild(btn);
        }
      }
    });
  }, 1000);
});

// === PENYAKIT FEATURE ===
