"use client";
import { motion } from "framer-motion";
import { Card, StatCard } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Checkbox } from "@/components/ui/Checkbox";
import { Badge } from "@/components/ui/Badge";
import { getRank, getNextRank, DAILY_TASKS, ROADMAP } from "@/lib/data";
import { useStore, getTodayKey } from "@/lib/store";
import toast from "react-hot-toast";

export default function HomeTab() {
  const { state, toggleDaily, toggleRoadmap, calcStreak } = useStore();

  const todayKey = getTodayKey();
  const completedToday = DAILY_TASKS.filter(t => state.daily[`${todayKey}.${t.id}`]).length;
  const todayPct = Math.round((completedToday / DAILY_TASKS.length) * 100);

  const allRoadmapItems = ROADMAP.flatMap(cat =>
    cat.sections.flatMap((sec, si) => sec.items.map((_, ii) => `${cat.id}.${si}.${ii}`))
  );
  const completedRoadmap = allRoadmapItems.filter(k => state.roadmap[k]).length;
  const totalRoadmap = allRoadmapItems.length;
  const overallPct = Math.round((completedRoadmap / totalRoadmap) * 100);

  const streak = calcStreak();
  const rank = getRank(state.xp);
  const nextRank = getNextRank(state.xp);
  const rankPct = nextRank
    ? Math.min(100, Math.round(((state.xp - rank.min) / (nextRank.min - rank.min)) * 100))
    : 100;

  const handleDaily = (id: string, xp: number, label: string) => {
    const checked = toggleDaily(id, xp);
    if (checked) toast.success(`+${xp} XP — ${label}`);
  };

  return (
    <div>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1
          className="text-4xl font-extrabold mb-1"
          style={{
            background: "linear-gradient(90deg,#22d3ee,#818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CyberQuest
        </h1>
        <p className="text-sm" style={{ color: "#64748b" }}>
          Level up your cybersecurity journey one day at a time.
        </p>
      </motion.div>

      {/* Rank banner */}
      <Card
        style={{
          background: "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)",
          border: "1px solid rgba(34,211,238,0.25)",
        }}
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#64748b" }}>
              Current Rank
            </div>
            <div className="text-2xl font-extrabold" style={{ color: "#22d3ee" }}>
              {rank.icon} {rank.label}
            </div>
            {nextRank && (
              <div className="text-xs mt-1" style={{ color: "#64748b" }}>
                {(nextRank.min - state.xp).toLocaleString()} XP to {nextRank.icon} {nextRank.label}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#64748b" }}>
              Total XP
            </div>
            <div className="text-3xl font-extrabold" style={{ color: "#22d3ee" }}>
              {state.xp.toLocaleString()}
            </div>
          </div>
        </div>
        {nextRank && (
          <div className="mt-4">
            <ProgressBar value={rankPct} />
            <div className="text-right text-xs mt-1" style={{ color: "#64748b" }}>
              {rankPct}% to next rank
            </div>
          </div>
        )}
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 sm:grid-cols-4">
        <StatCard label="🔥 Streak" value={`${streak} days`} color="#f97316" />
        <StatCard label="📚 Roadmap" value={`${overallPct}%`} color="#818cf8" />
        <StatCard label="✅ Topics" value={`${completedRoadmap}/${totalRoadmap}`} color="#34d399" />
        <StatCard label="Today" value={`${todayPct}%`} color="#22d3ee" />
      </div>

      {/* Today's tasks */}
      <Card>
        <div className="text-base font-bold mb-4" style={{ color: "#f1f5f9" }}>
          📋 Today&apos;s Tasks
        </div>
        {DAILY_TASKS.map((t, i) => {
          const checked = !!state.daily[`${todayKey}.${t.id}`];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 py-2 cursor-pointer"
              style={{ borderBottom: "1px solid #1e293b" }}
              onClick={() => handleDaily(t.id, t.xp, t.label)}
            >
              <Checkbox checked={checked} />
              <span
                className="flex-1 text-sm"
                style={{
                  color: checked ? "#64748b" : "#e2e8f0",
                  textDecoration: checked ? "line-through" : "none",
                }}
              >
                {t.label}
              </span>
              <Badge color="#22d3ee">+{t.xp} XP</Badge>
            </motion.div>
          );
        })}
        <div className="mt-4">
          <ProgressBar value={todayPct} color="#34d399" />
          <div className="text-xs mt-1" style={{ color: "#64748b" }}>
            {completedToday}/{DAILY_TASKS.length} tasks done today
          </div>
        </div>
      </Card>
    </div>
  );
}
