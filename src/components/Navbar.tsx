import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import MainNav from "./MainNav";
import UserAccountNav from "./UserAccount";
import StoreSwitcher from "./StoreSwitcher";
import { db } from "@/lib/db";

const Navbar = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const stores = await db.store.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserAccountNav user={session?.user} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
