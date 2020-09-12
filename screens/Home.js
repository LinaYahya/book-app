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
    width: 200, marginBottom: 10, borderColor: 'gray', borderWidth: 1,
  },
  homeSearch: { width: 100, marginLeft: 5, height: 45 },
  title: { fontWeight: 'bold', fontSize: 18 },
});

export default function Home({ navigation }) {
  const [books, setbooks] = useState();
  const [savedBooks, setsavedBooks] = useState();
  const [readBooks, setreadBooks] = useState();

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
  const getReadBooks = async () => {
    try {
      const bookToRead = await AsyncStorage.getItem('READ');
      if (bookToRead !== null) {
        setreadBooks(JSON.parse(bookToRead));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSavedBooks();
    getReadBooks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          Search by book name
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.homeInput}
            onChangeText={(text) => getBooks(text)}
            clearButtonMode="always"
          />
          <View style={styles.homeSearch}>
            <Button
              onPress={() => {
                navigation.navigate('Search', { books });
              }}
              title="Search"
            />
          </View>

        </View>
        {savedBooks && (
        <View>
          <Text
            onPress={() => {
              navigation.navigate('Want To-Read Books', { savedBooks });
            }}
            style={styles.title}
          >
            Want to-read books
          </Text>
          <BooksSaved books={savedBooks} />
        </View>
        ) }
        {readBooks && (
        <View>
          <Text
            // onPress={() => {
            //   navigation.navigate('Want To-Read Books', { savedBooks });
            // }}
            style={styles.title}
          >
            My Books
          </Text>
          <BooksSaved books={readBooks} />
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
