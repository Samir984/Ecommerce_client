import StoreNotFound from "@/components/StoreNotFound";
import UserAvatar from "@/components/UserAvatar";
import { useAccountState } from "@/context/AccountContext";
import { fetchStoreData } from "@/services/storeApi";
import { useQuery } from "react-query";

export default function Store() {
  console.log("Store Feature");
  const { storeExits } = useAccountState();

  const { isLoading, data: store } = useQuery({
    queryKey: ["store"],
    queryFn: fetchStoreData,
  });
  console.log(isLoading, store);

  console.log(store);
  return (
    <div className="py-4 h-full">
      {!storeExits ? (
        <StoreNotFound />
      ) : (
        <div className="flex flex-col h-full">
          <UserAvatar className="w-14 h-14 mx-auto " />
          {!isLoading && (
            <div className="text-center">
              <h1 className="text-xl font-bold">{store.data.storeName}</h1>
              <span className="text-gray-600">
                {" "}
                Listed Products: {store.data.totalListedProducts}
              </span>
            </div>
          )}

          <div className="flex-grow">
            {isLoading ? (
              <div className="fetchLoader   mx-auto  mt-[20%]  "></div>
            ) : (
              "no data"
            )}
          </div>
        </div>
      )}
    </div>
  );
}
