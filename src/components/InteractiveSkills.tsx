"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkillNodeProps {
  name: string;
  index: number;
}

function SkillNode({ name, index }: SkillNodeProps) {
  // Generate random pulse delay for the signal light
  const pulseDelay = `${(index * 0.4).toFixed(1)}s`;
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="group relative glass-panel rounded-xl p-4 flex flex-col justify-between h-28 overflow-hidden hover:border-white/35 hover:bg-white/[0.03] transition-all duration-300 select-none cursor-pointer"
    >
      {/* Laser line overlay sweep on hover */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
      
      <div className="flex justify-between items-start">
        <span className="font-mono text-[10px] text-brand-muted tracking-wider group-hover:text-white transition-colors">
          SYS_NODE_{formattedIndex}
        </span>
        <span className="relative flex h-2 w-2">
          <span 
            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75"
            style={{ animationDelay: pulseDelay }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
      </div>

      <div className="mt-4">
        <h4 className="font-syne font-semibold text-sm sm:text-base text-brand-text group-hover:text-white transition-colors duration-300">
          {name}
        </h4>
      </div>

      {/* Decorative tiny status bars */}
      <div className="mt-2 flex gap-1 items-center">
        <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/80 transition-all duration-500 w-0 group-hover:w-full"
            style={{ transitionDelay: "100ms" }}
          />
        </div>
        <span className="font-mono text-[8px] text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity">
          ACTIVE
        </span>
      </div>
    </motion.div>
  );
}

export default function InteractiveSkills({ skills }: { skills: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {skills.map((skill, index) => (
        <SkillNode key={skill} name={skill} index={index} />
      ))}
    </div>
  );
}
