import { View, Text } from "react-native";
import { MediaType } from "../../data/api";
import { StaticScreenProps } from "@react-navigation/native";

type DetailProps = {
    itemId: number;
    type: MediaType
};

export default function DetailScreen({ route }: StaticScreenProps<DetailProps>) {
    const { itemId, type } = route.params;
    console.log(`itemId: ${itemId}, type: ${type}`);

    return <View><Text>Screen One</Text></View>;
}