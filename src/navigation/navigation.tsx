import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import DetailScreen from "../screens/detail/Detail";
import HomeScreen from "../screens/home/HomeScreen";
import { DarkTheme, DefaultTheme } from "../theme/colors";
import React from "react";
import IornIcons from "@expo/vector-icons/Ionicons";

const NativeStack = createNativeStackNavigator(
    {
        initialRouteName: "Home",
        screens: {
            Home: { screen: HomeScreen, options: { headerShown: false } },
            Details: { screen: DetailScreen },
        }
    }
);

export default function StackNavigation() {
    const theme = useColorScheme();
    const Navigation = createStaticNavigation(NativeStack);
    return <Navigation theme={theme === 'dark' ? DarkTheme : DefaultTheme} />;
}

type RootStackParamList = StaticParamList<typeof NativeStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}