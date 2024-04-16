import { View, Text, StyleSheet } from 'react-native';
import React, { memo, useEffect, useState } from 'react';


type props = {
  id: number;
}


type Item = {
  id: number;
  title: string;
  description: string;
}


const API_URL = 'https://dummyjson.com/products';
const Detail = ({ id }: props) => {
  const [details, setDetails] = useState<Item | null>();

console.log('details component call');
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        const data: Item = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details:', error);
        setDetails(null);
      }
    };

    fetchDetails();
  }, [id]);
  return (
    <View style={styles.listcontainer}>
      <Text  style={styles.idColor}>{details?.id}</Text>
      <Text>{details?.title}</Text>
      <Text>{details?.description}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  listcontainer:
  {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  },
  idColor:{ color: 'green' },
});

export default memo(Detail);
