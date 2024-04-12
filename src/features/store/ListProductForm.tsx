import StoreNotFound from "@/components/StoreNotFound";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAccountState } from "@/context/AccountContext";
import { addProduct } from "@/services/productApi";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export type ProductFormType = {
  [key: string]: string | FileList;
  productName: string;
  productDescription: string;
  totalQuantity: string;
  productImg: FileList;
  brand: string;
  category: string;
  subCategory: string;
  price: string;
};

export default function ListProductForm() {
  console.log("ListProduct Feature");
  const { store_id } = useAccountState();

  const { register, handleSubmit, formState } = useForm<ProductFormType>();

  // const navigate = useNavigate();

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

  const onSubmit = (data: ProductFormType) => {
    listProduct(data);
  };

  return (
    <div className="laptop:px-12 tablet:px-3  px-1 pt-6 pb-16">
      {store_id ? (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="productName"
            type="text"
            placeholder="Product Name"
            labelName="Product Name"
            error={formState.errors.productName?.message}
            {...register("productName", {
              required: "Product Name is required",
            })}
          />

          <Textarea
            id="productDescription"
            placeholder="Product Description"
            error={formState.errors.productDescription?.message}
            {...register("productDescription", {
              required: "Product Description is required",
            })}
          />

          <Input
            id="totalQuantity"
            type="number"
            placeholder="Total Quantity"
            error={formState.errors.totalQuantity?.message}
            {...register("totalQuantity", {
              required: "Total Quantity is required",
              min: { value: 1, message: "Quantity can't be 0" },
            })}
          />

          <Input
            id="brand"
            type="text"
            placeholder="Brand"
            error={formState.errors.brand?.message}
            {...register("brand", { required: "Brand is required" })}
          />

          <Input
            id="category"
            type="text"
            placeholder="Category"
            error={formState.errors.category?.message}
            {...register("category", { required: "Category is required" })}
          />

          <Input
            id="subCategory"
            type="text"
            placeholder="Subcategory"
            error={formState.errors.subCategory?.message}
            {...register("subCategory", {
              required: "Subcategory is required",
            })}
          />

          <Input
            id="price"
            type="number"
            placeholder="Price"
            error={formState.errors.price?.message}
            {...register("price", { required: "Price is required" })}
          />

          <Input
            id="productImg"
            labelName="Product Image"
            type="file"
            error={formState.errors.productImg?.message}
            {...register("productImg", {
              required: "Product Img is required",
            })}
          />

          <Button className="w-36 ml-auto mt-6" disabled={isListingProduct}>
            {isListingProduct ? (
              <span className="loader w-5 h-5"></span>
            ) : (
              "List Product"
            )}
          </Button>
        </form>
      ) : (
        <StoreNotFound />
      )}
    </div>
  );
}
