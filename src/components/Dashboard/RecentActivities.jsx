// src/components/Dashboard/RecentActivities.jsx
import React from 'react';
import './RecentActivities.css';

const RecentActivities = () => {
  return (
    <div className="recent-activities-container">
      <h2 className="recent-activities-title">الأنشطة الأخيرة</h2>
      {/* Example list of activities */}
      <ul className="recent-activities-list">
        <li>نشاط 1: تم إضافة ميزانية جديدة.</li>
        <li>نشاط 2: تم تحديث السجلات التاريخية.</li>
        <li>نشاط 3: تم تعديل هيكل التنظيم.</li>
      </ul>
    </div>
  );
};

export default RecentActivities;
