import { ThemeContext } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import {useContext} from "react";
import { FlatList, Text, View } from "react-native";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { tvApi } from "../../../data/api";

export default function TVs() {
  const colors = useContext(ThemeContext);
    const airingToday = useQuery({
        queryKey: ["tv", "airingToday"],
        queryFn: () => tvApi.getAiringToday(),
    });

    const topRated = useQuery({
        queryKey: ["tv", "topRated"],
        queryFn: () => tvApi.getTopRatedTVs(),
    });

    const trending = useQuery({
        queryKey: ["tv", "trending"],
        queryFn: () => tvApi.getTrendingTVs(),
    });

    return trending.isLoading ? <LoadingIndicator /> :
    trending.isSuccess ?<FlatList
        data={trending.data.results}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}  
        // ListHeaderComponent={() => (
        // )}
        renderItem={({ item }) => (
            <View>
                <Text style={{ color: colors.text }}>{item.name}</Text>
            </View>
        )}
    />: null;
}
