module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        40: "repeat(auto-fit, minmax(40%, 1fr))",
        23: "repeat(auto-fit, minmax(23%, 1fr))",
        11: "repeat(auto-fit, minmax(auto, 80px))",
        "11-50px": "repeat(auto-fit, minmax(auto, 50px))",
      },
      keyframes: {
        growUp: {
          "0%": { height: "0px" },
          "75%": { height: "50%" },
          "100%": { height: "auto" },
        },
        clickA: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.95)" },
        },
        clickB: {
          "0%, 100%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(0.9)" },
        },
      },
      animation: {
        growUp: "growUp 0.4s ease-in-out",
        clickA: "clickA 0.3s ease-in-out",
        clickB: "clickB 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
