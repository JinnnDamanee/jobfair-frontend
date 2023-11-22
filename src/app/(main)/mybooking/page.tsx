import { Separator } from "@/components/ui/separator";
import { getServerSession } from "@/app/api/auth/[...nextauth]/route";

import BackButton from "@/components/BackButton";
import BookingCatalog from "@/components/BookingCatalog";
import Route from "@/lib/route";
import { redirect } from "next/navigation";

export default async function MyBookingPage() {
  const sess = await getServerSession();
  if (!sess) return redirect(Route.LOGIN);


  return (
    <div id="booking-container" className="container flex flex-col gap-4 p-10">
      <div>
        <BackButton />
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight">My Booking</h2>
        <p className="text-muted-foreground">
          Maximum interview bookings allowed 3 times{" "}
        </p>
      </div>
      <Separator className="my-4" />
      <BookingCatalog  session={sess}/>
    </div>
  );
}
