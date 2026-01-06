module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Убраны неиспользуемые паттерны, чтобы сборка не предупреждала о safelist
    { pattern: /animate-/ },
    { pattern: /translate-x/ },
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface-2) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accentVar: "rgb(var(--accent) / <alpha-value>)",
        accentSoftVar: "rgb(var(--accent-soft) / <alpha-value>)",
        basic: {
          dark: "#1E1B19",
          light: "#F6F1E9",
        },
        accent: {
          primary: "#C9A86A",
          hover: "#C69C5A",
          soft: "#F2E5C2",
          active: "#B8924F",
        },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "serif"],
        sans: ["var(--font-open-sans)", "system-ui", "sans-serif"],
        accent: ["var(--font-great-vibes)", "cursive"],
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        "mobile-1": "0.75rem",
        "mobile-2": "1rem",
        "mobile-3": "1.25rem",
        "mobile-4": "1.5rem",
        "mobile-6": "2rem",
        "mobile-8": "2.5rem",
      },
      fontSize: {
        // Mobile semantic typography
        "mobile-body": ["1.125rem", { lineHeight: "1.65rem" }],
        "mobile-small": ["1rem", { lineHeight: "1.5rem" }],
      },
      lineHeight: {
        "mobile-tight": "1.2",
        "mobile-normal": "1.6",
        "mobile-loose": "1.8",
      },
      maxWidth: {
        mobile: "95vw",
      },
    },
  },
  plugins: [],
};
