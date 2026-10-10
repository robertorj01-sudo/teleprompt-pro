import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ExternalLink,
  Smartphone,
  Layers,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check,
} from 'lucide-react';

interface GooglePlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GooglePlayModal: React.FC<GooglePlayModalProps> = ({ isOpen, onClose }) => {
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Publicação na Google Play Store</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Pronto para Gerar
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Seu aplicativo já atende a todos os requisitos técnicos de PWA e TWA da Google.
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-neutral-300">
          {/* Resposta direta e clara */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-600/30 text-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Sim! O aplicativo já está 100% preparado tecnicamente.</span>
            </div>
            <p className="leading-relaxed">
              O padrão oficial da Google para publicar aplicativos web modernos na Play Store chama-se <strong>TWA (Trusted Web Activity)</strong>. Ele empacota o PWA em um arquivo <strong>.aab (Android App Bundle)</strong> nativo com tela cheia, sem barra de navegador e com suporte offline.
            </p>
          </div>

          {/* Checklist de Conformidade Técnica Já Implementada */}
          <div>
            <h3 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-3">
              1. Checklist Técnico de Conformidade (100% Concluído):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Web App Manifest</strong>
                  <span className="text-neutral-400 text-[11px]">Standalone, tema escuro, start_url="/" e idioma pt-BR configurados.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Ícones Android & Maskable</strong>
                  <span className="text-neutral-400 text-[11px]">192x192, 512x512 e ícone Maskable com margem de segurança de 15%.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Service Worker & Offline</strong>
                  <span className="text-neutral-400 text-[11px]">Gerado automaticamente via Workbox com cache de fontes e scripts.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Segurança & Conexão HTTPS</strong>
                  <span className="text-neutral-400 text-[11px]">Obrigatório pela Google Play Store para verificação de domínio.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Como Gerar o Arquivo .AAB em 3 Passos */}
          <div>
            <h3 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-3">
              2. Como Gerar o Arquivo para a Play Store (Em 3 Passos):
            </h3>

            <div className="space-y-3">
              {/* Passo 1 */}
              <div className="p-3.5 rounded-xl bg-neutral-800/40 border border-neutral-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center text-[10px] font-extrabold">1</span>
                    Copie a URL pública da sua aplicação
                  </span>
                  <button
                    onClick={copyUrl}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-700 hover:bg-neutral-600 text-neutral-200 text-[11px] cursor-pointer"
                  >
                    {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedUrl ? 'Copiado!' : 'Copiar URL'}</span>
                  </button>
                </div>
                <p className="text-neutral-400 text-[11px]">
                  Use o endereço público gerado pelo AI Studio ou o seu domínio personalizado (com HTTPS).
                </p>
              </div>

              {/* Passo 2 */}
              <div className="p-3.5 rounded-xl bg-neutral-800/40 border border-neutral-800">
                <span className="font-bold text-white text-xs flex items-center gap-1.5 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center text-[10px] font-extrabold">2</span>
                  Gere o pacote Android via PWABuilder ou Bubblewrap
                </span>
                <p className="text-neutral-400 text-[11px] mb-2">
                  Acesse <strong>PWABuilder.com</strong> (ferramenta aberta recomendada pela Google e Microsoft):
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://www.pwabuilder.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-xs transition-colors"
                  >
                    <span>Abrir PWABuilder</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  </a>
                  <div className="text-[11px] text-neutral-400 flex items-center">
                    Cole a URL do app → Clique em "Package for Stores" → Selecione "Android" e baixe o arquivo <strong>.aab</strong>.
                  </div>
                </div>
              </div>

              {/* Passo 3 */}
              <div className="p-3.5 rounded-xl bg-neutral-800/40 border border-neutral-800">
                <span className="font-bold text-white text-xs flex items-center gap-1.5 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center text-[10px] font-extrabold">3</span>
                  Envie para o Google Play Console
                </span>
                <p className="text-neutral-400 text-[11px]">
                  No <strong>Google Play Console</strong> (play.google.com/console), crie um novo app, faça o upload do arquivo <strong>.aab</strong> gerado, adicione prints de tela e envie para a revisão padrão da Google!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500">
            TWA compatível com Android 8.0 até Android 15+.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
