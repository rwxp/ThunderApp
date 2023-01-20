import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      grey: {
        100: "#ffffff",
        200: "#ffffff",
        300: "#ffffff",
        400: "#ffffff",
        500: "#ffffff",
        600: "#cccccc",
        700: "#999999",
        800: "#666666",
        900: "#333333"
      },

      primary: {
        100: "#ccd1d2",
        200: "#99a2a5",
        300: "#667479",
        400: "#33454c",
        500: "#00171f",
        600: "#001219",
        700: "#000e13",
        800: "#00090c",
        900: "#000506",
      },
      greenAccent: {
        100: "#d6f0f8",
        200: "#ade1f1",
        300: "#85d2e9",
        400: "#5cc3e2",
        500: "#33b4db",
        600: "#2990af",
        700: "#1f6c83",
        800: "#144858",
        900: "#0a242c"
      },

      redAccent: {
        100: "#cce5ed",
        200: "#99cbdc",
        300: "#66b2ca",
        400: "#3398b9",
        500: "#007ea7",
        600: "#006586",
        700: "#004c64",
        800: "#003243",
        900: "#001921",
      },
      blueAccent: {
        100: "#ccf6ff",
        200: "#99eeff",
        300: "#66e5ff",
        400: "#33ddff",
        500: "#00d4ff",
        600: "#00aacc",
        700: "#007f99",
        800: "#005566",
        900: "#002a33"
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
        100: "#040509",
        200: "#080b12",
        300: "#0c101b",
        400: "#f2f0f0", // manually changed
        500: "#141b2d",
        600: "#1F2A40",
        700: "#727681",
        800: "#a1a4ab",
        900: "#d0d1d5",
      },
      greenAccent: {
        100: "#d6f0f8",
        200: "#ade1f1",
        300: "#85d2e9",
        400: "#5cc3e2",
        500: "#33b4db",
        600: "#2990af",
        700: "#1f6c83",
        800: "#144858",
        900: "#0a242c"
      },
      teal: {
          100: "#d6f0f8",
          200: "#ade1f1",
          300: "#85d2e9",
          400: "#5cc3e2",
          500: "#33b4db",
          600: "#2990af",
          700: "#1f6c83",
          800: "#144858",
          900: "#0a242c"
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
        100: "#d0d9e0",
        200: "#a0b3c1",
        300: "#718ea3",
        400: "#416884",
        500: "#124265",
        600: "#0e3551",
        700: "#0b283d",
        800: "#071a28",
        900: "#040d14"
      },
    }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            main: colors.primary[500],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[500],
          },
        }
        : {
          // palette values for light mode
          primary: {
            main: colors.primary[100],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: "#fcfcfc",
          },
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
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