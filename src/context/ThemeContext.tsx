import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';
import { lightTheme, darkTheme } from '../theme/theme';
import { useColorScheme } from 'react-native';

export interface Theme {
  mode: string;

  background: string;
  surface: string;
  card: string;

  textPrimary: string;
  textSecondary: string;

  border: string;

  primary: string;
  success: string;
  warning: string;
  error: string;

  skeletonBase: string;
  skeletonHighlight: string;
}

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: (isDark: boolean) => void;
  isSystemTheme: boolean;
  systemTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSystemTheme, setIsSystemTheme] = useState(false);

  const theme: Theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = (isDark: boolean) => {
    setIsDarkMode(isDark);
    setIsSystemTheme(false);
  };

  useEffect(() => {
    if (colorScheme) {
      setIsSystemTheme(true);
      if (colorScheme === 'dark') {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    }
  }, [colorScheme]);

  const systemTheme = () => {
    if (colorScheme === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    setIsSystemTheme(true);
  };

  const currentValue = useMemo(
    () => ({
      theme,
      isDarkMode,
      toggleTheme,
      isSystemTheme,
      systemTheme,
    }),
    [theme, isDarkMode, toggleTheme, isSystemTheme, systemTheme],
  );

  return (
    <ThemeContext.Provider value={currentValue}>
      {children}
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
