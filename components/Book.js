import React from 'react';
import { Image, View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

export default function BooksSection({ books }) {
  const navigation = useNavigation();
  return (
    <View>
      {books?.map((book) => (
        <View key={book.id}>
          <TouchableHighlight onPress={() => navigation.navigate('Book Details', { imageLink: book.selfLink })}>
            <Image
              source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
              style={{ width: 100, height: 100 }}
            />
          </TouchableHighlight>
        </View>
      ))}
    </View>
  );
}

BooksSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  books: PropTypes.array.isRequired,
};
