"use client";

import { useState, useEffect } from "react";

export function useScreenSize() {
    const [width, setWidth] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleResize = () => setWidth(window.innerWidth);
        handleResize(); // Initialize once
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = width !== null && width < 768;
    const isTablet = width !== null && width >= 768 && width < 1024;
    const isDesktop = width !== null && width >= 1024;
    const isHD = width !== null && width >= 1920;

    return { width, isMobile, isTablet, isDesktop, isHD };
}