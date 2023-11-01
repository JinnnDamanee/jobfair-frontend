"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const Page = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="bordersm:border-red-500 sm:rounded-md md:border-blue-500"
      />
    </main>
  );
};
export default Page;
