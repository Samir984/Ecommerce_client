/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@/components/Card";

import { getProductsAsQuery } from "@/services/productApi";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

export default function ResultsPage() {
  const { search } = useLocation();

  const { isLoading, data: products } = useQuery({
    queryKey: ["products", search],
    queryFn: () => getProductsAsQuery(search),
    refetchOnWindowFocus: false,
  });

  console.log(products, isLoading);
  return (
    <div className="">
      <div className=""></div>
      <div className="">
        <div className=" "></div>
        {isLoading ? (
          <div className="fetchLoader mx-auto  mt-[20%]  "></div>
        ) : (
          <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-3 laptop:gap-6 justify-items-center mt-12">
            {products?.data.map((product: any) => (
              <Card
                key={product._id}
                _id={product._id}
                title={product.productName}
                url={product.productImg?.url}
                price={product.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
