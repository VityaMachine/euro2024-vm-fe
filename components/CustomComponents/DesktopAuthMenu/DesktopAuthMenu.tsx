import { AuthContext } from "@/contexts/AuthContext";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";

export default function DesktopAuthMenu({
  authUser,
}: {
  authUser: IAuthUser | null;
}) {

  const {signOut} = useContext(AuthContext)


  return (
    <Box>
      {authUser ? (
        <Box>
          <Typography>Привіт {authUser.username}!</Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: "flex-end"
          }}>
            <Link
              className="underline hover:underline-offset-4"
              href={"/profile"}
            >
              Профіль
            </Link>{" "}
            /{" "}
            <Box
              className="underline hover:underline-offset-4 cursor-pointer"
              onClick={signOut}
            >
              Вийти
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Link
            className="underline hover:underline-offset-4"
            href={"/auth/sign-in"}
          >
            Логін
          </Link>{" "}
          /{" "}
          <Link
            className="underline hover:underline-offset-4"
            href={"/auth/sign-up"}
          >
            Реєстрація
          </Link>
        </Box>
      )}
    </Box>
  );
}
