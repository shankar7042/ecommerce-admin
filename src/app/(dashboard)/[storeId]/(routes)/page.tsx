import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const DasboardPage = async ({ params }: { params: { storeId: string } }) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId: session.user.id,
    },
  });

  return <div>Active Store: {store?.name}</div>;
};

export default DasboardPage;
