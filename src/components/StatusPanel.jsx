import React from "react";

export default function StatusPanel({ streak, chillMode, xp, level }) {
  return (
    <div className="flex flex-col gap-2 items-center mt-4">
      <div className="flex gap-4">
        <div className="flex items-center gap-1 bg-orange-500/10 px-3 py-1 rounded-full shadow shadow-orange-500/30">
          🔥 Streak: <span className="font-bold">{streak}</span>
        </div>
        <div className="flex items-center gap-1 bg-purple-500/10 px-3 py-1 rounded-full shadow shadow-purple-500">
          🎧 Mode: <span className="font-bold">{chillMode ? "Chill" : "Lock-In"}</span>
        </div>
      </div>
      <div className="w-48 h-3 bg-white/20 rounded-full mt-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${xp}%` }}
        />
      </div>
      <div className="text-xs text-white/70 mt-1">Level: {level}</div>
    </div>
  );
}
