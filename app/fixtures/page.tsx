"use client";

import { useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import axios from "axios";
import MatchesList from "@/components/CustomComponents/MatchesList/MatchesList";

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState<null | IFixtureData[]>(null);
  const [rounds, setRounds] = useState<null | string[]>(null);
  const [selectedRound, setSelectedRound] = useState<string>("");
  const [status, setStatus] = useState<ApiStatusType>("idle");

  useEffect(() => {
    const getFixtures = async () => {
      try {
        setStatus("pending");

        const fixtDataResp = await axios.get(
          `${process.env.NEXT_PUBLIC_BE_HOST}/fixtures/all`
        );

        if (fixtDataResp.status === 200) {
          const fixtData = fixtDataResp.data as IFixtureData[];

          setFixtures(fixtData);

          const rounds = fixtData
            .map((item) =>
              item.round.includes("Group")
                ? `Group round ${item.round[item.round.length - 1]}`
                : item.round
            )
            .filter((item, i, ar) => ar.indexOf(item) === i);

          setRounds(rounds);
          setSelectedRound(rounds[1]);
          setStatus("resolved");
        }
      } catch (error) {
        setStatus("rejected");
        console.log(error);
      }
    };

    getFixtures();
  }, []);

  const handleSelectRound = (e: SelectChangeEvent) => {
    setSelectedRound(e.target.value);
  };

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
          <Box
            sx={{
              width: "200px",
            }}
          >
            <Typography>Виберіть раунд:</Typography>
            <FormControl
              fullWidth
              size="small"
              sx={{
                mt: "20px",
              }}
            >
              <InputLabel id="round-select-label">Раунд</InputLabel>
              <Select
                labelId="round-select-label"
                id="round-select"
                value={selectedRound}
                label="Раунд"
                onChange={handleSelectRound}
              >
                {rounds?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              mt: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {fixtures && (
              <MatchesList fixtures={fixtures} selectedRound={selectedRound} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
