import { addProduct } from "@/services/productApi";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { NavigateFunction } from "react-router-dom";

export function useListProduct(navigate: NavigateFunction, route: string) {
  const { mutate: listProduct, isLoading: isListingProduct } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Product listed successfully");
      navigate(route);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { listProduct, isListingProduct };
}
