import { BlurView } from "expo-blur";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import Swiper from "react-native-swiper";
import Column from "../../components/Column";
import Row from "../../components/Row";
import { ThemeContext } from "../../theme/colors";
import { makeImgPath } from "../../Utils";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2UzM2QxNGEwNDJkNTRiMjRjZWZiNDdjM2E2NWZkOCIsIm5iZiI6MTc2NDIwMzIwMy40NDUsInN1YiI6IjY5Mjc5YWMzYWI1NWRhZjhkZDM3MTk0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gPZAgokhB0XbPs-7GvI_YJoBfhtw95F6aOitmsOdi-8'
  }
};

export default function Movies() {
  const scheme = useColorScheme();
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const colors = useContext(ThemeContext);
  const { height } = Dimensions.get('window');

  function getNowPlaying() {
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setNowPlayingMovies(json.results);
        console.log(json);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getNowPlaying();
  }, []);


  return nowPlayingMovies.length === 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View> : <ScrollView style={{ flex: 1, }}>
    <Swiper containerStyle={{ height: height / 4 }} showsPagination={false} autoplay={true} autoplayTimeout={3} >
      {nowPlayingMovies.map(movie => (
        <View key={movie.id} style={{ flex: 1 }}>
          <Image source={{ uri: makeImgPath(movie.backdrop_path) }} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
          <BlurView intensity={75} style={StyleSheet.absoluteFill} tint={scheme === 'dark' ? 'dark' : 'light'}>
            <Row style={{ margin: 16 }} >
              <Image source={{ uri: makeImgPath(movie.poster_path) }} style={{ height: '100%', aspectRatio: 2 / 3, borderRadius: 8 }} />
              <Column style={{ marginLeft: 16 }}>
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600', width: '80%' }}>{movie.title}</Text>
                <Text style={{ color: colors.text, fontSize: 14, marginTop: 4 }}>{movie.release_date} ⭐ {movie.vote_average.toFixed(1)}</Text>
                <Text style={{ color: colors.text, marginTop: 8, width: '80%' }} numberOfLines={6}>{movie.overview}</Text>
              </Column>
            </Row>
          </BlurView>
        </View>
      ))}
    </Swiper>
  </ScrollView>;
}