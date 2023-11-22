"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

import { toast } from "@/components/ui/use-toast";

import { deleteBooking, getMyBooking } from "@/actions/booking";
import { BookingForm } from "@/components/BookingForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MyBooking } from "@/types/booking";
import { addMinutes, format } from "date-fns";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function BookingCatalog({ session }: { session: Session }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<MyBooking | null>(
    null,
  );

  useEffect(() => {
    const fetchMyBooking = async () => {
      try {
        const resp = await getMyBooking();
        if (resp.success) {
          setBookings(resp.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch bookings",
          });
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast({
          title: "Error",
          description: "An error occurred while fetching bookings",
        });
      }
    };

    fetchMyBooking();
  }, []);

  const handleDelete = async (bookingId: string) => {
    try {
      const deleteResult = await deleteBooking(bookingId);

      if (deleteResult.success) {
        toast({
          title: "Booking Deleted",
          description: "The booking has been successfully deleted.",
          variant: "success",
          duration: 5000,
        });
        setDeleteDialogOpen(false);
      } else {
        toast({
          title: "Error",
          description: `Failed to delete booking: ${deleteResult.message}`,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the booking.",
        variant: "destructive",
        duration: 5000,
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking: any) => (
        <Card key={booking.id}>
          <CardHeader className="grid grid-cols-[auto,1fr] items-center gap-6 pb-4">
            <Image
              src={booking.company.image}
              width={40}
              height={40}
              alt="Company Logo"
              className="l justify-center"
            />
            <div className="space-y-1">
              <CardTitle className="text-start text-xl font-bold">
                {booking.company.position}
              </CardTitle>
              <CardDescription className="text-start text-sm text-gray-600">
                {booking.company.name}
              </CardDescription>
            </div>
          </CardHeader>
          <Separator className="" />
          <CardContent className="grid gap-2 pt-4">
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {format(new Date(booking.bookingDate), "MMM dd, yyyy")}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {format(new Date(booking.bookingDate), "HH:mm")} -{" "}
              {format(addMinutes(new Date(booking.bookingDate), 59), "HH:mm")}
            </div>
          </CardContent>
          <CardFooter className="justify-end space-x-2 pb-4">
            <Dialog
              key={booking.id}
              open={open && selectedBooking?.id === booking.id}
              onOpenChange={(value: boolean) => {
                if (value) {
                  setSelectedBooking(booking); // Set the selected booking when opening the dialog
                } else {
                  setSelectedBooking(null);
                }
                setOpen(value);
              }}
            >
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="mb-4 bg-black text-white  hover:bg-gray-700"
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </Button>
              </DialogTrigger>

              <DialogContent>
                <BookingForm
                  companyId={booking.company.id}
                  setOpen={setOpen}
                  purpose="update"
                  editBookingId={booking.id}
                  session={session}
                />
              </DialogContent>
            </Dialog>

            <Dialog
              open={deleteDialogOpen && selectedBooking?.id === booking.id}
              onOpenChange={(value: boolean) => {
                if (value) {
                  setSelectedBooking(booking); // Set the selected booking when opening the dialog
                } else {
                  setSelectedBooking(null);
                }
                setDeleteDialogOpen(value);
              }}
            >
              <DialogTrigger asChild>
                <Button variant="default" className="mb-4">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Booking</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this booking?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
