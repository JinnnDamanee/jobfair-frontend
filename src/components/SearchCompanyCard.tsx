import { MapPin, Phone } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import Image from "next/image";
import { Company } from "@/types/company";
import Link from "next/link";

type SearchCompanyCardProps = Company;

export default function SearchCompanyCard({
  image,
  jd,
  location,
  name,
  position,
  tel,
}: SearchCompanyCardProps) {
  return (
    <Link href={"/test"}>
      <Card className="flex border-2 hover:border-primary hover:shadow-md">
        <div className="h-ful relative m-4 w-[150px]">
          <Image src={image || ""} alt={name} fill className="object-contain" />
        </div>
        <div>
          <CardHeader>
            <CardTitle>{position}</CardTitle>
            <CardDescription className="text-base">{name}</CardDescription>
          </CardHeader>
          <CardContent className="space-x-4">
            <div className="inline-flex space-x-2">
              <MapPin />
              <p>{location}</p>
            </div>
            <div className="inline-flex space-x-2">
              <Phone />
              <p>{tel}</p>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
