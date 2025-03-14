import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#E0E0E0",
          200: "#C2C2C2",
          300: "#A3A3A3",
          400: "#858585",
          500: "#666666",
          600: "#4D4D4D",
          700: "#333333",
          800: "#1A1A1A",
          900: "#0F0F0F",
        },
        primary: {
          100: "#D1E4FF",
          200: "#A3C9FF",
          300: "#75ADFF",
          400: "#4792FF",
          500: "#1A77FF",
          600: "#135FCC",
          700: "#0D4799",
          800: "#082F66",
          900: "#041733",
        },
        accent: {
          100: "#E0F2FF",
          200: "#B3E0FF",
          300: "#80CCFF",
          400: "#4DB8FF",
          500: "#1AA3FF",
          600: "#1480CC",
          700: "#0F5D99",
          800: "#093966",
          900: "#041C33",
        },
        background: "#2f2f2f",
      }
    : {
      grey: {
        100: "#FAFAFA",
        200: "#F5F5F5",
        300: "#EEEEEE",
        400: "#E0E0E0",
        500: "#BDBDBD",
        600: "#9E9E9E",
        700: "#757575",
        800: "#616161",
        900: "#424242",
      },
      primary: {
        100: "#E3F2FD",
        200: "#BBDEFB",
        300: "#90CAF9",
        400: "#64B5F6",
        500: "#42A5F5",
        600: "#2196F3",
        700: "#1E88E5",
        800: "#1976D2",
        900: "#1565C0",
      },
      accent: {
        100: "#FFF3E0",
        200: "#FFE0B2",
        300: "#FFCC80",
        400: "#FFB74D",
        500: "#FFA726",
        600: "#FB8C00",
        700: "#F57C00",
        800: "#EF6C00",
        900: "#E65100",
      },
      background: "#F5F5F5",
    }),
});

// MUI theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode,
      primary: { main: colors.primary[500] },
      secondary: { main: colors.accent[500] },
      neutral: {
        dark: colors.grey[700],
        main: colors.grey[500],
        light: colors.grey[100],
      },
      background: {
        default: colors.background,
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
