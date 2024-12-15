import { useParams } from "react-router-dom";
import ListProductForm from "./ListProductForm";
import { useQuery } from "react-query";

import { getProduct } from "@/services/productApi";

export default function EditProduct() {
  const { product_id } = useParams();

  const { isLoading, data: product } = useQuery({
    queryKey: ["product", product_id],
    queryFn: () => getProduct(product_id as string),
    select: (data) => {
      const {
        productName,
        productDescription,
        stock,
        productImg: oldImg,
        keyword,
        brand,
        category,
        subCategory,
        store_id,
        price,
      } = data.data;
      return {
        productName,
        productDescription,
        stock,
        oldImg,
        keyword,
        brand,
        category,
        store_id,
        subCategory,
        price,
      };
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="">
      {isLoading ? (
        <div className="loader fetchloaderWhite mx-auto  mt-[20%]  "></div>
      ) : (
        <ListProductForm mode="Edit" defaultData={product} />
      )}
    </div>
  );
}
