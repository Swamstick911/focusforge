/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fire: {
          100: "#FFB347",
          200: "#FF7F50",
          300: "#FF4500",
          400: "#FF0000",
          500: "#CC0000",
        },
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        pulseGlow: {
          "0%, 100%": {
            textShadow: "0 0 10px #ff4500, 0 0 20px #ff6347",
          },
          "50%": {
            textShadow: "0 0 15px #ffa500, 0 0 30px #ff4500",
          },
        },
        gradientX: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        pulseSlow: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        bounceFast: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        rotate360: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        flicker: "flicker 0.3s infinite",
        fireglow: "pulseGlow 2s ease-in-out infinite",
        "gradient-x-slow": "gradientX 15s linear infinite",
        "pulse-slow": "pulseSlow 2s ease-in-out infinite",
        "bounce-fast": "bounceFast 0.5s infinite",
        "rotate-360": "rotate360 8s linear infinite",
      },
    },
  },
  plugins: [],
};
