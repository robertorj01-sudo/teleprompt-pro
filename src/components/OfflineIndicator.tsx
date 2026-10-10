import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { AppLanguage } from '../utils/i18n';

interface OfflineIndicatorProps {
  lang?: AppLanguage;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ lang = 'pt' }) => {
  const isEn = lang === 'en';
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/90 text-neutral-950 font-semibold text-xs shadow-lg backdrop-blur-xs animate-in fade-in">
      <WifiOff className="w-3.5 h-3.5" />
      <span>
        {isEn
          ? 'Offline Mode Active — Teleprompter Pro works 100% offline'
          : 'Modo Offline Ativo — O Teleprompter funciona 100% sem internet'}
      </span>
    </div>
  );
};
