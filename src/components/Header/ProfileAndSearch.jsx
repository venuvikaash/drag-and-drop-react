import React from "react";
import { InputBase, Badge, Avatar, IconButton } from "@mui/material";
import { Search, ChatBubbleOutline, Notifications } from "@mui/icons-material";

const ProfileAndSearch = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
        <InputBase
          placeholder="Search placeholder"
          className="flex-grow text-gray-600 focus:outline-none"
        />
        <Search className="text-gray-500" />
      </div>

      {/* Icons and Profile */}
      <div className="flex items-center gap-4">
        {/* Chat Icon */}
        <IconButton className="bg-[#EEF4E7] p-2 rounded-full">
          <ChatBubbleOutline className="text-gray-700" />
        </IconButton>

        {/* Notification Icon */}
        <IconButton className="bg-[#EEF4E7] p-2 rounded-full">
          <Badge
            color="error"
            variant="dot"
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Notifications className="text-gray-700" />
          </Badge>
        </IconButton>

        {/* User Info and Last Login */}
        <div className="flex flex-col items-end">
          <span className="text-gray-800 font-semibold">Andrew Forbist</span>
          <span className="text-gray-500 text-sm"> {/* Added margin-top for spacing */}
            Last Log in <span className="font-bold">10 Nov, 2022 3:34</span>
          </span>
        </div>

        {/* User Avatar */}
        <Avatar sx={{ bgcolor: "#A5EC8E", width: 36, height: 36 }} />
      </div>
    </div>
  );
};

export default ProfileAndSearch;
