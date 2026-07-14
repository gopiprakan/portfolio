import React from "react";

interface CornerBracketsProps {
  children?: React.ReactNode;
  className?: string;
  show?: boolean;
}

export default function CornerBrackets({
  children,
  className = "",
  show = true,
}: CornerBracketsProps) {
  if (!show) return <>{children}</>;

  return (
    <div className={`relative group/bracket ${className}`}>
      {/* Corner Brackets */}
      <span className="bracket-corner bracket-tl group-hover/bracket:-translate-x-1 group-hover/bracket:-translate-y-1" />
      <span className="bracket-corner bracket-tr group-hover/bracket:translate-x-1 group-hover/bracket:-translate-y-1" />
      <span className="bracket-corner bracket-bl group-hover/bracket:-translate-x-1 group-hover/bracket:translate-y-1" />
      <span className="bracket-corner bracket-br group-hover/bracket:translate-x-1 group-hover/bracket:translate-y-1" />
      {children}
    </div>
  );
}
