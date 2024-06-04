"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { Box } from "@mui/material";
import { useContext } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(AuthContext);

  return <Box>{user ? <>{children}</> : <Box>Unauthorized</Box>}</Box>;
}
