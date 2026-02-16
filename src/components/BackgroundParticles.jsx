import TechParticles from './TechParticles';

export default function BackgroundParticles({ show }) {
    return (
        <div
            className={`fixed inset-0 z-0 transition-opacity duration-1000 ${show ? 'opacity-50' : 'opacity-0'}`}
            style={{ pointerEvents: 'none' }}
        >
            <TechParticles
                options={{
                    color: '#22d3ee',
                    connectDistance: 130, // Conexões mais longas
                    particleCount: 100,   // Mais partículas
                    mouseDistance: 200    // Raio de interação maior
                }}
                className="pointer-events-auto"
            />
        </div>
    );
}
