import AsyncStorage from '@react-native-async-storage/async-storage';

export const PRODUCTS = [
    {
        id: '1',
        name: 'Beef Steak',
        image: require('../../assets/products/beef_steak.jpg'),
        price: 15.99,
        description: 'Tender and juicy beef steak.',
        recipe: 'Recipe details for Beef Steak', 
    },
    {
        id: '2',
        name: 'Lamb Chops',
        image: require('../../assets/products/pork_chops.jpg'),
        price: 12.99,
        description: 'Delicious pork chops with rich flavor.',
        recipe: 'Recipe details for Lamb Chops',  
    },
    {
        id: '3',
        name: 'Chicken Breast',
        image: require('../../assets/products/chicken_breast.jpg'),
        price: 9.99,
        description: 'Fresh chicken breast, perfect for grilling.',
        recipe: 'Recipe details for Chicken Breast', 
    },
];

const saveProductsOffline = async () => {
    try {
        await AsyncStorage.setItem('@products', JSON.stringify(PRODUCTS));
        console.log('Products saved offline');
    } catch (e) {
        console.error('Failed to save products offline', e);
    }
};

const loadProductsOffline = async () => {
    try {
        const productsData = await AsyncStorage.getItem('@products');
        if (productsData !== null) {
            return JSON.parse(productsData);
        }
        return PRODUCTS;  
    } catch (e) {
        console.error('Failed to load products', e);
        return PRODUCTS;  
    }
};

export { saveProductsOffline, loadProductsOffline };
