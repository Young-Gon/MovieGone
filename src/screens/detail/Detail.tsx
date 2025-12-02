import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MediaType } from "../../data/api";
import { Colors, useThemedStyles } from "../../theme/colors";

type DetailProps = {
    title: string;
    itemId: number;
    type: MediaType
};

export default function DetailScreen({ route }: StaticScreenProps<DetailProps>) {
    const params = route.params;
    const navigation = useNavigation();
    navigation.setOptions({})
    console.log(`itemId: ${params.itemId}, type: ${params.type}`);

    const style = useThemedStyles(styleGenerator);

    useEffect(() =>{
        navigation.setOptions({title: params.title})
    })

    return <View><Text style={style.text}>Screen One</Text></View>;
}

const styleGenerator = (color: Colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: color.text,
    },
});