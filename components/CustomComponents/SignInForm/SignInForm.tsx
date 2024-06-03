"use client";

import { FormEvent, useEffect, useContext } from "react";
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

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { AuthContext } from "@/contexts/AuthContext";
import signInValidator from "@/validation/signIn.validation";

const initialFormDataState = {
  login: "",
  password: "",
};

export default function SignInForm() {
  const [formData, setFormData] =
    useState<ISignInFormData>(initialFormDataState);
  const [formErrors, setFormErrors] = useState<null | ISignInFormErrors>(null);
  const [reqError, setReqError] = useState<any>(null);
  const [openNotify, setOpenNotify] = useState<boolean>(true);

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

  const handleCloseAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotify(false);
    setReqError(null)

  };

  return (
    <>
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
            Sign In
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
              label="Login or email"
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
              Sign In
            </Button>
          </Box>
        </Box>
      </form>

      {reqError && (
        <Snackbar
          open={openNotify}
          // autoHideDuration={5000}
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
                  setReqError(null)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Error {reqError.status}</AlertTitle>
            {reqError.data.message[0].toUpperCase() +
              reqError.data.message.slice(1, reqError.data.message.length)}
            {/* asdsadas */}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
