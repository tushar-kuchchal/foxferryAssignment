
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Detail from './Details';


type Item = {
    id: number;
    title: string;
    description: string;
}

const API_URL = 'https://dummyjson.com/products';

const fetchData = async (): Promise<Item[]> => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};



const computeDetails = (item: Item): string => {

    const startTime = performance.now();
    // calculate heavy computation
    const details = `Details:- ${item.description}`;
    // end computation
    const endTime = performance.now();
    console.log(`Time taken for heavy computation: ${endTime - startTime} ms`);
    return details;
};


function Data() {
    const [data, setData] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    useEffect(() => {
        const fetchDataAndSetData = async () => {
            const fetchedData = await fetchData();
            setData(fetchedData);
        };

        fetchDataAndSetData();
    }, []);

    const renderItem = ({ item }: { item: Item }) => (
        <ListItem item={item} onPress={() => updateId(item)} />
    );


    const updateId = useCallback((item: Item) => {
        setSelectedItem(item);
    }, []);

    return (
        <>
            {selectedItem &&
                <Detail id={selectedItem.id} />}
            <View />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />

        </>
    );
}



const ListItem: React.FC<{ item: Item; onPress: any }> = React.memo(
    ({ item, onPress }) => {

        const computedDetails = useMemo(
            () => computeDetails(item),
            [item]);
        return (
            <TouchableOpacity onPress={() => onPress(item)}>
                <View style={styles.listcontainer}>
                    <Text style={styles.idColor}>{item.id}</Text>
                    <Text>{item.title}</Text>
                    <Text>{computedDetails}</Text>
                </View>
            </TouchableOpacity>
        );
    }
);


const styles = StyleSheet.create({
    listcontainer:
    {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    idColor: { color: 'red' },
});

export default Data;
