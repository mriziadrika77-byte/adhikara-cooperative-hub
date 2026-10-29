import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { PageHeader, SectionHeader, StatusBadge } from '../components/UIComponents';
import { memberParticipationData, currentUser } from '../data/mockData';

export const MembershipValuePage = () => {
  const { profile, rightsAndDuties, savings, shuHistory, shuDisclaimer } = memberParticipationData;

  return (
    <div>
      {/* Pengumuman Simulasi */}
      <div className="demo-banner">
        <Info size={18} className="demo-banner-icon" />
        <div>
          <div className="demo-banner-title">Data Simulasi — Nilai & Partisipasi Keanggotaan</div>
          <div className="demo-banner-desc">
            Informasi partisipasi simpanan dan rincian Sisa Hasil Usaha (SHU) disimulasikan untuk anggota contoh "{currentUser.name}". Hak dan kewajiban mengacu pada prinsip koperasi UU No. 25/1992.
          </div>
        </div>
      </div>

      {/* Header Halaman */}
      <PageHeader
        title="Nilai & Hak Keanggotaan"
        subtitle="Memahami posisi Anda sebagai pemilik sekaligus pengguna layanan koperasi (User-Owner Principle)."
      />

      {/* Kartu Profil Keanggotaan */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', color: '#1f2937', fontWeight: 700, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {currentUser.initials}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-dark-text)' }}>
                  {currentUser.name}
                </h2>
                <StatusBadge label={profile.status} variant="emerald" />
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-subtle-text)', marginTop: '2px' }}>
                No. ID Anggota: <strong>{profile.membershipId}</strong> • Terdaftar sejak: <strong>{currentUser.joinDate}</strong>
              </p>
              <p style={{ fontSize: '12.5px', color: 'var(--color-muted-text)' }}>
                Afiliasi: <strong>{profile.unitAffiliation}</strong> • Status Kepesertaan: <strong>{profile.validUntil}</strong>
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--color-subtle-text)' }}>Total Akumulasi Simpanan</span>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-deep-emerald)' }}>
              Rp 8.900.000
            </div>
            <span style={{ fontSize: '11px', color: '#059669' }}>Simpanan Pokok + Wajib + Sukarela</span>
          </div>
        </div>
      </div>

      {/* Hak & Kewajiban Anggota */}
      <div className="dashboard-grid-2col" style={{ marginBottom: '24px' }}>
        {/* Hak Anggota */}
        <div className="card">
          <SectionHeader
            title="Hak-Hak Anggota Koperasi"
            caption="Kedaulatan anggota sebagai pemilik tertinggi koperasi"
          />
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rightsAndDuties.rights.map((r, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--color-dark-text)', lineHeight: 1.5 }}>
                <CheckCircle2 size={16} color="var(--color-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Kewajiban Anggota */}
        <div className="card">
          <SectionHeader
            title="Kewajiban Anggota Koperasi"
            caption="Tanggung jawab bersama menjaga kesinambungan usaha"
          />
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rightsAndDuties.duties.map((d, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--color-dark-text)', lineHeight: 1.5 }}>
                <ShieldCheck size={16} color="var(--color-deep-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Rincian Simpanan & Partisipasi Finansial */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <SectionHeader
          title="Rincian Simpanan Anggota"
          caption="Kontribusi modal partisipatif sesuai ketentuan Anggaran Dasar koperasi"
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {savings.map((s, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                backgroundColor: 'var(--color-ivory)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-dark-text)' }}>
                  {s.type}
                </span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-emerald)' }}>
                  {s.amount}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-subtle-text)', lineHeight: 1.5 }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Informasi Sisa Hasil Usaha (SHU) */}
      <div className="card">
        <SectionHeader
          title="Riwayat Sisa Hasil Usaha (SHU) Anggota"
          caption="Pembagian dividen sosial-ekonomi berdasarkan jasa usaha & jasa modal riil"
        />

        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-ivory)', borderBottom: '1px solid var(--color-border-card)' }}>
                <th style={{ padding: '10px 12px', color: 'var(--color-subtle-text)', fontWeight: 600 }}>Tahun Buku</th>
                <th style={{ padding: '10px 12px', color: 'var(--color-subtle-text)', fontWeight: 600 }}>Jasa Usaha (Transaksi)</th>
                <th style={{ padding: '10px 12px', color: 'var(--color-subtle-text)', fontWeight: 600 }}>Jasa Modal (Simpanan)</th>
                <th style={{ padding: '10px 12px', color: 'var(--color-subtle-text)', fontWeight: 600 }}>Total Diterima</th>
                <th style={{ padding: '10px 12px', color: 'var(--color-subtle-text)', fontWeight: 600 }}>Dasar Penghitungan</th>
                <th style={{ padding: '10px 12px', color: 'var(--color-subtle-text)', fontWeight: 600 }}>Status Pencairan</th>
              </tr>
            </thead>
            <tbody>
              {shuHistory.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{item.year}</td>
                  <td style={{ padding: '12px', color: 'var(--color-dark-text)' }}>{item.jasaUsaha}</td>
                  <td style={{ padding: '12px', color: 'var(--color-dark-text)' }}>{item.jasaModal}</td>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-deep-emerald)' }}>{item.totalEarned}</td>
                  <td style={{ padding: '12px', color: 'var(--color-subtle-text)', fontSize: '12px' }}>{item.description}</td>
                  <td style={{ padding: '12px' }}>
                    <StatusBadge label={item.status} variant="emerald" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer Aturan Koperasi tentang SHU */}
        <div style={{ padding: '12px 16px', backgroundColor: 'var(--color-gold-light)', border: '1px solid var(--color-gold-border)', borderRadius: 'var(--radius-md)', fontSize: '12px', color: '#92400e', lineHeight: 1.5 }}>
          <strong>Pedoman Prinsip Koperasi:</strong> {shuDisclaimer}
        </div>
      </div>
    </div>
  );
};
