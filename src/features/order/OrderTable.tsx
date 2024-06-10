import Table from "@/components/Table";
import OrderRow from "./OrderRow";
import { useState } from "react";
import { useOrder } from "./useOrder";

export default function OrderTable({ store_id }: { store_id: string }) {
  const tableCol = ["Product", "User", "Pay ", "Status", "Date"];
  const colWidth = 100 / (tableCol.length - 1);

  const [page, setPage] = useState(1);
  const { isLoading, orders } = useOrder(store_id,page);

  const rowRenderFn = function () {
    return orders?.data.map((row) => (
      <OrderRow key={row?._id} row={row} colWidth={colWidth} />
    ));
  };

  console.log(orders);
  return (
    <div className="">
      {!isLoading && (
        <Table
          columns={tableCol}
          content={rowRenderFn}
          lastPage={orders.lastPage}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}
