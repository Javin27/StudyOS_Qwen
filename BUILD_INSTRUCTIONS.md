# StudyOS - Build Instructions

## 📱 Building Android APK

### Prerequisites
- Node.js 18+ and npm
- Android Studio (with Android SDK)
- Java JDK 17+
- Gradle (comes with Android Studio)

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build the web app**
   ```bash
   npm run build
   ```

3. **Sync with Capacitor**
   ```bash
   npx cap sync android
   ```

4. **Open in Android Studio**
   ```bash
   npx cap open android
   ```

5. **Build APK in Android Studio**
   - In Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Or use command line:
     ```bash
     cd android
     ./gradlew assembleDebug    # Debug APK
     ./gradlew assembleRelease  # Release APK
     ```

6. **Find your APK**
   - Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
   - Release: `android/app/build/outputs/apk/release/app-release.apk`

### For Signed Release APK
1. Generate a keystore:
   ```bash
   keytool -genkey -v -keystore studyos.keystore -alias studyos -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Update `android/app/build.gradle` with signing config

3. Build signed APK:
   ```bash
   ./gradlew assembleRelease
   ```

---

## 🖥️ Building Windows Desktop App

### Prerequisites
- Node.js 18+ and npm
- Windows 10/11 (for building Windows app)

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build the web app**
   ```bash
   npm run build
   ```

3. **Build Windows installer**
   ```bash
   npx electron-builder --win
   ```

4. **Find your installer**
   - NSIS Installer: `release/StudyOS-Setup-1.0.0-x64.exe`
   - Portable version: `release/StudyOS-Portable-1.0.0-x64.exe`

### Build Options

**NSIS Installer (Recommended)**
- Full installer with uninstaller
- Start menu shortcuts
- Desktop shortcut option
- ```bash
  npx electron-builder --win --x64
  ```

**Portable EXE**
- No installation required
- Runs from USB or any folder
- ```bash
  npx electron-builder --win portable
  ```

**Both formats**
```bash
npx electron-builder --win nsis portable
```

---

## 🌐 Progressive Web App (PWA)

StudyOS is also available as a PWA that can be installed on any device:

1. **Deploy the web app** to any web server or hosting service
2. **Visit the URL** in Chrome/Edge/Safari
3. **Click "Install"** when prompted (or use browser menu → "Install app")

The PWA works offline and behaves like a native app!

---

## 📦 Quick Build Commands

### Android APK
```bash
npm install
npm run build
npx cap sync android
npx cap open android
# Then build in Android Studio
```

### Windows Desktop
```bash
npm install
npm run build
npx electron-builder --win
```

### Development Mode
```bash
npm run dev          # Web app
npx cap run android  # Android device/emulator
npx electron .       # Desktop app
```

---

## 🔧 Troubleshooting

### Android Build Issues
- **Gradle sync failed**: Ensure Android SDK is properly installed
- **Java version error**: Use Java 17+ (`java -version`)
- **SDK license not accepted**: Run `sdkmanager --licenses`

### Windows Build Issues
- **Code signing errors**: Can be ignored for development builds
- **Antivirus blocking**: Add exception for build folder
- **Memory errors**: Increase Node memory: `NODE_OPTIONS=--max-old-space-size=4096`

### PWA Issues
- **Not installable**: Ensure HTTPS and valid manifest.json
- **Offline not working**: Check service worker registration
- **Cache issues**: Clear browser cache and reload

---

## 📱 App Features

- ✅ Task management with priorities and deadlines
- ✅ Note-taking with color coding
- ✅ Weekly timetable grid
- ✅ Pomodoro timer with session tracking
- ✅ Subject tracking with progress
- ✅ Monthly calendar view
- ✅ Dark mode
- ✅ Data export/import
- ✅ Offline support (PWA)
- ✅ Responsive design (mobile, tablet, desktop)

---

## 📄 File Structure

```
studyos/
├── src/                    # React source code
├── public/                 # Static assets & PWA files
│   ├── manifest.json      # PWA manifest
│   ├── sw.js              # Service worker
│   └── icon.svg           # App icon
├── electron/              # Electron desktop app
│   ├── main.js           # Main process
│   └── preload.js        # Preload script
├── android/              # Android project (after cap sync)
├── capacitor.config.json # Capacitor configuration
├── electron-builder.json # Electron build config
└── package.json          # Dependencies & scripts
```

---

## 🚀 Publishing

### Google Play Store (Android)
1. Build signed release APK/AAB
2. Create developer account ($25 one-time fee)
3. Upload to Play Console
4. Fill store listing, screenshots, description
5. Submit for review (1-7 days)

### Microsoft Store (Windows)
1. Build signed MSIX package
2. Create Microsoft Developer account
3. Upload to Partner Center
4. Submit for certification

### Alternative Distribution
- **Android**: Distribute APK directly via website/email
- **Windows**: Distribute EXE installer via website
- **Web**: Deploy to Vercel, Netlify, or GitHub Pages

---

## 💡 Tips

- Test on real devices before publishing
- Use `npm run build` before any packaging
- Keep dependencies updated: `npm update`
- Backup your keystore files securely
- Test offline functionality thoroughly
- Optimize images for mobile (use WebP)

---

## 📞 Support

For issues or questions:
- Check troubleshooting section above
- Review Capacitor docs: https://capacitorjs.com/docs
- Review Electron docs: https://www.electronjs.org/docs

---

**Happy Studying! 📚✨**
