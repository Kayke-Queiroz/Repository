import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'curriculum', label: t.navbar.curriculum, path: '/curriculo' },
    { key: 'projects', label: t.navbar.projects, path: '/#projetos' },
    { key: 'contact', label: t.navbar.contact, path: '/#contato' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-nav
        bg-black/80 backdrop-blur-md
        border-b border-white/10
      "
    >
      <nav
        className="
          max-w-[1600px] mx-auto
          flex items-center justify-between
          px-6 h-16 md:h-20
        "
      >
        {/* Logo (Left) */}
        <Link
          to="/"
          className="
            text-xl md:text-2xl font-bold tracking-widest text-cyan-400
            drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]
            uppercase
            hover:text-cyan-300 transition-colors cursor-pointer
            z-50
          "
          onClick={closeMenu}
        >
          Kayke.Santos
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Internal Links */}
          <ul className="flex gap-8 text-base font-medium text-gray-300">
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
                    onClick={() => sessionStorage.setItem('skipFramesLock', 'true')}
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

          {/* Divider */}
          <div className="w-px h-6 bg-white/20"></div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="text-2xl hover:scale-110 transition-transform"
            title="Switch Language"
          >
            {language === 'pt' ? '🇺🇸' : '🇧🇷'}
          </button>

          {/* Social Icons (GitHub/LinkedIn) */}
          <div className="flex gap-4">
            {/* GitHub */}
            <a
              href="https://github.com/Kayke-Queiroz"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all"
            >
              <svg viewBox="0 0 98 96" className="w-5 h-5 fill-gray-300 group-hover:fill-cyan-400 transition-colors" xmlns="http://www.w3.org/2000/svg">
                <path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 0 48.9043 0C21.8203 0 0 22.1074 0 49.1914C0 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/kayke-queiroz-dos-santos-031804265/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-300 group-hover:fill-cyan-400 transition-colors" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white z-50 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            // Close Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        <div
          className={`
              absolute top-full left-0 w-full
              bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-cyan-900/20
              flex flex-col items-center py-6 gap-6
              transition-all duration-300 origin-top md:hidden
              ${isMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'}
           `}
        >
          <ul className="flex flex-col items-center gap-6 w-full">
            {navItems.map((item) => (
              <li key={item.key} className="w-full text-center">
                {item.key === 'curriculum' ? (
                  <Link
                    to={item.path}
                    className="block py-2 text-lg font-medium text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-all"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.path}
                    className="block py-2 text-lg font-medium text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-all"
                    onClick={() => {
                      sessionStorage.setItem('skipFramesLock', 'true');
                      closeMenu();
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="w-1/3 h-px bg-white/10"></div>

          {/* Footer: Language + Socials Side-by-Side */}
          <div className="flex items-center gap-8">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="text-2xl hover:scale-110 transition-transform"
              title="Switch Language"
            >
              {language === 'pt' ? '🇺🇸' : '🇧🇷'}
            </button>

            <div className="w-px h-6 bg-white/20"></div>

            {/* Social Icons */}
            <div className="flex gap-6">
              <a
                href="https://github.com/Kayke-Queiroz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg viewBox="0 0 98 96" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 0 48.9043 0C21.8203 0 0 22.1074 0 49.1914C0 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/kayke-queiroz-dos-santos-031804265/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
