"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "@/contexts/AuthContext";

export default function MobileAuthMenu({
  authUser,
}: {
  authUser: IAuthUser | null;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { signOut } = useContext(AuthContext);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: authUser ? "orange" : "red",
              }}
            >
              {authUser ? (
                authUser.username[0].toUpperCase()
              ) : (
                <AccountCircleIcon
                  sx={{
                    color: "white",
                  }}
                />
              )}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {authUser ? (
          <Box>
            <MenuItem onClick={handleClose}>
              <Link href={"/profile"}>Профіль</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                signOut();
                handleClose();
              }}
            >
              Вийти
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem onClick={handleClose}>
              <Link href={"/auth/sign-up"}>Реєстрація</Link>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Link href={"/auth/sign-in"}>Вхід</Link>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  );
}
