"use client";

import { Snackbar } from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { createContext, useEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const AuthContext = createContext<IAuthContext>({
  user: {
    id: "",
    username: "",
    email: "",
    firstname: "",
    secondname: "",
    birthdate: "",
  },
  token: "",
  getUser: () => {},
  signIn: (token: string) => {},
  signOut: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [token, setToken] = useState("");

  const getUser = async (token: string) => {};

  const signIn = async (login: string, password: string) => {
    console.log("login: ", login);
    console.log("password: ", password);

    const signInData = {
      login,
      password,
    };

    try {
      const resSignInData = await axios.post(
        "http://localhost:80/auth/sign-in",
        signInData
      );

      if (resSignInData.status === 200) {
        localStorage.setItem(
          "vm-euro-token",
          JSON.stringify(resSignInData.data.token)
        );

        setUser(resSignInData.data.user);
        setToken(resSignInData.data.token);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.log("hello");
        // console.log(error.response);

        return error.response;
      }
    }
  };

  const signOut = async () => {};

  const providerValue = {
    user,
    token,
    getUser,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
