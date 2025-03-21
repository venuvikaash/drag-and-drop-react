// App.js or your main flow component
import React from 'react';
import { ReactFlow, ReactFlowProvider, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css'; // Important: include the styles
import ProjectCard from './ProjectCard';

// Register your custom node
const nodeTypes = {
  projectCard: ProjectCard
};

function Flow() {
  // Initial nodes with a project card node
  const initialNodes = [
    {
      id: '1',
      type: 'projectCard',
      position: { x: 100, y: 100 },
      // Set explicit width and height
      style: { width: 400, height: 400 },
      data: {
        projectName: 'Custom Project Name',
        description: 'This is a custom description for the project card.'
      }
    }
  ];

  return (
    <div style={{ width: '100%', height: '800px' }}>
      <ReactFlowProvider>
        <ReactFlow
          defaultNodes={initialNodes}
          nodeTypes={nodeTypes}
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
          zoomOnPinch={false}
        >
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;