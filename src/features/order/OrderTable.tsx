/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "@/components/Table";
import OrderRow from "./OrderRow";
import { useState } from "react";
import { useOrder } from "./useOrder";

export default function OrderTable({ store_id }: { store_id: string }) {
  const tableCol = ["Product", "User", "Pay ", "Status", "Date"];
  const colWidth = 100 / (tableCol.length - 1);

  const [page, setPage] = useState(1);
  const { isLoading, orders } = useOrder(store_id, page);

  const rowRenderFn = function () {
    if (!orders?.data || orders.data.length === 0) {
      return (
        <div className="text-center text-gray-500 py-4">No orders found.</div>
      );
    }

    return orders.data.map((row: any) => (
      <OrderRow key={row?._id} row={row} colWidth={colWidth} />
    ));
  };

  return (
    <div className="">
      <Table
        columns={tableCol}
        content={rowRenderFn}
        lastPage={orders?.lastPage}
        page={page}
        isLoading={isLoading}
        setPage={setPage}
      />
    </div>
  );
}
