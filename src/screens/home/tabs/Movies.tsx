import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";
import Swiper from "react-native-swiper";
import Column from "../../../components/Column";
import Row from "../../../components/Row";
import { Movie } from "../../../model/Movie";
import { ThemeContext } from "../../../theme/colors";
import MovieSlide from "../component/MovieSlide";
import Poster from "../component/Poster";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { movieApi } from "../../../data/api";
import LoadingIndicator from "../../../components/LoadingIndicator";

export default function Movies() {
  const scheme = useColorScheme();
  const queryClient = useQueryClient();
  const nowPlaying = useQuery({
    queryKey: ['movie', 'nowPlaying'],
    queryFn: () => movieApi.getNowPlayingMovies(),
    select: (data) => data.results
  });
  const upComming = useQuery({
    queryKey: ['movie', 'upComming'],
    queryFn: () => movieApi.getUpcomingMovies(),
    select: (data) => data.results
  });
  const trending = useQuery({
    queryKey: ['movie', 'trending'],
    queryFn: () => movieApi.getTrendingMovies(),
    select: (data) => data.results
  });


  const [refreshing, setRefreshing] = useState(false);
  const colors = useContext(ThemeContext);
  const SWIPER_HEIGHT = Dimensions.get('window').height / 4;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient.refetchQueries({ queryKey: ['movie'] });
    setRefreshing(false);
  }, []);

  return trending.isLoading? <LoadingIndicator /> :<FlatList
    data={trending.data}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={{ paddingBottom: 20 }}
    ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
    ListHeaderComponent={() => (<><Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>Now Playing</Text>
      <View style={{ height: SWIPER_HEIGHT, marginTop: 10 }}>
        {nowPlaying.isLoading ?
          <ActivityIndicator size="large" color={colors.primary} />
          : nowPlaying.isSuccess ?
          <Swiper containerStyle={{ height: SWIPER_HEIGHT }} showsPagination={false} autoplay={true} autoplayTimeout={3} >
            {nowPlaying.data.map((movie) => (
              <MovieSlide key={movie.id} movie={movie} scheme={scheme} colors={colors} />
            ))}
          </Swiper>
          : null
        }
      </View>
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 20 }}>Upcomming Movies</Text>
      <View style={{ marginTop: 10 }}>
        {upComming.isLoading ?
          <ActivityIndicator size="large" color={colors.primary} />
          :
          <FlatList
            data={upComming.data}
            keyExtractor={(item) => item.id.toString()}
            horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={({ item: movie }) => (
              <Column>
                <Poster url={movie.poster_path} style={{ height: 160 }} />
                <Text style={[staticStyles.movieTitle, { color: colors.text }]} numberOfLines={2}>{movie.title}</Text>
                <Text style={{ color: colors.secondaryText, marginTop: 4 }}>{movie.release_date}</Text>
              </Column>
            )}
          />
        }
      </View>
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 20, marginBottom: 10 }}>Trending Movies</Text></>)}
    renderItem={({ item: movie }) => (
      <Row style={{ marginHorizontal: 20 }}>
        <Poster url={movie.poster_path} style={{ height: 120 }} />
        <Column style={{ marginHorizontal: 20 }}>
          <Text style={[staticStyles.movieTitle, { color: colors.text }]} numberOfLines={1}>{movie.title}</Text>
          <Text style={{ color: colors.secondaryText, marginTop: 4 }}>{movie.release_date} ⭐ {movie.vote_average.toFixed(1)}</Text>
          <Text style={{ color: colors.text, marginTop: 8, width: '80%' }} numberOfLines={3}>{movie.overview}</Text>
        </Column>
      </Row>
    )}
    refreshing={refreshing}
    onRefresh={onRefresh}
  />;
}

const staticStyles = StyleSheet.create({
  movieTitle: {
    fontWeight: '600',
    marginTop: 8,
    width: 120,
  },
});