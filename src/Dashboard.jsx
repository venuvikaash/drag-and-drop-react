import React, { useEffect, useRef, useState } from 'react';
import { GridStack } from 'gridstack';
import RevenueOverviewChart from './RevenueOverviewChart';
import RevenueOverviewRadarChart from './RevenueOverviewRadarChart';
import WelcomeCard from './WelcomeCard';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/gridstack-extra.min.css';

const Dashboard = ({ isSidebarCollapsed }) => {
  const gridRef = useRef(null);
  const [grid, setGrid] = useState(null);
  
  useEffect(() => {
    // Initialize GridStack after the component is fully rendered
    let gridInstance;
    
    // Small timeout to ensure DOM is fully rendered
    setTimeout(() => {
      gridInstance = GridStack.init({
        column: 12,
        cellHeight: 80,
        animate: true,
        float: true,
        resizable: { handles: 'all' },
        draggable: true,
        disableDrag: false,
        disableResize: false,
      }, gridRef.current);
      
      setGrid(gridInstance);
      
      // Add event listeners to delete buttons
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const item = e.target.closest('.grid-stack-item');
          gridInstance.removeWidget(item);
        });
      });

      // Enable saving grid layout to localStorage
      gridInstance.on('change', () => {
        const serializedGrid = gridInstance.save();
        localStorage.setItem('dashboard-layout', JSON.stringify(serializedGrid));
      });

      // Load saved layout if available
      const savedLayout = localStorage.getItem('dashboard-layout');
      if (savedLayout) {
        try {
          const layout = JSON.parse(savedLayout);
          gridInstance.load(layout);
        } catch (e) {
          console.error('Failed to load saved layout', e);
        }
      }
    }, 100);
    
    // Clean up on unmount
    return () => {
      if (gridInstance) {
        gridInstance.destroy(false);
      }
    };
  }, []);
  
  const addWidget = (widgetType) => {
    if (!grid) return;
    
    let content = '';
    let width = 4;
    let height = 2;
    
    switch(widgetType) {
      case 'revenue-chart':
        // We'll use a placeholder that will be replaced with the actual React component
        content = `<div class="widget-placeholder" data-widget-type="revenue-chart">
                    <div class="widget-title">Revenue Overview</div>
                    <div id="revenue-chart-container-${Date.now()}"></div>
                    <button class="delete-btn">×</button>
                  </div>`;
        break;
      case 'radar-chart':
        content = `<div class="widget-placeholder" data-widget-type="radar-chart">
                    <div class="widget-title">Revenue Radar</div>
                    <div id="radar-chart-container-${Date.now()}"></div>
                    <button class="delete-btn">×</button>
                  </div>`;
        break;
      default:
        content = `<div class="grid-stack-item-content">
                    New Widget
                    <button class="delete-btn">×</button>
                  </div>`;
    }
    
    const widget = grid.addWidget({
      x: Math.floor(Math.random() * 6),
      y: Math.floor(Math.random() * 6),
      w: width,
      h: height,
      content: content
    });
    
    // Add event listener to the new delete button
    const deleteBtn = widget.querySelector('.delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        grid.removeWidget(widget);
      });
    }
    
    // If it's a React component widget, render it
    if (widgetType === 'revenue-chart' || widgetType === 'radar-chart') {
      setTimeout(() => {
        const container = widget.querySelector(widgetType === 'revenue-chart' 
          ? '[id^="revenue-chart-container-"]' 
          : '[id^="radar-chart-container-"]');
        
        if (container) {
          // Use ReactDOM to render the component into the container
          const renderTarget = document.createElement('div');
          renderTarget.className = 'react-component-container';
          container.appendChild(renderTarget);
          
          // Use dynamic import to avoid issues with SSR
          import('react-dom/client').then(({ createRoot }) => {
            const root = createRoot(renderTarget);
            if (widgetType === 'revenue-chart') {
              root.render(<RevenueOverviewChart />);
            } else {
              root.render(<RevenueOverviewRadarChart />);
            }
          });
        }
      }, 0);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      {/* Removed the "Add" buttons as requested */}
      
      {/* Added WelcomeCard component */}
      <div className="pl-4 pr-4 h-[175px]">
        <WelcomeCard isSidebarCollapsed={isSidebarCollapsed} />
      </div>
      
      <div className="grid-container" style={{ height: '600px', border: '1px solid #ddd' }}>
        <div className="grid-stack" ref={gridRef}>
          {/* Initial widgets with proper GridStack attributes */}
          <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <div className="widget-title">Revenue Overview</div>
              <RevenueOverviewChart />
              <button className="delete-btn">×</button>
            </div>
          </div>
          
          <div className="grid-stack-item" gs-x="4" gs-y="0" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <div className="widget-title">Revenue Radar</div>
              <RevenueOverviewRadarChart />
              <button className="delete-btn">×</button>
            </div>
          </div>
          
          <div className="grid-stack-item" gs-x="8" gs-y="0" gs-w="4" gs-h="4">
            <div className="grid-stack-item-content">
              <div className="widget-title">Summary Widget</div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Financial Overview</h3>
                <p>Drag and drop widgets to customize your dashboard layout.</p>
                <p className="mt-2">All changes will be saved automatically.</p>
              </div>
              <button className="delete-btn">×</button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .grid-stack {
          background: #f8f8f8;
          min-height: 100%;
        }
        
        .grid-stack-item-content {
          background-color: #ffffff;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
          position: relative;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }
        
        .widget-title {
          font-size: 16px;
          font-weight: bold;
          text-align: left;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        
        .delete-btn {
          position: absolute;
          top: 5px;
          right: 5px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #999;
          z-index: 10;
        }
        
        .delete-btn:hover {
          color: #f00;
        }
        
        .react-component-container {
          flex: 1;
          min-height: 0;
          display: flex;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;