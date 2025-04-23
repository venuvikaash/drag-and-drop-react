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
      lazyLoad: false,
      disableOneColumnMode: true
    });
  }, [])  

  return (
    <div className="h-full w-full flex flex-col">
      <div className="pl-4 pr-4 h-[175px] flex-shrink-0">
        <WelcomeCard isSidebarCollapsed={isSidebarCollapsed} />
      </div>
      <div className="flex-grow p-4 w-full">
        <div className="grid-stack h-full">
          {
            InternalElements.map((element, index) => {              
              return (
                <div 
                  key={index}
                  className="grid-stack-item" 
                  gs-w={parseInt(element.gs_w, 10)}
                  gs-h={parseInt(element.gs_h, 10)} 
                  gs-x={parseInt(element.gs_x, 10)} 
                  gs-y={parseInt(element.gs_y, 10)}
                >
                  <div className="grid-stack-item-content">
                    <div className="grid-drag-handle cursor-move">
                      <div className="resize-indicator">⋮⋮</div>
                    </div>
                    <div className="grid-content">
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