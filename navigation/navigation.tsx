import { createStaticNavigation, StaticParamList, StaticScreenProps } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, useColorScheme, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { DarkTheme, DefaultTheme } from "../theme/colors";

type Props = StaticScreenProps<{
    itemId: number;
    otherParam: string;
}>;

function ScreenOne({ route }: Props) {
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