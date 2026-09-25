# Status Progres Pengembangan Modul Sistem ERP/CRM
## CV Solusi Inovasi Packaging

Dokumen ini melacak status capaian pengembangan sistem berdasarkan **PRD**, **Dokumentasi Workflow ERP/CRM**, dan **Task_Plan.md**. Dokumen ini merinci modul yang sudah selesai, sedang berjalan, serta modul dan fitur yang masih kurang/dalam antrean.

*Terakhir diperbarui: 25 September 2026 (Status Frontend: 100% Selesai & Build Passing)*

---

## 1. Matriks Ringkasan Status per Modul

| Kode Modul | Nama Modul | Sprint | Status Backend | Status Frontend | Status Keseluruhan |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **CORE-UI** | **Design System "Tech Cobalt" & 40+ Ikon Vektor** | Sprint 1 | — |  Selesai | **SELESAI PENUH (100%)** |
| **MOD-09** | **Hak Akses & Manajemen Pengguna (RBAC 7-Role)** | Sprint 1 |  Selesai |  Selesai | **SELESAI PENUH (100%)** |
| **MOD-01** | **Manajemen Inventori Multi-Gudang & Multi-Brand** | Sprint 2 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **MOD-06** | **Peringatan Ambang Batas Stok (ROP Alert Center)** | Sprint 2 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **MOD-02** | **Front Office & Input Order (Pre-Validation & Revisi)** | Sprint 3 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **MOD-03** | **BOM Calculator & Pola Potong Conversion Engine** | Sprint 3 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **MOD-04** | **Penerbitan SPK Digital (Internal & 4 Vendor Mitra)** | Sprint 4 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **MOD-05** | **Kanban Produksi 4-Tahap & Lembar Inspeksi QC** | Sprint 4 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **MOD-07** | **Analitik Kurs USD & Sensitivitas Bahan Baku Impor** | Sprint 5 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **MOD-08** | **Faktur Invoice, Laporan Bisnis & Immutable Audit** | Sprint 5 | ⏳ Antrean API |  Selesai | **FRONTEND SELESAI (50%)** |
| **NFR-DEP** | **Integration Testing, Load Test & VPS Deployment** | Sprint 6 | ⏳ Antrean | ⏳ Antrean | **BELUM (0%)** |

> **Status Frontend**: **100% LENGKAP**. Seluruh rute antarmuka pengguna (`/login`, `/dashboard`, `/dashboard/inventory`, `/dashboard/orders`, `/dashboard/bom`, `/dashboard/spk`, `/dashboard/production`, `/dashboard/qc`, `/dashboard/usd-analytics`, `/dashboard/invoices`, `/dashboard/reports`, `/dashboard/audit`, `/dashboard/users`) telah selesai di-slicing dan **terkompilasi 100% lulus melalui Next.js (Turbopack) static production build**.

---

## 2. Rincian Modul Frontend yang Telah Selesai (100%)

### A. MOD-09 & Core Layout UI
* **Design System Tech Cobalt:**
  - Light Mode (`#F4F6FA`, `#FFFFFF`, `#2B5FC7`) dan Dark Mode (`#0F1B2D`, `#16223A`, `#3B6FE0`).
  - Library 41+ ikon SVG teknis profesional murni (`Icons.tsx`) tanpa ketergantungan pihak ketiga.
* **Halaman Login & Layout Shell (`/login` & `/dashboard`):**
  - Autentikasi 1-tap akun demo 7 role.
  - Sidebar dinamis dengan active solid cobalt highlight, header responsif, dan bottom navigation mobile.
* **Halaman Manajemen Pengguna & RBAC (`/dashboard/users`):**
  - Tabel direktori akun staf aktif dengan penanda status dan login time.
  - Matriks Hak Akses (Permission Matrix) visual interaktif 7 role terhadap 10 modul sistem.
  - Modal tambah akun staf baru dan opsi reset password.

### B. MOD-01 & MOD-06: Inventori Multi-Gudang & Peringatan ROP
* **Halaman `/dashboard/inventory`:**
  - 4 Kartu Metrik Persediaan: Total SKU, Valuasi Aset Stok, Item Kritis $\le$ ROP, dan Integritas Transaksi ACID.
  - Multi-level filter: Tab 2 Gudang (*Gudang 1* vs *Gudang 2*), 5 Brand, 4 Kategori Bahan Baku.
  - Katalog stok dengan visual progress bar level persediaan.
  - Modal Inbound Stok Baru (Batch/Lot number, kelembaban kertas, exp tinta).
  - Modal Transfer Antar-Gudang ACID.
  - Modal Stock Opname fisik vs sistem dengan kalkulasi selisih otomatis.
  - Drawer Notifikasi ROP Alert Center untuk pengajuan Purchase Order darurat.

### C. MOD-02: Front Office & Input Order
* **Halaman `/dashboard/orders`:**
  - 4 Kartu Metrik Pesanan: Total Order Aktif, Antrean Desain, Order Express $< 24$ jam, dan Limit Revisi.
  - Multi-step form input order pelanggan dengan *Stock Pre-Validation Engine* instan.
  - Penguncian rigid form jika counter revisi mencapai $\ge 4$ kali serta form eskalasi permohonan ke Manager.
  - Penanda prioritas Express $< 24$ jam dan serah terima instan ke Tim Design.

### D. MOD-03: BOM (Bill of Materials) & Conversion Engine
* **Halaman `/dashboard/bom`:**
  - Kalkulator interaktif konversi kertas plano ke lembar potong (potong 2, 4, 6, 8, 9, 12, dst.).
  - Konversi otomatis rim $\leftrightarrow$ lembar $\leftrightarrow$ kilogram berdasar ukuran dan gramatur GSM.
  - Kalkulasi persentase waste potongan (*waste %*) dan cadangan lembar cetak (*insheet tolerance*).
  - Visualizer diagram pola potong plano 2D real-time.
  - Fitur serah terima instan ke draf SPK Produksi.

### E. MOD-04: Penerbitan SPK Digital
* **Halaman `/dashboard/spk`:**
  - Tab SPK Internal (mesin mandiri) vs SPK Eksternal (4 vendor maklon mitra: Surya Kencana, Sanwa Finishing, Kurz Foil, Harapan Prima).
  - Generator penomoran SPK otomatis (`SPK/INT/...` dan `SPK/EKS/...`).
  - Pratinjau dokumen lembar kerja teknis SPK lengkap dengan barcode/QR tracking, instruksi mesin, dan checklist serah terima.
  - Fitur cetak/print simulator PDF resmi.

### F. MOD-05: Kanban Produksi & Inspeksi Quality Control (QC)
* **Halaman Kanban Produksi (`/dashboard/production`):**
  - Papan Kanban 4 kolom tahapan pengerjaan: *Pra-Cetak & Potong*, *Cetak Offset/Digital*, *Finishing & Pond*, *Perakitan & Packing*.
  - Modal alokasi mesin cetak (Heidelberg SM 74, Komori Lithrone, Sanwa Die-cut) dan penugasan operator.
  - Kartu SPK dengan penanda deadline jam dan prioritas express.
* **Halaman Quality Control (`/dashboard/qc`):**
  - Form lembar checklist inspeksi fisik (akurasi dimensi potong, kesesuaian warna densitas tinta, rekatan lem, presisi hot stamping foil).
  - Penanganan keputusan QC: **PASS (Ready Deliver)** langsung memicu pembuatan draft invoice, atau **FAIL (Re-work loop)** dengan pencatatan unit reject dan routing ulang ke mesin.

### G. MOD-07: Analitik Kurs USD & Sensitivitas Bahan Baku Impor
* **Halaman `/dashboard/usd-analytics`:**
  - Pemantauan kurs JISDOR Bank Indonesia live/spot (Rp 15.865 / USD) dan delta harian.
  - Grafik vektor SVG interaktif tren nilai tukar vs indeks kenaikan harga kertas impor 30 hari.
  - Simulator Dampak HPP & Margin (What-If Calculator) per 1.000 pcs packaging.
  - Katalog material sensitif valas (Art Carton, Ivory Board, Tinta Offset Toyo, Kurz Foil, Lem Henkel) dan rekomendasi pengadaan (Lock PO / Hedging).

### H. MOD-08: Invoicing, Pelaporan Bisnis & Audit Trail
* **Halaman Faktur Invoice (`/dashboard/invoices`):**
  - Daftar faktur otomatis pasca lolos inspeksi QC Passed.
  - Filter status: Lunas, DP Diterima, Belum Bayar, Jatuh Tempo.
  - Modal Pratinjau Faktur Penjualan resmi Kop CV Solusi Inovasi Packaging lengkap dengan PPN 11%, rincian item, dan rekening bank.
  - Modal pencatatan penerimaan pembayaran kas/transfer.
* **Halaman Pelaporan Operasional (`/dashboard/reports`):**
  - 3 Tab Laporan: Pemakaian Material & Waste Insheet, Utilisasi Mesin & Efisiensi Operator, serta Profitabilitas & Gross Margin per Order.
  - Fitur ekspor data rekapitulasi ke Excel/PDF view.
* **Halaman Audit Trail Forensik (`/dashboard/audit`):**
  - Log audit trail mutasi sistem permanen dan aman.
  - Filter berdasarkan modul, jenis aksi (CREATE, UPDATE, TRANSFER, INSPECT, DELETE), dan aktor pengguna.
  - Modal Diff Viewer komparasi data *Before vs After* dengan validasi kriptografi SHA-256.

---

## 3. Langkah Selanjutnya: Masuk ke Lapisan Backend Laravel (Sprint 2 - 5)

Seluruh antarmuka Frontend Next.js telah **100% lengkap dan siap diintegrasikan**. Urutan pengerjaan selanjutnya adalah implementasi database dan API pada backend Laravel 11:

### Tahap 1: Backend Inventori Multi-Gudang & ROP (Sprint 2)
1. **Migrations Database**:
   - `create_warehouses_table`
   - `create_brands_table`
   - `create_materials_table`
   - `create_stock_levels_table`
   - `create_stock_mutations_table`
   - `create_batch_lots_table`
2. **Eloquent Models & Relationships**:
   - `Warehouse`, `Brand`, `Material`, `StockLevel`, `StockMutation`, `BatchLot`.
3. **Business Logic & Service Layer**:
   - `StockTransferService`: Mutasi stok antar-gudang berprinsip ACID menggunakan database transaction dan `SELECT ... FOR UPDATE` agar terbebas dari race condition.
   - `RopAlertService`: Penghitungan otomatis ambang batas stok kritis dan notifikasi pengadaan.
4. **REST API Endpoints**:
   - `GET /api/inventory/stocks`
   - `POST /api/inventory/inbound`
   - `POST /api/inventory/transfer`
   - `POST /api/inventory/opname`
   - `GET /api/inventory/rop-alerts`

---

### Tahap 2: Backend Order Intake, BOM & SPK (Sprint 3 & 4)
1. `OrderService` & `OrderPreValidationService`: Pengecekan ketersediaan stok bahan secara riil saat pesanan masuk.
2. `BomCalculationService`: Algoritma konversi matematika plano ke potong dan hitung waste insheet $< 1$ detik.
3. `SpkService` & PDF Rendering Engine: Penerbitan dokumen SPK internal & eksternal vendor.

---

### Tahap 3: Backend Produksi, QC, Kurs USD & Invoicing (Sprint 4 & 5)
1. `ProductionService` & `QcInspectionService`: State machine transisi Kanban dan penanganan Re-work loop.
2. `ExchangeRateService`: Scheduled cron job penarikan kurs USD harian.
3. `InvoiceService` & `AuditTrailMiddleware`: Penagihan otomatis pasca QC Pass dan pencatatan log transaksi SHA-256.
