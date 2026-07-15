"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowRight,
  Download, 
  Mail, 
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ChevronRight
} from "lucide-react";

import BackgroundParticles from "@/components/BackgroundParticles";
import GlassCard from "@/components/GlassCard";
import InteractiveSkills from "@/components/InteractiveSkills";
import portfolioData from "@/data/portfolio.json";

// High-fidelity custom SVG logos for Github/Linkedin
const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// High-fidelity custom React component representing certification logos in clean grayscale/white
const CertificationIssuer = ({ logo }: { logo: string }) => {
  if (logo === "aws") {
    return (
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-white font-mono text-[9px] font-bold">
        <Cpu className="w-4 h-4 mb-0.5 text-white/70" />
        AWS
      </div>
    );
  }
  if (logo === "gcp") {
    return (
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-white font-mono text-[9px] font-bold">
        <Layers className="w-4 h-4 mb-0.5 text-white/70" />
        GCP
      </div>
    );
  }
  if (logo === "tensorflow") {
    return (
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-white font-mono text-[8px] font-bold">
        <Sparkles className="w-4 h-4 mb-0.5 text-white/70" />
        TENSOR
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-white font-mono text-[9px] font-bold">
      <Cpu className="w-4 h-4 mb-0.5 text-white/70" />
      AZURE
    </div>
  );
};

// Scroll Reveal Image wrapper
const ImageScrollReveal = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className="relative overflow-hidden w-full aspect-[16/10] bg-brand-surface rounded-xl border border-white/10">
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full relative"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
        />
      </motion.div>
    </div>
  );
};

// Browser Frame mockup
const BrowserFrame = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="w-full bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col">
    {/* Bar */}
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-[#000000] font-mono select-none">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
      </div>
      <span className="text-[10px] text-brand-muted tracking-widest uppercase font-semibold">{title}</span>
      <div className="w-10" />
    </div>
    <div className="p-1 bg-[#050505]">{children}</div>
  </div>
);

export default function Page() {
  const skills = portfolioData.skills;
  const certifications = portfolioData.certifications;
  const projects = portfolioData.projects;

  return (
    <main className="relative min-h-screen text-brand-text overflow-hidden bg-brand-bg bw-grid selection:bg-white selection:text-black">
      {/* Grayscale Particle Canvas */}
      <BackgroundParticles />

      {/* Subtle Monochrome Glow Backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-white/[0.02] blur-[150px] pointer-events-none z-0" />

      {/* Floating capsule navigation bar */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <nav className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <a href="#" className="font-syne font-bold text-base sm:text-lg tracking-wider text-white hover:opacity-80 transition-opacity">
            GOPIPRAKAN.
          </a>
          <div className="flex gap-6 sm:gap-8 items-center font-mono text-xs text-brand-muted">
            <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
            <a href="#projects" className="hover:text-white transition-colors">PROJECTS</a>
            <a href="#certifications" className="hover:text-white transition-colors">CREDENTIALS</a>
            <a href="#resume" className="hover:text-white transition-colors">RESUME</a>
          </div>
          {/* Colored CTA navbar button */}
          <a href="#contact" className="hidden sm:inline-block font-mono text-xs bg-gradient-to-r from-brand-purple to-brand-cyan hover:from-brand-purple/90 hover:to-brand-cyan/90 text-white font-semibold px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(139,92,246,0.25)] hover:shadow-[0_4px_16px_rgba(139,92,246,0.4)] transition-all">
            CONNECT
          </a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 lg:px-24 pt-32 pb-16 z-10">
        <div className="max-w-4xl text-center space-y-8 flex flex-col items-center">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-1.5 rounded-full text-xs font-mono text-white/95"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            SYS_STATUS: ACTIVE // FREELANCE AVAILABLE
          </motion.div>

          {/* Stark name header */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] sm:text-[8vw] lg:text-[7vw] font-bebas leading-none tracking-tight text-white uppercase select-none"
            >
              GOPIPRAKAN
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-2xl lg:text-3xl font-syne font-bold tracking-wide uppercase text-white/90"
            >
              AI & Data Science Engineer
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-xl text-brand-muted font-sans text-sm sm:text-base leading-relaxed tracking-wide"
          >
            Architecting secure vector networks, real-time ML pipelines, and high-performance full-stack web platforms under the ZARO brand.
          </motion.p>

          {/* Colored CTA button console */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center font-mono text-sm pt-4"
          >
            <a href="#projects" className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan hover:from-brand-purple/95 hover:to-brand-cyan/95 text-white font-bold overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.45)] flex items-center gap-2">
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a href="#contact" className="glass-panel px-6 py-3 rounded-full text-white font-semibold hover:border-white/30 hover:bg-white/[0.05] transition-all duration-300 flex items-center gap-2">
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Bottom indicators */}
        <div className="absolute bottom-8 left-0 right-0 px-6 sm:px-12 flex justify-between text-brand-muted font-mono text-[9px] tracking-widest uppercase select-none opacity-40">
          <div>LOC // 12.9716° N / 77.5946° E</div>
          <div className="hidden sm:block">ZARO COGNITIVE SYSTEMS v3.0 // MONOCHROME PHASE</div>
          <div>EST // JULY 2026</div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative px-6 sm:px-12 lg:px-24 py-32 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Operational details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">{"// THE ENGINE"}</span>
                <h2 className="text-5xl sm:text-6xl font-bebas tracking-wide text-white">ABOUT // OPERATIONAL FOCUS</h2>
              </div>
              <div className="space-y-4 font-sans text-brand-muted text-sm sm:text-base leading-relaxed">
                <p>
                  I operate at the intersection of complex data engineering and modern software development. My practice revolves around creating high-throughput distributed architectures, training bespoke machine learning pipelines, and wrapping them in sleek, microsecond-responsive web interfaces.
                </p>
                <p>
                  Partnering with enterprises under the <strong className="text-white font-semibold">ZARO</strong> engineering banner, I deploy vector databases, scale compute platforms, and craft high-fidelity web apps from core design to cloud deployment.
                </p>
              </div>
            </div>

            {/* Right side portrait wrapper */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm">
                <GlassCard className="p-3">
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-brand-surface border border-white/10">
                    <Image 
                      src="/profile-photo.png" 
                      alt="Gopiprakan portrait" 
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700 brightness-90 hover:brightness-100"
                    />
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>

          {/* Skill Set Grid */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="font-syne font-bold text-lg text-white uppercase tracking-wider">Core Capabilities</h3>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            <InteractiveSkills skills={skills} />
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="px-6 sm:px-12 lg:px-24 py-32 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">{"// DEPLOYED CODE"}</span>
              <h2 className="text-5xl sm:text-6xl font-bebas tracking-wide text-white">PROJECTS // SYSTEMS</h2>
            </div>
          </div>

          {/* Flagship Project slot */}
          {projects.filter(p => p.flagship).map((project) => (
            <GlassCard key={project.id} className="p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left content details */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <span className="bg-white/10 border border-white/20 text-white font-mono text-[9px] px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                        FLAGSHIP PRODUCT
                      </span>
                      <span className="text-white font-mono text-[10px] flex items-center gap-1.5 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        SYS_LIVE
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-syne font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-brand-muted font-mono uppercase tracking-widest">{project.role}</p>

                    <p className="text-brand-muted text-sm sm:text-base leading-relaxed font-sans pt-2">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] bg-white/[0.04] border border-white/10 text-brand-muted px-2.5 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Colored interactive buttons */}
                    <div className="flex items-center gap-6 font-mono text-xs tracking-wider uppercase">
                      <a href={project.liveUrl} className="group/btn flex items-center gap-1 text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan font-bold hover:opacity-85 transition-opacity">
                        Launch Node
                        <ArrowUpRight className="w-4 h-4 text-brand-cyan group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                      <a href={project.caseStudyUrl} className="text-brand-muted hover:text-white transition-colors duration-200">
                        View Spec Sheets
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Mockup */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <BrowserFrame title="zaro_console_feed">
                    <ImageScrollReveal src="/zaro.png" alt="ZARO platform screenshot" />
                  </BrowserFrame>
                </div>
              </div>
            </GlassCard>
          ))}

          {/* Sub-grid of other projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.filter(p => !p.flagship).map((project) => (
              <GlassCard key={project.id} className="p-6 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-6">
                  <BrowserFrame title={`${project.id}_core`}>
                    <ImageScrollReveal 
                      src={project.imageKey === "neuralstream" ? "/neuralstream.png" : "/deepsearch.png"} 
                      alt={project.title} 
                    />
                  </BrowserFrame>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-syne font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-[10px] text-brand-muted font-mono uppercase tracking-widest">{project.role}</p>
                    <p className="text-brand-muted text-sm leading-relaxed font-sans pt-1">
                      {project.problem}
                    </p>
                  </div>
                </div>

                <div className="space-y-6 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] bg-white/[0.04] border border-white/10 text-brand-muted px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 font-mono text-[11px] tracking-wider uppercase">
                    {project.liveUrl !== "#" ? (
                      <a href={project.liveUrl} className="group/btn flex items-center gap-0.5 text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan font-bold hover:opacity-85 transition-opacity">
                        Access Node
                        <ArrowUpRight className="w-3.5 h-3.5 text-brand-cyan group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="text-brand-muted/40 cursor-not-allowed">Node Encrypted</span>
                    )}
                    <a href={project.caseStudyUrl} className="text-brand-muted hover:text-white transition-colors duration-200">
                      Technical Spec
                    </a>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" className="px-6 sm:px-12 lg:px-24 py-32 border-t border-white/10 bg-black relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">{"// VERIFIED NODES"}</span>
              <h2 className="text-5xl sm:text-6xl font-bebas tracking-wide text-white">ENGINEERING CERTIFICATIONS</h2>
            </div>
            <div className="text-brand-muted text-[10px] font-mono tracking-widest select-none">
              [ SWIPE TO INSPECT CREDENTIALS → ]
            </div>
          </div>

          {/* Snap scroll viewport */}
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-6">
            {certifications.map((cert) => (
              <div 
                key={cert.id}
                className="snap-center shrink-0 w-80 sm:w-[360px]"
              >
                <GlassCard className="p-6 flex flex-col justify-between h-[250px]">
                  <div className="flex justify-between items-start">
                    <CertificationIssuer logo={cert.logo} />
                    {cert.verified && (
                      <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-[9px] text-white font-mono font-semibold uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3 text-white" />
                        Verified
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-syne font-bold text-white tracking-wide leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-brand-muted text-xs font-sans mt-1">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>

                  <div className="pt-2">
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-white font-mono font-semibold tracking-wider uppercase hover:underline"
                    >
                      Credential Spec
                      <ChevronRight className="w-3.5 h-3.5 text-white/85" />
                    </a>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESUME PROFILE SECTION */}
      <section id="resume" className="px-6 sm:px-12 lg:px-24 py-32 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left side details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">{"// HISTORICAL RECORDS"}</span>
                <h2 className="text-5xl sm:text-6xl font-bebas tracking-wide text-white">RESUME // ARCHIVE</h2>
              </div>
              
              <div className="space-y-4 font-sans text-brand-muted text-sm sm:text-base leading-relaxed">
                <p>
                  The structured file logs academic milestones, published neural network pipelines, and core systems architectures shipped since inception.
                </p>
                
                <div className="flex flex-col gap-2.5 font-mono text-xs pt-4">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-brand-muted">INTEGRITY CHECK</span>
                    <span className="text-white font-bold">100% VERIFIED</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-brand-muted">LAST BACKUP</span>
                    <span>{portfolioData.resume.lastUpdated.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-brand-muted">ENCRYPTION HASH</span>
                    <span>MD5_SIGNATURE</span>
                  </div>
                </div>
              </div>

              {/* Colored gradient download button */}
              <div className="pt-6">
                <a href={portfolioData.resume.pdfPath} download className="inline-block">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-pink/95 hover:to-brand-purple/95 text-white font-mono text-sm font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-[0_4px_20px_rgba(236,72,153,0.25)] hover:shadow-[0_4px_25px_rgba(236,72,153,0.45)] transition-all duration-300"
                  >
                    <Download className="w-4 h-4 animate-bounce" />
                    Download File (PDF)
                  </motion.div>
                </a>
              </div>
            </div>

            {/* Right side preview */}
            <div className="lg:col-span-7">
              <GlassCard className="p-3">
                <div className="relative aspect-[1/1.4] w-full bg-brand-bg rounded-lg overflow-hidden border border-white/10">
                  <Image
                    src={portfolioData.resume.previewImagePath}
                    alt="Resume preview sheet"
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover grayscale hover:grayscale-0 opacity-85 hover:opacity-100 transition-all duration-700"
                  />
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & CONNECT */}
      <footer id="contact" className="px-6 sm:px-12 lg:px-24 py-32 bg-black border-t border-white/10 relative z-10 text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl space-y-8 relative z-10">
          <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
            {"// COMMUNICATION PORT OPEN //"}
          </span>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bebas tracking-tighter text-white uppercase select-none">
            {"Let's build systems."}
          </h2>

          <p className="max-w-md mx-auto text-brand-muted text-xs sm:text-sm font-sans leading-relaxed">
            Interested in deploying high-performance data systems or shipping custom web environments? Initiate node connection.
          </p>

          {/* Social connections in their natural brand colors */}
          <div className="flex justify-center items-center gap-6 pt-6">
            {/* Mail: Google/Gmail Red */}
            <a 
              href="mailto:gopiprakan@example.com"
              className="p-4 rounded-full text-white bg-[#EA4335]/15 border border-[#EA4335]/30 hover:bg-[#EA4335] hover:border-[#EA4335] transition-all duration-300 shadow-md flex items-center justify-center"
              aria-label="Send Email Connection"
            >
              <Mail className="w-5 h-5" />
            </a>
            
            {/* Github: Charcoal Slate */}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-full text-white bg-[#24292e]/40 border border-[#24292e]/60 hover:bg-[#24292e] hover:border-[#24292e] transition-all duration-300 shadow-md flex items-center justify-center"
              aria-label="Visit Github Spec"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            {/* LinkedIn: LinkedIn Brand Blue */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-full text-white bg-[#0A66C2]/15 border border-[#0A66C2]/30 hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-300 shadow-md flex items-center justify-center"
              aria-label="Visit Linkedin Node"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="text-[10px] text-brand-muted font-mono tracking-widest pt-16 select-none opacity-40 uppercase">
            © 2026 GOPIPRAKAN. ALL SYSTEMS SIGNED. SHIPPED UNDER SECURE COGNITIVE NEURAL STANDARDS.
          </div>
        </div>
      </footer>
    </main>
  );
}
