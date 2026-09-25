# Dokumentasi Workflow & Flowchart ERP/CRM Percetakan

Dokumen ini memuat alur kerja (*workflow*) lengkap untuk ke-7 *role* pengguna dalam sistem ERP/CRM percetakan, termasuk detail aktivitas operasional pada masing-masing divisi.

---

## 1. Front Office (FO)

### 1.1. Ikhtisar Role (Overview)
Role **Front Office (FO)** bertindak sebagai pintu utama (*entry point*) masuknya pesanan pelanggan ke dalam sistem ERP/CRM percetakan. FO bertugas melakukan pencatatan order, memilih brand bisnis, memvalidasi ketersediaan stok awal, mengelola permintaan revisi desain dari pelanggan, serta menetapkan prioritas *deadline* sebelum pesanan diteruskan ke divisi teknis (Tim Design).

### 1.2. Hak Akses & Modul Sistem
* **Modul Utama:** Dashboard FO, Order Management, Brand Selector, Customer Revision Logs.
* **Hak Akses Data:**
  * **Create / Edit:** Pesanan baru (*Order Placed*), data profil pelanggan, catatan revisi (revisi ke-1 hingga ke-3).
  * **Read-Only:** Ringkasan stok gudang (*Pre-Validation*), status kelanjutan produksi harian.
  * **Restricted:** Tidak dapat melakukan *override* batas revisi (revisi ke-4 dan seterusnya membutuhkan *approval* Manager).

### 1.3. Rincian Alur Kerja (Detailed Workflow)

#### 1.3.1. Autentikasi & Navigasi Utama
1. Pengguna masuk (*login*) ke sistem menggunakan kredensial akun FO.
2. Sistem mengarahkan pengguna ke **Dashboard FO** yang menampilkan rincian pesanan harian, *draft* order tertahan, serta *alert* stok bahan baku.

#### 1.3.2. Pemilihan Brand & Input Pesanan Baru
1. Pengguna memilih **1 dari 5 Brand** percetakan yang terintegrasi di dalam sistem.
2. Pengguna mengisi formulir pesanan baru secara mendetail:
   * **Data Pelanggan:** Nama, nomor kontak, serta alamat pengiriman.
   * **Spesifikasi Produk:** Jenis material/kertas, dimensi ukuran, jumlah eksemplar/oplak, dan opsi *finishing*.
   * **Lampiran File:** Berkas desain awal yang dikirimkan oleh pelanggan (jika ada).

#### 1.3.3. Stok Pre-Validation Engine
Saat spesifikasi diinput, sistem secara otomatis mengecek ketersediaan stok material di gudang.

* **Skenario A: Stok Cukup**
  * Pesanan lolos verifikasi dan dapat dilanjutkan ke tahap penentuan *deadline*.
* **Skenario B: Stok Kurang / Di Bawah Safety Stock**
  * Sistem menampilkan indikator **Stok Kurang**.
  * Sistem otomatis mengirimkan notifikasi *Reorder Point* (**ROP**) ke modul Staf Gudang.
  * Pengguna menyimpan transaksi sebagai **Draft / Order Tahan** hingga ketersediaan stok dikonfirmasi oleh Gudang atau Manager.

#### 1.3.4. Penentuan Prioritas & Deadline
1. Pengguna memasukkan tanggal dan jam *deadline* kesepakatan dengan pelanggan.
2. Sistem secara otomatis menetapkan tingkat prioritas (*Normal*, *High*, atau *Urgent/Express*) berdasarkan *lead time* kapasitas produksi.
3. Pengguna menekan tombol konfirmasi. Status pesanan berubah menjadi `Order Placed`.

#### 1.3.5. Manajemen Revisi Desain Pelanggan
FO mengelola permintaan perubahan atau revisi desain dari pelanggan sesuai aturan bisnis:

| Kondisi Revisi | Action pada Sistem | Status Order |
| :--- | :--- | :--- |
| **Revisi < 4x** | FO mencatat rincian revisi pada *Revision Log*, mengunggah berkas penyesuaian, dan memperbarui catatan order. | `Order Placed (In Revision)` |
| **Revisi ≥ 4x** | Sistem secara otomatis mengunci (*block*) formulir revisi. FO wajib menekan tombol *Request Manager Approval* jika pelanggan tetap meminta revisi tambahan. | `Pending Manager Approval` |
| **Tanpa Revisi** | Pesanan langsung dialihkan ke antrean kerja Tim Design. | `Queued for Design` |

### 1.4. Diagram Alur Utama (ASCII Terminal)

```text
[ Login FO ]
    │
    ▼
[ Dashboard FO ]
    │
    ▼
[ Pilih 1 dari 5 Brand ]
    │
    ▼
[ Input Data Pesanan & Spesifikasi ]
    │
    ▼
< Stock Pre-Validation Engine >
    ├─► [Stok Kurang] ──► [ Peringatan Stok & Notif ROP ] ──► [ Simpan Draft / Tahan Order ]
    │
    └─► [Stok Cukup] ──► [ Tentukan Prioritas Deadline ]
                                │
                                ▼
                       [ Simpan Order (Status: Order Placed) ]
                                │
                                ▼
                      < Permintaan Revisi Desain? >
                            ├─► [Tidak] ──► [ Teruskan ke Tim Design ]
                            │
                            └─► [Ya] ──► < Jumlah Revisi < 4x? >
                                            ├─► [Ya] ──► [ Catat Log Revisi & Update Order ]
                                            └─► [Tidak] ──► [ Lock Form & Minta Approval Manager ]
```

### 1.5. Matriks Status Order (FO State Machine)
* **Draft:** Pesanan disimpan sementara akibat stok bahan baku yang tidak mencukupi atau spesifikasi dari pelanggan belum lengkap.
* **Order Placed:** Pesanan berhasil terbuat, stok tervalidasi aman, dan siap diproses oleh divisi teknis.
* **Pending Manager Approval:** Pesanan melampaui batas kuota revisi (lebih dari 3x) dan menunggu konfirmasi persetujuan dari Manager.
* **Queued for Design:** Pesanan telah diverifikasi oleh FO dan diteruskan ke board kerja Tim Design.

### 1.6. Penanganan Kondisi Khusus (Exception Handling)
* **Perubahan Spesifikasi Mayor Setelah Status Order Placed:**
  Apabila pelanggan mengubah ukuran atau jenis bahan baku secara drastis, FO wajib membatalkan status Order Placed dan melakukan re-validation stok ulang dari awal.
* **Pembatalan Pesanan oleh Pelanggan:**
  Pembatalan hanya dapat diproses apabila status pesanan masih Order Placed dan Tim Design belum membuat Bill of Materials (BOM).
* **Pengajuan Pesanan Express / Urgent:**
  Untuk pesanan dengan deadline < 24 jam, sistem secara otomatis memberikan penanda badge merah dan menaikkan urutan prioritas di papan kanban lintas divisi.

---

## 2. Tim Design

### 2.1. Ikhtisar & Modul
* **Peran:** Verifikasi spesifikasi teknis cetak, eksekusi BOM Engine (kalkulasi konversi kertas, waste %, dan insheet), serta penerbitan SPK Internal atau Eksternal (Subkontrak Vendor).
* **Modul:** Dashboard Design, Technical Spec Reviewer, BOM Engine, SPK Issuer (4 Vendor Mitra).

### 2.2. Diagram Alur Utama (ASCII Terminal)

```text
[ Login Tim Design ]
    │
    ▼
[ Dashboard Design ]
    │
    ▼
[ Pilih Order (Status: Order Placed) ]
    │
    ▼
[ Cek Spesifikasi Teknis Cetak ] ◄──────────────────────────┐
    │                                                        │
    ▼                                                        │
< Ada Revisi Teknis? >                                       │
    ├─► [Ya] ──► < Revisi <= 4x? >                           │
    │               ├─► [Ya] ──► [ Proses Revisi Desain ] ───┤
    │               └─► [Tidak] ──► [ Pengajuan Approval Manager ]
    │
    └─► [Tidak]
            │
            ▼
[ Jalankan BOM Engine (Design Approved) ]
    │
    ▼
[ Kalkulasi Konversi Kertas, Waste %, & Insheet ]
    │
    ▼
< Pilih Jenis Produksi? >
    ├─► [Produksi Mandiri] ──► [ Terbitkan SPK Internal (Status: In Queue Internal) ]
    │
    └─► [Subkontrak Vendor] ──► [ Pilih 1 dari 4 Vendor Mitra & Terbitkan SPK Eksternal (Status: In Queue Vendor) ]
```

---

## 3. Kepala Produksi

### 3.1. Ikhtisar & Modul
* **Peran:** Pengelolaan papan Kanban produksi, pengurutan antrean berbasis deadline, alokasi mesin dan teknisi, pemantauan status In-Progress, serta penanganan pengerjaan ulang (re-work) dari QC.
* **Modul:** Kanban Board Produksi, Resource & Machine Allocation, Production Status Tracker.

### 3.2. Diagram Alur Utama (ASCII Terminal)

```text
[ Login Kepala Produksi ]
    │
    ▼
[ Dashboard Kanban Produksi ]
    │
    ▼
[ Lihat SPK Masuk (Internal / External) ]
    │
    ▼
[ Urutkan Antrean Berdasarkan Deadline Pesanan ]
    │
    ▼
[ Alokasikan Mesin & Teknisi Penanggung Jawab ]
    │
    ▼
[ Update Status: In-Progress Production ] ◄──────────────────────────┐
    │                                                                 │
    ▼                                                                 │
[ Update Status: Finishing / QC Pending ]                             │
    │                                                                 │
    ▼                                                                 │
< Hasil Inspeksi QC? >                                                │
    ├─► [Fail / Re-work] ──► [ Terima Catatan QC & Atur Ulang Alokasi ] ──┘
    │
    └─► [Pass] ──► ( Status: Ready to Deliver / Selesai Produksi )
```

---

## 4. Quality Control (QC)

### 4.1. Ikhtisar & Modul
* **Peran:** Inspeksi fisik hasil cetak/finishing, pengisian checklist kelayakan, penanganan status FAIL (foto & alasan re-work), serta konfirmasi status PASS yang memicu mutasi stok, invoice PDF, dan audit log.
* **Modul:** QC Inspection Dashboard, Defect Logging & Photo Upload, QC Pass Trigger.

### 4.2. Diagram Alur Utama (ASCII Terminal)

```text
[ Login QC ]
    │
    ▼
[ Dashboard QC ]
    │
    ▼
[ Pilih Pesanan (Status: QC Pending) ]
    │
    ▼
[ Lakukan Inspeksi Fisik Produk ]
    │
    ▼
[ Isi Checklist Inspeksi QC ]
    │
    ▼
< Hasil Kelayakan? >
    ├─► [FAIL] ──► [ Input Foto & Detail Alasan Re-work ]
    │                  │
    │                  ▼
    │              [ Set Status: Fail / Re-work ] ──► ( Notifikasi ke Kepala Produksi & Design )
    │
    └─► [PASS] ──► [ Confirm QC Pass ]
                       │
                       ▼
                   [ Set Status: Ready to Deliver ] ──► ( Picu Mutasi Stok, Invoice PDF, & Audit Log )
```

---

## 5. Staf Gudang

### 5.1. Ikhtisar & Modul
* **Peran:** Pengelolaan inventaris multi-gudang, pencatatan material masuk dari supplier, pelaksanaan transaksi mutasi stok ACID, stock opname, dan penanganan notifikasi Reorder Point (ROP).
* **Modul:** Inventory Management, Stock Transfer, Inbound Material Inspector, Stock Opname, ROP Alert Board.

### 5.2. Diagram Alur Utama (ASCII Terminal)

```text
[ Login Staf Gudang ]
    │
    ▼
[ Dashboard Inventory ]
    │
    ▼
< Pilih Aktivitas Gudang? >
    ├─► [Transfer Stok] ──► [ Mutasi / Transfer Stok (Gudang 1 <-> Gudang 2) ] ──► [ Eksekusi Mutasi (ACID) & Update Ledger ]
    │
    ├─► [Barang Masuk]  ──► [ Penerimaan Material Supplier (Batch/Lot & Expiry/Kelembaban) ] ──► [ Update Stok Material ]
    │
    ├─► [Stock Opname]  ──► [ Hitung Fisik Stock Opname ] ──► [ Submit Selisih ke Manager ]
    │
    └─► [Alert ROP]     ──► [ Terima Notifikasi ROP (Badge Merah) ] ──► ( Informasikan ke Manager / Procurement )
```

### 5.3. Detail Flowchart per Aktivitas Gudang

#### A. Transfer / Mutasi Stok antar Gudang

```text
[ Login Staf Gudang ]
        │
        ▼
[ Buka Modul Inventory ──► Menu "Transfer Stok" ]
        │
        ▼
[ Klik Tombol "Buat Mutasi Baru" ]
        │
        ▼
[ Form Transfer: Pilih "Gudang Asal" & "Gudang Tujuan" ]
        │
        ▼
[ Scan Barcode / Input SKU Material & Kuantitas Transfer ]
        │
        ▼
< System: Cek Ketersediaan Stok Gudang Asal >
        │
        ├─► [Stok Kurang] ──► [ System: Tampilkan Error "Stok Tidak Mencukupi" ]
        │                            │
        │                            ▼
        │                     [ Koreksi Jumlah / Batalkan Transfer ]
        │
        └─► [Stok Cukup] ──► [ System: Tampilkan Ringkasan Rincian Mutasi ]
                                     │
                                     ▼
                              [ Klik Tombol "Eksekusi Transfer" ]
                                     │
                                     ▼
                              < System: Jalankan Transaksi ACID >
                              ( Potong Stok Asal + Tambah Stok Tujuan + Catat Ledger )
                                     │
                                     ▼
                              [ System: Tampilkan Notifikasi "Transfer Berhasil" ]
                                     │
                                     ▼
                              [ User: Klik "Cetak Surat Jalan / Bukti Mutasi (PDF)" ]
```

#### B. Penerimaan Material dari Supplier (Barang Masuk)

```text
[ Login Staf Gudang ]
        │
        ▼
[ Buka Modul Inventory ──► Menu "Penerimaan Material (Inbound)" ]
        │
        ▼
[ Input / Scan Nomor PO (Purchase Order) Supplier ]
        │
        ▼
[ System: Load & Tampilkan Daftar Item PO ]
        │
        ▼
[ Pilih SKU Item ──► Input "Kuantitas Fisik Diterima" ]
        │
        ▼
[ Input Detail Tracing: Batch/Lot, Tanggal Expiry, & % Kelembaban ]
        │
        ▼
[ Lakukan Inspeksi Fisik Awal ]
        │
        ▼
< Evaluasi Hasil Inspeksi Fisik >
        │
        ├─► [Ada Fisik Cacat/Defect] ──► [ Input Kuantitas Defect & Alasan Retur ]
        │                                        │
        │                                        ▼
        │                                 [ Klik "Proses Retur Supplier" ]
        │                                        │
        │                                        ▼
        │                                 [ System: Cetak Form Nota Retur ]
        │
        └─► [Material Sesuai/Lolos] ──► [ Klik Tombol "Simpan & Terima Stok" ]
                                                 │
                                                 ▼
                                        < System: Process Inbound >
                                        ( Update Tambah Stok + Record Batch/Lot Ledger + Update Status PO )
                                                 │
                                                 ▼
                                        [ System: Tampilkan Status "Penerimaan Berhasil" ]
```

#### C. Stock Opname (Perhitungan Fisik Stok)

```text
[ Login Staf Gudang ]
        │
        ▼
[ Buka Modul Inventory ──► Menu "Stock Opname" ]
        │
        ▼
[ Klik Tombol "Mulai Sesi Opname Baru" ]
        │
        ▼
[ Form Sesi: Pilih Lokasi Gudang & Kategori Material ]
        │
        ▼
[ System: Lock Transaksi Material & Buat "Snapshot Stok Sistem" ]
        │
        ▼
[ User: Input Hasil "Perhitungan Fisik (Physical Count)" per SKU ]
        │
        ▼
[ System: Otomatis Hitung Selisih ( Stok Fisik - Stok Sistem ) ]
        │
        ▼
< Validasi Hasil Selisih Stok >
        │
        ├─► [Match / Tidak Ada Selisih] ──► [ Klik Tombol "Finalisasi Opname" ]
        │                                           │
        │                                           ▼
        │                                    [ System: Unlock Material & Set Status "Opname Complete" ]
        │
        └─► [Discrepancy / Ada Selisih] ──► [ Wajib Input "Alasan Selisih / Catatan Verifikasi" ]
                                                    │
                                                    ▼
                                            [ Klik Tombol "Ajukan Adjustment ke Manager" ]
                                                    │
                                                    ▼
                                            [ System: Kirim Notifikasi ke Dashboard Manager (Status: Pending Approval) ]
                                                    │
                                                    ▼
                                            ( Setelah Manager Approve ──► System Update Ledger Penyesuaian Stok )
```

#### D. Penanganan Alert ROP (Reorder Point & Safety Stock)

```text
[ System: Trigger Alert Badge Merah pada Header Dashboard ketika Stok <= ROP ]
        │
        ▼
[ User: Klik Badge Alert / Buka Menu "Daftar Stok Kritis (ROP)" ]
        │
        ▼
[ System: Tampilkan Grid Material Kritis (Stok Saat Ini, Safety Stock, Lead Time) ]
        │
        ▼
[ User: Pilih Item Material ──► Verifikasi Fisik Langsung ke Rak Gudang ]
        │
        ▼
< Evaluasi Kebutuhan Pembelian Ulang >
        │
        ├─► [Stok Fisik Cukup / Masuk Transit] ──► [ Klik Tombol "Abaikan / Tandai Checked" ]
        │                                                  │
        │                                                  ▼
        │                                           [ System: Sembunyikan Alert Sementara ]
        │
        └─► [Perlu Restok Segera] ───────────────► [ Klik Tombol "Buat Pengajuan Reorder (PR)" ]
                                                           │
                                                           ▼
                                                    [ Form PR: Input "Kuantitas Usulan" & "Tingkat Prioritas (Urgent/Normal)" ]
                                                           │
                                                           ▼
                                                    [ Klik Tombol "Kirim Pengajuan PR" ]
                                                           │
                                                           ▼
                                                    < System: Execute PR Request >
                                                    ( Set Status Material "PR Submitted" + Send Notif ke Manager & Procurement )
```

---

## 6. Manager

### 6.1. Ikhtisar & Modul
* **Peran:** Persetujuan operasional (approval selisih opname, revisi > 3x, dan order urgent), penyesuaian parameter ROP & Safety Stock, serta analitik estimasi harga bahan baku impor berdasarkan pergerakan kurs USD/IDR.
* **Modul:** Executive Manager Dashboard, Approval Center, Safety Stock & ROP Configurator, USD Exchange Rate & Material Cost Analytics.

### 6.2. Diagram Alur Utama (ASCII Terminal)

```text
[ Login Manager ]
    │
    ▼
[ Dashboard Executive Manager ]
    │
    ▼
< Pilih Tugas Operasional? >
    ├─► [Approval List]   ──► [ Tinjau Pengajuan Approval (Opname / Revisi > 4x / Urgent) ]
    │                             │
    │                             ▼
    │                         < Keputusan Manager? >
    │                             ├─► [Approve] ──► [ Setujui Pengajuan ]
    │                             └─► [Reject]  ──► [ Tolak Pengajuan & Beri Catatan ]
    │
    ├─► [Safety Stock/ROP] ──► [ Tinjau Stok Kritis (Badge Merah) ] ──► [ Penyesuaian Batas Safety Stock & ROP ]
    │
    └─► [Analitik Harga]   ──► [ Buka Modul Prediksi Harga USD ] ──► [ Cek Tren API Kurs USD/IDR ] ──► ( Evaluasi Estimasi Tren Harga Bahan Impor )
```

---

## 7. Owner

### 7.1. Ikhtisar & Modul
* **Peran:** Pemantauan eksekutif real-time (stok multi-gudang untuk 5 brand, performa produksi, estimasi harga impor supplier), akses immutable audit log (read-only), serta ekspor laporan bisnis.
* **Modul:** Executive Dashboard Owner, Multi-Brand Stock Overview, Production & Defect Rate KPI, Import Price Trend Analytics, Immutable Security Audit Log, Report Exporter (PDF/Excel).

### 7.2. Diagram Alur Utama (ASCII Terminal)

```text
[ Login Owner ]
    │
    ▼
[ Dashboard Executive Owner ]
    │
    ▼
< Pilih Menu Monitoring? >
    ├─► [Ringkasan Stok Multi-Gudang (Real-time 5 Brand)] ─────┐
    ├─► [Performa Produksi & QC (On-time Delivery & Defect)]  ──┼─► [ Ekspor Laporan Ringkasan (PDF / Excel) ] ──► ( Selesai Evaluasi Bisnis )
    ├─► [Analitik Harga Impor (Grafik Kurs USD & Supplier)] ──┤
    └─► [Akses Immutable Audit Log (Read-Only Security)] ─────┘
```
