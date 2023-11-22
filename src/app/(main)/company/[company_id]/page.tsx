import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { th } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { BookingForm } from "@/components/BookingForm";
import { MyBookingContainer } from "@/components/MyBookingContainer";
import { CompanyInformation } from "@/components/CompanyInformation";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default async function CompanyPage({
  params,
}: {
  params: { company_id: string };
}) {
  return (
    <div className="flex flex-col px-10 md:flex-row">
      <div className="md:w-2/3 md:p-4 ">
        {/* <Button variant="outline" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button> */}
        <BackButton />
        <div id="" className="mt-4 flex flex-col gap-4">
          <CompanyInformation companyId={params.company_id} />
          <BookingForm companyId={params.company_id} />
        </div>
      </div>
      <div className="md:w-1/3 md:p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">My Booking</h1>
          <Button variant="outline" size="icon">
            <Link href="/mybooking">
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <MyBookingContainer />
      </div>
    </div>
  );
}