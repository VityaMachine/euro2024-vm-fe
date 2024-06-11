import { ButtonGroup, Button } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

export default function PredictionsPageMenu({
  page,
  onPageChenge,
}: {
  page: "predictions" | "table" | 'rules';
  onPageChenge: React.Dispatch<
    React.SetStateAction<"predictions" | "table" | 'rules'>
  >;
}) {
  const theme = useTheme();
  return (
    <ButtonGroup
      size={useMediaQuery(theme.breakpoints.down("md")) ? "small" : "medium"}
      orientation={
        useMediaQuery(theme.breakpoints.down("sm")) ? "vertical" : "horizontal"
      }
    >
      <Button
        onClick={() => {
          onPageChenge("predictions");
        }}
        variant={page === "predictions" ? "contained" : "outlined"}
      >
        Мої прогнози
      </Button>
      <Button 
        onClick={() => {
          onPageChenge("table");
        }}
        variant={page === "table" ? "contained" : "outlined"}
      >
        Турнірна таблиця
      </Button>

      <Button 
        onClick={() => {
          onPageChenge("rules");
        }}
        variant={page === "rules" ? "contained" : "outlined"}
      >
        Правила гри
      </Button>
    </ButtonGroup>
  );
}
