"use client";

import { FC, Fragment } from "react";
import { Plus } from "lucide-react";

import { Button } from "./ui/button";
import Heading from "./Heading";
import { useParams, useRouter } from "next/navigation";

interface BillboardClientProps {}

const BillboardClient: FC<BillboardClientProps> = ({}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboard (0)"
          description="Manage billboards for your store."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
    </Fragment>
  );
};

export default BillboardClient;
