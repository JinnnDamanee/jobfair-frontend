"use server";

import { getServerSession } from "@/app/api/auth/[...nextauth]/route";
import {
  GetAllMyBookingRespType,
  GetAllPopulatedBookingRespType,
} from "@/types/booking";
import { revalidateTag } from "next/cache";

export const getBookings =
  async (): Promise<GetAllPopulatedBookingRespType> => {
    const sess = await getServerSession();
    if (!sess) {
      throw new Error("No session");
    }
    const resp = await fetch(`${process.env.BASE_BACKEND_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${sess?.user.token}`,
      },
      next: {
        // revalidate: 60,
        tags: ["booking"],
      },
    });
    const data = await resp.json();

    const myData: GetAllPopulatedBookingRespType = {
      success: data.success,
      count: data.count,
      data: data.data.map((b: any) => {
        return {
          id: b._id,
          bookingDate: b.bookingDate,
          createdAt: b.createdAt,
          user: {
            id: b.user._id,
            name: b.user.name,
            email: b.user.email,
          },
          company: {
            id: b.company._id,
            name: b.company.name,
            image: b.company.image,
            position: b.company.position,
          },
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
      next: {
        // revalidate: 60,
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
        // revalidate: 60,
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
  revalidateTag("booking");

  return data;
};

export const updateBooking = async (bookingId: string, requestData: string) => {
  try {
    const sess = await getServerSession();
    if (!sess) {
      throw new Error("No session");
    }

    const resp = await fetch(
      `${process.env.BASE_BACKEND_URL}/bookings/${bookingId}`,
      {
        method: "PUT",
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

    // Revalidate the 'booking' tag after updating a booking
    revalidateTag("booking");

    return data;
  } catch (error) {
    // Handle errors...
    console.error("Error updating booking:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
};

export const deleteBooking = async (bookingId: string) => {
  try {
    const sess = await getServerSession();
    if (!sess) {
      throw new Error("No session");
    }

    const resp = await fetch(
      `${process.env.BASE_BACKEND_URL}/bookings/${bookingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sess?.user.token}`,
        },
      },
    );

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(`Failed to delete booking: ${errorData.message}`);
    }

    // Revalidate the 'booking' tag after deleting a booking
    revalidateTag("booking");

    return { success: true, message: "Booking deleted successfully" };
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
