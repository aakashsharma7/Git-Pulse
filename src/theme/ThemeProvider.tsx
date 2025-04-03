'use client';
import React, { useState, useEffect, createContext, ReactNode, FC } from "react";

const getInitialTheme = (): string => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }
  }
  return "dark"; // Default theme
};

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const themeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  initialTheme?: string;
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState<string>(initialTheme || 'dark');
  const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);

  const rawSetTheme = (theme: string) => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("color-theme", theme);
  };

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    rawSetTheme(initialTheme);
    setIsThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (isThemeLoaded) {
      rawSetTheme(theme);
    }
  }, [theme, isThemeLoaded]);

  if (!isThemeLoaded) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>; // Prevent layout shift by hiding content initially
  }

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};