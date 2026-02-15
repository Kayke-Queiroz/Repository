import { useRef } from 'react';
import useTechParticles from '../hooks/useTechParticles';

const TechParticles = ({ className = "", options = {} }) => {
    const canvasRef = useRef(null);

    // Inicia o hook passando a ref do canvas e opções
    useTechParticles(canvasRef, options);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-auto ${className}`}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default TechParticles;
