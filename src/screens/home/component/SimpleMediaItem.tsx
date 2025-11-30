import { StyleSheet, Text } from "react-native";
import Column from "../../../components/Column";
import colors, { ThemeContext } from "../../../theme/colors";
import Poster from "./Poster";
import { useContext } from "react";

interface SimpleMediaItemProps {
  title: string;
  subTitle: string;
  poster_path: string;
}

export default function SimpleMediaItem(movie: SimpleMediaItemProps) {
  const colors = useContext(ThemeContext);
    return <Column>
        <Poster url={movie.poster_path} style={{ height: 160 }} />
        <Text style={[staticStyles.movieTitle, { color: colors.text }]} numberOfLines={2}>{movie.title.slice(0, 15)}</Text>
        <Text style={{ color: colors.secondaryText, marginTop: 4 }}>{movie.subTitle}</Text>
        </Column>;
}

const staticStyles = StyleSheet.create({
  movieTitle: {
    fontWeight: '600',
    marginTop: 8,
  },
});