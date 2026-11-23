export interface ErdColumn {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
  desc: string;
}

export interface ErdTable {
  name: string;
  desc: string;
  columns: ErdColumn[];
}

export interface ArchitectureLayer {
  name: string;
  role: string;
  technologies: string[];
  description: string;
  components: string[];
}

export interface MockupScreen {
  id: string;
  title: string;
  route: string;
  category: string;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  keyFeatures: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  status: 'In Progress' | 'Completed';
  technologies: string[];
  shortDescription: string;
  background: string;
  purpose: string;
  features: string[];
  challenges: string;
  githubUrl: string;
  liveDemoUrl: string | null;
  thumbnailGradient: string;
  accentColor: string;
  stats: {
    label: string;
    value: string;
  }[];
  architectureSummary: string;
  architectureLayers: ArchitectureLayer[];
  erdSchema: ErdTable[];
  mockupScreens: MockupScreen[];
}

export const projects: Project[] = [
  {
    id: 'bps-system',
    title: 'BPS-System — Enterprise Resource Planning (ERP) PT Bintang Plastik Sempurna',
    category: 'Enterprise System',
    status: 'Completed',
    technologies: ['Node.js', 'Express.js', 'React.js', 'Sequelize ORM', 'MySQL', 'Socket.io', 'Tailwind CSS', 'JWT'],
    shortDescription:
      'Sistem informasi manajemen enterprise terpadu untuk PT Bintang Plastik Sempurna yang mengintegrasikan alur produksi pabrik plastik, persediaan bahan baku, order penjualan, penerbitan faktur pajak, dan pelaporan eksekutif real-time.',
    background:
      'Operasional manufaktur pabrik plastik berskala industri di PT Bintang Plastik Sempurna menghadapi tantangan dalam sinkronisasi data antar divisi: mulai dari selisih stok bahan baku biji plastik di gudang, keterlambatan pencatatan surat jalan pengiriman barang jadi, hingga pembuatan faktur pajak dan rekapan piutang yang sebelumnya masih tercecer di lembar kerja Excel manual.',
    purpose:
      'Membangun ekosistem ERP terpusat berbasis web yang menghubungkan divisi gudang bahan baku, lantai produksi pabrik, tim penjualan & ekspedisi pengiriman, hingga departemen akuntansi pajak dengan pembaruan data real-time melalui WebSocket.',
    features: [
      'Manajemen Produksi Plastik: Penerbitan Surat Perintah Kerja (SPK), monitoring batch proses injection/extrusion, dan pencatatan kuantitas reject vs hasil baik.',
      'Inventory Bahan Baku & Barang Jadi: Pelacakan stok biji plastik (PP, HDPE, LDPE, Pigmen Warna) dengan peringatan otomatis batas minimum stok.',
      'Faktur Pajak & Invoice Otomatis: Generator nomor faktur pajak resmi dengan kalkulasi PPN 11%, DPP, serta pratinjau cetak PDF dan ekspor Excel.',
      'Logistik & Surat Jalan Pengiriman: Manajemen armada pengiriman, pencatatan nomor kendaraan & supir, verifikasi penerimaan barang oleh customer.',
      'Portal Supplier & Customer: Direktori terpusat histori transaksi pembelian bahan baku vendor dan limit kredit pelanggan korporat.',
      'Sinkronisasi Real-Time Socket.io: Notifikasi instan ke seluruh staf saat terjadi perubahan stok kritis atau pesanan prioritas masuk.',
      'Multi-Role Enterprise Security: Hak akses berjenjang terisolasi untuk Superadmin, Manager Produksi, Operator Gudang, Sales, dan Finance.',
    ],
    challenges:
      'Merancang arsitektur Full-Stack Monorepo dengan sinkronisasi database MySQL berkecepatan tinggi melalui Sequelize ORM, menangani event WebSocket dua arah (Socket.io) tanpa memory leak, serta menjaga akurasi perhitungan finansial dan perpajakan multi-item.',
    githubUrl: 'https://github.com/Farizaa1328/BPS-System',
    liveDemoUrl: 'https://github.com/Farizaa1328/BPS-System',
    thumbnailGradient: 'from-slate-900 via-sky-950 to-blue-900',
    accentColor: '#0EA5E9',
    stats: [
      { label: 'Tipe Sistem', value: 'Enterprise ERP' },
      { label: 'Basis Manufaktur', value: 'Pabrik Plastik' },
      { label: 'Protokol Sync', value: 'Socket.io Live' },
      { label: 'Modul Bisnis', value: '8 Modul Terpadu' },
    ],
    architectureSummary:
      'Arsitektur Client-Server Enterprise Modern dengan pemisahan concern: Frontend SPA (React 19, Vite, Tailwind CSS, Recharts) berkomunikasi melalui REST API dan WebSocket ke Backend (Node.js, Express.js, Sequelize ORM), terhubung ke basis data MySQL 8.0 dengan transaksi ACID.',
    architectureLayers: [
      {
        name: 'Enterprise Client Interface',
        role: 'Antarmuka Staf Pabrik & Eksekutif',
        technologies: ['React 19', 'Tailwind CSS', 'Recharts', 'jsPDF', 'XLSX'],
        description: 'Menyajikan dashboard KPI produksi, tabel inventaris interaktif, dan generator berkas faktur siap cetak.',
        components: ['FactoryDashboard', 'ProductionLogTable', 'TaxInvoiceGenerator', 'DeliverySlipRenderer'],
      },
      {
        name: 'API Gateway & Realtime Socket',
        role: 'Otentikasi, Event Gateway & Routing',
        technologies: ['Express.js', 'Socket.io Server', 'JWT Middleware', 'Multer'],
        description: 'Memvalidasi token JWT pengguna, menangani upload berkas lampiran, dan menyiarkan event perubahan stok pabrik secara real-time.',
        components: ['AuthJWTFilter', 'WebSocketBroadcaster', 'FileUploadEngine', 'RateLimitingMiddleware'],
      },
      {
        name: 'Business & Manufacturing Logic',
        role: 'Aturan Bisnis Pabrik & Perpajakan',
        technologies: ['Node.js Controllers', 'Sequelize Models', 'Node-cron', 'Nodemailer'],
        description: 'Memproses siklus SPK produksi, kalkulasi otomatis PPN 11%, penjadwalan backup data, dan notifikasi email.',
        components: ['ProductionService', 'InventoryController', 'TaxBillingEngine', 'AutomatedScheduler'],
      },
      {
        name: 'Data Persistence & Storage',
        role: 'Penyimpanan Relasional & Integritas Transaksi',
        technologies: ['MySQL 8.0', 'Sequelize ORM', 'Foreign Key Constraints', 'DB Pooling'],
        description: 'Menjaga integritas data stok bahan baku, histori faktur pajak, dan jejak audit transaksi (audit trail) secara konsisten.',
        components: ['BahanBakuModel', 'FakturModel', 'ProduksiBatchModel', 'SuratJalanModel'],
      },
    ],
    erdSchema: [
      {
        name: 'bahan_baku',
        desc: 'Master data persediaan bahan baku biji plastik dan zat aditif pewarna pabrik.',
        columns: [
          { name: 'id', type: 'INT AUTO_INCREMENT', isPk: true, desc: 'Primary key bahan baku' },
          { name: 'kode_bahan', type: 'VARCHAR(30)', desc: 'Kode material unik (contoh: MAT-PP-01)' },
          { name: 'nama_bahan', type: 'VARCHAR(100)', desc: 'Nama bahan (contoh: Polypropylene Biji Plastik)' },
          { name: 'stok_kg', type: 'DECIMAL(12,2)', desc: 'Jumlah persediaan aktif dalam kilogram' },
          { name: 'minimum_stok_kg', type: 'DECIMAL(12,2)', desc: 'Batas peringatan restock otomatis' },
          { name: 'supplier_id', type: 'INT', isFk: true, desc: 'Foreign key ke data supplier rekanan' },
        ],
      },
      {
        name: 'produksi',
        desc: 'Catatan eksekusi Surat Perintah Kerja (SPK) di mesin pabrik.',
        columns: [
          { name: 'id', type: 'BIGINT AUTO_INCREMENT', isPk: true, desc: 'Primary key produksi' },
          { name: 'no_spk', type: 'VARCHAR(50)', desc: 'Nomor SPK resmi pabrik (unique)' },
          { name: 'tanggal_produksi', type: 'DATE', desc: 'Tanggal pengerjaan batch mesin' },
          { name: 'target_output_kg', type: 'DECIMAL(10,2)', desc: 'Target kuantitas hasil cetak' },
          { name: 'hasil_baik_kg', type: 'DECIMAL(10,2)', desc: 'Kuantitas produk lolos QC (Quality Control)' },
          { name: 'reject_kg', type: 'DECIMAL(10,2)', desc: 'Kuantitas cacat untuk daur ulang' },
          { name: 'status', type: 'ENUM', desc: 'Status: Draft, Berjalan, Selesai, Dibatalkan' },
        ],
      },
      {
        name: 'customer',
        desc: 'Direktori perusahaan pelanggan industri dan data perpajakan NPWP.',
        columns: [
          { name: 'id', type: 'INT AUTO_INCREMENT', isPk: true, desc: 'Primary key customer' },
          { name: 'kode_customer', type: 'VARCHAR(20)', desc: 'Kode unik perusahaan mitra' },
          { name: 'nama_perusahaan', type: 'VARCHAR(150)', desc: 'Nama legal PT / CV pemesan' },
          { name: 'npwp', type: 'VARCHAR(30)', desc: 'Nomor Pokok Wajib Pajak untuk faktur' },
          { name: 'alamat_pengiriman', type: 'TEXT', desc: 'Alamat pabrik / gudang tujuan barang' },
          { name: 'credit_limit', type: 'DECIMAL(15,2)', desc: 'Batas plafon piutang usaha' },
        ],
      },
      {
        name: 'surat_jalan',
        desc: 'Dokumen legal pengeluaran barang jadi dari gudang ekspedisi.',
        columns: [
          { name: 'id', type: 'BIGINT AUTO_INCREMENT', isPk: true, desc: 'Primary key surat jalan' },
          { name: 'no_surat_jalan', type: 'VARCHAR(50)', desc: 'Nomor resmi SJ-BPS-YYYYMMDD-XXX' },
          { name: 'customer_id', type: 'INT', isFk: true, desc: 'Foreign key merujuk ke customer.id' },
          { name: 'no_kendaraan', type: 'VARCHAR(20)', desc: 'Plat nomor armada truk pengangkut' },
          { name: 'nama_driver', type: 'VARCHAR(100)', desc: 'Nama pengemudi bertugas' },
          { name: 'status_pengiriman', type: 'ENUM', desc: 'Memuat, Dalam Perjalanan, Diterima' },
        ],
      },
      {
        name: 'penerbitan_faktur',
        desc: 'Penerbitan faktur pajak komersial resmi beserta perhitungan PPN 11%.',
        columns: [
          { name: 'id', type: 'BIGINT AUTO_INCREMENT', isPk: true, desc: 'Primary key faktur pajak' },
          { name: 'no_faktur', type: 'VARCHAR(50)', desc: 'Nomor faktur pajak penjualan resmi' },
          { name: 'surat_jalan_id', type: 'BIGINT', isFk: true, desc: 'Foreign key ke surat_jalan.id' },
          { name: 'dpp', type: 'DECIMAL(15,2)', desc: 'Dasar Pengenaan Pajak penjualan' },
          { name: 'ppn_11', type: 'DECIMAL(15,2)', desc: 'Nilai PPN 11% yang terhitung otomatis' },
          { name: 'grand_total', type: 'DECIMAL(15,2)', desc: 'Total tagihan neto yang wajib dibayar' },
          { name: 'status_bayar', type: 'ENUM', desc: 'Lunas, Belum Lunas, Jatuh Tempo' },
        ],
      },
    ],
    mockupScreens: [
      {
        id: 'executive-dashboard',
        title: 'Executive Dashboard & Live Factory Floor Monitoring',
        route: 'bps-system.local:5173/dashboard',
        category: 'Executive ERP Overview',
        description:
          'Pusat kendali visual manajemen untuk memantau ritme produksi pabrik harian, tonase bahan baku biji plastik aktif, antrean pengiriman barang, dan pendapatan faktur pajak.',
        highlights: [
          'Ringkasan real-time: 4.8 Ton produksi harian, 120 Ton stok bahan baku, 8 Surat Jalan siap kirim',
          'Peringatan instan Socket.io saat material tertentu berada di bawah batas minimum stok',
          'Grafik analitik komparasi target vs realisasi output mesin plastik',
        ],
        metrics: [
          { label: 'Output Harian', value: '4.850 Kg' },
          { label: 'Bahan Baku Siap', value: '120 Ton' },
          { label: 'Surat Jalan Aktif', value: '8 Armada' },
          { label: 'Faktur Terbit Bln Ini', value: 'Rp 428.5 Jt' },
        ],
        keyFeatures: ['Live Factory Metrics', 'Realtime Stock Alert', 'Production Bar Chart', 'Multi-Division Navigation'],
      },
      {
        id: 'faktur-pajak-module',
        title: 'Modul Penerbitan Faktur Pajak & Surat Jalan Otomatis',
        route: 'bps-system.local:5173/faktur/penerbitan',
        category: 'Tax & Logistics Engine',
        description:
          'Sistem otomatisasi penagihan pajak dan logistik terpadu dengan perhitungan PPN 11% otomatis, validasi NPWP customer, dan cetak dokumen resmi format PDF/Excel.',
        highlights: [
          'Kalkulasi otomatis DPP dan PPN 11% bebas kesalahan hitung manual',
          'Sinkronisasi langsung ke nomor Surat Jalan pengiriman yang telah diverifikasi supir',
          'Ekspor langsung ke format PDF siap arsip dan spreadsheet Excel untuk pelaporan pajak',
        ],
        metrics: [
          { label: 'Kalkulasi Pajak', value: '100% Presisi' },
          { label: 'Kecepatan Terbit', value: '< 1 Menit' },
          { label: 'Format Cetak', value: 'PDF & Excel' },
          { label: 'Sinkronisasi SJ', value: 'Otomatis' },
        ],
        keyFeatures: ['Automatic VAT Calculator', 'Delivery Note Linker', 'Official Invoice Formatter', 'Audit Export Service'],
      },
      {
        id: 'raw-materials-inventory',
        title: 'Inventaris Bahan Baku & Notifikasi Stok Real-Time',
        route: 'bps-system.local:5173/inventory/bahan-baku',
        category: 'Material Control & Purchasing',
        description:
          'Manajemen kontrol material biji plastik (PP, HDPE, LDPE) dilengkapi riwayat penerimaan dari supplier rekanan dan indikator visual batas aman operasional pabrik.',
        highlights: [
          'Visualisasi persediaan bahan baku per gudang penyimpanan',
          'Tombol cepat penerbitan Memo Pembelian (Purchase Request) ke supplier rekanan',
          'Audit trail penerimaan material dengan lampiran nomor timbangan truk',
        ],
        metrics: [
          { label: 'Jenis Material', value: '18 Varian Biji' },
          { label: 'Akurasi Timbangan', value: '99.8%' },
          { label: 'Vendor Rekanan', value: '12 Supplier' },
          { label: 'Status Gudang', value: 'Aman (Optimal)' },
        ],
        keyFeatures: ['Stock Level Gauge', 'Supplier Ledger', 'Auto Restock Alert', 'Weight Scale Logger'],
      },
    ],
  },
  {
    id: 'sipak-rt012',
    title: 'Sistem Informasi Pelayanan Administrasi dan Keuangan Warga',
    category: 'Final Year Project',
    status: 'In Progress',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'Blade'],
    shortDescription:
      'Sistem informasi berbasis web untuk membantu pengurus RT dalam mengelola data warga, pelayanan administrasi, pembayaran iuran, serta pencatatan dan pelaporan keuangan.',
    background:
      'Proses pencatatan administrasi kependudukan dan penarikan iuran bulanan di lingkungan Rukun Tetangga (RT 012) sebelumnya masih dilakukan secara konvensional menggunakan buku fisik. Hal ini menimbulkan potensi ketidaksesuaian data warga, risiko kehilangan arsip surat pengantar, serta kurangnya transparansi rekap keuangan yang dapat diakses oleh warga secara akuntabel.',
    purpose:
      'Mendigitalisasi tata kelola administrasi kependudukan RT, mempercepat pembuatan surat pengantar warga secara daring, serta menghadirkan pembukuan keuangan iuran kas RT yang transparan, otomatis, dan terdokumentasi rapi.',
    features: [
      'Manajemen Kependudukan: Pendataan Kepala Keluarga (KK), anggota keluarga, status kependudukan, serta mutasi warga masuk/pindah.',
      'Layanan Surat Mandiri: Pengajuan surat pengantar domisili, surat keterangan tidak mampu, dan izin keramaian secara digital dengan pelacakan status.',
      'Sistem Kas & Iuran Warga: Pencatatan tagihan iuran kebersihan, keamanan, dan kas RT dengan bukti pembayaran terverifikasi bendahara.',
      'Dashboard & Visualisasi Data: Grafik demografi kependudukan (usia, pekerjaan, RT/RW) serta ringkasan kas masuk & keluar secara berkala.',
      'Cetak Laporan Otomatis: Ekspor laporan keuangan bulanan, kas tahunan, dan buku induk kependudukan ke format PDF resmi siap arsip.',
      'Multi-Role Authorization: Hak akses berjenjang terpisah untuk Warga, Pengurus RT (Sekretaris & Bendahara), dan Ketua RT.',
    ],
    challenges:
      'Menyusun skema basis data relasional yang mampu menangani riwayat mutasi warga tanpa merusak integritas data historis iuran keuangan, serta memastikan antarmuka mudah digunakan oleh pengurus RT dari berbagai kelompok usia.',
    githubUrl: 'https://github.com/Farizaa1328',
    liveDemoUrl: null, // Proyek In Progress
    thumbnailGradient: 'from-blue-600 via-indigo-600 to-purple-600',
    accentColor: '#2563EB',
    stats: [
      { label: 'Tipe Proyek', value: 'Tugas Akhir S1' },
      { label: 'Basis Sistem', value: 'Web MVC' },
      { label: 'Status Rilis', value: 'Fase Pengembangan' },
      { label: 'Lingkup Pengguna', value: 'Warga & Pengurus RT' },
    ],
    architectureSummary:
      'Arsitektur Model-View-Controller (MVC) terstruktur dengan pemisahan dependensi berlapis: Presentation Layer (Blade & Bootstrap UI), Application Layer (Laravel Routing & RBAC Middleware), Business Logic (Service Layer & Controllers), dan Data Persistence (Eloquent ORM & MySQL Relational Database).',
    architectureLayers: [
      {
        name: 'Client & Presentation Layer',
        role: 'Antarmuka Warga & Pengurus RT',
        technologies: ['Blade Engine', 'Bootstrap 5', 'Tailwind CSS', 'Fetch API'],
        description: 'Menyajikan antarmuka responsif untuk warga mengajukan surat dan pengurus RT mengelola dashboard.',
        components: ['Warga Portal UI', 'Admin RT Dashboard', 'Formulir Surat Interaktif', 'Tabel Rekapitulasi Iuran'],
      },
      {
        name: 'Gatekeeper & Routing Layer',
        role: 'Keamanan, Autentikasi & Routing',
        technologies: ['Laravel Router', 'Middleware Auth', 'CSRF Protection', 'Spatie Permission'],
        description: 'Memvalidasi setiap HTTP request, mencegah serangan CSRF, dan memfilter hak akses multi-role.',
        components: ['Role-Based Access Control', 'Session Manager', 'Input Sanitizer', 'Rate Limiter'],
      },
      {
        name: 'Business & Controller Layer',
        role: 'Logika Pemrosesan & Layanan Sistem',
        technologies: ['PHP 8.2+', 'Laravel Controllers', 'Form Requests', 'DomPDF Engine'],
        description: 'Mengatur alur bisnis pendaftaran KK, approval surat pengantar berkas, dan perhitungan otomatis kas.',
        components: ['CitizenService', 'LetterApprovalEngine', 'FinancialLedgerService', 'PdfReportGenerator'],
      },
      {
        name: 'Data Access & Storage Layer',
        role: 'Persistensi Data & Integritas Relasional',
        technologies: ['Eloquent ORM', 'MySQL 8.0', 'Database Transactions', 'Storage Driver'],
        description: 'Menyimpan dan mengelola relasi data kependudukan dengan transaksi ACID untuk keamanan transaksi keuangan.',
        components: ['Relational Schema', 'Foreign Key Constraints', 'Evidence File Storage', 'Audit Trail Log'],
      },
    ],
    erdSchema: [
      {
        name: 'users',
        desc: 'Tabel akun otentikasi pengurus RT dan warga dengan hak akses berjenjang.',
        columns: [
          { name: 'id', type: 'BIGINT UNSIGNED', isPk: true, desc: 'Identifikasi unik pengguna' },
          { name: 'username', type: 'VARCHAR(50)', desc: 'Nama akun untuk masuk sistem' },
          { name: 'email', type: 'VARCHAR(100)', desc: 'Alamat email terdaftar (unique)' },
          { name: 'password', type: 'VARCHAR(255)', desc: 'Hash kata sandi Bcrypt terenkripsi' },
          { name: 'role', type: 'ENUM', desc: 'Hak akses: ketua_rt, sekretaris, bendahara, warga' },
          { name: 'status', type: 'ENUM', desc: 'Status aktifasi akun (aktif/nonaktif)' },
        ],
      },
      {
        name: 'kartu_keluarga',
        desc: 'Tabel induk kepala keluarga dan alamat domisili di lingkungan RT 012.',
        columns: [
          { name: 'id', type: 'BIGINT UNSIGNED', isPk: true, desc: 'Primary key kartu keluarga' },
          { name: 'no_kk', type: 'VARCHAR(16)', desc: 'Nomor Kartu Keluarga 16 digit resmi (unique)' },
          { name: 'kepala_keluarga', type: 'VARCHAR(100)', desc: 'Nama lengkap kepala keluarga' },
          { name: 'alamat', type: 'TEXT', desc: 'Alamat rumah dan nomor kavling RT 012' },
          { name: 'rt_rw', type: 'VARCHAR(10)', desc: 'Nomor RT/RW (Default: 012/004)' },
          { name: 'created_at', type: 'TIMESTAMP', desc: 'Waktu registrasi data KK' },
        ],
      },
      {
        name: 'warga',
        desc: 'Data spesifik tiap individu warga yang berelasi ke Kartu Keluarga.',
        columns: [
          { name: 'id', type: 'BIGINT UNSIGNED', isPk: true, desc: 'Primary key identitas warga' },
          { name: 'kk_id', type: 'BIGINT UNSIGNED', isFk: true, desc: 'Foreign key merujuk ke kartu_keluarga.id' },
          { name: 'nik', type: 'VARCHAR(16)', desc: 'Nomor Induk Kependudukan 16 digit (unique)' },
          { name: 'nama_lengkap', type: 'VARCHAR(100)', desc: 'Nama lengkap sesuai KTP' },
          { name: 'jenis_kelamin', type: 'ENUM', desc: 'Jenis kelamin (L / P)' },
          { name: 'tgl_lahir', type: 'DATE', desc: 'Tanggal lahir warga' },
          { name: 'agama', type: 'VARCHAR(20)', desc: 'Agama terdaftar' },
          { name: 'pekerjaan', type: 'VARCHAR(50)', desc: 'Profesi / status pekerjaan' },
          { name: 'status_tinggal', type: 'ENUM', desc: 'Tetap / Kontrak / Domisili Luar' },
        ],
      },
      {
        name: 'surat_pengantar',
        desc: 'Pencatatan pengajuan surat daring oleh warga beserta siklus approval pengurus RT.',
        columns: [
          { name: 'id', type: 'BIGINT UNSIGNED', isPk: true, desc: 'Primary key surat pengantar' },
          { name: 'warga_id', type: 'BIGINT UNSIGNED', isFk: true, desc: 'Foreign key pemohon -> warga.id' },
          { name: 'no_surat', type: 'VARCHAR(50)', desc: 'Format penomoran surat resmi RT-012 (unique)' },
          { name: 'jenis_surat', type: 'VARCHAR(50)', desc: 'Kategori: Domisili, SKTM, Pengantar SKCK' },
          { name: 'keperluan', type: 'TEXT', desc: 'Uraian tujuan pengajuan surat' },
          { name: 'status', type: 'ENUM', desc: 'Siklus: diajukan, diverifikasi, disetujui, ditolak' },
          { name: 'verified_by', type: 'BIGINT UNSIGNED', isFk: true, desc: 'ID akun pengurus yang memvalidasi' },
        ],
      },
      {
        name: 'iuran_kas',
        desc: 'Pencatatan kas bulanan (kebersihan & keamanan) dengan riwayat bukti transfer.',
        columns: [
          { name: 'id', type: 'BIGINT UNSIGNED', isPk: true, desc: 'Primary key catatan kas' },
          { name: 'kk_id', type: 'BIGINT UNSIGNED', isFk: true, desc: 'Foreign key pembayar -> kartu_keluarga.id' },
          { name: 'periode_bulan', type: 'TINYINT', desc: 'Bulan tagihan (1 - 12)' },
          { name: 'tahun', type: 'SMALLINT', desc: 'Tahun tagihan (misal: 2026)' },
          { name: 'nominal', type: 'DECIMAL(10,2)', desc: 'Besaran iuran kas wajib (Rp 50.000)' },
          { name: 'status_bayar', type: 'ENUM', desc: 'Status transaksi: lunas, belum_lunas' },
          { name: 'bukti_transfer', type: 'VARCHAR(255)', desc: 'Path berkas bukti bayar tersimpan' },
          { name: 'verified_at', type: 'TIMESTAMP', desc: 'Waktu konfirmasi verifikasi bendahara' },
        ],
      },
    ],
    mockupScreens: [
      {
        id: 'dashboard-admin',
        title: 'Dashboard Eksekutif & Monitoring Kependudukan RT-012',
        route: 'sipak.rt012.id/admin/dashboard',
        category: 'Admin Control Center',
        description:
          'Pusat kendali visual pengurus RT untuk memantau data demografi warga, statistik kepala keluarga aktif, rekapitulasi kas masuk, dan antrean pengajuan surat harian secara langsung.',
        highlights: [
          'Ringkasan real-time: 142 Kepala Keluarga, 428 Jiwa, Total Kas Kas RT Rp 7.150.000',
          'Indikator visual antrean 3 pengajuan surat membutuhkan verifikasi',
          'Grafik distribusi usia produktif dan demografi warga RT 012',
        ],
        metrics: [
          { label: 'Kepala Keluarga', value: '142 KK' },
          { label: 'Warga Terdata', value: '428 Jiwa' },
          { label: 'Kas Terkumpul', value: 'Rp 7.150.000' },
          { label: 'Surat Pending', value: '3 Berkas' },
        ],
        keyFeatures: ['KPI Metrics Card', 'Demographic Bar Chart', 'Live Activity Stream', 'Quick Action Toolbar'],
      },
      {
        id: 'layanan-surat',
        title: 'Layanan Pengajuan Surat Mandiri Warga',
        route: 'sipak.rt012.id/layanan/surat',
        category: 'Citizen Self-Service',
        description:
          'Portal mandiri bagi warga untuk mengajukan Surat Keterangan Domisili, SKCK, maupun SKTM dengan pengisian otomatis berbasis NIK dan pelacakan status approval secara transparan.',
        highlights: [
          'Formulir terpadu dengan validasi otomatis ke basis data kependudukan',
          'Tracking timeline status surat: Diajukan → Verifikasi Sekretaris → Disetujui Ketua RT',
          'Generator otomatis dokumen format PDF dengan QR-Code pengesahan',
        ],
        metrics: [
          { label: 'Rata-rata Proses', value: '< 24 Jam' },
          { label: 'Akurasi Data', value: '100% NIK Match' },
          { label: 'Format Dokumen', value: 'Resmi PDF/A' },
          { label: 'Paperless Rate', value: '94% Terpangkas' },
        ],
        keyFeatures: ['Auto-Fill Citizen Form', 'Document Status Tracker', 'Automated PDF Engine', 'Digital Signature Stamp'],
      },
      {
        id: 'buku-kas-iuran',
        title: 'Buku Kas Umum & Rekapitulasi Iuran Warga',
        route: 'sipak.rt012.id/keuangan/iuran',
        category: 'Financial Ledger',
        description:
          'Sistem pencatatan transparansi keuangan RT untuk mengelola iuran kebersihan dan keamanan bulanan per KK, validasi bukti transfer, serta ekspor pembukuan kas bulanan.',
        highlights: [
          'Pencatatan status iuran per KK dengan indikator warna Lunas dan Tertunggak',
          'Modul verifikasi bukti pembayaran transfer bank/e-wallet oleh Bendahara',
          'Laporan rekap kas masuk & keluar bulanan siap cetak untuk rapat warga',
        ],
        metrics: [
          { label: 'Tingkat Kepatuhan', value: '92.4% Warga' },
          { label: 'Rekap Kas Bulanan', value: 'Otomatis' },
          { label: 'Verifikasi Slip', value: 'Satu-Klik' },
          { label: 'Audit Trail', value: 'Tercatat Rapi' },
        ],
        keyFeatures: ['Household Billing Matrix', 'Payment Slip Verification', 'Export Financial Report', 'Audit Trail History'],
      },
    ],
  },
  {
    id: 'kost-saali',
    title: 'Kost Saali',
    category: 'Web Application',
    status: 'Completed',
    technologies: ['React.js', 'TypeScript', 'CSS', 'Tailwind CSS'],
    shortDescription:
      'Aplikasi manajemen kost untuk membantu pengelolaan kamar, penyewa, dan informasi operasional kost.',
    background:
      'Pengelolaan bisnis rumah kost dengan banyak kamar membutuhkan pemantauan ketersediaan kamar yang cepat, pencatatan tanggal jatuh tempo sewa yang akurat, serta pengingat tagihan fasilitas berkala agar tidak terjadi tunggakan sewa kamar.',
    purpose:
      'Membantu pemilik rumah kost Saali memonitor status okupansi kamar secara real-time, mengelola informasi kontak dan identitas penyewa, serta menghitung estimasi pendapatan operasional kost dengan antarmuka yang modern dan responsif.',
    features: [
      'Visual Kamar Interaktif: Tampilan grid status kamar (Kamar Kosong, Terisi, Dalam Perbaikan) dengan filter tipe kamar.',
      'Direktori Penyewa: Pendataan riwayat kontrak, identitas penyewa, tanggal masuk, dan status deposit.',
      'Manajemen Tagihan & Jatuh Tempo: Indikator visual batas pembayaran sewa bulanan dan perhitungan otomatis denda/keterlambatan.',
      'Filter & Pencarian Instan: Navigasi cepat mencari kamar atau nama penyewa dengan pencarian dinamis tanpa reload halaman.',
      'Desain Responsif: Optimal digunakan baik melalui layar smartphone pemilik saat keliling cek kamar maupun dari laptop.',
    ],
    challenges:
      'Mendesain state management yang reaktif dan type-safe menggunakan TypeScript untuk sinkronisasi filtering kamar multidimensi (harga, lantai, fasilitas, status ketersediaan) secara cepat di sisi browser.',
    githubUrl: 'https://github.com/Farizaa1328',
    liveDemoUrl: 'https://github.com/Farizaa1328',
    thumbnailGradient: 'from-violet-600 via-purple-600 to-indigo-700',
    accentColor: '#8B5CF6',
    stats: [
      { label: 'Kategori', value: 'Web App' },
      { label: 'Stack Frontend', value: 'React + TS' },
      { label: 'Performa', value: 'Fast Client-Side' },
      { label: 'UI Style', value: 'Clean Minimalist' },
    ],
    architectureSummary:
      'Arsitektur Client-Side Single Page Application (SPA) berbasis React 18 dan TypeScript dengan modular functional components, typed state models, memoized search filtering, dan utility-first styling.',
    architectureLayers: [
      {
        name: 'UI & View Layer',
        role: 'Komponen Presentasi Responsif',
        technologies: ['React 18', 'Tailwind CSS', 'Lucide React'],
        description: 'Menampilkan katalog kamar, matriks okupansi, dan panel detail penyewa yang responsif di smartphone dan desktop.',
        components: ['RoomGridComponent', 'TenantDirectoryModal', 'FilterSidebar', 'OccupancyStatsBadge'],
      },
      {
        name: 'State & Logic Layer',
        role: 'Manajemen State & Event Handlers',
        technologies: ['TypeScript Strict Mode', 'React Hooks', 'Custom Filter Hooks'],
        description: 'Mengelola filter kamar dinamis, perhitungan kalkulasi jatuh tempo, dan validasi data penyewa.',
        components: ['useRoomFilter', 'useBillingCalculator', 'RoomBookingHandler', 'SearchDebounce'],
      },
      {
        name: 'Data Contract & Typing Layer',
        role: 'Keamanan Tipe & Struktur Data',
        technologies: ['TypeScript Interfaces', 'Enums', 'Type Aliases'],
        description: 'Menjamin konsistensi data kamar, spesifikasi fasilitas, dan relasi penyewa secara type-safe saat kompilasi.',
        components: ['RoomInterface', 'TenantRecord', 'BillingPeriodType', 'RoomStatusEnum'],
      },
      {
        name: 'Persistence & Local Cache',
        role: 'Penyimpanan Lokal & Sinkronisasi',
        technologies: ['Web Storage API', 'JSON Serialization'],
        description: 'Menyimpan konfigurasi status kamar dan riwayat pencarian langsung pada browser pemilik kost.',
        components: ['LocalStorageSync', 'StateRehydrator', 'ExportJsonBackup'],
      },
    ],
    erdSchema: [
      {
        name: 'kamar',
        desc: 'Data seluruh unit kamar kost Saali beserta fasilitas dan status okupansi.',
        columns: [
          { name: 'id', type: 'VARCHAR(20)', isPk: true, desc: 'Identifikasi unit kamar (contoh: KMR-101)' },
          { name: 'nomor_kamar', type: 'VARCHAR(10)', desc: 'Nomor pintu kamar kost' },
          { name: 'lantai', type: 'TINYINT', desc: 'Posisi lantai (Lantai 1 / Lantai 2)' },
          { name: 'tipe_kamar', type: 'ENUM', desc: 'Standard, Deluxe (AC), VIP (Kamar Mandi Dalam)' },
          { name: 'harga_bulanan', type: 'DECIMAL(10,2)', desc: 'Tarif sewa per bulan (Rp 800.000 - 1.500.000)' },
          { name: 'status', type: 'ENUM', desc: 'Status: Tersedia, Terisi, Dalam Renovasi' },
        ],
      },
      {
        name: 'penyewa',
        desc: 'Data identitas penghuni kost yang sedang aktif menempati kamar.',
        columns: [
          { name: 'id', type: 'VARCHAR(20)', isPk: true, desc: 'Primary key penyewa' },
          { name: 'kamar_id', type: 'VARCHAR(20)', isFk: true, desc: 'Foreign key merujuk ke kamar.id' },
          { name: 'nama_lengkap', type: 'VARCHAR(100)', desc: 'Nama lengkap penyewa sesuai KTP' },
          { name: 'no_telepon', type: 'VARCHAR(20)', desc: 'Nomor WhatsApp aktif untuk konfirmasi' },
          { name: 'tgl_masuk', type: 'DATE', desc: 'Tanggal awal mulai sewa kamar' },
          { name: 'deposit', type: 'DECIMAL(10,2)', desc: 'Uang jaminan fasilitas kamar' },
        ],
      },
      {
        name: 'transaksi_sewa',
        desc: 'Riwayat pembayaran sewa bulanan dan jatuh tempo.',
        columns: [
          { name: 'id', type: 'VARCHAR(30)', isPk: true, desc: 'Nomor invoice pembayaran sewa' },
          { name: 'penyewa_id', type: 'VARCHAR(20)', isFk: true, desc: 'Foreign key ke penyewa.id' },
          { name: 'kamar_id', type: 'VARCHAR(20)', isFk: true, desc: 'Foreign key ke kamar.id' },
          { name: 'bulan_tagihan', type: 'VARCHAR(20)', desc: 'Periode bulan sewa berjalan' },
          { name: 'total_bayar', type: 'DECIMAL(10,2)', desc: 'Nominal yang dibayarkan' },
          { name: 'status_bayar', type: 'ENUM', desc: 'Lunas, Tertunda, Jatuh Tempo' },
        ],
      },
    ],
    mockupScreens: [
      {
        id: 'matrix-kamar',
        title: 'Matriks Visual Ketersediaan Kamar Kost',
        route: 'kostsaali.app/dashboard/kamar',
        category: 'Room Occupancy Matrix',
        description:
          'Tampilan grid visual interaktif yang memetakan seluruh kamar di Lantai 1 dan Lantai 2 dengan penanda warna status ketersediaan dan fasilitas lengkap.',
        highlights: [
          'Visual status kamar instan (Hijau: Tersedia, Merah: Terisi, Kuning: Jatuh Tempo)',
          'Filter multivariabel berdasarkan tipe kamar, fasilitas AC, dan rentang harga',
          'Aksi cepat satu-klik untuk mendaftarkan booking atau melihat profil penyewa',
        ],
        metrics: [
          { label: 'Kapasitas Unit', value: '24 Kamar' },
          { label: 'Tingkat Okupansi', value: '87.5%' },
          { label: 'Kamar Siap Huni', value: '3 Unit' },
          { label: 'Lantai Aktif', value: '2 Lantai' },
        ],
        keyFeatures: ['Interactive Grid Layout', 'Room Status Indicators', 'Instant Filter Panel', 'Room Quick Info Popup'],
      },
      {
        id: 'penyewa-billing',
        title: 'Direktori Penyewa & Pengingat Jatuh Tempo',
        route: 'kostsaali.app/dashboard/penyewa',
        category: 'Tenant Management',
        description:
          'Daftar kontak penyewa dilengkapi penghitung hari mundur menuju tanggal jatuh tempo pembayaran sewa, serta integrasi tombol pengingat pesan WhatsApp.',
        highlights: [
          'Kalkulator sisa hari jatuh tempo dengan highlight peringatan otomatis',
          'Arsip digital kontak darurat dan kartu identitas KTP penyewa',
          'Pencatatan deposit jaminan sewa dan pengembalian saat masa sewa selesai',
        ],
        metrics: [
          { label: 'Total Penyewa', value: '21 Orang' },
          { label: 'Jatuh Tempo Mgg Ini', value: '2 Kamar' },
          { label: 'Tunggakan', value: '0 Kasus' },
          { label: 'Rata-rata Sewa', value: '8.4 Bulan' },
        ],
        keyFeatures: ['Due-Date Countdown', 'Direct WhatsApp Trigger', 'Deposit Ledger', 'Tenant Search Filter'],
      },
    ],
  },
  {
    id: 'aplikasi-kasir',
    title: 'Aplikasi Kasir',
    category: 'Desktop Application',
    status: 'Completed',
    technologies: ['Java', 'NetBeans', 'MySQL', 'Java Swing'],
    shortDescription:
      'Aplikasi kasir untuk membantu pengelolaan data menu dan proses operasional kantin.',
    background:
      'Pada jam makan siang, kantin seringkali mengalami antrean panjang karena transaksi kasir manual masih memakai kertas dan kalkulator. Kesalahan perhitungan kembalian dan lambatnya pencatatan pesanan menjadi kendala utama kelancaran usaha.',
    purpose:
      'Menghadirkan sistem kasir desktop (Point of Sale) yang tangguh dan ringan untuk mempercepat perhitungan total pesanan, meminimalkan human-error penghitungan kembalian, serta mengelola data harga menu secara terpusat di basis data MySQL.',
    features: [
      'Kasir Point of Sale (POS): Input menu cepat dengan shortcut keyboard, kalkulasi harga otomatis, dan kalkulator kembalian uang tunai.',
      'CRUD Manajemen Menu: Pengaturan harga jual, kategori menu (makanan berat, minuman, snack), serta status ketersediaan stok menu.',
      'Riwayat Penjualan: Pencatatan setiap struk transaksi beserta cap waktu dan rincian item menu yang terjual.',
      'Cetak Bukti Pembayaran: Format struk belanja siap cetak langsung ke printer kasir / thermal receipt printer.',
      'Integrasi Database MySQL: Penyimpanan data lokal yang andal dengan koneksi JDBC teroptimasi.',
    ],
    challenges:
      'Mengimplementasikan arsitektur Java Swing desktop yang responsif, mencegah freeze tampilan UI saat melakukan query database yang berulang, serta menangani error handling transaksi finansial.',
    githubUrl: 'https://github.com/Farizaa1328',
    liveDemoUrl: null, // Aplikasi Desktop
    thumbnailGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    accentColor: '#059669',
    stats: [
      { label: 'Platform', value: 'Desktop POS' },
      { label: 'Bahasa', value: 'Java SE (Swing)' },
      { label: 'Penyimpanan', value: 'MySQL Local' },
      { label: 'Lingkup', value: 'Operasional Kasir' },
    ],
    architectureSummary:
      'Arsitektur Desktop Client-Server 3-Tier memanfaatkan Java Swing Graphical Framework, Controller & DAO (Data Access Object) Pattern, dan koneksi JDBC ke MySQL Database dengan prinsip ACID transactions.',
    architectureLayers: [
      {
        name: 'User Interface (Swing GUI)',
        role: 'Antarmuka Desktop Kasir & Shortcut',
        technologies: ['Java Swing', 'AWT Events', 'JTable Component'],
        description: 'Tampilan POS dengan dukungan keyboard shortcut angka, tabel keranjang transaksi, dan dialog kasir.',
        components: ['KasirMainFrame', 'MenuManagementPanel', 'ReceiptPrintPreview', 'CashCalculatorModal'],
      },
      {
        name: 'Controller & Business Service',
        role: 'Logika Kalkulasi & Validasi Stok',
        technologies: ['Java SE 8+', 'DAO Pattern', 'Exception Handlers'],
        description: 'Memproses kalkulasi diskon, total pesanan, penghitungan uang kembalian, dan validasi ketersediaan porsi menu.',
        components: ['TransaksiController', 'MenuService', 'StrukPrintService', 'LaporanKeuanganService'],
      },
      {
        name: 'Data Access Layer (JDBC)',
        role: 'Koneksi & Eksekusi Query Database',
        technologies: ['MySQL Connector/J', 'PreparedStatement', 'Connection Pool'],
        description: 'Menangani komunikasi query SQL secara aman dengan PreparedStatement untuk mencegah SQL Injection.',
        components: ['DBConnectionFactory', 'MenuDAOImpl', 'TransaksiDAOImpl', 'DetailTransaksiDAO'],
      },
      {
        name: 'Database Engine',
        role: 'Penyimpanan Relasional Transaksi',
        technologies: ['MySQL 8.0 InnoDB', 'ACID Transactions', 'Foreign Keys'],
        description: 'Menyimpan data master menu dan histori transaksi dengan transaction commit / rollback rollback saat error.',
        components: ['Tabel Master Menu', 'Tabel Transaksi Induk', 'Tabel Detail Item', 'Indeks Kode Barang'],
      },
    ],
    erdSchema: [
      {
        name: 'menu_item',
        desc: 'Katalog daftar menu makanan, minuman, dan harga satuan.',
        columns: [
          { name: 'id', type: 'INT AUTO_INCREMENT', isPk: true, desc: 'ID unik menu makanan/minuman' },
          { name: 'kode_menu', type: 'VARCHAR(20)', desc: 'Kode barcode / shortcut menu (unique)' },
          { name: 'nama_menu', type: 'VARCHAR(100)', desc: 'Nama menu (contoh: Nasi Goreng Spesial)' },
          { name: 'kategori', type: 'ENUM', desc: 'Makanan, Minuman, Paket, Cemilan' },
          { name: 'harga_satuan', type: 'DECIMAL(10,2)', desc: 'Harga jual per porsi' },
          { name: 'stok_harian', type: 'INT', desc: 'Jumlah porsi tersedia hari ini' },
        ],
      },
      {
        name: 'transaksi_kasir',
        desc: 'Pencatatan bukti transaksi kasir utama dan kalkulasi kembalian.',
        columns: [
          { name: 'id', type: 'BIGINT AUTO_INCREMENT', isPk: true, desc: 'Nomor urut transaksi' },
          { name: 'no_struk', type: 'VARCHAR(30)', desc: 'Nomor struk unik (TRX-YYYYMMDD-XXX)' },
          { name: 'nama_kasir', type: 'VARCHAR(50)', desc: 'Nama staf kasir yang melayani' },
          { name: 'total_harga', type: 'DECIMAL(10,2)', desc: 'Total tagihan belanja pelanggan' },
          { name: 'uang_diterima', type: 'DECIMAL(10,2)', desc: 'Jumlah uang tunai yang diserahkan' },
          { name: 'uang_kembalian', type: 'DECIMAL(10,2)', desc: 'Kembalian uang tunai yang dihitung otomatis' },
          { name: 'waktu_transaksi', type: 'TIMESTAMP', desc: 'Waktu transaksi tercatat di database' },
        ],
      },
      {
        name: 'detail_transaksi',
        desc: 'Daftar rincian menu yang dibeli dalam satu struk transaksi.',
        columns: [
          { name: 'id', type: 'BIGINT AUTO_INCREMENT', isPk: true, desc: 'ID item transaksi' },
          { name: 'transaksi_id', type: 'BIGINT', isFk: true, desc: 'Foreign key ke transaksi_kasir.id' },
          { name: 'menu_id', type: 'INT', isFk: true, desc: 'Foreign key ke menu_item.id' },
          { name: 'jumlah_beli', type: 'INT', desc: 'Kuantitas / porsi yang dibeli' },
          { name: 'harga_satuan', type: 'DECIMAL(10,2)', desc: 'Harga saat transaksi berlangsung' },
          { name: 'subtotal', type: 'DECIMAL(10,2)', desc: 'Kalkulasi jumlah_beli * harga_satuan' },
        ],
      },
    ],
    mockupScreens: [
      {
        id: 'pos-terminal',
        title: 'Terminal Utama Kasir Point of Sale (POS)',
        route: 'AplikasiKasir.jar // Terminal POS v1.2',
        category: 'POS Terminal UI',
        description:
          'Layar kerja kasir dengan grid menu cepat, tabel keranjang pesanan interaktif, dan kalkulator uang tunai otomatis untuk memproses antrean pelanggan secara cepat.',
        highlights: [
          'Navigasi menu instan dengan tombol kategori & shortcut keyboard',
          'Penghitungan subtotal, diskon, dan uang kembalian secara otomatis',
          'Tombol cetak langsung ke printer thermal struk 58mm / 80mm',
        ],
        metrics: [
          { label: 'Kecepatan Transaksi', value: '< 15 Detik' },
          { label: 'Akurasi Hitung', value: '100% Bebas Error' },
          { label: 'Kategori Menu', value: '4 Kelompok' },
          { label: 'Format Struk', value: 'Thermal 58mm' },
        ],
        keyFeatures: ['Quick Menu Grid', 'Order Cart Table', 'Change Calculator', 'Thermal Print Trigger'],
      },
      {
        id: 'laporan-penjualan',
        title: 'Rekapitulasi Penjualan Harian & Manajemen Stok',
        route: 'AplikasiKasir.jar // Laporan Penjualan',
        category: 'Sales Reporting & Inventory',
        description:
          'Dashboard rekap transaksi kasir yang menyajikan total omzet harian, menu paling laris (best seller), dan riwayat seluruh struk belanja yang dapat difilter per tanggal.',
        highlights: [
          'Kalkulasi total pendapatan harian dan bulanan secara otomatis',
          'Grafik menu terlaris untuk mempermudah perencanaan belanja bahan baku',
          'Pencarian dan cetak ulang struk transaksi lama secara instan',
        ],
        metrics: [
          { label: 'Omzet Harian', value: 'Terekap Otomatis' },
          { label: 'Menu Terlaris', value: 'Top 5 Highlight' },
          { label: 'Audit Transaksi', value: 'Lengkap Cap Waktu' },
          { label: 'Ekspor Data', value: 'Excel & PDF' },
        ],
        keyFeatures: ['Daily Revenue Summary', 'Best Seller Analytics', 'Historical Receipt Search', 'Stock Replenishment'],
      },
    ],
  },
  {
    id: 'codelearn',
    title: 'CodeLearn',
    category: 'Web Development Project',
    status: 'Completed',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    shortDescription:
      'Website pembelajaran pemrograman dengan antarmuka yang dirancang modern dan mudah digunakan.',
    background:
      'Belajar pemrograman web dasar sering terasa menantang bagi pemula jika materi yang disajikan tidak terstruktur secara runut atau antarmuka platform terlalu rumit dan membingungkan.',
    purpose:
      'Menyediakan media edukasi web interaktif berbasis open web standards (HTML, CSS, JS) yang ramah pemula, memiliki tata letak bersih, navigasi materi terstruktur, serta contoh kode langsung.',
    features: [
      'Silabus Belajar Terstruktur: Panduan langkah demi langkah dari pengenalan tag HTML, styling CSS, hingga logika dasar JavaScript.',
      'Pratinjau Kode: Area contoh potongan kode dengan sintaks yang rapi dan mudah disalin.',
      'Kuis Evaluasi Pemahaman: Fitur evaluasi mini interaktif di setiap akhir modul untuk menguji pemahaman materi pembelajar.',
      'Tipografi & Keterbacaan Optimal: Didesain dengan hierarki teks yang nyaman untuk membaca teks panjang tanpa membuat mata cepat lelah.',
      'Arsitektur Ringan: Dibangun dengan semantic HTML murni dan Vanilla JavaScript sehingga sangat ringan dibuka di perangkat apapun.',
    ],
    challenges:
      'Merancang antarmuka edukasi yang estetik dan intuitif hanya dengan memanfaatkan Vanilla JavaScript murni tanpa bantuan framework eksternal, sekaligus memastikan responsivitas di smartphone.',
    githubUrl: 'https://github.com/Farizaa1328',
    liveDemoUrl: 'https://github.com/Farizaa1328',
    thumbnailGradient: 'from-amber-500 via-orange-600 to-red-600',
    accentColor: '#D97706',
    stats: [
      { label: 'Tipe Proyek', value: 'Web Edukasi' },
      { label: 'Teknologi', value: 'Vanilla Web Stack' },
      { label: 'Kategori', value: 'Web Development' },
      { label: 'Aksesibilitas', value: 'Semua Perangkat' },
    ],
    architectureSummary:
      'Arsitektur Lightweight Web Client-Side murni mengoptimalkan Semantic HTML5, CSS3 Variables, dan Vanilla JavaScript ES6 Modular untuk kecepatan loading instan tanpa overhead runtime eksternal.',
    architectureLayers: [
      {
        name: 'Semantic DOM & Presentation',
        role: 'Tata Letak & Tipografi Responsif',
        technologies: ['HTML5 Semantic Elements', 'CSS3 Custom Properties', 'Flexbox & Grid'],
        description: 'Menyajikan struktur dokumen web yang aksesibel dan mudah dibaca oleh pembelajar pemula.',
        components: ['NavigationSidebar', 'LessonContentReader', 'CodeSnippetBlock', 'QuizContainer'],
      },
      {
        name: 'Interactive JavaScript Engine',
        role: 'Logika Pembelajaran & Interaksi Kuis',
        technologies: ['Vanilla JavaScript ES6', 'DOM Event Delegation', 'Web Storage'],
        description: 'Menangani navigasi modul tanpa reload halaman, evaluasi jawaban kuis interaktif, dan penyimpanan progres belajar.',
        components: ['CourseRouter', 'InteractiveCodeRunner', 'QuizEvaluator', 'ProgressTracker'],
      },
      {
        name: 'Data Content Repository',
        role: 'Struktur Modul & Bank Soal',
        technologies: ['Structured JSON Modules', 'Markdown Syntax Parser'],
        description: 'Menyimpan silabus materi pemrograman dan soal kuis dalam format objek terstruktur yang ringan.',
        components: ['HTML5BasicsModule', 'CSS3LayoutModule', 'JSFundamentalsModule', 'QuizBankData'],
      },
    ],
    erdSchema: [
      {
        name: 'silabus_modul',
        desc: 'Daftar topik pembelajaran pemrograman web yang tersedia.',
        columns: [
          { name: 'id', type: 'INT', isPk: true, desc: 'ID modul silabus' },
          { name: 'slug', type: 'VARCHAR(50)', desc: 'Slug URL topik belajar' },
          { name: 'judul_modul', type: 'VARCHAR(100)', desc: 'Nama materi (contoh: Dasar Semantic HTML)' },
          { name: 'tingkat_kesulitan', type: 'ENUM', desc: 'Pemula, Menengah, Mahir' },
          { name: 'estimasi_menit', type: 'INT', desc: 'Estimasi waktu membaca (menit)' },
        ],
      },
      {
        name: 'materi_bab',
        desc: 'Sub-bab uraian materi penjelasan dan contoh potongan kode program.',
        columns: [
          { name: 'id', type: 'INT', isPk: true, desc: 'ID bab materi' },
          { name: 'modul_id', type: 'INT', isFk: true, desc: 'Foreign key ke silabus_modul.id' },
          { name: 'nomor_urut', type: 'TINYINT', desc: 'Urutan bab dalam modul' },
          { name: 'judul_bab', type: 'VARCHAR(100)', desc: 'Sub-topik pembahasan' },
          { name: 'contoh_kode', type: 'TEXT', desc: 'Snippet kode siap salin' },
        ],
      },
      {
        name: 'kuis_evaluasi',
        desc: 'Bank soal kuis mini di akhir setiap modul untuk evaluasi pemahaman.',
        columns: [
          { name: 'id', type: 'INT', isPk: true, desc: 'ID soal kuis' },
          { name: 'modul_id', type: 'INT', isFk: true, desc: 'Foreign key ke silabus_modul.id' },
          { name: 'pertanyaan', type: 'TEXT', desc: 'Kalimat soal kuis pemahaman' },
          { name: 'kunci_jawaban', type: 'CHAR(1)', desc: 'Opsi jawaban benar (A, B, C, D)' },
        ],
      },
    ],
    mockupScreens: [
      {
        id: 'workspace-belajar',
        title: 'Workspace Belajar & Code Runner Interaktif',
        route: 'codelearn.dev/modul/javascript-dasar',
        category: 'Learning Workspace',
        description:
          'Lingkungan belajar terintegrasi dengan panel silabus materi di sisi kiri, area penjelasan teori yang rapi, dan editor kode mini untuk menguji contoh sintaks secara langsung.',
        highlights: [
          'Dua panel kerja: Materi penjelasan di kiri dan playground kode di kanan',
          'Sintaks kode disorot rapi (syntax highlighting) untuk memudahkan pembelajar',
          'Hasil eksekusi kode tampil instan di panel konsol simulasi',
        ],
        metrics: [
          { label: 'Waktu Muat Halaman', value: '< 0.3 Detik' },
          { label: 'Dependencies', value: '0 Eksternal (Pure Vanilla)' },
          { label: 'Responsif', value: 'Mobile & Desktop' },
          { label: 'Aksesibilitas', value: '100% Standar Web' },
        ],
        keyFeatures: ['Interactive Split View', 'Code Syntax Highlighter', 'Instant Console Output', 'Module Syllabus Nav'],
      },
      {
        id: 'kuis-progress',
        title: 'Evaluasi Kuis Mini & Pelacak Kemajuan Belajar',
        route: 'codelearn.dev/evaluasi/kuis-html',
        category: 'Quiz & Progress Tracker',
        description:
          'Modul pengujian pemahaman dengan umpan balik jawaban langsung, skor persentase kelulusan, dan indikator persentase silabus materi yang telah diselesaikan.',
        highlights: [
          'Umpan balik instan ketika memilih opsi jawaban benar atau salah',
          'Penjelasan detail mengapa suatu sintaks kode dinyatakan valid',
          'Penyimpanan otomatis progres materi yang telah dibaca pada browser pengguna',
        ],
        metrics: [
          { label: 'Bank Soal', value: 'Pilihan Ganda' },
          { label: 'Feedback Jawaban', value: 'Seketika' },
          { label: 'Penyimpanan Progres', value: 'LocalStorage' },
          { label: 'Badge Kelulusan', value: 'Skor >= 80%' },
        ],
        keyFeatures: ['Instant Feedback Quiz', 'Detailed Explanations', 'Progress Percentage Bar', 'Certificate of Completion'],
      },
    ],
  },
];

