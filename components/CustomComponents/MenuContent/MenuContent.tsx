"use client";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ModeToggler from "../ModeToggler/ModeToggler";

export default function MenuContent() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        // bgcolor: "yellow",
        borderRight:
          theme.palette.mode === "dark"
            ? "1px solid #393939"
            : "1px solid #e0e0e0",
        height: {
          xs: "calc(100vh - 66px)",
          sm: "calc(100vh - 74px)",
          md: "100vh",
        },
        color: "black",
      }}
    >
      <ModeToggler />
      MenuContent
    </Box>
  );
}
