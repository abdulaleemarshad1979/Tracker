"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar, { TabId } from "@/components/Navbar";
import HomeTab     from "@/components/HomeTab";
import TrackerTab  from "@/components/TrackerTab";
import RoadmapTab  from "@/components/RoadmapTab";
import StatsTab    from "@/components/StatsTab";
import CalendarTab from "@/components/CalendarTab";
import SettingsTab from "@/components/SettingsTab";
import { Confetti } from "@/components/ui/Confetti";

export default function App() {
  const [tab, setTab] = useState<TabId>("home");
  const [confetti, setConfetti] = useState(false);

  // Expose confetti trigger globally so child tabs can call it
  // (passed as prop or via context if needed — simple prop drill here)

  const TAB_VIEWS: Record<TabId, React.ReactNode> = {
    home:     <HomeTab />,
    tracker:  <TrackerTab />,
    roadmap:  <RoadmapTab />,
    stats:    <StatsTab />,
    calendar: <CalendarTab />,
    settings: <SettingsTab />,
  };

  return (
    <div className="min-h-screen" style={{ background: "#0f172a" }}>
      <Confetti active={confetti} />
      <Navbar active={tab} onChange={setTab} />
      <main className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {TAB_VIEWS[tab]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
