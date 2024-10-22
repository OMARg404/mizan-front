// src/App.jsx
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Budget from './components/Budget/Budget';
import HistoricalRecords from './components/HistoricalRecords/HistoricalRecords';
import ReserveAmounts from './components/ReserveAmounts/ReserveAmounts';
import OrganizationalStructure from './components/OrganizationalStructure/OrganizationalStructure';
import UserPermissions from './components/UserPermissions/UserPermissions';
import Reports from './components/Reports/Reports';
import Dashboard from './components/Dashboard/DashboardPage';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';



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
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Footer />
            </Router>
       
    );
}

export default App;
