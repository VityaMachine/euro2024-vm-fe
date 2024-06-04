"use client";

import SignInForm from "@/components/CustomComponents/SignInForm/SignInForm";
import { AuthContext } from "@/contexts/AuthContext";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";

export default function SignInPage() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  return (
    <Box
      sx={{
        mt: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SignInForm />
    </Box>
  );
}
