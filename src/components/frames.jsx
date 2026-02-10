import { useState, useEffect } from 'react';

const Frames = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frames, setFrames] = useState([]);
  const [scrollPercent, setScrollPercent] = useState(0);

  const totalFramesFallback = 168;

  // ===============================
  // IMPORTAÇÃO DOS FRAMES
  // ===============================
  useEffect(() => {
    const importFrames = async () => {
      const frameModules = import.meta.glob(
        '../assets/videos/frames/*.jpg',
        { eager: true }
      );

      const sortedFrames = Object.keys(frameModules)
        .sort((a, b) => {
          const numA = parseInt(a.match(/\d+/)?.[0] || 0, 10);
          const numB = parseInt(b.match(/\d+/)?.[0] || 0, 10);
          return numA - numB;
        })
        .map((path) => frameModules[path].default);

      setFrames(sortedFrames);
    };

    importFrames();
  }, []);

  // ===============================
  // SCROLL CONTROLLER
  // ===============================
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const totalScrollHeight = 2 * window.innerHeight; // 200vh
      const scrollTop = window.scrollY;

      const percent = Math.min(1, scrollTop / totalScrollHeight);
      setScrollPercent(percent);

      if (!frames.length) return;

      const frameIndex =
        percent >= 0.99
          ? frames.length - 1
          : Math.floor(percent * (frames.length - 1));

      setCurrentFrame(frameIndex);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [frames]);

  const isEnd = scrollPercent >= 0.99;

  return (
    <>
      {/* ===============================
          FRAME FIXO (ANIMAÇÃO)
      =============================== */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center transition-opacity duration-300
          ${isEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
        style={{ zIndex: 9999 }}
      >
        {frames.length > 0 ? (
          <img
            src={frames[currentFrame]}
            alt={`Frame ${currentFrame + 1}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-white text-xl">Carregando vídeo...</div>
        )}
      </div>

      {/* ===============================
          SCROLL / PLACEHOLDER
      =============================== */}
      <div style={{ height: '200vh' }}>
        {/* Último frame entra no fluxo */}
        <div className="h-screen w-full">
          {isEnd && frames.length > 0 && (
            <img
              src={frames[frames.length - 1]}
              alt="Frame final"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* ===============================
            CONTEÚDO DO SITE
        =============================== */}
        <section className="min-h-screen bg-white text-black flex items-center justify-center">
          <h1 className="text-4xl font-bold">
            Continuação normal do site 🚀
          </h1>
        </section>
      </div>

      {/* ===============================
          INDICADOR (OPCIONAL)
      =============================== */}
      <div className="fixed bottom-4 right-4 bg-black/60 px-4 py-2 rounded text-white text-sm z-[10000]">
        {currentFrame + 1} / {frames.length || totalFramesFallback}
      </div>
    </>
  );
};

export default Frames;
