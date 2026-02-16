import { useEffect, useRef } from 'react';

export default function useTechParticles(canvasRef, options = {}) {
    // Configurações padrão mescladas com as opções do usuário
    const config = {
        color: options.color || '#22d3ee', // Cyan padrão
        connectColor: options.connectColor || 'rgba(34, 211, 238, 0.2)',
        particleCount: options.particleCount || 80,
        speed: options.speed || 0.5,
        connectDistance: options.connectDistance || 120,
        mouseDistance: options.mouseDistance || 150,
        ...options
    };

    // Refs para manter estado mutável sem re-renderizar
    const particles = useRef([]);
    const mouse = useRef({ x: null, y: null });
    const animationFrameId = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;

        // Classe Particle interna
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * config.speed;
                this.vy = (Math.random() - 0.5) * config.speed;
                this.size = Math.random() * 2 + 1; // Tamanho variável
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce nas bordas
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Interação com Mouse (Repulsa forte)
                if (mouse.current.x != null) {
                    const dx = mouse.current.x - this.x;
                    const dy = mouse.current.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.mouseDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;

                        // Força de repulsão MUITO mais forte
                        const force = (config.mouseDistance - distance) / config.mouseDistance;
                        const directionX = forceDirectionX * force * config.speed * 15; // Aumentado de 5 para 15
                        const directionY = forceDirectionY * force * config.speed * 15;

                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }

            draw() {
                ctx.fillStyle = config.color;
                // Aumentar levemente o tamanho base das partículas
                ctx.fillRect(this.x, this.y, this.size * 1.5, this.size * 1.5);
            }
        }

        // Inicialização
        const init = () => {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
            particles.current = [];
            // Aumentar densidade baseada na área ou fixo
            const density = Math.floor(width * height / 10000); // Ex: 1920x1080 / 10000 = ~200 partículas
            const count = config.particleCount || density;

            for (let i = 0; i < count; i++) {
                particles.current.push(new Particle());
            }
        };

        // Loop de Animação
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Atualizar e desenhar partículas
            particles.current.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Desenhar conexões
            connectParticles();
            connectMouse();

            animationFrameId.current = requestAnimationFrame(animate);
        };

        // Conectar partículas próximas (Constelação)
        const connectParticles = () => {
            const arr = particles.current;
            for (let i = 0; i < arr.length; i++) {
                for (let j = i; j < arr.length; j++) {
                    const dx = arr[i].x - arr[j].x;
                    const dy = arr[i].y - arr[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.connectDistance) {
                        ctx.strokeStyle = config.connectColor;
                        ctx.lineWidth = 1 - distance / config.connectDistance;
                        ctx.beginPath();
                        ctx.moveTo(arr[i].x, arr[i].y);
                        ctx.lineTo(arr[j].x, arr[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Conectar partículas ao mouse
        const connectMouse = () => {
            if (mouse.current.x === null) return;
            const arr = particles.current;
            for (let i = 0; i < arr.length; i++) {
                const dx = arr[i].x - mouse.current.x;
                const dy = arr[i].y - mouse.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.mouseDistance) {
                    ctx.strokeStyle = config.color; // Cor mais forte para mouse
                    ctx.lineWidth = (1 - distance / config.mouseDistance) * 1.5;
                    ctx.beginPath();
                    ctx.moveTo(arr[i].x, arr[i].y);
                    ctx.lineTo(mouse.current.x, mouse.current.y);
                    ctx.stroke();
                }
            }
        };

        // Event Listeners
        const handleResize = () => init();
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
        };
        const handleMouseLeave = () => {
            mouse.current.x = null;
            mouse.current.y = null;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []); // Re-run apenas se refs mudarem (o que não deve acontecer)
}
