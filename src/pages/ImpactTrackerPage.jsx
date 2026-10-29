import React from 'react';
import {
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { PageHeader, SectionHeader, StatusBadge } from '../components/UIComponents';
import { impactMetrics } from '../data/mockData';

export const ImpactTrackerPage = () => {
  const { reportingPeriod, dataSource, summaryCards, projectImpactDetails } = impactMetrics;

  return (
    <div>
      {/* Pengumuman Simulasi */}
      <div className="demo-banner">
        <TrendingUp size={18} className="demo-banner-icon" />
        <div>
          <div className="demo-banner-title">Pelacak Dampak Nyata — Data Simulasi</div>
          <div className="demo-banner-desc">
            Mengukur dampak partisipasi anggota dan proyek koperasi secara konkret. Target dan capaian aktual dibedakan secara terperinci untuk menjaga transparansi dan akuntabilitas.
          </div>
        </div>
      </div>

      {/* Header Halaman */}
      <PageHeader
        title="Pelacak Dampak Usaha Koperasi"
        subtitle={`Mengukur hasil riil bagi kesejahteraan anggota, efisiensi bisnis, dan keberlanjutan lingkungan (${reportingPeriod}).`}
      />

      {/* Grid 4 Kartu Metrik Dampak Utama */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        {summaryCards.map((card, idx) => (
          <div key={idx} className="card stat-card">
            <div className="stat-card-top">
              <span className="stat-label">{card.title}</span>
              <StatusBadge label={card.impactType} variant="emerald" />
            </div>

            <div className="stat-value" style={{ color: 'var(--color-deep-emerald)' }}>
              {card.measuredValue}
            </div>

            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--color-subtle-text)', marginBottom: '3px' }}>
                <span>Capaian Terhadap Target</span>
                <span style={{ fontWeight: 600 }}>{card.percentageAchieved}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${card.percentageAchieved}%`, height: '100%', backgroundColor: 'var(--color-emerald)' }}></div>
              </div>
            </div>

            <div style={{ fontSize: '11.5px', color: 'var(--color-subtle-text)', lineHeight: 1.4 }}>
              🎯 {card.targetValue}
              <div style={{ marginTop: '2px', color: 'var(--color-muted-text)' }}>{card.indicatorNote}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Rincian Dampak per Inisiatif Proyek */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <SectionHeader
          title="Rincian Dampak Berdasarkan Inisiatif Proyek"
          caption="Perbedaan jelas antara status pengerjaan, capaian terukur, dan manfaat komunitas"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {projectImpactDetails.map((proj, idx) => (
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
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-dark-text)' }}>
                  {proj.projectName}
                </h4>
                <StatusBadge label={proj.status} variant="emerald" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '10px' }}>
                <div style={{ backgroundColor: 'var(--color-white)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-card)' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-deep-emerald)', marginBottom: '3px' }}>
                    📊 Hasil Aktual yang Telah Diukur:
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-dark-text)', margin: 0, lineHeight: 1.5 }}>
                    {proj.actualAchieved}
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--color-white)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-card)' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#92400e', marginBottom: '3px' }}>
                    🤝 Nilai Tambah bagi Komunitas Anggota:
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-dark-text)', margin: 0, lineHeight: 1.5 }}>
                    {proj.communityBenefit}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catatan Validasi & Akuntabilitas Data */}
      <div style={{ padding: '14px 18px', backgroundColor: 'var(--color-white)', border: '1px solid var(--color-border-card)', borderRadius: 'var(--radius-md)', fontSize: '12.5px', color: 'var(--color-subtle-text)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-deep-emerald)', fontWeight: 600, marginBottom: '4px' }}>
          <FileCheck size={16} />
          <span>Verifikasi dan Sumber Data</span>
        </div>
        <p style={{ margin: 0 }}>
          Sumber: <strong>{dataSource}</strong> • Seluruh data terhimpun diverifikasi berkala oleh Pengawas Koperasi dan dibahas pada Rapat Evaluasi Anggota.
        </p>
      </div>
    </div>
  );
};
