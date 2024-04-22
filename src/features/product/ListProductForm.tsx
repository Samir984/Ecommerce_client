import StoreNotFound from "@/components/StoreNotFound";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAccountState } from "@/context/AccountContext";
import { useForm } from "react-hook-form";
import { useListProduct } from "./useListProduct";
import { useNavigate, useParams } from "react-router-dom";
import { useEditProduct } from "./useEdItProduct";

import FileSelectView from "@/components/FileSelectView";

export type ProductFormType = {
  [key: string]: string | FileList;
  productName: string;
  productDescription: string;
  totalQuantity: string;
  productImg: string | FileList;
  brand: string;
  keyword: string;
  category: string;
  subCategory: string;
  price: string;
};

// const navigate = useNavigate();
type ListProductFormPropsType = {
  mode: "Edit" | "List";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultData?: Partial<ProductFormType> | any;
};

export default function ListProductForm({
  mode,
  defaultData,
}: ListProductFormPropsType) {
  console.log("ListProduct Feature");

  const { product_id } = useParams();
  const navigate = useNavigate();
  const { store_id } = useAccountState();
  const route = `/vendor/store/${store_id}`;

  // react form hook
  const { register, handleSubmit, formState, watch } = useForm<ProductFormType>(
    {
      defaultValues: mode === "Edit" ? defaultData : {},
    }
  );
  const ImgChange = watch("productImg");
  const url = defaultData?.oldImg ? defaultData.oldImg.url : undefined;

  // mutaion custome hooks
  const { listProduct, isListingProduct } = useListProduct(navigate, route);
  const { editProduct, isEditingProduct } = useEditProduct(navigate, route);

  const onSubmit = (data: ProductFormType) => {
    data.category = data.category.toLowerCase();
    data.subCategory = data.subCategory.toLowerCase();
    console.log(data, "\n\n\n");

    if (mode === "List") return listProduct(data);
    if (data.productImg.length === 0 && data.oldImg) {
      data.productImg = data.oldImg;
      delete data.oldImg;
    }
    return editProduct({ product_id: product_id as string, newData: data });
  };

  return (
    <div className="laptop:px-12 tablet:px-3  px-1 pt-6 pb-16">
      {store_id ? (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          {(ImgChange?.length === 1 || url) && (
            <FileSelectView selectedImg={ImgChange || url} />
          )}
          <Input
            id="productImg"
            className=""
            labelName="Product Image"
            type="file"
            error={
              mode === "List" ? formState.errors.productImg?.message : undefined
            }
            {...register("productImg", {
              required: {
                value: mode === "List" ? true : false,
                message: "Product image field in required",
              },
            })}
          />
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
            id="keyword"
            placeholder="keyword"
            error={formState.errors.keyword?.message}
            {...register("keyword", {
              required: "keyword  is required",
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
            {...register("brand")}
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

          <Button
            className="w-36 ml-auto mt-6 disabled:bg-slate-600"
            disabled={
              isListingProduct ||
              isEditingProduct ||
              !Object.entries(formState.dirtyFields).length
            }
          >
            {isListingProduct || isEditingProduct ? (
              <span className="loader loaderWhite w-5 h-5"></span>
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
