import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Column from '../../../components/Column';
import Row from '../../../components/Row';
import { MediaType } from '../../../data/api';
import { ThemeContext } from '../../../theme/colors';
import Poster from './Poster';

interface MovieItemProps {
  id: number;
  media_type: MediaType;
  title: string;
  subTitle: string;
  body: string;
  poster_path: string;
  backdrop_path: string;
}

const MediaItem: React.FC<MovieItemProps> = (props) => {
  const colors = useContext(ThemeContext)
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          "Details",
          {
            itemId: props.id,
            type: props.media_type,
            title: props.title,
            poster_path: props.poster_path,
            backdrop_path: props.backdrop_path,
            overview: props.body,            
          }
        )
      }
    >
      <Row style={{ marginHorizontal: 20 }}>
        <Poster url={props.poster_path} style={{ height: 120 }} />
        <Column style={{ marginHorizontal: 20, flex: 1 }}>
          <Text style={[staticStyles.movieTitle, { color: colors.text }]} numberOfLines={1}>{props.title}</Text>
          <Text style={{ color: colors.secondaryText, marginTop: 4 }} numberOfLines={1}>{props.subTitle}</Text>
          <Text style={{ color: colors.text, marginTop: 8, width: '100%' }} numberOfLines={3}>{props.body}</Text>
        </Column>
      </Row>
    </TouchableOpacity>
  );
};

const staticStyles = StyleSheet.create({
  movieTitle: {
    fontWeight: '600',
    marginTop: 8,
  },
});

export default MediaItem;
