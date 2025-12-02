module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        basic: {
          dark: "#0B0B10",
          light: "#F6F1E9",
        },
        gold: {
          primary: "#D4AF6A",
          dark: "#C69C5A",
          soft: "#F2E5C2",
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
