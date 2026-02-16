import { useEffect, useState } from "react";

export function useScrollShow(threshold = 1.0) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            // Show when scrolled PAST the threshold (e.g. 100vh)
            const scrollLimit = window.innerHeight * threshold;
            setShow(window.scrollY > scrollLimit);
        };

        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    return show;
}
