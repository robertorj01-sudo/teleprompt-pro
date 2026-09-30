import React from 'react';
import { Play, Maximize2, Minimize2, FileText, Monitor, HelpCircle, FolderOpen, Smartphone, Mic, MicOff, Crown, QrCode, Tag } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { LicenseStatus } from '../types/teleprompter';

interface NavbarProps {
  currentView: 'editor' | 'prompter';
  onSelectView: (view: 'editor' | 'prompter') => void;
  onOpenLibrary: () => void;
  onOpenShortcuts: () => void;
  onOpenGooglePlay: () => void;
  onOpenAppSumo?: () => void;
  onOpenMobileTest?: () => void;
  onOpenVoiceGuide?: () => void;
  isListeningVoice?: boolean;
  onToggleVoice?: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onTogglePlay: () => void;
  isPlaying: boolean;
  licenseStatus: LicenseStatus;
  onOpenUpgradeModal: (feature?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  onOpenLibrary,
  onOpenShortcuts,
  onOpenGooglePlay,
  onOpenAppSumo,
  onOpenMobileTest,
  onOpenVoiceGuide,
  isListeningVoice = false,
  onToggleVoice,
  onToggleFullscreen,
  isFullscreen,
  onTogglePlay,
  isPlaying,
  licenseStatus,
  onOpenUpgradeModal,
}) => {
  return (
    <header className="w-full bg-neutral-950 border-b border-neutral-800/80 px-4 md:px-6 py-3 select-none flex items-center justify-between z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectView('editor');
          }}
          className="text-base md:text-lg font-bold tracking-tight text-white flex items-center gap-2 hover:text-amber-400 transition-colors"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Teleprompter Pro</span>
        </a>
      </div>

      {/* Zone 2: Navigation / Modes */}
      <nav className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => onSelectView('editor')}
          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            currentView === 'editor'
              ? 'bg-neutral-800 text-white shadow-xs'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Roteiro & Edição</span>
        </button>

        <button
          onClick={() => onSelectView('prompter')}
          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            currentView === 'prompter'
              ? 'bg-neutral-800 text-white shadow-xs'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Estúdio de Leitura</span>
        </button>

        <button
          onClick={onOpenLibrary}
          className="hidden sm:flex px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors items-center gap-1.5 cursor-pointer"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Biblioteca</span>
        </button>

        <button
          onClick={onOpenGooglePlay}
          className="hidden xl:flex px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors items-center gap-1.5 cursor-pointer"
          title="Guia e checklist para publicar na Google Play Store"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Google Play</span>
        </button>

        {onOpenAppSumo && (
          <button
            onClick={onOpenAppSumo}
            className="hidden lg:flex px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors items-center gap-1.5 cursor-pointer"
            title="Guia de Lançamento no AppSumo & Gerador de Códigos CSV"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>AppSumo LTD</span>
          </button>
        )}

        {onOpenMobileTest && (
          <button
            onClick={onOpenMobileTest}
            className="hidden sm:flex px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors items-center gap-1.5 cursor-pointer"
            title="Abrir QR Code para testar no celular (Android / iOS)"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Testar no Celular</span>
          </button>
        )}

        {onOpenVoiceGuide && (
          <button
            onClick={onOpenVoiceGuide}
            className={`hidden md:flex px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors items-center gap-1.5 cursor-pointer ${
              isListeningVoice
                ? 'text-rose-300 bg-rose-500/20 border border-rose-500/40 animate-pulse'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Comandos por voz hands-free (Web Speech API)"
          >
            {isListeningVoice ? <Mic className="w-3.5 h-3.5 text-rose-400" /> : <MicOff className="w-3.5 h-3.5" />}
            <span>Controle por Voz</span>
          </button>
        )}

        <button
          onClick={onOpenShortcuts}
          className="hidden md:flex px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors items-center gap-1.5 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Atalhos</span>
        </button>
      </nav>

      {/* Zone 3: Primary actions & PWA Install */}
      <div className="flex items-center gap-2">
        {/* Selo / Botão de Licença PRO */}
        {licenseStatus.isPro ? (
          <button
            onClick={() => onOpenUpgradeModal()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all shadow-xs cursor-pointer"
            title="Licença Vitalícia Ativa (Clique para ver detalhes)"
          >
            <Crown className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span className="hidden sm:inline">PRO Vitalício</span>
          </button>
        ) : (
          <button
            onClick={() => onOpenUpgradeModal()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-extrabold shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            title="Adquirir Licença Vitalícia por R$ 97,00 (Pagamento Único)"
          >
            <Crown className="w-3.5 h-3.5 fill-current" />
            <span>Seja PRO (R$ 97)</span>
          </button>
        )}

        <PWAInstallButton />

        <button
          onClick={onToggleFullscreen}
          className={`p-2 rounded-xl transition-colors cursor-pointer ${
            isFullscreen
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800'
          }`}
          title="Alternar Tela Cheia (F)"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {currentView === 'prompter' ? (
          <button
            onClick={onTogglePlay}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-black'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isPlaying ? 'Pausar (Espaço)' : 'Iniciar Leitura'}
          </button>
        ) : (
          <button
            onClick={() => onSelectView('prompter')}
            className="px-4 py-2 text-xs md:text-sm font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            <span>Abrir Prompter</span>
          </button>
        )}
      </div>
    </header>
  );
};
