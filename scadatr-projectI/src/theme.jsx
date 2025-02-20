import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { dark } from '@mui/material/styles/createPalette';
import { Typography } from '@mui/material';

// color design tokens
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
                900: "#141414"
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
                900: "#071A33"
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922"
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f"
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
            100: "#141414",
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
        greenAccent: {
            100: "#0f2922",
            200: "#1e5245",
            300: "#2e7c67",
            400: "#3da58a",
            500: "#4cceac",
            600: "#70d8bd",
            700: "#94e2cd",
            800: "#b7ebde",
            900: "#dbf5ee",
        },
        redAccent: {
            100: "#2c100f",
            200: "#58201e",
            300: "#832f2c",
            400: "#af3f3b",
            500: "#db4f4a",
            600: "#e2726e",
            700: "#e99592",
            800: "#f1b9b7",
            900: "#f8dcdb",
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
})

// mui theme settings

export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],  // Corrigido
                        main: colors.grey[500],  // Corrigido
                        light: colors.grey[100], // Corrigido
                    },
                    background: {
                        default: colors.primary[500],
                    },
                }
                : {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],  // Corrigido
                        main: colors.grey[500],  // Corrigido
                        light: colors.grey[100], // Corrigido
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }),
        },
        typography: {
            fontFamily: ["Roboto", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 40,                
            },
            h2: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 32,                
            },
            h3: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 14,
            },
        }
    };
};


// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const useMode = () => {
    const [mode, setMode] = useState('light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => 
                setMode((prev) => (prev === 'light' ? 'dark' : 'light')),            
        }),        
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
}

