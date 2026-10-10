import { useEffect, useRef, useState, useCallback } from 'react';

// Declaração de tipos para SpeechRecognition do navegador
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export type VoiceLanguage = 'pt-BR' | 'en-US';

export interface RecognizedCommand {
  keyword: string;
  action: string;
  transcript: string;
  timestamp: number;
}

interface VoiceControlActions {
  onPlay: () => void;
  onPause: () => void;
  onFaster: () => void;
  onSlower: () => void;
  onRestart: () => void;
  onToggleMirror: () => void;
  onToggleCue: () => void;
  onBiggerFont: () => void;
  onSmallerFont: () => void;
  onToggleFullscreen: () => void;
}

export function useVoiceControl(actions: VoiceControlActions) {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [language, setLanguage] = useState<VoiceLanguage>('pt-BR');
  const [lastCommand, setLastCommand] = useState<RecognizedCommand | null>(null);
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const shouldListenRef = useRef<boolean>(false);
  const actionsRef = useRef(actions);
  actionsRef.current = actions;

  // Último timestamp de comando processado para evitar disparos repetidos no mesmo interim
  const lastProcessedTimeRef = useRef<number>(0);

  // Inicialização e checagem de suporte
  useEffect(() => {
    const win = window as unknown as IWindow;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
      setError('Web Speech API não é suportada por este navegador (recomendado Google Chrome, Edge ou Safari).');
    }
  }, []);

  // Processa texto transcrito e mapeia comandos
  const processTranscript = useCallback((rawText: string) => {
    const text = rawText.toLowerCase().trim();
    if (!text) return;

    const now = Date.now();
    // Previne disparos com intervalo menor que 600ms
    if (now - lastProcessedTimeRef.current < 600) return;

    // 1. Iniciar / Play / Start
    if (
      /\b(start|play|go|resume|continue|iniciar|começar|comeca|reproduzir|continuar|vai|play)\b/i.test(text)
    ) {
      lastProcessedTimeRef.current = now;
      setLastCommand({
        keyword: 'start',
        action: 'Iniciar Rolagem',
        transcript: rawText,
        timestamp: now,
      });
      actionsRef.current.onPlay();
      return;
    }

    // 2. Pausar / Pause / Stop
    if (
      /\b(pause|stop|halt|wait|pausar|pausa|parar|para|pare|espera|segura)\b/i.test(text)
    ) {
      lastProcessedTimeRef.current = now;
      setLastCommand({
        keyword: 'pause',
        action: 'Pausar Rolagem',
        transcript: rawText,
        timestamp: now,
      });
      actionsRef.current.onPause();
      return;
    }

    // 3. Mais Rápido / Faster
    if (
      /\b(faster|speed up|quicker|quick|fast|mais rápido|mais rapido|acelera|acelerar|aumentar velocidade|rapido)\b/i.test(text)
    ) {
      lastProcessedTimeRef.current = now;
      setLastCommand({
        keyword: 'faster',
        action: 'Aumentar Velocidade (+)',
        transcript: rawText,
        timestamp: now,
      });
      actionsRef.current.onFaster();
      return;
    }

    // 4. Mais Devagar / Slower
    if (
      /\b(slower|slow down|slow|mais devagar|devagar|desacelera|desacelerar|diminuir velocidade|reduzir)\b/i.test(text)
    ) {
      lastProcessedTimeRef.current = now;
      setLastCommand({
        keyword: 'slower',
        action: 'Diminuir Velocidade (-)',
        transcript: rawText,
        timestamp: now,
      });
      actionsRef.current.onSlower();
      return;
    }

    // 5. Reiniciar / Restart / Início
    if (
      /\b(restart|reset|beginning|from the top|reiniciar|reinicia|do início|do inicio|recomeçar|recomeca|voltar ao início)\b/i.test(text)
    ) {
      lastProcessedTimeRef.current = now;
      setLastCommand({
        keyword: 'restart',
        action: 'Reiniciar do Topo',
        transcript: rawText,
        timestamp: now,
      });
      actionsRef.current.onRestart();
      return;
    }

    // 6. Espelho / Mirror
    if (
      /\b(mirror|flip|espelho|espelhar|inverter)\b/i.test(text)
    ) {
      lastProcessedTimeRef.current = now;
      setLastCommand({
        keyword: 'mirror',
        action: 'Espelho Horizontal',
        transcript: rawText,
        timestamp: now,
      });
      actionsRef.current.onToggleMirror();
      return;
    }

    // 7. Guia de Leitura / Cue Line
    if (
      /\b(cue|guide|line|guia|linha|marcador)\b/i.test(text)
    ) {
      lastProcessedTimeRef.current = now;
      setLastCommand({
        keyword: 'cue',
        action: 'Alternar Linha Guia',
        transcript: rawText,
        timestamp: now,
      });
      actionsRef.current.onToggleCue();
      return;
    }

    // 8. Aumentar Fonte / Bigger
    if (
      /\b(bigger|larger|increase font|zoom in|aumentar fonte|fonte maior|letra maior|texto maior)\b/i.test(text)
    ) {
      lastProcessedTimeRef.current = now;
      setLastCommand({
        keyword: 'bigger',
        action: 'Aumentar Fonte',
        transcript: rawText,
        timestamp: now,
      });
      actionsRef.current.onBiggerFont();
      return;
    }

    // 9. Diminuir Fonte / Smaller
    if (
      /\b(smaller|decrease font|zoom out|diminuir fonte|fonte menor|letra menor|texto menor)\b/i.test(text)
    ) {
      lastProcessedTimeRef.current = now;
      setLastCommand({
        keyword: 'smaller',
        action: 'Diminuir Fonte',
        transcript: rawText,
        timestamp: now,
      });
      actionsRef.current.onSmallerFont();
      return;
    }

    // 10. Tela Cheia / Fullscreen
    if (
      /\b(fullscreen|full screen|tela cheia|maximizar)\b/i.test(text)
    ) {
      lastProcessedTimeRef.current = now;
      setLastCommand({
        keyword: 'fullscreen',
        action: 'Alternar Tela Cheia',
        transcript: rawText,
        timestamp: now,
      });
      actionsRef.current.onToggleFullscreen();
      return;
    }
  }, []);

  const startListening = useCallback(() => {
    const win = window as unknown as IWindow;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setError('Web Speech API indisponível no navegador.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: any) => {
        let currentInterim = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            processTranscript(transcript);
          } else {
            currentInterim += transcript;
            // Também avalia comandos no interim para resposta instantânea ultra-rápida!
            processTranscript(transcript);
          }
        }

        setInterimTranscript(currentInterim);
      };

      recognition.onerror = (event: any) => {
        // Ignora 'no-speech' pois é comum quando o orador está em silêncio
        if (event.error === 'no-speech') {
          return;
        }
        if (event.error === 'not-allowed') {
          setError('Permissão do microfone negada. Conceda acesso ao microfone no navegador.');
          shouldListenRef.current = false;
          setIsListening(false);
          return;
        }
        console.warn('SpeechRecognition error:', event.error);
      };

      recognition.onend = () => {
        // Se o usuário ainda quer manter o controle por voz ativo, reconecta imediatamente
        if (shouldListenRef.current) {
          try {
            recognition.start();
          } catch {
            // Em caso de falha transitória, tenta reconectar após 250ms
            setTimeout(() => {
              if (shouldListenRef.current) {
                try {
                  recognition.start();
                } catch (e) {
                  console.warn('Erro ao reiniciar reconhecimento:', e);
                }
              }
            }, 250);
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
      shouldListenRef.current = true;
      recognition.start();
    } catch (err: any) {
      console.warn('Erro ao iniciar SpeechRecognition:', err);
      setError('Não foi possível iniciar o microfone. Verifique as permissões.');
      setIsListening(false);
      shouldListenRef.current = false;
    }
  }, [language, processTranscript]);

  const stopListening = useCallback(() => {
    shouldListenRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (err) {
        console.warn('Erro ao abortar SpeechRecognition:', err);
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimTranscript('');
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Se trocar de idioma enquanto estiver ativo, reinicia com o novo idioma
  useEffect(() => {
    if (shouldListenRef.current) {
      stopListening();
      const timeout = setTimeout(() => {
        startListening();
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [language, startListening, stopListening]);

  // Desmontagem
  useEffect(() => {
    return () => {
      shouldListenRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return {
    isSupported,
    isListening,
    language,
    setLanguage,
    lastCommand,
    interimTranscript,
    error,
    startListening,
    stopListening,
    toggleListening,
  };
}
