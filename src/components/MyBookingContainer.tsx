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

export function MyBookingContainer() {
  return (
    <Card className="flex-1 p-4">
      <h3 className="mb-2 text-end text-base">Booked (1/3)</h3>
      <Card className="shadow-sm">
        <CardHeader className="grid grid-cols-[auto,1fr] items-center gap-4">
          <Image
            src="/ttb.png"
            width={40}
            height={40}
            alt="Company Logo"
            className="justify-center rounded-full"
          />
          <div className="space-y-1">
            <CardTitle className="text-base font-bold">Job Title</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Company Name
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              Oct 31, 2023 at 09:00 - 09:59
            </div>
          </div>
        </CardContent>
      </Card>
    </Card>
  );
}
