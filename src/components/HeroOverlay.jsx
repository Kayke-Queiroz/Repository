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
      <div className="max-w-6xl mx-auto px-8 w-full flex justify-between items-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold text-white">
            Kayke Santos
          </h1>
          <p className="mt-4 text-cyan-400 text-lg">
            Front-end Developer • UI • Motion
          </p>
        </div>

        <div className="w-72 h-96 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
          FOTO
        </div>
      </div>
    </section>
  );
}
