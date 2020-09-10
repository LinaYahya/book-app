import React, { useState } from 'react';
import {
  TextInput, View, Button, Platform, StyleSheet, StatusBar, SafeAreaView,
} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeInput: {
    width: 300, marginBottom: 10, borderColor: 'black', borderWidth: 1,
  },
  homeSearch: {
    width: 200,
  },
});

export default function Home({ navigation }) {
  const [books, setbooks] = useState();
  const getBooks = async (bookname) => {
    try {
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=${bookname}`,
      );
      setbooks(data.items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={styles.homeInput}
          onChangeText={(text) => getBooks(text)}
          clearButtonMode="always"
        />
        <Button
          style={styles.homeSearch}
          onPress={() => {
            navigation.navigate('Search', { books });
          }}
          title="Search"
        />
      </View>
    </SafeAreaView>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
