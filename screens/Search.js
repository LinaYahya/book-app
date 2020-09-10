import React from 'react';
import {
  Platform, StatusBar, Text, Button, SafeAreaView, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import BooksSection from '../components/Book';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function DetailsScreen({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Searchhhhhhhhhh</Text>
      <BooksSection books={route.params.books} />
      <Button title="Go back" onPress={() => navigation.goBack('Home')} />

    </SafeAreaView>
  );
}

DetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  route: PropTypes.object.isRequired,
};
