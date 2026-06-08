"use client";

export function Badge({ children, color = "#22d3ee" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="rounded-full px-2 py-0.5 text-xs font-semibold"
      style={{ background: color + "20", color }}
    >
      {children}
    </span>
  );
}
