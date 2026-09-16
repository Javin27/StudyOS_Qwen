# 📚 StudyOS - Student Productivity Dashboard

A modern, cross-platform student productivity application built with React, TypeScript, and Electron/Capacitor. StudyOS helps students stay organized with task management, note-taking, timetable scheduling, Pomodoro timer, and more.

![StudyOS](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Android%20%7C%20Windows-orange)

---

## 🚀 Quick Start

**New to StudyOS?** Start here:

1. **Install on Windows** → See [Windows Installation](#-windows-laptop-installation)
2. **Install on Android** → See [Android Installation](#-android-phone-installation)
3. **Learn the features** → See [Features](#-features)

---

## 📦 Installation Guide

### 🖥️ Windows Laptop Installation

#### What You Need:
- ✅ Windows 10 or 11
- ✅ Node.js 18+ (already installed)
- ✅ Project files downloaded

#### Step-by-Step Instructions:

**Step 1: Build the Windows App**

Open Command Prompt in your StudyOS folder and run:
```bash
build-windows-simple.bat
```

Wait 2-5 minutes. You'll see progress messages like:
```
[1/3] Installing dependencies...
[2/3] Building application...
[3/3] Creating Windows installer...
```

**Step 2: Find the Installer**

After the build completes, look for a new folder called `release` in your project directory:
```
📁 StudyOS/
   └── 📁 release/
       └── 📄 StudyOS-Setup-1.0.0-x64.exe  ← This is your installer!
```

**Step 3: Install the App**

1. Double-click `StudyOS-Setup-1.0.0-x64.exe`
2. Follow the installer (Next → Next → Install)
3. Launch StudyOS from Start Menu or Desktop shortcut

**✅ That's it! StudyOS is now installed on your Windows laptop.**

#### Troubleshooting Windows Installation:

**Build fails?**
- Make sure you ran `npm install` first
- Try running Command Prompt as Administrator
- Check if antivirus is blocking - add exception for the project folder

**Can't find the release folder?**
- Wait for the build to complete fully
- Check the Command Prompt for error messages
- Try running `npm run build` manually first

**Installer won't run?**
- Right-click the .exe file → Run as Administrator
- Check Windows SmartScreen - click "More info" → "Run anyway"

---

### 📱 Android Phone Installation

#### What You Need:
- ✅ Your Windows laptop (to deploy the app)
- ✅ Android phone with Chrome browser
- ✅ Internet connection (for initial setup only)

**Important:** Your phone needs ZERO commands! You only run commands on your laptop.

#### Step-by-Step Instructions:

**Step 1: Deploy from Your Laptop (Do this ONCE)**

On your Windows laptop, open Command Prompt in the StudyOS folder and run:
```bash
deploy-netlify.bat
```

Follow the prompts:
- A browser window opens → Login to Netlify (free account, use Google/GitHub/Email)
- Wait 30 seconds for deployment
- You'll see a URL like: `https://studyos-abc123.netlify.app`
- **COPY THIS URL** (you need it for your phone)

**That's all you do on the laptop!**

**Step 2: Get the URL to Your Phone**

Send the URL to your phone using any method:
- Email it to yourself
- Send via WhatsApp
- Text message to yourself
- Write it down and type it on your phone

**Step 3: Install on Your Phone (NO COMMANDS!)**

On your Android phone:

1. **Open Chrome browser** (must be Chrome, not Safari or other browsers)

2. **Paste/type the URL** and go to it

3. **Wait 3 seconds** → You'll see a purple banner at the bottom that says "Install StudyOS"

4. **Tap "Install Now"**

5. **Confirm** when the popup asks

6. **✅ DONE!** StudyOS icon appears on your home screen!

#### What You Get:
- ✅ App icon on home screen (like any app from Play Store)
- ✅ Opens full-screen (no browser address bar)
- ✅ Works completely offline (no internet needed after install)
- ✅ All features work perfectly
- ✅ Fast and smooth performance
- ✅ Automatic updates (just refresh the page)

#### Troubleshooting Android Installation:

**Install button doesn't appear?**
- Make sure you're using **Chrome browser** (not Firefox, Safari, etc.)
- Clear Chrome cache: Settings → Apps → Chrome → Storage → Clear cache
- Reload the page and wait 5 seconds
- Try tapping the **⋮** menu (three dots, top right) → Look for "Install app" or "Add to Home screen"

**App shows browser bar after install?**
- You didn't install it properly
- Uninstall and reinstall using the install prompt
- Make sure you tapped "Install" not just bookmarked the page

**Netlify deploy fails?**
- Run `npm install -g netlify-cli` first
- Try `netlify login` separately
- Check your internet connection

**Can't send URL to phone?**
- Open the URL on your laptop
- Use QR code generator to create a QR code
- Scan QR code with your phone camera

---

### 🌐 Web Browser Installation (Alternative)

If you don't want to install, you can use StudyOS directly in your browser:

1. Deploy to Netlify (see Android instructions above)
2. Open the URL in any browser
3. Use the app directly - no installation needed!

**Note:** The app works offline after first load, but you won't have a home screen icon.

---

## 🎯 Which Installation Method Should I Choose?

| Platform | Method | Time | Difficulty | Best For |
|----------|--------|------|------------|----------|
| **Windows** | Build .exe installer | 5 min | Easy | Daily use on laptop |
| **Android** | Deploy to Netlify | 2 min | Super Easy | Phone users |
| **Any Device** | Use in browser | 0 min | Easiest | Quick access, no install |

**Recommendation:**
- **Windows users:** Build the .exe installer for best experience
- **Android users:** Deploy to Netlify and install as PWA (works like a native app!)
- **Everyone:** Use in browser for quick access without installation

---

## ✨ Features

### 📋 Task Management
- Create, edit, and delete tasks
- Priority levels (Low, Medium, High, Urgent)
- Deadline tracking with overdue notifications
- Subject association
- Completion tracking
- Search and filter capabilities
- Sort by deadline, priority, or creation date

### 📝 Note Taking
- Rich note creation with color coding
- Subject organization
- Search functionality
- Quick edit and delete
- Responsive grid layout

### 📅 Timetable
- Weekly schedule grid view (Monday-Friday, 7AM-8PM)
- Subject-based color coding
- Location tracking
- Click-to-add interface
- Easy class management

### ⏱️ Pomodoro Timer
- Configurable work/break durations
- Session tracking (current cycle, total, daily)
- Auto-start options for breaks and work sessions
- Visual circular progress indicator
- Sound notifications using Web Audio API
- Weekly statistics chart
- Skip and reset controls

### 📊 Subject Tracker
- Subject management with custom icons and colors
- Progress tracking per subject
- Task completion statistics
- Visual progress bars
- 12 emoji icons to choose from

### 📆 Calendar View
- Monthly calendar with task indicators
- Day detail panel
- Class schedule integration
- Navigation (prev/next month, today)
- Color-coded by priority and status

### 📊 Dashboard
- Welcome greeting with user name
- Statistics cards (tasks, completed, streak, pomodoros)
- Weekly progress chart
- Today's focus panel
- Upcoming deadlines list
- Overview with progress bar

### ⚙️ Settings
- Dark mode toggle (persisted)
- Profile management (name, daily goal)
- Pomodoro customization (work/break durations)
- Data export (JSON backup)
- Data import (restore from backup)
- Clear all data with confirmation

---

## 🎨 Usage Guide

### First Time Setup

1. **Add your subjects** - Go to Subjects tab, add your classes with colors and icons
2. **Create some tasks** - Add assignments, exams, projects with priorities and deadlines
3. **Set up timetable** - Add your weekly class schedule
4. **Try Pomodoro** - Start a focus session (25 min work, 5 min break)
5. **Take notes** - Jot down important points in the Notes tab

### Daily Workflow

**Morning:**
- Check dashboard for today's tasks
- Review upcoming deadlines

**Study Sessions:**
- Use Pomodoro timer (25 min work, 5 min break)
- Take notes during study sessions
- Mark tasks as completed

**Evening:**
- Review completed tasks
- Plan tomorrow's tasks
- Check calendar for upcoming deadlines

### Pro Tips

- ⭐ Use **priority levels** to focus on urgent tasks
- 🎨 **Color-code** your subjects for visual organization
- 📊 Check **dashboard statistics** to track your progress
- 🌙 Enable **dark mode** for comfortable night studying
- 💾 **Export data** regularly as backup (Settings → Export)
- 📱 Install on phone for on-the-go access
- ⌨️ Use keyboard shortcuts on desktop (Ctrl+1-8 for navigation)

---

## 🔒 Data Privacy & Storage

- ✅ All data stored locally on your device
- ✅ No internet connection required (after initial load)
- ✅ No data sent to any server
- ✅ You control your data completely
- ✅ Export anytime for backup (JSON format)
- ✅ Import data on any device

---

## 🛠️ Technical Details

### Tech Stack
- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Data Persistence:** LocalStorage
- **Desktop:** Electron
- **Mobile:** Capacitor + PWA
- **Build Tools:** Vite, electron-builder
- **Icons:** Font Awesome 6

### Project Structure
```
studyos/
├── src/                      # React source code
│   ├── components/          # UI components (8 main pages)
│   ├── context/             # Global state management
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript definitions
│   ├── utils/               # Helper functions & storage
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
│   ├── manifest.json        # PWA manifest
│   ├── sw.js                # Service worker
│   └── icon.svg             # App icon
├── electron/                # Desktop app
│   ├── main.js              # Electron main process
│   └── preload.js           # Preload script
├── capacitor.config.json    # Android app configuration
├── electron-builder.json    # Windows build configuration
├── build-windows-simple.bat # Windows build script
├── deploy-netlify.bat       # Netlify deployment script
└── package.json             # Dependencies & scripts
```

### Keyboard Shortcuts (Desktop)
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

---

## 🐛 Troubleshooting

### Common Issues

**App won't start (Windows)**
- Clear browser cache
- Check internet connection (first load only)
- Try different browser
- Reinstall the app

**Data not saving**
- Check browser storage permissions
- Ensure cookies/storage not blocked
- Try incognito/private mode test
- Export data regularly as backup

**Build fails (Windows)**
- Run as Administrator
- Disable antivirus temporarily
- Check Node.js version (18+)
- Increase Node memory: `set NODE_OPTIONS=--max-old-space-size=4096`

**PWA not installable (Android)**
- Must be served over HTTPS (Netlify provides this)
- Check manifest.json is valid
- Ensure service worker registers
- Use Chrome browser
- Clear browser cache

**Dark mode not working**
- Refresh the page
- Check browser settings
- Clear cache and reload

---

## 📚 Learning Resources

### Study Techniques Built-In

**Pomodoro Technique:**
- Work for 25 minutes
- Take a 5-minute break
- Repeat 4 times
- Take a longer 15-minute break
- Great for maintaining focus

**Time Blocking:**
- Schedule specific tasks at specific times
- Use the timetable feature
- Stick to your schedule

**Active Recall:**
- Test yourself instead of re-reading
- Use notes to create questions
- Review regularly

**Spaced Repetition:**
- Review material at increasing intervals
- Use calendar to schedule reviews
- Focus on difficult topics more often

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Test Windows build
build-windows-simple.bat

# Deploy to Netlify
deploy-netlify.bat
```

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Electron and Capacitor teams for cross-platform tools
- Font Awesome for beautiful icons
- Netlify for free hosting and deployment

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- Check the troubleshooting sections above
- Review the detailed guides
- Open an issue on GitHub

---

## 🎓 What Makes StudyOS Special?

✅ **Cross-Platform:** Works on Windows, Android, and any web browser  
✅ **Offline-First:** Works without internet after initial load  
✅ **Privacy-Focused:** All data stored locally on your device  
✅ **Modern UI:** Clean, beautiful interface with dark mode  
✅ **Feature-Rich:** Tasks, notes, timetable, Pomodoro, calendar, and more  
✅ **Easy Installation:** Simple setup for both desktop and mobile  
✅ **Free & Open Source:** MIT license, no cost, no ads  

---

## 🚀 Quick Reference

### Installation Commands

**Windows Laptop:**
```bash
build-windows-simple.bat
```

**Android Phone (via Netlify):**
```bash
deploy-netlify.bat
```

**Development:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
```

---

**Made with ❤️ for students everywhere**

**Study smarter, not harder! 📚✨**

---

## 📖 Additional Documentation

- **INSTALLATION_GUIDE.md** - Complete installation walkthrough
- **PHONE_INSTALL_EASY.md** - Simple phone installation guide
- **GET_ANDROID_APP.md** - Android app options
- **ANDROID_INSTALL_GUIDE.md** - Detailed Android steps
- **BUILD_INSTRUCTIONS.md** - Technical build guide
- **QUICKSTART.md** - Quick start for users
- **PROJECT_SUMMARY.md** - Project overview

---

**Version:** 1.0.0  
**Last Updated:** 2025  
**Platforms:** Windows 10/11, Android (via PWA), Web Browsers
