import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'; // Import your custom CSS for additional styling
import heroImage from "../../assets/mixan3.jpg"; // Replace with your hero image path
import budgetIcon from '../../assets/mixan2.jpg'; // Replace with your budget icon path
import dashboardIcon from '../../assets/mixan5.jpg'; // Replace with your dashboard icon path
import reportsIcon from '../../assets/mixan4.jpg'; // Replace with your reports icon path

const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="hero-section">
                <img src={heroImage} alt="Hero" className="hero-image" />
                <div className="hero-content">
                    <h1>Welcome to ميزان</h1>
                    <p>Your go-to platform for budget management and organizational structure.</p>
                    <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
                </div>
            </div>

            {/* Key Functionalities Section */}
            <div className="container my-5">
                <h2 className="text-center mb-4">Key Features</h2>
                <div className="row">
                    {/* Budget Card */}
                    <div className="col-md-4 mb-4">
                        <div className="card text-center">
                            <img src={budgetIcon} alt="Budget" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">الميزانية</h5>
                                <p className="card-text">Manage your budget effectively.</p>
                                <Link to="/budget" className="btn btn-secondary">Learn More</Link>
                            </div>
                        </div>
                    </div>
                    {/* Dashboard Card */}
                    <div className="col-md-4 mb-4">
                        <div className="card text-center">
                            <img src={dashboardIcon} alt="Dashboard" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">لوحة القيادة</h5>
                                <p className="card-text">Get insights at a glance.</p>
                                <Link to="/dashboard" className="btn btn-secondary">Learn More</Link>
                            </div>
                        </div>
                    </div>
                    {/* Reports Card */}
                    <div className="col-md-4 mb-4">
                        <div className="card text-center">
                            <img src={reportsIcon} alt="Reports" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">التقارير</h5>
                                <p className="card-text">Generate detailed reports.</p>
                                <Link to="/reports" className="btn btn-secondary">Learn More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section (Optional) */}
            <div className="container my-5">
                <h2 className="text-center mb-4">What Our Users Say</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="testimonial-card">
                            <p>Mizan has changed the way I manage my budget !</p>
                            <h5>- User Name</h5>
                        </div>
                    </div>
                    {/* Add more testimonials as needed */}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
