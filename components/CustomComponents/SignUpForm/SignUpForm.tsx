"use client";

import { FormEvent } from "react";
import { ChangeEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import signUpValidator from "@/validation/signUp.validation";
import axios from "axios";

import Link from "next/link";

const initialFormDataState = {
  firstName: "",
  lastName: "",
  userName: "",
  birthDate: "",
  email: "",
  password: "",
  rePassword: "",
};

export default function SignUpForm() {
  const [formData, setFormData] =
    useState<ISignUpFormData>(initialFormDataState);
  const [formErrors, setformErrors] = useState<null | ISignUpFormErrors>(null);
  const [reqError, setReqError] = useState<any>(null);
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);

  const fieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value =
      name !== "birthDate"
        ? e.target.value
        : e.target.valueAsDate
        ? e.target.valueAsDate.toISOString().slice(0, 10)
        : "";

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateRes = signUpValidator(formData);

    if (validateRes) {
      setformErrors(validateRes);
      return;
    } else {
      setformErrors(null);
    }

    const reqData = {
      firstname: formData.firstName,
      secondname: formData.lastName,
      username: formData.userName,
      email: formData.email,
      password: formData.password,
      birthdate: formData.birthDate,
    };

    try {
      const resp = await axios.post(
        `${process.env.BE_HOST}/auth/sign-up`,
        reqData
      );

      if (resp.status === 201) {
        setSignUpSuccess(true);
      }
    } catch (error: any) {
      setReqError(error.response);
    }
  };

  return (
    <>
      {!signUpSuccess ? (
        <>
          <Typography
            variant="h5"
            align="center"
            sx={{
              my: 4,
            }}
          >
            Вас вітає портал VM-EURO 2024. Для реєстрації заповніть форму
          </Typography>
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
                Реєстрація
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  width: "100%",
                  justifyContent: "space-between",
                  gap: "10px",
                  mt: "20px",
                }}
              >
                <TextField
                  name="firstName"
                  label="Ім'я"
                  size="small"
                  onChange={fieldChangeHandler}
                  value={formData.firstName}
                  error={formErrors?.firstName ? true : false}
                  helperText={formErrors?.firstName}
                  sx={{
                    width: "100%",
                  }}
                />

                <TextField
                  name="lastName"
                  label="Прізвище"
                  size="small"
                  onChange={fieldChangeHandler}
                  value={formData.lastName}
                  error={formErrors?.lastName ? true : false}
                  helperText={formErrors?.lastName}
                  sx={{
                    width: "100%",
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  gap: "10px",
                  mt: "10px",
                }}
              >
                <TextField
                  name="userName"
                  label="Логін"
                  size="small"
                  onChange={fieldChangeHandler}
                  value={formData.userName}
                  error={formErrors?.userName ? true : false}
                  helperText={formErrors?.userName}
                  sx={{
                    width: "100%",
                  }}
                />

                <TextField
                  name="birthDate"
                  size="small"
                  type="date"
                  onChange={fieldChangeHandler}
                  value={formData.birthDate}
                  error={formErrors?.birthDate ? true : false}
                  helperText={
                    formErrors?.birthDate
                      ? formErrors.birthDate
                      : "Введіть дату народження"
                  }
                  sx={{
                    width: "100%",
                  }}
                />
              </Box>

              <TextField
                name="email"
                label="Email"
                size="small"
                type="email"
                onChange={fieldChangeHandler}
                value={formData.email}
                error={formErrors?.email ? true : false}
                helperText={formErrors?.email}
                sx={{
                  width: "100%",
                  mt: {
                    xs: "10px",
                    sm: 0,
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  gap: "10px",
                  mt: "10px",
                }}
              >
                <TextField
                  name="password"
                  label="Пароль"
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
                  name="rePassword"
                  label="Повторіть пароль"
                  size="small"
                  type="password"
                  onChange={fieldChangeHandler}
                  value={formData.rePassword}
                  error={formErrors?.rePassword ? true : false}
                  helperText={formErrors?.rePassword}
                  sx={{
                    width: "100%",
                  }}
                />
              </Box>

              {reqError && (
                <Typography
                  sx={{
                    color: "red",
                    mt: "10px",
                  }}
                  align="center"
                >
                  {reqError.data.message[0].toUpperCase() +
                    reqError.data.message.slice(
                      1,
                      reqError.data.message.length
                    )}
                </Typography>
              )}

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
                  Sign Up
                </Button>
              </Box>
            </Box>
          </form>
        </>
      ) : (
        <Box
          sx={{
            mt: "40px",
          }}
        >
          <Typography>
            Шановний {formData.userName}, Ваш аккаунт успішно зареєстрований.
            Для активації аккаутну та подальшого входу, будь-ласка активуйте
            аккаунт за посиланням на пошті {formData.email}. (Лист може
            знаходитись в папці <strong>Спам</strong>)
          </Typography>

          <Box>
            <Typography>
              <Link className="underline hover:underline-offset-4" href={"/"}>
                Натисніть тут
              </Link>{" "}
              для переходу до головної сторінки
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
