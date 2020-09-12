import React, { useState, useEffect } from 'react';
import {
  TextInput,
  View, Button, Platform, StyleSheet, StatusBar, SafeAreaView, AsyncStorage, Text, ScrollView,
} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import BooksSaved from '../components/BooksSaved';

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
  const [savedBooks, setsavedBooks] = useState();

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
  const getSavedBooks = async () => {
    try {
      const bookToRead = await AsyncStorage.getItem('TOREAD');
      if (bookToRead !== null) {
        setsavedBooks(JSON.parse(bookToRead));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSavedBooks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* {console.log(savedBooks, 'hi home')} */}
      <ScrollView>
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
        {savedBooks && (
        <View>
          <Text onPress={() => {
            navigation.navigate('Want To-Read Books', { savedBooks });
          }}
          >
            Want to-read books
          </Text>
          <BooksSaved books={savedBooks} />
        </View>

        ) }
      </ScrollView>

    </SafeAreaView>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
