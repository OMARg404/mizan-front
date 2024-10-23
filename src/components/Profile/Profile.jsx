// src/components/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import './Profile.css'; // Adjusted path for CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    permissions: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  // Simulated fetch user data function
  useEffect(() => {
    // Simulated user data fetch
    const fetchUserData = () => {
      // This could be replaced with an actual API call
      const userData = {
        name: 'محمد',
        email: 'mohamed@example.com',
        role: 'مدير',
        permissions: ['إضافة مستخدم', 'تعديل مستخدم'],
      };
      setUser(userData);
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the updated user data
    setMessage('تم تحديث الملف الشخصي بنجاح');
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1>صفحة الملف الشخصي</h1>
      {message && <div className="alert alert-info">{message}</div>}
      <div className="profile-details">
        <div className="form-group">
          <label>الاسم:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>
        <div className="form-group">
          <label>البريد الإلكتروني:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>
        <div className="form-group">
          <label>الدور:</label>
          <p>{user.role}</p>
        </div>
        <div className="form-group">
          <label>الأذونات:</label>
          <p>{user.permissions.join(', ') || 'لا توجد أذونات'}</p>
        </div>
        <div className="profile-actions">
          {isEditing ? (
            <button onClick={handleSave} className="btn btn-success">
              <FontAwesomeIcon icon={faSave} /> حفظ
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn btn-primary">
              <FontAwesomeIcon icon={faUserEdit} /> تعديل
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
