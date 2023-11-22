import { getServerSession } from "@/app/api/auth/[...nextauth]/route";
import CreateCompanyForm from "@/components/CreateCompanyForm";
import Route from "@/lib/route";
import { redirect } from "next/navigation";

const CreateCompanyPage = async () => {
  const sess = await getServerSession();
  if (!sess || sess.user.role !== "admin") redirect(Route.LOGIN);
  return (
    <div className="container mt-8 space-y-8 px-20">
      <h1 className="text-3xl font-bold">Create New Company</h1>
      <CreateCompanyForm />
    </div>
  );
};
export default CreateCompanyPage;
