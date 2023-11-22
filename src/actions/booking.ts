"use server";

import { getServerSession } from "@/app/api/auth/[...nextauth]/route";
import {
  GetAllBookingRespType,
  GetAllMyBookingRespType,
} from "@/types/booking";

export const getBookings = async (): Promise<GetAllBookingRespType> => {
  const sess = await getServerSession();
  if (!sess) {
    throw new Error("No session");
  }
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

export const getBookingByCompany = async (
  companyId?: string,
): Promise<GetAllMyBookingRespType> => {
  const sess = await getServerSession();
  // console.log("dataaaaaaaaaa", sess)
  const resp = await fetch(
    `${process.env.BASE_BACKEND_URL}/bookings/companies/${companyId}`,
    {
      headers: {
        Authorization: `Bearer ${sess?.user.token}`,
      },
      next: {
        revalidate: 60,
        tags: ["booking"],
      },
    },
  );
  const data = await resp.json();
  // console.log("getBookingByCompany", data)

  const myData: GetAllMyBookingRespType = {
    success: data.success,
    count: data.count,
    data: data.data.map((b: any) => {
      return {
        id: b._id,
        bookingDate: b.bookingDate,
        user: b.user,
        company: b.company,
        createdAt: b.createdAt,
      };
    }),
  };
  // console.log("AfterMappingData", myData)

  return myData;
};

export const getMyBooking = async (): Promise<GetAllMyBookingRespType> => {
  const sess = await getServerSession();
  const resp = await fetch(
    `${process.env.BASE_BACKEND_URL}/bookings/users/${sess?.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${sess?.user.token}`,
      },
      next: {
        revalidate: 60,
        tags: ["booking"],
      },
    },
  );
  const data = await resp.json();
  // console.log("bookingggggggggggg", data)
  const myData: GetAllMyBookingRespType = {
    success: data.success,
    count: data.count,
    data: data.data.map((b: any) => {
      return {
        id: b._id,
        bookingDate: b.bookingDate,
        user: b.user,
        company: {
          id: b.company._id,
          name: b.company.name,
          position: b.company.position,
          tel: b.company.tel,
          image: b.company.image,
        },
        createdAt: b.createdAt,
      };
    }),
  };

  return myData;
};

export const createBooking = async (companyId: string, requestData: string) => {
  const sess = await getServerSession();
  if (!sess) {
    throw new Error("No session");
  }
  const resp = await fetch(
    `${process.env.BASE_BACKEND_URL}/companies/${companyId}/bookings`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sess?.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingDate: requestData,
      }),
    },
  );
  const data = await resp.json();
  return data;
};

export const updateBooking = async () => {};

export const deleteBooking = async () => {};
