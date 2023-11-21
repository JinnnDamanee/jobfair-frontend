import { getAllCompany } from "@/actions/company";
import AdminCompanyTable from "@/components/AdminCompanyTable";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";

const AdminCompanyPage = async () => {
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
