import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();
    const [copiedText, setCopiedText] = useState(null);

    const handleCopy = (e, text) => {
        e.preventDefault();
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
    };

    const socialLinks = [
        {
            name: "GitHub",
            url: "https://github.com/Kayke-Queiroz",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/kayke-santos-engenheiro-de-software/?locale=pt_BR",
            icon: (
                <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
        },
        {
            name: "Email",
            url: "kayke7kk@gmail.com", // Substitua pelo seu email real
            isCopy: true,
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            ),
        },
        {
            name: "WhatsApp",
            url: "(77) 999529094", // Substitua pelo seu número real
            isCopy: true,
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
            ),
        },
    ];

    return (
        <footer id="contato" className="relative w-full backdrop-blur-md border-t border-white/10 pt-16 pb-8">
            {/* Background Decorativo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
                {/* Logo / Título */}
                <h2 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 tracking-tight">
                    {t.footer.title}
                </h2>

                <p className="text-gray-400 text-center max-w-lg mb-10 text-lg leading-relaxed">
                    {t.footer.role}
                </p>

                {/* Links Sociais */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.isCopy ? "#" : link.url}
                            target={link.isCopy ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            aria-label={link.name}
                            onClick={link.isCopy ? (e) => handleCopy(e, link.url) : undefined}
                            className="
                group relative p-4 rounded-xl bg-white/5 border border-white/10
                flex items-center justify-center
                transition-all duration-300
                hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]
              "
                        >
                            <div className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300">
                                {link.icon}
                            </div>
                            {/* Tooltip simples */}
                            <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-cyan-400 font-mono tracking-widest whitespace-nowrap pointer-events-none">
                                {copiedText === link.url ? t.footer.copied : link.name}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <div className="w-full border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-center text-sm text-gray-500 gap-4">
                    <p>
                        &copy; {currentYear} {t.footer.rights}
                    </p>
                    <div className="flex gap-6">
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
