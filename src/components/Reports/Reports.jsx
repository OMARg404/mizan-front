import React, { useState, useEffect } from 'react';
import './Reports.css'; // Custom CSS for styling
import axios from 'axios'; // Import Axios for API calls
import { CSVLink } from 'react-csv'; // Import CSVLink for downloading reports

const Reports = () => {
    const [selectedReport, setSelectedReport] = useState('المبيعات'); // Default report in Arabic
    const [dateRange, setDateRange] = useState([null, null]);
    const [reportData, setReportData] = useState([]);
    const [newReportName, setNewReportName] = useState('');
    const [reportsList, setReportsList] = useState(['المبيعات', 'نشاط المستخدمين', 'مالي']);
    const [customReport, setCustomReport] = useState({ اسم: '', قيمة: '', تاريخ: '' });

    useEffect(() => {
        if (dateRange[0] && dateRange[1]) {
            fetchReportData();
        }
    }, [selectedReport, dateRange]);

    const fetchReportData = async () => {
        try {
            const response = await axios.get(`/api/reports/${selectedReport}`, {
                params: {
                    startDate: dateRange[0],
                    endDate: dateRange[1]
                }
            });
            setReportData(response.data);
        } catch (error) {
            console.error('خطأ في جلب بيانات التقرير:', error);
        }
    };

    const renderReportData = () => {
        if (!reportData || reportData.length === 0) return <p>لا توجد بيانات متاحة لهذا التقرير.</p>;

        return (
            <table className="table">
                <thead>
                    <tr>
                        {Object.keys(reportData[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, idx) => (
                                <td key={idx}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const addNewReport = () => {
        if (newReportName && !reportsList.includes(newReportName)) {
            setReportsList([...reportsList, newReportName]);
            setNewReportName('');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomReport({ ...customReport, [name]: value });
    };

    const handleAddCustomReport = () => {
        setReportData([...reportData, customReport]);
        setCustomReport({ اسم: '', قيمة: '', تاريخ: '' });
    };

    const headers = Object.keys(reportData[0] || {}).map(key => ({ label: key, key }));

    return (
        <div className="reports-container mt-4">
            <h1 className="reports-page-title">التقارير</h1>
            <p>استعرض التقارير المختلفة واحصل على رؤى قيمة عن الأعمال.</p>

            <div className="reports-filters mb-4">
                <select 
                    onChange={(e) => setSelectedReport(e.target.value)} 
                    className="form-control"
                >
                    {reportsList.map((report, index) => (
                        <option key={index} value={report}>{report}</option>
                    ))}
                </select>
                <input 
                    type="date" 
                    onChange={(e) => setDateRange([e.target.value, dateRange[1]])} 
                    className="form-control"
                />
                <input 
                    type="date" 
                    onChange={(e) => setDateRange([dateRange[0], e.target.value])} 
                    className="form-control"
                />
            </div>

            <div className="add-report mb-4">
                <input 
                    type="text" 
                    value={newReportName} 
                    onChange={(e) => setNewReportName(e.target.value)} 
                    placeholder="اسم التقرير الجديد" 
                    className="form-control"
                />
                <button onClick={addNewReport} className="btn btn-primary mt-2">إضافة تقرير جديد</button>
            </div>

            <div className="custom-report mb-4">
                <h3>إضافة بيانات تقرير مخصص</h3>
                <input 
                    type="text" 
                    name="اسم" 
                    value={customReport.اسم} 
                    onChange={handleInputChange} 
                    placeholder="اسم" 
                    className="form-control mb-2"
                />
                <input 
                    type="number" 
                    name="قيمة" 
                    value={customReport.قيمة} 
                    onChange={handleInputChange} 
                    placeholder="قيمة" 
                    className="form-control mb-2"
                />
                <input 
                    type="date" 
                    name="تاريخ" 
                    value={customReport.تاريخ} 
                    onChange={handleInputChange} 
                    placeholder="تاريخ" 
                    className="form-control mb-2"
                />
                <button onClick={handleAddCustomReport} className="btn btn-primary">إضافة بيانات</button>
            </div>

            <div className="reports-content">
                <h2>تقرير {selectedReport}</h2>
                {renderReportData()}
            </div>

            {reportData.length > 0 && (
                <CSVLink data={reportData} headers={headers} filename={`${selectedReport}.csv`} className="btn btn-success mt-4">
                    تنزيل التقرير
                </CSVLink>
            )}
        </div>
    );
};

export default Reports;
