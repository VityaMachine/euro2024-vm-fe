"use client";

import { FormEvent } from "react";
import { ChangeEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import resetPwdValidator from "@/validation/pwdReset.validation";
import axios from "axios";
import Link from "next/link";

const initialFormDataState = {
  password: "",
  repeatPassword: "",
};

export default function ResetPwdForm({ resetToken }: { resetToken: string }) {
  const [formData, setFormData] =
    useState<IResetPwdFormData>(initialFormDataState);
  const [formErrors, setFormErrors] = useState<null | IResetPwdErrors>(null);
  const [reqError, setReqError] = useState<any>(null);
  const [successChange, setSuccessChange] = useState<boolean>(false);

  const fieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateRes = resetPwdValidator(formData);

    if (validateRes) {
      setFormErrors(validateRes);
      return;
    } else {
      setFormErrors(null);
    }

    const updateData = {
      password: formData.password,
      resetToken,
    };

    try {
      const reqResult = await axios.patch(
        `${process.env.NEXT_PUBLIC_BE_HOST}/auth/update`,
        updateData
      );

      if (reqResult.status === 200) {
        setSuccessChange(true);
      }
    } catch (error) {
      setReqError(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "210px",
        }}
      >
        {!successChange ? (
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
                Скидання паролю
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
                  name="password"
                  label="Новий пароль"
                  size="small"
                  type="password"
                  onChange={fieldChangeHandler}
                  value={formData.password}
                  error={formErrors?.password ? true : false}
                  helperText={formErrors?.password}
                  sx={{
                    width: "100%",
                  }}
                />

                <TextField
                  name="repeatPassword"
                  label="Повторіть новий пароль"
                  size="small"
                  type="password"
                  onChange={fieldChangeHandler}
                  value={formData.repeatPassword}
                  error={formErrors?.password ? true : false}
                  helperText={formErrors?.password}
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
                  Змінити пароль
                </Button>
              </Box>
            </Box>
          </form>
        ) : (
          <Box>
            <Typography>
              Пароль успішно змінено. Для входу клікніть{" "}
              <Link className=" font-bold" href={"/auth/sign-in"}>сюди</Link>
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
