import React, { useState } from 'react';
import './UserPermissions.css'; // Custom CSS for styling

const initialUsers = [
    { id: 1, name: 'أحمد', role: 'مدير', permissions: ['إضافة', 'تعديل', 'حذف'] },
    { id: 2, name: 'سارة', role: 'موظف', permissions: ['عرض'] },
    { id: 3, name: "رئيس", role: "رئيس", permissions: ["إضافة ميزانية", "تعديل ميزانية", "عرض ميزانية", "إضافة مصاريف", "تعديل مصاريف", "عرض مصاريف", "تحكم"] },
    { id: 4, name: "مشرف عام", role: "مشرف عام", permissions: ["إضافة"] },
    { id: 5, name: "نائب", role: "نائب", permissions: ["إضافة"] },
    { id: 6, name: "مدير عام", role: "مدير عام", permissions: ["إضافة"] },
    { id: 7, name: "مدير إدارة", role: "مدير إدارة", permissions: ["إضافة"] },
    { id: 8, name: "مدير قسم", role: "مدير قسم", permissions: ["إضافة مصاريف", "تعديل مصاريف", "عرض مصاريف"] },
    { id: 9, name: "شريك اعمال", role: "شريك اعمال", permissions: [] },
    { id: 10, name: "منافع", role: "منافع", permissions: [] },
    { id: 11, name: "المشرف العام على رأس المال البشري والخدمات المشتركة", role: "المشرف العام على رأس المال البشري والخدمات المشتركة", permissions: ["إضافة", "تعديل", "عرض"] },
    { id: 12, name: "نائب الرئيس لقطاع رأس المال البشري", role: "نائب الرئيس لقطاع رأس المال البشري", permissions: ["إضافة", "تعديل", "عرض"] },
    { id: 13, name: "مدير عام الموازنة والتخطيط المالي", role: "مدير عام الموازنة والتخطيط المالي", permissions: ["إضافة", "تعديل", "عرض"] },
    { id: 14, name: "المشرف العام على الشؤون المالية والقانونية والتنظيمية", role: "المشرف العام على الشؤون المالية والقانونية والتنظيمية", permissions: ["إضافة", "تعديل", "عرض"] },
    { id: 15, name: "نائب الرئيس للشؤون المالية", role: "نائب الرئيس للشؤون المالية", permissions: ["إضافة", "تعديل", "عرض"] },
    { id: 16, name: "مدير عام تمكين اعمال رأس المال البشري", role: "مدير عام تمكين اعمال رأس المال البشري", permissions: ["إضافة", "تعديل", "عرض"] },
    { id: 17, name: "مدير عام المراجعة الداخلية", role: "مدير عام المراجعة الداخلية", permissions: ["عرض ميزانية", "عرض مصاريف"] },
    { id: 18, name: "ماجد", role: "ماجد", permissions: ["إضافة ميزانية", "تعديل ميزانية", "عرض ميزانية", "إضافة مصاريف", "تعديل مصاريف", "عرض مصاريف", "تحكم"] },
    { id: 19, name: "TEST", role: "TEST", permissions: ["إضافة ميزانية", "تعديل ميزانية", "عرض ميزانية", "إضافة مصاريف", "تعديل مصاريف", "عرض مصاريف"] },
];

const rolesData = [
    { name: 'مدير', permissions: ['إضافة', 'تعديل', 'حذف'] },
    { name: 'موظف', permissions: ['عرض'] },
    { name: 'رئيس', permissions: ['إضافة ميزانية', 'تعديل ميزانية', 'عرض ميزانية', 'إضافة مصاريف', 'تعديل مصاريف', 'عرض مصاريف', 'تحكم'] },
    { name: 'مشرف عام', permissions: ['إضافة'] },
    { name: 'نائب', permissions: ['إضافة'] },
    { name: 'مدير عام', permissions: ['إضافة'] },
    { name: 'مدير إدارة', permissions: ['إضافة'] },
    { name: 'مدير قسم', permissions: ['إضافة مصاريف', 'تعديل مصاريف', 'عرض مصاريف'] },
    { name: 'شريك اعمال', permissions: [] },
    { name: 'منافع', permissions: [] },
    { name: 'المشرف العام على رأس المال البشري والخدمات المشتركة', permissions: ['إضافة', 'تعديل', 'عرض'] },
    { name: 'نائب الرئيس لقطاع رأس المال البشري', permissions: ['إضافة', 'تعديل', 'عرض'] },
    { name: 'مدير عام الموازنة والتخطيط المالي', permissions: ['إضافة', 'تعديل', 'عرض'] },
    { name: 'المشرف العام على الشؤون المالية والقانونية والتنظيمية', permissions: ['إضافة', 'تعديل', 'عرض'] },
    { name: 'نائب الرئيس للشؤون المالية', permissions: ['إضافة', 'تعديل', 'عرض'] },
    { name: 'مدير عام تمكين اعمال رأس المال البشري', permissions: ['إضافة', 'تعديل', 'عرض'] },
    { name: 'مدير عام المراجعة الداخلية', permissions: ['عرض ميزانية', 'عرض مصاريف'] },
    { name: 'ماجد', permissions: ['إضافة ميزانية', 'تعديل ميزانية', 'عرض ميزانية', 'إضافة مصاريف', 'تعديل مصاريف', 'عرض مصاريف', 'تحكم'] },
    { name: 'TEST', permissions: ['إضافة ميزانية', 'تعديل ميزانية', 'عرض ميزانية', 'إضافة مصاريف', 'تعديل مصاريف', 'عرض مصاريف'] },
];

// Added "تسجيل الخرج" to the list of available permissions
const allPermissions = [
    'إضافة', 'تعديل', 'حذف', 'عرض', 'إضافة ميزانية', 'تعديل ميزانية', 
    'عرض ميزانية', 'إضافة مصاريف', 'تعديل مصاريف', 'عرض مصاريف', 
    'تحكم',
];

const UserPermissions = () => {
    const [users, setUsers] = useState(initialUsers);
    const [newUser, setNewUser] = useState({ name: '', role: '', permissions: [] });
    const [editMode, setEditMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [message, setMessage] = useState('');

    const addUser = () => {
        if (!newUser.name || !newUser.role) {
            setMessage('يرجى ملء جميع الحقول!');
            return; // Simple validation
        }
        if (editMode) {
            // Edit existing user
            setUsers(users.map(user => (user.id === currentUserId ? { ...newUser, id: currentUserId } : user)));
            setMessage('تم تحديث المستخدم بنجاح!');
            setEditMode(false);
        } else {
            // Add new user
            setUsers([...users, { id: users.length + 1, ...newUser }]);
            setMessage('تم إضافة المستخدم بنجاح!');
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
        setMessage('تم حذف المستخدم بنجاح!');
    };

    const togglePermission = (permission) => {
        setNewUser(prev => {
            const permissions = prev.permissions.includes(permission)
                ? prev.permissions.filter(p => p !== permission) // Remove if exists
                : [...prev.permissions, permission]; // Add if not exists
            return { ...prev, permissions };
        });
    };

    const setAllPermissions = () => {
        const rolePermissions = rolesData.find(role => role.name === newUser.role)?.permissions || [];
        setNewUser(prev => ({
            ...prev,
            permissions: rolePermissions.length === prev.permissions.length ? [] : rolePermissions
        }));
    };

    return (
        <div className="container mt-4">
            <h1 className="page-title">أذونات المستخدم</h1>
            <p>إدارة أذونات المستخدمين المختلفة في النظام.</p>

            {message && <div className="alert alert-info">{message}</div>}

            <h2 className="section-title">إضافة/تعديل مستخدم</h2>
            <div className="mb-3">
                <label className="form-label">اسم المستخدم</label>
                <input type="text" className="form-control" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
            </div>
            <div className="mb-3">
                <label className="form-label">الدور</label>
                <select className="form-select" value={newUser.role} onChange={e => {
                    const role = e.target.value;
                    setNewUser(prev => ({ ...prev, role }));
                    const rolePermissions = rolesData.find(r => r.name === role)?.permissions || [];
                    setNewUser(prev => ({ ...prev, permissions: rolePermissions }));
                }}>
                    <option value="">اختر الدور</option>
                    {rolesData.map(role => (
                        <option key={role.name} value={role.name}>{role.name}</option>
                    ))}
                </select>
            </div>

            <h3 className="section-title">الأذونات</h3>
            <div className="mb-3">
                <button onClick={setAllPermissions} className="btn btn-secondary me-2">تعيين جميع الأذونات</button>
            </div>
            {allPermissions.map(permission => (
                <div key={permission} className="form-check">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        checked={newUser.permissions.includes(permission)} 
                        onChange={() => togglePermission(permission)} 
                    />
                    <label className="form-check-label">{permission}</label>
                </div>
            ))}
            <div className="mb-3">
                <button onClick={addUser} className="btn btn-primary">{editMode ? 'تحديث' : 'إضافة'}</button>
            </div>

            <h2 className="section-title">قائمة المستخدمين</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>اسم المستخدم</th>
                        <th>الدور</th>
                        <th>الأذونات</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.permissions.length > 0 ? user.permissions.join(', ') : 'لا توجد أذونات'}
                            </td>
                            <td>
                                <button onClick={() => editUser(user)} className="btn btn-warning me-2">تعديل</button>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-danger">حذف</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserPermissions;
