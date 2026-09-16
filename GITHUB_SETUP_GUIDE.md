# 🚀 GitHub Setup Guide - Step by Step

## Don't worry! This is easy to fix.

You deleted your repository, but your code is still on your computer. We just need to create a new repository and push your code again.

---

## 📋 What You Need

1. ✅ Your StudyOS project folder on your computer
2. ✅ Git installed (if not, download from https://git-scm.com/download/win)
3. ✅ GitHub account (you already have one!)

---

## 🎯 Quick Method (Recommended)

### Option 1: Use the Automated Script

1. **Double-click `setup-github.bat`** in your project folder
2. **Follow the instructions** it shows on screen
3. **Paste your repository URL** when asked
4. **Done!** Your code will be on GitHub automatically

The script will guide you through everything step by step.

---

## 🔧 Manual Method (If Script Doesn't Work)

### Step 1: Create New Repository on GitHub

1. Go to **https://github.com/new**
2. Fill in the details:
   - **Repository name**: `studyos` (or whatever you want)
   - **Description**: `Student Productivity Dashboard` (optional)
   - **Public** or **Private**: Your choice
   - **⚠️ IMPORTANT**: DO NOT check "Add a README file"
   - **⚠️ IMPORTANT**: DO NOT add .gitignore or license
3. Click **"Create repository"**

### Step 2: Copy the Repository URL

After creating, GitHub will show you a page with setup instructions.

Look for the section that says **"…or push an existing repository from the command line"**

Copy the URL that looks like:
```
https://github.com/YOUR_USERNAME/studyos.git
```

### Step 3: Open Command Prompt

1. Open your StudyOS project folder
2. Click the address bar at the top (where it shows the folder path)
3. Type `cmd` and press Enter

### Step 4: Run These Commands (Copy-Paste One by One)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - StudyOS v1.0.0"

# Set main branch
git branch -M main

# Add your GitHub repository (REPLACE with YOUR URL!)
git remote add origin https://github.com/YOUR_USERNAME/studyos.git

# Push to GitHub
git push -u origin main
```

**⚠️ Important**: Replace `YOUR_USERNAME` with your actual GitHub username!

### Step 5: GitHub Login Popup

When you run the last command, a popup will appear:

1. **"Sign in to GitHub"** → Click "Sign in with browser"
2. **Browser opens** → Login to your GitHub account
3. **Go back to the popup** → Click "Sign in"
4. **Wait for it to complete**

### Step 6: Verify Success

Go to your GitHub repository page and refresh it.

You should see all your StudyOS files there! ✅

---

## 🎉 That's It!

Your code is now on GitHub. The GitHub Actions workflow will automatically build your Android APK.

---

## 🐛 Troubleshooting

### Error: "Git is not recognized"
**Solution**: Install Git from https://git-scm.com/download/win, then restart Command Prompt

### Error: "Authentication failed"
**Solution**: 
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate a new token
3. Use the token as your password when prompted

### Error: "Updates were rejected"
**Solution**: Run this command:
```bash
git push -u origin main --force
```

### Error: "Remote origin already exists"
**Solution**: Run these commands:
```bash
git remote remove origin
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

### Nothing happens after git push
**Solution**: Make sure you're in the correct folder (your StudyOS project folder)

---

## 📱 Next Steps After GitHub Setup

Once your code is on GitHub:

1. **Go to your repository page**
2. **Click "Actions" tab** at the top
3. **Wait 3-5 minutes** for the build to complete
4. **Click "Releases"** on the right side
5. **Download your APK** file
6. **Install on your Android phone!**

---

## 🆘 Still Having Issues?

### Check These First:
- ✅ Are you in the correct folder? (should see src/, public/, package.json)
- ✅ Is Git installed? (run `git --version` to check)
- ✅ Are you logged into GitHub?
- ✅ Did you copy the correct repository URL?

### Quick Reset (If Everything Fails)

If nothing works, try this clean start:

```bash
# Remove git folder
rmdir /s .git

# Start fresh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

---

## 💡 Pro Tips

1. **Save your repository URL** somewhere safe for future use
2. **Use GitHub Desktop** if command line is confusing (https://desktop.github.com)
3. **Keep your code backed up** on GitHub regularly
4. **Use meaningful commit messages** when updating code

---

## 🎯 Summary

**Easiest Method**: Run `setup-github.bat` and follow the prompts

**Manual Method**: 
1. Create repo on GitHub
2. Copy URL
3. Run git commands in Command Prompt
4. Login when prompted
5. Done!

**Time Required**: 5-10 minutes

**Difficulty**: Easy (just follow the steps)

---

## 📞 Need More Help?

- GitHub Docs: https://docs.github.com
- Git Tutorial: https://git-scm.com/book/en/v2
- Common Git Problems: https://github.com/git-guides

---

**You've got this! Just follow the steps one by one, and you'll have your code on GitHub in no time. 🚀**
