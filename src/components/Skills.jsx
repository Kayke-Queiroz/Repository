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
// Ajuste para garantir que o wrap cubra o espaço necessário
const TOTAL_WIDTH = skills.length * (ITEM_SIZE + GAP);
const RADIUS = 1200; // Raio da curva para calcular ângulo e altura corretamente

const SkillItem = ({ skill, index, x }) => {
    const [isHovered, setIsHovered] = useState(false);
    const styles = categoryStyles[skill.category] || categoryStyles["Tools"];

    // Posição base do item no array original
    const baseOffset = index * (ITEM_SIZE + GAP);

    // Transformação mágica para o loop infinito
    // Calcula a posição deste item considerando o deslocamento total (x)
    const position = useTransform(x, (currentX) => {
        // Posição "bruta" somando o drag
        const rawPos = baseOffset + currentX;

        // Wrapper: Faz o item "teletransportar" quando sai da tela
        // O deslocamento precisa ser centralizado para que o loop seja suave em ambas direções
        // ((val % mod) + mod) % mod é a fórmula segura para módulo com negativos
        const wrappedPos = ((rawPos + (TOTAL_WIDTH / 2)) % TOTAL_WIDTH + TOTAL_WIDTH) % TOTAL_WIDTH - (TOTAL_WIDTH / 2);

        return wrappedPos;
    });

    // Distância do zero (centro da tela)
    const dist = useTransform(position, (pos) => Math.abs(pos));

    // Curva Circular: Correlaciona rotação e altura baseada em um círculo (RADIUS)
    const y = useTransform(position, (pos) => {
        // Normaliza posição linear para radianos
        const theta = pos / RADIUS;
        // Fórmula do arco circular: y = -R * (1 - cos(theta))
        // Isso cria a curva "tigela" (smile), onde o centro é 0 e as bordas sobem (negativo)
        return -1 * RADIUS * (1 - Math.cos(theta));
    });

    const rotate = useTransform(position, (pos) => {
        const theta = pos / RADIUS;
        return theta * (180 / Math.PI);
    });

    const scale = useTransform(dist, (d) => {
        // Se estiver longe demais (quase saindo do loop visual), pode diminuir ainda mais ou desaparecer
        const s = 1 - (d / 1500);
        return Math.max(s, 0.6);
    });

    const zIndex = useTransform(dist, (d) => 100 - Math.floor(d / 10));

    // Opacidade para esconder suavemente nas bordas do loop se necessário, 
    // mas o design pede infinito contínuo.
    // Vamos manter a opacidade baseada na distância para foco central.
    const opacity = useTransform(dist, d => {
        const op = 1 - Math.pow(d / 900, 2);
        return Math.max(op, 0); // Evitar valores negativos
    });

    return (
        <motion.div
            style={{
                // Usamos 'x' aqui (que é a prop 'position' transformada) em vez de left
                x: position,
                y,
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

    return (
        <section className="relative h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden bg-black/40 z-0">

            <div className="absolute top-16 z-10 text-center pointer-events-none">
                <h2 className="text-5xl font-bold text-white tracking-tight drop-shadow-xl">Tech Stack</h2>
                <div className="w-12 h-1 bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_cyan]" />
            </div>

            {/* 
        Container de Drag Principal.
        Não tem restrições (dragConstraints) para permitir loop infinito.
        Não aplicamos { x } no style deste container, pois visualmente ele não se move;
        apenas passamos o valor de x para os filhos calcularem suas posições.
      */}
            <motion.div
                className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
                drag="x"
                style={{ x }}
            /* 
               IMPORTANTE: Ao não restringir o drag, x cresce infinitamente.
               Nossa lógica de módulo nos filhos cuida do loop.
               O 'style={{x}}' aqui é necessário para que o motion value seja atualizado pelo gesto,
               mas como é um container vazio/invisível (layout flex), o movimento visual ocorre nos filhos absolutos.
               ESPERA: Se aplicarmos 'x' no container, ele vai sair da tela.
               CORREÇÃO: O drag do framer motion aplica o transform automaticamente no elemento draggável.
               Para loop infinito "virtual", precisamos de um truque:
               Usar um elemento invisível para capturar o drag ou usar values manuais.
               
               MELHOR ABORDAGEM SIMPLIFICADA:
               Deixar o usuário arrastar este container. O container VAI se mover.
               Mas nós não queremos que o container saia do lugar, queremos apenas o VALOR.
               Então removemos o `style={{ x }}` visual (passando null ou não passando) e usamos onDrag.
               Mas `drag="x"` força a aplicação do transform.
               
               SOLUÇÃO: Usar um MotionValue proxy ou resetar.
               Mas para simplificar: Deixe o drag funcionar "livre", mas visualmente os itens 
               são posicionados com `left: 50%` e `x` calculado. 
               Se o container pai se mover, tudo se move junto e quebra o loop visual fixo.
               
               TRUQUE: Drag em um elemento transparente, que atualiza o MotionValue `x` externo.
            */
            >
                {/* 
                    Overlay invisível para capturar o drag.
                    Ele cobre tudo.
                */}
                <motion.div
                    className="absolute inset-0 z-20"
                    drag="x"
                    // Sem constraints
                    style={{ x }} // O framer precisa aplicar style em algo para o drag funcionar nativamente fluidamente
                // Mas se aplicarmos x nele, ele vai embora.
                // Truque: resetar o x dele? Não, isso trava.
                // Vamos usar `dragListener={false}` e controlar manualmente? Pode ser complexo.

                // SOLUÇÃO ELEGANTE:
                // O `drag` altera o `x`. Nós NÃO aplicamos esse `x` como style de transform no container visual dos itens.
                // Aplicamos numa div fantasma ou usamos a ref.
                // Mas espere, se eu passar `style={{ x }}` para o motion.div que tem `drag`, ele aplica `transform: translateX(...)`.
                // Se eu NÃO passar `style={{ x }}`, ele AINDA aplica via style inline injetado pelo gesto.

                // Vamos tentar: Um container transparente gigante que o user arrasta.
                // Ele vai se delocar infinitamente? Sim.
                // Os itens são filhos dele? NÃO. Eles devem ser irmãos para ficarem parados no centro da tela (fixos no referencial do pai section),
                // e *apenas* sua posição X calculada muda.
                />
            </motion.div>

            {/* Container dos Itens (Fixo visualmente na tela, recebe o valor de x) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {skills.map((skill, index) => (
                    // Pointer events auto para permitir hover nos itens (que estão acima do drag overlay pelo zIndex?)
                    // Se o z-index dos itens for maior que o overlay de drag, o drag falha em cima do item.
                    // Se for menor, o hover falha.
                    // SOLUÇÃO: Os itens também podem ser "draggables" mas apenas propagar o evento?
                    // Ou melhor: O container de drag está *atrás*?
                    // Se o usuário clicar no item e arrastar, deve funcionar.
                    // Então `pointer-events-none` aqui é ruim. 

                    // Vamos colocar os itens DENTRO do container de drag?
                    // Se o container de drag se move, os itens se movem duplamente (pai + calculo).

                    // REVISÃO DE ESTRATÉGIA:
                    // Deixamos a estrutura original onde o pai é draggável.
                    // Mas usamos `useTransform` para ANULAR o movimento do pai nos filhos, e aplicar o movimento de loop?
                    // Matemágica: CriançaX = (PaiX + Offset) % Loop - PaiX. 
                    // Isso cancelaria o movimento do pai visualmente e deixaria só o loop.

                    // OU MAIS SIMPLES:
                    // `drag` em um elemento, mas os itens renderizados FORA dele.
                    // Vamos tentar essa: Itens fora. O elemento de drag é um "fantasma" por cima (z-index alto) ou por baixo?
                    // Se for por cima, bloqueia hover. Se for por baixo, click no item não arrasta.
                    // A menos que passemos a ref de drag controls.

                    // Vamos tentar a estratégia "Drag Proxy" com pointer-events.
                    <SkillItem
                        key={index}
                        skill={skill}
                        index={index}
                        x={x}
                    />
                ))}
            </div>

            {/* 
                CORREÇÃO DE UX:
                Para permitir arrastar clicando nos itens E no fundo:
                Precisamos de um Drag Overlay que fique no z-index apropriado.
                Ou simplesmente fazer o wrap principal ser o drag listener, mas NÃO aplicar o transform CSS nele.
                O Framer Motion permite `useMotionValue` sem aplicar no style se você não passar no prop style.
                MAS o comportamento padrão do `drag` é modificar o layout.
                
                Workaround comum:
                1. Crie um div transparente `motion.div` com `drag="x" style={{ x }}` que seja invisível e grande.
                2. Os itens reagem a esse `x`.
                3. Para que o hover funcione, os itens devem estar ACIMA (z-index maior).
                4. Mas se os itens estão acima, o drag não funciona neles.
                5. A menos que os itens passem os eventos para baixo (`pointer-events-none`?), mas aí o hover não funciona.
                
                SOLUÇÃO CORRETA - DRAG CONTROLS?
                Não, muito complexo para agora.
                
                SOLUÇÃO PRAGMÁTICA INVISÍVEL:
                O container principal é o DRAGGER. Ele tem opacity 0 (ou transparent).
                Ele cresce infinitamente para os lados (width muito grande? Não, translate).
                Se ele sair da tela, paramos de conseguir arrastar?
                Sim, eventualmente o elemento "vai embora".
                
                MELHOR SOLUÇÃO (usada em carrosseis infinitos framer):
                Não use `drag` nativo do elemento se ele vai fugir.
                Use um container que reseta a posição (loop) ou use listeners de pan manualmente.
                
                Vamos tentar `onPan` no container principal em vez de `drag`.
            */}
            <PanHandler x={x} />

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
                // Atualiza o valor de x baseado no delta do movimento
                x.set(x.get() + info.delta.x * sensitivity);
            }}
            style={{ touchAction: "none" }} // Importante para mobile
        />
    );
};
