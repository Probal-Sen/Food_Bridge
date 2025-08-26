import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";

  // Apply the saved theme on page load
  document.body.classList.add(`${currentTheme}-theme`);

  // Toggle theme on button click
  themeToggleButton.addEventListener("click", () => {
    const isDarkTheme = document.body.classList.contains("dark-theme");
    document.body.classList.toggle("dark-theme", !isDarkTheme);
    document.body.classList.toggle("light-theme", isDarkTheme);

    // Save the selected theme to localStorage
    localStorage.setItem("theme", isDarkTheme ? "light" : "dark");
  });
});
