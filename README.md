# 📚 StudyOS - Student Productivity Dashboard

A modern, cross-platform student productivity application built with React, TypeScript, and Electron/Capacitor. StudyOS helps students stay organized with task management, note-taking, timetable scheduling, Pomodoro timer, and more.

![StudyOS](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Android%20%7C%20Windows-orange)

## ✨ Features

### 📋 Task Management
- Create, edit, and delete tasks
- Priority levels (Low, Medium, High, Urgent)
- Deadline tracking with overdue notifications
- Subject association
- Completion tracking
- Search and filter capabilities

### 📝 Note Taking
- Rich note creation with color coding
- Subject organization
- Search functionality
- Quick edit and delete

### 📅 Timetable
- Weekly schedule grid view
- Subject-based color coding
- Location tracking
- Easy class management

### ⏱️ Pomodoro Timer
- Configurable work/break durations
- Session tracking
- Auto-start options
- Visual progress indicator
- Sound notifications
- Weekly statistics

### 📊 Subject Tracker
- Subject management with icons and colors
- Progress tracking per subject
- Task completion statistics
- Visual progress bars

### 📆 Calendar View
- Monthly calendar with task indicators
- Day detail view
- Class schedule integration
- Deadline visualization

### ⚙️ Settings
- Dark mode toggle
- Customizable Pomodoro settings
- Profile management
- Data export/import
- Daily goal setting

### 🌐 Cross-Platform
- **Web App**: Progressive Web App (PWA) with offline support
- **Android**: Native APK via Capacitor
- **Windows**: Desktop app via Electron

## 🚀 Quick Start

### Web App (Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Android APK

```bash
# Option 1: Use build script
chmod +x build-android.sh
./build-android.sh

# Option 2: Manual steps
npm install
npm run build
npx cap sync android
npx cap open android
# Build in Android Studio
```

### Windows Desktop

```bash
# Option 1: Use build script
build-windows.bat

# Option 2: Manual steps
npm install
npm run build
npx electron-builder --win
```

## 📱 Platform-Specific Instructions

### Android APK

**Prerequisites:**
- Node.js 18+
- Android Studio
- Java JDK 17+

**Build Steps:**
1. Run `./build-android.sh` or follow manual steps
2. Open project in Android Studio
3. Build → Build APK
4. Find APK at `android/app/build/outputs/apk/debug/app-debug.apk`

**Install on Device:**
- Enable "Developer Options" and "USB Debugging" on your Android device
- Connect via USB
- Run `adb install app-debug.apk`
- Or transfer APK file and install manually

### Windows Desktop

**Prerequisites:**
- Node.js 18+
- Windows 10/11

**Build Steps:**
1. Run `build-windows.bat` or follow manual steps
2. Find installer at `release/StudyOS-Setup-1.0.0-x64.exe`
3. Run installer to install StudyOS

**Portable Version:**
- Use `release/StudyOS-Portable-1.0.0-x64.exe`
- No installation required
- Can run from USB drive

### Progressive Web App (PWA)

**Deploy to Web:**
```bash
npm run build
# Deploy 'dist' folder to any web host (Vercel, Netlify, etc.)
```

**Install on Device:**
1. Visit your deployed URL in Chrome/Edge/Safari
2. Click "Install" button or use browser menu → "Install app"
3. App works offline!

## 🏗️ Project Structure

```
studyos/
├── src/                      # React source code
│   ├── components/          # UI components
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── Dashboard.tsx    # Main dashboard
│   │   ├── Tasks.tsx        # Task management
│   │   ├── Notes.tsx        # Note taking
│   │   ├── Timetable.tsx    # Weekly schedule
│   │   ├── PomodoroTimer.tsx # Pomodoro timer
│   │   ├── SubjectTracker.tsx # Subject management
│   │   ├── Calendar.tsx     # Calendar view
│   │   └── Settings.tsx     # App settings
│   ├── context/             # React Context
│   │   └── AppContext.tsx   # Global state management
│   ├── hooks/               # Custom React hooks
│   │   └── useElectron.ts   # Electron integration
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Type definitions
│   ├── utils/               # Utility functions
│   │   ├── helpers.ts       # Helper functions
│   │   └── storage.ts       # LocalStorage wrapper
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
│   ├── manifest.json        # PWA manifest
│   ├── sw.js                # Service worker
│   └── icon.svg             # App icon
├── electron/                # Electron desktop app
│   ├── main.js              # Main process
│   └── preload.js           # Preload script
├── capacitor.config.json    # Capacitor (Android) config
├── electron-builder.json    # Electron build config
├── build-android.sh         # Android build script
├── build-windows.bat        # Windows build script
├── BUILD_INSTRUCTIONS.md    # Detailed build guide
└── package.json             # Dependencies & scripts
```

## 🎨 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Persistence**: LocalStorage
- **Desktop**: Electron
- **Mobile**: Capacitor
- **Build Tools**: Vite, electron-builder
- **Icons**: Font Awesome 6

## 📊 Data Storage

StudyOS uses browser LocalStorage for data persistence:
- Tasks, notes, subjects, timetable entries
- User settings and preferences
- Pomodoro session history
- All data stored locally on device

**Export/Import:**
- Settings → Data Management → Export Data
- Creates JSON backup file
- Import from any device

## 🔧 Configuration

### Capacitor (Android)
Edit `capacitor.config.json`:
```json
{
  "appId": "com.yourcompany.studyos",
  "appName": "StudyOS",
  "webDir": "dist"
}
```

### Electron (Windows)
Edit `electron-builder.json`:
```json
{
  "appId": "com.yourcompany.studyos",
  "productName": "StudyOS"
}
```

## 🐛 Troubleshooting

### Common Issues

**Android build fails:**
- Ensure Android SDK is installed
- Check Java version (17+)
- Run `sdkmanager --licenses`

**Windows build fails:**
- Run as Administrator
- Check antivirus exclusions
- Increase Node memory: `set NODE_OPTIONS=--max-old-space-size=4096`

**PWA not installable:**
- Must be served over HTTPS
- Check manifest.json is valid
- Ensure service worker registers

**Data not persisting:**
- Check browser storage permissions
- Clear cache and reload
- Export data regularly as backup

## 📝 Development

### Adding New Features

1. Create component in `src/components/`
2. Add types in `src/types/index.ts`
3. Update context in `src/context/AppContext.tsx`
4. Add navigation in `src/components/Sidebar.tsx`
5. Update routing in `src/App.tsx`

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Tailwind CSS for styling
- Consistent naming conventions
- Component-based architecture

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Electron and Capacitor teams for cross-platform tools
- Font Awesome for beautiful icons

## 📞 Support

For issues, questions, or suggestions:
- Check [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md)
- Review troubleshooting section
- Open an issue on GitHub

---

**Made with ❤️ for students everywhere**

**Study smarter, not harder! 📚✨**
