import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import custom CSS for footer styling

const Footer = () => {
    return (
        <footer className="footer bg-dark-blue text-white text-center py-3">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} ميزان. جميع الحقوق محفوظة.</p>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <Link className="text-white" to="/about">حول</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="text-white" to="/privacy">سياسة الخصوصية</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="text-white" to="/terms">الشروط والأحكام</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
