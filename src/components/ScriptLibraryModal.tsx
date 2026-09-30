import React, { useState } from 'react';
import { SavedScript, LicenseStatus } from '../types/teleprompter';
import { countWords, estimateReadingTimeSeconds } from '../utils/textUtils';
import {
  X,
  Plus,
  Trash2,
  Copy,
  Clock,
  FileText,
  Search,
  Check,
  RotateCcw,
  Sparkles,
  Crown,
  Lock,
} from 'lucide-react';

interface ScriptLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedScripts: SavedScript[];
  onSelectScript: (script: SavedScript) => void;
  onSaveCurrentScript: (customTitle?: string) => void;
  onDeleteScript: (id: string) => void;
  onDuplicateScript: (script: SavedScript) => void;
  onResetToDefaults: () => void;
  currentTitle: string;
  licenseStatus: LicenseStatus;
  onOpenUpgradeModal: (feature?: string) => void;
}

export const ScriptLibraryModal: React.FC<ScriptLibraryModalProps> = ({
  isOpen,
  onClose,
  savedScripts,
  onSelectScript,
  onSaveCurrentScript,
  onDeleteScript,
  onDuplicateScript,
  onResetToDefaults,
  currentTitle,
  licenseStatus,
  onOpenUpgradeModal,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [saveTitleInput, setSaveTitleInput] = useState<string>(currentTitle || '');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const filteredScripts = savedScripts.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
    s.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAtFreeLimit = !licenseStatus.isPro && savedScripts.length >= 3;

  const handleSave = () => {
    if (!saveTitleInput.trim()) return;

    if (isAtFreeLimit) {
      onOpenUpgradeModal('script_limit');
      return;
    }

    onSaveCurrentScript(saveTitleInput.trim());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const formatDate = (timestamp: number) => {
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(timestamp));
    } catch {
      return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden text-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Biblioteca de Roteiros</h2>
              <p className="text-xs text-neutral-400">Salve seus scripts localmente no navegador</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Salvar Roteiro Atual */}
        <div className="p-4 bg-neutral-800/30 border-b border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <input
            type="text"
            value={saveTitleInput}
            onChange={(e) => setSaveTitleInput(e.target.value)}
            placeholder="Nome para salvar o roteiro atual..."
            className="flex-1 bg-neutral-950/70 border border-neutral-700/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-950" />
                <span>Salvo!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Salvar Roteiro Atual</span>
              </>
            )}
          </button>
        </div>

        {/* Barra de Busca e Filtro */}
        <div className="px-6 py-3 border-b border-neutral-800/60 flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título ou palavras-chave..."
              className="w-full bg-neutral-950/40 border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600 placeholder-neutral-500"
            />
          </div>

          <button
            onClick={onResetToDefaults}
            className="text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center gap-1 px-2.5 py-1.5 rounded bg-neutral-800/50 hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Recarregar exemplos padrão de estúdio"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Exemplos Padrão</span>
          </button>
        </div>

        {/* Lista de Roteiros */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredScripts.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">Nenhum roteiro encontrado</p>
              <p className="text-xs mt-1">Crie um novo roteiro ou restaure os exemplos padrão.</p>
            </div>
          ) : (
            filteredScripts.map((script) => (
              <div
                key={script.id}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-neutral-800/40 hover:bg-neutral-800/80 border border-neutral-800/80 hover:border-neutral-700 transition-all gap-3"
              >
                <div
                  onClick={() => {
                    onSelectScript(script);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer pr-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-white group-hover:text-amber-400 transition-colors">
                      {script.title}
                    </h3>
                    {script.category && (
                      <span className="text-[10px] text-neutral-400 font-mono">
                        · {script.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-2 mb-2 font-normal">
                    {script.content.slice(0, 140)}...
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-mono">
                    <span>{script.wordCount} palavras</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ~{script.estimatedMinutes} min
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{formatDate(script.updatedAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => {
                      onSelectScript(script);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-xs font-medium text-white transition-colors cursor-pointer"
                  >
                    Carregar
                  </button>

                  <button
                    onClick={() => {
                      if (isAtFreeLimit) {
                        onOpenUpgradeModal('script_limit');
                        return;
                      }
                      onDuplicateScript(script);
                    }}
                    className="p-1.5 rounded-lg hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
                    title="Duplicar Roteiro"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Deseja excluir "${script.title}"?`)) {
                        onDeleteScript(script.id);
                      }
                    }}
                    className="p-1.5 rounded-lg hover:bg-red-950 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                    title="Excluir Roteiro"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!licenseStatus.isPro ? (
              <>
                <span className="font-mono text-neutral-300">
                  {savedScripts.length}/3 roteiros salvos (Gratuito)
                </span>
                <span className="text-neutral-600">·</span>
                <button
                  onClick={() => onOpenUpgradeModal('script_limit')}
                  className="text-amber-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Crown className="w-3 h-3" />
                  <span>Desbloquear Ilimitados (R$ 97)</span>
                </button>
              </>
            ) : (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" />
                <span>{savedScripts.length} roteiro(s) · Ilimitados (PRO Vitalício)</span>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
