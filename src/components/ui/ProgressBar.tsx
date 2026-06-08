"use client";

interface ProgressBarProps {
  value: number;        // 0-100
  color?: string;
  height?: number;
  className?: string;
}

export function ProgressBar({ value, color = "#22d3ee", height = 8, className }: ProgressBarProps) {
  return (
    <div
      className={className}
      style={{
        height,
        background: "#334155",
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <div
        className="progress-fill"
        style={{
          height: "100%",
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: color,
          borderRadius: 999,
        }}
      />
    </div>
  );
}
