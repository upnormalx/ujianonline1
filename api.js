/**
 * ============================================================
 * API MODULE - Komunikasi dengan Google Apps Script
 * ============================================================
 * Semua request ke backend melalui modul ini.
 * Menggunakan fetch API dengan Content-Type: application/json
 */

const API = {

  /**
   * Kirim GET request ke Apps Script
   * @param {string} action - Nama action
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Response JSON
   */
  async get(action, params = {}) {
    try {
      const url = new URL(CONFIG.APPS_SCRIPT_URL);
      url.searchParams.set('action', action);
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

      const response = await fetch(url.toString(), {
        method   : 'GET',
        redirect : 'follow'
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error(`API GET [${action}] Error:`, err);
      throw err;
    }
  },

  /**
   * Kirim POST request ke Apps Script
   * @param {string} action - Nama action
   * @param {Object} body   - Request body
   * @returns {Promise<Object>} Response JSON
   */
  async post(action, body = {}) {
    try {
      const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
        method   : 'POST',
        redirect : 'follow',
        headers  : { 'Content-Type': 'text/plain' }, // Apps Script butuh text/plain untuk CORS
        body     : JSON.stringify({ action, ...body })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error(`API POST [${action}] Error:`, err);
      throw err;
    }
  },

  // ===================== SISWA API =====================

  /** Ambil daftar kelas */
  getKelas: () => API.get('getKelas'),

  /** Ambil siswa berdasarkan kelas */
  getSiswa: (kelas) => API.get('getSiswa', { kelas }),

  /** Ambil mapel berdasarkan kelas */
  getMapel: (kelas) => API.get('getMapel', { kelas }),

  /** Validasi token ujian */
  validasiToken: (data) => API.post('validasiToken', data),

  /** Ambil soal ujian */
  getSoal: (mapel, kelas) => API.get('getSoal', { mapel, kelas }),

  /** Submit satu jawaban */
  submitJawaban: (data) => API.post('submitJawaban', data),

  /** Submit hasil akhir ujian */
  submitUjian: (data) => API.post('submitUjian', data),

  // ===================== ADMIN API =====================

  /** Login admin */
  adminLogin: (username, password) => API.post('adminLogin', { username, password }),

  /** Ambil semua siswa */
  getSiswaAll: () => API.get('getSiswaAll'),

  /** Ambil semua mapel */
  getMapelAll: () => API.get('getMapelAll'),

  /** Ambil soal dengan jawaban (admin) */
  getSoalAdmin: (mapel, kelas) => API.get('getSoal', { mapel, kelas, admin: 'true' }),

  /** Ambil hasil ujian */
  getHasil: (params) => API.get('getHasil', params),

  /** Statistik admin */
  getAdminStats: () => API.get('getAdminStats'),

  // SOAL CRUD
  tambahSoal    : (soal)             => API.post('tambahSoal',    { soal }),
  editSoal      : (id, soal)         => API.post('editSoal',      { id, soal }),
  hapusSoal     : (id)               => API.post('hapusSoal',     { id }),
  duplikatSoal  : (id, km, kl)       => API.post('duplikatSoal',  { id, kodeMapelBaru: km, kelasBaru: kl }),
  importSoal    : (data)             => API.post('importSoal',    data),
  exportSoal    : (mapel, kelas)     => API.get('exportSoal',     { mapel, kelas }),

  // SISWA CRUD
  tambahSiswa   : (data)  => API.post('tambahSiswa',  data),
  editSiswa     : (nis, data) => API.post('editSiswa', { nis, data }),
  hapusSiswa    : (nis)   => API.post('hapusSiswa',   { nis }),
  importSiswa   : (siswa) => API.post('importSiswa',  { siswa }),

  // MAPEL CRUD
  tambahMapel   : (data)        => API.post('tambahMapel',   data),
  editMapel     : (kodeMapel, data) => API.post('editMapel', { kodeMapel, data }),
  hapusMapel    : (kodeMapel)   => API.post('hapusMapel',    { kodeMapel }),
  generateToken : (kodeMapel)   => API.post('generateToken', { kodeMapel }),

  // UPLOAD
  uploadGambar  : (data) => API.post('uploadGambar', data)
};
