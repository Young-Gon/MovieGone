/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { NewAppScreen } from '@react-native/new-app-screen';
import { useEffect, useState, useContext } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import Tabs from './navigation/Tabs';
import { ThemeContext, lightColors, darkColors } from './theme/colors';

SplashScreen.preventAutoHideAsync();

function App() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={colors}>
      <SafeAreaProvider>
        <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const colors = useContext(ThemeContext);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }] }>
      <Tabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
