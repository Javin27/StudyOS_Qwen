import React from 'react';
import { useApp } from '../context/AppContext';
import { getGreeting, getDaysUntil, isOverdue, getPriorityColor } from '../utils/helpers';
import { getPomodoroSessions } from '../utils/storage';

export default function Dashboard() {
  const { tasks, notes, subjects, settings, setCurrentPage } = useApp();
  const pomodoroSessions = getPomodoroSessions();

  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.deadline === today && !t.completed);
  const overdueTasks = tasks.filter(t => t.deadline && !t.completed && isOverdue(t.deadline));
  const completedToday = tasks.filter(t => t.completedAt && t.completedAt.startsWith(today));
  const pendingTasks = tasks.filter(t => !t.completed);

  // Calculate streak
  const streak = React.useMemo(() => {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const hasCompleted = tasks.some(t => t.completedAt && t.completedAt.startsWith(dateStr));
      const hasPomodoro = pomodoroSessions.some(s => s.date === dateStr);
      if (hasCompleted || hasPomodoro) count++;
      else if (i > 0) break;
    }
    return count;
  }, [tasks, pomodoroSessions]);

  // Weekly completion
  const weeklyData = React.useMemo(() => {
    const data: { day: string; completed: number; total: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const completed = tasks.filter(t => t.completedAt && t.completedAt.startsWith(dateStr)).length;
      const total = tasks.filter(t => t.createdAt <= dateStr + 'T23:59:59').length;
      data.push({ day: dayName, completed, total });
    }
    return data;
  }, [tasks]);

  const completionRate = tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;

  const upcomingDeadlines = tasks
    .filter(t => !t.completed && t.deadline)
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
    .slice(0, 5);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {getGreeting()}, {settings.userName}! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here's your study overview</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="fa-list-check"
          label="Total Tasks"
          value={tasks.length}
          color="bg-blue-500"
          onClick={() => setCurrentPage('tasks')}
        />
        <StatCard
          icon="fa-circle-check"
          label="Completed"
          value={tasks.filter(t => t.completed).length}
          color="bg-green-500"
          subtext={`${completionRate}% done`}
        />
        <StatCard
          icon="fa-fire"
          label="Streak"
          value={streak}
          color="bg-orange-500"
          subtext="days"
        />
        <StatCard
          icon="fa-clock"
          label="Pomodoros"
          value={pomodoroSessions.reduce((sum, s) => sum + s.count, 0)}
          color="bg-purple-500"
          subtext="total sessions"
          onClick={() => setCurrentPage('pomodoro')}
        />
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Weekly Progress</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {weeklyData.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center justify-end h-28">
                  <div
                    className="w-full max-w-[32px] bg-indigo-500 dark:bg-indigo-400 rounded-t-md transition-all duration-500"
                    style={{ height: `${day.total > 0 ? (day.completed / Math.max(day.total, 1)) * 100 : 10}%`, minHeight: '4px' }}
                  ></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{day.completed}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Focus */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Today's Focus</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <span className="text-sm text-gray-700 dark:text-gray-300">Tasks due today</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{todayTasks.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <span className="text-sm text-gray-700 dark:text-gray-300">Overdue</span>
              <span className="font-bold text-red-600 dark:text-red-400">{overdueTasks.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-sm text-gray-700 dark:text-gray-300">Completed today</span>
              <span className="font-bold text-green-600 dark:text-green-400">{completedToday.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <span className="text-sm text-gray-700 dark:text-gray-300">Daily goal</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">{completedToday.length}/{settings.dailyGoal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Deadlines</h3>
            <button onClick={() => setCurrentPage('tasks')} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">View all</button>
          </div>
          {upcomingDeadlines.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No upcoming deadlines 🎉</p>
          ) : (
            <div className="space-y-2">
              {upcomingDeadlines.map(task => {
                const days = getDaysUntil(task.deadline!);
                return (
                  <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <i className={`fa-solid fa-circle text-xs ${getPriorityColor(task.priority)}`}></i>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{task.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {days < 0 ? `${Math.abs(days)} days overdue` : days === 0 ? 'Due today' : `${days} days left`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Task Completion</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{completionRate}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${completionRate}%` }}></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{subjects.length}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Subjects</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{notes.length}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Notes</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{pendingTasks.length}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, subtext, onClick }: {
  icon: string; label: string; value: number; color: string; subtext?: string; onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-md ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
          <i className={`fa-solid ${icon} text-white text-sm`}></i>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      </div>
      {subtext && <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{subtext}</p>}
    </div>
  );
}
