import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, Text, useColorScheme, View } from "react-native";
import Swiper from "react-native-swiper";
import { Movie } from "../../../model/Movie";
import { ThemeContext } from "../../../theme/colors";
import MovieSlide from "../component/MovieSlide";

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

function fetchData(url: string, success:(json:any)=>void, customOptions: any = options) {
  fetch(url, customOptions)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      success(json);
    })
    .catch(err => console.error(err));
}

export default function Movies() {
  const scheme = useColorScheme();
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [upcommingMovies, setupcommingMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const colors = useContext(ThemeContext);
  const SWIPER_HEIGHT = Dimensions.get('window').height / 4;

  useEffect(() => {
    fetchData(nowPlayingURL, (json) => {
      setNowPlayingMovies(json.results);
    });
    fetchData(upCommingURL, (json) => {
      setupcommingMovies(json.results);
    });
    fetchData(trandingURL, (json) => {
      setTrendingMovies(json.results);
    });
  }, []);

  return <ScrollView style={{ flex: 1 }}>
    <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>Now Playing</Text>
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
    <View style={{ height: SWIPER_HEIGHT, marginTop: 10 }}>
      {upcommingMovies.length === 0 ?
        <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
      :
        <Swiper containerStyle={{ height: SWIPER_HEIGHT }} showsPagination={false} autoplay={true} autoplayTimeout={3} >
          {upcommingMovies.map((movie) => (
            <MovieSlide key={movie.id} movie={movie} scheme={scheme} colors={colors} />
          ))}
        </Swiper>
      }
    </View>
    <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 20 }}>Trending Movies</Text>
    <View style={{ height: SWIPER_HEIGHT, marginTop: 10, marginBottom: 20 }}>
      {trendingMovies.length === 0 ?
        <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
      :
        <Swiper containerStyle={{ height: SWIPER_HEIGHT }} showsPagination={false} autoplay={true} autoplayTimeout={3} >
          {trendingMovies.map((movie) => (
            <MovieSlide key={movie.id} movie={movie} scheme={scheme} colors={colors} />
          ))}
        </Swiper>
      }
    </View>
  </ScrollView>;
}