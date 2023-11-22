import { getAllCompany } from "@/actions/company";
import { getServerSession } from "@/app/api/auth/[...nextauth]/route";
import AdminCompanyTable from "@/components/AdminCompanyTable";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import Route from "@/lib/route";
import { redirect } from "next/navigation";

const AdminCompanyPage = async () => {
  const sess = await getServerSession();
  if (!sess || sess.user.role !== "admin") redirect(Route.LOGIN);

  const resp = await getAllCompany();
  if (!resp.success) return null;

  return (
    <div className="container mt-[40px] space-y-10">
      <div className="space-y-4">
        <BackButton />
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Manage Companies</h1>
          <Button className="bg-muted-foreground">Add New Company</Button>
        </div>
      </div>
      <AdminCompanyTable companies={resp.data} />
    </div>
  );
};

export default AdminCompanyPage;
