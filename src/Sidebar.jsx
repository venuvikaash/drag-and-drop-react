import React, { useState } from 'react';
import { 
  Dashboard as DashboardIcon, 
  BarChart as AnalyticsIcon, 
  CalendarToday as CalendarIcon, 
  Person as ProfileIcon, 
  RequestPage as ServiceRequestIcon, 
  AccessTime as LeaveIcon, 
  MonetizationOn as LoansIcon, 
  Receipt as ExpenseIcon, 
  EmojiEvents as PerformanceIcon, 
  AttachMoney as PayrollIcon, 
  School as TrainingIcon, 
  Help as HelpIcon, 
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';

const Sidebar = ({ toggleSidebar, isCollapsed }) => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const mainItems = [
    { icon: <DashboardIcon />, label: "Dashboard" },
    { icon: <AnalyticsIcon />, label: "Analytics" },
    { icon: <CalendarIcon />, label: "Calendar" },
  ];

  const personalItems = [
    { icon: <ProfileIcon />, label: "My Profile" },
    { icon: <ServiceRequestIcon />, label: "Service Request" },
    { icon: <LeaveIcon />, label: "Leave & Timeoff" },
    { icon: <LoansIcon />, label: "Loans & Advances" },
    { icon: <ExpenseIcon />, label: "Expense Claims" },
    { icon: <PerformanceIcon />, label: "Performance" },
    { icon: <PayrollIcon />, label: "Payroll" },
    { icon: <TrainingIcon />, label: "Trainings" },
  ];

  const renderMenuItem = (item) => (
    <li
      key={item.label}
      className={`
        flex items-center 
        ${isCollapsed ? "justify-center pl-0" : "px-4"} 
        py-2 hover:bg-gray-100 cursor-pointer 
        ${activeSection === item.label ? "bg-gray-100" : ""}
        transition-all duration-300 ease-in-out
      `}
      title={isCollapsed ? item.label : ""}
      onClick={() => setActiveSection(item.label)}
    >
      <span className={`flex items-center ${isCollapsed ? "mx-auto" : "mr-3"}`}>
        {item.icon}
      </span>
      <span 
        className={`
          text-sm text-gray-700 
          ${isCollapsed ? "hidden opacity-0 w-0" : "block opacity-100 w-auto"}
          transition-all duration-300 ease-in-out
        `}
      >
        {item.label}
      </span>
    </li>
  );

  return (
    <aside
      className={`
        ${isCollapsed ? "w-20" : "w-64"} 
        h-[650px] mt-[25px] ml-[10px] rounded-2xl bg-white 
        shadow-md flex flex-col fixed top-0 left-0 z-50 
        transition-all duration-300 ease-in-out overflow-hidden
      `}
    >
      {/* Header Section */}
      <div className="h-16 flex items-center justify-between px-4">
        <h2 
          className={`
            text-xs text-gray-500 uppercase tracking-wider
            ${isCollapsed ? "hidden opacity-0 w-0" : "block opacity-100 w-auto"}
            transition-all duration-300 ease-in-out
          `}
        >
          MAIN
        </h2>
        <button
          onClick={toggleSidebar}
          className="hover:bg-gray-100 p-2 rounded-full focus:outline-none ml-auto"
        >
          {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </button>
      </div>

      {/* Navigation Section */}
      <div className="flex-grow">
        <div className="pb-2">
          <ul>{mainItems.map(renderMenuItem)}</ul>

          <h2 
            className={`
              px-4 py-2 text-xs text-gray-500 uppercase tracking-wider
              ${isCollapsed ? "hidden opacity-0 w-0" : "block opacity-100 w-auto"}
              transition-all duration-300 ease-in-out
            `}
          >
            PERSONAL
          </h2>

          <ul>{personalItems.map(renderMenuItem)}</ul>
        </div>
      </div>

      {/* Footer Section */}
      <div className="h-[100px]">
        {renderFooterItem(
          <HelpIcon />, 
          "Help", 
          "hover:bg-gray-100 text-gray-600"
        )}
        {renderFooterItem(
          <LogoutIcon color="error" />, 
          "Logout Account", 
          "hover:bg-red-50 text-red-600"
        )}
      </div>
    </aside>
  );

  // Helper function for footer items to reduce code duplication
  function renderFooterItem(icon, label, additionalClasses = "") {
    return (
      <div
        className={`
          flex items-center 
          ${isCollapsed ? "justify-center pl-0" : "px-4"} 
          py-2.5 cursor-pointer 
          ${additionalClasses}
          transition-all duration-300 ease-in-out
        `}
        title={isCollapsed ? label : ""}
      >
        <span className={`flex items-center ${isCollapsed ? "mx-auto" : "mr-3"}`}>
          {icon}
        </span>
        <span 
          className={`
            text-sm 
            ${isCollapsed ? "hidden opacity-0 w-0" : "block opacity-100 w-auto"}
            transition-all duration-300 ease-in-out
          `}
        >
          {label}
        </span>
      </div>
    );
  }
};

export default Sidebar;