import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Platform,
  SafeAreaView,
  Button,
  AsyncStorage,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import BookDetail from '../components/BookDetails';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});

export default function BookDetails({ route }) {
  const [saved, setsaved] = useState(false);

  const saveToRead = async (imageLink, selfLink) => {
    try {
      const bookToRead = JSON.parse(await AsyncStorage.getItem('TOREAD'));
      let bookToSave;
      if (bookToRead) {
        bookToSave = JSON.stringify([
          ...bookToRead,
          {
            imageLink,
            selfLink,
          },
        ]);
      } else {
        bookToSave = JSON.stringify([
          {
            imageLink,
            selfLink,
          },
        ]);
      }
      await AsyncStorage.setItem('TOREAD', bookToSave);
      setsaved(true);
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (selfLink) => {
    try {
      const bookToRead = JSON.parse(await AsyncStorage.getItem('TOREAD'));
      const remainBooks = bookToRead.filter((e) => e.selfLink !== selfLink);
      await AsyncStorage.setItem('TOREAD', JSON.stringify(remainBooks));
      setsaved(false);
    } catch (err) {
      console.log(err);
    }
  };
  const markAsRead = async (imageLink, selfLink) => {
    try {
      await removeItem(selfLink);
      const bookToRead = JSON.parse(await AsyncStorage.getItem('READ'));
      let bookToSave;
      if (bookToRead) {
        bookToSave = JSON.stringify([
          ...bookToRead,
          {
            imageLink,
            selfLink,
          },
        ]);
      } else {
        bookToSave = JSON.stringify([
          {
            imageLink,
            selfLink,
          },
        ]);
      }
      await AsyncStorage.setItem('READ', bookToSave);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <BookDetail bookPre={route.params.selfLink}>
        {route.params.type === 'search' ? (
          <Button
            color={!saved ? 'blue' : 'red'}
            title={!saved ? 'Want to-read' : 'Remove from saved'}
            onPress={() => {
              if(!saved){
                saveToRead(route.params.imageLink, route.params.selfLink)
              } else {
                removeItem(route.params.selfLink);
              }
            }}
          />
        ) : (
          route.params.type === 'saved' && (
            <View style={styles.buttonsContainer}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <Button
                  title="Remove"
                  onPress={() => removeItem(route.params.selfLink)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="Mark as read"
                  onPress={() => markAsRead(route.params.imageLink, route.params.selfLink)}
                />
              </View>
            </View>
          )
        )}
      </BookDetail>
    </SafeAreaView>
  );
}

BookDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  route: PropTypes.object.isRequired,
};
