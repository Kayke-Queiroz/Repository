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
  // VIRTUAL SCROLL CONTROLLER
  // ===============================
  // Ao invez de depender do scroll da janela (que no celular aguarda a aba sumir),
  // gerenciamos um "scroll virtual" interno só para a animação.
  const [virtualScroll, setVirtualScroll] = useState(0);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const totalVirtualHeight = window.innerHeight * SCROLL_HEIGHT_MULTIPLIER;

  useEffect(() => {
    let ticking = false;
    let animationFrameId;

    // Smooth lerp da posição alvo para a atual
    const updateAnimation = () => {
      // Lerp (interpolação suave)
      currentScroll.current += (targetScroll.current - currentScroll.current) * 0.1;

      const rawPercent = Math.min(1, Math.max(0, currentScroll.current / totalVirtualHeight));

      const wasAtEnd = hasReachedEnd;
      let nextHasReachedEnd = hasReachedEnd;

      if (nextHasReachedEnd && rawPercent < RESET_BELOW) {
        nextHasReachedEnd = false;
      }

      const becomingEndNow = !nextHasReachedEnd && rawPercent >= END_THRESHOLD;

      if (becomingEndNow) {
        nextHasReachedEnd = true;
        setIsScrollLocked(true);
        setTimeout(() => {
          setIsScrollLocked(false);
          // Permite que o scroll nativo assuma a partir daqui movendo a janela real
          window.scrollTo({
            top: window.innerHeight * SCROLL_HEIGHT_MULTIPLIER,
            behavior: 'smooth'
          });
        }, 1000);
      }

      if (hasReachedEnd !== nextHasReachedEnd) {
        setHasReachedEnd(nextHasReachedEnd);
      }

      const stickyEnd = END_THRESHOLD + STICKY_EXTRA_RANGE;
      const canFinish = wasAtEnd && rawPercent >= stickyEnd;

      let effectivePercent;
      if (!nextHasReachedEnd) {
        effectivePercent = rawPercent;
      } else if (!canFinish) {
        effectivePercent = END_THRESHOLD;
      } else {
        effectivePercent = rawPercent;
      }

      setScrollPercent(effectivePercent);

      // Se há diferença notável entre o target e o current, continua animando
      if (Math.abs(targetScroll.current - currentScroll.current) > 0.5) {
        animationFrameId = requestAnimationFrame(updateAnimation);
      } else {
        ticking = false;
        // Sincroniza o state final para o react renderizar uma ultima vez
        setVirtualScroll(currentScroll.current);
      }
    };

    const kickAnimation = () => {
      if (!ticking) {
        ticking = true;
        animationFrameId = requestAnimationFrame(updateAnimation);
      }
    };

    const handleWheel = (e) => {
      // Se não bloqueado e a animação não acabou (scrollPercent < stickyEnd) ou estamos travados no fim
      const stickyEnd = END_THRESHOLD + STICKY_EXTRA_RANGE;
      const isAnimationActive = scrollPercent < stickyEnd;

      // Se a página nativa está rolando (já passou do vídeo), ou a trava expirou e podemos descer nativamente, não interceptamos se for pra baixo
      if (!isAnimationActive && e.deltaY > 0 && !isScrollLocked) return;

      // Se estamos acima, mas o usuário rola pra cima quando o native scroll == 0, interceptamos pra voltar a animação
      if (!isAnimationActive && window.scrollY > 0) return;

      if (isScrollLocked) {
        e.preventDefault();
        return;
      }

      // Impede o scroll nativo enquanto foca na animação
      if (window.scrollY === 0 || isAnimationActive) {
        e.preventDefault();
        targetScroll.current = Math.max(0, Math.min(totalVirtualHeight + 100, targetScroll.current + e.deltaY));
        kickAnimation();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const stickyEnd = END_THRESHOLD + STICKY_EXTRA_RANGE;
      const isAnimationActive = scrollPercent < stickyEnd;

      if (!isAnimationActive && window.scrollY > 0) return;

      if (window.scrollY === 0 || isAnimationActive) {
        // block native scroll
        if (e.cancelable) e.preventDefault();

        if (isScrollLocked) return;

        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        touchStartY = touchY;

        // Multiplicador do swipe (ajuste de sensibilidade)
        targetScroll.current = Math.max(0, Math.min(totalVirtualHeight + 100, targetScroll.current + deltaY * 2.5));
        kickAnimation();
      }
    };

    // Necessário { passive: false } para podermos dar preventDefault e parar o scroll nativo
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Sincronizar native scroll rollback
    const handleNativeScroll = () => {
      if (window.scrollY === 0 && hasReachedEnd) {
        // Se o usuario der um pull-to-refresh ou forçar até o topo na native scroll, volta a animação
        targetScroll.current = 0;
        kickAnimation();
        setHasReachedEnd(false);
      }
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleNativeScroll);
    };
  }, [hasReachedEnd, isScrollLocked, scrollPercent, totalVirtualHeight]);

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
