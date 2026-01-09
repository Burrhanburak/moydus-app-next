import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "default" | "dark";
}

export const Logo = ({ className, variant = "default" }: LogoProps) => {
  return (
    <div className={`flex items-end gap-0.5 ${className || ""}`}>
      {/* Wrapper sabit oranlı olsun */}
      <div className="relative w-[42px] h-[22px] flex-shrink-0 flex items-center justify-center">
        {/* Light mode logo */}
        <Image
          src="/m.svg"
          alt="Moydus"
          fill
          loading="lazy"
          className={`object-contain ${
            variant === "dark" ? "hidden" : "block dark:hidden"
          }`}
          sizes="42px"
        />

        {/* Dark mode logo */}
        <Image
          src="/moy-black.svg"
          alt="Moydus"
          fill
          loading="lazy"
          className={`object-contain ${
            variant === "dark" ? "block" : "hidden dark:block"
          }`}
          sizes="42px"
        />

        <span className="text-[7px] font-medium text-white leading-none select-none pt-0.5 -mb-4 ml-8">
          ®
        </span>
      </div>
      <div className="relative w-[42px] h-[22px] flex-shrink-0 flex items-center justify-center">
        <span className="text-xs font-medium text-white leading-none select-none p-0.9">
          Moydus
        </span>
      </div>
    </div>
  );
};
