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
import { getCompanyById } from "@/actions/company";

export async function CompanyInformation({ companyId }: { companyId: string }) {
  //   console.log(companyId);
  const companyResp = await getCompanyById(companyId);
  if (!companyResp) return null;
  //   console.log("Company Information", companyResp);
  return (
    <Card className="">
      <CardHeader className="grid grid-cols-[auto,1fr] items-center gap-4">
        <Image
          src={companyResp.image}
          width={100}
          height={100}
          alt="Company Logo"
          className="justify-center"
        />
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">
            {companyResp.position}
          </CardTitle>
          <CardDescription className="text-base text-gray-900">
            {companyResp.name}
          </CardDescription>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              {companyResp.location}
            </div>
            <div className="flex items-center">
              <Phone className="mr-1 h-4 w-4" />
              {companyResp.tel}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-base font-bold">Job Description</p>
        <p className="text-gray-700">{companyResp.jd}</p>
      </CardContent>
    </Card>
  );
}
