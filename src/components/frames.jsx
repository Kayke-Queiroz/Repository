import { useState, useEffect } from 'react';

const SCROLL_HEIGHT_MULTIPLIER = 2; // 200vh
const END_THRESHOLD = 0.99;
const STICKY_EXTRA_RANGE = 0.005; // 0.5% a mais depois do 99%
const RESET_BELOW = 0.8; // se voltar muito, reseta o "travamento" final

const Frames = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frames, setFrames] = useState([]);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [lockScrollY, setLockScrollY] = useState(0);

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
      const totalScrollHeight = SCROLL_HEIGHT_MULTIPLIER * window.innerHeight;
      const scrollTop = window.scrollY;

      // enquanto estiver travado, mantém a posição e não atualiza animação
      if (isScrollLocked) {
        window.scrollTo(0, lockScrollY);
        return;
      }

      const rawPercent = Math.min(1, scrollTop / totalScrollHeight);

      // estado anterior: usamos para saber se já estávamos "travados" no fim
      const wasAtEnd = hasReachedEnd;
      let nextHasReachedEnd = hasReachedEnd;

      // se o usuário voltar bastante, libera para repetir a animação
      if (nextHasReachedEnd && rawPercent < RESET_BELOW) {
        nextHasReachedEnd = false;
      }

      // se ainda não tinha chegado no fim e agora passou do threshold, arma o "travamento"
      const becomingEndNow =
        !nextHasReachedEnd && rawPercent >= END_THRESHOLD;

      if (becomingEndNow) {
        nextHasReachedEnd = true;
        // trava o scroll por ~1s na posição atual, mas sem esconder a barra
        setIsScrollLocked(true);
        setLockScrollY(scrollTop);
        setTimeout(() => {
          setIsScrollLocked(false);
        }, 1000);
      }

      setHasReachedEnd(nextHasReachedEnd);

      const stickyEnd = END_THRESHOLD + STICKY_EXTRA_RANGE;
      // só podemos "sair" depois de já ter travado antes (wasAtEnd)
      const canFinish = wasAtEnd && rawPercent >= stickyEnd;

      let effectivePercent;

      if (!nextHasReachedEnd) {
        // ainda na animação normal
        effectivePercent = rawPercent;
      } else if (!canFinish) {
        // chegou no fim, mas ainda não liberou para sair -> trava no último frame
        effectivePercent = END_THRESHOLD;
      } else {
        // já estava travado e o usuário continuou descendo -> libera para sair
        effectivePercent = rawPercent;
      }

      setScrollPercent(effectivePercent);

      if (!frames.length) return;

      const frameIndex =
        effectivePercent >= END_THRESHOLD
          ? frames.length - 1
          : Math.floor(effectivePercent * (frames.length - 1));

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
  }, [frames, hasReachedEnd, isScrollLocked, lockScrollY]);

  const stickyEnd = END_THRESHOLD + STICKY_EXTRA_RANGE;
  const isEnd = hasReachedEnd && scrollPercent >= stickyEnd && !isScrollLocked;

  return (
    <>
      {/* ===============================
          FRAME FIXO (ANIMAÇÃO)
      =============================== */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center transition-opacity duration-300 z-overlay
          ${isEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
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
      <div className="fixed bottom-4 right-4 bg-black/60 px-4 py-2 rounded text-white text-sm z-hud">
        {currentFrame + 1} / {frames.length || totalFramesFallback}
      </div>
    </>
  );
};

export default Frames;
