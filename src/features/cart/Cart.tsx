import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";

import UpdateItemsQuantity from "./UpdateItemsQuantity";
import { Button } from "@/components/ui/button";
import { clearCart } from "./cartSlice";
import { useAccountState } from "@/context/AccountContext";

export default function Cart() {
  const { loggedIn } = useAccountState();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const dispatch = useDispatch();

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
        <div className="flex flex-col tablet:flex-row p-2 gap-3 justify-center">
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                className="flex gap-3 bg-white p-2 shadow-lg laptop:min-w-[600px]"
                key={item.product_id}
              >
                <Link to={`/product/${item.product_id}`} className="w-32">
                  <img src={item.url} alt={item.productName} />
                </Link>
                <div className="flex-1 flex justify-start items-center">
                  <div className="">
                    <Link
                      to={`/product/${item.product_id}`}
                      className="line-clamp-2 hover:text-blue-500"
                    >
                      {item.productName}
                    </Link>
                    <p className="text-orange-600">
                      Rs {item.price * item.quantity}
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
            <Button
              variant={"outline"}
              className="w-fit mt-4 hover:bg-red-400 hover:text-white"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </div>
          <div className="flex min-w-[220px] laptop:min-w-[280px]  ">
            <div className="w-full bg shadow-lg h-fit">
              <p className="bg-orange-400 p-2 text-center">Summary</p>
              <div className="flex justify-between py-2 px-4">
                <span>Quantity:</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between py-2 px-4">
                <span>Total Price:</span>
                <span className="text-blue-600">Rs {totalPrice}</span>
              </div>

              <Link to={loggedIn ? "/checkout/shipping" : "/getting-started"}>
                <Button
                  className={`w-full rounded-none ${
                    !loggedIn && "hover:bg-red-500"
                  }`}
                  onMouseEnter={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    if (!loggedIn) {
                      const target = e.target as HTMLButtonElement;
                      target.innerText = "Please login first";
                    }
                  }}
                  onMouseLeave={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    if (!loggedIn) {
                      const target = e.target as HTMLButtonElement;
                      target.innerText = "Checkout";
                    }
                  }}
                >
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
