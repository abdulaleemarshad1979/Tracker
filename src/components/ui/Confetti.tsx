"use client";
import { useEffect, useState } from "react";

const COLORS = ["#22d3ee","#818cf8","#34d399","#facc15","#f87171","#a78bfa","#f97316"];

interface Particle {
  id: number;
  left: string;
  color: string;
  delay: number;
  duration: number;
  size: number;
  isCircle: boolean;
}

export function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;
    const p: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 0.8,
      duration: 1.5 + Math.random() * 2,
      size: 6 + Math.random() * 8,
      isCircle: Math.random() > 0.5,
    }));
    setParticles(p);
    const timer = setTimeout(() => setParticles([]), 4000);
    return () => clearTimeout(timer);
  }, [active]);

  if (!particles.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: p.isCircle ? "50%" : 2,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
