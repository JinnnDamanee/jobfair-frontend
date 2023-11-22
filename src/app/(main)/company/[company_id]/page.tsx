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
import { getServerSession } from "@/app/api/auth/[...nextauth]/route";
import { SessionProvider } from "next-auth/react";
import Route from "@/lib/route";

export default async function CompanyPage({
  params,
}: {
  params: { company_id: string };
}) {
  const sess = await getServerSession();

  return (
    <div
      className={`px-auto flex flex-col space-y-4 ${
        sess ? "xl:flex-row xl:px-10" : ""
      }`}
    >
      <div
        id="left"
        className={`${
          sess ? "xl:w-2/3 " : "item-center md:w-full"
        } mx-auto md:mx-6 md:p-4`}
      >
        {/* <Button variant="outline" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button> */}
        <BackButton />
        <div
          id=""
          className={`mt-4   ${
            sess ? "flex flex-col gap-4" : "mx-auto space-y-4 md:w-2/3"
          }`}
        >
          <CompanyInformation companyId={params.company_id} />
          <BookingForm
            companyId={params.company_id}
            session={sess}
            purpose="create"
          />
        </div>
      </div>
      {sess && (
        <div id="right" className="mx-auto md:mx-6 md:p-4 xl:w-1/3 xl:pt-0">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">My Booking</h1>
            <Button variant="outline" size="icon" asChild>
              <Link href={Route.MYBOOKING}>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <MyBookingContainer />
        </div>
      )}
    </div>
  );
}
