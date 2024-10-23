// src/components/Notification/Notification.jsx
import React from 'react';
import './Notification.css'; // Import the CSS file

const notifications = [
    { id: 1, message: 'لديك موعد جديد محدد في 25 أكتوبر 2024.', timestamp: '2024-10-21 10:30' },
    { id: 2, message: 'تم تحديث وصفة الدواء الخاصة بك.', timestamp: '2024-10-20 14:00' },
    { id: 3, message: 'رسالة جديدة من طبيبك.', timestamp: '2024-10-19 09:15' },
    { id: 4, message: 'فحص صحتك مقرر الأسبوع المقبل.', timestamp: '2024-10-18 08:00' },
];

const Notification = () => {
    return (
        <div className="notification-container">
            <h1>الإشعارات</h1> {/* Updated header to Arabic */}
            <div className="notification-list">
                {notifications.map((notification) => (
                    <div className="notification-item" key={notification.id}>
                        <p>{notification.message}</p>
                        <span className="timestamp">{notification.timestamp}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;
