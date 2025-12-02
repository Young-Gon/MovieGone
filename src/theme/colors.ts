import { Theme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';

export type Colors = {
  background: string;
  primary: string;
  text: string;
  secondaryText: string;
  accent: string;
};

export const darkColors: Colors = {
  background: '#121212',
  primary: '#1E88E5',
  text: '#FFFFFF',
  secondaryText: '#B0B0B0',
  accent: '#FF4081',
};

export const lightColors: Colors = {
  background: '#FFFFFF',
  primary: '#1E88E5',
  text: '#000000',
  secondaryText: '#4F4F4F',
  accent: '#FF4081',
};

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: lightColors.primary,
    background: lightColors.background,
    card: 'rgb(255, 255, 255)',
    text: lightColors.text,
    border: lightColors.text,
    notification: 'rgb(255, 59, 48)',
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '900' },
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: darkColors.primary,
    background: darkColors.background,
    card: 'rgb(18, 18, 18)',
    text: darkColors.text,
    border: darkColors.text,
    notification: 'rgb(255, 69, 58)',
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '900' },
  },
};

export const ThemeContext = React.createContext<Colors>(darkColors);

export const useThemedStyles = <T>(styleCenerator: (colors: Colors) => T) => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;
  const styles = useMemo(() => styleCenerator(colors), [colorScheme, styleCenerator]);
  return styles;
}

export default {
  light: lightColors,
  dark: darkColors,
};
