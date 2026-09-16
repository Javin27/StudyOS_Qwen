import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { getPomodoroSessions } from '../utils/storage';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export default function PomodoroTimer() {
  const { settings, completePomodoroSession } = useApp();
  const { pomodoro } = settings;

  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(pomodoro.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const modeRef = useRef(mode);
  const sessionsRef = useRef(sessions);

  // Keep refs in sync
  modeRef.current = mode;
  sessionsRef.current = sessions;

  const pomodoroHistory = getPomodoroSessions();
  const todayCount = pomodoroHistory.find(s => s.date === new Date().toISOString().split('T')[0])?.count || 0;

  const getDuration = useCallback((m: TimerMode) => {
    switch (m) {
      case 'work': return pomodoro.workDuration * 60;
      case 'shortBreak': return pomodoro.shortBreak * 60;
      case 'longBreak': return pomodoro.longBreak * 60;
    }
  }, [pomodoro]);

  useEffect(() => {
    setTimeLeft(getDuration(mode));
    setIsRunning(false);
  }, [mode, getDuration]);

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Play notification sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.3;
      oscillator.start();
      setTimeout(() => { oscillator.stop(); audioCtx.close(); }, 300);
    } catch (e) { /* ignore audio errors */ }

    const currentMode = modeRef.current;
    const currentSessions = sessionsRef.current;

    if (currentMode === 'work') {
      const newSessions = currentSessions + 1;
      setSessions(newSessions);
      setTotalSessions(prev => prev + 1);
      completePomodoroSession();

      if (newSessions % pomodoro.sessionsBeforeLongBreak === 0) {
        setMode('longBreak');
        if (pomodoro.autoStartBreaks) {
          setTimeout(() => setIsRunning(true), 100);
        }
      } else {
        setMode('shortBreak');
        if (pomodoro.autoStartBreaks) {
          setTimeout(() => setIsRunning(true), 100);
        }
      }
    } else {
      setMode('work');
      if (pomodoro.autoStartPomodoros) {
        setTimeout(() => setIsRunning(true), 100);
      }
    }
  }, [pomodoro, completePomodoroSession]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft, handleTimerComplete]);

  const reset = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(getDuration(mode));
  };

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setMode(newMode);
    setTimeLeft(getDuration(newMode));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = 1 - (timeLeft / getDuration(mode));
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  const modeColors = {
    work: { ring: '#6366f1', bg: 'from-indigo-500 to-purple-500' },
    shortBreak: { ring: '#22c55e', bg: 'from-green-500 to-emerald-500' },
    longBreak: { ring: '#3b82f6', bg: 'from-blue-500 to-cyan-500' },
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pomodoro Timer</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Stay focused, take breaks</p>
      </div>

      {/* Mode Selector */}
      <div className="flex justify-center gap-2">
        {(['work', 'shortBreak', 'longBreak'] as TimerMode[]).map(m => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === m
                ? `bg-gradient-to-r ${modeColors[m].bg} text-white shadow-md`
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {m === 'work' ? 'Focus' : m === 'shortBreak' ? 'Short Break' : 'Long Break'}
          </button>
        ))}
      </div>

      {/* Timer Circle */}
      <div className="flex justify-center">
        <div className="relative w-72 h-72">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 260 260">
            <circle
              cx="130" cy="130" r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="130" cy="130" r="120"
              fill="none"
              stroke={modeColors[mode].ring}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-mono font-bold text-gray-800 dark:text-white">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 capitalize">
              {mode === 'work' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-3 rounded-xl text-white font-medium transition-all shadow-lg hover:shadow-xl ${
            isRunning
              ? 'bg-orange-500 hover:bg-orange-600'
              : `bg-gradient-to-r ${modeColors[mode].bg} hover:opacity-90`
          }`}
        >
          <i className={`fa-solid ${isRunning ? 'fa-pause' : 'fa-play'} mr-2`}></i>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <i className="fa-solid fa-rotate-right mr-2"></i>
          Reset
        </button>
        <button
          onClick={handleTimerComplete}
          className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <i className="fa-solid fa-forward-step mr-2"></i>
          Skip
        </button>
      </div>

      {/* Session Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{sessions}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Current Cycle</p>
          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: pomodoro.sessionsBeforeLongBreak }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${i < sessions % pomodoro.sessionsBeforeLongBreak ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalSessions}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This Session</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{todayCount}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Today's Total</p>
        </div>
      </div>

      {/* Weekly History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Last 7 Days</h3>
        <div className="flex items-end justify-between h-32 gap-2">
          {Array.from({ length: 7 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            const dateStr = date.toISOString().split('T')[0];
            const count = pomodoroHistory.find(s => s.date === dateStr)?.count || 0;
            const maxCount = Math.max(...pomodoroHistory.map(s => s.count), 1);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">{count}</span>
                <div
                  className="w-full max-w-[32px] bg-gradient-to-t from-purple-500 to-indigo-500 rounded-t-md transition-all duration-500"
                  style={{ height: `${(count / maxCount) * 80}%`, minHeight: count > 0 ? '8px' : '2px' }}
                ></div>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
