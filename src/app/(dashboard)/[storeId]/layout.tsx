import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}) {
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

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
