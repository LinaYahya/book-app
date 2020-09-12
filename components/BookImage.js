import React from 'react';
import {
  Image, View, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

export default function BookImage({
  id, selfLink, imageLink, type,
}) {
  const navigation = useNavigation();

  return (
    <View key={id}>
      <TouchableHighlight onPress={() => navigation.navigate('Book Details', { imageLink, selfLink, type })}>
        <Image
          source={{ uri: imageLink }}
          style={{ width: 250, height: 250, margin: 25 }}
        />
      </TouchableHighlight>
    </View>
  );
}

BookImage.propTypes = {
  id: PropTypes.string.isRequired,
  selfLink: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

};
