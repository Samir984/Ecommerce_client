import Table from "@/components/Table";
import { getOrders } from "@/services/orderapi";
import { useQuery } from "react-query";

export default function OrderTable({ store_id }: { store_id: string }) {
  const { isLoading, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(store_id as string),
  });

  console.log(orders);
  return (
    <div className="">
      {!isLoading && (
        <Table
          columns={[
            "Product",
            "Name",
            "Number",
            "Quantity",
            "ShippingAddress",
            "PaymentMethod",
            "Status",
            "Total",
            "OrderDate",
          ]}
          content={orders?.data}
        />
      )}
    </div>
  );
}
