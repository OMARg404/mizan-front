import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import 'bootstrap/dist/css/bootstrap.min.css';

const HistoricalRecords = () => {
    // Initialize the records with some default historical data including new fields
    const [records, setRecords] = useState([
        { year: '2020', details: 'تقرير الأداء السنوي', notes: 'جيد', allocation: '5000', expense: '4500' },
        { year: '2021', details: 'تقرير المالي', notes: 'ممتاز', allocation: '6000', expense: '5000' },
        { year: '2022', details: 'تقرير الموارد البشرية', notes: 'متوسط', allocation: '5500', expense: '4800' },
    ]);
    const [year, setYear] = useState('');
    const [details, setDetails] = useState('');
    const [notes, setNotes] = useState('');
    const [allocation, setAllocation] = useState(''); // New state for allocation
    const [expense, setExpense] = useState(''); // New state for expense
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [fileName, setFileName] = useState('historical_records.csv');

    const handleAddOrUpdateRecord = (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        if (isEditing) {
            updateRecord();
        } else {
            addRecord();
        }

        resetForm();
    };

    const validateInputs = () => {
        if (!year || !details || !allocation || !expense) {
            alert("الرجاء ملء جميع الحقول المطلوبة.");
            return false;
        }
        if (isNaN(year)) {
            alert("يجب أن تكون السنة رقمًا.");
            return false;
        }
        if (records.some(record => record.year === year) && !isEditing) {
            alert("السنة موجودة بالفعل.");
            return false;
        }
        return true;
    };

    const addRecord = () => {
        const newRecord = { year, details, notes, allocation, expense };
        setRecords([...records, newRecord]);
    };

    const updateRecord = () => {
        const updatedRecords = records.map((record, index) =>
            index === editIndex ? { year, details, notes, allocation, expense } : record
        );
        setRecords(updatedRecords);
        setIsEditing(false);
        setEditIndex(null);
    };

    const resetForm = () => {
        setYear('');
        setDetails('');
        setNotes('');
        setAllocation('');
        setExpense('');
    };

    const handleEditRecord = (index) => {
        const recordToEdit = records[index];
        setYear(recordToEdit.year);
        setDetails(recordToEdit.details);
        setNotes(recordToEdit.notes);
        setAllocation(recordToEdit.allocation); // Set allocation for editing
        setExpense(recordToEdit.expense); // Set expense for editing
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleDeleteRecord = (index) => {
        if (window.confirm("هل أنت متأكد أنك تريد حذف هذا السجل؟")) {
            const newRecords = records.filter((_, i) => i !== index);
            setRecords(newRecords);
        }
    };

    const filteredRecords = records.filter((record) =>
        record.year.includes(searchTerm) ||
        record.details.includes(searchTerm) ||
        record.notes.includes(searchTerm) ||
        record.allocation.includes(searchTerm) ||
        record.expense.includes(searchTerm)
    );

    const csvData = filteredRecords.map(record => ({
        year: record.year,
        details: record.details,
        notes: record.notes,
        allocation: record.allocation, // Include allocation in CSV data
        expense: record.expense, // Include expense in CSV data
    }));

    const csvHeaders = [
        { label: 'السنة', key: 'year' },
        { label: 'التفاصيل', key: 'details' },
        { label: 'الملاحظات', key: 'notes' },
        { label: 'التخصيص', key: 'allocation' }, // New header for allocation
        { label: 'المصروف', key: 'expense' }, // New header for expense
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4">السجلات التاريخية</h2>

            <form onSubmit={handleAddOrUpdateRecord} className="mb-4">
                <div className="form-row align-items-end">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="السنة"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="التفاصيل"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="الملاحظات"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="التخصيص" // New input for allocation
                            value={allocation}
                            onChange={(e) => setAllocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="المصروف" // New input for expense
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
                        <th>السنة</th>
                        <th>التفاصيل</th>
                        <th>الملاحظات</th>
                        <th>التخصيص</th> {/* New header for allocation */}
                        <th>المصروف</th> {/* New header for expense */}
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.length > 0 ? (
                        filteredRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{record.year}</td>
                                <td>{record.details}</td>
                                <td>{record.notes}</td>
                                <td>{record.allocation}</td> {/* Display allocation */}
                                <td>{record.expense}</td> {/* Display expense */}
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
                            <td colSpan="6" className="text-center">
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
        </div>
    );
};

export default HistoricalRecords;
