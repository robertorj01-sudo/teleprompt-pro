import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Check } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Se já estiver rodando em standalone (instalado ou via APK/TWA), esconde o botão
  if (isInstalled) {
    return null;
  }

  // Fluxo Chromium / Android / Desktop Chrome / Edge
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
        title="Instalar como aplicativo no seu dispositivo"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Instalar App</span>
      </button>
    );
  }

  // Fluxo iOS Safari (Add to Home Screen)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 text-xs font-medium transition-all cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
          <span className="hidden sm:inline">Instalar no iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl text-neutral-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Instalar no iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-neutral-300 space-y-3 leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="font-bold text-amber-400 font-mono">1.</span>
                  <span>Toque no botão <strong>Compartilhar</strong> (ícone do quadrado com a seta para cima) na barra inferior do Safari.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-amber-400 font-mono">2.</span>
                  <span>Role a lista para baixo e toque em <strong>Adicionar à Tela de Início</strong>.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-amber-400 font-mono">3.</span>
                  <span>Toque em <strong>Adicionar</strong> no canto superior direito para abrir em tela cheia sem barras de navegação!</span>
                </p>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-xl bg-amber-500 hover:bg-amber-400 py-2.5 text-xs font-bold text-neutral-950 transition-colors cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
