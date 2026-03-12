const data = [
  'Batuk efektif meningkat (1 5)',
  'Produksi sputum menurun (1 5)',
  'Kesinkronan bantuan ventilator meningkat (1->5)',
  'PCO2 membaik (1->5)'
];

data.forEach((item, idx) => {
    let text = item.trim();
    text = text.replace(/\s+(meningkat|menurun|membaik|memburuk|positif|negatif)(?:\s*\([^\)]*\))?$/i, '');
    console.log(text.trim());
});
