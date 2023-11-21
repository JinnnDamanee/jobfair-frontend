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
    required_error: "You need to select a time for interview type.",
  }),
});

const timeSlots = [
  { value: "09:00", label: "09.00 - 09.59" },
  { value: "10:00", label: "10.00 - 10.59" },
  { value: "11:00", label: "11.00 - 11.59" },
  { value: "11:00", label: "11.00 - 11.59" },
  { value: "13:00", label: "13:00 - 13.59" },
  { value: "14:00", label: "14:00 - 14.59" },
  { value: "15:00", label: "15.00 - 15.59" },
];
export function BookingForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedDate = format(data.bookingDate, "PPp");
    const selectedTime = data.bookingTime; // Access the selected time value
    toast({
      title: "Schedule: New Booking Interview",
      description: `${formattedDate} at ${selectedTime}`,
    });
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservation</CardTitle>
        <CardDescription>Select Available time to booking</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="justify-center">
            <FormField
              control={form.control}
              name="bookingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "mx-auto  w-[320px]  pl-3 text-left font-normal",
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
                  <FormItem className="space-y-3">
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col justify-center space-y-1"
                      >
                        <FormItem className="mx-auto flex w-[320px]  flex-row items-center justify-start space-y-0 rounded-lg border p-3 text-center">
                          <FormControl>
                            <RadioGroupItem value="all" />
                          </FormControl>
                          <FormLabel className="px-2 text-base">
                            09.00 - 09.59
                          </FormLabel>
                        </FormItem>

                        <FormItem className="mx-auto flex w-[320px] flex-row items-center justify-start space-y-0 rounded-lg border p-3 text-center">
                          <FormControl>
                            <RadioGroupItem value="mentions" disabled={true} />
                          </FormControl>
                          <FormLabel className="px-2 text-base">
                            10.00 - 10.59
                          </FormLabel>
                        </FormItem>
                        <FormItem className="mx-auto flex w-[320px] flex-row items-center justify-start space-y-0 rounded-lg border p-3 text-center">
                          <FormControl>
                            <RadioGroupItem value="none" />
                          </FormControl>
                          <FormLabel className="px-2 text-base">
                            11.00 - 11.59
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <CardFooter>
            <Button type="submit" className="w-full">
              Booking
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
