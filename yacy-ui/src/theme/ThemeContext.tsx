import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

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

  const getDesignTokens = (mode: ThemeType) => {
    if (mode === 'light') {
      return {
        palette: {
          mode: 'light' as PaletteMode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
        },
      };
    } else if (mode === 'dark') {
      return {
        palette: {
          mode: 'dark' as PaletteMode,
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        },
      };
    } else {
      // Sepia theme
      return {
        palette: {
          mode: 'light' as PaletteMode,
          primary: {
            main: '#795548',
          },
          secondary: {
            main: '#607d8b',
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