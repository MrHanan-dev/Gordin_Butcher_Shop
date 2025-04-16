import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { PRODUCTS } from '../data/products';

const rnfes = (action, details = '') => {
    console.log(`Action: ${action}, Details: ${details}`);
};

export default function HomeScreen() {
    const router = useRouter();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => {
                rnfes('product_selected', `Product ID: ${item.id}`);
                router.push(`/(tabs)/product/${item.id}`);
            }}
        >
            <Image source={item.image} style={styles.productImage} resizeMode="cover" />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Gordin's Butcher Shop</Text>
                <Text style={styles.headerSubtitle}>Fresh & Quality Meats Delivered Daily</Text>
            </View>

            <FlatList
                data={PRODUCTS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                onRefresh={() => rnfes('products_refreshed', 'Refreshing products list')}
                refreshing={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111', 
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: '#111', 
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#de5a0d', 
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#fff',
    },
    listContainer: {
        padding: 20,
    },
    productCard: {
        backgroundColor: '#000',
        borderColor: '#de5a0d',
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 30,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: 200,
    },
    productInfo: {
        padding: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#de5a0d',
    },
    productPrice: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
});
