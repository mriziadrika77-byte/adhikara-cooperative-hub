/**
 * ADHIKARA Mock Data Foundation (Phase 1 + Phase 2 + Phase 3 Cooperative Discovery Hub)
 * Data tiruan terstruktur lengkap dalam Bahasa Indonesia untuk simulasi prototipe.
 */

export const currentUser = {
  id: 'usr_001',
  name: 'Budi Santoso',
  initials: 'BS',
  role: 'Anggota Aktif',
  cooperative: 'Koperasi Agro Mandiri Sejahtera',
  membershipId: 'AMS-2024-0089',
  joinDate: '15 Maret 2024',
  memberType: 'Anggota Biasa (Produsen)',
  avatarUrl: null
};

// ==========================================
// PHASE 3: COOPERATIVE DISCOVERY HUB DATASET
// ==========================================

export const initialCooperativesDirectory = [
  {
    id: 'coop_1',
    name: 'Koperasi Agro Mandiri Sejahtera (KAMS)',
    legalNumber: 'AHU-0004521.AH.01.26.TAHUN 2021',
    category: 'Koperasi Produsen',
    businessSector: 'Agribisnis & Pascapanen',
    province: 'Jawa Timur',
    city: 'Malang',
    address: 'Jl. Raya Agropolitan No. 45, Pujon, Kab. Malang',
    foundedYear: 2021,
    totalMembers: 342,
    rating: 4.9,
    acceptanceStatus: 'Menerima Anggota Baru',
    shortDescription: 'Sentra agribisnis petani modern dengan fasilitas cold-storage terpadu dan akses kemitraan ritel premium.',
    bannerTag: 'Koperasi Unggulan 2025',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=800&q=80',
    membershipRequirements: [
      'Warga Negara Indonesia berdomisili atau memiliki lahan usaha di Jawa Timur.',
      'Petani, pekebun hortikultura, atau pengolah produk pangan lokal.',
      'Membayar Simpanan Pokok Rp 1.000.000 (sekali di awal).',
      'Membayar Simpanan Wajib Rp 100.000/bulan.',
      'Berkomitmen memasok hasil panen terstandarisasi mutu minimal 50% ke koperasi.'
    ],
    memberBenefits: [
      'Kepastian serapan pasar dengan kontrak kemitraan horeka dan supermarket modern.',
      'Akses pupuk organik dan benih bersertifikat dengan harga grosir langsung dari produsen.',
      'Fasilitas gudang berpendingin (cold storage) untuk menjaga mutu panen.',
      'Bagian Sisa Hasil Usaha (SHU) berdasarkan transaksi dan simpanan modal.'
    ],
    financialHighlight: {
      assets: 'Rp 4,85 Miliar',
      annualTurnover: 'Rp 6,42 Miliar',
      shuDistributed: 'Rp 620 Juta'
    }
  },
  {
    id: 'coop_2',
    name: 'KSP Mitra Usaha Bersama',
    legalNumber: 'AHU-0012984.AH.01.26.TAHUN 2018',
    category: 'Koperasi Simpan Pinjam',
    businessSector: 'Keuangan Mikro & Modal Kerja UMKM',
    province: 'Jawa Barat',
    city: 'Bandung',
    address: 'Jl. Buah Batu No. 112, Kota Bandung',
    foundedYear: 2018,
    totalMembers: 1250,
    rating: 4.8,
    acceptanceStatus: 'Menerima Anggota Baru',
    shortDescription: 'Layanan pembiayaan modal kerja syariah dan tabungan gotong royong bagi pegiat UMKM kreatif Jawa Barat.',
    bannerTag: 'Tersertifikasi Digital',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    membershipRequirements: [
      'Pemilik usaha mikro, kecil, atau menengah (UMKM) dengan legalitas usaha NIB aktif.',
      'Fotokopi KTP & KK domisili Jawa Barat.',
      'Membayar Simpanan Pokok Rp 500.000.',
      'Membayar Simpanan Wajib Rp 50.000/bulan.',
      'Mengikuti sosialisasi prinsip kehati-hatian koperasi simpan pinjam.'
    ],
    memberBenefits: [
      'Akses pembiayaan modal kerja bunga rendah dan bebas biaya administrasi tersembunyi.',
      'Program tabungan qurban dan pendidikan anak dengan bagi hasil berkeadilan.',
      'Pendampingan tata kelola keuangan digital dan pencatatan buku kas berkala.',
      'Perlindungan dana anggota melalui tata kelola audit pengawas independen.'
    ],
    financialHighlight: {
      assets: 'Rp 12,2 Miliar',
      annualTurnover: 'Rp 15,8 Miliar',
      shuDistributed: 'Rp 1,15 Miliar'
    }
  },
  {
    id: 'coop_3',
    name: 'Koperasi Konsumen Sejahtera Berdikari',
    legalNumber: 'AHU-0008712.AH.01.26.TAHUN 2020',
    category: 'Koperasi Konsumen',
    businessSector: 'Ritel Sembako & Kebutuhan Rumah Tangga',
    province: 'DKI Jakarta',
    city: 'Jakarta Selatan',
    address: 'Jl. Fatmawati Raya Kav. 88, Cilandak, Jakarta Selatan',
    foundedYear: 2020,
    totalMembers: 890,
    rating: 4.7,
    acceptanceStatus: 'Menerima Anggota Baru',
    shortDescription: 'Jaringan toserba komunitas gotong royong yang memotong rantai pasok sembako langsung dari produsen ke keluarga.',
    bannerTag: 'Harga Adil Komunitas',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    membershipRequirements: [
      'Masyarakat umum atau pekerja berdomisili di wilayah Jabodetabek.',
      'Membayar Simpanan Pokok Rp 250.000.',
      'Membayar Simpanan Wajib Rp 25.000/bulan.',
      'Memiliki komitmen berbelanja kebutuhan pokok rutin bulanan di gerai koperasi.'
    ],
    memberBenefits: [
      'Harga bahan pokok 5-10% lebih hemat dibandingkan jaringan supermarket swasta.',
      'Cashback poin belanja yang dikonversikan menjadi tambahan simpanan sukarela.',
      'Pemesanan sembako melalui aplikasi daring dengan fasilitas antar gratis.',
      'Hak suara pada RAT dalam menentukan ekspansi gerai baru.'
    ],
    financialHighlight: {
      assets: 'Rp 3,4 Miliar',
      annualTurnover: 'Rp 8,1 Miliar',
      shuDistributed: 'Rp 410 Juta'
    }
  },
  {
    id: 'coop_4',
    name: 'Koperasi Jasa Kreatif Nusantara',
    legalNumber: 'AHU-0034211.AH.01.26.TAHUN 2022',
    category: 'Koperasi Jasa',
    businessSector: 'Teknologi Informasi, Desain & Media Digital',
    province: 'DI Yogyakarta',
    city: 'Sleman',
    address: 'Jl. Kaliurang KM 9, Sinduharjo, Ngaglik, Sleman',
    foundedYear: 2022,
    totalMembers: 215,
    rating: 4.9,
    acceptanceStatus: 'Seleksi Terbatas',
    shortDescription: 'Kolektif profesional pekerja lepas (freelancer), developer, dan desainer untuk proyek skala nasional dan ekspor.',
    bannerTag: 'Kolektif Digital Kreatif',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    membershipRequirements: [
      'Pekerja profesional di bidang TI, desain grafis, animasi, riset data, atau penulisan.',
      'Menyertakan portofolio karya profesional atau rekam jejak proyek.',
      'Membayar Simpanan Pokok Rp 1.500.000.',
      'Membayar Simpanan Wajib Rp 150.000/bulan.',
      'Bersedia mematuhi kode etik pengerjaan proyek kolektif.'
    ],
    memberBenefits: [
      'Akses legalitas korporasi resmi untuk memenangkan tender B2B skala besar & ekspor.',
      'Ruang kerja bersama (co-working space) dan studio rekaman podcast gratis.',
      'Asuransi kesehatan kolektif premi hemat khusus pekerja kreatif lepas.',
      'Dana talangan tagihan invoice klien (invoice financing) dengan bunga minim.'
    ],
    financialHighlight: {
      assets: 'Rp 2,1 Miliar',
      annualTurnover: 'Rp 5,2 Miliar',
      shuDistributed: 'Rp 580 Juta'
    }
  },
  {
    id: 'coop_5',
    name: 'Koperasi Nelayan Bahari Nusantara',
    legalNumber: 'AHU-0002155.AH.01.26.TAHUN 2019',
    category: 'Koperasi Produsen',
    businessSector: 'Perikanan Tangkap & Budidaya Laut',
    province: 'Bali',
    city: 'Denpasar',
    address: 'Jl. Pelabuhan Benoa No. 12, Denpasar Selatan',
    foundedYear: 2019,
    totalMembers: 460,
    rating: 4.6,
    acceptanceStatus: 'Menerima Anggota Baru',
    shortDescription: 'Pemberdayaan nelayan tangkap pesisir dengan pabrik es balok mandiri dan ekspor komoditas tuna segar ramah lingkungan.',
    bannerTag: 'Perikanan Berkelanjutan',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    membershipRequirements: [
      'Nelayan tangkap pemilik perahu atau anak buah kapal (ABK) aktif.',
      'Membayar Simpanan Pokok Rp 500.000.',
      'Membayar Simpanan Wajib Rp 50.000/bulan.',
      'Menjaga komitmen penangkapan ikan ramah lingkungan tanpa cantrang/bom laut.'
    ],
    memberBenefits: [
      'Subsidi solar nelayan dan kepastian pasokan es balok untuk armada laut.',
      'Perlindungan asuransi keselamatan jiwa saat melaut.',
      'Harga beli lelang ikan transparan tanpa potongan tengkulak dermaga.',
      'Pembagian SHU berdasar tonase ikan yang dilelang melalui koperasi.'
    ],
    financialHighlight: {
      assets: 'Rp 6,7 Miliar',
      annualTurnover: 'Rp 11,4 Miliar',
      shuDistributed: 'Rp 930 Juta'
    }
  },
  {
    id: 'coop_6',
    name: 'Koperasi Pemasaran Kopi Gayo Mandiri',
    legalNumber: 'AHU-0005432.AH.01.26.TAHUN 2017',
    category: 'Koperasi Pemasaran',
    businessSector: 'Komoditas Kopi Arabika Spesialti & Ekspor',
    province: 'Aceh',
    city: 'Aceh Tengah',
    address: 'Jl. Sengeda No. 24, Takengon, Aceh Tengah',
    foundedYear: 2017,
    totalMembers: 520,
    rating: 4.9,
    acceptanceStatus: 'Pendaftaran Ditutup Sementara',
    shortDescription: 'Konsorsium petani kopi arabika organik dataran tinggi Gayo bersertifikasi Fairtrade dan ekspor ke 8 negara.',
    bannerTag: 'Sertifikasi Fairtrade',
    imageUrl: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=800&q=80',
    membershipRequirements: [
      'Petani pemilik kebun kopi arabika di kawasan dataran tinggi Gayo.',
      'Memiliki sertifikasi budidaya organik atau bersedia mengikuti pendampingan ICS.',
      'Membayar Simpanan Pokok Rp 2.000.000.',
      'Membayar Simpanan Wajib Rp 100.000/bulan.'
    ],
    memberBenefits: [
      'Akses pasar ekspor langsung ke roastery di Amerika, Eropa, dan Jepang.',
      'Premi Fairtrade tahunan yang dibagikan kembali untuk pembangunan desa.',
      'Bantuan bibit kopi tahan iklim dan pupuk kompos bersubsidi.',
      'Pelatihan cupping dan pascapanen proses honey/natural berskala internasional.'
    ],
    financialHighlight: {
      assets: 'Rp 14,8 Miliar',
      annualTurnover: 'Rp 22,5 Miliar',
      shuDistributed: 'Rp 2,4 Miliar'
    }
  }
];

export const initialMyApplications = [
  {
    id: 'app_1001',
    cooperativeId: 'coop_1',
    cooperativeName: 'Koperasi Agro Mandiri Sejahtera (KAMS)',
    applicantName: 'Budi Santoso',
    memberTypeChosen: 'Anggota Biasa (Produsen)',
    submittedDate: '15 Maret 2024',
    status: 'Diterima & Aktif',
    statusNote: 'Pendaftaran telah disahkan pada RAT 2024. ID Anggota resmi: AMS-2024-0089.',
    simpananPokokPaid: true,
    stepIndex: 4 // 1: Terkirim, 2: Seleksi Berkas, 3: Wawancara/Sosialisasi, 4: Disahkan
  },
  {
    id: 'app_1002',
    cooperativeId: 'coop_3',
    cooperativeName: 'Koperasi Konsumen Sejahtera Berdikari',
    applicantName: 'Budi Santoso',
    memberTypeChosen: 'Anggota Konsumen',
    submittedDate: '26 Oktober 2026',
    status: 'Sedang Diverifikasi',
    statusNote: 'Berkas identitas dan permohonan sedang ditinjau oleh staf administrasi keanggotaan.',
    simpananPokokPaid: false,
    stepIndex: 2
  }
];

// ==========================================
// PHASE 2 & 1 COMPONENT DATA (PRESERVED)
// ==========================================

export const cooperativeProfile = {
  name: 'Koperasi Agro Mandiri Sejahtera (KAMS)',
  legalNumber: 'AHU-0004521.AH.01.26.TAHUN 2021',
  foundedYear: '2021',
  address: 'Jl. Raya Agropolitan No. 45, Malang, Jawa Timur',
  totalMembers: 342,
  coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=1200&q=80',
  vision: 'Menjadi sentra koperasi agribisnis terkemuka yang berdaya saing, berkeadilan sosial, dan berkelanjutan secara digital.',
  mission: [
    'Meningkatkan produktivitas hasil tani anggota melalui teknologi budidaya dan cold-chain modern.',
    'Menyediakan kepastian pasar dengan memangkas rantai pasok ke jaringan ritel dan industri pangan.',
    'Menerapkan transparansi tata kelola usaha berbasis digital secara partisipatif dan akuntabel.',
    'Memberikan nilai tambah ekonomi serta dividen SHU yang adil sesuai kontribusi partisipasi anggota.'
  ],
  businessUnits: [
    {
      id: 'bu_1',
      name: 'Unit Sarana Produksi Pertanian (Saprodi)',
      description: 'Penyediaan pupuk organik terverifikasi, benih unggul bersertifikat, dan alat mesin tani.',
      manager: 'Ahmad Fauzi',
      revenueContribution: '35%',
      status: 'Beroperasi Aktif',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'bu_2',
      name: 'Unit Pengolahan & Pasca Panen',
      description: 'Sortir hasil tani, standardisasi mutu, pengemasan ramah lingkungan, dan penyimpanan berpendingin.',
      manager: 'Dewi Lestari',
      revenueContribution: '45%',
      status: 'Beroperasi Aktif',
      imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'bu_3',
      name: 'Unit Distribusi & Kemitraan Ritel',
      description: 'Pengiriman langsung ke hotel, restoran, kafe (Horeka), dan supermarket mitra regional.',
      manager: 'Bambang Irawan',
      revenueContribution: '20%',
      status: 'Tahap Ekspansi',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
    }
  ],
  priorities: [
    {
      title: 'Pembangunan Cold Storage Tenaga Surya',
      target: 'Kuartal IV 2026',
      progress: 65,
      impact: 'Mengurangi susut hasil panen dari 18% menjadi di bawah 4%.'
    },
    {
      title: 'Digitalisasi Jejak Pasok (Traceability QR)',
      target: 'Kuartal III 2026',
      progress: 80,
      impact: 'Meningkatkan kepatuhan audit sertifikasi organik dan harga jual.'
    },
    {
      title: 'Kemitraan 50 Pasar Ritel Modern',
      target: 'Kuartal IV 2026',
      progress: 50,
      impact: 'Menjamin serapan hasil panen rutin 20 ton per minggu.'
    }
  ],
  financialSummary: {
    period: 'Tahun Buku 2025 (Audit Rapat Anggota Tahunan)',
    totalAsset: 'Rp 4.850.000.000',
    totalRevenue: 'Rp 6.420.000.000',
    netProfitSHU: 'Rp 620.000.000',
    reserveFund: 'Rp 186.000.000',
    validationDate: '10 Februari 2026 (Disahkan RAT)',
    auditStatus: 'Wajar Tanpa Pengecualian (KAP Supardi & Rekan)'
  }
};

export const memberParticipationData = {
  profile: {
    membershipId: 'AMS-2024-0089',
    memberName: 'Budi Santoso',
    unitAffiliation: 'Unit Holtikultura Sayur Daun',
    status: 'Anggota Aktif Berhak Suara',
    validUntil: 'Seumur Hidup (Sesuai AD/ART)'
  },
  rightsAndDuties: {
    rights: [
      'Menghadiri, menyatakan pendapat, dan memberikan satu suara dalam Rapat Anggota Tahunan (RAT).',
      'Memilih dan/atau dipilih menjadi Pengurus atau Pengawas Koperasi.',
      'Memanfaatkan layanan sarana produksi, pengolahan, dan jaringan pemasaran koperasi.',
      'Mendapatkan bagian Sisa Hasil Usaha (SHU) sebanding dengan besarnya jasa usaha dan simpanan modal.',
      'Mendapatkan transparansi laporan neraca dan perkembangan usaha berkala melalui platform ADHIKARA.'
    ],
    duties: [
      'Mematuhi Anggaran Dasar, Anggaran Rumah Tangga, dan keputusan Rapat Anggota.',
      'Membayar simpanan pokok dan simpanan wajib tepat waktu sesuai kesepakatan.',
      'Berpartisipasi aktif dalam kegiatan usaha koperasi (menjual hasil tani ke koperasi).',
      'Memelihara serta menjaga nama baik, integritas, dan kebersamaan koperasi.'
    ]
  },
  savings: [
    {
      type: 'Simpanan Pokok',
      amount: 'Rp 1.000.000',
      description: 'Dibayar sekali saat awal pendaftaran keanggotaan (tidak dapat ditarik selama masih menjadi anggota).'
    },
    {
      type: 'Simpanan Wajib',
      amount: 'Rp 2.400.000',
      description: 'Akumulasi iuran rutin Rp 100.000/bulan selama 24 bulan masa keanggotaan aktif.'
    },
    {
      type: 'Simpanan Sukarela',
      amount: 'Rp 5.500.000',
      description: 'Tabungan partisipasi modal kerja tambahan dengan jasa simpanan berkeadilan.'
    }
  ],
  shuHistory: [
    {
      year: '2025',
      totalEarned: 'Rp 3.850.000',
      jasaModal: 'Rp 1.150.000',
      jasaUsaha: 'Rp 2.700.000',
      description: 'Kalkulasi berdasar volume serapan panen 14,2 ton dan simpanan aktif.',
      status: 'Telah Ditransfer (Rekening BNI Anggota)'
    },
    {
      year: '2024',
      totalEarned: 'Rp 1.950.000',
      jasaModal: 'Rp 650.000',
      jasaUsaha: 'Rp 1.300.000',
      description: 'Kalkulasi berdasar 9 bulan masa keaktifan sejak bergabung Maret 2024.',
      status: 'Telah Ditransfer'
    }
  ],
  shuDisclaimer: 'Catatan Penting: SHU bukan dividen bunga saham konvensional. Besaran SHU dihitung dari laba bersih koperasi setelah disisihkan untuk dana cadangan, dana pendidikan, dan sosial, lalu dibagikan berdasarkan proporsi partisipasi transaksi riil (jasa usaha) serta simpanan modal anggota sesuai UU No. 25 Tahun 1992 dan AD/ART koperasi.'
};

export const initialIdeas = [
  {
    id: 'idea_1',
    title: 'Penerapan Cold Storage Tenaga Surya di Titik Kumpul Kelompok Tani',
    category: 'Pengembangan Bisnis',
    status: 'Disetujui untuk Perencanaan',
    author: 'Siti Rahma',
    authorRole: 'Petani Cabai & Sayur',
    createdAt: '24 Oktober 2026',
    problem: 'Suhu siang hari yang tinggi di gudang transit menyebabkan sayuran hijau cepat layu sebelum armada jemputan koperasi tiba, memicu susut kualitas hingga 15%.',
    solution: 'Membangun mini cold storage berdaya panel surya hibrida kapasitas 3 ton di titik kumpul kelompok tani timur agar kesegaran sayuran terjaga 48 jam.',
    followUpNote: 'Diterima dalam Rapat Pengurus 26 Oktober. Dialokasikan sebagai proyek kolaborasi percontohan di Kuartal IV.',
    votes: 42,
    hasVoted: false,
    comments: [
      {
        id: 'c_1',
        author: 'Bambang Irawan',
        time: '25 Oktober 2026',
        text: 'Sangat setuju, ini langsung meningkatkan masa simpan brokoli dan sawi saat cuaca panas.'
      },
      {
        id: 'c_2',
        author: 'Budi Santoso',
        time: '26 Oktober 2026',
        text: 'Kelompok tani kami siap menyediakan lahan hibah seluas 30m2 untuk lokasi panel suryanya.'
      }
    ]
  },
  {
    id: 'idea_2',
    title: 'Standarisasi Kemasan Kompos Ramah Lingkungan Berbahan Serat Singkong',
    category: 'Sosial dan Lingkungan',
    status: 'Sedang Ditinjau',
    author: 'Andi Wijaya',
    authorRole: 'Unit Pengolahan',
    createdAt: '27 Oktober 2026',
    problem: 'Penggunaan kantong plastik konvensional untuk produk pupuk dan sayuran organik bertolak belakang dengan prinsip ramah lingkungan dan mulai dikeluhkan pelanggan supermarket.',
    solution: 'Bekerja sama dengan produsen bioplastik lokal untuk beralih ke karung dan kantong bio-kompos berbahan dasar tapioka lokal.',
    followUpNote: 'Sedang dalam pengujian ketahanan beban oleh tim QC unit pengemasan.',
    votes: 28,
    hasVoted: false,
    comments: [
      {
        id: 'c_3',
        author: 'Dewi Lestari',
        time: '28 Oktober 2026',
        text: 'Perlu dicek ketahanan airnya saat hujan pengiriman.'
      }
    ]
  },
  {
    id: 'idea_3',
    title: 'Pelatihan Pencatatan Keuangan Digital Sederhana untuk Petani Anggota',
    category: 'Pelayanan Anggota',
    status: 'Sedang Berjalan',
    author: 'Rina Kartika',
    authorRole: 'Fasilitator Pemuda Tani',
    createdAt: '12 Oktober 2026',
    problem: 'Banyak anggota yang belum memisahkan pengeluaran rumah tangga dengan biaya sarana produksi tani, sehingga evaluasi margin panen kerap rancu.',
    solution: 'Mengadakan lokakarya mingguan gratis penggunaan aplikasi pembukuan seluler yang terintegrasi langsung dengan platform ADHIKARA.',
    followUpNote: 'Angkatan ke-1 telah selesai diikuti 35 peserta, angkatan ke-2 dimulai bulan depan.',
    votes: 56,
    hasVoted: true,
    comments: [
      {
        id: 'c_4',
        author: 'Budi Santoso',
        time: '15 Oktober 2026',
        text: 'Sangat bermanfaat, sekarang catatan nota pupuk dan bibit langsung rapi.'
      }
    ]
  },
  {
    id: 'idea_4',
    title: 'Layanan Pengantaran Pupuk Terjadwal Langsung ke Lahan Anggota',
    category: 'Efisiensi Operasional',
    status: 'Diajukan',
    author: 'Kusuma Wardani',
    authorRole: 'Anggota Petani Padi',
    createdAt: '28 Oktober 2026',
    problem: 'Antrean pengambilan pupuk subsidi/organik di gudang pusat memakan waktu seharian penuh bagi anggota yang lahannya jauh.',
    solution: 'Koperasi membuat rute jadwal drop-off mingguan per desa menggunakan armada pick-up koperasi.',
    followUpNote: 'Menunggu peninjauan jadwal rute oleh koordinator logistik.',
    votes: 19,
    hasVoted: false,
    comments: []
  }
];

export const initialProjects = [
  {
    id: 'proj_1',
    title: 'Instalasi Smart Cold Storage Tenaga Surya (Fase 1)',
    description: 'Pembangunan ruang pendingin sayuran berkapasitas 3 ton berdaya panel surya di Desa Sumberrejo untuk memperpanjang daya tahan hasil panen petani mitra.',
    objective: 'Mengurangi susut bobot & kebusukan sayuran hortikultura anggota sebelum dipasarkan ke ritel modern.',
    problemTarget: 'Kehilangan hasil pascapanen mencapai 15% pada musim panas akibat ketiadaan fasilitas pendingin terdekat.',
    skillsNeeded: ['Teknisi Listrik/Panel Surya', 'Operator Gudang Pendingin', 'Logistik Pascapanen', 'Pengawas Proyek Lapangan'],
    lead: 'Ahmad Fauzi (Manajer Saprodi & Fasilitas)',
    period: 'Oktober 2026 – Januari 2027',
    deadline: '15 Januari 2027',
    capacity: '4 dari 6 relawan anggota terisi',
    status: 'Pendaftaran Dibuka',
    progress: 45,
    joined: false,
    milestones: [
      { name: 'Penyusunan RAB dan Survei Kelayakan Lokasi', status: 'Selesai', date: '5 Okt 2026' },
      { name: 'Pengadaan Modul Surya & Ruang Insulasi Suhu', status: 'Sedang Berjalan', date: '10 Nov 2026' },
      { name: 'Perakitan & Uji Coba Temperatur Pendingin', status: 'Belum Mulai', date: '20 Des 2026' },
      { name: 'Pelatihan Operator & Serah Terima Penggunaan', status: 'Belum Mulai', date: '15 Jan 2027' }
    ]
  },
  {
    id: 'proj_2',
    title: 'Pengembangan Kemasan Bio-Kompos Ramah Lingkungan',
    description: 'Uji coba penggantian kemasan plastik pembungkus sayur hidroponik dengan bahan bio-selulosa serat singkong lokal.',
    objective: 'Memenuhi standar sertifikasi rantai pasok hijau dan menjangkau konsumen supermarket premium.',
    problemTarget: 'Tuntutan 12 jaringan supermarket mitra yang mewajibkan pengurangan plastik sekali pakai per 2027.',
    skillsNeeded: ['Riset Kemasan Pangan', 'Desain Grafis / Kemasan', 'Uji Mutu Laboratorium', 'Pemasaran Produk Hijau'],
    lead: 'Dewi Lestari (Kepala Unit Pengolahan)',
    period: 'Agustus 2026 – Desember 2026',
    deadline: '20 Desember 2026',
    capacity: 'Tim Lengkap (5/5 Anggota)',
    status: 'Sedang Berjalan',
    progress: 75,
    joined: true,
    milestones: [
      { name: 'Seleksi Vendor Bio-Pellet Serat Alami', status: 'Selesai', date: '25 Ags 2026' },
      { name: 'Uji Ketahanan & Oksigenasi Bahan Kemasan', status: 'Selesai', date: '30 Sep 2026' },
      { name: 'Pencetakan Sampel Perdana Berlabel ADHIKARA', status: 'Sedang Berjalan', date: '15 Nov 2026' },
      { name: 'Implementasi Penuh pada 5 Komoditas Unggulan', status: 'Belum Mulai', date: '20 Des 2026' }
    ]
  },
  {
    id: 'proj_3',
    title: 'Peluncuran Kanal Penjualan Koperasi B2B Horeka',
    description: 'Pembentukan gugus tugas pemasaran langsung ke asosiasi perhotelan, restoran, dan katering di kawasan metropolitan.',
    objective: 'Memotong perantara tengkulak dan mengamankan kontrak pasokan bulanan tetap dengan margin adil.',
    problemTarget: 'Fluktuasi harga cabai dan tomat di pasar lelang lokal yang merugikan petani saat panen raya.',
    skillsNeeded: ['Negosiasi Penjualan B2B', 'Manajemen Akun Korporat', 'Penyusunan Kontrak Pengadaan', 'Armada Ekspedisi Dingin'],
    lead: 'Bambang Irawan (Kepala Pemasaran)',
    period: 'November 2026 – Maret 2027',
    deadline: '30 Maret 2027',
    capacity: '2 dari 4 tenaga sales terbuka',
    status: 'Pendaftaran Dibuka',
    progress: 20,
    joined: false,
    milestones: [
      { name: 'Pemetaan 40 Prospek Restoran & Hotel Bintang', status: 'Selesai', date: '15 Okt 2026' },
      { name: 'Penyusunan Paket Katalog & Price List Musiman', status: 'Sedang Berjalan', date: '25 Nov 2026' },
      { name: 'Penandatanganan 10 Kontrak Pasokan Awal', status: 'Belum Mulai', date: '15 Feb 2027' },
      { name: 'Integrasi Pemesanan ke Portal ADHIKARA', status: 'Belum Mulai', date: '30 Mar 2027' }
    ]
  }
];

export const impactMetrics = {
  reportingPeriod: 'Januari – Oktober 2026',
  dataSource: 'Laporan Monitoring Terpadu KAMS & Verifikasi Internal Lapangan',
  summaryCards: [
    {
      title: 'Serapan Panen Anggota',
      measuredValue: '284 Ton',
      targetValue: '350 Ton (Target 2026)',
      percentageAchieved: 81,
      impactType: 'Ekonomi Anggota',
      indicatorNote: 'Kenaikan serapan +26% dibanding periode yang sama tahun lalu.'
    },
    {
      title: 'Peningkatan Pendapatan Rata-rata',
      measuredValue: '+18.4%',
      targetValue: '+20.0%',
      percentageAchieved: 92,
      impactType: 'Kesejahteraan',
      indicatorNote: 'Dibandingkan penjualan ke tengkulak perorangan di luar koperasi.'
    },
    {
      title: 'Pengurangan Susut Pascapanen',
      measuredValue: '7.8%',
      targetValue: 'Target < 6.0%',
      percentageAchieved: 78,
      impactType: 'Efisiensi Usaha',
      indicatorNote: 'Turun signifikan dari baseline awal tahun 2025 yang mencapai 16.5%.'
    },
    {
      title: 'Pengurangan Kemasan Plastik',
      measuredValue: '2.4 Ton',
      targetValue: 'Target 3.0 Ton',
      percentageAchieved: 80,
      impactType: 'Lingkungan',
      indicatorNote: 'Hasil transisi bertahap ke kemasan bio-kompos pada komoditas sayur.'
    }
  ],
  projectImpactDetails: [
    {
      projectName: 'Pengembangan Kemasan Bio-Kompos Ramah Lingkungan',
      status: 'Sedang Berjalan (Tahap Uji Coba)',
      actualAchieved: '2.4 ton plastik sekali pakai berhasil digantikan oleh bahan bio-selulosa singkong pada komoditas selada dan tomat hidroponik.',
      communityBenefit: '12 supermarket mitra memberikan insentif harga beli 5% lebih tinggi berkat sertifikasi kemasan hijau.'
    },
    {
      projectName: 'Instalasi Smart Cold Storage Tenaga Surya (Fase 1)',
      status: 'Persiapan Perakitan (Progres 45%)',
      actualAchieved: 'Survei lokasi tuntas, genset darurat dan panel sel surya 5.000 watt telah tiba di gudang Sumberrejo.',
      communityBenefit: 'Diproyeksikan menyelamatkan potensi pendapatan Rp 45.000.000 per bulan dari risiko sayuran layu.'
    },
    {
      projectName: 'Pelatihan Keuangan Digital Anggota',
      status: 'Telah Menyelesaikan 1 Angkatan',
      actualAchieved: '35 anggota telah mengadopsi pencatatan buku kas digital secara tertib dan mandiri.',
      communityBenefit: '100% peserta berhasil mengajukan pembiayaan saprodi musim tanam tanpa hambatan pembukuan.'
    }
  ]
};

export const overviewStats = [
  {
    id: 'stat_1',
    label: 'Aktivitas Koperasi',
    value: '24',
    change: '+4 bulan ini',
    trend: 'up',
    description: 'Program aktif & pembaruan umum'
  },
  {
    id: 'stat_2',
    label: 'Aspirasi Terbuka',
    value: '18',
    change: '6 dalam diskusi',
    trend: 'neutral',
    description: 'Usulan inisiatif dari anggota'
  },
  {
    id: 'stat_3',
    label: 'Proyek Kolaborasi',
    value: '7',
    change: '2 hampir rampung',
    trend: 'up',
    description: 'Inisiatif usaha antar-unit'
  },
  {
    id: 'stat_4',
    label: 'Partisipasi Anggota',
    value: '84%',
    change: '+12% vs kuartal lalu',
    trend: 'up',
    description: 'Tingkat keterlibatan & voting'
  }
];

export const recentActivities = [
  {
    id: 'act_101',
    category: 'Forum Ide',
    title: 'Usulan Penyimpanan Berpendingin Tenaga Surya',
    author: 'Siti Rahma (Unit Pertanian)',
    timeAgo: '2 jam yang lalu',
    status: 'Sedang Ditinjau',
    statusVariant: 'gold'
  },
  {
    id: 'act_102',
    category: 'Proyek',
    title: 'Pencapaian: Rantai pasok kemasan ramah lingkungan',
    author: 'Tim Logistik Agro Mandiri',
    timeAgo: '5 jam yang lalu',
    status: 'Milestone 2/3',
    statusVariant: 'emerald'
  },
  {
    id: 'act_103',
    category: 'Eksplorasi',
    title: 'Pembaruan Profil Koperasi: KSP Mitra Bersama',
    author: 'Admin Mitra Bersama',
    timeAgo: 'Kemarin',
    status: 'Terverifikasi',
    statusVariant: 'info'
  },
  {
    id: 'act_104',
    category: 'Keanggotaan',
    title: 'Pengajuan kemitraan distribusi ritel diterima',
    author: 'Hendro Kusuma',
    timeAgo: '2 hari yang lalu',
    status: 'Penyaringan',
    statusVariant: 'neutral'
  }
];

export const quickActions = [
  {
    id: 'qa_insight',
    title: 'Jelajahi Wawasan Koperasi',
    description: 'Pelajari transparansi usaha, kesehatan keuangan, dan profil KAMS.',
    targetModule: 'insight',
    badge: 'Transparansi'
  },
  {
    id: 'qa_membership',
    title: 'Cek Nilai Keanggotaan & SHU',
    description: 'Lihat rincian hak, simpanan pokok/wajib, serta riwayat SHU partisipasi Anda.',
    targetModule: 'membership',
    badge: 'Hak Anggota'
  },
  {
    id: 'qa_discovery',
    title: 'Temukan Koperasi Lain',
    description: 'Jelajahi direktori koperasi terverifikasi dan bandingkan syarat keanggotaan.',
    targetModule: 'discovery',
    badge: 'Direktori'
  },
  {
    id: 'qa_applications',
    title: 'Pantau Pengajuan Saya',
    description: 'Cek status verifikasi formulir permohonan keanggotaan Anda.',
    targetModule: 'applications',
    badge: 'Status Pengajuan'
  }
];

export const journeySteps = [
  {
    step: '1',
    name: 'Temukan',
    desc: 'Cari koperasi terpercaya dan pelajari nilai dasarnya.'
  },
  {
    step: '2',
    name: 'Pahami',
    desc: 'Dapatkan wawasan transparan seputar tata kelola & kesehatan usaha.'
  },
  {
    step: '3',
    name: 'Berpartisipasi',
    desc: 'Suarakan aspirasi, ikut voting usulan, dan kawal keputusan bersama.'
  },
  {
    step: '4',
    name: 'Kolaborasi',
    desc: 'Wujudkan proyek bersama untuk kemajuan komunitas berkelanjutan.'
  },
  {
    step: '5',
    name: 'Pantau Dampak',
    desc: 'Ukur hasil nyata bagi sosial, ekonomi, dan kesejahteraan anggota.'
  }
];

export const mockModules = {
  management: {
    id: 'management',
    title: 'Dasbor Manajemen (Management Dashboard)',
    subtitle: 'Pengawasan administratif khusus pengurus koperasi dan pengelola program.',
    plannedPhase: 'Direncanakan untuk Phase 4: Portal Tata Kelola & Pengurus'
  }
};
