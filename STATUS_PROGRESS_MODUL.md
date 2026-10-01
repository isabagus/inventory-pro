# Status Progres Pengembangan Modul Sistem ERP/CRM
## CV Solusi Inovasi Packaging

Dokumen ini melacak status capaian pengembangan sistem berdasarkan **PRD**, **Dokumentasi Workflow ERP/CRM**, dan **Task_Plan.md**. Dokumen ini merinci modul yang telah diselesaikan, riwayat kendala teknis yang sempat tertunda dan solusinya, pembersihan antarmuka non-aplikasi, serta antrean fitur berikutnya.

*Terakhir diperbarui: 29 September 2026 (Backend Master Data CRUD & Frontend 100% Passing)*

---

## 1. Matriks Ringkasan Status per Modul

| Kode Modul | Nama Modul | Sprint | Status Backend | Status Frontend | Status Keseluruhan |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **CORE-UI** | **Design System "Tech Cobalt" & 40+ Ikon Vektor** | Sprint 1 | — |  Selesai | **SELESAI PENUH (100%)** |
| **MOD-09** | **Hak Akses & Manajemen Pengguna (RBAC 7-Role)** | Sprint 1 |  Selesai |  Selesai | **SELESAI PENUH (100%)** |
| **MOD-01** | **Manajemen Inventori Multi-Gudang & Multi-Brand** | Sprint 2 | 🔄 CRUD Selesai (80%) |  Selesai | **SELESAI SEBAGIAN (90%)** |
| **MOD-06** | **Peringatan Ambang Batas Stok (ROP Alert Center)** | Sprint 2 |  Selesai (85%) |  Selesai | **SELESAI SEBAGIAN (92%)** |
| **MOD-02** | **Front Office & Input Order (Pre-Validation & Revisi)** | Sprint 3 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **MOD-03** | **BOM Calculator & Pola Potong Conversion Engine** | Sprint 3 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **MOD-04** | **Penerbitan SPK Digital (Internal & 4 Vendor Mitra)** | Sprint 4 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **MOD-05** | **Kanban Produksi 4-Tahap & Lembar Inspeksi QC** | Sprint 4 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **MOD-07** | **Analitik Kurs USD & Sensitivitas Bahan Baku Impor** | Sprint 5 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **MOD-08** | **Faktur Invoice, Laporan Bisnis & Immutable Audit** | Sprint 5 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **NFR-DEP** | **Integration Testing, Load Test & VPS Deployment** | Sprint 6 | ⏳ Antrean | ⏳ Antrean | **BELUM (0%)** |

---

## 2. Rincian Progres yang Sempat Tertunda & Solusi yang Telah Selesai Tuntas

Berikut adalah inventarisasi kendala teknis dan modul yang sempat tertunda pengerjaannya beserta langkah mitigasi dan status penyelesaiannya:

### A. Fatal Error Artisan Server & Merge Conflict Git
* **Kondisi Tertunda:** `php artisan serve` mengalami crash fatal dengan pesan `PHP Fatal error: Call to a member function handleCommand() on int in artisan:16` serta terdapat sisa conflict marker git (`<<<<<<<`) di berkas composer dan model. File [backend/bootstrap/app.php](file:///c:/Users/ricky/Documents/DATA%20ISA/CAPSTONE/new-inventory/backend/bootstrap/app.php) sempat terpotong menjadi 0 bytes.
* **Tindakan Solusi:** 
  - Seluruh conflict marker git telah dibersihkan secara menyeluruh.
  - Memulihkan konfigurasi Laravel 11 pada [backend/bootstrap/app.php](file:///c:/Users/ricky/Documents/DATA%20ISA/CAPSTONE/new-inventory/backend/bootstrap/app.php) dengan inisialisasi routing API dan pendaftaran alias middleware otorisasi (`role` dan `permission`).
  - Server backend Laravel berjalan normal pada port 8000.

### B. Bentrokan Skema Migrasi Database (Duplicate Migration Collision)
* **Kondisi Tertunda:** Perintah migrasi gagal dieksekusi karena terdapat file migrasi duplikat warisan Sprint 1 (`0001_01_01_000000_create_users_table.php` dan `2026_09_22_084451_create_roles_and_permissions_tables.php`) yang bertubrukan dengan skema terstandardisasi 2026_09_25.
* **Tindakan Solusi:**
  - Menghapus 2 file migrasi duplikat yang usang.
  - Menjalankan migrasi bersih (`php artisan migrate:fresh`). Seluruh 22 migration inti berjalan sukses tanpa hambatan, membentuk struktur tabel: `roles`, `permissions`, `role_has_permissions`, `users`, `warehouses`, `brands`, `categories`, `suppliers`, `materials`, `material_brand`, `warehouse_stocks`, `stock_mutations`, `batch_lots`, `stock_opnames`, hingga `audit_logs`.

### C. Backend Master Data CRUD API (Sebelumnya Belum Terimplementasi)
* **Kondisi Tertunda:** Frontend antarmuka katalog inventori belum memiliki REST API backend untuk operasi data master (Material, Gudang, Brand, Kategori, Supplier) sehingga data belum persisten.
* **Tindakan Solusi:**
  - Membangun 5 Controller REST API lengkap di backend Laravel:
    1. **`MaterialController` (`/api/v1/materials`):** CRUD material lengkap dengan kalkulasi persediaan per gudang (Gudang 1 & Gudang 2), filter 5 brand, filter 4 kategori, dan status peringatan ROP kritis.
    2. **`WarehouseController` (`/api/v1/warehouses`):** CRUD gudang fisik dengan kalkulasi total SKU dan volume persediaan.
    3. **`BrandController` (`/api/v1/brands`):** CRUD brand percetakan mitra.
    4. **`CategoryController` (`/api/v1/categories`):** CRUD kategori bahan baku dengan validasi dependensi.
    5. **`SupplierController` (`/api/v1/suppliers`):** CRUD supplier resmi dengan proteksi integritas transaksi.
  - Membuat [backend/database/seeders/MasterDataSeeder.php](file:///c:/Users/ricky/Documents/DATA%20ISA/CAPSTONE/new-inventory/backend/database/seeders/MasterDataSeeder.php) yang mengisikan data operasional riil: 2 Gudang, 5 Brand, 4 Kategori, 4 Supplier, katalog material kertas/tinta spesifik, dan saldo awal stok.

### D. Kredensial 7 Role Akun Demo & Format Token Sanctum
* **Kondisi Tertunda:** Halaman login sempat memotong tampilan akun demo sehingga hanya menampilkan sebagian role, serta parsing token Sanctum antara backend dan frontend belum sinkron.
* **Tindakan Solusi:**
  - Memperbarui [frontend/src/app/login/page.tsx](file:///c:/Users/ricky/Documents/DATA%20ISA/CAPSTONE/new-inventory/frontend/src/app/login/page.tsx) dengan daftar 7 akun demo lengkap (Owner, Manager, Front Office, Tim Design, Kepala Produksi, Quality Control, Staf Gudang) dilengkapi tombol **1-Tap Quick Login** baik pada desktop maupun mobile drawer.
  - Memperbarui [AuthContext.tsx](file:///c:/Users/ricky/Documents/DATA%20ISA/CAPSTONE/new-inventory/frontend/src/contexts/AuthContext.tsx) agar fleksibel menerima `token` maupun `access_token`, otomatis memetakan permission format titik (`.`) maupun titik dua (`:`), serta menyediakan fallback demo instan.

### E. Navigasi Role-Based (Sidebar & BottomNav)
* **Kondisi Tertunda:** Perbedaan penulisan role antara database (`front-office`, tanda strip) dan konfigurasi frontend (`front_office`, garis bawah) menyebabkan sidebar sempat kosong dan tab utama BottomNav tidak terisi dengan benar.
* **Tindakan Solusi:**
  - Menormalisasi string role pada `navigation.ts` dan `BottomNav.tsx`. Seluruh peran kini mendapatkan daftar menu yang presisi sesuai wewenang tugasnya.

---

## 3. Pembersihan Tampilan Non-Aplikasi (UI Cleanup)

Telah dilakukan pembersihan elemen visual yang tidak berhubungan dengan operasional bisnis aplikasi:
1. **Menghilangkan Widget Developer Roadmap Sprint:** Pada halaman dashboard utama pengguna, widget internal pengembang ("Status Roadmap Sprint 1-6") telah dihapus karena tidak relevan bagi pengguna operasional pabrik.
2. **Menghilangkan Dump Raw String Permissions:** Daftar teks mentah permission RBAC yang sebelumnya ditampilkan secara debug telah ditiadakan.
3. **Mengganti Metrik Pengembang dengan KPI Bisnis Riil:**
   - Metrik Owner `"Status Sprint: Sprint 1"` telah digantikan dengan KPI operasional bisnis: **`"Valuasi Stok Material: Rp 128.5 jt"`** (Total persediaan 4 kategori bahan baku).
4. **Menambahkan Pintasan Cepat Modul Operasional:** Ditambahkan panel kartu akses langsung ke modul-modul aktif sesuai hak akses peran yang sedang login (seperti Inventori, Pesanan, BOM, SPK, QC, dll.).

---

## 4. Hasil Verifikasi Kualitas & Pengujian Sistem

* **Backend Test Suite (PHPUnit):**
  - `Sprint1AuthDatabaseTest`: 6 Passed
  - `MasterDataCrudTest`: 7 Passed (150 assertions)
  - **Total:** 13 Passed (169 assertions, 0 failures).
* **Frontend Static Production Build (Next.js Turbopack):**
  - Seluruh 17 rute aplikasi terkompilasi **100% Passed** tanpa peringatan TypeScript atau linting.
* **Server Status:**
  - Backend API: `http://127.0.0.1:8000` (Running)
  - Frontend App: `http://localhost:3000` (Running)

---

## 5. Progres yang Masih Dalam Antrean Pengembangan (Pending / Next Backlog)

Berikut rincian fitur lanjutan yang dijadwalkan untuk pengerjaan berikutnya:

### Prioritas 1 — Penyelesaian Penuh Sprint 2 (Inventori & ROP):
1. **`StockTransferService` (ACID Transaction):**
   - Implementasi mutasi perpindahan stok antar Gudang 1 dan Gudang 2 menggunakan mekanisme `DB::transaction` dan row-locking PostgreSQL (`SELECT ... FOR UPDATE`) untuk menjamin zero race condition.
2. **Rekonsiliasi Stock Opname & Approval Manager:**
   - Endpoint backend untuk freeze snapshot sistem, pencatatan physical count, kalkulasi selisih otomatis, dan approval Manager sebelum mutasi koreksi dibukukan.
3. **Penyempurnaan Webhook Peringatan ROP:**
   - Notifikasi real-time via event trigger saat level stok material $\le$ ambang batas ROP.

### Prioritas 2 — Sprint 3 (Front Office & BOM Calculator):
1. **`OrderPreValidationService`:**
   - Pengecekan otomatis ketersediaan stok bahan secara instan saat Front Office mengisi formulir pesanan baru.
2. **`BomCalculationEngine`:**
   - Formula matematika konversi plano (79x109, 65x100) ke ukuran cetak potong, perhitungan insheet, gramatur GSM ke kilogram, dan waste factor.
3. **Pembatasan Revisi Desain:**
   - Logic penguncian otomatis formulir jika revisi mencapai batas maksimum (4x) serta eskalasi persetujuan ke Manager.

### Prioritas 3 — Sprint 4 (SPK Digital, Kanban & QC):
1. **Generator SPK Digital (PDF Rendering Engine):**
   - Cetak SPK Internal (mesin/teknisi) dan SPK Eksternal untuk 4 vendor mitra.
2. **State Machine Kanban Produksi & Checklist QC Pass/Fail.**
