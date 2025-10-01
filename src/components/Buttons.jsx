import React from "react";

export default function Buttons({ isRunning, startPause, resetTimer, toggleMode, chillMode }) {
    return(
        <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
                onClick={startPause}
                className="px-6 py-3 rounded-2xl font-bold border border-cyan-400 text-white bg-white/10 shadow-lg shadow-cyan-500/50 hover:scale-105 tranistion-all duration-300">
                    { isRunning ? "Pause" : "Start" }
            </button>
            <button
                onClick={resetTimer}
                className="px-6 py-3 rounded-2xl font-bold border border-red-400 text-white bg-white/10 shadow-lg shadow-red-500/50 hover:scale-105 tranistion-all duration-300">
                    Reset
            </button>
            <button
                onClick={toggleMode}
                className={`px-6 py-3 rounded-2xl font-bold border text-white bg-white/10 shadow-lg hover:scale-105 transition-all duration-300 ${
                    chillMode ? "border-purple-400 shadow-purple-500/40" : "border-blue-400 shadow-blue-500/40"
                }`}
            >
                    { chillMode ? "Lock-In Mode" : "Chill Mode" }
            </button>
        </div>
    );
}