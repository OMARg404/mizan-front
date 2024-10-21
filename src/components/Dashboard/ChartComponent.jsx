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
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'], // Arabic months
        datasets: [
          {
            label: 'الإيرادات (Revenue)', // Arabic label
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
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
