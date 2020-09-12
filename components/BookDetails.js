/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Text, View, Image, ScrollView, StyleSheet,
} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  text: { marginBottom: 5 },
  titleText: { fontSize: 18, fontWeight: 'bold' },
  thumbnail: { width: '60%', height: 300, resizeMode: 'contain' },
});

const TextLabelInfo = ({ titleText, bodyText }) => (
  <Text style={styles.text}>
    <Text style={styles.titleText}>
      {titleText}
    </Text>
    <Text>{bodyText}</Text>
  </Text>
);

export default function BookDetails({ bookPre, children }) {
  const [book, setBook] = useState();
  const [textShown, setTextShown] = useState(false); // To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false);

  const getBookInfo = async (bookURL) => {
    try {
      const { data } = await axios(bookURL);
      setBook(data.volumeInfo);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookInfo(bookPre);
  }, [bookPre]);

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4); // to check the text is more than 4 lines or not
  }, []);

  const renderStars = (no) => {
    let stars = '';
    for (let i = no; i > 0; i -= 1) {
      stars += '⭐';
    }
    return stars;
  };

  const toggleNumberOfLines = () => { // To toggle the show text or hide it
    setTextShown(!textShown);
  };

  return (
    <View style={{ margin: 25 }}>
      {book && (
        <ScrollView>
          <Image
            source={{ uri: book.imageLinks.thumbnail }}
            style={styles.thumbnail}
          />
          <Text>
            <Text style={[styles.titleText, { paddingBottom: 10 }]}>{book.title}</Text>
            <Text>{renderStars(4)}</Text>
          </Text>

          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 4}
            style={{ lineHeight: 21 }}
          >
            {book.description?.replace(/<p>/gi, '')}
          </Text>
          {lengthMore ? (
            <Text
              onPress={toggleNumberOfLines}
              style={{ lineHeight: 21, marginTop: 5, fontWeight: 'bold' }}
            >
              {textShown ? 'Read less...' : 'Read more...'}
            </Text>
          ) : null}

          <TextLabelInfo titleText="page counts: " bodyText={book.pageCount} />
          <TextLabelInfo titleText="By: " bodyText={book.authors?.map((e) => `${e}, `)} />
          {children}

        </ScrollView>
      )}
    </View>
  );
}
TextLabelInfo.propTypes = {
  titleText: PropTypes.any.isRequired,
  bodyText: PropTypes.any.isRequired,
};

BookDetails.propTypes = {
  bookPre: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
