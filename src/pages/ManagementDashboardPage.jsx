import React, { useState } from 'react';
import {
  ShieldCheck,
  Lightbulb,
  Briefcase,
  Users,
  CheckCircle2,
  Building2,
  Check
} from 'lucide-react';
import { PageHeader, SectionHeader, StatusBadge } from '../components/UIComponents';
import {
  initialMyApplications,
  initialIdeas,
  initialProjects,
  cooperativeProfile
} from '../data/mockData';

export const ManagementDashboardPage = ({ onNavigate }) => {
  // Ambil data dinamis dari localStorage jika ada
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('adhikara_my_applications');
    return saved ? JSON.parse(saved) : initialMyApplications;
  });

  const [ideas, setIdeas] = useState(() => {
    const saved = localStorage.getItem('adhikara_ideas');
    return saved ? JSON.parse(saved) : initialIdeas;
  });

  const [projects] = useState(() => {
    const saved = localStorage.getItem('adhikara_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [statusFilter, setStatusFilter] = useState('Semua');
  const [actionSuccessNotice, setActionSuccessNotice] = useState('');

  // Hitung metrik dinamis
  const pendingApps = applications.filter(a => a.status !== 'Diterima & Aktif');
  const pendingIdeas = ideas.filter(i => i.status === 'Diajukan' || i.status === 'Sedang Ditinjau');
  const activeProjectsCount = projects.filter(p => p.status === 'Sedang Berjalan' || p.status === 'Pendaftaran Dibuka').length;

  // Aksi persetujuan pengajuan simulasi
  const handleApproveApplication = (appId) => {
    const updated = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'Diterima & Aktif',
          statusNote: 'Pengajuan telah disetujui oleh Pengurus Koperasi melalui Dasbor Manajemen.',
          simpananPokokPaid: true,
          stepIndex: 4
        };
      }
      return app;
    });

    setApplications(updated);
    localStorage.setItem('adhikara_my_applications', JSON.stringify(updated));
    setActionSuccessNotice(`Pengajuan ${appId} berhasil disetujui sebagai Anggota Aktif.`);
    setTimeout(() => setActionSuccessNotice(''), 5000);
  };

  // Aksi persetujuan ide anggota simulasi
  const handleApproveIdea = (ideaId) => {
    const updated = ideas.map(idea => {
      if (idea.id === ideaId) {
        return {
          ...idea,
          status: 'Disetujui untuk Perencanaan',
          followUpNote: 'Disetujui dalam rapat pengurus untuk masuk ke tahap perencanaan teknis.'
        };
      }
      return idea;
    });

    setIdeas(updated);
    localStorage.setItem('adhikara_ideas', JSON.stringify(updated));
    setActionSuccessNotice(`Gagasan ide berhasil disetujui untuk perencanaan.`);
    setTimeout(() => setActionSuccessNotice(''), 5000);
  };

  // Filter daftar pengajuan yang ditampilkan
  const displayedApplications = applications.filter(app => {
    if (statusFilter === 'Semua') return true;
    if (statusFilter === 'Menunggu') return app.status !== 'Diterima & Aktif';
    if (statusFilter === 'Selesai') return app.status === 'Diterima & Aktif';
    return true;
  });

  return (
    <div>
      {/* Banner Penanda Mode Demonstrasi Pengelola */}
      <div className="demo-banner">
        <ShieldCheck size={18} className="demo-banner-icon" />
        <div>
          <div className="demo-banner-title">Dasbor Manajemen Pengurus — Mode Demonstrasi Simulasi</div>
          <div className="demo-banner-desc">
            Portal ini mensimulasikan tugas administratif pengurus: memverifikasi pendaftaran anggota baru, menindaklanjuti usulan ide, dan memantau status operasional proyek koperasi secara terpadu.
          </div>
        </div>
      </div>

      {actionSuccessNotice && (
        <div style={{ padding: '12px 18px', backgroundColor: 'var(--color-emerald-light)', border: '1px solid var(--color-emerald-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-deep-emerald)', fontSize: '13px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} />
          {actionSuccessNotice}
        </div>
      )}

      {/* Header Halaman */}
      <PageHeader
        title="Dasbor Manajemen & Tata Kelola Pengurus"
        subtitle={`Pengawasan operasional ${cooperativeProfile.name} • Tahun Buku 2026`}
      />

      {/* 4 Kartu Ringkasan Operasional yang Terintegrasi Dinamis */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div
          className="card stat-card"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('applications')}
        >
          <div className="stat-card-top">
            <span className="stat-label">Pengajuan Keanggotaan</span>
            <Users size={18} color="var(--color-emerald)" />
          </div>
          <div className="stat-value">{applications.length}</div>
          <div className="stat-card-bottom">
            <span className="stat-badge-trend trend-neutral">
              {pendingApps.length} perlu verifikasi
            </span>
            <span className="stat-card-desc">Total pendaftar</span>
          </div>
        </div>

        <div
          className="card stat-card"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('ideas')}
        >
          <div className="stat-card-top">
            <span className="stat-label">Usulan Ide Menunggu Telaah</span>
            <Lightbulb size={18} color="var(--color-gold)" />
          </div>
          <div className="stat-value">{pendingIdeas.length}</div>
          <div className="stat-card-bottom">
            <span className="stat-badge-trend trend-up">
              {ideas.length} total aspirasi
            </span>
            <span className="stat-card-desc">Dari anggota</span>
          </div>
        </div>

        <div
          className="card stat-card"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('collaboration')}
        >
          <div className="stat-card-top">
            <span className="stat-label">Proyek Aktif Berjalan</span>
            <Briefcase size={18} color="var(--color-deep-emerald)" />
          </div>
          <div className="stat-value">{activeProjectsCount}</div>
          <div className="stat-card-bottom">
            <span className="stat-badge-trend trend-up">
              {projects.length} inisiatif
            </span>
            <span className="stat-card-desc">Unit bisnis</span>
          </div>
        </div>

        <div
          className="card stat-card"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('insight')}
        >
          <div className="stat-card-top">
            <span className="stat-label">Status Profil & Audit</span>
            <Building2 size={18} color="var(--color-emerald)" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-dark-text)', marginTop: '4px' }}>
            WTP Terverifikasi
          </div>
          <div className="stat-card-bottom">
            <span className="stat-badge-trend trend-up">Disahkan RAT</span>
            <span className="stat-card-desc">3 unit usaha</span>
          </div>
        </div>
      </div>

      {/* Grid Dua Kolom: Verifikasi Pendaftaran & Telaah Aspirasi */}
      <div className="dashboard-grid-2col" style={{ marginBottom: '24px' }}>
        {/* Kolom Kiri: Verifikasi Pengajuan Keanggotaan */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 className="section-title">Pemeriksaan Pendaftaran Anggota</h2>
              <span className="section-caption">Permohonan masuk dari direktori ADHIKARA</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => setStatusFilter('Semua')}
                style={{ padding: '4px 8px', fontSize: '11px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-card)', background: statusFilter === 'Semua' ? 'var(--color-deep-emerald)' : 'transparent', color: statusFilter === 'Semua' ? '#fff' : 'var(--color-dark-text)', cursor: 'pointer' }}
              >
                Semua ({applications.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('Menunggu')}
                style={{ padding: '4px 8px', fontSize: '11px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-card)', background: statusFilter === 'Menunggu' ? 'var(--color-deep-emerald)' : 'transparent', color: statusFilter === 'Menunggu' ? '#fff' : 'var(--color-dark-text)', cursor: 'pointer' }}
              >
                Perlu Aksi ({pendingApps.length})
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {displayedApplications.length === 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--color-subtle-text)', textAlign: 'center', padding: '24px 0' }}>
                Tidak ada pengajuan pada kategori ini.
              </p>
            ) : (
              displayedApplications.map((app) => (
                <div
                  key={app.id}
                  style={{
                    padding: '12px 14px',
                    backgroundColor: 'var(--color-ivory)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-dark-text)' }}>
                        {app.applicantName}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-subtle-text)' }}>
                        Tujuan: <strong>{app.cooperativeName}</strong> • {app.memberTypeChosen}
                      </div>
                    </div>
                    <StatusBadge
                      label={app.status}
                      variant={app.status === 'Diterima & Aktif' ? 'emerald' : 'gold'}
                    />
                  </div>

                  <div style={{ fontSize: '11.5px', color: 'var(--color-muted-text)', marginBottom: '8px' }}>
                    Diajukan: {app.submittedDate} • Simpanan: {app.simpananPokokPaid ? 'Lunas' : 'Menunggu Validasi'}
                  </div>

                  {app.status !== 'Diterima & Aktif' && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px dashed var(--color-border-card)', paddingTop: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleApproveApplication(app.id)}
                        className="btn-primary"
                        style={{ fontSize: '11.5px', padding: '5px 10px' }}
                      >
                        <Check size={13} />
                        Sahkan Sebagai Anggota
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kolom Kanan: Telaah Ide Anggota */}
        <div className="card">
          <SectionHeader
            title="Aspirasi Anggota Menunggu Tindak Lanjut"
            caption="Usulan inisiatif yang perlu keputusan pengurus"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingIdeas.length === 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--color-subtle-text)', textAlign: 'center', padding: '24px 0' }}>
                Semua aspirasi anggota telah ditindaklanjuti!
              </p>
            ) : (
              pendingIdeas.map((idea) => (
                <div
                  key={idea.id}
                  style={{
                    padding: '12px 14px',
                    backgroundColor: 'var(--color-ivory)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-dark-text)' }}>
                      {idea.title}
                    </span>
                    <StatusBadge label={idea.status} variant="gold" />
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--color-muted-text)', marginBottom: '8px' }}>
                    Oleh: <strong>{idea.author}</strong> ({idea.category}) • {idea.votes} dukungan
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px dashed var(--color-border-card)', paddingTop: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleApproveIdea(idea.id)}
                      className="btn-primary"
                      style={{ fontSize: '11.5px', padding: '5px 10px' }}
                    >
                      <Check size={13} />
                      Setujui untuk Perencanaan
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('ideas')}
                      style={{ fontSize: '11.5px', padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-card)', background: 'transparent', cursor: 'pointer' }}
                    >
                      Buka di Forum
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Ringkasan Status Proyek Usaha Bersama */}
      <div className="card">
        <SectionHeader
          title="Status Pengawasan Proyek Kolaborasi Usaha"
          caption="Pelacakan kemajuan milestone dan kapasitas partisipasi anggota"
        />

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-ivory)', borderBottom: '1px solid var(--color-border-card)' }}>
                <th style={{ padding: '10px 12px', color: 'var(--color-subtle-text)' }}>Inisiatif Proyek</th>
                <th style={{ padding: '10px 12px', color: 'var(--color-subtle-text)' }}>Penanggung Jawab</th>
                <th style={{ padding: '10px 12px', color: 'var(--color-subtle-text)' }}>Tenggat</th>
                <th style={{ padding: '10px 12px', color: 'var(--color-subtle-text)' }}>Progres</th>
                <th style={{ padding: '10px 12px', color: 'var(--color-subtle-text)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr key={proj.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{proj.title}</td>
                  <td style={{ padding: '12px', color: 'var(--color-dark-text)' }}>{proj.lead}</td>
                  <td style={{ padding: '12px', color: 'var(--color-subtle-text)', fontSize: '12px' }}>{proj.deadline}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '80px', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${proj.progress}%`, height: '100%', backgroundColor: 'var(--color-emerald)' }}></div>
                      </div>
                      <span style={{ fontSize: '11.5px', fontWeight: 600 }}>{proj.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <StatusBadge label={proj.status} variant={proj.status === 'Sedang Berjalan' ? 'emerald' : 'gold'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
