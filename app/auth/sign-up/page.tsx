import SignUpForm from "@/components/CustomComponents/SignUpForm/SignUpForm";
import { Container, Box } from "@mui/material";

export default function SignUpPage() {
  return (
    <Container>


      <Box
        sx={{
          width: '100%',
          display: "flex",
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: 'center'
        }}
      >
        <SignUpForm />
      </Box>
    </Container>
  );
}
