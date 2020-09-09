import React, { useState } from 'react';
import {
  TextInput, View, Button, Text, Platform, StatusBar, StyleSheet,
} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Main = () => <View />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Home({ navigation }) {
  const [books, setbooks] = useState();
  const getBooks = async (bookname) => {
    try {
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=${bookname}`,
      );
      setbooks(data.items.slice(0, 2));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerLeft: () => (
              <Text onPress={() => navigation.openDrawer()}>Open</Text>
            ),
          }}
        />
      </Stack.Navigator>
      <View>

        <TextInput
          style={{
            width: 300, marginBottom: 10, borderColor: 'black', borderWidth: 1,
          }}
          onChangeText={(text) => getBooks(text)}
          clearButtonMode="always"
        />
        <Button
          style={{
            width: 200,
          }}
          onPress={() => {
            navigation.navigate('Search', { books });
          }}
          title="Search"
        />
      </View>
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};
