# Implementation Plan & Workflow Pengembangan Aplikasi (Per Sprint)
## Sistem Pengelolaan Inventori dan Pemantauan Produksi CV Solusi Inovasi Packaging

---

## 1. Alur Operasional Aplikasi (Workflow System)

[ Pelanggan ]
│
▼
[ Front Office (FO) ] ──> Input Order + Pilih Brand (dari 5 Brand)
│
├──> System: Check Stock Pre-Validation (MOD-02)
│      ├──> [ Stok Kurang ] ──> Peringatan ke FO / Notifikasi ROP ke Gudang
│      └──> [ Stok Cukup ]  ──> Pesanan Diterima & Masuk Antrean Desain
▼
[ Tim Design ] ──> Cek Spesifikasi Teknis Cetak (Maksimal 4x Revisi Desain)
│
├──> Jalankan BOM Engine (MOD-03)
│      └──> Konversi Kertas (Plano/Rim/Lembar/Kg) + Hitung Waste % & Insheet
│
└──> Terbitkan SPK Digital (MOD-04)
├──> [ Produksi Mandiri ] ──> Terbit SPK Internal
└──> [ Subkontrak ]       ──> Terbit SPK Eksternal (Khusus 4 Vendor Mitra)
▼
[ Kepala Produksi ] ──> Masuk Papan Kanban Produksi (MOD-05)
│
├──> Urutkan Antrean Berdasarkan Deadline Pesanan
└──> Alokasi SPK ke Mesin & Teknisi Penanggung Jawab
▼
[ Status: In-Progress Production & Finishing ]
│
▼
[ Quality Control (QC) ] ──> Inspeksi Fisik Produk (MOD-05)
│
├──> [ Status FAIL ] ──> Dikembalikan ke Antrean Produksi / Re-work
└──> [ Status PASS ] ──> Update Status: Ready to Deliver
▼
[ System Automations ] (MOD-08 & MOD-01)
├──> Mutasi Otomatis Stok Bahan Baku Terpakai (Gudang 1 / Gudang 2)
├──> Generasi PDF Invoice Otomatis untuk Pelanggan
└──> Pencatatan Transaksi ke Immutable Audit Log
▼
[ Modul Analitik (Owner & Manager) ]
├──> Dasbor Stok & ROP Alert Visual Warna Merah (MOD-06)
└──> Analytics Prediksi Harga Bahan Baku Impor berbasis API Kurs USD (MOD-07)


---

## 2. Struktur Tim & Pembagian Dual-Role

Pengembangan dilakukan oleh tim yang terdiri dari 4 anggota dengan penugasan *dual-role*[cite: 4]:

| Anggota Tim | Peran Utama & Peran Kedua | Fokus Utama Pengerjaan |
| :--- | :--- | :--- |
| **Isa Bagus Prakoso** | Project Manager & Back-End Developer[cite: 4] | Manajemen backlog, sprint planning, API backend Laravel (BOM Engine, SPK, Invoice)[cite: 4]. |
| **Samuel Dwi Saputro** | System Analyst & Back-End Developer[cite: 4] | Analisis kebutuhan, skema integrasi, logika bisnis RBAC, mutasi stok ACID, dan modul prediksi Kurs USD[cite: 4]. |
| **Candra Sutomo** | UI/UX Designer & Front-End Developer[cite: 4] | Desain UI/UX Figma, komponen Next.js (App Router, Tailwind CSS), dasbor Kanban, dan antarmuka indikator ROP[cite: 4]. |
| **Mustafa Malik Ibrahim** | Database Engineer & Front-End Developer[cite: 4] | Perancangan ERD PostgreSQL (SQLite dev), migrasi basis data, optimasi kueri stok, dan integrasi antarmuka modul FO/Gudang di Next.js[cite: 4]. |

---

## 3. Implementation Plan per Sprint (Agile Scrum-Kanban)

---

### **Sprint 1 (Minggu 1–2): Foundation Setup, Schema Database & Management Hak Akses (RBAC)**
* **Fokus Utama:** Inisialisasi proyek, arsitektur dasar, basis data PostgreSQL, serta modul otentikasi & RBAC untuk 7 role pengguna[cite: 4].
* **Modul Terkait:** **MOD-09 (Hak Akses & RBAC)** & Fondasi Arsitektur Sistem[cite: 4].
* **Detail Pekerjaan Modul & Fitur:**
  * **Infrastruktur & Arsitektur:** Setup repository Git Flow (monorepo backend/ & frontend/), proyek Laravel REST API + Sanctum, Next.js (App Router + TypeScript), PostgreSQL (SQLite dev), dan Tailwind CSS[cite: 4].
  * **MOD-09 (Hak Akses & RBAC):**
    * *Database DDL:* Pembuatan tabel `users`, `roles`, `permissions`, dan `audit_logs` awal[cite: 4].
    * *Backend:* Implementasi otentikasi API via Laravel Sanctum (login/logout/token/session) dan Middleware RBAC rigid untuk 7 role (*Owner*, *Manager*, *Front Office*, *Tim Design*, *Kepala Produksi*, *Quality Control*, *Staf Gudang*)[cite: 4].
    * *Frontend:* Layout utama aplikasi Next.js yang responsif dan Navigasi Bar dinamis yang beradaptasi sesuai hak akses role login[cite: 4].
* **Pembagian Tugas Anggota Tim:**
  * **Isa Bagus Prakoso (PM & BE):** Setup repositori Git, konfigurasi Laravel REST API & CORS, implementasi Middleware Auth Sanctum[cite: 4].
  * **Samuel Dwi Saputro (Analyst & BE):** Spesifikasi matriks otorisasi RBAC 7 Role, endpoint API permission checker, & logging dasar[cite: 4].
  * **Candra Sutomo (UI/UX & FE):** Desain Figma UI Dashboard layout, Halaman Login, & komponen UI reusabel Next.js[cite: 4].
  * **Mustafa Malik Ibrahim (DB & FE):** Perancangan DDL PostgreSQL/SQLite tabel user/role, integrasi form Login di Next.js[cite: 4].
* **Target Deliverable & Definition of Done (DoD):** Seluruh role dapat melakukan login via API dan Next.js hanya menampilkan menu/halaman yang sesuai dengan tingkat hak aksesnya[cite: 4].

---

### **Sprint 2 (Minggu 3–4): Inventori Multi-Gudang, Multi-Brand & Peringatan Ambang Batas Stok (ROP)**
* **Fokus Utama:** Pengelolaan data stok material di 2 lokasi gudang, filter 5 brand, mutasi aman berprinsip ACID, serta pemicu visual ROP Alert[cite: 4].
* **Modul Terkait:** **MOD-01 (Manajemen Inventori Multi-Gudang & Multi-Brand)** & **MOD-06 (Peringatan Ambang Batas Stok / ROP Alert)**[cite: 4].
* **Detail Pekerjaan Modul & Fitur:**
  * **MOD-01 (Inventori Multi-Gudang & Multi-Brand):**
    * *Database:* Pembuatan tabel `materials`, `warehouses` (Gudang 1 Utama & Gudang 2 Ruko), `brands` (Packsolution.id, Estella, Pepipapier, memoirs.print, pikpurry), `stock_mutations`, dan `batch_lots`[cite: 4].
    * *Backend Logic:* CRUD material (4 kategori: Bahan Baku Utama, Barang Setengah Jadi, Barang Jadi, Spare Part & Consumables)[cite: 4]. Logika mutasi & transfer stok antar-gudang berbasis transaksi PostgreSQL (`BEGIN...COMMIT` dengan DB Locking `SELECT FOR UPDATE` untuk kepatuhan ACID)[cite: 4].
    * *Fitur Khusus:* Modul Stock Opname dan pelacakan nomor Batch/Lot (kadaluarsa tinta & kelembaban kertas)[cite: 4].
  * **MOD-06 (Peringatan Ambang Batas Stok - ROP Alert):**
    * Pemantauan *Safety Stock* minimum per item material[cite: 4].
    * Pemicu otomatis notifikasi visual (*alert* warna merah) pada dasbor Gudang dan Manager saat stok mencapai *Reorder Point*[cite: 4].
* **Pembagian Tugas Anggota Tim:**
  * **Isa Bagus Prakoso (PM & BE):** Controller & API mutasi stok ACID, Service Transfer Stok antar-gudang[cite: 4].
  * **Samuel Dwi Saputro (Analyst & BE):** Analisis transaksi ACID PostgreSQL, logic penentuan ROP & alert checker[cite: 4].
  * **Candra Sutomo (UI/UX & FE):** UI Katalog Material, Filter 5 Brand, Form Transfer Stok, dan komponen Badge Alert ROP Merah[cite: 4].
  * **Mustafa Malik Ibrahim (DB & FE):** Schema DB Material/Warehouse/Mutations, UI Stock Opname & Batch/Lot Tracker[cite: 4].
* **Target Deliverable & Definition of Done (DoD):** Stok ter-update real-time antar gudang tanpa terancam *race condition*, serta indikator ROP warna merah muncul otomatis jika stok $\le$ Safety Stock[cite: 4].

---

### **Sprint 3 (Minggu 5–6): Order Intake Front Office & Engine Kalkulator BOM**
* **Fokus Utama:** Layanan order pelanggan FO, validasi ketersediaan bahan otomatis, pembatasan revisi desain, serta kalkulator konversi bahan baku[cite: 4].
* **Modul Terkait:** **MOD-02 (Front Office & Input Order)** & **MOD-03 (Bill of Materials Engine)**[cite: 4].
* **Detail Pekerjaan Modul & Fitur:**
  * **MOD-02 (Front Office & Input Order):**
    * *Database:* Pembuatan tabel `orders`, `order_items`, dan `order_revisions`[cite: 4].
    * Form *input* order pelanggan FO terintegrasi 5 brand + penentuan prioritas pengerjaan berbasis *deadline*[cite: 4].
    * *Stock Pre-Validation Engine:* Pengecekan ketersediaan bahan baku otomatis saat order di-input (pemberitahuan jika stok kurang)[cite: 4].
    * Aturan pembatasan revisi desain teknis antara pelanggan dan Tim Design maksimal 4 kali per pesanan[cite: 4].
  * **MOD-03 (BOM & Conversion Engine):**
    * *Database:* Pembuatan tabel `boms` dan `conversion_rules`[cite: 4].
    * Algoritma konversi satuan kertas teknis (Plano, Rim, Lembar, Kg) berdasarkan ukuran potong dan gramatur ($GSM$)[cite: 4].
    * Perhitungan otomatis sisa bahan potongan (*waste %*) dan cadangan lembar cetak (*insheet*)[cite: 4].
* **Pembagian Tugas Anggota Tim:**
  * **Isa Bagus Prakoso (PM & BE):** Logic Engine BOM, rumus matematika konversi kertas, waste %, dan insheet[cite: 4].
  * **Samuel Dwi Saputro (Analyst & BE):** Logic Stock Pre-Validation, counter revisi desain (max 4x), dan urutan prioritas deadline[cite: 4].
  * **Candra Sutomo (UI/UX & FE):** UI Form Input Order FO, UI Kalkulator BOM interaktif Tim Design, visual indikator prioritas order[cite: 4].
  * **Mustafa Malik Ibrahim (DB & FE):** Schema DB Orders & BOM, form detail spesifikasi cetak di Next.js[cite: 4].
* **Target Deliverable & Definition of Done (DoD):** FO dapat meng-input order dengan validasi stok instan, Tim Design dapat menghitung BOM otomatis $< 1$ detik, dan sistem mengunci revisi ke-5[cite: 4].

---

### **Sprint 4 (Minggu 7–8): Penerbitan SPK Digital, Kanban Produksi & Inspeksi QC**
* **Fokus Utama:** Automasi cetak dokumen SPK (Internal & 4 Vendor Mitra), papan pelacakan antrean produksi, serta modul kontrol kualitas[cite: 4].
* **Modul Terkait:** **MOD-04 (Penerbitan SPK Digital)** & **MOD-05 (Pelacakan Produksi & Inspeksi QC)**[cite: 4].
* **Detail Pekerjaan Modul & Fitur:**
  * **MOD-04 (Penerbitan SPK Digital):**
    * *Database:* Pembuatan tabel `spks` dan `vendors` (terkunci khusus 4 vendor mitra terdaftar)[cite: 4].
    * Pemicu SPK otomatis terbit setelah spesifikasi desain disetujui (`Design Approved`)[cite: 4].
    * Pemisahan struktur & format PDF SPK Internal (produksi mandiri) dan SPK Eksternal (ditujukan ke 4 vendor mitra)[cite: 4].
  * **MOD-05 (Pelacakan Produksi & Inspeksi QC):**
    * *Database:* Pembuatan tabel `production_stages`, `machine_allocations`, dan `qc_logs`[cite: 4].
    * Dasbor Kanban Produksi real-time (`Design Approved` $\rightarrow$ `In-Progress Production` $\rightarrow$ `Finishing` $\rightarrow$ `QC Passed` $\rightarrow$ `Ready to Deliver`)[cite: 4].
    * Fitur alokasi teknisi/mesin oleh Kepala Produksi & urutan antrean berbasis *deadline*[cite: 4].
    * Form pencatatan inspeksi fisik QC dengan status Lolos (*Pass*) atau Tidak Lolos (*Fail*) & penanganan *re-work* jika Fail[cite: 4].
* **Pembagian Tugas Anggota Tim:**
  * **Isa Bagus Prakoso (PM & BE):** Generator PDF SPK (Internal & Eksternal 4 Vendor), API update status produksi[cite: 4].
  * **Samuel Dwi Saputro (Analyst & BE):** Logic workflow Kanban produksi, pengalihan status QC Pass/Fail[cite: 4].
  * **Candra Sutomo (UI/UX & FE):** UI Papan Kanban Interactive Board, UI Modal Alokasi Mesin, Form Inspeksi QC[cite: 4].
  * **Mustafa Malik Ibrahim (DB & FE):** Schema DB SPK & Production Stages, UI Pratinjau & Download PDF SPK[cite: 4].
* **Target Deliverable & Definition of Done (DoD):** Dokumen SPK PDF terbit $< 3$ detik, Papan Kanban ter-update real-time, dan QC dapat mencatat kelayakan produk[cite: 4].

---

### **Sprint 5 (Minggu 9–10): Analisis Kurs USD, Automasi Invoice, Laporan & Audit Trail**
* **Fokus Utama:** Integrasi API Kurs USD/IDR harian, analitik estimasi harga bahan baku impor, automasi faktur tagihan PDF, serta *immutable log*[cite: 4].
* **Modul Terkait:** **MOD-07 (Prediksi Harga Bahan Baku USD Rate)** & **MOD-08 (Automasi Invoice, Laporan & Audit Trail)**[cite: 4].
* **Detail Pekerjaan Modul & Fitur:**
  * **MOD-07 (Prediksi Harga Bahan Baku berbasis Kurs USD):**
    * *Database:* Pembuatan tabel `currency_logs` dan `supplier_price_histories`[cite: 4].
    * Integrasi HTTP Client ke API Kurs USD/IDR eksternal yang dijalankan harian via Laravel Cron Job / Scheduler[cite: 4].
    * Pencatatan riwayat harga beli dari supplier & modul analitik estimasi tren fluktuasi harga bahan baku impor[cite: 4].
  * **MOD-08 (Automasi Invoice, Laporan & Audit Trail):**
    * *Database:* Pembuatan tabel `invoices` dan `audit_logs` (diatur *read-only* tanpa fitur *delete/update*)[cite: 4].
    * Generasi PDF Invoice otomatis saat pesanan dinyatakan lulus QC (`QC Passed`)[cite: 4].
    * *Immutable Audit Log*: Pencatatan otomatis setiap pergerakan mutasi stok dan penyesuaian transaksi[cite: 4].
    * Fitur ekspor laporan persediaan, pemakaian material per brand, dan operasional ke format Microsoft Excel & PDF[cite: 4].
* **Pembagian Tugas Anggota Tim:**
  * **Isa Bagus Prakoso (PM & BE):** Generator PDF Invoice, Exporter Service (Excel & PDF) via Laravel Excel[cite: 4].
  * **Samuel Dwi Saputro (Analyst & BE):** Integrasi API Kurs USD/IDR, logic analytics tren harga, Middleware Immutable Audit Log[cite: 4].
  * **Candra Sutomo (UI/UX & FE):** UI Dasbor Analitik Grafik Kurs & Tren Harga, UI Halaman Laporan & Audit Trail[cite: 4].
  * **Mustafa Malik Ibrahim (DB & FE):** Schema DB Currency & Audit Log, UI Invoice Preview & Export Buttons[cite: 4].
* **Target Deliverable & Definition of Done (DoD):** Invoice PDF terbit otomatis setelah QC Pass, API Kurs USD ter-update harian, serta Audit Log tercatat otomatis tanpa bisa diubah/dihapus[cite: 4].

---

### **Sprint 6 (Minggu 11–12): Integration Testing, Optimization, UAT Mitra & Production Deployment**
* **Fokus Utama:** Pengujian sistem secara komprehensif, User Acceptance Testing (UAT), perbaikan bug, dan peluncuran ke server VPS[cite: 4].
* **Detail Pekerjaan:**
  * **Pengujian Fungsional & Non-Fungsional:**
    * *ACID Transaction Check:* Verifikasi transaksi stok bebas dari *race condition*[cite: 4].
    * *Performance Test:* Response time standar $< 2$s, BOM Engine $< 1$s, dan pembuatan PDF $< 3$s[cite: 4].
    * *Security Test:* Verifikasi pembatasan RBAC 7 Role[cite: 4].
  * **UAT & Bug Fixing:** Pengujian pengguna langsung bersama manajemen CV Solusi Inovasi Packaging[cite: 4].
  * **Deployment & Operational Setup:**
    * *Production Server Deployment:* Konfigurasi VPS Linux Ubuntu (NGINX, SSL Let's Encrypt, PostgreSQL, Supervisor Queue Worker)[cite: 4].
    * *Data Seeding:* Pengisian data master awal (2 gudang, 5 brand, material, supplier, 4 vendor mitra)[cite: 4].
    * *Documentation:* Penerbitan dokumen *User Manual* dan *Release Notes*[cite: 4].
* **Pembagian Tugas Anggota Tim:**
  * **Isa Bagus Prakoso (PM & BE):** Deployment VPS, NGINX, Supervisor Queue, SSL, & Koordinasi UAT[cite: 4].
  * **Samuel Dwi Saputro (Analyst & BE):** Integration testing, ACID verification, & penyusunan User Manual[cite: 4].
  * **Candra Sutomo (UI/UX & FE):** UI Refinement, Responsive Design Check (Desktop, Laptop, Tablet Gudang, Smartphone), Bug Fixing UI[cite: 4].
  * **Mustafa Malik Ibrahim (DB & FE):** Database Seeding, Database Indexing & Optimization, Backup Scripting[cite: 4].
* **Target Deliverable & Definition of Done (DoD):** Aplikasi aktif (*live*) di lingkungan produksi, lolos pengujian UAT mitra, dan siap digunakan untuk operasional harian CV Solusi Inovasi Packaging[cite: 4].

---

## 4. Matriks Ringkasan Pelaksanaan Sprint

| Sprint | Durasi | Fokus Pekerjaan Utama | Target Modul Selesai | Penanggung Jawab Utama |
| :--- | :--- | :--- | :--- | :--- |
| **Sprint 1** | Minggu 1–2 | Environment Setup, Schema PostgreSQL, Auth & RBAC 7 Roles[cite: 4] | MOD-09 | Tim Dev (Lead: Isa & Samuel)[cite: 4] |
| **Sprint 2** | Minggu 3–4 | Inventori Multi-Gudang (2 Gudang), 5 Brand, Mutasi ACID, ROP Alert[cite: 4] | MOD-01, MOD-06 | Mustafa & Samuel[cite: 4] |
| **Sprint 3** | Minggu 5–6 | Order Intake FO, Stock Pre-Validation, Algoritma BOM Engine[cite: 4] | MOD-02, MOD-03 | Isa & Candra[cite: 4] |
| **Sprint 4** | Minggu 7–8 | Generator SPK Digital (Internal/4 Vendor), Kanban Produksi & QC[cite: 4] | MOD-04, MOD-05 | Isa, Candra & Mustafa[cite: 4] |
| **Sprint 5** | Minggu 9–10 | API Kurs USD, Analytics Harga Bahan Impor, Invoice PDF & Audit Log[cite: 4] | MOD-07, MOD-08 | Samuel & Isa[cite: 4] |
| **Sprint 6** | Minggu 11–12 | Integration Testing, Optimization, UAT Mitra & Deployment VPS[cite: 4] | Final Release | Seluruh Anggota Tim[cite: 4] |