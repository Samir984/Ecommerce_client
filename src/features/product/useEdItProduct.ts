import { useMutation } from "react-query";
import { ProductFormType } from "./ListProductForm";
import { editListedProduct } from "@/services/productApi";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

export function useEditProduct(navigate: NavigateFunction,route:string) {
  const { mutate: editProduct, isLoading: isEditingProduct } = useMutation({
    mutationFn: (data: { product_id: string; newData: ProductFormType }) =>
      editListedProduct(data.product_id, data.newData),
    onSuccess: () => {
      toast.success("Product edited successfully");
      navigate(route);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { editProduct, isEditingProduct };
}
