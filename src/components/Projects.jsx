import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// Configuração do Carrossel
const CARD_WIDTH = 300; // Reduzido de 350
const CARD_GAP = 40;   // Reduzido levemente o gap

const ProjectCard = ({ project, index, x, t }) => {
    // ... (mesma lógica de estado e hooks)
    const [isHovered, setIsHovered] = useState(false);

    // Original static tech list and urls
    const staticData = [
        { tech: ["Javascript", "Google Books API", "Firebase"], github: "https://github.com/Kayke-Queiroz/Acervo-Digital-de-Livros", url: "https://leitura-para-todos-a18e8.web.app/" },
        { tech: ["Next.js", "Stripe", "Tailwind"], github: "https://github.com/Kayke-Queiroz", url: "#" },
        { tech: ["Python", "LangChain", "Vector DB"], github: "https://github.com/Kayke-Queiroz", url: "#" },
        { tech: ["React Native", "Firebase", "Expo"], github: "https://github.com/Kayke-Queiroz", url: "#" },
        { tech: ["React", "D3.js", "AWS"], github: "https://github.com/Kayke-Queiroz", url: "#" },
    ];

    const projectStatic = staticData[index] || { tech: [], github: "#", url: "#" };
    const TOTAL_WIDTH = 5 * (CARD_WIDTH + CARD_GAP);

    // Posição base do card no carrossel
    const baseOffset = index * (CARD_WIDTH + CARD_GAP);

    // Lógica de loop infinito
    const rawPosition = useTransform(x, (currentX) => {
        const raw = baseOffset + currentX;
        const wrapped = ((raw + (TOTAL_WIDTH / 2)) % TOTAL_WIDTH + TOTAL_WIDTH) % TOTAL_WIDTH - (TOTAL_WIDTH / 2);
        return wrapped;
    });

    // Opacidade e Escala baseadas na distância do centro
    const dist = useTransform(rawPosition, (pos) => Math.abs(pos));

    const scale = useTransform(dist, (d) => {
        const maxDistance = TOTAL_WIDTH / 2;
        const s = 1 - (d / maxDistance) * 0.4; // Escala mínima de 0.6 nas bordas
        return Math.max(s, 0.6);
    });

    const opacity = useTransform(dist, (d) => {
        const maxDistance = TOTAL_WIDTH / 3;
        if (d < maxDistance) return 1;
        const op = 1 - ((d - maxDistance) / 400);
        return Math.max(op, 0);
    });

    const zIndex = useTransform(dist, (d) => 100 - Math.floor(d / 10));

    const statusMap = [t.projects.status.dev, t.projects.status.done, t.projects.status.done, t.projects.status.done, t.projects.status.dev];
    const statusLabel = statusMap[index] || t.projects.status.dev;

    return (
        <motion.div
            style={{
                x: rawPosition,
                scale: isHovered ? 1.05 : scale,
                opacity,
                zIndex: isHovered ? 200 : zIndex,
                left: "50%",
                marginLeft: -(CARD_WIDTH / 2), // Centralizar horizontalmente
            }}
            className="absolute top-10 w-[300px] h-[400px] rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl flex flex-col overflow-hidden shadow-2xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Indicador de Status */}
            <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {statusLabel}
            </div>

            {/* Conteúdo do Card */}
            <div className="p-6 flex flex-col h-full relative z-10 pt-10">

                {/* Título e Descrição */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors tracking-tight">
                    {project.name}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-grow line-clamp-4">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {projectStatic.tech.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Botões */}
                <div className="mt-auto flex gap-2">
                    <a
                        href={projectStatic.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold flex items-center justify-center gap-2 text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        {t.projects.viewProject}
                    </a>
                    <a
                        href={projectStatic.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 
                flex items-center justify-center gap-2
                text-xs font-bold text-white
                transition-all duration-300
                hover:bg-white/10 hover:border-white/20
                active:scale-95
                cursor-pointer
              "
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        {t.projects.github}
                    </a>
                </div>
            </div>

            {/* Efeitos Decorativos */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none" />
        </motion.div>
    );
};

export default function Projects() {
    const x = useMotionValue(0);
    const { t } = useLanguage();
    const projectsList = t.projects.list;

    const handleNext = () => {
        // Move um card para a esquerda (negativo)
        const current = x.get();
        const target = current - (CARD_WIDTH + CARD_GAP);
        // Animação suave poderia ser feita com animate() do framer, mas set() é instantâneo.
        // Vamos usar uma transição simples diminuindo o valor.
        x.set(target);
    };

    const handlePrev = () => {
        // Move um card para a direita (positivo)
        const current = x.get();
        const target = current + (CARD_WIDTH + CARD_GAP);
        x.set(target);
    };

    return (
        <section id="projetos" className="relative h-[800px] w-full flex flex-col items-center justify-center overflow-hidden pt-[40px] pb-64">

            {/* Título da Seção */}
            <div className="z-10 text-center pointer-events-none mb-16 px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-xl">
                    {t.projects.title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-6 rounded-full shadow-[0_0_15px_cyan]" />
                <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
                    {t.projects.subtitle}
                </p>
            </div>

            {/* Container do Carrossel */}
            <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">

                {/* Setas de Navegação (Visíveis em Mobile e Desktop) */}
                <button
                    onClick={handlePrev}
                    className="absolute left-2 md:left-20 top-[85%] -translate-y-1/2 z-50 p-2 md:p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all backdrop-blur-md group flex items-center justify-center cursor-pointer active:scale-95"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>

                <button
                    onClick={handleNext}
                    className="absolute right-2 md:right-20 top-[85%] -translate-y-1/2 z-50 p-2 md:p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all backdrop-blur-md group flex items-center justify-center cursor-pointer active:scale-95"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>

                {/* Cards (Agora com z-40 para ficar ACIMA do Handler e permitir cliques) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
                    {projectsList.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            x={x}
                            t={t}
                        />
                    ))}
                </div>
            </div>

        </section>
    );
}
