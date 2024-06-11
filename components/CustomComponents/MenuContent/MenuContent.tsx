"use client";

import { usePathname } from "next/navigation";

import { Box, List, ListItemButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ModeToggler from "../ModeToggler/ModeToggler";
import Link from "next/link";

import CircleIcon from "@mui/icons-material/Circle";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function MenuContent() {
  const theme = useTheme();
  const pathname = usePathname();

  const { user } = useContext(AuthContext);

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
        <Typography
          sx={{
            fontWeight: 700,
          }}
          align="center"
        >
          Головне меню:
        </Typography>

        <List component="nav">
          <ListItemButton selected={pathname.split("/")[1] === ""}>
            <Link
              href={"/"}
              className="flex justify-between items-center w-full"
            >
              <Typography
                sx={{
                  color:
                    theme.palette.mode === "light"
                      ? pathname.split("/")[1] === ""
                        ? "#1976D2"
                        : "black"
                      : "white",
                }}
              >
                Головна
              </Typography>
              {pathname.split("/")[1] === "" && (
                <CircleIcon
                  sx={{
                    width: "12px",
                    height: "12px",
                    color:
                      theme.palette.mode === "light"
                        ? pathname.split("/")[1] === ""
                          ? "#1976D2"
                          : "black"
                        : "white",
                  }}
                />
              )}
            </Link>
          </ListItemButton>

          <ListItemButton selected={pathname.split("/")[1] === "fixtures"}>
            <Link
              href={"/fixtures"}
              className="flex justify-between items-center w-full"
            >
              <Typography
                sx={{
                  color:
                    theme.palette.mode === "light"
                      ? pathname.split("/")[1] === "fixtures"
                        ? "#1976D2"
                        : "black"
                      : "white",
                }}
              >
                Матчі
              </Typography>
              {pathname.split("/")[1] === "fixtures" && (
                <CircleIcon
                  sx={{
                    width: "12px",
                    height: "12px",
                    color:
                      theme.palette.mode === "light"
                        ? pathname.split("/")[1] === "fixtures"
                          ? "#1976D2"
                          : "black"
                        : "white",
                  }}
                />
              )}
            </Link>
          </ListItemButton>

          <ListItemButton selected={pathname.split("/")[1] === "standings"}>
            <Link
              href={"/standings"}
              className="flex justify-between items-center w-full"
            >
              <Typography
                sx={{
                  color:
                    theme.palette.mode === "light"
                      ? pathname.split("/")[1] === "standings"
                        ? "#1976D2"
                        : "black"
                      : "white",
                }}
              >
                Групи
              </Typography>
              {pathname.split("/")[1] === "standings" && (
                <CircleIcon
                  sx={{
                    width: "12px",
                    height: "12px",
                    color:
                      theme.palette.mode === "light"
                        ? pathname.split("/")[1] === "standings"
                          ? "#1976D2"
                          : "black"
                        : "white",
                  }}
                />
              )}
            </Link>
          </ListItemButton>

          {user && (
            <ListItemButton
              sx={{
                border: "2px solid red",
              }}
              selected={pathname.split("/")[1] === "predictions"}
            >
              <Link
                href={"/predictions"}
                className="flex justify-between items-center w-full"
              >
                <Typography
                  sx={{
                    color:
                      theme.palette.mode === "light"
                        ? pathname.split("/")[1] === "predictions"
                          ? "#1976D2"
                          : "black"
                        : "white",

                    fontWeight: 700,
                  }}
                >
                  Прогнози
                </Typography>
                {pathname.split("/")[1] === "predictions" && (
                  <CircleIcon
                    sx={{
                      width: "12px",
                      height: "12px",
                      color:
                        theme.palette.mode === "light"
                          ? pathname.split("/")[1] === "predictions"
                            ? "#1976D2"
                            : "black"
                          : "white",
                    }}
                  />
                )}
              </Link>
            </ListItemButton>
          )}
        </List>
      </Box>
    </Box>
  );
}
