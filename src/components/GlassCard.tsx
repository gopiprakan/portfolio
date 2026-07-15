"use client";

import React, { useRef, useEffect } from "react";

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export default function GlassCard({
  children,
  className = "",
  id,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Skip hover calculations on touch screens
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      id={id}
      className={`glass-panel rounded-2xl relative overflow-hidden group/glass transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.03)] ${className}`}
    >
      {/* Background Interactive White Glow Layer */}
      <div
        className="absolute inset-0 opacity-0 group-hover/glass:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: "radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.04), transparent 80%)",
        }}
      />

      {/* Stark White Glow Border outline on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover/glass:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "inherit",
          maskImage: "radial-gradient(130px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 100%, transparent)",
          WebkitMaskImage: "radial-gradient(130px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 100%, transparent)",
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
