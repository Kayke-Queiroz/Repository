import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

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

const ITEM_SIZE = 120;
const GAP = 40;
const TOTAL_WIDTH = skills.length * (ITEM_SIZE + GAP);

const SkillItem = ({ skill, index, x }) => {
    const [isHovered, setIsHovered] = useState(false);
    const styles = categoryStyles[skill.category] || categoryStyles["Tools"];

    // Posição estática do item dentro do container
    const myOffset = index * (ITEM_SIZE + GAP) - (TOTAL_WIDTH / 2) + (ITEM_SIZE / 2);

    // Posição global atual = posição do container (x) + meu offset
    const globalX = useTransform(x, (currentX) => currentX + myOffset);

    // Distância do centro da tela (assumindo que o container está centralizado)
    const dist = useTransform(globalX, (val) => Math.abs(val));

    // Curva U Suave: 
    // No centro (dist=0) -> y=0 (baixo)
    // Nas bordas -> y negativo (sobe)
    // Fórmula: y = -1 * (dist^2 / divisor)
    const y = useTransform(dist, (d) => -1 * (d * d) / 1000);

    const scale = useTransform(dist, (d) => {
        const s = 1 - (d / 1500); // Decai suavemente
        return Math.max(s, 0.6);
    });

    const rotate = useTransform(globalX, (gx) => gx / 20); // Rotação suave baseada na posição

    const zIndex = useTransform(dist, (d) => 100 - Math.floor(d / 10));

    return (
        <motion.div
            style={{
                // Apenas transformações estéticas. A posição X é definida pelo layout estático do pai + drag do pai.
                // MAS precisamos posicionar este item absolutamente dentro do container pai
                left: `calc(50% + ${myOffset}px)`, // Posição base
                y,           // Curva
                scale: isHovered ? 1.3 : scale,
                rotate,
                zIndex: isHovered ? 200 : zIndex,
                opacity: useTransform(dist, d => 1 - Math.pow(d / 900, 2))
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
                    className={`absolute top-full mt-2 px-3 py-1 rounded bg-black/90 border border-${styles.color}-500/30 text-${styles.color}-400 text-xs font-bold whitespace-nowrap shadow-xl z-[201]`}
                >
                    {skill.name}
                </motion.div>
            )}
        </motion.div>
    );
};

export default function Skills() {
    const x = useMotionValue(0);
    // Limites do drag para não "fugir" infinitamente
    const constraint = TOTAL_WIDTH / 2;

    return (
        <section className="relative h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden bg-black/40 z-0">

            <div className="absolute top-16 z-10 text-center pointer-events-none">
                <h2 className="text-5xl font-bold text-white tracking-tight drop-shadow-xl">Tech Stack</h2>
                <div className="w-12 h-1 bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_cyan]" />
            </div>

            {/* 
        Container de Drag Principal.
        Ele ocupa a largura, mas o user arrasta ele.
      */}
            <motion.div
                className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
                drag="x"
                dragConstraints={{ left: -constraint, right: constraint }}
                style={{ x }}
                whileTap={{ cursor: "grabbing" }}
            >
                {/* Renderiza itens "absolutos" dentro deste container móvel */}
                {skills.map((skill, index) => (
                    <SkillItem
                        key={index}
                        skill={skill}
                        index={index}
                        x={x}
                    />
                ))}
            </motion.div>

        </section>
    );
}
