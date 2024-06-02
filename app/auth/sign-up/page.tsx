import SignUpForm from "@/components/CustomComponents/SignUpForm/SignUpForm";
import { Container, Typography, Box } from "@mui/material";

export default function SignUp() {
  return (
    <Container>
      <Typography
        variant="h5"
        align="center"
        sx={{
          my: 4,
        }}
      >
        Get started on VM EURO 2024 today
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SignUpForm />
      </Box>
    </Container>
  );
}
