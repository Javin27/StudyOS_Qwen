import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { useElectron, usePWAInstall } from './hooks/useElectron';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Notes from './components/Notes';
import Timetable from './components/Timetable';
import PomodoroTimer from './components/PomodoroTimer';
import SubjectTracker from './components/SubjectTracker';
import Calendar from './components/Calendar';
import Settings from './components/Settings';
import InstallBanner from './components/InstallBanner';

function AppContent() {
  const { currentPage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Initialize Electron integration
  useElectron();
  
  // Initialize PWA install prompt
  usePWAInstall();

  React.useEffect(() => {
    const handler = () => setMobileMenuOpen(false);
    window.addEventListener('close-mobile-menu', handler);
    return () => window.removeEventListener('close-mobile-menu', handler);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'tasks': return <Tasks />;
      case 'notes': return <Notes />;
      case 'timetable': return <Timetable />;
      case 'pomodoro': return <PomodoroTimer />;
      case 'subjects': return <SubjectTracker />;
      case 'calendar': return <Calendar />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile unless toggled */}
      <div className={`fixed lg:static z-50 lg:z-auto transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto min-h-screen">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <i className="fa-solid fa-bars text-gray-600 dark:text-gray-400"></i>
          </button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            StudyOS
          </h1>
        </div>
        {renderPage()}
      </main>
      <InstallBanner />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
