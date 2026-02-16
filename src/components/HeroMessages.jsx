import { useScrollShow } from "../hooks/useScrollShow";

export default function HeroMessages() {
    // Start showing at 1.66 viewport height (Frame ~140)
    const showStart = useScrollShow(1.65);
    // Stop showing IMMEDIATELY after Frame 168 (~200vh). 
    // 2.05 gives a tiny buffer so it doesn't flicker during the lock itself.
    const showEnd = useScrollShow(2.05);

    const isVisible = showStart && !showEnd;

    return (
        <div
            className={`
        fixed inset-0 z-hero pointer-events-none
        flex items-center justify-between px-6 md:px-20 pb-20
        transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
`}
        >
            {/* Left Message */}
            <div
                className={`
          flex flex-col gap-2 max-w-md text-left
          transition-all duration-1000 delay-100
          ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}
`}
            >
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    Transforming<br />
                    <span className="text-cyan-400">Ideas</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                    Into Real Projects
                </p>
            </div>

            {/* Right Message */}
            <div
                className={`
          flex flex-col gap-2 max-w-md text-right
          transition-all duration-1000 delay-300
          ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}
`}
            >
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    From Idea<br />
                    <span className="text-cyan-400">To Innovation</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                    Real-World Solutions
                </p>
            </div>
        </div>
    );
}
