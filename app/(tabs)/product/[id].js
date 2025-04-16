import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { PRODUCTS } from '../../data/products';
import { CartContext } from '../../context/CartContext';

export default function ProductDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const product = PRODUCTS.find((p) => p.id === id);
    const { addToCart } = useContext(CartContext);

    if (!product) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Product not found.</Text>
            </View>
        );
    }

    const handleAddReviewPhoto = () => {
        router.push('/review');
    };

    const handleAddToCart = () => {
        addToCart(product);
        router.push('/cart');
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={product.image} style={styles.productImage} resizeMode="cover" />
            <View style={styles.detailContainer}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={(handleAddReviewPhoto)}>
                    <Text style={styles.addButtonText}>Add Review Photo</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    productImage: {
        width: '100%',
        height: 300,
    },
    detailContainer: {
        padding: 15,
        backgroundColor: '#eee',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    productPrice: {
        fontSize: 20,
        color: '#de5a0d',
        marginVertical: 10,
    },
    productDescription: {
        fontSize: 16,
        color: '#000',
    },
    addButton: {
        backgroundColor: '#de5a0d',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    errorText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
});
