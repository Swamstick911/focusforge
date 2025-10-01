import React, { useEffect, useState } from "react";

export default function Particles({ mode }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const arr = Array.from({ length: 80 }).map(() => ({
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: Math.random() * 3 + 1 + "px",
      delay: Math.random() * 3 + "s",
      rotate: Math.random() * 360,
    }));
    setParticles(arr);
  }, [mode]);

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${
            mode === "chill"
              ? "bg-white animate-pulse-slow"
              : "bg-fire-400 animate-bounce-fast"
          }`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  );
}
