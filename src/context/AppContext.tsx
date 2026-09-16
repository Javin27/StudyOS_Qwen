import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Subject, Task, Note, TimetableEntry, AppSettings, Page } from '../types';
import * as storage from '../utils/storage';
import { generateId } from '../utils/helpers';

interface AppContextType {
  // Navigation
  currentPage: Page;
  setCurrentPage: (page: Page) => void;

  // Subjects
  subjects: Subject[];
  addSubject: (subject: Omit<Subject, 'id' | 'createdAt'>) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;

  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;

  // Notes
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;

  // Timetable
  timetable: TimetableEntry[];
  addTimetableEntry: (entry: Omit<TimetableEntry, 'id'>) => void;
  updateTimetableEntry: (id: string, entry: Partial<TimetableEntry>) => void;
  deleteTimetableEntry: (id: string) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Pomodoro
  completePomodoroSession: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [settings, setSettings] = useState<AppSettings>(storage.getSettings());

  // Load data on mount
  useEffect(() => {
    setSubjects(storage.getSubjects());
    setTasks(storage.getTasks());
    setNotes(storage.getNotes());
    setTimetable(storage.getTimetable());
    setSettings(storage.getSettings());
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Subjects
  const addSubject = useCallback((subject: Omit<Subject, 'id' | 'createdAt'>) => {
    const newSubject: Subject = {
      ...subject,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...subjects, newSubject];
    setSubjects(updated);
    storage.saveSubjects(updated);
  }, [subjects]);

  const updateSubject = useCallback((id: string, updates: Partial<Subject>) => {
    const updated = subjects.map(s => s.id === id ? { ...s, ...updates } : s);
    setSubjects(updated);
    storage.saveSubjects(updated);
  }, [subjects]);

  const deleteSubject = useCallback((id: string) => {
    const updated = subjects.filter(s => s.id !== id);
    setSubjects(updated);
    storage.saveSubjects(updated);
  }, [subjects]);

  // Tasks
  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    storage.saveTasks(updated);
  }, [tasks]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    const updated = tasks.map(t => t.id === id ? { ...t, ...updates } : t);
    setTasks(updated);
    storage.saveTasks(updated);
  }, [tasks]);

  const deleteTask = useCallback((id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    storage.saveTasks(updated);
  }, [tasks]);

  const toggleTask = useCallback((id: string) => {
    const updated = tasks.map(t => {
      if (t.id === id) {
        const completed = !t.completed;
        return { ...t, completed, completedAt: completed ? new Date().toISOString() : null };
      }
      return t;
    });
    setTasks(updated);
    storage.saveTasks(updated);
  }, [tasks]);

  // Notes
  const addNote = useCallback((note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [...notes, newNote];
    setNotes(updated);
    storage.saveNotes(updated);
  }, [notes]);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    const updated = notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n);
    setNotes(updated);
    storage.saveNotes(updated);
  }, [notes]);

  const deleteNote = useCallback((id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    storage.saveNotes(updated);
  }, [notes]);

  // Timetable
  const addTimetableEntry = useCallback((entry: Omit<TimetableEntry, 'id'>) => {
    const newEntry: TimetableEntry = { ...entry, id: generateId() };
    const updated = [...timetable, newEntry];
    setTimetable(updated);
    storage.saveTimetable(updated);
  }, [timetable]);

  const updateTimetableEntry = useCallback((id: string, updates: Partial<TimetableEntry>) => {
    const updated = timetable.map(t => t.id === id ? { ...t, ...updates } : t);
    setTimetable(updated);
    storage.saveTimetable(updated);
  }, [timetable]);

  const deleteTimetableEntry = useCallback((id: string) => {
    const updated = timetable.filter(t => t.id !== id);
    setTimetable(updated);
    storage.saveTimetable(updated);
  }, [timetable]);

  // Settings
  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    const updated = { ...settings, ...updates };
    setSettings(updated);
    storage.saveSettings(updated);
  }, [settings]);

  // Pomodoro
  const completePomodoroSession = useCallback(() => {
    storage.savePomodoroSession();
  }, []);

  const value: AppContextType = {
    currentPage, setCurrentPage,
    subjects, addSubject, updateSubject, deleteSubject,
    tasks, addTask, updateTask, deleteTask, toggleTask,
    notes, addNote, updateNote, deleteNote,
    timetable, addTimetableEntry, updateTimetableEntry, deleteTimetableEntry,
    settings, updateSettings,
    completePomodoroSession,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
