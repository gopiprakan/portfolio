"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  originalColor: string;
  glow: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const rippleRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; active: boolean } | null>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 65;

    // Tailored theme colors: neon cyan, violet, and clean white
    const colors = [
      "rgba(6, 182, 212, 0.4)", // Cyber Cyan
      "rgba(139, 92, 246, 0.4)", // Cyber Violet
      "rgba(255, 255, 255, 0.5)", // Bright White
      "rgba(236, 72, 153, 0.4)",  // Cyber Pink
    ];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        const alpha = Math.random() * 0.4 + 0.15;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 0.6,
          alpha: alpha,
          baseAlpha: alpha,
          color: color,
          originalColor: color,
          glow: Math.random() > 0.8,
        });
      }
    };

    const triggerRipple = (x: number, y: number) => {
      rippleRef.current = {
        x,
        y,
        radius: 0,
        maxRadius: 180,
        active: true,
      };

      // Spawn bright spark particles on click
      const sparkColors = ["#06b6d4", "#8b5cf6", "#ec4899", "#ffffff"];
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 1.0;
        const life = Math.random() * 30 + 20;
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 1.5 + 0.5,
          alpha: 1.0,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
          life,
          maxLife: life,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const ripple = rippleRef.current;
      const sparks = sparksRef.current;

      // Update and draw click shockwave ripple
      if (ripple && ripple.active) {
        ripple.radius += 4;
        if (ripple.radius >= ripple.maxRadius) {
          ripple.active = false;
        } else {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          const opacity = (1 - ripple.radius / ripple.maxRadius) * 0.12;
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // Update and draw sparks
      sparksRef.current = sparks.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.98;
        s.vy *= 0.98;
        s.life -= 1;
        s.alpha = s.life / s.maxLife;

        if (s.life <= 0) return false;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fill();
        return true;
      });

      // Update and draw main node particles
      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Gravity pull to mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const attractionLimit = 150;

          if (dist < attractionLimit) {
            // Pull slightly towards mouse
            const force = (attractionLimit - dist) / attractionLimit;
            p.x += (dx / dist) * force * 0.3;
            p.y += (dy / dist) * force * 0.3;
            
            // Brighten particle alpha near mouse
            p.alpha = Math.min(0.8, p.baseAlpha + force * 0.35);
          } else {
            // Ease back to original alpha
            p.alpha = p.alpha > p.baseAlpha ? p.alpha - 0.01 : p.baseAlpha;
          }
        } else {
          p.alpha = p.baseAlpha;
        }

        // Ripple push effect
        if (ripple && ripple.active) {
          const dx = p.x - ripple.x;
          const dy = p.y - ripple.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const rippleThickness = 25;

          if (Math.abs(dist - ripple.radius) < rippleThickness) {
            const pushForce = (1 - Math.abs(dist - ripple.radius) / rippleThickness) * 2.2;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * pushForce;
            p.y += Math.sin(angle) * pushForce;
          }
        }

        // Render particle with high-performance glow if marked
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        if (p.glow) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.22;
          ctx.fill();
        }
      });

      // Connections between close particles using fine neon strokes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxLinkDist = 110;

          if (dist < maxLinkDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            // Dynamically mix color based on distance
            const alphaFactor = (1 - dist / maxLinkDist) * 0.12;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alphaFactor})`;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = 1.0;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      triggerRipple(e.clientX, e.clientY);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleCanvasClick);
    document.addEventListener("mouseleave", handleMouseLeave);

    handleResize();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleCanvasClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-0 cursor-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
