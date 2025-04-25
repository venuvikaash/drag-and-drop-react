import React from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  People,
  MonetizationOn,
  CalendarToday,
  Work,
} from "@mui/icons-material";

const WelcomeInternalCard = ({ icon: Icon, title, count, percentage }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      padding: "10px",
      color: "#FFFFFF",
      minWidth: "250px",
    }}
  >
    <div className="flex flex-row w-full">
      <Icon sx={{ fontSize: 20, color: "#00C17C" }} />
      <Typography variant="body1" sx={{ marginLeft: "20px" }}>
        {title}
      </Typography>
    </div>
    <div className="flex flex-row w-full">
      <Typography variant="h6" fontWeight="bold">
        {count}
      </Typography>
      <div className="flex flex-col ml-[10px]">
        <Typography variant="body1" color="#00DC7B">
          ↑ {percentage}%
        </Typography>
        <Typography variant="caption" color="#C8C7CC">
          Compared to (364 last week)
        </Typography>
      </div>
    </div>
  </Box>
);

const WelcomeCard = ({ isSidebarCollapsed }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px",
        width: "100%",
        height: "175px",
        borderRadius: "30px",
        background: "#1B4E4D",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.20)",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 15px",
        }}
      >
        <Box>
          <Typography variant="h6" color="#FFFFFF">
            Good Morning, Edward!
          </Typography>
          <Typography variant="body1" color="#00DC7B">
            Welcome back to Tech nova
          </Typography>
        </Box>
        <Button
          sx={{
            backgroundColor: "#D3FEAB",
            color: "#000000",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#B8E896",
            },
          }}
        >
          Check in
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "80%",
        }}
      >
        <WelcomeInternalCard
          icon={People}
          title="Total Employee"
          count={845}
          percentage={12}
        />
        <WelcomeInternalCard
          icon={MonetizationOn}
          title="Total Payrolls"
          count={845}
          percentage={12}
        />
        <WelcomeInternalCard
          icon={CalendarToday}
          title="Attendance Overview"
          count={845}
          percentage={12}
        />
        <WelcomeInternalCard
          icon={Work}
          title="Job Applicants"
          count={845}
          percentage={12}
        />
      </Box>
    </Box>
  );
};

export default WelcomeCard;
