"use client";

import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import Feature from "@/components/Feature";
import PricingCard from "@/components/PricingCard";
import Testimional from "@/components/Testimional";
import Stats from "@/components/Stats";
import { motion } from "framer-motion";
import Intro from "@/components/Intro";
import Hero from "@/components/Hero";
import GridTemplate from "@/components/GridTemplate";
import Collec from "@/components/Collec";
import { Skiper54 } from "@/components/CarouselSpiker";
import GridTemp from "@/components/GridTemp";
import BentoGrid from "@/components/BnetoGrid";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#000000] font-sans overflow-hidden">
      {/* Dot Pattern Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 1,
        }}
        style={{
          backgroundImage: "url('/pattern.png')",
          backgroundSize: "65px auto",
          backgroundPosition: "left top",
          backgroundRepeat: "repeat",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto text-center items-center justify-center flex flex-col w-full h-min">
          <Hero />
          <GridTemplate />
          <Intro />
          <BentoGrid />
          {/* <BetonGridSecond /> */}
          <Feature />
          <GridTemp />
          <Collec />
          <Stats />
          <Skiper54 />
          {/* <SlideCard /> */}
          <PricingCard />
          {/* <SectionGrid /> */}
          <Testimional />
          <Faq />
        </div>
        <div className="container mx-auto">
          <Cta />
        </div>
      </div>
    </div>
  );
}
