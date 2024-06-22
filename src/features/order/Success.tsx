/* eslint-disable @typescript-eslint/no-unused-vars */
// Success.js

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../cart/cartSlice";
import { useLocalStorage } from "@/hooks/useLocalStorage";
const Success = () => {
  const dispatch = useDispatch();

  const [_, __, deleteStoreStep] = useLocalStorage("step", 1);
  const [___, ____, deleteStoreOrder] = useLocalStorage("order", 1);

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearCart());
      deleteStoreStep();
      deleteStoreOrder();
    }, 2000);
  }, [dispatch, deleteStoreOrder, deleteStoreStep]);
  return (
    <div className="flex flex-col  items-center justify-center min-h-96 bg">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Order was created Successful!
      </h1>
      <p className="text-lg text-center">Thank you for your order.</p>
    </div>
  );
};

export default Success;
