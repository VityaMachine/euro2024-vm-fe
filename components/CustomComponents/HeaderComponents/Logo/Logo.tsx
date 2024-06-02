"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.png";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 56,
          fontSize: "16px",
        }}
      >
        <Image src={logo.src} alt="logo" width={45} height={45} />
        EURO 2024
      </Box>
    </Link>
  );
}
