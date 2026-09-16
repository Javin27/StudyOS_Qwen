// LocalStorage-based database simulation for StudyOS
import { Subject, Task, Note, TimetableEntry, AppSettings } from '../types';

const KEYS = {
  subjects: 'studyos_subjects',
  tasks: 'studyos_tasks',
  notes: 'studyos_notes',
  timetable: 'studyos_timetable',
  settings: 'studyos_settings',
  pomodoroSessions: 'studyos_pomodoro_sessions',
};

const defaultSettings: AppSettings = {
  darkMode: false,
  pomodoro: {
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLongBreak: 4,
    autoStartBreaks: false,
    autoStartPomodoros: false,
  },
  userName: 'Student',
  dailyGoal: 5,
  notifications: true,
};

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

// Subjects
export function getSubjects(): Subject[] {
  return getItem<Subject[]>(KEYS.subjects, []);
}

export function saveSubjects(subjects: Subject[]): void {
  setItem(KEYS.subjects, subjects);
}

// Tasks
export function getTasks(): Task[] {
  return getItem<Task[]>(KEYS.tasks, []);
}

export function saveTasks(tasks: Task[]): void {
  setItem(KEYS.tasks, tasks);
}

// Notes
export function getNotes(): Note[] {
  return getItem<Note[]>(KEYS.notes, []);
}

export function saveNotes(notes: Note[]): void {
  setItem(KEYS.notes, notes);
}

// Timetable
export function getTimetable(): TimetableEntry[] {
  return getItem<TimetableEntry[]>(KEYS.timetable, []);
}

export function saveTimetable(entries: TimetableEntry[]): void {
  setItem(KEYS.timetable, entries);
}

// Settings
export function getSettings(): AppSettings {
  return getItem<AppSettings>(KEYS.settings, defaultSettings);
}

export function saveSettings(settings: AppSettings): void {
  setItem(KEYS.settings, settings);
}

// Pomodoro sessions tracking
export function getPomodoroSessions(): { date: string; count: number }[] {
  return getItem(KEYS.pomodoroSessions, []);
}

export function savePomodoroSession(): void {
  const sessions = getPomodoroSessions();
  const today = new Date().toISOString().split('T')[0];
  const existing = sessions.find(s => s.date === today);
  if (existing) {
    existing.count += 1;
  } else {
    sessions.push({ date: today, count: 1 });
  }
  // Keep only last 30 days
  const filtered = sessions.filter(s => {
    const daysDiff = (new Date().getTime() - new Date(s.date).getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= 30;
  });
  setItem(KEYS.pomodoroSessions, filtered);
}

// Clear all data
export function clearAllData(): void {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
}

// Export/import data
export function exportData(): string {
  const data = {
    subjects: getSubjects(),
    tasks: getTasks(),
    notes: getNotes(),
    timetable: getTimetable(),
    settings: getSettings(),
    pomodoroSessions: getPomodoroSessions(),
  };
  return JSON.stringify(data, null, 2);
}

export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.subjects) saveSubjects(data.subjects);
    if (data.tasks) saveTasks(data.tasks);
    if (data.notes) saveNotes(data.notes);
    if (data.timetable) saveTimetable(data.timetable);
    if (data.settings) saveSettings(data.settings);
    if (data.pomodoroSessions) setItem(KEYS.pomodoroSessions, data.pomodoroSessions);
    return true;
  } catch {
    return false;
  }
}
