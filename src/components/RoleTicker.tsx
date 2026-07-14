"use client";

import React, { useEffect, useState } from "react";

const roles = [
  "AI & Data Science Engineer",
  "Full-Stack Developer",
  "Founder, ZARO",
];

export default function RoleTicker() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing text
        const nextText = fullText.substring(0, currentText.length + 1);
        setCurrentText(nextText);
        if (nextText === fullText) {
          // Finished typing, pause before deleting
          setSpeed(2500);
          setIsDeleting(true);
        } else {
          setSpeed(80 + Math.random() * 60);
        }
      } else {
        // Deleting text
        const nextText = fullText.substring(0, currentText.length - 1);
        setCurrentText(nextText);
        if (nextText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setSpeed(500); // Pause before starting next role
        } else {
          setSpeed(40);
        }
      }
    };

    const timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, speed]);

  return (
    <div className="font-mono text-sm sm:text-base md:text-lg text-brand-muted flex items-center h-8 tracking-wider">
      <span className="text-brand-text/90 font-medium">{currentText}</span>
      <span className="w-1.5 h-4 sm:w-2 sm:h-5 bg-brand-amber ml-1.5 animate-[pulse_0.8s_infinite] shadow-[0_0_8px_#FF8A00]" />
    </div>
  );
}
