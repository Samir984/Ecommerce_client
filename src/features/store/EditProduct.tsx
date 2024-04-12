// import { useParams } from "react-router-dom";
// import ListProductForm from "./ListProductForm";
// import { useQuery } from "react-query";

// import { getProduct } from "@/services/productApi";

// export default function EditProduct() {
//   console.log("Edit Product");
//   const { product_id } = useParams();

//   const { isLoading, data: product } = useQuery({
//     queryKey: ["product", product_id],
//     queryFn: () => getProduct(product_id as string),
//   });

//   return (
//     <div className="">
//       {isLoading ? (
//         <div className="fetchLoader mx-auto  mt-[20%]  "></div>
//       ) : (
//         <ListProductForm mode="Edit" productToEdit={product?.data} />
//       )}
//     </div>
//   );
// }
