import { getCompanyById } from "@/actions/company";
import { getServerSession } from "@/app/api/auth/[...nextauth]/route";
import EditCompanyForm from "@/components/EditCompanyForm";
import Route from "@/lib/route";
import { notFound, redirect } from "next/navigation";

const EditCompanyPage = async ({ params }: { params: { id: string } }) => {
  const sess = await getServerSession();
  if (!sess || sess.user.role !== "admin") redirect(Route.LOGIN);

  const data = await getCompanyById(params.id);
  if (!data) notFound();

  return (
    <div className="container mt-8 space-y-8 px-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          Edit Company{" "}
          <span className="text-muted-foreground">
            {data.name} | {data.position}
          </span>
        </h1>
      </div>
      <EditCompanyForm company={data} cid={params.id} />
    </div>
  );
};
export default EditCompanyPage;
