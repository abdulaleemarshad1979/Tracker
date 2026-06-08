"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Checkbox } from "@/components/ui/Checkbox";
import { Badge } from "@/components/ui/Badge";
import { ROADMAP } from "@/lib/data";
import { useStore } from "@/lib/store";
import toast from "react-hot-toast";

export default function RoadmapTab() {
  const { state, toggleRoadmap } = useStore();
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(ROADMAP.map(c => [c.id, true]))
  );

  const handleToggle = (key: string, color: string) => {
    const checked = toggleRoadmap(key);
    if (checked) toast.success(`+20 XP — Topic completed!`);
  };

  return (
    <div>
      <p className="text-sm mb-4" style={{ color: "#64748b" }}>
        Tap any topic to mark as complete. Each topic earns +20 XP.
      </p>

      {ROADMAP.map(cat => {
        const allItems = cat.sections.flatMap((sec, si) =>
          sec.items.map((_, ii) => `${cat.id}.${si}.${ii}`)
        );
        const done = allItems.filter(k => state.roadmap[k]).length;
        const pct = Math.round((done / allItems.length) * 100);
        const isOpen = open[cat.id];

        return (
          <Card key={cat.id} accent={cat.color}>
            {/* Header */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setOpen(prev => ({ ...prev, [cat.id]: !prev[cat.id] }))}
            >
              <span className="text-2xl">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold" style={{ color: "#f1f5f9" }}>{cat.title}</div>
                <ProgressBar value={pct} color={cat.color} height={6} className="mt-1.5" />
                <div className="text-xs mt-1" style={{ color: "#64748b" }}>
                  {done}/{allItems.length} — {pct}%
                </div>
              </div>
              <div style={{ color: "#64748b" }}>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>

            {/* Items */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  {cat.sections.map((sec, si) => (
                    <div key={si} className="mt-3">
                      <div
                        className="text-xs font-bold tracking-widest uppercase mb-2"
                        style={{ color: "#94a3b8" }}
                      >
                        {sec.title}
                      </div>
                      {sec.items.map((item, ii) => {
                        const k = `${cat.id}.${si}.${ii}`;
                        const checked = !!state.roadmap[k];
                        return (
                          <div
                            key={ii}
                            className="flex items-center gap-3 py-2 pl-2 cursor-pointer"
                            style={{ borderBottom: "1px solid #1e293b" }}
                            onClick={() => handleToggle(k, cat.color)}
                          >
                            <Checkbox checked={checked} color={cat.color} size={20} />
                            <span
                              className="flex-1 text-sm"
                              style={{
                                color: checked ? "#64748b" : "#e2e8f0",
                                textDecoration: checked ? "line-through" : "none",
                              }}
                            >
                              {item}
                            </span>
                            {!checked && (
                              <Badge color={cat.color}>+20 XP</Badge>
                            )}
                            {checked && (
                              <span className="text-xs" style={{ color: "#34d399" }}>✓</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        );
      })}
    </div>
  );
}
