"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowRight,
  Download, 
  Mail, 
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ChevronRight,
  Terminal,
  Activity,
  Database,
  Check,
  RefreshCw,
  Send,
  Lock,
  Calendar,
  Play
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

// High-fidelity certification issuer representation
const CertificationIssuer = ({ logo }: { logo: string }) => {
  const providers: Record<string, { label: string; icon: React.ReactNode }> = {
    aws: { label: "AWS Certified", icon: <Cpu className="w-5 h-5 text-cyber-yellow" /> },
    gcp: { label: "Google Cloud", icon: <Layers className="w-5 h-5 text-cyber-cyan" /> },
    tensorflow: { label: "TensorFlow Dev", icon: <Sparkles className="w-5 h-5 text-cyber-pink" /> },
  };

  const provider = providers[logo] || { label: "Microsoft Azure", icon: <Cpu className="w-5 h-5 text-cyber-violet" /> };

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
        {provider.icon}
      </div>
      <div>
        <span className="font-mono text-[9px] text-brand-muted tracking-wider block">ISSUING AUTHORITY</span>
        <span className="font-syne font-bold text-xs text-white">{provider.label}</span>
      </div>
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
  <div className="w-full bg-[#050507] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col">
    {/* Bar */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#010102] font-mono select-none">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-cyber-pink/40" />
        <span className="w-2.5 h-2.5 rounded-full bg-cyber-yellow/40" />
        <span className="w-2.5 h-2.5 rounded-full bg-cyber-green/40" />
      </div>
      <span className="text-[10px] text-brand-muted tracking-widest uppercase font-bold">{title}</span>
      <div className="w-10" />
    </div>
    <div className="p-1.5 bg-[#050507]">{children}</div>
  </div>
);

/* ============================================================================
   SUBCOMPONENTS FOR MOCKUPS
   ============================================================================ */

// 1. ZARO Performance Auditor Simulator
const ZaroAuditor = () => {
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState("");
  const [scores, setScores] = useState({ perf: 0, acc: 0, bp: 0, seo: 0 });

  const runAudit = () => {
    if (running) return;
    setRunning(true);
    setScores({ perf: 0, acc: 0, bp: 0, seo: 0 });
    
    const steps = [
      { t: "Analyzing React Hydration Nodes...", s: { perf: 34, acc: 40, bp: 30, seo: 50 } },
      { t: "Verifying Edge Middleware Latency...", s: { perf: 65, acc: 72, bp: 60, seo: 75 } },
      { t: "Compiling Post-CSS Bundle Weight...", s: { perf: 88, acc: 92, bp: 85, seo: 95 } },
      { t: "Finalizing Server-Side Render (SSR) Metrics...", s: { perf: 99, acc: 98, bp: 100, seo: 100 } }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setStage(step.t);
        setScores(step.s);
        if (idx === steps.length - 1) {
          setRunning(false);
        }
      }, (idx + 1) * 900);
    });
  };

  return (
    <div className="bg-[#020204] p-4 rounded-xl border border-white/5 font-mono text-xs text-brand-muted space-y-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <span className="text-white font-bold flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-cyber-cyan" /> SPEED_AUDITOR
        </span>
        <button
          onClick={runAudit}
          disabled={running}
          className="px-3 py-1 rounded bg-cyber-green/10 border border-cyber-green/30 text-cyber-green font-bold text-[10px] hover:bg-cyber-green hover:text-black transition-all flex items-center gap-1 disabled:opacity-40"
        >
          <Play className="w-2.5 h-2.5" />
          {running ? "AUDITING..." : "RUN AUDIT"}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { label: "PERF", score: scores.perf, color: "text-cyber-green border-cyber-green/20" },
          { label: "ACC", score: scores.acc, color: "text-cyber-cyan border-cyber-cyan/20" },
          { label: "BP", score: scores.bp, color: "text-cyber-violet border-cyber-violet/20" },
          { label: "SEO", score: scores.seo, color: "text-cyber-pink border-cyber-pink/20" },
        ].map((item) => (
          <div key={item.label} className={`border rounded-lg p-2.5 bg-white/[0.01] ${item.color}`}>
            <span className="text-[9px] block text-brand-muted mb-1">{item.label}</span>
            <span className="text-sm font-bold block">{item.score || "--"}</span>
          </div>
        ))}
      </div>

      <div className="min-h-8 text-[10px] text-brand-muted/70 flex items-center justify-center text-center px-4 bg-white/[0.01] rounded border border-white/[0.02]">
        {stage ? `[sys] ${stage}` : "Ready to check node compression efficiency."}
      </div>
    </div>
  );
};

// 2. NeuralStream Sensor Waveform Anomaly Injector
const NeuralStreamWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [anomaly, setAnomaly] = useState(false);
  const [alertText, setAlertText] = useState("STREAM: STABLE [SYS_OK]");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = anomaly ? "#ec4899" : "#06b6d4";
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        // Normal sine wave pattern
        let y = canvas.height / 2 + Math.sin(x * 0.05 + frame * 0.15) * 15;
        
        // Inject random high frequency spike if anomaly active
        if (anomaly && x > 120 && x < 160) {
          y += Math.sin(x * 0.8 + frame * 0.6) * 22;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw bounding box if anomaly occurs
      if (anomaly) {
        ctx.strokeStyle = "rgba(236,72,153,0.3)";
        ctx.fillStyle = "rgba(236,72,153,0.05)";
        ctx.strokeRect(110, 5, 60, canvas.height - 10);
        ctx.fillRect(110, 5, 60, canvas.height - 10);
        
        ctx.fillStyle = "#ec4899";
        ctx.font = "8px monospace";
        ctx.fillText("ANOMALY", 115, 20);
      }

      frame++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [anomaly]);

  const triggerAnomaly = () => {
    if (anomaly) return;
    setAnomaly(true);
    setAlertText("INJECTING INTERRUPT HASH...");
    
    setTimeout(() => {
      setAlertText("ANOMALY SIGNAL ISOLATED in 8.4ms!");
      setTimeout(() => {
        setAnomaly(false);
        setAlertText("STREAM: STABLE [SYS_OK]");
      }, 3000);
    }, 1000);
  };

  return (
    <div className="bg-[#020204] p-4 rounded-xl border border-white/5 font-mono text-xs text-brand-muted space-y-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <span className="text-white font-bold flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-cyber-cyan" /> LIVE_TELEMETRY
        </span>
        <button
          onClick={triggerAnomaly}
          disabled={anomaly}
          className="px-3 py-1 rounded bg-cyber-pink/10 border border-cyber-pink/30 text-cyber-pink font-bold text-[10px] hover:bg-cyber-pink hover:text-black transition-all flex items-center gap-1 disabled:opacity-40"
        >
          <Sparkles className="w-2.5 h-2.5" />
          INJECT ANOMALY
        </button>
      </div>

      <div className="relative border border-white/10 rounded-lg overflow-hidden bg-black/40 h-28 flex items-center justify-center">
        <canvas ref={canvasRef} width={280} height={100} className="w-full h-full" />
      </div>

      <div className={`text-[10px] font-bold text-center py-1.5 rounded transition-all ${
        anomaly ? "bg-cyber-pink/10 text-cyber-pink" : "bg-cyber-cyan/10 text-cyber-cyan"
      }`}>
        {alertText}
      </div>
    </div>
  );
};

// 3. DeepSearch Vector Sim Matcher
const DeepSearchVector = () => {
  const [activeQuery, setActiveQuery] = useState("");
  const [results, setResults] = useState<{ doc: string; sim: number; active: boolean }[]>([]);
  const [processing, setProcessing] = useState(false);

  const triggerSearch = (query: string) => {
    if (processing) return;
    setProcessing(true);
    setActiveQuery(query);
    setResults([]);

    const matchDB: Record<string, { doc: string; sim: number; active: boolean }[]> = {
      ai: [
        { doc: "neural_pipeline_model.bin", sim: 0.942, active: true },
        { doc: "qdrant_indexing_nodes.go", sim: 0.814, active: false },
        { doc: "zaro_edge_optimizer.ts", sim: 0.612, active: false },
      ],
      systems: [
        { doc: "grpc_broker_consensus.go", sim: 0.965, active: true },
        { doc: "kafka_stream_telemetry.py", sim: 0.841, active: false },
        { doc: "postgres_sharding_schema.sql", sim: 0.709, active: false },
      ],
      web: [
        { doc: "zaro_edge_router.ts", sim: 0.988, active: true },
        { doc: "react_hydration_comp.tsx", sim: 0.887, active: false },
        { doc: "vector_visualizer_map.py", sim: 0.541, active: false },
      ]
    };

    setTimeout(() => {
      setResults(matchDB[query] || []);
      setProcessing(false);
    }, 1200);
  };

  return (
    <div className="bg-[#020204] p-4 rounded-xl border border-white/5 font-mono text-xs text-brand-muted space-y-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <span className="text-white font-bold flex items-center gap-1">
          <Database className="w-3.5 h-3.5 text-cyber-violet" /> VECTOR_DATABASE
        </span>
        <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 font-semibold text-brand-muted">COSINE SIM</span>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {[
          { key: "ai", label: "Semantic AI" },
          { key: "systems", label: "Consensus gRPC" },
          { key: "web", label: "Ship Edge SLA" },
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => triggerSearch(btn.key)}
            className={`px-2.5 py-1 text-[10px] rounded border transition-all ${
              activeQuery === btn.key 
                ? "bg-cyber-violet/20 border-cyber-violet text-white font-bold" 
                : "bg-white/5 border-white/10 hover:border-white/20 text-brand-muted"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="space-y-2 min-h-[90px]">
        {processing ? (
          <div className="h-20 flex flex-col items-center justify-center gap-2 text-brand-muted/60 text-[10px]">
            <RefreshCw className="w-4 h-4 animate-spin text-cyber-violet" />
            COMPUTING EMBEDDING MATRICES...
          </div>
        ) : results.length > 0 ? (
          results.map((res, i) => (
            <div key={i} className={`flex justify-between items-center p-2 rounded border text-[10px] ${
              res.active ? "bg-cyber-violet/10 border-cyber-violet/30 text-white font-semibold" : "bg-white/[0.01] border-white/5"
            }`}>
              <span className="truncate max-w-[170px]">{res.doc}</span>
              <span className="font-bold font-mono text-cyber-cyan">{res.sim.toFixed(3)}</span>
            </div>
          ))
        ) : (
          <div className="h-20 flex items-center justify-center text-center text-[10px] text-brand-muted/40 border border-dashed border-white/5 rounded-lg">
            Query embedding space node vectors.
          </div>
        )}
      </div>
    </div>
  );
};

// 4. Hero Section Interactive Console & Mini Neural Canvas
const HeroConsoleDashboard = () => {
  const [inputVal, setInputVal] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ type: "sys" | "user"; text: string }>>([
    { type: "sys", text: "ZARO COGNITIVE OS v3.0 // ACTIVE SECURITY CONSOLE" },
    { type: "sys", text: "sys_uptime: 100% | loc: Bangalore Node [12.97°N / 77.59°E]" },
    { type: "sys", text: "type /help to retrieve list of operative commands." }
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const neuralCanvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  // Mini Neural network canvas logic
  useEffect(() => {
    const canvas = neuralCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    // Define simple node architecture layers: Input (3), Hidden 1 (4), Hidden 2 (4), Output (2)
    const layers = [
      { nodes: 3, x: 30 },
      { nodes: 4, x: 100 },
      { nodes: 4, x: 170 },
      { nodes: 2, x: 240 }
    ];

    const layerConfigs = layers.map((layer, layerIdx) => {
      const height = 110;
      const spacing = height / (layer.nodes + 1);
      return Array.from({ length: layer.nodes }).map((_, nodeIdx) => ({
        x: layer.x,
        y: spacing * (nodeIdx + 1) + 5,
        pulseOffset: Math.random() * Math.PI * 2
      }));
    });

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let l = 0; l < layerConfigs.length - 1; l++) {
        const currLayer = layerConfigs[l];
        const nextLayer = layerConfigs[l + 1];

        currLayer.forEach((node) => {
          nextLayer.forEach((nextNode) => {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nextNode.x, nextNode.y);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Draw floating packets along lines
            const progress = ((frame * 0.5 + node.pulseOffset * 10) % 100) / 100;
            const px = node.x + (nextNode.x - node.x) * progress;
            const py = node.y + (nextNode.y - node.y) * progress;

            ctx.beginPath();
            ctx.arc(px, py, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(6, 182, 212, 0.6)";
            ctx.fill();
          });
        });
      }

      // Draw nodes
      layerConfigs.forEach((layer) => {
        layer.forEach((node) => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#0a0a0d";
          ctx.fill();
          ctx.strokeStyle = "#8b5cf6";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Outer glowing pulse ring
          const pulseRadius = 4 + Math.sin(frame * 0.15 + node.pulseOffset) * 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(139, 92, 246, 0.2)";
          ctx.stroke();
        });
      });

      frame++;
      animId = requestAnimationFrame(drawNetwork);
    };

    drawNetwork();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...terminalHistory, { type: "user" as const, text: inputVal }];

    const outputResponse = (text: string) => {
      setTerminalHistory([...newHistory, { type: "sys" as const, text }]);
    };

    const multiLineResponse = (lines: string[]) => {
      setTerminalHistory([
        ...newHistory,
        ...lines.map(line => ({ type: "sys" as const, text: line }))
      ]);
    };

    switch (cleanCmd) {
      case "/help":
        multiLineResponse([
          "COMMAND LEDGER:",
          "  /about    - Fetch profile specs",
          "  /skills   - Catalog capability logs",
          "  /projects - Inspect flagship codebases",
          "  /ping     - Secure speed calculations",
          "  /clear    - Flush terminal console stream"
        ]);
        break;
      case "/about":
        outputResponse("OP_GOP: AI & Data Science Specialist banner ZARO. Shipped 18 production systems.");
        break;
      case "/skills":
        outputResponse("CORES: PyTorch, Qdrant, ClickHouse, Next.js, Go API architectures.");
        break;
      case "/projects":
        multiLineResponse([
          "PROJECT NODES ACTIVE:",
          "  - ZARO brand custom edge routing platform",
          "  - NeuralStream telemetry IoT checker",
          "  - DeepSearch document matching embeddings"
        ]);
        break;
      case "/ping":
        outputResponse(`PING STATUS: 6ms // ROUTE OPTIMAL // [Bangalore -> User]`);
        break;
      case "/clear":
        setTerminalHistory([]);
        break;
      default:
        outputResponse(`CMD_ERROR: System packet "${cleanCmd}" not classified. Type /help.`);
    }

    setInputVal("");
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 1. System logs console */}
      <GlassCard className="p-4 flex flex-col h-56" glowColor="violet">
        <div className="flex justify-between items-center font-mono text-[9px] text-brand-muted border-b border-white/5 pb-2 mb-2 select-none">
          <span className="flex items-center gap-1.5 font-bold text-white uppercase">
            <Terminal className="w-3.5 h-3.5 text-cyber-violet animate-pulse" /> COMMAND_TERMINAL
          </span>
          <span>SOCKET_STREAM // ENCRYPTED</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1.5 font-mono text-[10px] text-brand-muted/95 pr-2 hide-scrollbar">
          {terminalHistory.map((item, idx) => (
            <div key={idx} className={item.type === "user" ? "text-cyber-cyan" : "text-brand-muted"}>
              {item.type === "user" ? `> ${item.text}` : `[sys] ${item.text}`}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        <form onSubmit={handleCommandSubmit} className="mt-2 border-t border-white/5 pt-2 flex items-center">
          <span className="font-mono text-cyber-cyan text-xs mr-2">{">"}</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="enter command (e.g. /help, /skills)"
            className="flex-1 bg-transparent outline-none font-mono text-xs text-white placeholder-brand-muted/40"
          />
        </form>
      </GlassCard>

      {/* 2. Mini Neural net map and statistics readout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GlassCard className="p-4 flex items-center justify-center h-32" glowColor="cyan">
          <canvas ref={neuralCanvasRef} width={270} height={120} className="w-full h-full max-w-[270px]" />
        </GlassCard>
        
        <GlassCard className="p-4 font-mono text-[10px] text-brand-muted space-y-2 h-32 flex flex-col justify-center" glowColor="pink">
          <div className="flex justify-between border-b border-white/5 pb-1">
            <span>NEURAL MATRIX LOAD</span>
            <span className="text-cyber-pink font-bold">12.5 GFLOPS</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-1">
            <span>DATABASE FLUSH</span>
            <span className="text-cyber-cyan font-bold">SUB-12MS</span>
          </div>
          <div className="flex justify-between">
            <span>SYS_INTEGRITY</span>
            <span className="text-cyber-green font-bold">100% OK</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

/* ============================================================================
   MAIN PAGE
   ============================================================================ */

export default function Page() {
  const skills = portfolioData.skills;
  const certifications = portfolioData.certifications;
  const projects = portfolioData.projects;

  // Active navigation timeline tab and active credentials slot
  const [navTime, setNavTime] = useState<"exp" | "edu">("exp");
  const [expandedCert, setExpandedCert] = useState<string | null>(null);

  // Time stamp state
  const [localTime, setLocalTime] = useState("");
  const [pingSpeed, setPingSpeed] = useState(8);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setLocalTime(d.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ping jitter simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setPingSpeed(Math.floor(Math.random() * 5) + 6);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Secure connection packet submission details
  const [packetClassification, setPacketClassification] = useState("AI Integration");
  const [transmissionForm, setTransmissionForm] = useState({ returnSocket: "", payload: "" });
  const [transmissionLog, setTransmissionLog] = useState<string[]>([]);
  const [transmitting, setTransmitting] = useState(false);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transmissionForm.returnSocket || !transmissionForm.payload || transmitting) return;

    setTransmitting(true);
    setTransmissionLog(["[sys] INITIALIZING UPLINK SEQUENCE..."]);

    const steps = [
      `[sys] PACKET INTERPOLATING WITH HASH: SHA-256`,
      `[sys] TARGET NODE IDENTIFIED: GOPIPRAKAN // ADDR: 12.97° N / 77.59° E`,
      `[sys] TRANSMITTING LOAD CLASSIFIED AS [${packetClassification.toUpperCase()}]`,
      `[sys] UPLINK STATUS: SECURE CONNECT OK [200]`
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setTransmissionLog(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setTransmitting(false);
          setTransmissionForm({ returnSocket: "", payload: "" });
        }
      }, (idx + 1) * 700);
    });
  };

  // Compile Resume download simulator
  const [compilingResume, setCompilingResume] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);

  const startResumeCompile = () => {
    if (compilingResume) return;
    setCompilingResume(true);
    setCompileProgress(0);

    const interval = setInterval(() => {
      setCompileProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCompilingResume(false);
            window.open(portfolioData.resume.pdfPath, "_blank");
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  return (
    <main className="relative min-h-screen text-brand-text overflow-hidden bg-brand-bg cyber-grid selection:bg-cyber-cyan selection:text-black">
      {/* Dynamic Mesh Canvas */}
      <BackgroundParticles />

      {/* Floating Rotating Glow Backdrop Bubbles */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-cyber-violet/[0.04] blur-[140px] pointer-events-none z-0 animate-glow-slow-1" />
      <div className="absolute bottom-[10%] right-[-20%] w-[70%] h-[70%] rounded-full bg-cyber-cyan/[0.03] blur-[160px] pointer-events-none z-0 animate-glow-slow-2" />
      <div className="absolute top-[40%] left-[30%] w-[50%] h-[50%] rounded-full bg-cyber-pink/[0.02] blur-[150px] pointer-events-none z-0" />

      {/* Floating console dashboard top banner */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <nav className="glass-panel rounded-full px-6 py-3.5 flex items-center justify-between shadow-[0_15px_35px_rgba(0,0,0,0.9)] border border-white/5">
          <a href="#" className="font-syne font-extrabold text-sm sm:text-base tracking-widest text-white flex items-center gap-1.5 hover:text-cyber-cyan transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse" />
            GOPIPRAKAN.
          </a>
          
          <div className="hidden md:flex gap-8 items-center font-mono text-[10px] text-brand-muted">
            <a href="#about" className="hover:text-white transition-colors tracking-widest">// ABOUT</a>
            <a href="#projects" className="hover:text-white transition-colors tracking-widest">// PROJECTS</a>
            <a href="#certifications" className="hover:text-white transition-colors tracking-widest">// CREDENTIALS</a>
            <a href="#resume" className="hover:text-white transition-colors tracking-widest">// RESUME</a>
          </div>

          <div className="flex gap-4 items-center font-mono text-[9px] text-brand-muted border-l border-white/10 pl-4 select-none">
            <div className="hidden sm:block">CLOCK // <span className="text-white font-bold">{localTime || "00:00:00"}</span></div>
            <div>PING // <span className="text-cyber-cyan font-bold">{pingSpeed}ms</span></div>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-32 pb-16 z-10 scanline">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 border border-cyber-cyan/30 bg-cyber-cyan/5 px-3.5 py-1.5 rounded-full text-[10px] font-mono text-cyber-cyan font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
              SYSTEM_STATE: OPERATIONAL // FREELANCE CONNECT ACTIVE
            </div>

            <div className="space-y-4">
              <h1 className="text-[12vw] sm:text-[7vw] lg:text-[5.5vw] font-bebas leading-none tracking-wide text-white uppercase select-none">
                GOPIPRAKAN // <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-violet via-cyber-cyan to-cyber-pink animate-gradient-text">
                  SYSTEMS ENGINEER
                </span>
              </h1>
              
              <h2 className="text-base sm:text-lg lg:text-xl font-syne font-bold tracking-widest uppercase text-white/90">
                Data Science Pipelines & Machine Learning Core Networks
              </h2>
            </div>

            <p className="max-w-xl text-brand-muted font-sans text-sm sm:text-base leading-relaxed tracking-wide">
              Deploying high-throughput distributed servers, training secure vector matching layers, and designing sleek custom web client runtimes under the ZARO engineering banner.
            </p>

            <div className="flex flex-wrap gap-4 font-mono text-xs pt-4">
              <a href="#projects" className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-cyber-violet to-cyber-cyan hover:opacity-95 text-white font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(6,182,212,0.2)] flex items-center gap-2">
                Explore Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="glass-panel px-6 py-3 rounded-full text-white font-semibold hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex items-center gap-2">
                Transmit Packet
              </a>
            </div>
          </div>

          {/* Hero Right Interactive Console panel */}
          <div className="lg:col-span-6 w-full">
            <HeroConsoleDashboard />
          </div>

        </div>

        {/* Bottom Coordinates & stats display */}
        <div className="absolute bottom-8 left-6 right-6 lg:left-24 lg:right-24 flex justify-between text-brand-muted font-mono text-[9px] tracking-widest uppercase select-none opacity-40">
          <div>GEOLOC // 12.9716° N / 77.5946° E</div>
          <div className="hidden sm:block">ZARO NEURAL SYSTEM MATRIX v3.0 // HIGH FIDELITY TERMINAL</div>
          <div>TIMESTAMP // JULY 2026</div>
        </div>
      </section>

      {/* ABOUT BENTO SECTION */}
      <section id="about" className="relative px-6 sm:px-12 lg:px-24 py-32 border-t border-white/5 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-2">
            <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-bold">{"// CORE CORE CORE"}</span>
            <h2 className="text-5xl sm:text-6xl font-bebas tracking-wide text-white">OPERATIONAL PROFILE // CAPABILITIES</h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Box 1: Profile Story */}
            <GlassCard className="p-6 md:col-span-2 space-y-4 flex flex-col justify-between" glowColor="cyan">
              <div className="space-y-4">
                <span className="font-mono text-[9px] text-brand-muted block">THE CORE ARCHITECT</span>
                <h3 className="font-syne font-extrabold text-xl text-white uppercase">High Performance Distributed Operations</h3>
                <p className="font-sans text-brand-muted text-sm leading-relaxed">
                  I specialize in structuring clean, optimized data pipelines and machine learning network architectures that process metrics in milliseconds. Working under the **ZARO** banner, I deploy vector databases, scale cluster instances, and design tailored React interfaces for complex administrative needs.
                </p>
                <p className="font-sans text-brand-muted text-sm leading-relaxed">
                  Whether indexing sensor arrays on telemetry networks or hosting low-latency client environments, my primary directive is standardizing speed, validation, and modular security profiles.
                </p>
              </div>

              {/* Stats highlights */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6 mt-4 text-center font-mono">
                <div>
                  <span className="text-[9px] text-brand-muted block">COMPLETED SYSTEMS</span>
                  <span className="text-lg font-bold text-white">18+ NODES</span>
                </div>
                <div>
                  <span className="text-[9px] text-brand-muted block">PEAK LATENCY</span>
                  <span className="text-lg font-bold text-cyber-cyan">&lt;12 MS</span>
                </div>
                <div>
                  <span className="text-[9px] text-brand-muted block">SLA GUARANTEE</span>
                  <span className="text-lg font-bold text-cyber-green">99.99%</span>
                </div>
              </div>
            </GlassCard>

            {/* Box 2: Profile portrait picture */}
            <GlassCard className="p-4 flex flex-col justify-between" glowColor="violet">
              <span className="font-mono text-[9px] text-brand-muted block mb-3">SYSTEM_FACE: GOP</span>
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-brand-surface border border-white/10 group">
                <Image 
                  src="/profile-photo.png" 
                  alt="Gopiprakan portrait" 
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-100"
                />
              </div>
              <div className="font-mono text-[9px] text-brand-muted mt-3 flex justify-between">
                <span>INDEX_SIGN: GOP_001</span>
                <span>STATE: COMPLETE</span>
              </div>
            </GlassCard>

            {/* Box 3: Capabilities Directory (All skills) */}
            <div className="md:col-span-3">
              <GlassCard className="p-6" glowColor="white" tiltEnabled={false}>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="font-mono text-[9px] text-brand-muted block">DYNAMIC CORE DIRECTORY</span>
                    <h3 className="font-syne font-extrabold text-lg text-white uppercase tracking-wider">Systems Competency Map</h3>
                  </div>
                </div>
                <InteractiveSkills skills={skills} />
              </GlassCard>
            </div>

            {/* Box 4: Cloud infrastructure logo stack */}
            <GlassCard className="p-6 flex flex-col justify-between" glowColor="pink">
              <div className="space-y-3">
                <span className="font-mono text-[9px] text-brand-muted block">INFRASTRUCTURE STACK</span>
                <h3 className="font-syne font-extrabold text-base text-white uppercase">Cloud Clusters</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-sans">
                  Deployments are orchestrated across scalable container systems using multi-region synchronization paths.
                </p>
              </div>

              <div className="flex gap-2 flex-wrap pt-6">
                {["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"].map((logo) => (
                  <span key={logo} className="font-mono text-[9px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-brand-muted hover:text-white transition-colors">
                    {logo}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Box 5: Systems Radar indicator chart representation */}
            <GlassCard className="p-6 md:col-span-2 flex flex-col justify-between" glowColor="violet">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-brand-muted block">DIAGNOSTICS SPEC</span>
                <h3 className="font-syne font-extrabold text-base text-white uppercase">Performance Target Grid</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 font-mono text-[10px]">
                {[
                  { label: "THROUGHPUT", val: "99.8%", color: "text-cyber-cyan" },
                  { label: "FAULT_TOLERANCE", val: "98.9%", color: "text-cyber-green" },
                  { label: "CONCURRENCY", val: "97.5%", color: "text-cyber-violet" },
                  { label: "EMBEDDING_MATCH", val: "99.1%", color: "text-cyber-pink" },
                ].map((gauge) => (
                  <div key={gauge.label} className="border border-white/5 rounded-lg p-3 bg-black/40 text-center">
                    <span className="text-[9px] text-brand-muted block mb-1">{gauge.label}</span>
                    <span className={`text-sm font-bold block ${gauge.color}`}>{gauge.val}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

          </div>
        </div>
      </section>

      {/* DEPLOYED CODE / SYSTEMS SECTION */}
      <section id="projects" className="px-6 sm:px-12 lg:px-24 py-32 border-t border-white/5 relative bg-[#020204]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="space-y-2">
            <span className="font-mono text-xs text-cyber-pink uppercase tracking-widest font-bold">{"// DEPLOYED INSTANCES"}</span>
            <h2 className="text-5xl sm:text-6xl font-bebas tracking-wide text-white">SYSTEM PROJECTS // PLAYGROUND</h2>
          </div>

          {/* Flagship Project Card */}
          {projects.filter(p => p.flagship).map((project) => (
            <GlassCard key={project.id} className="p-6 sm:p-8 lg:p-10" glowColor="cyan">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Left Content details */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-mono text-[9px] px-3 py-1 rounded-full font-bold">
                        FLAGSHIP PRODUCT NODE
                      </span>
                      <span className="text-cyber-green font-mono text-[9px] flex items-center gap-1.5 font-bold bg-cyber-green/5 border border-cyber-green/20 px-2 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                        NODE_LIVE
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-syne font-extrabold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-brand-muted font-mono uppercase tracking-widest">{project.role}</p>
                    <p className="text-brand-muted text-sm leading-relaxed font-sans">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((tag) => (
                        <span key={tag} className="font-mono text-[9px] bg-white/5 border border-white/10 text-brand-muted px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Interactive spec link buttons */}
                    <div className="flex items-center gap-6 font-mono text-[10px] tracking-wider uppercase">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center gap-1 text-cyber-cyan font-bold hover:text-white transition-colors">
                        Launch Node
                        <ArrowUpRight className="w-4 h-4 text-cyber-cyan group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                      <a href={project.caseStudyUrl} className="text-brand-muted hover:text-white transition-colors">
                        View Spec Sheet
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Simulator (ZARO Performance auditor) */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <BrowserFrame title="zaro_performance_core">
                    <ZaroAuditor />
                  </BrowserFrame>
                </div>

              </div>
            </GlassCard>
          ))}

          {/* Sub-grid of other projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.filter(p => !p.flagship).map((project) => (
              <GlassCard key={project.id} className="p-6 flex flex-col justify-between h-full space-y-6" glowColor={project.imageKey === "neuralstream" ? "pink" : "violet"}>
                <div className="space-y-6">
                  
                  {/* Interactive mock simulator inside frame */}
                  <BrowserFrame title={`${project.id}_core_simulator`}>
                    {project.imageKey === "neuralstream" ? (
                      <NeuralStreamWave />
                    ) : (
                      <DeepSearchVector />
                    )}
                  </BrowserFrame>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-syne font-extrabold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-[10px] text-brand-muted font-mono uppercase tracking-widest">{project.role}</p>
                    <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-sans">
                      {project.problem}
                    </p>
                  </div>
                </div>

                <div className="space-y-6 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] bg-white/5 border border-white/10 text-brand-muted px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 font-mono text-[10px] tracking-wider uppercase">
                    {project.liveUrl !== "#" ? (
                      <a href={project.liveUrl} className="group/btn flex items-center gap-0.5 text-cyber-cyan font-bold hover:text-white transition-all">
                        Access Node
                        <ArrowUpRight className="w-3.5 h-3.5 text-cyber-cyan group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="text-brand-muted/30 cursor-not-allowed">Node Encrypted</span>
                    )}
                    <a href={project.caseStudyUrl} className="text-brand-muted hover:text-white transition-colors">
                      Technical Spec
                    </a>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

        </div>
      </section>

      {/* CREDENTIALS SECTION */}
      <section id="certifications" className="px-6 sm:px-12 lg:px-24 py-32 border-t border-white/5 bg-black/60 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs text-cyber-violet uppercase tracking-widest font-bold">{"// ENCRYPTED CREDENTIALS"}</span>
              <h2 className="text-5xl sm:text-6xl font-bebas tracking-wide text-white">VERIFIED CREDENTIALS // LEDGER</h2>
            </div>
            <div className="text-brand-muted text-[9px] font-mono tracking-widest select-none">
              [ CLICK CERTIFICATE FOR VERIFICATION CORE ]
            </div>
          </div>

          {/* Grid layout for Certificates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => {
              const isExpanded = expandedCert === cert.id;
              
              return (
                <div key={cert.id} className="relative">
                  <GlassCard 
                    className={`p-6 flex flex-col justify-between h-[270px] cursor-pointer transition-all duration-300 ${
                      isExpanded ? "border-cyber-violet/80 bg-cyber-violet/[0.03]" : ""
                    }`}
                    glowColor="violet"
                    onClick={() => setExpandedCert(isExpanded ? null : cert.id)}
                  >
                    <div className="flex justify-between items-start">
                      <CertificationIssuer logo={cert.logo} />
                      {cert.verified && (
                        <span className="flex items-center gap-1 bg-cyber-green/10 border border-cyber-green/20 px-2 py-0.5 rounded-full text-[9px] text-cyber-green font-mono font-bold uppercase tracking-wider">
                          <ShieldCheck className="w-3 h-3 text-cyber-green" />
                          VERIFIED
                        </span>
                      )}
                    </div>

                    <div className="mt-4">
                      <h3 className="text-base font-syne font-bold text-white tracking-wide leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-brand-muted text-[10px] font-mono mt-1 uppercase">
                        {cert.date}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="font-mono text-[9px] text-brand-muted hover:text-white">
                        {isExpanded ? "[ CLOSE CORE ]" : "[ SHOW CORE ]"}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-brand-muted transition-transform ${isExpanded ? "rotate-90 text-cyber-violet" : ""}`} />
                    </div>
                  </GlassCard>

                  {/* Expand details pane popup */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="absolute left-0 right-0 top-[280px] z-20 p-4 rounded-xl glass-panel border border-cyber-violet/30 font-mono text-[9px] text-brand-muted space-y-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                      >
                        <div>
                          <span className="text-white block font-bold">SHA-256 SIGNATURE:</span>
                          <span className="text-cyber-cyan block truncate">0xbfd7890b240cfc610931df68153c399b{cert.id}</span>
                        </div>
                        <div>
                          <span className="text-white block font-bold">SYSTEM METRIC TEST:</span>
                          <span className="text-brand-muted block">99.98% Integrity Checked OK</span>
                        </div>
                        <a 
                          href={cert.credentialUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-block mt-2 text-cyber-violet font-bold hover:underline"
                        >
                          [ ACCESS VERIFICATION SUITE ]
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          
          <div className="h-20" /> {/* Extra spacing under the grid for expansion safety */}
        </div>
      </section>

      {/* SYSTEMS ARCHIVE / RESUME SECTION */}
      <section id="resume" className="px-6 sm:px-12 lg:px-24 py-32 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-bold">{"// TIME STAMP CONSOLE"}</span>
                <h2 className="text-5xl sm:text-6xl font-bebas tracking-wide text-white">HISTORICAL SPEC ARCHIVE</h2>
              </div>
              
              <div className="space-y-4 font-sans text-brand-muted text-sm leading-relaxed">
                <p>
                  Operative log files tracking work positions, specialized core libraries, and academic qualifications shipped since project inception.
                </p>
                
                <div className="flex flex-col gap-2.5 font-mono text-[10px] pt-4">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-brand-muted">INTEGRITY CHECK</span>
                    <span className="text-cyber-green font-bold">100% SECURED</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-brand-muted">ARCHIVE REVISION</span>
                    <span>{portfolioData.resume.lastUpdated.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">MD5 HASH</span>
                    <span className="text-cyber-violet">MD5_GOP_SIGN_2026</span>
                  </div>
                </div>
              </div>

              {/* Progress bar and Download Button */}
              <div className="pt-6 font-mono">
                {compilingResume ? (
                  <div className="space-y-2 max-w-xs">
                    <div className="flex justify-between text-[10px] text-cyber-cyan">
                      <span>COMPILING RESUME PACKETS...</span>
                      <span>{compileProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-violet transition-all duration-100" 
                        style={{ width: `${compileProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={startResumeCompile}
                    className="cursor-pointer bg-gradient-to-r from-cyber-pink to-cyber-violet hover:opacity-95 text-white font-mono text-xs font-bold px-6 py-3.5 rounded-full flex items-center gap-2 shadow-[0_4px_20px_rgba(236,72,153,0.2)]"
                  >
                    <Download className="w-4 h-4 animate-bounce" />
                    Download System Resume (PDF)
                  </button>
                )}
              </div>
            </div>

            {/* Right side chronological spec explorer */}
            <div className="lg:col-span-7 space-y-6">
              {/* Tab Selector */}
              <div className="flex gap-2 font-mono text-[10px]">
                <button
                  onClick={() => setNavTime("exp")}
                  className={`px-4 py-1.5 rounded border transition-all ${
                    navTime === "exp" ? "bg-cyber-cyan/10 border-cyber-cyan text-white font-bold" : "border-white/5 text-brand-muted hover:text-white"
                  }`}
                >
                  [ EXPERIENCE_LOGS ]
                </button>
                <button
                  onClick={() => setNavTime("edu")}
                  className={`px-4 py-1.5 rounded border transition-all ${
                    navTime === "edu" ? "bg-cyber-cyan/10 border-cyber-cyan text-white font-bold" : "border-white/5 text-brand-muted hover:text-white"
                  }`}
                >
                  [ EDUCATION_LOGS ]
                </button>
              </div>

              <div className="space-y-4">
                {navTime === "exp" ? (
                  // Experience log mapping
                  <div className="space-y-4 font-mono text-xs">
                    {[
                      {
                        title: "Founder & Lead Architect",
                        company: "ZARO Brand & Ship Engine",
                        date: "2025 - Present",
                        desc: "Standardizing low-latency web platforms with sub-second LCP. Integrating real-time vector queries for user search panels."
                      },
                      {
                        title: "Lead Data Science Engineer",
                        company: "NeuralStream IoT Systems",
                        date: "2024 - 2025",
                        desc: "Programmed high-throughput telemetry streams using Kafka and ClickHouse, detecting anomaly parameters in under 12ms."
                      },
                      {
                        title: "System Architect",
                        company: "DeepSearch Vector Engine",
                        date: "2023 - 2024",
                        desc: "Constructed Go gRPC endpoints mapping cosine similarity metrics over embedding indices of 10M+ articles."
                      }
                    ].map((exp, i) => (
                      <GlassCard key={i} className="p-4 space-y-2" glowColor="cyan">
                        <div className="flex justify-between items-center text-white border-b border-white/5 pb-2 mb-2 font-bold text-[10px]">
                          <span>{exp.company}</span>
                          <span className="flex items-center gap-1 text-cyber-cyan">
                            <Calendar className="w-3 h-3" /> {exp.date}
                          </span>
                        </div>
                        <h4 className="text-white font-syne font-extrabold text-xs tracking-wide">{exp.title.toUpperCase()}</h4>
                        <p className="text-brand-muted font-sans text-[11px] leading-relaxed">{exp.desc}</p>
                      </GlassCard>
                    ))}
                  </div>
                ) : (
                  // Education log mapping
                  <div className="space-y-4 font-mono text-xs">
                    {[
                      {
                        degree: "M.S. in Data Science & Systems",
                        school: "State University of Technology",
                        date: "2021 - 2023",
                        grade: "GPA: 3.96/4.0",
                        focus: "Distributed Consensus, Deep Transformer Weights, Embedded IoT Arrays."
                      },
                      {
                        degree: "B.S. in Computer Science Engineering",
                        school: "Tech Institute of Engineering",
                        date: "2017 - 2021",
                        grade: "GPA: 3.88/4.0",
                        focus: "Parallel Computing Models, Relational Schema Normalizations, REST Protocols."
                      }
                    ].map((edu, i) => (
                      <GlassCard key={i} className="p-4 space-y-2" glowColor="violet">
                        <div className="flex justify-between items-center text-white border-b border-white/5 pb-2 mb-2 font-bold text-[10px]">
                          <span>{edu.school}</span>
                          <span className="flex items-center gap-1 text-cyber-violet">
                            <Calendar className="w-3 h-3" /> {edu.date}
                          </span>
                        </div>
                        <h4 className="text-white font-syne font-extrabold text-xs tracking-wide">{edu.degree.toUpperCase()}</h4>
                        <div className="text-[10px] text-cyber-cyan">TARGET GAUGES: {edu.grade}</div>
                        <p className="text-brand-muted font-sans text-[11px] leading-relaxed mt-1">Focus Areas: {edu.focus}</p>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER / SECURE PACKET FORM */}
      <footer id="contact" className="px-6 sm:px-12 lg:px-24 py-32 bg-black border-t border-white/5 relative z-10 text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full space-y-12 relative z-10">
          
          <div className="space-y-2">
            <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-bold">
              {"// INITIATE COMMUNICATIONS PROTOCOL //"}
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bebas tracking-wider text-white uppercase select-none">
              SECURE PACKET TRANSMISSION
            </h2>
            <p className="max-w-md mx-auto text-brand-muted text-xs sm:text-sm font-sans leading-relaxed">
              Have an enterprise node requirement? Encrypt and transmit a communication packet to the Gopiprakan console.
            </p>
          </div>

          {/* Secure transmit form layout */}
          <div className="max-w-md mx-auto text-left">
            <GlassCard className="p-6 space-y-4" glowColor="violet">
              <form onSubmit={handleTransmit} className="space-y-4 font-mono text-xs">
                
                <div>
                  <label className="text-brand-muted block mb-1.5 uppercase text-[9px] font-bold">Classification Socket</label>
                  <select 
                    value={packetClassification}
                    onChange={(e) => setPacketClassification(e.target.value)}
                    className="w-full bg-[#020204] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-cyber-violet transition-colors"
                  >
                    <option value="AI Integration">AI Core Integration</option>
                    <option value="Distributed Pipeline">Distributed Pipeline Build</option>
                    <option value="Next.js SLA Web">Next.js SLA UI Deployment</option>
                    <option value="Consulting Core">Consulting Core Query</option>
                  </select>
                </div>

                <div>
                  <label className="text-brand-muted block mb-1.5 uppercase text-[9px] font-bold">Return Socket (Email)</label>
                  <input 
                    type="email" 
                    required
                    value={transmissionForm.returnSocket}
                    onChange={(e) => setTransmissionForm({ ...transmissionForm, returnSocket: e.target.value })}
                    placeholder="operator@domain.com"
                    className="w-full bg-[#020204] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-cyber-violet placeholder-brand-muted/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-brand-muted block mb-1.5 uppercase text-[9px] font-bold">Message Payload</label>
                  <textarea 
                    rows={3}
                    required
                    value={transmissionForm.payload}
                    onChange={(e) => setTransmissionForm({ ...transmissionForm, payload: e.target.value })}
                    placeholder="Enter technical parameters or general query..."
                    className="w-full bg-[#020204] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-cyber-violet placeholder-brand-muted/30 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={transmitting}
                  className="w-full py-2.5 rounded bg-cyber-violet/20 border border-cyber-violet text-white hover:bg-cyber-violet hover:text-black font-bold uppercase text-[10px] tracking-wider transition-all flex items-center justify-center gap-1.5 disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                  {transmitting ? "TRANSMITTING..." : "TRANSMIT SECURE PACKET"}
                </button>
              </form>

              {/* Transmission log readout */}
              {transmissionLog.length > 0 && (
                <div className="mt-4 border-t border-white/5 pt-4 font-mono text-[9px] text-brand-muted space-y-1 bg-black/40 p-2.5 rounded border border-white/5 max-h-24 overflow-y-auto hide-scrollbar">
                  {transmissionLog.map((log, i) => (
                    <div key={i} className={log.includes("OK") ? "text-cyber-green font-bold" : "text-brand-muted"}>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>

          {/* Social socket logs */}
          <div className="flex justify-center items-center gap-6 pt-6">
            {/* Mail: HSL Red */}
            <a 
              href="mailto:gopiprakan@example.com"
              className="p-4 rounded-full text-white bg-cyber-pink/10 border border-cyber-pink/30 hover:bg-cyber-pink hover:text-black hover:border-cyber-pink transition-all duration-300 shadow-md flex items-center justify-center"
              aria-label="Secure email channel"
            >
              <Mail className="w-5 h-5" />
            </a>
            
            {/* Github: HSL Cyan */}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-full text-white bg-cyber-cyan/10 border border-cyber-cyan/30 hover:bg-cyber-cyan hover:text-black hover:border-cyber-cyan transition-all duration-300 shadow-md flex items-center justify-center"
              aria-label="Inspect Github code bases"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            {/* LinkedIn: HSL Violet */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-full text-white bg-cyber-violet/10 border border-cyber-violet/30 hover:bg-cyber-violet hover:text-black hover:border-cyber-violet transition-all duration-300 shadow-md flex items-center justify-center"
              aria-label="Inspect LinkedIn connection socket"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="text-[10px] text-brand-muted font-mono tracking-widest pt-16 select-none opacity-40 uppercase">
            © 2026 GOPIPRAKAN. ALL RIGHTS RESERVED. OPERATED UNDER SYSTEM-STANDARDS.
          </div>
        </div>
      </footer>
    </main>
  );
}
