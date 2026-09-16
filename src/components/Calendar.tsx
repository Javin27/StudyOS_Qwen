import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getDaysUntil, isOverdue, getPriorityColor, formatTime } from '../utils/helpers';

export default function Calendar() {
  const { tasks, timetable, subjects } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const getTasksForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(t => t.deadline === dateStr);
  };

  const getTimetableForDay = (day: number) => {
    const dayOfWeek = new Date(year, month, day).getDay();
    return timetable.filter(t => t.day === dayOfWeek);
  };

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const selectedDayTasks = selectedDay ? getTasksForDate(selectedDay) : [];
  const selectedDayClasses = selectedDay ? getTimetableForDay(selectedDay) : [];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Calendar</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">View your schedule and deadlines</p>
        </div>
        <button onClick={goToday} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
          Today
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Month Navigation */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <i className="fa-solid fa-chevron-left text-gray-500"></i>
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{monthName}</h2>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <i className="fa-solid fa-chevron-right text-gray-500"></i>
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-700">
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} className="p-2 min-h-[80px] border-b border-r border-gray-50 dark:border-gray-700/50"></div>;

              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = day === selectedDay;
              const dayTasks = getTasksForDate(day);
              const hasOverdue = dayTasks.some(t => !t.completed && t.deadline && isOverdue(t.deadline));

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`p-2 min-h-[80px] border-b border-r border-gray-50 dark:border-gray-700/50 cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm ${
                    isToday ? 'bg-indigo-600 text-white font-bold' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {day}
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {dayTasks.slice(0, 2).map(task => (
                      <div key={task.id} className={`text-[10px] px-1 py-0.5 rounded truncate ${task.completed ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : hasOverdue ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'}`}>
                        {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-[10px] text-gray-400 px-1">+{dayTasks.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day Detail */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
          {selectedDay ? (
            <>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                {new Date(year, month, selectedDay).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              {/* Tasks */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  <i className="fa-solid fa-list-check mr-2"></i>Tasks ({selectedDayTasks.length})
                </h4>
                {selectedDayTasks.length === 0 ? (
                  <p className="text-xs text-gray-400 dark:text-gray-500">No tasks due</p>
                ) : (
                  <div className="space-y-2">
                    {selectedDayTasks.map(task => {
                      const subject = subjects.find(s => s.id === task.subjectId);
                      return (
                        <div key={task.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                          <i className={`fa-solid fa-circle text-[8px] ${getPriorityColor(task.priority)}`}></i>
                          <span className={`text-xs flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>{task.title}</span>
                          {subject && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: subject.color }}></span>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Classes */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  <i className="fa-solid fa-chalkboard mr-2"></i>Classes ({selectedDayClasses.length})
                </h4>
                {selectedDayClasses.length === 0 ? (
                  <p className="text-xs text-gray-400 dark:text-gray-500">No classes scheduled</p>
                ) : (
                  <div className="space-y-2">
                    {selectedDayClasses.sort((a, b) => a.startTime.localeCompare(b.startTime)).map(entry => (
                      <div key={entry.id} className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: entry.color + '20' }}>
                        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{entry.subjectName}</p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">
                            {formatTime(entry.startTime)} - {formatTime(entry.endTime)}
                            {entry.location && ` · ${entry.location}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <i className="fa-solid fa-calendar-day text-3xl text-gray-300 dark:text-gray-600 mb-3"></i>
              <p className="text-sm text-gray-500 dark:text-gray-400">Select a day to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
