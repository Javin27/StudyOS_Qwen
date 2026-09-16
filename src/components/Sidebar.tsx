import React from 'react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';

const navItems: { page: Page; label: string; icon: string }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
  { page: 'tasks', label: 'Tasks', icon: 'fa-list-check' },
  { page: 'notes', label: 'Notes', icon: 'fa-note-sticky' },
  { page: 'timetable', label: 'Timetable', icon: 'fa-calendar-days' },
  { page: 'pomodoro', label: 'Pomodoro', icon: 'fa-clock' },
  { page: 'subjects', label: 'Subjects', icon: 'fa-book' },
  { page: 'calendar', label: 'Calendar', icon: 'fa-calendar' },
  { page: 'settings', label: 'Settings', icon: 'fa-gear' },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, settings } = useApp();
  const [collapsed, setCollapsed] = React.useState(false);

  const handleNav = (page: Page) => {
    setCurrentPage(page);
    // Dispatch event to close mobile menu
    window.dispatchEvent(new CustomEvent('close-mobile-menu'));
  };

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 h-screen sticky top-0`}>
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            StudyOS
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <i className={`fa-solid ${collapsed ? 'fa-angles-right' : 'fa-angles-left'} text-gray-500`}></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <button
            key={item.page}
            onClick={() => handleNav(item.page)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              currentPage === item.page
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            title={collapsed ? item.label : undefined}
          >
            <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* User info */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
              {settings.userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{settings.userName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Student</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
