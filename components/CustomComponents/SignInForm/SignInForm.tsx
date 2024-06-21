"use client";

import { FormEvent, useEffect, useContext } from "react";
import { ChangeEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { AuthContext } from "@/contexts/AuthContext";
import signInValidator from "@/validation/signIn.validation";
import Link from "next/link";

const initialFormDataState = {
  login: "",
  password: "",
};

export default function SignInForm() {
  const [formData, setFormData] =
    useState<ISignInFormData>(initialFormDataState);
  const [formErrors, setFormErrors] = useState<null | ISignInFormErrors>(null);
  const [reqError, setReqError] = useState<any>(null);

  const { signIn } = useContext(AuthContext);

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

    const validateRes = signInValidator(formData);

    if (validateRes) {
      setFormErrors(validateRes);
      return;
    } else {
      setFormErrors(null);
    }

    const result = await signIn(formData.login, formData.password);

    if (result && Number(result.status.toString()[0]) === 4) {
      setReqError(result);
    }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "210px",
        }}
      >
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
              Вхід
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
                name="login"
                label="Логін або email"
                size="small"
                onChange={fieldChangeHandler}
                value={formData.login}
                error={formErrors?.login ? true : false}
                helperText={formErrors?.login}
                sx={{
                  width: "100%",
                }}
              />

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

              {reqError && (
                <Typography
                  sx={{
                    color: "red",
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
                Вхід
              </Button>
            </Box>
          </Box>
        </form>
        <Box
          sx={{
            mt: "10px",
            fontSize: "14px",
            ml: "5px",
          }}
        >
          <Link className=" hover:underline" href={"/auth/reset"}>
            Забули пароль?
          </Link>
        </Box>
      </Box>
    </>
  );
}
