import Card from "@/components/Card";

import StoreNotFound from "@/components/StoreNotFound";
import UserAvatar from "@/components/UserAvatar";
import { getProducts } from "@/services/productApi";

import { fetchStoreData } from "@/services/storeApi";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function Store() {
  console.log("Store Feature");
  const { store_id } = useParams();

  const { isLoading: isLoadingStore, data: store } = useQuery({
    queryKey: ["store"],
    queryFn: () => fetchStoreData(store_id as string),
  });

  const { isLoading: isLoadingProducts, data: products } = useQuery({
    queryKey: ["products", store_id],
    queryFn: () => getProducts(1, store_id as string, 6),
  });
  console.log(store);
  return (
    <div className="py-4 h-full">
      {!store_id ? (
        <StoreNotFound />
      ) : (
        <div className="flex flex-col h-full">
          <UserAvatar className="w-14 h-14 mx-auto " />
          {!isLoadingStore && (
            <div className="text-center">
              <h1 className="text-xl font-bold">{store.data.storeName}</h1>
              <span className="text-gray-600">
                Listed Products: {store.data.totalListedProducts}
              </span>
            </div>
          )}

          <div className="flex-grow">
            {isLoadingProducts ? (
              <div className="fetchLoader   mx-auto  mt-[20%]  "></div>
            ) : (
              <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-3 laptop:gap-6 justify-items-center mt-12">
                {products.data.map((product) => (
                  <Card
                    key={product._id}
                    _id={product._id}
                    title={product.productName}
                    url={product.productImg.url}
                    price={product.price}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
