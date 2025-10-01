import React from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle({ darkMode, setDarkMode }) {
    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-5 right-5 p-3 rounded-full bg-gradient-to-r from yellow-400 to-orange-500
                dark:from-indigo-500 dark:to-purple-700 text-white shadow-lg hover:scale-110 transition"
            >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}