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

echo [1/3] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/3] Building application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to build application
    pause
    exit /b 1
)

echo.
echo [3/3] Creating Windows installer...
call npx electron-builder --win --x64
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to create Windows app
    pause
    exit /b 1
)

echo.
echo ========================================
echo   BUILD COMPLETE!
echo ========================================
echo.
echo Your Windows app is ready in the 'release' folder:
echo.
echo   StudyOS-Setup-1.0.0-x64.exe  (Installer)
echo.
echo Double-click the .exe file to install StudyOS!
echo.
pause
