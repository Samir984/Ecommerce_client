/* eslint-disable @typescript-eslint/no-explicit-any */

import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { getProductsAsQuery } from "@/services/productApi";
import { useQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";

export default function QueryProducts() {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  console.log("render");
  console.log(page);
  function handleNextPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", `${page}`);
    setSearchParams(params);
  }

  const { isLoading, data: products } = useQuery({
    queryKey: ["products", search],
    queryFn: () => getProductsAsQuery(search),
    refetchOnWindowFocus: false,
  });

  console.log(products?.data?.length, products);

  return (
    <div className="flex-1">
      {isLoading ? (
        <div className="fetchLoader mx-auto  mt-[20%]  "></div>
      ) : (
        <>
          {products.data.length > 0 ? (
            <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-3 laptop:gap-6 justify-items-center mt-12">
              {products.data.map((product: any) => (
                <Card
                  key={product._id}
                  _id={product._id}
                  title={product.productName}
                  url={product.productImg?.url}
                  price={product.price}
                />
              ))}
            </div>
          ) : (
            <div className="text-2xl mt-24 text-center">
              Search No Result
              <div className="text-base  text-gray-500">
                We're sorry. We cannot find any matches for your search term.
              </div>
            </div>
          )}
        </>
      )}
      {products?.data.length > 0 && (
        <Pagination
          page={Number(page)}
          handleNextPage={handleNextPage}
          lastPage={products?.lastPage || 0}
        />
      )}
    </div>
  );
}
