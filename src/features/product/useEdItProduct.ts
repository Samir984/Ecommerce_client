import { useMutation } from "react-query";
import { ProductFormType } from "./ListProductForm";
import { editListedProduct } from "@/services/productApi";
import toast from "react-hot-toast";

export function useEditProduct() {
  const { mutate: editProduct, isLoading: isEditingProduct } = useMutation({
    mutationFn: (data: { product_id: string; newData: ProductFormType }) =>
      editListedProduct(data.product_id, data.newData),
    onSuccess: () => {
      toast.success("Product edited successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { editProduct, isEditingProduct };
}
