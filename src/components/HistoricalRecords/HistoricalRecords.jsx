import React, { useState } from 'react';
import { CSVLink } from 'react-csv'; // Import CSVLink from react-csv
import 'bootstrap/dist/css/bootstrap.min.css';

const HistoricalRecords = () => {
  const [records, setRecords] = useState([]);
  const [year, setYear] = useState('');
  const [details, setDetails] = useState('');
  const [notes, setNotes] = useState(''); // حقل الملاحظات
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // مؤشر السجل المعدل
  const [fileName, setFileName] = useState('historical_records.csv'); // State for the file name

  const handleAddOrUpdateRecord = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedRecords = records.map((record, index) => 
        index === editIndex ? { year, details, notes } : record
      );
      setRecords(updatedRecords);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const newRecord = { year, details, notes };
      setRecords([...records, newRecord]);
    }

    setYear('');
    setDetails('');
    setNotes(''); // إعادة تعيين حقل الملاحظات
  };

  const handleEditRecord = (index) => {
    const recordToEdit = records[index];
    setYear(recordToEdit.year);
    setDetails(recordToEdit.details);
    setNotes(recordToEdit.notes);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteRecord = (index) => {
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords);
  };

  const filteredRecords = records.filter((record) =>
    record.year.includes(searchTerm) || 
    record.details.includes(searchTerm) || 
    record.notes.includes(searchTerm)
  );

  // CSV data and headers for download
  const csvData = filteredRecords.map(record => ({
    year: record.year,
    details: record.details,
    notes: record.notes,
  }));

  const csvHeaders = [
    { label: 'السنة', key: 'year' },
    { label: 'التفاصيل', key: 'details' },
    { label: 'الملاحظات', key: 'notes' },
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
              placeholder="الملاحظات" // حقل الملاحظات الجديد
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
                <td>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEditRecord(index)} // زر التحرير
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
              <td colSpan="4" className="text-center">
                لا توجد سجلات
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* File Name Input */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="اسم الملف (مع الامتداد)"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)} // Update file name
        />
      </div>

      {/* Download Button */}
      <div className="mb-4">
        <CSVLink 
          data={csvData} 
          headers={csvHeaders} 
          filename={fileName} // Use the user-defined file name
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
