"use client";

import React, { useRef, useEffect } from "react";

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  glowColor?: "purple" | "cyan" | "pink" | "multi";
}

export default function GlassCard({
  children,
  className = "",
  id,
  glowColor = "purple",
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Skip hover effect computations on touch devices to conserve resources
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

  const getGlowGradient = () => {
    switch (glowColor) {
      case "cyan":
        return "rgba(6, 182, 212, 0.15)";
      case "pink":
        return "rgba(236, 72, 153, 0.15)";
      case "multi":
        return "radial-gradient(180px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.12) 0%, rgba(6, 182, 212, 0.12) 50%, rgba(236, 72, 153, 0.08) 100%)";
      case "purple":
      default:
        return "rgba(139, 92, 246, 0.15)";
    }
  };

  const getBorderColor = () => {
    switch (glowColor) {
      case "cyan":
        return "rgba(6, 182, 212, 0.25)";
      case "pink":
        return "rgba(236, 72, 153, 0.25)";
      case "multi":
        return "rgba(139, 92, 246, 0.25)";
      case "purple":
      default:
        return "rgba(139, 92, 246, 0.25)";
    }
  };

  return (
    <div
      ref={cardRef}
      id={id}
      className={`glass-panel rounded-2xl relative overflow-hidden group/glass transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Background Interactive Glow Layer */}
      <div
        className="absolute inset-0 opacity-0 group-hover/glass:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: glowColor === "multi"
            ? getGlowGradient()
            : `radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${getGlowGradient()}, transparent 80%)`,
        }}
      />

      {/* Subtle Glow Border outline on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover/glass:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          border: `1px solid ${getBorderColor()}`,
          borderRadius: "inherit",
          maskImage: "radial-gradient(140px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 100%, transparent)",
          WebkitMaskImage: "radial-gradient(140px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 100%, transparent)",
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
