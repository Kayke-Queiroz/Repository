import { useScrollHide } from "../hooks/useScrollHide";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

export default function HeroOverlay() {
  const hidden = useScrollHide(0.3);
  const { t } = useLanguage();

  return (
    <section
      className={`
        fixed top-0 left-0 w-full h-[100dvh] z-hero
        flex items-center
        transition-all duration-500 ease-out
        ${hidden
          ? "opacity-0 -translate-y-16 pointer-events-none"
          : "opacity-100 translate-y-0"}
      `}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 w-full flex flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-6 md:gap-0 mt-16 md:mt-0">

        {/* Left Content */}
        <div className="max-w-2xl space-y-4 md:space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            {t.hero.title}
          </h1>

          <p className="text-lg md:text-xl text-cyan-400 font-medium">
            {t.hero.role}
          </p>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
            {t.hero.description}
          </p>

          <div className="flex justify-center md:justify-start gap-4 pt-4">
            <Link
              to="/curriculo"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-sm md:text-base flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              {t.hero.viewProjects}
            </Link>

            <a
              href="/#contato"
              onClick={() => sessionStorage.setItem('skipFramesLock', 'true')}
              className="px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-bold backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-95 cursor-pointer text-sm md:text-base flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              {t.hero.contactMe}
            </a>
          </div>
        </div>

        {/* Right Image Frame */}
        <div className="relative group animate-float">
          {/* Glow Effect Layer */}
          <div className="absolute -inset-px bg-gradient-to-b from-cyan-400 to-blue-600 rounded-[2rem] opacity-80 blur-md group-hover:opacity-100 transition duration-500"></div>

          {/* Image Container */}
          <div className="relative w-48 h-[280px] sm:w-64 sm:h-[400px] md:w-72 md:h-[450px] rounded-[2rem] bg-gray-900 border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Placeholder for actual image */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
            <img
              src="/assets/icone.png"
              alt={t.hero.imageAlt}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
