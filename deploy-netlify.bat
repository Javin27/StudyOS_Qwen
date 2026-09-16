@echo off
REM ============================================
REM StudyOS - Quick Deploy to Netlify
REM ============================================

echo.
echo ========================================
echo   Deploying StudyOS to Netlify
echo ========================================
echo.
echo This will deploy your app to a live URL
echo that you can open on your Android phone!
echo.

REM Check if Netlify CLI is installed
where netlify >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Netlify CLI not found. Installing...
    echo.
    call npm install -g netlify-cli
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install Netlify CLI
        pause
        exit /b 1
    )
)

echo.
echo [1/3] Building application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to build application
    pause
    exit /b 1
)

echo.
echo [2/3] Logging into Netlify...
echo (A browser window will open - please login)
echo.
call netlify login

echo.
echo [3/3] Deploying to Netlify...
call netlify deploy --prod --dir=dist

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your app is now live!
echo.
echo NEXT STEPS:
echo 1. Copy the URL shown above
echo 2. Open it on your Android phone (Chrome)
echo 3. Tap "Install" when the banner appears
echo 4. StudyOS is now on your home screen!
echo.
echo The app works offline and feels like a native app!
echo.
pause
