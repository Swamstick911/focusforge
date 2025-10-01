import React from "react";

export default function TimerCard({ timeLeft, isBreak }) {
  const formatTime = (s) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(
      s % 60
    ).toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-6 relative">
      {/* Aura Glow Rings */}
      <div className="absolute w-72 h-72 rounded-full border-4 border-orange-500 animate-ping opacity-20"></div>
      <div className="absolute w-80 h-80 rounded-full border-2 border-orange-400 animate-pulse opacity-10"></div>

      {/* Timer Display */}
      <div className="relative flex items-center justify-center w-72 h-72">
        <h2 className="text-7xl font-bold text-white drop-shadow-[0_0_25px_#ff4500] animate-pulse">
          {formatTime(timeLeft)}
        </h2>
      </div>

      {/* Work/Break label */}
      <div
        className={`text-lg font-semibold tracking-wide ${
          isBreak
            ? "text-yellow-300 drop-shadow-[0_0_10px_#FFD700]"
            : "text-green-300 drop-shadow-[0_0_10px_#00FF7F]"
        }`}
      >
        {isBreak ? "Break Time!" : "Work Session"}
      </div>
    </div>
  );
}
