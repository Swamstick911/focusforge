/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      animation: {
        flicker: "flicker 0.3s infinite",
        fireglow: "pulseGlow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
