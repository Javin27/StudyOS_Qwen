# 🚀 StudyOS - Quick Start Guide

## What is StudyOS?

StudyOS is a complete student productivity application that runs on:
- 🌐 **Web browsers** (as a Progressive Web App)
- 📱 **Android phones** (as an APK)
- 🖥️ **Windows computers** (as a desktop app)

## ✨ What Can You Do?

### 📋 Manage Tasks
- Create tasks with priorities (Low, Medium, High, Urgent)
- Set deadlines and track completion
- Organize by subject
- Filter and search

### 📝 Take Notes
- Create colorful notes
- Organize by subject
- Search through all notes
- Quick edit and delete

### 📅 Plan Your Schedule
- Weekly timetable view
- Add classes with times and locations
- Color-coded by subject
- Click to add/edit

### ⏱️ Focus with Pomodoro
- 25-minute focus sessions (customizable)
- Automatic break tracking
- Session statistics
- Sound notifications

### 📊 Track Progress
- Subject-wise progress bars
- Completion statistics
- Weekly charts
- Streak tracking

### 📆 View Calendar
- Monthly calendar view
- See tasks and classes
- Click any day for details
- Never miss a deadline

## 🎯 Getting Started

### Option 1: Use the Web App (Easiest)

1. **Open the app** in your browser
2. **Start using it immediately** - no installation needed!
3. **Install as app** (optional):
   - Chrome/Edge: Click "Install" icon in address bar
   - Safari: Share → Add to Home Screen
   - Works offline after installation!

### Option 2: Build Android APK

**You need:**
- A computer with Node.js installed
- Android Studio (free from developer.android.com)
- An Android phone (for testing)

**Steps:**
```bash
# 1. Install dependencies
npm install

# 2. Build the app
npm run build

# 3. Sync with Android
npx cap sync android

# 4. Open in Android Studio
npx cap open android

# 5. In Android Studio:
#    - Build → Build APK
#    - Transfer APK to your phone
#    - Install and enjoy!
```

**Or use the automated script:**
```bash
chmod +x build-android.sh
./build-android.sh
```

### Option 3: Build Windows Desktop App

**You need:**
- Windows 10 or 11
- Node.js installed

**Steps:**
```bash
# Just run the build script!
build-windows.bat

# Or manually:
npm install
npm run build
npx electron-builder --win
```

**Find your app at:**
- `release/StudyOS-Setup-1.0.0-x64.exe` (Installer)
- `release/StudyOS-Portable-1.0.0-x64.exe` (Portable)

## 💡 Tips for Success

### First Time Setup
1. **Add your subjects** - Go to Subjects tab, add your classes
2. **Create some tasks** - Add assignments, exams, projects
3. **Set up timetable** - Add your weekly class schedule
4. **Try Pomodoro** - Start a focus session!

### Daily Workflow
1. **Morning**: Check dashboard for today's tasks
2. **Study sessions**: Use Pomodoro timer (25 min work, 5 min break)
3. **Take notes**: Jot down important points in Notes tab
4. **Evening**: Review completed tasks, plan tomorrow

### Pro Tips
- ⭐ Use **priority levels** to focus on urgent tasks
- 🎨 **Color-code** your subjects for visual organization
- 📊 Check **dashboard statistics** to track your progress
- 🌙 Enable **dark mode** for comfortable night studying
- 💾 **Export data** regularly as backup (Settings → Export)

## 🎨 Customization

### Change Your Name
Settings → Profile → Display Name

### Adjust Pomodoro Timer
Settings → Pomodoro Timer
- Work duration (default: 25 min)
- Short break (default: 5 min)
- Long break (default: 15 min)

### Set Daily Goals
Settings → Profile → Daily Task Goal

### Dark Mode
Settings → Appearance → Dark Mode toggle

## 📱 Mobile Features

### Touch-Friendly
- Large buttons for easy tapping
- Swipe-friendly interface
- Optimized for small screens

### Offline Support
- Works without internet (PWA)
- All data stored locally
- Sync when back online

### Install on Phone
1. Open app in Chrome/Safari
2. Tap "Install" or "Add to Home Screen"
3. App icon appears like native app!

## 🖥️ Desktop Features

### Keyboard Shortcuts
- `Ctrl+1` - Dashboard
- `Ctrl+2` - Tasks
- `Ctrl+3` - Notes
- `Ctrl+4` - Timetable
- `Ctrl+5` - Pomodoro
- `Ctrl+6` - Subjects
- `Ctrl+7` - Calendar
- `Ctrl+8` - Settings
- `Ctrl+E` - Export data
- `Ctrl+I` - Import data

### Menu Options
- File → Export/Import data
- View → Fullscreen mode
- Navigate → Quick page switching

## 🔒 Data Privacy

- ✅ All data stored locally on your device
- ✅ No internet connection required
- ✅ No data sent to any server
- ✅ You control your data completely
- ✅ Export anytime for backup

## 🐛 Troubleshooting

### App won't start
- Clear browser cache
- Check internet connection (first load only)
- Try different browser

### Data not saving
- Check browser storage permissions
- Ensure cookies/storage not blocked
- Try incognito/private mode test

### Build fails (Android)
- Install Android Studio properly
- Accept SDK licenses: `sdkmanager --licenses`
- Check Java version (17+)

### Build fails (Windows)
- Run as Administrator
- Disable antivirus temporarily
- Check Node.js version (18+)

## 📚 Learning Resources

- **Pomodoro Technique**: Work 25 min, break 5 min, repeat
- **Time Blocking**: Schedule specific tasks at specific times
- **Active Recall**: Test yourself instead of re-reading
- **Spaced Repetition**: Review material at increasing intervals

## 🎓 Study Smarter, Not Harder!

StudyOS is designed to help you:
- Stay organized and focused
- Track your progress
- Build good study habits
- Achieve your academic goals

**Remember:** The best productivity system is the one you actually use!

---

**Need help?** Check [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md) or [README.md](README.md)

**Happy studying! 📚✨**
