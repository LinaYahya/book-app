import React from 'react';
import {
  StatusBar, StyleSheet, Platform, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import BookDetail from '../components/BookDetails';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
  },
});

export default function BookDetails({ route }) {
  return (
    <SafeAreaView style={styles.container}>
      <BookDetail bookPre={route.params.imageLink} />
    </SafeAreaView>
  );
}

BookDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  route: PropTypes.object.isRequired,
};
