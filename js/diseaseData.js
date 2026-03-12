// === PENYAKIT FEATURE ===
function renderPenyakit() {
  let savedBookmarks = [];
  try {
    savedBookmarks =
      JSON.parse(localStorage.getItem("esdki_penyakit_bookmarks")) || [];
  } catch (e) {}

  // Hitung jumlah per kategori
  const counts = {
    all: PENYAKIT_DATA.length,
    KMB: PENYAKIT_DATA.filter((p) => p.kategori === "KMB").length,
    Maternitas: PENYAKIT_DATA.filter((p) => p.kategori === "Maternitas").length,
    Anak: PENYAKIT_DATA.filter((p) => p.kategori === "Anak").length,
    Jiwa: PENYAKIT_DATA.filter((p) => p.kategori === "Jiwa").length,
    Tropis: PENYAKIT_DATA.filter((p) => p.kategori === "Tropis").length,
    Bookmark: savedBookmarks.length,
  };

  // Update button text dengan jumlah
  const filterBtns = document.querySelectorAll(
    "#penyakitModal .penyakit-categories .btn",
  );
  filterBtns.forEach((btn) => {
    const onclickAttr = btn.getAttribute("onclick") || "";
    if (onclickAttr.includes("'all'"))
      btn.innerHTML = `Semua <span style="font-size:0.7em; opacity:0.6; margin-left:3px;">(${counts.all})</span>`;
    else if (onclickAttr.includes("'KMB'"))
      btn.innerHTML = `KMB <span style="font-size:0.7em; opacity:0.6; margin-left:3px;">(${counts.KMB})</span>`;
    else if (onclickAttr.includes("'Maternitas'"))
      btn.innerHTML = `Maternitas <span style="font-size:0.7em; opacity:0.6; margin-left:3px;">(${counts.Maternitas})</span>`;
    else if (onclickAttr.includes("'Anak'"))
      btn.innerHTML = `Anak <span style="font-size:0.7em; opacity:0.6; margin-left:3px;">(${counts.Anak})</span>`;
    else if (onclickAttr.includes("'Jiwa'"))
      btn.innerHTML = `Jiwa <span style="font-size:0.7em; opacity:0.6; margin-left:3px;">(${counts.Jiwa})</span>`;
    else if (onclickAttr.includes("'Tropis'"))
      btn.innerHTML = `Tropis <span style="font-size:0.7em; opacity:0.6; margin-left:3px;">(${counts.Tropis})</span>`;
  });

  // Check if bookmark button exists, if not, append one
  const categoryContainer = document.querySelector(
    "#penyakitModal .penyakit-categories",
  );
  if (
    categoryContainer &&
    !document.querySelector("#btnFilterBookmarkPenyakit")
  ) {
    const bmBtn = document.createElement("button");
    bmBtn.className = "btn btn-outline btn-sm";
    bmBtn.id = "btnFilterBookmarkPenyakit";
    bmBtn.setAttribute("onclick", "filterPenyakitByCategory('Bookmark', this)");
    categoryContainer.appendChild(bmBtn);
  }
  const bmBtnEl = document.querySelector("#btnFilterBookmarkPenyakit");
  if (bmBtnEl) {
    bmBtnEl.innerHTML = `<i class="fa-solid fa-star" style="color:#fbbf24;"></i> Tersimpan <span style="font-size:0.7em; opacity:0.6; margin-left:3px;">(${counts.Bookmark})</span>`;
  }

  const container = document.getElementById("penyakitContainer");
  if (!container) return;
  container.innerHTML = "";

  if (PENYAKIT_DATA.length === 0) {
    container.innerHTML =
      "<p class='empty-msg'>Data penyakit tidak tersedia.</p>";
    return;
  }

  PENYAKIT_DATA.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "penyakit-card-custom";
    card.setAttribute("data-category", p.kategori || "all");
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.8rem;">
        <div>
          <div class="penyakit-name" style="font-size:1.1rem; color:var(--primary);"><i class="fa-solid fa-heart-pulse"></i> ${p.nama}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.3rem;">${p.detail?.definisi?.substring(0, 80)}...</div>
        </div>
        <span style="font-size:0.6rem; background:var(--primary-bg); color:var(--primary); padding:0.3rem 0.6rem; border-radius:6px; font-weight:700; text-transform:uppercase;">${p.kategori || ""}</span>
      </div>
      
      <button class="btn btn-sm" onclick="showPenyakitDetail(${idx})" style="width:100%; margin-bottom:1rem; background:var(--bg-alt); color:var(--primary); border:1px dashed var(--primary);"><i class="fa-solid fa-circle-info"></i> Lihat Detail Klinis Lengkap</button>

      <div class="penyakit-diag-list" style="border-top: 1px solid var(--glass-border); padding-top: 0.8rem;">
        <div style="font-size:0.75rem; font-weight:600; margin-bottom:0.5rem; color:var(--text-primary);"><i class="fa-solid fa-stethoscope"></i> Diagnosa SDKI Terkait:</div>
        ${p.diagnosa
          .map(
            (d) =>
              `<span class="penyakit-diag-item" onclick="event.stopPropagation(); findAndOpenSDKIByCode('${d.kode}')" title="Klik untuk lihat detail SDKI"><strong>${d.kode}</strong> ${d.nama}</span>`,
          )
          .join("")}
      </div>
    `;
    container.appendChild(card);
  });
}

function filterPenyakitByCategory(cat, btn) {
  // Update Buttons UI
  const btns = document.querySelectorAll(".penyakit-categories .btn");
  btns.forEach((b) => {
    b.style.background = "var(--bg-alt)";
    b.style.color = "var(--text-primary)";
  });
  btn.style.background = "var(--primary)";
  btn.style.color = "white";

  window.currentPenyakitCategory = cat;
  filterPenyakit();
}

function filterPenyakit() {
  const term = document
    .getElementById("penyakitSearchInput")
    .value.toLowerCase()
    .trim();
  const cat = window.currentPenyakitCategory || "all";
  const container = document.getElementById("penyakitContainer");
  const cards = container.querySelectorAll(".penyakit-card-custom");

  cards.forEach((card) => {
    const name = card.querySelector(".penyakit-name").textContent.toLowerCase();
    const diags = card
      .querySelector(".penyakit-diag-list")
      .textContent.toLowerCase();
    const cardCat = card.getAttribute("data-category");

    const matchSearches = name.includes(term) || diags.includes(term);
    let matchCat = false;

    if (cat === "all") {
      matchCat = true;
    } else if (cat === "Bookmark") {
      let saved = [];
      try {
        saved =
          JSON.parse(localStorage.getItem("esdki_penyakit_bookmarks")) || [];
      } catch (e) {}
      matchCat = saved.includes(
        card
          .querySelector(".penyakit-name")
          .textContent.replace(" ", "")
          .trim(),
      );
    } else {
      matchCat = cardCat === cat;
    }

    if (matchSearches && matchCat) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

function findAndOpenSDKIByCode(kode) {
  const match = diagnosaData.sdki.find((s) => s.Kode === kode);
  if (match) {
    closeModalEl(document.getElementById("penyakitModal"));
    openModal(match, "sdki");
  } else {
    showToast("Diagnosa detail tidak ditemukan", "warning");
  }
}

window.showPenyakitDetail = function (idx) {
  const p = PENYAKIT_DATA[idx];
  if (!p || !p.detail) return;

  const modal = document.getElementById("penyakitDetailModal");
  if (!modal) return;

  // Set Category Theme
  modal.setAttribute("data-category", p.kategori || "KMB");

  // Update Hero & Title
  document.getElementById("penyakitDetailCategory").textContent =
    p.kategori || "KMB";

  let savedBM = [];
  try {
    savedBM =
      JSON.parse(localStorage.getItem("esdki_penyakit_bookmarks")) || [];
  } catch (e) {}
  const pNameTrim = p.nama.replace(" ", "").trim();
  const isBookmarked = savedBM.includes(pNameTrim);
  const bmIcon = isBookmarked
    ? '<i class="fa-solid fa-star" style="color:#fbbf24;"></i>'
    : '<i class="fa-regular fa-star"></i>';

  document.getElementById("penyakitDetailTitle").innerHTML =
    `<div style="display:flex; justify-content:space-between; align-items:center;">
       <span><i class="fa-solid fa-file-medical"></i> ${p.nama}</span>
       <button id="btnTogglePenyakitBookmark" class="btn btn-sm btn-outline" style="border:none; background:transparent; font-size:1.5rem;" onclick="togglePenyakitBookmark('${p.nama}')" title="Simpan sebagai referensi">
         ${bmIcon}
       </button>
     </div>`;

  // Update Body Content
  document.getElementById("penyakitDefinisi").innerHTML =
    p.detail.definisi || "-";
  document.getElementById("penyakitEtiologi").innerHTML =
    p.detail.etiologi || "-";
  document.getElementById("penyakitPatofisiologi").innerHTML =
    p.detail.patofisiologi || "Data patofisiologi belum tersedia.";
  document.getElementById("penyakitManifestasi").innerHTML =
    p.detail.manifestasi || "-";
  document.getElementById("penyakitPemeriksaan").innerHTML =
    p.detail.pemeriksaan || "-";
  document.getElementById("penyakitPenatalaksanaan").innerHTML =
    p.detail.penatalaksanaan || "-";
  document.getElementById("penyakitDischarge").innerHTML =
    p.detail.discharge_planning || "-";
  document.getElementById("penyakitKeperawatan").innerHTML =
    p.detail.masalah_keperawatan || "Data belum tersedia.";

  // Update SDKI List
  const diagContainer = document.getElementById("penyakitDiagListFull");
  diagContainer.innerHTML = "";
  if (p.diagnosa && p.diagnosa.length > 0) {
    p.diagnosa.forEach((d) => {
      const pill = document.createElement("div");
      pill.className = "diag-pill-premium";
      pill.innerHTML = `<i class="fa-solid fa-stethoscope"></i> <strong>${d.kode}</strong> ${d.nama}`;
      pill.onclick = () => {
        closeModalEl(modal);
        findAndOpenSDKIByCode(d.kode);
      };
      diagContainer.appendChild(pill);
    });
  } else {
    diagContainer.innerHTML =
      "<span style='color:var(--text-muted); font-style:italic;'>Tidak ada diagnosa SDKI tertaut.</span>";
  }

  // Open the Modal
  openModalEl(modal);

  // Store current item for voice
  window.currentPenyakitDetail = p;
};

window.speakPenyakitDetail = function () {
  const p = window.currentPenyakitDetail;
  if (!p) return;

  let htmlText = `${p.nama}. Kategori ${p.kategori}. Definisi: ${p.detail.definisi}. Etiologi: ${p.detail.etiologi}. Patofisiologi: ${p.detail.patofisiologi}. Manifestasi Klinis: ${p.detail.manifestasi}.`;

  // Parse HTML correctly for better TTS flow
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");
  const text = doc.body.textContent || "";

  // Try finding voice btn
  let icon = null;
  const headerBtn = document.querySelector(
    "#penyakitDetailModal .modal-header",
  );
  if (headerBtn) {
    const iEl = headerBtn.querySelector(".fa-volume-high");
    if (iEl) icon = iEl;
  }

  if (typeof speakContent === "function") {
    speakContent(text, icon);
  }
};

window.togglePenyakitBookmark = function (namaLengkap) {
  let savedBM = [];
  try {
    savedBM =
      JSON.parse(localStorage.getItem("esdki_penyakit_bookmarks")) || [];
  } catch (e) {}

  const pNameTrim = namaLengkap.replace(" ", "").trim();
  const idx = savedBM.indexOf(pNameTrim);

  if (idx === -1) {
    savedBM.push(pNameTrim);
    if (typeof showToast === "function")
      showToast("Penyakit ditambahkan ke Tersimpan", "success");
  } else {
    savedBM.splice(idx, 1);
    if (typeof showToast === "function")
      showToast("Penyakit dihapus dari Tersimpan", "info");
  }

  localStorage.setItem("esdki_penyakit_bookmarks", JSON.stringify(savedBM));

  // Re-render UI
  const isBookmarked = idx === -1;
  const bmIcon = isBookmarked
    ? '<i class="fa-solid fa-star" style="color:#fbbf24;"></i>'
    : '<i class="fa-regular fa-star"></i>';
  const btn = document.getElementById("btnTogglePenyakitBookmark");
  if (btn) btn.innerHTML = bmIcon;

  // Render to update counts on modal list if needed
  renderPenyakit();
  filterPenyakit();
};
