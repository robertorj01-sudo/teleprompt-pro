import React, { useState } from 'react';
import {
  X,
  Smartphone,
  QrCode,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Camera,
  Mic,
  Maximize2,
  ArrowRight,
} from 'lucide-react';

interface MobileTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileTestModal: React.FC<MobileTestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // URL pública do app para teste
  const appUrl =
    typeof window !== 'undefined' && window.location.href.includes('ais-')
      ? window.location.href
      : 'https://ais-pre-hmx7nsbry6ibkx74ed4i4j-546695880517.us-east1.run.app';

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(
    appUrl
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Como Testar no Celular</h3>
              <p className="text-xs text-neutral-400">
                Acesse instantaneamente no seu Android ou iPhone
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center text-center p-5 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-inner">
            <span className="text-xs font-semibold text-neutral-300 mb-3 flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span>Aponte a câmera do seu celular para o QR Code:</span>
            </span>

            <div className="p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <img
                src={qrCodeUrl}
                alt="QR Code para testar no celular"
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
                loading="eager"
              />
            </div>

            <p className="text-[11px] text-neutral-500 mt-3">
              Abra o app de Câmera do seu celular e toque na notificação amarela que aparecer.
            </p>
          </div>

          {/* Copiar Link */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-neutral-400">
              Ou copie e envie o link para o seu WhatsApp/Telegram:
            </span>
            <div className="flex items-center gap-2 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800">
              <input
                type="text"
                readOnly
                value={appUrl}
                className="flex-1 bg-transparent px-3 text-xs text-neutral-300 font-mono focus:outline-none select-all truncate"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dicas de Instalação e Uso no Celular */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 space-y-1">
              <strong className="block text-white font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                No Android (Chrome)
              </strong>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Toque nos 3 pontinhos do Chrome e escolha <strong>"Instalar aplicativo"</strong> para usar sem barras de navegação, como um app nativo.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 space-y-1">
              <strong className="block text-white font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                No iPhone (Safari)
              </strong>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Toque no botão <strong>Compartilhar</strong> (ícone de quadrado com seta) e selecione <strong>"Adicionar à Tela de Início"</strong>.
              </p>
            </div>
          </div>

          {/* O que testar no celular */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 space-y-1.5">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Destaques para testar no celular:</span>
            </span>
            <ul className="space-y-1 text-[11px] text-neutral-300 list-disc list-inside">
              <li>Funciona tanto em <strong>Vertical</strong> (Reels/TikTok/Shorts) quanto em <strong>Horizontal</strong> (YouTube).</li>
              <li>Toque em qualquer lugar da tela para <strong>Pausar</strong> e <strong>Iniciar</strong>.</li>
              <li>Grave seus vídeos usando a <strong>câmera frontal do celular</strong> com o texto rolando acima da lente.</li>
              <li>Fale comandos como <strong>"Iniciar"</strong>, <strong>"Pausa"</strong> ou <strong>"Mais rápido"</strong> para controle sem as mãos.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs">
          <span className="text-neutral-500">
            PWA 100% Responsivo
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors cursor-pointer"
          >
            Entendi, vou testar
          </button>
        </div>
      </div>
    </div>
  );
};
