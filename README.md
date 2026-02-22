# Portfolio - Kayke

Um projeto de portfólio pessoal desenvolvido para apresentar projetos, habilidades e currículo. A aplicação conta com um design moderno, animações interativas e suporte a idiomas.

## 🚀 Tecnologias Utilizadas

As principais ferramentas e bibliotecas utilizadas neste projeto são:

- **[React](https://react.dev/)**: Biblioteca JavaScript para construção da interface de usuário.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build rápida para desenvolvimento web.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utilitário para estilização rápida e responsiva.
- **[Framer Motion](https://www.framer.com/motion/)**: Biblioteca para criação de animações fluidas em componentes React.
- **[React Router DOM](https://reactrouter.com/)**: Navegação e roteamento entre as páginas da aplicação.

## ⚙️ Funcionalidades

- Exibição de projetos e certificados.
- Carrossel interativo de habilidades (Skills Carousel).
- Efeito de partículas interativas no fundo.
- Múltiplos idiomas (Internacionalização).
- Design 100% responsivo para todos os dispositivos.

##  Arquitetura e Performance

Para garantir a melhor fluidez possível e contornar os limites técnicos de internet e requisições HTTP, o projeto adota arquiteturas avançadas de performance:

### 1. Animação Hero com Sprite Sheet
Em vez de engasgar o carregamento baixando 168 imagens individuais (frames) para montar a animação interativa (Canvas Scrubbing), nós consolidamos as 168 imagens sequenciais em uma **única imagem JPG Sprite Sheet gigante**. 
- **O Ganho:** Isso reduz 168 requisições de servidores para **apenas 1 download veloz**, eliminando engarrafamento de rede.
- **A Execução:** O JavaScript no elemento `<canvas>` calcula as coordenadas e "recorta" visualmente a parte correspondente do *Sprite Sheet* à medida que o usuário rola o mouse. Este método garante 60fps constantes sem travar a decodificação da máquina (onde WebP e MP4 falhariam em rolagens progressivas bidirecionais).

### 2. Lazy Loading Progressivo
Além do Hero, rotas e componentes secundários ("Sobre", "Jornada", "Habilidades") são envelopados em limites assíncronos (`React.lazy`). O navegador só deposita o esforço de baixar e processar os arquivos na memória se estiverem visíveis, acelerando a pontuação de percepção visual.
    
