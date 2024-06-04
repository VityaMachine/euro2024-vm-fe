import Image from "next/image";

import { Box, List, ListItem, Typography } from "@mui/material";

import { red } from "@mui/material/colors";

export default function MatchesList({
  fixtures,
  selectedRound,
}: {
  fixtures: IFixtureData[];
  selectedRound: string;
}) {
  const fixturesToShow = fixtures.filter(
    (fixture) => fixture.round === selectedRound
  );

  return (
    <Box>
      <Typography align="center">
        Перелік матчів стадії <strong>{selectedRound}</strong>
      </Typography>
      <Box sx={{
        mt: '20px'
      }}>
        <List>
          {fixturesToShow.map((item) => (
            <ListItem key={item.fixtureId}>
              {/* date and time */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  alignItems: "center",
                  gap: {
                    xs: 0,
                    sm: "10px",
                  },
                  minWidth: {
                    xs: "55px",
                    sm: "110px",
                  },
                  // overflow: 'hidden'
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "12px",
                    },
                  }}
                >
                  {item.date_text.slice(0, 10).split("-").reverse().join(".")}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "12px",
                    },
                  }}
                >
                  {item.date_text.slice(11, 16)}
                </Typography>
              </Box>

              {/* home team */}
              <Box
                sx={{
                  display: "flex",
                  minWidth: "140px",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    mr: "5px",
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  {item.homeTeamNameOriginal}
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{
                    mr: "5px",
                    display: {
                      xs: "block",
                      sm: "none",
                    },
                  }}
                >
                  {item.homeTeamNameOriginal=== 'Slovakia' ? "SLK" : item.homeTeamNameOriginal.slice(0, 3).toUpperCase()}
                </Typography>

                <Image
                  src={item.homeTeamLogo}
                  alt={item.homeTeamNameOriginal}
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px] object-contain"
                />
              </Box>

              {/* score */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mx: "15px",
                  minWidth: "25px",
                  color: item.online ? red[700] : "none",
                }}
              >
                <Box>
                  {item.online ? item.online.goalsHome : item.homeTeamGoalsFT}
                  &nbsp;:&nbsp;
                  {item.online ? item.online.goalsAway : item.awayTeamGoalsFT}
                </Box>
              </Box>

              {/* Away team */}
              <Box
                sx={{
                  display: "flex",
                  minWidth: "140px",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Image
                  src={item.awayTeamLogo}
                  alt={item.awayTeamNameOriginal}
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px] object-contain"
                />

                <Typography
                  variant="subtitle2"
                  sx={{
                    ml: "5px",
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  {item.awayTeamNameOriginal}
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{
                    ml: "5px",
                    display: {
                      xs: "block",
                      sm: "none",
                    },
                  }}
                >
                  {item.awayTeamNameOriginal === 'Slovakia' ? "SLK" : item.awayTeamNameOriginal.slice(0, 3).toUpperCase()}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
