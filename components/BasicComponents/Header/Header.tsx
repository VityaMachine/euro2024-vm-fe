import Authorization from "@/components/CustomComponents/HeaderComponents/Authorization/Authorization";
import Logo from "@/components/CustomComponents/HeaderComponents/Logo/Logo";
import MobileMenuBtn from "@/components/CustomComponents/HeaderComponents/MobileMenuBtn/MobileMenuBtn";
import { AppBar, Box, Toolbar } from "@mui/material";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#0F1924",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* mobile menu btn */}
        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },

            // width: '33%',
            width: {
              md: "33%",
            },
          }}
        >
          <MobileMenuBtn />
        </Box>

        {/* logo */}
        <Box>
          <Logo />
        </Box>

        {/* sign-up / sign-in */}

        <Box>
          <Authorization />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
