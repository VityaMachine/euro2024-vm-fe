"use client";

import { useContext, useEffect, useState } from "react";

import {
  Box,
  List,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

import { red } from "@mui/material/colors";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import PreditctionListItem from "../PreditctionListItem/PreditctionListItem";

export default function PredictionsList() {
  const [predictionsData, setPredictionsData] = useState<
    null | IPredictionsData[]
  >(null);

  const [status, setStatus] = useState<ApiStatusType>("idle");
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [matchesFilter, setMatchesFilter] = useState<
    "all" | "avaliable" | "finished"
  >("all");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getPredictionsData = async () => {
      setStatus("pending");

      try {
        const predictionsRespData = await axios.get(
          `${process.env.NEXT_PUBLIC_BE_HOST}/predictions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (predictionsRespData.status === 200) {
          const respData = predictionsRespData.data;
          setPredictionsData(respData);
          setStatus("resolved");
        }
      } catch (error) {
        console.log(error);
        setStatus("rejected");
      }
    };

    getPredictionsData();
  }, [token]);

  const updatePredictionDataHandler = async () => {
    try {
      const predictionsRespData = await axios.get(
        `${process.env.NEXT_PUBLIC_BE_HOST}/predictions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (predictionsRespData.status === 200) {
        setPredictionsData(predictionsRespData.data);
        setOpenAlert(true);
      }
    } catch (error) {
      console.log(error);
      setStatus("rejected");
    }
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const onMatchFilterChange = (e: SelectChangeEvent) => {
    setMatchesFilter(e.target.value as "all" | "avaliable" | "finished");
  };

  const data2show = predictionsData
    ? predictionsData.filter((item) => {
        if (matchesFilter === "all") {
          return item;
        }

        if (matchesFilter === "avaliable") {
          return ["NS", "TBD"].includes(item.statusShort) && !item.prediction;
        }

        if (matchesFilter === "finished") {
          return item.statusShort === "FT";
        }
      }).sort((a, b) => {
        const dateA = new Date(a.dateTime).getTime();
        const dateB = new Date(b.dateTime).getTime();

        return dateA - dateB;
      })
    : null;


    

  return (
    <Box>
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
              width: "100&",
              display: "flex",
              justifyContent: "center",
              mb: "20px",
            }}
          >
            <Box sx={{ width: "160px" }}>
              <FormControl fullWidth>
                <InputLabel id="matches-filter-label">Фільтр матчів</InputLabel>
                <Select
                  labelId="matches-filter-label"
                  id="matches-filter-select"
                  value={matchesFilter}
                  label="Фільтр матчів"
                  onChange={onMatchFilterChange}
                >
                  <MenuItem value="all">Всі</MenuItem>
                  <MenuItem value="avaliable">Доступні</MenuItem>
                  <MenuItem value="finished">Завершені</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Typography variant="h6" align="center">
            Перелік матчів
          </Typography>

          <Box
            sx={{
              my: "10px",
            }}
          >
            {data2show && data2show.length > 0 ? (
              <List>
                {data2show.map((item) => (
                  <PreditctionListItem
                    key={item.fixtureId}
                    preditionItem={item}
                    updateDataHandler={updatePredictionDataHandler}
                  />
                ))}
              </List>
            ) : (
              <Typography align="center">Матчі відсутні</Typography>
            )}
          </Box>
        </Box>
      )}

      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
          variant="standard"
        >
          Ставка успішно прийнята
        </Alert>
      </Snackbar>
    </Box>
  );
}
