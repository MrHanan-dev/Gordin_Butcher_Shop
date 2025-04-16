import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { NotificationsContext } from "../context/NotificationsContext";

const rnfes = (action, details = '') => {
    console.log(`Action: ${action}, Details: ${details}`);
};

export default function NotificationsScreen() {
    const { notifications, clearNotifications } = useContext(NotificationsContext);

    const renderItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>
                {item.request.content.title}
            </Text>
            <Text style={styles.notificationBody}>
                {item.request.content.body}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            {notifications.length === 0 ? (
                <Text style={styles.emptyText}>No notifications</Text>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                    onRefresh={() => rnfes('notifications_refreshed', 'Refreshing notifications list')}
                    refreshing={false}
                />
            )}
            {notifications.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={() => {
                    rnfes('clear_notifications', 'Clearing all notifications');
                    clearNotifications();
                }}>
                    <Text style={styles.clearButtonText}>Clear Notifications</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#111", padding: 20 },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#de5a0d",
        textAlign: "left",
        marginBottom: 5,
        marginTop: 10,
        borderBottomWidth: 1,
        paddingVertical: 15,
        borderColor: '#de5a0d',
    },
    emptyText: { color: "#fff", textAlign: "center", marginTop: 20 },
    listContainer: { paddingBottom: 20 },
    notificationItem: {
        borderBottomColor: "#333",
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 5,
        backgroundColor: "#000",
        borderRadius : 8,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#de5a0d",
    },
    notificationBody: {
        fontSize: 16,
        color: "#fff",
        marginTop: 4,
    },
    clearButton: {
        marginTop: 20,
        backgroundColor: "#de5a0d",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    clearButtonText: { color: "#fff", fontSize: 18 },
});
