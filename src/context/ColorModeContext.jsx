import { createContext, useState, useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { colorPalette } from "@/theme";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
      },
    }),
    []
  );

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              main: colorPalette.lightGray,
            },
            secondary:{
              main: colorPalette.white
            },
            
            divider: colorPalette.darkGray,
            background: {
              default: colorPalette.white,
            },

            text: {
              primary: colorPalette.darkerBlue,
              secondary: colorPalette.darkGray,
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: colorPalette.darkBlue,
            },
            secondary:{
              main:colorPalette.darkBlue
            },
           
            divider: colorPalette.darkGray,
            background: {
              default: colorPalette.darkerBlue,
            },
            text: {
              primary: colorPalette.white,
              secondary: colorPalette.lightGray,
            },
          }),
    },
    typography: {
      fontFamily: ["Nunito Sans"].join(","),
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
