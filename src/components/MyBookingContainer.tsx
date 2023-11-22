import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getMyBooking } from "@/actions/booking";
import { addMinutes, format } from "date-fns";

export async function MyBookingContainer() {
  const resp = await getMyBooking();
  if (!resp.success) return null;
  console.log("My bookingingggg", resp.data);
  return (
    <Card className="flex-1 p-4">
      <h3 className="mb-2 text-end text-base">Booked ({resp.data.length}/3)</h3>
      {resp.data.map((booking) => {
        // console.log("Booking Company:", booking.company);
        return (
          <Card key={booking.id} className="mb-4 shadow-sm">
            <CardHeader className="grid grid-cols-[auto,1fr] items-center gap-4">
              {booking.company.image && (
                <Image
                  src={booking.company.image}
                  width={40}
                  height={40}
                  alt="Company Logo"
                  className="justify-center rounded-full"
                />
              )}
              <div className="space-y-1">
                <CardTitle className="text-base font-bold">
                  {booking.company.position}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {booking.company.name}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {`${format(
                    new Date(booking.bookingDate),
                    "MMM dd, yyyy ( HH:mm - ",
                  )}${format(
                    addMinutes(new Date(booking.bookingDate), 59),
                    "HH:mm ",
                  )})`}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </Card>
  );
}
