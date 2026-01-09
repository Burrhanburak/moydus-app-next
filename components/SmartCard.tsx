"use client";

import React from "react";
import { motion } from "framer-motion";

type Benefit = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

function Card({ title, desc, icon, delay = 0 }: Benefit & { delay?: number }) {
  return (
    <motion.li
      className="bg-[#000000] hover:bg-[#0a0a0a] relative cursor-pointer gap-2 overflow-hidden px-4 py-3 rounded-[20px] border border-[#262626] transition-colors"
      style={{
        marginBlock: "10px",
        minHeight: "110px",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", duration: 0.6, bounce: 0.1, delay }}
    >
      <div className="flex h-fit items-center gap-3 pl-1 pt-1">
        <div className="w-6 h-6 flex items-center justify-center text-white shrink-0">
          {icon}
        </div>
        <span className="text-sm tracking-tight text-white font-medium">
          {title}
        </span>
      </div>
      <p className="px-1 pt-2 pb-1 text-sm text-white/70">{desc}</p>
    </motion.li>
  );
}

export default function SmartCard() {
  const benefits: Benefit[] = [
    {
      title: "Website Design & Development Services",
      desc: "Professional website design and development services focused on performance, accessibility, SEO, and conversion optimization.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white"
        >
          <title>book-open</title>
          <g fill="none">
            <path
              fill="url(#a)"
              d="M19.8 7c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C23 8.52 23 9.08 23 10.2v4.4c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C19.96 21 18.84 21 16.6 21c-.6 0-1.252-.075-1.845.031-.404.072-.725.283-1.061.506-.258.172-.516.393-.821.448-.087.015-.177.015-.357.015h-1.032c-.18 0-.27 0-.357-.015-.305-.055-.563-.276-.82-.448-.337-.223-.658-.434-1.062-.506C8.652 20.925 8 21 7.4 21c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C1 17.96 1 16.84 1 14.6v-4.4c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C2.52 7 3.08 7 4.2 7h15.6Z"
              data-glass="origin"
              mask="url(#b)"
            />
            <path
              fill="url(#a)"
              d="M19.8 7c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C23 8.52 23 9.08 23 10.2v4.4c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C19.96 21 18.84 21 16.6 21c-.6 0-1.252-.075-1.845.031-.404.072-.725.283-1.061.506-.258.172-.516.393-.821.448-.087.015-.177.015-.357.015h-1.032c-.18 0-.27 0-.357-.015-.305-.055-.563-.276-.82-.448-.337-.223-.658-.434-1.062-.506C8.652 20.925 8 21 7.4 21c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C1 17.96 1 16.84 1 14.6v-4.4c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C2.52 7 3.08 7 4.2 7h15.6Z"
              clipPath="url(#d)"
              data-glass="clone"
              filter="url(#c)"
            />
            <path
              fill="url(#e)"
              d="M17.106 2.865c1.331-.296 1.997-.443 2.52-.271a2 2 0 0 1 1.093.876C21 3.943 21 4.625 21 5.99v8.443c0 .916 0 1.374-.162 1.752a2.001 2.001 0 0 1-.669.833c-.334.24-.78.34-1.675.539l-6.147 1.366a2.09 2.09 0 0 1-.26.049 1 1 0 0 1-.174 0 2.09 2.09 0 0 1-.26-.05l-6.147-1.365c-.894-.199-1.341-.298-1.675-.539a2 2 0 0 1-.669-.833C3 15.807 3 15.349 3 14.433V5.99c0-1.364 0-2.046.281-2.519a2 2 0 0 1 1.093-.876c.523-.172 1.189-.025 2.52.271l4.759 1.058c.13.029.194.043.26.049a1 1 0 0 0 .174 0c.066-.006.13-.02.26-.05l4.759-1.057Z"
              data-glass="blur"
            />
            <path
              fill="url(#f)"
              d="M20.25 5.99c0-.696 0-1.17-.032-1.53-.031-.352-.087-.51-.144-.606a1.252 1.252 0 0 0-.683-.548c-.106-.035-.272-.054-.623-.008-.358.047-.82.149-1.5.3L12.51 4.655c-.111.025-.231.053-.357.064a1.76 1.76 0 0 1-.306 0c-.126-.011-.246-.04-.357-.064L6.731 3.598c-.679-.151-1.14-.253-1.499-.3-.35-.046-.517-.027-.623.008-.286.094-.529.29-.683.548-.057.096-.113.254-.144.607-.031.36-.032.833-.032 1.528v8.445c0 .468 0 .78.019 1.022.017.233.047.35.083.433.089.208.234.389.418.521.073.053.18.108.404.175.233.07.537.139.995.24l6.146 1.366.135.029.029.005a.238.238 0 0 0 .043 0l.028-.005.135-.03 6.146-1.365c.458-.101.762-.17.995-.24.223-.067.331-.122.404-.175.184-.132.329-.313.418-.521.036-.083.066-.2.083-.433.018-.242.019-.554.019-1.022V5.989Zm.75 8.444-.003.606c-.008.533-.038.861-.16 1.145l-.057.123a2 2 0 0 1-.611.71l-.13.085c-.322.182-.763.28-1.545.454l-6.147 1.366a2.08 2.08 0 0 1-.26.049 1.009 1.009 0 0 1-.087.004l-.087-.004a1.013 1.013 0 0 1-.106-.016l-.154-.033-6.147-1.366c-.783-.174-1.223-.272-1.544-.454l-.131-.084a2.003 2.003 0 0 1-.669-.834c-.121-.284-.151-.612-.16-1.145L3 14.434V5.989c0-1.279 0-1.958.231-2.428l.05-.09c.216-.363.54-.648.925-.814l.168-.063c.523-.172 1.189-.025 2.52.271l4.76 1.058c.129.029.194.043.26.049a1 1 0 0 0 .173 0c.065-.006.13-.02.26-.05l4.758-1.057c1.332-.296 1.998-.443 2.521-.271.458.15.846.462 1.093.877C21 3.943 21 4.625 21 5.989v8.445Z"
            />
            <defs>
              <linearGradient
                id="a"
                x1="12"
                x2="12"
                y1="7"
                y2="22"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#575757" />
                <stop offset="1" stopColor="#151515" />
              </linearGradient>
              <linearGradient
                id="e"
                x1="21"
                x2="3"
                y1="10.5"
                y2="10.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#E3E3E5" stopOpacity="0.6" />
                <stop offset="1" stopColor="#BBBBC0" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient
                id="f"
                x1="12"
                x2="12"
                y1="2.52"
                y2="12.05"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <clipPath id="d">
                <path
                  fill="url(#e)"
                  d="M17.106 2.865c1.331-.296 1.997-.443 2.52-.271a2 2 0 0 1 1.093.876C21 3.943 21 4.625 21 5.99v8.443c0 .916 0 1.374-.162 1.752a2.001 2.001 0 0 1-.669.833c-.334.24-.78.34-1.675.539l-6.147 1.366a2.09 2.09 0 0 1-.26.049 1 1 0 0 1-.174 0 2.09 2.09 0 0 1-.26-.05l-6.147-1.365c-.894-.199-1.341-.298-1.675-.539a2 2 0 0 1-.669-.833C3 15.807 3 15.349 3 14.433V5.99c0-1.364 0-2.046.281-2.519a2 2 0 0 1 1.093-.876c.523-.172 1.189-.025 2.52.271l4.759 1.058c.13.029.194.043.26.049a1 1 0 0 0 .174 0c.066-.006.13-.02.26-.05l4.759-1.057Z"
                />
              </clipPath>
              <filter
                id="c"
                width="400%"
                height="400%"
                x="-100%"
                y="-100%"
                filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse"
              >
                <feGaussianBlur
                  width="100%"
                  height="100%"
                  x="0%"
                  y="0%"
                  in="SourceGraphic"
                  result="blur"
                  stdDeviation="2"
                />
              </filter>
              <mask id="b">
                <rect width="100%" height="100%" fill="#FFF" />
                <path
                  fill="#000"
                  d="M17.106 2.865c1.331-.296 1.997-.443 2.52-.271a2 2 0 0 1 1.093.876C21 3.943 21 4.625 21 5.99v8.443c0 .916 0 1.374-.162 1.752a2.001 2.001 0 0 1-.669.833c-.334.24-.78.34-1.675.539l-6.147 1.366a2.09 2.09 0 0 1-.26.049 1 1 0 0 1-.174 0 2.09 2.09 0 0 1-.26-.05l-6.147-1.365c-.894-.199-1.341-.298-1.675-.539a2 2 0 0 1-.669-.833C3 15.807 3 15.349 3 14.433V5.99c0-1.364 0-2.046.281-2.519a2 2 0 0 1 1.093-.876c.523-.172 1.189-.025 2.52.271l4.759 1.058c.13.029.194.043.26.049a1 1 0 0 0 .174 0c.066-.006.13-.02.26-.05l4.759-1.057Z"
                />
              </mask>
            </defs>
          </g>
        </svg>
      ),
    },
    {
      title: "E-Commerce Website Development",
      desc: "Custom e-commerce development for brands that need fast, secure, and scalable online stores built for growth.",
      icon: (
        <svg
          viewBox="0 0 256 256"
          width="24"
          height="24"
          className="w-6 h-6"
          fill="currentColor"
        >
          <g>
            <path d="M128,20a12,12,0,0,0-12,12V88a12,12,0,0,0,12,12,28,28,0,1,1-24.26,14A12,12,0,0,0,99.35,97.6l-48.5-28A12,12,0,0,0,34.46,74,108,108,0,1,0,128,20ZM50,96.81l28.2,16.28A52.08,52.08,0,0,0,76,128c0,.5,0,1,0,1.5l-31.43,8.42A83.21,83.21,0,0,1,44,128,84.35,84.35,0,0,1,50,96.81Zm.83,64.3,31.43-8.43A52.2,52.2,0,0,0,116,178.59v32.54A84.26,84.26,0,0,1,50.81,161.11Zm89.19,50V178.59A52,52,0,0,0,140,77.4V44.85a84,84,0,0,1,0,166.28Z" />
          </g>
        </svg>
      ),
    },
    {
      title: "Custom Software & SaaS Development",
      desc: "We build custom software and SaaS platforms tailored to complex business needs, workflows, and long-term scalability.",
      icon: (
        <svg
          viewBox="0 0 256 256"
          width="24"
          height="24"
          className="w-6 h-6"
          fill="currentColor"
        >
          <g>
            <path d="M236,208a12,12,0,0,1-12,12H32a12,12,0,0,1-12-12V48a12,12,0,0,1,24,0V196H224A12,12,0,0,1,236,208ZM116,148a16,16,0,1,0,16-16A16,16,0,0,0,116,148Zm-8-40A16,16,0,1,0,92,92,16,16,0,0,0,108,108ZM76,180a16,16,0,1,0-16-16A16,16,0,0,0,76,180Zm96-48a16,16,0,1,0-16-16A16,16,0,0,0,172,132Zm24-40a16,16,0,1,0-16-16A16,16,0,0,0,196,92Zm-24,72a16,16,0,1,0,16-16A16,16,0,0,0,172,164Z" />
          </g>
        </svg>
      ),
    },
    {
      title: "AI Automation & Workflow Optimization",
      desc: "Automation solutions that integrate AI to improve efficiency, eliminate repetitive tasks, and optimize internal operations.",
      icon: (
        <svg
          viewBox="0 0 256 256"
          width="24"
          height="24"
          className="w-6 h-6"
          fill="currentColor"
        >
          <g>
            <path d="M78,36a42,42,0,1,0,42,42A42,42,0,0,0,78,36Zm0,60A18,18,0,1,1,96,78,18,18,0,0,1,78,96Zm100,24a42,42,0,1,0-42-42A42,42,0,0,0,178,120Zm0-60a18,18,0,1,1-18,18A18,18,0,0,1,178,60ZM78,136a42,42,0,1,0,42,42A42,42,0,0,0,78,136Zm0,60a18,18,0,1,1,18-18A18,18,0,0,1,78,196Zm100-60a42,42,0,1,0,42,42A42,42,0,0,0,178,136Zm0,60a18,18,0,1,1,18-18A18,18,0,0,1,178,196Z" />
          </g>
        </svg>
      ),
    },
    {
      title: "Digital Marketing & Performance Growth",
      desc: "Performance-focused digital marketing strategies that support growth through SEO, conversion optimization, and scalable campaigns.",
      icon: (
        <svg
          viewBox="0 0 256 256"
          width="24"
          height="24"
          className="w-6 h-6"
          fill="currentColor"
        >
          <g>
            <path d="M208,28H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM52,52H76v95.22a24,24,0,1,0,24,0V125l40,40v39H52ZM204,204H164V160a12,12,0,0,0-3.51-8.49L100,91V52h24V72a12,12,0,0,0,3.51,8.49l17.31,17.3a24,24,0,1,0,17-17L148,67V52h56Z" />
          </g>
        </svg>
      ),
    },
  ];

  return (
    <section
      id="benefit"
      className="flex flex-col items-center w-full relative overflow-hidden z-[1] gap-10 rounded-none md:rounded-[10px] py-8 md:py-12 px-[20px] md:px-[100px] scroll-mt-[90px]"
      style={{ height: "min-content" }}
    >
      <div className="flex flex-col items-center gap-[25px] w-full max-w-[600px] md:max-w-[1100px]">
        <div className="flex flex-col items-center gap-0 md:gap-[20px] w-full">
          <h2 className="text-white text-[32px] md:text-[40px] lg:text-4xl leading-[1.1] tracking-[-0.02em] font-semibold text-center md:leading-tight">
            Our Core Services
          </h2>
        </div>

        <ul className="grid w-full mx-auto gap-[10px] md:gap-[15px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min list-none p-0 m-0">
          {benefits.map((b, i) => (
            <Card
              key={i}
              title={b.title}
              desc={b.desc}
              icon={b.icon}
              delay={i * 0.12}
            />
          ))}
        </ul>
      </div>

      <div className="absolute inset-x-0 top-0 right-0 z-0 h-[800px]" />
    </section>
  );
}
