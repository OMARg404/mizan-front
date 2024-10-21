import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { saveAs } from 'file-saver';
// Uncomment the following line if you plan to use axios for saving categories
// import axios from 'axios'; 
import './Budget.css';

const Budget = () => {
  const [categories, setCategories] = useState([
    { name: 'الفئة 1', description: 'وصف موجز لنفقات الفئة 1', weight: 0, price: 0 },
    { name: 'الفئة 2', description: 'وصف موجز لنفقات الفئة 2', weight: 0, price: 0 },
    { name: 'الفئة 3', description: 'وصف موجز لنفقات الفئة 3', weight: 0, price: 0 },
  ]);
  
  const [newCategory, setNewCategory] = useState({ name: '', description: '', weight: 0, price: 0 });
  const [fileFormat, setFileFormat] = useState('csv');
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState('');

  // Function to add a new category
  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      setCategories([...categories, newCategory]);
      setNewCategory({ name: '', description: '', weight: 0, price: 0 }); // Reset the input fields
    }
  };

  // Function to edit an existing category
  const handleEditCategory = (index, field, value) => {
    const updatedCategories = categories.map((category, i) => {
      if (i === index) {
        return { ...category, [field]: value };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  // Function to delete a category
  const handleDeleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  // Function to add a dynamic column
  const handleAddColumn = () => {
    if (newColumnName && !dynamicColumns.includes(newColumnName)) {
      setDynamicColumns([...dynamicColumns, newColumnName]);
      setNewColumnName('');
      const updatedCategories = categories.map(category => ({
        ...category,
        [newColumnName]: ''
      }));
      setCategories(updatedCategories);
    }
  };

  // Function to delete a dynamic column
  const handleDeleteColumn = (columnName) => {
    setDynamicColumns(dynamicColumns.filter(col => col !== columnName));
    const updatedCategories = categories.map(category => {
      const { [columnName]: _, ...remainingColumns } = category; // Remove the column
      return remainingColumns;
    });
    setCategories(updatedCategories);
  };

  // Function to download the budget categories in selected format
  const handleDownloadFile = () => {
    let fileContent = '';
    let fileName = `budget_categories.${fileFormat}`;

    if (fileFormat === 'csv') {
      const csvData = [
        ['اسم الفئة', 'الوصف', 'الوزن', 'السعر', ...dynamicColumns],
        ...categories.map(category => [
          category.name,
          category.description,
          category.weight,
          category.price,
          ...dynamicColumns.map(col => category[col] || ''),
        ]),
      ];
      fileContent = 'data:text/csv;charset=utf-8,' + csvData.map(e => e.join(",")).join("\n");
    } else if (fileFormat === 'json') {
      fileContent = JSON.stringify(categories, null, 2);
      fileName = `budget_categories.json`;
    } else if (fileFormat === 'txt') {
      const txtData = categories.map(category => 
        `اسم الفئة: ${category.name}, الوصف: ${category.description}, الوزن: ${category.weight}, السعر: ${category.price}, ${dynamicColumns.map(col => `${col}: ${category[col] || ''}`).join(', ')}`).join("\n");
      fileContent = txtData;
      fileName = `budget_categories.txt`;
    }

    const blob = new Blob([fileContent], { type: fileFormat === 'csv' ? 'text/csv;charset=utf-8;' : fileFormat === 'json' ? 'application/json;charset=utf-8;' : 'text/plain;charset=utf-8;' });
    saveAs(blob, fileName);
  };

  // Function to save categories to the server (uncomment when axios is set up)
  const handleSaveCategories = async () => {
    // Ensure the backend is running and the URL is correct
    try {
      const response = await axios.post('http://localhost:5000/api/budget-categories', { categories });
      alert(response.data.message); // Show success message
    } catch (error) {
      alert('Error saving categories: ' + error.response.data.message); // Show error message
    }
  };

  return (
    <Container fluid className="p-4">
      <h1 className="text-center mb-4">نظرة عامة على الميزانية</h1>
      <p className="text-center mb-4">
        إليك تحليل شامل للميزانية الحالية، بما في ذلك نظرة تفصيلية على النفقات والتوزيعات، 
        لمساعدتك في إدارة أموالك بشكل فعال.
      </p>

      <Row className="mb-4">
        <Col md={12}>
          <h2>الفئات</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>اسم الفئة</th>
                <th>الوصف</th>
                <th>الكمية</th>
                <th>السعر</th>
                {dynamicColumns.map((col, index) => (
                  <th key={index}>
                    {col} 
                    <Button variant="danger" size="sm" onClick={() => handleDeleteColumn(col)}>
                      حذف
                    </Button>
                  </th>
                ))}
                <th>الإجراء</th>
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
                      value={category.weight}
                      onChange={(e) => handleEditCategory(index, 'weight', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={category.price}
                      onChange={(e) => handleEditCategory(index, 'price', e.target.value)}
                    />
                  </td>
                  {dynamicColumns.map((col, colIndex) => (
                    <td key={colIndex}>
                      <Form.Control
                        type="text"
                        value={category[col] || ''}
                        onChange={(e) => handleEditCategory(index, col, e.target.value)}
                      />
                    </td>
                  ))}
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteCategory(index)}>
                      حذف
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <h2>إضافة فئة جديدة</h2>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>اسم الفئة</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل اسم الفئة"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formCategoryDescription">
              <Form.Label>الوصف</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل وصف الفئة"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formCategoryWeight">
              <Form.Label>الكمية</Form.Label>
              <Form.Control
                type="number"
                placeholder="أدخل الوزن"
                value={newCategory.weight}
                onChange={(e) => setNewCategory({ ...newCategory, weight: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formCategoryPrice">
              <Form.Label>السعر</Form.Label>
              <Form.Control
                type="number"
                placeholder="أدخل السعر"
                value={newCategory.price}
                onChange={(e) => setNewCategory({ ...newCategory, price: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAddCategory}>
              إضافة فئة
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <h2>إضافة عمود جديد</h2>
          <Form.Group controlId="formNewColumnName">
            <Form.Label>اسم العمود</Form.Label>
            <Form.Control
              type="text"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleAddColumn}>
            إضافة عمود
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <h2>تنزيل الميزانية</h2>
          <Form.Group controlId="formFileFormat">
            <Form.Label>اختر تنسيق الملف</Form.Label>
            <Form.Control as="select" value={fileFormat} onChange={(e) => setFileFormat(e.target.value)}>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="txt">TXT</option>
            </Form.Control>
          </Form.Group>
          <Button variant="success" onClick={handleDownloadFile}>
            تنزيل الفئات
          </Button>
        </Col>

        <Col md={6}>
          <h2>حفظ الفئات</h2>
          <Button variant="warning" onClick={handleSaveCategories}>
            حفظ الفئات
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Budget;
