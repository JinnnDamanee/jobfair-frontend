import { z } from "zod";
import { Role } from "./user";

export const loginReqSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginRespSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  token: z.string(),
  success: z.boolean(),
  msg: z.string().optional(),
});

export const signupReqSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  tel: z.string().regex(/^\d+$/, { message: "Phone number must be numerical" }),
  password: z.string().min(6),
  role: z.nativeEnum(Role).default(Role.USER).optional(),
});
export const signupRespSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  token: z.string(),
  success: z.boolean(),
  msg: z.string().optional(),
});

export type LoginReqType = z.infer<typeof loginReqSchema>;
export type LoginRespType = z.infer<typeof loginRespSchema>;
export type SignupReqType = z.infer<typeof signupReqSchema>;
export type SignupRespType = z.infer<typeof signupRespSchema>;
