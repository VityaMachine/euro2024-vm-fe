"use client";

import { useContext } from "react";

import { MobileSideMenuContext } from "@/contexts/MobileSideMenuContext";

import { ThemeContext } from "@/contexts/ThemeContext";

import { Box, Container, Drawer, IconButton, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MenuContent from "../MenuContent/MenuContent";

export default function MobileMenu() {
  const { open, toggleOpen } = useContext(MobileSideMenuContext);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Drawer
      open={open}
      onClose={toggleOpen}
      sx={{
        display: {
          xs: "block",
          md: "none",
        },
        scrollbarWidth: 0,
      }}
    >
      <Box
        sx={{
          width: "190px"
        }}
      >
        {/* Title */}

        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 999,
          }}
        >
          {/* header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: {
                xs: "56px",
                sm: "64px",
              },
              bgcolor: "#0F1924",
            }}
          >
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography color="#fff">Меню</Typography>

              <IconButton onClick={toggleOpen}>
                <HighlightOffIcon
                  fontSize="large"
                  sx={{
                    fill: "#fff",
                  }}
                />
              </IconButton>
            </Container>
          </Box>
        </Box>

        {/* menu */}
        <MenuContent />
      </Box>
    </Drawer>
  );
}
