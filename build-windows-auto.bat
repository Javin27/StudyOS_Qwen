@echo off
REM ============================================
REM StudyOS - Auto-Fix Build Script
REM This script automatically goes to the correct folder
REM ============================================

echo.
echo ========================================
echo   StudyOS Windows Builder
echo ========================================
echo.

REM Try to find the project folder automatically
echo Looking for StudyOS project folder...

REM Check common locations
if exist "%USERPROFILE%\Desktop\StudyOS_Qwen-main\package.json" (
    cd /d "%USERPROFILE%\Desktop\StudyOS_Qwen-main"
    goto :found
)

if exist "%USERPROFILE%\Desktop\My Folder\StudyOS_Qwen-main\package.json" (
    cd /d "%USERPROFILE%\Desktop\My Folder\StudyOS_Qwen-main"
    goto :found
)

if exist "C:\Users\HP\Desktop\My Folder\StudyOS_Qwen-main\package.json" (
    cd /d "C:\Users\HP\Desktop\My Folder\StudyOS_Qwen-main"
    goto :found
)

REM If not found, ask user
echo.
echo Could not find StudyOS folder automatically.
echo.
echo Please enter the full path to your StudyOS folder:
echo (Example: C:\Users\HP\Desktop\StudyOS_Qwen-main)
echo.
set /p PROJECT_PATH="Path: "

if exist "%PROJECT_PATH%\package.json" (
    cd /d "%PROJECT_PATH%"
    goto :found
) else (
    echo.
    echo ERROR: package.json not found in that folder!
    echo Please make sure you entered the correct path.
    pause
    exit /b 1
)

:found
echo.
echo ✓ Found project folder: %CD%
echo.

REM Now run the build
echo [Step 1/5] Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not found!
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js found

echo.
echo [Step 2/5] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed

echo.
echo [Step 3/5] Building web application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to build web app
    pause
    exit /b 1
)
echo ✓ Web app built

echo.
echo [Step 4/5] Verifying build output...
if not exist "dist\index.html" (
    echo ERROR: dist folder not created!
    pause
    exit /b 1
)
echo ✓ Build output verified

echo.
echo [Step 5/5] Creating Windows installer...
echo This may take 2-5 minutes...
echo.
call npx electron-builder --win --x64

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================
    echo   BUILD FAILED
    echo ========================================
    echo.
    echo Try these solutions:
    echo 1. Run Command Prompt as Administrator
    echo 2. Disable antivirus temporarily
    echo 3. Check error messages above
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   BUILD SUCCESSFUL!
echo ========================================
echo.

if exist "release\StudyOS-Setup-1.0.0-x64.exe" (
    echo ✓ Installer created successfully!
    echo.
    echo Location: %CD%\release\StudyOS-Setup-1.0.0-x64.exe
    echo.
    echo Next steps:
    echo 1. Open File Explorer
    echo 2. Go to: %CD%\release
    echo 3. Double-click StudyOS-Setup-1.0.0-x64.exe
    echo 4. Follow the installation wizard
    echo.
    
    REM Open the release folder automatically
    echo Opening release folder...
    start explorer "%CD%\release"
) else (
    echo WARNING: Build completed but installer not found.
    echo.
    echo Please check the 'release' folder manually:
    echo %CD%\release
    echo.
)

pause
