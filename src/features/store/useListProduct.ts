import { addProduct } from "@/services/productApi";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export function useListProduct() {
  const { mutate: listProduct, isLoading: isListingProduct } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Product listed successfully");
      // reset();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { listProduct, isListingProduct };
}
