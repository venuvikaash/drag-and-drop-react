import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ProjectCard from './ProjectCard';

// Define a custom node
const CustomNode = ({ data }) => {
  return (
    <div className="p-4 rounded-lg bg-white border-2 border-blue-400 shadow-md">
      <div className="font-bold">{data.label}</div>
      {data.description && <div className="text-sm text-gray-600">{data.description}</div>}
    </div>
  );
};

// Define node types
const nodeTypes = {
  custom: ProjectCard,
};

// Initial nodes setup
const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 100 },
  }
];

// Initial edges setup
const initialEdges = [];

function DraggableFlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle connections between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const proOptions = { hideAttribution: true };

  return (
    <div style={{ width: '100%', height: '700px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
        zoomOnScroll={false}
      >
      </ReactFlow>
    </div>
  );
}

export default DraggableFlowChart;