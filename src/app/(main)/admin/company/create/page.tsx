import { getServerSession } from "@/app/api/auth/[...nextauth]/route";
import BackButton from "@/components/BackButton";
import CreateCompanyForm from "@/components/CreateCompanyForm";
import Route from "@/lib/route";
import { redirect } from "next/navigation";

const CreateCompanyPage = async () => {
  const sess = await getServerSession();
  if (!sess || sess.user.role !== "admin") redirect(Route.LOGIN);
  return (
    <div className="container my-8  space-y-8 px-20">
      <BackButton />
      <div className="xs:w-full mx-auto space-y-8 md:w-2/3">
        <h1 className="text-3xl font-bold">Create New Company</h1>
        <CreateCompanyForm className="" />
      </div>
    </div>
  );
};
export default CreateCompanyPage;
