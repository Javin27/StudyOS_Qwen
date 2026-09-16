// Utility functions for StudyOS

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

export function getDaysUntil(deadline: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  return Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function isOverdue(deadline: string): boolean {
  return getDaysUntil(deadline) < 0;
}

export function getDayName(day: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day];
}

export function getShortDayName(day: number): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[day];
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'urgent': return 'text-red-500';
    case 'high': return 'text-orange-500';
    case 'medium': return 'text-yellow-500';
    case 'low': return 'text-green-500';
    default: return 'text-gray-500';
  }
}

export function getPriorityBg(priority: string): string {
  switch (priority) {
    case 'urgent': return 'bg-red-100 dark:bg-red-900/30';
    case 'high': return 'bg-orange-100 dark:bg-orange-900/30';
    case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30';
    case 'low': return 'bg-green-100 dark:bg-green-900/30';
    default: return 'bg-gray-100 dark:bg-gray-800';
  }
}

export function getSubjectColors(): string[] {
  return [
    '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
    '#f97316', '#eab308', '#22c55e', '#14b8a6',
    '#06b6d4', '#3b82f6', '#a855f7', '#64748b',
  ];
}

export function validateTask(task: { title: string; deadline?: string | null }): string | null {
  if (!task.title.trim()) return 'Task title is required';
  if (task.title.length > 200) return 'Task title must be under 200 characters';
  if (task.deadline && isNaN(new Date(task.deadline).getTime())) return 'Invalid deadline date';
  return null;
}

export function validateNote(note: { title: string }): string | null {
  if (!note.title.trim()) return 'Note title is required';
  if (note.title.length > 200) return 'Note title must be under 200 characters';
  return null;
}

export function validateSubject(subject: { name: string }): string | null {
  if (!subject.name.trim()) return 'Subject name is required';
  if (subject.name.length > 100) return 'Subject name must be under 100 characters';
  return null;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
