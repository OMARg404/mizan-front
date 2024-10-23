// src/components/Dashboard/DashboardPage.jsx
import React from 'react';
import KPICard from './KPICard';
import ChartComponent from './ChartComponent';
import RecentActivities from './RecentActivities';
import './DashboardPage.css'; // Ensure you have this file for styles

const DashboardPage = () => {
  // Sample data for KPIs
  const kpis = [
    { title: 'التخصيص (Allocation)', value: '$50,000' }, // Updated KPI for Allocation
    { title: 'المصروف (Expenditure)', value: '$30,000' }, // Updated KPI for Expenditure
    { title: 'النمو الشهري (Monthly Growth)', value: '10%' }, // Optional: If you want to keep this
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
