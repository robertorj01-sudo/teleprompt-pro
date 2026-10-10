import React, { useEffect, useRef, useState } from 'react';
import { Camera, X, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';

interface WebcamOverlayProps {
  enabled: boolean;
  onClose: () => void;
}

export const WebcamOverlay: React.FC<WebcamOverlayProps> = ({ enabled, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState<'top-right' | 'top-left' | 'bottom-right'>('top-right');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (!enabled) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      return;
    }

    let isMounted = true;
    setError(null);

    navigator.mediaDevices
      ?.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 } } })
      .then((stream) => {
        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.warn('Erro ao acessar webcam:', err);
        if (isMounted) {
          setError('Acesso à webcam indisponível ou permissão não concedida.');
        }
      });

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  const positionClasses = {
    'top-right': 'top-16 right-6',
    'top-left': 'top-16 left-6',
    'bottom-right': 'bottom-24 right-6',
  }[position];

  return (
    <div
      className={`fixed ${positionClasses} z-40 rounded-2xl overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl transition-all duration-200 select-none ${
        isExpanded ? 'w-80 h-60' : 'w-48 h-36'
      }`}
    >
      {/* Top mini header */}
      <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent p-2 flex items-center justify-between text-white z-10">
        <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-amber-400">
          <Camera className="w-3 h-3" />
          <span>Webcam PiP</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-white/20 text-neutral-300 hover:text-white cursor-pointer"
            title="Alternar tamanho"
          >
            {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </button>
          <button
            onClick={() => {
              setPosition((prev) =>
                prev === 'top-right' ? 'top-left' : prev === 'top-left' ? 'bottom-right' : 'top-right'
              );
            }}
            className="p-1 rounded hover:bg-white/20 text-neutral-300 hover:text-white cursor-pointer"
            title="Mudar posição"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/20 text-neutral-300 hover:text-white cursor-pointer"
            title="Fechar webcam"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {error ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-neutral-950 text-neutral-400 text-xs">
          <Camera className="w-6 h-6 mb-1 text-neutral-600" />
          <p>{error}</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover -scale-x-100" // Espelhado para comportamento natural de webcam
        />
      )}
    </div>
  );
};
