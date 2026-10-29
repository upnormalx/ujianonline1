/**
 * ============================================================
 * KONFIGURASI GLOBAL - Website Ujian Sekolah
 * ============================================================
 * Ganti APPS_SCRIPT_URL dengan URL Web App Google Apps Script Anda
 * setelah melakukan deploy.
 */

const CONFIG = {
  // ⚠️ GANTI INI dengan URL Web App Google Apps Script Anda
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzFHjn_RBHzGmmvijg3kIq5NTBSYiQTXoRJV2YVzB7SB8Oht23cbnFdaYryoxJPXDqm8A/exec',

  // Durasi ujian default (menit) - bisa di-override dari spreadsheet
  DEFAULT_DURASI: 60,

  // Interval autosave jawaban ke localStorage (detik)
  AUTOSAVE_INTERVAL: 30,

  // Nama key localStorage
  STORAGE_KEYS: {
    SESSION     : 'ujian_session',
    JAWABAN     : 'ujian_jawaban',
    ADMIN_TOKEN : 'admin_token',
    ADMIN_USER  : 'admin_user'
  },

  // Warna tema
  COLORS: {
    PRIMARY     : '#2563EB',
    SUCCESS     : '#16A34A',
    DANGER      : '#DC2626',
    WARNING     : '#D97706',
    INFO        : '#0284C7'
  }
};
