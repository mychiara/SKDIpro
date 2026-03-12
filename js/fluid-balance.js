/**
 * Fluid Balance Module
 */

function calculateFluidBalance() {
  const minuman = parseFloat(document.getElementById("in-minum").value) || 0;
  const infus = parseFloat(document.getElementById("in-infus").value) || 0;
  const sonde = parseFloat(document.getElementById("in-sonde").value) || 0;
  const urin = parseFloat(document.getElementById("out-urin").value) || 0;
  const drain = parseFloat(document.getElementById("out-drain").value) || 0;
  const iwl = parseFloat(document.getElementById("out-iwl").value) || 0;

  if (!minuman && !infus && !sonde && !urin && !drain && !iwl) return;

  const intake = minuman + infus + sonde;
  const output = urin + drain + iwl;
  const balance = intake - output;

  const resDiv = document.getElementById("res-fluid");
  const valEl = document.getElementById("val-fluid");
  const katEl = document.getElementById("kat-fluid");

  valEl.textContent = `${balance} cc / 24 jam`;
  resDiv.classList.remove("hidden");
  katEl.className = "risk-result-badge";

  if (balance > 500) {
    katEl.textContent = "Positive Balance (Kelebihan)";
    katEl.style.background = "#f43f5e";
  } else if (balance < -500) {
    katEl.textContent = "Negative Balance (Kekurangan)";
    katEl.style.background = "var(--amber)";
  } else {
    katEl.textContent = "Normal / Balanced";
    katEl.style.background = "var(--emerald)";
  }
}
