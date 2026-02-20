import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// Configuração de dados
const skills = [
    { name: "JavaScript", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "HTML", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "React", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Tailwind", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Node.js", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "OpenAI API", category: "AI & Automation", icon: null },
    { name: "n8n", category: "AI & Automation", icon: null },
    { name: "AI Agents", category: "AI & Automation", icon: null },
    { name: "Git", category: "Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", category: "Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Figma", category: "Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Postman", category: "Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
    { name: "WordPress", category: "Platforms", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg" },
    { name: "WooCommerce", category: "Platforms", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg" },
    { name: "Vercel", category: "Platforms", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
];

const categoryStyles = {
    "Languages": { color: "blue", border: "border-blue-500/50", bg: "bg-blue-900/20" },
    "Frameworks": { color: "purple", border: "border-purple-500/50", bg: "bg-purple-900/20" },
    "AI & Automation": { color: "cyan", border: "border-cyan-500/50", bg: "bg-cyan-900/20" },
    "Tools": { color: "orange", border: "border-orange-500/50", bg: "bg-orange-900/20" },
    "Platforms": { color: "green", border: "border-green-500/50", bg: "bg-green-900/20" },
};

// --- CONFIGURAÇÃO DE GEOMETRIA ---
const ITEM_SIZE = 120; // Tamanho visual da bolinha
const GAP_ARC = 150;   // [AJUSTÁVEL] Espaçamento entre os itens ao longo do arco (em pixels de arco). Aumente para separar, diminua para juntar.
const RADIUS = 1600;   // Raio do círculo virtual

// Comprimento total do arco ocupado por todos os itens
const TOTAL_ARC = skills.length * GAP_ARC;

const SkillItem = ({ skill, index, x }) => {
    const [isHovered, setIsHovered] = useState(false);
    const styles = categoryStyles[skill.category] || categoryStyles["Tools"];

    // Posição base do item no arco (em pixels de comprimento de arco)
    const baseOffset = index * GAP_ARC;

    // Transformação: Calcula a posição linear "virtual" (distância percorrida no perímetro)
    const rawPosition = useTransform(x, (currentX) => {
        const raw = baseOffset + currentX;
        // Wrapper infinito usando o comprimento total do arco
        const wrapped = ((raw + (TOTAL_ARC / 2)) % TOTAL_ARC + TOTAL_ARC) % TOTAL_ARC - (TOTAL_ARC / 2);
        return wrapped;
    });

    // Posição Real X na tela (Projeção do Círculo)
    // Se estivéssemos olhando de frente para um anel girando: x = R * sin(theta)
    const xPos = useTransform(rawPosition, (pos) => {
        const theta = pos / RADIUS; // Converte arco para ângulo (u = r * theta => theta = u / r)
        return RADIUS * Math.sin(theta);
    });

    // Posição Real Y na tela (Curvatura)
    // y = -R * (1 - cos(theta)) para fazer a "barriga"
    const yPos = useTransform(rawPosition, (pos) => {
        const theta = pos / RADIUS;
        // Ajuste fino: Se o ângulo for muito grande (> 90 graus), o cos fica negativo e o item "caí".
        // O design pede apenas um arco suave inferior.
        return -1 * RADIUS * (1 - Math.cos(theta));
    });

    // Rotação: Acompanha o ângulo do arco
    const rotate = useTransform(rawPosition, (pos) => {
        const theta = pos / RADIUS;
        return theta * (180 / Math.PI);
    });

    // Distância linear do centro (para escala e z-index)
    const dist = useTransform(rawPosition, (pos) => Math.abs(pos));

    const scale = useTransform(dist, (d) => {
        // Escala diminui conforme se afasta do centro
        const s = 1 - (d / (TOTAL_ARC / 2));
        return Math.max(s, 0.6);
    });

    const zIndex = useTransform(dist, (d) => 100 - Math.floor(d / 10));

    // Opacidade para desaparecer suavemente se "der a volta" atrás (opcional, mas bom pra 3D)
    // Como estamos num arco frontal, apenas diminuímos nas bordas extremas
    const opacity = useTransform(dist, d => {
        const limit = TOTAL_ARC / 3; // Começa a sumir a partir de 1/3 do caminho
        if (d < limit) return 1;
        const op = 1 - ((d - limit) / 500);
        return Math.max(op, 0);
    });

    return (
        <motion.div
            style={{
                x: xPos,
                y: yPos,
                scale: isHovered ? 1.3 : scale,
                rotate,
                zIndex: isHovered ? 200 : zIndex,
                opacity
            }}
            className={`
        absolute top-1/2 -mt-[60px] -ml-[60px] 
        w-[120px] h-[120px]
        flex items-center justify-center
        rounded-full
        backdrop-blur-md
        border-2 ${styles.border}
        ${styles.bg}
        shadow-[inset_0_0_20px_rgba(0,0,0,0.5),0_0_15px_rgba(0,0,0,0.3)]
        cursor-grab active:cursor-grabbing
        group
        transition-colors duration-300
        left-[50%] 
      `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`absolute inset-0 rounded-full opacity-20 bg-${styles.color}-500 blur-lg group-hover:opacity-40 transition-opacity`} />

            <div className="relative z-10 w-16 h-16 p-2">
                {skill.icon ? (
                    <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain drop-shadow-lg" draggable={false} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-white font-bold text-xs text-center leading-tight">{skill.name}</span>
                    </div>
                )}
            </div>

            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 20 }}
                    className={`absolute top-full mt-2 px-3 py-1 rounded bg-black/90 border border-${styles.color}-500/30 text-${styles.color}-400 text-xs font-bold whitespace-nowrap shadow-xl z-[201] pointer-events-none`}
                >
                    {skill.name}
                </motion.div>
            )}
        </motion.div>
    );
};

export default function Skills() {
    const x = useMotionValue(0);
    const { t } = useLanguage();

    const categoryLabels = {
        "Languages": t.skills.categories.languages,
        "Frameworks": t.skills.categories.frameworks,
        "AI & Automation": t.skills.categories.ai,
        "Tools": t.skills.categories.tools,
        "Platforms": t.skills.categories.platforms,
    };

    return (
        <section className="relative h-[100dvh] w-full flex flex-col items-center justify-start overflow-hidden z-0 pt-20">

            <div className="z-10 text-center pointer-events-none mb-10">
                <h2 className="text-5xl font-bold text-white tracking-tight drop-shadow-xl">{t.skills.title}</h2>
                <div className="w-12 h-1 bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_cyan]" />
            </div>

            {/* Container do Carrossel */}
            <div className="relative w-full h-[500px] flex items-center justify-center">
                {/* Handler de Drag Invisível */}
                <PanHandler x={x} />

                {/* Itens */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 top-20">
                    {skills.map((skill, index) => (
                        <SkillItem
                            key={index}
                            skill={skill}
                            index={index}
                            x={x}
                        />
                    ))}
                </div>
            </div>

            {/* Legenda de Categorias */}
            <div className="absolute bottom-10 flex flex-wrap justify-center gap-6 z-20 px-4">
                {Object.entries(categoryStyles).map(([category, style]) => (
                    <div key={category} className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                        <div
                            className={`w-3 h-3 rounded-full bg-${style.color}-500`}
                            style={{ boxShadow: `0 0 8px ${style.color}` }}
                        />
                        <span className={`text-xs font-medium text-${style.color}-300 uppercase tracking-wider`}>
                            {categoryLabels[category] || category}
                        </span>
                    </div>
                ))}
            </div>

        </section>
    );
}

// Handler invisível que captura o gesto de arrastar e atualiza o MotionValue manualmente
const PanHandler = ({ x }) => {
    // Fator de sensibilidade
    const sensitivity = 1.5;

    return (
        <motion.div
            className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
            onPan={(e, info) => {
                x.set(x.get() + info.delta.x * sensitivity);
            }}
            style={{ touchAction: "none" }}
        />
    );
};
