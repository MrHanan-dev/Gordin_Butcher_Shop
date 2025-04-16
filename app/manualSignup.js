import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useRouter } from 'expo-router';

const rnfes = (action, additionalInfo = "") => {
    console.log(`rnfes Action: ${action}`, additionalInfo);
};

export default function ManualSignup() {
    const router = useRouter();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        if (!displayName.trim() || !email.trim() || !password) {
            Alert.alert('Validation Error', 'Name, Email, and Password are required.');
            rnfes("validation error", "name, email or password missing");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(userCredential.user, { displayName: displayName.trim() });

            rnfes("signup success", `Account created for ${displayName}!`);
            Alert.alert('Signup Success', `Account created for ${displayName}!`);
            router.replace('/(tabs)/home');
        } catch (error) {
            let msg;
            switch (error.code) {
                case 'auth/email-already-in-use':
                    msg = 'That email is already in use. Try logging in instead.';
                    break;
                case 'auth/invalid-email':
                    msg = 'Invalid email. Please enter a valid email address.';
                    break;
                case 'auth/operation-not-allowed':
                    msg = 'Email/password sign-up is disabled in Firebase console.';
                    break;
                case 'auth/weak-password':
                    msg = 'Your password is too weak. Try something stronger.';
                    break;
                default:
                    msg = error.message;
            }
            rnfes("signup error", msg);
            Alert.alert('Signup Error', `Firebase: ${msg}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#aaa"
                value={displayName}
                onChangeText={setDisplayName}
            />
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
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/manualLogin')}>
                <Text style={styles.linkText}>Already have an account? <Text style={{ color: '#de5a0d'}}>Login</Text></Text>
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
        fontSize: 24,
        fontWeight: 'bold',
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
