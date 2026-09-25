# Task Plan (Work Breakdown Structure & Action Plan)
## Sistem Pengelolaan Inventori dan Pemantauan Produksi CV Solusi Inovasi Packaging

Dokumen ini merupakan panduan operasional teknis dan rincian pembagian tugas (*Task Plan / Work Breakdown Structure*) untuk tim pengembang berdasarkan **PRD**, **Dokumentasi Workflow ERP/CRM**, dan **Implementation Plan (Sprint 1 – Sprint 6)**.

---

## 1. Ikhtisar Tim & Alokasi Peran (Dual-Role Allocation)

Pengembangan sistem dikerjakan oleh 4 personil dengan pembagian peran ganda (*dual-role*):

| Inisial | Nama Anggota | Peran Utama & Kedua | Fokus & Tanggung Jawab Teknis |
| :--- | :--- | :--- | :--- |
| **ISA** | Isa Bagus Prakoso | Project Manager & Back-End Developer | Manajemen backlog, arsitektur backend Laravel, BOM Engine, generator SPK & Invoice PDF, deployment VPS. |
| **SAM** | Samuel Dwi Saputro | System Analyst & Back-End Developer | Analisis alur data, otorisasi RBAC 7-role, transaksi mutasi stok ACID, integrasi API Kurs USD harian, audit logging. |
| **CAN** | Candra Sutomo | UI/UX Designer & Front-End Developer | Prototipe Figma, implementasi komponen Next.js (App Router, Tailwind CSS), Kanban board produksi, alert visual ROP, responsive layout. |
| **MUS** | Mustafa Malik Ibrahim | Database Engineer & Front-End Developer | DDL & optimasi PostgreSQL (didukung SQLite dev), query indexing, data seeding, antarmuka Front Office, stok opname & batch/lot tracker di Next.js. |

---

## 2. Rincian Task Plan per Sprint

---

### Sprint 1 (Minggu 1–2): Foundation Setup, Schema Database & Management Hak Akses (RBAC)
* **Tujuan Utama:** Menyiapkan fondasi arsitektur sistem decoupled (Backend Laravel 11 REST API + Sanctum, Frontend Next.js App Router + TypeScript, PostgreSQL/SQLite), migrasi tabel inti, serta sistem otentikasi API dan otorisasi rigid untuk 7 role pengguna.
* **Modul Terkait:** **MOD-09 (Hak Akses & RBAC)**, System Foundation & Security.

| Task ID | Nama & Deskripsi Aktivitas Teknis | Layer | PIC | Modul | Status | Deliverable / Output |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **TSK-S1-01** | **Setup Repositori & Environment Standar**<br>Inisialisasi repo Git monorepo (`backend/` & `frontend/`), setup Laravel 11 API, Next.js (App Router, TypeScript, Tailwind CSS), SQLite lokal dev, serta CORS configuration. | DevOps | ISA | Core |  **DONE** | Repositori aktif dengan project `backend` (Laravel) & `frontend` (Next.js) terinstalasi. |
| **TSK-S1-02** | **Desain Desain Sistem & Prototipe UI Master di Figma**<br>Membuat palet warna "Tech Cobalt", tipografi, komponen tombol, card, table, dan modal yang konsisten, serta layout master antarmuka web. | UI/UX | CAN | Core |  **DONE** | Tema Tech Cobalt Light/Dark & 41+ ikon SVG teknis. |
| **TSK-S1-03** | **Perancangan Skema DDL Database Inti & RBAC**<br>Menyusun migration PostgreSQL/SQLite untuk tabel `users`, `roles`, `permissions`, `personal_access_tokens`, serta indeks pencarian. | DB | MUS | MOD-09 |  **DONE** | File migration database Laravel siap dieksekusi tanpa error. |
| **TSK-S1-04** | **Spesifikasi Matriks Hak Akses & Permission Matrix 7 Role**<br>Menyusun dokumen pemetaan permission detail untuk: Owner, Manager, FO, Tim Design, Kepala Produksi, QC, dan Staf Gudang. | Analyst | SAM | MOD-09 |  **DONE** | Matriks JSON / Config array permission untuk 7 role. |
| **TSK-S1-05** | **Implementasi Backend Authentication & Middleware RBAC**<br>Implementasi controller login/logout/me API, Laravel Sanctum token/cookie auth, dan Middleware otorisasi rigid berbasis 7 role. | BE | ISA | MOD-09 |  **DONE** | Middleware API `RoleMiddleware` & `PermissionMiddleware` teruji. |
| **TSK-S1-06** | **Pembuatan Slicing Layout Master & Navigasi Dinamis**<br>Membuat layout shell Next.js App Router yang responsif (Sidebar, Header, Profile Menu) dengan navigasi dinamis berdasar role login. | FE | CAN | MOD-09 |  **DONE** | Komponen layout Next.js dengan adaptasi menu per role. |
| **TSK-S1-07** | **Pembuatan Halaman Autentikasi Frontend & Integrasi API**<br>Membuat form Login Next.js, Forgot Password, integrasi API client ke endpoint Sanctum, error handling, dan redirect role. | FE | MUS | MOD-09 |  **DONE** | Halaman login Next.js interaktif dengan verifikasi kredensial ke API. |
| **TSK-S1-08** | **Seeder Role & Akun Pengguna Dummy 7 Role**<br>Membuat database seeder untuk akun uji coba ke-7 role lengkap dengan credential standar pengembangan. | DB | MUS | MOD-09 |  **DONE** | Command `php artisan db:seed` siap menginisialisasi 7 user. |
| **TSK-S1-09** | **Pengujian Unit & Integrasi Auth/RBAC (Sprint Review 1)**<br>Memastikan setiap akun hanya dapat mengakses rute yang diizinkan dan redirect jika melanggar permission. | QA | SAM | MOD-09 |  **DONE** | Laporan uji otorisasi lolos 100% tanpa celah privilege escalation. |

---

### Sprint 2 (Minggu 3–4): Inventori Multi-Gudang, Multi-Brand & Peringatan Ambang Batas Stok (ROP)
* **Tujuan Utama:** Mengembangkan modul inventori 2 gudang (Gudang 1 & Gudang 2) untuk 5 brand, mutasi stok ACID aman dari race condition, pelacakan batch/lot, stock opname, dan peringatan visual ROP merah.
* **Modul Terkait:** **MOD-01 (Manajemen Inventori Multi-Gudang & Multi-Brand)** & **MOD-06 (Peringatan Ambang Batas Stok / ROP Alert)**.

| Task ID | Nama & Deskripsi Aktivitas Teknis | Layer | PIC | Modul | Status | Deliverable / Output |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **TSK-S2-01** | **Skema Database Master Inventori, Gudang & Brand**<br>Migration tabel `materials`, `warehouses` (2 lokasi), `brands` (5 brand), `stock_levels`, `stock_mutations`, `batch_lots`, `stock_opnames`. | DB | MUS | MOD-01 | ⏳ **PENDING (PRIORITAS 1)** | Migration & model relationship Eloquent PostgreSQL. |
| **TSK-S2-02** | **Analisis Logika Penentuan Reorder Point (ROP) & Safety Stock**<br>Merumuskan formula kalkulasi ROP per material, batas safety stock, serta mekanisme penandaan visual status kritis. | Analyst | SAM | MOD-06 |  **DONE** | Dokumen spesifikasi aturan ROP, threshold, dan event trigger. |
| **TSK-S2-03** | **Service Backend Mutasi Stok & Transfer Antar-Gudang (ACID)**<br>Membangun logic mutasi stok menggunakan `DB::transaction` dan PostgreSQL Row Locking (`SELECT FOR UPDATE`) untuk mencegah race condition. | BE | ISA | MOD-01 | ⏳ **PENDING (PRIORITAS 1)** | Service class `StockTransferService` berprinsip ACID. |
| **TSK-S2-04** | **Backend API Master Data Material & Batch/Lot Tracker**<br>CRUD data material (4 kategori), pencatatan kedatangan inbound material, expiry date tinta, dan parameter kelembaban kertas. | BE | SAM | MOD-01 | ⏳ **PENDING (PRIORITAS 1)** | API endpoints `/api/materials` & `/api/inbound-batches`. |
| **TSK-S2-05** | **UI Katalog Stok Multi-Gudang dengan Filter 5 Brand**<br>Komponen antarmuka katalog inventori interaktif, filter tab 5 brand, filter 2 gudang, pencarian SKU, dan indikator level stok. | FE | CAN | MOD-01 |  **DONE** | Halaman `/dashboard/inventory` selesai dengan filter multi-level. |
| **TSK-S2-06** | **UI Form Transfer Antar-Gudang & Inbound Material**<br>Formulir transfer stok dengan validasi kuantitas instan, scan barcode/SKU, dan modal input data batch/lot inbound. | FE | CAN | MOD-01 |  **DONE** | Modal transfer stok ACID & modal inbound batch/lot. |
| **TSK-S2-07** | **Modul Stock Opname & Form Rekonsiliasi Selisih**<br>Pengembangan modul stock opname: freeze snapshot sistem, input physical count, kalkulasi selisih otomatis, dan form approval Manager. | FE/BE | MUS | MOD-01 | 🔄 **FE DONE / BE PENDING** | UI Stock Opname selesai, menunggu API reconciliation backend. |
| **TSK-S2-08** | **Komponen Visual Alert ROP Merah & Notification Center**<br>Implementasi badge indikator merah pada header/navbar saat stok $\le$ ROP, panel ringkasan stok kritis, dan tombol aksi reorder. | FE | CAN | MOD-06 |  **DONE** | Drawer notifikasi ROP Alert Center & badge peringatan stok kritis. |
| **TSK-S2-09** | **Unit Testing Mutasi Stok Konkuren & Verifikasi ROP**<br>Stress test mutasi transfer stok simultan untuk membuktikan ketiadaan race condition dan validasi trigger ROP. | QA | SAM | MOD-01, MOD-06 | ⏳ **PENDING** | Script & laporan test mutasi konkurensi sukses tanpa minus stock. |

---

### Sprint 3 (Minggu 5–6): Order Intake Front Office & Engine Kalkulator BOM
* **Tujuan Utama:** Membangun antarmuka penerimaan order pelanggan terintegrasi 5 brand oleh Front Office (FO), engine validasi ketersediaan bahan, batas revisi desain (maks. 4x), dan engine kalkulasi BOM cetak.
* **Modul Terkait:** **MOD-02 (Front Office & Input Order)** & **MOD-03 (BOM & Conversion Engine)**.

| Task ID | Nama & Deskripsi Aktivitas Teknis | Layer | PIC | Modul | Status | Deliverable / Output |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **TSK-S3-01** | **Skema Database Order, Order Items, Revisi & Formula BOM**<br>Migration tabel `customers`, `orders`, `order_items`, `order_revisions`, `boms`, `bom_items`, dan `paper_conversions`. | DB | MUS | MOD-02, MOD-03 | ⏳ **PENDING (PRIORITAS 2)** | Skema relasi order & BOM PostgreSQL terverifikasi. |
| **TSK-S3-02** | **Spesifikasi Alur Validasi Stok Awal & Rule Revisi Desain**<br>Menyusun algoritma pengecekan stok pre-validation saat checkout FO serta aturan penguncian revisi ke-4 (escalation to Manager). | Analyst | SAM | MOD-02 |  **DONE** | Dokumen spesifikasi bisnis state machine order & approval revisi. |
| **TSK-S3-03** | **Service Backend Stock Pre-Validation & Order Processing**<br>Endpoint untuk validasi ketersediaan stok material di gudang secara instan saat FO mengisi form dan simpan order berstatus `Order Placed`. | BE | SAM | MOD-02 | ⏳ **PENDING** | Service class `OrderPreValidationService`. |
| **TSK-S3-04** | **Pembangunan Algoritma & Formula BOM Conversion Engine**<br>Logic perhitungan konversi ukuran plano ke potong, rim, lembar, kg (berdasarkan gramatur GSM), kalkulasi waste %, dan insheet. | BE | ISA | MOD-03 | ⏳ **PENDING** | Service class `BomCalculationEngine` dengan waktu kalkulasi $< 1$s. |
| **TSK-S3-05** | **UI Formulir Input Pesanan FO & Selector 5 Brand**<br>Form input order multi-step yang intuitif: data pelanggan, spesifikasi produk/cetak, upload file desain awal, prioritas deadline, dan indikator stok. | FE | CAN | MOD-02 |  **DONE** | Halaman `/dashboard/orders` selesai dengan multi-step form. |
| **TSK-S3-06** | **UI Manajemen Revisi Desain & Modal Request Approval**<br>Antarmuka pelacakan log riwayat revisi desain, indikator counter (1/4 - 4/4), locking input saat limit tercapai, dan tombol request approval. | FE | CAN | MOD-02 |  **DONE** | Modal revisi log dengan trigger kunci revisi $\ge 4$x. |
| **TSK-S3-07** | **UI Kalkulator Interaktif BOM untuk Tim Design**<br>Halaman antarmuka Tim Design untuk mengecek spesifikasi order, input dimensi/potong, dan visualisasi hasil kalkulasi bahan & insheet real-time. | FE | MUS | MOD-03 |  **DONE** | Halaman `/dashboard/bom` kalkulator konversi & visualizer 2D plano. |
| **TSK-S3-08** | **Integrasi Antar Modul FO ke Antrean Kerja Tim Design**<br>Penghubung status order dari `Order Placed` menjadi `Queued for Design` serta notifikasi real-time jika ada pesanan express. | BE/FE | ISA | MOD-02, MOD-03 | 🔄 **FE READY / BE PENDING** | Alur serah terima data pesanan FO ke Tim Design. |
| **TSK-S3-09** | **Testing Kalkulasi BOM & Skema Pembatasan Revisi**<br>Unit testing rumus konversi kertas, akurasi insheet/waste, serta validasi skenario locking form revisi ke-4 dan ke-5. | QA | SAM | MOD-02, MOD-03 | ⏳ **PENDING** | Laporan akurasi perhitungan matematika BOM 100% tepat. |

---

### Sprint 4 (Minggu 7–8): Penerbitan SPK Digital, Kanban Produksi & Inspeksi QC
* **Tujuan Utama:** Menghasilkan dokumen SPK Digital terstandar (Internal & 4 Vendor Mitra), papan Kanban pemantauan status produksi interaktif, alokasi mesin/teknisi, serta modul checklist inspeksi QC (Pass/Fail).
* **Modul Terkait:** **MOD-04 (Penerbitan SPK Digital)** & **MOD-05 (Pelacakan Produksi & Inspeksi QC)**.

| Task ID | Nama & Deskripsi Aktivitas Teknis | Layer | PIC | Modul | Status | Deliverable / Output |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **TSK-S4-01** | **Skema Database SPK, Vendor Mitra, Alokasi Mesin & QC Log**<br>Migration tabel `vendors` (terbatas 4 mitra), `spks`, `production_tasks`, `machine_allocations`, `qc_inspections`, dan `qc_defect_photos`. | DB | MUS | MOD-04, MOD-05 | ⏳ **PENDING (PRIORITAS 3)** | DDL relasi produksi dan inspeksi QC lengkap. |
| **TSK-S4-02** | **Analisis Pemisahan Template Dokumen SPK Internal vs Eksternal**<br>Menyusun format layout dokumen SPK Internal (mesin/teknisi) dan SPK Eksternal (instruksi subkontrak khusus 4 vendor mitra). | Analyst | SAM | MOD-04 |  **DONE** | Spesifikasi field SPK internal vs eksternal mitra. |
| **TSK-S4-03** | **Generator Dokumen SPK Digital (PDF Rendering Engine)**<br>Pembangunan service PDF generator untuk mencetak SPK Internal dan Eksternal dengan target render $< 3$s. | BE | ISA | MOD-04 | ⏳ **PENDING** | Service class `SpkGeneratorService` dengan output PDF presisi. |
| **TSK-S4-04** | **Backend Service State Machine Kanban Produksi & Alokasi**<br>API transisi status: `Design Approved` $\rightarrow$ `In-Progress` $\rightarrow$ `Finishing` $\rightarrow$ `QC Pending`, pengurutan deadline, dan assign mesin/teknisi. | BE | ISA | MOD-05 | ⏳ **PENDING** | API endpoints `/api/production/kanban` & `/api/production/assign`. |
| **TSK-S4-05** | **UI Papan Kanban Produksi Interaktif (Drag & Drop / Columns)**<br>Antarmuka papan Kanban untuk Kepala Produksi dengan kartu pesanan berwarna prioritas (merah urgent), filter vendor, dan tombol aksi. | FE | CAN | MOD-05 |  **DONE** | Halaman `/dashboard/production` Kanban 4 kolom & filter status. |
| **TSK-S4-06** | **Modal Alokasi Mesin & Teknisi Penanggung Jawab**<br>Komponen modal interaktif bagi Kepala Produksi untuk memilih mesin yang tersedia dan menetapkan teknisi pengerjaan SPK. | FE | CAN | MOD-05 |  **DONE** | Modal alokasi mesin & operator teknisi terintegrasi. |
| **TSK-S4-07** | **Modul Form Inspeksi QC & Unggah Foto Cacat (Defect Log)**<br>Antarmuka checklist kualitas fisik (warna, presisi potong, finishing), pilihan keputusan PASS / FAIL, input alasan re-work, dan upload foto cacat. | FE/BE | MUS | MOD-05 | 🔄 **FE DONE / BE PENDING** | Halaman `/dashboard/qc` lembar checklist fisik & re-work loop. |
| **TSK-S4-08** | **Logic Penanganan Hasil QC (Pass Trigger & Re-work Loop)**<br>Routing otomatis: Jika FAIL $\rightarrow$ kembali ke antrean Finishing/Produksi dengan catatan re-work. Jika PASS $\rightarrow$ status berubah menjadi `Ready to Deliver`. | BE | SAM | MOD-05 | ⏳ **PENDING** | Service handler hasil QC lolos/re-work. |
| **TSK-S4-09** | **Testing Alur Produksi End-to-End & Stress Test Render PDF**<br>Verifikasi workflow dari terbit SPK $\rightarrow$ pengerjaan mesin $\rightarrow$ inspeksi QC, serta uji performa render PDF SPK $< 3$ detik. | QA | SAM | MOD-04, MOD-05 | ⏳ **PENDING** | Laporan pengujian alur produksi dan benchmark PDF rendering. |

---

### Sprint 5 (Minggu 9–10): Analisis Kurs USD, Automasi Invoice, Laporan & Audit Trail
* **Tujuan Utama:** Mengembangkan modul analisis prediksi harga bahan baku impor berbasis API kurs USD harian, automasi faktur tagihan (PDF Invoice) pasca QC Pass, immutable audit trail, dan pelaporan eksekutif.
* **Modul Terkait:** **MOD-07 (Prediksi Harga Bahan Baku USD Rate)** & **MOD-08 (Automasi Invoice, Laporan & Audit Trail)**.

| Task ID | Nama & Deskripsi Aktivitas Teknis | Layer | PIC | Modul | Status | Deliverable / Output |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **TSK-S5-01** | **Skema Database Kurs USD, Harga Supplier, Invoice & Audit Trail**<br>Migration tabel `usd_exchange_rates`, `supplier_price_histories`, `invoices`, `invoice_items`, dan `immutable_audit_logs`. | DB | MUS | MOD-07, MOD-08 | ⏳ **PENDING** | Migration database lengkap dengan tabel audit trail immutable. |
| **TSK-S5-02** | **Integrasi API Kurs USD/IDR & Scheduled Cron Worker**<br>Membangun HTTP Client koneksi ke third-party API Kurs USD/IDR, setup Laravel Console Command & Scheduler harian pukul 08:00 WIB. | BE | SAM | MOD-07 | ⏳ **PENDING** | Artisan command `rates:fetch-usd` & cron job rate harian. |
| **TSK-S5-03** | **Modul Logika Analitik Prediksi Tren Harga Bahan Impor**<br>Formula korelasi pergerakan fluktuasi kurs USD terhadap harga beli bahan impor dan proyeksi tren harga. | BE/Analyst | SAM | MOD-07 | ⏳ **PENDING** | Service class `PriceTrendPredictionService`. |
| **TSK-S5-04** | **Automasi Event-Driven Generator PDF Invoice Pasca-QC Pass**<br>Pemicu otomatis pemotongan stok bahan terpakai dan pembuatan dokumen PDF Invoice bernomor seri unik saat QC menetapkan status PASS. | BE | ISA | MOD-08 | ⏳ **PENDING** | Event Listener `OrderQcPassedListener` & `InvoiceGeneratorService`. |
| **TSK-S5-05** | **Implementasi Immutable Audit Trail Middleware & Database Trigger**<br>Pencatatan riwayat setiap transaksi, mutasi stok, dan approval ke tabel audit log secara read-only tanpa hak akses delete/update. | BE/DB | SAM | MOD-08 | ⏳ **PENDING** | Immutable audit logger dengan SHA-256 fingerprint. |
| **TSK-S5-06** | **UI Dasbor Analitik Kurs USD & Grafik Tren Harga Supplier**<br>Komponen chart interaktif menampilkan grafik riwayat kurs USD, fluktuasi harga supplier, dan rekomendasi pembelian. | FE | CAN | MOD-07 |  **DONE** | Halaman `/dashboard/usd-analytics` grafik SVG & What-If simulator. |
| **TSK-S5-07** | **UI Pratinjau Invoice, Download PDF & Log Transaksi Audit**<br>Tampilan ringkasan faktur tagihan pelanggan, tombol cetak/unduh PDF Invoice, dan tabel audit log dilengkapi filter rentang tanggal. | FE | MUS | MOD-08 |  **DONE** | Halaman `/dashboard/invoices` & `/dashboard/audit` (Diff modal). |
| **TSK-S5-08** | **Fitur Ekspor Laporan Persediaan & Operasional (Excel & PDF)**<br>Service ekspor data persediaan per gudang, riwayat pemakaian per brand, dan rekapitulasi produksi ke spreadsheet Excel dan PDF. | BE/FE | ISA | MOD-08 | 🔄 **FE DONE / BE PENDING** | Halaman `/dashboard/reports` 3 tab analisis & ekspor UI. |
| **TSK-S5-09** | **Pengujian Integritas Audit Trail & Automasi Invoice**<br>Memastikan mutasi stok terpotong tepat saat status order lolos QC, invoice terbit otomatis, dan record audit log tidak dapat di-tamper. | QA | SAM | MOD-07, MOD-08 | ⏳ **PENDING** | Dokumen hasil uji automasi invoice dan validasi audit log. |

---

### Sprint 6 (Minggu 11–12): Integration Testing, Optimization, UAT Mitra & Production Deployment
* **Tujuan Utama:** Melakukan pengujian terintegrasi menyeluruh, optimasi performa query & response time, User Acceptance Testing (UAT) bersama CV Solusi Inovasi Packaging, serta peluncuran ke server VPS Linux.
* **Modul Terkait:** Seluruh Modul (**MOD-01 s/d MOD-09**), NFR Kepatuhan & Produksi.

| Task ID | Nama & Deskripsi Aktivitas Teknis | Layer | PIC | Modul | Est. (Hari) | Prasyarat (Dep) | Deliverable / Output |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-S6-01** | **Testing Fungsional End-to-End Lintas 7 Role Pengguna**<br>Pengujian skenario siklus lengkap: Input Order FO $\rightarrow$ BOM Design $\rightarrow$ SPK $\rightarrow$ Produksi $\rightarrow$ QC $\rightarrow$ Invoicing & Mutasi Gudang. | QA | SAM | All | 2.5 | TSK-S5-04, TSK-S5-09 | Test matrix E2E dengan status 100% Passed. |
| **TSK-S6-02** | **Stress Testing Konkurensi & Verifikasi Integritas Transaksi ACID**<br>Pengujian beban transaksi paralel pada pengurangan stok bahan baku untuk memastikan response time $< 2$s dan tidak terjadi race condition. | QA/BE | SAM | MOD-01 | 1.5 | TSK-S2-03 | Laporan load testing menggunakan Apache JMeter / k6. |
| **TSK-S6-03** | **Benchmarking Kinerja NFR (BOM < 1s, Render PDF < 3s)**<br>Profiling query PostgreSQL, pembuatan indexing komposit, optimasi caching Redis, dan pengukuran waktu eksekusi kalkulator BOM & render PDF. | BE/DB | ISA | All | 2.0 | TSK-S3-04, TSK-S4-03 | Laporan performa NFR (kalkulasi BOM < 1s, PDF render < 3s). |
| **TSK-S6-04** | **Penyempurnaan Responsivitas Antarmuka Lintas Device**<br>Penyesuaian tata letak UI pada layar Laptop, Desktop, Tablet Staf Gudang (touch-friendly), dan Smartphone untuk modul manajerial. | FE | CAN | All | 2.5 | TSK-S5-06, TSK-S5-07 | Tampilan aplikasi rapi dan usable di desktop, tablet, & mobile. |
| **TSK-S6-05** | **Konfigurasi Server Produksi VPS Linux & Web Server NGINX**<br>Setup VPS Ubuntu, PHP 8.3 FPM, PostgreSQL 16, NGINX reverse proxy, SSL/TLS Let's Encrypt, Firewall UFW, dan Supervisor daemon. | DevOps | ISA | Core | 2.0 | - | Server VPS siap produksi dengan arsitektur aman dan terkonfigurasi. |
| **TSK-S6-06** | **Database Seeding Data Riil Mitra (2 Gudang, 5 Brand, 4 Vendor)**<br>Input data master resmi mitra: Gudang 1, Gudang 2, 5 Brand, katalog kertas/material, daftar mesin, dan 4 vendor mitra terdaftar. | DB | MUS | All | 1.5 | TSK-S6-05 | Database produksi terisi master data riil CV Solusi Inovasi Packaging. |
| **TSK-S6-07** | **Pelaksanaan UAT Bersama Stakeholder CV Solusi Inovasi Packaging**<br>Sesi pengujian penerimaan pengguna langsung bersama Owner, Manager, FO, Design, Produksi, QC, dan Gudang mitra. | PM/All | ISA | All | 2.0 | TSK-S6-01, TSK-S6-06 | Berita Acara UAT ditandatangani dengan feedback perbaikan. |
| **TSK-S6-08** | **Penyelesaian Bug Fixing & Fine-Tuning Pasca-UAT**<br>Triage dan perbaikan feedback minor dari sesi UAT mitra sebelum go-live resmi. | Dev | All | All | 1.5 | TSK-S6-07 | Changelog perbaikan bug UAT terselesaikan. |
| **TSK-S6-09** | **Penyusunan Dokumentasi User Manual & Panduan Operasional**<br>Membuat buku panduan operasional pengguna terperinci untuk ke-7 role dan dokumen teknis SOP deployment/backup. | Analyst | SAM | All | 1.5 | TSK-S6-07 | Dokumen PDF User Manual Sistem ERP/CRM Percetakan. |
| **TSK-S6-10** | **Deployment Final Go-Live & Handover Sistem ke Mitra**<br>Migrasi final database, build production bundle Next.js (`npm run build`), aktivasi cron job scheduler, dan serah terima sistem kepada manajemen mitra. | DevOps | ISA | All | 1.0 | TSK-S6-08, TSK-S6-09 | Sistem live pada domain resmi dan operasional penuh. |

---

## 3. Matriks Alokasi Beban Kerja Tim (Workload Distribution)

Berikut adalah rekapitulasi sebaran tugas dan estimasi hari kerja (*mandays*) antar anggota tim sepanjang 6 Sprint:

```text
+-------------------------+-----------------------------------+-------------+------------------------------------+
| Anggota Tim             | Peran (Dual-Role)                 | Total Tasks | Estimasi Mandays (Sprint 1 - 6)    |
+-------------------------+-----------------------------------+-------------+------------------------------------+
| Isa Bagus Prakoso (ISA) | Project Manager & Back-End Dev    | 14 Tasks    | ~32.5 Mandays                      |
| Samuel Dwi Saputro(SAM) | System Analyst & Back-End Dev     | 14 Tasks    | ~27.0 Mandays                      |
| Candra Sutomo (CAN)     | UI/UX Designer & Front-End Dev    | 12 Tasks    | ~28.0 Mandays                      |
| Mustafa Malik I. (MUS)  | Database Engineer & Front-End Dev | 12 Tasks    | ~26.5 Mandays                      |
+-------------------------+-----------------------------------+-------------+------------------------------------+
```

### Rincian Beban Kerja per Anggota:

1. **Isa Bagus Prakoso (ISA - PM & BE):**
   * *Core Backend Logic:* Engine kalkulasi BOM konversi kertas, Generator PDF SPK Digital, Generator PDF Invoice, Exporter Excel/PDF, dan Mutasi Stok ACID.
   * *Infrastruktur & Delivery:* Setup repositori, arsitektur backend, VPS Linux, NGINX, SSL, Supervisor Worker, dan koordinasi UAT / Handover.

2. **Samuel Dwi Saputro (SAM - Analyst & BE):**
   * *System Specification & Business Logic:* Matriks otorisasi RBAC 7 role, rule pre-validation stok, counter revisi desain (limit 4x), dan logika approval Manager.
   * *Specialized Integrations & Quality Assurance:* Integrasi API Kurs USD harian, formula tren harga bahan impor, immutable audit log middleware, serta perancangan skenario testing dan pengujian beban ACID.

3. **Candra Sutomo (CAN - UI/UX & FE):**
   * *Design & Visual Foundation:* Design system Figma, wireframe, komponen UI reusabel, dan layout adaptif 7 role.
   * *Interactive Features:* Papan Kanban interaktif (drag & drop), badge alert visual ROP warna merah, formulir FO multi-step, dan grafik analitik kurs USD / tren harga bahan baku.

4. **Mustafa Malik Ibrahim (MUS - DB & FE):**
   * *Database Architecture & Reliability:* Perancangan skema DDL PostgreSQL (Sprint 1–5), indexing kueri stok, partitioning log audit, backup scheduler, dan data seeding mitra.
   * *Module Interfaces:* Halaman login & otentikasi, modul stock opname & batch/lot tracker, modul inspeksi QC & upload defect photo, serta pratinjau invoice PDF.

---

## 4. Timeline & Milestones Utama (Sprint Delivery Roadmap)

```text
Bulan 1                               Bulan 2                               Bulan 3
[ Minggu 1 - 2 ]  [ Minggu 3 - 4 ]   [ Minggu 5 - 6 ]  [ Minggu 7 - 8 ]   [ Minggu 9 - 10 ]  [ Minggu 11 - 12 ]
┌───────────────┐ ┌───────────────┐  ┌───────────────┐ ┌───────────────┐  ┌────────────────┐ ┌────────────────┐
│   SPRINT 1    │ │   SPRINT 2    │  │   SPRINT 3    │ │   SPRINT 4    │  │    SPRINT 5    │ │    SPRINT 6    │
│ Foundation,   │ │ Multi-Gudang, │  │ Order Intake  │ │ SPK Digital,  │  │ USD Rate API,  │ │ Integration,   │
│ DB Schema, &  │ │ Multi-Brand & │  │ FO & Kalkulasi│ │ Kanban &      │  │ Invoice Auto & │ │ UAT Mitra &    │
│ RBAC 7 Roles  │ │ ROP Alert     │  │ BOM Engine    │ │ Inspeksi QC   │  │ Immutable Log  │ │ Deployment VPS │
└───────┬───────┘ └───────┬───────┘  └───────┬───────┘ └───────┬───────┘  └───────┬────────┘ └───────┬────────┘
        │                 │                  │                 │                  │                  │
        ▼                 ▼                  ▼                 ▼                  ▼                  ▼
   Milestone 1       Milestone 2        Milestone 3       Milestone 4        Milestone 5        Milestone 6
   Auth & RBAC      Stok Aman ACID     Input Order FO      Kanban & QC      Invoice & Analisis  Sistem Live &
    Berfungsi         & Alert ROP      & BOM < 1 Detik    Terkoneksi SPK     Harga USD Harian    Siap Pakai
```

---

## 5. Matriks Ketertelusuran Kebutuhan (Requirements Traceability Matrix)

Tabel berikut memetakan setiap modul PRD & workflow ke paket task yang mengeksekusinya:

| Kode Modul | Nama Modul PRD | Sprint | Task Terkait (Task ID) |
| :--- | :--- | :--- | :--- |
| **MOD-01** | Manajemen Inventori Multi-Gudang & Multi-Brand | Sprint 2 | `TSK-S2-01`, `TSK-S2-03`, `TSK-S2-04`, `TSK-S2-05`, `TSK-S2-06`, `TSK-S2-07`, `TSK-S2-09` |
| **MOD-02** | Front Office & Input Order | Sprint 3 | `TSK-S3-01`, `TSK-S3-02`, `TSK-S3-03`, `TSK-S3-05`, `TSK-S3-06`, `TSK-S3-08`, `TSK-S3-09` |
| **MOD-03** | BOM (Bill of Materials) & Conversion Engine | Sprint 3 | `TSK-S3-01`, `TSK-S3-04`, `TSK-S3-07`, `TSK-S3-08`, `TSK-S3-09` |
| **MOD-04** | Penerbitan SPK Digital (Internal & External) | Sprint 4 | `TSK-S4-01`, `TSK-S4-02`, `TSK-S4-03`, `TSK-S4-09` |
| **MOD-05** | Pelacakan Produksi & Inspeksi QC | Sprint 4 | `TSK-S4-01`, `TSK-S4-04`, `TSK-S4-05`, `TSK-S4-06`, `TSK-S4-07`, `TSK-S4-08`, `TSK-S4-09` |
| **MOD-06** | Peringatan Ambang Batas Stok (ROP Alert) | Sprint 2 | `TSK-S2-02`, `TSK-S2-08`, `TSK-S2-09` |
| **MOD-07** | Prediksi Harga Bahan Baku (USD Rate Analytics) | Sprint 5 | `TSK-S5-01`, `TSK-S5-02`, `TSK-S5-03`, `TSK-S5-06`, `TSK-S5-09` |
| **MOD-08** | Automasi Invoice, Laporan & Audit Trail | Sprint 5 | `TSK-S5-01`, `TSK-S5-04`, `TSK-S5-05`, `TSK-S5-07`, `TSK-S5-08`, `TSK-S5-09` |
| **MOD-09** | Hak Akses & Manajemen Pengguna (RBAC) | Sprint 1 | `TSK-S1-03`, `TSK-S1-04`, `TSK-S1-05`, `TSK-S1-06`, `TSK-S1-07`, `TSK-S1-08`, `TSK-S1-09` |
| **NFR / Core**| Kinerja, Keamanan, Integrasi & Deployment | Sprint 1 & 6 | `TSK-S1-01`, `TSK-S1-02`, `TSK-S6-01`, `TSK-S6-02`, `TSK-S6-03`, `TSK-S6-04`, `TSK-S6-05`, `TSK-S6-06`, `TSK-S6-07`, `TSK-S6-08`, `TSK-S6-09`, `TSK-S6-10` |

---

## 6. Protokol Kualitas & Kriteria Penyelesaian (Definition of Done)

Sebuah task dinyatakan **SELESAI (DONE)** jika memenuhi kriteria baku berikut:
1. **Code Quality:** Kode program mematuhi standar PSR-12 (Laravel) dan ESLint/Prettier (Inertia.js), bersih dari komentar debugging (`dd()`, `console.log()`).
2. **Database Integrity:** Transaksi mutasi stok menggunakan `DB::transaction` berprinsip ACID dan telah lolos pengujian konkurensi.
3. **NFR Compliance:** Perhitungan BOM $< 1$ detik, respon transaksi standar $< 2$ detik, dan pembuatan dokumen PDF $< 3$ detik.
4. **RBAC Verification:** Hak akses teruji hanya dapat dibuka oleh role yang berwenang (tidak ada bypass URL/API).
5. **Peer Review:** Pull Request telah di-review dan di-*merge* ke branch `main` atau `develop` tanpa konflik.
