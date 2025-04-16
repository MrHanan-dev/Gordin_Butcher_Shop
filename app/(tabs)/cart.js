import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'expo-router';

const rnfes = (action, itemName) => {
    console.log(`Action: ${action}, Item: ${itemName}`);
};

export default function CartScreen() {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const router = useRouter();

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity
                onPress={() => {
                    removeFromCart(item.id);
                    rnfes('remove', item.name);
                }}
            >
                <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            {cart.length === 0 ? (
                <Text style={styles.emptyText}>Your cart is empty.</Text>
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            )}
            <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
            <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => {
                    clearCart();
                    rnfes('checkout');
                    alert('Checkout complete!');
                    router.replace('/home');
                }}
            >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#de5a0d',
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#de5a0d',
        paddingVertical: 15,
    },
    emptyText: {
        color: '#fff',
        fontSize: 18,
        marginVertical: 20,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
    },
    itemText: {
        color: '#fff',
        fontSize: 16,
    },
    removeText: {
        color: '#de5a0d',
        fontSize: 16,
    },
    totalText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'left',
        marginTop: 15,
    },
    checkoutButton: {
        backgroundColor: '#de5a0d',
        padding: 15,
        borderRadius: 8,
        marginTop: 15,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});
