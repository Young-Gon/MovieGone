import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { createStaticNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

export type RootStackParamList = {
    Home: undefined;
    ScreenOne: { itemId: number; otherParam: string };
};

function ScreenOne({ route }: NativeStackScreenProps<RootStackParamList, 'ScreenOne'>) {
    const { itemId, otherParam } = route.params;
    console.log(`itemId: ${itemId}, otherParam: ${otherParam}`);

    return <View><Text>Screen One</Text></View>;
}

const NativeStack = createNativeStackNavigator(
    {
        initialRouteName: "Home",
        screens: {
            Home: { screen: HomeScreen, options: { headerShown: false } },
            ScreenOne: { screen: ScreenOne, options: { title: "Screen One" } },
        }
    }
);

export default function StackNavigation() {
    const Navigation = createStaticNavigation(NativeStack);
    return <Navigation />;
}