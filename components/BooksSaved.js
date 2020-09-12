import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import BookImage from './BookImage';

export default function BookSaved({ books }) {
  const renderItem = ({ item: { selfLink, imageLink } }) => (
    <BookImage id={selfLink} selfLink={selfLink} imageLink={imageLink} />
  );
  return (
    <View>
      <FlatList
        horizontal
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.selfLink}
      />
    </View>
  );
}

BookSaved.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};
