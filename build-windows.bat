@echo off
REM StudyOS Windows Desktop App Build Script
REM This script builds the StudyOS app as a Windows desktop application

echo.
echo Building StudyOS Windows Desktop App...
echo.

REM Check prerequisites
echo Checking prerequisites...

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed. Please install Node.js 18+
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed. Please install npm
    exit /b 1
)

echo Prerequisites check complete
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    exit /b 1
)

REM Build web app
echo.
echo Building web app...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to build web app
    exit /b 1
)

REM Build Windows app
echo.
echo Building Windows desktop app...
call npx electron-builder --win
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to build Windows app
    exit /b 1
)

echo.
echo Build complete!
echo.
echo Find your installer at:
echo   release\StudyOS-Setup-1.0.0-x64.exe
echo.
echo Portable version:
echo   release\StudyOS-Portable-1.0.0-x64.exe
echo.
echo For detailed instructions, see BUILD_INSTRUCTIONS.md
echo.
pause
