import StoreNotFound from "@/components/StoreNotFound";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAccountState } from "@/context/AccountContext";
import { useForm } from "react-hook-form";
import { useListProduct } from "./useListProduct";
import { useMutation } from "react-query";
import { editListedProduct } from "@/services/productApi";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export type ProductFormType = {
  [key: string]: string | FileList;
  productName: string;
  productDescription: string;
  totalQuantity: string;
  productImg: string | FileList;
  brand: string;
  oldImg: string;
  category: string;
  subCategory: string;
  price: string;
};

// const navigate = useNavigate();
type ListProductFormPropsType = {
  mode: "Edit" | "List";
  defaultData?: Partial<ProductFormType>;
};

export default function ListProductForm({
  mode,
  defaultData,
}: ListProductFormPropsType) {
  console.log("ListProduct Feature");
  const { product_id } = useParams();

  const { register, handleSubmit, formState } = useForm<ProductFormType>({
    defaultValues: mode === "Edit" ? defaultData : {},
  });

  const { store_id } = useAccountState();
  const { listProduct, isListingProduct } = useListProduct();

  // Mutation function for editing a product
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

  const onSubmit = (data: ProductFormType) => {
    console.log(data);
    if (mode === "List") return listProduct(data);
    if (!data.productImg) {
      data.productImg = data.oldImg;
    }
    return editProduct({ product_id: product_id as string, newData: data });
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

          <Button
            className="w-36 ml-auto mt-6"
            disabled={isListingProduct || isEditingProduct}
          >
            {isListingProduct || isEditingProduct ? (
              <span className="loader w-5 h-5"></span>
            ) : (
              `${mode} Product`
            )}
          </Button>
        </form>
      ) : (
        <StoreNotFound />
      )}
    </div>
  );
}
