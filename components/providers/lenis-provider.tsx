"use client";
import Lenis from "@studio-freight/lenis";
import { FC, useEffect, ReactNode } from "react";

interface LenisScrollProviderProps {
  children: ReactNode;
}

const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  
  return <>{children}</>;
};

export default LenisScrollProvider;
