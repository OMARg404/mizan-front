// src/App.jsx
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; // Adjusted path
import HomePage from './components/HomePage/HomePage'; // Adjusted path
import Budget from './components/Budget/Budget'; // Adjusted path
import HistoricalRecords from './components/HistoricalRecords/HistoricalRecords'; // Adjusted path
import ReserveAmounts from './components/ReserveAmounts/ReserveAmounts'; // Adjusted path
import OrganizationalStructure from './components/OrganizationalStructure/OrganizationalStructure'; // Adjusted path
import UserPermissions from './components/UserPermissions/UserPermissions'; // Adjusted path
import Reports from './components/Reports/Reports'; // Adjusted path
import Dashboard from './components/Dashboard/DashboardPage'; // Adjusted path
import Footer from './components/Footer/Footer'; // Adjusted path

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/historical-records" element={<HistoricalRecords />} />
        <Route path="/reserve-amounts" element={<ReserveAmounts />} />
        <Route path="/organizational-structure" element={<OrganizationalStructure />} />
        <Route path="/user-permissions" element={<UserPermissions />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer /> {/* Add Footer here */}
    </Router>
  );
}

export default App;
