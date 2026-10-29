import React from 'react';
import {
  LayoutDashboard,
  LineChart,
  Award,
  Lightbulb,
  Briefcase,
  TrendingUp,
  Compass,
  FileCheck2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search
} from 'lucide-react';
import { currentUser } from '../data/mockData';

const navItems = [
  { id: 'dashboard', label: 'Dasbor Utama', icon: LayoutDashboard },
  { id: 'insight', label: 'Wawasan Koperasi', icon: LineChart },
  { id: 'membership', label: 'Nilai Keanggotaan', icon: Award },
  { id: 'ideas', label: 'Forum Aspirasi & Ide', icon: Lightbulb },
  { id: 'collaboration', label: 'Kolaborasi Usaha', icon: Briefcase },
  { id: 'impact', label: 'Pelacak Dampak', icon: TrendingUp },
  { id: 'discovery', label: 'Eksplorasi Koperasi', icon: Compass },
  { id: 'applications', label: 'Pengajuan Saya', icon: FileCheck2 },
];

const managementItems = [
  { id: 'management', label: 'Dasbor Manajemen', icon: ShieldCheck }
];

export const AppLayout = ({
  activePage,
  onNavigate,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  children
}) => {
  const allItems = [...navItems, ...managementItems];
  const activeItem = allItems.find((i) => i.id === activePage) || { label: 'Dasbor Utama' };

  return (
    <div className="app-container">
      {/* Latar Belakang Mobile */}
      <div
        className={`mobile-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Navigasi Bilah Sisi (Sidebar) */}
      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
        aria-label="Navigasi Utama"
      >
        <div className="sidebar-header">
          <div className="brand-wrapper">
            <div className="brand-symbol">A</div>
            {!isCollapsed && (
              <div className="brand-text-col">
                <span className="brand-name">ADHIKARA</span>
                <span className="brand-tagline">Pusat Partisipasi Koperasi</span>
              </div>
            )}
          </div>
          <button
            type="button"
            className="sidebar-collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Perlebar menu' : 'Perkecil menu'}
            aria-label="Ubah lebar sidebar"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav-scroll">
          <div>
            {!isCollapsed && <div className="nav-section-title">Navigasi Utama</div>}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`nav-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileOpen(false);
                  }}
                  title={item.label}
                >
                  <Icon size={18} className="nav-item-icon" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>

          <div className="management-divider">
            {!isCollapsed && <div className="nav-section-title">Tata Kelola</div>}
            {managementItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`nav-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileOpen(false);
                  }}
                  title={item.label}
                >
                  <Icon size={18} className="nav-item-icon" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Info Anggota Pengguna */}
        <div className="sidebar-footer">
          <div className="user-profile-badge">
            <div className="user-avatar-initials">{currentUser.initials}</div>
            {!isCollapsed && (
              <div className="user-info-text">
                <span className="user-name-title">{currentUser.name}</span>
                <span className="user-role-sub">{currentUser.role}</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Konten Utama */}
      <div className="main-wrapper">
        <header className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="mobile-menu-trigger"
              onClick={() => setMobileOpen(true)}
              aria-label="Buka menu navigasi"
            >
              <Menu size={20} />
            </button>
            <div className="breadcrumb-trail">
              <span>ADHIKARA</span>
              <span>/</span>
              <span className="breadcrumb-active">{activeItem.label}</span>
            </div>
          </div>

          <div className="topbar-right">
            <div className="search-field-box">
              <Search size={15} />
              <input
                type="text"
                placeholder="Cari modul atau data koperasi..."
                disabled
                title="Pencarian global terpusat (Simulasi Prototipe ADHIKARA)"
              />
            </div>
            <div className="demo-env-badge">
              <span className="demo-dot"></span>
              Lingkungan Prototipe
            </div>
          </div>
        </header>

        <main className="page-container">{children}</main>
      </div>
    </div>
  );
};
