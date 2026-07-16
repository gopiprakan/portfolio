"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillData {
  name: string;
  category: "ai" | "systems" | "apps";
  spec: string;
  load: string;
  metric: string;
}

const skillMetadata: Record<string, Omit<SkillData, "name">> = {
  "AI & Machine Learning": { category: "ai", spec: "Transformers/CNNs", load: "96%", metric: "Accuracy: 99.2%" },
  "Deep Learning Pipelines": { category: "ai", spec: "PyTorch/TensorFlow", load: "94%", metric: "Tput: 1.2M/hr" },
  "Vector Databases": { category: "ai", spec: "Qdrant/Milvus", load: "98%", metric: "Recall: 0.991" },
  "Data Engineering": { category: "ai", spec: "Kafka/ClickHouse", load: "92%", metric: "Volume: Petabyte" },
  
  "Distributed Systems": { category: "systems", spec: "Go/gRPC/Docker", load: "95%", metric: "Consensus: Raft" },
  "Cloud Architecture": { category: "systems", spec: "AWS/GCP/Terraform", load: "93%", metric: "Uptime: 99.99%" },
  "API Architecture": { category: "systems", spec: "REST/GraphQL", load: "97%", metric: "Latency: <10ms" },
  
  "Full-Stack Web Apps": { category: "apps", spec: "Next.js/Postgres", load: "99%", metric: "LCP: 0.4s" },
  "Next.js & React": { category: "apps", spec: "TypeScript/Tailwind", load: "98%", metric: "SSR: Hydrated" },
  "Freelance Delivery": { category: "apps", spec: "ZARO Engine Standard", load: "100%", metric: "Shipped: 18 Nodes" }
};

interface SkillNodeProps {
  name: string;
  index: number;
  data: Omit<SkillData, "name">;
}

function SkillNode({ name, index, data }: SkillNodeProps) {
  const pulseDelay = `${(index * 0.35).toFixed(2)}s`;
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-panel rounded-xl p-4 flex flex-col justify-between h-[135px] border border-white/5 hover:border-cyber-violet/30 hover:bg-white/[0.02] transition-all duration-300 select-none cursor-pointer"
    >
      {/* Top Sweep Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <span className="font-mono text-[9px] text-brand-muted tracking-wider group-hover:text-cyber-cyan transition-colors">
          NODE_{formattedIndex} // {data.category.toUpperCase()}
        </span>
        <span className="relative flex h-2 w-2">
          <span 
            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-violet/70 opacity-75"
            style={{ animationDelay: pulseDelay }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-violet" />
        </span>
      </div>

      {/* Main Skill Title */}
      <div className="mt-2">
        <h4 className="font-syne font-bold text-sm sm:text-base text-brand-text group-hover:text-white transition-colors duration-200">
          {name}
        </h4>
        <p className="font-mono text-[10px] text-brand-muted/70 mt-0.5 group-hover:text-brand-muted transition-colors">
          {data.spec}
        </p>
      </div>

      {/* Details Footer */}
      <div className="mt-auto pt-2 border-t border-white/[0.04] flex flex-col gap-1.5">
        <div className="flex justify-between font-mono text-[9px]">
          <span className="text-brand-muted">{data.metric}</span>
          <span className="text-cyber-cyan font-bold">{data.load}</span>
        </div>
        <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: data.load }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-gradient-to-r from-cyber-violet to-cyber-cyan"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function InteractiveSkills({ skills }: { skills: string[] }) {
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "systems" | "apps">("all");

  const skillList = skills.map(skill => {
    const meta = skillMetadata[skill] || { category: "apps" as const, spec: "Internal System", load: "90%", metric: "Ready" };
    return { name: skill, ...meta };
  });

  const filteredSkills = skillList.filter(skill => {
    if (activeFilter === "all") return true;
    return skill.category === activeFilter;
  });

  return (
    <div className="space-y-6 w-full">
      {/* Category Selection console */}
      <div className="flex flex-wrap gap-2.5 font-mono text-[10px] border-b border-white/5 pb-4">
        {[
          { key: "all", label: "ALL_NODES" },
          { key: "ai", label: "INTELLIGENCE_CORES" },
          { key: "systems", label: "DISTRIBUTED_SYSTEMS" },
          { key: "apps", label: "APPLICATION_INTERFACE" },
        ].map((tab) => {
          const isActive = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`relative px-4 py-1.5 rounded-full border transition-all duration-300 ${
                isActive
                  ? "border-cyber-violet bg-cyber-violet/10 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                  : "border-white/10 hover:border-white/30 text-brand-muted hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <SkillNode 
              key={skill.name} 
              name={skill.name} 
              index={index} 
              data={skill}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
