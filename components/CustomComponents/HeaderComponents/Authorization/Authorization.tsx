import { Box } from "@mui/material";
import MobileAuthMenu from "../../MobileAuthMenu/MobileAuthMenu";
import DesktopAuthMenu from "../../DesktopAuthMenu/DesktopAuthMenu";

export default function Authorization() {
  const isAuth = false;

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
        <MobileAuthMenu isAuthenticated={isAuth} />
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
        <DesktopAuthMenu isAuthenticated={isAuth} />
      </Box>
    </Box>
  );
}
