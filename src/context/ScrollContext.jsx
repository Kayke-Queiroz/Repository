import React, { createContext, useContext, useState, useEffect } from 'react';

const ScrollContext = createContext({
    scrollY: 0,
    setVirtualScroll: () => { },
});

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
    const [scrollY, setScrollY] = useState(0);
    const [virtualScroll, setVirtualScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Se não há virtual scroll rolando, usa o real
            if (virtualScroll === 0) {
                setScrollY(window.scrollY);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [virtualScroll]);

    // Sempre que o virtualScroll via Frames é atualizado, ele vira o centro das atenções
    useEffect(() => {
        if (virtualScroll > 0) {
            setScrollY(virtualScroll);
        } else if (virtualScroll === 0) {
            setScrollY(window.scrollY);
        }
    }, [virtualScroll]);


    return (
        <ScrollContext.Provider value={{ scrollY, setVirtualScroll }}>
            {children}
        </ScrollContext.Provider>
    );
};
