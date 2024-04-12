import StoreNotFound from "@/components/StoreNotFound";
import { useAccountState } from "@/context/AccountContext";

export default function ViewOrder() {
  console.log("ListProduct Feature");
  const { store_id } = useAccountState();

  return (
    <div className="laptop:px-12 tablet:px-3  px-1 pt-6 pb-16">
      {store_id ? "order" : <StoreNotFound />}
    </div>
  );
}
