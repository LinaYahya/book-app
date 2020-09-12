import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import BookImage from './BookImage';

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
