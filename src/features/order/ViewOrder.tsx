import StoreNotFound from "@/components/StoreNotFound";
import { useAccountState } from "@/context/AccountContext";

import OrderTable from "./OrderTable";

export default function ViewOrder() {
  console.log("ListProduct Feature");
  const { store_id } = useAccountState();

  return (
    <div className="laptop:px-12 tablet:px-3  px-1 pt-6 pb-16">
      {store_id ? (
        <>
          <div className="tablet:text-3xl text-2xl font-bold mb-4">Order</div>
          <OrderTable />
        </>
      ) : (
        <StoreNotFound />
      )}
    </div>
  );
}
