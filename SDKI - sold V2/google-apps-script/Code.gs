// ============================================
// SDKI Pro — License Management System
// Google Apps Script Backend
// ============================================

// ===== KONFIGURASI =====
const SHEET_NAME = "Licenses";
const ADMIN_PASSWORD = "@Lovechiar4"; // Ganti password admin sesuai keinginan Anda

// ===== AUTO SETUP DATABASE =====
function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const headers = [
    "Kode Lisensi",
    "Nama Pembeli",
    "Email",
    "Status",
    "Device ID",
    "Tanggal Aktivasi",
    "Tanggal Expired",
    "Tanggal Generate",
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#2563eb");
  headerRange.setFontColor("#ffffff");
  headerRange.setHorizontalAlignment("center");

  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 200);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 250);
  sheet.setColumnWidth(6, 160);
  sheet.setColumnWidth(7, 160);
  sheet.setColumnWidth(8, 160);
  sheet.setFrozenRows(1);

  Logger.log("✅ Database berhasil dibuat/diperbarui!");
  return "Database setup selesai!";
}

// ===== API HANDLER =====
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    let result;

    switch (action) {
      case "activate":
        result = activateLicense(data.email, data.deviceId);
        break;
      case "check":
        result = checkLicense(data.email, data.deviceId);
        break;
      case "generate":
        result = generateLicenses(data.count || 10);
        break;
      // === ADMIN CRUD ===
      case "admin_login":
        result =
          data.password === ADMIN_PASSWORD
            ? { success: true, message: "Login berhasil!" }
            : { success: false, message: "Password salah." };
        break;
      case "admin_list":
        result = verifyAdmin(data.password) || listLicenses(data.search);
        break;
      case "admin_add":
        result = verifyAdmin(data.password) || addLicense(data.license);
        break;
      case "admin_edit":
        result =
          verifyAdmin(data.password) || editLicense(data.code, data.license);
        break;
      case "admin_delete":
        result = verifyAdmin(data.password) || deleteLicense(data.code);
        break;
      case "admin_reset":
        result = verifyAdmin(data.password) || resetDevice(data.code);
        break;
      case "admin_generate":
        result =
          verifyAdmin(data.password) || generateLicenses(data.count || 10);
        break;
      case "get_profile":
        result = getProfile(data.email, data.deviceId);
        break;
      default:
        result = { success: false, message: "Action tidak dikenali." };
    }

    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Server error: " + err.message,
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const action = e.parameter.action;

  if (action === "setup") {
    setupDatabase();
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Database berhasil di-setup!" }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "generate") {
    const count = parseInt(e.parameter.count) || 10;
    const result = generateLicenses(count);
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
      ContentService.MimeType.JSON,
    );
  }

  if (action === "debug") {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet)
      return ContentService.createTextOutput(
        JSON.stringify({ error: "No sheet" }),
      ).setMimeType(ContentService.MimeType.JSON);
    const data = sheet.getDataRange().getValues();
    const rows = data.map((row, i) => ({ row: i, values: row.map(String) }));
    return ContentService.createTextOutput(
      JSON.stringify(rows, null, 2),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
      message: "SDKI Pro License API is running!",
      actions: [
        "activate",
        "check",
        "generate",
        "admin_login",
        "admin_list",
        "admin_add",
        "admin_edit",
        "admin_delete",
        "admin_reset",
        "admin_generate",
      ],
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}

// ===== AKTIVASI LISENSI (BY EMAIL) =====
function activateLicense(email, deviceId) {
  if (!email || !deviceId) {
    return { success: false, message: "Email dan Device ID wajib diisi." };
  }

  email = email.toLowerCase().trim();

  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    setupDatabase();
    return {
      success: false,
      message: "Database belum siap. Silakan coba lagi.",
    };
  }

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][2]).toLowerCase().trim() === email) {
      const status = data[i][3];
      const existingDeviceId = data[i][4];
      const expiredDate = data[i][6];

      if (
        status === "aktif" &&
        existingDeviceId &&
        existingDeviceId !== deviceId
      ) {
        return {
          success: false,
          message:
            "Lisensi sudah digunakan di perangkat lain. Hubungi admin untuk bantuan.",
        };
      }

      if (status === "aktif" && existingDeviceId === deviceId) {
        if (expiredDate && new Date(expiredDate) < new Date()) {
          sheet.getRange(i + 1, 4).setValue("expired");
          return {
            success: false,
            message: "Lisensi telah expired. Silakan perpanjang lisensi Anda.",
            expired: true,
          };
        }
        return {
          success: true,
          message: "Lisensi sudah aktif!",
          expiry: expiredDate
            ? Utilities.formatDate(
                new Date(expiredDate),
                "Asia/Jakarta",
                "dd MMMM yyyy",
              )
            : "-",
        };
      }

      // Status aktif tapi belum ada device terikat — bind device ini
      if (status === "aktif" && !existingDeviceId) {
        if (expiredDate && new Date(expiredDate) < new Date()) {
          sheet.getRange(i + 1, 4).setValue("expired");
          return {
            success: false,
            message: "Lisensi telah expired. Silakan perpanjang lisensi Anda.",
            expired: true,
          };
        }
        const row = i + 1;
        sheet.getRange(row, 5).setValue(deviceId);
        sheet
          .getRange(row, 6)
          .setValue(
            Utilities.formatDate(
              new Date(),
              "Asia/Jakarta",
              "yyyy-MM-dd HH:mm:ss",
            ),
          );
        return {
          success: true,
          message: "Lisensi berhasil diaktifkan! Selamat menggunakan SDKI Pro.",
          expiry: expiredDate
            ? Utilities.formatDate(
                new Date(expiredDate),
                "Asia/Jakarta",
                "dd MMMM yyyy",
              )
            : "-",
        };
      }

      if (status === "belum" || status === "") {
        const now = new Date();
        const expiry = new Date(now);
        expiry.setFullYear(expiry.getFullYear() + 1);

        const row = i + 1;
        sheet.getRange(row, 4).setValue("aktif");
        sheet.getRange(row, 5).setValue(deviceId);
        sheet
          .getRange(row, 6)
          .setValue(
            Utilities.formatDate(now, "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss"),
          );
        sheet
          .getRange(row, 7)
          .setValue(
            Utilities.formatDate(expiry, "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss"),
          );

        return {
          success: true,
          message: "Lisensi berhasil diaktifkan! Selamat menggunakan SDKI Pro.",
          expiry: Utilities.formatDate(expiry, "Asia/Jakarta", "dd MMMM yyyy"),
        };
      }

      if (status === "expired") {
        return {
          success: false,
          message:
            "Lisensi telah expired. Silakan beli lisensi baru atau hubungi admin.",
          expired: true,
        };
      }
    }
  }

  return {
    success: false,
    message: "Email tidak ditemukan di database. Periksa kembali email Anda.",
  };
}

// ===== CEK STATUS LISENSI (BY EMAIL) =====
function checkLicense(email, deviceId) {
  if (!email || !deviceId)
    return { success: false, message: "Data tidak lengkap." };

  email = email.toLowerCase().trim();

  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { success: false, message: "Database tidak ditemukan." };

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][2]).toLowerCase().trim() === email) {
      const status = data[i][3];
      const existingDeviceId = data[i][4];
      const expiredDate = data[i][6];

      if (existingDeviceId && existingDeviceId !== deviceId) {
        return {
          success: false,
          message: "Lisensi terdaftar di perangkat lain.",
          deviceMismatch: true,
        };
      }

      if (status === "aktif" && expiredDate) {
        if (new Date(expiredDate) < new Date()) {
          sheet.getRange(i + 1, 4).setValue("expired");
          return {
            success: false,
            message: "Lisensi telah expired.",
            expired: true,
          };
        }
        return {
          success: true,
          message: "Lisensi aktif.",
          status: "aktif",
          expiry: Utilities.formatDate(
            new Date(expiredDate),
            "Asia/Jakarta",
            "dd MMMM yyyy",
          ),
        };
      }

      if (status === "expired")
        return {
          success: false,
          message: "Lisensi telah expired.",
          expired: true,
        };
      return { success: false, message: "Lisensi belum diaktifkan." };
    }
  }

  return { success: false, message: "Kode lisensi tidak ditemukan." };
}

// ===== GENERATE KODE LISENSI MASSAL =====
function generateLicenses(count) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    setupDatabase();
    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  }

  const existingData = sheet.getDataRange().getValues();
  const existingCodes = existingData.map((row) => row[0]);
  const newCodes = [];
  const now = Utilities.formatDate(
    new Date(),
    "Asia/Jakarta",
    "yyyy-MM-dd HH:mm:ss",
  );

  for (let i = 0; i < count; i++) {
    let code;
    do {
      code =
        "SDKI-" + randomBlock() + "-" + randomBlock() + "-" + randomBlock();
    } while (existingCodes.includes(code) || newCodes.includes(code));

    newCodes.push(code);
    sheet.appendRow([code, "", "", "belum", "", "", "", now]);
  }

  return {
    success: true,
    message: count + " kode lisensi berhasil dibuat!",
    codes: newCodes,
  };
}

function randomBlock() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let block = "";
  for (let i = 0; i < 4; i++) {
    block += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return block;
}

// ===== MENU GOOGLE SHEETS =====
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🔑 SDKI Pro Lisensi")
    .addItem("📋 Setup Database", "setupDatabase")
    .addItem("🔑 Generate 10 Lisensi", "generateTen")
    .addItem("🔑 Generate 50 Lisensi", "generateFifty")
    .addItem("🔑 Generate 100 Lisensi", "generateHundred")
    .addToUi();
}

function generateTen() {
  const result = generateLicenses(10);
  SpreadsheetApp.getUi().alert(
    "✅ " + result.message + "\n\nKode:\n" + result.codes.join("\n"),
  );
}
function generateFifty() {
  const result = generateLicenses(50);
  SpreadsheetApp.getUi().alert("✅ " + result.message);
}
function generateHundred() {
  const result = generateLicenses(100);
  SpreadsheetApp.getUi().alert("✅ " + result.message);
}

// ===== ADMIN: VERIFY PASSWORD =====
function verifyAdmin(password) {
  if (password !== ADMIN_PASSWORD) {
    return { success: false, message: "Akses ditolak. Password admin salah." };
  }
  return null;
}

// ===== ADMIN: LIST SEMUA LISENSI =====
function listLicenses(search) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { success: false, message: "Database tidak ditemukan." };

  const data = sheet.getDataRange().getValues();
  const licenses = [];

  for (let i = 1; i < data.length; i++) {
    const item = {
      code: data[i][0] || "",
      name: data[i][1] || "",
      email: data[i][2] || "",
      status: data[i][3] || "",
      deviceId: data[i][4] || "",
      activatedAt: data[i][5] || "",
      expiredAt: data[i][6] || "",
      generatedAt: data[i][7] || "",
    };

    if (search) {
      const s = search.toLowerCase();
      if (
        !(item.code + item.name + item.email + item.status)
          .toLowerCase()
          .includes(s)
      )
        continue;
    }
    licenses.push(item);
  }

  return { success: true, licenses: licenses, total: licenses.length };
}
// ===== ADMIN: TAMBAH LISENSI (BY EMAIL) =====
function addLicense(license) {
  if (!license || !license.email)
    return { success: false, message: "Email wajib diisi." };

  var email = license.email.toLowerCase().trim();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    setupDatabase();
    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  }

  // Cek duplikat email
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][2]).toLowerCase().trim() === email)
      return { success: false, message: "Email sudah terdaftar!" };
  }

  // Auto-generate kode lisensi
  var code =
    "SDKI-" + randomBlock() + "-" + randomBlock() + "-" + randomBlock();

  // Auto-set tanggal expired 1 tahun dari sekarang
  var now = new Date();
  var expiry = new Date(now);
  expiry.setFullYear(expiry.getFullYear() + 1);

  var nowStr = Utilities.formatDate(now, "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");
  var expiryStr = Utilities.formatDate(
    expiry,
    "Asia/Jakarta",
    "yyyy-MM-dd HH:mm:ss",
  );

  sheet.appendRow([
    code,
    license.name || "",
    email,
    license.status || "belum",
    "",
    "",
    expiryStr,
    nowStr,
  ]);

  return {
    success: true,
    message:
      "Lisensi berhasil ditambahkan untuk " +
      email +
      ". Berlaku hingga " +
      Utilities.formatDate(expiry, "Asia/Jakarta", "dd MMMM yyyy"),
  };
}

// ===== ADMIN: EDIT LISENSI (BY EMAIL) =====
function editLicense(emailKey, license) {
  if (!emailKey || !license)
    return { success: false, message: "Data tidak lengkap." };

  emailKey = emailKey.toLowerCase().trim();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { success: false, message: "Database tidak ditemukan." };

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][2]).toLowerCase().trim() === emailKey) {
      var row = i + 1;
      if (license.name !== undefined)
        sheet.getRange(row, 2).setValue(license.name);
      if (license.email !== undefined)
        sheet.getRange(row, 3).setValue(license.email.toLowerCase().trim());
      if (license.status !== undefined)
        sheet.getRange(row, 4).setValue(license.status);
      if (license.expiredAt !== undefined)
        sheet.getRange(row, 7).setValue(license.expiredAt);
      return { success: true, message: "Lisensi berhasil diperbarui." };
    }
  }
  return { success: false, message: "Email tidak ditemukan." };
}

// ===== ADMIN: HAPUS LISENSI (BY EMAIL) =====
function deleteLicense(emailKey) {
  if (!emailKey) return { success: false, message: "Email wajib diisi." };

  emailKey = emailKey.toLowerCase().trim();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { success: false, message: "Database tidak ditemukan." };

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][2]).toLowerCase().trim() === emailKey) {
      sheet.deleteRow(i + 1);
      return { success: true, message: "Lisensi berhasil dihapus." };
    }
  }
  return { success: false, message: "Email tidak ditemukan." };
}

// ===== ADMIN: RESET DEVICE BY EMAIL =====
function resetDevice(emailKey) {
  if (!emailKey) return { success: false, message: "Email wajib diisi." };

  emailKey = emailKey.toLowerCase().trim();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { success: false, message: "Database tidak ditemukan." };

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][2]).toLowerCase().trim() === emailKey) {
      var row = i + 1;
      sheet.getRange(row, 4).setValue("belum");
      sheet.getRange(row, 5).setValue("");
      sheet.getRange(row, 6).setValue("");
      return {
        success: true,
        message:
          "Device berhasil di-reset. Lisensi bisa digunakan di perangkat baru.",
      };
    }
  }
  return { success: false, message: "Email tidak ditemukan." };
}

// ===== GET PROFILE (PUBLIC — DENGAN VERIFIKASI DEVICE) =====
function getProfile(email, deviceId) {
  if (!email || !deviceId)
    return { success: false, message: "Data tidak lengkap." };

  email = email.toLowerCase().trim();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { success: false, message: "Database tidak ditemukan." };

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][2]).toLowerCase().trim() === email) {
      var existingDevice = data[i][4];
      if (existingDevice && existingDevice !== deviceId) {
        return { success: false, message: "Device tidak cocok." };
      }
      return {
        success: true,
        name: data[i][1] || "-",
        email: data[i][2] || "-",
        status: data[i][3] || "belum",
        expiry: data[i][6]
          ? Utilities.formatDate(
              new Date(data[i][6]),
              "Asia/Jakarta",
              "dd MMMM yyyy",
            )
          : "-",
      };
    }
  }
  return { success: false, message: "Email tidak ditemukan." };
}
