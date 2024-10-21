import React, { useState } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, Background, MarkerType } from 'react-flow-renderer';
import './OrganizationalStructure.css'; // Optional: Custom CSS for styling

const initialElements = [
    { id: '1', data: { label: 'المدير التنفيذي\nاسم المدير التنفيذي' }, position: { x: 250, y: 0 }, style: { border: '1px solid #007bff' } },
    { id: '2', data: { label: 'مدير العمليات\nاسم مدير العمليات' }, position: { x: 100, y: 100 }, style: { border: '1px solid #007bff' } },
    { id: '3', data: { label: 'مدير التسويق\nاسم مدير التسويق' }, position: { x: 250, y: 100 }, style: { border: '1px solid #007bff' } },
    { id: '4', data: { label: 'مدير المالية\nاسم مدير المالية' }, position: { x: 400, y: 100 }, style: { border: '1px solid #007bff' } },
    { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.Arrow } },
    { id: 'e1-3', source: '1', target: '3', animated: true, markerEnd: { type: MarkerType.Arrow } },
    { id: 'e1-4', source: '1', target: '4', animated: true, markerEnd: { type: MarkerType.Arrow } },
];

const OrganizationalStructure = () => {
    const [elements, setElements] = useState(initialElements);

    // Function to handle connecting nodes
    const onConnect = (params) => setElements((els) => addEdge(params, els));

    // Function to add a new node
    const addNode = () => {
        const newNode = {
            id: `${elements.length + 1}`,
            data: { label: `Node ${elements.length + 1}` },
            position: { x: 250, y: 200 }, // Default position for new nodes
            style: { border: '1px solid #007bff' },
        };
        setElements((els) => [...els, newNode]);
    };

    return (
        <div className="container mt-4">
            <h1>الهيكل التنظيمي</h1>
            <p>استعرض الهيكل التنظيمي للمؤسسة وتعرف على الأعضاء الرئيسيين في الفريق.</p>

            <button className="btn btn-primary mb-2" onClick={addNode}>
                إضافة عضو جديد
            </button>

            <div style={{ height: 500 }}>
                <ReactFlow
                    elements={elements}
                    onConnect={onConnect}
                    snapToGrid={true}
                    snapGrid={[15, 15]}
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
};

export default OrganizationalStructure;
