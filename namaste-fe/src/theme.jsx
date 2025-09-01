import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // On mount, check localStorage and system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme) {
      setTheme(savedTheme);
      updateHtmlClass(savedTheme);
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(systemDark ? "dark" : "light");
      updateHtmlClass(systemDark ? "dark" : "light");
    }
  }, []);

  function updateHtmlClass(theme) {
    if(theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateHtmlClass(newTheme);
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
