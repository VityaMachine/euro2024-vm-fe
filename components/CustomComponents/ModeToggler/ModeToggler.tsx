"use client";

import { useContext } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { ThemeContext } from "@/contexts/ThemeContext";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ModeToggler() {
  const { toggleMode } = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        my: "10px",
      }}
    >
      <Button onClick={toggleMode} variant="outlined">
        {theme.palette.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        <Typography>
          {theme.palette.mode === "light" ? "Темна тема" : "Світла тема"}
        </Typography>
      </Button>
    </Box>
  );
}
