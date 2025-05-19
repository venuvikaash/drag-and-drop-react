import React, { useEffect, useState, lazy, Suspense } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);

// Lazy imports
const CustomRadarChart = lazy(() =>
  import("../components/Charts/CustomRadarChart")
);
const CustomLineChart = lazy(() =>
  import("../components/Charts/CustomLineChart")
);
const WelcomeCard = lazy(() => import("../components/WelcomeCard/WelcomeCard"));
const RecentUpdates = lazy(() => import("../components/Tabs/RecentUpdates"));
const RecentUpdateList = lazy(() =>
  import("../components/Tabs/RecentUpdateList")
);
const LeaveSummary = lazy(() => import("../components/Tabs/LeaveSummary"));
const TeamStatus = lazy(() => import("../components/Tabs/TeamsStatus"));
const Schedule = lazy(() => import("../components/Tabs/Schedule"));
const Notes = lazy(() => import("../components/Tabs/Notes"));
const Holidays = lazy(() => import("../components/Tabs/Holiday"));
const BirthdayTabs = lazy(() => import("../components/Tabs/BirthdayTabs"));
const Post = lazy(() => import("../components/Tabs/Post"));
const PostBox = lazy(() => import("../components/Tabs/PostBox"));
const LinearChart = lazy(() => import("../components/Charts/LinearChart"));
const PerformanceChart = lazy(() =>
  import("../components/Charts/PerformanceChart")
);
const SingleBarChart = lazy(() =>
  import("../components/Charts/SingleBarChart")
);
const PieChart = lazy(() => import("../components/Charts/PieChart"));
const WaveChart = lazy(() => import("../components/Charts/WaveChart"));
const GroupedBarChart = lazy(() =>
  import("../components/Charts/GroupedBarChart")
);
const HorizontalBarChart = lazy(() =>
  import("../components/Charts/HorizontalBarChart")
);
const CustomGaugeChart = lazy(() =>
  import("../components/Charts/CustomGaugeChart")
);
const EmployeeCalendar = lazy(() =>
  import("../components/Tabs/EmployeeCalendar")
);
const SmoothCurveChart = lazy(() =>
  import("../components/Charts/SmoothCurveChart")
);

// Default elements
const defaultElements = [
  {
    i: "custom-line-chart",
    component: <CustomLineChart />,
    x: 0,
    y: 0,
    w: 4,
    h: 7,
  },
  { i: "pie-chart", component: <PieChart />, x: 4, y: 0, w: 4, h: 7 },
  {
    i: "custom-radar-chart",
    component: <CustomRadarChart />,
    x: 8,
    y: 0,
    w: 4,
    h: 7,
  },
  { i: "wave-chart", component: <WaveChart />, x: 0, y: 7, w: 4, h: 5 },
  {
    i: "single-bar-chart",
    component: <SingleBarChart />,
    x: 4,
    y: 7,
    w: 4,
    h: 5,
  },
  {
    i: "grouped-bar-chart",
    component: <GroupedBarChart />,
    x: 8,
    y: 7,
    w: 4,
    h: 5,
  },
  { i: "linear-chart", component: <LinearChart />, x: 0, y: 12, w: 6, h: 5 },
  {
    i: "performance-chart",
    component: <PerformanceChart />,
    x: 6,
    y: 12,
    w: 6,
    h: 5,
  },
  {
    i: "recent-update-list",
    component: <RecentUpdateList />,
    x: 0,
    y: 17,
    w: 4,
    h: 6,
  },
  { i: "team-status", component: <TeamStatus />, x: 4, y: 17, w: 4, h: 6 },
  { i: "schedule", component: <Schedule />, x: 8, y: 17, w: 4, h: 11 },
  { i: "holidays", component: <Holidays />, x: 0, y: 22, w: 4, h: 7 },
  { i: "notes", component: <Notes />, x: 4, y: 22, w: 4, h: 7 },
  {
    i: "recent-updates",
    component: <RecentUpdates />,
    x: 0,
    y: 27,
    w: 8,
    h: 7,
  },
  { i: "leave-summary", component: <LeaveSummary />, x: 8, y: 27, w: 4, h: 9 },
  { i: "post-box", component: <PostBox />, x: 0, y: 34, w: 6, h: 5 },
  { i: "post", component: <Post />, x: 6, y: 34, w: 6, h: 9 },
  { i: "birthday-tabs", component: <BirthdayTabs />, x: 0, y: 38, w: 6, h: 7 },
  {
    i: "horizontal-bar-chart",
    component: <HorizontalBarChart />,
    x: 0,
    y: 43,
    w: 6,
    h: 5,
  },
  {
    i: "employee-calendar",
    component: <EmployeeCalendar />,
    x: 6,
    y: 43,
    w: 6,
    h: 12,
  },
  {
    i: "custom-gauge-chart",
    component: <CustomGaugeChart />,
    x: 0,
    y: 48,
    w: 6,
    h: 5,
  },
  {
    i: "smooth-curve-chart",
    component: <SmoothCurveChart />,
    x: 6,
    y: 52,
    w: 6,
    h: 4,
  },
];

const Dashboard = ({ isSidebarCollapsed }) => {
  const [layout, setLayout] = useState([]);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    try {
      // const savedLayout = localStorage.getItem("dashboardLayout");
      const savedLayout = null;
      if (savedLayout) {
        const parsedLayout = JSON.parse(savedLayout);
        const updatedElements = defaultElements.map((el) => {
          const saved = parsedLayout.find((item) => item.i === el.i);
          return saved ? { ...el, ...saved } : el;
        });
        setLayout(parsedLayout);
        setElements(updatedElements);
      } else {
        const initialLayout = defaultElements.map(({ i, x, y, w, h }) => ({
          i,
          x,
          y,
          w,
          h,
        }));
        setLayout(initialLayout);
        setElements(defaultElements);
      }
    } catch (err) {
      console.error("Failed to load layout:", err);
      setElements(defaultElements);
    }
  }, []);

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    localStorage.setItem("dashboardLayout", JSON.stringify(newLayout));
  };

  const resetLayout = () => {
    localStorage.removeItem("dashboardLayout");
    const defaultLayout = defaultElements.map(({ i, x, y, w, h }) => ({
      i,
      x,
      y,
      w,
      h,
    }));
    setLayout(defaultLayout);
    setElements(defaultElements);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="pl-4 pr-4 h-[175px] flex-shrink-0 relative">
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
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={80}
          width={1200}
          onLayoutChange={handleLayoutChange}
          draggableHandle=".grid-drag-handle"
        >
          {elements.map((el) => (
            <div key={el.i} className="bg-white rounded shadow">
              <div className="grid-drag-handle cursor-move p-2 border-b border-gray-200 font-semibold text-sm bg-gray-50">
                {el.i.replace(/-/g, " ")}
              </div>
              <div className="p-3 overflow-auto">
                <Suspense fallback={<div>Loading component...</div>}>
                  {el.component}
                </Suspense>
              </div>
            </div>
          ))}
        </ReactGridLayout>
      </div>
    </div>
  );
};

export default Dashboard;
