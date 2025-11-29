import { Image, ImageProps, StyleSheet } from "react-native";
import { makeImgPath } from "../../../Utils";

interface PosterProps extends ImageProps {
  url: string;
}

export default function Poster({ url, style, ...props }: PosterProps) {
  return (
    <Image source={{ uri: makeImgPath(url) }} style={[styles.container, style]} {...props} />
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 2 / 3,
    borderRadius: 8
  },
});