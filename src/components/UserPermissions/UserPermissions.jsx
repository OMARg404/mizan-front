import React, { useState } from 'react';
import './UserPermissions.css'; // Custom CSS for styling

const initialUsers = [
    { id: 1, name: 'أحمد', role: 'مدير', permissions: ['إضافة', 'تعديل', 'حذف'] },
    { id: 2, name: 'سارة', role: 'موظف', permissions: ['عرض'] },
    { id: 3, name: "رئيس", role: "رئيس", permissions: ["Addbudgets", "Editbudgets", "Viewbudgets", "Addexpenses", "Editexpenses", "Viewexpenses", "Controller"] },
    { id: 4, name: "مشرف عام", role: "مشرف عام", permissions: ["Add"] },
    { id: 5, name: "نائب", role: "نائب", permissions: ["Add"] },
    { id: 6, name: "مدير عام", role: "مدير عام", permissions: ["Add"] },
    { id: 7, name: "مدير إدارة", role: "مدير إدارة", permissions: ["Add"] },
    { id: 8, name: "مدير قسم", role: "مدير قسم", permissions: ["Addexpenses", "Editexpenses", "Viewexpenses"] },
    { id: 9, name: "شريك اعمال", role: "شريك اعمال", permissions: [] },
    { id: 10, name: "منافع", role: "منافع", permissions: [] },
    { id: 11, name: "المشرف العام على رأس المال البشري والخدمات المشتركة", role: "المشرف العام على رأس المال البشري والخدمات المشتركة", permissions: ["Add", "Edit", "View"] },
    { id: 12, name: "نائب الرئيس لقطاع رأس المال البشري", role: "نائب الرئيس لقطاع رأس المال البشري", permissions: ["Add", "Edit", "View"] },
    { id: 13, name: "مدير عام الموازنة والتخطيط المالي", role: "مدير عام الموازنة والتخطيط المالي", permissions: ["Add", "Edit", "View"] },
    { id: 14, name: "المشرف العام على الشؤون المالية والقانونية والتنظيمية", role: "المشرف العام على الشؤون المالية والقانونية والتنظيمية", permissions: ["Add", "Edit", "View"] },
    { id: 15, name: "نائب الرئيس للشؤون المالية", role: "نائب الرئيس للشؤون المالية", permissions: ["Add", "Edit", "View"] },
    { id: 16, name: "مدير عام تمكين اعمال رأس المال البشري", role: "مدير عام تمكين اعمال رأس المال البشري", permissions: ["Add", "Edit", "View"] },
    { id: 17, name: "مدير عام المراجعة الداخلية", role: "مدير عام المراجعة الداخلية", permissions: ["Viewbudgets", "Viewexpenses"] },
    { id: 18, name: "ماجد", role: "ماجد", permissions: ["Addbudgets", "Editbudgets", "Viewbudgets", "Addexpenses", "Editexpenses", "Viewexpenses", "Controller"] },
    { id: 19, name: "TEST", role: "TEST", permissions: ["Addbudgets", "Editbudgets", "Viewbudgets", "Addexpenses", "Editexpenses", "Viewexpenses"] },
];

const rolesData = [
    { name: 'مدير', permissions: ['إضافة', 'تعديل', 'حذف'] },
    { name: 'موظف', permissions: ['عرض'] },
    { name: 'رئيس', permissions: ['Addbudgets', 'Editbudgets', 'Viewbudgets', 'Addexpenses', 'Editexpenses', 'Viewexpenses', 'Controller'] },
    { name: 'مشرف عام', permissions: ['Add'] },
    { name: 'نائب', permissions: ['Add'] },
    { name: 'مدير عام', permissions: ['Add'] },
    { name: 'مدير إدارة', permissions: ['Add'] },
    { name: 'مدير قسم', permissions: ['Addexpenses', 'Editexpenses', 'Viewexpenses'] },
    { name: 'شريك اعمال', permissions: [] },
    { name: 'منافع', permissions: [] },
    { name: 'المشرف العام على رأس المال البشري والخدمات المشتركة', permissions: ['Add', 'Edit', 'View'] },
    { name: 'نائب الرئيس لقطاع رأس المال البشري', permissions: ['Add', 'Edit', 'View'] },
    { name: 'مدير عام الموازنة والتخطيط المالي', permissions: ['Add', 'Edit', 'View'] },
    { name: 'المشرف العام على الشؤون المالية والقانونية والتنظيمية', permissions: ['Add', 'Edit', 'View'] },
    { name: 'نائب الرئيس للشؤون المالية', permissions: ['Add', 'Edit', 'View'] },
    { name: 'مدير عام تمكين اعمال رأس المال البشري', permissions: ['Add', 'Edit', 'View'] },
    { name: 'مدير عام المراجعة الداخلية', permissions: ['Viewbudgets', 'Viewexpenses'] },
    { name: 'ماجد', permissions: ['Addbudgets', 'Editbudgets', 'Viewbudgets', 'Addexpenses', 'Editexpenses', 'Viewexpenses', 'Controller'] },
    { name: 'TEST', permissions: ['Addbudgets', 'Editbudgets', 'Viewbudgets', 'Addexpenses', 'Editexpenses', 'Viewexpenses'] },
];

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
                <select
                    value={newUser.role}
                    onChange={(e) => {
                        const selectedRole = rolesData.find(role => role.name === e.target.value);
                        if (selectedRole) {
                            setNewUser(prev => ({
                                ...prev,
                                role: selectedRole.name,
                                permissions: selectedRole.permissions, // Set permissions based on role
                            }));
                        }
                    }}
                    className="form-control mb-2"
                >
                    <option value="">اختر الدور</option>
                    {rolesData.map(role => (
                        <option key={role.name} value={role.name}>{role.name}</option>
                    ))}
                </select>
                <div className="permissions-list mb-2">
                    {rolesData.find(role => role.name === newUser.role)?.permissions.map(permission => (
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
                        <th>العمليات</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.permissions.join(', ')}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => editUser(user)}>تعديل</button>
                                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>حذف</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserPermissions;
