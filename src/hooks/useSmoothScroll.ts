import { useEffect, useRef, useState, useCallback } from 'react';

interface UseSmoothScrollOptions {
  speed: number; // 1 a 100
  isPlaying: boolean;
  onEndReached?: () => void;
}

export function useSmoothScroll({
  speed,
  isPlaying,
  onEndReached,
}: UseSmoothScrollOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const accumulatedScrollRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  // Calcula velocidade em pixels por segundo com curva ergonômica
  // 1 => ~10 px/s, 25 => ~60 px/s, 50 => ~150 px/s, 100 => ~450 px/s
  const getPixelsPerSecond = useCallback((speedVal: number): number => {
    const normalized = Math.max(1, Math.min(100, speedVal));
    return 10 + Math.pow(normalized / 100, 1.5) * 420;
  }, []);

  // Atualiza progresso da rolagem (0 a 100%)
  const updateProgress = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const current = el.scrollTop;
    const pct = Math.min(100, Math.max(0, (current / maxScroll) * 100));
    setScrollProgress(pct);

    if (current >= maxScroll - 4 && !isAtEnd) {
      setIsAtEnd(true);
      if (onEndReached) {
        onEndReached();
      }
    } else if (current < maxScroll - 10 && isAtEnd) {
      setIsAtEnd(false);
    }
  }, [isAtEnd, onEndReached]);

  // Sincroniza posição interna ao rolar manualmente
  const handleManualScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    accumulatedScrollRef.current = el.scrollTop;
    updateProgress();
  }, [updateProgress]);

  // Loop de animação via requestAnimationFrame
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!isPlaying) {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      lastTimeRef.current = null;
      return;
    }

    // Inicializa contador caso estivesse zerado
    accumulatedScrollRef.current = el.scrollTop;

    const step = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const deltaMs = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Limita delta para prevenir saltos se a aba ficar em background
      const safeDeltaMs = Math.min(deltaMs, 64);
      const pxPerSec = getPixelsPerSecond(speed);
      const pxToScroll = (pxPerSec * safeDeltaMs) / 1000;

      const maxScroll = el.scrollHeight - el.clientHeight;

      if (maxScroll > 0) {
        accumulatedScrollRef.current += pxToScroll;

        if (accumulatedScrollRef.current >= maxScroll) {
          accumulatedScrollRef.current = maxScroll;
          el.scrollTop = maxScroll;
          updateProgress();
          setIsAtEnd(true);
          if (onEndReached) {
            onEndReached();
          }
          return; // Para o loop ao chegar ao final
        }

        el.scrollTop = accumulatedScrollRef.current;
        updateProgress();
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isPlaying, speed, getPixelsPerSecond, updateProgress, onEndReached]);

  // Reinicia para o início do roteiro
  const restart = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: 0, behavior: 'smooth' });
    accumulatedScrollRef.current = 0;
    setIsAtEnd(false);
    setScrollProgress(0);
  }, []);

  // Salta para frente ou para trás em pixels
  const jump = useCallback((deltaPx: number) => {
    const el = containerRef.current;
    if (!el) return;
    const target = Math.max(0, Math.min(el.scrollHeight - el.clientHeight, el.scrollTop + deltaPx));
    el.scrollTo({ top: target, behavior: 'smooth' });
    accumulatedScrollRef.current = target;
    updateProgress();
  }, [updateProgress]);

  // Salta para um percentual específico (0 a 100)
  const jumpToPercent = useCallback((pct: number) => {
    const el = containerRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    const target = (Math.max(0, Math.min(100, pct)) / 100) * maxScroll;
    el.scrollTop = target;
    accumulatedScrollRef.current = target;
    updateProgress();
  }, [updateProgress]);

  return {
    containerRef,
    scrollProgress,
    isAtEnd,
    restart,
    jump,
    jumpToPercent,
    handleManualScroll,
  };
}
