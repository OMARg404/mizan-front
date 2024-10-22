import React, { useState } from 'react';
import './OrganizationalStructure.css'; // Import the CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome for icons
import { faChevronDown, faChevronRight, faEdit, faSearch, faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are imported

const OrganizationalStructurePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [structureData, setStructureData] = useState([
    {
      name: "الهيكل التنظيمي",
      description: "الوصف العام للهيكل التنظيمي",
      children: [
        { name: "الرئيس", description: "الرئيس التنفيذي للمؤسسة", children: [] },
        {
          name: "المشرف العام على قطاع رأس المال البشري والخدمات المشتركة",
          description: "الجهة المسؤولة عن إدارة الموارد البشرية والخدمات المشتركة",
          children: [
            { name: "قطاع الخدمات المشتركة", description: "يتولى إدارة الخدمات المختلفة", children: [] },
            { name: "قطاع رأس المال البشري", description: "يتولى إدارة شؤون الموظفين", children: [] },
            { name: "الإدارة العامة لتجربة الموظف", description: "تحسين تجربة الموظفين", children: [] },
            { name: "الإدارة العامة لتميز رأس المال البشري", description: "رفع كفاءة الموظفين", children: [] },
            { name: "الإدارة العامة لتمكين رأس المال البشري", description: "تمكين الموظفين وزيادة قدراتهم", children: [] },
            { name: "الإدارة العامة للمراجعة الداخلية", description: "تدقيق الأداء والعمليات", children: [] },
          ],
        },
      ],
    },
  ]);

  const [expandedItems, setExpandedItems] = useState({}); // State to track expanded items
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [newItem, setNewItem] = useState({ name: '', description: '' }); // State for new item details

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the expanded state for the clicked item
    }));
  };

  const renderStructure = (data) => {
    return data.map((item, index) => {
      const isOpen = expandedItems[index]; // Check if the current item is expanded

      // Check if the item matches the search term
      if (!item.name.includes(searchTerm) && !item.description.includes(searchTerm)) {
        return null; // Exclude this item from rendering
      }

      return (
        <div key={index} className="org-card">
          <div onClick={() => toggleExpand(index)} className="org-item-header">
            <h3 className="org-item-name">{item.name}</h3>
            <FontAwesomeIcon 
              icon={isOpen ? faChevronDown : faChevronRight} 
              className="toggle-icon"
            />
            <button className="edit-button">
              <FontAwesomeIcon icon={faEdit} /> تعديل
            </button>
          </div>
          <p className="org-item-description">{item.description}</p>
          {item.children.length > 0 && isOpen && (
            <div className="children">
              {renderStructure(item.children)} {/* Render children recursively */}
            </div>
          )}
        </div>
      );
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddItem = () => {
    // Logic to add a new item to the organizational structure
    setStructureData((prev) => {
      const updatedData = [...prev];
      const newItemData = { name: newItem.name, description: newItem.description, children: [] };
      updatedData[0].children.push(newItemData); // Add new item to the first level (or adjust as needed)
      return updatedData;
    });
    setShowModal(false); // Close the modal after adding
    setNewItem({ name: '', description: '' }); // Reset input fields
  };

  const handleExportPDF = () => {
    // Logic to export the organizational structure to PDF
    alert("Export to PDF functionality to be implemented.");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>القائمة</h2>
        <ul>
          <li>الرئيس</li>
          <li>إدارة الموارد البشرية</li>
          <li>إدارة الخدمات المشتركة</li>
          <li>تقارير</li>
        </ul>
      </aside>
      <main className="organizational-structure">
        <h1>الهيكل التنظيمي</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="ابحث عن عنصر..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <button className="add-item-button" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faPlus} /> إضافة عنصر
        </button>
        <button className="export-pdf-button" onClick={handleExportPDF}>
          <FontAwesomeIcon icon={faFilePdf} /> تصدير إلى PDF
        </button>
        
        <div className="org-structure">
          {renderStructure(structureData)} {/* Render the top-level structure */}
        </div>
        
        {/* Modal for adding a new item */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>إضافة عنصر جديد</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">اسم العنصر</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">الوصف</label>
                <textarea
                  className="form-control"
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  required
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              إلغاء
            </Button>
            <Button variant="primary" onClick={handleAddItem}>
              إضافة
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default OrganizationalStructurePage;
