import React, { useEffect, useRef, lazy } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

const CustomRadarChart = lazy(() => import("../components/Charts/CustomRadarChart"));
const CustomLineChart = lazy(() => import("../components/Charts/CustomLineChart"));
const WelcomeCard = lazy(() => import("../components/WelcomeCard/WelcomeCard"));
const RecentUpdates = lazy(() => import("../components/Tabs/RecentUpdates"));
const RecentUpdateList = lazy(() => import("../components/Tabs/RecentUpdateList"));
const LeaveSummary = lazy(() => import("../components/Tabs/LeaveSummary"));
const TeamStatus = lazy(() => import("../components/Tabs/TeamsStatus"));
const Schedule = lazy(() => import("../components/Tabs/Schedule"));
const Notes = lazy(() => import("../components/Tabs/Notes"));
const Holidays = lazy(() => import("../components/Tabs/Holiday"));
const BirthdayTabs = lazy(() => import("../components/Tabs/BirthdayTabs"));
const Post = lazy(() => import("../components/Tabs/Post"));
const PostBox = lazy(() => import("../components/Tabs/PostBox"));
const LinearChart = lazy(() => import("../components/Charts/LinearChart"));
const PerformanceChart = lazy(() => import("../components/Charts/PerformanceChart"));
const SingleBarChart = lazy(() => import("../components/Charts/SingleBarChart"));
const PieChart = lazy(() => import("../components/Charts/PieChart"));
const WaveChart = lazy(() => import("../components/Charts/WaveChart"));
const GroupedBarChart = lazy(() => import("../components/Charts/GroupedBarChart"));

const InternalElements = [
  {
    element: <CustomLineChart/>,
    width: 4,
    height: 5,
    x: 0,
    y: 0,
    noResize: false
  },
  {
    element: <PieChart/>,
    width: 4,
    height: 5,
    x: 4,
    y: 0,
    noResize: false
  },
  {
    element: <CustomRadarChart/>,
    width: 4,
    height: 5,
    x: 8,
    y: 0,
    noResize: false
  },
  {
    element: <WaveChart/>,
    width: 4,
    height: 4,
    x: 0,
    y: 5,
    noResize: false
  },
  {
    element: <SingleBarChart/>,
    width: 4,
    height: 4,
    x: 4,
    y: 5,
    noResize: false
  },
  {
    element: <GroupedBarChart/>,
    width: 4,
    height: 4,
    x: 8,
    y: 5,
    noResize: false
  },
  {
    element: <LinearChart/>,
    width: 6,
    height: 5,
    x: 0,
    y: 9,
    noResize: true
  },  
  {
    element: <PerformanceChart/>,
    width: 6,
    height: 5,
    x: 6,
    y: 9,
    noResize: true
  },
  {
    element: <LeaveSummary/>,
    width: 6,
    height: 7,
    x: 0,
    y: 14,
    noResize: true
  },
  {
    element: <RecentUpdates/>,
    width: 6,
    height: 7,
    x: 6,
    y: 14,
    noResize: true
  },
  {
    element: <RecentUpdateList/>,
    width: 4,
    height: 5,
    x: 0,
    y: 21,
    noResize: true
  },  
  {
    element: <TeamStatus/>,
    width: 4,
    height: 5,
    x: 4,
    y: 21,
    noResize: true
  },
  {
    element: <Schedule/>,
    width: 4,
    height: 8,
    x: 9,
    y: 21,
    noResize: true
  },
  {
    element: <Holidays/>,
    width: 4,
    height: 4,
    x: 0,
    y: 26,
    noResize: true
  },    
  {
    element: <Notes/>,
    width: 4,
    height: 4,
    x: 4,
    y: 26,
    noResize: true
  },  
  {
    element: <Post/>,
    width: 6,
    height: 10,
    x: 6,
    y: 30,
    noResize: true
  },  
  {
    element: <PostBox/>,
    width: 6,
    height: 4,
    x: 0,
    y: 30,
    noResize: true
  },  
  {
    element: <BirthdayTabs/>,
    width: 6,
    height: 5,
    x: 0,
    y: 34,
    noResize: true
  },  
];

const Dashboard = ({ isSidebarCollapsed }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.destroy(false);
    }
    
    gridRef.current = GridStack.init({
      column: 12,
      minRow: 1,
      cellHeight: 80,
      minWidth: 350,
      maxWidth: 700,
      draggable: {
        handle: '.grid-drag-handle'
      },
      resizable: {
        handles: 'e, se, s, sw, w',
      },
      float: true,
      animate: true,
      disableOneColumnMode: true
    });

    gridRef.current.on('resizestart', function(event, el) {
      const index = parseInt(el.getAttribute('data-index'), 10);
      if (InternalElements[index]?.noResize) {
        return false;
      }
    });

    setTimeout(() => {
      const gridItems = document.querySelectorAll('.grid-stack-item');
      gridItems.forEach((item, index) => {
        if (InternalElements[index]?.noResize) {
          const resizeHandles = item.querySelectorAll('.ui-resizable-handle');
          resizeHandles.forEach(handle => handle.remove());
          item.classList.remove('ui-resizable');
          if (gridRef.current.engine.nodes[index]) {
            gridRef.current.engine.nodes[index].noResize = true;
          }
        }
      });
    }, 100);

    return () => {
      if (gridRef.current) {
        gridRef.current.destroy(false);
      }
    };
  }, []);

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
                  data-index={index}
                  className="grid-stack-item" 
                  gs-w={element.width}
                  gs-h={element.height}
                  gs-x={element.x}
                  gs-y={element.y}
                  gs-no-resize={element.noResize ? 'true' : undefined}
                  gs-id={`grid-item-${index}`}
                >
                  <div className="grid-stack-item-content grid-drag-handle cursor-move no-scrollbar">
                    <div className="grid-content no-scrollbar">
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