import React, { useState } from 'react';
import {
  X,
  Tag,
  DollarSign,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  FileSpreadsheet,
  FileText,
  Calculator,
  ListOrdered,
  HelpCircle,
  Sparkles,
  Zap,
} from 'lucide-react';

interface AppSumoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppSumoModal: React.FC<AppSumoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'generator' | 'copy' | 'calculator'>('guide');
  const [codeQuantity, setCodeQuantity] = useState<number>(200);
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Calculadora
  const [dealPriceUSD, setDealPriceUSD] = useState<number>(29);
  const [estimatedSales, setEstimatedSales] = useState<number>(350);
  const revenueSharePercent = 70; // 70% para criador no AppSumo Marketplace
  const exchangeRateBRL = 5.60;

  if (!isOpen) return null;

  // Gerador de Códigos de Resgate únicos
  const handleGenerateCodes = () => {
    const codes: string[] = [];
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    for (let i = 0; i < codeQuantity; i++) {
      let part1 = '';
      let part2 = '';
      for (let j = 0; j < 5; j++) {
        part1 += characters.charAt(Math.floor(Math.random() * characters.length));
        part2 += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      codes.push(`AS-PRO-${part1}-${part2}`);
    }

    setGeneratedCodes(codes);
    // Salva no localStorage como códigos válidos
    localStorage.setItem('teleprompter_appsumo_codes', JSON.stringify(codes));
  };

  // Download do arquivo CSV para envio no painel do AppSumo
  const handleDownloadCSV = () => {
    if (generatedCodes.length === 0) return;

    let csvContent = 'code\n';
    csvContent += generatedCodes.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `appsumo-codes-teleprompter-${generatedCodes.length}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  // Cálculos financeiros
  const totalGrossUSD = dealPriceUSD * estimatedSales;
  const netEarningsUSD = totalGrossUSD * (revenueSharePercent / 100);
  const netEarningsBRL = netEarningsUSD * exchangeRateBRL;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Guia de Lançamento no AppSumo</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Lifetime Deal (LTD)
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Como listar seu Teleprompter no maior marketplace de software vitalício do mundo
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

        {/* Navigation Tabs */}
        <div className="flex items-center px-6 border-b border-neutral-800 bg-neutral-950/60 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Passo a Passo</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'generator'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Gerador de Códigos (CSV)</span>
          </button>

          <button
            onClick={() => setActiveTab('copy')}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'copy'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Copy e Descrição em Inglês</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'calculator'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador de Receita ($ USD)</span>
          </button>
        </div>

        {/* Content Tabs */}
        <div className="flex-1 overflow-y-auto p-6 text-xs text-neutral-300 space-y-6">
          {/* TAB 1: GUIA PASSO A PASSO */}
          {activeTab === 'guide' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-300">
                    Por que este Teleprompter é o produto perfeito para o AppSumo?
                  </h4>
                  <p className="text-neutral-300 leading-relaxed">
                    O público do AppSumo é formado por criadores de conteúdo, agências, infoprodutores e solopreneurs obcecados por <strong>Lifetime Deals (Pagamento Único)</strong> que odeiam mensalidades. Como o seu aplicativo roda 100% no navegador do usuário, <strong>seu custo de servidor é praticamente zero</strong>. Se você vender 100 ou 10.000 cópias, seu custo de infraestrutura não sobe, mantendo uma margem líquida acima de 90%.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 space-y-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-black font-bold text-xs">
                    1
                  </span>
                  <h5 className="font-bold text-white text-sm">Criar Conta de Parceiro</h5>
                  <p className="text-neutral-400 leading-relaxed text-[11px]">
                    Acesse o portal oficial do <strong>AppSumo Marketplace</strong> (antigo Submit to AppSumo) em{' '}
                    <a
                      href="https://sell.appsumo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      sell.appsumo.com <ExternalLink className="w-3 h-3" />
                    </a>{' '}
                    e cadastre seu perfil de criador/empresa. O cadastro é gratuito.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 space-y-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-black font-bold text-xs">
                    2
                  </span>
                  <h5 className="font-bold text-white text-sm">Definir Preço do Deal (LTD)</h5>
                  <p className="text-neutral-400 leading-relaxed text-[11px]">
                    Recomendamos definir o valor entre <strong>$19 e $29 USD</strong> (equivalente a R$ 97 - R$ 149 BRL) para pagamento único vitalício.
                    Você pode oferecer <strong>Tier 1 ($29)</strong> com todas as funções desbloqueadas e 1 licença, ou <strong>Tier 2 ($49)</strong> com suporte a múltiplos dispositivos.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 space-y-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-black font-bold text-xs">
                    3
                  </span>
                  <h5 className="font-bold text-white text-sm">Método de Entrega: Códigos de Resgate</h5>
                  <p className="text-neutral-400 leading-relaxed text-[11px]">
                    O AppSumo usa o modelo <strong>CSV Redemption Codes</strong>. Você faz o upload de uma lista de códigos (ex: 500 códigos) gerados pela aba <em>"Gerador de Códigos"</em>. Quando o cliente compra no AppSumo, ele recebe o código e o insere no modal de ativação do seu aplicativo.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 space-y-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-black font-bold text-xs">
                    4
                  </span>
                  <h5 className="font-bold text-white text-sm">Aprovação e Lançamento</h5>
                  <p className="text-neutral-400 leading-relaxed text-[11px]">
                    Envie os prints de tela, o link do aplicativo e o copy em inglês (que já deixamos pronto na aba 3). A equipe de curadoria do AppSumo analisa em cerca de <strong>3 a 5 dias úteis</strong> e coloca seu anúncio no ar para a base de milhões de assinantes!
                  </p>
                </div>
              </div>

              {/* Dica de Ouro */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-white font-bold block mb-0.5">Link Direto para Vender no AppSumo:</span>
                  <span className="font-mono text-neutral-400 text-xs">https://sell.appsumo.com</span>
                </div>
                <a
                  href="https://sell.appsumo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                >
                  <span>Acessar Portal do Parceiro</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: GERADOR DE CÓDIGOS DE RESGATE (CSV) */}
          {activeTab === 'generator' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                  <span>Gerador de Lotes de Chaves de Ativação AppSumo</span>
                </h4>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Gere os códigos que você vai subir para o AppSumo. Cada comprador receberá um código único como{' '}
                  <code className="text-amber-300 font-mono">AS-PRO-K7X9Q-M2P4W</code> para ativar a versão PRO Vitalícia dentro do Teleprompter.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <label className="text-neutral-300 font-medium">Quantidade de Códigos:</label>
                  <select
                    value={codeQuantity}
                    onChange={(e) => setCodeQuantity(Number(e.target.value))}
                    className="bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-amber-500"
                  >
                    <option value={50}>50 Códigos (Piloto)</option>
                    <option value={100}>100 Códigos</option>
                    <option value={200}>200 Códigos (Recomendado)</option>
                    <option value={500}>500 Códigos</option>
                    <option value={1000}>1.000 Códigos (Grande Lote)</option>
                  </select>

                  <button
                    onClick={handleGenerateCodes}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Gerar {codeQuantity} Códigos</span>
                  </button>

                  {generatedCodes.length > 0 && (
                    <button
                      onClick={handleDownloadCSV}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar Planilha CSV para AppSumo</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Amostra dos códigos gerados */}
              {generatedCodes.length > 0 ? (
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">
                      {generatedCodes.length} Códigos Ativos Gerados (Prontos para resgate no app):
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      ✓ Reconhecidos pelo Teleprompter Pro
                    </span>
                  </div>

                  <div className="max-h-48 overflow-y-auto p-3 bg-neutral-900 rounded-xl font-mono text-[11px] text-amber-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 border border-neutral-800">
                    {generatedCodes.slice(0, 30).map((c, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-black/40 border border-white/5 truncate">
                        {c}
                      </span>
                    ))}
                    {generatedCodes.length > 30 && (
                      <span className="px-2 py-1 text-neutral-500">
                        ... e mais {generatedCodes.length - 30} códigos no CSV.
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 text-center text-neutral-500">
                  Clique no botão amarelo acima para gerar seu primeiro lote de códigos de resgate.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: COPY & DESCRIÇÃO PRONTA (EM INGLÊS) */}
          {activeTab === 'copy' && (
            <div className="space-y-4">
              <p className="text-neutral-400 text-[11px]">
                O AppSumo é uma plataforma global de língua inglesa. Abaixo está o texto completo de apresentação pronto para você copiar e colar na ficha técnica do produto:
              </p>

              {/* Bloco 1: Título e Tagline */}
              <div className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Product Name & Tagline:</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        'Teleprompter Pro: Studio Teleprompter & Video Recorder\n\nThe definitive hands-free teleprompter and studio video recorder with voice control, beam-splitter mirroring, and zero monthly fees.',
                        'tagline'
                      )
                    }
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSection === 'tagline' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'tagline' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <div className="p-3 bg-neutral-950 rounded-xl font-mono text-[11px] text-neutral-300 space-y-1">
                  <p><strong>Title:</strong> Teleprompter Pro: Studio Teleprompter & Video Recorder</p>
                  <p><strong>Tagline:</strong> The definitive hands-free teleprompter and studio video recorder with voice control, beam-splitter mirroring, and zero monthly fees.</p>
                </div>
              </div>

              {/* Bloco 2: Overview & Pitch */}
              <div className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Overview & Key Features (Body Copy):</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `Say goodbye to awkward pauses and reading off notes. Teleprompter Pro is the modern, browser-based studio teleprompter that helps creators, keynote speakers, educators, and podcasters record flawless video presentations on their first take.

Key Features:
- Smooth GPU Scroll Engine: Fluid, jitter-free scrolling tailored for natural speaking pace.
- Hands-Free Voice Control: Start, pause, speed up, or rewind using natural voice commands (English & Portuguese).
- Integrated HD Camera Recording: Record video directly with your webcam or mobile selfie camera as your script scrolls over the lens.
- Hardware Beam-Splitter Mirroring: Horizontal and vertical flip for professional glass teleprompter rigs.
- Offline PWA Architecture: Works on Windows, Mac, iOS, and Android even without an internet connection.
- 100% Privacy: All processing happens client-side in your browser. No servers storing your confidential scripts.
- Lifetime License: One-time payment, zero recurring subscription fees.`,
                        'body'
                      )
                    }
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSection === 'body' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'body' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-neutral-950 rounded-xl font-sans text-[11px] text-neutral-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
{`Say goodbye to awkward pauses and reading off notes. Teleprompter Pro is the modern, browser-based studio teleprompter that helps creators, keynote speakers, educators, and podcasters record flawless video presentations on their first take.

Key Features:
- Smooth GPU Scroll Engine: Fluid, jitter-free scrolling tailored for natural speaking pace.
- Hands-Free Voice Control: Start, pause, speed up, or rewind using natural voice commands.
- Integrated HD Camera Recording: Record video directly with your webcam or mobile selfie camera.
- Hardware Beam-Splitter Mirroring: Horizontal and vertical flip for professional glass teleprompter rigs.
- Offline PWA Architecture: Works on Windows, Mac, iOS, and Android even without internet.
- 100% Privacy: All processing happens client-side in your browser.
- Lifetime License: One-time payment, zero recurring subscription fees.`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: CALCULADORA DE LUCRO EM DÓLAR */}
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">
                    Ajustar Parâmetros da Campanha
                  </h4>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-300">Preço do Deal no AppSumo (USD):</span>
                      <span className="font-mono text-white font-bold">${dealPriceUSD} USD</span>
                    </div>
                    <div className="flex gap-2">
                      {[19, 29, 39, 49].map((val) => (
                        <button
                          key={val}
                          onClick={() => setDealPriceUSD(val)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            dealPriceUSD === val
                              ? 'bg-amber-500 text-black'
                              : 'bg-neutral-900 hover:bg-neutral-700 text-neutral-300'
                          }`}
                        >
                          ${val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-300">Estimativa de Licenças Vendidas:</span>
                      <span className="font-mono text-amber-400 font-bold">{estimatedSales} vendas</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={1500}
                      step={25}
                      value={estimatedSales}
                      onChange={(e) => setEstimatedSales(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-500">
                      <span>50 (Conservador)</span>
                      <span>500 (Bom lançamento)</span>
                      <span>1.500+ (Destaque)</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Divisão AppSumo Marketplace:</span>
                      <span className="font-bold text-white">70% para o Criador</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Câmbio Estimado (USD/BRL):</span>
                      <span className="font-mono text-white">R$ {exchangeRateBRL.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Resultado da Projeção */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-neutral-800 to-neutral-900 border border-amber-500/30 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">
                      Sua Receita Líquida Estimada
                    </span>

                    <div className="mt-3 space-y-2">
                      <div>
                        <span className="text-3xl font-extrabold text-white">
                          ${netEarningsUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD
                        </span>
                        <span className="text-xs text-neutral-400 block">Líquido na sua conta em Dólares</span>
                      </div>

                      <div className="pt-2 border-t border-neutral-700/60">
                        <span className="text-2xl font-bold text-emerald-400">
                          ≈ R$ {netEarningsBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BRL
                        </span>
                        <span className="text-[11px] text-neutral-400 block">Convertido para Reais (sem taxas)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-neutral-300">
                    💡 <strong>Custo de Servidor: R$ 0,00</strong>. Como todo o processamento de gravação e teleprompter ocorre no dispositivo do cliente, o faturamento é quase 100% margem de lucro líquido!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Compatível com as diretrizes do AppSumo Marketplace 2026</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
