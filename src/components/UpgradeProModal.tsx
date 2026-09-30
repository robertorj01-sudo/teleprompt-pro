import React, { useState } from 'react';
import {
  X,
  Check,
  Crown,
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  Download,
  Key,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { LicenseStatus } from '../types/teleprompter';

interface UpgradeProModalProps {
  isOpen: boolean;
  onClose: () => void;
  licenseStatus: LicenseStatus;
  onActivateLicense: (licenseKey: string) => void;
  highlightFeature?: string; // Ex: 'download_video' | 'mirror' | 'script_limit' | 'import_docx'
}

export const UpgradeProModal: React.FC<UpgradeProModalProps> = ({
  isOpen,
  onClose,
  licenseStatus,
  onActivateLicense,
  highlightFeature,
}) => {
  const [licenseInput, setLicenseInput] = useState<string>('');
  const [isProcessingBuy, setIsProcessingBuy] = useState<boolean>(false);
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulatePurchase = () => {
    setIsProcessingBuy(true);
    setTimeout(() => {
      const generatedKey = `PRO-LIFETIME-${Math.random().toString(36).substring(2, 8).toUpperCase()}-97`;
      onActivateLicense(generatedKey);
      setIsProcessingBuy(false);
    }, 1200);
  };

  const handleManualActivate = () => {
    const trimmed = licenseInput.trim().toUpperCase();
    if (!trimmed || trimmed.length < 5) {
      setInputError('Insira uma chave de licença válida (ex: PRO-VITALICIO-97).');
      return;
    }
    setInputError(null);
    onActivateLicense(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col max-h-[92vh]">
        {/* Banner de Destaque no Topo */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 px-6 py-2.5 text-center text-xs font-bold text-neutral-950 flex items-center justify-center gap-2 tracking-wide uppercase">
          <Flame className="w-4 h-4 fill-neutral-950" />
          <span>Oferta Especial: Licença Vitalícia — Sem Mensalidades, Pague Uma Única Vez</span>
        </div>

        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Crown className="w-3.5 h-3.5" />
              <span>Teleprompter PRO — Compra Única</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              A Ferramenta Definitiva para Gravação e Apresentação
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Desenhado para criadores, palestrantes e profissionais que rejeitam assinaturas mensais.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Motivo do Bloqueio (Se acionado por recurso específico) */}
        {highlightFeature && (
          <div className="mx-6 sm:mx-8 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-200">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {highlightFeature === 'download_video' &&
                'O download do arquivo de vídeo gravado em Full HD é exclusivo do Pacote PRO Vitalício.'}
              {highlightFeature === 'mirror' &&
                'O espelhamento óptico para rigs de teleprompter é um recurso do Pacote PRO Vitalício.'}
              {highlightFeature === 'script_limit' &&
                'Você atingiu o limite de 3 roteiros da versão gratuita. Desbloqueie roteiros ilimitados com o PRO.'}
              {highlightFeature === 'import_docx' &&
                'A importação de arquivos .docx (Word) e documentos é exclusiva do Pacote PRO Vitalício.'}
            </span>
          </div>
        )}

        {/* Conteúdo com Comparativo e Preço */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 space-y-6">
          {/* Card de Preço em Destaque */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-neutral-800/80 to-neutral-900 border border-amber-500/30 relative overflow-hidden shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                  Acesso Completo e Perpétuo
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">R$ 97,00</span>
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    Pagamento Único
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Sem mensalidades ou surpresas. Use hoje, amanhã e para sempre no seu computador e celular.
                </p>
              </div>

              {/* Botão de Compra Principal */}
              <button
                onClick={handleSimulatePurchase}
                disabled={isProcessingBuy || licenseStatus.isPro}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-extrabold text-sm tracking-wide transition-all shadow-xl shadow-amber-500/20 active:scale-95 cursor-pointer disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-2"
              >
                {isProcessingBuy ? (
                  <>
                    <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    <span>Ativando Licença...</span>
                  </>
                ) : licenseStatus.isPro ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>Licença Vitalícia Ativa</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Desbloquear Licença Vitalícia</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tabela Comparativa Free vs. PRO */}
          <div>
            <h3 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-3">
              O que você recebe com a Licença PRO Vitalícia:
            </h3>

            <div className="rounded-2xl border border-neutral-800 overflow-hidden text-xs">
              <div className="grid grid-cols-12 bg-neutral-800/60 p-3 font-semibold text-neutral-400 text-[11px] uppercase tracking-wider border-b border-neutral-800">
                <span className="col-span-6 sm:col-span-7">Recursos</span>
                <span className="col-span-3 sm:col-span-2 text-center">Grátis</span>
                <span className="col-span-3 text-center text-amber-400 font-bold">PRO Vitalício</span>
              </div>

              <div className="divide-y divide-neutral-800/60 bg-neutral-950/40">
                <div className="grid grid-cols-12 p-3 items-center">
                  <span className="col-span-6 sm:col-span-7 font-medium text-white">
                    Gravação com Download do Vídeo em HD (.webm/.mp4)
                  </span>
                  <span className="col-span-3 sm:col-span-2 text-center text-neutral-500">Apenas Prévia</span>
                  <span className="col-span-3 text-center font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Ilimitado</span>
                  </span>
                </div>

                <div className="grid grid-cols-12 p-3 items-center">
                  <span className="col-span-6 sm:col-span-7 font-medium text-white">
                    Biblioteca de Roteiros Salvos
                  </span>
                  <span className="col-span-3 sm:col-span-2 text-center text-neutral-400">Até 3 roteiros</span>
                  <span className="col-span-3 text-center font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Ilimitados</span>
                  </span>
                </div>

                <div className="grid grid-cols-12 p-3 items-center">
                  <span className="col-span-6 sm:col-span-7 font-medium text-white">
                    Espelhamento Óptico (Flip Horizontal e Vertical)
                  </span>
                  <span className="col-span-3 sm:col-span-2 text-center text-neutral-500">—</span>
                  <span className="col-span-3 text-center font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Liberado</span>
                  </span>
                </div>

                <div className="grid grid-cols-12 p-3 items-center">
                  <span className="col-span-6 sm:col-span-7 font-medium text-white">
                    Importação de Arquivos Word (.docx) e Documentos
                  </span>
                  <span className="col-span-3 sm:col-span-2 text-center text-neutral-400">Apenas .txt</span>
                  <span className="col-span-3 text-center font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Word & Docs</span>
                  </span>
                </div>

                <div className="grid grid-cols-12 p-3 items-center">
                  <span className="col-span-6 sm:col-span-7 font-medium text-white">
                    Controle por Voz Hands-Free (Web Speech API)
                  </span>
                  <span className="col-span-3 sm:col-span-2 text-center text-neutral-400">Básico</span>
                  <span className="col-span-3 text-center font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Completo</span>
                  </span>
                </div>

                <div className="grid grid-cols-12 p-3 items-center">
                  <span className="col-span-6 sm:col-span-7 font-medium text-white">
                    Atualizações Futuras & Suporte
                  </span>
                  <span className="col-span-3 sm:col-span-2 text-center text-neutral-500">—</span>
                  <span className="col-span-3 text-center font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Vitalício</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ativação via Chave Manual */}
          <div className="pt-2">
            {!showKeyInput ? (
              <button
                onClick={() => setShowKeyInput(true)}
                className="text-xs text-neutral-400 hover:text-amber-400 underline transition-colors cursor-pointer flex items-center gap-1"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Já adquiriu uma chave de licença? Clique aqui para ativar</span>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 space-y-2">
                <span className="block text-xs font-semibold text-white">
                  Inserir Chave de Licença Vitalícia:
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={licenseInput}
                    onChange={(e) => setLicenseInput(e.target.value)}
                    placeholder="Ex: PRO-VITALICIO-97"
                    className="flex-1 bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500 uppercase"
                  />
                  <button
                    onClick={handleManualActivate}
                    className="px-4 py-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Ativar
                  </button>
                </div>
                {inputError && <p className="text-[11px] text-rose-400">{inputError}</p>}
                <p className="text-[10px] text-neutral-500">
                  Dica de teste: Digite <strong>PRO-VITALICIO-97</strong> para testar a ativação imediata.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer com Garantia */}
        <div className="px-6 sm:px-8 py-4 border-t border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Garantia de 7 dias incondicional · Pagamento Seguro</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer text-xs font-medium"
            >
              Continuar no Gratuito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
