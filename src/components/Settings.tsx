import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { clearAllData, exportData, importData } from '../utils/storage';

export default function Settings() {
  const { settings, updateSettings } = useApp();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studyos-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const success = importData(result);
      if (success) {
        setImportStatus('success');
        setTimeout(() => { window.location.reload(); }, 1000);
      } else {
        setImportStatus('error');
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    clearAllData();
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Customize your StudyOS experience</p>
      </div>

      {/* Profile */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
            <input
              type="text"
              value={settings.userName}
              onChange={e => updateSettings({ userName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Daily Task Goal</label>
            <input
              type="number"
              min={1}
              max={50}
              value={settings.dailyGoal}
              onChange={e => updateSettings({ dailyGoal: parseInt(e.target.value) || 5 })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
          </div>
          <button
            onClick={() => updateSettings({ darkMode: !settings.darkMode })}
            className={`relative w-12 h-6 rounded-full transition-colors ${settings.darkMode ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.darkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
          </button>
        </div>
      </div>

      {/* Pomodoro Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Pomodoro Timer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Work Duration (min)</label>
            <input
              type="number"
              min={1}
              max={120}
              value={settings.pomodoro.workDuration}
              onChange={e => updateSettings({ pomodoro: { ...settings.pomodoro, workDuration: parseInt(e.target.value) || 25 } })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Break (min)</label>
            <input
              type="number"
              min={1}
              max={30}
              value={settings.pomodoro.shortBreak}
              onChange={e => updateSettings({ pomodoro: { ...settings.pomodoro, shortBreak: parseInt(e.target.value) || 5 } })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Long Break (min)</label>
            <input
              type="number"
              min={1}
              max={60}
              value={settings.pomodoro.longBreak}
              onChange={e => updateSettings({ pomodoro: { ...settings.pomodoro, longBreak: parseInt(e.target.value) || 15 } })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sessions before Long Break</label>
            <input
              type="number"
              min={2}
              max={10}
              value={settings.pomodoro.sessionsBeforeLongBreak}
              onChange={e => updateSettings({ pomodoro: { ...settings.pomodoro, sessionsBeforeLongBreak: parseInt(e.target.value) || 4 } })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-start Breaks</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Automatically start break timer after work session</p>
            </div>
            <button
              onClick={() => updateSettings({ pomodoro: { ...settings.pomodoro, autoStartBreaks: !settings.pomodoro.autoStartBreaks } })}
              className={`relative w-12 h-6 rounded-full transition-colors ${settings.pomodoro.autoStartBreaks ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.pomodoro.autoStartBreaks ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-start Pomodoros</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Automatically start work timer after break</p>
            </div>
            <button
              onClick={() => updateSettings({ pomodoro: { ...settings.pomodoro, autoStartPomodoros: !settings.pomodoro.autoStartPomodoros } })}
              className={`relative w-12 h-6 rounded-full transition-colors ${settings.pomodoro.autoStartPomodoros ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.pomodoro.autoStartPomodoros ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Data Management</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Export Data</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Download all your data as a JSON file</p>
            </div>
            <button onClick={handleExport} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
              <i className="fa-solid fa-download mr-2"></i>Export
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Import Data</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Restore from a previously exported backup</p>
            </div>
            <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">
              <i className="fa-solid fa-upload mr-2"></i>Import
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
          {importStatus && (
            <p className={`text-sm ${importStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {importStatus === 'success' ? '✓ Data imported successfully! Reloading...' : '✗ Failed to import data. Invalid file format.'}
            </p>
          )}
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Clear All Data</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Permanently delete all tasks, notes, and settings</p>
            </div>
            <button
              onClick={() => setShowConfirmClear(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <i className="fa-solid fa-trash mr-2"></i>Clear
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Clear Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowConfirmClear(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fa-solid fa-triangle-exclamation text-red-500 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Clear All Data?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">This action cannot be undone. All your tasks, notes, subjects, and settings will be permanently deleted.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowConfirmClear(false)} className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors">
                  Cancel
                </button>
                <button onClick={handleClearAll} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Delete Everything
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">About StudyOS</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          StudyOS is a modern student productivity dashboard designed to help you stay organized and focused.
          Manage your tasks, notes, timetable, and study sessions all in one place.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">Version 1.0.0 · Built with React & Tailwind CSS</p>
      </div>
    </div>
  );
}
