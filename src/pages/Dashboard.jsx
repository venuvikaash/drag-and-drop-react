import React, { useEffect, useRef, lazy } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
// import PostBox from "../components/Charts/PostBox";
// import Post from "../components/Charts/Post";
// import BirthdayTabs from "../components/Charts/BirthdayTabs";

const RevenueOverviewRadarChart = lazy(() =>
  import("../components/Charts/RevenueOverviewRadarChart")
);
const RevenueOverviewChart = lazy(() => import("../components/Charts/RevenueOverviewChart"));
const WelcomeCard = lazy(() => import("../components/Charts/WelcomeCard"));
const RecentUpdates = lazy(() => import("../components/Charts/RecentUpdates"));
const RecentUpdateList = lazy(() => import("../components/Charts/RecentUpdateList"));
const LeaveSummary = lazy(() => import("../components/Charts/LeaveSummary"));
const TeamStatus = lazy(() => import("../components/Charts/TeamsStatus"));
const Schedule = lazy(() => import("../components/Charts/Schedule"));
const Notes = lazy(() => import("../components/Charts/Notes"));
const Holidays = lazy(() => import("../components/Charts/Holiday"));
const BirthdayTabs = lazy(() => import("../components/Charts/BirthdayTabs"));
const Post = lazy(() => import("../components/Charts/Post"));
const PostBox = lazy(() => import("../components/Charts/PostBox"));
const StackedRevenueOverview = lazy(() => import("../components/Charts/StackedRevenueOverview"))
const DepartmentHeadcountChart = lazy(() => import("../components/Charts/DepartmentHeadCountChart"))
const StatusRevenueChart = lazy(() => import("../components/Charts/StatusRevenueChart"))


const InternalElements = [
  {
    element: <RevenueOverviewChart/>,
    width: 6,
    height: 5,
    x: 0,
    y: 0,
    noResize: false
  },
  {
    element: <RevenueOverviewRadarChart/>,
    width: 4,
    height: 5,
    x: 6,
    y: 0,
    noResize: false
  },
  {
    element: <RevenueOverviewChart/>,
    width: 6,
    height: 5,
    x: 0,
    y: 5,
    noResize: false
  },
  {
    element: <RevenueOverviewRadarChart/>,
    width: 6,
    height: 5,
    x: 6,
    y: 5,
    noResize: false
  },
  {
    element: <LeaveSummary/>,
    width: 6,
    height: 7,
    x: 0,
    y: 10,
    noResize: true
  },
  {
    element: <RecentUpdates/>,
    width: 6,
    height: 7,
    x: 6,
    y: 10,
    noResize: true
  },
  {
    element: <RecentUpdateList/>,
    width: 4,
    height: 5,
    x: 0,
    y: 17,
    noResize: true
  },  
  {
    element: <TeamStatus/>,
    width: 4,
    height: 5,
    x: 4,
    y: 17,
    noResize: true
  },
  {
    element: <Schedule/>,
    width: 4,
    height: 10,
    x: 8,
    y: 17,
    noResize: true
  },  
  {
    element: <Holidays/>,
    width: 4,
    height: 8,
    x: 0,
    y: 22,
    noResize: true
  },  
  {
    element: <Notes/>,
    width: 4,
    height: 8,
    x: 4,
    y: 22,
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
    height: 5,
    x: 0,
    y: 30,
    noResize: true
  },  
  {
    element: <BirthdayTabs/>,
    width: 6,
    height: 5,
    x: 0,
    y: 35,
    noResize: true
  },  
 
  {
    element: <StackedRevenueOverview />,
    width: 6,
    height:5,
    x: 0,
    y: 35,
    noResize: true
  },

  {
    element: <DepartmentHeadcountChart />,
    width: 6,
    height:5,
    x: 0,
    y: 35,
    noResize: false
  },
  {
    element: <StatusRevenueChart />,
    width: 5,
    height: 10,
    x: 7,
    y: 17,
    noResize: false
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
                  <div className="grid-stack-item-content grid-drag-handle cursor-move">
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

      {/* <div className="flex flex-row gap-4 pl-7 pr-4">
        <div className="flex flex-col gap-6">
          <StackedRevenueOverview />
        </div>
        <div>
        </div>
      </div>  */}
    </div>
  );
};

export default Dashboard;