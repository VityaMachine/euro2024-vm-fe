"use client";

import { useEffect, useState, useContext } from "react";

import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";

export default function PredictionTable() {
  const [tableData, setTableData] = useState<null | ITableData[]>(null);
  const [status, setStatus] = useState<ApiStatusType>("idle");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    try {
      setStatus("pending");

      const getTableData = async () => {
        const tableRespData = await axios.get(
          `${process.env.NEXT_PUBLIC_BE_HOST}/predictions/table`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (tableRespData.status === 200) {
          setTableData(tableRespData.data);
          setStatus("resolved");
        } else {
          setStatus("rejected");
        }
      };

      getTableData();
    } catch (error) {
      setStatus("rejected");
      console.log(error);
    }
  }, [token]);

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
          {tableData && tableData.length === 0 ? (
            <Typography>Рангові дані відсутні</Typography>
          ) : (
            <Box>
              {/* header */}
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  borderBottom: "2px solid",
                }}
              >
                <Typography
                  align="center"
                  sx={{ fontWeight: 700, width: "15px" }}
                >
                  #
                </Typography>
                <Typography
                  align="center"
                  sx={{ fontWeight: 700, width: "90px" }}
                >
                  Користувач
                </Typography>
                <Typography
                  align="center"
                  sx={{
                    fontWeight: 700,
                    width: "150px",
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  Прізвище Ім&apos;я
                </Typography>
                <Typography
                  align="center"
                  sx={{ fontWeight: 700, width: "25px" }}
                >
                  ТР
                </Typography>
                <Typography
                  align="center"
                  sx={{ fontWeight: 700, width: "25px" }}
                >
                  Н
                </Typography>
                <Typography
                  align="center"
                  sx={{ fontWeight: 700, width: "25px" }}
                >
                  РГ
                </Typography>
                <Typography
                  align="center"
                  sx={{ fontWeight: 700, width: "25px" }}
                >
                  Р
                </Typography>
                <Typography
                  align="center"
                  sx={{ fontWeight: 700, width: "25px" }}
                >
                  СГ
                </Typography>
                <Typography
                  align="center"
                  sx={{ fontWeight: 700, width: "45px" }}
                >
                  О
                </Typography>
              </Box>

              {/* data */}

              <Box>
                {tableData?.map((item, idx) => (
                  <Box
                    key={item.userId}
                    sx={{
                      display: "flex",
                      gap: "10px",
                      borderBottom: "1px solid",
                      mt: "5px",
                    }}
                  >
                    <Typography
                      align="center"
                      sx={{ width: "15px", fontSize: "14px" }}
                    >
                      {idx + 1}
                    </Typography>
                    <Typography
                      align="left"
                      sx={{ width: "90px", fontSize: "14px" }}
                    >
                      {item.userName}
                    </Typography>
                    <Typography
                      align="left"
                      sx={{
                        width: "150px",
                        display: {
                          xs: "none",
                          sm: "block",
                        },
                        fontSize: "14px",
                      }}
                    >
                      {item.userFirstName}&nbsp;{item.userLastName}
                    </Typography>
                    <Typography
                      align="center"
                      sx={{ width: "25px", fontSize: "14px" }}
                    >
                      {item.userPredData.exactScore}
                    </Typography>
                    <Typography
                      align="center"
                      sx={{ width: "25px", fontSize: "14px" }}
                    >
                      {item.userPredData.draw}
                    </Typography>
                    <Typography
                      align="center"
                      sx={{ width: "25px", fontSize: "14px" }}
                    >
                      {item.userPredData.goalsDIff}
                    </Typography>
                    <Typography
                      align="center"
                      sx={{ width: "25px", fontSize: "14px" }}
                    >
                      {item.userPredData.result}
                    </Typography>
                    <Typography
                      align="center"
                      sx={{ width: "25px", fontSize: "14px" }}
                    >
                      {item.userPredData.sumGoals}
                    </Typography>
                    <Typography
                      align="center"
                      sx={{ width: "45px", fontWeight: 700, fontSize: "14px" }}
                    >
                      {item.userPredData.total}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
