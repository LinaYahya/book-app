import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BookDetail from '../components/BookDetails';

export default function BookDetails({ route }) {
  return (
    <View>
      <BookDetail bookPre={route.params.imageLink} />
    </View>
  );
}

BookDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  route: PropTypes.object.isRequired,
};
