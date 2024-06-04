import SignUpForm from "@/components/CustomComponents/SignUpForm/SignUpForm";
import { Container, Box } from "@mui/material";

export default function SignUpPage() {
  return (
    <Container>


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
