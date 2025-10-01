import React from "react";

export default function PresetSelector({ workTime, breakTime, setWorkTime, setBreakTime }) {
    const presets = [
        { label: "25/5", work: 25, break: 5 },
        { label: "50/10", work: 50, break: 10 },
        { label: "90/10", work: 90, break: 10 },
    ];

    return (
        <div className="flex gap-2 justify-center mt-2">
            {presets.map((p) => (
                <button
                    key={p.label}
                    onClick={() => {
                        setWorkTime(p.work * 60);
                        setBreakTime(p.break * 60);
                    }}
                    className="px-3 py-1 rounded-lg border border-cyan-400 text-white bg-white/10 hover:bg-cyan-500/20 transition"
                >
                    {p.label}
                </button>
            ))}
        </div>
    );
}