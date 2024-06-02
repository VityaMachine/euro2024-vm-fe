import { Box } from "@mui/material";
import Link from "next/link";

export default function DesktopAuthMenu({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <Box>
      {isAuthenticated ? (
        <Box>Auth</Box>
      ) : (
        <Box>
          <Link href={"/auth/sign-in"}>Sign-in</Link>
            {" "}/{" "}
          <Link href={"/auth/sign-up"}>Sign-Up</Link>
        </Box>
      )}
    </Box>
  );
}
