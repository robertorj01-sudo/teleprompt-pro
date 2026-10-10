import mammoth from 'mammoth';

/**
 * Conta palavras de um texto de forma precisa considerando quebras de linha e pontuações
 */
export function countWords(text: string): number {
  if (!text) return 0;
  const cleaned = text.trim();
  if (!cleaned) return 0;
  // Divide por espaços em branco múltiplos e quebras de linha
  const words = cleaned.split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

/**
 * Calcula tempo estimado de fala em segundos baseado em 135 palavras por minuto (ritmo natural de oratória)
 */
export function estimateReadingTimeSeconds(wordCount: number, wpm: number = 135): number {
  if (wordCount <= 0) return 0;
  return Math.ceil((wordCount / wpm) * 60);
}

/**
 * Formata segundos em MM:SS ou HH:MM:SS
 */
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Lê arquivo selecionado (.txt, .md, .docx) e extrai o texto puro
 */
export async function parseUploadedScriptFile(file: File): Promise<{ title: string; content: string }> {
  const fileName = file.name;
  const cleanTitle = fileName.replace(/\.[^/.]+$/, '');
  const extension = fileName.split('.').pop()?.toLowerCase();

  if (extension === 'docx') {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return {
      title: cleanTitle,
      content: result.value || '',
    };
  }

  // Arquivos de texto puro (.txt, .md, etc.)
  const text = await file.text();
  return {
    title: cleanTitle,
    content: text,
  };
}

/**
 * Faz download do roteiro como arquivo de texto .txt
 */
export function downloadScriptAsTxt(title: string, content: string): void {
  const safeName = (title || 'meu-roteiro').replace(/[/\\?%*:|"<>]/g, '-');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${safeName}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Segmenta parágrafos para renderização com suporte a notas de orador entre colchetes [EXEMPLO]
 */
export interface ScriptSegment {
  type: 'text' | 'speaker-note' | 'heading';
  content: string;
}

export function parseParagraphSegments(paragraph: string): ScriptSegment[] {
  if (!paragraph.trim()) {
    return [{ type: 'text', content: '' }];
  }

  // Verifica se é um título (ex: "# Título" ou "CENA 1:")
  if (paragraph.startsWith('#') || /^(CENA|BLOCO|ATO|SEÇÃO|TÓPICO)\s+\d+/i.test(paragraph)) {
    return [{ type: 'heading', content: paragraph.replace(/^#+\s*/, '') }];
  }

  // Divide por marcações entre colchetes [PAUSA], [SORRIR], etc.
  const regex = /(\[[^\]]+\])/g;
  const parts = paragraph.split(regex);
  const segments: ScriptSegment[] = [];

  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('[') && part.endsWith(']')) {
      segments.push({
        type: 'speaker-note',
        content: part.slice(1, -1),
      });
    } else {
      segments.push({
        type: 'text',
        content: part,
      });
    }
  }

  return segments;
}
