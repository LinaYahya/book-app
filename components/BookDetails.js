import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import axios from "axios";

export default function BookDetails({bookPre}) {
  const [book, setBook] = useState();

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

  const renderStars = (no) => {
    for (let i = no; i > 0; i--) {
      return (<span>⭐</span>)
    }
  };
  return (
    <View>
      {book && (
        <View>
          <Image source={{ uri: book.imageLinks.thumbnail }}  style={{width: 200, height: 200}} />
          <Text>{book.title}</Text>
          <Text>{book.description.replace(/<p>/gi, '')}</Text>
          <Text>page counts: {book.pageCount}</Text>
          <Text>by {book.authors?.map((e) => e + " ")}</Text>
          <View>
            <Text>
            from {book.ratingsCount}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
