"use client";

import { ChangeEvent, useState, useContext } from "react";

import { AuthContext } from "@/contexts/AuthContext";

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Input,
  ListItem,
  Typography,
} from "@mui/material";
import Image from "next/image";

import { red } from "@mui/material/colors";
import axios, { AxiosError } from "axios";

export default function PreditctionListItem({
  preditionItem,
  updateDataHandler,
}: {
  preditionItem: IPredictionsData;
  updateDataHandler: () => Promise<void>;
}) {
  const [homeTeamGoalsPredict, setHomeTeamGoalsPredict] = useState<string>("");
  const [awayTeamGoalsPredict, setAwayTeamGoalsPredict] = useState<string>("");
  const [scoreError, setScoreError] = useState<boolean>(false);
  const [respError, setRespError] = useState<null | string>();
  const [isSended, setIsSended] = useState<boolean>(false);

  const { token } = useContext(AuthContext);

  const goalsInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "homeGoals") {
      setScoreError(false);
      setHomeTeamGoalsPredict((value) =>
        value.length === 0
          ? e.target.value
          : e.target.value
          ? e.target.value[e.target.value.length - 1]
          : ""
      );
    }

    if (e.target.name === "awayGoals") {
      setScoreError(false);
      setAwayTeamGoalsPredict((value) =>
        value.length === 0
          ? e.target.value
          : e.target.value
          ? e.target.value[e.target.value.length - 1]
          : ""
      );
    }
  };

  const onMakePrediction = async () => {
    if (!isSended) {
      const predictionData = {
        fixtureId: preditionItem.fixtureId,
        homeTeamGoals: homeTeamGoalsPredict,
        awayTeamGoals: awayTeamGoalsPredict,
      };

      if (
        predictionData.homeTeamGoals === "" ||
        predictionData.homeTeamGoals === ""
      ) {
        setScoreError(true);
        return;
      }

      try {
        const makePredictResp = await axios.post(
          `${process.env.NEXT_PUBLIC_BE_HOST}/predictions`,
          predictionData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (makePredictResp.status === 200) {
          setIsSended(true);
          updateDataHandler();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setRespError(error.response?.data.message);
        }
      }
    }
  };

  return (
    <ListItem
      sx={{
        minHeight: "60px",
        // mb: '5px',
        py: "5px",
        borderBottom: "1px solid",
        display: "flex",
        alignItems: "center",
      }}
      key={preditionItem.fixtureId}
    >
      {/* date */}
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
          minWidth: "64px",
          marginRight: "10px",
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
          {preditionItem.date_text.slice(0, 10).split("-").reverse().join(".")}
        </Typography>
      </Box>

      {/* home team */}
      <Box
        sx={{
          display: "flex",
          minWidth: {
            xs: "60px",
            sm: "120px",
          },
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
          {preditionItem.homeTeamNameOriginal.split(" ")[0]}
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
          {preditionItem.homeTeamNameOriginal === "Slovakia"
            ? "SVK"
            : preditionItem.homeTeamNameOriginal === "Slovenia"
            ? "SVN"
            : preditionItem.homeTeamNameOriginal.slice(0, 3).toUpperCase()}
        </Typography>

        <Image
          src={preditionItem.homeTeamLogo}
          alt={preditionItem.homeTeamNameOriginal}
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
          flexWrap: "nowrap",
          mx: "15px",
          minWidth: "32px",
          color: preditionItem.online ? red[700] : "none",
        }}
      >
        {preditionItem.prediction ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            <Typography>
              {preditionItem.prediction.homeTeamGoals}&nbsp;:&nbsp;
              {preditionItem.prediction.awayTeamGoals}
            </Typography>

            {/* <Input
              value={preditionItem.prediction.homeTeamGoals}
              readOnly
              disableUnderline
              sx={{
                width: "10px",
              }}
            />
            &nbsp;:&nbsp;
            <Input
              value={preditionItem.prediction.awayTeamGoals}
              readOnly
              disableUnderline
              sx={{
                width: "10px",
                color: "#000",
              }}
            /> */}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            <Input
              name="homeGoals"
              value={homeTeamGoalsPredict}
              onChange={goalsInputHandler}
              sx={{
                width: "10px",
              }}
              type="number"
            />
            &nbsp;:&nbsp;
            <Input
              name="awayGoals"
              value={awayTeamGoalsPredict}
              onChange={goalsInputHandler}
              sx={{
                width: "10px",
              }}
              type="number"
            />
          </Box>
        )}
      </Box>

      {/* away team */}
      <Box
        sx={{
          display: "flex",
          minWidth: {
            xs: "60px",
            sm: "120px",
          },
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Image
          src={preditionItem.awayTeamLogo}
          alt={preditionItem.awayTeamNameOriginal}
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
          {preditionItem.awayTeamNameOriginal.split(" ")[0]}
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
          {preditionItem.awayTeamNameOriginal === "Slovakia"
            ? "SVK"
            : preditionItem.awayTeamNameOriginal === "Slovenia"
            ? "SVN"
            : preditionItem.awayTeamNameOriginal.slice(0, 3).toUpperCase()}
        </Typography>
      </Box>

      {/* bet button or result */}
      <Box
        sx={{
          marginLeft: "10px",
          width: "140px",
        }}
      >
        {preditionItem.prediction ? (
          <Box>
            {preditionItem.statusShort === "NS" ||
            preditionItem.statusShort === "TBD" ? (
              <Typography variant="body2">матч не розпочався</Typography>
            ) : //   <Box
            //     sx={{
            //       display: "flex",
            //       flexDirection: "column",
            //     }}
            //   >
            //     <Typography variant="body2">
            //       Рахунок: {preditionItem.homeTeamGoalsFT}:
            //       {preditionItem.awayTeamGoalsFT}
            //     </Typography>
            //     <Typography variant="body2">Результат: 1.23</Typography>
            //   </Box>
            preditionItem.statusShort === "1H" ||
              preditionItem.statusShort === "2H" ||
              preditionItem.statusShort === "HT" ? (
              <Typography variant="body2">матч в процесі</Typography>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="body2">
                  Рахунок: {preditionItem.homeTeamGoalsFT}:
                  {preditionItem.awayTeamGoalsFT}
                </Typography>
                <Typography variant="body2">
                  Результат:{" "}
                  {preditionItem.prediction.predictionResult.points
                    ? preditionItem.prediction.predictionResult.points
                    : 0}
                  <br />({preditionItem.prediction.predictionResult.text})
                </Typography>
              </Box>
            )}
          </Box>
        ) : ["1H", "2H", "HT", "FT"].includes(preditionItem.statusShort) ? (
          <Typography variant="body2">Ставка більше недоступна</Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {isSended ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "115px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Button
                size="small"
                variant="contained"
                sx={{}}
                onClick={onMakePrediction}
              >
                Підтвердити
              </Button>
            )}

            {scoreError && (
              <Typography
                variant="caption"
                color="red"
                sx={{
                  mt: "8px",
                }}
              >
                Неповні дані
              </Typography>
            )}

            {respError && (
              <Typography
                variant="caption"
                color="red"
                sx={{
                  mt: "8px",
                }}
              >
                {respError}
              </Typography>
            )}
          </Box>
        )}
      </Box>
      {/* <Divider /> */}
    </ListItem>
  );
}
