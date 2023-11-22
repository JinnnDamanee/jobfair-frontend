import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, ChevronLeft, CalendarIcon, Trash2, Pencil } from "lucide-react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, addMinutes } from "date-fns";
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
import { BookingForm } from "@/components/BookingForm";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import { getBookings, getMyBooking } from "@/actions/booking";

export default async function MyBooking() {
  const resp = await getMyBooking();
  if (!resp.success) return null;
  console.log("My booking", resp.data);

  return (
    <>
      <h1>testing my booking</h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {resp.data.map((booking: any) => (
          <Card key={booking.id}>
            <CardHeader className="grid grid-cols-[auto,1fr] items-center gap-6 pb-4">
              <Image
                src="/ttb.png"
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
              <Button
                variant="default"
                className="mb-4 bg-black text-white  hover:bg-gray-700"
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>

              <Button variant="default" className="mb-4">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
