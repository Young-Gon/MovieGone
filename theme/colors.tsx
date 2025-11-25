import React from 'react';

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

export const ThemeContext = React.createContext<Colors>(darkColors);

export default {
  light: lightColors,
  dark: darkColors,
};
