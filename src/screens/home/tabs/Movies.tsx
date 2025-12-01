import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";
import Swiper from "react-native-swiper";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { movieApi } from "../../../data/api";
import { ThemeContext } from "../../../theme/colors";
import MovieSlide from "../component/MovieSlide";

import HorizontalScrollBlock from "../component/HorizontalScrollBlock";
import MovieItem from "../component/MediaItem";
import SimpleMediaItem from "../component/SimpleMediaItem";
import commonStyles from "../styles/style";

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

  return trending.isLoading ? <LoadingIndicator /> : <FlatList
    data={trending.data}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={{ paddingBottom: 20 }}
    ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
    ListHeaderComponent={() => (<><Text style={{ color: colors.text, ...commonStyles.title }}>Now Playing</Text>
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
      <Text style={{ color: colors.text, ...commonStyles.title }}>Upcomming Movies</Text>
      <View style={{ marginTop: 10 }}>
        {upComming.isLoading ?
          <ActivityIndicator size="large" color={colors.primary} />
          :
          <HorizontalScrollBlock
            data={upComming.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: movie }) => (
              <SimpleMediaItem
                id={movie.id}
                media_type="movie"
                title={movie.title}
                subTitle={movie.release_date}
                poster_path={movie.poster_path}
              />
            )}
          />
        }
      </View>
      <Text style={{ color: colors.text, ...commonStyles.title, marginBottom: 10 }}>Trending Movies</Text></>)
    }
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
    refreshing={refreshing}
    onRefresh={onRefresh}
  />;
}

const staticStyles = StyleSheet.create({
  movieTitle: {
    fontWeight: '600',
    marginTop: 8,
  },
});