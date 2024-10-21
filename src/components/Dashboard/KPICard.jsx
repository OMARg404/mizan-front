// src/components/Dashboard/KPICard.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './KPICard.css';

const KPICard = ({ title, value }) => {
  return (
    <div className="kpi-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

// Add prop validation
KPICard.propTypes = {
  title: PropTypes.string.isRequired, // Validate title as a required string
  value: PropTypes.string.isRequired, // Validate value as a required string
};

export default KPICard;
