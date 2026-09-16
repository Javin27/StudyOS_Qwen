@echo off
REM ============================================
REM StudyOS - Windows Desktop App Builder
REM ============================================

echo.
echo ========================================
echo   Building StudyOS for Windows
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Building web application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to build web application
    pause
    exit /b 1
)

echo.
echo [3/4] Creating Windows installer...
call npx electron-builder --win --x64 --config electron-builder.json
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to create Windows app
    echo.
    echo Common solutions:
    echo 1. Make sure electron and electron-builder are installed
    echo 2. Try running: npm install electron electron-builder --save-dev
    echo 3. Check if antivirus is blocking the build
    echo.
    pause
    exit /b 1
)

echo.
echo [4/4] Verifying build output...
if exist "release\StudyOS-Setup-1.0.0-x64.exe" (
    echo.
    echo ========================================
    echo   BUILD COMPLETE!
    echo ========================================
    echo.
    echo Your Windows app is ready in the 'release' folder:
    echo.
    echo   release\StudyOS-Setup-1.0.0-x64.exe
    echo.
    echo Double-click the .exe file to install StudyOS!
    echo.
) else (
    echo.
    echo WARNING: Build completed but installer not found.
    echo Check the 'release' folder for the output files.
    echo.
)

pause
