import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { useEffect } from "react";
import { ActivityIndicator, Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import Column from "../../components/Column";
import Row from "../../components/Row";
import { MediaType, movieApi, tvApi } from "../../data/api";
import { MovieDetail } from "../../model/MovieDetail";
import { TVDetail } from "../../model/TVDetail";
import { Colors, useThemedStyles } from "../../theme/colors";
import { makeImgPath } from "../../Utils";
import Poster from "../home/component/Poster";
import IornIcons from "@expo/vector-icons/Ionicons";

type DetailProps = {
    title: string;
    itemId: number;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    type: MediaType
};

export default function DetailScreen({ route }: StaticScreenProps<DetailProps>) {
    const params = route.params;
    const SWIPER_HEIGHT = Dimensions.get('window').height / 4;
    const navigation = useNavigation();
    const scheme = useColorScheme();
    const style = useThemedStyles(styleGenerator);

    const details = useQuery<MovieDetail | TVDetail, Error>({
        queryKey: [params.type, params.itemId],
        queryFn: () => {
            switch (params.type) {
                case 'movie':
                    return movieApi.getMovieDetails(params.itemId);
                case 'tv':
                    return tvApi.getTVDetails(params.itemId);
            }
        },
        placeholderData: () => {
            // placeholderData가 MovieDetail 또는 TVDetail의 모든 필수 속성을 갖도록 기본값을 채워줍니다.
            const baseData = {
                id: params.itemId,
                overview: params.overview,
                poster_path: params.poster_path,
                backdrop_path: params.backdrop_path,
                popularity: 0,
                vote_average: 0,
                vote_count: 0,
                original_language: '',
                videos : {
                    results : []
                }
            };

            if (params.type === 'movie') {
                return {
                    ...baseData,
                    title: params.title,
                    original_title: params.title,
                    release_date: '',
                    video: false,
                    adult: false,
                    belongs_to_collection: null,
                    budget: 0,
                    genres: [],
                    homepage: null,
                    imdb_id: null,
                    production_companies: [],
                    production_countries: [],
                    revenue: 0,
                    runtime: null,
                    spoken_languages: [],
                    status: '',
                    tagline: '',
                } as MovieDetail;
            } else { // 'tv'
                return {
                    ...baseData,
                    name: params.title,
                    original_name: params.title,
                    first_air_date: '',
                    origin_country: [],
                    created_by: [],
                    episode_run_time: [],
                    genres: [],
                    homepage: null,
                    in_production: false,
                    languages: [],
                    last_air_date: null,
                    last_episode_to_air: null,
                    next_episode_to_air: null,
                    networks: [],
                    number_of_episodes: 0,
                    number_of_seasons: 0,
                    production_companies: [],
                    production_countries: [],
                    seasons: [],
                    spoken_languages: [],
                    status: '',
                    tagline: '',
                    type: ''
                } as TVDetail;
            }
        }
    });


    useEffect(() => {
        navigation.setOptions({ title: params.type.toUpperCase() })
    }, [navigation])

    const data = details.data;

    if (!data) {
        return (
            <View style={style.loadingContainer}>
                <ActivityIndicator />
            </View>
        );
    }

    return <ScrollView style={style.container}>
        <View style={{ height: SWIPER_HEIGHT, marginTop: 10 }}>
            <Image source={{ uri: makeImgPath(data.backdrop_path) }} style={StyleSheet.absoluteFill} />
            <BlurView intensity={75} blurReductionFactor={10} experimentalBlurMethod={'dimezisBlurView'} style={StyleSheet.absoluteFill} tint={scheme === 'dark' ? 'dark' : 'light'}></BlurView>
            <Row style={{ margin: 16, }} >
                <Poster
                    url={data.poster_path}
                    style={{ height: '100%' }}
                />
                <Column style={{ marginLeft: 16, justifyContent: 'flex-end' }}>
                    <Text style={[style.text, { fontSize: 32, fontWeight: '600', width: '80%' }]}>{'title' in data ? data.title : data.name}</Text>
                    <Text style={[style.text]}>{'production_companies' in data && data.production_companies.length > 0 ? `${data.production_companies[0].name} ${data.production_companies.length > 1 ? ` 외 ${data.production_companies.length - 1}개` : ''}` : null}</Text>
                    <Text style={[style.text]}>{'genres' in data && data.genres.length > 0 ? data.genres.map((genre) => genre.name).join(', ') : null}</Text>
                    {params.type === 'tv' ? <Text style={[style.text]}>{'seasons' in data ? data.seasons.length.toString() + ' Season' + (data.seasons.length > 1 ? 's' : '') : null}</Text> : null}
                    <Text style={[style.text]}>{'release_date' in data ? data.release_date : data.first_air_date} ⭐ {data.vote_average.toFixed(1)}</Text>
                </Column>
            </Row>
        </View>
        <Text style={[style.text, {marginStart: 18, marginTop:18, fontSize: 24, fontWeight: '600'}]}>씨놉시스</Text>
        <Text style={[style.text, { margin: 18, fontSize: 16 }]}>{data.overview}</Text>
        {'videos' in data ? data.videos.results.map((video) => {
            if (video.type === 'Trailer') {
                return <TouchableOpacity key={video.id} style={{ flexDirection: 'row',margin: 18}} onPress={() => {
                    const youtubeUrl = `https://www.youtube.com/watch?v=${video.key}`;
                    Linking.openURL(youtubeUrl);
                }}>
                    <IornIcons name="logo-youtube" size={32}/>
                    <Text style={[style.text, { marginStart: 8, lineHeight: 24 }]}>{video.name}</Text>
                </TouchableOpacity>
            }
        }) : null}
    </ScrollView>;
}

const styleGenerator = (color: Colors) => StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.background,
    },
    title: {
        color: color.text,
        fontSize: 24,
        fontWeight: '600',
        marginTop: 50,
        marginHorizontal: 20,
    },
    text: {
        color: color.text,
        fontSize: 14,
        marginTop: 4
    },
});