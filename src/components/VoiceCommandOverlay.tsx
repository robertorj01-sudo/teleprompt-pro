import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, HelpCircle } from 'lucide-react';
import { RecognizedCommand, VoiceLanguage } from '../hooks/useVoiceControl';

interface VoiceCommandOverlayProps {
  isListening: boolean;
  onToggleListening: () => void;
  language: VoiceLanguage;
  onToggleLanguage: () => void;
  lastCommand: RecognizedCommand | null;
  interimTranscript: string;
  onOpenVoiceModal: () => void;
  isFullscreen: boolean;
}

export const VoiceCommandOverlay: React.FC<VoiceCommandOverlayProps> = ({
  isListening,
  onToggleListening,
  language,
  onToggleLanguage,
  lastCommand,
  interimTranscript,
  onOpenVoiceModal,
  isFullscreen,
}) => {
  const [visibleCommand, setVisibleCommand] = useState<RecognizedCommand | null>(null);

  // Exibe o comando acionado com animação por 2.5s
  useEffect(() => {
    if (lastCommand) {
      setVisibleCommand(lastCommand);
      const timer = setTimeout(() => {
        setVisibleCommand(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [lastCommand]);

  return (
    <>
      {/* Banner Flutuante de Comando Acionado (Aparece no topo central com grande destaque visual) */}
      {visibleCommand && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-900/95 backdrop-blur-md border border-amber-500/50 shadow-2xl shadow-amber-500/20 text-white">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Mic className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400">Comando:</span>
              <span className="font-bold text-amber-300 uppercase tracking-wide">
                {visibleCommand.action}
              </span>
              <span className="text-neutral-500 font-mono italic">
                ("{visibleCommand.transcript}")
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Widget Compacto de Controle por Voz (Fixado no topo esquerdo do display) */}
      <div
        className={`fixed top-4 left-4 z-40 flex items-center gap-1.5 transition-all duration-200 ${
          isListening ? 'opacity-100' : 'opacity-80 hover:opacity-100'
        }`}
      >
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-900/85 backdrop-blur-md border border-white/10 shadow-lg text-white">
          {/* Botão de Ativar / Desativar Microfone */}
          <button
            onClick={onToggleListening}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
            }`}
            title={isListening ? 'Desativar controle por voz' : 'Ativar controle por voz hands-free'}
          >
            {isListening ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <Mic className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Voz Ativa</span>
              </>
            ) : (
              <>
                <MicOff className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden sm:inline">Voz</span>
              </>
            )}
          </button>

          {/* Seletor Rápido de Idioma (PT / EN) */}
          {isListening && (
            <button
              onClick={onToggleLanguage}
              className="px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[10px] font-mono font-bold text-amber-400 border border-neutral-700/60 transition-colors cursor-pointer"
              title="Clique para alternar entre Português e Inglês"
            >
              {language === 'pt-BR' ? 'PT-BR' : 'EN-US'}
            </button>
          )}

          {/* Prévia de Transcrição Instantânea */}
          {isListening && interimTranscript && (
            <span className="hidden md:inline px-2 text-[11px] text-neutral-300 font-mono italic max-w-[140px] truncate">
              "{interimTranscript}"
            </span>
          )}

          {/* Botão de Ajuda de Comandos */}
          <button
            onClick={onOpenVoiceModal}
            className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Ver lista de comandos de voz"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};
