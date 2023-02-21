import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {getMovie, getMovies, Movie} from '../data/movies';

const styles = StyleSheet.create({
  paddedContainer: {
    padding: 10,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  longField: {
    alignItems: 'flex-start',
  },
  fieldLabel: {
    width: 150,
    fontSize: 16,
  },
  fieldValue: {
    fontSize: 20,
    color: 'black',
  },
  item: {
    padding: 10,
  },
  itemTitle: {
    fontSize: 22,
    color: 'black',
  },
  itemDescription: {
    fontSize: 16,
  },
});

type MovieScreensNavParams = {
  MovieList: undefined;
  MovieDetails: {id: string};
};

type MovieDetailsScreenProp = NativeStackScreenProps<
  MovieScreensNavParams,
  'MovieDetails'
>;
function MovieDetailsScreen({
  navigation,
  route,
}: MovieDetailsScreenProp): JSX.Element {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    (async () => {
      const loadedMovie = await getMovie(route.params.id);
      if (loadedMovie != null) {
        navigation.setOptions({
          title: `${loadedMovie.title} (${loadedMovie.releaseYear})`,
        });
      }
      setMovie(loadedMovie);
    })();
  }, [route]);

  if (movie === null) {
    return (
      <View style={styles.empty}>
        <Text>Cannot find this movie</Text>
      </View>
    );
  }

  return (
    <View style={styles.paddedContainer}>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>ID</Text>
        <Text style={styles.fieldValue}>{movie.id}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Title</Text>
        <Text style={styles.fieldValue}>{movie.title}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Release year</Text>
        <Text style={styles.fieldValue}>{movie.releaseYear}</Text>
      </View>
      <View style={[styles.field, styles.longField]}>
        <Text style={styles.fieldLabel}>Companies</Text>
        <FlatList
          data={movie.companies}
          renderItem={({item}) => <Text style={styles.fieldValue}>{item}</Text>}
        />
      </View>
    </View>
  );
}

type MovieListScreenProp = NativeStackScreenProps<
  MovieScreensNavParams,
  'MovieList'
>;
function MovieListScreen({navigation, route}: MovieListScreenProp) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      setMovies(await getMovies());
    })();
  }, []);

  return (
    <View>
      <FlatList
        data={movies}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('gray', false)}
            onPress={() => navigation.navigate('MovieDetails', {id: item.id})}>
            <View style={styles.item}>
              <Text style={styles.itemTitle}>
                {item.title} ({item.releaseYear})
              </Text>
              <Text style={styles.itemDescription}>ID: {item.id}</Text>
            </View>
          </TouchableNativeFeedback>
        )}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator<MovieScreensNavParams>();

export default function MoviesScreen() {
  return (
    <Stack.Navigator initialRouteName="MovieList">
      <Stack.Screen
        name="MovieList"
        component={MovieListScreen}
        options={{title: 'Movie list'}}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{title: 'Movie Details'}}
      />
    </Stack.Navigator>
  );
}
