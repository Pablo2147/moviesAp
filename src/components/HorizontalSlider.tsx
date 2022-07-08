import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Movie} from '../interfaces/movieInterface';
import {CardMovie} from './CardMovie';

interface Props {
  movies: Movie[];
  title?: string;
}

export const HorizontalSlider = ({movies, title}: Props) => {
  return (
    <View style={{height: title ? 260 : 220}}>
      {title && (
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 15}}>
          {title}
        </Text>
      )}

      <FlatList
        data={movies}
        renderItem={({item}) => (
          <CardMovie movie={item} height={200} width={140} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
