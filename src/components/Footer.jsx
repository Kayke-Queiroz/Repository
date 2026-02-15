
const Footer = () => {
    const currentYear = new Date().getFullYear();

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
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 6 6 5.5.5 1 8-4.5 9.5-8-1-9-1.5-1-6.5-7.5-3 3-5 5 1-2.5-1-4.9.5-7.5 3-3-2.5-3.5-5 .5-8 1.5-1.5 8 8 2.5 8 4.5 0 9 1.5 3 2.5 4.5.5 1 .5 1 .5 1.5 0 2 0 4.5-.5 7-1.5 5.5-.5 1-.5 1-1.5.5-1.5 1-1.5 2 0 2 0 4.5.5 7 1.5 5.5-.5 1M9 18c-4.51 2-5-2-7-2" />
                </svg>
            ),
        },
        {
            name: "Instagram",
            url: "https://instagram.com/seuusuario", // Substitua pelo seu usuário real
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
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
            ),
        },
        {
            name: "Email",
            url: "mailto:contato@kaykesantos.com", // Substitua pelo seu email real
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
            url: "https://wa.me/5511999999999", // Substitua pelo seu número real
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
        <footer className="relative w-full bg-black/40 backdrop-blur-md border-t border-white/10 pt-16 pb-8">
            {/* Background Decorativo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
                {/* Logo / Título */}
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 tracking-tight">
                    Kayke Queiroz dos Santos
                </h2>

                <p className="text-gray-400 text-center max-w-lg mb-10 text-lg leading-relaxed">
                    Desenvolvedor Web

                </p>

                {/* Links Sociais */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.name}
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
                                {link.name}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <div className="w-full border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-center text-sm text-gray-500 gap-4">
                    <p>
                        &copy; {currentYear} Kayke Santos. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-6">
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
