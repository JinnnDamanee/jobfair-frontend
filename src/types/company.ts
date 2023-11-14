import { z } from "zod";

export const companySchema = z.object({
    name: z.string(),
    position: z.string(),
    jd: z.string(),
    location: z.string(),
    tel: z.string(),
    image: z.string(),
});
export type Company = z.infer<typeof companySchema>;