import Navbar from "../components/navbar";
import { useLanguage } from "../context/LanguageContext";
import TechParticles from "../components/TechParticles";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function Curriculo() {
    const { t } = useLanguage();

    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            {/* Background Particles */}
            <div className="fixed inset-0 z-0">
                <TechParticles
                    options={{
                        color: '#22d3ee',
                        connectDistance: 130,
                        particleCount: 80,
                        mouseDistance: 200
                    }}
                    className="opacity-40 pointer-events-auto"
                />
            </div>

            <Navbar />

            <div className="relative z-10 pt-32 pb-20 px-4 md:px-20 flex flex-col items-center">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 drop-shadow-sm">
                        {t.curriculum.title}
                    </h1>
                    <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full shadow-[0_0_15px_cyan]" />
                </motion.div>

                {/* A4 Container and Action Bar Wrapper */}
                <div className="flex flex-col gap-8 items-center w-full max-w-[210mm]">

                    {/* Action Bar (Download) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="w-full flex justify-end"
                    >
                        <a
                            href={`/assets/documents/${t.curriculum.filename}`} // Placeholder path
                            download
                            className="
                                flex items-center gap-3 px-6 py-3 rounded-full 
                                bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm tracking-wider uppercase
                                shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]
                                transition-all duration-300 transform hover:-translate-y-1 active:scale-95
                                border border-cyan-400/30 backdrop-blur-md
                            "
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {t.curriculum.download}
                        </a>
                    </motion.div>

                    {/* A4 Paper Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="
                            relative w-full aspect-[1/1.414] 
                            bg-white text-black 
                            rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] 
                            overflow-hidden
                        "
                    >
                        <iframe
                            src={`/assets/documents/${t.curriculum.filename}`}
                            className="w-full h-full"
                            title="Curriculum Preview"
                        />
                    </motion.div>

                </div>
            </div>
            <Footer />
        </div>
    );
}
