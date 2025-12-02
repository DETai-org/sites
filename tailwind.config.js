module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    { pattern: /before:/ },
    { pattern: /after:/ },
    { pattern: /animate-/ },
    { pattern: /bg-\[/ },
    { pattern: /translate-x/ },
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
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
        serif: ["Lora", "serif"],
        sans: ["Open Sans", "sans-serif"],
        accent: ["Great Vibes", "cursive"],
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};
