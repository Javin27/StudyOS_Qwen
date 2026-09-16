# 📱 Get StudyOS on Android - Two Easy Options

## ⭐ Option 1: Install as Web App (EASIEST - 2 minutes)

**This works EXACTLY like an APK!** The app will have its own icon, open full-screen, and work offline.

### Steps:

1. **Deploy the app online** (pick one):

   **A. Netlify (Recommended)**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```
   → You'll get a link like `https://studyos-abc123.netlify.app`

   **B. Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

   **C. GitHub Pages**
   - Push to GitHub
   - Settings → Pages → Deploy from branch → `dist` folder

2. **Open the link on your Android phone** (Chrome browser)

3. **Tap "Install" button** that appears automatically

4. **Done!** StudyOS is now on your home screen like a regular app!

### What You Get:
✅ App icon on home screen  
✅ Opens full-screen (no browser bar)  
✅ Works offline  
✅ Fast and smooth  
✅ No Play Store needed  

---

## 🔨 Option 2: Build Real APK (Using GitHub Actions - Free)

**This creates an actual .apk file you can upload to GitHub Releases.**

### Steps:

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/studyos.git
   git push -u origin main
   ```

2. **GitHub Actions will automatically build the APK**
   - Go to your repo on GitHub
   - Click "Actions" tab
   - You'll see the build running (takes 3-5 minutes)

3. **Download the APK**
   - When build completes, go to "Releases" section
   - Download `StudyOS-APK.zip`
   - Extract to get `app-debug.apk`

4. **Install on Android**
   - Transfer APK to your phone
   - Enable "Install from unknown sources" in Settings
   - Tap the APK file to install

### What You Get:
✅ Real .apk file  
✅ Can upload to GitHub Releases  
✅ Share with anyone  
✅ Install on multiple devices  

---

## 🎯 Which Option Should You Choose?

| Feature | PWA Install | Real APK |
|---------|-------------|----------|
| **Setup Time** | 2 minutes | 5 minutes |
| **Difficulty** | Super Easy | Easy |
| **Auto Updates** | ✅ Yes | ❌ Manual |
| **App Icon** | ✅ Yes | ✅ Yes |
| **Full Screen** | ✅ Yes | ✅ Yes |
| **Offline** | ✅ Yes | ✅ Yes |
| **Play Store** | ❌ No | ❌ No |
| **Shareable** | ✅ Link | ✅ APK file |

**Recommendation:** Use **Option 1 (PWA)** if you want the easiest solution. It works identically to an APK for end users!

---

## 🚀 Quick Start - Deploy to Netlify Now

```bash
# 1. Install Netlify CLI (one time only)
npm install -g netlify-cli

# 2. Login to Netlify (creates free account)
netlify login

# 3. Deploy the app
netlify deploy --prod --dir=dist

# 4. Copy the URL it gives you
# 5. Open that URL on your Android phone
# 6. Tap "Install" - Done!
```

That's it! You now have StudyOS installed on your Android phone like a native app.

---

## 📲 Installing on Android (Step-by-Step)

### For PWA:
1. Open the deployed URL in **Chrome**
2. Wait for the install banner to appear (or tap ⋮ menu)
3. Tap **"Install app"** or **"Add to Home screen"**
4. Confirm installation
5. StudyOS icon appears on your home screen!

### For APK:
1. Download the .apk file from GitHub Releases
2. Transfer to your Android phone (USB, email, cloud)
3. Open **Settings → Security → Unknown sources** → Enable
4. Tap the APK file in your file manager
5. Tap **"Install"**
6. Done!

---

## 🔄 Updating the App

### PWA:
- Just refresh the page - updates automatically!
- Or wait for automatic background update

### APK:
- Build new APK with GitHub Actions
- Download from Releases
- Install over old version (keeps your data)

---

## 💡 Pro Tips

1. **Bookmark the PWA URL** for easy sharing
2. **Test on multiple browsers** - Chrome works best for PWA install
3. **Use HTTPS** - required for PWA install (Netlify/Vercel provide this automatically)
4. **Clear cache** if install banner doesn't appear: Settings → Apps → Chrome → Clear data

---

## 🆘 Troubleshooting

**"Install button doesn't appear"**
- Make sure you're using Chrome on Android
- Try clearing browser cache
- Ensure site is served over HTTPS

**"APK won't install"**
- Enable "Unknown sources" in Android settings
- Try a different file manager app
- Check if APK downloaded completely

**"App shows browser bar"**
- Make sure you installed via the install button (not just bookmarked)
- Uninstall and reinstall using the install prompt

---

## 🎉 You're All Set!

You now have **two ways** to get StudyOS on Android:
1. **PWA** - Deploy online, install from browser (easiest!)
2. **APK** - Build with GitHub Actions, install manually

Both work great. Pick whichever is easier for you!

**Need help?** Check the main README.md or BUILD_INSTRUCTIONS.md
