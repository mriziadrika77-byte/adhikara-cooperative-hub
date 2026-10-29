import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  CheckCircle2,
  X
} from 'lucide-react';
import { PageHeader, StatusBadge } from '../components/UIComponents';
import { initialProjects } from '../data/mockData';

const STATUS_PROJECTS = ['Semua Status', 'Pendaftaran Dibuka', 'Sedang Berjalan', 'Ditunda', 'Selesai', 'Dievaluasi'];

export const BusinessCollaborationPage = () => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('adhikara_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const [onlyMyProjects, setOnlyMyProjects] = useState(false);

  // Modal Detail Proyek
  const [activeProject, setActiveProject] = useState(null);

  // Modal Pendaftaran Proyek
  const [joinModalProject, setJoinModalProject] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [motivationNote, setMotivationNote] = useState('');
  const [joinSuccessNotice, setJoinSuccessNotice] = useState('');

  const saveProjects = (updated) => {
    setProjects(updated);
    localStorage.setItem('adhikara_projects', JSON.stringify(updated));
  };

  // Filter Proyek
  const filteredProjects = projects.filter((proj) => {
    const matchStatus = selectedStatus === 'Semua Status' || proj.status === selectedStatus;
    const matchSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.lead.toLowerCase().includes(searchQuery.toLowerCase());
    const matchMine = !onlyMyProjects || proj.joined;
    return matchStatus && matchSearch && matchMine;
  });

  // Handler Kirim Pengajuan Bergabung Proyek
  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinModalProject) return;

    const updated = projects.map((p) => {
      if (p.id === joinModalProject.id) {
        return {
          ...p,
          joined: true,
          joinApplicationStatus: 'Menunggu Persetujuan Koordinator'
        };
      }
      return p;
    });

    saveProjects(updated);
    setJoinSuccessNotice(`Pengajuan bergabung pada proyek "${joinModalProject.title}" berhasil dikirim dan kini berstatus 'Menunggu Persetujuan'.`);
    setJoinModalProject(null);
    setSelectedSkill('');
    setMotivationNote('');

    setTimeout(() => {
      setJoinSuccessNotice('');
    }, 6000);
  };

  return (
    <div>
      {/* Pengumuman Lingkungan Simulasi */}
      <div className="demo-banner">
        <Briefcase size={18} className="demo-banner-icon" />
        <div>
          <div className="demo-banner-title">Pusat Kolaborasi Usaha Koperasi — Data Simulasi</div>
          <div className="demo-banner-desc">
            Ruang kerja gotong royong bagi anggota untuk mengkontribusikan keahlian pada inisiatif pengembangan usaha riil. Pengajuan bergabung memerlukan konfirmasi dari penanggung jawab unit.
          </div>
        </div>
      </div>

      {joinSuccessNotice && (
        <div style={{ padding: '12px 18px', backgroundColor: 'var(--color-emerald-light)', border: '1px solid var(--color-emerald-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-deep-emerald)', fontSize: '13px', fontWeight: 500, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} />
          {joinSuccessNotice}
        </div>
      )}

      {/* Header Halaman */}
      <PageHeader
        title="Pusat Kolaborasi Usaha"
        subtitle="Temukan peluang berkontribusi pada proyek bisnis nyata dan bangun kemajuan bersama anggota lain."
      />

      {/* Filter & Pencarian */}
      <div className="card" style={{ marginBottom: '22px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px', backgroundColor: 'var(--color-ivory)', border: '1px solid var(--color-border-card)', padding: '8px 12px', borderRadius: 'var(--radius-md)' }}>
            <Search size={16} color="var(--color-subtle-text)" />
            <input
              type="text"
              placeholder="Cari proyek berdasarkan nama, penanggung jawab, atau deskripsi..."
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

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', backgroundColor: 'var(--color-white)', fontSize: '13px' }}
            >
              {STATUS_PROJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-dark-text)', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={onlyMyProjects}
                onChange={(e) => setOnlyMyProjects(e.target.checked)}
              />
              Hanya Proyek Saya
            </label>
          </div>
        </div>
      </div>

      {/* Grid Proyek */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '20px' }}>
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <StatusBadge label={proj.status} variant={proj.status === 'Sedang Berjalan' ? 'emerald' : 'gold'} />
                {proj.joined && (
                  <span style={{ fontSize: '11.5px', color: 'var(--color-deep-emerald)', backgroundColor: 'var(--color-emerald-light)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    ✓ Terdaftar
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark-text)', marginBottom: '8px', lineHeight: 1.4 }}>
                {proj.title}
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', lineHeight: 1.5, marginBottom: '14px' }}>
                {proj.description}
              </p>

              {/* Progres Bar */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-subtle-text)', marginBottom: '4px' }}>
                  <span>Progres Keseluruhan</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-dark-text)' }}>{proj.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '7px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${proj.progress}%`, height: '100%', backgroundColor: 'var(--color-emerald)' }}></div>
                </div>
              </div>

              {/* Metadata Singkat */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--color-subtle-text)', marginBottom: '16px', padding: '10px 12px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)' }}>
                <div>Koordinator: <strong>{proj.lead}</strong></div>
                <div>Tenggat Waktu: <strong>{proj.deadline}</strong></div>
                <div>Kapasitas: <strong>{proj.capacity}</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--color-border-card)', paddingTop: '12px' }}>
              <button
                type="button"
                onClick={() => setActiveProject(proj)}
                style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', background: 'transparent', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-dark-text)', cursor: 'pointer' }}
              >
                Lihat Rincian & Milestone
              </button>

              {!proj.joined && proj.status === 'Pendaftaran Dibuka' && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setJoinModalProject(proj);
                    setSelectedSkill(proj.skillsNeeded[0] || '');
                  }}
                  style={{ fontSize: '12.5px', padding: '8px 12px' }}
                >
                  Ajukan Diri
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail Proyek & Milestone */}
      {activeProject && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setActiveProject(null)}
        >
          <div
            className="card"
            style={{ maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--color-border-card)', paddingBottom: '10px' }}>
              <StatusBadge label={activeProject.status} variant="emerald" />
              <button type="button" onClick={() => setActiveProject(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-subtle-text)' }}>
                <X size={20} />
              </button>
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-dark-text)', marginBottom: '8px' }}>
              {activeProject.title}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', lineHeight: 1.5, marginBottom: '16px' }}>
              {activeProject.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '12px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-deep-emerald)', marginBottom: '2px' }}>Tujuan Utama:</div>
                <div style={{ fontSize: '13px', color: 'var(--color-dark-text)' }}>{activeProject.objective}</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-deep-emerald)', marginBottom: '2px' }}>Kebutuhan Keahlian / Kontribusi:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                  {activeProject.skillsNeeded.map((s, idx) => (
                    <span key={idx} style={{ fontSize: '11.5px', backgroundColor: '#e5e7eb', padding: '2px 8px', borderRadius: '4px', color: '#374151' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tahapan Milestone */}
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '10px' }}>
              Tahapan Pekerjaan (Milestones)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {activeProject.milestones.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-ivory)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border-card)',
                    fontSize: '12.5px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2
                      size={16}
                      color={m.status === 'Selesai' ? 'var(--color-emerald)' : '#9ca3af'}
                    />
                    <span style={{ fontWeight: 500, color: 'var(--color-dark-text)' }}>{m.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-subtle-text)' }}>{m.date}</span>
                    <StatusBadge
                      label={m.status}
                      variant={m.status === 'Selesai' ? 'emerald' : m.status === 'Sedang Berjalan' ? 'gold' : 'neutral'}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setActiveProject(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Formulir Pendaftaran Proyek */}
      {joinModalProject && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setJoinModalProject(null)}
        >
          <div
            className="card"
            style={{ maxWidth: '520px', width: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--color-border-card)', paddingBottom: '10px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-dark-text)' }}>
                Ajukan Diri Bergabung Proyek
              </h2>
              <button type="button" onClick={() => setJoinModalProject(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-subtle-text)' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', marginBottom: '14px' }}>
              Proyek: <strong>{joinModalProject.title}</strong>
            </p>

            <form onSubmit={handleJoinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-dark-text)' }}>
                  Peran / Keahlian yang Anda Tawarkan *
                </label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', fontSize: '13px' }}
                >
                  {joinModalProject.skillsNeeded.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-dark-text)' }}>
                  Ketersediaan Waktu & Catatan Singkat
                </label>
                <textarea
                  rows={3}
                  placeholder="Contoh: Bersedia membantu pengawasan lapangan 2x seminggu di akhir pekan..."
                  value={motivationNote}
                  onChange={(e) => setMotivationNote(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-gold-light)', border: '1px solid var(--color-gold-border)', borderRadius: 'var(--radius-sm)', fontSize: '11.5px', color: '#92400e' }}>
                Pengajuan ini akan diteruskan kepada <strong>{joinModalProject.lead}</strong>. Konfirmasi penerimaan tim akan diperbarui di dashboard ini.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setJoinModalProject(null)}
                  style={{ padding: '8px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', background: 'transparent', fontSize: '12.5px', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Kirim Pengajuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
