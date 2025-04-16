import { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, auth } from '../config/firebase';

const rnfes = (action, additionalInfo = "") => {
    console.log(`rnfes Action: ${action}`, additionalInfo);
};

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            rnfes("auth state change detected");

            setTimeout(() => {
                if (user) {
                    rnfes("user authenticated", user.email); 
                    router.replace('/(tabs)/home');
                } else {
                    rnfes("user not authenticated");
                    router.replace('/login');
                }
            }, 1500);
        });

        rnfes("auth listener setup");

        return () => {
            unsubscribe();
            rnfes("auth listener removed");
        };
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/icons/GordinLogo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 350,
        height: 350,
    },
});
