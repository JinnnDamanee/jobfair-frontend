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

export const createCompanyRequestSchema = z.object({
  name: z.string(),
  position: z.string(),
  jd: z.string(),
  location: z.string(),
  tel: z.string(),
  image: z
    .string()
    .startsWith("https://", { message: "Image must be a valid url" })
    .refine(
      (link) => [".jpg", ".png", ".jpeg"].some((ext) => link.includes(ext)),
      { message: "Image extension must be jpg, png, or jpeg" },
    ),
});

export const updateCompanyRequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.string(),
  jd: z.string(),
  location: z.string(),
  tel: z.string(),
  image: z
    .string()
    .startsWith("https://", { message: "Image must be a valid url" })
    .refine(
      (link) => [".jpg", ".png", ".jpeg"].some((ext) => link.includes(ext)),
      { message: "Image extension must be jpg, png, or jpeg" },
    ),
});

export type Company = z.infer<typeof companySchema>;
export type GetAllCompanyResponseType = z.infer<
  typeof getAllCompanyResponseSchema
>;
export type CreateCompanyRequestType = z.infer<
  typeof createCompanyRequestSchema
>;
export type UpdateCompanyRequestType = z.infer<
  typeof updateCompanyRequestSchema
>;
