import { Button } from "@/components/ui/button";
import { getProduct } from "@/services/productApi";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import UpdateItemsQuantity from "../cart/UpdateItemsQuantity";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../features/store";
import { addItem, getCartItem } from "../cart/cartSlice";

type ProductType = {
  status: string;
  data: {
    productName: string;
    productDescription: string;
    stock: number;
    keyword: string;
    productImg: {
      url: string;
    };
    brand: string;
    category: string;
    subCategory: string;
    price: number;
    rating: number;
    store_id: string;
  };
};

export default function Product() {
  const { product_id } = useParams();
  const dispatch = useDispatch();

  // Get cart items from Redux store state
  const cart = useSelector(getCartItem(product_id as string));

  const quantity = cart ? cart.quantity : 0;

  // Fetch product data
  const { isLoading, data: product } = useQuery<ProductType>(
    ["product", product_id],
    () => getProduct(product_id as string)
  );

  const {
    productName,
    stock,
    productImg: { url } = { url: "" },
    price,
  } = product?.data || {};

  console.log(quantity);
  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-52">
          <div className="fetchLoader"></div>
        </div>
      ) : (
        <div className="flex flex-col tablet:flex-row items-center gap-4">
          <div className="w-72">
            <img src={url} alt={productName} className="w-full " />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">{productName}</h2>
            <p className="text-lg mb-4">{product?.data?.productDescription}</p>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">${product?.data?.price}</p>
              {quantity === 0 ? (
                <Button
                  onClick={() => {
                    dispatch(
                      addItem({
                        productName,
                        stock,
                        url,
                        product_id,
                        quantity: 1,
                        price,
                      })
                    );
                  }}
                >
                  Add to Cart
                </Button>
              ) : (
                <UpdateItemsQuantity
                  lastCount={stock}
                  count={quantity}
                  _id={product_id}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
