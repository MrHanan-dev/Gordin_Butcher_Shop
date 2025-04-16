import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NotificationsContext } from "../context/NotificationsContext";

const rnfes = (tabName) => {
  console.log(`Tab clicked: ${tabName}`);
};

export default function Layout() {
  const { notifications } = useContext(NotificationsContext);
  const badgeCount = notifications.length;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#de5a0d",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#000",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          tabPress: () => rnfes("home"),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
          tabPress: () => rnfes("cart"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          tabPress: () => rnfes("profile"),
        }}
      />
      <Tabs.Screen
        name="product/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <View style={{}}>
              <Ionicons name="notifications" color={color} size={size} />
              {badgeCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badgeCount}</Text>
                </View>
              )}
            </View>
          ),
          tabPress: () => rnfes("notifications"),
        }}
      />
      <Tabs.Screen
        name="findus"
        options={{
          title: "Find Us",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" color={color} size={size} />
          ),
          tabPress: () => rnfes("findus"),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "white", fontSize: 10, fontWeight: "bold" },
});
