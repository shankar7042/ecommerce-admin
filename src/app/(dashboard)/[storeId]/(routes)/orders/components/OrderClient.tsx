"use client";

import { FC, Fragment } from "react";

import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { OrderColumn, columns } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: FC<OrderClientProps> = ({ data }) => {
  return (
    <Fragment>
      <Heading
        title={`Order (${data.length})`}
        description="Manage orders for your store."
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </Fragment>
  );
};

export default OrderClient;
