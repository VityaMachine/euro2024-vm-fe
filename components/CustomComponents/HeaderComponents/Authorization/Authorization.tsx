'use client';

import { Box } from "@mui/material";
import MobileAuthMenu from "../../MobileAuthMenu/MobileAuthMenu";
import DesktopAuthMenu from "../../DesktopAuthMenu/DesktopAuthMenu";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function Authorization() {

  const { user } = useContext(AuthContext)

  

  return (
    <Box>
      {/* mobile */}
      <Box
        sx={{
          display: {
            xs: "flex",
            md: "none",
          },
        }}
      >
        <MobileAuthMenu authUser={user} />
      </Box>

      {/* desktop  */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <DesktopAuthMenu authUser={user} />
      </Box>
    </Box>
  );
}
