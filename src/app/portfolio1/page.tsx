"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ShieldCheck,
  Check,
  Cpu,
  Send,
  Database,
  Sparkles,
  Layers,
  Calendar,
  ArrowUpRight,
  Download,
  Mail,
  ArrowRight,
  Lock,
  RefreshCw,
  Play,
  HelpCircle,
  Award,
  ExternalLink,
  Activity,
  FileText,
  ChevronRight,
  Layers3,
  Monitor,
  Code2,
  Workflow
} from "lucide-react";
import portfolioData from "@/data/portfolio.json";

// High-fidelity custom SVG logos for Github/Linkedin
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Ambient animated blob component
function AmbientBlob({ className, delay, duration }: { className: string; delay: number; duration: number }) {
  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 1 }}
      animate={{
        x: [0, 40, -30, 20, 0],
        y: [0, -50, 40, -20, 0],
        scale: [1, 1.15, 0.9, 1.05, 1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: delay,
      }}
      className={`absolute rounded-full blur-[100px] pointer-events-none opacity-[0.12] ${className}`}
    />
  );
}

export default function Portfolio1() {
  // Navigation active state based on scroll section
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Command Console State
  const [commandInput, setCommandInput] = useState("");
  const [consoleHistory, setConsoleHistory] = useState<Array<{ type: "input" | "output"; text: string; link?: string }>>([
    { type: "output", text: "SYSTEM_BOOT: Secure Shell V1.0 - GOPIPRAKAN CONSOLE" },
    { type: "output", text: "Initialization Successful. Connected to core database." },
    { type: "output", text: "Type 'help' to review directory listings and execution nodes." }
  ]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // Project filtering state
  const [activeProjectFilter, setActiveProjectFilter] = useState("all");
  const allProjectTags = useMemo(() => {
    const tags = new Set<string>();
    portfolioData.projects.forEach(p => p.tech.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, []);

  // Filter projects by technology category
  const filteredProjects = useMemo(() => {
    if (activeProjectFilter === "all") return portfolioData.projects;
    return portfolioData.projects.filter(p => 
      p.tech.includes(activeProjectFilter) || 
      (activeProjectFilter === "AI/ML" && p.tech.some(t => t.toLowerCase().includes("tensorflow") || t.toLowerCase().includes("pytorch") || t.toLowerCase().includes("python"))) ||
      (activeProjectFilter === "Full-Stack" && p.tech.some(t => t.toLowerCase().includes("next.js") || t.toLowerCase().includes("react") || t.toLowerCase().includes("go")))
    );
  }, [activeProjectFilter]);

  // Skill Telemetry Panel details
  const [selectedSkill, setSelectedSkill] = useState<string>(portfolioData.skills[0]);
  const skillDetails: Record<string, { desc: string; latency: string; throughput: string; load: string }> = {
    "AI & Machine Learning": { desc: "Developing state-of-the-art architectures using neural models for pattern discovery and cognitive classification.", latency: "14ms", throughput: "1.2M queries/hr", load: "96%" },
    "Deep Learning Pipelines": { desc: "Orchestrating robust distributed model training, data preprocessing streams, and model verification nodes.", latency: "24ms", throughput: "4.8M updates/hr", load: "94%" },
    "Full-Stack Web Apps": { desc: "Creating secure, reactive and hyper-responsive user portals leveraging server component hydration and edge computation.", latency: "4ms", throughput: "920K API hits/sec", load: "99%" },
    "Data Engineering": { desc: "Structuring distributed event streams, structured databases, and scalable telemetry pipelines with high replication.", latency: "8ms", throughput: "12 GB/sec ingest", load: "92%" },
    "Freelance Delivery": { desc: "Designing and engineering tailored standard packages (ZARO standard engines) with optimized performance thresholds.", latency: "1.2s build", throughput: "18 active deployments", load: "100%" },
    "API Architecture": { desc: "Constructing ultra-low latency REST, gRPC, and GraphQL data routing sockets containing complex payload structures.", latency: "3ms", throughput: "2.4M requests/sec", load: "97%" },
    "Distributed Systems": { desc: "Creating fault-tolerant network topologies operating consensus modules and asynchronous jobs queues.", latency: "9ms", throughput: "800 nodes sync", load: "95%" },
    "Next.js & React": { desc: "Deploying production-ready client systems featuring server-side hydration, streaming payloads, and Tailwind graphics.", latency: "120ms LCP", throughput: "SSR scale verified", load: "98%" },
    "Vector Databases": { desc: "Designing fast, secure semantic search layers utilizing optimized spatial index partitions and clustering.", latency: "6ms", throughput: "99.1% search recall", load: "98%" },
    "Cloud Architecture": { desc: "Managing infrastructure configurations across hybrid cloud vendors using programmatic templates.", latency: "99.99% uptime", throughput: "Zero single point failure", load: "93%" }
  };

  // Secure Transmission form state
  const [transmissionForm, setTransmissionForm] = useState({ returnSocket: "", payload: "", classification: "AI Core Integration" });
  const [transmitting, setTransmitting] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);

  // Update scroll variables
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }

      // Track active section
      const sections = ["hero", "console", "projects", "skills", "certs", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Command Submit
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const input = commandInput.trim().toLowerCase();
    const newHistory = [...consoleHistory, { type: "input" as const, text: `$ ${commandInput}` }];

    switch (input) {
      case "help":
        newHistory.push(
          { type: "output", text: "AVAILABLE Sockets and Commands:" },
          { type: "output", text: "  about    - Print biological and professional resume specifications." },
          { type: "output", text: "  projects - Output standard technical product nodes (ZARO, NeuralStream, DeepSearch)." },
          { type: "output", text: "  skills   - List intelligence capability nodes." },
          { type: "output", text: "  certs    - Print verification logs of professional certificates." },
          { type: "output", text: "  contact  - Open contact coordinate details." },
          { type: "output", text: "  clear    - Clear console display logs." }
        );
        break;
      case "about":
        newHistory.push(
          { type: "output", text: "SUBJECT: Gopiprakan" },
          { type: "output", text: "ROLE: AI & Data Science Engineer / Founder of ZARO" },
          { type: "output", text: "METADATA: Specializes in sub-second SLA web products, distributed IoT event processing, and semantic search vector layers." },
          { type: "output", text: "RESUME LAST UPDATED: " + portfolioData.resume.lastUpdated },
          { type: "output", text: "Download official encrypted resume: [resume-preview.pdf]", link: portfolioData.resume.pdfPath }
        );
        break;
      case "projects":
        newHistory.push({ type: "output", text: "LISTING PRODUCT NODES:" });
        portfolioData.projects.forEach(p => {
          newHistory.push(
            { type: "output", text: `[${p.flagship ? "FLAGSHIP" : "NODE"}] ${p.title} - ${p.role}` },
            { type: "output", text: `  Tech stack: ${p.tech.join(", ")}` },
            { type: "output", text: `  Problem statement: ${p.problem}` }
          );
        });
        break;
      case "skills":
        newHistory.push(
          { type: "output", text: "INTELLIGENCE NETWORK CORES:" },
          ...portfolioData.skills.map(s => ({ type: "output" as const, text: `  • ${s} (${skillDetails[s]?.load || "90%"} bandwidth load)` }))
        );
        break;
      case "certs":
        newHistory.push({ type: "output", text: "VERIFIED CERTIFICATION SOCKETS:" });
        portfolioData.certifications.forEach(c => {
          newHistory.push({ type: "output", text: `  • ${c.title} by ${c.issuer} (${c.date}) - [VERIFIED STATUS: OK]` });
        });
        break;
      case "contact":
        newHistory.push(
          { type: "output", text: "COMMUNICATION COORDINATES:" },
          { type: "output", text: "  Email: gopiprakan@example.com (Direct transmission socket)" },
          { type: "output", text: "  Github: https://github.com (Repository Core)" },
          { type: "output", text: "  LinkedIn: https://linkedin.com (Business Interface)" }
        );
        break;
      case "clear":
        setConsoleHistory([]);
        setCommandInput("");
        return;
      default:
        newHistory.push({ type: "output", text: `command not recognized: '${input}'. Type 'help' for directory listings.` });
    }

    setConsoleHistory(newHistory);
    setCommandInput("");
  };

  // Scroll to bottom of terminal
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleHistory]);

  // Transmission simulator
  const handleTransmitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transmissionForm.returnSocket || !transmissionForm.payload) return;

    setTransmitting(true);
    setTransmissionLogs([]);

    const steps = [
      "Establishing link with Gopiprakan console...",
      "Encrypting message payload using SHA-256...",
      `Socket validation for sender [${transmissionForm.returnSocket}] ... OK`,
      `Classifying route endpoint [${transmissionForm.classification}] ... OK`,
      "Transmitting packet payload over TLS...",
      "Awaiting node confirmation code from target...",
      "TRANSMISSION SUCCESSFUL: Packet uploaded at " + new Date().toLocaleTimeString()
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setTransmissionLogs((prev) => [...prev, `[sys] ${step}`]);
        if (idx === steps.length - 1) {
          setTransmitting(false);
          setTransmissionForm({ returnSocket: "", payload: "", classification: "AI Core Integration" });
        }
      }, (idx + 1) * 800);
    });
  };

  return (
    <main className="relative min-h-screen bg-[#030306] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* BACKGROUND GRAPHICS & ORBS */}
      <div className="absolute inset-0 cyber-grid-dots opacity-45 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05050a]/60 to-black z-0 pointer-events-none" />
      
      {/* Drifting Nebula Orbs */}
      <AmbientBlob className="top-[10%] left-[10%] w-[350px] h-[350px] bg-indigo-600/20" delay={0} duration={20} />
      <AmbientBlob className="top-[35%] right-[15%] w-[450px] h-[450px] bg-cyan-500/20" delay={2} duration={25} />
      <AmbientBlob className="bottom-[15%] left-[20%] w-[400px] h-[400px] bg-purple-600/15" delay={4} duration={22} />
      <AmbientBlob className="bottom-[5%] right-[5%] w-[300px] h-[300px] bg-pink-500/10" delay={1} duration={18} />

      {/* HEADER / FLOATING PROGRESS NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Scroll Progress Bar */}
        <div 
          className="h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 origin-left transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between backdrop-blur-md bg-[#030306]/40 border-b border-white/[0.04]">
          <a href="#" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center font-bold text-xs tracking-wider shadow-lg shadow-indigo-500/10 text-white select-none">
              GP
            </span>
            <div className="flex flex-col">
              <span className="font-syne font-bold text-sm tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                GOPIPRAKAN
              </span>
              <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest leading-none">
                AI_ENGINEER // V1
              </span>
            </div>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            {[
              { id: "hero", label: "01 // HERO" },
              { id: "console", label: "02 // CONSOLE" },
              { id: "projects", label: "03 // PROJECTS" },
              { id: "skills", label: "04 // SKILLS" },
              { id: "certs", label: "05 // CERTS" },
              { id: "contact", label: "06 // TRANSMIT" },
            ].map((link) => {
              const active = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`px-3 py-1.5 rounded-full border transition-all duration-300 ${
                    active 
                      ? "border-cyan-500/30 bg-cyan-500/5 text-cyan-400 font-bold" 
                      : "border-transparent hover:border-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Quick link buttons */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioData.resume.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-[10px] font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              DOWNLOAD_RESUME
            </a>
            
            <a
              href="#contact"
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-black font-semibold text-[10px] font-mono shadow-md shadow-indigo-500/10 transition-transform hover:scale-[1.02]"
            >
              TRANSMIT
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative z-10 pt-32 pb-24 md:py-48 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 font-mono text-[10px] text-indigo-400 tracking-wider">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
              </span>
              CORE_NODE_ACTIVE // ONLINE
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-syne font-extrabold tracking-tight leading-[1.05] text-white">
              BUILDING <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                HIGH-INTELLIGENCE
              </span> <br />
              DATA SYSTEMS
            </h1>

            <p className="max-w-xl text-slate-400 text-sm sm:text-base font-normal leading-relaxed">
              Hello, I am Gopiprakan. I engineer custom high-performance full-stack web products, distributed telemetry pipelines, and semantic vector indexing databases built for sub-second responses.
            </p>
          </div>

          {/* Visual statistics cards */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-white/[0.06] py-6">
            <div>
              <span className="font-mono text-[9px] text-slate-500 tracking-wider block">LATENCY THRESHOLD</span>
              <span className="font-syne font-extrabold text-2xl text-white block mt-1">{"< 12ms"}</span>
              <span className="font-mono text-[8px] text-cyan-400 block mt-0.5">// TELEMETRY_OK</span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-slate-500 tracking-wider block">ACTIVE DEPLOYMENTS</span>
              <span className="font-syne font-extrabold text-2xl text-white block mt-1">18 Node</span>
              <span className="font-mono text-[8px] text-indigo-400 block mt-0.5">// STABILITY_100%</span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-slate-500 tracking-wider block">INGEST BANDWIDTH</span>
              <span className="font-syne font-extrabold text-2xl text-white block mt-1">12 GB/s</span>
              <span className="font-mono text-[8px] text-purple-400 block mt-0.5">// STREAMING_LIVE</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 items-center font-mono text-[11px]">
            <a
              href="#projects"
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white text-black font-bold shadow-lg shadow-white/5 hover:bg-slate-200 transition-colors"
            >
              INSPECT_PRODUCTS
              <ArrowUpRight className="w-4 h-4" />
            </a>
            
            <a
              href="#console"
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              BOOT_SHELL
            </a>
          </div>
        </div>

        {/* Hero Right Visuals - Interactive CSS Geometric Sphere */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            
            {/* Spinning Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-cyan-400/20"
            />
            
            {/* Second Spinning Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[85%] h-[85%] rounded-full border border-indigo-500/10 flex items-center justify-center"
            >
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent absolute" />
              <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent absolute" />
            </motion.div>

            {/* Glowing Core */}
            <div className="absolute w-[45%] h-[45%] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/30 blur-2xl animate-pulse" />
            
            {/* SVG Geometric Matrix Core */}
            <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] z-10 text-cyan-400 opacity-80 filter drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <defs>
                <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              {/* Outer Hexagon */}
              <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke="url(#coreGlow)" strokeWidth="1" />
              {/* Inner Hexagon */}
              <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
              {/* Core Nodes */}
              <circle cx="50" cy="50" r="12" fill="none" stroke="url(#coreGlow)" strokeWidth="1.5" />
              <circle cx="50" cy="5" r="2.5" fill="#22d3ee" />
              <circle cx="90" cy="28" r="2.5" fill="#6366f1" />
              <circle cx="90" cy="72" r="2.5" fill="#8b5cf6" />
              <circle cx="50" cy="95" r="2.5" fill="#ec4899" />
              <circle cx="10" cy="72" r="2.5" fill="#3b82f6" />
              <circle cx="10" cy="28" r="2.5" fill="#06b6d4" />
              
              {/* Node Connections */}
              <line x1="50" y1="5" x2="50" y2="50" stroke="rgba(34,211,238,0.15)" strokeWidth="0.8" />
              <line x1="90" y1="28" x2="50" y2="50" stroke="rgba(99,102,241,0.15)" strokeWidth="0.8" />
              <line x1="90" y1="72" x2="50" y2="50" stroke="rgba(139,92,246,0.15)" strokeWidth="0.8" />
              <line x1="50" y1="95" x2="50" y2="50" stroke="rgba(236,72,153,0.15)" strokeWidth="0.8" />
              <line x1="10" y1="72" x2="50" y2="50" stroke="rgba(59,130,246,0.15)" strokeWidth="0.8" />
              <line x1="10" y1="28" x2="50" y2="50" stroke="rgba(6,182,212,0.15)" strokeWidth="0.8" />
            </svg>

            {/* Rotating Orbiting Dots */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute w-[70%] h-[70%] z-20"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* GAMIFIED COMMAND CONSOLE SECTION */}
      <section id="console" className="relative z-10 py-24 bg-black/40 border-t border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-bold">
              {"// EXPERIMENTAL CLIENT SIMULATION //"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-syne font-extrabold tracking-tight text-white uppercase">
              INTERACTIVE SHELL
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
              Verify database nodes directly. Interact using command line operations to trace skills, certifications, and product payloads.
            </p>
          </div>

          {/* CLI Terminal Shell */}
          <div className="bg-[#050508] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[400px] max-h-[500px]">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#010102] border-b border-white/5 font-mono text-[10px] select-none text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
              </div>
              <span className="tracking-widest uppercase font-bold text-slate-400">SHELL_STATION // GP-PORTFOLIO</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] text-emerald-500">ESTABLISHED</span>
              </div>
            </div>

            {/* Scrollable Command Outputs */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 space-y-2 scrollbar-thin scrollbar-thumb-indigo-500/20">
              {consoleHistory.map((item, index) => (
                <div key={index} className="leading-relaxed">
                  {item.type === "input" ? (
                    <div className="text-cyan-400 font-bold">{item.text}</div>
                  ) : (
                    <div className="flex items-start gap-1">
                      <span className="text-indigo-400 text-[10px] select-none mt-0.5">{"[sys]"}</span>
                      <div>
                        {item.text}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 ml-2 text-cyan-400 hover:underline hover:text-cyan-300 font-bold"
                          >
                            OPEN <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={consoleBottomRef} />
            </div>

            {/* CommandLine input */}
            <form onSubmit={handleCommandSubmit} className="flex border-t border-white/5 bg-[#020204]">
              <div className="pl-4 flex items-center font-mono text-xs text-cyan-400 font-bold select-none">
                $
              </div>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="type 'help' to start or list available directories..."
                className="flex-1 px-3 py-4 bg-transparent outline-none border-none font-mono text-xs text-slate-100 placeholder-slate-500"
              />
              <button
                type="submit"
                className="px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-colors flex items-center gap-1"
              >
                EXECUTE <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative z-10 py-32 max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <div className="space-y-2">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
              {"// SHIPPED SYSTEM ARCHITECTURES //"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-syne font-extrabold tracking-tight text-white uppercase">
              PRODUCT ARCHITECTURES
            </h2>
            <p className="max-w-lg text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
              Explore functional nodes demonstrating optimized databases, microservice layers, and sub-second React client pipelines.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2 font-mono text-[10px]">
            {["all", "Full-Stack", "AI/ML", "Next.js", "Go", "Docker"].map((filter) => {
              const active = activeProjectFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveProjectFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                    active 
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                      : "border-white/10 hover:border-white/20 text-slate-400 hover:text-white"
                  }`}
                >
                  {filter.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group glass-panel rounded-2xl p-6 border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.01] flex flex-col justify-between min-h-[350px] relative overflow-hidden transition-all duration-300"
              >
                {/* Upper light sweep line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] text-slate-500 tracking-wider">
                      NODE // {project.id.toUpperCase()}
                    </span>
                    {project.flagship && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-[9px] font-bold text-indigo-400 font-mono">
                        <Sparkles className="w-2.5 h-2.5" /> FLAGSHIP
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-syne font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-[10px] text-slate-400 mt-1">
                      {project.role}
                    </p>
                  </div>

                  <p className="text-slate-400 text-xs font-sans leading-relaxed line-clamp-4">
                    {project.problem}
                  </p>
                </div>

                {/* Footer and Tags */}
                <div className="mt-8 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="font-mono text-[8px] text-indigo-400 bg-indigo-950/20 px-2 py-0.5 rounded border border-indigo-900/10">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center border-t border-white/[0.04] pt-4 font-mono text-[10px]">
                    <a
                      href={project.caseStudyUrl}
                      className="text-slate-500 hover:text-white transition-colors"
                    >
                      READ_CASE_STUDY
                    </a>

                    {project.liveUrl !== "#" ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-0.5 text-cyan-400 font-bold hover:underline"
                      >
                        LAUNCH <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-slate-600">// INTERNAL_STACK</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CORE SKILLS & TELEMETRY MODULE */}
      <section id="skills" className="relative z-10 py-32 bg-black/30 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Skills Left Title */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-bold">
                {"// CAPABILITY MATRIX SOCKETS //"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-syne font-extrabold tracking-tight text-white uppercase">
                INTELLIGENCE MATRIX
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
                Click on any capability core to connect and read simulated latency diagnostics, active workload buffers, and throughput volumes.
              </p>
            </div>

            {/* Selected Skill Telemetry Console */}
            <div className="bg-[#050508]/80 border border-white/10 rounded-2xl p-6 space-y-6 font-mono text-xs relative overflow-hidden shadow-xl">
              {/* Sweep Light */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent animate-pulse" />
              
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" /> NODE_DIAGNOSTICS
                </span>
                <span className="text-emerald-500 font-bold animate-pulse">// CONNECTED</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-slate-500 block">CORE NAME</span>
                  <span className="text-white text-sm font-syne font-extrabold mt-0.5 block">{selectedSkill}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block">FUNCTION DESCRIPTION</span>
                  <p className="text-slate-400 text-[11px] font-sans leading-relaxed mt-1">
                    {skillDetails[selectedSkill]?.desc || "Standard system intelligence operations container configuration."}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-white/[0.04] pt-4 text-center">
                  <div>
                    <span className="text-[9px] text-slate-500 block">LATENCY</span>
                    <span className="text-cyan-400 font-bold text-[11px] block mt-1">
                      {skillDetails[selectedSkill]?.latency || "8ms"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block">THROUGHPUT</span>
                    <span className="text-indigo-400 font-bold text-[11px] block mt-1">
                      {skillDetails[selectedSkill]?.throughput || "1.2M/hr"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block">LOAD PROFILE</span>
                    <span className="text-purple-400 font-bold text-[11px] block mt-1">
                      {skillDetails[selectedSkill]?.load || "90%"}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>COEF WORKLOAD ALLOCATION</span>
                    <span className="text-cyan-400 font-bold">{skillDetails[selectedSkill]?.load || "90%"}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      key={selectedSkill}
                      initial={{ width: 0 }}
                      animate={{ width: skillDetails[selectedSkill]?.load || "90%" }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Right Interactive Grid */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {portfolioData.skills.map((skill, index) => {
                const active = selectedSkill === skill;
                const formattedIndex = String(index + 1).padStart(2, "0");
                return (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(skill)}
                    className={`group relative text-left p-4 rounded-xl border flex flex-col justify-between min-h-[100px] transition-all duration-300 ${
                      active 
                        ? "border-cyan-400 bg-cyan-400/[0.02] shadow-[0_0_20px_rgba(6,182,212,0.06)]"
                        : "border-white/5 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex justify-between items-start font-mono text-[9px]">
                      <span className="text-slate-500 group-hover:text-cyan-400 transition-colors">
                        NODE_{formattedIndex}
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" : "bg-white/10"}`} />
                    </div>

                    <h4 className="font-syne font-bold text-xs sm:text-sm text-slate-200 mt-4 group-hover:text-white transition-colors">
                      {skill}
                    </h4>

                    <div className="w-full flex justify-between items-center border-t border-white/[0.02] pt-2 mt-4 font-mono text-[8px] text-slate-500">
                      <span>LOAD_LIMIT</span>
                      <span className={active ? "text-cyan-400 font-bold" : ""}>
                        {skillDetails[skill]?.load || "90%"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* TIMELINE CERTIFICATIONS SECTION */}
      <section id="certs" className="relative z-10 py-32 max-w-5xl mx-auto px-6 space-y-12">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
            {"// ACCREDITED SECURITY SOCKETS //"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-syne font-extrabold tracking-tight text-white uppercase">
            CERTIFICATIONS TIMELINE
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
            Review cryptographic security clearances issued by AWS, GCP, TensorFlow Google, and Azure, verified over remote URL links.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-12 py-4">
          {portfolioData.certifications.map((cert) => {
            return (
              <div key={cert.id} className="relative group pl-6 sm:pl-10">
                
                {/* Timeline node */}
                <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-[#030306] border-2 border-indigo-500 group-hover:border-cyan-400 group-hover:bg-cyan-400 shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all duration-300 z-10" />
                
                {/* Left Date indicator */}
                <div className="hidden md:block absolute left-[-160px] top-1.5 w-32 text-right font-mono text-xs text-slate-500">
                  {cert.date}
                </div>

                <div className="glass-panel rounded-2xl p-6 border border-white/5 group-hover:border-indigo-500/20 group-hover:bg-white/[0.01] transition-all duration-300 relative overflow-hidden">
                  
                  {/* Sweep Light */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-slate-500 block uppercase">ISSUER // {cert.issuer}</span>
                        {cert.verified && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-[8px] font-bold border border-cyan-500/20">
                            <ShieldCheck className="w-2.5 h-2.5" /> SECURE_OK
                          </span>
                        )}
                      </div>
                      <h3 className="font-syne font-extrabold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors">
                        {cert.title}
                      </h3>
                      <div className="md:hidden font-mono text-[9px] text-indigo-400 mt-1">{cert.date}</div>
                    </div>

                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-slate-400 hover:text-white text-[10px] font-mono transition-colors self-start sm:self-auto"
                    >
                      VERIFY_SOCKET <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER / SECURE TRANSMIT TERMINAL */}
      <footer id="contact" className="relative z-10 py-32 bg-black border-t border-white/[0.04] text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full px-6 space-y-16">
          
          <div className="space-y-4 max-w-xl mx-auto">
            <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-bold">
              {"// OPEN SECURE SOCKET COMM //"}
            </span>
            <h2 className="text-4xl sm:text-6xl font-syne font-extrabold tracking-tight text-white uppercase leading-none">
              COMMUNICATION SOCKET
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
              Initiate a high-priority message stream. Transmissions are encrypted and relayed directly to the operator console dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            
            {/* Left Contact Details */}
            <div className="lg:col-span-5 space-y-4 font-mono text-xs text-slate-400">
              <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
                
                <div>
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">OPERATOR PROFILE</span>
                  <span className="text-white font-syne font-bold text-sm block mt-1">Gopiprakan</span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">// AI & Systems Specialist</span>
                </div>

                <div className="border-t border-white/[0.04] pt-4 space-y-3">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">DIRECT CHANNELS</span>
                  
                  <a 
                    href="mailto:gopiprakan@example.com"
                    className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-indigo-400" />
                    gopiprakan@example.com
                  </a>

                  <a 
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <GithubIcon className="text-cyan-400" />
                    github.com/gopiprakan
                  </a>

                  <a 
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <LinkedinIcon className="text-purple-400" />
                    linkedin.com/in/gopiprakan
                  </a>
                </div>

                <div className="border-t border-white/[0.04] pt-4">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">PDF REPOSITORY</span>
                  <a
                    href={portfolioData.resume.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 font-bold hover:underline mt-1.5"
                  >
                    PREVIEW_RESUME_DOC <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-6 rounded-2xl border border-white/5">
                <form onSubmit={handleTransmitSubmit} className="space-y-4 font-mono text-xs">
                  
                  <div>
                    <label className="text-slate-500 block mb-1.5 uppercase text-[9px] font-bold">Classification Socket</label>
                    <select 
                      value={transmissionForm.classification}
                      onChange={(e) => setTransmissionForm({ ...transmissionForm, classification: e.target.value })}
                      className="w-full bg-[#030306] border border-white/10 rounded-lg px-3.5 py-3 text-slate-200 outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="AI Core Integration">AI Core Integration</option>
                      <option value="Distributed Pipeline">Distributed Pipeline Build</option>
                      <option value="Next.js SLA Web">Next.js SLA UI Deployment</option>
                      <option value="Consulting Core">Consulting Core Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-500 block mb-1.5 uppercase text-[9px] font-bold">Return Socket (Email)</label>
                    <input 
                      type="email" 
                      required
                      value={transmissionForm.returnSocket}
                      onChange={(e) => setTransmissionForm({ ...transmissionForm, returnSocket: e.target.value })}
                      placeholder="operator@domain.com"
                      className="w-full bg-[#030306] border border-white/10 rounded-lg px-3.5 py-3 text-slate-200 outline-none focus:border-cyan-400 placeholder-slate-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 block mb-1.5 uppercase text-[9px] font-bold">Message Payload</label>
                    <textarea 
                      rows={3}
                      required
                      value={transmissionForm.payload}
                      onChange={(e) => setTransmissionForm({ ...transmissionForm, payload: e.target.value })}
                      placeholder="Input encrypted text blocks or project details..."
                      className="w-full bg-[#030306] border border-white/10 rounded-lg px-3.5 py-3 text-slate-200 outline-none focus:border-cyan-400 placeholder-slate-600 transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={transmitting}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-black font-extrabold uppercase text-[10px] tracking-wider transition-all flex items-center justify-center gap-1.5 disabled:opacity-40"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {transmitting ? "TRANSMITTING DATA..." : "TRANSMIT DATA PACKET"}
                  </button>
                </form>

                {/* Audit log output for transmissions */}
                {transmissionLogs.length > 0 && (
                  <div className="mt-4 border-t border-white/5 pt-4 font-mono text-[9px] text-slate-400 space-y-1.5 bg-[#010102] p-4 rounded-xl border border-white/5 max-h-32 overflow-y-auto">
                    {transmissionLogs.map((log, i) => (
                      <div key={i} className={log.includes("SUCCESSFUL") || log.includes("OK") ? "text-cyan-400 font-bold" : "text-slate-500"}>
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="text-[9px] text-slate-500 font-mono tracking-widest pt-12 select-none opacity-40 uppercase">
            © 2026 GOPIPRAKAN. OPERATING UNDER STANDARDS NODE_1. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </main>
  );
}
