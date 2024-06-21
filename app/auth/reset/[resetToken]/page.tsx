import ResetPwdForm from "@/components/CustomComponents/ResetPwdForm/ResetPwdForm";
import { Box } from "@mui/material";

export default function ResetPwdPage({
  params: { resetToken },
}: {
  params: { resetToken: string };
}) {
  return (
    <Box
      sx={{
        mt: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ResetPwdForm resetToken={resetToken} />
    </Box>
  );
}
