// StudyOS Type Definitions

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  subjectId: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline: string | null;
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subjectId: string | null;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimetableEntry {
  id: string;
  subjectId: string | null;
  subjectName: string;
  day: number; // 0-6 (Sun-Sat)
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  location: string;
  color: string;
}

export interface PomodoroSettings {
  workDuration: number; // minutes
  shortBreak: number; // minutes
  longBreak: number; // minutes
  sessionsBeforeLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

export interface AppSettings {
  darkMode: boolean;
  pomodoro: PomodoroSettings;
  userName: string;
  dailyGoal: number; // tasks per day
  notifications: boolean;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  totalNotes: number;
  totalSubjects: number;
  todayTasks: number;
  completedToday: number;
  streak: number;
  weeklyCompletion: number[];
}

export type Page = 'dashboard' | 'tasks' | 'notes' | 'timetable' | 'pomodoro' | 'subjects' | 'calendar' | 'settings';
