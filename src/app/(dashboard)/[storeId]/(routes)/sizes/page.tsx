import { format } from "date-fns";

import SizeClient from "./components/SizeClient";
import { db } from "@/lib/db";
import { SizeColumn } from "./components/columns";

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizePage;
