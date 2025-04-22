import React, { useEffect , lazy } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
const RevenueOverviewRadarChart = lazy(() =>
  import("../components/Charts/RevenueOverviewRadarChart")
);
const RevenueOverviewChart = lazy(() => import("../components/Charts/RevenueOverviewChart"));
const WelcomeCard = lazy(() => import("../components/Charts/WelcomeCard"));

let grid;

const InternalElements = [
  {
    element: <RevenueOverviewChart/>,
    gs_w: "6",
    gs_h: "5",
    gs_x: "0",
    gs_y: "0",
  },
  {
    element: <RevenueOverviewRadarChart/>,
    gs_w: "6",
    gs_h: "5",
    gs_x: "6",
    gs_y: "0",
  },
  {
    element: <RevenueOverviewChart/>,
    gs_w: "6",
    gs_h: "5",
    gs_x: "0",
    gs_y: "5",
  },
  {
    element: <RevenueOverviewRadarChart/>,
    gs_w: "6",
    gs_h: "5",
    gs_x: "6",
    gs_y: "5",
  },
];

const Dashboard = ({ isSidebarCollapsed }) => {

  useEffect(() => {
    grid = GridStack.init({
      column: 12,
      minRow: 1,
      cellHeight: 80,
      minWidth: 350,
      maxWidth: 700,
      draggable:{
        handle : '.grid-drag-handle'
      },
      resizable: {
        handles: 'e, se, s, sw, w',
      },
      float: true,
      animate: true,
      lazyLoad: false
    });
  }, [])  

  return (
    <div className="relative h-screen flex flex-col">
      <div className="pl-4 pr-4 h-[175px]">
        <WelcomeCard isSidebarCollapsed={isSidebarCollapsed} />
      </div>
      <div className="h-screen overflow-scroll p-4">
        <div className="grid-stack">
          {
            InternalElements.map((element, index) => {
              console.log(index);
              
              return (
                <div 
                  key={index}
                  className="grid-stack-item" 
                  gs-w={element.gs_w}
                  gs-h={element.gs_h} 
                  gs-x={element.gs_x} 
                  gs-y={element.gs_y}
                >
                  <div className="grid-stack-item-content p-0 flex flex-col">
                    <div className="grid-drag-handle px-4 py-2 cursor-move bg-gray-100 rounded-t-lg flex justify-between items-center">
                      <div className="resize-indicator">⋮⋮</div>
                    </div>
                    <div className="flex-1">
                      {element.element}
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div> 
      </div>
    </div>
  );
};

export default Dashboard;