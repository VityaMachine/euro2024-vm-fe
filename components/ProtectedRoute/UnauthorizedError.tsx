import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function UnauthorizedError() {
  return (
    <Box>
      <Typography variant="h5">Сталась помилка!</Typography>
      <Typography variant="body1">
        Для перегляду вмісту даної сторінки необхідно{" "}
        <Link
          className="underline hover:underline-offset-4"
          href={"/auth/sign-in"}
        >
          авторизуватись
        </Link>{" "}
        (якщо немає аккаунту -{" "}
        <Link
          className="underline hover:underline-offset-4"
          href={"/auth/sign-up"}
        >
          зареєструватись
        </Link>
        )
      </Typography>
    </Box>
  );
}
