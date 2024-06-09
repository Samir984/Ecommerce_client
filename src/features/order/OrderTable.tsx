import Table from "@/components/Table";
import { getOrders } from "@/services/orderapi";
import { useQuery } from "react-query";
import OrderRow from "./OrderRow";

export default function OrderTable({ store_id }: { store_id: string }) {
  const tableCol = ["Product", "User", "Pay ", "Status", "Date"];
  const colWidth = 100 / (tableCol.length - 1);

  const { isLoading, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(store_id as string),
  });

  const rowRenderFn = function () {
    return orders?.data.map((row) => (
      <OrderRow key={row?._id} row={row} colWidth={colWidth} />
    ));
  };

  console.log(orders);
  return (
    <div className="">
      {!isLoading && <Table columns={tableCol} content={rowRenderFn} />}
    </div>
  );
}
