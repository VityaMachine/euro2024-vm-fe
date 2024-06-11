"use client";

import { useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { Box, Typography, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PersonalInfo from "@/components/CustomComponents/ProfileInfo/ProfileInfo";

export default function Profile() {
  const [dataType, setDataType] = useState<"general" | "bets">("general");

  const handleDataTypeChange = (
    event: React.SyntheticEvent,
    newValue: "general" | "bets"
  ) => {
    setDataType(newValue);
  };


  
  return (
    <ProtectedRoute>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: "10px",
          }}
        >
          Сторінка профілю
        </Typography>

        <PersonalInfo />


        {/* <TabContext value={dataType}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleDataTypeChange}>
              <Tab label="Загальне" value="general" />
              <Tab label="Прогнози" value="bets" />
            </TabList>
          </Box>
          <TabPanel value="general">
            <PersonalInfo />
          </TabPanel>
          <TabPanel value="bets">Bets info</TabPanel>
        </TabContext> */}
      </Box>
    </ProtectedRoute>
  );
}
