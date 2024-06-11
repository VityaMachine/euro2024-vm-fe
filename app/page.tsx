"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Box, Typography, CircularProgress } from "@mui/material";
import MatchesList from "@/components/CustomComponents/MatchesList/MatchesList";

export default function MainPage() {
  const [nextFiveMatches, setNextFiveMatches] = useState<null | IFixtureData[]>(
    null
  );
  const [prevFiveMatches, setPrevFiveMatches] = useState<null | IFixtureData[]>(
    null
  );

  const [onlineMatches, setOnlineMatches] = useState<null | IFixtureData[]>(
    null
  );

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

          fixtData.sort((a, b) => {
            const dateA = new Date(a.dateTime).getTime();
            const dateB = new Date(b.dateTime).getTime();

            return dateA - dateB;
          });

          const onlineMatches = fixtData.filter((item) =>
            ["1H", "2H", "HT"].includes(item.statusShort)
          );
          const nextMatches = fixtData
            .filter((item) => ["NS", "TBD"].includes(item.statusShort))
            .slice(0, 5);
          const prevMatches = fixtData
            .filter((item) => item.statusShort === "FT")
            .reverse()
            .slice(0, 5);

          setOnlineMatches(onlineMatches);
          setNextFiveMatches(nextMatches);
          setPrevFiveMatches(prevMatches);

          setStatus("resolved");
        }
      } catch (error) {
        setStatus("rejected");
        console.log(error);
      }
    };

    getFixtures();
  }, []);

  return (
    <Box
      sx={{
        mt: "40px",
      }}
    >
      {" "}
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
          {onlineMatches && onlineMatches.length > 0 && (
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                }}
                variant="h6"
                align="center"
              >
                Матчі онлайн:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <MatchesList fixtures={onlineMatches} />
              </Box>
            </Box>
          )}
          {nextFiveMatches && nextFiveMatches.length > 0 && (
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                }}
                variant="h6"
                align="center"
              >
                Наступні 5 матчів:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <MatchesList fixtures={nextFiveMatches} />
              </Box>
            </Box>
          )}

          {prevFiveMatches && prevFiveMatches.length > 0 && (
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                }}
                variant="h6"
                align="center"
              >
                Попередні 5 матчів:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <MatchesList fixtures={prevFiveMatches} />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
