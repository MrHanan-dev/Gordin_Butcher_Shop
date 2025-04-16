import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform, TextInput, ScrollView } 
from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';

export default function ReviewScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaPermission = await MediaLibrary.requestPermissionsAsync();
            const granted = cameraPermission.status === 'granted' && mediaPermission.status === 'granted';
            setHasPermission(granted);
            if (!granted) {
                Alert.alert('Permission Denied', 'Camera and media permissions are required.');
            }
        })();
    }, []);

    const rnfes = (action) => {
        console.log(`Action Triggered: ${action}`);
    };

    const takePicture = async () => {
        if (cameraRef) {
            const photoData = await cameraRef.takePictureAsync();
            setPhotoUri(photoData.uri);
            rnfes('capture photo');
        }
    };

    const saveToGallery = async () => {
        if (!name || !phone || !comment) {
            Alert.alert('Missing Info', 'Please fill out name, phone, and comment.');
            return;
        }

        try {
            await MediaLibrary.saveToLibraryAsync(photoUri);
            Alert.alert(
                "Review Saved",
                `Saved with Name: ${name}, Phone: ${phone}, Comment: ${comment}`
            );
            rnfes('save review');
            router.back();
        } catch (error) {
            Alert.alert("Error", "Failed to save photo.");
        }
    };

    if (Platform.OS === 'web') {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>Camera is not supported on web.</Text>
            </View>
        );
    }

    if (hasPermission === null) {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>Requesting permissions...</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>No access to camera or media library.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {photoUri ? (
                <>
                    <Image source={{ uri: photoUri }} style={styles.previewImage} resizeMode="cover" />
                    <TextInput
                        style={styles.input}
                        placeholder="Your Name"
                        placeholderTextColor="#aaa"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#aaa"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Your Comment"
                        placeholderTextColor="#aaa"
                        value={comment}
                        onChangeText={setComment}
                        multiline
                    />
                </>
            ) : (
                <CameraView style={styles.camera} ref={(ref) => setCameraRef(ref)} />
            )}

            <View style={styles.buttonsContainer}>
                {photoUri ? (
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => setPhotoUri(null)}>
                            <Text style={styles.buttonText}>Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={saveToGallery}>
                            <Text style={styles.buttonText}>Save Review</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.buttonText}>Capture Review Photo</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    camera: {
        width: '100%',
        height: 400,
    },
    previewImage: {
        width: '100%',
        height: 400,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#222',
        color: '#fff',
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#de5a0d',
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    messageText: {
        color: '#fff',
        fontSize: 18,
    },
});
