import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#ADD7FF",
          200: "#8AC5FF",
          300: "#66B4FF",
          400: "#42A1FF",
          500: "#2290FF",
          600: "#1B72CC",
          700: "#145599",
          800: "#0E3766",
          900: "#071A33",
        },
        blueAccent: {
          100: "#e1e6fe",
          200: "#c2ccfd",
          300: "#a4b3fc",
          400: "#8599fb",
          500: "#6780fa",
          600: "#5266c8",
          700: "#3e4d96",
          800: "#293364",
          900: "#151a32",
        },
      }
    : {
        grey: {
          100: "#fcfcfc",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#ADD7FF",
          200: "#8AC5FF",
          300: "#66B4FF",
          400: "#42A1FF",
          500: "#2290FF",
          600: "#1B72CC",
          700: "#145599",
          800: "#0E3766",
          900: "#071A33",
        },
        blueAccent: {
          100: "#151a32",
          200: "#293364",
          300: "#3e4d96",
          400: "#5266c8",
          500: "#6780fa",
          600: "#8599fb",
          700: "#a4b3fc",
          800: "#c2ccfd",
          900: "#e1e6fe",
        },
      }),
});

// MUI theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode,
      primary: { main: colors.primary[500] },
      secondary: { main: colors.blueAccent[500] },
      neutral: {
        dark: colors.grey[700],
        main: colors.grey[500],
        light: colors.grey[100],
      },
      background: {
        default: mode === "dark" ? colors.primary[700] : "#fcfcfc",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      fontSize: 14,
      h1: { fontSize: 36, fontWeight: 700 },
      h2: { fontSize: 30, fontWeight: 600 },
      h3: { fontSize: 24, fontWeight: 500 },
      h4: { fontSize: 20, fontWeight: 500 },
      h5: { fontSize: 16, fontWeight: 400 },
      h6: { fontSize: 14, fontWeight: 400 },
    },
  };
};

// Context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
