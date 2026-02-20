import { useEffect, useState } from "react";
import { useScroll } from "../context/ScrollContext";

export function useScrollHide(threshold = 0.3) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const scrollLimit = window.innerHeight * threshold;
    setHidden(scrollY > scrollLimit);
  }, [threshold, scrollY]);

  return hidden;
}
