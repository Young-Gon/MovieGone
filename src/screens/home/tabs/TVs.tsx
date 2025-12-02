import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { tvApi } from "../../../data/api";
import { ThemeContext } from "../../../theme/colors";
import HorizontalScrollBlock from "../component/HorizontalScrollBlock";
import SimpleMediaItem from "../component/SimpleMediaItem";
import commonStyles from "../styles/style";

export default function TVs() {
    const colors = useContext(ThemeContext);
    const [isLoading, setIsLoading] = useState(false)
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

    useEffect(() => {
        setIsLoading(trending.isLoading || airingToday.isLoading || topRated.isLoading)
    }, [trending, airingToday, topRated])

    return isLoading ? <LoadingIndicator /> :
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
            {trending.isSuccess ?
                <View>
                    <Text style={{ color: colors.text, ...commonStyles.title, marginBottom: 10 }}>Trending TV Shows</Text>
                    <HorizontalScrollBlock
                        data={trending.data.results}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item: tv }) => (
                            <SimpleMediaItem
                                id={tv.id}
                                media_type="tv"
                                title={tv.name}
                                subTitle={tv.first_air_date}
                                poster_path={tv.poster_path}
                                backdrop_path={tv.backdrop_path}
                                overview={tv.overview}
                            />
                        )}
                    />
                </View> : null
            }
            {airingToday.isSuccess ?
                <View>
                    <Text style={{ color: colors.text, ...commonStyles.title, marginBottom: 10 }}>Airing Today</Text>
                    <HorizontalScrollBlock
                        data={airingToday.data.results}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item: tv }) =>
                            <SimpleMediaItem
                                id={tv.id}
                                media_type="tv"
                                title={tv.name}
                                subTitle={tv.first_air_date}
                                poster_path={tv.poster_path}
                                backdrop_path={tv.backdrop_path}
                                overview={tv.overview}
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
                                id={tv.id}
                                media_type="tv"
                                title={tv.name}
                                subTitle={tv.first_air_date}
                                poster_path={tv.poster_path}
                                backdrop_path={tv.backdrop_path}
                                overview={tv.overview}
                            />
                        }
                    />
                </View> : null
            }
        </ScrollView>
}
