import StoreNotFound from "@/components/StoreNotFound";
import { useAccountState } from "@/context/AccountContext";
import { getOrders } from "@/services/orderapi";
import { useQuery } from "react-query";

export default function ViewOrder() {
  console.log("ListProduct Feature");
  const { store_id } = useAccountState();

  const { isLoading, data: orders } = useQuery({
    queryFn: getOrders,
    queryKey: ["storeOrder"],
  });

  console.log(orders);
  return (
    <div className="laptop:px-12 tablet:px-3  px-1 pt-6 pb-16">
      {store_id ? "order" : <StoreNotFound />}
    </div>
  );
}
