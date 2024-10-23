import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReserveAmounts.css'; // Optional: Custom CSS for styling

const ReserveAmounts = () => {
    const [reserveRecords, setReserveRecords] = useState([
        { allocation: '1000', expense: 'مبلغ احتياطي لمشروع A' },
        { allocation: '2000', expense: 'مبلغ احتياطي لمشروع B' },
        { allocation: '1500', expense: 'مبلغ احتياطي لمشروع C' },
    ]);
    const [allocation, setAllocation] = useState('');
    const [expense, setExpense] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [fileName, setFileName] = useState('reserve_amounts.csv'); // State for the file name
    const [budgetRequest, setBudgetRequest] = useState(''); // State for budget request
    const [pendingRequests, setPendingRequests] = useState([
        { request: 'طلب ميزانية لمشروع X', amount: '5000' },
        { request: 'طلب ميزانية لمشروع Y', amount: '3000' },
    ]); // Default budget requests

    const handleAddOrUpdateRecord = (e) => {
        e.preventDefault();

        if (isEditing) {
            const updatedRecords = reserveRecords.map((record, index) => 
                index === editIndex ? { allocation, expense } : record
            );
            setReserveRecords(updatedRecords);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            const newRecord = { allocation, expense };
            setReserveRecords([...reserveRecords, newRecord]);
        }

        setAllocation('');
        setExpense('');
    };

    const handleEditRecord = (index) => {
        const recordToEdit = reserveRecords[index];
        setAllocation(recordToEdit.allocation);
        setExpense(recordToEdit.expense);
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleDeleteRecord = (index) => {
        const newRecords = reserveRecords.filter((_, i) => i !== index);
        setReserveRecords(newRecords);
    };

    const filteredRecords = reserveRecords.filter((record) =>
        record.allocation.includes(searchTerm) || 
        record.expense.includes(searchTerm)
    );

    const csvData = filteredRecords.map(record => ({
        allocation: record.allocation,
        expense: record.expense,
    }));

    const csvHeaders = [
        { label: 'التخصيص', key: 'allocation' },
        { label: 'المصروف', key: 'expense' },
    ];

    const pieData = {
        labels: reserveRecords.map(record => record.expense),
        datasets: [{
            data: reserveRecords.map(record => parseFloat(record.allocation)),
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFC300', '#DAF7A6'],
        }],
    };

    const handleBudgetRequest = (e) => {
        e.preventDefault();
        setPendingRequests([...pendingRequests, { request: budgetRequest, amount: allocation }]);
        alert(`طلب الميزانية: ${budgetRequest} بمبلغ: ${allocation}`);
        setBudgetRequest('');
    };

    const handleRequestDecision = (index, decision) => {
        if (decision === 'accept') {
            alert(`تم قبول الطلب: ${pendingRequests[index].request}`);
        } else {
            alert(`تم رفض الطلب: ${pendingRequests[index].request}`);
        }
        const updatedRequests = pendingRequests.filter((_, i) => i !== index);
        setPendingRequests(updatedRequests);
    };

    return (
        <div className="container mt-5">
            <h1>مبالغ الاحتياطي وطلبات الميزانية</h1>
            <p>تُعتبر مبالغ الاحتياطي أحد العناصر الأساسية في التخطيط المالي للأعمال. تهدف إلى ضمان الاستقرار المالي وتهيئة البيئة المناسبة للنمو المستدام.</p>

            <form onSubmit={handleAddOrUpdateRecord} className="mb-4">
                <div className="form-row align-items-end">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="التخصيص"
                            value={allocation}
                            onChange={(e) => setAllocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="المصروف"
                            value={expense}
                            onChange={(e) => setExpense(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">
                            {isEditing ? 'تحديث السجل' : 'إضافة سجل'}
                        </button>
                    </div>
                </div>
            </form>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="بحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>التخصيص</th>
                        <th>المصروف</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.length > 0 ? (
                        filteredRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{record.allocation}</td>
                                <td>{record.expense}</td>
                                <td>
                                    <button
                                        className="btn btn-warning mr-2"
                                        onClick={() => handleEditRecord(index)}
                                    >
                                        تعديل
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteRecord(index)}
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                لا توجد سجلات
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="اسم الملف (مع الامتداد)"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <CSVLink 
                    data={csvData} 
                    headers={csvHeaders} 
                    filename={fileName}
                    className="btn btn-success"
                    target="_blank"
                >
                    تحميل السجلات
                </CSVLink>
            </div>

            {/* Budget Request Section */}
            <form onSubmit={handleBudgetRequest} className="mb-4">
                <h2>طلب ميزانية</h2>
                <input
                    type="text"
                    className="form-control"
                    placeholder="اكتب طلب الميزانية"
                    value={budgetRequest}
                    onChange={(e) => setBudgetRequest(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-info mt-2">إرسال طلب الميزانية</button>
            </form>

            {/* Pending Budget Requests */}
            {pendingRequests.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-danger">طلبات الميزانية المعلقة</h2>
                    <ul className="list-group">
                        {pendingRequests.map((request, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#ffeb3b' }}>
                                {request.request} بمبلغ: {request.amount}
                                <div>
                                    <button className="btn btn-success btn-sm mr-2" onClick={() => handleRequestDecision(index, 'accept')}>قبول</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleRequestDecision(index, 'reject')}>رفض</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Pie Chart Visualization */}
            <div className="mt-4">
                <h2>عرض الميزانية</h2>
                <Pie data={pieData} />
            </div>
        </div>
    );
};

export default ReserveAmounts;
