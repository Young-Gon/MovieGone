import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

export default function Movies() {
    const navigation = useNavigation();
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Movies Screen!!</Text>
        <Button title="Go to Screen One" onPress={() => {
            navigation.navigate(
                "ScreenOne",
                {
                    itemId: 42,
                    otherParam: 'Hello from Movies'
                },
            );
        }} />
    </View>;
}