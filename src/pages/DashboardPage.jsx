import React, { useState } from 'react';
import {
  Lightbulb,
  Briefcase,
  Building2,
  TrendingUp
} from 'lucide-react';
import {
  PageHeader,
  SectionHeader,
  StatCard,
  QuickActionCard,
  DemoDataNotice,
  StatusBadge
} from '../components/UIComponents';
import {
  currentUser,
  cooperativeProfile,
  initialIdeas,
  initialProjects,
  journeySteps
} from '../data/mockData';

export const DashboardPage = ({ onNavigate }) => {
  // Ambil data dinamis dari localStorage agar sinkron dengan modul lain
  const [ideas] = useState(() => {
    const saved = localStorage.getItem('adhikara_ideas');
    return saved ? JSON.parse(saved) : initialIdeas;
  });

  const [projects] = useState(() => {
    const saved = localStorage.getItem('adhikara_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  // Metrik terintegrasi aktual
  const openIdeasCount = ideas.filter(i => i.status !== 'Selesai Dievaluasi' && i.status !== 'Ditolak').length;
  const activeProjectsCount = projects.filter(p => p.status === 'Sedang Berjalan' || p.status === 'Pendaftaran Dibuka').length;
  const myJoinedProjects = projects.filter(p => p.joined);

  const dynamicStats = [
    {
      id: 'stat_1',
      label: 'Aktivitas Koperasi',
      value: `${cooperativeProfile.totalMembers} Anggota`,
      change: '3 Unit Usaha Aktif',
      trend: 'up',
      description: cooperativeProfile.name,
      icon: Building2
    },
    {
      id: 'stat_2',
      label: 'Aspirasi & Ide Terbuka',
      value: `${openIdeasCount}`,
      change: `${ideas.length} total usulan`,
      trend: 'up',
      description: 'Forum musyawarah anggota',
      icon: Lightbulb
    },
    {
      id: 'stat_3',
      label: 'Proyek Kolaborasi',
      value: `${activeProjectsCount}`,
      change: `${myJoinedProjects.length} proyek Anda ikuti`,
      trend: 'up',
      description: 'Inisiatif usaha antar-anggota',
      icon: Briefcase
    },
    {
      id: 'stat_4',
      label: 'Partisipasi & SHU Terbagi',
      value: 'Rp 620 Jt',
      change: 'Audit WTP Resmi',
      trend: 'up',
      description: 'Dividen sosial-ekonomi RAT',
      icon: TrendingUp
    }
  ];

  const quickActionItems = [
    {
      id: 'qa_insight',
      title: 'Wawasan Bisnis Koperasi',
      description: 'Pelajari visi, 3 unit usaha, dan laporan transparansi audit KAMS.',
      targetModule: 'insight',
      badge: 'Transparansi'
    },
    {
      id: 'qa_membership',
      title: 'Nilai Keanggotaan & SHU',
      description: 'Cek kedaulatan hak anggota, rincian simpanan, dan riwayat SHU partisipasi Anda.',
      targetModule: 'membership',
      badge: 'Hak Anggota'
    },
    {
      id: 'qa_ideas',
      title: 'Forum Aspirasi & Ide',
      description: 'Sampaikan usulan inisiatif baru atau berikan dukungan suara untuk ide anggota.',
      targetModule: 'ideas',
      badge: 'Aspirasi'
    },
    {
      id: 'qa_projects',
      title: 'Pusat Kolaborasi Usaha',
      description: 'Daftar dan berkolaborasi dalam proyek bisnis nyata antar-anggota.',
      targetModule: 'collaboration',
      badge: 'Aksi Nyata'
    },
    {
      id: 'qa_impact',
      title: 'Pelacak Dampak Usaha',
      description: 'Pantau capaian serapan panen 284 Ton dan penghematan biaya riil.',
      targetModule: 'impact',
      badge: 'Hasil Terukur'
    },
    {
      id: 'qa_discovery',
      title: 'Eksplorasi Koperasi Lain',
      description: 'Jelajahi direktori 6 koperasi terpercaya dan bandingkan syarat keanggotaan.',
      targetModule: 'discovery',
      badge: 'Direktori'
    }
  ];

  return (
    <div>
      {/* Pengumuman Lingkungan Demonstrasi */}
      <DemoDataNotice />

      {/* Bagian Sambutan Anggota */}
      <PageHeader
        title={`Selamat Datang, ${currentUser.name}!`}
        subtitle={`Ruang kebersamaan ${currentUser.cooperative} • ID Anggota: ${currentUser.membershipId}`}
        action={
          <button
            type="button"
            className="btn-primary"
            onClick={() => onNavigate('ideas')}
          >
            <Lightbulb size={16} />
            Sampaikan Usulan Ide
          </button>
        }
      />

      {/* Kartu Ringkasan Metrik Dinamis */}
      <div className="stats-grid">
        {dynamicStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Tata Letak Dua Kolom: Proyek Anda & Akses Cepat */}
      <div className="dashboard-grid-2col">
        {/* Kolom Kiri: Proyek yang Diikuti & Status Terkini */}
        <div className="card">
          <SectionHeader
            title="Inisiatif Proyek Kolaborasi Anda"
            caption="Proyek usaha koperasi yang sedang Anda ikuti"
            action={
              <button
                type="button"
                onClick={() => onNavigate('collaboration')}
                style={{ fontSize: '12px', color: 'var(--color-emerald)', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}
              >
                Lihat Semua Proyek →
              </button>
            }
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myJoinedProjects.length === 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--color-subtle-text)', textAlign: 'center', padding: '20px 0' }}>
                Anda belum bergabung dalam proyek kolaborasi. Kunjungi pusat kolaborasi untuk memilih proyek!
              </p>
            ) : (
              myJoinedProjects.map((p) => (
                <div
                  key={p.id}
                  style={{
                    padding: '14px 16px',
                    backgroundColor: 'var(--color-ivory)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-dark-text)' }}>
                      {p.title}
                    </span>
                    <StatusBadge label={p.status} variant="emerald" />
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-subtle-text)', marginBottom: '10px' }}>
                    Koordinator: {p.lead} • Tenggat: {p.deadline}
                  </p>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--color-muted-text)', marginBottom: '3px' }}>
                      <span>Progres Inisiatif</span>
                      <span style={{ fontWeight: 600 }}>{p.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: 'var(--color-emerald)' }}></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kolom Kanan: Akses Cepat */}
        <div className="card">
          <SectionHeader
            title="Pintasan Cepat Seluruh Modul"
            caption="Akses langsung ke seluruh fitur ADHIKARA"
          />
          <div className="quick-action-grid">
            {quickActionItems.map((qa) => (
              <QuickActionCard
                key={qa.id}
                title={qa.title}
                description={qa.description}
                badge={qa.badge}
                onClick={() => onNavigate(qa.targetModule)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Perjalanan Partisipasi ADHIKARA */}
      <div className="journey-card">
        <SectionHeader
          title="Alur Partisipasi Anggota ADHIKARA"
          caption="Dari Gagasan Menjadi Dampak Kolektif: Tahapan peran anggota dalam ekosistem koperasi"
        />
        <div className="journey-step-row">
          {journeySteps.map((item) => (
            <div key={item.step} className="journey-step-item">
              <div className="step-number-tag">{item.step}</div>
              <div className="step-name-title">{item.name}</div>
              <div className="step-desc-text">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
