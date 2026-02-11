import { useScrollHide } from "../hooks/useScrollHide";

export default function HeroOverlay() {
  const hidden = useScrollHide(0.3);

  return (
    <section
      className={`
        fixed top-0 left-0 w-full h-screen z-hero
        flex items-center
        transition-all duration-500 ease-out
        ${hidden
          ? "opacity-0 -translate-y-16 pointer-events-none"
          : "opacity-100 translate-y-0"}
      `}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 w-full flex justify-between items-center">

        {/* Left Content */}
        <div className="max-w-2xl space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
            Kayke Santos
          </h1>

          <p className="text-xl md:text-2xl text-cyan-400 font-medium">
            Front-end Developer • AI Engineer • Automation Specialist
          </p>

          <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
            I build high-performance interfaces and intelligent automation systems that transform ideas into scalable digital products.
          </p>

          <div className="flex gap-4 pt-4">
            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:scale-105 cursor-pointer">
              View Projects
            </button>

            <button className="px-8 py-3 rounded-lg border border-white/20 hover:border-white/40 text-white font-semibold backdrop-blur-sm transition-all hover:bg-white/5 cursor-pointer">
              Contact Me
            </button>
          </div>
        </div>

        {/* Right Image Frame */}
        <div className="relative group">
          {/* Glow Effect Layer */}
          <div className="absolute -inset-px bg-gradient-to-b from-cyan-400 to-blue-600 rounded-[2rem] opacity-60 blur-md group-hover:opacity-80 transition duration-500"></div>

          {/* Image Container */}
          <div className="relative w-80 h-[500px] rounded-[2rem] bg-gray-900 border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Placeholder for actual image */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
            <img
              src="https://placehold.co/400x600/1e293b/ffffff?text=User+Image"
              alt="Kayke Santos"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
