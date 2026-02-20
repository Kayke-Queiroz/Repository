import { useEffect, useState } from "react";
import { useScroll } from "../context/ScrollContext";

export function useScrollShow(threshold = 1.0) {
    const [show, setShow] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        // Show when scrolled PAST the threshold (e.g. 100vh)
        const scrollLimit = window.innerHeight * threshold;
        setShow(scrollY > scrollLimit);
    }, [threshold, scrollY]);

    return show;
}
