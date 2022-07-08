import React, {useContext} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

import {useMovies} from '../hooks/useMovies';
import {CardMovie} from '../components/CardMovie';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';
import {getImageColors} from '../helpers/getColors';
import {GradientContext} from '../context/GradientContext';
import {useEffect} from 'react';

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const {setMainColors} = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const {primary = 'green', secondary = 'orange'} = await getImageColors(uri);

    setMainColors({primary, secondary});
  };

  const {width: windowWidth} = Dimensions.get('window');

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }
  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/* nowPlaying Movies */}
          <View style={{height: 440}}>
            <Carousel
              data={nowPlaying}
              renderItem={({item}) => <CardMovie movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          {/* Popular movies */}
          <HorizontalSlider movies={popular} title="Populares" />
          {/* topRated movies */}
          <HorizontalSlider movies={topRated} title="Mejor Valoradas" />
          {/* upcoming movies */}
          <HorizontalSlider movies={upcoming} title="Próximos Estrenos" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
