import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/UIComponents';
import { mockModules } from '../data/mockData';

export const PlaceholderPage = ({ moduleId, onBackToDashboard }) => {
  const moduleInfo = mockModules[moduleId] || {
    title: 'Halaman Modul',
    subtitle: 'Ruang interaksi koperasi ini sedang dalam tahap perancangan awal.',
    plannedPhase: 'Direncanakan untuk fase berikutnya'
  };

  return (
    <div>
      <PageHeader
        title={moduleInfo.title}
        subtitle={moduleInfo.subtitle}
        action={
          <button type="button" className="btn-primary" onClick={onBackToDashboard}>
            <ArrowLeft size={16} />
            Kembali ke Dasbor
          </button>
        }
      />

      <div className="placeholder-box">
        <div className="placeholder-icon-wrap">
          <Sparkles size={28} />
        </div>
        <h2 className="placeholder-title">{moduleInfo.title}</h2>
        <p className="placeholder-desc">{moduleInfo.subtitle}</p>
        
        <div className="planned-tag">
          {moduleInfo.plannedPhase}
        </div>

        <button type="button" className="btn-primary" onClick={onBackToDashboard}>
          Kembali ke Dasbor Utama
        </button>
      </div>
    </div>
  );
};
