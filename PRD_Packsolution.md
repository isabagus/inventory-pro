# Product Requirement Document (PRD)
## Sistem Pengelolaan Inventori dan Pemantauan Produksi dengan Fitur Prediksi Harga Bahan Baku

---

## 1. Informasi Umum & Tujuan Produk
* **Nama Sistem:** Sistem Pengelolaan Inventori dan Pemantauan Produksi dengan Fitur Prediksi Harga Bahan Baku.
* **Klien / Mitra:** CV Solusi Inovasi Packaging[cite: 4].
* **Cakupan Brand (5 Brand):** Packsolution.id, Estella Digital Printing, Pepipapier, memoirs.print, dan pikpurry[cite: 4].
* **Cakupan Lokasi (2 Gudang):** Gudang 1 (Utama) dan Gudang 2 (Toko / Ruko)[cite: 4].
* **Tujuan Utama:** Mengintegrasikan alur operasional dari penerimaan order penjualan, pengecekan ketersediaan stok bahan baku multi-gudang, otomatisasi perhitungan kebutuhan bahan (BOM Engine), pembuatan SPK internal/vendor, pemantauan status produksi & QC, hingga modul analisis prediksi harga bahan baku impor berbasis fluktuasi kurs USD[cite: 4].
* **Tech Stack & Infrastruktur:**
  * **Backend Framework:** PHP / Laravel (Decoupled REST API Architecture + Laravel Sanctum)[cite: 4].
  * **Frontend Framework:** Next.js (App Router, TypeScript, Tailwind CSS)[cite: 4].
  * **Database:** PostgreSQL (Prinsip Transaksi ACID) — Didukung SQLite file-based untuk lingkungan pengembangan lokal awal[cite: 4].
  * **Integrasi Eksternal:** API Kurs USD/IDR[cite: 4].

---

## 2. Matriks Hak Akses Pengguna (RBAC - 7 Roles)

| Peran (Role) | Tanggung Jawab Operasional | Hak Akses Utama Sistem |
| :--- | :--- | :--- |
| **Owner** | Pengawasan menyeluruh aktivitas bisnis dan evaluasi laporan eksekutif[cite: 4]. | Full access ke seluruh modul, pemantauan transaksi inventori, dan audit log[cite: 4]. |
| **Manager** | Pengawasan proses bisnis, persetujuan pesanan khusus, dan evaluasi stok opname[cite: 4]. | Otorisasi pesanan khusus, evaluasi stok opname, dan penyesuaian batas safety stock/ROP[cite: 4]. |
| **Front Office (FO)** | Pelayanan pelanggan, input order pesanan, dan verifikasi ketersediaan stok[cite: 4]. | Form input order, verifikasi ketersediaan stok otomatis (Stock Pre-validation)[cite: 4]. |
| **Tim Design** | Verifikasi spesifikasi cetak, perhitungan BOM, dan penerbitan SPK[cite: 4]. | Modul BOM Engine, pembuat SPK Digital (Internal & External), pembatasan revisi (maksimal 4x)[cite: 4]. |
| **Kepala Produksi** | Pengaturan antrean produksi, alokasi mesin/teknisi, dan pemantauan tahapan[cite: 4]. | Papan Kanban produksi, alokasi SPK ke teknisi, dan pembaruan status pengerjaan[cite: 4]. |
| **Quality Control (QC)** | Pemeriksaan kualitas produk setengah jadi dan barang jadi[cite: 4]. | Modul inspeksi QC, input status kelayakan (Pass/Fail), dan update status akhir barang[cite: 4]. |
| **Staf Gudang** | Pencatatan mutasi barang, pemindahan antar-gudang, dan stock opname[cite: 4]. | Inventory ledger, transfer stok (Gudang 1 <-> Gudang 2), batch/lot tracker, dan konversi satuan[cite: 4]. |

---

## 3. Spesifikasi Modul Utama (Product Requirements)

| Kode Modul | Nama Modul | Deskripsi Kebutuhan & Fitur Utama |
| :--- | :--- | :--- |
| **MOD-01** | **Manajemen Inventori Multi-Gudang & Multi-Brand**[cite: 4] | • Pengelompokan stok: Bahan Baku Utama, Barang Setengah Jadi, Barang Jadi, Spare Part & Consumables[cite: 4].<br>• Filter dinamis stok dan riwayat pemakaian berbasis 5 brand[cite: 4].<br>• Pencatatan mutasi barang dan transfer stok real-time antara Gudang 1 dan Gudang 2[cite: 4].<br>• Stock opname dan pelacakan nomor batch/lot (kadaluarsa tinta & kelembaban kertas)[cite: 4]. |
| **MOD-02** | **Front Office & Input Order**[cite: 4] | • Antarmuka input pesanan pelanggan terintegrasi 5 brand[cite: 4].<br>• Pengecekan ketersediaan bahan otomatis (Stock Pre-validation)[cite: 4].<br>• Pembatasan revisi desain teknis maksimal 4 kali per pesanan[cite: 4].<br>• Penentuan prioritas pengerjaan berbasis deadline pelanggan[cite: 4]. |
| **MOD-03** | **BOM (Bill of Materials) & Conversion Engine**[cite: 4] | • Perhitungan alokasi bersih kebutuhan bahan baku secara otomatis[cite: 4].<br>• Konversi otomatis satuan kertas (Plano, Rim, Lembar, Kg) berbasis ukuran potong & gramatur[cite: 4].<br>• Kalkulasi sisa bahan potongan (waste %) dan cadangan cetak (insheet)[cite: 4]. |
| **MOD-04** | **Penerbitan SPK Digital (Internal & External)**[cite: 4] | • Generasi dokumen SPK Digital terstandar setelah spesifikasi teknis disetujui[cite: 4].<br>• Pemisahan struktur SPK Internal (produksi mandiri) dan SPK Eksternal (khusus 4 vendor mitra terdaftar)[cite: 4]. |
| **MOD-05** | **Pelacakan Produksi & Inspeksi QC**[cite: 4] | • Dasbor Kanban real-time: `Design Approved` -> `In-Progress Production` -> `Finishing` -> `QC Passed` -> `Ready to Deliver`[cite: 4].<br>• Input inspeksi fisik oleh QC dengan status Pass atau Fail[cite: 4].<br>• Alokasi mesin dan teknisi penanggung jawab oleh Kepala Produksi[cite: 4]. |
| **MOD-06** | **Peringatan Ambang Batas Stok (ROP Alert)**[cite: 4] | • Pemantauan safety stock minimum per jenis material[cite: 4].<br>• Pemicu notifikasi visual (alert warna merah) saat stok mencapai Reorder Point[cite: 4]. |
| **MOD-07** | **Prediksi Harga Bahan Baku (USD Rate Analytics)**[cite: 4] | • Pencatatan histori harga beli bahan baku dari supplier[cite: 4].<br>• Integrasi harian API Kurs USD/IDR eksternal[cite: 4].<br>• Analisis estimasi tren perubahan harga bahan baku impor berbasis fluktuasi kurs[cite: 4]. |
| **MOD-08** | **Automasi Invoice, Laporan & Audit Trail**[cite: 4] | • Generasi dokumen PDF Invoice otomatis setelah barang lulus QC[cite: 4].<br>• Pencatatan Immutable Audit Log (riwayat mutasi stok & transaksi read-only)[cite: 4].<br>• Ekspor laporan persediaan, pemakaian per brand, dan operasional ke format Excel & PDF[cite: 4]. |
| **MOD-09** | **Hak Akses & Manajemen Pengguna (RBAC)**[cite: 4] | • Pembatasan hak akses fitur dan tampilan antarmuka secara ketat untuk 7 role pengguna[cite: 4]. |

---

## 4. Kebutuhan Non-Fungsional (NFR)
* **Kinerja & Skalabilitas (NFR-01):** Response time transaksi standar maksimal 2 detik[cite: 4], kalkulasi BOM Engine < 1 detik[cite: 4], generasi PDF SPK/Invoice maksimal 3 detik[cite: 4].
* **Keamanan & Akuntabilitas (NFR-02):** Akses endpoint dikontrol ketat oleh RBAC[cite: 4], kata sandi terenkripsi aman[cite: 4], log audit mutasi stok bersifat immutable (tidak dapat diubah/dihapus)[cite: 4].
* **Keandalan Data (NFR-03):** PostgreSQL wajib menerapkan transaksi berprinsip ACID untuk mencegah race condition stok[cite: 4], target ketersediaan sistem > 97% selama jam operasional[cite: 4].
* **Kebiasaan Penggunaan & UI (NFR-04):** Desain antarmuka responsive (desktop, laptop, tablet gudang, smartphone)[cite: 4], dasbor menggunakan indikator warna visual (merah untuk ROP kritis, kuning/merah untuk pesanan urgent)[cite: 4].
* **Arsitektur (NFR-05):** Single codebase menggunakan arsitektur Laravel Monolith[cite: 4].

---

## 5. Batasan Sistem (System Boundary)
* **In-Scope:** Pengelolaan stok terpusat 2 gudang & 5 brand[cite: 4], kalkulasi otomatis BOM[cite: 4], SPK Internal & Eksternal (4 vendor mitra)[cite: 4], Kanban tracking produksi & QC[cite: 4], analitik prediksi harga berbasis kurs USD[cite: 4], otomasi Invoice PDF & Immutable Audit Trail[cite: 4].
* **Out-of-Scope:** Pengelolaan akuntansi/keuangan lengkap, perhitungan laba-rugi, penggajian (payroll)[cite: 4], payment gateway[cite: 4], serta pemantauan langsung proses internal di lokasi vendor[cite: 4].