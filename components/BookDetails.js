import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Image } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function BookDetails({ bookPre }) {
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
    <View>
      {book && (
        <View>
          <Image
            source={{ uri: book.imageLinks.thumbnail }}
            style={{ width: 200, height: 200 }}
          />
          <Text>{book.title}</Text>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 4}
            style={{ lineHeight: 21 }}
          >
            {book.description.replace(/<p>/gi, '')}
          </Text>
          {lengthMore ? (
            <Text
              onPress={toggleNumberOfLines}
              style={{ lineHeight: 21, marginTop: 10 }}
            >
              {textShown ? 'Read less...' : 'Read more...'}
            </Text>
          ) : null}
          <Text>
            page counts:
            {book.pageCount}
          </Text>
          <Text>
            by
            {book.authors?.map((e) => `${e} `)}
          </Text>
          <View>
            <Text>
              {renderStars(4)}
              from
              {' '}
              {book.ratingsCount}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
BookDetails.propTypes = {
  bookPre: PropTypes.string.isRequired,
};
