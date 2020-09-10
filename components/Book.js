import React from 'react';
import {
  Image, View, TouchableHighlight, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const BookImage = ({ id, selfLink, volumeInfo }) => {
  const navigation = useNavigation();

  return (
    <View key={id}>
      <TouchableHighlight onPress={() => navigation.navigate('Book Details', { imageLink: selfLink })}>
        <Image
          source={{ uri: volumeInfo.imageLinks.thumbnail }}
          style={{ width: 300, height: 300, margin: 25 }}
        />
      </TouchableHighlight>
    </View>
  );
};

export default function BooksSection({ books }) {
  const renderItem = ({ item: { id, selfLink, volumeInfo } }) => (
    <BookImage id={id} selfLink={selfLink} volumeInfo={volumeInfo} />
  );
  return (
    <View>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

    </View>
  );
}

BooksSection.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

BookImage.propTypes = {
  id: PropTypes.string.isRequired,
  selfLink: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  volumeInfo: PropTypes.object.isRequired,
};
