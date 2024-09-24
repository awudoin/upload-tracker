"use client";

import { useState, useCallback, useEffect } from "react";

export const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e: MediaQueryListEvent) => setTargetReached(e.matches), []);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`);
        if (media && media.addEventListener) {
            media.addEventListener("change", updateTarget);
        }

        // Check on mount (callback is not called until a change occurs)
        if (media && media.matches) {
            setTargetReached(true);
        }

        if (media && media.removeEventListener) {
            return () => media.removeEventListener("change", updateTarget);
        }
    }, []);

    return targetReached;
};
