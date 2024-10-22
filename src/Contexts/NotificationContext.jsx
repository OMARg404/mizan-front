// src/contexts/NotificationContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the context
const NotificationContext = createContext();

// Create a provider component
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (title, description) => {
        const newNotification = {
            id: notifications.length + 1, // Simple ID generation
            title,
            description,
            timestamp: new Date().toLocaleString(), // Current timestamp
        };
        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

// Custom hook to use the notification context
export const useNotifications = () => useContext(NotificationContext);
