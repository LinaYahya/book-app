import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';
import DetailsScreen from './screens/BookDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={{ marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Book Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
