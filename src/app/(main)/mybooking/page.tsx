import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, ChevronLeft, Calendar, Trash2, Pencil } from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, addMinutes } from "date-fns";

const mockBooking = [
  {
    _id: "655c795acb47364966107245",
    bookingDate: "2023-08-20T03:00:00.000Z",
    user: "6554a87e51aa444f93f02b37",
    company: {
      _id: "655c7786cb47364966107239",
      name: "TTB",
      tel: "012345678",
      id: "655c7786cb47364966107239",
    },
  },
  {
    _id: "655c799bcb4736496610724f",
    bookingDate: "2023-08-20T06:00:00.000Z",
    user: "6554a87e51aa444f93f02b37",
    company: {
      _id: "655c7786cb47364966107239",
      name: "TTB",
      tel: "012345678",
      id: "655c7786cb47364966107239",
    },
  },
];

export default function MyBookingPage() {
  return (
    <div id="booking-container" className="container flex flex-col gap-4 p-10">
      <div>
        <h2 className="text-xl font-bold tracking-tight">My Booking</h2>
        <p className="text-muted-foreground">
          Maximum interview bookings allowed 3 times{" "}
        </p>
      </div>
      <Separator className="my-4" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {mockBooking.map((booking: any) => (
          <Card key={booking._id}>
            <CardHeader className="grid grid-cols-[auto,1fr] items-center gap-6 pb-4">
              <Image
                src="/ttb.png"
                width={40}
                height={40}
                alt="Company Logo"
                className="l justify-center"
              />
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">Job Title</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {booking.company.name}
                </CardDescription>
              </div>
            </CardHeader>
            <Separator className="" />
            <CardContent className="grid gap-2 pt-4">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {format(new Date(booking.bookingDate), "MMM dd, yyyy")}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {format(new Date(booking.bookingDate), "HH:mm")} -{" "}
                {format(addMinutes(new Date(booking.bookingDate), 59), "HH:mm")}
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2 pb-4">
              <Button variant="secondary" className="mb-4 bg-black text-white">
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="default" className="mb-4">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
