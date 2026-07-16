"use client";

import React, { useRef, useEffect, useState } from "react";

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  glowColor?: "violet" | "cyan" | "pink" | "green" | "white";
  tiltEnabled?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  id,
  glowColor = "violet",
  tiltEnabled = true,
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");

  const glowStyles = {
    violet: {
      bgGlow: "rgba(139, 92, 246, 0.05)",
      borderGlow: "rgba(139, 92, 246, 0.3)",
      glowClass: "shadow-[0_0_30px_rgba(139,92,246,0.03)]",
    },
    cyan: {
      bgGlow: "rgba(6, 182, 212, 0.05)",
      borderGlow: "rgba(6, 182, 212, 0.3)",
      glowClass: "shadow-[0_0_30px_rgba(6,182,212,0.03)]",
    },
    pink: {
      bgGlow: "rgba(236, 72, 153, 0.05)",
      borderGlow: "rgba(236, 72, 153, 0.3)",
      glowClass: "shadow-[0_0_30px_rgba(236,72,153,0.03)]",
    },
    green: {
      bgGlow: "rgba(16, 185, 129, 0.05)",
      borderGlow: "rgba(16, 185, 129, 0.3)",
      glowClass: "shadow-[0_0_30px_rgba(16,185,129,0.03)]",
    },
    white: {
      bgGlow: "rgba(255, 255, 255, 0.03)",
      borderGlow: "rgba(255, 255, 255, 0.2)",
      glowClass: "shadow-[0_0_30px_rgba(255,255,255,0.02)]",
    },
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      if (tiltEnabled) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6; // max 6 deg
        setTransformStyle(
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
        );
      }
    };

    const handleMouseLeave = () => {
      if (tiltEnabled) {
        setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [tiltEnabled]);

  const selectColor = glowStyles[glowColor];

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      style={{ 
        transform: transformStyle,
        transition: transformStyle ? "transform 0.1s ease-out" : "transform 0.5s ease"
      }}
      className={`glass-panel rounded-2xl relative overflow-hidden group/glass border border-white/5 bg-[#0a0a0d]/75 ${selectColor.glowClass} ${className}`}
    >
      {/* Dynamic Laser sweeping line on top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/glass:translate-x-[100%] transition-transform duration-1000 ease-out z-20 pointer-events-none" />

      {/* Dynamic light tracking overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover/glass:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(280px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${selectColor.bgGlow}, transparent 80%)`,
        }}
      />

      {/* Border glow highlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover/glass:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          border: `1px solid ${selectColor.borderGlow}`,
          borderRadius: "inherit",
          maskImage: "radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 100%, transparent)",
          WebkitMaskImage: "radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 100%, transparent)",
        }}
      />

      {/* Subtly glowing back bubble */}
      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-white/[0.01] blur-xl pointer-events-none group-hover/glass:bg-white/[0.02] transition-colors duration-500" />

      {/* Content slot */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
