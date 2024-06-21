import ResetPwdReqForm from "@/components/CustomComponents/ResetPwdReqForm/ResetPwdReqForm";
import { Box } from "@mui/material";

export default function ResetReqPage() {
  return (
    <Box
    sx={{
      mt: "20px",
      display: "flex",
      justifyContent: "center",
    }}
  >

    <ResetPwdReqForm />
  </Box>
  )
}