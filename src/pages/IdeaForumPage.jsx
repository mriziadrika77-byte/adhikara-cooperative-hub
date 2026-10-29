import React, { useState } from 'react';
import {
  Lightbulb,
  PlusCircle,
  Search,
  ThumbsUp,
  MessageSquare,
  User,
  X,
  Send,
  HelpCircle
} from 'lucide-react';
import { PageHeader, StatusBadge } from '../components/UIComponents';
import { initialIdeas, currentUser } from '../data/mockData';

const CATEGORIES = [
  'Semua Kategori',
  'Pengembangan Bisnis',
  'Efisiensi Operasional',
  'Pelayanan Anggota',
  'Pemasaran dan Digitalisasi',
  'Sosial dan Lingkungan',
  'Lainnya'
];

const STATUS_OPTIONS = [
  'Semua Status',
  'Diajukan',
  'Sedang Ditinjau',
  'Perlu Revisi',
  'Disetujui untuk Perencanaan',
  'Menunggu Persetujuan Formal',
  'Disetujui untuk Implementasi',
  'Sedang Berjalan',
  'Ditunda',
  'Selesai Dievaluasi',
  'Ditolak'
];

export const IdeaForumPage = () => {
  const [ideas, setIdeas] = useState(() => {
    const saved = localStorage.getItem('adhikara_ideas');
    return saved ? JSON.parse(saved) : initialIdeas;
  });

  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const [searchQuery, setSearchQuery] = useState('');

  // State Modal Detail Ide
  const [activeIdeaModal, setActiveIdeaModal] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');

  // State Modal Buat Ide Baru
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Pengembangan Bisnis');
  const [newProblem, setNewProblem] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [formError, setFormError] = useState('');

  // Simpan ke localStorage saat data ideas berubah
  const saveIdeas = (updated) => {
    setIdeas(updated);
    localStorage.setItem('adhikara_ideas', JSON.stringify(updated));
  };

  // Filter Ide
  const filteredIdeas = ideas.filter((idea) => {
    const matchCategory = selectedCategory === 'Semua Kategori' || idea.category === selectedCategory;
    const matchStatus = selectedStatus === 'Semua Status' || idea.status === selectedStatus;
    const matchSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.solution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchStatus && matchSearch;
  });

  // Handler Kirim Ide Baru
  const handleCreateIdea = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newProblem.trim() || !newSolution.trim()) {
      setFormError('Mohon lengkapi judul, uraian masalah, dan usulan solusi.');
      return;
    }

    const created = {
      id: `idea_${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      status: 'Diajukan',
      author: currentUser.name,
      authorRole: currentUser.role,
      createdAt: 'Baru saja',
      problem: newProblem.trim(),
      solution: newSolution.trim(),
      followUpNote: 'Aspirasi baru masuk antrean penelaahan berkala pengurus bidang.',
      votes: 1,
      hasVoted: true,
      comments: []
    };

    const updated = [created, ...ideas];
    saveIdeas(updated);
    setNewTitle('');
    setNewProblem('');
    setNewSolution('');
    setFormError('');
    setIsCreateOpen(false);
  };

  // Handler Voting Ide
  const handleVote = (ideaId, e) => {
    if (e) e.stopPropagation();
    const updated = ideas.map((item) => {
      if (item.id === ideaId) {
        return {
          ...item,
          votes: item.hasVoted ? item.votes - 1 : item.votes + 1,
          hasVoted: !item.hasVoted
        };
      }
      return item;
    });
    saveIdeas(updated);
    if (activeIdeaModal && activeIdeaModal.id === ideaId) {
      const fresh = updated.find((i) => i.id === ideaId);
      setActiveIdeaModal(fresh);
    }
  };

  // Handler Tambah Komentar
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeIdeaModal) return;

    const newComment = {
      id: `c_${Date.now()}`,
      author: currentUser.name,
      time: 'Baru saja',
      text: newCommentText.trim()
    };

    const updated = ideas.map((item) => {
      if (item.id === activeIdeaModal.id) {
        return {
          ...item,
          comments: [...(item.comments || []), newComment]
        };
      }
      return item;
    });

    saveIdeas(updated);
    const refreshed = updated.find((i) => i.id === activeIdeaModal.id);
    setActiveIdeaModal(refreshed);
    setNewCommentText('');
  };

  return (
    <div>
      {/* Pengumuman Simulasi & Hak Suara */}
      <div className="demo-banner">
        <Lightbulb size={18} className="demo-banner-icon" />
        <div>
          <div className="demo-banner-title">Ruang Musyawarah Anggota — Forum Ide (Data Simulasi)</div>
          <div className="demo-banner-desc">
            Setiap anggota berhak menyampaikan usulan. Jumlah dukungan dan diskusi bersifat aspiratif sebagai bahan pertimbangan pengurus, bukan keputusan formal instan koperasi.
          </div>
        </div>
      </div>

      {/* Header Halaman */}
      <PageHeader
        title="Forum Aspirasi & Ide Anggota"
        subtitle="Sampaikan gagasan, berikan masukan konstruktif, dan dukung kemajuan unit usaha bersama."
        action={
          <button
            type="button"
            className="btn-primary"
            onClick={() => setIsCreateOpen(true)}
          >
            <PlusCircle size={16} />
            Ajukan Ide Baru
          </button>
        }
      />

      {/* Panel Pencarian & Filter */}
      <div className="card" style={{ marginBottom: '20px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px', backgroundColor: 'var(--color-ivory)', border: '1px solid var(--color-border-card)', padding: '8px 12px', borderRadius: 'var(--radius-md)' }}>
            <Search size={16} color="var(--color-subtle-text)" />
            <input
              type="text"
              placeholder="Cari ide berdasarkan judul atau topik masalah..."
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

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {/* Filter Kategori */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', backgroundColor: 'var(--color-white)', fontSize: '13px', color: 'var(--color-dark-text)' }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Filter Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', backgroundColor: 'var(--color-white)', fontSize: '13px', color: 'var(--color-dark-text)' }}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Daftar Ide */}
      {filteredIdeas.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <HelpCircle size={36} color="var(--color-subtle-text)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-dark-text)', marginBottom: '4px' }}>
            Tidak ada ide yang cocok dengan kriteria pencarian
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-subtle-text)', marginBottom: '16px' }}>
            Coba ubah kata kunci atau ganti filter kategori/status di atas.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => { setSelectedCategory('Semua Kategori'); setSelectedStatus('Semua Status'); setSearchQuery(''); }}
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              className="card"
              style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
              onClick={() => setActiveIdeaModal(idea)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <StatusBadge label={idea.category} variant="emerald" />
                  <StatusBadge label={idea.status} variant="gold" />
                </div>
                <span style={{ fontSize: '12px', color: 'var(--color-subtle-text)' }}>
                  {idea.createdAt}
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-dark-text)', marginBottom: '6px' }}>
                {idea.title}
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', lineHeight: 1.5, marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                <strong>Masalah:</strong> {idea.problem}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '10px', fontSize: '12px', color: 'var(--color-subtle-text)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} />
                  <span>{idea.author} ({idea.authorRole})</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button
                    type="button"
                    onClick={(e) => handleVote(idea.id, e)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: idea.hasVoted ? 'var(--color-emerald-light)' : 'transparent',
                      border: idea.hasVoted ? '1px solid var(--color-emerald-border)' : '1px solid var(--color-border-card)',
                      color: idea.hasVoted ? 'var(--color-deep-emerald)' : 'var(--color-muted-text)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '12px'
                    }}
                  >
                    <ThumbsUp size={13} />
                    <span>{idea.votes} Dukungan</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MessageSquare size={14} />
                    <span>{idea.comments?.length || 0} Masukan</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Detail Ide */}
      {activeIdeaModal && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setActiveIdeaModal(null)}
        >
          <div
            className="card"
            style={{ maxWidth: '680px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--color-border-card)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <StatusBadge label={activeIdeaModal.category} variant="emerald" />
                <StatusBadge label={activeIdeaModal.status} variant="gold" />
              </div>
              <button type="button" onClick={() => setActiveIdeaModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-subtle-text)' }}>
                <X size={20} />
              </button>
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-dark-text)', marginBottom: '8px' }}>
              {activeIdeaModal.title}
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--color-subtle-text)', marginBottom: '16px' }}>
              Diusulkan oleh <strong>{activeIdeaModal.author}</strong> ({activeIdeaModal.authorRole}) • {activeIdeaModal.createdAt}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-deep-emerald)', marginBottom: '4px' }}>
                  Latar Belakang / Masalah:
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-dark-text)', lineHeight: 1.5 }}>
                  {activeIdeaModal.problem}
                </p>
              </div>

              <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-deep-emerald)', marginBottom: '4px' }}>
                  Usulan Solusi:
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-dark-text)', lineHeight: 1.5 }}>
                  {activeIdeaModal.solution}
                </p>
              </div>

              <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-gold-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gold-border)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>
                  Catatan Tindak Lanjut Pengurus:
                </div>
                <p style={{ fontSize: '13px', color: '#78350f', lineHeight: 1.5 }}>
                  {activeIdeaModal.followUpNote || 'Belum ada catatan tindak lanjut tambahan.'}
                </p>
              </div>
            </div>

            {/* Tombol Dukung */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-card)', paddingTop: '14px', marginBottom: '18px' }}>
              <span style={{ fontSize: '13px', color: 'var(--color-muted-text)' }}>
                Dukungan Anggota: <strong>{activeIdeaModal.votes} orang</strong>
              </span>
              <button
                type="button"
                className="btn-primary"
                onClick={() => handleVote(activeIdeaModal.id)}
                style={{ backgroundColor: activeIdeaModal.hasVoted ? '#059669' : 'var(--color-emerald)' }}
              >
                <ThumbsUp size={15} />
                {activeIdeaModal.hasVoted ? 'Sudah Didukung (Batal)' : 'Dukung Gagasan Ini'}
              </button>
            </div>

            {/* Kolom Diskusi */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '10px' }}>
                Tanggapan & Diskusi Anggota ({activeIdeaModal.comments?.length || 0})
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                {activeIdeaModal.comments && activeIdeaModal.comments.length > 0 ? (
                  activeIdeaModal.comments.map((c) => (
                    <div key={c.id} style={{ padding: '10px 12px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-card)', fontSize: '12.5px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <strong style={{ color: 'var(--color-dark-text)' }}>{c.author}</strong>
                        <span style={{ color: 'var(--color-subtle-text)', fontSize: '11px' }}>{c.time}</span>
                      </div>
                      <p style={{ color: 'var(--color-muted-text)', margin: 0 }}>{c.text}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '12.5px', color: 'var(--color-subtle-text)', fontStyle: 'italic' }}>
                    Belum ada tanggapan. Jadilah yang pertama memberikan masukan konstruktif!
                  </p>
                )}
              </div>

              {/* Form Tambah Komentar */}
              <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Tulis masukan konstruktif Anda..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', fontSize: '13px' }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '8px 14px' }}>
                  <Send size={14} />
                  Kirim
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Formulir Ajukan Ide Baru */}
      {isCreateOpen && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className="card"
            style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--color-border-card)', paddingBottom: '10px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-dark-text)' }}>
                Ajukan Gagasan Pengembangan Koperasi
              </h2>
              <button type="button" onClick={() => setIsCreateOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-subtle-text)' }}>
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div style={{ padding: '10px 14px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', color: '#991b1b', fontSize: '12.5px', marginBottom: '14px' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateIdea} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-dark-text)' }}>
                  Judul Gagasan *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pengadaan Mesin Pengering Gabah Berkelanjutan"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-dark-text)' }}>
                  Kategori Gagasan *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', fontSize: '13px' }}
                >
                  {CATEGORIES.filter((c) => c !== 'Semua Kategori').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-dark-text)' }}>
                  Permasalahan yang Ingin Diselesaikan *
                </label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan kendala di lapangan yang dirasakan anggota..."
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-dark-text)' }}>
                  Usulan Solusi / Rencana Tindakan *
                </label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan langkah nyata yang dapat diwujudkan koperasi..."
                  value={newSolution}
                  onChange={(e) => setNewSolution(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  style={{ padding: '9px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-card)', background: 'transparent', fontSize: '13px', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Kirim Usulan Gagasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
