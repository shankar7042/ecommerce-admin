import { format } from "date-fns";

import ProductClient from "./components/ProductClient";
import { db } from "@/lib/db";
import { ProductColumn } from "./components/columns";
import { usdFormatter } from "@/lib/utils";

const ProductPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      color: true,
      size: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: usdFormatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
