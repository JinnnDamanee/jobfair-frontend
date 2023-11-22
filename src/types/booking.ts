import { z } from "zod";
import { companySchema } from "./company";

export const bookingSchema = z.object({
  id: z.string(),
  bookingDate: z.string().datetime(),
  user: z.string(),
  company: z.string(),
  createdAt: z.string().datetime(),
});

export const getAllBookingResp = z.object({
  data: z.array(bookingSchema),
  count: z.number(),
  success: z.boolean(),
});

export const bookingCompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.string(),
  jd: z.string().optional(),
  location: z.string().optional(),
  tel: z.string().optional(),
  image: z.string().optional(),
});
export const myBookingSchema = z.object({
  id: z.string(),
  bookingDate: z.string().datetime(),
  user: z.string(),
  company: bookingCompanySchema,
  createdAt: z.string().datetime(),
});
export const getAllMyBookingResp = z.object({
  data: z.array(myBookingSchema),
  count: z.number(),
  success: z.boolean(),
});

export const bookingPopulatedSchema = z.object({
  id: z.string(),
  bookingDate: z.string().datetime(),
  createdAt: z.string().datetime(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
  }),
  company: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    position: z.string(),
  }),
});

export const getAllPopulatedBookingResp = z.object({
  data: z.array(bookingPopulatedSchema),
  count: z.number(),
  success: z.boolean(),
});

export type Booking = z.infer<typeof bookingSchema>;
export type GetAllBookingRespType = z.infer<typeof getAllBookingResp>;
export type MyBooking = z.infer<typeof myBookingSchema>;
export type GetAllMyBookingRespType = z.infer<typeof getAllMyBookingResp>;
export type PopulatedBookingType = z.infer<typeof bookingPopulatedSchema>;

export type GetAllPopulatedBookingRespType = z.infer<
  typeof getAllPopulatedBookingResp
>;
