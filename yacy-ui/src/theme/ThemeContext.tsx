import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import '@fontsource/inter';

type ThemeType = 'light' | 'dark' | 'sepia';

interface ThemeContextType {
  themeType: ThemeType;
  setThemeType: (theme: ThemeType) => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', themeType);
  }, [themeType]);

  // Our three theme colors
  const themeColors = {
    primary: '#0066cc',    // Blue
    secondary: '#34c759',  // Green
    accent: '#ff9500'      // Orange
  };

  const getDesignTokens = (mode: ThemeType) => {
    // Common typography settings for all themes
    const typography = {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      subtitle2: { fontWeight: 500 },
      body1: { fontWeight: 400 },
      body2: { fontWeight: 400 },
      button: { fontWeight: 500, textTransform: 'none' },
    };

    // Common component overrides
    const components = {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: 12,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
          },
        },
      },
    };

    if (mode === 'light') {
      return {
        typography,
        components,
        palette: {
          mode: 'light' as PaletteMode,
          primary: {
            main: themeColors.primary,
            light: '#4d94ff',
            dark: '#0052a3',
          },
          secondary: {
            main: themeColors.secondary,
            light: '#70d98b',
            dark: '#2aa44a',
          },
          accent: {
            main: themeColors.accent,
            light: '#ffb84d',
            dark: '#cc7a00',
          },
          background: {
            default: '#f5f7fa',
            paper: '#ffffff',
          },
          text: {
            primary: '#1a1a1a',
            secondary: '#666666',
          },
        },
      };
    } else if (mode === 'dark') {
      return {
        typography,
        components,
        palette: {
          mode: 'dark' as PaletteMode,
          primary: {
            main: themeColors.primary,
            light: '#4d94ff',
            dark: '#0052a3',
          },
          secondary: {
            main: themeColors.secondary,
            light: '#70d98b',
            dark: '#2aa44a',
          },
          accent: {
            main: themeColors.accent,
            light: '#ffb84d',
            dark: '#cc7a00',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
          },
        },
      };
    } else {
      // Sepia theme
      return {
        typography,
        components,
        palette: {
          mode: 'light' as PaletteMode,
          primary: {
            main: themeColors.primary,
            light: '#4d94ff',
            dark: '#0052a3',
          },
          secondary: {
            main: themeColors.secondary,
            light: '#70d98b',
            dark: '#2aa44a',
          },
          accent: {
            main: themeColors.accent,
            light: '#ffb84d',
            dark: '#cc7a00',
          },
          background: {
            default: '#f8f0e3',
            paper: '#f9f1dd',
          },
          text: {
            primary: '#5d4037',
            secondary: '#795548',
          },
        },
      };
    }
  };

  const theme = React.useMemo(() => createTheme(getDesignTokens(themeType)), [themeType]);

  const value = {
    themeType,
    setThemeType,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};