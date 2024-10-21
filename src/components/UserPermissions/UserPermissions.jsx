import React, { useState } from 'react';
import './UserPermissions.css'; // Custom CSS for styling

const initialUsers = [
    { id: 1, name: 'أحمد', role: 'مدير', permissions: ['إضافة', 'تعديل', 'حذف'] },
    { id: 2, name: 'سارة', role: 'موظف', permissions: ['عرض'] },
];

const allPermissions = ['إضافة', 'تعديل', 'حذف', 'عرض']; // All available permissions

const UserPermissions = () => {
    const [users, setUsers] = useState(initialUsers);
    const [newUser, setNewUser] = useState({ name: '', role: '', permissions: [] });
    const [editMode, setEditMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const addUser = () => {
        if (!newUser.name || !newUser.role) return; // Simple validation
        if (editMode) {
            // Edit existing user
            setUsers(users.map(user => (user.id === currentUserId ? { ...newUser, id: currentUserId } : user)));
            setEditMode(false);
        } else {
            // Add new user
            setUsers([...users, { id: users.length + 1, ...newUser }]);
        }
        setNewUser({ name: '', role: '', permissions: [] }); // Reset form
    };

    const editUser = (user) => {
        setNewUser(user);
        setEditMode(true);
        setCurrentUserId(user.id);
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const togglePermission = (permission) => {
        setNewUser(prev => {
            const permissions = prev.permissions.includes(permission)
                ? prev.permissions.filter(p => p !== permission) // Remove if exists
                : [...prev.permissions, permission]; // Add if not exists
            return { ...prev, permissions };
        });
    };

    return (
        <div className="container mt-4">
            <h1 className="page-title">أذونات المستخدم</h1>
            <p>إدارة أذونات المستخدمين في النظام.</p>

            <h2 className="section-title">{editMode ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}</h2>
            <div className="mb-4 user-form">
                <input
                    type="text"
                    placeholder="اسم المستخدم"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    placeholder="الدور"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="form-control mb-2"
                />
                <div className="permissions-list mb-2">
                    {allPermissions.map(permission => (
                        <label key={permission} className="permission-checkbox">
                            <input
                                type="checkbox"
                                checked={newUser.permissions.includes(permission)}
                                onChange={() => togglePermission(permission)}
                            />
                            {permission}
                        </label>
                    ))}
                </div>
                <button className="btn btn-primary" onClick={addUser}>
                    {editMode ? 'تحديث المستخدم' : 'إضافة مستخدم'}
                </button>
            </div>

            <h2 className="section-title">قائمة المستخدمين</h2>
            <table className="table user-table">
                <thead>
                    <tr>
                        <th>اسم المستخدم</th>
                        <th>الدور</th>
                        <th>الأذونات</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.permissions.join(', ')}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => editUser(user)}>
                                    تعديل
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>
                                    حذف
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserPermissions;
