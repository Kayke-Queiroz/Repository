import { useState, useEffect, useRef } from 'react';

const Frames = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frames, setFrames] = useState([]);
  const [scrollPercent, setScrollPercent] = useState(0);
  const containerRef = useRef(null);
  const totalFrames = 168;

  // Importar todos os frames dinamicamente
  useEffect(() => {
    const importFrames = async () => {
      const frameModules = import.meta.glob('../assets/videos/frames/*.jpg', {
        eager: true,
      });

      // Ordenar os frames por números
      const sortedFrames = Object.keys(frameModules)
        .sort((a, b) => {
          const numA = parseInt(a.match(/\d+/)[0]);
          const numB = parseInt(b.match(/\d+/)[0]);
          return numA - numB;
        })
        .map((path) => frameModules[path].default);

      setFrames(sortedFrames);
    };

    importFrames();
  }, []);

  // Escutar o evento de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      // Altura total necessária para passar por todos os frames (200vh)
      const totalScrollHeight = 200 * window.innerHeight / 100;
      // Posição do scroll atual
      const scrollTop = window.scrollY;

      // Calcular qual porcentagem foi scrollado (0 a 1)
      const percent = Math.min(1, scrollTop / totalScrollHeight);
      setScrollPercent(percent);

      // Mapear a porcentagem para o índice do frame (0 a 167)
      const frameIndex = Math.floor(percent * (totalFrames - 1));
      setCurrentFrame(Math.min(frameIndex, totalFrames - 1));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Container fixo na tela */}
      <div
        ref={containerRef}
        className={`${scrollPercent >= 0.99 ? 'relative' : 'fixed'} top-0 left-0 w-full h-screen flex items-center justify-center bg-black transition-all duration-700`}
        style={{ zIndex: scrollPercent >= 0.99 ? 'auto' : 9999 }}
      >
        {frames.length > 0 ? (
          <div className="relative w-full h-full pointer-events-auto">
            <img
              src={frames[currentFrame]}
              alt={`Frame ${currentFrame + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Indicador do frame atual - opcional */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 px-4 py-2 rounded text-white text-sm">
              {currentFrame + 1} / {totalFrames}
            </div>
          </div>
        ) : (
          <div className="text-white text-xl">Carregando vídeo...</div>
        )}
      </div>

      {/* Spacer invisível para forçar o scroll necessário - desaparece ao atingir 99% */}
      <div style={{ height: '200vh' }} />
    </>
  );
};

export default Frames;
