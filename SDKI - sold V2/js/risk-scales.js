/**
 * Risk Scales Module for SDKI Pro
 * Handles Braden, Morse, and GCS Scales
 */

function switchRiskTab(tabId) {
  document
    .querySelectorAll(".risk-tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelector(`.risk-tab-btn[data-target="${tabId}"]`)
    ?.classList.add("active");

  document
    .querySelectorAll(".risk-section")
    .forEach((s) => s.classList.add("hidden"));
  document.getElementById(`risk-${tabId}`)?.classList.remove("hidden");
}

function calculateBraden() {
  const selects = document.querySelectorAll("#risk-braden select");
  let total = 0;
  selects.forEach((s) => (total += parseInt(s.value)));

  const resDiv = document.getElementById("res-braden");
  const valEl = document.getElementById("val-braden");
  const katEl = document.getElementById("kat-braden");

  valEl.textContent = total;
  resDiv.classList.remove("hidden");
  katEl.className = "risk-result-badge";

  if (total >= 19) {
    katEl.textContent = "Risiko Sangat Rendah";
    katEl.style.background = "var(--emerald)";
  } else if (total >= 15) {
    katEl.textContent = "Risiko Rendah";
    katEl.style.background = "var(--emerald)";
  } else if (total >= 13) {
    katEl.textContent = "Risiko Sedang";
    katEl.style.background = "var(--amber)";
  } else if (total >= 10) {
    katEl.textContent = "Risiko Tinggi";
    katEl.style.background = "#f43f5e";
  } else {
    katEl.textContent = "Risiko Sangat Tinggi";
    katEl.style.background = "#991b1b";
  }
}

function calculateMorse() {
  const selects = document.querySelectorAll("#risk-morse select");
  let total = 0;
  selects.forEach((s) => (total += parseInt(s.value)));

  const resDiv = document.getElementById("res-morse");
  const valEl = document.getElementById("val-morse");
  const katEl = document.getElementById("kat-morse");

  valEl.textContent = total;
  resDiv.classList.remove("hidden");
  katEl.className = "risk-result-badge";

  if (total <= 24) {
    katEl.textContent = "Risiko Rendah / Tidak Berisiko";
    katEl.style.background = "var(--emerald)";
  } else if (total <= 44) {
    katEl.textContent = "Risiko Sedang";
    katEl.style.background = "var(--amber)";
  } else {
    katEl.textContent = "Risiko Tinggi";
    katEl.style.background = "#f43f5e";
  }
}
