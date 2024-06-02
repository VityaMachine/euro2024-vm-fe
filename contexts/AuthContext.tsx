"use client";

import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<IAuthContext>({
  user: {
    userName: "",
    userId: "",
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
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");

  const getUser = async (token: string) => {};

  const signIn = async (login: string, password: string) => {};

  const signOut = async () => {};

  const providerValue = {
    user: { userName, userId },
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
