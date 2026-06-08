"use client";
import { motion } from "framer-motion";
import { Card, StatCard } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { getRank, getNextRank, ROADMAP, RANKS } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function StatsTab() {
  const { state, calcStreak } = useStore();

  const allRoadmapItems = ROADMAP.flatMap(cat =>
    cat.sections.flatMap((sec, si) => sec.items.map((_, ii) => `${cat.id}.${si}.${ii}`))
  );
  const completedRoadmap = allRoadmapItems.filter(k => state.roadmap[k]).length;
  const totalRoadmap = allRoadmapItems.length;
  const overallPct = Math.round((completedRoadmap / totalRoadmap) * 100);

  const streak = calcStreak();
  const totalDays = Object.values(state.calendar).filter(Boolean).length;
  const rank = getRank(state.xp);
  const nextRank = getNextRank(state.xp);

  return (
    <div>
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 sm:grid-cols-3">
        <StatCard label="Total XP"     value={state.xp.toLocaleString()} color="#22d3ee" />
        <StatCard label="Current Rank" value={rank.label} sub={rank.icon} color="#818cf8" />
        <StatCard label="🔥 Streak"    value={`${streak} days`} color="#f97316" />
        <StatCard label="Days Studied" value={totalDays} color="#34d399" />
        <StatCard label="Topics Done"  value={completedRoadmap} color="#facc15" />
        <StatCard label="Roadmap %"    value={`${overallPct}%`} color="#22d3ee" />
      </div>

      {/* Per-module */}
      <Card>
        <div className="text-base font-bold mb-4" style={{ color: "#f1f5f9" }}>
          📊 Per-Module Progress
        </div>
        {ROADMAP.map((cat, i) => {
          const items = cat.sections.flatMap((sec, si) =>
            sec.items.map((_, ii) => `${cat.id}.${si}.${ii}`)
          );
          const done = items.filter(k => state.roadmap[k]).length;
          const pct = Math.round((done / items.length) * 100);
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="mb-4"
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm" style={{ color: "#94a3b8" }}>
                  {cat.icon} {cat.title}
                </span>
                <span className="text-sm font-bold" style={{ color: cat.color }}>{pct}%</span>
              </div>
              <ProgressBar value={pct} color={cat.color} />
              <div className="text-xs mt-1" style={{ color: "#64748b" }}>{done}/{items.length}</div>
            </motion.div>
          );
        })}
      </Card>

      {/* Rank ladder */}
      <Card>
        <div className="text-base font-bold mb-4" style={{ color: "#f1f5f9" }}>🏆 Rank Progression</div>
        {RANKS.map((r, i) => {
          const reached = state.xp >= r.min;
          return (
            <motion.div
              key={r.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: reached ? 1 : 0.35 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 py-2.5"
              style={{ borderBottom: "1px solid #1e293b" }}
            >
              <span className="text-xl">{r.icon}</span>
              <span
                className="flex-1 font-semibold text-sm"
                style={{ color: reached ? "#f1f5f9" : "#64748b" }}
              >
                {r.label}
              </span>
              <Badge color={reached ? "#22d3ee" : "#64748b"}>
                {r.min.toLocaleString()} XP
              </Badge>
              {reached && <span style={{ color: "#34d399", fontSize: "0.8rem" }}>✓</span>}
            </motion.div>
          );
        })}
      </Card>
    </div>
  );
}
