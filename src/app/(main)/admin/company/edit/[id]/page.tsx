import { getCompanyById } from "@/actions/company";
import { getServerSession } from "@/app/api/auth/[...nextauth]/route";
import BackButton from "@/components/BackButton";
import EditCompanyForm from "@/components/EditCompanyForm";
import Route from "@/lib/route";
import { notFound, redirect } from "next/navigation";

const EditCompanyPage = async ({ params }: { params: { id: string } }) => {
  const sess = await getServerSession();
  if (!sess || sess.user.role !== "admin") redirect(Route.LOGIN);

  const data = await getCompanyById(params.id);
  if (!data) notFound();

  return (
    <div className="container my-8 space-y-8 px-20">
      <BackButton />
      <div className="xs:w-full mx-auto space-y-8 md:w-2/3">
        <h1 className="text-3xl font-bold">
          Edit Company
          <span className="mt-2 block text-2xl text-muted-foreground">
            {data.name} | {data.position}
          </span>
        </h1>
        <EditCompanyForm company={data} cid={params.id} />
      </div>
    </div>
  );
};
export default EditCompanyPage;
