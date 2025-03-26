import React, { useState, useRef, useEffect } from "react";
import { Resizable } from "re-resizable";
import RevenueOverviewRadarChart from "./RevenueOverviewRadarChart";
import EmployeesByDepartmentChart from "./EmployeesByDepartmentChart";
import RevenueOverviewChart from "./RevenueOverviewChart";
import WelcomeCard from "./WelcomeCard";

const DraggableResizableWrapper = ({ children, initialPosition = { x: 0, y: 0 } }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target === dragRef.current) {
      setIsDragging(true);
      offsetRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      style={{
        left: position.x, 
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab"
      }}
      onMouseDown={handleMouseDown}
    >
      <div 
        ref={dragRef} 
        style={{ 
          userSelect: "none", 
          height: "20px", 
          backgroundColor: "rgba(0,0,0,0.1)",
          cursor: "move"
        }} 
      />
      <Resizable
        defaultSize={{
          width: 400,
          height: 450
        }}
        minWidth={200}
        minHeight={200}
        maxWidth={600}
        maxHeight={500}
      >
        <div style={{ 
          height: "100%", 
          width: "100%", 
          border: "1px solid #ddd", 
          overflow: "hidden",
          position: "relative"
        }}>
          {children}
        </div>
      </Resizable>
    </div>
  );
};

const Dashboard = ({ isSidebarCollapsed }) => {
  return (
    <div className="relative h-screen flex flex-col">
      {/* Sticky WelcomeCard */}
      <div className="pl-4 pr-4 h-[175px]">
        <WelcomeCard isSidebarCollapsed={isSidebarCollapsed} />
      </div>
      <div className=" h-full overflow-scroll">
        <div className="flex mt-4 p-4 flex-wrap">
          <RevenueOverviewChart />
          {/* <EmployeesByDepartmentChart /> */}
          <RevenueOverviewRadarChart />
          <RevenueOverviewChart />
          <RevenueOverviewRadarChart />
          {/* <EmployeesByDepartmentChart /> */}
        </div>
      </div>

      {/* Draggable and Resizable Charts Container */}
    </div>
  );
};

export default Dashboard;
