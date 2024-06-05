"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import Image from "next/image";

import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { green, red, amber } from "@mui/material/colors";
import GroupsTables from "@/components/CustomComponents/GroupsTables/GroupsTables";

export default function StandingsPage() {
  const [standingsData, setStandingsData] = useState<IStandingState[] | null>(
    null
  );

  const [status, setStatus] = useState<ApiStatusType>("idle");
  const theme = useTheme();

  useEffect(() => {
    const getStandingsData = async () => {
      try {
        const standingsRespData = await axios.get(
          `${process.env.BE_HOST}/standings`
        );

        if (standingsRespData.status === 200) {
          const respData = standingsRespData.data as IStandingsData[][];

          const groups = respData
            .map((group) => group.map((team) => team.group))
            .flat()
            .filter((item, i, ar) => ar.indexOf(item) === i);

          const stateData = groups.map((groupName, idx) => ({
            groupName,
            data: respData[idx],
          }));

          setStandingsData(stateData);
          setStatus("resolved");
        }
      } catch (error) {
        setStatus("rejected");
        console.log(error);
      }
    };

    getStandingsData();
  }, []);

  return (
    <Box
      sx={{
        mt: "40px",
      }}
    >
      {status === "idle" || status === "pending" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : status === "rejected" ? (
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            Сталась помилка!
          </Typography>
          <Typography>Щось пішло не так :(</Typography>
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Результати груп
          </Typography>

          <GroupsTables standingsData={standingsData} />
        </Box>
      )}
    </Box>
  );
}
