"use client";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ModeToggler from "../ModeToggler/ModeToggler";
import Link from "next/link";

import CircleIcon from "@mui/icons-material/Circle";

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
      }}
    >
      <ModeToggler />

      <Box
        sx={{
          mx: "15px",
        }}
      >
        <Typography align="center">Головне меню</Typography>

        <List component="nav">
          <ListItemButton selected>
            <Link
              href={"/"}
              className="flex justify-between items-center w-full"
            >
              Головна

              <CircleIcon
                sx={{
                  width: "12px",
                  height: "12px",
                }}
              />
            </Link>
          </ListItemButton>

          <ListItemButton >
            <Link
              href={"/fixtures"}
              className="flex justify-between items-center w-full"
            >
              Матчі

              {/* <CircleIcon
                sx={{
                  width: "12px",
                  height: "12px",
                }}
              /> */}
            </Link>
          </ListItemButton>

          <ListItemButton >
            <Link
              href={"/standings"}
              className="flex justify-between items-center w-full"
            >
              Результати

              {/* <CircleIcon
                sx={{
                  width: "12px",
                  height: "12px",
                }}
              /> */}
            </Link>
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
}
