/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getProducts } from "@/services/productApi";
import { useState } from "react";
import { useQuery } from "react-query";

type StoreProductsType = {
  store_id: string;
};

export default function StoreProducts({ store_id }: StoreProductsType) {
  console.log("storeProdcut feature");
  const [storePage, setStorePage] = useLocalStorage("page", 1);
  const [page, setPage] = useState(storePage);
  function handleNextPage(page: number) {
    setPage(page);
    setStorePage(page);
  }
  const { isLoading: isLoadingProducts, data: products } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page, store_id, 5),
  });

  return (
    <div className="">
      {isLoadingProducts ? (
        <div className="fetchLoader mx-auto  mt-[20%]  "></div>
      ) : (
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-3 laptop:gap-6 justify-items-center mt-12">
          {products.data.map((product: any) => (
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
      <Pagination
        page={page}
        handleNextPage={handleNextPage}
        lastPage={products?.lastPage || 0}
      />
    </div>
  );
}
