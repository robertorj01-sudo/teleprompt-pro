import React from 'react';
import {
  X,
  Download,
  Lock,
  Crown,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { formatTime } from '../utils/textUtils';
import { LicenseStatus } from '../types/teleprompter';

interface RecordedVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string | null;
  durationSeconds: number;
  licenseStatus: LicenseStatus;
  onDownload: () => void;
  onOpenUpgradeModal: () => void;
  onDiscard: () => void;
}

export const RecordedVideoModal: React.FC<RecordedVideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  durationSeconds,
  licenseStatus,
  onDownload,
  onOpenUpgradeModal,
  onDiscard,
}) => {
  if (!isOpen || !videoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Sua Gravação Está Pronta</h3>
              <p className="text-xs text-neutral-400">
                Duração gravada: <span className="font-mono text-amber-400 font-bold">{formatTime(durationSeconds)}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Preview */}
        <div className="p-6 flex flex-col items-center gap-4">
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-inner relative flex items-center justify-center">
            <video
              src={videoUrl}
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          </div>

          {/* Banner de Condição Grátis vs PRO */}
          {!licenseStatus.isPro ? (
            <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Download de Vídeo Condicionado à Licença PRO</span>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Na versão gratuita você pode testar e assistir à prévia. Para baixar o arquivo de vídeo original em Full HD, adquira a <strong>Licença Vitalícia (R$ 97,00)</strong> — sem mensalidades.
                </p>
              </div>

              <button
                onClick={onOpenUpgradeModal}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shrink-0 flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Crown className="w-3.5 h-3.5 fill-current" />
                <span>Desbloquear Download (R$ 97)</span>
              </button>
            </div>
          ) : (
            <div className="w-full p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Você possui a <strong>Licença PRO Vitalícia</strong>. O download do vídeo em alta definição está liberado.</span>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              if (window.confirm('Deseja descartar este vídeo e gravar novamente?')) {
                onDiscard();
                onClose();
              }
            }}
            className="text-xs text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Descartar e Gravar Outro</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Fechar
            </button>

            {licenseStatus.isPro ? (
              <button
                onClick={onDownload}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Vídeo em HD (.webm)</span>
              </button>
            ) : (
              <button
                onClick={onOpenUpgradeModal}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Crown className="w-4 h-4" />
                <span>Baixar Vídeo (Ativar PRO)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
