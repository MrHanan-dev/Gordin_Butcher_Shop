import React, { createContext, useState, useEffect } from "react";
import * as Notifications from "expo-notifications";

export const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(
            (notification) => {
                setNotifications((prev) => [...prev, notification]);
            }
        );
        return () => subscription.remove();
    }, []);

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <NotificationsContext.Provider value={{ notifications, clearNotifications }}>
            {children}
        </NotificationsContext.Provider>
    );
}
