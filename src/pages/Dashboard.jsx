import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
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
const HorizontalBarChart = lazy(() => import("../components/Charts/HorizontalBarChart"));
const CustomGaugeChart = lazy(() => import("../components/Charts/CustomGaugeChart"));
const EmployeeCalendar = lazy(() => import("../components/Tabs/EmployeeCalendar"));
const SmoothCurveChart = lazy(() => import("../components/Charts/SmoothCurveChart"));


const defaultElements = [
  {
    id: "custom-line-chart",
    element: <CustomLineChart />,
    width: 4,
    height: 7,
    x: 0,
    y: 0,
    noResize: false
  },
  {
    id: "pie-chart",
    element: <PieChart />,
    width: 4,
    height: 7,
    x: 4,
    y: 0,
    noResize: false
  },
  {
    id: "custom-radar-chart",
    element: <CustomRadarChart />,
    width: 4,
    height: 7,
    x: 8,
    y: 0,
    noResize: false
  },
  {
    id: "wave-chart",
    element: <WaveChart />,
    width: 4,
    height: 5,
    x: 0,
    y: 7,
    noResize: false
  },
  {
    id: "single-bar-chart",
    element: <SingleBarChart />,
    width: 4,
    height: 5,
    x: 4,
    y: 7,
    noResize: false
  },
  {
    id: "grouped-bar-chart",
    element: <GroupedBarChart />,
    width: 4,
    height: 5,
    x: 8,
    y: 7,
    noResize: false
  },
  {
    id: "linear-chart",
    element: <LinearChart />,
    width: 6,
    height: 5,
    x: 0,
    y: 12,
    noResize: false
  },
  {
    id: "performance-chart",
    element: <PerformanceChart />,
    width: 6,
    height: 5,
    x: 6,
    y: 12,
    noResize: false
  },
  {
    id: "recent-update-list",
    element: <RecentUpdateList />,
    width: 4,
    height: 5,
    x: 0,
    y: 17,
    noResize: false
  },
  {
    id: "team-status",
    element: <TeamStatus />,
    width: 4,
    height: 5,
    x: 4,
    y: 17,
    noResize: false
  },
  {
    id: "schedule",
    element: <Schedule />,
    width: 4,
    height: 10,
    x: 8,
    y: 17,
    noResize: false
  },
  {
    id: "holidays",
    element: <Holidays />,
    width: 4,
    height: 5,
    x: 0,
    y: 22,
    noResize: false
  },
  {
    id: "notes",
    element: <Notes />,
    width: 4,
    height: 5,
    x: 4,
    y: 22,
    noResize: false
  },
  {
    id: "recent-updates",
    element: <RecentUpdates />,
    width: 8,
    height: 7,
    x: 0,
    y: 27,
    noResize: false
  },
  {
    id: "leave-summary",
    element: <LeaveSummary />,
    width: 4,
    height: 7,
    x: 8,
    y: 27,
    noResize: false
  },
  {
    id: "post-box",
    element: <PostBox />,
    width: 6,
    height: 4,
    x: 0,
    y: 34,
    noResize: false
  },
  {
    id: "post",
    element: <Post />,
    width: 6,
    height: 9,
    x: 6,
    y: 34,
    noResize: false
  },
  {
    id: "birthday-tabs",
    element: <BirthdayTabs />,
    width: 6,
    height: 5,
    x: 0,
    y: 38,
    noResize: false
  },
  {
    id: "horizontal-bar-chart",
    element: <HorizontalBarChart />,
    width: 6,
    height: 5,
    x: 0,
    y: 43,
    noResize: false
  },
  {
    id: "employee-calendar",
    element: <EmployeeCalendar />,
    width: 6,
    height: 9,
    x: 6,
    y: 43,
    noResize: false
  },
  {
    id: "custom-gauge-chart",
    element: <CustomGaugeChart />,
    width: 6,
    height: 5,
    x: 0,
    y: 48,
    noResize: false
  },
  {
    id: "smooth-curve-chart",
    element: <SmoothCurveChart />,
    width: 6,
    height: 4,
    x: 6,
    y: 52,
    noResize: false
  }
];


const Dashboard = ({ isSidebarCollapsed }) => {
  const gridRef = useRef(null);
  const [elements, setElements] = useState([]);
  const gridInitialized = useRef(false);

  useEffect(() => {
    try {
      const savedLayout = localStorage.getItem("dashboardLayout");
      if (savedLayout) {
        const parsedLayout = JSON.parse(savedLayout);

        const layoutMap = {};
        parsedLayout.forEach((item) => {
          if (item.id) {
            layoutMap[item.id] = {
              id: item.id,
              x: item.x,
              y: item.y,
              width: item.w || item.width,
              height: item.h || item.height,
              noResize: item.noResize,
            };
          }
        });

        const updatedElements = defaultElements.map((element) => {
          const savedElement = layoutMap[element.id];
          if (savedElement) {
            return {
              ...element,
              x: savedElement.x,
              y: savedElement.y,
              width: savedElement.width,
              height: savedElement.height,
              noResize: element.noResize,
            };
          }
          return element;
        });

        setElements(updatedElements);
      } else {
        setElements(defaultElements);
      }
    } catch (error) {
      console.error("Error loading saved layout:", error);
      setElements(defaultElements);
    }
  }, []);

  useEffect(() => {
    if (!elements.length) return;

    const initializeGrid = () => {
      if (gridRef.current) {
        gridRef.current.destroy(false);
      }

      const grid = GridStack.init({
        column: 12,
        minRow: 1,
        cellHeight: 80,
        minWidth: 350,
        maxWidth: 700,
        draggable: {
          handle: ".grid-drag-handle",
        },
        resizable: {
          handles: "e, se, s, sw, w",
        },
        float: true,
        animate: true,
        disableOneColumnMode: true,
        staticGrid: false,
      });

      gridRef.current = grid;

      const saveLayout = () => {
        const serializedLayout = grid.save(false, false);
        localStorage.setItem("dashboardLayout", JSON.stringify(serializedLayout));
      };

      grid.on("change", saveLayout);
      grid.on("dragstop", saveLayout);
      grid.on("resizestop", saveLayout);

      setTimeout(() => {
        const gridItems = document.querySelectorAll(".grid-stack-item");
        gridItems.forEach((item) => {
          const itemId = item.getAttribute("gs-id");
          const element = elements.find((el) => el.id === itemId);

          if (element?.noResize) {
            const resizeHandles = item.querySelectorAll(".ui-resizable-handle");
            resizeHandles.forEach((handle) => handle.remove());
            item.classList.remove("ui-resizable");

            const nodeIndex = grid.engine.nodes.findIndex(
              (node) => node.el && node.el.getAttribute("gs-id") === itemId
            );

            if (nodeIndex >= 0) {
              grid.engine.nodes[nodeIndex].noResize = true;
            }
          }
        });

        grid.batchUpdate();
        elements.forEach((element) => {
          const node = {
            id: element.id,
            x: element.x,
            y: element.y,
            w: element.width,
            h: element.height,
            noResize: element.noResize,
          };
          grid.update(`[gs-id="${element.id}"]`, node);
        });
        grid.commit();

        saveLayout();
      }, 200);

      gridInitialized.current = true;
    };

    if (elements.length > 0) {
      setTimeout(initializeGrid, 50);
    }

    return () => {
      if (gridRef.current) {
        gridRef.current.off("change");
        gridRef.current.off("dragstop");
        gridRef.current.off("resizestop");
        gridRef.current.destroy(false);
        gridInitialized.current = false;
      }
    };
  }, [elements]);

  const resetLayout = () => {
    localStorage.removeItem("dashboardLayout");
    setElements(defaultElements);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="pl-4 pr-4 h-[175px] flex-shrink-0">
        <Suspense fallback={<div>Loading welcome card...</div>}>
          <WelcomeCard isSidebarCollapsed={isSidebarCollapsed} />
        </Suspense>
        <button
          onClick={resetLayout}
          className="absolute top-4 right-4 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          Reset Layout
        </button>
      </div>
      <div className="flex-grow p-4 w-full">
        <div className="grid-stack h-full">
          {elements.map((element) => (
            <div
              key={element.id}
              className="grid-stack-item"
              gs-id={element.id}
              gs-w={element.width}
              gs-h={element.height}
              gs-x={element.x}
              gs-y={element.y}
              gs-no-resize={element.noResize ? "true" : undefined}
              data-gs-width={element.width}
              data-gs-height={element.height}
              data-gs-x={element.x}
              data-gs-y={element.y}
            >
              <div className="grid-stack-item-content grid-drag-handle cursor-move no-scrollbar">
                <div className="grid-content no-scrollbar">
                  <Suspense fallback={<div>Loading component...</div>}>{element.element}</Suspense>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
