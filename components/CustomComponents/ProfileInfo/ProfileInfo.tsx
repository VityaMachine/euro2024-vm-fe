"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";

export default function ProfileInfo() {
  const { user } = useContext(AuthContext);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Ім&apos;я:
        </Typography>
        &nbsp;
        <Typography>{user?.firstname}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Прізвище:
        </Typography>
        &nbsp;
        <Typography>{user?.secondname}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Дата народження:
        </Typography>
        &nbsp;
        <Typography>
          {user?.birthdate.split("-").reverse().join(".")}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Ім&apos;я користувача (логін):
        </Typography>
        &nbsp;
        <Typography>{user?.username}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Електронна пошта:
        </Typography>
        &nbsp;
        <Typography>{user?.email}</Typography>
      </Box>
    </Box>
  );
}
