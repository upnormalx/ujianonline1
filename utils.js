/**
 * ============================================================
 * UTILITIES - Fungsi-fungsi pembantu umum
 * ============================================================
 */

const Utils = {

  /**
   * Tampilkan toast notification
   * @param {string} message - Pesan
   * @param {'success'|'error'|'warning'|'info'} type - Tipe
   * @param {number} duration - Durasi tampil (ms)
   */
  toast(message, type = 'info', duration = 3000) {
    // Hapus toast lama
    const existing = document.getElementById('toast-container');
    if (existing) existing.remove();

    const icons = {
      success : '✅',
      error   : '❌',
      warning : '⚠️',
      info    : 'ℹ️'
    };
    const colors = {
      success : '#16A34A',
      error   : '#DC2626',
      warning : '#D97706',
      info    : '#2563EB'
    };

    const container = document.createElement('div');
    container.id    = 'toast-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;

    container.innerHTML = `
      <div style="
        background: white;
        border-left: 4px solid ${colors[type]};
        padding: 14px 18px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 280px;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        color: #1F2937;
      ">
        <span style="font-size:18px">${icons[type]}</span>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(container);
    setTimeout(() => container.remove(), duration);
  },

  /**
   * Tampilkan/sembunyikan loading spinner
   */
  showLoading(show = true, text = 'Memuat...') {
    let overlay = document.getElementById('loading-overlay');
    if (show) {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.innerHTML = `
          <div class="loading-box">
            <div class="spinner"></div>
            <p>${text}</p>
          </div>
        `;
        document.body.appendChild(overlay);
      }
      overlay.style.display = 'flex';
    } else {
      if (overlay) overlay.style.display = 'none';
    }
  },

  /**
   * Format tanggal ke string lokal Indonesia
   */
  formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleString('id-ID', {
      day   : '2-digit',
      month : 'long',
      year  : 'numeric',
      hour  : '2-digit',
      minute: '2-digit'
    });
  },

  /**
   * Format timer countdown MM:SS
   */
  formatTimer(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  },

  /**
   * Simpan ke localStorage
   */
  saveLocal(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('localStorage error:', e);
    }
  },

  /**
   * Ambil dari localStorage
   */
  getLocal(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  /**
   * Hapus dari localStorage
   */
  removeLocal(key) {
    localStorage.removeItem(key);
  },

  /**
   * Konfirmasi dialog modern
   */
  async confirm(title, message, confirmText = 'Ya', cancelText = 'Batal') {
    return new Promise(resolve => {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-box confirm-modal">
          <div class="modal-icon">❓</div>
          <h3>${title}</h3>
          <p>${message}</p>
          <div class="modal-actions">
            <button class="btn btn-secondary" id="cancel-btn">${cancelText}</button>
            <button class="btn btn-danger"   id="confirm-btn">${confirmText}</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#confirm-btn').onclick = () => { modal.remove(); resolve(true); };
      modal.querySelector('#cancel-btn').onclick  = () => { modal.remove(); resolve(false); };
      modal.onclick = (e) => { if (e.target === modal) { modal.remove(); resolve(false); } };
    });
  },

  /**
   * Cek apakah string adalah URL valid
   */
  isUrl(str) {
    try { new URL(str); return true; } catch { return false; }
  },

  /**
   * Cek apakah string adalah base64 image
   */
  isBase64Image(str) {
    return str && str.startsWith('data:image');
  },

  /**
   * Render gambar dari URL atau base64
   */
  renderImage(src, alt = 'Gambar', cssClass = '') {
    if (!src) return '';
    return `<img src="${src}" alt="${alt}" class="soal-img ${cssClass}" onerror="this.style.display='none'">`;
  },

  /**
   * Escape HTML untuk mencegah XSS
   */
  escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str || ''));
    return div.innerHTML;
  },

  /**
   * Generate warna nilai (merah/kuning/hijau)
   */
  nilaiColor(nilai) {
    if (nilai >= 80) return '#16A34A';
    if (nilai >= 60) return '#D97706';
    return '#DC2626';
  },

  /**
   * Predicate nilai
   */
  nilaiLabel(nilai) {
    if (nilai >= 90) return 'Sangat Baik';
    if (nilai >= 80) return 'Baik';
    if (nilai >= 70) return 'Cukup';
    if (nilai >= 60) return 'Kurang';
    return 'Sangat Kurang';
  }
};
