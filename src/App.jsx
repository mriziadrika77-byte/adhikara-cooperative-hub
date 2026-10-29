import React, { useState } from 'react';
import { AppLayout } from './components/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { CooperativeInsightPage } from './pages/CooperativeInsightPage';
import { MembershipValuePage } from './pages/MembershipValuePage';
import { IdeaForumPage } from './pages/IdeaForumPage';
import { BusinessCollaborationPage } from './pages/BusinessCollaborationPage';
import { ImpactTrackerPage } from './pages/ImpactTrackerPage';
import { CooperativeDiscoveryPage } from './pages/CooperativeDiscoveryPage';
import { MyApplicationsPage } from './pages/MyApplicationsPage';
import { ManagementDashboardPage } from './pages/ManagementDashboardPage';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Komponen halaman aktif
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage onNavigate={setActivePage} />;
      case 'insight':
        return <CooperativeInsightPage onNavigate={setActivePage} />;
      case 'membership':
        return <MembershipValuePage />;
      case 'ideas':
        return <IdeaForumPage />;
      case 'collaboration':
        return <BusinessCollaborationPage />;
      case 'impact':
        return <ImpactTrackerPage />;
      case 'discovery':
        return <CooperativeDiscoveryPage onNavigate={setActivePage} />;
      case 'applications':
        return <MyApplicationsPage onNavigate={setActivePage} />;
      case 'management':
        return <ManagementDashboardPage onNavigate={setActivePage} />;
      default:
        return <DashboardPage onNavigate={setActivePage} />;
    }
  };

  return (
    <AppLayout
      activePage={activePage}
      onNavigate={setActivePage}
      isCollapsed={isCollapsed}
      setIsCollapsed={setIsCollapsed}
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
    >
      {renderPage()}
    </AppLayout>
  );
}

export default App;
