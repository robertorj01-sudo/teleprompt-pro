import React from 'react';
import { Play, Maximize2, Minimize2, FileText, Monitor, HelpCircle, FolderOpen, Smartphone, Mic, MicOff, Crown, QrCode, Tag, Globe } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { LicenseStatus } from '../types/teleprompter';
import { AppLanguage } from '../utils/i18n';

interface NavbarProps {
  lang: AppLanguage;
  onToggleLang: () => void;
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
  lang,
  onToggleLang,
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
  const isEn = lang === 'en';

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
          <span>{isEn ? 'Script Editor' : 'Roteiro & Edição'}</span>
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
          <span>{isEn ? 'Studio Reader' : 'Estúdio de Leitura'}</span>
        </button>

        <button
          onClick={onOpenLibrary}
          className="hidden sm:flex px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors items-center gap-1.5 cursor-pointer"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>{isEn ? 'Library' : 'Biblioteca'}</span>
        </button>

        <button
          onClick={onOpenGooglePlay}
          className="hidden xl:flex px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors items-center gap-1.5 cursor-pointer"
          title={isEn ? 'Google Play Store Publishing Guide' : 'Guia e checklist para publicar na Google Play Store'}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Google Play</span>
        </button>

        {onOpenAppSumo && (
          <button
            onClick={onOpenAppSumo}
            className="hidden lg:flex px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors items-center gap-1.5 cursor-pointer"
            title={isEn ? 'AppSumo Launch Guide & CSV Code Generator' : 'Guia de Lançamento no AppSumo & Gerador de Códigos CSV'}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>AppSumo LTD</span>
          </button>
        )}

        {onOpenMobileTest && (
          <button
            onClick={onOpenMobileTest}
            className="hidden sm:flex px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors items-center gap-1.5 cursor-pointer"
            title={isEn ? 'Open QR Code to test on Mobile (Android / iOS)' : 'Abrir QR Code para testar no celular (Android / iOS)'}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{isEn ? 'Mobile QR' : 'Testar no Celular'}</span>
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
            title={isEn ? 'Hands-free Voice Control (Web Speech API)' : 'Comandos por voz hands-free (Web Speech API)'}
          >
            {isListeningVoice ? <Mic className="w-3.5 h-3.5 text-rose-400" /> : <MicOff className="w-3.5 h-3.5" />}
            <span>{isEn ? 'Voice Control' : 'Controle por Voz'}</span>
          </button>
        )}

        <button
          onClick={onOpenShortcuts}
          className="hidden md:flex px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors items-center gap-1.5 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isEn ? 'Shortcuts' : 'Atalhos'}</span>
        </button>
      </nav>

      {/* Zone 3: Language Switcher, PRO License & Primary Actions */}
      <div className="flex items-center gap-2">
        {/* Language Toggle (EN / PT) */}
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 text-xs font-bold transition-colors cursor-pointer"
          title={isEn ? 'Switch to Portuguese (PT-BR)' : 'Mudar idioma para Inglês (EN-US)'}
        >
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono">{isEn ? 'EN' : 'PT'}</span>
        </button>

        {/* Selo / Botão de Licença PRO */}
        {licenseStatus.isPro ? (
          <button
            onClick={() => onOpenUpgradeModal()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all shadow-xs cursor-pointer"
            title={isEn ? 'Lifetime PRO License Active' : 'Licença Vitalícia Ativa (Clique para ver detalhes)'}
          >
            <Crown className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span className="hidden sm:inline">{isEn ? 'PRO Lifetime' : 'PRO Vitalício'}</span>
          </button>
        ) : (
          <button
            onClick={() => onOpenUpgradeModal()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-extrabold shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            title={isEn ? 'Get Lifetime PRO License ($29 One-Time or Redeem AppSumo Code)' : 'Adquirir Licença Vitalícia por R$ 97,00 (ou Resgatar Código AppSumo)'}
          >
            <Crown className="w-3.5 h-3.5 fill-current" />
            <span>{isEn ? 'Get PRO ($29)' : 'Seja PRO (R$ 97)'}</span>
          </button>
        )}

        <PWAInstallButton lang={lang} />

        <button
          onClick={onToggleFullscreen}
          className={`p-2 rounded-xl transition-colors cursor-pointer ${
            isFullscreen
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800'
          }`}
          title={isEn ? 'Toggle Fullscreen (F)' : 'Alternar Tela Cheia (F)'}
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
            {isPlaying
              ? isEn
                ? 'Pause (Space)'
                : 'Pausar (Espaço)'
              : isEn
              ? 'Start Reading'
              : 'Iniciar Leitura'}
          </button>
        ) : (
          <button
            onClick={() => onSelectView('prompter')}
            className="px-4 py-2 text-xs md:text-sm font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            <span>{isEn ? 'Open Prompter' : 'Abrir Prompter'}</span>
          </button>
        )}
      </div>
    </header>
  );
};
