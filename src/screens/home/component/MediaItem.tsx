import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import Row from '../../../components/Row';
import Poster from './Poster';
import Column from '../../../components/Column';
import { ThemeContext } from '../../../theme/colors';

interface MovieItemProps {
  title: string;
  subTitle: string;
  body: string;
  poster_path: string;
}

const MovieItem: React.FC<MovieItemProps> = (props) => {
  const colors = useContext(ThemeContext)
  return (
    <Row style={{ marginHorizontal: 20 }}>
      <Poster url={props.poster_path} style={{ height: 120 }} />
      <Column style={{ marginHorizontal: 20, flex: 1 }}>
        <Text style={[staticStyles.movieTitle, { color: colors.text }]} numberOfLines={1}>{props.title}</Text>
        <Text style={{ color: colors.secondaryText, marginTop: 4 }} numberOfLines={1}>{props.subTitle}</Text>
        <Text style={{ color: colors.text, marginTop: 8, width: '80%' }} numberOfLines={3}>{props.body}</Text>
      </Column>
    </Row>
  );
};

const staticStyles = StyleSheet.create({
    movieTitle: {
      fontWeight: '600',
      marginTop: 8,
    },
  });

export default MovieItem;
