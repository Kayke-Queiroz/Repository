import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const JourneyCard = ({ data, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: data.side === "left" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative flex flex-row items-center justify-between w-full mb-24"
        >
            {/* Lado Esquerdo (Texto ou Vazio) */}
            <div className="w-5/12 text-right pr-8">
                {index % 2 === 0 && (
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full -mr-10 -mt-10 blur-xl group-hover:bg-cyan-500/20 transition-colors" />

                        <span className="text-5xl font-bold text-white/5 absolute -bottom-4 left-4 font-mono group-hover:text-cyan-500/10 transition-colors select-none">
                            {data.year}
                        </span>

                        <div className="text-cyan-400 font-mono text-sm mb-2 tracking-widest uppercase font-bold">
                            {data.year}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                            {data.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            {data.description}
                        </p>
                    </div>
                )}
            </div>

            {/* Nó Central (Conexão) */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_cyan] z-20 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-full animate-ping opacity-30" />
                <div className="absolute w-8 h-8 border border-cyan-500/30 rounded-full animate-spin-slow" />
            </div>

            {/* Lado Direito (Texto ou Vazio) */}
            <div className="w-5/12 text-left pl-8">
                {index % 2 !== 0 && (
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-20 h-20 bg-cyan-500/10 rounded-br-full -ml-10 -mt-10 blur-xl group-hover:bg-cyan-500/20 transition-colors" />

                        <span className="text-5xl font-bold text-white/5 absolute -bottom-4 right-4 font-mono group-hover:text-cyan-500/10 transition-colors select-none">
                            {data.year}
                        </span>

                        <div className="text-cyan-400 font-mono text-sm mb-2 tracking-widest uppercase font-bold">
                            {data.year}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                            {data.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            {data.description}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default function Journey() {
    const containerRef = useRef(null);
    const { t } = useLanguage();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Need to assign 'side' property to milestones from translations, or just alternate based on index
    const milestones = t.journey.milestones.map((m, i) => ({
        ...m,
        side: i % 2 === 0 ? "left" : "right"
    }));

    return (
        <section id="trajeto" className="relative w-full py-20 overflow-hidden">

            {/* Título Section */}
            <div className="text-center mb-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="inline-block"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-tighter filter drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                        {t.journey.title}
                    </h2>
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-2 opacity-50 blur-[1px]" />
                    <p className="text-gray-400 mt-4 tracking-widest text-sm uppercase">{t.journey.subtitle}</p>
                </motion.div>
            </div>

            <div className="max-w-[1000px] mx-auto px-4 relative" ref={containerRef}>

                {/* Linha Central (Trilho Background) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 rounded-full overflow-hidden h-full z-0">
                    {/* Linha de Progresso (Foreground) */}
                    <motion.div
                        style={{ scaleY, transformOrigin: "top" }}
                        className="w-full h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_15px_cyan]"
                    />
                </div>

                {/* Milestones */}
                <div className="relative z-10 pt-10 pb-10">
                    {milestones.map((milestone, index) => (
                        <div key={index} className="flex justify-center w-full">
                            <JourneyCard data={milestone} index={index} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Efeitos de Fundo Ambientais */}
            <div className="absolute top-1/3 -left-64 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-1/3 -right-64 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow delay-1000" />
        </section>
    );
}

// Nota: Adicione 'animate-spin-slow' e 'animate-pulse-slow' no globals ou tailwind config se desejar,
// ou use classes padrão do Tailwind, como 'animate-spin' com duration customizada.
