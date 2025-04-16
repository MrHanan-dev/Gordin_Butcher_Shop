import React, { createContext, useState } from "react";
import * as Notifications from "expo-notifications";
export const CartContext = createContext();
export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const rnfes = (action, product) => {
        console.log(`Action Triggered: ${action}`);
        if (product) {
            console.log(`Product: ${product.name}, ID: ${product.id}`);
        }
    };
    const addToCart = async (product) => {
        setCart((prev) => [...prev, product]);
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Cart Updated",
                body: `${product.name} has been added to your cart!`,
                sound: "default", 
                data: { productId: product.id },
            },
            trigger: null, 
        });
        rnfes("add to cart", product);
    };
    const removeFromCart = (productId) => {
        const productToRemove = cart.find((item) => item.id === productId);
        setCart((prev) => prev.filter((item) => item.id !== productId));
        if (productToRemove) {
            rnfes("remove from cart", productToRemove);
        }
    };

    const clearCart = () => {
        setCart([]);
        rnfes("clear cart");
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
