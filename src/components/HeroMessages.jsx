import { useScrollShow } from "../hooks/useScrollShow";
import { useLanguage } from "../context/LanguageContext";

export default function HeroMessages() {
    // Start showing at 1.66 viewport height (Frame ~140)
    const showStart = useScrollShow(1.65);
    // Stop showing IMMEDIATELY after Frame 168 (~200vh). 
    // 2.05 gives a tiny buffer so it doesn't flicker during the lock itself.
    const showEnd = useScrollShow(2.05);

    const isVisible = showStart && !showEnd;
    const { t } = useLanguage();

    return (
        <div
            className={`
        fixed inset-0 z-hero pointer-events-none
        flex flex-col justify-end px-6 md:px-20 pb-32
        transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
`}
        >
            <div className="w-full flex justify-between items-start">
                {/* Left Message */}
                <div
                    className={`
            flex flex-col gap-2 max-w-md text-left
            transition-all duration-1000 delay-100
            ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}
    `}
                >
                    <h2 className="text-2xl md:text-5xl font-bold text-white leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                        {t.heroMessages.left.transforming}<br />
                        <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">{t.heroMessages.left.ideas}</span>
                    </h2>
                    <p className="text-lg md:text-2xl text-cyan-50 font-light tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {t.heroMessages.left.into}
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
                    <h2 className="text-2xl md:text-5xl font-bold text-white leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                        {t.heroMessages.right.from}<br />
                        <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">{t.heroMessages.right.to}</span>
                    </h2>
                    <p className="text-lg md:text-2xl text-cyan-50 font-light tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {t.heroMessages.right.real}
                    </p>
                </div>
            </div>
        </div>
    );
}
