import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Subject } from '../types';
import { getSubjectColors, validateSubject } from '../utils/helpers';

export default function SubjectTracker() {
  const { subjects, tasks, addSubject, updateSubject, deleteSubject } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const colors = getSubjectColors();

  const [form, setForm] = useState({
    name: '', color: colors[0], icon: '📚',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateSubject(form);
    if (error) { alert(error); return; }

    if (editingSubject) {
      updateSubject(editingSubject.id, form);
    } else {
      addSubject(form);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({ name: '', color: colors[0], icon: '📚' });
    setShowForm(false);
    setEditingSubject(null);
  };

  const startEdit = (subject: Subject) => {
    setForm({ name: subject.name, color: subject.color, icon: subject.icon });
    setEditingSubject(subject);
    setShowForm(true);
  };

  const getSubjectStats = (subjectId: string) => {
    const subjectTasks = tasks.filter(t => t.subjectId === subjectId);
    const completed = subjectTasks.filter(t => t.completed).length;
    const total = subjectTasks.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  };

  const icons = ['📚', '🔬', '📐', '🎨', '💻', '🌍', '📝', '🧮', '🎵', '🏛️', '⚗️', '📖'];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Subjects</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{subjects.length} subjects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Add Subject
        </button>
      </div>

      {/* Subject Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => resetForm()}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              {editingSubject ? 'Edit Subject' : 'New Subject'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Subject name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
                <div className="flex gap-2 flex-wrap">
                  {icons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setForm({ ...form, icon })}
                      className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${form.icon === icon ? 'bg-indigo-100 dark:bg-indigo-900/30 ring-2 ring-indigo-500' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                    >
                      {icon}
                    </button>
                  ))}
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
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${form.color === color ? 'border-gray-800 dark:border-white scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                  {editingSubject ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subjects Grid */}
      {subjects.length === 0 ? (
        <div className="text-center py-12">
          <i className="fa-solid fa-book text-4xl text-gray-300 dark:text-gray-600 mb-3"></i>
          <p className="text-gray-500 dark:text-gray-400">No subjects yet. Add your first subject!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map(subject => {
            const stats = getSubjectStats(subject.id);
            return (
              <div key={subject.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: subject.color + '20' }}>
                      {subject.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white text-sm">{subject.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{stats.total} tasks</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(subject)} className="p-1.5 text-gray-400 hover:text-indigo-500">
                      <i className="fa-solid fa-pen text-xs"></i>
                    </button>
                    <button onClick={() => deleteSubject(subject.id)} className="p-1.5 text-gray-400 hover:text-red-500">
                      <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{stats.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${stats.percentage}%`, backgroundColor: subject.color }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stats.completed}/{stats.total} tasks completed</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
