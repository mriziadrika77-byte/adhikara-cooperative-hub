import React from 'react';
import {
  Compass,
  CheckCircle2,
  BadgeCheck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { PageHeader, SectionHeader, StatusBadge } from '../components/UIComponents';
import { cooperativeProfile } from '../data/mockData';

export const CooperativeInsightPage = ({ onNavigate }) => {
  return (
    <div>
      {/* Pengumuman Data Simulasi */}
      <div className="demo-banner">
        <ShieldCheck size={18} className="demo-banner-icon" />
        <div>
          <div className="demo-banner-title">Data Simulasi — Wawasan Bisnis Koperasi</div>
          <div className="demo-banner-desc">
            Informasi di bawah ini disajikan untuk mendemonstrasikan transparansi usaha koperasi bagi anggota. Status audit dan angka kinerja berlabel Data Simulasi.
          </div>
        </div>
      </div>

      {/* Header Halaman */}
      <PageHeader
        title="Wawasan Bisnis Koperasi"
        subtitle="Memahami profil, arah kebijakan usaha, dan transparansi kinerja Koperasi Agro Mandiri Sejahtera."
      />

      {/* Ringkasan Profil Koperasi */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--color-border-card)', paddingBottom: '18px', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-dark-text)' }}>
                {cooperativeProfile.name}
              </h2>
              <StatusBadge label="Badan Hukum Resmi" variant="emerald" />
              <StatusBadge label="Data Simulasi" variant="gold" />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-subtle-text)' }}>
              No. Badan Hukum: <strong>{cooperativeProfile.legalNumber}</strong> • Berdiri sejak tahun {cooperativeProfile.foundedYear}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', marginTop: '4px' }}>
              📍 {cooperativeProfile.address} • Jumlah Anggota Terdaftar: <strong>{cooperativeProfile.totalMembers} orang</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn-primary"
              style={{ fontSize: '13px', padding: '8px 14px' }}
              onClick={() => onNavigate('ideas')}
            >
              Usulkan Ide Bisnis <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Visi & Misi */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: 'var(--color-ivory)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: 'var(--color-deep-emerald)', fontWeight: 600 }}>
              <Compass size={18} />
              <span>Visi Koperasi</span>
            </div>
            <p style={{ fontSize: '13.5px', color: 'var(--color-dark-text)', lineHeight: 1.6 }}>
              "{cooperativeProfile.vision}"
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-ivory)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: 'var(--color-deep-emerald)', fontWeight: 600 }}>
              <CheckCircle2 size={18} />
              <span>Misi Koperasi</span>
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--color-dark-text)', lineHeight: 1.5 }}>
              {cooperativeProfile.mission.map((m, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Grid: Unit Usaha & Kinerja Finansial */}
      <div className="dashboard-grid-2col">
        {/* Unit Usaha & Layanan */}
        <div className="card">
          <SectionHeader
            title="Unit Usaha & Layanan Anggota"
            caption="Lini bisnis riil yang dikelola koperasi bersama anggota"
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {cooperativeProfile.businessUnits.map((bu) => (
              <div
                key={bu.id}
                style={{
                  padding: '14px 16px',
                  backgroundColor: 'var(--color-ivory)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-card)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-dark-text)' }}>
                    {bu.name}
                  </span>
                  <StatusBadge label={bu.status} variant="emerald" />
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--color-subtle-text)', marginBottom: '8px' }}>
                  {bu.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-muted-text)', borderTop: '1px dashed var(--color-border-card)', paddingTop: '6px' }}>
                  <span>Penanggung Jawab: <strong>{bu.manager}</strong></span>
                  <span>Kontribusi Omset: <strong>{bu.revenueContribution}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ringkasan Laporan Finansial & Audit */}
        <div className="card">
          <SectionHeader
            title="Transparansi Finansial"
            caption={`Periode: ${cooperativeProfile.financialSummary.period}`}
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '18px' }}>
            <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--color-subtle-text)' }}>Total Aset Koperasi</span>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark-text)', marginTop: '4px' }}>
                {cooperativeProfile.financialSummary.totalAsset}
              </div>
            </div>
            <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--color-subtle-text)' }}>Total Perputaran Omzet</span>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark-text)', marginTop: '4px' }}>
                {cooperativeProfile.financialSummary.totalRevenue}
              </div>
            </div>
            <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-emerald-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-emerald-border)' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--color-deep-emerald)', fontWeight: 600 }}>SHU Bersih Terbagikan</span>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-emerald)', marginTop: '4px' }}>
                {cooperativeProfile.financialSummary.netProfitSHU}
              </div>
            </div>
            <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--color-subtle-text)' }}>Alokasi Dana Cadangan</span>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark-text)', marginTop: '4px' }}>
                {cooperativeProfile.financialSummary.reserveFund}
              </div>
            </div>
          </div>

          <div style={{ padding: '14px', backgroundColor: '#fcfdfa', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-deep-emerald)', fontWeight: 600, marginBottom: '4px' }}>
              <BadgeCheck size={16} />
              Status Akuntabilitas & Verifikasi
            </div>
            <p style={{ color: 'var(--color-muted-text)', marginBottom: '4px' }}>
              Opini Audit: <strong>{cooperativeProfile.financialSummary.auditStatus}</strong>
            </p>
            <p style={{ color: 'var(--color-subtle-text)' }}>
              Disahkan resmi pada: {cooperativeProfile.financialSummary.validationDate}
            </p>
          </div>
        </div>
      </div>

      {/* Prioritas Pengembangan Bisnis */}
      <div className="card" style={{ marginTop: '24px' }}>
        <SectionHeader
          title="Prioritas & Target Strategis Koperasi"
          caption="Rencana program yang sedang dan akan dijalankan bersama anggota"
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {cooperativeProfile.priorities.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                backgroundColor: 'var(--color-ivory)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-dark-text)' }}>
                  {item.title}
                </span>
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-deep-emerald)', backgroundColor: 'var(--color-emerald-light)', padding: '2px 6px', borderRadius: '4px' }}>
                  {item.target}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-subtle-text)', marginBottom: '12px' }}>
                🎯 Dampak: {item.impact}
              </p>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--color-muted-text)', marginBottom: '4px' }}>
                  <span>Progres Tahapan</span>
                  <span style={{ fontWeight: 600 }}>{item.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.progress}%`, height: '100%', backgroundColor: 'var(--color-emerald)' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
