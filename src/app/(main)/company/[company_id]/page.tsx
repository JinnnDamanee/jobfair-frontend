import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";
export default async function CompanyPage({
  params,
}: {
  params: { company_id: string };
}) {
  return (
    <div className="p-5 text-center">
      Booking
      <BookingForm />{" "}
    </div>
  );
}
