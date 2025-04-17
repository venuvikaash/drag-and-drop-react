import React, { useEffect, useRef } from "react";
import { Draggable } from "@shopify/draggable";
import RevenueOverviewRadarChart from "./RevenueOverviewRadarChart";
import RevenueOverviewChart from "./RevenueOverviewChart";
import WelcomeCard from "./WelcomeCard";

const Dashboard = ({ isSidebarCollapsed }) => {
  const containerRef = useRef(null);
  const draggableInstanceRef = useRef(null);

  useEffect(() => {
    // Clear localStorage if the page is manually refreshed
    if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
      localStorage.removeItem('dashboard-layout');
    }
    
    // Setup Shopify Draggable
    const setupDraggable = () => {
      if (!containerRef.current) return;
      
      // Destroy previous instance if it exists
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.destroy();
      }
      
      const containers = containerRef.current.querySelectorAll('.dashboard-widget');
      
      // Initialize Draggable
      const draggable = new Draggable(containers, {
        draggable: '.dashboard-widget',
        handle: '.grid-drag-handle',
        mirror: {
          constrainDimensions: true,
        }
      });
      
      // Save reference to destroy on cleanup
      draggableInstanceRef.current = draggable;
      
      // Load saved positions from localStorage
      const savedLayout = localStorage.getItem('dashboard-layout');
      if (savedLayout) {
        try {
          const layout = JSON.parse(savedLayout);
          layout.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) {
              element.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
              element.style.width = `${item.width}px`;
              element.style.height = `${item.height}px`;
              element.classList.add('positioned');
            }
          });
        } catch (e) {
          console.error("Failed to load saved layout", e);
          localStorage.removeItem('dashboard-layout');
        }
      }
      
      // Event listeners for drag operations
      draggable.on('drag:stop', () => {
        saveLayout();
      });
    };
    
    // Function to save the current layout to localStorage
    const saveLayout = () => {
      const widgets = containerRef.current.querySelectorAll('.dashboard-widget');
      const layout = Array.from(widgets).map(widget => {
        const rect = widget.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const transform = window.getComputedStyle(widget).transform;
        
        // Extract translation values from the transform matrix
        let x = 0, y = 0;
        if (transform !== 'none') {
          const matrix = transform.match(/matrix.*\((.+)\)/)[1].split(', ');
          x = parseInt(matrix[4], 10);
          y = parseInt(matrix[5], 10);
        }
        
        return {
          id: widget.id,
          x,
          y,
          width: widget.offsetWidth,
          height: widget.offsetHeight
        };
      });
      
      localStorage.setItem('dashboard-layout', JSON.stringify(layout));
    };
    
    // Add resize functionality
    const setupResize = () => {
      const widgets = containerRef.current.querySelectorAll('.dashboard-widget');
      
      widgets.forEach(widget => {
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'resize-handle';
        widget.appendChild(resizeHandle);
        
        let isResizing = false;
        let startX, startY, startWidth, startHeight;
        
        const startResize = (e) => {
          isResizing = true;
          startX = e.clientX;
          startY = e.clientY;
          startWidth = parseInt(document.defaultView.getComputedStyle(widget).width, 10);
          startHeight = parseInt(document.defaultView.getComputedStyle(widget).height, 10);
          
          document.addEventListener('mousemove', resize);
          document.addEventListener('mouseup', stopResize);
          e.preventDefault();
        };
        
        const resize = (e) => {
          if (!isResizing) return;
          const width = startWidth + e.clientX - startX;
          const height = startHeight + e.clientY - startY;
          
          widget.style.width = `${width}px`;
          widget.style.height = `${height}px`;
        };
        
        const stopResize = () => {
          isResizing = false;
          document.removeEventListener('mousemove', resize);
          document.removeEventListener('mouseup', stopResize);
          saveLayout();
        };
        
        resizeHandle.addEventListener('mousedown', startResize);
      });
    };
    
    // Initialize draggable after a short delay to ensure DOM is ready
    setTimeout(() => {
      setupDraggable();
      setupResize();
    }, 100);
    
    // Cleanup function
    return () => {
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.destroy();
      }
    };
  }, []);

  // Initialize with default widget positions
  const widgetPositions = [
    { id: "widget-1", x: 0, y: 0, width: 500, height: 400 },
    { id: "widget-2", x: 520, y: 0, width: 500, height: 400 },
    { id: "widget-3", x: 0, y: 420, width: 500, height: 400 },
    { id: "widget-4", x: 520, y: 420, width: 500, height: 400 }
  ];

  return (
    <div className="relative h-screen flex flex-col">
      <div className="pl-4 pr-4 h-[175px]">
        <WelcomeCard isSidebarCollapsed={isSidebarCollapsed} />
      </div>
      <div className="h-[900px] overflow-auto p-4 relative" ref={containerRef}>
        {/* Add CSS for positioned widgets */}
        <style>
          {`
            .dashboard-widget {
              position: absolute;
              min-width: 350px;
              min-height: 300px;
              max-width: 700px;
              transition: box-shadow 0.2s ease;
              background: white;
            }
            
            .dashboard-widget:hover {
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              z-index: 10;
            }
            
            .positioned {
              position: absolute;
              z-index: 1;
            }
            
            .grid-drag-handle {
              cursor: move;
              user-select: none;
            }
            
            .resize-handle {
              position: absolute;
              bottom: 0;
              right: 0;
              width: 20px;
              height: 20px;
              cursor: nwse-resize;
              background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.2) 50%);
              border-radius: 0 0 4px 0;
            }
            
            .draggable-mirror {
              opacity: 0.8;
              box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            }
          `}
        </style>
        
        {/* LineChart 1 */}
        <div 
          id="widget-1"
          className="dashboard-widget"
          style={{
            width: `${widgetPositions[0].width}px`,
            height: `${widgetPositions[0].height}px`,
            transform: `translate3d(${widgetPositions[0].x}px, ${widgetPositions[0].y}px, 0)`
          }}
        >
          <div className="h-full flex flex-col rounded-lg shadow-md overflow-hidden">
            <div className="grid-drag-handle px-4 py-2 cursor-move bg-gray-100 rounded-t-lg flex justify-between items-center">
              <div className="resize-indicator">⋮⋮</div>
            </div>
            <div className="flex-1">
              <RevenueOverviewChart />
            </div>
          </div>
        </div>
        
        {/* RadarChart 1 */}
        <div 
          id="widget-2"
          className="dashboard-widget"
          style={{
            width: `${widgetPositions[1].width}px`,
            height: `${widgetPositions[1].height}px`,
            transform: `translate3d(${widgetPositions[1].x}px, ${widgetPositions[1].y}px, 0)`
          }}
        >
          <div className="h-full flex flex-col rounded-lg shadow-md overflow-hidden">
            <div className="grid-drag-handle px-4 py-2 cursor-move bg-gray-100 rounded-t-lg flex justify-between items-center">
              <div className="resize-indicator">⋮⋮</div>
            </div>
            <div className="flex-1">
              <RevenueOverviewRadarChart />
            </div>
          </div>
        </div>
        
        {/* LineChart 2 */}
        <div 
          id="widget-3"
          className="dashboard-widget"
          style={{
            width: `${widgetPositions[2].width}px`,
            height: `${widgetPositions[2].height}px`,
            transform: `translate3d(${widgetPositions[2].x}px, ${widgetPositions[2].y}px, 0)`
          }}
        >
          <div className="h-full flex flex-col rounded-lg shadow-md overflow-hidden">
            <div className="grid-drag-handle px-4 py-2 cursor-move bg-gray-100 rounded-t-lg flex justify-between items-center">
              <div className="resize-indicator">⋮⋮</div>
            </div>
            <div className="flex-1">
              <RevenueOverviewChart />
            </div>
          </div>
        </div>
        
        {/* RadarChart 2 */}
        <div 
          id="widget-4"
          className="dashboard-widget"
          style={{
            width: `${widgetPositions[3].width}px`,
            height: `${widgetPositions[3].height}px`,
            transform: `translate3d(${widgetPositions[3].x}px, ${widgetPositions[3].y}px, 0)`
          }}
        >
          <div className="h-full flex flex-col rounded-lg shadow-md overflow-hidden">
            <div className="grid-drag-handle px-4 py-2 cursor-move bg-gray-100 rounded-t-lg flex justify-between items-center">
              <div className="resize-indicator">⋮⋮</div>
            </div>
            <div className="flex-1">
              <RevenueOverviewRadarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;