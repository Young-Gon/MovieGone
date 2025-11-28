import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";
import Swiper from "react-native-swiper";
import Column from "../../../components/Column";
import Row from "../../../components/Row";
import { Movie } from "../../../model/Movie";
import { ThemeContext } from "../../../theme/colors";
import MovieSlide from "../component/MovieSlide";
import Poster from "../component/Poster";

const nowPlayingURL = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR';
const upCommingURL = 'https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1&region=KR';
const trandingURL = 'https://api.themoviedb.org/3/trending/movie/week?language=ko-KR';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2UzM2QxNGEwNDJkNTRiMjRjZWZiNDdjM2E2NWZkOCIsIm5iZiI6MTc2NDIwMzIwMy40NDUsInN1YiI6IjY5Mjc5YWMzYWI1NWRhZjhkZDM3MTk0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gPZAgokhB0XbPs-7GvI_YJoBfhtw95F6aOitmsOdi-8'
  }
};

async function fetchData(url: string, customOptions: any = options) {
  try {
    return await (await fetch(url, customOptions)).json()
  } catch (error) {
    console.error(error);
    return [];
  };
}

const staticStyles = StyleSheet.create({
  movieTitle: {
    fontWeight: '600',
    marginTop: 8,
    width: 120,
  },
});

export default function Movies() {
  const scheme = useColorScheme();
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [upcommingMovies, setupcommingMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  // const nowPlaying = useQuery<Movie[]>({
  //   queryKey: ['nowPlaying'],
  //   queryFn: () => movieApi.getNowPlayingMovies(),
  //   select: (data) => data.results
  // });

  const [refreshing, setRefreshing] = useState(false);
  const colors = useContext(ThemeContext);
  const SWIPER_HEIGHT = Dimensions.get('window').height / 4;

  async function getMovieAll() {
    const [nowPlayingJson, upCommingJson, trendingJson] = await Promise.all([fetchData(nowPlayingURL), fetchData(upCommingURL), fetchData(trandingURL)])
    setNowPlayingMovies(nowPlayingJson.results);
    setupcommingMovies(upCommingJson.results);
    setTrendingMovies(trendingJson.results);
  }

  useEffect(() => {
    getMovieAll();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMovieAll();
    setRefreshing(false);
  }, []);

  return <FlatList
    data={trendingMovies}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={{ paddingBottom: 20 }}
    ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
    ListHeaderComponent={() => (<><Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>Now Playing</Text>
      <View style={{ height: SWIPER_HEIGHT, marginTop: 10 }}>
        {nowPlayingMovies.length === 0 ?
          <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
          :
          <Swiper containerStyle={{ height: SWIPER_HEIGHT }} showsPagination={false} autoplay={true} autoplayTimeout={3} >
            {nowPlayingMovies.map((movie) => (
              <MovieSlide key={movie.id} movie={movie} scheme={scheme} colors={colors} />
            ))}
          </Swiper>
        }
      </View>
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 20 }}>Upcomming Movies</Text>
      <View style={{ marginTop: 10 }}>
        {upcommingMovies.length === 0 ?
          <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
          :
          <FlatList
            data={upcommingMovies}
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