"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowRight,
  Download, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  Terminal,
  Grid
} from "lucide-react";

import Wordmark from "@/components/Wordmark";
import RoleTicker from "@/components/RoleTicker";
import GlowCard from "@/components/GlowCard";
import CornerBrackets from "@/components/CornerBrackets";
import portfolioData from "@/data/portfolio.json";

// Custom standard feather-style SVG brand icons to avoid Lucide deprecation issues
const Github = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


// Browser Mockup wrapper
const BrowserFrame = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="w-full bg-brand-surface border border-white/10 overflow-hidden shadow-2xl flex flex-col">
    {/* Browser Bar */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#0e0e0e] select-none font-mono">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
        <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
        <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
      </div>
      <span className="text-[10px] text-brand-muted tracking-widest uppercase">{title}</span>
      <div className="w-10" />
    </div>
    {children}
  </div>
);

// High-fidelity SVG Logos for Certifications
const IssuerLogo = ({ logo }: { logo: string }) => {
  if (logo === "aws") {
    return (
      <div className="w-10 h-10 rounded border border-brand-amber/20 bg-brand-bg flex items-center justify-center text-brand-amber font-mono font-bold text-[10px]">
        AWS
      </div>
    );
  }
  if (logo === "gcp") {
    return (
      <div className="w-10 h-10 rounded border border-brand-green/20 bg-brand-bg flex items-center justify-center text-brand-green font-mono font-bold text-[10px]">
        GCP
      </div>
    );
  }
  if (logo === "tensorflow") {
    return (
      <div className="w-10 h-10 rounded border border-brand-amber/20 bg-brand-bg flex items-center justify-center text-brand-amber font-mono font-bold text-[10px]">
        TFLOW
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded border border-brand-muted/20 bg-brand-bg flex items-center justify-center text-brand-text font-mono font-bold text-[10px]">
      AZR
    </div>
  );
};

// Scroll Reveal Image component
const ImageScrollReveal = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref} className="relative overflow-hidden w-full aspect-[16/10] bg-[#0e0e0e]">
      {/* Scanner laser bar triggered on viewport */}
      <motion.div
        initial={{ top: "0%", opacity: 1 }}
        animate={isInView ? { top: "100%", opacity: [1, 1, 0] } : { top: "0%", opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute left-0 right-0 h-[2px] bg-brand-amber shadow-[0_0_12px_#FF8A00,0_0_20px_#FF8A00] z-20"
      />
      {/* Clip path wipe matching scanner line */}
      <motion.div
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
        animate={isInView ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="w-full h-full relative"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </motion.div>
    </div>
  );
};


// Main Landing Page Component
export default function Page() {
  const skills = portfolioData.skills;
  const certifications = portfolioData.certifications;
  const projects = portfolioData.projects;

  return (
    <main className="blueprint-bg relative min-h-screen text-brand-text overflow-hidden selection:bg-brand-amber selection:text-brand-bg">
      {/* Background static scanner glow */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-brand-amber/[0.025] to-transparent pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-24 py-12 z-10 border-b border-white/5">
        {/* Top Header */}
        <div className="flex justify-between items-center w-full">
          {/* Brand/System indicator */}
          <div className="flex items-center gap-2.5 font-mono text-xs tracking-wider">
            <span className="w-2 h-2 bg-brand-amber animate-ping rounded-full" />
            <span className="text-brand-muted">SYS_HQ // SECURE_NODE_1</span>
          </div>

          {/* Available Pill */}
          <div className="flex items-center gap-2 border border-brand-green/20 bg-brand-green/5 px-3 py-1 text-xs text-brand-green font-mono select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            Available for freelance work
          </div>
        </div>

        {/* Wordmark, role and CTA */}
        <div className="my-auto max-w-4xl pt-12 md:pt-0">
          {/* Shutter reveal container */}
          <motion.div
            initial={{ clipPath: "inset(50% 0% 50% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Wordmark />
          </motion.div>

          <div className="mt-6 md:mt-8 space-y-4">
            <RoleTicker />
            <p className="max-w-xl text-brand-muted font-sans text-sm sm:text-base leading-relaxed tracking-wide">
              Architecting secure vector networks, real-time ML pipelines, and high-performance full-stack web platforms under the ZARO brand.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="mt-8 md:mt-10 flex flex-wrap gap-4 font-mono text-sm">
            {/* View Resume Button with Corner Brackets */}
            <a href="#resume" className="group">
              <CornerBrackets className="bg-brand-amber text-brand-bg px-6 py-3 font-semibold flex items-center gap-2 hover:bg-brand-amber/90 transition-colors duration-200">
                View Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </CornerBrackets>
            </a>

            {/* See Projects Button */}
            <a href="#projects" className="group">
              <div className="relative border border-white/10 hover:border-brand-amber/30 text-brand-text px-6 py-3 transition-colors duration-200 flex items-center gap-2">
                <span className="bracket-corner bracket-tl !border-white/20 group-hover:!border-brand-amber w-2 h-2" />
                <span className="bracket-corner bracket-tr !border-white/20 group-hover:!border-brand-amber w-2 h-2" />
                <span className="bracket-corner bracket-bl !border-white/20 group-hover:!border-brand-amber w-2 h-2" />
                <span className="bracket-corner bracket-br !border-white/20 group-hover:!border-brand-amber w-2 h-2" />
                See Projects
                <span className="text-brand-muted font-mono text-xs ml-1 select-none">↓</span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Coordinates & Anchor */}
        <div className="flex justify-between items-end w-full text-brand-muted font-mono text-[10px] tracking-widest pt-8 select-none">
          <div>LAT // 12.9716° N</div>
          <div className="hidden sm:block">ZARO SYSTEMS v2.0</div>
          <div>LONG // 77.5946° E</div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="px-6 sm:px-12 lg:px-24 py-24 z-10 border-b border-white/5 bg-brand-surface/20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Bio text (left) */}
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-5xl sm:text-6xl font-bebas tracking-wider text-brand-text">ABOUT // BIO</h2>
            <div className="space-y-4 font-sans text-brand-muted text-sm sm:text-base leading-relaxed">
              <p>
                I operate at the intersection of data engineering and software development. My practice is built around creating high-throughput distributed architectures, training custom models, and wrapping them in sleek, sub-second web applications.
              </p>
              <p>
                Under the <strong className="text-brand-amber font-medium font-mono">ZARO</strong> brand, I partner with companies to scale their engineering operations, deploy vector database setups, and ship production-grade systems from concept to delivery. No templates, no bloat. Just systems built to compute.
              </p>
            </div>
          </div>

          {/* Photo side (right) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm group">
              {/* Corner brackets container */}
              <CornerBrackets className="p-2 border border-white/5 bg-brand-surface">
                {/* Visual grid behind photo */}
                <div className="absolute inset-0 blueprint-bg opacity-30 pointer-events-none" />
                <div className="relative aspect-square w-full">
                  <Image 
                    src="/profile-photo.png" 
                    alt="Gopiprakan bio portrait" 
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover grayscale brightness-90 contrast-125"
                  />
                </div>
              </CornerBrackets>
            </div>
          </div>
        </div>

        {/* Drifting Skills Marquee */}
        <div className="w-full overflow-hidden border-t border-b border-white/5 bg-brand-surface/40 py-3 relative mt-16">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-12 select-none">
            {[...skills, ...skills].map((skill, index) => (
              <span key={index} className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-brand-muted flex items-center gap-3">
                <span className="text-brand-amber font-bold">/</span>
                {skill.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" className="px-6 sm:px-12 lg:px-24 py-24 z-10 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12">
            <div>
              <h2 className="text-5xl sm:text-6xl font-bebas tracking-wider text-brand-text">CERTIFICATIONS</h2>
              <p className="text-brand-muted text-xs sm:text-sm font-mono mt-2 uppercase tracking-widest">Verified Credentials & Engineering Badges</p>
            </div>
            <div className="text-brand-muted text-xs font-mono mt-4 sm:mt-0 select-none">
              [ SCROLL HORIZONTALLY → ]
            </div>
          </div>

          {/* Horizontal scroll snap carousel */}
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-6 relative">
            {certifications.map((cert) => (
              <div 
                key={cert.id} 
                className="snap-center shrink-0 w-80 sm:w-[380px] group/card draw-bracket relative border border-white/5 bg-brand-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1a1a1a]"
              >
                {/* Hidden bracket classes are triggered by hover via globals.css */}
                <span className="bracket-corner bracket-tl" />
                <span className="bracket-corner bracket-tr" />
                <span className="bracket-corner bracket-bl" />
                <span className="bracket-corner bracket-br" />

                <div className="flex justify-between items-start">
                  <IssuerLogo logo={cert.logo} />
                  {cert.verified && (
                    <span className="flex items-center gap-1 bg-brand-green/10 border border-brand-green/20 px-2 py-0.5 rounded-sm text-[10px] text-brand-green font-mono uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-syne font-semibold text-brand-text mt-6 mb-2 tracking-wide leading-snug">
                  {cert.title}
                </h3>
                <p className="text-brand-muted text-xs font-sans mb-6">
                  Issued by {cert.issuer} • {cert.date}
                </p>

                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-amber font-mono font-medium tracking-wider uppercase hover:underline"
                >
                  View Credential
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="px-6 sm:px-12 lg:px-24 py-24 z-10 border-b border-white/5 bg-brand-surface/10 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-bebas tracking-wider text-brand-text mb-12">PROJECTS // SYSTEMS</h2>

          {/* Flagship Project Slot (ZARO) */}
          {projects.filter(p => p.flagship).map((project) => (
            <div key={project.id} className="mb-12">
              <GlowCard className="border border-white/5 bg-brand-surface p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 relative group">
                {/* Static corner brackets for flagship */}
                <span className="bracket-corner bracket-tl !w-3 !h-3 !border-brand-amber" />
                <span className="bracket-corner bracket-tr !w-3 !h-3 !border-brand-amber" />
                <span className="bracket-corner bracket-bl !w-3 !h-3 !border-brand-amber" />
                <span className="bracket-corner bracket-br !w-3 !h-3 !border-brand-amber" />

                {/* Left: Metadata & description */}
                <div className="lg:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-brand-amber/10 border border-brand-amber/30 text-brand-amber text-[10px] font-mono px-2 py-0.5 tracking-wider uppercase">
                        FLAGSHIP PRODUCT
                      </span>
                      <span className="text-brand-green font-mono text-[10px] flex items-center gap-1">
                        ● LIVE BRAND
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-bebas tracking-wider text-brand-text mb-2">
                      {project.title.toUpperCase()}
                    </h3>
                    <p className="text-xs text-brand-amber font-mono mb-4 uppercase tracking-widest">{project.role}</p>
                    
                    <p className="text-brand-muted text-sm sm:text-base leading-relaxed mb-6 font-sans">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] bg-brand-bg border border-white/5 text-brand-muted px-2.5 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 font-mono text-xs tracking-wider uppercase">
                      <a href={project.liveUrl} className="group/btn flex items-center gap-1 text-brand-amber font-semibold hover:underline">
                        Live Site
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                      <a href={project.caseStudyUrl} className="text-brand-muted hover:text-brand-text transition-colors duration-200">
                        Case Study
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right: Premium Mockup Browser Frame */}
                <div className="lg:w-1/2 flex items-center">
                  <BrowserFrame title="zaro_main_console">
                    <ImageScrollReveal src="/zaro.png" alt="ZARO browser interface mockup" />
                  </BrowserFrame>
                </div>
              </GlowCard>
            </div>
          ))}

          {/* Sub-grid of other projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.filter(p => !p.flagship).map((project) => (
              <GlowCard key={project.id} className="border border-white/5 bg-brand-surface p-6 flex flex-col justify-between relative group">
                {/* Small corner brackets overlay */}
                <span className="bracket-corner bracket-tl group-hover:-translate-x-1 group-hover:-translate-y-1 w-2.5 h-2.5" />
                <span className="bracket-corner bracket-tr group-hover:translate-x-1 group-hover:-translate-y-1 w-2.5 h-2.5" />
                <span className="bracket-corner bracket-bl group-hover:-translate-x-1 group-hover:translate-y-1 w-2.5 h-2.5" />
                <span className="bracket-corner bracket-br group-hover:translate-x-1 group-hover:translate-y-1 w-2.5 h-2.5" />

                <div>
                  <BrowserFrame title={`${project.id}_view`}>
                    <ImageScrollReveal src={project.imageKey === "neuralstream" ? "/neuralstream.png" : "/deepsearch.png"} alt={project.title} />
                  </BrowserFrame>

                  <h3 className="text-2xl font-bebas tracking-wider text-brand-text mt-6 mb-1">
                    {project.title.toUpperCase()}
                  </h3>
                  <p className="text-[10px] text-brand-amber font-mono mb-4 uppercase tracking-widest">{project.role}</p>
                  
                  <p className="text-brand-muted text-sm leading-relaxed mb-6 font-sans">
                    {project.problem}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] bg-brand-bg border border-white/5 text-brand-muted px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 font-mono text-[11px] tracking-wider uppercase">
                    {project.liveUrl !== "#" ? (
                      <a href={project.liveUrl} className="group/btn flex items-center gap-0.5 text-brand-amber font-semibold hover:underline">
                        Live Site
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="text-brand-muted/40 cursor-not-allowed">Offline Node</span>
                    )}
                    <a href={project.caseStudyUrl} className="text-brand-muted hover:text-brand-text transition-colors duration-200">
                      Case Study
                    </a>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* RESUME SECTION */}
      <section id="resume" className="px-6 sm:px-12 lg:px-24 py-24 z-10 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Resume details */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-5xl sm:text-6xl font-bebas tracking-wider text-brand-text">RESUME // PROFILE</h2>
              <div className="space-y-4 font-sans text-brand-muted text-sm sm:text-base leading-relaxed">
                <p>
                  My complete resume covers academic data, published deep learning research, and standard production systems shipped.
                </p>
                <div className="flex flex-col gap-2 font-mono text-xs mt-6 text-left">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-brand-muted uppercase">SYSTEM STATUS</span>
                    <span className="text-brand-green font-bold">STABLE</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-brand-muted uppercase">LAST MODIFIED</span>
                    <span>{portfolioData.resume.lastUpdated.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-brand-muted uppercase">ENCRYPTION</span>
                    <span>SHA-256 VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Floating-style download button inside this section */}
              <div className="pt-6">
                <a href={portfolioData.resume.pdfPath} download className="group inline-block">
                  <CornerBrackets className="bg-brand-amber text-brand-bg px-6 py-3 font-semibold flex items-center gap-2 hover:bg-brand-amber/90 transition-colors duration-200 font-mono text-sm">
                    <Download className="w-4 h-4 animate-bounce" />
                    Download Resume PDF
                  </CornerBrackets>
                </a>
              </div>
            </div>

            {/* Right Resume image panel */}
            <div className="lg:col-span-7">
              <div className="relative group p-2 border border-white/5 bg-brand-surface shadow-2xl">
                {/* Large orange brackets */}
                <span className="bracket-corner bracket-tl !w-4 !h-4 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                <span className="bracket-corner bracket-tr !w-4 !h-4 group-hover:translate-x-1 group-hover:-translate-y-1" />
                <span className="bracket-corner bracket-bl !w-4 !h-4 group-hover:-translate-x-1 group-hover:translate-y-1" />
                <span className="bracket-corner bracket-br !w-4 !h-4 group-hover:translate-x-1 group-hover:translate-y-1" />
                
                <div className="relative aspect-[1/1.4] w-full bg-[#0e0e0e] overflow-hidden">
                  <Image
                    src={portfolioData.resume.previewImagePath}
                    alt="Resume Gopiprakan preview"
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500 opacity-90 hover:opacity-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer className="px-6 sm:px-12 lg:px-24 py-24 bg-brand-surface/30 border-t border-white/5 relative z-10 flex flex-col items-center text-center">
        {/* Background Grid Pattern inside footer */}
        <div className="absolute inset-0 blueprint-bg opacity-20 pointer-events-none" />

        <div className="max-w-4xl space-y-8 relative z-10">
          <p className="font-mono text-xs sm:text-sm tracking-widest text-brand-amber uppercase">
            // END OF NODE // COMMUNICATION CHANNEL OPEN
          </p>

          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bebas tracking-tighter text-brand-text hover:text-brand-amber transition-colors duration-300">
            LET'S BUILD SOMETHING
          </h2>

          <p className="max-w-md mx-auto text-brand-muted text-xs sm:text-sm font-sans leading-relaxed">
            Interested in deploying high-performance data systems or shipping freelance web apps? Drop a connection request.
          </p>

          {/* Social / Contact links */}
          <div className="flex justify-center items-center gap-4 pt-6">
            <a 
              href="mailto:gopiprakan@example.com" 
              className="group p-3 border border-white/10 hover:border-brand-amber bg-brand-surface text-brand-text hover:text-brand-bg hover:bg-brand-amber transition-all duration-200 relative"
              aria-label="Email Gopiprakan"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 border border-white/10 hover:border-brand-amber bg-brand-surface text-brand-text hover:text-brand-bg hover:bg-brand-amber transition-all duration-200 relative"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 border border-white/10 hover:border-brand-amber bg-brand-surface text-brand-text hover:text-brand-bg hover:bg-brand-amber transition-all duration-200 relative"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="text-[10px] text-brand-muted/60 font-mono tracking-wider pt-12 select-none">
            © 2026 GOPIPRAKAN. ALL RIGHTS RESERVED. DESIGNED & SHIPPED UNDER SIGNAL & GRID.
          </div>
        </div>
      </footer>
    </main>
  );
}
