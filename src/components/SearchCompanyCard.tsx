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
  id,
}: SearchCompanyCardProps) {
  return (
    <Link href={`/company/${id}`}>
      <Card className="flex border-2 p-2 hover:border-primary hover:shadow-md">
        <div className="relative m-4 aspect-square w-[150px]">
          <Image src={image} alt={name} fill className="object-contain p-4" />
        </div>
        <div>
          <CardHeader>
            <CardTitle>{position}</CardTitle>
            <CardDescription className="text-base">{name}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row">
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
