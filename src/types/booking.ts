import { z } from "zod";

export const bookingSchema = z.object({
    bookingDate: z.string().datetime(),
    user: z.string(),
    company: z.string(),
    createdAt: z.string().datetime(),
})

export type Booking = z.infer<typeof bookingSchema>;