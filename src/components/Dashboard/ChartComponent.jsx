// src/components/Dashboard/ChartComponent.jsx
import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import './ChartComponent.css';

Chart.register(...registerables);

const ChartComponent = () => {
  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar', // or 'line', 'pie', etc.
      data: {
        labels: [
          'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 
          'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 
          'نوفمبر', 'ديسمبر'
        ], // Arabic months
        datasets: [
          {
            label: 'التخصيص (Allocation)', // Arabic label for allocation
            data: [20000, 15000, 30000, 25000, 40000, 22000, 27000, 31000, 29000, 35000, 23000, 45000], // Sample data for allocation
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'المصروف (Expenditure)', // Arabic label for expenditure
            data: [10000, 20000, 15000, 10000, 25000, 12000, 18000, 24000, 20000, 22000, 17000, 29000], // Sample data for expenditure
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'القيمة (Value)', // Arabic title for Y-axis
            },
          },
          x: {
            title: {
              display: true,
              text: 'الشهر (Month)', // Arabic title for X-axis
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy(); // Cleanup the chart on unmount
    };
  }, []);

  return (
    <div className="chart-container">
      <h2 className="chart-title">قسم الرسم البياني (Chart Section)</h2>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default ChartComponent;
