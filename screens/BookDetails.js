import React from 'react';
import {
  StatusBar, StyleSheet, Platform, SafeAreaView, Button, AsyncStorage,
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
  const saveToRead = async (imageLink) => {
    try {
      const bookToRead = JSON.parse(await AsyncStorage.getItem('TOREAD'));
      let bookToSave;
      if (bookToRead) {
        bookToSave = JSON.stringify([...bookToRead, {
          imageLink,
        }]);
      } else {
        bookToSave = JSON.stringify([{
          imageLink,
        }]);
      }
      await AsyncStorage.setItem('TOREAD', bookToSave);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BookDetail bookPre={route.params.imageLink}>
        <Button title="Want to read" onPress={() => saveToRead(route.params.imageLink)} />
      </BookDetail>
    </SafeAreaView>
  );
}

BookDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  route: PropTypes.object.isRequired,
};
