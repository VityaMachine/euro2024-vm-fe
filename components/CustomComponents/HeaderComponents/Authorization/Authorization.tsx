import { Box } from "@mui/material";
import MobileAuthMenuUser from "../../MobileAuthMenuUser/MobileAuthMenuUser";
import MobileAuthMenuGuest from "../../MobileAuthMenuGuest/MobileAuthMenuGuest";

export default function Authorization() {
  const isAuth = 0;

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
        {isAuth ? <MobileAuthMenuUser /> : <MobileAuthMenuGuest />}
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
        desktop auth
      </Box>
    </Box>
  );
}
