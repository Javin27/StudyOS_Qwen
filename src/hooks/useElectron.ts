import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';

// Hook for Electron desktop app integration
export function useElectron() {
  const { setCurrentPage } = useApp();

  useEffect(() => {
    // Check if running in Electron
    if (typeof window !== 'undefined' && (window as any).electronAPI) {
      const api = (window as any).electronAPI;

      // Listen for navigation events from menu
      api.onNavigate((page: Page) => {
        setCurrentPage(page);
      });

      // Listen for export/import events
      api.onExport(() => {
        // Trigger export
        const event = new CustomEvent('studyos-export');
        window.dispatchEvent(event);
      });

      api.onImport(() => {
        // Trigger import
        const event = new CustomEvent('studyos-import');
        window.dispatchEvent(event);
      });
    }
  }, [setCurrentPage]);
}

// Hook for PWA install prompt
export function usePWAInstall() {
  useEffect(() => {
    let deferredPrompt: any;

    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);
}
