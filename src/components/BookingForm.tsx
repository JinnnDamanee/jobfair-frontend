"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { th } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

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
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  bookingDate: z.date({
    required_error: "A date of booking is required.",
  }),
  bookingTime: z.string({
    required_error: "You need to select a time for interview.",
  }),
});

//Example from backend
const responseData = {
  success: true,
  count: 2,
  data: [
    {
      _id: "655c795acb47364966107245",
      bookingDate: "2023-08-20T03:00:00.000Z",
      user: {
        _id: "6554a87e51aa444f93f02b37",
        name: "TTBName",
        email: "ttb@gmail.com",
        tel: "012-345-6789",
      },
      company: {
        _id: "655c7786cb47364966107239",
        name: "TTB",
        tel: "012345678",
        id: "655c7786cb47364966107239",
      },
      createdAt: "2023-11-21T09:33:14.269Z",
      __v: 0,
    },
    {
      _id: "655c799bcb4736496610724f",
      bookingDate: "2023-08-20T06:00:00.000Z",
      user: {
        _id: "6554a87e51aa444f93f02b37",
        name: "TTBName",
        email: "ttb@gmail.com",
        tel: "012-345-6789",
      },
      company: {
        _id: "655c7786cb47364966107239",
        name: "TTB",
        tel: "012345678",
        id: "655c7786cb47364966107239",
      },
      createdAt: "2023-11-21T09:34:19.719Z",
      __v: 0,
    },
  ],
};

//checking booking time slot
const bookedTimes = responseData.data.map((booking) =>
  format(new Date(booking.bookingDate), "HH:mm"),
);

// Function to check if a time slot is booked
const isTimeBooked = (time: string) => bookedTimes.includes(time);

const timeSlots = [
  { value: "09:00", label: "09.00 - 09.59" },
  { value: "10:00", label: "10.00 - 10.59" },
  { value: "11:00", label: "11.00 - 11.59" },
  { value: "13:00", label: "13:00 - 13.59" },
  { value: "14:00", label: "14:00 - 14.59" },
  { value: "15:00", label: "15.00 - 15.59" },
];

interface BookingFormProps {
  setOpen?: (open: boolean) => void;
}

export function BookingForm({ setOpen }: BookingFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedDate = format(data.bookingDate, "yyyy-MM-dd");
    const selectedTime = data.bookingTime;
    const combinedDateTime = `${format(data.bookingDate, "yyyy-MM-dd")} ${
      data.bookingTime
    }`;
    // console.log("type", typeof setOpen); // Log the type
    // console.log("value set open", setOpen); // Log the value
    if (setOpen) {
      setOpen(false);
    }

    toast({
      title: "Schedule: New Booking Interview",
      // description: `${combinedDateTime}`,
      description: `${format(data.bookingDate, "PP")} at ${selectedTime}`,
    });
    console.log(JSON.stringify(combinedDateTime, null, 2));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Reservation</CardTitle>
        <CardDescription>Select Available time to booking</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
          <div className="justify-center p-6 pt-2">
            <FormField
              control={form.control}
              name="bookingDate"
              render={({ field }) => (
                <FormItem className="mx-auto flex flex-col md:w-[316px]">
                  <FormLabel className="text-left">Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3  text-left  font-normal md:mx-auto md:w-[316px]",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={{ before: new Date() }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Separator className="my-4" />

              <FormField
                control={form.control}
                name="bookingTime"
                render={({ field }) => (
                  <FormItem className="mx-auto flex w-full flex-col md:w-[316px]">
                    {/* <FormItem className="space-y-3"> */}
                    <FormLabel className="text-left">Time</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col justify-center space-y-1"
                      >
                        {timeSlots.map((slot) => (
                          <FormItem
                            key={slot.value}
                            className={`mx-auto flex w-full flex-row items-center justify-start space-y-0 rounded-lg border p-3 text-center md:w-[316px] ${
                              isTimeBooked(slot.value)
                                ? "cursor-not-allowed opacity-50"
                                : ""
                            }`}
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={slot.value}
                                disabled={isTimeBooked(slot.value)}
                              />
                            </FormControl>
                            <FormLabel className="text-normal px-2">
                              {slot.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <CardFooter className="flex justify-center">
            <Button type="submit" className="w-[316px] ">
              Booking
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
