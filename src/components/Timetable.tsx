import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TimetableEntry } from '../types';
import { getDayName, formatTime, getSubjectColors } from '../utils/helpers';

const DAYS = [1, 2, 3, 4, 5]; // Mon-Fri
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7am - 8pm

export default function Timetable() {
  const { timetable, addTimetableEntry, updateTimetableEntry, deleteTimetableEntry, subjects } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const colors = getSubjectColors();

  const [form, setForm] = useState({
    subjectId: null as string | null,
    subjectName: '',
    day: 1,
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    color: colors[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subjectName.trim()) { alert('Subject name is required'); return; }
    if (form.startTime >= form.endTime) { alert('End time must be after start time'); return; }

    if (editingEntry) {
      updateTimetableEntry(editingEntry.id, form);
    } else {
      addTimetableEntry(form);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({ subjectId: null, subjectName: '', day: selectedDay || 1, startTime: '09:00', endTime: '10:00', location: '', color: colors[0] });
    setShowForm(false);
    setEditingEntry(null);
  };

  const startEdit = (entry: TimetableEntry) => {
    setForm({
      subjectId: entry.subjectId,
      subjectName: entry.subjectName,
      day: entry.day,
      startTime: entry.startTime,
      endTime: entry.endTime,
      location: entry.location,
      color: entry.color,
    });
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleSubjectSelect = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      setForm({ ...form, subjectId, subjectName: subject.name, color: subject.color });
    }
  };

  const getEntriesForSlot = (day: number, hour: number) => {
    return timetable.filter(entry => {
      if (entry.day !== day) return false;
      const startHour = parseInt(entry.startTime.split(':')[0]);
      return startHour === hour;
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Timetable</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Weekly schedule</p>
        </div>
        <button
          onClick={() => { setForm({ ...form, day: selectedDay || 1 }); setShowForm(true); }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Add Class
        </button>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header Row */}
            <div className="grid grid-cols-6 border-b border-gray-100 dark:border-gray-700">
              <div className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400">Time</div>
              {DAYS.map(day => (
                <div key={day} className="p-3 text-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{getDayName(day)}</span>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {HOURS.map(hour => (
              <div key={hour} className="grid grid-cols-6 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                <div className="p-2 text-xs text-gray-400 dark:text-gray-500 text-right pr-3">
                  {hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? '12:00 PM' : `${hour}:00 AM`}
                </div>
                {DAYS.map(day => {
                  const entries = getEntriesForSlot(day, hour);
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="p-1 min-h-[48px] border-l border-gray-50 dark:border-gray-700/50 relative group"
                      onClick={() => { setSelectedDay(day); setForm({ ...form, day, startTime: `${hour.toString().padStart(2, '0')}:00`, endTime: `${(hour + 1).toString().padStart(2, '0')}:00` }); }}
                    >
                      {entries.map(entry => (
                        <div
                          key={entry.id}
                          className="rounded-md px-2 py-1 text-xs text-white mb-1 cursor-pointer hover:opacity-80 transition-opacity relative group/entry"
                          style={{ backgroundColor: entry.color }}
                          onClick={(e) => { e.stopPropagation(); startEdit(entry); }}
                        >
                          <p className="font-medium truncate">{entry.subjectName}</p>
                          <p className="opacity-80 truncate">{entry.location}</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteTimetableEntry(entry.id); }}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[8px] opacity-0 group-hover/entry:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => resetForm()}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              {editingEntry ? 'Edit Class' : 'Add Class'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject Name *</label>
                <input
                  type="text"
                  value={form.subjectName}
                  onChange={e => setForm({ ...form, subjectName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Mathematics"
                  required
                />
                {subjects.length > 0 && (
                  <select
                    onChange={e => handleSubjectSelect(e.target.value)}
                    className="w-full mt-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Or select existing subject...</option>
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day</label>
                  <select
                    value={form.day}
                    onChange={e => setForm({ ...form, day: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {DAYS.map(d => <option key={d} value={d}>{getDayName(d)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Room number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={e => setForm({ ...form, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={e => setForm({ ...form, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm({ ...form, color })}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${form.color === color ? 'border-gray-800 dark:border-white scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                  {editingEntry ? 'Update' : 'Add'}
                </button>
                <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
