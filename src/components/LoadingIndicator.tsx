import { useContext } from "react";
import { View, ActivityIndicator, ViewProps, StyleSheet } from "react-native";
import { ThemeContext } from "../theme/colors";

export default function LoadingIndicator({ style, ...props }: ViewProps) {
    const colors = useContext(ThemeContext);
  return <View style={ [style,styles.container]} {...props}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
     alignItems: 'center' 
  },
});