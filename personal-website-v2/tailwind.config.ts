import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme with teal accents - Much darker blue-gray background
        background: {
          DEFAULT: "#0f1f2a",
          secondary: "#1a2a35",
          tertiary: "#253540",
        },
        foreground: {
          DEFAULT: "#ededed",
          secondary: "#b3b3b3",
          muted: "#666666",
        },
        accent: {
          teal: "#14b8a6",
          "teal-light": "#5eead4",
          "teal-dark": "#0f766e",
        },
        border: {
          DEFAULT: "#2a3a45",
          light: "#354550",
        },
      },
      fontFamily: {
        autography: ["Autography", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "Space Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "90": "22.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
