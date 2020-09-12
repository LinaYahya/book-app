import React from 'react';
import {
  Image, View, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

export default function BookImage({ id, selfLink, volumeInfo }) {
  const navigation = useNavigation();

  return (
    <View key={id}>
      <TouchableHighlight onPress={() => navigation.navigate('Book Details', { imageLink: volumeInfo.imageLinks.thumbnail, selfLink })}>
        <Image
          source={{ uri: volumeInfo.imageLinks.thumbnail }}
          style={{ width: 250, height: 250, margin: 25 }}
        />
      </TouchableHighlight>
    </View>
  );
}

BookImage.propTypes = {
  id: PropTypes.string.isRequired,
  selfLink: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  volumeInfo: PropTypes.object.isRequired,
};
