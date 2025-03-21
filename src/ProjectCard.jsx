import React, { memo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Grid,
  Link,
  AvatarGroup,
  styled,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  ChevronRight as ChevronRightIcon,
  FlashOn as FlashOnIcon,
} from "@mui/icons-material";
import { Handle, Position, NodeResizer } from "@xyflow/react";

// Custom styled components
const LightIconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(0, 201, 167, 0.1)",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SectionLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
  marginBottom: theme.spacing(0.5),
}));

const ProjectCard = ({ data, selected }) => {
  console.log("ProjectCard rendering, data:", data, "selected:", selected);
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Add NodeResizer */}
      <NodeResizer 
        color="#ff0071" 
        isVisible={selected} 
        minHeight={200} 
        minWidth={300} 
      />
      
      {/* Main Card */}
      <Card sx={{ 
        width: '100%', 
        height: '100%',
        borderRadius: 2, 
        overflow: 'auto',
        boxSizing: 'border-box'
      }}>
        <CardContent>
          {/* Header section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <LightIconWrapper>
                <FlashOnIcon color="primary" fontSize="small" />
              </LightIconWrapper>
              <Typography variant="h6">Recent Updates</Typography>
            </Box>
            <Link href="#" underline="none" color="primary" fontWeight="medium">
              View Details
            </Link>
          </Box>

          {/* Project name section */}
          <Box mb={2}>
            <SectionLabel>Project name</SectionLabel>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" fontWeight="medium">
                {data?.projectName || "Meta API Integration & Development"}
              </Typography>
              <Chip
                label="In Progress"
                size="small"
                sx={{
                  backgroundColor: "rgba(255, 152, 0, 0.1)",
                  color: "orange",
                  fontWeight: "medium",
                  borderRadius: "16px",
                  px: 1,
                }}
              />
            </Box>
          </Box>

          {/* Project details section */}
          <Grid container spacing={3} mb={3}>
            {/* Project Manager */}
            <Grid item xs={12} sm={4}>
              <SectionLabel>Project Manager</SectionLabel>
              <Box display="flex" alignItems="center" mt={0.5}>
                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>M</Avatar>
                <Typography fontWeight="medium">Malton</Typography>
              </Box>
            </Grid>

            {/* Team */}
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <SectionLabel>Team</SectionLabel>
              <AvatarGroup
                max={3}
                sx={{ mt: 0.5 }}
                style={{
                  marginTop: "1.5rem",
                }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: "grey.300" }}>
                  A
                </Avatar>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "grey.400" }}>
                  B
                </Avatar>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "grey.200" }}>
                  +2
                </Avatar>
              </AvatarGroup>
            </Grid>

            {/* Timeline */}
            <Grid item xs={12} sm={4}>
              <SectionLabel>Timeline</SectionLabel>
              <Box display="flex" alignItems="center" mt={0.5}>
                <CalendarIcon
                  fontSize="small"
                  sx={{ mr: 1, color: "text.secondary" }}
                />
                <Typography fontWeight="medium">
                  12th Dec 2024 - 20 Jan 2025
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Description section - only show if space available */}
          <Box mb={3}>
            <SectionLabel>Description</SectionLabel>
            <Typography variant="body2" color="text.secondary">
              {data?.description || "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </Typography>
          </Box>

          {/* See All Projects link */}
          <Link
            href="#"
            underline="none"
            color="text.primary"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "medium",
            }}
          >
            See All Projects
            <ChevronRightIcon fontSize="small" sx={{ ml: 0.5 }} />
          </Link>
        </CardContent>
      </Card>
      
      {/* Add connection handles */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default memo(ProjectCard);