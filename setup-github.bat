@echo off
REM ============================================
REM StudyOS - GitHub Setup Script
REM ============================================

echo.
echo ========================================
echo   Setting up StudyOS on GitHub
echo ========================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo Step 1: Checking git status...
git status >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit - StudyOS v1.0.0"
)

echo.
echo Step 2: Setting up GitHub repository...
echo.
echo ========================================
echo   IMPORTANT: Follow these steps FIRST
echo ========================================
echo.
echo 1. Go to: https://github.com/new
echo.
echo 2. Repository name: studyos
echo    (or any name you want)
echo.
echo 3. Keep it PUBLIC or PRIVATE (your choice)
echo.
echo 4. DO NOT add README, .gitignore, or license
echo    (we already have these files!)
echo.
echo 5. Click "Create repository"
echo.
echo 6. Copy the URL it gives you
echo    (looks like: https://github.com/YOUR_USERNAME/studyos.git)
echo.
echo ========================================
echo.
set /p REPO_URL="Paste your GitHub repository URL here: "

if "%REPO_URL%"=="" (
    echo ERROR: No URL provided!
    pause
    exit /b 1
)

echo.
echo Step 3: Connecting to GitHub...

REM Remove existing remote if any
git remote remove origin >nul 2>nul

REM Add new remote
git remote add origin %REPO_URL%

echo.
echo Step 4: Pushing code to GitHub...
echo.

REM Set branch name
git branch -M main

REM Push to GitHub
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================
    echo   Push failed! Trying alternative...
    echo ========================================
    echo.
    
    REM Try with force push if regular push fails
    git push -u origin main --force
    
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Could not push to GitHub!
        echo.
        echo Possible solutions:
        echo 1. Check if you're logged into GitHub
        echo 2. Make sure the repository URL is correct
        echo 3. Try: git push -u origin main
        echo.
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo   SUCCESS! 🎉
echo ========================================
echo.
echo Your code is now on GitHub!
echo.
echo Repository URL: %REPO_URL%
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Click "Actions" tab
echo 3. Watch the APK build automatically!
echo 4. Download APK from "Releases" section
echo.
pause
