import { ThemeContext } from "../../../theme/colors";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { tvApi } from "../../../data/api";
import MovieItem from "../component/MediaItem";
import HorizontalScrollBlock from "../component/HorizontalScrollBlock";
import SimpleMediaItem from "../component/SimpleMediaItem";
import commonStyles from "../styles/style";

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

    if (trending.isSuccess)
        console.log(trending.data.results[0]);


    return trending.isLoading || airingToday.isLoading || topRated.isLoading ? <LoadingIndicator /> :
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
            {trending.isSuccess ?
                <View>
                    <Text style={{ color: colors.text, ...commonStyles.title, marginBottom: 10 }}>Trending TV Shows</Text>
                    <HorizontalScrollBlock
                        data={trending.data.results}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item: tv }) => (
                            <SimpleMediaItem
                                title={tv.name}
                                subTitle={tv.first_air_date}
                                poster_path={tv.poster_path}
                            />
                        )}
                    />
                </View> : null};

            {airingToday.isSuccess ?
                <View>
                    <Text style={{ color: colors.text, ...commonStyles.title, marginBottom: 10 }}>Airing Today</Text>
                    <HorizontalScrollBlock
                        data={airingToday.data.results}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item: TV }) =>
                            <SimpleMediaItem
                                title={TV.name}
                                subTitle={TV.first_air_date}
                                poster_path={TV.poster_path}
                            />
                        }
                    />
                </View> : null
            }
            {topRated.isSuccess ?
                <View>
                    <Text style={{ color: colors.text, ...commonStyles.title, marginBottom: 10 }}>Top Rated TV Shows</Text>
                    <HorizontalScrollBlock
                        data={topRated.data.results}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item: tv }) =>
                            <SimpleMediaItem
                                title={tv.name}
                                subTitle={tv.first_air_date}
                                poster_path={tv.poster_path}
                            />
                        }
                    />
                </View> : null
            }
        </ScrollView>
}
