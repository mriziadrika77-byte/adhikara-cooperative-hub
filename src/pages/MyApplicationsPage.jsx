import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { PageHeader, StatusBadge } from '../components/UIComponents';
import { initialMyApplications } from '../data/mockData';

const STEPS = [
  'Permohonan Terkirim',
  'Verifikasi Berkas',
  'Sosialisasi & Validasi',
  'Pengesahan Anggota'
];

export const MyApplicationsPage = ({ onNavigate }) => {
  const [applications] = useState(() => {
    const saved = localStorage.getItem('adhikara_my_applications');
    return saved ? JSON.parse(saved) : initialMyApplications;
  });

  return (
    <div>
      {/* Pengumuman Simulasi */}
      <div className="demo-banner">
        <FileCheck2 size={18} className="demo-banner-icon" />
        <div>
          <div className="demo-banner-title">Pelacakan Status Pengajuan — Data Simulasi</div>
          <div className="demo-banner-desc">
            Pantau tahapan verifikasi formulir keanggotaan koperasi yang telah Anda ajukan melalui direktori ADHIKARA.
          </div>
        </div>
      </div>

      {/* Header Halaman */}
      <PageHeader
        title="Pengajuan Keanggotaan Saya"
        subtitle="Riwayat formulir pendaftaran koperasi dan status verifikasi administrasi keanggotaan Anda."
        action={
          <button
            type="button"
            className="btn-primary"
            onClick={() => onNavigate('discovery')}
          >
            + Cari Koperasi Lain
          </button>
        }
      />

      {/* Daftar Pengajuan */}
      {applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <HelpCircle size={40} color="var(--color-subtle-text)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-dark-text)', marginBottom: '4px' }}>
            Belum ada formulir permohonan yang diajukan
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-subtle-text)', marginBottom: '16px' }}>
            Temukan koperasi yang cocok di direktori ADHIKARA dan ajukan permohonan keanggotaan secara digital.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => onNavigate('discovery')}
          >
            Buka Direktori Koperasi
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {applications.map((app) => (
            <div key={app.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--color-border-card)', paddingBottom: '14px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-dark-text)' }}>
                      {app.cooperativeName}
                    </h3>
                    <StatusBadge
                      label={app.status}
                      variant={app.status === 'Diterima & Aktif' ? 'emerald' : 'gold'}
                    />
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-subtle-text)' }}>
                    No. Pengajuan: <strong>{app.id}</strong> • Diajukan pada: <strong>{app.submittedDate}</strong>
                  </p>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-muted-text)', marginTop: '2px' }}>
                    Jenis Partisipasi: <strong>{app.memberTypeChosen}</strong> • Pemohon: {app.applicantName}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-subtle-text)' }}>Status Simpanan Pokok</span>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: app.simpananPokokPaid ? 'var(--color-deep-emerald)' : '#92400e', marginTop: '2px' }}>
                    {app.simpananPokokPaid ? '✓ Telah Terkonfirmasi Lunas' : '⏳ Menunggu Validasi Administrasi'}
                  </div>
                </div>
              </div>

              {/* Tahapan Progres Timeline */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-subtle-text)', marginBottom: '10px' }}>
                  Tahapan Alur Verifikasi Pendaftaran:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {STEPS.map((step, sIdx) => {
                    const isDone = sIdx + 1 <= app.stepIndex;
                    const isCurrent = sIdx + 1 === app.stepIndex;

                    return (
                      <div
                        key={sIdx}
                        style={{
                          padding: '10px 8px',
                          backgroundColor: isDone ? 'var(--color-emerald-light)' : 'var(--color-ivory)',
                          border: isDone ? '1px solid var(--color-emerald-border)' : '1px solid var(--color-border-card)',
                          borderRadius: 'var(--radius-sm)',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
                          <CheckCircle2
                            size={14}
                            color={isDone ? 'var(--color-deep-emerald)' : '#9ca3af'}
                          />
                          <span style={{ fontSize: '11px', fontWeight: 700, color: isDone ? 'var(--color-deep-emerald)' : 'var(--color-subtle-text)' }}>
                            Langkah {sIdx + 1}
                          </span>
                        </div>
                        <div style={{ fontSize: '11.5px', color: isDone ? 'var(--color-deep-emerald)' : 'var(--color-muted-text)', fontWeight: isCurrent ? 600 : 400 }}>
                          {step}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Catatan Tindak Lanjut Pengurus */}
              <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', fontSize: '12.5px', color: 'var(--color-muted-text)', lineHeight: 1.5 }}>
                <div style={{ fontWeight: 600, color: 'var(--color-dark-text)', marginBottom: '2px' }}>
                  Catatan Tim Keanggotaan:
                </div>
                {app.statusNote}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
