import SignInForm from "@/components/CustomComponents/SignInForm/SignInForm";
import { Box } from "@mui/material";

export default function SignIn() {
  return (
    <Box sx={{
      mt: '20px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <SignInForm />
    </Box>
  );
}
