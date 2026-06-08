"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, StatCard } from "@/components/ui/Card";
import { useStore, dateToKey } from "@/lib/store";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export default function CalendarTab() {
  const { state, toggleCalendar, calcStreak } = useStore();
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear]   = useState(today.getFullYear());

  const firstDay     = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate();
  const monthName    = new Date(viewYear, viewMonth).toLocaleString("default", { month: "long" });
  const startOffset  = (firstDay + 6) % 7; // Monday-based

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const streak   = calcStreak();
  const totalDays = Object.values(state.calendar).filter(Boolean).length;

  return (
    <div>
      <Card>
        {/* Month nav */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg transition-colors hover:bg-opacity-80"
            style={{ background: "#0f172a", color: "#94a3b8", border: "1px solid #334155" }}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-bold text-lg" style={{ color: "#f1f5f9" }}>
            {monthName} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg transition-colors hover:bg-opacity-80"
            style={{ background: "#0f172a", color: "#94a3b8", border: "1px solid #334155" }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-xs font-bold" style={{ color: "#64748b" }}>
              {d}
            </div>
          ))}
        </div>

        {/* Calendar cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const key = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
            const studied  = !!state.calendar[key];
            const isToday  = d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.85 }}
                onClick={() => toggleCalendar(key)}
                className="aspect-square flex items-center justify-center text-sm rounded-full transition-all cursor-pointer"
                style={{
                  background: studied ? "#22d3ee" : isToday ? "#1e293b" : "transparent",
                  color: studied ? "#0f172a" : isToday ? "#22d3ee" : "#94a3b8",
                  fontWeight: isToday ? 800 : studied ? 700 : 400,
                  border: isToday && !studied ? "2px solid #22d3ee" : "none",
                }}
              >
                {d}
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-5 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: "#22d3ee" }} />
            <span className="text-xs" style={{ color: "#64748b" }}>Studied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: "#22d3ee" }} />
            <span className="text-xs" style={{ color: "#64748b" }}>Today</span>
          </div>
        </div>
      </Card>

      {/* Streak stats */}
      <Card>
        <div className="text-base font-bold mb-3" style={{ color: "#f1f5f9" }}>🔥 Streak Stats</div>
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Current Streak" value={`${streak} days`} color="#f97316" />
          <StatCard label="Total Days" value={totalDays} color="#34d399" />
        </div>
        <p className="text-xs mt-4 text-center" style={{ color: "#64748b" }}>
          Tap any date to manually toggle it as a study day.
        </p>
      </Card>
    </div>
  );
}
