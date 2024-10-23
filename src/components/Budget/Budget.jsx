import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Budget.css';

const Budget = () => {
  const [categories, setCategories] = useState([
    { name: 'التسويق', description: 'الميزانية للتسويق والإعلان', allocation: 0, spent: 0 },
    { name: 'البحث والتطوير', description: 'الميزانية للبحث والتطوير', allocation: 0, spent: 0 },
    { name: 'العمليات', description: 'الميزانية للعمليات واللوجستيات', allocation: 0, spent: 0 },
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', description: '', allocation: 0, spent: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState('');
  const [fileFormat, setFileFormat] = useState('txt');
  const [showFileFormatModal, setShowFileFormatModal] = useState(false);
  const [allBudgetsData, setAllBudgetsData] = useState('');
  const [changesMade, setChangesMade] = useState(false);

  // State for clock and date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to update time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Call this function at the end of the month
  useEffect(() => {
    const today = new Date();
    if (today.getDate() === 1) {
      archiveData();
    }
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      alert('تم تحديث البيانات!');
    }
  }, [categories]);

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      setCategories([...categories, newCategory]);
      setNewCategory({ name: '', description: '', allocation: 0, spent: 0 });
    } else {
      alert('يرجى ملء جميع الحقول لإضافة قسم جديد.');
    }
  };

  const handleEditCategory = (index, field, value) => {
    const updatedCategories = categories.map((category, i) => {
      if (i === index) {
        return { ...category, [field]: value };
      }
      return category;
    });
    setCategories(updatedCategories);
    setChangesMade(true);
  };

  const handleSaveChanges = () => {
    setChangesMade(false);
    alert('تم حفظ التغييرات بنجاح!');
  };

  const handleDeleteCategory = (index) => {
    setShowDeleteModal(true);
    setCategoryToDelete(index);
  };

  const confirmDeleteCategory = () => {
    setCategories(categories.filter((_, i) => i !== categoryToDelete));
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  const generateReport = (index) => {
    const category = categories[index];
    const reportContent = `تقرير الميزانية
      اسم القسم: ${category.name}
      الوصف: ${category.description}
      التخصيص: ${category.allocation}
      المصروف: ${category.spent}
    `;
    setReportData(reportContent);
    setShowReportModal(true);
  };

  const handleDownloadReport = (index) => {
    const category = categories[index];
    const reportContent = `اسم القسم,الوصف,التخصيص,المصروف\n${category.name},${category.description},${category.allocation},${category.spent}`;

    const blob = new Blob([fileFormat === 'csv' ? reportContent : reportContent.replace(/,/g, ' ')], {
      type: fileFormat === 'csv' ? 'text/csv;charset=utf-8;' : 'text/plain;charset=utf-8;',
    });
    saveAs(blob, `${category.name}_report.${fileFormat}`);
  };

  const handleDownloadAllBudgets = () => {
    const allBudgetsContent = categories.map(category => (
      `${category.name},${category.description},${category.allocation},${category.spent}`
    )).join('\n');
    setAllBudgetsData(allBudgetsContent);
    setShowFileFormatModal(true);
  };

  const downloadAllBudgets = () => {
    const blob = new Blob([fileFormat === 'csv' ? allBudgetsData : allBudgetsData.replace(/,/g, ' ')], {
      type: fileFormat === 'csv' ? 'text/csv;charset=utf-8;' : 'text/plain;charset=utf-8;',
    });
    saveAs(blob, `all_budgets.${fileFormat}`);
    setShowFileFormatModal(false);
  };

  const totalAllocation = categories.reduce((total, category) => total + category.allocation, 0);
  const totalSpent = categories.reduce((total, category) => total + category.spent, 0);

  const chartData = {
    labels: categories.map(category => category.name),
    datasets: [
      {
        label: 'التخصيص',
        data: categories.map(category => category.allocation),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'المصروف',
        data: categories.map(category => category.spent),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }
    ]
  };

  return (
    <Container fluid className="p-4">
      <h1 className="text-center mb-4">نظرة عامة على الميزانية</h1>
      
      {/* Clock and Date */}
      <Row className="mb-4">
        <Col md={12} className="text-center">
          <h2>{currentDate.toLocaleDateString('ar-EG')} - {currentDate.toLocaleTimeString('ar-EG')}</h2>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>نظرة عامة على الميزانية</Card.Title>
              <Card.Text>
                إجمالي التخصيص: {totalAllocation}
              </Card.Text>
              <Card.Text>
                إجمالي المصروف: {totalSpent}
              </Card.Text>
              <Button variant="info" onClick={handleDownloadAllBudgets}>
                تنزيل جميع الميزانيات
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Bar data={chartData} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>تفاصيل الميزانية</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>اسم القسم</th>
                    <th>الوصف</th>
                    <th>التخصيص</th>
                    <th>المصروف</th>
                    <th>الإجراء</th>
                    <th>تقرير</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={index}>
                      <td>{category.name}</td>
                      <td>
                        <Form.Control
                          type="text"
                          value={category.description}
                          onChange={(e) => handleEditCategory(index, 'description', e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          value={category.allocation}
                          onChange={(e) => handleEditCategory(index, 'allocation', e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          value={category.spent}
                          onChange={(e) => handleEditCategory(index, 'spent', e.target.value)}
                        />
                      </td>
                      <td>
                        <Button variant="danger" onClick={() => handleDeleteCategory(index)}>
                          حذف
                        </Button>
                      </td>
                      <td>
                        <Button variant="info" onClick={() => generateReport(index)}>
                          عرض التقرير
                        </Button>
                        <Button variant="success" onClick={() => handleDownloadReport(index)}>
                          تنزيل التقرير
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add new category form */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>إضافة قسم جديد</Card.Title>
              <Form>
                <Form.Group controlId="formCategoryName">
                  <Form.Label>اسم القسم</Form.Label>
                  <Form.Control
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="أدخل اسم القسم"
                  />
                </Form.Group>
                <Form.Group controlId="formCategoryDescription">
                  <Form.Label>الوصف</Form.Label>
                  <Form.Control
                    type="text"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="أدخل الوصف"
                  />
                </Form.Group>
                <Form.Group controlId="formCategoryAllocation">
                  <Form.Label>التخصيص</Form.Label>
                  <Form.Control
                    type="number"
                    value={newCategory.allocation}
                    onChange={(e) => setNewCategory({ ...newCategory, allocation: e.target.value })}
                    placeholder="أدخل التخصيص"
                  />
                </Form.Group>
                <Form.Group controlId="formCategorySpent">
                  <Form.Label>المصروف</Form.Label>
                  <Form.Control
                    type="number"
                    value={newCategory.spent}
                    onChange={(e) => setNewCategory({ ...newCategory, spent: e.target.value })}
                    placeholder="أدخل المصروف"
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleAddCategory}>
                  إضافة قسم
                </Button>
                {changesMade && (
                  <Button variant="success" onClick={handleSaveChanges} className="ml-2">
                    حفظ التغييرات
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Report Modal */}
      <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>تقرير الميزانية</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{reportData}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReportModal(false)}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>هل أنت متأكد أنك تريد حذف هذا القسم؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={confirmDeleteCategory}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      {/* File Format Selection Modal */}
      <Modal show={showFileFormatModal} onHide={() => setShowFileFormatModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>اختر تنسيق الملف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFileFormat">
              <Form.Label>تنسيق الملف</Form.Label>
              <Form.Control as="select" onChange={(e) => setFileFormat(e.target.value)}>
                <option value="txt">نص (TXT)</option>
                <option value="csv">CSV</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFileFormatModal(false)}>
            إلغاء
          </Button>
          <Button variant="success" onClick={downloadAllBudgets}>
            تنزيل
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Budget;
