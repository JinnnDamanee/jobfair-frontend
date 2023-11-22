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
import {
  createBooking,
  getBookingByCompany,
  updateBooking,
} from "@/actions/booking";
import { useEffect, useState } from "react";
import { revalidateTag } from "next/cache";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import Route from "@/lib/route";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  bookingDate: z
    .date({
      required_error: "A date of booking is required.",
    })
    .default(new Date()),
  bookingTime: z.string({
    required_error: "You need to select a time for interview.",
  }),
});

const timeSlots = [
  { value: "09:00", label: "09.00 - 09.59" },
  { value: "10:00", label: "10.00 - 10.59" },
  { value: "11:00", label: "11.00 - 11.59" },
  { value: "13:00", label: "13:00 - 13.59" },
  { value: "14:00", label: "14:00 - 14.59" },
  { value: "15:00", label: "15.00 - 15.59" },
];

interface BookingFormProps {
  companyId?: string;
  purpose?: "update" | "create";
  editBookingId?: string;
  setOpen?: (open: boolean) => void;
  session?: Session | null;
}
type FilterDayProps = {
  date?: Date;
};

export function BookingForm({
  companyId,
  setOpen,
  purpose,
  editBookingId,
  session,
}: BookingFormProps) {
  const { toast } = useToast();
  const route = useRouter();
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const isTimeBooked = (time: string) => bookedTimes.includes(time);

  const searchCompany = async ({ date }: FilterDayProps) => {
    try {
      const companyBookResp = await getBookingByCompany(companyId);
      const filterDate = format(date || new Date(), "yyyy-MM-dd");
      if (!companyBookResp.success) {
        toast({
          title: "Error",
          description: "Failed to get companies",
        });
      } else {
        // Extract booked times based on the selected date
        const filteredBookings = companyBookResp.data.filter((booking) => {
          const bookingDate = new Date(booking.bookingDate);
          const formatBookingDate = format(bookingDate, "yyyy-MM-dd");

          return formatBookingDate === filterDate;
        });
        const newBookedTimes = filteredBookings.map((booking) =>
          format(new Date(booking.bookingDate), "HH:mm"),
        );
        setBookedTimes(newBookedTimes);
      }
    } catch (error) {
      console.error("Error fetching company bookings:", error);
      toast({
        title: "Error",
        description: "An error occurred while fetching companies",
      });
    }
  };
  useEffect(() => {
    // Provide a default date or handle the undefined case
    const defaultDate = new Date();
    searchCompany({ date: defaultDate });
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!session) {
      route.push(Route.LOGIN);
    }
    const formattedDate = format(data.bookingDate, "yyyy-MM-dd");
    const selectedTime = data.bookingTime;
    const combinedDateTime = `${format(data.bookingDate, "yyyy-MM-dd")} ${
      data.bookingTime
    }`;
    if (!companyId) return null;
    try {
      let res;
      if (purpose === "create") {
        res = await createBooking(companyId, combinedDateTime);
      } else if (purpose === "update") {
        if (editBookingId) {
          res = await updateBooking(editBookingId, combinedDateTime);
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your booking id.",
          });
          console.error("editBookingId is undefined");
          return;
        }
      }

      if (!res.success) {
        toast({
          title: `Booking ${
            purpose === "create" ? "failed" : "update failed"
          }.`,
          description: res.message,
          variant: "destructive",
          duration: 5000,
        });
        console.error(res);
      } else {
        toast({
          title: `Schedule: New Booking Interview${
            purpose === "update" ? " updated" : ""
          }`,
          description: `${format(data.bookingDate, "PP")} at ${selectedTime}`,
        });
      }

      console.log(
        `Booking ${purpose === "create" ? "created" : "updated"}:`,
        data,
      );
    } catch (error: any) {
      console.error(
        `Error ${purpose === "create" ? "creating" : "updating"} booking:`,
        error,
      );

      if (error.message === "No session") {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Please Login before.",
        });
      } else {
        toast({
          title: "Error",
          description: `An error occurred while ${
            purpose === "create" ? "creating" : "updating"
          } the booking`,
        });
      }
    }

    // Optionally reset the form after submission

    // console.log("type", typeof setOpen); // Log the type
    // console.log("value set open", setOpen); // Log the value
    if (setOpen) {
      setOpen(false);
    }

    // console.log(JSON.stringify(combinedDateTime, null, 2));
  }

  return (
    <Card>
      <div></div>
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
                            <span>{format(new Date(), "PPP")}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          searchCompany({ date });
                        }}
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
              {purpose === "update" ? "Updating" : "Booking"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
