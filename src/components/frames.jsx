import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const SCROLL_HEIGHT_MULTIPLIER = 2; // 200vh
const END_THRESHOLD = 0.99;
const STICKY_EXTRA_RANGE = 0.005; // 0.5% a mais depois do 99%
const RESET_BELOW = 0.8; // se voltar muito, reseta o "travamento" final

const Frames = () => {
  const canvasRef = useRef(null);
  const [frames, setFrames] = useState([]);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [lockScrollY, setLockScrollY] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { t } = useLanguage();

  // ===============================
  // CARREGAMENTO DAS IMAGENS (BATCHED)
  // ===============================
  useEffect(() => {
    const loadImages = async () => {
      const frameModules = import.meta.glob(
        '../assets/videos/frames/*.jpg',
        { eager: true }
      );

      const sortedPaths = Object.keys(frameModules).sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || 0, 10);
        const numB = parseInt(b.match(/\d+/)?.[0] || 0, 10);
        return numA - numB;
      });

      const imageUrls = sortedPaths.map((path) => frameModules[path].default);

      // A. Carregar PRIMEIRO frame imediatamente para não deixar tela preta
      const firstImage = new Image();
      firstImage.src = imageUrls[0];
      firstImage.onload = () => {
        setFrames([firstImage]); // Mostra o primeiro frame
      };

      // B. Carregar todos (incluindo o primeiro novamente, não tem problema, cache resolve) em background
      const BATCH_SIZE = 10;
      const loaded = new Array(imageUrls.length);

      const loadImage = (url) => new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });

      for (let i = 0; i < imageUrls.length; i += BATCH_SIZE) {
        const batch = imageUrls.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(batch.map(loadImage));

        batchResults.forEach((img, idx) => {
          if (img) loaded[i + idx] = img;
        });

        await new Promise(resolve => setTimeout(resolve, 10));
      }

      const validImages = loaded.filter(Boolean);
      setFrames(validImages); // Substitui o frame inicial pelo array completo quando pronto
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  // ===============================
  // NATIVE SCROLL CONTROLLER
  // ===============================
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalScrollHeight = SCROLL_HEIGHT_MULTIPLIER * window.innerHeight;
          const scrollTop = window.scrollY;

          // enquanto estiver travado, mantém a posição e não atualiza animação
          if (isScrollLocked) {
            window.scrollTo({ top: lockScrollY, behavior: 'instant' });
            ticking = false;
            return;
          }

          const rawPercent = Math.min(1, Math.max(0, scrollTop / totalScrollHeight));

          const wasAtEnd = hasReachedEnd;
          let nextHasReachedEnd = hasReachedEnd;

          // se o usuário voltar bastante, libera para repetir a animação
          if (nextHasReachedEnd && rawPercent < RESET_BELOW) {
            nextHasReachedEnd = false;
          }

          // se ainda não tinha chegado no fim e agora passou do threshold, arma o "travamento"
          const becomingEndNow = !nextHasReachedEnd && rawPercent >= END_THRESHOLD;

          if (becomingEndNow) {
            nextHasReachedEnd = true;
            // trava o scroll por ~1s na posição atual, mas sem esconder a barra
            setIsScrollLocked(true);
            setLockScrollY(scrollTop);
            setTimeout(() => {
              setIsScrollLocked(false);
            }, 1000);
          }

          if (nextHasReachedEnd !== hasReachedEnd) {
            setHasReachedEnd(nextHasReachedEnd);
          }

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
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Trigger on mount and resize
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasReachedEnd, isScrollLocked, lockScrollY]);

  // ===============================
  // CANVAS RENDERER
  // ===============================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || frames.length === 0) return;

    const ctx = canvas.getContext('2d');

    const frameIndex = scrollPercent >= END_THRESHOLD
      ? frames.length - 1
      : Math.floor(scrollPercent * (frames.length - 1));

    const img = frames[frameIndex];

    if (img) {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.width;
      const ih = img.height;

      const ratio = Math.max(cw / iw, ch / ih);
      const nw = iw * ratio;
      const nh = ih * ratio;
      const cx = (cw - nw) / 2;
      const cy = (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, cx, cy, nw, nh);
    }
  }, [frames, scrollPercent]);

  // Resize handler for canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const stickyEnd = END_THRESHOLD + STICKY_EXTRA_RANGE;
  const isEnd = hasReachedEnd && scrollPercent >= stickyEnd && !isScrollLocked;

  return (
    <>
      {/* ===============================
          FRAME FIXO (ANIMAÇÃO)
      =============================== */}
      <div
        className={`fixed top-0 left-0 w-full h-[100dvh] bg-black transition-opacity duration-300 z-overlay
          ${isEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          ${scrollPercent === 0 ? 'pointer-events-none' : ''}
        `}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
        {/* Loading text removed as per request (first frame is shown instead) */}
      </div>

      {/* ===============================
          SCROLL / PLACEHOLDER
      =============================== */}
      <div style={{ height: '200vh' }}>
        {/* Último frame "congelado" via canvas se precisar, ou apenas espaço vazio */}
        <div className="h-[100dvh] w-full">
        </div>

        {/* ===============================
            CONTEÚDO DO SITE
        =============================== */}
      </div>

      {/* ===============================
          INDICADOR (OPCIONAL)
      =============================== */}
      <div className="fixed bottom-4 right-4 bg-black/60 px-4 py-2 rounded text-white text-sm z-hud pointer-events-none">
        {Math.floor(scrollPercent * (frames.length || 0)) + 1} / {frames.length}
      </div>
    </>
  );
};

export default Frames;
