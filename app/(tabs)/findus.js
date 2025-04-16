import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, Platform, TouchableOpacity, Linking } 
from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";


const rnfes = (action, details = '') => {
    console.log(`Action: ${action}, Details: ${details}`);
};

export default function FindUsScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const storeLocation = {
        latitude: -36.901396663814715,
        longitude: 174.72303538586385,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                Alert.alert(
                    "Permission Denied",
                    "Please enable location permissions in settings to see your current location."
                );
                rnfes('permission_denied', 'Location access denied');
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
            rnfes('location_fetched', `Current location: ${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}`);
        })();
    }, []);

    if (Platform.OS === "web") {
        return (
            <View style={styles.webContainer}>
                <Text style={styles.webText}>Map is not supported on web.</Text>
            </View>
        );
    }

    if (!location && !errorMsg) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#C8102E" />
            </View>
        );
    }

    const openDirections = () => {
        const destination = `${storeLocation.latitude},${storeLocation.longitude}`;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                    rnfes('directions_opened', `Opening directions to ${destination}`);
                } else {
                    Alert.alert("Error", "Unable to open the maps app");
                    rnfes('directions_error', 'Unable to open maps app');
                }
            })
            .catch((err) => {
                console.error("An error occurred", err);
                rnfes('directions_error', `Error: ${err.message}`);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find Us</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: storeLocation.latitude,
                    longitude: storeLocation.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
            >
                <Marker
                    coordinate={storeLocation}
                    title="Our Store"
                    description="Gordin's Butcher Shop"
                    pinColor="#C8102E"
                />
                {location && (
                    <Marker
                        coordinate={location}
                        title="Your Location"
                        pinColor="#00f"
                    />
                )}
            </MapView>
            {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

            <TouchableOpacity style={styles.directionsButton} onPress={openDirections}>
                <Text style={styles.directionsText}>Get Directions</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#de5a0d",
        textAlign: "center",
        marginBottom: 5,
        marginTop: 15,
        paddingVertical: 10,
    },
    map: {
        flex: 1,
    },
    loader: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "#fff",
        textAlign: "center",
        marginTop: 10,
    },
    webContainer: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    webText: {
        color: "#fff",
        fontSize: 18,
    },
    directionsButton: {
        backgroundColor: "#de5a0d",
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 15,
    },
    directionsText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
