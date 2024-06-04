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

  useEffect(() => {
    const savedToken = localStorage.getItem("vm-euro-token");

    const getUser = async () => {
      if (!savedToken) {
        return;
      }

      try {
        const userReqResult = await axios.get("http://localhost:80/users", {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        setUser(userReqResult.data);
        setToken(savedToken);
      } catch (error) {
        localStorage.removeItem("vm-euro-token");
        console.log(error);
      }
    };

    getUser();
  }, []);

  const signIn = async (login: string, password: string) => {
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
        localStorage.setItem("vm-euro-token", resSignInData.data.token);

        setUser(resSignInData.data.user);
        setToken(resSignInData.data.token);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response;
      }
    }
  };

  const signOut = async () => {
    try {
      const signOutResult = await axios.patch(
        "http://localhost:80/auth/logout",
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (signOutResult.status === 204) {
        localStorage.removeItem("vm-euro-token");
        setUser(null);
        setToken("");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("vm-euro-token");
      setUser(null);
      setToken("");
    }
  };

  const providerValue = {
    user,
    token,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
