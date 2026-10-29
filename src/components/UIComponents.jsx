import React from 'react';
import { AlertCircle } from 'lucide-react';

export const DemoDataNotice = () => {
  return (
    <div className="demo-banner">
      <AlertCircle size={18} className="demo-banner-icon" />
      <div>
        <div className="demo-banner-title">Lingkungan Percontohan — Prototipe Phase 1</div>
        <div className="demo-banner-desc">
          Angka statistik dan sampel aktivitas yang ditampilkan di bawah ini adalah data simulasi untuk pengujian antarmuka. Data ini tidak mencerminkan data finansial maupun operasional nyata.
        </div>
      </div>
    </div>
  );
};

export const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="page-header-box">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const SectionHeader = ({ title, caption, action }) => {
  return (
    <div className="section-header-box">
      <div>
        <h2 className="section-title">{title}</h2>
        {caption && <span className="section-caption">{caption}</span>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const StatusBadge = ({ label, variant = 'neutral' }) => {
  return <span className={`badge badge-${variant}`}>{label}</span>;
};

export const StatCard = ({ label, value, change, trend = 'up', description, icon: Icon }) => {
  return (
    <div className="card stat-card">
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>
        {Icon && (
          <div className="stat-icon-bubble">
            <Icon size={18} />
          </div>
        )}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-card-bottom">
        <span className={`stat-badge-trend trend-${trend}`}>
          {change}
        </span>
        <span className="stat-card-desc">{description}</span>
      </div>
    </div>
  );
};

export const ActivityItem = ({ title, category, author, timeAgo, status, statusVariant }) => {
  return (
    <div className="activity-item">
      <div className="activity-content">
        <div className="activity-item-header">
          <span className="activity-title">{title}</span>
          {status && <StatusBadge label={status} variant={statusVariant} />}
        </div>
        <div className="activity-meta">
          <span>{category}</span>
          <span>•</span>
          <span>{author}</span>
          <span>•</span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

export const QuickActionCard = ({ title, description, badge, onClick }) => {
  return (
    <button type="button" className="quick-action-card" onClick={onClick}>
      <div className="qa-left-info">
        <div className="qa-title">
          <span>{title}</span>
          {badge && <StatusBadge label={badge} variant="emerald" />}
        </div>
        <div className="qa-desc">{description}</div>
      </div>
      <span className="qa-arrow">→</span>
    </button>
  );
};
