import React, { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone);

    // Check if Android
    setIsAndroid(/android/i.test(navigator.userAgent));

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show banner after 3 seconds if not dismissed before
      const dismissed = localStorage.getItem('studyos_install_dismissed');
      if (!dismissed && !isStandalone) {
        setTimeout(() => setShowBanner(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if app was installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowBanner(false);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('studyos_install_dismissed', 'true');
  };

  // Don't show if already installed
  if (isInstalled) return null;

  // Show Android-specific install instructions
  if (isAndroid && !deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl p-5 z-50 animate-slideUp">
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-download text-2xl"></i>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Install StudyOS</h3>
            <p className="text-sm text-white/90 mb-3">
              Use StudyOS like a native app on your phone!
            </p>
            <div className="bg-white/10 rounded-lg p-3 text-xs space-y-1">
              <p className="font-semibold mb-2">📱 How to install:</p>
              <p>1. Tap the <i className="fa-solid fa-ellipsis-vertical"></i> menu (top right)</p>
              <p>2. Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></p>
              <p>3. Confirm installation</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show install banner for browsers that support PWA install
  if (!showBanner || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl p-5 z-50 animate-slideUp">
      <button 
        onClick={handleDismiss}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <i className="fa-solid fa-graduation-cap text-2xl"></i>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">Install StudyOS</h3>
          <p className="text-sm text-white/90 mb-3">
            Get the full app experience with offline support!
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="flex-1 bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-white/90 transition-colors text-sm"
            >
              <i className="fa-solid fa-download mr-2"></i>
              Install Now
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
