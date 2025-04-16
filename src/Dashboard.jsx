import React, { useEffect } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import RevenueOverviewRadarChart from "./RevenueOverviewRadarChart";
import RevenueOverviewChart from "./RevenueOverviewChart";
import WelcomeCard from "./WelcomeCard";

const Dashboard = ({ isSidebarCollapsed }) => {
  useEffect(() => {
    // Load gridstack
    let grid;
    
    // Wait for DOM to be fully loaded
    setTimeout(() => {
      try {
        grid = GridStack.init({
          column: 12,
          minRow: 1,
          cellHeight: 80,
          // Ensure items maintain width constraints during resize
          minWidth: 350,
          maxWidth: 700,
          // Enable dragging by handle only
          draggable: {
            handle: '.grid-drag-handle',
          },
          // Define what parts of the item are resizable
          resizable: {
            handles: 'e, se, s, sw, w',
          },
          float: true,
          animate: true
        });
        
        // Listen for changes and save layout
        grid.on('change', () => {
          localStorage.setItem('dashboard-layout', JSON.stringify(grid.save()));
        });
        
        // Try to load saved layout
        const savedLayout = localStorage.getItem('dashboard-layout');
        if (savedLayout) {
          try {
            grid.load(JSON.parse(savedLayout));
          } catch (e) {
            console.error("Failed to load saved layout", e);
            localStorage.removeItem('dashboard-layout');
          }
        }
      } catch (error) {
        console.error("GridStack initialization error:", error);
      }
    }, 100);
    
    // Cleanup
    return () => {
      if (grid) {
        try {
          grid.destroy(false); // false means don't remove DOM elements
        } catch (error) {
          console.error("Error cleaning up GridStack:", error);
        }
      }
    };
  }, []);

  return (
    <div className="relative h-screen flex flex-col">
      <div className="pl-4 pr-4 h-[175px]">
        <WelcomeCard isSidebarCollapsed={isSidebarCollapsed} />
      </div>
      <div className="h-[900px] overflow-auto p-4">
        <div className="grid-stack">
          {/* LineChart 1 */}
          <div 
            className="grid-stack-item" 
            gs-w="6" 
            gs-h="5" 
            gs-x="0" 
            gs-y="0"
          >
            <div className="grid-stack-item-content p-0 flex flex-col">
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
            className="grid-stack-item" 
            gs-w="6" 
            gs-h="5" 
            gs-x="6" 
            gs-y="0"
          >
            <div className="grid-stack-item-content p-0 flex flex-col">
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
            className="grid-stack-item" 
            gs-w="6" 
            gs-h="5" 
            gs-x="0" 
            gs-y="5"
          >
            <div className="grid-stack-item-content p-0 flex flex-col">
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
            className="grid-stack-item" 
            gs-w="6" 
            gs-h="5" 
            gs-x="6" 
            gs-y="5"
          >
            <div className="grid-stack-item-content p-0 flex flex-col">
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
    </div>
  );
};

export default Dashboard;