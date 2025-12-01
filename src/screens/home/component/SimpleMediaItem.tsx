import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import Column from "../../../components/Column";
import { ThemeContext } from "../../../theme/colors";
import Poster from "./Poster";

interface SimpleMediaItemProps {
  title: string;
  subTitle: string;
  poster_path: string;
}

export default function SimpleMediaItem(movie: SimpleMediaItemProps) {
  const colors = useContext(ThemeContext);
    return <Column>
        <Poster url={movie.poster_path} style={{ height: 160 }} />
        <Text style={[staticStyles.movieTitle, { color: colors.text, width:100 }]} numberOfLines={2}>{movie.title}</Text>
        <Text style={{ color: colors.secondaryText, marginTop: 4 }}>{movie.subTitle}</Text>
        </Column>;
}

const staticStyles = StyleSheet.create({
  movieTitle: {
    fontWeight: '600',
    marginTop: 8,
  },
});