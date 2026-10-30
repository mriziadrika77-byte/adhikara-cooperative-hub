import React, { useState } from 'react';
import {
  Compass,
  Search,
  MapPin,
  CheckCircle2,
  Scale,
  X
} from 'lucide-react';
import { PageHeader, StatusBadge } from '../components/UIComponents';
import { initialCooperativesDirectory, currentUser } from '../data/mockData';

const CATEGORIES = [
  'Semua Jenis',
  'Koperasi Produsen',
  'Koperasi Simpan Pinjam',
  'Koperasi Konsumen',
  'Koperasi Jasa',
  'Koperasi Pemasaran'
];

const PROVINCES = [
  'Semua Lokasi',
  'Jawa Timur',
  'Jawa Barat',
  'DKI Jakarta',
  'DI Yogyakarta',
  'Bali',
  'Aceh'
];

export const CooperativeDiscoveryPage = ({ onNavigate }) => {
  const [cooperatives] = useState(initialCooperativesDirectory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Jenis');
  const [selectedProvince, setSelectedProvince] = useState('Semua Lokasi');
  const [onlyOpenAdmission, setOnlyOpenAdmission] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // rating, members, name

  // Modal Detail Koperasi
  const [activeCoopDetail, setActiveCoopDetail] = useState(null);

  // Komparasi Koperasi (Maks 2)
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Modal Formulir Pendaftaran Keanggotaan
  const [applicationCoop, setApplicationCoop] = useState(null);
  const [applicantRoleChoice, setApplicantRoleChoice] = useState('Anggota Biasa (Produsen/Pengguna)');
  const [applicantAddress, setApplicantAddress] = useState('Jl. Dahlia No. 12, Malang');
  const [applicantNote, setApplicantNote] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitSuccessNotice, setSubmitSuccessNotice] = useState('');

  // Toggle Komparasi
  const toggleCompare = (coop, e) => {
    if (e) e.stopPropagation();
    if (compareList.some((c) => c.id === coop.id)) {
      setCompareList(compareList.filter((c) => c.id !== coop.id));
    } else {
      if (compareList.length >= 2) {
        alert('Anda hanya dapat membandingkan maksimal 2 koperasi secara bersamaan.');
        return;
      }
      setCompareList([...compareList, coop]);
    }
  };

  // Filter dan Sort
  const filteredCooperatives = cooperatives
    .filter((c) => {
      const matchCat = selectedCategory === 'Semua Jenis' || c.category === selectedCategory;
      const matchProv = selectedProvince === 'Semua Lokasi' || c.province === selectedProvince;
      const matchOpen = !onlyOpenAdmission || c.acceptanceStatus === 'Menerima Anggota Baru';
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.businessSector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchProv && matchOpen && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'members') return b.totalMembers - a.totalMembers;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  // Kirim Pengajuan Keanggotaan
  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Anda harus menyetujui komitmen kepatuhan AD/ART dan simpanan koperasi.');
      return;
    }

    const savedApps = JSON.parse(localStorage.getItem('adhikara_my_applications') || '[]');
    const newApp = {
      id: `app_${Date.now()}`,
      cooperativeId: applicationCoop.id,
      cooperativeName: applicationCoop.name,
      applicantName: currentUser.name,
      memberTypeChosen: applicantRoleChoice,
      submittedDate: 'Baru saja',
      status: 'Sedang Diverifikasi',
      statusNote: 'Pengajuan telah diterima oleh sistem ADHIKARA dan sedang ditinjau oleh staf keanggotaan koperasi.',
      simpananPokokPaid: false,
      stepIndex: 2
    };

    localStorage.setItem('adhikara_my_applications', JSON.stringify([newApp, ...savedApps]));
    setSubmitSuccessNotice(`Permohonan keanggotaan pada "${applicationCoop.name}" berhasil dikirim! Silakan pantau perkembangannya di menu "Pengajuan Saya".`);
    setApplicationCoop(null);
    setApplicantNote('');
    setAgreeTerms(false);

    setTimeout(() => {
      setSubmitSuccessNotice('');
    }, 7000);
  };

  return (
    <div>
      {/* Pengumuman Lingkungan Discovery Hub */}
      <div className="demo-banner">
        <Compass size={18} className="demo-banner-icon" />
        <div>
          <div className="demo-banner-title">Direktori Eksplorasi Koperasi — Data Simulasi</div>
          <div className="demo-banner-desc">
            Temukan koperasi berbadan hukum resmi, pahami hak dan persyaratan keanggotaannya, serta bandingkan nilai partisipasi. Pengajuan keanggotaan di bawah ini merupakan alur simulasi pendaftaran digital.
          </div>
        </div>
      </div>

      {submitSuccessNotice && (
        <div style={{ padding: '14px 18px', backgroundColor: 'var(--color-emerald-light)', border: '1px solid var(--color-emerald-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-deep-emerald)', fontSize: '13px', fontWeight: 500, marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} />
            <span>{submitSuccessNotice}</span>
          </div>
          <button
            type="button"
            className="btn-primary"
            style={{ fontSize: '12px', padding: '6px 12px' }}
            onClick={() => onNavigate('applications')}
          >
            Buka Pengajuan Saya →
          </button>
        </div>
      )}

      {/* Header Halaman */}
      <PageHeader
        title="Eksplorasi Koperasi Terpercaya"
        subtitle="Temukan komunitas ekonomi gotong royong yang sesuai dengan bidang usaha, profesi, atau domisili Anda."
        action={
          compareList.length > 0 && (
            <button
              type="button"
              className="btn-primary"
              style={{ backgroundColor: 'var(--color-gold)', color: '#1f2937' }}
              onClick={() => setIsCompareModalOpen(true)}
            >
              <Scale size={16} />
              Bandingkan ({compareList.length}/2 Koperasi)
            </button>
          )
        }
      />

      {/* Bar Pencarian & Filter */}
      <div className="card" style={{ marginBottom: '22px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Kotak Pencarian */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px', backgroundColor: 'var(--color-ivory)', border: '1px solid var(--color-border-card)', padding: '9px 12px', borderRadius: 'var(--radius-md)' }}>
            <Search size={16} color="var(--color-subtle-text)" />
            <input
              type="text"
              placeholder="Cari nama koperasi, komoditas, atau kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-subtle-text)' }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', backgroundColor: 'var(--color-white)', fontSize: '13px' }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', backgroundColor: 'var(--color-white)', fontSize: '13px' }}
            >
              {PROVINCES.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', backgroundColor: 'var(--color-white)', fontSize: '13px' }}
            >
              <option value="rating">Urutkan: Penilaian Tertinggi</option>
              <option value="members">Urutkan: Anggota Terbanyak</option>
              <option value="name">Urutkan: Nama (A-Z)</option>
            </select>

            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--color-dark-text)', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={onlyOpenAdmission}
                onChange={(e) => setOnlyOpenAdmission(e.target.checked)}
              />
              Buka Pendaftaran
            </label>
          </div>
        </div>
      </div>

      {/* Grid Katalog Koperasi */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '22px' }}>
        {filteredCooperatives.map((coop) => {
          const isCompared = compareList.some((c) => c.id === coop.id);
          const isOpen = coop.acceptanceStatus === 'Menerima Anggota Baru';

          return (
            <div
              key={coop.id}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.2s ease', overflow: 'hidden', padding: 0 }}
            >
              <div>
                {/* Gambar Sampul Koperasi */}
                {coop.imageUrl && (
                  <div style={{ position: 'relative', width: '100%', height: '150px', backgroundColor: '#e5e7eb', overflow: 'hidden' }}>
                    <img
                      src={coop.imageUrl}
                      alt={coop.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: '#1f2937', backgroundColor: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(4px)', padding: '3px 8px', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>
                        {coop.bannerTag || coop.category}
                      </span>
                      <span style={{ fontSize: '11px', color: '#92400e', backgroundColor: 'rgba(254, 249, 237, 0.95)', backdropFilter: 'blur(4px)', padding: '3px 8px', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>
                        ★ {coop.rating}
                      </span>
                    </div>
                  </div>
                )}

                <div style={{ padding: '16px 18px 0' }}>
                  {/* Header Card */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <StatusBadge label={coop.category} variant="emerald" />
                    <StatusBadge
                      label={coop.acceptanceStatus}
                      variant={isOpen ? 'emerald' : 'gold'}
                    />
                  </div>

                  <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--color-dark-text)', marginBottom: '4px' }}>
                    {coop.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--color-subtle-text)', marginBottom: '10px' }}>
                    <MapPin size={13} color="var(--color-emerald)" />
                    <span>{coop.city}, {coop.province}</span>
                    <span>•</span>
                    <span>{coop.totalMembers} Anggota</span>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', lineHeight: 1.5, marginBottom: '14px' }}>
                    {coop.shortDescription}
                  </p>

                  {/* Ringkasan Finansial Mini */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', padding: '10px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '11px', textAlign: 'center' }}>
                    <div>
                      <div style={{ color: 'var(--color-subtle-text)' }}>Total Aset</div>
                      <div style={{ fontWeight: 700, color: 'var(--color-dark-text)', marginTop: '2px' }}>{coop.financialHighlight.assets}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-subtle-text)' }}>Omset Tahunan</div>
                      <div style={{ fontWeight: 700, color: 'var(--color-dark-text)', marginTop: '2px' }}>{coop.financialHighlight.annualTurnover}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-deep-emerald)' }}>SHU Terbagi</div>
                      <div style={{ fontWeight: 700, color: 'var(--color-deep-emerald)', marginTop: '2px' }}>{coop.financialHighlight.shuDistributed}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border-card)', padding: '14px 18px', backgroundColor: 'var(--color-white)' }}>
                <button
                  type="button"
                  onClick={() => setActiveCoopDetail(coop)}
                  style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', background: 'transparent', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-dark-text)', cursor: 'pointer' }}
                >
                  Detail & Syarat
                </button>

                <button
                  type="button"
                  onClick={(e) => toggleCompare(coop, e)}
                  title="Bandingkan koperasi ini"
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: isCompared ? '1px solid var(--color-emerald)' : '1px solid var(--color-border-card)',
                    background: isCompared ? 'var(--color-emerald-light)' : 'transparent',
                    color: isCompared ? 'var(--color-deep-emerald)' : 'var(--color-muted-text)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Scale size={14} />
                </button>

                {isOpen && (
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ fontSize: '12.5px', padding: '8px 12px' }}
                    onClick={() => setApplicationCoop(coop)}
                  >
                    Daftar Anggota
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Detail Koperasi & Syarat */}
      {activeCoopDetail && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setActiveCoopDetail(null)}
        >
          <div
            className="card"
            style={{ maxWidth: '680px', width: '100%', maxHeight: '90vh', overflowY: 'auto', overflowX: 'hidden', padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Gambar Modal */}
            {activeCoopDetail.imageUrl && (
              <div style={{ position: 'relative', width: '100%', height: '180px', backgroundColor: '#e5e7eb' }}>
                <img
                  src={activeCoopDetail.imageUrl}
                  alt={activeCoopDetail.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 70%)' }} />
                <button
                  type="button"
                  onClick={() => setActiveCoopDetail(null)}
                  style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ffffff' }}
                >
                  <X size={18} />
                </button>
                <div style={{ position: 'absolute', bottom: '12px', left: '20px', display: 'flex', gap: '8px' }}>
                  <StatusBadge label={activeCoopDetail.category} variant="emerald" />
                  <StatusBadge label={activeCoopDetail.acceptanceStatus} variant="gold" />
                </div>
              </div>
            )}

            <div style={{ padding: '20px 24px' }}>
              {!activeCoopDetail.imageUrl && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--color-border-card)', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <StatusBadge label={activeCoopDetail.category} variant="emerald" />
                    <StatusBadge label={activeCoopDetail.acceptanceStatus} variant="gold" />
                  </div>
                  <button type="button" onClick={() => setActiveCoopDetail(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-subtle-text)' }}>
                    <X size={20} />
                  </button>
                </div>
              )}

              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-dark-text)', marginBottom: '4px' }}>
                {activeCoopDetail.name}
              </h2>
              <p style={{ fontSize: '12.5px', color: 'var(--color-subtle-text)', marginBottom: '16px' }}>
                No. Badan Hukum: <strong>{activeCoopDetail.legalNumber}</strong> • Alamat: {activeCoopDetail.address}
              </p>

              <p style={{ fontSize: '13.5px', color: 'var(--color-muted-text)', lineHeight: 1.6, marginBottom: '20px' }}>
                {activeCoopDetail.shortDescription}
              </p>

            {/* Manfaat Menjadi Anggota */}
            <div style={{ marginBottom: '18px', padding: '14px 16px', backgroundColor: 'var(--color-emerald-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-emerald-border)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-deep-emerald)', marginBottom: '8px' }}>
                🌟 Manfaat & Hak Anggota:
              </div>
              <ul style={{ paddingLeft: '18px', fontSize: '12.5px', color: 'var(--color-deep-emerald)', lineHeight: 1.5 }}>
                {activeCoopDetail.memberBenefits.map((b, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{b}</li>
                ))}
              </ul>
            </div>

            {/* Persyaratan Keanggotaan */}
            <div style={{ marginBottom: '20px', padding: '14px 16px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-dark-text)', marginBottom: '8px' }}>
                📋 Persyaratan & Kewajiban Awal:
              </div>
              <ul style={{ paddingLeft: '18px', fontSize: '12.5px', color: 'var(--color-muted-text)', lineHeight: 1.5 }}>
                {activeCoopDetail.membershipRequirements.map((req, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{req}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--color-border-card)', paddingTop: '12px' }}>
              <button
                type="button"
                onClick={() => setActiveCoopDetail(null)}
                style={{ padding: '8px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', background: 'transparent', fontSize: '13px', cursor: 'pointer' }}
              >
                Tutup
              </button>
              {activeCoopDetail.acceptanceStatus === 'Menerima Anggota Baru' && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setApplicationCoop(activeCoopDetail);
                    setActiveCoopDetail(null);
                  }}
                >
                  Ajukan Permohonan Keanggotaan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )}

      {/* Modal Komparasi Koperasi */}
      {isCompareModalOpen && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setIsCompareModalOpen(false)}
        >
          <div
            className="card"
            style={{ maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--color-border-card)', paddingBottom: '12px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-dark-text)' }}>
                Perbandingan Nilai Keanggotaan Koperasi
              </h2>
              <button type="button" onClick={() => setIsCompareModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-subtle-text)' }}>
                <X size={20} />
              </button>
            </div>

            {compareList.length < 2 ? (
              <p style={{ fontSize: '13px', color: 'var(--color-subtle-text)', textAlign: 'center', padding: '30px 0' }}>
                Pilih 1 koperasi lagi dari direktori untuk mengaktifkan tabel perbandingan berdampingan.
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--color-ivory)', borderBottom: '1px solid var(--color-border-card)' }}>
                      <th style={{ padding: '12px', width: '25%', color: 'var(--color-subtle-text)' }}>Parameter</th>
                      {compareList.map((c) => (
                        <th key={c.id} style={{ padding: '12px', width: '37.5%', fontWeight: 700, color: 'var(--color-deep-emerald)' }}>
                          {c.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>Jenis Koperasi</td>
                      {compareList.map((c) => <td key={c.id} style={{ padding: '10px 12px' }}>{c.category}</td>)}
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>Sektor Bisnis</td>
                      {compareList.map((c) => <td key={c.id} style={{ padding: '10px 12px' }}>{c.businessSector}</td>)}
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>Domisili</td>
                      {compareList.map((c) => <td key={c.id} style={{ padding: '10px 12px' }}>{c.city}, {c.province}</td>)}
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>Jumlah Anggota</td>
                      {compareList.map((c) => <td key={c.id} style={{ padding: '10px 12px' }}>{c.totalMembers} orang</td>)}
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>Omset & SHU Terbagi</td>
                      {compareList.map((c) => (
                        <td key={c.id} style={{ padding: '10px 12px' }}>
                          Omset: {c.financialHighlight.annualTurnover} <br />
                          SHU: <strong style={{ color: 'var(--color-deep-emerald)' }}>{c.financialHighlight.shuDistributed}</strong>
                        </td>
                      ))}
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>Status Pendaftaran</td>
                      {compareList.map((c) => (
                        <td key={c.id} style={{ padding: '10px 12px' }}>
                          <StatusBadge label={c.acceptanceStatus} variant="emerald" />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', borderTop: '1px solid var(--color-border-card)', paddingTop: '12px' }}>
              <button
                type="button"
                onClick={() => setCompareList([])}
                style={{ background: 'none', border: 'none', color: '#b91c1c', fontSize: '12.5px', cursor: 'pointer' }}
              >
                Hapus Semua Pilihan
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setIsCompareModalOpen(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Formulir Permohonan Pendaftaran Keanggotaan */}
      {applicationCoop && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setApplicationCoop(null)}
        >
          <div
            className="card"
            style={{ maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--color-border-card)', paddingBottom: '10px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-dark-text)' }}>
                Formulir Pendaftaran Calon Anggota
              </h2>
              <button type="button" onClick={() => setApplicationCoop(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-subtle-text)' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '10px 14px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', marginBottom: '16px', fontSize: '12.5px' }}>
              Koperasi Tujuan: <strong>{applicationCoop.name}</strong> ({applicationCoop.category})
            </div>

            <form onSubmit={handleApplicationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-dark-text)' }}>
                  Nama Lengkap Pemohon (Sesuai KTP)
                </label>
                <input
                  type="text"
                  value={currentUser.name}
                  disabled
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', backgroundColor: '#f3f4f6', fontSize: '13px', color: 'var(--color-muted-text)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-dark-text)' }}>
                  Jenis Partisipasi Keanggotaan yang Dipilih *
                </label>
                <select
                  value={applicantRoleChoice}
                  onChange={(e) => setApplicantRoleChoice(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', fontSize: '13px' }}
                >
                  <option value="Anggota Biasa (Produsen/Pengguna)">Anggota Biasa (Produsen / Pengguna Utama Layanan)</option>
                  <option value="Anggota Konsumen">Anggota Konsumen (Pelanggan Ritel/Sembako)</option>
                  <option value="Anggota Luar Biasa (Kemitraan)">Anggota Luar Biasa (Mitra Kerja/Pendukung)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-dark-text)' }}>
                  Alamat Domisili / Lokasi Usaha *
                </label>
                <input
                  type="text"
                  value={applicantAddress}
                  onChange={(e) => setApplicantAddress(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-dark-text)' }}>
                  Pernyataan Motivasi / Harapan Bergabung
                </label>
                <textarea
                  rows={3}
                  placeholder="Contoh: Ingin memperluas pemasaran komoditas sayur dan mendapatkan kepastian pasokan pupuk..."
                  value={applicantNote}
                  onChange={(e) => setApplicantNote(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              <div style={{ padding: '12px', backgroundColor: 'var(--color-gold-light)', border: '1px solid var(--color-gold-border)', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: '#92400e', lineHeight: 1.5 }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    style={{ marginTop: '2px' }}
                    required
                  />
                  <span>
                    Saya menyatakan bersedia mematuhi Anggaran Dasar, Anggaran Rumah Tangga (AD/ART), serta ketentuan Simpanan Pokok & Wajib yang ditetapkan oleh Rapat Anggota koperasi.
                  </span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setApplicationCoop(null)}
                  style={{ padding: '9px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', background: 'transparent', fontSize: '13px', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Kirim Permohonan Pendaftaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
