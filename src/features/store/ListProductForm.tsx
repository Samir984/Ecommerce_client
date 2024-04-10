import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ListProduct } from "@/services/productApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export type ProductFormType = {
  productName: string;
  productDescription: string;
  totalQuantity: number;
  productImg: FileList;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
};

export default function ListProductForm() {
  console.log("ListProduct Feature");
  const { register, handleSubmit, formState, reset } =
    useForm<ProductFormType>();

  // const navigate = useNavigate();

  const { mutate: listProduct, isLoading } = useMutation({
    mutationFn: ListProduct,
    onSuccess: () => {
      toast.success("Product listed successfully");
      reset();
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
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
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
        </div>
        <div className="flex flex-col gap-2">
          <Textarea
            id="productDescription"
            placeholder="Product Description"
            error={formState.errors.productDescription?.message}
            {...register("productDescription", {
              required: "Product Description is required",
            })}
          />
        </div>
        <div className="flex flex-col gap-2">
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
        </div>
        <div className="flex flex-col gap-2">
          <Input
            id="brand"
            type="text"
            placeholder="Brand"
            error={formState.errors.brand?.message}
            {...register("brand", { required: "Brand is required" })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            id="category"
            type="text"
            placeholder="Category"
            error={formState.errors.category?.message}
            {...register("category", { required: "Category is required" })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            id="subCategory"
            type="text"
            placeholder="Subcategory"
            error={formState.errors.subCategory?.message}
            {...register("subCategory", {
              required: "Subcategory is required",
            })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            id="price"
            type="number"
            placeholder="Price"
            error={formState.errors.price?.message}
            {...register("price", { required: "Price is required" })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="productImg"
            labelName="Product Image"
            type="file"
            error={formState.errors.productImg?.message}
            {...register("productImg", { required: "Product Img is required" })}
          />
        </div>

        <Button className="w-36 ml-auto mt-6" disabled={isLoading}>
          {isLoading ? (
            <span className="loader w-5 h-5"></span>
          ) : (
            "List Product"
          )}
        </Button>
      </form>
    </div>
  );
}
