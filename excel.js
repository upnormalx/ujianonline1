/**
 * ============================================================
 * EXCEL MODULE - Handler Import & Export via SheetJS
 * ============================================================
 * Membutuhkan SheetJS: https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js
 * Semua fungsi export/import soal dan siswa terpusat di sini.
 */

const ExcelHandler = {

  /**
   * Download template Excel kosong untuk import soal
   */
  downloadTemplateSoal() {
    const wb = XLSX.utils.book_new();

    const headers = [
      'NoSoal', 'TipeSoal', 'Pertanyaan', 'GambarSoal',
      'OpsiA', 'GambarA', 'OpsiB', 'GambarB',
      'OpsiC', 'GambarC', 'OpsiD', 'GambarD',
      'JawabanBenar', 'Skor'
    ];

    // Data contoh 10 soal dummy
    const contoh = [
      [1, 'text', 'Ibu kota Republik Indonesia adalah...', '',
       'Jakarta', '', 'Surabaya', '', 'Bandung', '', 'Medan', '', 'A', 10],
      [2, 'text', 'Berapa hasil dari 7 × 8?', '',
       '54', '', '56', '', '58', '', '64', '', 'B', 10],
      [3, 'text', 'Siapa presiden pertama Republik Indonesia?', '',
       'Soeharto', '', 'Soekarno', '', 'Habibie', '', 'Wahid', '', 'B', 10],
      [4, 'text', 'Planet terbesar di tata surya adalah...', '',
       'Saturnus', '', 'Mars', '', 'Jupiter', '', 'Neptunus', '', 'C', 10],
      [5, 'text', 'Bahasa pemrograman yang dikembangkan oleh Sun Microsystems?', '',
       'Python', '', 'JavaScript', '', 'Java', '', 'C++', '', 'C', 10],
      [6, 'image', 'Perhatikan gambar berikut. Bangun datar apakah yang ditunjukkan?',
       'https://via.placeholder.com/400x200/2563EB/white?text=Gambar+Segitiga',
       'Persegi', '', 'Lingkaran', '', 'Segitiga', '', 'Trapesium', '', 'C', 10],
      [7, 'image', 'Hewan apakah yang ada pada gambar?',
       'https://via.placeholder.com/400x200/16A34A/white?text=Gambar+Hewan',
       'Singa', '', 'Harimau', '', 'Gajah', '', 'Paus', '', 'C', 10],
      [8, 'text_image', 'Manakah dari gambar-gambar berikut yang menunjukkan proses fotosintesis?',
       'https://via.placeholder.com/400x150/0284C7/white?text=Perhatikan+Gambar',
       'Respirasi', 'https://via.placeholder.com/200x120/EF4444/white?text=A',
       'Fotosintesis', 'https://via.placeholder.com/200x120/16A34A/white?text=B',
       'Fermentasi', 'https://via.placeholder.com/200x120/F59E0B/white?text=C',
       'Kondensasi', 'https://via.placeholder.com/200x120/8B5CF6/white?text=D',
       'B', 10],
      [9, 'text_image', 'Perhatikan rangkaian listrik berikut. Mana yang termasuk rangkaian seri?', '',
       'Pilihan 1', 'https://via.placeholder.com/200x120/2563EB/white?text=Seri',
       'Pilihan 2', 'https://via.placeholder.com/200x120/DC2626/white?text=Paralel',
       'Pilihan 3', 'https://via.placeholder.com/200x120/16A34A/white?text=Campuran',
       'Pilihan 4', 'https://via.placeholder.com/200x120/D97706/white?text=Terbuka',
       'A', 10],
      [10, 'image_image', 'Pilih gambar yang menunjukkan ekspresi SENANG!',
       'https://via.placeholder.com/400x200/1E293B/white?text=Pilih+yang+SENANG',
       '', 'https://via.placeholder.com/200x150/EF4444/white?text=Marah',
       '', 'https://via.placeholder.com/200x150/16A34A/white?text=SENANG',
       '', 'https://via.placeholder.com/200x150/F59E0B/white?text=Sedih',
       '', 'https://via.placeholder.com/200x150/8B5CF6/white?text=Bingung',
       'B', 10],
    ];

    const wsData = [headers, ...contoh];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    ws['!cols'] = [
      { wch: 8 }, { wch: 15 }, { wch: 50 }, { wch: 45 },
      { wch: 20 }, { wch: 45 }, { wch: 20 }, { wch: 45 },
      { wch: 20 }, { wch: 45 }, { wch: 20 }, { wch: 45 },
      { wch: 12 }, { wch: 8 },
    ];

    // Sheet panduan
    const wsPanduan = XLSX.utils.aoa_to_sheet([
      ['PANDUAN IMPORT SOAL', ''],
      ['', ''],
      ['Kolom', 'Keterangan'],
      ['NoSoal',       'Nomor urut soal (angka)'],
      ['TipeSoal',     'Tipe: text | image | text_image | image_image'],
      ['Pertanyaan',   'Teks pertanyaan (wajib untuk tipe text dan text_image)'],
      ['GambarSoal',   'URL gambar soal (wajib untuk tipe image, opsional text_image)'],
      ['OpsiA–D',      'Teks pilihan jawaban A, B, C, D'],
      ['GambarA–D',    'URL gambar untuk pilihan jawaban (untuk tipe image_image / text_image)'],
      ['JawabanBenar', 'Huruf jawaban benar: A, B, C, atau D (huruf kapital)'],
      ['Skor',         'Nilai poin untuk jawaban benar (default: 10)'],
      ['', ''],
      ['TIPE SOAL', ''],
      ['text',        'Soal teks biasa, opsi berupa teks'],
      ['image',       'Soal bergambar, opsi berupa teks'],
      ['text_image',  'Soal teks + gambar soal, opsi bisa berupa gambar atau teks'],
      ['image_image', 'Soal bergambar, opsi juga berupa gambar'],
      ['', ''],
      ['CATATAN', ''],
      ['URL Gambar', 'Gunakan URL gambar publik: Google Drive (share link), Imgur, dll'],
      ['Google Drive', 'Ubah share link ke format: https://drive.google.com/uc?export=view&id=FILE_ID'],
    ]);
    wsPanduan['!cols'] = [{ wch: 20 }, { wch: 70 }];

    XLSX.utils.book_append_sheet(wb, ws, 'Template Soal (10 Contoh)');
    XLSX.utils.book_append_sheet(wb, wsPanduan, 'Panduan');
    XLSX.writeFile(wb, 'template_import_soal.xlsx');
  },

  /**
   * Download template Excel untuk import siswa
   */
  downloadTemplateSiswa() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ['NIS', 'Nama', 'Kelas', 'Status'],
      ['001', 'Andi Pratama',   'X-IPA-1',  'Aktif'],
      ['002', 'Budi Santoso',   'X-IPA-1',  'Aktif'],
      ['003', 'Citra Dewi',     'X-IPA-1',  'Aktif'],
      ['004', 'Dian Rahayu',    'X-IPA-2',  'Aktif'],
      ['005', 'Eka Wahyuni',    'X-IPA-2',  'Aktif'],
      ['006', 'Fajar Nugroho',  'XI-IPS-1', 'Aktif'],
      ['007', 'Gita Permata',   'XI-IPS-1', 'Aktif'],
    ]);
    ws['!cols'] = [{ wch: 12 }, { wch: 30 }, { wch: 15 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Data Siswa');
    XLSX.writeFile(wb, 'template_import_siswa.xlsx');
  },

  /**
   * Parse file Excel soal → array of objects
   */
  parseSoalExcel(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const wb   = XLSX.read(e.target.result, { type: 'array' });
          const ws   = wb.Sheets[wb.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(ws, { defval: '' });

          if (!data.length) { reject(new Error('File kosong')); return; }

          // Validasi kolom wajib
          const first   = data[0];
          const missing = ['NoSoal','JawabanBenar'].filter(k => !(k in first));
          if (missing.length) {
            reject(new Error('Kolom wajib tidak ada: ' + missing.join(', ')));
            return;
          }

          const normalized = data.map((row, i) => ({
            NoSoal      : Number(row.NoSoal)      || (i + 1),
            TipeSoal    : String(row.TipeSoal     || 'text').toLowerCase().trim(),
            Pertanyaan  : String(row.Pertanyaan   || '').trim(),
            GambarSoal  : String(row.GambarSoal   || '').trim(),
            OpsiA       : String(row.OpsiA        || '').trim(),
            GambarA     : String(row.GambarA      || '').trim(),
            OpsiB       : String(row.OpsiB        || '').trim(),
            GambarB     : String(row.GambarB      || '').trim(),
            OpsiC       : String(row.OpsiC        || '').trim(),
            GambarC     : String(row.GambarC      || '').trim(),
            OpsiD       : String(row.OpsiD        || '').trim(),
            GambarD     : String(row.GambarD      || '').trim(),
            JawabanBenar: String(row.JawabanBenar || '').toUpperCase().trim(),
            Skor        : Number(row.Skor)         || 10,
          }));

          resolve(normalized);
        } catch (err) {
          reject(new Error('Gagal parse: ' + err.message));
        }
      };
      reader.onerror = () => reject(new Error('Gagal baca file'));
      reader.readAsArrayBuffer(file);
    });
  },

  /**
   * Parse file Excel siswa → array of objects
   */
  parseSiswaExcel(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const wb   = XLSX.read(e.target.result, { type: 'array' });
          const ws   = wb.Sheets[wb.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
          if (!data.length) { reject(new Error('File kosong')); return; }
          const normalized = data.map(row => ({
            NIS   : String(row.NIS    || '').trim(),
            Nama  : String(row.Nama   || '').trim(),
            Kelas : String(row.Kelas  || '').trim(),
            Status: String(row.Status || 'Aktif').trim(),
          })).filter(s => s.NIS && s.Nama && s.Kelas);
          resolve(normalized);
        } catch (err) {
          reject(new Error('Gagal parse: ' + err.message));
        }
      };
      reader.onerror = () => reject(new Error('Gagal baca file'));
      reader.readAsArrayBuffer(file);
    });
  },

  /**
   * Export hasil ujian ke Excel dengan sheet Statistik
   */
  exportHasil(data, filename = 'hasil_ujian.xlsx') {
    const wb = XLSX.utils.book_new();

    const exportData = data.map((h, i) => ({
      'No'         : i + 1,
      'NIS'        : h.NIS,
      'Nama'       : h.Nama,
      'Kelas'      : h.Kelas,
      'Mapel'      : h.Mapel || h.KodeMapel,
      'Benar'      : h.TotalBenar,
      'Salah'      : h.TotalSalah,
      'Total Soal' : h.TotalSoal,
      'Skor Akhir' : h.SkorAkhir,
      'Nilai'      : h.Nilai,
      'Status'     : Number(h.Nilai) >= 75 ? 'LULUS' : 'TIDAK LULUS',
      'Waktu'      : h.Timestamp ? new Date(h.Timestamp).toLocaleString('id-ID') : '-',
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    ws['!cols'] = [
      { wch: 5 }, { wch: 12 }, { wch: 25 }, { wch: 12 },
      { wch: 20 }, { wch: 8 }, { wch: 8 }, { wch: 10 },
      { wch: 10 }, { wch: 8 }, { wch: 12 }, { wch: 22 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Hasil Ujian');

    // Sheet statistik
    const nilaiArr  = data.map(h => Number(h.Nilai));
    const lulus     = nilaiArr.filter(n => n >= 75).length;
    const wsStats   = XLSX.utils.aoa_to_sheet([
      ['STATISTIK HASIL UJIAN', ''],
      ['Total Peserta',       data.length],
      ['Lulus (Nilai ≥ 75)',  lulus],
      ['Tidak Lulus',         data.length - lulus],
      ['Persentase Lulus',    data.length > 0 ? ((lulus/data.length)*100).toFixed(1)+'%' : '0%'],
      ['Nilai Tertinggi',     nilaiArr.length ? Math.max(...nilaiArr) : '-'],
      ['Nilai Terendah',      nilaiArr.length ? Math.min(...nilaiArr) : '-'],
      ['Rata-rata Nilai',     nilaiArr.length ? (nilaiArr.reduce((a,b)=>a+b,0)/nilaiArr.length).toFixed(2) : '-'],
    ]);
    wsStats['!cols'] = [{ wch: 22 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, wsStats, 'Statistik');

    XLSX.writeFile(wb, filename);
  },

  /**
   * Export soal ke Excel (admin only - termasuk jawaban benar)
   */
  exportSoal(soalList, namaMapel = 'soal') {
    const wb   = XLSX.utils.book_new();
    const data = soalList.map(s => ({
      NoSoal      : s.NoSoal,
      TipeSoal    : s.TipeSoal,
      Pertanyaan  : s.Pertanyaan,
      GambarSoal  : s.GambarSoal  || '',
      OpsiA       : s.OpsiA       || '',  GambarA: s.GambarA || '',
      OpsiB       : s.OpsiB       || '',  GambarB: s.GambarB || '',
      OpsiC       : s.OpsiC       || '',  GambarC: s.GambarC || '',
      OpsiD       : s.OpsiD       || '',  GambarD: s.GambarD || '',
      JawabanBenar: s.JawabanBenar,
      Skor        : s.Skor,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = [
      { wch: 8 }, { wch: 15 }, { wch: 50 }, { wch: 45 },
      { wch: 20 }, { wch: 45 }, { wch: 20 }, { wch: 45 },
      { wch: 20 }, { wch: 45 }, { wch: 20 }, { wch: 45 },
      { wch: 12 }, { wch: 8 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Soal');
    XLSX.writeFile(wb, `soal_${namaMapel}_${new Date().toISOString().slice(0,10)}.xlsx`);
  },
};
