#!/bin/bash

# StudyOS Android APK Build Script
# This script builds the StudyOS app as an Android APK

echo "🔨 Building StudyOS Android APK..."
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm"
    exit 1
fi

if [ ! -d "android" ]; then
    echo "⚠️  Android project not found. Running Capacitor sync..."
    npx cap add android 2>/dev/null || true
fi

echo "✅ Prerequisites check complete"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build web app
echo ""
echo "🌐 Building web app..."
npm run build

# Sync with Capacitor
echo ""
echo "🔄 Syncing with Capacitor..."
npx cap sync android

echo ""
echo "✅ Build complete!"
echo ""
echo "📱 Next steps:"
echo "   1. Open Android Studio:"
echo "      npx cap open android"
echo ""
echo "   2. In Android Studio:"
echo "      - Build → Build Bundle(s) / APK(s) → Build APK(s)"
echo "      - Or use: cd android && ./gradlew assembleDebug"
echo ""
echo "   3. Find APK at:"
echo "      android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "📖 For detailed instructions, see BUILD_INSTRUCTIONS.md"
