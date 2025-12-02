import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Column from "../../../components/Column";
import { MediaType } from "../../../data/api";
import { ThemeContext } from "../../../theme/colors";
import Poster from "./Poster";

interface SimpleMediaItemProps {
  id: number;
  media_type: MediaType;
  title: string;
  subTitle: string;
  poster_path: string;
}

export default function SimpleMediaItem(props: SimpleMediaItemProps) {
  const colors = useContext(ThemeContext);
  const navigation = useNavigation();
  return <TouchableOpacity
    onPress={() =>
      navigation.navigate(
        "Details",
        {
          itemId: props.id,
          type: props.media_type,
          title: props.title
        }
      )
    }
  >
    <Column>
      <Poster url={props.poster_path} style={{ height: 160 }} />
      <Text style={[staticStyles.movieTitle, { color: colors.text, width: 100 }]} numberOfLines={2}>{props.title}</Text>
      <Text style={{ color: colors.secondaryText, marginTop: 4 }}>{props.subTitle}</Text>
    </Column>
  </TouchableOpacity >
}

const staticStyles = StyleSheet.create({
  movieTitle: {
    fontWeight: '600',
    marginTop: 8,
  },
});