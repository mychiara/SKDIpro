/**
 * Nursing Drug Guide Module
 */

const NURSING_DRUGS = [
  {
    name: "Furosemide (Lasix)",
    class: "Loop Diuretic",
    indication: "Edema, Hipertensi, Gagal Jantung",
    implication:
      "Monitor TD, cek kadar Kalium (hipokalemia), timbang BB harian, cek balance cairan.",
    sdki: [
      "D.0022 - Hipervolemia",
      "D.0037 - Risiko Ketidakseimbangan Elektrolit",
    ],
  },
  {
    name: "Amlodipine",
    class: "Calcium Channel Blocker",
    indication: "Hipertensi, Angina",
    implication:
      "Monitor TD secara rutin, observasi edema perifer, ingatkan pasien tidak berhenti mendadak.",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Ceftriaxone",
    class: "Antibiotic (Cephalosporin)",
    indication: "Infeksi bakteri berat",
    implication:
      "Cek riwayat alergi penisilin/sefalosporin, observasi tanda anafilaksis, monitor fungsi ginjal.",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Insulin (Regular/Rapid)",
    class: "Antidiabetic",
    indication: "Diabetes Mellitus",
    implication:
      "Monitor GDS secara ketat, observasi tanda hipoglikemia (keringat dingin, pusing, lapar), rotasi area penyuntikan.",
    sdki: ["D.0027 - Ketidakstabilan Kadar Glukosa Darah"],
  },
  {
    name: "Heparin / Enoxaparin",
    class: "Anticoagulant",
    indication: "Pencegahan/Terapi DVT, Emboli Paru",
    implication:
      "Monitor tanda perdarahan (gusi berdarah, hematuria, melena), cek nilai APTT/INR, gunakan jarum halus.",
    sdki: ["D.0012 - Risiko Perdarahan"],
  },
  {
    name: "Paracetamol",
    class: "Antipyretic / Analgesic",
    indication: "Nyeri ringan-sedang, Demam",
    implication:
      "Monitor suhu tubuh, cek fungsi hati jika penggunaan jangka panjang, dosis maksimal 4g/hari.",
    sdki: ["D.0130 - Hipertermia", "D.0077 - Nyeri Akut"],
  },
  {
    name: "Salbutamol (Ventolin)",
    class: "Bronchodilator (Beta-2 Agonist)",
    indication: "Asma, PPOK",
    implication:
      "Auskultasi suara napas (wheezing), monitor HR (risiko takikardia), ajarkan teknik penggunaan nebulizer/MDI.",
    sdki: [
      "D.0001 - Bersihan Jalan Napas Tidak Efektif",
      "D.0005 - Pola Napas Tidak Efektif",
    ],
  },
  {
    name: "Omeprazole",
    class: "Proton Pump Inhibitor (PPI)",
    indication: "GERD, Tukak Lambung",
    implication:
      "Sebaiknya diminum 30-60 menit sebelum makan, monitor nyeri epigastrium.",
    sdki: ["D.0077 - Nyeri Akut"],
  },
  {
    name: "Diazepam",
    class: "Benzodiazepine",
    indication: "Ansietas, Kejang, Relaksasi Otot",
    implication:
      "Monitor tingkat kesadaran, risiko depresi pernapasan, edukasi risiko ketergantungan.",
    sdki: ["D.0080 - Ansietas", "D.0136 - Risiko Cedera"],
  },
  {
    name: "Spironolactone",
    class: "Potassium-Sparing Diuretic",
    indication: "Gagal Jantung, Sirosis dengan Asites",
    implication:
      "Monitor kadar Kalium (risiko hiperkalemia), pantau balance cairan, monitor fungsi ginjal.",
    sdki: ["D.0022 - Hipervolemia"],
  },
  {
    name: "Dopamine / Dobutamine",
    class: "Inotropic Agent",
    indication: "Syok kardiogenik, Gagal jantung akut",
    implication:
      "Monitor TD & HR ketat (setiap 5-15 menit), cek lokasi infus (risiko ekstravasasi/nekrosis), monitor urine output.",
    sdki: [
      "D.0008 - Penurunan Curah Jantung",
      "D.0011 - Risiko Ketidakseimbangan Cairan",
    ],
  },
  {
    name: "Ketorolac",
    class: "NSAID (Analgesic)",
    indication: "Nyeri akut sedang-berat (biasanya pasca operasi)",
    implication:
      "Cek riwayat perdarahan lambung/ulkus, monitor fungsi ginjal, jangan berikan >5 hari berturut-turut.",
    sdki: ["D.0077 - Nyeri Akut", "D.0012 - Risiko Perdarahan"],
  },
  {
    name: "Warfarin",
    class: "Anticoagulant (Vitamin K Antagonist)",
    indication: "Profilaksis tromboemboli, Atrial Fibrilasi",
    implication:
      "Monitor nilai INR secara rutin (target 2-3), edukasi konsumsi sayuran hijau yang stabil, monitor tanda perdarahan (gusi/lebam).",
    sdki: ["D.0012 - Risiko Perdarahan"],
  },
  {
    name: "Metformin",
    class: "Antidiabetic (Biguanide)",
    indication: "Diabetes Mellitus Tipe 2",
    implication:
      "Minum bersama/setelah makan (kurangi efek GI), monitor tanda asidosis laktat, cek fungsi ginjal berkala.",
    sdki: ["D.0027 - Ketidakstabilan Kadar Glukosa Darah"],
  },
  {
    name: "Dexamethasone",
    class: "Corticosteroid",
    indication: "Peradangan, Alergi berat, Edema serebral",
    implication:
      "Monitor kadar GDS (risiko hiperglikemia), observasi tanda Cushing syndrome, jangan hentikan mendadak (harus tapering off).",
    sdki: [
      "D.0142 - Risiko Infeksi",
      "D.0027 - Ketidakstabilan Kadar Glukosa Darah",
    ],
  },
  {
    name: "Digoxin",
    class: "Cardiac Glycoside",
    indication: "Gagal jantung, Atrial Fibrilasi",
    implication:
      "Cek HR apikal 1 menit penuh (tunda jika <60x/m), monitor tanda toksisitas (mual/halo kuning), pantau kadar Kalium.",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Phenytoin (Dilantin)",
    class: "Anticonvulsant",
    indication: "Kejang tonik-klonik, Status epileptikus",
    implication:
      "Monitor kadar obat dalam darah, jaga kebersihan mulut (risiko hiperplasia gingiva), jangan dicampur cairan lain selain NaCl 0.9%.",
    sdki: ["D.0136 - Risiko Cedera"],
  },
  {
    name: "Potassium Chloride (KCl)",
    class: "Electrolyte Replacement",
    indication: "Hipokalemia (kadar kalium rendah)",
    implication:
      "IDR: HARUS DIENCERKAN (jangan bolus direct), monitor EKG, cek lokasi infus (risiko flebitis), monitor kadar kalium.",
    sdki: ["D.0037 - Risiko Ketidakseimbangan Elektrolit"],
  },
  {
    name: "Gentamicin",
    class: "Antibiotic (Aminoglycoside)",
    indication: "Infeksi bakteri gram negatif berat",
    implication:
      "Monitor fungsi ginjal (ureum/kreatinin), observasi tanda ototoksik (gangguan pendengaran/keseimbangan).",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Bisoprolol",
    class: "Beta-blocker",
    indication: "Hipertensi, Gagal Jantung, Angina",
    implication:
      "Monitor TD dan HR (tunda jika HR <50x/m), hati-hati pada riwayat asma/PPOK (risiko bronkospasme).",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Nitroglycerin (NTG)",
    class: "Vasodilator / Nitrate",
    indication: "Angina Pectoris, Gagal jantung akut, Edema paru",
    implication:
      "Monitor TD ketat (risiko hipotensi), edukasi simpan di tempat gelap & sejuk, cek penggunaan obat disfungsi ereksi.",
    sdki: ["D.0008 - Penurunan Curah Jantung", "D.0077 - Nyeri Akut"],
  },
  {
    name: "Metoclopramide",
    class: "Antiemetic / Prokinetic",
    indication: "Mual, Muntah, Gastroparesis",
    implication:
      "Observasi efek samping ekstrapiramidal (tremor/kaku), berikan 30 menit sebelum makan.",
    sdki: ["D.0076 - Nausea"],
  },
  {
    name: "Lactulose",
    class: "Laxative / Osmotic",
    indication: "Konstipasi, Ensefalopati Hepatikum",
    implication:
      "Monitor pola BAB dan konsistensi feses, pantau kadar amonia pada pasien sirosis, evaluasi bising usus.",
    sdki: ["D.0049 - Konstipasi"],
  },
  {
    name: "Atropine Sulfate",
    class: "Anticholinergic",
    indication: "Bradikardia simtomatik, Premedikasi operasi",
    implication:
      "Monitor HR dan irama jantung, observasi keluhan mulut kering, pandangan kabur, atau retensi urine.",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Magnesium Sulfate (MgSO4)",
    class: "Anticonvulsant / Electrolyte",
    indication: "Preeklamsia/Eklamsia, Hipomagnesemia",
    implication:
      "Monitor tanda toksisitas (refleks patella ↓, RR <12x/m, urine <30ml/jam), siapkan Kalsium Glukonas sebagai antidotum.",
    sdki: [
      "D.0136 - Risiko Cedera",
      "D.0037 - Risiko Ketidakseimbangan Elektrolit",
    ],
  },
  {
    name: "Oxytocin (Induxin)",
    class: "Hormone / Oxytocic",
    indication: "Induksi persalinan, Pencegahan perdarahan postpartum",
    implication:
      "Monitor kontraksi uterus (durasi/frekuensi), pantau DJJ (Denyut Jantung Janin) secara ketat, cek TD ibu.",
    sdki: ["D.0132 - Risiko Cedera pada Janin", "D.0012 - Risiko Perdarahan"],
  },
  {
    name: "Amiodarone",
    class: "Antiarrhythmic (Class III)",
    indication: "Ventricular Tachycardia, Ventricular Fibrillation",
    implication:
      "Monitor EKG (risiko perpanjangan interval QT), cek fungsi tiroid & paru pada penggunaan jangka panjang, pantau TD.",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Ondansetron",
    class: "Antiemetic (5-HT3 Antagonist)",
    indication: "Mual & muntah akibat kemoterapi/operasi",
    implication:
      "Observasi adanya sakit kepala atau konstipasi, monitor irama jantung pada pasien dengan risiko QT memanjang.",
    sdki: ["D.0076 - Nausea"],
  },
  {
    name: "Captopril",
    class: "ACE Inhibitor",
    indication: "Hipertensi, Gagal Jantung",
    implication:
      "Pantau risiko batuk kering, monitor kadar Kalium dan fungsi ginjal, edukasi jangan berhenti mendadak.",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Clopidogrel",
    class: "Antiplatelet",
    indication: "Pencegahan stroke/MI pada pasien dengan aterosklerosis",
    implication:
      "Monitor tanda perdarahan, edukasi untuk menginfomasikan penggunaan obat sebelum tindakan bedah.",
    sdki: ["D.0012 - Risiko Perdarahan"],
  },
  {
    name: "Midazolam",
    class: "Benzodiazepine / Sedative",
    indication: "Sedasi sebelum prosedur, Premedikasi anestesi",
    implication:
      "Monitor status pernapasan dan saturasi oksigen (risiko apneu), observasi tingkat kesadaran pasca prosedur.",
    sdki: ["D.0136 - Risiko Cedera", "D.0005 - Pola Napas Tidak Efektif"],
  },
  {
    name: "Propofol",
    class: "General Anesthetic",
    indication: "Induksi & pemeliharaan anestesi, sedasi ICU",
    implication:
      "Hanya digunakan oleh tenaga ahli, monitor ketat TD dan RR, ganti tubing setiap 12 jam (risiko pertumbuhan bakteri).",
    sdki: ["D.0005 - Pola Napas Tidak Efektif"],
  },
  {
    name: "Verapamil",
    class: "Calcium Channel Blocker / Antiarrhythmic",
    indication: "Hipertensi, Angina, Supreventricular Tachycardia",
    implication:
      "Monitor HR dan TD, observasi adanya konstipasi atau pusing (hipotensi ortostatik).",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Hydrocortisone",
    class: "Corticosteroid",
    indication: "Insufisiensi adrenal, Reaksi alergi berat",
    implication:
      "Monitor balance cairan dan elektrolit, pantau tanda-tanda infeksi, cek kadar gula darah.",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Haloperidol",
    class: "Antipsychotic",
    indication: "Skizofrenia, Psikosis, Agitasi akut",
    implication:
      "Monitor efek samping ekstrapiramidal (EPS), pantau tanda Neuroleptic Malignant Syndrome (demam tinggi, kekakuan otot).",
    sdki: ["D.0085 - Gangguan Persepsi Sensori", "D.0136 - Risiko Cedera"],
  },
  {
    name: "Morphine Sulfate",
    class: "Opioid Analgesic",
    indication: "Nyeri berat, Nyeri IMA, Edema paru akut",
    implication:
      "Monitor RR ketat (risiko depresi napas), pantau status kesadaran, siapkan Naloxone sebagai antidotum.",
    sdki: ["D.0077 - Nyeri Akut", "D.0005 - Pola Napas Tidak Efektif"],
  },
  {
    name: "Aspirin (Acetosal)",
    class: "Antiplatelet / NSAID",
    indication: "Nyeri, Demam, Penyakit Arteri Koroner",
    implication:
      "Monitor tanda perdarahan lambung, edukasi untuk tidak diminum saat perut kosong.",
    sdki: ["D.0012 - Risiko Perdarahan", "D.0077 - Nyeri Akut"],
  },
  {
    name: "Ranitidine / Famotidine",
    class: "H2 Receptor Antagonist",
    indication: "Tukak lambung, Gastritis, GERD",
    implication:
      "Monitor adanya tanda kebingungan pada lansia, evaluasi nyeri epigastrium.",
    sdki: ["D.0077 - Nyeri Akut"],
  },
  {
    name: "Ceftazidime",
    class: "Antibiotic (3rd Gen Cephalosporin)",
    indication: "Infeksi berat, Pseudomonas aeruginosa",
    implication:
      "Cek riwayat alergi, monitor fungsi ginjal, observasi tanda diare terkait Clostridium difficile.",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Meropenem",
    class: "Antibiotic (Carbapenem)",
    indication: "Infeksi intra-abdominal berat, Meningitis",
    implication:
      "Monitor fungsi ginjal, observasi risiko kejang terutama pada pasien gangguan ginjal.",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Levofloxacin",
    class: "Antibiotic (Fluoroquinolone)",
    indication: "Pneumonia, Infeksi Saluran Kemih",
    implication:
      "Monitor risiko tendinitis/ruptur tendon, edukasi fotosensitivitas (hindari sinar matahari langsung).",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Metronidazole",
    class: "Antiprotozoal / Antibiotic",
    indication: "Infeksi anaerob, Amubiasis, Giardiasis",
    implication:
      "Edukasi hindari alkohol (reaksi disulfiram-like), monitor rasa logam di mulut.",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Acyclovir",
    class: "Antiviral",
    indication: "Herpes Simplex, Varicella Zoster",
    implication:
      "Pastikan hidrasi adekuat untuk mencegah kristalisasi di ginjal, monitor fungsi renal.",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Fluconazole",
    class: "Antifungal",
    indication: "Kandidiasis, Meningitis Kriptokokus",
    implication:
      "Monitor fungsi hati (LFT), amati efek samping mual/ruam kulit.",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Alprazolam",
    class: "Benzodiazepine",
    indication: "Gangguan kecemasan, Gangguan panik",
    implication:
      "Monitor risiko ketergantungan, edukasi untuk tidak mengemudi setelah minum obat.",
    sdki: ["D.0080 - Ansietas"],
  },
  {
    name: "Risperidone",
    class: "Atypical Antipsychotic",
    indication: "Skizofrenia, Gangguan bipolar",
    implication:
      "Monitor kenaikan BB, pantau kadar gula darah, observasi hipotensi ortostatik.",
    sdki: ["D.0085 - Gangguan Persepsi Sensori"],
  },
  {
    name: "Lithium Carbonate",
    class: "Mood Stabilizer",
    indication: "Gangguan Bipolar (Manik)",
    implication:
      "Monitor kadar lithium darah secara ketat (lebar terapi sempit), pastikan asupan garam stabil.",
    sdki: ["D.0136 - Risiko Cedera"],
  },
  {
    name: "Gabapentin / Pregabalin",
    class: "Anticonvulsant / Neuropathic Pain",
    indication: "Nyeri neuropati, Kejang fokal",
    implication: "Monitor pusing dan somnolen, observasi adanya edema perifer.",
    sdki: ["D.0077 - Nyeri Akut", "D.0136 - Risiko Cedera"],
  },
  {
    name: "Valproic Acid",
    class: "Anticonvulsant",
    indication: "Kejang universal, Migrain",
    implication:
      "Monitor hitung trombosit (risiko trombositopenia), pantau fungsi hati.",
    sdki: ["D.0136 - Risiko Cedera"],
  },
  {
    name: "Epinephrine (Adrenaline)",
    class: "Adrenergic Agonist",
    indication: "Henti jantung, Anafilaksis, Asma berat",
    implication:
      "Monitor EKG, TD, dan HR secara kontinu saat drip, cek lokasi injeksi IM pada anafilaksis.",
    sdki: [
      "D.0008 - Penurunan Curah Jantung",
      "D.0005 - Pola Napas Tidak Efektif",
    ],
  },
  {
    name: "Norepinephrine (Levophed)",
    class: "Vasopressor",
    indication: "Syok septik, Hipotensi berat",
    implication:
      "Monitor TD setiap 2-5 menit hingga stabil, waspadai ekstravasasi (nekrosis jaringan).",
    sdki: ["D.0017 - Risiko Perfusi Gastrointestinal Tidak Efektif"],
  },
  {
    name: "Lidocaine (Xylocard)",
    class: "Antiarrhythmic (Class Ib)",
    indication: "Aritmia ventrikel",
    implication:
      "Monitor tanda toksisitas SSP (kejang, bicara meracau), monitor EKG.",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Adenosine",
    class: "Antiarrhythmic",
    indication: "Penyakit SVT (Supraventricular Tachycardia)",
    implication:
      "Berikan via bolus cepat (rapid flush), monitor monitor jantung (akan terjadi asistol singkat).",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Hydralazine",
    class: "Vasodilator",
    indication: "Hipertensi berat, Gagal jantung",
    implication:
      "Monitor TD ketat, waspadai takikardia refleks, monitor tanda-tanda sindrom lupus.",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Methyldopa",
    class: "Centrally Acting Antihypertensive",
    indication: "Hipertensi pada kehamilan",
    implication:
      "Monitor tes Coombs dan fungsi hati, observasi adanya kantuk atau depresi.",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Nifedipine (Adalat)",
    class: "Calcium Channel Blocker",
    indication: "Hipertensi, Angina, Tokolitik (mencegah persalinan prematur)",
    implication: "Hindari jus grapefruit, monitor TD, waspadai edema tungkai.",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Isosorbide Dinitrate (ISDN)",
    class: "Nitrate / Vasodilator",
    indication: "Angina Pectoris, Gagal jantung",
    implication:
      "Berikan sublingual saat serangan nyeri dada, monitor hipotensi dan pusing.",
    sdki: ["D.0077 - Nyeri Akut"],
  },
  {
    name: "Simvastatin / Atorvastatin",
    class: "HMG-CoA Reductase Inhibitor",
    indication: "Hiperkolesterolemia, Pencegahan CAD",
    implication:
      "Berikan pada malam hari, monitor keluhan nyeri otot (risiko rhabdomyolysis).",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Levothyroxine",
    class: "Thyroid Hormone",
    indication: "Hipotiroidisme",
    implication:
      "Monitor HR (risiko takikardia), berikan pagi hari sebelum makan.",
    sdki: ["D.0136 - Risiko Cedera"],
  },
  {
    name: "Propylthiouracil (PTU)",
    class: "Antithyroid",
    indication: "Hipertiroidisme",
    implication:
      "Monitor hitung WBC (risiko agranulositosis), pantau fungsi hati.",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Prednisone",
    class: "Corticosteroid",
    indication: "Inflamasi, Penyakit Autoimun",
    implication:
      "Monitor GDS, waspadai tanda infeksi tersembunyi, jangan hentikan mendadak.",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Allopurinol",
    class: "Xanthine Oxidase Inhibitor",
    indication: "Gout (Asam urat tinggi)",
    implication:
      "Tingkatkan asupan cairan (min 2L/hari), monitor ruam kulit (risiko Stevens-Johnson Syndrome).",
    sdki: ["D.0077 - Nyeri Akut"],
  },
  {
    name: "Colchicine",
    class: "Antigout",
    indication: "Serangan Gout akut",
    implication:
      "Monitor adanya diare atau nyeri perut (tanda toksisitas), mulai segera saat serangan.",
    sdki: ["D.0077 - Nyeri Akut"],
  },
  {
    name: "Sucralfate",
    class: "Gastric Mucosal Protective",
    indication: "Tukak lambung, Gastritis",
    implication:
      "Berikan saat perut kosong, jangan diberikan bersamaan dengan antasida.",
    sdki: ["D.0077 - Nyeri Akut"],
  },
  {
    name: "Loperamide",
    class: "Antidiarrheal",
    indication: "Diare akut non-spesifik",
    implication: "Monitor status hidrasi, observasi adanya distensi abdomen.",
    sdki: ["D.0020 - Diare", "D.0023 - Hipovolemia"],
  },
  {
    name: "Bisacodyl (Dulcolax)",
    class: "Stimulant Laxative",
    indication: "Konstipasi, Persiapan tindakan radiologi/op",
    implication:
      "Edukasi tidak untuk penggunaan jangka panjang, pantau pola BAB.",
    sdki: ["D.0049 - Konstipasi"],
  },
  {
    name: "Salmeterol / Fluticasone",
    class: "Bronchodilator / Steroid (Inhaled)",
    indication: "Asma kronis, PPOK",
    implication:
      "Edukasi berkumur setelah menggunakan inhaler (cegah kandidiasis oral).",
    sdki: ["D.0001 - Bersihan Jalan Napas Tidak Efektif"],
  },
  {
    name: "Theophylline",
    class: "Methylxanthine",
    indication: "Asma, PPOK",
    implication:
      "Monitor kadar obat dalam darah (risiko toksisitas: mual, takikardia, kejang).",
    sdki: ["D.0005 - Pola Napas Tidak Efektif"],
  },
  {
    name: "Ipratropium Bromide",
    class: "Anticholinergic Bronchodilator",
    indication: "Bronkospasme pada PPOK/Asma",
    implication: "Monitor keluhan mulut kering, waspadai pada pasien glaukoma.",
    sdki: ["D.0001 - Bersihan Jalan Napas Tidak Efektif"],
  },
  {
    name: "Fosphenytoin",
    class: "Anticonvulsant (Prodrug)",
    indication: "Status epileptikus",
    implication:
      "Monitor TD dan EKG selama infus, risiko hipotensi dan aritmia.",
    sdki: ["D.0136 - Risiko Cedera"],
  },
  {
    name: "Clonazepam",
    class: "Benzodiazepine / Anticonvulsant",
    indication: "Kejang lena, Gangguan panik",
    implication: "Monitor tingkat kesadaran, edukasi risiko adiksi.",
    sdki: ["D.0136 - Risiko Cedera"],
  },
  {
    name: "Lorazepam (Ativan)",
    class: "Benzodiazepine",
    indication: "Ansietas, Premedikasi, Kejang akut",
    implication:
      "Monitor depresi pernapasan, sering digunakan untuk mengontrol agitasi.",
    sdki: ["D.0080 - Ansietas"],
  },
  {
    name: "Vitamin K (Phytomenadione)",
    class: "Vitamin / Antidote",
    indication: "Perdarahan akibat overdosis Warfarin, Defisiensi Vit K",
    implication: "Monitor nilai PT/INR, observasi perdarahan baru.",
    sdki: ["D.0012 - Risiko Perdarahan"],
  },
  {
    name: "Protamine Sulfate",
    class: "Heparin Antagonist",
    indication: "Overdosis Heparin",
    implication:
      "Monitor tanda anafilaksis, berikan perlahan (risiko hipotensi mendadak).",
    sdki: ["D.0012 - Risiko Perdarahan"],
  },
  {
    name: "Calcium Gluconate",
    class: "Electrolyte / Antidote",
    indication: "Hipokalsemia, Toksisitas MgSO4",
    implication:
      "Monitor kadar kalsium darah, monitor EKG (risiko bradikardia jika bolus cepat).",
    sdki: ["D.0037 - Risiko Ketidakseimbangan Elektrolit"],
  },
  {
    name: "Ferrous Sulfate",
    class: "Iron Supplement",
    indication: "Anemia defisiensi besi",
    implication:
      "Edukasi feses akan berwarna hitam (normal), berikan bersama vit C untuk absorpsi optimal.",
    sdki: ["D.0009 - Perfusi Perifer Tidak Efektif"],
  },
  {
    name: "Epoetin Alfa",
    class: "Erythropoiesis-Stimulating Agent",
    indication: "Anemia pada GGK atau Kemoterapi",
    implication: "Monitor TD (risiko hipertensi), pantau kadar Hemoglobin.",
    sdki: ["D.0009 - Perfusi Perifer Tidak Efektif"],
  },
  {
    name: "Cyclosporine",
    class: "Immunosuppressant",
    indication: "Pencegahan rejeksi organ, Penyakit autoimun",
    implication: "Monitor fungsi ginjal dan TD, pantau tanda-tanda infeksi.",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Methotrexate",
    class: "Antineoplastic / Immunosuppressant",
    indication: "Kanker, Artritis Reumatoid berat",
    implication:
      "Monitor hitung darah lengkap (risiko supresi sumsum tulang), edukasi hidrasi.",
    sdki: ["D.0142 - Risiko Infeksi"],
  },
  {
    name: "Tamoxifen",
    class: "Antineoplastic (Hormonal)",
    indication: "Kanker payudara",
    implication:
      "Monitor adanya tanda tromboemboli (nyeri tungkai), pantau perdarahan uterus.",
    sdki: ["D.0136 - Risiko Cedera"],
  },
  {
    name: "Sildenafil",
    class: "PDE5 Inhibitor",
    indication: "Disfungsi ereksi, Hipertensi Pulmonal",
    implication:
      "Jangan diberikan bersamaan dengan Nitrat (risiko hipotensi fatal).",
    sdki: ["D.0008 - Penurunan Curah Jantung"],
  },
  {
    name: "Budesonide",
    class: "Corticosteroid (Inhaled/Oral)",
    indication: "Asma, Penyakit Crohn",
    implication: "Bilas mulut setelah inhalasi, monitor tanda sindrom Cushing.",
    sdki: ["D.0001 - Bersihan Jalan Napas Tidak Efektif"],
  },
  {
    name: "Gliclazide / Glimepiride",
    class: "Sulfonylurea (Antidiabetic)",
    indication: "Diabetes Mellitus Tipe 2",
    implication:
      "Monitor tanda hipoglikemia, edukasi untuk selalu membawa sumber gula.",
    sdki: ["D.0027 - Ketidakstabilan Kadar Glukosa Darah"],
  },
  {
    name: "Acarbose",
    class: "Alpha-glucosidase Inhibitor",
    indication: "Diabetes Mellitus Tipe 2",
    implication:
      "Berikan bersama suapan pertama makanan, monitor keluhan kembung/diare.",
    sdki: ["D.0027 - Ketidakstabilan Kadar Glukosa Darah"],
  },
];

function renderDrugGuide(query = "") {
  const cont = document.getElementById("drugList");
  if (!cont) return;

  const filtered = NURSING_DRUGS.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.class.toLowerCase().includes(query.toLowerCase()) ||
      d.indication.toLowerCase().includes(query.toLowerCase()),
  );

  if (filtered.length === 0) {
    cont.innerHTML =
      '<div style="text-align:center; padding:2rem; opacity:0.5;">Obat tidak ditemukan.</div>';
    return;
  }

  cont.innerHTML = filtered
    .map(
      (d) => `
        <div class="askep-card drug-item-card" style="margin-bottom:1.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:0.75rem;">
                <h4 style="margin:0; color:var(--primary); font-size:1.1rem; font-weight:800;">${d.name}</h4>
                <span style="font-size:0.7rem; background:var(--emerald-bg); color:var(--emerald); padding:0.25rem 0.6rem; border-radius:100px; font-weight:700;">${d.class}</span>
            </div>
            <p style="font-size:0.9rem; margin:0.5rem 0; color:var(--text-primary);"><strong>Indikasi:</strong> ${d.indication}</p>
            <div style="background:var(--bg-alt); padding:1rem; border-radius:12px; font-size:0.9rem; border:1px dashed var(--glass-border); margin-top:0.75rem;">
                <strong style="color:var(--danger); display:flex; align-items:center; gap:0.4rem; margin-bottom:0.4rem;"><i class="fa-solid fa-user-nurse"></i> Implikasi Keperawatan:</strong>
                <div style="line-height:1.6; color:var(--text-secondary);">${d.implication}</div>
            </div>
            <div style="margin-top:1rem; display:flex; flex-wrap:wrap; gap:0.5rem;">
                ${d.sdki.map((s) => `<span style="font-size:0.75rem; color:var(--text-muted); background:var(--bg-alt); padding:0.2rem 0.5rem; border-radius:6px; display:flex; align-items:center; gap:0.3rem;"><i class="fa-solid fa-link" style="font-size:0.6rem;"></i> ${s}</span>`).join("")}
            </div>
        </div>
    `,
    )
    .join("");
}

document.getElementById("drugSearch")?.addEventListener("input", (e) => {
  renderDrugGuide(e.target.value);
});
