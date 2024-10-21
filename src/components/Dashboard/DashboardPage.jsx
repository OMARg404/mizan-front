// src/components/Dashboard/DashboardPage.jsx
import React from 'react';
import KPICard from './KPICard';
import ChartComponent from './ChartComponent';
import RecentActivities from './RecentActivities';
import './DashboardPage.css'; // Ensure you have this file for styles

const DashboardPage = () => {
  // Sample data for KPIs
  const kpis = [
    { title: 'إجمالي الإيرادات (Total Revenue)', value: '$100,000' },
    { title: 'إجمالي المستخدمين (Total Users)', value: '1,500' },
    { title: 'النمو الشهري (Monthly Growth)', value: '10%' },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">لوحة القيادة (Dashboard)</h1>
      <div className="kpi-cards">
        {kpis.map((kpi, index) => (
          <KPICard key={index} title={kpi.title} value={kpi.value} />
        ))}
      </div>
      <div className="chart-section">
        <ChartComponent />
      </div>
      <div className="recent-activities-section">
        <RecentActivities />
      </div>
    </div>
  );
};

export default DashboardPage;
