"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Checkbox } from "@/components/ui/Checkbox";
import { Badge } from "@/components/ui/Badge";
import { DAILY_TASKS, DAYS } from "@/lib/data";
import { useStore, getTodayKey, getWeekKey } from "@/lib/store";
import toast from "react-hot-toast";

export default function TrackerTab() {
  const { state, toggleDaily, toggleWeekDay } = useStore();

  const todayKey = getTodayKey();
  const weekKey = getWeekKey();

  const completedToday = DAILY_TASKS.filter(t => state.daily[`${todayKey}.${t.id}`]).length;
  const todayPct = Math.round((completedToday / DAILY_TASKS.length) * 100);
  const completedDays = DAYS.filter(d => state.weekly[`${weekKey}.${d}`]).length;

  const weekScore =
    completedDays >= 6 ? { label: "Excellent 🟢", color: "#34d399" } :
    completedDays >= 4 ? { label: "Good 🟡",      color: "#facc15" } :
                         { label: "Needs improvement 🔴", color: "#f87171" };

  const handleDaily = (id: string, xp: number, label: string) => {
    const checked = toggleDaily(id, xp);
    if (checked) toast.success(`+${xp} XP — ${label}`);
  };

  const handleWeek = (day: string) => {
    const { checked, weekComplete } = toggleWeekDay(day, DAYS);
    if (checked) {
      toast.success(weekComplete ? "🎉 Full week! +250 XP total!" : `+50 XP — ${day} marked!`);
    }
  };

  return (
    <div>
      {/* Daily */}
      <Card>
        <div className="text-base font-bold mb-1" style={{ color: "#f1f5f9" }}>
          📅 Daily Habit Tracker
        </div>
        <div className="text-xs mb-4" style={{ color: "#64748b" }}>
          {todayKey}
        </div>
        {DAILY_TASKS.map((t, i) => {
          const checked = !!state.daily[`${todayKey}.${t.id}`];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 py-3 cursor-pointer"
              style={{ borderBottom: "1px solid #1e293b" }}
              onClick={() => handleDaily(t.id, t.xp, t.label)}
            >
              <Checkbox checked={checked} />
              <span
                className="flex-1"
                style={{ color: checked ? "#64748b" : "#e2e8f0", textDecoration: checked ? "line-through" : "none" }}
              >
                {t.label}
              </span>
              <Badge color="#22d3ee">+{t.xp} XP</Badge>
            </motion.div>
          );
        })}
        <div className="mt-4">
          <ProgressBar value={todayPct} color="#34d399" />
          <div className="text-xs mt-1" style={{ color: "#64748b" }}>{todayPct}% complete today</div>
        </div>
      </Card>

      {/* Weekly */}
      <Card>
        <div className="text-base font-bold mb-1" style={{ color: "#f1f5f9" }}>🗓️ Weekly Tracker</div>
        <div className="text-xs mb-4" style={{ color: "#64748b" }}>Tap a day to mark it as studied (+50 XP)</div>
        {DAYS.map((day, i) => {
          const checked = !!state.weekly[`${weekKey}.${day}`];
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 py-3 cursor-pointer"
              style={{ borderBottom: "1px solid #1e293b" }}
              onClick={() => handleWeek(day)}
            >
              <Checkbox checked={checked} color="#34d399" />
              <span className="flex-1 font-semibold" style={{ color: checked ? "#34d399" : "#e2e8f0" }}>
                {day}
              </span>
              {checked ? <Badge color="#34d399">Done ✓</Badge> : <Badge color="#64748b">Pending</Badge>}
            </motion.div>
          );
        })}
        <div
          className="mt-4 p-3 rounded-lg flex justify-between items-center"
          style={{ background: "#0f172a" }}
        >
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#64748b" }}>
            Weekly Score
          </span>
          <span className="font-bold" style={{ color: weekScore.color }}>
            {completedDays}/7 — {weekScore.label}
          </span>
        </div>
      </Card>
    </div>
  );
}
