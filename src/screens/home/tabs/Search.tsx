import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { movieApi, tvApi } from "../../../data/api";
import MovieItem from "../component/MediaItem";

export default function Search() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [resultState, setResultState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [movie, setMovie] = useState(true);
    const resultOfMovies = useMutation({
        mutationFn: (keyword: string) => movieApi.search(keyword),
    });
    const resultOfTvs = useMutation({
        mutationFn: (keyword: string) => tvApi.search(keyword),
    });

    useEffect(() => {
        if (resultOfMovies.isSuccess || resultOfTvs.isSuccess) {
            setResultState('success')
        } else if (resultOfMovies.isPending || resultOfTvs.isPending) {
            setResultState('loading')
        } else if (resultOfMovies.isError || resultOfTvs.isError) {
            setResultState('error')
        } else {
            setResultState('idle')
        }
    })

    const renderResult = () => {
        switch (resultState) {
            case 'loading':
                return <LoadingIndicator />;
            case 'success':
                return <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'space-between',
                        width: '80%',
                    }}>
                        <TouchableOpacity onPress={() => setMovie(true)}>
                            <Text style={{ ...styles.btnText, color: movie ? "white" : "grey" }}>Movies</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMovie(false)}>
                            <Text style={{ ...styles.btnText, color: !movie ? "white" : "grey" }}>TVs</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        movie ?
                            <FlatList
                                style={{ flex: 1, width: '100%' }}
                                contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
                                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                                data={resultOfMovies.data?.results}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item: movie }) =>
                                    <MovieItem
                                        id={movie.id}
                                        media_type="movie"
                                        title={movie.title}
                                        subTitle={`${movie.release_date} ⭐ ${movie.vote_average.toFixed(1)}`}
                                        body={movie.overview}
                                        poster_path={movie.poster_path}
                                    />
                                }
                            />
                            :
                            <FlatList
                                style={{ flex: 1, width: '100%' }}
                                contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
                                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                                data={resultOfTvs.data?.results}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item: tv }) =>
                                    <MovieItem
                                        id={tv.id}
                                        media_type="tv"
                                        title={tv.name}
                                        subTitle={`${tv.first_air_date} ⭐ ${tv.vote_average.toFixed(1)}`}
                                        body={tv.overview}
                                        poster_path={tv.poster_path}
                                    />
                                }
                            />
                    }
                </View>;
            case 'error':
                return <View>
                    <Text>Error</Text>
                </View>;
            default:
                return null;
        }
    }

    return <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <TextInput
            style={{ backgroundColor: "white", borderColor: "gray", borderRadius: 18, width: "90%", padding: 10, margin: 10 }}
            placeholder="Search for Movie or TV Show"
            placeholderTextColor="gray"
            returnKeyType="search"
            onChangeText={setSearchKeyword}
            value={searchKeyword}
            onSubmitEditing={() => {
                console.log(searchKeyword)
                resultOfMovies.mutate(searchKeyword)
                resultOfTvs.mutate(searchKeyword)
            }}
        />
        {renderResult()}
    </SafeAreaView>;
}

const styles = StyleSheet.create({
    btnText: {
        color: 'white',
        fontSize: 44,
        marginHorizontal: 12,
        fontWeight: '600',
    }
});