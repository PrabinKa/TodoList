import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export const ThemedStatusBar = () => {
  const { theme } = useTheme();

  return (
    <StatusBar
      barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      backgroundColor={theme.background}
    />
  );
};
