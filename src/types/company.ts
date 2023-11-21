import { z } from "zod";

export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.string(),
  jd: z.string(),
  location: z.string(),
  tel: z.string(),
  image: z.string(),
});

export const getAllCompanyResponseSchema = z.object({
  success: z.boolean(),
  count: z.number(),
  data: z.array(companySchema),
});

export type Company = z.infer<typeof companySchema>;
export type GetAllCompanyResponseType = z.infer<
  typeof getAllCompanyResponseSchema
>;
