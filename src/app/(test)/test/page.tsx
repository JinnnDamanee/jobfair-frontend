import { getServerSession } from "@/app/api/auth/[...nextauth]/route";

export default async function TestPage() {
  const sess = await getServerSession();
  console.log(sess);
  return (
    <div>
      <h1>Test</h1>
      {JSON.stringify(sess?.user)}
    </div>
  );
}
