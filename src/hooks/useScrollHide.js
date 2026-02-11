import { useEffect, useState } from "react";

export function useScrollHide(threshold = 0.3) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollLimit = window.innerHeight * threshold;
      setHidden(window.scrollY > scrollLimit);
    };

    onScroll(); // garante estado correto no mount
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}
