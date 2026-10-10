import React from 'react';
import {
  X,
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  Radio,
} from 'lucide-react';
import { VoiceLanguage, RecognizedCommand } from '../hooks/useVoiceControl';
import { AppLanguage } from '../utils/i18n';

interface VoiceCommandsModalProps {
  lang: AppLanguage;
  isOpen: boolean;
  onClose: () => void;
  isListening: boolean;
  isSupported: boolean;
  onToggleListening: () => void;
  language: VoiceLanguage;
  onSelectLanguage: (lang: VoiceLanguage) => void;
  lastCommand: RecognizedCommand | null;
  interimTranscript: string;
}

export const VoiceCommandsModal: React.FC<VoiceCommandsModalProps> = ({
  lang,
  isOpen,
  onClose,
  isListening,
  isSupported,
  onToggleListening,
  language,
  onSelectLanguage,
  lastCommand,
  interimTranscript,
}) => {
  if (!isOpen) return null;

  const isEn = lang === 'en';

  const commandGroups = [
    {
      action: isEn ? 'Start Scrolling' : 'Iniciar Rolagem',
      en: ['"Start"', '"Play"', '"Go"', '"Resume"'],
      pt: ['"Iniciar"', '"Começar"', '"Continuar"', '"Vai"'],
    },
    {
      action: isEn ? 'Pause Reading' : 'Pausar Leitura',
      en: ['"Pause"', '"Stop"', '"Wait"'],
      pt: ['"Pausar"', '"Pausa"', '"Parar"', '"Espera"'],
    },
    {
      action: isEn ? 'Increase Speed' : 'Aumentar Velocidade',
      en: ['"Faster"', '"Speed up"', '"Quick"'],
      pt: ['"Mais rápido"', '"Acelerar"', '"Rápido"'],
    },
    {
      action: isEn ? 'Decrease Speed' : 'Diminuir Velocidade',
      en: ['"Slower"', '"Slow down"'],
      pt: ['"Mais devagar"', '"Devagar"', '"Reduzir"'],
    },
    {
      action: isEn ? 'Restart from Top' : 'Reiniciar do Início',
      en: ['"Restart"', '"From the top"', '"Beginning"'],
      pt: ['"Reiniciar"', '"Do início"', '"Voltar ao topo"'],
    },
    {
      action: isEn ? 'Optical Mirror' : 'Espelho Óptico (Mirror)',
      en: ['"Mirror"', '"Flip"'],
      pt: ['"Espelho"', '"Espelhar"', '"Inverter"'],
    },
    {
      action: isEn ? 'Cue Line' : 'Linha Guia (Cue Line)',
      en: ['"Cue"', '"Guide"', '"Line"'],
      pt: ['"Guia"', '"Linha"', '"Marcador"'],
    },
    {
      action: isEn ? 'Adjust Font Size' : 'Ajustar Tamanho da Fonte',
      en: ['"Bigger" / "Smaller"'],
      pt: ['"Aumentar fonte" / "Diminuir fonte"'],
    },
    {
      action: isEn ? 'Fullscreen' : 'Tela Cheia',
      en: ['"Fullscreen"'],
      pt: ['"Tela cheia"', '"Maximizar"'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                isListening
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 animate-pulse'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}
            >
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>
                  {isEn ? 'Hands-Free Voice Commands' : 'Comandos por Voz (Hands-Free)'}
                </span>
                {isListening && (
                  <span className="flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    {isEn ? 'Listening' : 'Ouvindo'}
                  </span>
                )}
              </h2>
              <p className="text-xs text-neutral-400">
                {isEn
                  ? 'Speak commands aloud to control the teleprompter completely hands-free'
                  : 'Fale comandos em voz alta para controlar o teleprompter sem usar as mãos'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar de Controle do Microfone */}
        <div className="px-6 py-3 bg-neutral-800/40 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleListening}
              disabled={!isSupported}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'
              } disabled:opacity-50`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>{isEn ? 'Disable Microphone' : 'Desativar Microfone'}</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>{isEn ? 'Enable Voice Recognition' : 'Ativar Reconhecimento por Voz'}</span>
                </>
              )}
            </button>

            {/* Seletor de Idioma */}
            <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-700">
              <button
                onClick={() => onSelectLanguage('en-US')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  language === 'en-US'
                    ? 'bg-neutral-700 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onSelectLanguage('pt-BR')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  language === 'pt-BR'
                    ? 'bg-neutral-700 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Português
              </button>
            </div>
          </div>

          {/* Feedback em tempo real */}
          {isListening && (
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
              <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span className="truncate max-w-[200px] text-neutral-400 italic">
                {interimTranscript || (isEn ? 'Speak now...' : 'Fale agora...')}
              </span>
            </div>
          )}
        </div>

        {/* Último Comando Reconhecido */}
        {lastCommand && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-neutral-300">
                {isEn ? 'Last command triggered:' : 'Último comando acionado:'}
              </span>
              <strong className="text-amber-300 font-bold">{lastCommand.action}</strong>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono italic">
              &quot;{lastCommand.transcript}&quot;
            </span>
          </div>
        )}

        {/* Tabela de Comandos */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="rounded-xl border border-neutral-800 overflow-hidden bg-neutral-950/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-800/60 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-2.5 px-4">{isEn ? 'Target Action' : 'Ação Desejada'}</th>
                  <th className="py-2.5 px-4">{isEn ? 'English Voice Commands' : 'Comando em Inglês'}</th>
                  <th className="py-2.5 px-4">{isEn ? 'Portuguese Commands' : 'Comando em Português'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                {commandGroups.map((g, idx) => (
                  <tr key={idx} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">{g.action}</td>
                    <td className="py-3 px-4 font-mono text-cyan-300/90">
                      {g.en.join(' · ')}
                    </td>
                    <td className="py-3 px-4 font-mono text-amber-300/90">
                      {g.pt.join(' · ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-neutral-800/30 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
            <p className="flex items-center gap-1.5 font-medium text-neutral-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEn ? 'Tips for maximum accuracy:' : 'Dicas para maior precisão:'}</span>
            </p>
            <p>
              {isEn
                ? '• Keep your microphone close or use a lapel/headset mic to isolate room noise.'
                : '• Mantenha o microfone próximo ou use fone de ouvido para isolar o áudio do ambiente.'}
            </p>
            <p>
              {isEn
                ? '• Speak commands clearly (e.g., "Start", "Pause", "Faster") during natural pauses.'
                : '• Diga as palavras com clareza (ex: "Iniciar" ou "Pause") em pausas naturais da sua fala.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs">
          <span className="text-neutral-500">Powered by Web Speech API</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors cursor-pointer"
          >
            {isEn ? 'Close' : 'Fechar'}
          </button>
        </div>
      </div>
    </div>
  );
};
