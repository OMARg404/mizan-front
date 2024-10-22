import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.rtl.min.css'; // Ensure you use the RTL version of Bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faDollarSign, 
    faHistory, 
    faClipboardCheck, 
    faSitemap, 
    faUserShield, 
    faFileAlt, 
    faTachometerAlt, 
    faUser, 
    faUserPlus,
    faBell // Import the bell icon
} from '@fortawesome/free-solid-svg-icons'; // Import icons
import './Navbar.css'; // Import custom CSS for additional styling

const Navbar = () => {
    const isLoggedIn = true; // Change this based on your user state
    const [notificationCount, setNotificationCount] = useState(5); // Example notification count

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark-blue">
            <div className="container-fluid">
                <Link className="navbar-brand large-brand animated-brand" to="/" >
                    <FontAwesomeIcon icon={faHome} /> &nbsp; ميزان
                </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {[
                            { to: '/budget', icon: faDollarSign, label: 'الميزانية' },
                            { to: '/historical-records', icon: faHistory, label: 'السجلات التاريخية' },
                            { to: '/reserve-amounts', icon: faClipboardCheck, label: 'مبالغ الاحتياطي وطلبات الميزانية' },
                            { to: '/organizational-structure', icon: faSitemap, label: 'الهيكل التنظيمي' },
                            { to: '/user-permissions', icon: faUserShield, label: 'أذونات المستخدم' },
                            { to: '/reports', icon: faFileAlt, label: 'التقارير' },
                            { to: '/dashboard', icon: faTachometerAlt, label: 'لوحة القيادة' }
                        ].map((item, index) => (
                            <li className="nav-item" key={index}>
                                <Link className="nav-link" to={item.to}>
                                    <FontAwesomeIcon icon={item.icon} /> &nbsp; {item.label}
                                </Link>
                            </li>
                        ))}
                        <li className="nav-item position-relative">
                            <Link className="nav-link" to="/notifications">
                                <FontAwesomeIcon icon={faBell} /> &nbsp; الإشعارات
                                {notificationCount > 0 && (
                                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                                        {notificationCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={isLoggedIn ? "/profile" : "/register"}>
                                <FontAwesomeIcon icon={isLoggedIn ? faUser : faUserPlus} /> &nbsp; {isLoggedIn ? "عرض الملف الشخصي" : "تسجيل"}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
