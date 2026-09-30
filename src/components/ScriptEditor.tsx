import React, { useRef, useState } from 'react';
import { countWords, estimateReadingTimeSeconds, formatTime, parseUploadedScriptFile, downloadScriptAsTxt } from '../utils/textUtils';
import { SavedScript, LicenseStatus } from '../types/teleprompter';
import {
  Upload,
  Download,
  Copy,
  Check,
  Trash2,
  Play,
  FileText,
  Sparkles,
  HelpCircle,
  FolderOpen,
  Crown,
} from 'lucide-react';

interface ScriptEditorProps {
  title: string;
  onChangeTitle: (title: string) => void;
  content: string;
  onChangeContent: (content: string) => void;
  onOpenLibrary: () => void;
  onStartPrompter: () => void;
  onOpenShortcuts: () => void;
  licenseStatus: LicenseStatus;
  onOpenUpgradeModal: (feature?: string) => void;
}

export const ScriptEditor: React.FC<ScriptEditorProps> = ({
  title,
  onChangeTitle,
  content,
  onChangeContent,
  onOpenLibrary,
  onStartPrompter,
  onOpenShortcuts,
  licenseStatus,
  onOpenUpgradeModal,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);

  const words = countWords(content);
  const chars = content.length;
  const estimatedSeconds = estimateReadingTimeSeconds(words);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isDocx = file.name.toLowerCase().endsWith('.docx');
    if (isDocx && !licenseStatus.isPro) {
      if (fileInputRef.current) fileInputRef.current.value = '';
      onOpenUpgradeModal('import_docx');
      return;
    }

    setLoadingFile(true);
    try {
      const parsed = await parseUploadedScriptFile(file);
      onChangeTitle(parsed.title);
      onChangeContent(parsed.content);
    } catch (err) {
      console.error('Erro ao ler arquivo:', err);
    } finally {
      setLoadingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const isDocx = file.name.toLowerCase().endsWith('.docx');
    if (isDocx && !licenseStatus.isPro) {
      onOpenUpgradeModal('import_docx');
      return;
    }

    setLoadingFile(true);
    try {
      const parsed = await parseUploadedScriptFile(file);
      onChangeTitle(parsed.title);
      onChangeContent(parsed.content);
    } catch (err) {
      console.error('Erro ao ler arquivo arrastado:', err);
    } finally {
      setLoadingFile(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback se clipboard API falhar
    }
  };

  const insertTag = (tagText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = content;

    const inserted = `[${tagText}]`;
    const newContent = current.substring(0, start) + inserted + current.substring(end);
    onChangeContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + inserted.length, start + inserted.length);
    }, 50);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 py-6 px-4">
      {/* Cabeçalho do Roteiro */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
            Título do Roteiro
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            placeholder="Ex: Apresentação para Clientes, Vídeo YouTube #42..."
            className="w-full bg-neutral-800/80 border border-neutral-700/80 rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none focus:border-amber-500 transition-colors text-sm sm:text-base placeholder-neutral-500"
          />
        </div>

        {/* Ações Rápidas de Biblioteca e Execução */}
        <div className="flex items-center gap-2 pt-2 sm:pt-4 self-end sm:self-auto w-full sm:w-auto">
          <button
            onClick={onOpenLibrary}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs sm:text-sm font-medium border border-neutral-700 transition-colors cursor-pointer"
          >
            <FolderOpen className="w-4 h-4 text-amber-400" />
            <span>Biblioteca</span>
          </button>

          <button
            onClick={onStartPrompter}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-neutral-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
            <span>Iniciar Teleprompter</span>
          </button>
        </div>
      </div>

      {/* Barra de Ferramentas de Edição e Métricas */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Métricas do Texto */}
        <div className="flex items-center gap-3 text-neutral-400 bg-neutral-900/60 px-3.5 py-2 rounded-xl border border-neutral-800">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">Palavras:</span>
            <span className="font-mono text-white font-bold tabular-nums">{words}</span>
          </div>
          <span className="text-neutral-700" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">Caracteres:</span>
            <span className="font-mono text-white font-bold tabular-nums">{chars}</span>
          </div>
          <span className="text-neutral-700" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">Tempo Estimado:</span>
            <span className="font-mono text-amber-400 font-bold tabular-nums">
              ~{formatTime(estimatedSeconds)}
            </span>
          </div>
        </div>

        {/* Inserir Notas de Orador Rápidas */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-neutral-500 text-[11px] hidden md:inline mr-1">Inserir marcação:</span>
          {['PAUSA', 'SORRIR', 'RESPIRAR', 'ENFATIZAR'].map((tag) => (
            <button
              key={tag}
              onClick={() => insertTag(tag)}
              className="px-2 py-1 rounded-md bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 text-[11px] border border-neutral-700/60 transition-colors cursor-pointer"
              title={`Adicionar [${tag}] no cursor`}
            >
              +{tag}
            </button>
          ))}
        </div>

        {/* Importar / Exportar / Limpar */}
        <div className="flex items-center gap-1.5">
          {/* Input oculto para upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.docx,text/plain"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loadingFile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors cursor-pointer"
            title="Importar arquivo .txt ou .docx"
          >
            <Upload className="w-3.5 h-3.5 text-neutral-400" />
            <span>{loadingFile ? 'Lendo...' : 'Importar (.txt/.docx)'}</span>
          </button>

          <button
            onClick={() => downloadScriptAsTxt(title, content)}
            disabled={!content.trim()}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer disabled:opacity-40"
            title="Baixar roteiro como .txt"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopy}
            disabled={!content.trim()}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer disabled:opacity-40"
            title="Copiar texto"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              if (window.confirm('Deseja limpar todo o texto do roteiro atual?')) {
                onChangeContent('');
              }
            }}
            disabled={!content.trim()}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 border border-neutral-700 transition-colors cursor-pointer disabled:opacity-40"
            title="Limpar texto"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Caixa de Texto do Roteiro (Textarea expansível com Drag & Drop) */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-2xl transition-all border ${
          isDragging
            ? 'border-amber-400 bg-amber-500/5 ring-2 ring-amber-400/40'
            : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
        }`}
      >
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChangeContent(e.target.value)}
          placeholder="Digite ou cole aqui o seu roteiro completo...

Dicas profissionais:
• Adicione quebras de linha entre parágrafos para pausas naturais.
• Use colchetes como [PAUSA DE 2 SEG] ou [SORRIR] para notas de orador (elas serão destacadas e não precisam ser lidas em voz alta).
• Você também pode arrastar e soltar um arquivo .txt ou .docx diretamente nesta área."
          className="w-full min-h-[380px] md:min-h-[460px] p-5 bg-transparent text-neutral-100 placeholder-neutral-600 text-base md:text-lg leading-relaxed focus:outline-none resize-y selection:bg-amber-500/30 selection:text-amber-200"
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        />

        {/* Overlay informativo de arrastar e soltar */}
        {isDragging && (
          <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center pointer-events-none text-amber-400">
            <Upload className="w-12 h-12 mb-2 animate-bounce" />
            <p className="font-semibold text-base">Solte o arquivo de texto ou documento aqui</p>
            <p className="text-xs text-neutral-400">Suporta .txt, .md, .docx</p>
          </div>
        )}
      </div>

      {/* Dicas e Atalhos Rápidos no Rodapé do Editor */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-500 bg-neutral-900/30 p-3.5 rounded-xl border border-neutral-800/60">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Pressione <strong>Barra de Espaço</strong> para Iniciar/Pausar e <strong>F</strong> para Tela Cheia no modo de apresentação.
          </span>
        </div>
        <button
          onClick={onOpenShortcuts}
          className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Ver todos os atalhos</span>
        </button>
      </div>
    </div>
  );
};
