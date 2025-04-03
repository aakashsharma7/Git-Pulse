'use client';
import React, { useContext } from "react";
import { HiSun, HiMoon } from "react-icons/hi";
import { themeContext } from "@/theme/ThemeProvider"; // Assuming ThemeContext is the correct context import
import { Box } from "@mui/material";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(themeContext) ?? {};
  
  if (!setTheme) {
    return null; // or handle the error in an appropriate way
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Box className="p-2 flex items-center justify-center cursor-pointer ">
      {theme === "dark" ? (
        <Box
          className="flex items-center text-[14px] cursor-pointer"
          onClick={toggleTheme}
        >
          <HiSun className="text-primary text-2xl mr-2" /> Light mode
        </Box>
      ) : (
        <Box
          className="flex items-center text-[14px] cursor-pointer"
          onClick={toggleTheme}
        >
          <HiMoon className="text-primary text-2xl mr-2" /> Dark mode
        </Box>
      )}
    </Box>
  );
};

export default ThemeToggle;