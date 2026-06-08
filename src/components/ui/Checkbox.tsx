"use client";
import { motion } from "framer-motion";

interface CheckboxProps {
  checked: boolean;
  onChange?: () => void;
  color?: string;
  size?: number;
}

export function Checkbox({ checked, onChange, color = "#22d3ee", size = 22 }: CheckboxProps) {
  return (
    <motion.button
      onClick={onChange}
      whileTap={{ scale: 0.85 }}
      className="flex-shrink-0 flex items-center justify-center rounded-md cursor-pointer transition-all"
      style={{
        width: size,
        height: size,
        borderRadius: 6,
        background: checked ? color : "transparent",
        border: checked ? "none" : "2px solid #475569",
      }}
    >
      {checked && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          style={{ color: "#0f172a", fontSize: size * 0.55, fontWeight: 800, lineHeight: 1 }}
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
}
