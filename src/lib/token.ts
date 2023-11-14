import { z } from "zod";
import { checkType } from "./utils";
import { Role } from "@/types/user";
import { jwtDecode } from "jwt-decode";

const accessTokenPayloadSchema = z.object({
  exp: z.number(),
  iat: z.number(),
  nbf: z.number(),
  role: z.nativeEnum(Role),
  userId: z.number(),
});

export function validateAccessToken(token: string) {
  const decoded = jwtDecode(token);
  const accessToken = checkType(accessTokenPayloadSchema, decoded);
  return Date.now() + 15 * 60 * 60 < accessToken.exp * 1000;
}

export function verifyAccessToken(token: string) {
  const decoded = jwtDecode(token);
  return checkType(accessTokenPayloadSchema, decoded);
}

export function getRefreshToken(response: Response) {
  const regex = /refreshToken=([^;]*)/;
  const setCookie = response.headers.getSetCookie();
  const match = setCookie[0]?.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}
