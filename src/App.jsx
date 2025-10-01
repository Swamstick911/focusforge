import React, { useState, useEffect } from "react";
import TimerCard from "./components/TimerCard";
import Buttons from "./components/Buttons";
import StatusPanel from "./components/StatusPanel";
import Particles from "./components/Particles";
import AudioPlayer from "./components/AudioPlayer";
import PresetSelector from "./components/PresetSelector";

function App() {
  // Default times
  const [workTime, setWorkTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);

  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [chillMode, setChillMode] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("focusforge_dark") === "true";
  });

  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem("focusforge_streak")) || 0);
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem("focusforge_xp")) || 0);
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem("focusforge_level")) || 1);

  const [playSound, setPlaySound] = useState(false);
  const [levelUpFlash, setLevelUpFlash] = useState(false);

  useEffect(() => setTimeLeft(isBreak ? breakTime : workTime), [workTime, breakTime, isBreak]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setPlaySound(true);

            if (!isBreak) {
              const newStreak = streak + 1;
              setStreak(newStreak);
              localStorage.setItem("focusforge_streak", newStreak);

              const newXp = xp + 10;
              setXp(newXp);
              localStorage.setItem("focusforge_xp", newXp);

              if (newXp >= level * 50) {
                setLevel(level + 1);
                localStorage.setItem("focusforge_level", level + 1);

                // WOW level-up flash
                setLevelUpFlash(true);
                setTimeout(() => setLevelUpFlash(false), 3000);
              }

              setIsBreak(true);
              return breakTime;
            } else {
              setIsBreak(false);
              return workTime;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else clearInterval(interval);
    return () => clearInterval(interval);
  }, [isRunning, isBreak, workTime, breakTime, streak, xp, level]);

  const startPause = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? breakTime : workTime);
  };
  const toggleMode = () => setChillMode(!chillMode);

  // Dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("focusforge_dark", newMode);
  };

  return (
    <div
      className={`w-screen h-screen relative flex items-center justify-center overflow-hidden animate-gradient-x 
        ${darkMode
          ? "bg-gradient-to-br from-gray-900 via-zinc-900 to-black text-white"
          : "bg-gradient-to-br from-gray-100 via-gray-200 to-white text-black"
        }`}
    >
      {/* Background particles */}
      {darkMode && <Particles mode={chillMode ? "chill" : "lockin"} />}

      <div className="relative z-10 flex flex-col items-center space-y-6 animate-float">
        {/* Title */}
        <h1
          className={`relative text-6xl font-extrabold tracking-wide bg-clip-text text-transparent drop-shadow-xl 
            ${darkMode
              ? chillMode
                ? "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-fireglow"
                : "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 animate-fireglow"
              : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
            }`}
        >
          FocusForge
        </h1>

        {/* Timer */}
        <TimerCard timeLeft={timeLeft} isBreak={isBreak} />

        {/* Preset Selector */}
        <PresetSelector
          workTime={workTime}
          breakTime={breakTime}
          setWorkTime={setWorkTime}
          setBreakTime={setBreakTime}
        />

        {/* Control Buttons */}
        <Buttons
          isRunning={isRunning}
          startPause={startPause}
          resetTimer={resetTimer}
          toggleMode={toggleMode}
          chillMode={chillMode}
        />

        {/* Status Panel */}
        <StatusPanel streak={streak} chillMode={chillMode} xp={xp} level={level} />

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="mt-4 px-4 py-2 text-sm font-semibold rounded-lg shadow-lg 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white 
            hover:scale-105 transition-transform duration-200"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Footer */}
        <footer className={`text-[11px] mt-6 px-3 py-1 rounded-lg backdrop-blur-sm italic transition 
          ${darkMode ? "bg-white/5 text-white/50 hover:text-white/80" : "bg-black/10 text-black/60 hover:text-black/80"}`}>
          © 2025 FocusForge • Crafted by Swastik
        </footer>
      </div>

      {/* Level Up Popup */}
      {levelUpFlash && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-4 rounded-2xl shadow-2xl text-3xl font-extrabold text-white animate-bounce-fast">
            🎉 Level Up! You’re now Level {level}
          </div>
        </div>
      )}

      {/* Sound */}
      <AudioPlayer src="/beep-6-96243.mp3" playSignal={playSound} />
    </div>
  );
}

export default App;
