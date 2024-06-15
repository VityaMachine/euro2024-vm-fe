import Image from "next/image";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { green, red, amber } from "@mui/material/colors";

import { useTheme } from "@mui/material/styles";

export default function GroupsTables({
  standingsData,
}: {
  standingsData: IStandingState[] | null;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px",
          mt: "30px",
        }}
      >
        {standingsData?.map((item) => (
          <Box
            key={item.groupName}
            sx={
              {
                // my: "30px",
              }
            }
          >
            <Typography>{item.groupName}</Typography>

            {/* desktop and tablet */}
            <TableContainer>
              <Table
                size="small"
                sx={{
                  width: 560,
                  display: {
                    xs: "none",
                    sm: "table-row",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                      }}
                      align="center"
                    >
                      #
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      Збірна
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      М
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      В
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      Н
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      П
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      ГЗ
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      ГП
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      РГ
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      О
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.data.map((team, idx, arr) => (
                    <TableRow key={team.team.id}>
                      <TableCell>
                        <Typography
                          align="center"
                          sx={{
                            bgcolor:
                              arr.length === 4
                                ? idx === 0 || idx === 1
                                  ? theme.palette.mode === "dark"
                                    ? green[800]
                                    : green[300]
                                  : idx === 2
                                  ? theme.palette.mode === "dark"
                                    ? amber[800]
                                    : amber[400]
                                  : theme.palette.mode === "dark"
                                  ? red[400]
                                  : red[300]
                                : idx <= 3
                                ? theme.palette.mode === "dark"
                                  ? green[800]
                                  : green[300]
                                : theme.palette.mode === "dark"
                                ? red[400]
                                : red[300],
                            borderRadius: "50%",
                            width: "21px",
                            fontSize: "14px",
                          }}
                        >
                          {team.rank}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            minWidth: "110px",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            src={team.team.logo}
                            alt={team.team.name}
                            width={25}
                            height={25}
                            className="w-[25px] h-[25px] object-contain"
                          />
                          &nbsp;
                          {team.team.name.split(" ")[0]}
                        </Box>
                      </TableCell>
                      <TableCell align="center">{team.all.played}</TableCell>

                      <TableCell align="center">{team.all.win}</TableCell>
                      <TableCell align="center">{team.all.draw}</TableCell>
                      <TableCell align="center">{team.all.lose}</TableCell>
                      <TableCell align="center">{team.all.goals.for}</TableCell>
                      <TableCell align="center">
                        {team.all.goals.against}
                      </TableCell>
                      <TableCell align="center">
                        {team.all.goals.for && team.all.goals.against
                          ? team.all.goals.for - team.all.goals.against
                          : 0}
                      </TableCell>
                      <TableCell align="center">{team.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* mobile */}

            <TableContainer>
              <Table
                size="small"
                sx={{
                  // maxWidth: 400,
                  display: {
                    xs: "table-row",
                    sm: "none",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>
                      #
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Збірна</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>М</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        minWidth: 80,
                        fontWeight: 700,
                      }}
                    >
                      В/Н/П
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        minWidth: 75,
                        fontWeight: 700,
                      }}
                    >
                      ГЗ/ГП
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>О</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.data.map((team, idx, arr) => (
                    <TableRow key={team.team.id}>
                      <TableCell>
                        <Typography
                          align="center"
                          sx={{
                            bgcolor:
                              arr.length === 4
                                ? idx === 0 || idx === 1
                                  ? theme.palette.mode === "dark"
                                    ? green[800]
                                    : green[300]
                                  : idx === 2
                                  ? theme.palette.mode === "dark"
                                    ? amber[800]
                                    : amber[400]
                                  : theme.palette.mode === "dark"
                                  ? red[400]
                                  : red[300]
                                : idx <= 3
                                ? theme.palette.mode === "dark"
                                  ? green[800]
                                  : green[300]
                                : theme.palette.mode === "dark"
                                ? red[400]
                                : red[300],
                            borderRadius: "50%",
                            width: "21px",
                            fontSize: "14px",
                          }}
                        >
                          {team.rank}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            minWidth: "50px",
                          }}
                        >
                          <Image
                            src={team.team.logo}
                            alt={team.team.name}
                            width={25}
                            height={25}
                            className="w-[25px] h-[25px] object-contain"
                          />
                          &nbsp;
                          {team.team.name === "Slovakia"
                            ? "SVK"
                            : team.team.name === "Slovenia"
                            ? "SVN"
                            : team.team.name.slice(0, 3).toUpperCase()}
                        </Box>
                      </TableCell>
                      <TableCell align="center">{team.all.played}</TableCell>
                      <TableCell align="center">
                        {team.all.win}/{team.all.draw}/{team.all.lose}
                      </TableCell>
                      <TableCell align="center">
                        {team.all.goals.for}/{team.all.goals.against}
                      </TableCell>
                      <TableCell align="center">{team.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          mb: "40px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Опис позначень:
        </Typography>
        <Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                minWidth: "21px",
                height: "21px",
                borderRadius: "50%",
                bgcolor:
                  theme.palette.mode === "dark" ? green[800] : green[300],
              }}
            ></Box>
            &nbsp;
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              - Прохід команди в плей офф
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                minWidth: "21px",
                height: "21px",
                borderRadius: "50%",
                bgcolor:
                  theme.palette.mode === "dark" ? amber[800] : amber[400],
              }}
            ></Box>
            &nbsp;
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              - Можливий прохід команди в плей офф через групу третіх місць
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                minWidth: "21px",
                height: "21px",
                borderRadius: "50%",
                bgcolor: theme.palette.mode === "dark" ? red[400] : red[300],
              }}
            ></Box>
            &nbsp;
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              - Виліт команди
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>#</Typography>
            &nbsp;
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              - Ранг
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>М</Typography>
            &nbsp;
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              - Матчі
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>В</Typography>
            &nbsp;
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              - Виграші
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Н</Typography>
            &nbsp;
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              - Нічиї
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>П</Typography>
            &nbsp;
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              - Програші
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>ГЗ</Typography>
            &nbsp;
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              - Голів забито
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>ГП</Typography>
            &nbsp;
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              - Голів пропущено
            </Typography>
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>РГ</Typography>
            &nbsp;
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              - Різниця голів
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>О</Typography>
            &nbsp;
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              - Очки
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
