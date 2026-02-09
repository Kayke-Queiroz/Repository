import { useEffect, useState } from "react";

export default function useLoading(duration = 2000) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration]);

    return isLoading;
}
