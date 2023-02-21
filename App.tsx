import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import MoviesScreen from './screens/movie-screens';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'black',
  },
});

type RootNavParams = {
  Home: undefined;
  Settings: undefined;
  Movies: undefined;
};

function HomeScreen(): JSX.Element {
  return (
    <View style={styles.content}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
}

function SettingsScreen(): JSX.Element {
  return (
    <View style={styles.content}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
}

const RootTab = createBottomTabNavigator<RootNavParams>();

function Root(): JSX.Element {
  return (
    <NavigationContainer>
      <RootTab.Navigator>
        <RootTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon color={color} size={size} name="home-outline" />
            ),
          }}
        />
        <RootTab.Screen
          name="Movies"
          component={MoviesScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon color={color} size={size} name="film-outline" />
            ),
          }}
        />
        <RootTab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon color={color} size={size} name="cog-outline" />
            ),
          }}
        />
      </RootTab.Navigator>
    </NavigationContainer>
  );
}

export default Root;
