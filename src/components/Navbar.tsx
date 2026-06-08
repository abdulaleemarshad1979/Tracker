"use client";
import { Home, CheckSquare, Map, BarChart2, Calendar, Settings } from "lucide-react";

export type TabId = "home" | "tracker" | "roadmap" | "stats" | "calendar" | "settings";

const TABS: { id: TabId; label: string; Icon: React.ElementType }[] = [
  { id: "home",     label: "Home",     Icon: Home        },
  { id: "tracker",  label: "Tracker",  Icon: CheckSquare },
  { id: "roadmap",  label: "Roadmap",  Icon: Map         },
  { id: "stats",    label: "Stats",    Icon: BarChart2   },
  { id: "calendar", label: "Calendar", Icon: Calendar    },
  { id: "settings", label: "Settings", Icon: Settings    },
];

interface NavbarProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export default function Navbar({ active, onChange }: NavbarProps) {
  return (
    <nav
      className="sticky top-0 z-50 flex overflow-x-auto"
      style={{
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
        scrollbarWidth: "none",
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex items-center gap-1.5 px-3 py-4 text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap flex-shrink-0"
            style={{
              color: isActive ? "#22d3ee" : "#64748b",
              background: "none",
              border: "none",
              borderBottom: isActive ? "2px solid #22d3ee" : "2px solid transparent",
              cursor: "pointer",
            }}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.slice(0, 4)}</span>
          </button>
        );
      })}
    </nav>
  );
}
