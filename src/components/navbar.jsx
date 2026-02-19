import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();

  const navItems = [
    { key: 'curriculum', label: t.navbar.curriculum, path: '/curriculo' },
    { key: 'projects', label: t.navbar.projects, path: '#projetos' },
    { key: 'contact', label: t.navbar.contact, path: '#contato' },
  ];

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-nav
        bg-black/10 backdrop-blur-md
        border-y border-white/10
      "
    >
      <nav
        className="
          max-w-[1600px] mx-auto
          flex items-center justify-between
          px-6 h-12
        "
      >
        {/* Logo (Left) */}
        <Link
          to="/"
          className="
            text-xl font-bold tracking-widest text-cyan-400
            drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]
            uppercase
            hover:text-cyan-300 transition-colors cursor-pointer
          "
        >
          Kayke.Santos
        </Link>

        {/* Right Side: Links + Icon */}
        <div className="flex items-center gap-6">
          {/* Internal Links */}
          <ul className="flex gap-6 text-base font-medium text-gray-300">
            {navItems.map((item) => (
              <li key={item.key} className="relative group">
                {item.key === 'curriculum' ? (
                  <Link
                    to={item.path}
                    className="transition-colors duration-300 group-hover:text-cyan-400"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.path}
                    className="transition-colors duration-300 group-hover:text-cyan-400"
                  >
                    {item.label}
                  </a>
                )}
                {/* Linha animada */}
                <span
                  className="
                    absolute left-0 -bottom-1
                    h-[2px] w-0 bg-cyan-400
                    transition-all duration-300
                    group-hover:w-full
                    shadow-[0_0_8px_rgba(34,211,238,0.8)]
                  "
                />
              </li>
            ))}
          </ul>

          {/* Icon Divider */}
          <div className="w-px h-8 bg-white/20"></div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="
              text-xl font-bold text-gray-300 hover:text-cyan-400 transition-colors
              flex items-center gap-2
            "
            title="Switch Language"
          >
            {language === 'pt' ? '🇺🇸' : '🇧🇷'}
          </button>

          {/* GitHub Icon */}
          <a
            href="https://github.com/Kayke-Queiroz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="
              group p-2 rounded-full bg-white/5 border border-white/10
              hover:bg-white/10 hover:border-cyan-400/50
              transition-all duration-300
            "
          >
            <svg
              viewBox="0 0 98 96"
              className="
                w-6 h-6
                fill-gray-300
                transition-all duration-300
                group-hover:fill-cyan-400
                group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]
              "
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 0 48.9043 0C21.8203 0 0 22.1074 0 49.1914C0 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" />
            </svg>
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/kayke-queiroz-dos-santos-031804265/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="
              group p-2 rounded-full bg-white/5 border border-white/10
              hover:bg-white/10 hover:border-cyan-400/50
              transition-all duration-300
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="
                w-6 h-6
                fill-gray-300
                transition-all duration-300
                group-hover:fill-cyan-400
                group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]
              "
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
