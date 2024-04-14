import StoreNotFound from "@/components/StoreNotFound";
import UserAvatar from "@/components/UserAvatar";

import { useParams } from "react-router-dom";
import { useStoreData } from "./useStoreData";
import StoreProducts from "./StoreProducts";

export default function Store() {
  console.log("Store Feature");
  const { store_id } = useParams();
  const { isLoadingStore, store } = useStoreData(store_id as string);

  console.log(store);
  return (
    <div className="py-4 ">
      {store_id ? (
        <StoreNotFound />
      ) : (
        <div className="flex flex-col h-full">
          <UserAvatar className="tablet:w-24 tablet:h-24 mx-auto w-20 h-20" />
          {!isLoadingStore && (
            <div className="text-center">
              <h1 className="text-xl font-bold">{store.data.storeName}</h1>
              <span className="text-gray-600">
                Listed Products: {store.data.totalListedProducts}
              </span>
            </div>
          )}

          <div className="flex-grow min-h-[800px]">
            <StoreProducts store_id={store_id as string} />
          </div>
        </div>
      )}
    </div>
  );
}
