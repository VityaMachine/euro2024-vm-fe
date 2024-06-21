"use client";

import { FormEvent } from "react";
import { ChangeEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import axios from "axios";

const emailPattern = new RegExp(
  "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}"
);

export default function ResetPwdReqForm() {
  const [email, setEmail] = useState<string>("");
  const [emailErr, setEmailErr] = useState<null | string>(null);
  const [reqError, setReqError] = useState<any>(null);
  const [successSend, setSuccessSend] = useState<boolean>(false);

  const fieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailPattern.test(email)) {
      setEmailErr("невірний формат email");
      return;
    }

    try {
      const reqResult = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_HOST}/auth/reset`,
        {
          email,
        }
      );

      if (reqResult.status === 200) {
        setSuccessSend(true);
      }
    } catch (error) {
      setReqError(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "600px",
        }}
      >
        {!successSend ? (
          <form onSubmit={formSubmitHandler}>
            <Box
              sx={{
                maxWidth: {
                  xs: "210px",
                  sm: "430px",
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography align="center" variant="h6">
                Введіть свій email
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  mt: "10px",
                }}
              >
                <TextField
                  name="email"
                  label="Email"
                  size="small"
                  type="email"
                  onChange={fieldChangeHandler}
                  value={email}
                  error={emailErr ? true : false}
                  helperText={emailErr}
                  sx={{
                    width: "100%",
                  }}
                />

                {reqError && (
                  <Typography
                    sx={{
                      color: "red",
                    }}
                    align="center"
                  >
                    {reqError.response.data.message[0].toUpperCase() +
                      reqError.response.data.message.slice(
                        1,
                        reqError.response.data.message.length
                      )}
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: "25px",
                    width: "200px",
                  }}
                >
                  Скинути
                </Button>
              </Box>
            </Box>
          </form>
        ) : (
          <Box>
            <Typography>
              Ваш лінк для відновлення паролю було успішно відправлено за
              адресою: {email}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
