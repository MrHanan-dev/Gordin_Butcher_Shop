import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

const rnfes = (action, details = '') => {
    console.log(`Action: ${action}, Details: ${details}`);
};

export default function ProfileScreen() {
    const user = getAuth().currentUser;
    const router = useRouter();

    const handleSignOut = () => {
        signOut(getAuth())
            .then(() => {
                rnfes('sign_out_success', 'User signed out');
                router.replace('/login');
            })
            .catch((error) => {
                rnfes('sign_out_error', 'Error signing out');
                alert('Error signing out.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            {user ? (
                <>
                    <Text style={styles.text}>Name: {user.displayName}</Text>
                    <Text style={styles.text}>Email: {user.email}</Text>
                    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.text}>No user information available.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        gap: 5,
        padding: 25,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
        borderBottomWidth : 1,
        borderColor: '#de5a0d',
        paddingBottom: 20,
    },
    text: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#de5a0d',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
});
