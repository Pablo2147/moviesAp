import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {CastItem} from './CastItem';
import currencyFormater from 'currency-formatter';

import {MovieFull} from '../interfaces/movieInterface';
import {Cast} from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

export const MovieDetails = ({movieFull, cast}: Props) => {
  return (
    <>
      {/* Details */}
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Icon name="star-outline" color="grey" size={20} />
          <Text> {movieFull.vote_average}</Text>
        </View>
        <Text style={{opacity: 0.7, fontStyle: 'italic'}}>
          {movieFull.genres.map(g => g.name).join(', ')}
        </Text>

        <Text style={{fontSize: 23, fontWeight: 'bold', marginTop: 10}}>
          Historia
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginVertical: 5,
            textAlign: 'justify',
            opacity: 0.7,
          }}>
          {movieFull.overview}
        </Text>

        <Text style={{fontSize: 23, fontWeight: 'bold', marginTop: 10}}>
          Presupuesto
        </Text>
        <Text style={{fontSize: 18, marginVertical: 5, opacity: 0.7}}>
          {currencyFormater.format(movieFull.budget, {code: 'USD'})}
        </Text>
      </View>

      {/* Casting */}
      <View style={{marginBottom: 50}}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            marginTop: 10,
            marginHorizontal: 20,
          }}>
          Actores
        </Text>
        <FlatList
          data={cast}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <CastItem actor={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10, height: 60}}
        />
      </View>
    </>
  );
};
