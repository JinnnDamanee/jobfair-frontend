import { z } from "zod";

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

// export const bookingPopulatedSchema = bookingSchema.extend({
//   user: z.object({
//     _id: z.string(),
//     name: z.string(),
//     email: z.string().email(),
//   }),
//   company: z.object({
//     _id: z.string(),
//     name: z.string(),
//     image: z.string(),
//     tel: z.string(),
//   }),
// });

// export const getAllPopulatedBookingResp = z.object({
//   data: z.array(bookingPopulatedSchema),
//   count: z.number(),
//   success: z.boolean(),
// });

export type Booking = z.infer<typeof bookingSchema>;
export type GetAllBookingRespType = z.infer<typeof getAllBookingResp>;
// export type GetAllPopulatedBookingRespType = z.infer<
//   typeof getAllPopulatedBookingResp
// >;
