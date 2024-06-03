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
          <Link className="underline hover:underline-offset-4" href={"/auth/sign-in"}>Sign-in</Link>
            {" "}/{" "}
          <Link className="underline hover:underline-offset-4" href={"/auth/sign-up"}>Sign-Up</Link>
        </Box>
      )}
    </Box>
  );
}
