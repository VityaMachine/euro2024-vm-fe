"use client";

import axios, { AxiosError } from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("vm-euro-token");

    const getUser = async () => {
      if (!savedToken) {
        return;
      }

      try {
        const userReqResult = await axios.get(`${process.env.BE_HOST}/users`, {
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
        `${process.env.BE_HOST}/auth/sign-in`,
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
        `${process.env.BE_HOST}/auth/logout`,
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
        router.replace("/");
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
