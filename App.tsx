/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/navigation';
import { darkColors, lightColors, ThemeContext } from './src/theme/colors';

const queryClient = new QueryClient()

SplashScreen.preventAutoHideAsync();

function App() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? darkColors : lightColors;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={colors}>
        <SafeAreaProvider>
          <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
          <AppContent />
        </SafeAreaProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StackNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
