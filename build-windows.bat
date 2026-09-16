@echo off
REM ============================================
REM StudyOS - Simple Windows Build (Guaranteed to Work)
REM ============================================

echo.
echo ========================================
echo   Building StudyOS for Windows
echo ========================================
echo.

REM Step 1: Check Node.js
echo [Step 1/5] Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not found!
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js found

REM Step 2: Install dependencies
echo.
echo [Step 2/5] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed

REM Step 3: Build web app
echo.
echo [Step 3/5] Building web application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to build web app
    pause
    exit /b 1
)
echo ✓ Web app built

REM Step 4: Check if dist folder exists
echo.
echo [Step 4/5] Verifying build output...
if not exist "dist\index.html" (
    echo ERROR: dist folder not created!
    pause
    exit /b 1
)
echo ✓ Build output verified

REM Step 5: Build Windows installer
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
    echo Error: Could not create Windows installer
    echo.
    echo Try these solutions:
    echo 1. Run Command Prompt as Administrator
    echo 2. Disable antivirus temporarily
    echo 3. Try manual build: npx electron-builder --win --x64
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   BUILD SUCCESSFUL!
echo ========================================
echo.

REM Check if the file exists
if exist "release\StudyOS-Setup-1.0.0-x64.exe" (
    echo ✓ Installer created successfully!
    echo.
    echo Location: release\StudyOS-Setup-1.0.0-x64.exe
    echo.
    echo Next steps:
    echo 1. Open the 'release' folder
    echo 2. Double-click StudyOS-Setup-1.0.0-x64.exe
    echo 3. Follow the installation wizard
    echo.
) else (
    echo WARNING: Build completed but installer not found.
    echo.
    echo Please check the 'release' folder manually.
    echo The file might have a different name.
    echo.
)

pause
