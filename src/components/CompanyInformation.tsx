import { Button } from "@/components/ui/button";
import { Phone, MapPin, ChevronLeft, Calendar } from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function CompanyInformation() {
  return (
    <Card className="">
      <CardHeader className="grid grid-cols-[auto,1fr] items-center gap-4">
        <Image
          src="/ttb.png"
          width={100}
          height={100}
          alt="Company Logo"
          className="justify-center"
        />
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">Job Title</CardTitle>
          <CardDescription className="text-base text-gray-900">
            Company Name
          </CardDescription>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              Bangkok
            </div>
            <div className="flex items-center">
              <Phone className="mr-1 h-4 w-4" />
              Telephone Number
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-base font-bold">Job Description</p>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur. Venenatis ornare rutrum lacus
          venenatis accumsan commodo pellentesque vel. Sed amet risus maecenas
          aliquet non convallis. Aliquam sapien praesent in et nunc dapibus
          diam. Sit enim risus et libero sagittis morbi enim leo.
        </p>
      </CardContent>
    </Card>
  );
}
