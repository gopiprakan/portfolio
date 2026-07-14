"use client";

import React from "react";

export default function Wordmark() {
  return (
    <h1 className="text-[13vw] sm:text-[10vw] lg:text-[8.5vw] font-bebas leading-none tracking-tighter select-none flex flex-wrap items-center justify-center md:justify-start text-brand-text">
      <span>G</span>
      <span className="relative inline-flex items-center justify-center mx-[0.03em] select-none">
        {/* Orbit Path and Node */}
        <span className="absolute w-[1.4em] h-[1.4em] rounded-full border border-brand-amber/25 animate-[spin_6s_linear_infinite] pointer-events-none flex items-center justify-center">
          <span className="absolute top-0 w-2 h-2 rounded-full bg-brand-amber shadow-[0_0_10px_#FF8A00,0_0_20px_#FF8A00]" />
        </span>
        {/* Inner Data Core */}
        <span className="absolute w-[0.3em] h-[0.3em] rounded-full bg-brand-green/30 animate-pulse pointer-events-none" />
        <span className="text-brand-amber relative z-10">O</span>
      </span>
      <span>PIPRAKAN</span>
    </h1>
  );
}
