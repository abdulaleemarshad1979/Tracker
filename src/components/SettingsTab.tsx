"use client";
import { useRef } from "react";
import { Download, Upload, Trash2, Terminal, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { XP_GUIDE } from "@/lib/data";
import { useStore } from "@/lib/store";
import toast from "react-hot-toast";

export default function SettingsTab() {
  const { state, exportData, importData, resetAll } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportData();
    toast.success("Progress exported as JSON!");
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importData(file);
      toast.success("Progress imported successfully!");
    } catch {
      toast.error("Invalid backup file.");
    }
    e.target.value = "";
  };

  const handleReset = () => {
    if (window.confirm("⚠️ Reset ALL progress? This cannot be undone!")) {
      resetAll();
      toast.error("All progress reset.");
    }
  };

  const btnBase =
    "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm cursor-pointer transition-all";

  return (
    <div>
      {/* Actions */}
      <Card>
        <div className="text-base font-bold mb-4" style={{ color: "#f1f5f9" }}>⚙️ Data Management</div>
        <div className="flex flex-col gap-3">
          <button
            className={btnBase}
            style={{ background: "#22d3ee", color: "#0f172a", border: "none" }}
            onClick={handleExport}
          >
            <Download size={16} /> Export Progress (JSON)
          </button>

          <button
            className={btnBase}
            style={{ background: "#1e293b", color: "#94a3b8", border: "1px solid #334155" }}
            onClick={() => fileRef.current?.click()}
          >
            <Upload size={16} /> Import Progress
          </button>
          <input type="file" accept=".json" ref={fileRef} className="hidden" onChange={handleImport} />

          <button
            className={btnBase}
            style={{ background: "#1e293b", color: "#f87171", border: "1px solid rgba(248,113,113,0.25)" }}
            onClick={handleReset}
          >
            <Trash2 size={16} /> Reset Everything
          </button>
        </div>
      </Card>

      {/* Current stats snapshot */}
      <Card>
        <div className="text-base font-bold mb-3" style={{ color: "#f1f5f9" }}>📦 Your Data Snapshot</div>
        <div className="flex flex-col gap-2">
          {[
            ["Total XP",         `${state.xp.toLocaleString()} XP`],
            ["Roadmap items",    `${Object.values(state.roadmap).filter(Boolean).length} checked`],
            ["Days studied",     `${Object.values(state.calendar).filter(Boolean).length} days`],
            ["Daily task logs",  `${Object.keys(state.daily).length} entries`],
          ].map(([label, val]) => (
            <div
              key={label}
              className="flex justify-between py-2"
              style={{ borderBottom: "1px solid #1e293b" }}
            >
              <span className="text-sm" style={{ color: "#94a3b8" }}>{label}</span>
              <span className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>{val}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* XP Guide */}
      <Card>
        <div className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: "#f1f5f9" }}>
          <Zap size={18} color="#facc15" /> XP Rewards Guide
        </div>
        {XP_GUIDE.map(({ task, xp }) => (
          <div
            key={task}
            className="flex justify-between py-2"
            style={{ borderBottom: "1px solid #1e293b" }}
          >
            <span className="text-sm" style={{ color: "#94a3b8" }}>{task}</span>
            <Badge color="#22d3ee">{xp}</Badge>
          </div>
        ))}
      </Card>

      {/* Deploy guide */}
      <Card style={{ border: "1px solid rgba(34,211,238,0.15)" }}>
        <div className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: "#f1f5f9" }}>
          <Terminal size={16} color="#22d3ee" /> Deploy to Vercel
        </div>
        <div className="text-sm mb-4" style={{ color: "#94a3b8", lineHeight: 1.7 }}>
          All your progress is saved in your browser&apos;s localStorage — no server needed. Free forever.
        </div>
        {[
          "git init && git add . && git commit -m 'init'",
          "npm install",
          "npm run build",
          "npx vercel",
        ].map((cmd, i) => (
          <div
            key={i}
            className="flex items-center gap-2 mb-2 p-2 rounded-lg"
            style={{ background: "#0f172a" }}
          >
            <span className="text-xs font-bold" style={{ color: "#64748b" }}>{i + 1}.</span>
            <code className="text-xs" style={{ color: "#22d3ee", fontFamily: "var(--font-mono)" }}>
              {cmd}
            </code>
          </div>
        ))}
      </Card>
    </div>
  );
}
