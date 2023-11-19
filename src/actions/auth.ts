"use server";

import { LoginReqType, LoginRespType } from "@/types/auth";

export const login = async ({
  email,
  password,
}: LoginReqType): Promise<LoginRespType> => {
  const resp = await fetch(`${process.env.BASE_BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const data = await resp.json();
  return data;
};

export const logout = async () => {};

export const signup = async () => {};

export const getMe = async () => {};
