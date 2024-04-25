import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";

import UpdateItemsQuantity from "./UpdateItemsQuantity";

export default function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);
  console.log(items);
  return (
    <div className="px-2 py-4">
      {items?.length === 0 ? (
        <div className="min-h-96 flex items-center justify-center flex-col gap-2">
          <p className="text-sm text-gray-600">
            There are no items on your cart
          </p>
          <Link
            to="/"
            className="text-base border p-2 border-blue-400 hover:bg-blue-100 text-blue-600"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <div className="flex flex-col tablet:flex-row p-2 justify-center">
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <div
                className="flex gap-3 bg-white p-2 shadow-lg"
                key={item.product_id}
              >
                <div className="w-32">
                  <img src={item.url} alt={item.productName} />
                </div>
                <div className="flex-1 flex justify-start">
                  <div className="">
                    <p className="line-clamp-2">{item.productName}</p>
                    <p className="text-orange-600">
                      ${item.price * item.quantity}
                    </p>
                    <div className="flex">
                      <UpdateItemsQuantity
                        maxCount={item.stock}
                        count={item.quantity}
                        _id={item.product_id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex min-w-[170px] tablet:min-w-[240px]  ">
            <div className="w-full bg shadow-lg h-fit">
              <p className="bg-orange-400 p-2 text-center">Summary</p>
              <div className="flex justify-between py-2 px-4">
                <span>Quantity:</span>
                <span>4</span>
              </div>
              <div className="flex justify-between py-2 px-4">
                <span>Total Price:</span>
                <span>4</span>
              </div>
              <Link to={"/checkout"} className="inline-block bg-blue-600 w-full text-center text-white p-3">Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
