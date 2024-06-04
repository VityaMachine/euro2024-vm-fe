"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { Box } from "@mui/material";
import { useContext } from "react";
import UnauthorizedError from "./UnauthorizedError";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{
      mt: '40px'
    }}>
      {user ? (
        <>{children}</>
      ) : (
        <Box>
          <UnauthorizedError />
        </Box>
      )}
    </Box>
  );
}
