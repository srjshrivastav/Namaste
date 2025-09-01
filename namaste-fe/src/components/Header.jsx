import React from "react";

// Example SVG for the three-dot menu (vertical)
// You can swap this with any icon library if you wish.
function MenuIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400 hover:text-indigo-600 transition">
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="flex items-center justify-between px-2 py-2 bg-gradient-to-tr from-indigo-700 via-indigo-800 to-indigo-900 shadow-md border-b border-indigo-600">
      <h1 className="text-xl font-extrabold tracking-wide text-white font-sans" style={{ fontFamily: `'Playfair Display', system-ui, sans-serif` }}>
        Namaste
      </h1>
      <button
        className="p-1 rounded-full hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Menu"
      >
        <MenuIcon />
      </button>
    </header>
  );
}
