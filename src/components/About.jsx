import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const [offsetY, setOffsetY] = useState(0);
    const { t } = useLanguage();

    // Parallax simples para um efeito "divertido" de profundidade
    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            id="sobre"
            className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
        >
            {/* Background Decorativo Animado */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/4 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl opacity-50 animate-pulse"
                    style={{ transform: `translateY(${offsetY * 0.2}px)` }}
                />
                <div
                    className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"
                    style={{ transform: `translateY(${offsetY * -0.1}px)` }}
                />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">

                {/* Lado Esquerdo: Imagem com Moldura Cyberpunk */}
                <div className="relative group perspective-1000">
                    <div
                        className="
              relative w-full max-w-md mx-auto aspect-[3/4] 
              rounded-xl overflow-hidden
              border border-white/10
              transition-all duration-500
              group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]
            "
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                        {/* Linhas de scan */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,3px_100%] pointer-events-none" />

                        <img
                            src="https://placehold.co/600x800/1e293b/ffffff?text=Me"
                            alt={t.about.imageAlt}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />

                        {/* Texto flutuante na imagem */}
                        <div className="absolute bottom-6 left-6 z-30">
                            <div className="text-cyan-400 text-xs font-mono mb-1 tracking-widest uppercase">
                                {t.about.identityVerified}
                            </div>
                            <div className="text-white text-xl font-bold font-mono">
                                {t.about.devTag}
                            </div>
                        </div>
                    </div>

                    {/* Elementos decorativos flutuantes atrás */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-xl -z-10 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-xl -z-10 transition-all duration-500 group-hover:-translate-x-2 group-hover:translate-y-2" />
                </div>

                {/* Lado Direito: Conteúdo de Texto */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            {t.about.title}
                        </h2>
                        <div className="h-1 w-20 bg-cyan-500 rounded-full" />
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        {t.about.p1}
                    </p>

                    <p className="text-gray-400 text-lg leading-relaxed">
                        {t.about.p2}
                    </p>

                    <div className="pt-4">
                        <div className="inline-flex flex-wrap gap-4">
                            {t.about.traits.map((trait, index) => (
                                <div
                                    key={trait}
                                    className="
                    px-4 py-2 rounded-full border border-white/10 bg-white/5
                    text-gray-300 font-medium
                    hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400
                    transition-all duration-300 cursor-default
                    animate-fade-in
                  "
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <span className="mr-2 text-cyan-500">#</span>
                                    {trait}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botão "Fun" */}
                    <button
                        className="
              group relative px-8 py-3 bg-transparent overflow-hidden rounded-lg
              transition-all duration-300
            "
                    >
                        <div className="absolute inset-0 w-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-[250ms] ease-out group-hover:w-full opacity-100" />
                        <span className="relative text-cyan-400 group-hover:text-white font-bold tracking-wide transition-colors duration-300">
                            {t.about.button}
                        </span>
                        <div className="absolute inset-0 border border-cyan-500/30 rounded-lg pointer-events-none" />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default About;
