import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useRouter } from 'expo-router';

const rnfes = (action, additionalInfo = "") => {
    console.log(`rnfes Action: ${action}`, additionalInfo);
};

export default function ManualLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleManualLogin = async () => {
        if (!email.trim() || !password) {
            Alert.alert('Validation Error', 'Please enter both email and password.');
            rnfes("validation error", "email or password missing");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            rnfes("login success", userCredential.user.email);
            Alert.alert('Login Success', `Welcome back, ${userCredential.user.name}!`);
            router.replace('/(tabs)/home');
        } catch (error) {
            let msg;
            switch (error.code) {
                case 'auth/user-not-found':
                    msg = 'No user found with that email address.';
                    break;
                case 'auth/wrong-password':
                    msg = 'Incorrect password. Please try again.';
                    break;
                case 'auth/operation-not-allowed':
                    msg = 'Email/password sign-in is disabled in Firebase console.';
                    break;
                default:
                    msg = error.message;
            }
            rnfes("login error", msg);
            Alert.alert('Login Error', msg);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleManualLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/manualSignup')}>
                <Text style={styles.linkText}>Don't have an account? <Text style={{ color: '#de5a0d' }}>Sign Up</Text></Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        color: '#de5a0d',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 8,
        color: '#fff',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#de5a0d',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    linkText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
    },
});
