import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useRouter } from 'expo-router';

const rnfes = (action, additionalInfo = "") => {
    console.log(`rnfes Action: ${action}`, additionalInfo);
};

export default function LoginScreen() {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            rnfes("auth state change detected");
            if (user) {
                rnfes("user authenticated", user.email);
                router.replace('/(tabs)/home');
            }
        });
        rnfes("auth listener setup");

        return () => {
            unsubscribe();
            rnfes("auth listener removed");
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                    rnfes("login button pressed");
                    router.push('/manualLogin');
                }}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => {
                    rnfes("sign up button pressed");
                    router.push('/manualSignup');
                }}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 20
    },
    title: {
        fontSize: 34,
        color: '#de5a0d',
        marginBottom: 10,
        fontWeight: "bold",
        marginBottom: 40,
        textAlign: 'center'
    },
    loginButton: {
        backgroundColor: '#de5a0d',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center'
    },
    signupButton: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
});
