"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className = "", accent, style }: CardProps) {
  return (
    <div
      className={`rounded-xl p-5 mb-4 ${className}`}
      style={{
        background: "#1e293b",
        border: `1px solid ${accent ? accent + "40" : "#334155"}`,
        borderLeft: accent ? `3px solid ${accent}` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function StatCard({ label, value, color = "#22d3ee", sub }: {
  label: string; value: string | number; color?: string; sub?: string;
}) {
  return (
    <div className="rounded-xl p-4" style={{ background: "#0f172a", border: "1px solid #1e293b" }}>
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#64748b" }}>
        {label}
      </div>
      <div className="text-2xl font-extrabold" style={{ color }}>
        {value}
      </div>
      {sub && <div className="text-xs mt-1" style={{ color: "#64748b" }}>{sub}</div>}
    </div>
  );
}
