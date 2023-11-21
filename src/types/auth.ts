import { z } from "zod";

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
  msg: z.string(),
});

export type LoginReqType = z.infer<typeof loginReqSchema>;
export type LoginRespType = z.infer<typeof loginRespSchema>;
