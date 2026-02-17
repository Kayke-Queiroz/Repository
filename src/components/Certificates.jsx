import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// --- DADOS MOCKADOS (Pode ser movido para arquivo separado depois) ---
import gitWebp from "../assets/videos/certificates/certificado.webp";

const certificatesData = [
    {
        id: 1,
        title: "React Integrando seu projeto React com APIs",
        issuer: "Alura",
        duration: "8h",
        year: "2024",
        category: "Front-end",
        // Link externo para ver/baixar o certificado original
        link: "https://cursos.alura.com.br/certificate/4d416954-4aa9-40c2-90a6-123456789",
        // Arquivo de imagem (preview)
        image: gitWebp
    },
    {
        id: 2,
        title: "Next.js: explorando o framework",
        issuer: "Alura",
        duration: "10h",
        year: "2024",
        category: "Front-end",
        link: "#",
        image: gitWebp
    },
    {
        id: 3,
        title: "Node.js: Criando sua primeira biblioteca",
        issuer: "Alura",
        duration: "12h",
        year: "2023",
        category: "Back-end",
        link: "#",
        image: gitWebp
    },
    {
        id: 4,
        title: "Tailwind CSS: Estilizando a sua página com classes utilitárias",
        issuer: "Alura",
        duration: "8h",
        year: "2023",
        category: "Front-end",
        link: "#",
        image: gitWebp
    },
    {
        id: 5,
        title: "IA Generativa: Ferramentas e aplicações",
        issuer: "Alura",
        duration: "6h",
        year: "2024",
        category: "AI & Automation",
        link: "#",
        image: gitWebp
    },
    {
        id: 6,
        title: "Git e GitHub: Controle e compartilhe seu código",
        issuer: "Alura",
        duration: "6h",
        year: "2022",
        category: "Tools",
        link: "#",
        image: gitWebp
    }
];

const categories = ["All", "Front-end", "Back-end", "AI & Automation", "Tools"];

export default function Certificates() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [flippedId, setFlippedId] = useState(null);
    const { t } = useLanguage();

    const filteredCertificates = selectedCategory === "All"
        ? certificatesData
        : certificatesData.filter(cert => cert.category === selectedCategory);

    const handleCardClick = (id) => {
        setFlippedId(flippedId === id ? null : id);
    };

    const categoryLabels = {
        "All": t.certificates.categories.all,
        "Front-end": t.certificates.categories.frontend,
        "Back-end": t.certificates.categories.backend,
        "AI & Automation": t.certificates.categories.ai,
        "Tools": t.certificates.categories.tools,
    };

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-8 mb-20">
            {/* Header Expansível */}
            <motion.div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer group flex flex-col items-center justify-center mb-8"
            >
                <div className="flex items-center gap-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-xl group-hover:text-cyan-400 transition-colors duration-300">
                        {t.certificates.title}
                    </h2>
                    <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-3xl text-cyan-500"
                    >
                        ▼
                    </motion.span>
                </div>
                <div className={`w-36 h-1 bg-cyan-500 mt-4 rounded-full shadow-[0_0_10px_cyan] transition-all duration-300 ${isOpen ? 'w-48' : 'w-36'}`} />
            </motion.div>

            {/* Conteúdo Expansível */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        {/* Filtros */}
                        <div className="flex flex-wrap justify-center gap-2 mb-10 pt-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    border border-white/10 backdrop-blur-sm
                    ${selectedCategory === cat
                                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                                            : "bg-black/40 text-gray-400 hover:bg-white/10 hover:text-white"}
                  `}
                                >
                                    {categoryLabels[cat] || cat}
                                </button>
                            ))}
                        </div>

                        {/* Grid de Certificados */}
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredCertificates.map((cert) => {
                                    const isFlipped = flippedId === cert.id;

                                    return (
                                        <div key={cert.id} className="relative h-[250px] group perspective-1000">
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, scale: 0.9, rotateY: 0 }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    rotateY: isFlipped ? 180 : 0
                                                }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                                                onClick={() => handleCardClick(cert.id)}
                                                className="w-full h-full relative preserve-3d cursor-pointer"
                                                style={{ transformStyle: "preserve-3d" }}
                                            >
                                                {/* --- FRENTE DO CARTÃO --- */}
                                                <div
                                                    className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col justify-between z-10"
                                                    style={{
                                                        backfaceVisibility: "hidden",
                                                        WebkitBackfaceVisibility: "hidden",
                                                        transform: "rotateY(0deg) translateZ(1px)"
                                                    }}
                                                >
                                                    {/* Detalhes Superiores */}
                                                    <div>
                                                        <div className="flex justify-between items-start mb-4">
                                                            <span className={`
                                  text-xs font-bold px-2 py-1 rounded border
                                  ${cert.category === 'Front-end' ? 'border-blue-500/50 text-blue-400 bg-blue-500/10' :
                                                                    cert.category === 'Back-end' ? 'border-purple-500/50 text-purple-400 bg-purple-500/10' :
                                                                        cert.category === 'AI & Automation' ? 'border-green-500/50 text-green-400 bg-green-500/10' :
                                                                            'border-orange-500/50 text-orange-400 bg-orange-500/10'}
                                `}>
                                                                {categoryLabels[cert.category] || cert.category}
                                                            </span>
                                                            <span className="text-gray-500 text-xs font-mono">{cert.year}</span>
                                                        </div>

                                                        <h3 className="text-lg font-bold text-white mb-1 leading-snug group-hover:text-cyan-300 transition-colors">
                                                            {cert.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-400 mb-4">{cert.issuer}</p>
                                                    </div>

                                                    {/* Detalhes Inferiores e Botão */}
                                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                            {cert.duration}
                                                        </span>

                                                        <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 opacity-100 group-hover:text-cyan-300 transition-colors">
                                                            {t.certificates.details}
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* --- VERSO DO CARTÃO (IMAGEM) --- */}
                                                <div
                                                    className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-black border-2 border-cyan-500 flex flex-col"
                                                    style={{
                                                        backfaceVisibility: "hidden",
                                                        WebkitBackfaceVisibility: "hidden",
                                                        transform: "rotateY(180deg) translateZ(1px)",
                                                        opacity: isFlipped ? 1 : 0,
                                                        transition: "opacity 0.3s",
                                                        transitionDelay: isFlipped ? "0.2s" : "0s"
                                                    }}
                                                >
                                                    {/* Imagem do Certificado (Cobre TUDO, sem espaços) */}
                                                    <div className="flex-1 w-full relative overflow-hidden bg-black">
                                                        <img
                                                            src={cert.image}
                                                            alt={`Certificate ${cert.title}`}
                                                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" // object-cover remove espaços brancos
                                                        />

                                                        {/* Overlay gradiente para legibilidade dos botões se necessário */}
                                                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
                                                    </div>

                                                    {/* Botões Sobrepostos na Imagem (parte inferior) */}
                                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-3 px-4 z-20">
                                                        <a
                                                            href={cert.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex justify-center items-center gap-2 border border-cyan-400/30 backdrop-blur-sm"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                                            {t.certificates.open}
                                                        </a>

                                                        <button
                                                            className="bg-black/60 hover:bg-red-500/80 text-white p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 transform hover:rotate-90"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleCardClick(cert.id);
                                                            }}
                                                            title={t.certificates.close}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>

                        {filteredCertificates.length === 0 && (
                            <div className="text-center text-gray-500 py-10">
                                {t.certificates.empty}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
