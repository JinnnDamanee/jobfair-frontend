"use server";

import { getServerSession } from "@/app/api/auth/[...nextauth]/route";
import { GetAllBookingRespType } from "@/types/booking";

export const getBookings = async (): Promise<GetAllBookingRespType> => {
  const sess = await getServerSession();
  const resp = await fetch(`${process.env.BASE_BACKEND_URL}/bookings`, {
    headers: {
      Authorization: `Bearer ${sess?.user.token}`,
    },
    next: {
      revalidate: 60,
      tags: ["booking"],
    },
  });
  const data = await resp.json();

  const myData: GetAllBookingRespType = {
    success: data.success,
    count: data.count,
    data: data.data.map((b: any) => {
      return {
        id: b._id,
        bookingDate: b.bookingDate,
        user: b.user._id,
        company: b.company._id,
        createdAt: b.createdAt,
      };
    }),
  };

  return myData;
};

export const getBookingByCompany = async () => {};

export const getMyBooking = async () => {};

export const createBooking = async () => {};

export const updateBooking = async () => {};

export const deleteBooking = async () => {};
