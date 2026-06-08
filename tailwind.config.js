/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0f172a",
          card: "#1e293b",
          deep: "#090f1e",
        },
        brand: {
          cyan: "#22d3ee",
          purple: "#818cf8",
          green: "#34d399",
          yellow: "#facc15",
          red: "#f87171",
          orange: "#f97316",
        },
        border: "#334155",
        muted: "#64748b",
        subtle: "#94a3b8",
        text: {
          primary: "#f1f5f9",
          secondary: "#e2e8f0",
          muted: "#64748b",
        },
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "'Segoe UI'", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      animation: {
        "fade-up": "fadeUp 0.3s ease forwards",
        "slide-in": "slideIn 0.25s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(-8px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
