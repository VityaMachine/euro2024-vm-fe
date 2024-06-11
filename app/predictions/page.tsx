"use client";

import React, { useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { Box } from "@mui/material";

import PredictionsPageMenu from "@/components/CustomComponents/PredictionsPageMenu/PredictionsPageMenu";
import Predictions from "@/components/CustomComponents/Predictions/Predictions";
import PredictionsList from "@/components/CustomComponents/PredictionsList/PredictionsList";
import PredictionTable from "@/components/CustomComponents/PredictionTable/PredictionTable";
import PredictionRules from "@/components/CustomComponents/PredictionRules/PredictionRules";

export default function PredictionsPage() {
  const [page, setPage] = useState<"predictions" | "table" | 'rules'>(
    "predictions"
  );

  return (
    <ProtectedRoute>
      <Box
        sx={{
          display: "flex",
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* menu */}
        <PredictionsPageMenu page={page} onPageChenge={setPage} />

        <Box sx={{
          mt: '30px'
        }}>
          {
            page === 'predictions' && <PredictionsList />
          }

          {
            page === 'table' && <PredictionTable />
          }
          
          {
            page === 'rules' && <PredictionRules />
          }
        </Box>

        
      </Box>
      
    </ProtectedRoute>
  );
}
