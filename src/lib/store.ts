"use client";
import { useState, useCallback } from "react";

const STORAGE_KEY = "cyberquest_v1";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AppState {
  xp: number;
  roadmap: Record<string, boolean>;   // "linux.0.0" => true
  daily: Record<string, boolean>;     // "YYYY-MM-DD.taskId" => true
  weekly: Record<string, boolean>;    // "weekKey.Monday" => true
  calendar: Record<string, boolean>;  // "YYYY-MM-DD" => true
}

function defaultState(): AppState {
  return { xp: 0, roadmap: {}, daily: {}, weekly: {}, calendar: {} };
}

function load(): AppState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultState(), ...JSON.parse(raw) } : defaultState();
  } catch {
    return defaultState();
  }
}

function save(state: AppState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

// ─── Date helpers ─────────────────────────────────────────────────────────────
export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getWeekKey(): string {
  const d = new Date();
  const day = d.getDay() || 7;
  const mon = new Date(d);
  mon.setDate(d.getDate() - (day - 1));
  return `${mon.getFullYear()}-${String(mon.getMonth() + 1).padStart(2, "0")}-${String(mon.getDate()).padStart(2, "0")}`;
}

export function dateToKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useStore() {
  const [state, setStateRaw] = useState<AppState>(() => load());

  const setState = useCallback((updater: AppState | ((prev: AppState) => AppState)) => {
    setStateRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      save(next);
      return next;
    });
  }, []);

  // ── XP ──────────────────────────────────────────────────────────────────────
  const addXP = useCallback((amount: number) => {
    setState(prev => ({ ...prev, xp: prev.xp + amount }));
  }, [setState]);

  // ── Roadmap ──────────────────────────────────────────────────────────────────
  const toggleRoadmap = useCallback((key: string): boolean => {
    const wasChecked = !!state.roadmap[key];
    const today = getTodayKey();
    setState(prev => ({
      ...prev,
      roadmap: { ...prev.roadmap, [key]: !wasChecked },
      calendar: { ...prev.calendar, [today]: true },
      xp: wasChecked ? prev.xp : prev.xp + 20,
    }));
    return !wasChecked; // returns new state
  }, [state.roadmap, setState]);

  // ── Daily ────────────────────────────────────────────────────────────────────
  const toggleDaily = useCallback((taskId: string, xpAmt: number): boolean => {
    const today = getTodayKey();
    const key = `${today}.${taskId}`;
    const wasChecked = !!state.daily[key];
    setState(prev => ({
      ...prev,
      daily: { ...prev.daily, [key]: !wasChecked },
      calendar: { ...prev.calendar, [today]: true },
      xp: wasChecked ? prev.xp : prev.xp + xpAmt,
    }));
    return !wasChecked;
  }, [state.daily, setState]);

  // ── Weekly ───────────────────────────────────────────────────────────────────
  const toggleWeekDay = useCallback((day: string, allDays: string[]): { checked: boolean; weekComplete: boolean } => {
    const weekKey = getWeekKey();
    const key = `${weekKey}.${day}`;
    const wasChecked = !!state.weekly[key];
    const newChecked = !wasChecked;

    // Count days after toggle
    const newDayCount = allDays.filter(d => {
      if (d === day) return newChecked;
      return !!state.weekly[`${weekKey}.${d}`];
    }).length;

    const weekComplete = newDayCount === 7;
    const xpGain = wasChecked ? 0 : 50 + (weekComplete ? 200 : 0);

    setState(prev => ({
      ...prev,
      weekly: { ...prev.weekly, [key]: newChecked },
      xp: prev.xp + xpGain,
    }));

    return { checked: newChecked, weekComplete };
  }, [state.weekly, setState]);

  // ── Calendar ─────────────────────────────────────────────────────────────────
  const toggleCalendar = useCallback((dateKey: string) => {
    setState(prev => ({
      ...prev,
      calendar: { ...prev.calendar, [dateKey]: !prev.calendar[dateKey] },
    }));
  }, [setState]);

  // ── Export / Import / Reset ──────────────────────────────────────────────────
  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "cyberquest_backup.json"; a.click();
    URL.revokeObjectURL(url);
  }, [state]);

  const importData = useCallback((file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target?.result as string);
          setState({ ...defaultState(), ...parsed });
          resolve();
        } catch { reject(new Error("Invalid file")); }
      };
      reader.readAsText(file);
    });
  }, [setState]);

  const resetAll = useCallback(() => {
    setState(defaultState());
  }, [setState]);

  // ── Derived ──────────────────────────────────────────────────────────────────
  const calcStreak = useCallback((): number => {
    let streak = 0;
    const d = new Date();
    while (true) {
      const key = dateToKey(d);
      if (state.calendar[key]) { streak++; d.setDate(d.getDate() - 1); }
      else break;
    }
    return streak;
  }, [state.calendar]);

  return {
    state,
    addXP,
    toggleRoadmap,
    toggleDaily,
    toggleWeekDay,
    toggleCalendar,
    exportData,
    importData,
    resetAll,
    calcStreak,
  };
}
