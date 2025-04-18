import React from 'react';
import SegmentedControl from './SegmentedControl';
import ProfileAndSearch from './ProfileAndSearch';

const Header = ({isCollapsed}) => {
    return (
        <div className={`flex justify-between items-center w-[1400.8px] px-6 py-3 transition-all duration-300 ease-in-out ${isCollapsed ? "ml-[80px]" : "ml-[256px]"}`}>
            {/* Dashboard Title */}
            <div className="text-base font-semibold text-gray-800" style={{ width: "15%"}}>Dashboard</div>

            {/* Segmented Control */}
            <div className="flex-1 flex justify-center">
                <SegmentedControl />
            </div>

            {/* Profile & Search */}
            <div>
                <ProfileAndSearch />
            </div>
        </div>
    );
};

export default Header;
