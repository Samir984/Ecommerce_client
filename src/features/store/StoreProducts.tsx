/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { getProducts } from "@/services/productApi";
import { useState } from "react";
import { useQuery } from "react-query";

type StoreProductsType = {
  store_id: string;
};

export default function StoreProducts({ store_id }: StoreProductsType) {
  const [page, setPage] = useState(1);
  function handleNextPage(page: number) {
    setPage(page);
  }

  const { isLoading: isLoadingProducts, data: products } = useQuery({
    queryKey: ["products", store_id, page],
    queryFn: () => getProducts(page, store_id as string, 7),
  });
  return (
    <div>
      {isLoadingProducts ? (
        <div className="fetchLoader   mx-auto  mt-[20%]  "></div>
      ) : (
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-3 laptop:gap-6 justify-items-center mt-12">
            
         
          {products.data.map((product:any) => (
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
      <Pagination page={page} handleNextPage={handleNextPage} />
    </div>
  );
}
