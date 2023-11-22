import { getBookings } from "@/actions/booking";
import { getServerSession } from "@/app/api/auth/[...nextauth]/route";
import AdminBookingTable from "@/components/AdminBookingTable";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import Route from "@/lib/route";
import { redirect } from "next/navigation";

const AdminBookingPage = async () => {
  const sess = await getServerSession();
  if (!sess || sess.user.role !== "admin") return redirect(Route.LOGIN);

  const resp = await getBookings();
  if (!resp.success) return null;

  return (
    <div className="container mt-[40px] space-y-10">
      <div className="space-y-4">
        <BackButton />
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Manage Bookings</h1>
          <Button className="bg-muted-foreground">Add New Booking</Button>
        </div>
      </div>
      <AdminBookingTable bookings={resp.data} />
    </div>
  );
};

export default AdminBookingPage;
