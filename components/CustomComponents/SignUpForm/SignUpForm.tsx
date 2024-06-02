"use client";

import { FormEvent, useEffect } from "react";
import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import signUpValidator from "@/validation/signUp.validation";
import axios from "axios";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
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
  const [openNotify, setOpenNotify] = useState<boolean>(true);
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
        "http://localhost:80/auth/sign-up",
        reqData
      );

      if (resp.status === 201) {
        setSignUpSuccess(true);
      }
    } catch (error: any) {
      setReqError(error.response);
    }
  };

  const handleCloseAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotify(false);
  };

  return (
    <>
      {!signUpSuccess ? (
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
              Sign Up
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
                label="First name"
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
                label="Last name"
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
                label="Login (Username)"
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
                    : "Input your birth date"
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
                label="Password"
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
                label="Repeat password"
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
      ) : (
        <Box>
          <Typography>
            Dear {formData.userName}, your account is succesfuly registered.
            Please click on link on your email {formData.email} on activation
            link
          </Typography>

          <Box>
            <Typography>
              <Link href={"/"}>Click here</Link> to go to main page
            </Typography>
          </Box>
        </Box>
      )}

      {reqError && (
        <Snackbar
          open={openNotify}
          autoHideDuration={5000}
          onClose={handleCloseAlert}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenNotify(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Error {reqError.status}</AlertTitle>
            {reqError.data.message[0].toUpperCase() +
              reqError.data.message.slice(1, reqError.data.message.length)}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
