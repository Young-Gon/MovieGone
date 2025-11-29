import { BlurView } from "expo-blur";
import { ColorSchemeName, Image, StyleSheet, Text, View, ViewProps } from "react-native";
import Column from "../../../components/Column";
import Row from "../../../components/Row";
import { Movie } from "../../../model/Movie";
import { Colors } from "../../../theme/colors";
import Poster from "./Poster";
import { makeImgPath } from "../../../Utils";


interface MovieSlideProps extends ViewProps {
  movie: Movie;
  scheme: ColorSchemeName;
  colors: Colors;
}

export default function MovieSlide({ movie, scheme, colors, ...props }: MovieSlideProps) {
  return (
    <View style={{ flex: 1 }} {...props}>
      <Image source={{ uri: makeImgPath(movie.backdrop_path) }} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
      <BlurView intensity={75} style={StyleSheet.absoluteFill} tint={scheme === 'dark' ? 'dark' : 'light'}>
        <Row style={{ margin: 16 }} >
          <Poster url={movie.poster_path} style={{ height:'100%' }}/>
          <Column style={{ marginLeft: 16 }}>
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600', width: '80%' }}>{movie.title}</Text>
            <Text style={{ color: colors.text, fontSize: 14, marginTop: 4 }}>{movie.release_date} ⭐ {movie.vote_average.toFixed(1)}</Text>
            <Text style={{ color: colors.text, marginTop: 8, width: '80%' }} numberOfLines={6}>{movie.overview}</Text>
          </Column>
        </Row>
      </BlurView>
    </View>
  );
}