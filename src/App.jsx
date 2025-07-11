import React, { useState, useRef, useEffect } from "react";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [isBreak, setIsBreak] = useState(false);
  const [chillMode, setChillMode] = useState(false);
  const audioRef = useRef(null);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const starArray = Array.from({ length: 100 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
    }));
    setStars(starArray);
  }, []);

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("focusforge_streak");
    return saved ? parseInt(saved) : 0;
  });

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          audioRef.current?.play();

          if (!isBreak) {
            const newStreak = streak + 1;
            setStreak(newStreak);
            localStorage.setItem("focusforge_streak", newStreak);
            setTimeLeft(5 * 60); // break time
            setIsBreak(true);
          } else {
            setTimeLeft(25 * 60); // work time
            setIsBreak(false);
          }

          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTimeLeft(25 * 60);
    setIsBreak(false);
  };

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-br from-zinc-900 via-gray-900 to-black bg-[length:400%_400%] animate-gradient-x text-white flex items-center justify-center px-4">
        <div className="stars absolute w-full h-full top-0 left-0 pointer-events-none">
          {stars.map((star, i) => (
            <div
            key={i}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay,
            }}/> 
          ))}
        </div>

        <div className="max-w-sm w-full text-center space-y-6">
          <div className="relative inline-block">
            <h1 className="text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 animate-fireglow leading-[1.5]">
              FocusForge
            </h1>

            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className="fire-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`
                  }}
                  />
              ))}
            </div>
          </div>
          <div className="bg-zinc-800/60 border border-cyan-500/30 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-500 hover:scale-[1.02]">
            {/* Timer */}
            <div className="text-7xl font-mono font-extrabold text-cyan-300 tracking-widest drop-shadow-[0_0_20px_#00ffff]">
              {formatTime(timeLeft)}
            </div> 
            

            <div className={`text-sm font-semibold px-4 py-1 rounded-full shadow-md backdrop-blur-sm 
              ${isBreak 
                ? "bg-yellow-400/20 text-yellow-300 border border-yellow-300/30"
                : "bg-green-400/20 text-green-300 border border-green-300/30"}`}>
              {isBreak ? " Break Time!" : " Work Session"}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={startTimer}
                className="px-4 py-2 rounded-xl font-bold transition-all duration-300 shadow-md hover:scale-105 bg-green-500 text-white shadow-green-500/50 hover:shadow-lg hover:shadow-green-500/70"
              >
                Start
              </button>
              <button
                onClick={pauseTimer}
                className="px-4 py-2 rounded-xl font-bold transition-all duration-300 shadow-md hover:scale-105 bg-yellow-500 text-white shadow-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/70">
                Pause
              </button>
              <button
                onClick={resetTimer}
                className="px-4 py-2 rounded-xl font-bold transition-all duration-300 shadow-md hover:scale-105 bg-red-500 text-white shadow-red-500/50 hover:shadow-lg hover:shadow-red-500/70"
              >
                Reset
              </button>
              <button
                onClick={() => setChillMode(!chillMode)}
                className={` ${
                  chillMode
                    ? "px-4 py-2 rounded-xl font-bold transition-all duration-300 shadow-md hover:scale-105 bg-purple-500 text-white shadow-purple-500/50 hover:shadow-lg hover:shadow-purple-500/70"
                    : "px-4 py-2 rounded-xl font-bold transition-all duration-300 shadow-md hover:scale-105 bg-blue-500 text-white shadow-blue-500/50 hover:shadow-lg hover:shadow-blue-500/70"
                } text-white px-4 py-2 rounded-xl font-semibold transition`}
              >
                {chillMode ? "Switch to Lock-In " : "Switch to Chill "}
              </button>
            </div>

            {/* Status Info */}
            <div className="flex justify-center gap-4 text-sm text-white/80 mt-4">
              <div className="flex items-center gap-1 bg-orange-500/10 text-orange-300 px-3 py-1 rounded-full shadow shadow-orange-500/30">
                🔥 Streak: <span className="font-bold">{streak}</span>
              </div>
              <div className="flex items-center gap-1 bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full shadow shadow-purple-500">
                🎧 Mode:{" "}
                <span className="font-bold">
                  {chillMode ? "Chill" : "Lock-In"}
                </span>
              </div>
            </div>
                <footer className="text-[11px] mt-6 px-2 py-1 rounded-lg bg-white/5 backdrop-blur-sm text-white/50 italic">
                  © 2025 FocusForge • Crafted by Swastik
                </footer>
          </div>
        </div>

        <audio ref={audioRef} src="/beep-6-96243.mp3" preload="auto" />
      </div>
    </>
  );
}

export default App;
