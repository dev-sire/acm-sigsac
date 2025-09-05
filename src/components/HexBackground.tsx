// HexPatternBackground.tsx (interactive variant)
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  stroke?: string;
  opacity?: number;
  size?: number;
  interactive?: boolean;
  parallax?: number; // pixels of max shift
};

export default function HexPatternBackground({
  className,
  stroke = "currentColor",
  opacity = 0.12,
  size = 64,
  interactive = true,
  parallax = 16
}: Props) {
  const h = size * 0.866;
  const points = `${size/2},0 ${size},${h/2} ${size},${h} ${size/2},${h} 0,${h/2} 0,0`;

  const [pid, setPid] = useState("hex-pat");
  useEffect(() => setPid(`hex-pat-${Math.random().toString(36).slice(2, 8)}`), []);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * parallax;
      const y = (e.clientY / window.innerHeight - 0.5) * parallax;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [interactive, parallax]);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ backgroundColor: "rgb(var(--coastal-900))" /* if you use CSS vars; otherwise keep bg on parent */ }}
    >
      <svg
        className="w-full h-full text-coastal-100 transition-transform duration-300 ease-out pointer-events-none"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        aria-hidden="true"
      >
        <defs>
          <pattern id={pid} width={size} height={h} patternUnits="userSpaceOnUse">
            <polygon points={points} fill="none" stroke={stroke} strokeWidth="1" opacity={opacity} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
    </div>
  );
}
